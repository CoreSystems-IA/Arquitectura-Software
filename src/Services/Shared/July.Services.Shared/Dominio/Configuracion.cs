namespace July.Services.Shared.Dominio;

/// <summary>
/// CLS-01 <c>Configuracion</c>: lo que un colaborador publica por versiones y July solo lee (líneas de
/// crédito, plantillas y reglas). Solo una versión vigente por tipo y clave.
/// </summary>
public abstract class Configuracion
{
    /// <summary>Versión publicada.</summary>
    public required string Version { get; init; }

    /// <summary>Solo una versión vigente por tipo y clave.</summary>
    public bool Vigente { get; set; }

    /// <summary>Identificador del colaborador que la publicó (en CLS-01, la referencia a <c>Colaborador</c>).</summary>
    public required Guid PublicadoPor { get; init; }
}
