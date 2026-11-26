using July.BuildingBlocks.Core.Results;

namespace July.BuildingBlocks.UnitTests.Core;

public class ResultTests
{
    private static readonly Error MontoFueraDeRango = Error.Validacion(
        "MS06.MONTO_FUERA_DE_RANGO",
        "Monto fuera de rango."
    );

    [Fact]
    public void Un_resultado_exitoso_entrega_su_valor()
    {
        Result<int> resultado = 5000;

        resultado.Exito.Should().BeTrue();
        resultado.Valor.Should().Be(5000);
        resultado.Error.Should().Be(Error.Ninguno);
    }

    [Fact]
    public void Un_resultado_fallido_lleva_el_error_y_no_tiene_valor()
    {
        Result<int> resultado = MontoFueraDeRango;

        resultado.Fallo.Should().BeTrue();
        resultado.Error.Tipo.Should().Be(TipoError.Validacion);
        var leer = () => resultado.Valor;
        leer.Should().Throw<InvalidOperationException>().WithMessage("*MS06.MONTO_FUERA_DE_RANGO*");
    }

    [Fact]
    public void Map_transforma_el_valor_y_conserva_el_error()
    {
        Result.Ok(12).Map(plazo => plazo * 30).Valor.Should().Be(360);
        Result.Falla<int>(MontoFueraDeRango).Map(plazo => plazo * 30).Error.Should().Be(MontoFueraDeRango);
    }

    [Fact]
    public void No_se_puede_fallar_sin_error()
    {
        var crear = () => Result.Falla(Error.Ninguno);

        crear.Should().Throw<ArgumentException>();
    }
}
