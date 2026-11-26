using July.BuildingBlocks.Persistence.Oracle;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace July.BuildingBlocks.Messaging.RabbitMQ;

public static class DependencyInjection
{
    /// <summary>Registra la conexión a RabbitMQ y el publicador del outbox del servicio.</summary>
    public static IServiceCollection AddJulyMensajeria<TContexto>(
        this IServiceCollection servicios,
        IConfiguration configuracion
    )
        where TContexto : JulyDbContext
    {
        servicios.Configure<OpcionesRabbitMq>(configuracion.GetSection(OpcionesRabbitMq.Seccion));
        servicios.AddSingleton<ConexionRabbitMq>();
        servicios.AddHostedService<OutboxDispatcher<TContexto>>();
        return servicios;
    }
}
