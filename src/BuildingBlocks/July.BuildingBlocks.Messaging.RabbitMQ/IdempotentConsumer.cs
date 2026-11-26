using System.Text.Json;
using July.BuildingBlocks.Core.Messaging;
using July.BuildingBlocks.Persistence.Oracle;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace July.BuildingBlocks.Messaging.RabbitMQ;

/// <summary>
/// Consumidor de un evento de integración. Cada servicio declara su cola (<c>servicio.evento</c>) y la
/// enlaza a la clave del evento. El efecto y la marca en el inbox se guardan en la misma transacción,
/// así que una entrega repetida no se procesa dos veces.
/// </summary>
public abstract class IdempotentConsumer<TEvento, TContexto>(
    IServiceScopeFactory alcances,
    ConexionRabbitMq conexion,
    IOptions<OpcionesRabbitMq> opciones,
    ILogger registro
) : BackgroundService
    where TEvento : IntegrationEvent
    where TContexto : JulyDbContext
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    /// <summary>Clave de enrutamiento a la que se suscribe (la misma que publica el emisor).</summary>
    protected abstract string ClaveEnrutamiento { get; }

    private string Consumidor => $"{opciones.Value.Servicio}.{ClaveEnrutamiento}";

    /// <summary>Aplica el efecto del evento. No llama a <c>SaveChangesAsync</c>: lo hace la clase base.</summary>
    protected abstract Task ProcesarAsync(
        TEvento evento,
        TContexto contexto,
        IServiceProvider servicios,
        CancellationToken cancelacion
    );

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = opciones.Value;
        var canal = await conexion.AbrirCanalAsync(confirmaciones: false, stoppingToken).ConfigureAwait(false);
        await canal
            .ExchangeDeclareAsync(
                config.Exchange,
                ExchangeType.Topic,
                durable: true,
                autoDelete: false,
                cancellationToken: stoppingToken
            )
            .ConfigureAwait(false);
        await canal
            .QueueDeclareAsync(
                Consumidor,
                durable: true,
                exclusive: false,
                autoDelete: false,
                cancellationToken: stoppingToken
            )
            .ConfigureAwait(false);
        await canal
            .QueueBindAsync(Consumidor, config.Exchange, ClaveEnrutamiento, cancellationToken: stoppingToken)
            .ConfigureAwait(false);
        await canal.BasicQosAsync(0, 10, global: false, stoppingToken).ConfigureAwait(false);

        var consumidor = new AsyncEventingBasicConsumer(canal);
        consumidor.ReceivedAsync += (_, entrega) => RecibirAsync(canal, entrega, stoppingToken);
        await canal.BasicConsumeAsync(Consumidor, autoAck: false, consumidor, stoppingToken).ConfigureAwait(false);

        try
        {
            await Task.Delay(Timeout.Infinite, stoppingToken).ConfigureAwait(false);
        }
        catch (OperationCanceledException)
        {
            await canal.CloseAsync(CancellationToken.None).ConfigureAwait(false);
            await canal.DisposeAsync().ConfigureAwait(false);
        }
    }

    private async Task RecibirAsync(IChannel canal, BasicDeliverEventArgs entrega, CancellationToken cancelacion)
    {
        try
        {
            var evento = JsonSerializer.Deserialize<TEvento>(entrega.Body.Span, Json)
                ?? throw new InvalidOperationException("El evento llegó vacío.");

            await using var alcance = alcances.CreateAsyncScope();
            var contexto = alcance.ServiceProvider.GetRequiredService<TContexto>();
            if (!await contexto.YaProcesadoAsync(evento.Id, Consumidor, cancelacion).ConfigureAwait(false))
            {
                await ProcesarAsync(evento, contexto, alcance.ServiceProvider, cancelacion).ConfigureAwait(false);
                contexto.MarcarProcesado(evento.Id, Consumidor);
                await contexto.SaveChangesAsync(cancelacion).ConfigureAwait(false);
            }

            await canal.BasicAckAsync(entrega.DeliveryTag, multiple: false, cancelacion).ConfigureAwait(false);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            Registros.FalloConsumo(registro, Consumidor, entrega.BasicProperties.MessageId, ex);
            // Sin reencolar: la cola de mensajes fallidos se configura con la política de RabbitMQ (deployments/configs/rabbitmq).
            await canal
                .BasicNackAsync(entrega.DeliveryTag, multiple: false, requeue: false, cancelacion)
                .ConfigureAwait(false);
        }
    }
}
