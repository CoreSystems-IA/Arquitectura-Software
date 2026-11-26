using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace July.BuildingBlocks.Security.Jwt;

public static class DependencyInjection
{
    /// <summary>Valida el JWT interno: firma, emisor, audiencia y vigencia, con 30 s de tolerancia.</summary>
    public static IServiceCollection AddJulyJwtInterno(this IServiceCollection servicios, IConfiguration configuracion)
    {
        var opciones = configuracion.GetSection(OpcionesJwtInterno.Seccion).Get<OpcionesJwtInterno>()
            ?? throw new InvalidOperationException($"Falta la sección '{OpcionesJwtInterno.Seccion}'.");

        servicios
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(jwt =>
            {
                jwt.Authority = opciones.Autoridad;
                jwt.Audience = opciones.Audiencia;
                jwt.RequireHttpsMetadata = opciones.RequiereHttps;
                jwt.MapInboundClaims = false;
                jwt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.FromSeconds(30),
                    RoleClaimType = ClaimsJuly.Rol,
                };
            });
        servicios.AddAuthorization();
        return servicios;
    }
}
