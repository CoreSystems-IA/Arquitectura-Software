namespace July.Services.Shared.Recursos;

/// <summary>
/// Nombres de los recursos que registra el AppHost de Aspire y que cada servicio usa como nombre de su
/// cadena de conexión, de su imagen y de su chart (SAD-07, sección 6). Un solo lugar para no escribirlos
/// de memoria (lección L-09).
/// </summary>
public static class NombresRecursos
{
    public const string Oracle = "oracle";
    public const string RabbitMq = "rabbitmq";
    public const string Redis = "redis";

    /// <summary>Esquemas de Oracle, uno por servicio con estado. MS-03 no tiene esquema.</summary>
    public static class Esquemas
    {
        public const string Ms01 = "ms01";
        public const string Ms02 = "ms02";
        public const string Ms04 = "ms04";
        public const string Ms05 = "ms05";
        public const string Ms06 = "ms06";
        public const string Ms07 = "ms07";
        public const string Ms08 = "ms08";
        public const string Ms09 = "ms09";
        public const string Ms10 = "ms10";
        public const string Ms11 = "ms11";
        public const string Ms12 = "ms12";
        public const string Ms13 = "ms13";
        public const string Ms14 = "ms14";
        public const string Quartz = "quartz";
    }

    /// <summary>Nombre del desplegable: imagen, chart y recurso de Aspire.</summary>
    public static class Servicios
    {
        public const string Ms01Canales = "ms01-canales";
        public const string Ms02Conversacion = "ms02-conversacion";
        public const string Ms03Comprension = "ms03-comprension";
        public const string Ms04Prospectos = "ms04-prospectos";
        public const string Ms05Leads = "ms05-leads";
        public const string Ms06Solicitud = "ms06-solicitud";
        public const string Ms07Simulacion = "ms07-simulacion";
        public const string Ms08Catalogo = "ms08-catalogo";
        public const string Ms09Precalificacion = "ms09-precalificacion";
        public const string Ms10Agenda = "ms10-agenda";
        public const string Ms11Entrega = "ms11-entrega";
        public const string Ms12Asignacion = "ms12-asignacion";
        public const string Ms13Notificaciones = "ms13-notificaciones";
        public const string Ms14Auditoria = "ms14-auditoria";
        public const string BffPanel = "bff-panel";
    }
}
