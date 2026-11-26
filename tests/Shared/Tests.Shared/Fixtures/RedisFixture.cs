using Testcontainers.Redis;
using Xunit;

namespace Tests.Shared.Fixtures;

/// <summary>Redis en un contenedor (estado de la conversación de MS-02).</summary>
public sealed class RedisFixture : IAsyncLifetime
{
    private readonly RedisContainer _contenedor = new RedisBuilder("redis:8-alpine").Build();

    public string CadenaConexion => _contenedor.GetConnectionString();

    public async ValueTask InitializeAsync() => await _contenedor.StartAsync().ConfigureAwait(false);

    public async ValueTask DisposeAsync() => await _contenedor.DisposeAsync().ConfigureAwait(false);
}
