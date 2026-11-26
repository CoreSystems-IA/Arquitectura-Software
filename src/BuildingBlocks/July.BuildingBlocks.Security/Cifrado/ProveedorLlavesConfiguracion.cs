using Microsoft.Extensions.Configuration;

namespace July.BuildingBlocks.Security.Cifrado;

/// <summary>
/// Proveedor de llaves para desarrollo y pruebas: lee la sección <c>Cifrado</c> de la configuración
/// (llaves en Base64 desde secretos de usuario o variables de entorno). En Kubernetes la sección la
/// llena el agente de Vault; un proveedor que hable directo con Vault puede reemplazarlo sin cambiar
/// <see cref="CifradorColumna"/>.
/// </summary>
public sealed class ProveedorLlavesConfiguracion : IProveedorLlaves
{
    private readonly Dictionary<byte, byte[]> _llavesCifrado;
    private readonly byte[] _llaveIndice;

    public ProveedorLlavesConfiguracion(IConfiguration configuracion)
    {
        ArgumentNullException.ThrowIfNull(configuracion);
        var seccion = configuracion.GetSection("Cifrado");
        VersionVigente = seccion.GetValue<byte>("VersionVigente", 1);
        _llavesCifrado = seccion
            .GetSection("Llaves")
            .GetChildren()
            .ToDictionary(
                s => byte.Parse(s.Key, System.Globalization.CultureInfo.InvariantCulture),
                s => Leer(s.Value, s.Path)
            );
        _llaveIndice = Leer(seccion["LlaveIndice"], "Cifrado:LlaveIndice");

        if (!_llavesCifrado.ContainsKey(VersionVigente))
        {
            throw new InvalidOperationException($"Falta la llave 'Cifrado:Llaves:{VersionVigente}'.");
        }
    }

    public byte VersionVigente { get; }

    public ReadOnlySpan<byte> LlaveCifrado(byte version) =>
        _llavesCifrado.TryGetValue(version, out var llave)
            ? llave
            : throw new InvalidOperationException($"No hay llave de cifrado para la versión {version}.");

    public ReadOnlySpan<byte> LlaveIndice() => _llaveIndice;

    private static byte[] Leer(string? base64, string ruta)
    {
        if (string.IsNullOrWhiteSpace(base64))
        {
            throw new InvalidOperationException($"Falta la llave '{ruta}'.");
        }

        var llave = Convert.FromBase64String(base64);
        return llave.Length == 32
            ? llave
            : throw new InvalidOperationException($"La llave '{ruta}' debe tener 32 bytes.");
    }
}
