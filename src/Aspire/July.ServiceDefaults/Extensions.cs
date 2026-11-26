using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

namespace Microsoft.Extensions.Hosting;

/// <summary>
/// Lo que todo host de July hace al arrancar. Cada <c>Program.cs</c> llama a <see cref="AddServiceDefaults{TBuilder}"/>
/// y a <see cref="MapDefaultEndpoints"/>; el resto es del servicio. Sustituye a <c>packages/observabilidad</c> de SAD-06.
/// </summary>
public static class Extensions
{
    private const string RutaSalud = "/health";
    private const string RutaVida = "/alive";

    public static TBuilder AddServiceDefaults<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        builder.ConfigureOpenTelemetry();
        builder.AddDefaultHealthChecks();
        builder.Services.AddServiceDiscovery();

        // Llamadas HTTP entre servicios con tiempo límite, reintentos y cortocircuito (SAD-07, sección 6).
        builder.Services.ConfigureHttpClientDefaults(http =>
        {
            http.AddStandardResilienceHandler();
            http.AddServiceDiscovery();
        });

        return builder;
    }

    public static TBuilder ConfigureOpenTelemetry<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        builder.Logging.AddOpenTelemetry(registro =>
        {
            // Los mensajes de registro nunca llevan datos personales: solo identificadores (SAD-02).
            registro.IncludeFormattedMessage = true;
            registro.IncludeScopes = true;
        });

        builder
            .Services.AddOpenTelemetry()
            .WithMetrics(metricas =>
                metricas.AddAspNetCoreInstrumentation().AddHttpClientInstrumentation().AddRuntimeInstrumentation()
            )
            .WithTracing(trazas =>
                trazas
                    .AddSource(builder.Environment.ApplicationName)
                    .AddAspNetCoreInstrumentation(aspnet =>
                        // Las sondas no generan trazas.
                        aspnet.Filter = contexto =>
                            !contexto.Request.Path.StartsWithSegments(RutaSalud)
                            && !contexto.Request.Path.StartsWithSegments(RutaVida)
                    )
                    .AddHttpClientInstrumentation()
            );

        if (!string.IsNullOrWhiteSpace(builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"]))
        {
            builder.Services.AddOpenTelemetry().UseOtlpExporter();
        }

        return builder;
    }

    public static TBuilder AddDefaultHealthChecks<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        builder.Services.AddHealthChecks().AddCheck("vivo", () => HealthCheckResult.Healthy(), ["vivo"]);
        return builder;
    }

    /// <summary>
    /// <c>/health</c> (listo: dependencias incluidas) y <c>/alive</c> (vivo). Kubernetes usa las dos
    /// como sondas (chart <c>july-servicio</c>); por eso se exponen en todos los entornos, sin datos.
    /// </summary>
    public static WebApplication MapDefaultEndpoints(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);
        app.MapHealthChecks(RutaSalud);
        app.MapHealthChecks(RutaVida, new HealthCheckOptions { Predicate = r => r.Tags.Contains("vivo") });
        return app;
    }
}
