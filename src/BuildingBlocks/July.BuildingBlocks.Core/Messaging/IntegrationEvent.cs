namespace July.BuildingBlocks.Core.Messaging;

/// <summary>
/// Evento de integración entre microservicios (SAD-06, sección 6). Los eventos concretos viven en
/// <c>July.Services.Shared</c>, en el espacio de nombres del servicio que los publica, y se describen
/// en <c>src/Contracts/asyncapi/</c>.
/// </summary>
public abstract record IntegrationEvent
{
    /// <summary>Identificador único; el consumidor lo usa para descartar duplicados (inbox).</summary>
    public Guid Id { get; init; } = Guid.CreateVersion7();

    public DateTimeOffset OcurridoEn { get; init; } = DateTimeOffset.UtcNow;

    /// <summary>Cabecera W3C <c>traceparent</c> del paso que originó el evento (trazabilidad de MS-14).</summary>
    public string? Traceparent { get; init; }

    /// <summary>Clave de enrutamiento en RabbitMQ: <c>msNN.nombre-del-evento</c>.</summary>
    public abstract string ClaveEnrutamiento { get; }
}

/// <summary>Publica eventos. En los servicios, la implementación escribe en el outbox, no en RabbitMQ.</summary>
public interface IEventPublisher
{
    Task PublishAsync(IntegrationEvent evento, CancellationToken cancelacion);
}
