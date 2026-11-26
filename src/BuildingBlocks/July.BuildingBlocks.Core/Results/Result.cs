namespace July.BuildingBlocks.Core.Results;

/// <summary>Resultado de un caso de uso sin valor de retorno.</summary>
public class Result
{
    protected Result(bool exito, Error error)
    {
        if (exito && error != Error.Ninguno)
        {
            throw new ArgumentException("Un resultado exitoso no lleva error.", nameof(error));
        }

        if (!exito && error == Error.Ninguno)
        {
            throw new ArgumentException("Un resultado fallido necesita un error.", nameof(error));
        }

        Exito = exito;
        Error = error;
    }

    public bool Exito { get; }

    public bool Fallo => !Exito;

    public Error Error { get; }

    public static Result Ok() => new(true, Error.Ninguno);

    public static Result Falla(Error error) => new(false, error);

    public static Result<T> Ok<T>(T valor) => new(valor, true, Error.Ninguno);

    public static Result<T> Falla<T>(Error error) => new(default, false, error);
}

/// <summary>Resultado de un caso de uso que devuelve un valor cuando tiene éxito.</summary>
public sealed class Result<T> : Result
{
    private readonly T? _valor;

    internal Result(T? valor, bool exito, Error error)
        : base(exito, error)
    {
        _valor = valor;
    }

    /// <summary>Valor del resultado. Leerlo en un resultado fallido es un error de programación.</summary>
    public T Valor =>
        Exito
            ? _valor!
            : throw new InvalidOperationException($"El resultado falló con {Error.Codigo}; no tiene valor.");

    public static implicit operator Result<T>(T valor) => Ok(valor);

    public static implicit operator Result<T>(Error error) => Falla<T>(error);

    public Result<TNuevo> Map<TNuevo>(Func<T, TNuevo> transformar) =>
        Exito ? Ok(transformar(Valor)) : Falla<TNuevo>(Error);
}
