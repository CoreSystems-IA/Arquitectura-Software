using Testcontainers.Oracle;
using Xunit;

namespace Tests.Shared.Fixtures;

/// <summary>
/// Oracle Database Free en un contenedor, con la misma imagen que docker-compose y Aspire. Las pruebas
/// de integración de un servicio la comparten con <c>IClassFixture&lt;OracleFixture&gt;</c> o una colección.
/// </summary>
public sealed class OracleFixture : IAsyncLifetime
{
    private readonly OracleContainer _contenedor = new OracleBuilder("gvenzl/oracle-free:23-slim-faststart").Build();

    /// <summary>Cadena de conexión del usuario de la aplicación en FREEPDB1.</summary>
    public string CadenaConexion => _contenedor.GetConnectionString();

    public async ValueTask InitializeAsync() => await _contenedor.StartAsync().ConfigureAwait(false);

    public async ValueTask DisposeAsync() => await _contenedor.DisposeAsync().ConfigureAwait(false);
}
