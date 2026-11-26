using System.Security.Cryptography;
using System.Text;

namespace July.BuildingBlocks.Security.Cifrado;

/// <summary>
/// Cifra los datos personales de identidad antes de guardarlos (DAT-02: columnas BLOB) y calcula su
/// índice ciego para buscarlos sin descifrar (columnas <c>*_indice</c>).
/// Formato del texto cifrado: versión de llave (1 byte) | nonce (12) | etiqueta (16) | datos.
/// </summary>
public sealed class CifradorColumna(IProveedorLlaves llaves)
{
    private const int TamanoNonce = 12;
    private const int TamanoEtiqueta = 16;
    private const int Cabecera = 1 + TamanoNonce + TamanoEtiqueta;

    public byte[] Cifrar(string textoPlano)
    {
        ArgumentNullException.ThrowIfNull(textoPlano);
        var datos = Encoding.UTF8.GetBytes(textoPlano);
        var salida = new byte[Cabecera + datos.Length];
        var version = llaves.VersionVigente;
        salida[0] = version;

        var nonce = salida.AsSpan(1, TamanoNonce);
        RandomNumberGenerator.Fill(nonce);
        using var aes = new AesGcm(llaves.LlaveCifrado(version), TamanoEtiqueta);
        aes.Encrypt(nonce, datos, salida.AsSpan(Cabecera), salida.AsSpan(1 + TamanoNonce, TamanoEtiqueta));
        return salida;
    }

    public string Descifrar(byte[] cifrado)
    {
        ArgumentNullException.ThrowIfNull(cifrado);
        if (cifrado.Length < Cabecera)
        {
            throw new CryptographicException("El texto cifrado está incompleto.");
        }

        var datos = new byte[cifrado.Length - Cabecera];
        using var aes = new AesGcm(llaves.LlaveCifrado(cifrado[0]), TamanoEtiqueta);
        aes.Decrypt(
            cifrado.AsSpan(1, TamanoNonce),
            cifrado.AsSpan(Cabecera),
            cifrado.AsSpan(1 + TamanoNonce, TamanoEtiqueta),
            datos
        );
        return Encoding.UTF8.GetString(datos);
    }

    /// <summary>
    /// Índice ciego HMAC-SHA256 del valor normalizado (sin espacios, en mayúsculas). Mismo valor, mismo
    /// índice: permite buscar un prospecto por cédula o teléfono sin descifrar la tabla.
    /// </summary>
    public byte[] Indice(string valor)
    {
        ArgumentNullException.ThrowIfNull(valor);
        var normalizado = string.Concat(valor.Where(c => !char.IsWhiteSpace(c))).ToUpperInvariant();
        return HMACSHA256.HashData(llaves.LlaveIndice(), Encoding.UTF8.GetBytes(normalizado));
    }
}
