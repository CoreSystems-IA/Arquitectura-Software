using System.Security.Claims;
using System.Security.Cryptography;
using July.BuildingBlocks.Security.Jwt;
using July.Services.Shared.Enumeraciones;
using July.Services.Shared.Seguridad;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Tests.Shared.Seguridad;

/// <summary>
/// Emite JWT internos de prueba para cualquiera de los 8 roles del panel, firmados con una llave que
/// solo existe durante la ejecución. El host bajo prueba configura su validación con <see cref="Llave"/>.
/// </summary>
public static class TokensPrueba
{
    public const string Emisor = "https://identity.july.prueba";

    public static SymmetricSecurityKey Llave { get; } = new(RandomNumberGenerator.GetBytes(32));

    public static string Para(RolColaborador rol, string audiencia, string? agencia = null)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, Guid.NewGuid().ToString()),
            new(ClaimsJuly.Rol, RolesPanel.De(rol)),
        };
        if (agencia is not null)
        {
            claims.Add(new Claim(ClaimsJuly.Agencia, agencia));
        }

        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = Emisor,
            Audience = audiencia,
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(10),
            SigningCredentials = new SigningCredentials(Llave, SecurityAlgorithms.HmacSha256),
        };
        return new JsonWebTokenHandler().CreateToken(descriptor);
    }

    /// <summary>Parámetros de validación que aceptan los tokens de esta clase.</summary>
    public static TokenValidationParameters Validacion(string audiencia) =>
        new()
        {
            ValidIssuer = Emisor,
            ValidAudience = audiencia,
            IssuerSigningKey = Llave,
            RoleClaimType = ClaimsJuly.Rol,
        };
}
