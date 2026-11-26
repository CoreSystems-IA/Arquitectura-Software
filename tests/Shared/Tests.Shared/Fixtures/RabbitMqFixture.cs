using Testcontainers.RabbitMq;
using Xunit;

namespace Tests.Shared.Fixtures;

/// <summary>RabbitMQ en un contenedor para probar el outbox y los consumidores idempotentes.</summary>
public sealed class RabbitMqFixture : IAsyncLifetime
{
    private readonly RabbitMqContainer _contenedor = new RabbitMqBuilder("rabbitmq:4.1-management").Build();

    public string CadenaConexion => _contenedor.GetConnectionString();

    public async ValueTask InitializeAsync() => await _contenedor.StartAsync().ConfigureAwait(false);

    public async ValueTask DisposeAsync() => await _contenedor.DisposeAsync().ConfigureAwait(false);
}
