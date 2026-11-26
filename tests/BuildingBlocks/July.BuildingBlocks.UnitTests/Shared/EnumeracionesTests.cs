using July.Services.Shared.Enumeraciones;
using July.Services.Shared.Seguridad;

namespace July.BuildingBlocks.UnitTests.Shared;

public class EnumeracionesTests
{
    [Fact]
    public void Los_valores_conservan_el_texto_de_CLS_01()
    {
        ValorCls.De(EstadoLead.EnCaptura).Should().Be("EN_CAPTURA");
        ValorCls.A<ResultadoPrecalificacion>("A_REVISAR").Should().Be(ResultadoPrecalificacion.ARevisar);
    }

    [Fact]
    public void Hay_ocho_roles_y_coinciden_con_RolColaborador()
    {
        var roles = Enum.GetValues<RolColaborador>().Select(RolesPanel.De);

        RolesPanel.Todos.Should().HaveCount(8).And.BeEquivalentTo(roles);
    }

    [Fact]
    public void Cada_miembro_de_enumeracion_tiene_su_valor_de_CLS_01()
    {
        var sinValor = typeof(ValorCls)
            .Assembly.GetTypes()
            .Where(t => t.IsEnum)
            .SelectMany(t => t.GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static))
            .Where(f => !f.IsDefined(typeof(ValorClsAttribute), inherit: false))
            .Select(f => $"{f.DeclaringType!.Name}.{f.Name}");

        sinValor.Should().BeEmpty();
    }
}
