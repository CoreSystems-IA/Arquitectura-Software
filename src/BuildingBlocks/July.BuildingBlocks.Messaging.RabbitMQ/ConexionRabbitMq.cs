using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace July.BuildingBlocks.Messaging.RabbitMQ;

/// <summary>Una conexión por proceso; cada publicador o consumidor abre su propio canal.</summary>
public sealed class ConexionRabbitMq(IConfiguration configuracion, IOptions<OpcionesRabbitMq> opciones)
    : IAsyncDisposable
{
    private readonly SemaphoreSlim _candado = new(1, 1);
    private IConnection? _conexion;

    public async Task<IChannel> AbrirCanalAsync(bool confirmaciones, CancellationToken cancelacion)
    {
        var conexion = await ObtenerConexionAsync(cancelacion).ConfigureAwait(false);
        var opcionesCanal = new CreateChannelOptions(
            publisherConfirmationsEnabled: confirmaciones,
            publisherConfirmationTrackingEnabled: confirmaciones
        );
        return await conexion.CreateChannelAsync(opcionesCanal, cancelacion).ConfigureAwait(false);
    }

    public async ValueTask DisposeAsync()
    {
        if (_conexion is not null)
        {
            await _conexion.DisposeAsync().ConfigureAwait(false);
        }

        _candado.Dispose();
    }

    private async Task<IConnection> ObtenerConexionAsync(CancellationToken cancelacion)
    {
        if (_conexion is { IsOpen: true })
        {
            return _conexion;
        }

        await _candado.WaitAsync(cancelacion).ConfigureAwait(false);
        try
        {
            if (_conexion is { IsOpen: true })
            {
                return _conexion;
            }

            var cadena = configuracion.GetConnectionString("rabbitmq")
                ?? throw new InvalidOperationException("Falta la cadena de conexión 'ConnectionStrings:rabbitmq'.");
            var fabrica = new ConnectionFactory
            {
                Uri = new Uri(cadena),
                ClientProvidedName = opciones.Value.Servicio,
                AutomaticRecoveryEnabled = true,
            };
            _conexion = await fabrica.CreateConnectionAsync(cancelacion).ConfigureAwait(false);
            return _conexion;
        }
        finally
        {
            _candado.Release();
        }
    }
}
