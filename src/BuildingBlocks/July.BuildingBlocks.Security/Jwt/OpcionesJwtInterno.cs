namespace July.BuildingBlocks.Security.Jwt;

/// <summary>
/// JWT interno que WSO2 API Manager emite hacia los servicios (regla L5 de SAD-06): ningún servicio
/// acepta una llamada que no venga del gateway o de otro servicio con un token de la misma autoridad.
/// </summary>
public sealed class OpcionesJwtInterno
{
    public const string Seccion = "JwtInterno";

    /// <summary>Autoridad que firma (Identity Server de WSO2); de ella se leen las llaves públicas.</summary>
    public string Autoridad { get; set; } = string.Empty;

    /// <summary>Audiencia: el nombre del servicio (por ejemplo <c>ms06-solicitud</c>).</summary>
    public string Audiencia { get; set; } = string.Empty;

    /// <summary>Solo en desarrollo, cuando el Identity Server local no tiene TLS.</summary>
    public bool RequiereHttps { get; set; } = true;
}
