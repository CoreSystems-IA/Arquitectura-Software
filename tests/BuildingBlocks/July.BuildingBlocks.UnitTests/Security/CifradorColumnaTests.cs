using System.Security.Cryptography;
using July.BuildingBlocks.Security.Cifrado;
using Microsoft.Extensions.Configuration;

namespace July.BuildingBlocks.UnitTests.Security;

public class CifradorColumnaTests
{
    private static readonly string LlaveV1 = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    private static readonly string LlaveV2 = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    private static readonly string LlaveIndice = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));

    [Fact]
    public void Cifrar_y_descifrar_devuelve_el_mismo_texto()
    {
        var cifrador = Crear(versionVigente: 1);

        var cifrado = cifrador.Cifrar("Juan Pérez");

        cifrado[0].Should().Be(1);
        cifrador.Descifrar(cifrado).Should().Be("Juan Pérez");
    }

    [Fact]
    public void El_mismo_texto_cifrado_dos_veces_da_resultados_distintos()
    {
        var cifrador = Crear(versionVigente: 1);

        cifrador.Cifrar("dato").Should().NotEqual(cifrador.Cifrar("dato"));
    }

    [Fact]
    public void Tras_rotar_la_llave_se_descifran_los_datos_de_la_version_anterior()
    {
        var cifradoConV1 = Crear(versionVigente: 1).Cifrar("dato anterior");

        var cifradorV2 = Crear(versionVigente: 2);

        cifradorV2.Descifrar(cifradoConV1).Should().Be("dato anterior");
        cifradorV2.Cifrar("dato nuevo")[0].Should().Be(2);
    }

    [Fact]
    public void Un_texto_cifrado_alterado_se_rechaza()
    {
        var cifrador = Crear(versionVigente: 1);
        var cifrado = cifrador.Cifrar("dato");
        cifrado[^1] ^= 0xFF;

        var descifrar = () => cifrador.Descifrar(cifrado);

        descifrar.Should().Throw<CryptographicException>();
    }

    [Fact]
    public void El_indice_ciego_ignora_espacios_y_mayusculas()
    {
        var cifrador = Crear(versionVigente: 1);

        cifrador.Indice(" abc 123 ").Should().Equal(cifrador.Indice("ABC123"));
        cifrador.Indice("ABC123").Should().NotEqual(cifrador.Indice("ABC124"));
    }

    private static CifradorColumna Crear(byte versionVigente)
    {
        var configuracion = new ConfigurationBuilder()
            .AddInMemoryCollection(
                new Dictionary<string, string?>
                {
                    ["Cifrado:VersionVigente"] = versionVigente.ToString(
                        System.Globalization.CultureInfo.InvariantCulture
                    ),
                    ["Cifrado:Llaves:1"] = LlaveV1,
                    ["Cifrado:Llaves:2"] = LlaveV2,
                    ["Cifrado:LlaveIndice"] = LlaveIndice,
                }
            )
            .Build();
        return new CifradorColumna(new ProveedorLlavesConfiguracion(configuracion));
    }
}
