namespace July.BuildingBlocks.Persistence.Oracle.Outbox;

/// <summary>
/// Evento pendiente de publicar. Se guarda en la misma transacción que el cambio de estado que lo
/// produce, en la tabla <c>outbox</c> del esquema del servicio, y lo publica <c>OutboxDispatcher</c>.
/// </summary>
public sealed class OutboxMessage
{
    public Guid Id { get; init; }

    public required string Tipo { get; init; }

    public required string ClaveEnrutamiento { get; init; }

    public required string Contenido { get; init; }

    public string? Traceparent { get; init; }

    public DateTimeOffset OcurridoEn { get; init; }

    public DateTimeOffset? PublicadoEn { get; set; }

    public int Intentos { get; set; }

    public string? UltimoError { get; set; }
}
