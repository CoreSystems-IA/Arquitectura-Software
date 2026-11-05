# Diccionario de datos — etapa 3

| Campo | Valor |
|---|---|
| **ID** | CLS-01 |
| **Versión** | 3.1 |
| **Fecha** | 2026-11-04 |
| **Deriva de** | [DOM-01 · Modelo de dominio](../04-modelo-de-dominio/modelo-de-dominio-etapa3.drawio) y [CU-08 · Especificaciones de casos de uso](../03-especificacion-casos-de-uso/especificaciones-casos-de-uso.md) |
| **Estado** | Borrador |

Diccionario de datos del asistente July (Cooperativa Padre Julián Lorente): 17 clases, 53 métodos y 39 relaciones. Cada clase es un concepto del modelo de dominio o una clase del sistema; cada método es el verbo de un paso de CU-08, en la clase de su receptor; y cada relación sale de una pareja sujeto → receptor o de un concepto del dominio. La tabla de resumen está al final ([ir](#7-tabla-de-resumen)).

## Contenido

1. [Criterios](#1-criterios)
2. [Convenciones](#2-convenciones)
3. [Enumeraciones](#3-enumeraciones)
4. [Diccionario por entidad](#4-diccionario-por-entidad)
5. [Relaciones](#5-relaciones)
6. [Trazabilidad con CU-08](#6-trazabilidad-con-cu-08)
7. [Tabla de resumen](#7-tabla-de-resumen)

## 1. Criterios

El diccionario no consolida ni traduce nombres: toma de CU-08 los métodos tal como están escritos en los pasos.

| # | Regla | Ejemplo en CU-08 | Queda como |
|---|---|---|---|
| 1 | **Las clases salen del dominio y de los participantes.** Cada concepto de DOM-01 es una clase «entidad»; July es «control»; WhatsApp Business API y el Widget web (una sola clase `Canal`), el Sistema core y el CRM son «interfaz». | «**July** registra el mensaje en formato común en la **Conversación**» | `Conversacion` |
| 2 | **El método es de la clase del receptor**, con el sustantivo como parámetro. | «**July** consulta la condición de socio del prospecto al **Sistema core**» | `SistemaCore.consultarSocio(prospecto)` |
| 3 | **Un retorno no es un método.** «**X** devuelve … a **Y**» es la salida del método del paso que lo llamó. | «**Sistema core** devuelve la condición de socio … a **July**» | Salida `CondicionSocio` de `consultarSocio()` |
| 4 | **Los verbos sinónimos son un solo método.** Escribir, notificar, entregar, aceptar, pedir o confirmar a July es siempre `July.atender(mensaje)`; responder, mostrar, avisar, informar u ofrecer a una persona es siempre `recibir(mensaje)`. | 33 pasos «… a **July**» de personas | `July.atender(mensaje)` |
| 5 | **Lo que comparten varias clases se generaliza solo si comparten datos.** `Configuracion` reúne lo que se publica por versiones (`LineaCredito`, `PlantillaMensaje`, `ReglaNegocio`) y `AsesorComercial` es un `Colaborador`. El prospecto y los colaboradores no comparten datos, así que cada uno tiene su propio `recibir(mensaje)`. | Las tres configuraciones tienen `version`, `vigente` y `publicadoPor` | `Configuracion` |
| 6 | **Un actor de configuración es un `Colaborador` con su rol.** Equipo de marketing, Administrador del asistente, Área de productos y crédito, Comité de crédito, Jefe comercial, Personal de agencia y Delegado de protección de datos son instancias de `Colaborador`; el Asesor comercial tiene clase propia porque el enrutamiento necesita su carga. | «**July** consulta las reglas de precalificación vigentes al **Comité de crédito**» | `Colaborador.consultarPublicacion(tipo)` |
| 7 | **Un sistema externo responde con el retorno de su método,** y sus fallas y reintentos quedan dentro de ese método. | Flujo 3, A3: el CRM falla tras los reintentos | `CRMCooperativa.sincronizarLead()` |
| 8 | **Lo que es 1 a 1 con otra clase es atributo suyo.** El consentimiento y la condición de socio son del `Prospecto`; la precalificación y el caso de revisión, de la `SolicitudCredito`; el origen y el token de sesión, de la `Conversacion`. | «**July** registra el consentimiento aceptado en el **Prospecto**» | `Prospecto.consentimientoAceptado` |
| 9 | **Cada pareja sujeto → receptor es una relación.** Si no hay ya una asociación o composición entre las dos clases, es una dependencia «llama» hacia la clase dueña del método. | `Prospecto` → `Canal` (flujo 1, paso 1) | Relación 24 |

Resultado: 17 clases (una abstracta), 53 métodos y 39 relaciones, para 183 llamadas y 99 retornos de CU-08. Frente a la versión 2.3 (15 clases y 55 métodos consolidados desde 46 entidades y 185 métodos), ya no hay tabla de conversión: la sección [6](#6-trazabilidad-con-cu-08) es la correspondencia 1:1 paso → método.

## 2. Convenciones

| Elemento | Convención |
|---|---|
| Clase | `PascalCase`, en singular. *Cursiva* en el diagrama = clase abstracta. |
| Atributo y método | `camelCase`. Los métodos empiezan con un verbo en infinitivo. |
| Tipos | `String`, `Integer`, `Decimal` (dinero y tasas), `Boolean`, `Date`, `DateTime`, `Duration`, `UUID`, `List<T>`, `Map<K, V>` y las enumeraciones de la sección 3. |
| `[0..1]` | Atributo opcional. Sin marca, el atributo es obligatorio. |
| `T \| null` | En una salida, el método puede devolver «no encontrado» o «sin error». En una entrada, el dato puede no venir. |
| `/atributo` | Atributo derivado: se calcula a partir de otros datos y no se guarda. |
| «estático» | El método crea la instancia o busca entre todas; no se llama sobre un objeto existente. |
| Atributo con tipo de clase | Es el extremo navegable de una relación de la sección 5. |
| Herencia | Una subclase hereda los atributos y métodos de su superclase; aquí cada clase lista solo los suyos. |

**Naturaleza** de cada clase, según los estereotipos de análisis de UML:

| Naturaleza | Significado | Clases |
|---|---|---|
| «entidad» | Guarda información del negocio que persiste más allá de una conversación. | `Prospecto`, `Colaborador`, `AsesorComercial`, `Conversacion`, `Mensaje`, `Lead`, `SolicitudCredito`, `Simulacion`, `Cita`, `Configuracion`, `LineaCredito`, `PlantillaMensaje`, `ReglaNegocio` |
| «control» | Coordina el flujo de los casos de uso; no guarda datos de negocio. | `July` |
| «interfaz» | Frontera con un sistema externo; se modela solo lo que July le pide. | `Canal`, `SistemaCore`, `CRMCooperativa` |

**Categoría** de cada clase, dentro de su naturaleza:

| Categoría | Significado |
|---|---|
| Control | El sistema que se diseña (July). Coordina, no guarda datos de negocio. |
| Entidad de negocio | Tiene identidad y ciclo de vida; se persiste. |
| Actor (entidad) | Persona que actúa en los casos de uso y de la que se guardan datos. |
| Configuración | La publica un colaborador por versiones; July solo la lee. |
| Sistema externo | Sistema fuera de July; se modela solo su interfaz. |

## 3. Enumeraciones

| Enumeración | Valores |
|---|---|
| `TipoCanal` | WHATSAPP, WEB |
| `Emisor` | PROSPECTO, JULY, ASESOR, COLABORADOR |
| `TipoMensaje` | TEXTO, AUDIO, IMAGEN, PLANTILLA, AVISO |
| `EstadoConversacion` | ACTIVA, EN_COLA, DERIVADA, ABANDONADA, CERRADA |
| `CondicionSocio` | SOCIO, NO_SOCIO, POR_VERIFICAR |
| `RolColaborador` | MARKETING, ADMINISTRADOR, PRODUCTOS_CREDITO, COMITE_CREDITO, JEFE_COMERCIAL, AGENCIA, PROTECCION_DATOS, ASESOR |
| `TipoPublicacion` | BIENVENIDA, MENU, MENU_BASICO, CATALOGO, PRECALIFICACION, PRIORIDAD, ENRUTAMIENTO |
| `TipoPlazo` | RESPUESTA_PROSPECTO, ATENCION_ASESOR, RECORDATORIO |
| `EstadoLead` | NUEVO, EN_CAPTURA, PRECALIFICADO, ASIGNADO, EN_GESTION, DESEMBOLSADO, PERDIDO |
| `Prioridad` | CALIENTE, TIBIO, FRIO |
| `CampoSolicitud` | MONTO, PLAZO, DESTINO, NOMBRES, CEDULA, CORREO, TELEFONO, INGRESOS_MENSUALES, ACTIVIDAD_ECONOMICA |
| `EstadoSolicitud` | EN_CAPTURA, CONFIRMADA, EN_RESOLUCION, APROBADA, NEGADA |
| `ResultadoPrecalificacion` | APTO, NO_APTO, A_REVISAR |
| `EstadoCita` | RESERVADA, CONFIRMADA, REPROGRAMADA, ATENDIDA |
| `TipoPlantilla` | BIENVENIDA, AVISO_PRIVACIDAD, MENU, MENU_BASICO, PREGUNTA_FRECUENTE, RETOMA, RECORDATORIO, REACTIVACION |
| `TipoRegla` | PRECALIFICACION, PRIORIDAD, ENRUTAMIENTO |

Los pasos se citan como «F*n*: paso», es decir, flujo *n* de CU-08 y número de paso.

**Transiciones de `EstadoLead`:**

| Estado | Lo fija | Pasos de CU-08 |
|---|---|---|
| NUEVO | `Lead.registrar()` | F1: 32, 30j |
| EN_CAPTURA | `SolicitudCredito.iniciar()` | F2: 2 |
| PRECALIFICADO | `SolicitudCredito.precalificar()` | F2: 68. Solo los APTO o A_REVISAR pasan al flujo 3. |
| ASIGNADO | `Lead.asignar()` | F3: 15, 19d |
| EN_GESTION | `Lead.aceptarAsignacion()` | F3: 19 |
| DESEMBOLSADO, PERDIDO | `Lead.actualizarEstado()` | F3: 51 |

Un lead NO_APTO se queda en PRECALIFICADO: recibe una alternativa (F2: 72l a 74l) y, si vuelve a simular, `precalificar()` lo clasifica de nuevo. También puede pedir la revisión con un asesor, que sigue el traspaso de la conversación (F1: 25f a 31f).

**Transiciones de `EstadoConversacion`:**

| Estado | Lo fija | Pasos de CU-08 |
|---|---|---|
| ACTIVA | `Conversacion.registrarMensaje()` al abrirla; `Conversacion.retomar()` la reactiva | F1: 5 · F2: 32e |
| EN_COLA | `Conversacion.encolar()`; vuelve a ACTIVA cuando July la atiende | F1: 11d |
| DERIVADA | `Conversacion.traspasar()` | F1: 28f · F3: 21 |
| ABANDONADA | `Conversacion.marcarAbandonada()` | F2: 25e |
| CERRADA | `Lead.actualizarEstado()`, al llevar el lead a DESEMBOLSADO o PERDIDO | F3: 51 |

**Transiciones de `EstadoSolicitud`:**

| Estado | Lo fija | Pasos de CU-08 |
|---|---|---|
| EN_CAPTURA | `SolicitudCredito.iniciar()` | F2: 2 |
| CONFIRMADA | `SolicitudCredito.actualizarEstado()` | F2: 32 |
| EN_RESOLUCION | `SolicitudCredito.actualizarEstado()` | F3: 43 |
| APROBADA, NEGADA | `SolicitudCredito.actualizarEstado()` | F3: 47 |

`derivarARevision()` no cambia el estado: la revisión de un caso A_REVISAR es preliminar y la solicitud sigue CONFIRMADA, con `resultado` = A_REVISAR y su `numeroCasoRevision`.

**Transiciones de `EstadoCita`.** RESERVADA: `Cita.reservar()` (F2: 82). CONFIRMADA: el prospecto confirmó su asistencia (F3: 33). REPROGRAMADA: `Cita.reprogramar()` (F3: 35g). ATENDIDA: la agencia atendió al prospecto (F3: 37).

## 4. Diccionario por entidad

### El asistente y los sistemas con los que habla

#### July

**Naturaleza:** «control» · **Categoría:** Control  
Asistente virtual de la cooperativa: el sistema que se diseña. Es el único punto de entrada de los mensajes y coordina a las entidades, a los canales y a los sistemas externos.

| Atributo | Tipo | Descripción |
|---|---|---|
| `capacidadMaxima` | `Integer` | Conversaciones que atiende a la vez; por encima, la conversación pasa a EN_COLA. |
| `tiempoRespuestaObjetivo` | `Duration` | Tiempo máximo de primera respuesta (2 minutos). |
| `tiempoAbandono` | `Duration` | Tiempo sin respuesta del prospecto tras el cual la conversación pasa a ABANDONADA. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `atender()` | `mensaje: Mensaje` | `void` | Recibe todo mensaje que llega a July (del canal, del prospecto, del asesor o de un colaborador) y lo enruta al paso del flujo que corresponde. Si la firma de un webhook es inválida, responde con el error de integración (flujo 1, A3). | F1: 2, 4a, 13, 19, 25, 29, 19e, 25f, 27f · F2: 1, 7, 15, 25, 31, 15a, 19b, 21c, 31d, 31e, 37, 43, 45, 49, 53, 57, 61, 45g, 61i, 63, 73, 77, 81 · F3: 18, 25, 32, 36, 40, 46, 50, 32g |
| `vencerPlazo()` | `plazo: TipoPlazo` | `void` | Lo dispara el vencimiento de un plazo sin respuesta: la respuesta del prospecto (abandono), la atención del asesor o el recordatorio de la cita. July sigue con el alternativo que corresponde. | F2: 24e · F3: 18d, 32e |

**Relaciones:**

- **Dependencia** «llama» desde `Prospecto` (relación 21): `atender()`: el prospecto escribe a July.
- **Dependencia** «llama» desde `Colaborador` (relación 22): `atender()`: el asesor y los colaboradores escriben a July.
- **Dependencia** «llama» desde `Canal` (relación 23): `atender()`: el canal notifica cada mensaje entrante.
- **Dependencia** «llama» hacia `Canal` (relación 25): `verificarAutenticidad()`, `enviar()`.
- **Dependencia** «llama» hacia `Prospecto` (relación 29): `recibir()`, `registrarConsentimiento()`.
- **Dependencia** «llama» hacia `Colaborador` (relación 30): `recibir()`, `consultarPublicacion()`, `consultarAgenda()`.
- **Dependencia** «llama» hacia `Conversacion` (relación 31): Registra, etiqueta, encola, guarda, retoma y traspasa la conversación.
- **Dependencia** «llama» hacia `Lead` (relación 32): Registra, prioriza, asigna, vincula, reactiva y cierra el lead.
- **Dependencia** «llama» hacia `SolicitudCredito` (relación 33): Captura, confirma, precalifica y resuelve la solicitud.
- **Dependencia** «llama» hacia `Simulacion` (relación 34): Calcula, compara, elige y sugiere simulaciones.
- **Dependencia** «llama» hacia `Cita` (relación 35): Reserva, reprograma y actualiza la cita.
- **Dependencia** «llama» hacia `LineaCredito` (relación 36): Busca la línea, valida condiciones y pide requisitos.
- **Dependencia** «llama» hacia `PlantillaMensaje` (relación 37): Compone plantillas y busca preguntas frecuentes.
- **Dependencia** «llama» hacia `SistemaCore` (relación 38): `validarCedula()`, `consultarSocio()`.
- **Dependencia** «llama» hacia `CRMCooperativa` (relación 39): `buscarLead()`, `sincronizarLead()`.

#### Canal

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
Canal digital por el que entra y sale la conversación: WhatsApp Business API o el widget web. Convierte el formato de cada proveedor al formato común de `Mensaje`.

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoCanal` | WHATSAPP o WEB. |
| `credencial` | `String` | Clave de firma del webhook (WhatsApp) o secreto de sesión (web). |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `recibir()` | `mensaje: Mensaje` | `void` | Recibe lo que el prospecto escribe en WhatsApp o en el widget y lo notifica a July con su firma o su token. | F1: 1, 3a |
| `verificarAutenticidad()` | `mensaje: Mensaje` | `Boolean` | Comprueba la firma del webhook o el token de la sesión web del mensaje. Si es falsa, July lo rechaza. | F1: 3, 5a |
| `enviar()` | `mensaje: Mensaje` | `void` | Entrega al prospecto un mensaje de July o una plantilla aprobada (retoma, recordatorio, reactivación). | F1: 11, 13d · F2: 29e · F3: 30, 37e |
| `abrirSesion()` | `paginaOrigen: String` | `String` | Solo web: abre la sesión de chat desde una página del sitio y devuelve el token. | F1: 1a |

**Relaciones:**

- **Dependencia** «llama» hacia `July` (relación 23): `atender()`: el canal notifica cada mensaje entrante.
- **Dependencia** «llama» desde `Prospecto` (relación 24): `recibir()`, `abrirSesion()`: el prospecto escribe por WhatsApp o el widget.
- **Dependencia** «llama» desde `July` (relación 25): `verificarAutenticidad()`, `enviar()`.
- **Dependencia** «llama» hacia `Prospecto` (relación 26): `recibir()`: el canal entrega al prospecto lo que envía July.

#### SistemaCore

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
Sistema transaccional de la cooperativa: fuente oficial de socios y de identidad.

| Atributo | Tipo | Descripción |
|---|---|---|
| `urlServicio` | `String` | Dirección del servicio. |
| `tiempoMaximoRespuesta` | `Duration` | Pasado este tiempo, la consulta se da por fallida y el socio queda POR_VERIFICAR. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `validarCedula()` | `cedula: String` | `Boolean` | Verifica que la cédula exista y esté habilitada. | F2: 18 |
| `consultarSocio()` | `prospecto: Prospecto` | `CondicionSocio` | Busca al socio por la cédula o, si aún no la hay, por el teléfono. Si hay registro, completa en el prospecto sus datos registrados (nombres, cédula, correo, fecha de ingreso, edad y actividad) y devuelve SOCIO; sin registro devuelve NO_SOCIO; si no responde a tiempo, POR_VERIFICAR. | F1: 30 · F2: 66 |

**Relaciones:**

- **Dependencia** «usa» hacia `Prospecto` (relación 19): Completa los datos registrados del socio.
- **Dependencia** «llama» desde `July` (relación 38): `validarCedula()`, `consultarSocio()`.

#### CRMCooperativa

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
CRM comercial donde se registra el lead y se gestiona el embudo de ventas.

| Atributo | Tipo | Descripción |
|---|---|---|
| `urlServicio` | `String` | Dirección de la API. |
| `maxIntentos` | `Integer` | Intentos con espera progresiva antes de devolver el error de integración. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `buscarLead()` | `cedula: String, telefono: String` | `String \| null` | Busca un registro previo del lead y devuelve su idCRM, o null. | F3: 7 |
| `sincronizarLead()` | `lead: Lead` | `String` | Crea el lead si no tiene idCRM o lo actualiza si ya existe (datos, ficha y estado final). Reintenta con espera progresiva hasta `maxIntentos` y devuelve el idCRM o el error de integración. | F3: 9, 53 |

**Relaciones:**

- **Dependencia** «usa» hacia `Lead` (relación 20): Crea y actualiza el lead.
- **Dependencia** «llama» desde `July` (relación 39): `buscarLead()`, `sincronizarLead()`.

### Personas

#### Prospecto

**Naturaleza:** «entidad» · **Categoría:** Actor (entidad)  
Persona que contacta a la cooperativa. Guarda su identidad, su condición de socio y su consentimiento de datos. Se crea con el primer mensaje, cuando solo se conoce el canal y, por WhatsApp, el teléfono; los datos de identidad llegan en el flujo 2, por eso son opcionales.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idProspecto` | `UUID` | Identificador interno. |
| `nombres` | `String [0..1]` | Nombres y apellidos. |
| `cedula` | `String [0..1]` | 10 dígitos con dígito verificador válido. |
| `telefono` | `String [0..1]` | 10 dígitos que empiezan con 09. Llega con el primer mensaje por WhatsApp; por la web, en el flujo 2. |
| `correo` | `String [0..1]` | Correo con formato válido. |
| `condicionSocio` | `CondicionSocio` | SOCIO, NO_SOCIO o POR_VERIFICAR. Empieza en POR_VERIFICAR hasta que responde el core. |
| `fechaIngresoSocio` | `Date [0..1]` | Fecha de afiliación, si es socio. |
| `edad` | `Integer [0..1]` | Edad registrada en el core. |
| `actividadRegistrada` | `String [0..1]` | Actividad económica registrada en el core (la declarada va en `SolicitudCredito.actividadEconomica`). |
| `consentimientoAceptado` | `Boolean` | Si aceptó el aviso de privacidad; false hasta que responde. |
| `versionAviso` | `String [0..1]` | Versión del aviso que aceptó o rechazó. |
| `fechaConsentimiento` | `DateTime [0..1]` | Momento de la respuesta al aviso. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `recibir()` | `mensaje: Mensaje` | `void` | Recibe un mensaje de July, del canal o del asesor: respuestas, preguntas, menús, plantillas y avisos. | F1: 12, 14d, 18, 24, 28, 34, 24e, 31f, 28g, 28h · F2: 6, 14, 24, 30, 36, 14a, 18b, 20c, 30e, 42, 44, 48, 52, 56, 60, 62, 42f, 60h, 72, 76, 80, 86, 74k, 74l, 82n · F3: 23, 31, 38e, 37g |
| `registrarConsentimiento()` | `aceptado: Boolean, versionAviso: String` | `void` | Guarda la aceptación o el rechazo del aviso con su versión. También registra el retiro del consentimiento (regla R2). | F1: 20, 20e |

**Relaciones:**

- **Asociación** (* — 1) desde `Conversacion` (relación 5): Con quién se conversa.
- **Asociación** (* — 1) desde `Lead` (relación 7): Prospecto interesado.
- **Dependencia** «usa» desde `SistemaCore` (relación 19): Completa los datos registrados del socio.
- **Dependencia** «llama» hacia `July` (relación 21): `atender()`: el prospecto escribe a July.
- **Dependencia** «llama» hacia `Canal` (relación 24): `recibir()`, `abrirSesion()`: el prospecto escribe por WhatsApp o el widget.
- **Dependencia** «llama» desde `Canal` (relación 26): `recibir()`: el canal entrega al prospecto lo que envía July.
- **Dependencia** «llama» hacia `Colaborador` (relación 27): `recibir()`: el prospecto escribe al asesor tras el traspaso.
- **Dependencia** «llama» desde `Colaborador` (relación 28): `recibir()`: el asesor saluda al prospecto tras el traspaso.
- **Dependencia** «llama» desde `July` (relación 29): `recibir()`, `registrarConsentimiento()`.

#### Colaborador

**Naturaleza:** «entidad» · **Categoría:** Actor (entidad)  
Persona de la cooperativa que participa en los flujos: publica configuración (guiones, catálogo, reglas, agenda), recibe avisos y registra la atención o la resolución. Su rol dice cuál de los actores de CU-06 es.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idColaborador` | `UUID` | Identificador interno. |
| `nombre` | `String` | Nombre completo. |
| `rol` | `RolColaborador` | Qué actor es: marketing, administrador, productos y crédito, comité, jefe comercial, agencia, protección de datos o asesor. |
| `agencia` | `String [0..1]` | Código de la agencia donde trabaja (asesores y personal de agencia; el mismo que usa `Cita.agencia`). |
| `correo` | `String` | Correo por el que recibe los avisos cuando no está en el panel. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `recibir()` | `mensaje: Mensaje` | `void` | Recibe un mensaje: los avisos de July, la derivación al asesor y lo que escribe el prospecto tras el traspaso. | F1: 9, 26f, 30f · F2: 84, 72k · F3: 11c, 17, 24, 35, 39, 45, 49, 55, 21d, 37f |
| `consultarPublicacion()` | `tipo: TipoPublicacion` | `List<Configuracion>` | Devuelve la versión vigente de lo que publicó: guion o menú (Administrador), catálogo de líneas (Área de productos y crédito), reglas de precalificación (Comité de crédito), criterios de prioridad o reglas de enrutamiento (Jefe comercial). | F1: 14, 22, 22e · F2: 54, 64 · F3: 1, 13 |
| `consultarAgenda()` | `agencia: String, desde: Date, hasta: Date` | `List<DateTime>` | Solo Personal de agencia: devuelve los horarios libres de la agenda en el rango. Una lista vacía significa sin disponibilidad; ampliar el rango da las fechas más cercanas. | F2: 78, 80n · F3: 33g |

**Relaciones:**

- **Asociación** (* — 1) desde `Configuracion` (relación 12): Colaborador que publica la línea, la plantilla o la regla.
- **Generalización** desde `AsesorComercial` (relación 13): El asesor es un colaborador.
- **Dependencia** «llama» hacia `July` (relación 22): `atender()`: el asesor y los colaboradores escriben a July.
- **Dependencia** «llama» desde `Prospecto` (relación 27): `recibir()`: el prospecto escribe al asesor tras el traspaso.
- **Dependencia** «llama» hacia `Prospecto` (relación 28): `recibir()`: el asesor saluda al prospecto tras el traspaso.
- **Dependencia** «llama» desde `July` (relación 30): `recibir()`, `consultarPublicacion()`, `consultarAgenda()`.

#### AsesorComercial

**Naturaleza:** «entidad» · **Categoría:** Actor (entidad) · hereda de `Colaborador`  
Colaborador que atiende leads. Tiene clase propia porque el enrutamiento necesita sus productos, su disponibilidad y su carga.

| Atributo | Tipo | Descripción |
|---|---|---|
| `productos` | `List<String>` | Códigos de las líneas que atiende. |
| `disponible` | `Boolean` | Si puede recibir leads ahora; lo marca el asesor en su panel. |
| `leads` | `List<Lead>` | Leads que tiene asignados. Es el extremo de `Lead.asesor`. |
| `/cargaActual` | `Integer` | Derivado: cantidad de sus `leads` en ASIGNADO o EN_GESTION. |

Sin métodos propios (los hereda de su superclase).

**Relaciones:**

- **Asociación** (* — 0..1) desde `Conversacion` (relación 6): Asesor tras el traspaso.
- **Asociación** (* — 0..1) desde `Lead` (relación 9): Asesor asignado; de ella sale `/cargaActual`.
- **Generalización** hacia `Colaborador` (relación 13): El asesor es un colaborador.

### Conversación

#### Conversacion

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Hilo de mensajes entre el prospecto, July y, si hay traspaso, el asesor. Guarda el origen y el avance del flujo.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idConversacion` | `UUID` | Identificador interno. |
| `prospecto` | `Prospecto` | Persona con la que se conversa. |
| `canal` | `TipoCanal` | Canal de llegada y de respuesta. |
| `campana` | `String [0..1]` | Campaña de origen; vacío = origen directo. |
| `tokenSesion` | `String [0..1]` | Token de la sesión de chat (solo web). |
| `estado` | `EstadoConversacion` | ACTIVA, EN_COLA, DERIVADA, ABANDONADA o CERRADA. |
| `ultimoPaso` | `String` | Último paso guardado; desde ahí se retoma. |
| `fechaUltimaActividad` | `DateTime` | Base para detectar abandono. |
| `asesorAsignado` | `AsesorComercial [0..1]` | Asesor tras un traspaso. |
| `historial` | `List<Mensaje>` | Mensajes en orden cronológico. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `registrarMensaje()` | `mensaje: Mensaje` | `Conversacion` | Añade el mensaje al historial y actualiza la última actividad. Si es el primer mensaje del prospecto por ese canal, abre la conversación ACTIVA (y, por WhatsApp, crea el prospecto con su teléfono). | F1: 5 |
| `etiquetarOrigen()` | `campana: String \| null` | `void` | Guarda la campaña de origen; null = origen directo. | F1: 7, 7b |
| `encolar()` | `—` | `Duration` | Pasa la conversación a EN_COLA cuando July supera su `capacidadMaxima` y devuelve el tiempo de espera estimado. | F1: 11d |
| `guardarAvance()` | `paso: String` | `void` | Guarda el último paso completado del flujo. | F2: 10, 20, 34 |
| `marcarAbandonada()` | `—` | `void` | Pasa la conversación a ABANDONADA tras `July.tiempoAbandono` sin respuesta. | F2: 25e |
| `retomar()` | `—` | `String` | Reactiva la conversación (ACTIVA) y devuelve el último paso guardado, desde el que July sigue. | F2: 32e |
| `traspasar()` | `asesor: AsesorComercial` | `void` | Pasa la conversación, con su historial, al asesor; el estado pasa a DERIVADA. | F1: 28f · F3: 21 |

**Relaciones:**

- **Composición** (1 — 0..*) hacia `Mensaje` (relación 1): El historial no existe sin la conversación.
- **Asociación** (* — 1) hacia `Prospecto` (relación 5): Con quién se conversa.
- **Asociación** (* — 0..1) hacia `AsesorComercial` (relación 6): Asesor tras el traspaso.
- **Asociación** (0..1 — 1) desde `Lead` (relación 8): Conversación de origen.
- **Dependencia** «llama» desde `July` (relación 31): Registra, etiqueta, encola, guarda, retoma y traspasa la conversación.

#### Mensaje

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Un mensaje en formato común, sin importar el canal: lo que escribe el prospecto, lo que responde July, los avisos a los colaboradores y lo que registran el asesor o la agencia. Es el parámetro de `atender()`, `recibir()` y `enviar()`.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idMensaje` | `UUID` | Identificador interno. |
| `idExterno` | `String [0..1]` | Identificador del proveedor; evita procesar dos veces el mismo mensaje. |
| `emisor` | `Emisor` | PROSPECTO, JULY, ASESOR o COLABORADOR. |
| `tipo` | `TipoMensaje` | TEXTO, AUDIO, IMAGEN, PLANTILLA o AVISO. |
| `contenido` | `String` | Texto o transcripción. |
| `opciones` | `List<String>` | Respuestas cerradas que se muestran como botones (menús, confirmaciones, horarios). |
| `adjuntos` | `List<String>` | Enlaces a audio o imagen. |
| `firma` | `String [0..1]` | Firma del webhook o token de sesión con que llegó; solo sirve para verificarlo. |
| `fechaHora` | `DateTime` | Momento de envío o recepción. |

Sin métodos propios.

**Relaciones:**

- **Composición** (1 — 0..*) desde `Conversacion` (relación 1): El historial no existe sin la conversación.

### Lead y crédito

#### Lead

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Oportunidad comercial: un prospecto con una intención de crédito. Es lo que July entrega al asesor y al CRM.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idLead` | `UUID` | Identificador interno. |
| `numeroSeguimiento` | `String` | Código único con el que el prospecto y el asesor identifican el lead. |
| `prospecto` | `Prospecto` | Persona interesada. |
| `conversacion` | `Conversacion` | Conversación donde nació. |
| `lineaCredito` | `LineaCredito` | Línea del lead y de su solicitud: la confirmada en el flujo 1 o la elegida después en el flujo 2. |
| `necesidad` | `String` | Necesidad descrita con las palabras del prospecto. |
| `prioridad` | `Prioridad [0..1]` | CALIENTE, TIBIO o FRIO. |
| `estado` | `EstadoLead` | Etapa del embudo. |
| `asesor` | `AsesorComercial [0..1]` | Asesor asignado. |
| `solicitud` | `SolicitudCredito [0..1]` | Solicitud del lead. |
| `citas` | `List<Cita>` | Citas del lead; `asignar()` toma de ellas la agencia. |
| `fechaAsignacion` | `DateTime [0..1]` | Inicio del plazo de atención. |
| `intentosReactivacion` | `Integer` | Reactivaciones enviadas sin respuesta. |
| `idCRM` | `String [0..1]` | Identificador en el CRM. |
| `motivoCierre` | `String [0..1]` | Motivo cuando el estado final es PERDIDO. |
| `fechaRegistro` | `DateTime` | Momento del registro. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `registrar()` | `prospecto: Prospecto, conversacion: Conversacion, linea: LineaCredito, necesidad: String` | `Lead` | «estático» Crea el lead en estado NUEVO y devuelve su número de seguimiento. | F1: 32, 30j |
| `elegirLinea()` | `linea: LineaCredito` | `Boolean` | Cambia la línea del lead por la que el prospecto elige; devuelve false, sin cambiarla, si la línea ya no está vigente. | F2: 58 |
| `priorizar()` | `criterios: ReglaNegocio` | `Prioridad` | Calcula la prioridad con los criterios del Jefe comercial; tras agotar las reactivaciones el resultado es FRIO. | F3: 3, 35f |
| `asignar()` | `enrutamiento: ReglaNegocio, asesores: List<AsesorComercial>` | `AsesorComercial` | Elige un asesor disponible por agencia, producto y carga, pasa el lead a ASIGNADO e inicia el plazo de atención. Si el plazo venció, reasigna excluyendo al asesor anterior. | F3: 15, 19d |
| `aceptarAsignacion()` | `—` | `void` | Registra que el asesor aceptó el lead dentro del plazo y lo pasa a EN_GESTION. | F3: 19 |
| `generarFicha()` | `—` | `String` | Consolida datos, simulación elegida, precalificación, prioridad e historial de la conversación en la ficha del prospecto, con los datos faltantes marcados. | F3: 5 |
| `vincularCRM()` | `idCRM: String` | `void` | Guarda el identificador devuelto por el CRM. | F3: 11 |
| `actualizarEstado()` | `estado: EstadoLead, motivo: String \| null` | `void` | Lleva el lead a su estado final. El motivo es obligatorio para PERDIDO. Al llegar a DESEMBOLSADO o PERDIDO cierra su conversación (CERRADA). | F3: 51 |
| `reactivar()` | `—` | `Integer` | Suma un intento de reactivación y devuelve los que quedan según `maxReactivaciones` de la regla de PRIORIDAD. | F3: 33e |

**Relaciones:**

- **Composición** (1 — 0..1) hacia `SolicitudCredito` (relación 2): La solicitud pertenece al lead.
- **Composición** (1 — 0..*) hacia `Cita` (relación 4): Citas agendadas para el lead.
- **Asociación** (* — 1) hacia `Prospecto` (relación 7): Prospecto interesado.
- **Asociación** (0..1 — 1) hacia `Conversacion` (relación 8): Conversación de origen.
- **Asociación** (* — 0..1) hacia `AsesorComercial` (relación 9): Asesor asignado; de ella sale `/cargaActual`.
- **Asociación** (* — 1) hacia `LineaCredito` (relación 10): Línea del lead y de su solicitud.
- **Dependencia** «usa» hacia `ReglaNegocio` (relación 17): Criterios de prioridad y reglas de enrutamiento.
- **Dependencia** «usa» desde `CRMCooperativa` (relación 20): Crea y actualiza el lead.
- **Dependencia** «llama» desde `July` (relación 32): Registra, prioriza, asigna, vincula, reactiva y cierra el lead.

#### SolicitudCredito

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Datos que el prospecto entrega para pedir el crédito y su precalificación. Los datos de identidad se guardan en el Prospecto y la línea, en el Lead.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idSolicitud` | `UUID` | Identificador interno. |
| `lead` | `Lead` | Lead al que pertenece; de él toma la línea de crédito. |
| `monto` | `Decimal [0..1]` | Dentro del rango de la línea. |
| `plazo` | `Integer [0..1]` | Meses; uno de los plazos de la línea. |
| `destino` | `String [0..1]` | Para qué se usará el crédito. |
| `ingresosMensuales` | `Decimal [0..1]` | Declarados por el prospecto. |
| `actividadEconomica` | `String [0..1]` | Declarada por el prospecto. |
| `estado` | `EstadoSolicitud` | EN_CAPTURA, CONFIRMADA, EN_RESOLUCION, APROBADA o NEGADA. |
| `simulacionElegida` | `Simulacion [0..1]` | Simulación con la que se precalifica. |
| `resultado` | `ResultadoPrecalificacion [0..1]` | APTO, NO_APTO o A_REVISAR. |
| `capacidadPago` | `Decimal [0..1]` | Cuota máxima que soportan los ingresos. |
| `factores` | `List<String>` | Factores que pesaron en el resultado. |
| `resultadoCondicionado` | `Boolean` | true si se precalificó solo con datos declarados. |
| `numeroCasoRevision` | `String [0..1]` | Número del caso enviado al comité. |
| `documentosRecibidos` | `List<String>` | Documentos entregados en agencia. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `iniciar()` | `lead: Lead` | `SolicitudCredito` | «estático» Abre la solicitud EN_CAPTURA para la línea del lead y pasa el lead a EN_CAPTURA. | F2: 2 |
| `campoPendiente()` | `—` | `CampoSolicitud \| null` | Devuelve el siguiente dato que falta pedir (primero monto, plazo y destino); null cuando la captura está completa. | F2: 4, 12, 22 |
| `registrarDato()` | `campo: CampoSolicitud, valor: String` | `String \| null` | Valida y guarda un dato, también al corregirlo: formato de cédula, teléfono y correo (en el Prospecto) y rango de monto y plazo con la línea. Devuelve el motivo del error o null. | F2: 8, 16, 26, 32d |
| `resumir()` | `—` | `String` | Arma el resumen de todos los datos para que el prospecto lo confirme. | F2: 28 |
| `actualizarEstado()` | `estado: EstadoSolicitud` | `void` | Confirma la solicitud (exige captura completa), la pasa a resolución del Comité de crédito o registra la resolución APROBADA o NEGADA. | F2: 32 · F3: 43, 47 |
| `precalificar()` | `reglas: ReglaNegocio` | `ResultadoPrecalificacion` | Calcula la capacidad de pago y clasifica la simulación elegida con las reglas del comité; pasa el lead a PRECALIFICADO. Sin registro del core usa solo los datos declarados y marca el resultado como condicionado. | F2: 68 |
| `explicarResultado()` | `—` | `String` | Explica el resultado preliminar y los factores; para NO_APTO incluye el motivo. | F2: 70, 70l |
| `derivarARevision()` | `—` | `String` | Abre el caso de revisión de un resultado A_REVISAR y devuelve su número. No cambia el estado de la solicitud. | F2: 70k |
| `registrarDocumento()` | `documento: String` | `void` | Marca un documento como recibido en agencia. | F3: 41 |

**Relaciones:**

- **Composición** (1 — 0..1) desde `Lead` (relación 2): La solicitud pertenece al lead.
- **Composición** (1 — 0..*) hacia `Simulacion` (relación 3): Simulaciones calculadas para comparar.
- **Asociación** (0..1 — 0..1) hacia `Simulacion` (relación 11): Simulación elegida (una de las suyas).
- **Dependencia** «usa» hacia `ReglaNegocio` (relación 18): Reglas de precalificación.
- **Dependencia** «llama» desde `July` (relación 33): Captura, confirma, precalifica y resuelve la solicitud.

#### Simulacion

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Un escenario de crédito: un monto a un plazo con su cuota y su costo. Una solicitud puede tener varias para compararlas.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idSimulacion` | `UUID` | Identificador interno. |
| `solicitud` | `SolicitudCredito` | Solicitud simulada. |
| `monto` | `Decimal` | Monto simulado. |
| `plazo` | `Integer` | Meses. |
| `tasa` | `Decimal` | Tasa anual de la línea al momento de calcular; se copia para conservar la que vio el prospecto. |
| `cuotaMensual` | `Decimal` | Cuota fija. |
| `intereses` | `Decimal` | Total de intereses. |
| `seguros` | `Decimal` | Total de seguros. |
| `cargos` | `Decimal` | Otros cargos. |
| `totalPagar` | `Decimal` | Monto + intereses + seguros + cargos. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `calcular()` | `solicitud: SolicitudCredito, monto: Decimal, plazo: Integer` | `Simulacion` | «estático» Calcula cuota, intereses, seguros, cargos y total con la tasa de la línea. Si el monto o el plazo no caben en la línea, no calcula y devuelve el error. | F2: 38, 46 |
| `generarTablaAmortizacion()` | `—` | `List<Map<String, Decimal>>` | Devuelve cada cuota con su número, capital, interés y saldo. | F2: 40 |
| `elegir()` | `—` | `void` | La marca como la simulación elegida de su solicitud. | F2: 50 |
| `sugerirAlternativa()` | `capacidadPago: Decimal` | `Simulacion` | Calcula otra simulación con un monto o plazo cuya cuota quepa en la capacidad de pago. | F2: 72l |

**Relaciones:**

- **Composición** (1 — 0..*) desde `SolicitudCredito` (relación 3): Simulaciones calculadas para comparar.
- **Asociación** (0..1 — 0..1) desde `SolicitudCredito` (relación 11): Simulación elegida (una de las suyas).
- **Dependencia** «llama» desde `July` (relación 34): Calcula, compara, elige y sugiere simulaciones.

#### Cita

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Cita del prospecto en una agencia, con su estado y su recordatorio.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idCita` | `UUID` | Identificador interno. |
| `lead` | `Lead` | Lead que agenda. |
| `agencia` | `String` | Agencia elegida. |
| `fechaHora` | `DateTime` | Horario reservado. |
| `estado` | `EstadoCita` | RESERVADA, CONFIRMADA, REPROGRAMADA o ATENDIDA. |
| `fechaRecordatorio` | `DateTime [0..1]` | Cuándo se envía el recordatorio de documentos y cita. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `reservar()` | `lead: Lead, agencia: String, fechaHora: DateTime` | `Cita` | «estático» Crea la cita RESERVADA en el horario elegido de la agenda. | F2: 82 |
| `reprogramar()` | `fechaHora: DateTime` | `void` | Cambia el horario y pasa la cita a REPROGRAMADA. | F3: 35g |
| `actualizarEstado()` | `estado: EstadoCita` | `void` | Registra la asistencia que confirma el prospecto (CONFIRMADA) o la atención que registra el Personal de agencia (ATENDIDA). | F3: 33, 37 |
| `programarRecordatorio()` | `fecha: DateTime` | `void` | Guarda la fecha del recordatorio de documentos y cita. | F3: 26 |

**Relaciones:**

- **Composición** (1 — 0..*) desde `Lead` (relación 4): Citas agendadas para el lead.
- **Dependencia** «llama» desde `July` (relación 35): Reserva, reprograma y actualiza la cita.

### Configuración

#### Configuracion

**Naturaleza:** «entidad» · **Categoría:** Configuración · *abstracta*  
Clase abstracta de lo que publica un colaborador por versiones y July solo lee: líneas de crédito, plantillas y reglas.

| Atributo | Tipo | Descripción |
|---|---|---|
| `version` | `String` | Versión publicada. |
| `vigente` | `Boolean` | Solo una versión vigente por tipo y clave. |
| `publicadoPor` | `Colaborador` | Colaborador que la publicó. |

Sin métodos propios.

**Relaciones:**

- **Asociación** (* — 1) hacia `Colaborador` (relación 12): Colaborador que publica la línea, la plantilla o la regla.
- **Generalización** desde `LineaCredito` (relación 14): La línea es configuración publicada.
- **Generalización** desde `PlantillaMensaje` (relación 15): La plantilla es configuración publicada.
- **Generalización** desde `ReglaNegocio` (relación 16): La regla es configuración publicada.

#### LineaCredito

**Naturaleza:** «entidad» · **Categoría:** Configuración · hereda de `Configuracion`  
Producto de crédito del catálogo que publica el Área de productos y crédito, con sus condiciones y requisitos.

| Atributo | Tipo | Descripción |
|---|---|---|
| `codigo` | `String` | Código de la línea. |
| `nombre` | `String` | Nombre visible. |
| `tasa` | `Decimal` | Tasa anual. |
| `plazos` | `List<Integer>` | Plazos permitidos en meses. |
| `montoMinimo` | `Decimal` | Monto mínimo. |
| `montoMaximo` | `Decimal` | Monto máximo. |
| `palabrasClave` | `List<String>` | Términos con los que se detecta la intención. |
| `requisitos` | `List<String>` | Documentos que pide la línea. |
| `requisitosAfiliacion` | `List<String>` | Pasos y documentos extra para un no socio. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `buscar()` | `criterio: String` | `LineaCredito \| null` | «estático» Busca entre las líneas vigentes por código, nombre o palabras clave del texto libre; así se identifica la intención. Devuelve null si no hay coincidencia. | F1: 26 |
| `validarCondiciones()` | `monto: Decimal, plazo: Integer \| null` | `String \| null` | Verifica que el monto esté en el rango y el plazo sea uno de los permitidos. Devuelve el motivo con los valores permitidos, o null. | F2: 40f |
| `requisitosPara()` | `condicion: CondicionSocio` | `List<String>` | Devuelve los documentos según la condición de socio; para un no socio añade los de afiliación. | F2: 74 |

**Relaciones:**

- **Asociación** (* — 1) desde `Lead` (relación 10): Línea del lead y de su solicitud.
- **Generalización** hacia `Configuracion` (relación 14): La línea es configuración publicada.
- **Dependencia** «llama» desde `July` (relación 36): Busca la línea, valida condiciones y pide requisitos.

#### PlantillaMensaje

**Naturaleza:** «entidad» · **Categoría:** Configuración · hereda de `Configuracion`  
Contenido conversacional que publica el Administrador del asistente: guion de bienvenida, aviso de privacidad, menús, preguntas frecuentes y plantillas de retoma, recordatorio y reactivación.

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoPlantilla` | Qué contenido es. |
| `clave` | `String` | Pregunta modelo o palabras clave (preguntas frecuentes). |
| `texto` | `String` | Texto con variables como {nombre} o {fechaCita}. |
| `opciones` | `List<String>` | Opciones del menú, si es un menú. |
| `plantillaProveedor` | `String [0..1]` | Plantilla aprobada por Meta; obligatoria para RETOMA, RECORDATORIO y REACTIVACION, que salen fuera de la ventana de 24 horas de WhatsApp. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `componer()` | `datos: Map<String, String>` | `String` | Reemplaza las variables y devuelve el texto final. | F1: 16 · F2: 27e · F3: 28, 35e |
| `buscarRespuesta()` | `texto: String` | `PlantillaMensaje \| null` | «estático» Devuelve la pregunta frecuente que corresponde al texto, o null. | F1: 26h |

**Relaciones:**

- **Generalización** hacia `Configuracion` (relación 15): La plantilla es configuración publicada.
- **Dependencia** «llama» desde `July` (relación 37): Compone plantillas y busca preguntas frecuentes.

#### ReglaNegocio

**Naturaleza:** «entidad» · **Categoría:** Configuración · hereda de `Configuracion`  
Parámetros de decisión publicados por versiones: reglas de precalificación (Comité de crédito), criterios de prioridad y reglas de enrutamiento (Jefe comercial).

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoRegla` | PRECALIFICACION, PRIORIDAD o ENRUTAMIENTO. |
| `parametros` | `Map<String, String>` | Valores de la regla. PRECALIFICACION: porcentajeMaximoCuota, edadMinima, edadMaxima. PRIORIDAD: condiciones de caliente, tibio y frío, maxReactivaciones. ENRUTAMIENTO: cargaMaxima, plazoAtencion. |

Sin métodos propios (los hereda de su superclase).

**Relaciones:**

- **Generalización** hacia `Configuracion` (relación 16): La regla es configuración publicada.
- **Dependencia** «usa» desde `Lead` (relación 17): Criterios de prioridad y reglas de enrutamiento.
- **Dependencia** «usa» desde `SolicitudCredito` (relación 18): Reglas de precalificación.

## 5. Relaciones

| Tipo | Significado |
|---|---|
| Generalización | La subclase *es un* tipo de la superclase y hereda sus atributos y métodos. |
| Composición | La parte no existe sin el todo; se crea y se borra con él. |
| Asociación | Una clase guarda una referencia a otra. Multiplicidad: origen — destino. |
| Dependencia | Una clase usa a otra en un método, sin guardarla: «usa» cuando la recibe como parámetro, «llama» cuando invoca un método suyo en un paso de CU-08. |

| # | Origen | Tipo | Destino | Multiplicidad | Navegación | Descripción |
|---|---|---|---|---|---|---|
| 1 | `Conversacion` | Composición | `Mensaje` | 1 — 0..* | → | El historial no existe sin la conversación. |
| 2 | `Lead` | Composición | `SolicitudCredito` | 1 — 0..1 | ↔ | La solicitud pertenece al lead. |
| 3 | `SolicitudCredito` | Composición | `Simulacion` | 1 — 0..* | ← | Simulaciones calculadas para comparar. |
| 4 | `Lead` | Composición | `Cita` | 1 — 0..* | ↔ | Citas agendadas para el lead. |
| 5 | `Conversacion` | Asociación | `Prospecto` | * — 1 | → | Con quién se conversa. |
| 6 | `Conversacion` | Asociación | `AsesorComercial` | * — 0..1 | → | Asesor tras el traspaso. |
| 7 | `Lead` | Asociación | `Prospecto` | * — 1 | → | Prospecto interesado. |
| 8 | `Lead` | Asociación | `Conversacion` | 0..1 — 1 | → | Conversación de origen. |
| 9 | `Lead` | Asociación | `AsesorComercial` | * — 0..1 | ↔ | Asesor asignado; de ella sale `/cargaActual`. |
| 10 | `Lead` | Asociación | `LineaCredito` | * — 1 | → | Línea del lead y de su solicitud. |
| 11 | `SolicitudCredito` | Asociación | `Simulacion` | 0..1 — 0..1 | → | Simulación elegida (una de las suyas). |
| 12 | `Configuracion` | Asociación | `Colaborador` | * — 1 | → | Colaborador que publica la línea, la plantilla o la regla. |
| 13 | `AsesorComercial` | Generalización | `Colaborador` | — | — | El asesor es un colaborador. |
| 14 | `LineaCredito` | Generalización | `Configuracion` | — | — | La línea es configuración publicada. |
| 15 | `PlantillaMensaje` | Generalización | `Configuracion` | — | — | La plantilla es configuración publicada. |
| 16 | `ReglaNegocio` | Generalización | `Configuracion` | — | — | La regla es configuración publicada. |
| 17 | `Lead` | Dependencia | `ReglaNegocio` | «usa» | → | Criterios de prioridad y reglas de enrutamiento. |
| 18 | `SolicitudCredito` | Dependencia | `ReglaNegocio` | «usa» | → | Reglas de precalificación. |
| 19 | `SistemaCore` | Dependencia | `Prospecto` | «usa» | → | Completa los datos registrados del socio. |
| 20 | `CRMCooperativa` | Dependencia | `Lead` | «usa» | → | Crea y actualiza el lead. |
| 21 | `Prospecto` | Dependencia | `July` | «llama» | → | `atender()`: el prospecto escribe a July. |
| 22 | `Colaborador` | Dependencia | `July` | «llama» | → | `atender()`: el asesor y los colaboradores escriben a July. |
| 23 | `Canal` | Dependencia | `July` | «llama» | → | `atender()`: el canal notifica cada mensaje entrante. |
| 24 | `Prospecto` | Dependencia | `Canal` | «llama» | → | `recibir()`, `abrirSesion()`: el prospecto escribe por WhatsApp o el widget. |
| 25 | `July` | Dependencia | `Canal` | «llama» | → | `verificarAutenticidad()`, `enviar()`. |
| 26 | `Canal` | Dependencia | `Prospecto` | «llama» | → | `recibir()`: el canal entrega al prospecto lo que envía July. |
| 27 | `Prospecto` | Dependencia | `Colaborador` | «llama» | → | `recibir()`: el prospecto escribe al asesor tras el traspaso. |
| 28 | `Colaborador` | Dependencia | `Prospecto` | «llama» | → | `recibir()`: el asesor saluda al prospecto tras el traspaso. |
| 29 | `July` | Dependencia | `Prospecto` | «llama» | → | `recibir()`, `registrarConsentimiento()`. |
| 30 | `July` | Dependencia | `Colaborador` | «llama» | → | `recibir()`, `consultarPublicacion()`, `consultarAgenda()`. |
| 31 | `July` | Dependencia | `Conversacion` | «llama» | → | Registra, etiqueta, encola, guarda, retoma y traspasa la conversación. |
| 32 | `July` | Dependencia | `Lead` | «llama» | → | Registra, prioriza, asigna, vincula, reactiva y cierra el lead. |
| 33 | `July` | Dependencia | `SolicitudCredito` | «llama» | → | Captura, confirma, precalifica y resuelve la solicitud. |
| 34 | `July` | Dependencia | `Simulacion` | «llama» | → | Calcula, compara, elige y sugiere simulaciones. |
| 35 | `July` | Dependencia | `Cita` | «llama» | → | Reserva, reprograma y actualiza la cita. |
| 36 | `July` | Dependencia | `LineaCredito` | «llama» | → | Busca la línea, valida condiciones y pide requisitos. |
| 37 | `July` | Dependencia | `PlantillaMensaje` | «llama» | → | Compone plantillas y busca preguntas frecuentes. |
| 38 | `July` | Dependencia | `SistemaCore` | «llama» | → | `validarCedula()`, `consultarSocio()`. |
| 39 | `July` | Dependencia | `CRMCooperativa` | «llama» | → | `buscarLead()`, `sincronizarLead()`. |

Navegación: → de origen a destino; ← de destino a origen; ↔ en ambos sentidos. Cada extremo navegable es un atributo de la clase que lo recorre.

## 6. Trazabilidad con CU-08

### 6.1 Parejas sujeto → receptor

Cada pareja de clases que aparece en la columna «Relación» de una llamada de CU-08 tiene su relación aquí. El método es de la clase del receptor o de una superclase suya.

| Sujeto | Receptor | Clase dueña del método | Relación (sección 5) | Pasos |
|---|---|---|---|---|
| `Prospecto` | `Canal` | `Canal` | 24 | 1·1, 1·1a, 1·3a (3) |
| `Canal` | `July` | `July` | 23 | 1·2, 1·4a (2) |
| `July` | `Canal` | `Canal` | 25 | 1·3, 1·11, 1·5a, 1·13d, 2·29e, 3·30, 3·37e (7) |
| `July` | `Conversacion` | `Conversacion` | 31 | 1·5, 1·7, 1·7b, 1·11d, 1·28f, 2·10, 2·20, 2·34 … (11) |
| `July` | `Colaborador` | `Colaborador` | 30 | 1·9, 1·14, 1·22, 1·22e, 2·54, 2·64, 2·78, 2·84 … (17) |
| `Canal` | `Prospecto` | `Prospecto` | 26 | 1·12, 1·14d, 2·30e, 3·31, 3·38e (5) |
| `Prospecto` | `July` | `July` | 21 | 1·13, 1·19, 1·25, 1·29, 1·19e, 1·25f, 2·1, 2·7 … (33) |
| `July` | `PlantillaMensaje` | `PlantillaMensaje` | 37 | 1·16, 1·26h, 2·27e, 3·28, 3·35e (5) |
| `July` | `Prospecto` | `Prospecto` | 29 | 1·18, 1·20, 1·24, 1·28, 1·34, 1·20e, 1·24e, 1·28g … (35) |
| `July` | `LineaCredito` | `LineaCredito` | 36 | 1·26, 2·40f, 2·74 (3) |
| `July` | `SistemaCore` | `SistemaCore` | 38 | 1·30, 2·18, 2·66 (3) |
| `July` | `Lead` | `Lead` | 32 | 1·32, 1·30j, 2·58, 3·3, 3·5, 3·11, 3·15, 3·19 … (12) |
| `July` | `AsesorComercial` | `Colaborador` | 30 | 1·26f, 1·30f, 3·17, 3·39, 3·49, 3·55, 3·37f (7) |
| `AsesorComercial` | `July` | `July` | 22 | 1·27f, 3·18, 3·25, 3·40, 3·50, 3·18d (6) |
| `AsesorComercial` | `Prospecto` | `Prospecto` | 28 | 1·31f (1) |
| `July` | `SolicitudCredito` | `SolicitudCredito` | 33 | 2·2, 2·4, 2·8, 2·12, 2·16, 2·22, 2·26, 2·28 … (17) |
| `July` | `Simulacion` | `Simulacion` | 34 | 2·38, 2·40, 2·46, 2·50, 2·72l (5) |
| `July` | `Cita` | `Cita` | 35 | 2·82, 3·26, 3·33, 3·37, 3·35g (5) |
| `July` | `CRMCooperativa` | `CRMCooperativa` | 39 | 3·7, 3·9, 3·53 (3) |
| `Prospecto` | `AsesorComercial` | `Colaborador` | 27 | 3·24 (1) |
| `Colaborador` | `July` | `July` | 22 | 3·36, 3·46 (2) |

### 6.2 Paso → método

Las 183 llamadas de CU-08, en orden. Los 99 retornos no tienen método: son la salida del método que los provoca (regla 3).

**Flujo 1 · Atracción y primer contacto**

| Paso | Método | Clase dueña | Desde |
|---|---|---|---|
| 1 | `Canal.recibir(mensaje)` | `Canal` | `Prospecto` |
| 2 | `July.atender(mensaje)` | `July` | `Canal` |
| 3 | `Canal.verificarAutenticidad(mensaje)` | `Canal` | `July` |
| 5 | `Conversacion.registrarMensaje(mensaje)` | `Conversacion` | `July` |
| 7 | `Conversacion.etiquetarOrigen(campana)` | `Conversacion` | `July` |
| 9 | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 11 | `Canal.enviar(mensaje)` | `Canal` | `July` |
| 12 | `Prospecto.recibir(mensaje)` | `Prospecto` | `Canal` |
| 1a | `Canal.abrirSesion(paginaOrigen)` | `Canal` | `Prospecto` |
| 3a | `Canal.recibir(mensaje)` | `Canal` | `Prospecto` |
| 4a | `July.atender(mensaje)` | `July` | `Canal` |
| 5a | `Canal.verificarAutenticidad(mensaje)` | `Canal` | `July` |
| 7b | `Conversacion.etiquetarOrigen(campana)` | `Conversacion` | `July` |
| 11d | `Conversacion.encolar()` | `Conversacion` | `July` |
| 13d | `Canal.enviar(mensaje)` | `Canal` | `July` |
| 14d | `Prospecto.recibir(mensaje)` | `Prospecto` | `Canal` |
| 13 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 14 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 16 | `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` | `July` |
| 18 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 19 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 20 | `Prospecto.registrarConsentimiento(aceptado, versionAviso)` | `Prospecto` | `July` |
| 22 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 24 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 25 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 26 | `LineaCredito.buscar(criterio)` | `LineaCredito` | `July` |
| 28 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 29 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 30 | `SistemaCore.consultarSocio(prospecto)` | `SistemaCore` | `July` |
| 32 | `Lead.registrar(prospecto, conversacion, linea, necesidad)` | `Lead` | `July` |
| 34 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 19e | `July.atender(mensaje)` | `July` | `Prospecto` |
| 20e | `Prospecto.registrarConsentimiento(aceptado, versionAviso)` | `Prospecto` | `July` |
| 22e | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 24e | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 25f | `July.atender(mensaje)` | `July` | `Prospecto` |
| 26f | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 27f | `July.atender(mensaje)` | `July` | `AsesorComercial` |
| 28f | `Conversacion.traspasar(asesor)` | `Conversacion` | `July` |
| 30f | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 31f | `Prospecto.recibir(mensaje)` | `Prospecto` | `AsesorComercial` |
| 28g | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 26h | `PlantillaMensaje.buscarRespuesta(texto)` | `PlantillaMensaje` | `July` |
| 28h | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 30j | `Lead.registrar(prospecto, conversacion, linea, necesidad)` | `Lead` | `July` |

**Flujo 2 · Captura, simulación y precalificación**

| Paso | Método | Clase dueña | Desde |
|---|---|---|---|
| 1 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 2 | `SolicitudCredito.iniciar(lead)` | `SolicitudCredito` | `July` |
| 4 | `SolicitudCredito.campoPendiente()` | `SolicitudCredito` | `July` |
| 6 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 7 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 8 | `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` | `July` |
| 10 | `Conversacion.guardarAvance(paso)` | `Conversacion` | `July` |
| 12 | `SolicitudCredito.campoPendiente()` | `SolicitudCredito` | `July` |
| 14 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 15 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 16 | `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` | `July` |
| 18 | `SistemaCore.validarCedula(cedula)` | `SistemaCore` | `July` |
| 20 | `Conversacion.guardarAvance(paso)` | `Conversacion` | `July` |
| 22 | `SolicitudCredito.campoPendiente()` | `SolicitudCredito` | `July` |
| 24 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 25 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 26 | `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` | `July` |
| 28 | `SolicitudCredito.resumir()` | `SolicitudCredito` | `July` |
| 30 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 31 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 32 | `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` | `July` |
| 34 | `Conversacion.guardarAvance(paso)` | `Conversacion` | `July` |
| 36 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 14a | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 15a | `July.atender(mensaje)` | `July` | `Prospecto` |
| 18b | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 19b | `July.atender(mensaje)` | `July` | `Prospecto` |
| 20c | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 21c | `July.atender(mensaje)` | `July` | `Prospecto` |
| 31d | `July.atender(mensaje)` | `July` | `Prospecto` |
| 32d | `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` | `July` |
| 24e | `July.vencerPlazo(plazo)` | `July` | `Prospecto` |
| 25e | `Conversacion.marcarAbandonada()` | `Conversacion` | `July` |
| 27e | `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` | `July` |
| 29e | `Canal.enviar(mensaje)` | `Canal` | `July` |
| 30e | `Prospecto.recibir(mensaje)` | `Prospecto` | `Canal` |
| 31e | `July.atender(mensaje)` | `July` | `Prospecto` |
| 32e | `Conversacion.retomar()` | `Conversacion` | `July` |
| 37 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 38 | `Simulacion.calcular(solicitud, monto, plazo)` | `Simulacion` | `July` |
| 40 | `Simulacion.generarTablaAmortizacion()` | `Simulacion` | `July` |
| 42 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 43 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 44 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 45 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 46 | `Simulacion.calcular(solicitud, monto, plazo)` | `Simulacion` | `July` |
| 48 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 49 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 50 | `Simulacion.elegir()` | `Simulacion` | `July` |
| 52 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 53 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 54 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 56 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 57 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 58 | `Lead.elegirLinea(linea)` | `Lead` | `July` |
| 60 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 61 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 62 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 40f | `LineaCredito.validarCondiciones(monto, plazo)` | `LineaCredito` | `July` |
| 42f | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 45g | `July.atender(mensaje)` | `July` | `Prospecto` |
| 60h | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 61i | `July.atender(mensaje)` | `July` | `Prospecto` |
| 63 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 64 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 66 | `SistemaCore.consultarSocio(prospecto)` | `SistemaCore` | `July` |
| 68 | `SolicitudCredito.precalificar(reglas)` | `SolicitudCredito` | `July` |
| 70 | `SolicitudCredito.explicarResultado()` | `SolicitudCredito` | `July` |
| 72 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 73 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 74 | `LineaCredito.requisitosPara(condicion)` | `LineaCredito` | `July` |
| 76 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 77 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 78 | `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Colaborador` | `July` |
| 80 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 81 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 82 | `Cita.reservar(lead, agencia, fechaHora)` | `Cita` | `July` |
| 84 | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 86 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 70k | `SolicitudCredito.derivarARevision()` | `SolicitudCredito` | `July` |
| 72k | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 74k | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 70l | `SolicitudCredito.explicarResultado()` | `SolicitudCredito` | `July` |
| 72l | `Simulacion.sugerirAlternativa(capacidadPago)` | `Simulacion` | `July` |
| 74l | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 80n | `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Colaborador` | `July` |
| 82n | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |

**Flujo 3 · Entrega, seguimiento y conversión**

| Paso | Método | Clase dueña | Desde |
|---|---|---|---|
| 1 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 3 | `Lead.priorizar(criterios)` | `Lead` | `July` |
| 5 | `Lead.generarFicha()` | `Lead` | `July` |
| 7 | `CRMCooperativa.buscarLead(cedula, telefono)` | `CRMCooperativa` | `July` |
| 9 | `CRMCooperativa.sincronizarLead(lead)` | `CRMCooperativa` | `July` |
| 11 | `Lead.vincularCRM(idCRM)` | `Lead` | `July` |
| 11c | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 13 | `Colaborador.consultarPublicacion(tipo)` | `Colaborador` | `July` |
| 15 | `Lead.asignar(enrutamiento, asesores)` | `Lead` | `July` |
| 17 | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 18 | `July.atender(mensaje)` | `July` | `AsesorComercial` |
| 19 | `Lead.aceptarAsignacion()` | `Lead` | `July` |
| 21 | `Conversacion.traspasar(asesor)` | `Conversacion` | `July` |
| 23 | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |
| 24 | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `Prospecto` |
| 25 | `July.atender(mensaje)` | `July` | `AsesorComercial` |
| 26 | `Cita.programarRecordatorio(fecha)` | `Cita` | `July` |
| 28 | `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` | `July` |
| 30 | `Canal.enviar(mensaje)` | `Canal` | `July` |
| 31 | `Prospecto.recibir(mensaje)` | `Prospecto` | `Canal` |
| 32 | `July.atender(mensaje)` | `July` | `Prospecto` |
| 33 | `Cita.actualizarEstado(estado)` | `Cita` | `July` |
| 35 | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 36 | `July.atender(mensaje)` | `July` | `Colaborador` |
| 37 | `Cita.actualizarEstado(estado)` | `Cita` | `July` |
| 39 | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 40 | `July.atender(mensaje)` | `July` | `AsesorComercial` |
| 41 | `SolicitudCredito.registrarDocumento(documento)` | `SolicitudCredito` | `July` |
| 43 | `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` | `July` |
| 45 | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 46 | `July.atender(mensaje)` | `July` | `Colaborador` |
| 47 | `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` | `July` |
| 49 | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 50 | `July.atender(mensaje)` | `July` | `AsesorComercial` |
| 51 | `Lead.actualizarEstado(estado, motivo)` | `Lead` | `July` |
| 53 | `CRMCooperativa.sincronizarLead(lead)` | `CRMCooperativa` | `July` |
| 55 | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 18d | `July.vencerPlazo(plazo)` | `July` | `AsesorComercial` |
| 19d | `Lead.asignar(enrutamiento, asesores)` | `Lead` | `July` |
| 21d | `Colaborador.recibir(mensaje)` | `Colaborador` | `July` |
| 32e | `July.vencerPlazo(plazo)` | `July` | `Prospecto` |
| 33e | `Lead.reactivar()` | `Lead` | `July` |
| 35e | `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` | `July` |
| 37e | `Canal.enviar(mensaje)` | `Canal` | `July` |
| 38e | `Prospecto.recibir(mensaje)` | `Prospecto` | `Canal` |
| 35f | `Lead.priorizar(criterios)` | `Lead` | `July` |
| 37f | `AsesorComercial.recibir(mensaje)` | `Colaborador` | `July` |
| 32g | `July.atender(mensaje)` | `July` | `Prospecto` |
| 33g | `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Colaborador` | `July` |
| 35g | `Cita.reprogramar(fechaHora)` | `Cita` | `July` |
| 37g | `Prospecto.recibir(mensaje)` | `Prospecto` | `July` |

## 7. Tabla de resumen

| Entidad | Descripción | Categoría | Atributos | Métodos (entrada → salida) | Relaciones (tipo → destino [multiplicidad]) | Naturaleza |
|---|---|---|---|---|---|---|
| [`July`](#july) | Asistente virtual de la cooperativa: el sistema que se diseña. | Control | `capacidadMaxima`: `Integer`<br>`tiempoRespuestaObjetivo`: `Duration`<br>`tiempoAbandono`: `Duration` | `atender(mensaje: Mensaje)` → `void`<br>`vencerPlazo(plazo: TipoPlazo)` → `void` | Dependencia ← Prospecto [«llama»]<br>Dependencia ← Colaborador [«llama»]<br>Dependencia ← Canal [«llama»]<br>Dependencia → Canal [«llama»]<br>Dependencia → Prospecto [«llama»]<br>Dependencia → Colaborador [«llama»]<br>Dependencia → Conversacion [«llama»]<br>Dependencia → Lead [«llama»]<br>Dependencia → SolicitudCredito [«llama»]<br>Dependencia → Simulacion [«llama»]<br>Dependencia → Cita [«llama»]<br>Dependencia → LineaCredito [«llama»]<br>Dependencia → PlantillaMensaje [«llama»]<br>Dependencia → SistemaCore [«llama»]<br>Dependencia → CRMCooperativa [«llama»] | «control» |
| [`Canal`](#canal) | Canal digital por el que entra y sale la conversación: WhatsApp Business API o el widget web. | Sistema externo | `tipo`: `TipoCanal`<br>`credencial`: `String` | `recibir(mensaje: Mensaje)` → `void`<br>`verificarAutenticidad(mensaje: Mensaje)` → `Boolean`<br>`enviar(mensaje: Mensaje)` → `void`<br>`abrirSesion(paginaOrigen: String)` → `String` | Dependencia → July [«llama»]<br>Dependencia ← Prospecto [«llama»]<br>Dependencia ← July [«llama»]<br>Dependencia → Prospecto [«llama»] | «interfaz» |
| [`SistemaCore`](#sistemacore) | Sistema transaccional de la cooperativa: fuente oficial de socios y de identidad. | Sistema externo | `urlServicio`: `String`<br>`tiempoMaximoRespuesta`: `Duration` | `validarCedula(cedula: String)` → `Boolean`<br>`consultarSocio(prospecto: Prospecto)` → `CondicionSocio` | Dependencia → Prospecto [«usa»]<br>Dependencia ← July [«llama»] | «interfaz» |
| [`CRMCooperativa`](#crmcooperativa) | CRM comercial donde se registra el lead y se gestiona el embudo de ventas. | Sistema externo | `urlServicio`: `String`<br>`maxIntentos`: `Integer` | `buscarLead(cedula: String, telefono: String)` → `String \| null`<br>`sincronizarLead(lead: Lead)` → `String` | Dependencia → Lead [«usa»]<br>Dependencia ← July [«llama»] | «interfaz» |
| [`Prospecto`](#prospecto) | Persona que contacta a la cooperativa. | Actor (entidad) | `idProspecto`: `UUID`<br>`nombres`: `String [0..1]`<br>`cedula`: `String [0..1]`<br>`telefono`: `String [0..1]`<br>`correo`: `String [0..1]`<br>`condicionSocio`: `CondicionSocio`<br>`fechaIngresoSocio`: `Date [0..1]`<br>`edad`: `Integer [0..1]`<br>`actividadRegistrada`: `String [0..1]`<br>`consentimientoAceptado`: `Boolean`<br>`versionAviso`: `String [0..1]`<br>`fechaConsentimiento`: `DateTime [0..1]` | `recibir(mensaje: Mensaje)` → `void`<br>`registrarConsentimiento(aceptado: Boolean, versionAviso: String)` → `void` | Asociación ← Conversacion [* — 1]<br>Asociación ← Lead [* — 1]<br>Dependencia ← SistemaCore [«usa»]<br>Dependencia → July [«llama»]<br>Dependencia → Canal [«llama»]<br>Dependencia ← Canal [«llama»]<br>Dependencia → Colaborador [«llama»]<br>Dependencia ← Colaborador [«llama»]<br>Dependencia ← July [«llama»] | «entidad» |
| [`Colaborador`](#colaborador) | Persona de la cooperativa que participa en los flujos: publica configuración (guiones, catálogo, reglas, agenda), recibe avisos y registra la atención o la resolución. | Actor (entidad) | `idColaborador`: `UUID`<br>`nombre`: `String`<br>`rol`: `RolColaborador`<br>`agencia`: `String [0..1]`<br>`correo`: `String` | `recibir(mensaje: Mensaje)` → `void`<br>`consultarPublicacion(tipo: TipoPublicacion)` → `List<Configuracion>`<br>`consultarAgenda(agencia: String, desde: Date, hasta: Date)` → `List<DateTime>` | Asociación ← Configuracion [* — 1]<br>Generalización ← AsesorComercial [—]<br>Dependencia → July [«llama»]<br>Dependencia ← Prospecto [«llama»]<br>Dependencia → Prospecto [«llama»]<br>Dependencia ← July [«llama»] | «entidad» |
| [`AsesorComercial`](#asesorcomercial) | Colaborador que atiende leads. | Actor (entidad) | `productos`: `List<String>`<br>`disponible`: `Boolean`<br>`leads`: `List<Lead>`<br>`/cargaActual`: `Integer` | — | Asociación ← Conversacion [* — 0..1]<br>Asociación ← Lead [* — 0..1]<br>Generalización → Colaborador [—] | «entidad» |
| [`Conversacion`](#conversacion) | Hilo de mensajes entre el prospecto, July y, si hay traspaso, el asesor. | Entidad de negocio | `idConversacion`: `UUID`<br>`prospecto`: `Prospecto`<br>`canal`: `TipoCanal`<br>`campana`: `String [0..1]`<br>`tokenSesion`: `String [0..1]`<br>`estado`: `EstadoConversacion`<br>`ultimoPaso`: `String`<br>`fechaUltimaActividad`: `DateTime`<br>`asesorAsignado`: `AsesorComercial [0..1]`<br>`historial`: `List<Mensaje>` | `registrarMensaje(mensaje: Mensaje)` → `Conversacion`<br>`etiquetarOrigen(campana: String \| null)` → `void`<br>`encolar()` → `Duration`<br>`guardarAvance(paso: String)` → `void`<br>`marcarAbandonada()` → `void`<br>`retomar()` → `String`<br>`traspasar(asesor: AsesorComercial)` → `void` | Composición → Mensaje [1 — 0..*]<br>Asociación → Prospecto [* — 1]<br>Asociación → AsesorComercial [* — 0..1]<br>Asociación ← Lead [0..1 — 1]<br>Dependencia ← July [«llama»] | «entidad» |
| [`Mensaje`](#mensaje) | Un mensaje en formato común, sin importar el canal: lo que escribe el prospecto, lo que responde July, los avisos a los colaboradores y lo que registran el asesor o la agencia. | Entidad de negocio | `idMensaje`: `UUID`<br>`idExterno`: `String [0..1]`<br>`emisor`: `Emisor`<br>`tipo`: `TipoMensaje`<br>`contenido`: `String`<br>`opciones`: `List<String>`<br>`adjuntos`: `List<String>`<br>`firma`: `String [0..1]`<br>`fechaHora`: `DateTime` | — | Composición ← Conversacion [1 — 0..*] | «entidad» |
| [`Lead`](#lead) | Oportunidad comercial: un prospecto con una intención de crédito. | Entidad de negocio | `idLead`: `UUID`<br>`numeroSeguimiento`: `String`<br>`prospecto`: `Prospecto`<br>`conversacion`: `Conversacion`<br>`lineaCredito`: `LineaCredito`<br>`necesidad`: `String`<br>`prioridad`: `Prioridad [0..1]`<br>`estado`: `EstadoLead`<br>`asesor`: `AsesorComercial [0..1]`<br>`solicitud`: `SolicitudCredito [0..1]`<br>`citas`: `List<Cita>`<br>`fechaAsignacion`: `DateTime [0..1]`<br>`intentosReactivacion`: `Integer`<br>`idCRM`: `String [0..1]`<br>`motivoCierre`: `String [0..1]`<br>`fechaRegistro`: `DateTime` | `registrar(prospecto: Prospecto, conversacion: Conversacion, linea: LineaCredito, necesidad: String)` → `Lead`<br>`elegirLinea(linea: LineaCredito)` → `Boolean`<br>`priorizar(criterios: ReglaNegocio)` → `Prioridad`<br>`asignar(enrutamiento: ReglaNegocio, asesores: List<AsesorComercial>)` → `AsesorComercial`<br>`aceptarAsignacion()` → `void`<br>`generarFicha()` → `String`<br>`vincularCRM(idCRM: String)` → `void`<br>`actualizarEstado(estado: EstadoLead, motivo: String \| null)` → `void`<br>`reactivar()` → `Integer` | Composición → SolicitudCredito [1 — 0..1]<br>Composición → Cita [1 — 0..*]<br>Asociación → Prospecto [* — 1]<br>Asociación → Conversacion [0..1 — 1]<br>Asociación → AsesorComercial [* — 0..1]<br>Asociación → LineaCredito [* — 1]<br>Dependencia → ReglaNegocio [«usa»]<br>Dependencia ← CRMCooperativa [«usa»]<br>Dependencia ← July [«llama»] | «entidad» |
| [`SolicitudCredito`](#solicitudcredito) | Datos que el prospecto entrega para pedir el crédito y su precalificación. | Entidad de negocio | `idSolicitud`: `UUID`<br>`lead`: `Lead`<br>`monto`: `Decimal [0..1]`<br>`plazo`: `Integer [0..1]`<br>`destino`: `String [0..1]`<br>`ingresosMensuales`: `Decimal [0..1]`<br>`actividadEconomica`: `String [0..1]`<br>`estado`: `EstadoSolicitud`<br>`simulacionElegida`: `Simulacion [0..1]`<br>`resultado`: `ResultadoPrecalificacion [0..1]`<br>`capacidadPago`: `Decimal [0..1]`<br>`factores`: `List<String>`<br>`resultadoCondicionado`: `Boolean`<br>`numeroCasoRevision`: `String [0..1]`<br>`documentosRecibidos`: `List<String>` | `iniciar(lead: Lead)` → `SolicitudCredito`<br>`campoPendiente()` → `CampoSolicitud \| null`<br>`registrarDato(campo: CampoSolicitud, valor: String)` → `String \| null`<br>`resumir()` → `String`<br>`actualizarEstado(estado: EstadoSolicitud)` → `void`<br>`precalificar(reglas: ReglaNegocio)` → `ResultadoPrecalificacion`<br>`explicarResultado()` → `String`<br>`derivarARevision()` → `String`<br>`registrarDocumento(documento: String)` → `void` | Composición ← Lead [1 — 0..1]<br>Composición → Simulacion [1 — 0..*]<br>Asociación → Simulacion [0..1 — 0..1]<br>Dependencia → ReglaNegocio [«usa»]<br>Dependencia ← July [«llama»] | «entidad» |
| [`Simulacion`](#simulacion) | Un escenario de crédito: un monto a un plazo con su cuota y su costo. | Entidad de negocio | `idSimulacion`: `UUID`<br>`solicitud`: `SolicitudCredito`<br>`monto`: `Decimal`<br>`plazo`: `Integer`<br>`tasa`: `Decimal`<br>`cuotaMensual`: `Decimal`<br>`intereses`: `Decimal`<br>`seguros`: `Decimal`<br>`cargos`: `Decimal`<br>`totalPagar`: `Decimal` | `calcular(solicitud: SolicitudCredito, monto: Decimal, plazo: Integer)` → `Simulacion`<br>`generarTablaAmortizacion()` → `List<Map<String, Decimal>>`<br>`elegir()` → `void`<br>`sugerirAlternativa(capacidadPago: Decimal)` → `Simulacion` | Composición ← SolicitudCredito [1 — 0..*]<br>Asociación ← SolicitudCredito [0..1 — 0..1]<br>Dependencia ← July [«llama»] | «entidad» |
| [`Cita`](#cita) | Cita del prospecto en una agencia, con su estado y su recordatorio. | Entidad de negocio | `idCita`: `UUID`<br>`lead`: `Lead`<br>`agencia`: `String`<br>`fechaHora`: `DateTime`<br>`estado`: `EstadoCita`<br>`fechaRecordatorio`: `DateTime [0..1]` | `reservar(lead: Lead, agencia: String, fechaHora: DateTime)` → `Cita`<br>`reprogramar(fechaHora: DateTime)` → `void`<br>`actualizarEstado(estado: EstadoCita)` → `void`<br>`programarRecordatorio(fecha: DateTime)` → `void` | Composición ← Lead [1 — 0..*]<br>Dependencia ← July [«llama»] | «entidad» |
| [`Configuracion`](#configuracion) | Clase abstracta de lo que publica un colaborador por versiones y July solo lee: líneas de crédito, plantillas y reglas. | Configuración | `version`: `String`<br>`vigente`: `Boolean`<br>`publicadoPor`: `Colaborador` | — | Asociación → Colaborador [* — 1]<br>Generalización ← LineaCredito [—]<br>Generalización ← PlantillaMensaje [—]<br>Generalización ← ReglaNegocio [—] | «entidad» abstracta |
| [`LineaCredito`](#lineacredito) | Producto de crédito del catálogo que publica el Área de productos y crédito, con sus condiciones y requisitos. | Configuración | `codigo`: `String`<br>`nombre`: `String`<br>`tasa`: `Decimal`<br>`plazos`: `List<Integer>`<br>`montoMinimo`: `Decimal`<br>`montoMaximo`: `Decimal`<br>`palabrasClave`: `List<String>`<br>`requisitos`: `List<String>`<br>`requisitosAfiliacion`: `List<String>` | `buscar(criterio: String)` → `LineaCredito \| null`<br>`validarCondiciones(monto: Decimal, plazo: Integer \| null)` → `String \| null`<br>`requisitosPara(condicion: CondicionSocio)` → `List<String>` | Asociación ← Lead [* — 1]<br>Generalización → Configuracion [—]<br>Dependencia ← July [«llama»] | «entidad» |
| [`PlantillaMensaje`](#plantillamensaje) | Contenido conversacional que publica el Administrador del asistente: guion de bienvenida, aviso de privacidad, menús, preguntas frecuentes y plantillas de retoma, recordatorio y reactivación. | Configuración | `tipo`: `TipoPlantilla`<br>`clave`: `String`<br>`texto`: `String`<br>`opciones`: `List<String>`<br>`plantillaProveedor`: `String [0..1]` | `componer(datos: Map<String, String>)` → `String`<br>`buscarRespuesta(texto: String)` → `PlantillaMensaje \| null` | Generalización → Configuracion [—]<br>Dependencia ← July [«llama»] | «entidad» |
| [`ReglaNegocio`](#reglanegocio) | Parámetros de decisión publicados por versiones: reglas de precalificación (Comité de crédito), criterios de prioridad y reglas de enrutamiento (Jefe comercial). | Configuración | `tipo`: `TipoRegla`<br>`parametros`: `Map<String, String>` | — | Generalización → Configuracion [—]<br>Dependencia ← Lead [«usa»]<br>Dependencia ← SolicitudCredito [«usa»] | «entidad» |
