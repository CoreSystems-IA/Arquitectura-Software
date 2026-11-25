-- =============================================================================
-- Modelo físico de datos de July · PostgreSQL 16
-- ID: DAT-02 · Versión 1.0 · 2026-11-12 · Borrador
-- Deriva de: DAT-01 (modelo-de-datos-july.md), CLS-01 (diccionario de datos),
--            LIN-01 (linaje de datos) y REV-01, sección 5 (decisiones de datos).
--
-- Convenciones:
--   * Cada tabla y cada columna nueva cita su origen: la clase o el atributo de
--     CLS-01, o la brecha B-NN de LIN-01 que resuelve.
--   * Dinero NUMERIC(14,2); tasas NUMERIC(7,4) como fracción (0.1600 = 16 %).
--   * Los datos personales de identidad se cifran en la aplicación (AES-256, llaves
--     en un KMS, SAD-02); la base guarda el texto cifrado (BYTEA) y, para buscar,
--     un índice ciego HMAC-SHA256 (columnas *_indice).
--   * Los inserts en evento se hacen con aislamiento READ COMMITTED (ver trigger).
--
-- Uso:  psql -v ON_ERROR_STOP=1 -f modelo-de-datos-july.sql
-- =============================================================================

BEGIN;

CREATE SCHEMA july;
SET search_path TO july;

-- -----------------------------------------------------------------------------
-- 1. Enumeraciones (CLS-01, sección 3)
--    TipoPublicacion, TipoPlazo y CampoSolicitud son parámetros de métodos y no se
--    guardan; las cuatro últimas son nuevas y salen de LIN-01.
-- -----------------------------------------------------------------------------
CREATE TYPE tipo_canal                AS ENUM ('WHATSAPP', 'WEB');
CREATE TYPE emisor                    AS ENUM ('PROSPECTO', 'JULY', 'ASESOR', 'COLABORADOR');
CREATE TYPE tipo_mensaje              AS ENUM ('TEXTO', 'AUDIO', 'IMAGEN', 'PLANTILLA', 'AVISO');
CREATE TYPE estado_conversacion       AS ENUM ('ACTIVA', 'EN_COLA', 'DERIVADA', 'ABANDONADA', 'CERRADA');
CREATE TYPE condicion_socio           AS ENUM ('SOCIO', 'NO_SOCIO', 'POR_VERIFICAR');
CREATE TYPE rol_colaborador           AS ENUM ('MARKETING', 'ADMINISTRADOR', 'PRODUCTOS_CREDITO', 'COMITE_CREDITO',
                                               'JEFE_COMERCIAL', 'AGENCIA', 'PROTECCION_DATOS', 'ASESOR');
CREATE TYPE estado_lead               AS ENUM ('NUEVO', 'EN_CAPTURA', 'PRECALIFICADO', 'ASIGNADO', 'EN_GESTION',
                                               'DESEMBOLSADO', 'PERDIDO');
CREATE TYPE prioridad                 AS ENUM ('CALIENTE', 'TIBIO', 'FRIO');
CREATE TYPE estado_solicitud          AS ENUM ('EN_CAPTURA', 'CONFIRMADA', 'EN_RESOLUCION', 'APROBADA', 'NEGADA');
CREATE TYPE resultado_precalificacion AS ENUM ('APTO', 'NO_APTO', 'A_REVISAR');
CREATE TYPE estado_cita               AS ENUM ('RESERVADA', 'CONFIRMADA', 'REPROGRAMADA', 'ATENDIDA');
CREATE TYPE tipo_plantilla            AS ENUM ('BIENVENIDA', 'AVISO_PRIVACIDAD', 'MENU', 'MENU_BASICO',
                                               'PREGUNTA_FRECUENTE', 'RETOMA', 'RECORDATORIO', 'REACTIVACION');
CREATE TYPE tipo_regla                AS ENUM ('PRECALIFICACION', 'PRIORIDAD', 'ENRUTAMIENTO');
-- Nuevas (LIN-01)
CREATE TYPE origen_dato               AS ENUM ('DECLARADO', 'CORE', 'VERIFICADO_AGENCIA');           -- B-01
CREATE TYPE origen_simulacion         AS ENUM ('SOLICITADA', 'COMPARADA', 'SUGERIDA');               -- 2.2.1.1, 2.2.1.3, 2.3.2.1
CREATE TYPE tipo_requisito            AS ENUM ('LINEA', 'AFILIACION');                               -- LineaCredito.requisitos y requisitosAfiliacion
CREATE TYPE tipo_agente               AS ENUM ('PROSPECTO', 'JULY', 'COLABORADOR', 'CANAL',
                                               'SISTEMA_CORE', 'CRM', 'TEMPORIZADOR');               -- B-03 (agente PROV)

-- -----------------------------------------------------------------------------
-- 2. Personas de la cooperativa (DD-7)
-- -----------------------------------------------------------------------------
CREATE TABLE agencia (                                         -- B-10: catálogo de Colaborador.agencia y Cita.agencia
    codigo          VARCHAR(10)  PRIMARY KEY,
    nombre          VARCHAR(120) NOT NULL,
    activa          BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE colaborador (                                     -- CLS-01 Colaborador
    id_colaborador  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre          VARCHAR(150)    NOT NULL,
    rol             rol_colaborador NOT NULL,
    agencia_codigo  VARCHAR(10)     REFERENCES agencia (codigo),
    correo          VARCHAR(254)    NOT NULL UNIQUE,
    CONSTRAINT uq_colaborador_rol UNIQUE (id_colaborador, rol),
    CONSTRAINT ck_colaborador_agencia CHECK (rol NOT IN ('ASESOR', 'AGENCIA') OR agencia_codigo IS NOT NULL)
);

CREATE TABLE asesor_comercial (                                -- CLS-01 AsesorComercial (generalización, relación 13)
    id_colaborador  UUID            PRIMARY KEY,
    rol             rol_colaborador NOT NULL DEFAULT 'ASESOR' CHECK (rol = 'ASESOR'),
    disponible      BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_asesor_colaborador FOREIGN KEY (id_colaborador, rol)
        REFERENCES colaborador (id_colaborador, rol) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 3. Configuración publicada por versiones (DD-6)
--    Una fila por versión; un índice único parcial deja una sola versión vigente.
--    Una versión publicada es inmutable: solo cambia su vigencia (trigger, sección 8).
-- -----------------------------------------------------------------------------
CREATE TABLE linea_credito (                                   -- identidad de la línea (CLS-01 LineaCredito.codigo)
    codigo          VARCHAR(20)  PRIMARY KEY
);

CREATE TABLE linea_credito_version (                           -- CLS-01 LineaCredito + Configuracion
    id_linea_version UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    linea_codigo     VARCHAR(20)   NOT NULL REFERENCES linea_credito (codigo),
    version          VARCHAR(20)   NOT NULL,
    vigente          BOOLEAN       NOT NULL DEFAULT FALSE,
    publicado_por    UUID          NOT NULL REFERENCES colaborador (id_colaborador),
    publicado_en     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    nombre           VARCHAR(120)  NOT NULL,
    tasa             NUMERIC(7,4)  NOT NULL CHECK (tasa >= 0 AND tasa < 1),
    monto_minimo     NUMERIC(14,2) NOT NULL CHECK (monto_minimo > 0),
    monto_maximo     NUMERIC(14,2) NOT NULL,
    seguro_tasa_mensual NUMERIC(7,4)  NOT NULL DEFAULT 0 CHECK (seguro_tasa_mensual >= 0),  -- B-05
    cargos_fijos        NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (cargos_fijos >= 0),         -- B-05
    CONSTRAINT uq_linea_version UNIQUE (linea_codigo, version),
    CONSTRAINT ck_linea_montos CHECK (monto_maximo >= monto_minimo)
);
CREATE UNIQUE INDEX ux_linea_vigente ON linea_credito_version (linea_codigo) WHERE vigente;

CREATE TABLE linea_plazo (                                     -- LineaCredito.plazos
    id_linea_version UUID     NOT NULL REFERENCES linea_credito_version (id_linea_version) ON DELETE CASCADE,
    plazo_meses      SMALLINT NOT NULL CHECK (plazo_meses > 0),
    PRIMARY KEY (id_linea_version, plazo_meses)
);

CREATE TABLE linea_palabra_clave (                             -- LineaCredito.palabrasClave
    id_linea_version UUID        NOT NULL REFERENCES linea_credito_version (id_linea_version) ON DELETE CASCADE,
    palabra          VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_linea_version, palabra)
);

CREATE TABLE linea_requisito (                                 -- LineaCredito.requisitos y requisitosAfiliacion
    id_linea_version UUID           NOT NULL REFERENCES linea_credito_version (id_linea_version) ON DELETE CASCADE,
    tipo             tipo_requisito NOT NULL,
    orden            SMALLINT       NOT NULL CHECK (orden > 0),
    descripcion      VARCHAR(200)   NOT NULL,
    PRIMARY KEY (id_linea_version, tipo, orden)
);

CREATE TABLE plantilla_mensaje (                               -- CLS-01 PlantillaMensaje + Configuracion
    id_plantilla        UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo                tipo_plantilla NOT NULL,
    clave               VARCHAR(120)   NOT NULL DEFAULT '',     -- '' salvo en PREGUNTA_FRECUENTE
    version             VARCHAR(20)    NOT NULL,
    vigente             BOOLEAN        NOT NULL DEFAULT FALSE,
    publicado_por       UUID           NOT NULL REFERENCES colaborador (id_colaborador),
    publicado_en        TIMESTAMPTZ    NOT NULL DEFAULT now(),
    texto               TEXT           NOT NULL,
    plantilla_proveedor VARCHAR(120),
    CONSTRAINT uq_plantilla_version UNIQUE (tipo, clave, version),
    CONSTRAINT uq_plantilla_tipo UNIQUE (id_plantilla, tipo),
    CONSTRAINT ck_plantilla_proveedor CHECK (tipo NOT IN ('RETOMA', 'RECORDATORIO', 'REACTIVACION')
                                             OR plantilla_proveedor IS NOT NULL)
);
CREATE UNIQUE INDEX ux_plantilla_vigente ON plantilla_mensaje (tipo, clave) WHERE vigente;

CREATE TABLE plantilla_opcion (                                -- PlantillaMensaje.opciones
    id_plantilla UUID         NOT NULL REFERENCES plantilla_mensaje (id_plantilla) ON DELETE CASCADE,
    orden        SMALLINT     NOT NULL CHECK (orden > 0),
    texto        VARCHAR(120) NOT NULL,
    PRIMARY KEY (id_plantilla, orden)
);

CREATE TABLE regla_negocio (                                   -- CLS-01 ReglaNegocio + Configuracion
    id_regla      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo          tipo_regla  NOT NULL,
    version       VARCHAR(20) NOT NULL,
    vigente       BOOLEAN     NOT NULL DEFAULT FALSE,
    publicado_por UUID        NOT NULL REFERENCES colaborador (id_colaborador),
    publicado_en  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_regla_version UNIQUE (tipo, version),
    CONSTRAINT uq_regla_tipo UNIQUE (id_regla, tipo)
);
CREATE UNIQUE INDEX ux_regla_vigente ON regla_negocio (tipo) WHERE vigente;

CREATE TABLE regla_parametro (                                 -- ReglaNegocio.parametros (Map<String, String>)
    id_regla UUID         NOT NULL REFERENCES regla_negocio (id_regla) ON DELETE CASCADE,
    clave    VARCHAR(60)  NOT NULL,
    valor    VARCHAR(200) NOT NULL,
    PRIMARY KEY (id_regla, clave)
);

CREATE TABLE campana (                                         -- B-06: catálogo de campañas del Equipo de marketing
    codigo        VARCHAR(60)  PRIMARY KEY,
    nombre        VARCHAR(150) NOT NULL,
    inicio        DATE,
    fin           DATE,
    vigente       BOOLEAN      NOT NULL DEFAULT TRUE,
    publicado_por UUID         NOT NULL REFERENCES colaborador (id_colaborador),
    CONSTRAINT ck_campana_fechas CHECK (fin IS NULL OR inicio IS NULL OR fin >= inicio)
);

CREATE TABLE asesor_linea (                                    -- AsesorComercial.productos
    id_asesor    UUID        NOT NULL REFERENCES asesor_comercial (id_colaborador) ON DELETE CASCADE,
    linea_codigo VARCHAR(20) NOT NULL REFERENCES linea_credito (codigo),
    PRIMARY KEY (id_asesor, linea_codigo)
);

-- -----------------------------------------------------------------------------
-- 4. Identidad y consentimiento (DD-2)
-- -----------------------------------------------------------------------------
CREATE TABLE prospecto (                                       -- CLS-01 Prospecto
    id_prospecto            UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    nombres_cifrado         BYTEA,
    nombres_origen          origen_dato,                        -- B-01
    cedula_cifrada          BYTEA,
    cedula_indice           BYTEA,                              -- HMAC-SHA256 para buscar sin descifrar
    cedula_origen           origen_dato,                        -- B-01
    telefono_cifrado        BYTEA,
    telefono_indice         BYTEA,
    telefono_origen         origen_dato,                        -- B-01 (WhatsApp llega como DECLARADO por el canal)
    correo_cifrado          BYTEA,
    correo_origen           origen_dato,                        -- B-01
    condicion_socio         condicion_socio NOT NULL DEFAULT 'POR_VERIFICAR',
    fecha_ingreso_socio     DATE,
    edad                    SMALLINT        CHECK (edad BETWEEN 0 AND 120),
    actividad_registrada    VARCHAR(150),
    socio_consultado_en     TIMESTAMPTZ,                        -- LIN-01 F-04: última respuesta del core
    consentimiento_aceptado BOOLEAN         NOT NULL DEFAULT FALSE,
    id_aviso_privacidad     UUID,                               -- versionAviso como versión publicada (B-02)
    tipo_aviso              tipo_plantilla  NOT NULL DEFAULT 'AVISO_PRIVACIDAD' CHECK (tipo_aviso = 'AVISO_PRIVACIDAD'),
    fecha_consentimiento    TIMESTAMPTZ,
    creado_en               TIMESTAMPTZ     NOT NULL DEFAULT now(),
    CONSTRAINT fk_prospecto_aviso FOREIGN KEY (id_aviso_privacidad, tipo_aviso)
        REFERENCES plantilla_mensaje (id_plantilla, tipo),
    CONSTRAINT ck_prospecto_nombres  CHECK ((nombres_cifrado  IS NULL) = (nombres_origen  IS NULL)),
    CONSTRAINT ck_prospecto_cedula   CHECK ((cedula_cifrada   IS NULL) = (cedula_origen   IS NULL)
                                            AND (cedula_cifrada IS NULL) = (cedula_indice IS NULL)),
    CONSTRAINT ck_prospecto_telefono CHECK ((telefono_cifrado IS NULL) = (telefono_origen IS NULL)
                                            AND (telefono_cifrado IS NULL) = (telefono_indice IS NULL)),
    CONSTRAINT ck_prospecto_correo   CHECK ((correo_cifrado   IS NULL) = (correo_origen   IS NULL)),
    CONSTRAINT ck_prospecto_consentimiento CHECK (NOT consentimiento_aceptado
                                            OR (id_aviso_privacidad IS NOT NULL AND fecha_consentimiento IS NOT NULL)),
    CONSTRAINT ck_prospecto_socio CHECK (condicion_socio = 'SOCIO' OR fecha_ingreso_socio IS NULL)
);
CREATE INDEX ix_prospecto_cedula   ON prospecto (cedula_indice)   WHERE cedula_indice   IS NOT NULL;
CREATE INDEX ix_prospecto_telefono ON prospecto (telefono_indice) WHERE telefono_indice IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 5. Interacción (DD-1)
-- -----------------------------------------------------------------------------
CREATE TABLE conversacion (                                    -- CLS-01 Conversacion
    id_conversacion        UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    id_prospecto           UUID                NOT NULL REFERENCES prospecto (id_prospecto),
    canal                  tipo_canal          NOT NULL,
    campana_etiqueta       VARCHAR(120),                        -- B-06: valor tal como llegó del enlace o la página
    campana_codigo         VARCHAR(60)         REFERENCES campana (codigo),  -- B-06: campaña reconocida; null = directo o desconocida
    token_sesion_hash      BYTEA,                               -- Conversacion.tokenSesion (solo su huella)
    estado                 estado_conversacion NOT NULL DEFAULT 'ACTIVA',
    ultimo_paso            VARCHAR(12)         NOT NULL DEFAULT '1·5',
    fecha_ultima_actividad TIMESTAMPTZ         NOT NULL DEFAULT now(),
    id_asesor_asignado     UUID                REFERENCES asesor_comercial (id_colaborador),
    abierta_en             TIMESTAMPTZ         NOT NULL DEFAULT now(),
    CONSTRAINT uq_conversacion_prospecto UNIQUE (id_conversacion, id_prospecto),
    CONSTRAINT ck_conversacion_token CHECK (canal = 'WEB' OR token_sesion_hash IS NULL),
    CONSTRAINT ck_conversacion_derivada CHECK (estado <> 'DERIVADA' OR id_asesor_asignado IS NOT NULL),
    CONSTRAINT ck_conversacion_campana CHECK (campana_codigo IS NULL OR campana_etiqueta IS NOT NULL)
);
CREATE INDEX ix_conversacion_prospecto ON conversacion (id_prospecto);
CREATE INDEX ix_conversacion_abandono  ON conversacion (fecha_ultima_actividad) WHERE estado = 'ACTIVA';

CREATE TABLE mensaje (                                         -- CLS-01 Mensaje (composición, relación 1)
    id_mensaje             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    id_conversacion        UUID         NOT NULL REFERENCES conversacion (id_conversacion) ON DELETE CASCADE,
    id_externo             VARCHAR(128),
    emisor                 emisor       NOT NULL,
    id_colaborador_emisor  UUID         REFERENCES colaborador (id_colaborador),   -- LIN-01 F-07, F-09, F-10
    id_colaborador_destino UUID         REFERENCES colaborador (id_colaborador),   -- LIN-01 D-02, D-04 a D-08; null = al prospecto
    tipo                   tipo_mensaje NOT NULL,
    contenido              TEXT         NOT NULL DEFAULT '',
    fecha_hora             TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT ck_mensaje_emisor CHECK ((emisor IN ('ASESOR', 'COLABORADOR')) = (id_colaborador_emisor IS NOT NULL))
);
CREATE UNIQUE INDEX ux_mensaje_id_externo ON mensaje (id_externo) WHERE id_externo IS NOT NULL;   -- PC-02
CREATE INDEX ix_mensaje_historial ON mensaje (id_conversacion, fecha_hora);

CREATE TABLE mensaje_opcion (                                  -- Mensaje.opciones
    id_mensaje UUID         NOT NULL REFERENCES mensaje (id_mensaje) ON DELETE CASCADE,
    orden      SMALLINT     NOT NULL CHECK (orden > 0),
    texto      VARCHAR(120) NOT NULL,
    PRIMARY KEY (id_mensaje, orden)
);

CREATE TABLE mensaje_adjunto (                                 -- Mensaje.adjuntos
    id_mensaje UUID          NOT NULL REFERENCES mensaje (id_mensaje) ON DELETE CASCADE,
    orden      SMALLINT      NOT NULL CHECK (orden > 0),
    url        VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id_mensaje, orden)
);

-- -----------------------------------------------------------------------------
-- 6. Oportunidad, solicitud y evaluación (DD-3, DD-4)
-- -----------------------------------------------------------------------------
CREATE TABLE lead (                                            -- CLS-01 Lead
    id_lead               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_seguimiento    VARCHAR(20) NOT NULL UNIQUE,
    id_prospecto          UUID        NOT NULL,
    id_conversacion       UUID        NOT NULL UNIQUE,          -- relación 8: 0..1 — 1
    linea_codigo          VARCHAR(20) NOT NULL REFERENCES linea_credito (codigo),
    necesidad             TEXT        NOT NULL,
    prioridad             prioridad,
    id_regla_prioridad    UUID,                                 -- B-02
    tipo_regla_prioridad  tipo_regla  NOT NULL DEFAULT 'PRIORIDAD' CHECK (tipo_regla_prioridad = 'PRIORIDAD'),
    estado                estado_lead NOT NULL DEFAULT 'NUEVO',
    id_asesor             UUID        REFERENCES asesor_comercial (id_colaborador),
    id_regla_enrutamiento UUID,                                 -- B-02
    tipo_regla_enrutamiento tipo_regla NOT NULL DEFAULT 'ENRUTAMIENTO' CHECK (tipo_regla_enrutamiento = 'ENRUTAMIENTO'),
    fecha_asignacion      TIMESTAMPTZ,
    intentos_reactivacion SMALLINT    NOT NULL DEFAULT 0 CHECK (intentos_reactivacion >= 0),
    id_crm                VARCHAR(64) UNIQUE,
    crm_sincronizado_en   TIMESTAMPTZ,                          -- LIN-01 D-03: último envío exitoso al CRM
    motivo_cierre         VARCHAR(300),
    fecha_registro        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_lead_conversacion FOREIGN KEY (id_conversacion, id_prospecto)
        REFERENCES conversacion (id_conversacion, id_prospecto),
    CONSTRAINT fk_lead_regla_prioridad FOREIGN KEY (id_regla_prioridad, tipo_regla_prioridad)
        REFERENCES regla_negocio (id_regla, tipo),
    CONSTRAINT fk_lead_regla_enrutamiento FOREIGN KEY (id_regla_enrutamiento, tipo_regla_enrutamiento)
        REFERENCES regla_negocio (id_regla, tipo),
    CONSTRAINT ck_lead_prioridad CHECK ((prioridad IS NULL) = (id_regla_prioridad IS NULL)),
    CONSTRAINT ck_lead_asignacion CHECK ((id_asesor IS NULL) = (fecha_asignacion IS NULL)
                                         AND (id_asesor IS NULL) = (id_regla_enrutamiento IS NULL)),
    CONSTRAINT ck_lead_estado_asesor CHECK (estado NOT IN ('ASIGNADO', 'EN_GESTION') OR id_asesor IS NOT NULL),
    CONSTRAINT ck_lead_motivo CHECK (estado <> 'PERDIDO' OR motivo_cierre IS NOT NULL),          -- PC-15
    CONSTRAINT ck_lead_crm CHECK (crm_sincronizado_en IS NULL OR id_crm IS NOT NULL)
);
CREATE INDEX ix_lead_prospecto ON lead (id_prospecto);
CREATE INDEX ix_lead_asesor    ON lead (id_asesor, estado) WHERE id_asesor IS NOT NULL;
CREATE INDEX ix_lead_estado    ON lead (estado);
CREATE INDEX ix_lead_pendiente_crm ON lead (fecha_registro) WHERE id_crm IS NULL AND estado <> 'NUEVO';  -- PC-13

CREATE TABLE solicitud_credito (                               -- CLS-01 SolicitudCredito (composición, relación 2)
    id_solicitud           UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
    id_lead                UUID             NOT NULL UNIQUE REFERENCES lead (id_lead) ON DELETE CASCADE,
    monto                  NUMERIC(14,2)    CHECK (monto > 0),
    plazo                  SMALLINT         CHECK (plazo > 0),
    destino                VARCHAR(300),
    ingresos_mensuales     NUMERIC(14,2)    CHECK (ingresos_mensuales >= 0),
    ingresos_origen        origen_dato,                         -- B-01
    actividad_economica    VARCHAR(150),
    actividad_origen       origen_dato,                         -- B-01
    estado                 estado_solicitud NOT NULL DEFAULT 'EN_CAPTURA',
    id_simulacion_elegida  UUID,                                -- FK compuesta, sección 6 (después de simulacion)
    resultado              resultado_precalificacion,
    capacidad_pago         NUMERIC(14,2)    CHECK (capacidad_pago >= 0),
    resultado_condicionado BOOLEAN          NOT NULL DEFAULT FALSE,
    id_regla_precalificacion UUID,                              -- B-02
    tipo_regla_precalificacion tipo_regla   NOT NULL DEFAULT 'PRECALIFICACION'
                                            CHECK (tipo_regla_precalificacion = 'PRECALIFICACION'),
    precalificado_en       TIMESTAMPTZ,
    numero_caso_revision   VARCHAR(20)      UNIQUE,
    creada_en              TIMESTAMPTZ      NOT NULL DEFAULT now(),
    CONSTRAINT fk_solicitud_regla FOREIGN KEY (id_regla_precalificacion, tipo_regla_precalificacion)
        REFERENCES regla_negocio (id_regla, tipo),
    CONSTRAINT ck_solicitud_ingresos  CHECK ((ingresos_mensuales  IS NULL) = (ingresos_origen  IS NULL)),
    CONSTRAINT ck_solicitud_actividad CHECK ((actividad_economica IS NULL) = (actividad_origen IS NULL)),
    CONSTRAINT ck_solicitud_completa CHECK (estado = 'EN_CAPTURA'                                   -- PC-08
        OR (monto IS NOT NULL AND plazo IS NOT NULL AND destino IS NOT NULL
            AND ingresos_mensuales IS NOT NULL AND actividad_economica IS NOT NULL)),
    CONSTRAINT ck_solicitud_precalificacion CHECK (resultado IS NULL
        OR (capacidad_pago IS NOT NULL AND id_simulacion_elegida IS NOT NULL
            AND id_regla_precalificacion IS NOT NULL AND precalificado_en IS NOT NULL)),
    CONSTRAINT ck_solicitud_resolucion CHECK (estado NOT IN ('EN_RESOLUCION', 'APROBADA', 'NEGADA')
                                             OR resultado IN ('APTO', 'A_REVISAR'))
);

CREATE TABLE solicitud_factor (                                -- SolicitudCredito.factores
    id_solicitud UUID         NOT NULL REFERENCES solicitud_credito (id_solicitud) ON DELETE CASCADE,
    orden        SMALLINT     NOT NULL CHECK (orden > 0),
    descripcion  VARCHAR(300) NOT NULL,
    PRIMARY KEY (id_solicitud, orden)
);

CREATE TABLE solicitud_documento (                             -- SolicitudCredito.documentosRecibidos
    id_solicitud   UUID         NOT NULL REFERENCES solicitud_credito (id_solicitud) ON DELETE CASCADE,
    documento      VARCHAR(150) NOT NULL,
    recibido_en    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    registrado_por UUID         NOT NULL REFERENCES colaborador (id_colaborador),   -- LIN-01 F-10
    PRIMARY KEY (id_solicitud, documento)
);

CREATE TABLE simulacion (                                      -- CLS-01 Simulacion (composición, relación 3)
    id_simulacion    UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
    id_solicitud     UUID              NOT NULL REFERENCES solicitud_credito (id_solicitud) ON DELETE CASCADE,
    id_linea_version UUID              NOT NULL REFERENCES linea_credito_version (id_linea_version),   -- B-02
    origen           origen_simulacion NOT NULL,
    monto            NUMERIC(14,2)     NOT NULL CHECK (monto > 0),
    plazo            SMALLINT          NOT NULL CHECK (plazo > 0),
    tasa             NUMERIC(7,4)      NOT NULL CHECK (tasa >= 0 AND tasa < 1),
    cuota_mensual    NUMERIC(14,2)     NOT NULL CHECK (cuota_mensual > 0),
    intereses        NUMERIC(14,2)     NOT NULL CHECK (intereses >= 0),
    seguros          NUMERIC(14,2)     NOT NULL DEFAULT 0 CHECK (seguros >= 0),
    cargos           NUMERIC(14,2)     NOT NULL DEFAULT 0 CHECK (cargos >= 0),
    total_pagar      NUMERIC(14,2)     NOT NULL,
    calculada_en     TIMESTAMPTZ       NOT NULL DEFAULT now(),
    CONSTRAINT uq_simulacion_solicitud UNIQUE (id_simulacion, id_solicitud),
    CONSTRAINT ck_simulacion_total CHECK (total_pagar = monto + intereses + seguros + cargos)
);
CREATE INDEX ix_simulacion_solicitud ON simulacion (id_solicitud);

-- Relación 11: la simulación elegida es una de las de la misma solicitud.
ALTER TABLE solicitud_credito
    ADD CONSTRAINT fk_solicitud_simulacion_elegida FOREIGN KEY (id_simulacion_elegida, id_solicitud)
        REFERENCES simulacion (id_simulacion, id_solicitud);

-- -----------------------------------------------------------------------------
-- 7. Agenda (DD-5)
-- -----------------------------------------------------------------------------
CREATE TABLE cita (                                            -- CLS-01 Cita (composición, relación 4)
    id_cita            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    id_lead            UUID        NOT NULL REFERENCES lead (id_lead) ON DELETE CASCADE,
    agencia_codigo     VARCHAR(10) NOT NULL REFERENCES agencia (codigo),
    fecha_hora         TIMESTAMPTZ NOT NULL,
    estado             estado_cita NOT NULL DEFAULT 'RESERVADA',
    fecha_recordatorio TIMESTAMPTZ,
    reservada_en       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_cita_recordatorio CHECK (fecha_recordatorio IS NULL OR fecha_recordatorio < fecha_hora)
);
CREATE INDEX ix_cita_lead         ON cita (id_lead);
CREATE INDEX ix_cita_recordatorio ON cita (fecha_recordatorio) WHERE fecha_recordatorio IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 8. Bitácora de linaje (B-03, B-04) e inmutabilidad
-- -----------------------------------------------------------------------------
CREATE TABLE evento (
    id_evento         BIGINT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    secuencia         BIGINT       NOT NULL UNIQUE,             -- orden de la cadena (lo asigna el trigger)
    ocurrido_en       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    entidad           VARCHAR(40)  NOT NULL,                    -- clase de CLS-01
    id_entidad        UUID         NOT NULL,
    atributo          VARCHAR(60)  NOT NULL,                    -- atributo de CLS-01
    valor_anterior    TEXT,                                     -- enmascarado si el dato es personal
    valor_nuevo       TEXT,
    metodo            VARCHAR(80)  NOT NULL,                    -- método de CLS-01
    paso              VARCHAR(12),                              -- paso de CU-08, p. ej. «2·68»
    capacidad         VARCHAR(10)  NOT NULL,                    -- capacidad de nivel 3 de CAP-03
    agente_tipo       tipo_agente  NOT NULL,
    id_colaborador    UUID         REFERENCES colaborador (id_colaborador),
    id_mensaje_origen UUID,                                     -- B-04; sin FK: la bitácora sobrevive a la supresión del mensaje
    hash_anterior     BYTEA,
    hash              BYTEA        NOT NULL,
    CONSTRAINT ck_evento_colaborador CHECK ((agente_tipo = 'COLABORADOR') = (id_colaborador IS NOT NULL)),
    CONSTRAINT ck_evento_capacidad CHECK (capacidad ~ '^[1-3]\.[1-3]\.[1-2]\.[1-3]$')
);
CREATE INDEX ix_evento_entidad ON evento (entidad, id_entidad, ocurrido_en);

CREATE FUNCTION fn_evento_hash(e evento) RETURNS BYTEA
LANGUAGE sql STABLE AS $$
    SELECT sha256(convert_to(concat_ws('|',
        coalesce(encode(e.hash_anterior, 'hex'), ''),
        e.secuencia::text,
        to_char(e.ocurrido_en AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US'),
        e.entidad, e.id_entidad::text, e.atributo,
        coalesce(e.valor_anterior, ''), coalesce(e.valor_nuevo, ''),
        e.metodo, coalesce(e.paso, ''), e.capacidad, e.agente_tipo::text,
        coalesce(e.id_colaborador::text, ''), coalesce(e.id_mensaje_origen::text, '')), 'UTF8'))
$$;

CREATE FUNCTION fn_evento_encadenar() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    PERFORM pg_advisory_xact_lock(hashtext('july.evento'));
    SELECT e.secuencia + 1, e.hash INTO NEW.secuencia, NEW.hash_anterior
      FROM evento e ORDER BY e.secuencia DESC LIMIT 1;
    NEW.secuencia := coalesce(NEW.secuencia, 1);
    NEW.hash := fn_evento_hash(NEW);
    RETURN NEW;
END $$;

CREATE FUNCTION fn_evento_inalterable() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    RAISE EXCEPTION 'La bitácora de eventos es de solo inserción (%)', TG_OP;
END $$;

CREATE TRIGGER tg_evento_encadenar BEFORE INSERT ON evento
    FOR EACH ROW EXECUTE FUNCTION fn_evento_encadenar();
CREATE TRIGGER tg_evento_inalterable BEFORE UPDATE OR DELETE ON evento
    FOR EACH ROW EXECUTE FUNCTION fn_evento_inalterable();
CREATE TRIGGER tg_evento_sin_truncate BEFORE TRUNCATE ON evento
    FOR EACH STATEMENT EXECUTE FUNCTION fn_evento_inalterable();

-- Devuelve los eventos cuya huella o cuyo encadenamiento no cuadran (vacío = íntegra).
CREATE FUNCTION fn_evento_verificar() RETURNS TABLE (secuencia BIGINT, problema TEXT)
LANGUAGE sql STABLE AS $$
    SELECT e.secuencia,
           CASE WHEN e.hash <> fn_evento_hash(e) THEN 'huella alterada' ELSE 'cadena rota' END
      FROM evento e
      LEFT JOIN evento p ON p.secuencia = e.secuencia - 1
     WHERE e.hash <> fn_evento_hash(e)
        OR e.hash_anterior IS DISTINCT FROM p.hash
     ORDER BY e.secuencia
$$;

-- Configuración publicada: solo cambia la vigencia; no se borra.
CREATE FUNCTION fn_configuracion_inmutable() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        RAISE EXCEPTION 'Una versión publicada no se borra; se publica otra (%)', TG_TABLE_NAME;
    END IF;
    IF (to_jsonb(NEW) - 'vigente') IS DISTINCT FROM (to_jsonb(OLD) - 'vigente') THEN
        RAISE EXCEPTION 'De una versión publicada solo cambia la vigencia (%)', TG_TABLE_NAME;
    END IF;
    RETURN NEW;
END $$;

CREATE TRIGGER tg_linea_inmutable BEFORE UPDATE OR DELETE ON linea_credito_version
    FOR EACH ROW EXECUTE FUNCTION fn_configuracion_inmutable();
CREATE TRIGGER tg_plantilla_inmutable BEFORE UPDATE OR DELETE ON plantilla_mensaje
    FOR EACH ROW EXECUTE FUNCTION fn_configuracion_inmutable();
CREATE TRIGGER tg_regla_inmutable BEFORE UPDATE OR DELETE ON regla_negocio
    FOR EACH ROW EXECUTE FUNCTION fn_configuracion_inmutable();

-- -----------------------------------------------------------------------------
-- 9. Vistas (datos derivados que CLS-01 no guarda)
-- -----------------------------------------------------------------------------
CREATE VIEW v_asesor_carga AS                                  -- AsesorComercial./cargaActual
SELECT a.id_colaborador, c.nombre, c.agencia_codigo, a.disponible,
       count(l.id_lead) FILTER (WHERE l.estado IN ('ASIGNADO', 'EN_GESTION')) AS carga_actual
  FROM asesor_comercial a
  JOIN colaborador c ON c.id_colaborador = a.id_colaborador
  LEFT JOIN lead l ON l.id_asesor = a.id_colaborador
 GROUP BY a.id_colaborador, c.nombre, c.agencia_codigo, a.disponible;

CREATE VIEW v_linea_vigente AS                                 -- lo que devuelve consultarPublicacion(CATALOGO)
SELECT v.linea_codigo, v.id_linea_version, v.version, v.nombre, v.tasa, v.monto_minimo, v.monto_maximo,
       v.seguro_tasa_mensual, v.cargos_fijos,
       (SELECT array_agg(p.plazo_meses ORDER BY p.plazo_meses) FROM linea_plazo p
         WHERE p.id_linea_version = v.id_linea_version) AS plazos,
       (SELECT array_agg(r.descripcion ORDER BY r.orden) FROM linea_requisito r
         WHERE r.id_linea_version = v.id_linea_version AND r.tipo = 'LINEA') AS requisitos,
       (SELECT array_agg(r.descripcion ORDER BY r.orden) FROM linea_requisito r
         WHERE r.id_linea_version = v.id_linea_version AND r.tipo = 'AFILIACION') AS requisitos_afiliacion
  FROM linea_credito_version v
 WHERE v.vigente;

CREATE VIEW v_regla_vigente AS                                 -- consultarPublicacion(PRECALIFICACION | PRIORIDAD | ENRUTAMIENTO)
SELECT r.tipo, r.id_regla, r.version,
       coalesce(jsonb_object_agg(p.clave, p.valor) FILTER (WHERE p.clave IS NOT NULL), '{}'::jsonb) AS parametros
  FROM regla_negocio r
  LEFT JOIN regla_parametro p ON p.id_regla = r.id_regla
 WHERE r.vigente
 GROUP BY r.tipo, r.id_regla, r.version;

CREATE VIEW v_ficha_lead AS                                    -- Lead.generarFicha() sin los datos cifrados (B-01, B-02, B-06, B-07)
SELECT l.id_lead, l.numero_seguimiento, l.estado, l.prioridad, l.linea_codigo, l.necesidad,
       c.canal, c.campana_codigo, c.campana_etiqueta,
       p.id_prospecto, p.condicion_socio, p.edad, p.actividad_registrada,
       p.nombres_origen, p.cedula_origen, p.telefono_origen, p.correo_origen,
       s.monto, s.plazo, s.destino,
       s.ingresos_mensuales, s.ingresos_origen, s.actividad_economica, s.actividad_origen,
       s.resultado, s.capacidad_pago, s.resultado_condicionado, s.numero_caso_revision,
       rp.version  AS version_reglas_precalificacion,
       sim.tasa, sim.cuota_mensual, sim.total_pagar,
       lv.version  AS version_linea,
       (SELECT array_agg(f.descripcion ORDER BY f.orden) FROM solicitud_factor f
         WHERE f.id_solicitud = s.id_solicitud) AS factores,
       (SELECT min(ci.fecha_hora) FROM cita ci
         WHERE ci.id_lead = l.id_lead AND ci.estado <> 'ATENDIDA') AS proxima_cita,
       (array_remove(ARRAY[
            CASE WHEN p.nombres_origen  IS NULL THEN 'nombres'  END,
            CASE WHEN p.cedula_origen   IS NULL THEN 'cedula'   END,
            CASE WHEN p.telefono_origen IS NULL THEN 'telefono' END,
            CASE WHEN p.correo_origen   IS NULL THEN 'correo'   END,
            CASE WHEN s.id_simulacion_elegida IS NULL THEN 'simulacion' END], NULL)) AS datos_faltantes   -- PC-14
  FROM lead l
  JOIN conversacion c          ON c.id_conversacion = l.id_conversacion
  JOIN prospecto p             ON p.id_prospecto = l.id_prospecto
  LEFT JOIN solicitud_credito s ON s.id_lead = l.id_lead
  LEFT JOIN simulacion sim     ON sim.id_simulacion = s.id_simulacion_elegida
  LEFT JOIN linea_credito_version lv ON lv.id_linea_version = sim.id_linea_version
  LEFT JOIN regla_negocio rp   ON rp.id_regla = s.id_regla_precalificacion;

-- -----------------------------------------------------------------------------
-- 10. Comentarios de linaje (se consultan con \d+ en psql)
-- -----------------------------------------------------------------------------
COMMENT ON SCHEMA july IS 'Modelo físico de July (DAT-02). Lógico y linaje: DAT-01 y LIN-01.';
COMMENT ON TABLE prospecto         IS 'CLS-01 Prospecto · DD-2 · crea 1.1.2.1 (1·5); identidad 1.2.2.2 y 2.1.1.1; consentimiento 1.2.1.2';
COMMENT ON TABLE conversacion      IS 'CLS-01 Conversacion · DD-1 · crea 1.1.2.1 (1·5); origen 1.1.1.3; avance 2.1.2.2';
COMMENT ON TABLE mensaje           IS 'CLS-01 Mensaje · DD-1 · todo intercambio; idempotencia por id_externo (PC-02)';
COMMENT ON TABLE lead              IS 'CLS-01 Lead · DD-3 · crea 1.2.2.3 (1·32); se actualiza en 10 capacidades (LIN-01 §8)';
COMMENT ON TABLE solicitud_credito IS 'CLS-01 SolicitudCredito · DD-4 · crea 2.1.1.3 (2·2); precalifica 2.3.1.x (2·68)';
COMMENT ON TABLE simulacion        IS 'CLS-01 Simulacion · DD-4 · crea 2.2.1.1, 2.2.1.3 y 2.3.2.1';
COMMENT ON TABLE cita              IS 'CLS-01 Cita · DD-5 · crea 2.3.2.3 (2·82); seguimiento 3.2.2.1 y 3.2.2.2';
COMMENT ON TABLE evento            IS 'LIN-01 B-03 y B-04 · bitácora de solo inserción encadenada por huella SHA-256';
COMMENT ON COLUMN prospecto.cedula_indice IS 'Índice ciego HMAC-SHA256 de la cédula normalizada; la llave vive en el KMS (SAD-02)';
COMMENT ON COLUMN lead.id_regla_prioridad IS 'B-02: versión del criterio del Jefe comercial que produjo la prioridad';
COMMENT ON COLUMN solicitud_credito.id_regla_precalificacion IS 'B-02: versión de la regla del Comité que produjo el resultado';
COMMENT ON COLUMN simulacion.id_linea_version IS 'B-02: versión del catálogo de la que se copió la tasa';

COMMIT;
