using Microsoft.Extensions.Logging;

namespace July.BuildingBlocks.Messaging.RabbitMQ;

/// <summary>Mensajes de registro de la mensajería. Nunca incluyen el contenido del evento (datos personales).</summary>
internal static partial class Registros
{
    [LoggerMessage(Level = LogLevel.Warning, Message = "No se pudo publicar el evento {EventoId} (intento {Intento}).")]
    public static partial void FalloPublicacion(ILogger registro, Guid eventoId, int intento, Exception ex);

    [LoggerMessage(Level = LogLevel.Error, Message = "{Consumidor} no pudo procesar el evento {EventoId}.")]
    public static partial void FalloConsumo(ILogger registro, string consumidor, string? eventoId, Exception ex);
}
