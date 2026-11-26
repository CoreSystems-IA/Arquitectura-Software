namespace July.BuildingBlocks.Core.Results;

/// <summary>
/// Error de negocio o de validación que un caso de uso devuelve en lugar de lanzar una excepción.
/// Se serializa con el esquema común de <c>src/Contracts/openapi/comun/errores.yaml</c>.
/// </summary>
/// <param name="Codigo">Código estable, en mayúsculas, con el prefijo del servicio (por ejemplo <c>MS06.MONTO_FUERA_DE_RANGO</c>).</param>
/// <param name="Mensaje">Texto para el registro técnico; nunca incluye datos personales.</param>
/// <param name="Tipo">Clase de error, que decide el estado HTTP.</param>
public sealed record Error(string Codigo, string Mensaje, TipoError Tipo)
{
    public static readonly Error Ninguno = new(string.Empty, string.Empty, TipoError.Ninguno);

    public static Error Validacion(string codigo, string mensaje) => new(codigo, mensaje, TipoError.Validacion);

    public static Error NoEncontrado(string codigo, string mensaje) => new(codigo, mensaje, TipoError.NoEncontrado);

    public static Error Conflicto(string codigo, string mensaje) => new(codigo, mensaje, TipoError.Conflicto);

    public static Error NoAutorizado(string codigo, string mensaje) => new(codigo, mensaje, TipoError.NoAutorizado);

    public static Error Prohibido(string codigo, string mensaje) => new(codigo, mensaje, TipoError.Prohibido);

    public static Error Externo(string codigo, string mensaje) => new(codigo, mensaje, TipoError.Externo);
}

/// <summary>Clase de error; el host la traduce a un estado HTTP.</summary>
public enum TipoError
{
    Ninguno = 0,
    Validacion = 400,
    NoAutorizado = 401,
    Prohibido = 403,
    NoEncontrado = 404,
    Conflicto = 409,
    Externo = 502,
}
