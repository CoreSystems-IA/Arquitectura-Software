namespace July.Services.Shared.Enumeraciones;

/// <summary>Valor de la enumeración tal como aparece en CLS-01 y en DAT-02 (por ejemplo <c>EN_CAPTURA</c>).</summary>
[AttributeUsage(AttributeTargets.Field)]
public sealed class ValorClsAttribute(string valor) : Attribute
{
    public string Valor { get; } = valor;
}
