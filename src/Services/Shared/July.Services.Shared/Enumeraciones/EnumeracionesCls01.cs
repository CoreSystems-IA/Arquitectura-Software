namespace July.Services.Shared.Enumeraciones;

// Enumeraciones de CLS-01 (diccionario de datos, sección 3). Los nombres en C# van en PascalCase;
// el valor de CLS-01 y de DAT-02 se conserva en [ValorCls] para serializar y para la base de datos.

/// <summary>Canal por el que llega el prospecto.</summary>
public enum TipoCanal
{
    [ValorCls("WHATSAPP")]
    Whatsapp,

    [ValorCls("WEB")]
    Web,
}

/// <summary>Quién escribe un mensaje de la conversación.</summary>
public enum Emisor
{
    [ValorCls("PROSPECTO")]
    Prospecto,

    [ValorCls("JULY")]
    July,

    [ValorCls("ASESOR")]
    Asesor,

    [ValorCls("COLABORADOR")]
    Colaborador,
}

/// <summary>Forma del mensaje.</summary>
public enum TipoMensaje
{
    [ValorCls("TEXTO")]
    Texto,

    [ValorCls("AUDIO")]
    Audio,

    [ValorCls("IMAGEN")]
    Imagen,

    [ValorCls("PLANTILLA")]
    Plantilla,

    [ValorCls("AVISO")]
    Aviso,
}

/// <summary>Estado de la conversación.</summary>
public enum EstadoConversacion
{
    [ValorCls("ACTIVA")]
    Activa,

    [ValorCls("EN_COLA")]
    EnCola,

    [ValorCls("DERIVADA")]
    Derivada,

    [ValorCls("ABANDONADA")]
    Abandonada,

    [ValorCls("CERRADA")]
    Cerrada,
}

/// <summary>Si el prospecto ya es socio de la cooperativa.</summary>
public enum CondicionSocio
{
    [ValorCls("SOCIO")]
    Socio,

    [ValorCls("NO_SOCIO")]
    NoSocio,

    [ValorCls("POR_VERIFICAR")]
    PorVerificar,
}

/// <summary>Los 8 roles del panel de la cooperativa; cada uno es un rol del JWT interno.</summary>
public enum RolColaborador
{
    [ValorCls("MARKETING")]
    Marketing,

    [ValorCls("ADMINISTRADOR")]
    Administrador,

    [ValorCls("PRODUCTOS_CREDITO")]
    ProductosCredito,

    [ValorCls("COMITE_CREDITO")]
    ComiteCredito,

    [ValorCls("JEFE_COMERCIAL")]
    JefeComercial,

    [ValorCls("AGENCIA")]
    Agencia,

    [ValorCls("PROTECCION_DATOS")]
    ProteccionDatos,

    [ValorCls("ASESOR")]
    Asesor,
}

/// <summary>Qué publica un colaborador desde el panel (parámetro, no se guarda).</summary>
public enum TipoPublicacion
{
    [ValorCls("BIENVENIDA")]
    Bienvenida,

    [ValorCls("MENU")]
    Menu,

    [ValorCls("MENU_BASICO")]
    MenuBasico,

    [ValorCls("CATALOGO")]
    Catalogo,

    [ValorCls("PRECALIFICACION")]
    Precalificacion,

    [ValorCls("PRIORIDAD")]
    Prioridad,

    [ValorCls("ENRUTAMIENTO")]
    Enrutamiento,
}

/// <summary>Plazo que vigila el temporizador (parámetro, no se guarda).</summary>
public enum TipoPlazo
{
    [ValorCls("RESPUESTA_PROSPECTO")]
    RespuestaProspecto,

    [ValorCls("ATENCION_ASESOR")]
    AtencionAsesor,

    [ValorCls("RECORDATORIO")]
    Recordatorio,
}

/// <summary>Estado del lead; las transiciones están en CLS-01, sección 3.</summary>
public enum EstadoLead
{
    [ValorCls("NUEVO")]
    Nuevo,

    [ValorCls("EN_CAPTURA")]
    EnCaptura,

    [ValorCls("PRECALIFICADO")]
    Precalificado,

    [ValorCls("ASIGNADO")]
    Asignado,

    [ValorCls("EN_GESTION")]
    EnGestion,

    [ValorCls("DESEMBOLSADO")]
    Desembolsado,

    [ValorCls("PERDIDO")]
    Perdido,
}

/// <summary>Prioridad del lead.</summary>
public enum Prioridad
{
    [ValorCls("CALIENTE")]
    Caliente,

    [ValorCls("TIBIO")]
    Tibio,

    [ValorCls("FRIO")]
    Frio,
}

/// <summary>Dato de la solicitud que July captura (parámetro de RegistrarDato).</summary>
public enum CampoSolicitud
{
    [ValorCls("MONTO")]
    Monto,

    [ValorCls("PLAZO")]
    Plazo,

    [ValorCls("DESTINO")]
    Destino,

    [ValorCls("NOMBRES")]
    Nombres,

    [ValorCls("CEDULA")]
    Cedula,

    [ValorCls("CORREO")]
    Correo,

    [ValorCls("TELEFONO")]
    Telefono,

    [ValorCls("INGRESOS_MENSUALES")]
    IngresosMensuales,

    [ValorCls("ACTIVIDAD_ECONOMICA")]
    ActividadEconomica,
}

/// <summary>Estado de la solicitud de crédito.</summary>
public enum EstadoSolicitud
{
    [ValorCls("EN_CAPTURA")]
    EnCaptura,

    [ValorCls("CONFIRMADA")]
    Confirmada,

    [ValorCls("EN_RESOLUCION")]
    EnResolucion,

    [ValorCls("APROBADA")]
    Aprobada,

    [ValorCls("NEGADA")]
    Negada,
}

/// <summary>Resultado de la precalificación.</summary>
public enum ResultadoPrecalificacion
{
    [ValorCls("APTO")]
    Apto,

    [ValorCls("NO_APTO")]
    NoApto,

    [ValorCls("A_REVISAR")]
    ARevisar,
}

/// <summary>Estado de la cita en la agencia.</summary>
public enum EstadoCita
{
    [ValorCls("RESERVADA")]
    Reservada,

    [ValorCls("CONFIRMADA")]
    Confirmada,

    [ValorCls("REPROGRAMADA")]
    Reprogramada,

    [ValorCls("ATENDIDA")]
    Atendida,
}

/// <summary>Tipo de plantilla de mensaje.</summary>
public enum TipoPlantilla
{
    [ValorCls("BIENVENIDA")]
    Bienvenida,

    [ValorCls("AVISO_PRIVACIDAD")]
    AvisoPrivacidad,

    [ValorCls("MENU")]
    Menu,

    [ValorCls("MENU_BASICO")]
    MenuBasico,

    [ValorCls("PREGUNTA_FRECUENTE")]
    PreguntaFrecuente,

    [ValorCls("RETOMA")]
    Retoma,

    [ValorCls("RECORDATORIO")]
    Recordatorio,

    [ValorCls("REACTIVACION")]
    Reactivacion,
}

/// <summary>Tipo de regla de negocio.</summary>
public enum TipoRegla
{
    [ValorCls("PRECALIFICACION")]
    Precalificacion,

    [ValorCls("PRIORIDAD")]
    Prioridad,

    [ValorCls("ENRUTAMIENTO")]
    Enrutamiento,
}
