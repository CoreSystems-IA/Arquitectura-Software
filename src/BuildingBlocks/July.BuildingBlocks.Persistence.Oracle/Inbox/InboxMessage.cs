namespace July.BuildingBlocks.Persistence.Oracle.Inbox;

/// <summary>
/// Evento ya procesado por un consumidor. La clave (evento, consumidor) hace idempotente el consumo:
/// si RabbitMQ entrega dos veces el mismo evento, el segundo intento no cambia nada.
/// </summary>
public sealed class InboxMessage
{
    public Guid EventoId { get; init; }

    public required string Consumidor { get; init; }

    public DateTimeOffset ProcesadoEn { get; init; }
}
