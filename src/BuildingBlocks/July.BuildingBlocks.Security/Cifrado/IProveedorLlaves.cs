namespace July.BuildingBlocks.Security.Cifrado;

/// <summary>
/// Entrega las llaves de cifrado por columna. En Kubernetes las lee de Vault (motor transit o KV);
/// en desarrollo, de la configuración local. Las llaves nunca se versionan (regla de .gitleaks.toml).
/// </summary>
public interface IProveedorLlaves
{
    /// <summary>Versión vigente de la llave de cifrado; se guarda junto al texto cifrado para poder rotar.</summary>
    byte VersionVigente { get; }

    /// <summary>Llave AES-256 (32 bytes) de la versión pedida.</summary>
    ReadOnlySpan<byte> LlaveCifrado(byte version);

    /// <summary>Llave HMAC-SHA256 del índice ciego. No rota: rotarla obliga a recalcular los índices.</summary>
    ReadOnlySpan<byte> LlaveIndice();
}
