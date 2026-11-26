using July.BuildingBlocks.Core.Results;
using July.Services.Shared.Enumeraciones;
using NetArchTest.Rules;

namespace July.BuildingBlocks.UnitTests.Dependencias;

/// <summary>
/// Reglas de dependencia de lo compartido (SAD-07, sección 5; R-D4 de SAD-06). Se ejecutan en
/// <c>make check</c>, en el hook pre-push y en Jenkins.
/// </summary>
[Trait("Category", "Dependencias")]
public class DependenciasTests
{
    [Fact]
    public void Core_no_depende_de_infraestructura()
    {
        var resultado = Types
            .InAssembly(typeof(Result).Assembly)
            .ShouldNot()
            .HaveDependencyOnAny("Microsoft.EntityFrameworkCore", "Microsoft.AspNetCore", "RabbitMQ.Client", "Oracle")
            .GetResult();

        resultado.IsSuccessful.Should().BeTrue(Fallidos(resultado));
    }

    [Fact]
    public void Shared_solo_contiene_tipos_sin_infraestructura()
    {
        var resultado = Types
            .InAssembly(typeof(EstadoLead).Assembly)
            .ShouldNot()
            .HaveDependencyOnAny(
                "Microsoft.EntityFrameworkCore",
                "Microsoft.AspNetCore",
                "RabbitMQ.Client",
                "Oracle",
                "July.BuildingBlocks.Persistence",
                "July.BuildingBlocks.Messaging",
                "July.BuildingBlocks.Security"
            )
            .GetResult();

        resultado.IsSuccessful.Should().BeTrue(Fallidos(resultado));
    }

    [Fact]
    public void Shared_no_depende_de_ningun_servicio()
    {
        var resultado = Types
            .InAssembly(typeof(EstadoLead).Assembly)
            .ShouldNot()
            .HaveDependencyOnAny(
                "July.Services.Canales",
                "July.Services.Conversacion",
                "July.Services.Comprension",
                "July.Services.Prospectos",
                "July.Services.Leads",
                "July.Services.Solicitud",
                "July.Services.Simulacion",
                "July.Services.Catalogo",
                "July.Services.Precalificacion",
                "July.Services.Agenda",
                "July.Services.Entrega",
                "July.Services.Asignacion",
                "July.Services.Notificaciones",
                "July.Services.Auditoria"
            )
            .GetResult();

        resultado.IsSuccessful.Should().BeTrue(Fallidos(resultado));
    }

    private static string Fallidos(NetArchTest.Rules.TestResult resultado) =>
        string.Join(", ", resultado.FailingTypeNames ?? []);
}
