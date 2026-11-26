namespace July.BuildingBlocks.Messaging.RabbitMQ;

/// <summary>Configuración de la sección <c>RabbitMq</c> de cada servicio.</summary>
public sealed class OpcionesRabbitMq
{
    public const string Seccion = "RabbitMq";

    /// <summary>Exchange de tipo topic común a todos los eventos de July.</summary>
    public string Exchange { get; set; } = "july.eventos";

    /// <summary>Nombre del servicio que publica o consume (por ejemplo <c>ms06-solicitud</c>).</summary>
    public string Servicio { get; set; } = string.Empty;

    /// <summary>Cada cuánto revisa el outbox el publicador.</summary>
    public TimeSpan IntervaloOutbox { get; set; } = TimeSpan.FromSeconds(2);

    /// <summary>Eventos por lote del outbox.</summary>
    public int TamanoLote { get; set; } = 50;

    /// <summary>Intentos antes de dejar el evento para revisión manual (queda en el outbox con su error).</summary>
    public int MaximoIntentos { get; set; } = 10;
}
