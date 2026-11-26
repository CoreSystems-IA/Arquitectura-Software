using System.Reflection;

namespace July.Services.Shared.Enumeraciones;

/// <summary>Conversión entre los miembros de las enumeraciones y su valor en CLS-01 y DAT-02.</summary>
public static class ValorCls
{
    /// <summary>Devuelve el valor de CLS-01 de un miembro de enumeración.</summary>
    public static string De<TEnum>(TEnum valor)
        where TEnum : struct, Enum
    {
        var nombre = valor.ToString();
        return typeof(TEnum).GetField(nombre)?.GetCustomAttribute<ValorClsAttribute>()?.Valor ?? nombre;
    }

    /// <summary>Convierte un valor de CLS-01 al miembro de la enumeración.</summary>
    public static TEnum A<TEnum>(string valorCls)
        where TEnum : struct, Enum
    {
        foreach (var campo in typeof(TEnum).GetFields(BindingFlags.Public | BindingFlags.Static))
        {
            if (campo.GetCustomAttribute<ValorClsAttribute>()?.Valor == valorCls)
            {
                return (TEnum)campo.GetValue(null)!;
            }
        }

        throw new ArgumentException($"'{valorCls}' no es un valor de {typeof(TEnum).Name}.", nameof(valorCls));
    }
}
