using System.Text;
using July.BuildingBlocks.Persistence.Oracle;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace July.BuildingBlocks.Messaging.RabbitMQ;

/// <summary>
/// Publica en RabbitMQ los eventos del outbox del servicio, en orden de ocurrencia y con confirmación
/// del broker. Si hay varias réplicas, un evento puede salir dos veces: por eso los consumidores son
/// idempotentes (<see cref="IdempotentConsumer{TEvento, TContexto}"/>).
/// </summary>
public sealed class OutboxDispatcher<TContexto>(
    IServiceScopeFactory alcances,
    ConexionRabbitMq conexion,
    IOptions<OpcionesRabbitMq> opciones,
    ILogger<OutboxDispatcher<TContexto>> registro
) : BackgroundService
    where TContexto : JulyDbContext
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = opciones.Value;
        await using var canal = await conexion
            .AbrirCanalAsync(confirmaciones: true, stoppingToken)
            .ConfigureAwait(false);
        await canal
            .ExchangeDeclareAsync(
                config.Exchange,
                ExchangeType.Topic,
                durable: true,
                autoDelete: false,
                cancellationToken: stoppingToken
            )
            .ConfigureAwait(false);

        using var temporizador = new PeriodicTimer(config.IntervaloOutbox);
        do
        {
            await PublicarLoteAsync(canal, config, stoppingToken).ConfigureAwait(false);
        } while (await temporizador.WaitForNextTickAsync(stoppingToken).ConfigureAwait(false));
    }

    private async Task PublicarLoteAsync(IChannel canal, OpcionesRabbitMq config, CancellationToken cancelacion)
    {
        await using var alcance = alcances.CreateAsyncScope();
        var contexto = alcance.ServiceProvider.GetRequiredService<TContexto>();

        var pendientes = await contexto
            .Outbox.Where(m => m.PublicadoEn == null && m.Intentos < config.MaximoIntentos)
            .OrderBy(m => m.OcurridoEn)
            .Take(config.TamanoLote)
            .ToListAsync(cancelacion)
            .ConfigureAwait(false);

        foreach (var mensaje in pendientes)
        {
            try
            {
                var propiedades = new BasicProperties
                {
                    MessageId = mensaje.Id.ToString(),
                    Type = mensaje.Tipo,
                    ContentType = "application/json",
                    DeliveryMode = DeliveryModes.Persistent,
                    Timestamp = new AmqpTimestamp(mensaje.OcurridoEn.ToUnixTimeSeconds()),
                    AppId = config.Servicio,
                    Headers = new Dictionary<string, object?> { ["traceparent"] = mensaje.Traceparent },
                };
                await canal
                    .BasicPublishAsync(
                        config.Exchange,
                        mensaje.ClaveEnrutamiento,
                        mandatory: false,
                        propiedades,
                        Encoding.UTF8.GetBytes(mensaje.Contenido),
                        cancelacion
                    )
                    .ConfigureAwait(false);
                mensaje.PublicadoEn = DateTimeOffset.UtcNow;
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                mensaje.Intentos++;
                mensaje.UltimoError = ex.Message.Length > 2000 ? ex.Message[..2000] : ex.Message;
                Registros.FalloPublicacion(registro, mensaje.Id, mensaje.Intentos, ex);
                break; // Se conserva el orden: el resto del lote espera al siguiente ciclo.
            }
        }

        await contexto.SaveChangesAsync(cancelacion).ConfigureAwait(false);
    }
}
