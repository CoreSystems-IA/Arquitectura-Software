# Diccionario de datos — etapa 3

| Campo | Valor |
|---|---|
| **ID** | CLS-01 |
| **Versión** | 2.3 |
| **Fecha** | 2026-10-29 |
| **Deriva de** | [CU-08 · Especificaciones de casos de uso](../03-casos-de-uso/especificaciones-casos-de-uso.md) |
| **Estado** | Borrador |

Diccionario de datos del asistente July (Cooperativa Padre Julián Lorente). Cada clase sale de los sustantivos de CU-08, cada método de sus verbos y cada relación de quién interactúa con quién. La tabla de resumen está al final ([ir](#7-tabla-de-resumen)).

## Contenido

1. [Criterios de consolidación](#1-criterios-de-consolidación)
2. [Convenciones](#2-convenciones)
3. [Enumeraciones](#3-enumeraciones)
4. [Diccionario por entidad](#4-diccionario-por-entidad)
5. [Relaciones](#5-relaciones)
6. [Trazabilidad con CU-08](#6-trazabilidad-con-cu-08)
7. [Tabla de resumen](#7-tabla-de-resumen)

## 1. Criterios de consolidación

CU-08 nombra **46 entidades** y **185 métodos distintos**: una clase por sustantivo y un método por oración. Para un chatbot eso es demasiado, y muchos de esos métodos hacen lo mismo. El diccionario los reduce a **15 clases** y **55 métodos** con un criterio de programador: **solo es clase lo que tiene identidad propia y cambia de estado en la conversación, o un sistema con el que July habla.** Todo lo demás pasa a atributo, a enumeración o al retorno de un método.

| # | Regla | Ejemplo en CU-08 | Queda como |
|---|---|---|---|
| 1 | **Lo que dice el prospecto es una entrada, no un método.** Los pasos *Prospecto → July* (solicita, consulta, describe, selecciona) llegan como un `Mensaje` y los atiende `July.atender()`. Si el paso cambia datos, se usa el método de la entidad que los guarda. | «El Prospecto solicita la simulación…», «El Prospecto confirma el escenario…» | `July.atender()`; `Simulacion.elegir()` |
| 2 | **Todo lo que July dice al prospecto es un solo método.** Presenta, informa, ofrece, explica, muestra, avisa y envía se resuelven con `Conversacion.enviarMensaje()`; la entidad solo arma el contenido. | 19 métodos distintos de CU-08 en 23 pasos | `Conversacion.enviarMensaje()` + `SolicitudCredito.explicarResultado()`, `resumir()`… |
| 3 | **Todo aviso interno es un solo método.** Los avisos a asesores, jefe comercial, agencia y marketing son `July.notificar()`. | `Lead.notificar`, `Lead.informarFrio`, `Cita.notificar`, `EnvioCRM.avisarPendiente`… | `July.notificar()` |
| 4 | **La captura de datos pasa por un solo punto.** Pedir el siguiente dato y registrarlo con su validación es igual para cédula, teléfono, monto, ingresos o una corrección. | `entregarCedula`, `validarFormatoCedula`, `entregarTelefono`, `validarMonto`, `corregirDato`… | `SolicitudCredito.campoPendiente()` y `registrarDato()` |
| 5 | **Los pares consulta / entrega de configuración son una lectura.** El contenido conversacional se lee con `PlantillaMensaje.obtenerVigente()` y las reglas con `ReglaNegocio.obtenerVigente()`. | `GuionBienvenida`, `MenuOpciones`, `PreguntaFrecuente`; `ReglaPrecalificacion`, `CriterioPrioridad`, `ReglaEnrutamiento` | `PlantillaMensaje`, `ReglaNegocio` |
| 6 | **Un sistema externo responde con el retorno de su método,** y sus fallas y reintentos quedan dentro de ese método. | `Socio.consultar` + `responderCondicion` + `responderSinRegistro`; `EnvioCRM`, `ErrorIntegracion` | `SistemaCore.consultarSocio()` → `CondicionSocio`; `CRMCooperativa.sincronizarLead()` |
| 7 | **Lo que es 1 a 1 con otra clase se vuelve atributo suyo.** | `Consentimiento`, `Socio` → `Prospecto`; `Precalificacion`, `PerfilEconomico`, `CasoRevision` → `SolicitudCredito`; `AsignacionLead` → `Lead`; `OrigenConversacion`, `SesionChat` → `Conversacion` | Atributos |
| 8 | **Un estado se cambia con un método `actualizarEstado()`**, no con un método por transición. | `confirmar`, `enviar` al comité, `comunicar` resolución; `confirmarAsistencia`, `atender` | `SolicitudCredito.actualizarEstado()`, `Cita.actualizarEstado()` |
| 9 | **Un actor que solo publica configuración o recibe avisos no es una clase.** Jefe comercial, Personal de agencia, Comité de crédito, Área de productos, Administrador, Marketing y Delegado de protección de datos aparecen como `publicadoPor` o como destinatario de `notificar()`. Solo `AsesorComercial` es clase, porque guarda disponibilidad y carga. | 8 actores internos | `AsesorComercial` |

Las enumeraciones de la sección 3 no son entidades: son los valores permitidos de un atributo. En el diagrama de clases pueden ir como «enumeration» al costado o quedarse solo en este diccionario.

La sección [6](#6-trazabilidad-con-cu-08) muestra a dónde fue cada entidad y cada método de CU-08. Ningún paso quedó sin método.

## 2. Convenciones

| Elemento | Convención |
|---|---|
| Clase | `PascalCase`, en singular. |
| Atributo y método | `camelCase`. Los métodos empiezan con un verbo en infinitivo. |
| Tipos | `String`, `Integer`, `Decimal` (dinero y tasas), `Boolean`, `Date`, `DateTime`, `Duration`, `UUID`, `List<T>`, `Map<K, V>` y las enumeraciones de la sección 3. |
| `[0..1]` | Atributo opcional. Sin marca, el atributo es obligatorio. |
| `T \| null` | En una salida, el método puede devolver «no encontrado» o «sin error». En una entrada, el dato puede no venir. |
| `/atributo` | Atributo derivado: se calcula a partir de otros datos y no se guarda. |
| «estático» | El método crea la instancia o busca entre todas; no se llama sobre un objeto existente. |
| Atributo con tipo de clase | Es el extremo navegable de una relación de la sección 5: la clase que lo tiene llega a la otra. La columna «Navegación» de la sección 5 dice en qué sentido se recorre cada relación. |

**Naturaleza** de cada clase, según los estereotipos de análisis de UML:

| Naturaleza | Significado | Clases |
|---|---|---|
| «entidad» | Guarda información del negocio que persiste más allá de una conversación. | `Prospecto`, `AsesorComercial`, `Conversacion`, `Mensaje`, `Lead`, `SolicitudCredito`, `Simulacion`, `Cita`, `LineaCredito`, `PlantillaMensaje`, `ReglaNegocio` |
| «control» | Coordina el flujo de los casos de uso; no guarda datos de negocio. | `July` |
| «interfaz» | Frontera con un sistema externo; se modela solo lo que July le pide. | `Canal`, `SistemaCore`, `CRMCooperativa` |

**Categoría** de cada clase, dentro de su naturaleza:

| Categoría | Significado |
|---|---|
| Control | El sistema que se diseña (July). Coordina, no guarda datos de negocio. |
| Entidad de negocio | Tiene identidad y ciclo de vida; se persiste. |
| Actor (entidad) | Persona que actúa en los casos de uso y de la que se guardan datos. |
| Configuración | Lo publica un actor de la cooperativa por versiones; July solo lo lee. |
| Sistema externo | Sistema fuera de July; se modela solo su interfaz. |

## 3. Enumeraciones

| Enumeración | Valores |
|---|---|
| `TipoCanal` | WHATSAPP, WEB |
| `Emisor` | PROSPECTO, JULY, ASESOR |
| `TipoMensaje` | TEXTO, AUDIO, IMAGEN, PLANTILLA |
| `EstadoConversacion` | ACTIVA, DERIVADA, ABANDONADA, CERRADA |
| `CondicionSocio` | SOCIO, NO_SOCIO, POR_VERIFICAR |
| `EstadoLead` | NUEVO, EN_CAPTURA, PRECALIFICADO, ASIGNADO, EN_GESTION, DESEMBOLSADO, PERDIDO |
| `Prioridad` | CALIENTE, TIBIO, FRIO |
| `CampoSolicitud` | NOMBRES, CEDULA, CORREO, TELEFONO, MONTO, PLAZO, DESTINO, INGRESOS_MENSUALES, ACTIVIDAD_ECONOMICA |
| `EstadoSolicitud` | EN_CAPTURA, CONFIRMADA, EN_RESOLUCION, APROBADA, NEGADA |
| `ResultadoPrecalificacion` | APTO, NO_APTO, A_REVISAR |
| `EstadoCita` | RESERVADA, CONFIRMADA, REPROGRAMADA, ATENDIDA |
| `TipoPlantilla` | BIENVENIDA, AVISO_PRIVACIDAD, MENU, MENU_BASICO, PREGUNTA_FRECUENTE, RETOMA, RECORDATORIO, REACTIVACION |
| `TipoRegla` | PRECALIFICACION, PRIORIDAD, ENRUTAMIENTO |

**Transiciones de `EstadoLead`.** Cada estado lo fija un único método, en el paso de CU-08 indicado:

| Estado | Lo fija | Paso de CU-08 |
|---|---|---|
| NUEVO | `Lead.registrar()` | 1.2.2 (7, A3·7c, A4·5d) |
| EN_CAPTURA | `SolicitudCredito.iniciar()` | 2.1.1 (1) |
| PRECALIFICADO | `SolicitudCredito.precalificar()` | 2.3.1 (7, A2·7b). Solo los APTO o A_REVISAR pasan al flujo 3. |
| ASIGNADO | `Lead.asignar()` | 3.2.1 (4, A1·7a) |
| EN_GESTION | `Lead.aceptarAsignacion()` | 3.2.1 (6) |
| DESEMBOLSADO, PERDIDO | `Lead.actualizarEstado()` | 3.2.2 (12) |

Un lead NO_APTO se queda en PRECALIFICADO: recibe una alternativa (2.3.2·A1·4a) y, si vuelve a simular, `precalificar()` lo clasifica de nuevo. No entra al flujo 3 ni pasa a PERDIDO, porque CU-08 no tiene un paso que lo cierre.

**Transiciones de `EstadoConversacion`:**

| Estado | Lo fija | Paso de CU-08 |
|---|---|---|
| ACTIVA | `Conversacion.abrir()`; `Conversacion.retomar()` la reactiva | 1.1 (1); 2.1.2 (A4·9d) |
| DERIVADA | `Conversacion.traspasar()` | 1.2.1 (A2·11b); 3.2.1 (7) |
| ABANDONADA | `Conversacion.marcarAbandonada()` | 2.1.2 (A4·8d) |
| CERRADA | `Lead.actualizarEstado()`, al llevar el lead a DESEMBOLSADO o PERDIDO | 3.2.2 (12) |

Una conversación sin lead (por ejemplo, la que solo resolvió una pregunta frecuente) no se cierra: pasa a ABANDONADA al vencer `July.tiempoAbandono`.

**Transiciones de `EstadoSolicitud`:**

| Estado | Lo fija | Paso de CU-08 |
|---|---|---|
| EN_CAPTURA | `SolicitudCredito.iniciar()` | 2.1.1 (1) |
| CONFIRMADA | `SolicitudCredito.actualizarEstado()` | 2.1.1 (10) |
| EN_RESOLUCION | `SolicitudCredito.actualizarEstado()` | 3.2.2 (9) |
| APROBADA, NEGADA | `SolicitudCredito.actualizarEstado()` | 3.2.2 (10) |

`derivarARevision()` no cambia el estado: la revisión de un caso A_REVISAR es preliminar y la solicitud sigue CONFIRMADA, con `resultado` = A_REVISAR y su `numeroCasoRevision`. EN_RESOLUCION es la solicitud formal que se envía al comité con los documentos ya recibidos en agencia.

**Transiciones de `EstadoCita`.** RESERVADA: la agencia bloqueó el horario y confirmó la reserva (2.3.2·10 a 12). CONFIRMADA: el prospecto confirmó su asistencia (3.2.2·4). REPROGRAMADA: se cambió el horario (3.2.2·A3·7c). ATENDIDA: la agencia atendió al prospecto (3.2.2·6).

## 4. Diccionario por entidad

### El asistente y los sistemas con los que habla

#### July

**Naturaleza:** «control» · **Categoría:** Control  
Asistente virtual de la cooperativa: el sistema que se diseña. Recibe cada mensaje, decide qué caso de uso lo atiende y avisa a los colaboradores.

| Atributo | Tipo | Descripción |
|---|---|---|
| `capacidadMaxima` | `Integer` | Conversaciones que atiende a la vez; por encima, los mensajes esperan en cola. |
| `tiempoRespuestaObjetivo` | `Duration` | Tiempo máximo de primera respuesta (2 minutos). |
| `tiempoAbandono` | `Duration` | Tiempo sin respuesta del prospecto tras el cual la conversación pasa a ABANDONADA. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `atender()` | `mensaje: Mensaje` | `void` | Recibe un mensaje entrante y lo enruta al paso del flujo que corresponde: consulta, dato, selección, confirmación o pedido. En un pico de demanda lo deja en cola y avisa el tiempo de espera. | 1.1.2 (A3·7c); 1.2 (1, 5); 1.2.1 (1, 8, A2·8b); 1.2.2 (1, 4); 2.1.1 (A1·5a); 2.1.2 (A4·11d); 2.2 (1); 2.2.1 (1, 5, 8); 2.2.2 (1); 2.3 (1, 4, 6); 2.3.1 (1); 2.3.2 (1, 3, 5, 9, A1·3a); 3.2.2 (A3·4c) |
| `notificar()` | `destinatario: String, contenido: String` | `void` | Envía un aviso interno a un colaborador o a un área: lead asignado, reasignación, lead frío, registro pendiente en el CRM, cita reservada, asistencia confirmada, cita atendida, resolución del crédito, origen de campaña o retiro del consentimiento. Lo entrega el Servicio de notificaciones del modelo ArchiMate: en el panel si el destinatario es un asesor y por correo si es un área. | 1.1.1 (4, A2·4b); 1.2.1 (A2·9b); 2.3.2 (11); 3.1.2 (A3·7c); 3.2 (3); 3.2.1 (5, A1·8a); 3.2.2 (5, 7, 11, A2·6b) |

**Relaciones:**

- **Dependencia** («usa») hacia `Conversacion`: Registra y enruta cada mensaje.
- **Dependencia** («usa») hacia `Canal`: Recibe los mensajes de los canales.
- **Dependencia** («usa») hacia `SistemaCore`: Valida cédulas y consulta socios.
- **Dependencia** («usa») hacia `CRMCooperativa`: Sincroniza los leads.
- **Dependencia** («usa») hacia `Mensaje`: Recibe cada mensaje entrante.

#### Canal

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
Canal digital por el que llega y sale la conversación: WhatsApp Business API o el widget web. Convierte el formato de cada proveedor al formato común de July.

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoCanal` | WHATSAPP o WEB. |
| `credencial` | `String` | Clave de firma del webhook (WhatsApp) o secreto de sesión (web). |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `recibir()` | `carga: String` | `Mensaje` | Convierte la carga del proveedor al formato común y la devuelve como `Mensaje`. Responder sin error es el acuse de recepción al proveedor. | 1.1 (1, 3); 1.1.1 (1, 2, A1·3a, A1·4a); 1.1.2 (1, 2, 4, 5, 6, A1·1a, A1·2a) |
| `verificarAutenticidad()` | `carga: String, firma: String` | `Boolean` | Comprueba la firma del webhook o el token de la sesión web. Si es falsa, la carga se rechaza. | 1.1.2 (3, A1·3a, A2·4b, A2·5b) |
| `enviar()` | `destino: String, mensaje: Mensaje` | `void` | Entrega un mensaje o una plantilla al prospecto. | 2.1.2 (A4·10d); 3.2.2 (3) |
| `abrirSesion()` | `paginaOrigen: String` | `String` | Solo web: abre la sesión de chat desde una página del sitio y devuelve el token. | 1.1.1 (A1·1a, A1·2a) |

**Relaciones:**

- **Dependencia** («crea») hacia `Mensaje`: Convierte cada carga en un Mensaje.
- **Dependencia** («usa») desde `July`: Recibe los mensajes de los canales.
- **Dependencia** («usa») desde `Conversacion`: Envía los mensajes de salida.

#### SistemaCore

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
Sistema transaccional de la cooperativa: fuente oficial de socios y de identidad.

| Atributo | Tipo | Descripción |
|---|---|---|
| `urlServicio` | `String` | Dirección del servicio. |
| `tiempoMaximoRespuesta` | `Duration` | Pasado este tiempo, la consulta se da por fallida y el socio queda por verificar. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `validarCedula()` | `cedula: String` | `Boolean` | Verifica que la cédula exista y esté habilitada. | 2.1.2 (3, 4, A3·4c) |
| `consultarSocio()` | `prospecto: Prospecto` | `CondicionSocio` | Busca al socio por la cédula o, si aún no la hay, por el teléfono del prospecto. Si hay registro, completa en el prospecto sus datos registrados (nombres, cédula, correo, fecha de ingreso, edad y actividad) y devuelve SOCIO; sin registro devuelve NO_SOCIO; si no responde en `tiempoMaximoRespuesta`, devuelve POR_VERIFICAR. | 1.2.2 (5, 6, A3·6c); 2.3.1 (4, 5, A1·5a) |

**Relaciones:**

- **Dependencia** («usa») hacia `Prospecto`: Completa los datos registrados del socio.
- **Dependencia** («usa») desde `July`: Valida cédulas y consulta socios.

#### CRMCooperativa

**Naturaleza:** «interfaz» · **Categoría:** Sistema externo  
CRM comercial donde se gestiona el embudo de ventas.

| Atributo | Tipo | Descripción |
|---|---|---|
| `urlServicio` | `String` | Dirección de la API. |
| `maxIntentos` | `Integer` | Intentos con espera progresiva antes de dejar el registro pendiente. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `buscarLead()` | `cedula: String, telefono: String` | `String \| null` | Busca un registro previo del lead y devuelve su idCRM, o null. | 3.1.2 (1, 2, A1·2a) |
| `sincronizarLead()` | `lead: Lead` | `String` | Crea el lead si no tiene idCRM o lo actualiza si ya existe (datos, ficha y estado final). Reintenta con espera progresiva y devuelve el idCRM. | 3.1 (2, 3); 3.1.2 (3, 4, A1·3a, A2·4b, A2·5b, A2·6b, A3·6c); 3.2 (5); 3.2.2 (13) |

**Relaciones:**

- **Dependencia** («usa») hacia `Lead`: Crea y actualiza el lead.
- **Dependencia** («usa») desde `July`: Sincroniza los leads.

### Personas y conversación

#### Prospecto

**Naturaleza:** «entidad» · **Categoría:** Actor (entidad)  
Persona que contacta a la cooperativa. Guarda su identidad, su condición de socio y su consentimiento de datos. Se crea con el primer mensaje (CU 1.1), cuando solo se conoce el canal y, por WhatsApp, el teléfono; los datos de identidad llegan en CU 2.1.1, por eso son opcionales.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idProspecto` | `UUID` | Identificador interno. |
| `nombres` | `String [0..1]` | Nombres y apellidos. |
| `cedula` | `String [0..1]` | 10 dígitos con dígito verificador válido. |
| `telefono` | `String [0..1]` | 10 dígitos que empiezan con 09. Llega con el primer mensaje por WhatsApp; por la web, en CU 2.1.1. |
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
| `registrarConsentimiento()` | `aceptado: Boolean, versionAviso: String` | `void` | Guarda la aceptación o el rechazo del aviso con su versión. Sin aceptación solo se ofrece el menú básico. También registra el retiro del consentimiento (regla R2 de CU-08). | 1.2 (3); 1.2.1 (5, 6, A1·5a, A1·6a) |

**Relaciones:**

- **Asociación** desde `Conversacion` (* — 1): Con quién se conversa.
- **Asociación** desde `Lead` (* — 1): Prospecto interesado.
- **Dependencia** («usa») desde `SistemaCore`: Completa los datos registrados del socio.

#### AsesorComercial

**Naturaleza:** «entidad» · **Categoría:** Actor (entidad)  
Colaborador que atiende leads. Es el único actor interno con clase propia, porque el enrutamiento necesita su disponibilidad y su carga; los demás (Jefe comercial, Personal de agencia, Comité de crédito, áreas) solo reciben avisos o publican configuración.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idAsesor` | `UUID` | Identificador interno. |
| `nombre` | `String` | Nombre completo. |
| `agencia` | `String` | Código de la agencia donde trabaja (el mismo que usa `Cita.agencia`). |
| `productos` | `List<String>` | Códigos de las líneas que atiende. |
| `disponible` | `Boolean` | Si puede recibir leads ahora. |
| `leads` | `List<Lead>` | Leads que tiene asignados. Es el extremo de `Lead.asesor`: la asociación se recorre en ambos sentidos. |
| `/cargaActual` | `Integer` | Derivado: cantidad de sus `leads` en ASIGNADO o EN_GESTION. No se guarda; se calcula. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `cambiarDisponibilidad()` | `disponible: Boolean` | `void` | Marca al asesor como disponible o no disponible para recibir leads. | 3.2 (1); 3.2.1 (1) |

**Relaciones:**

- **Asociación** desde `Conversacion` (* — 0..1): Asesor tras el traspaso.
- **Asociación** desde `Lead` (* — 0..1), navegable en ambos sentidos: Asesor asignado; de ella sale `/cargaActual`.

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
| `estado` | `EstadoConversacion` | ACTIVA, DERIVADA, ABANDONADA o CERRADA. |
| `ultimoPaso` | `String` | Último paso guardado; desde ahí se retoma. |
| `fechaUltimaActividad` | `DateTime` | Base para detectar abandono. |
| `asesorAsignado` | `AsesorComercial [0..1]` | Asesor tras un traspaso. |
| `historial` | `List<Mensaje>` | Mensajes en orden cronológico. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `abrir()` | `canal: TipoCanal, prospecto: Prospecto, tokenSesion: String \| null` | `Conversacion` | «estático» Crea la conversación con el primer mensaje del prospecto. | 1.1 (1) |
| `registrarMensaje()` | `mensaje: Mensaje` | `void` | Añade un mensaje entrante al historial y actualiza la última actividad. | 3.2.1 (9) |
| `enviarMensaje()` | `emisor: Emisor, contenido: String, opciones: List<String>` | `Mensaje` | Registra y envía por el canal un mensaje de July o del asesor. Las opciones, si las hay, se muestran como respuestas cerradas. | 1.1 (4); 1.1.2 (7, A3·8c); 1.2 (7); 1.2.1 (A2·12b); 1.2.2 (3, 8, A1·3a); 2.1.1 (A1·4a); 2.1.2 (6, A3·5c); 2.2 (5); 2.2.1 (4, 7, 10, A1·3a); 2.2.2 (10); 2.3 (7); 2.3.1 (A2·10b); 2.3.2 (8, 13); 3.2.1 (8); 3.2.2 (A3·8c) |
| `etiquetarOrigen()` | `campana: String \| null` | `void` | Guarda la campaña de origen; null = origen directo. | 1.1 (2); 1.1.1 (3, A2·3b) |
| `guardarAvance()` | `paso: String` | `void` | Guarda el último paso completado del flujo. | 2.1 (5); 2.1.2 (5) |
| `marcarAbandonada()` | `—` | `void` | Pasa la conversación a ABANDONADA. La llama `July` cuando vence su `tiempoAbandono` sin respuesta del prospecto. | 2.1.2 (A4·7d, A4·8d) |
| `retomar()` | `—` | `void` | Envía la plantilla de retoma con el último paso guardado y reactiva la conversación desde ese paso. | 2.1.2 (A4·9d, A4·12d) |
| `traspasar()` | `asesor: AsesorComercial` | `void` | Pasa la conversación, con su historial, al asesor que aceptó; el estado pasa a DERIVADA. | 1.2.1 (A2·10b, A2·11b); 3.2.1 (7) |

**Relaciones:**

- **Composición** con `Mensaje` (1 — 0..*): El historial no existe sin la conversación.
- **Asociación** con `Prospecto` (* — 1): Con quién se conversa.
- **Asociación** con `AsesorComercial` (* — 0..1): Asesor tras el traspaso.
- **Dependencia** («usa») hacia `Canal`: Envía los mensajes de salida.
- **Dependencia** («usa») hacia `PlantillaMensaje`: Bienvenida, menús y retoma.
- **Asociación** desde `Lead` (0..1 — 1): Conversación de origen. Una conversación que solo resolvió una pregunta frecuente no tiene lead.
- **Dependencia** («usa») desde `July`: Registra y enruta cada mensaje.

#### Mensaje

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Un mensaje en formato común, sin importar el canal.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idMensaje` | `UUID` | Identificador interno. |
| `idExterno` | `String` | Identificador del proveedor; evita procesar dos veces el mismo mensaje. |
| `emisor` | `Emisor` | PROSPECTO, JULY o ASESOR. |
| `tipo` | `TipoMensaje` | TEXTO, AUDIO, IMAGEN o PLANTILLA. |
| `contenido` | `String` | Texto o transcripción. |
| `adjuntos` | `List<String>` | Enlaces a audio o imagen. |
| `fechaHora` | `DateTime` | Momento de envío o recepción. |

**Relaciones:**

- **Composición** desde `Conversacion` (1 — 0..*): El historial no existe sin la conversación.
- **Dependencia** («crea») desde `Canal`: Convierte cada carga en un Mensaje.
- **Dependencia** («usa») desde `July`: Recibe cada mensaje entrante.

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
| `lineaCredito` | `LineaCredito` | Línea de crédito del lead y de su solicitud: la confirmada en CU 1.2.2 o la elegida después en CU 2.2.2. Es la única referencia a la línea; la solicitud y la simulación la toman de aquí. |
| `necesidad` | `String` | Necesidad descrita con las palabras del prospecto. |
| `prioridad` | `Prioridad [0..1]` | CALIENTE, TIBIO o FRIO. |
| `estado` | `EstadoLead` | Etapa del embudo. |
| `asesor` | `AsesorComercial [0..1]` | Asesor asignado. |
| `solicitud` | `SolicitudCredito [0..1]` | Solicitud del lead; `generarFicha()` toma de ella la simulación elegida y la precalificación. |
| `citas` | `List<Cita>` | Citas del lead; `asignar()` toma de ellas la agencia. |
| `fechaAsignacion` | `DateTime [0..1]` | Inicio del plazo de atención. Que el asesor aceptó se ve en `estado` = EN_GESTION. |
| `intentosReactivacion` | `Integer` | Reactivaciones enviadas sin respuesta. |
| `idCRM` | `String [0..1]` | Identificador en el CRM. |
| `motivoCierre` | `String [0..1]` | Motivo cuando el estado final es PERDIDO. |
| `fechaRegistro` | `DateTime` | Momento del registro. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `registrar()` | `prospecto: Prospecto, conversacion: Conversacion, linea: LineaCredito, necesidad: String` | `Lead` | «estático» Crea el lead en estado NUEVO y genera su número de seguimiento. | 1.2 (6); 1.2.2 (7, A3·7c, A4·5d) |
| `elegirLinea()` | `linea: LineaCredito` | `void` | Cambia la línea del lead por la que el prospecto elige en el catálogo. Si la solicitud ya tiene monto o plazo, se vuelven a validar con la nueva línea al simular. | 2.2 (3); 2.2.2 (5) |
| `priorizar()` | `criterios: ReglaNegocio` | `Prioridad` | Calcula la prioridad con los criterios del Jefe comercial; tras las reactivaciones sin respuesta el resultado es FRIO. | 3.1.1 (3); 3.2.2 (A2·5b) |
| `asignar()` | `enrutamiento: ReglaNegocio, asesores: List<AsesorComercial>` | `AsesorComercial` | Elige un asesor disponible por agencia, producto y carga, pasa el lead a ASIGNADO e inicia el plazo de atención (parámetro `plazoAtencion` de la regla). Si el plazo venció, reasigna excluyendo al asesor anterior. | 3.2 (2); 3.2.1 (4, A1·6a, A1·7a) |
| `aceptarAsignacion()` | `—` | `void` | Registra que el asesor aceptó el lead dentro del plazo y lo pasa a EN_GESTION. | 3.2.1 (6) |
| `generarFicha()` | `—` | `String` | Consolida datos, simulación elegida, precalificación, prioridad e historial en la ficha del prospecto, con los datos faltantes marcados. Se genera al terminar una precalificación APTO o A_REVISAR, antes de asignar el lead. | 3.1 (1); 3.1.1 (3, 4, A1·3a) |
| `vincularCRM()` | `idCRM: String` | `void` | Guarda el identificador devuelto por el CRM. | 3.1 (4); 3.1.2 (5) |
| `actualizarEstado()` | `estado: EstadoLead, motivo: String \| null` | `void` | Avanza el lead en el embudo. El motivo es obligatorio para PERDIDO. Al llegar a DESEMBOLSADO o PERDIDO, cierra su conversación (CERRADA). | 3.2 (4); 3.2.2 (12) |
| `reactivar()` | `—` | `void` | Envía la plantilla de reactivación y suma un intento. Los intentos se agotan al llegar al parámetro `maxReactivaciones` de la regla de PRIORIDAD. | 3.2.2 (A1·4a, A1·5a) |

**Relaciones:**

- **Composición** con `SolicitudCredito` (1 — 0..1), navegable en ambos sentidos: La solicitud pertenece al lead.
- **Composición** con `Cita` (1 — 0..*), navegable en ambos sentidos: Citas agendadas para el lead.
- **Asociación** con `Prospecto` (* — 1): Prospecto interesado.
- **Asociación** con `Conversacion` (0..1 — 1): Conversación de origen.
- **Asociación** con `AsesorComercial` (* — 0..1), navegable en ambos sentidos: Asesor asignado.
- **Asociación** con `LineaCredito` (* — 1): Línea del lead y de su solicitud.
- **Dependencia** («usa») hacia `ReglaNegocio`: Criterios de prioridad y enrutamiento.
- **Dependencia** («usa») hacia `PlantillaMensaje`: Plantilla de reactivación.
- **Dependencia** («usa») desde `CRMCooperativa`: Crea y actualiza el lead.

#### SolicitudCredito

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Datos que el prospecto entrega para pedir el crédito y su precalificación. Los datos de identidad se guardan en Prospecto y la línea, en el Lead. Los datos de captura son opcionales mientras la solicitud está EN_CAPTURA; `actualizarEstado(CONFIRMADA)` exige que estén todos.

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
| `iniciar()` | `lead: Lead` | `SolicitudCredito` | «estático» Abre la solicitud en EN_CAPTURA para la línea del lead y pasa el lead a EN_CAPTURA. | 2.1 (1); 2.1.1 (1) |
| `campoPendiente()` | `—` | `CampoSolicitud \| null` | Devuelve el siguiente dato que falta pedir; null cuando la captura está completa. | 2.1 (2); 2.1.1 (2, 4, 6); 2.1.2 (A4·13d) |
| `registrarDato()` | `campo: CampoSolicitud, valor: String` | `String \| null` | Valida y guarda un dato, también al corregirlo: formato de cédula, teléfono y correo; rango de monto y plazo con la línea. Devuelve el motivo del error o null. | 2.1 (3, 4); 2.1.1 (3, 5, 7, A2·10b); 2.1.2 (1, 2, A1·1a, A1·2a, A2·1b, A2·2b) |
| `resumir()` | `—` | `String` | Arma el resumen de todos los datos para que el prospecto lo confirme. | 2.1 (6); 2.1.1 (8, 9) |
| `actualizarEstado()` | `estado: EstadoSolicitud` | `void` | Confirma la solicitud (exige captura completa), la envía al Comité de crédito (EN_RESOLUCION) o registra la resolución que el comité comunica a July (APROBADA o NEGADA). | 2.1 (7); 2.1.1 (10); 3.2.2 (9, 10) |
| `precalificar()` | `reglas: ReglaNegocio` | `ResultadoPrecalificacion` | Calcula la capacidad de pago y clasifica la simulación elegida con las reglas del comité, y pasa el lead a PRECALIFICADO. Sin registro del core usa solo datos declarados y marca el resultado como condicionado. | 2.3 (2); 2.3.1 (6, 7, A1·6a, A2·7b) |
| `explicarResultado()` | `—` | `String` | Explica el resultado preliminar y los factores; para NO_APTO incluye el motivo. | 2.3 (3); 2.3.1 (8); 2.3.2 (2, A1·2a) |
| `derivarARevision()` | `—` | `String` | Envía el caso A_REVISAR al Comité de crédito para una revisión preliminar y devuelve el número de caso. No cambia el estado de la solicitud. | 2.3.1 (A2·8b, A2·9b) |
| `registrarDocumento()` | `documento: String` | `void` | Marca un documento como recibido en agencia; lo registra el asesor en July. | 3.2.2 (8) |

**Relaciones:**

- **Composición** con `Simulacion` (1 — 0..*), navegable de la simulación a la solicitud: Simulaciones calculadas para comparar.
- **Asociación** con `Simulacion` (0..1 — 0..1): Simulación elegida (una de las suyas).
- **Dependencia** («usa») hacia `ReglaNegocio`: Reglas de precalificación.
- **Composición** desde `Lead` (1 — 0..1), navegable en ambos sentidos: La solicitud pertenece al lead.

#### Simulacion

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Un escenario de crédito: un monto a un plazo con su cuota y su costo. Una solicitud puede tener varias para compararlas.

| Atributo | Tipo | Descripción |
|---|---|---|
| `idSimulacion` | `UUID` | Identificador interno. |
| `solicitud` | `SolicitudCredito` | Solicitud simulada. |
| `monto` | `Decimal` | Monto simulado. |
| `plazo` | `Integer` | Meses. |
| `tasa` | `Decimal` | Tasa anual de la línea del lead al momento de calcular. Se copia a propósito: si la línea cambia de versión, la simulación conserva la tasa que vio el prospecto. |
| `cuotaMensual` | `Decimal` | Cuota fija. |
| `intereses` | `Decimal` | Total de intereses. |
| `seguros` | `Decimal` | Total de seguros. |
| `cargos` | `Decimal` | Otros cargos. |
| `totalPagar` | `Decimal` | Monto + intereses + seguros + cargos. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `calcular()` | `solicitud: SolicitudCredito, monto: Decimal, plazo: Integer` | `Simulacion` | «estático» Calcula cuota, intereses, seguros, cargos y total. Requiere monto y plazo validados por la línea. | 2.2 (4); 2.2.1 (2, 6, 9) |
| `generarTablaAmortizacion()` | `—` | `List<Map<String, Decimal>>` | Devuelve cada cuota con su número, capital, interés y saldo. | 2.2.1 (3) |
| `elegir()` | `—` | `void` | La marca como la simulación elegida de su solicitud. | 2.2 (6); 2.2.1 (11, 12, A2·8b, A2·9b) |
| `sugerirAlternativa()` | `capacidadPago: Decimal` | `Simulacion` | Calcula otra simulación con un monto o plazo cuya cuota quepa en la capacidad de pago. | 2.3.2 (A1·4a) |

**Relaciones:**

- **Composición** desde `SolicitudCredito` (1 — 0..*): Simulaciones calculadas para comparar.
- **Asociación** desde `SolicitudCredito` (0..1 — 0..1): Simulación elegida (una de las suyas). Las simulaciones no elegidas no tienen solicitud en este extremo.

#### Cita

**Naturaleza:** «entidad» · **Categoría:** Entidad de negocio  
Cita del prospecto en una agencia, con su recordatorio.

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
| `consultarHorarios()` | `agencia: String, desde: Date, hasta: Date` | `List<DateTime>` | «estático» Pide a la agenda de la agencia los horarios libres del rango. Lista vacía = sin disponibilidad; ampliar el rango da las fechas más cercanas. | 2.3.2 (6, 7, A3·7c, A3·8c); 3.2.2 (A3·5c) |
| `reservar()` | `lead: Lead, agencia: String, fechaHora: DateTime` | `Cita` | «estático» Bloquea el horario en la agenda y crea la cita RESERVADA. | 2.3.2 (10, 12) |
| `reprogramar()` | `fechaHora: DateTime` | `void` | Libera el horario anterior, bloquea el nuevo y pasa a REPROGRAMADA. | 3.2.2 (A3·6c, A3·7c) |
| `actualizarEstado()` | `estado: EstadoCita` | `void` | Registra la asistencia que confirma el prospecto (CONFIRMADA) o la atención que registra el Personal de agencia (ATENDIDA). | 3.2.2 (4, 6) |
| `programarRecordatorio()` | `fecha: DateTime` | `void` | Programa y, llegada la fecha, envía la plantilla de recordatorio de documentos y cita. | 3.2.2 (1, 2) |

**Relaciones:**

- **Dependencia** («usa») hacia `PlantillaMensaje`: Plantilla de recordatorio.
- **Composición** desde `Lead` (1 — 0..*), navegable en ambos sentidos: Citas agendadas para el lead.

### Configuración

#### LineaCredito

**Naturaleza:** «entidad» · **Categoría:** Configuración  
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
| `vigente` | `Boolean` | false si el área la retiró. |
| `version` | `String` | Versión del catálogo publicado. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `listarVigentes()` | `—` | `List<LineaCredito>` | «estático» Devuelve las líneas vigentes con su tasa, plazos y requisitos; también sirve para ofrecer alternativas. | 2.2 (2); 2.2.2 (2, 3, 4, 6, 7, 8, 9, A1·8a) |
| `buscar()` | `criterio: String` | `LineaCredito \| null` | «estático» Busca entre las líneas vigentes por código, nombre o palabras clave del texto libre; así se identifica la intención. Devuelve null si no hay coincidencia o si la línea ya no está vigente. | 1.2.2 (2); 2.2.2 (A1·7a) |
| `validarCondiciones()` | `monto: Decimal, plazo: Integer \| null` | `String \| null` | Verifica que el monto esté en el rango y el plazo sea uno de los permitidos. Devuelve el motivo con los valores permitidos, o null. | 2.1.2 (A2·2b); 2.2.1 (A1·2a) |
| `requisitosPara()` | `condicion: CondicionSocio` | `List<String>` | Devuelve los documentos según la condición de socio; para un no socio añade los de afiliación. | 2.3 (5); 2.3.2 (4, A2·4b) |

**Relaciones:**

- **Asociación** desde `Lead` (* — 1): Línea del lead y de su solicitud.

#### PlantillaMensaje

**Naturaleza:** «entidad» · **Categoría:** Configuración  
Contenido conversacional que publica el Administrador del asistente: guion de bienvenida, aviso de privacidad, menús, preguntas frecuentes y plantillas de retoma, recordatorio y reactivación.

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoPlantilla` | Qué contenido es. |
| `clave` | `String` | Pregunta modelo o palabras clave (preguntas frecuentes). |
| `texto` | `String` | Texto con variables como {nombre} o {fechaCita}. |
| `opciones` | `List<String>` | Opciones del menú, si es un menú. |
| `plantillaProveedor` | `String [0..1]` | Nombre de la plantilla aprobada por Meta. Obligatorio para RETOMA, RECORDATORIO y REACTIVACION, que salen fuera de la ventana de 24 horas de WhatsApp. |
| `version` | `String` | Versión publicada. |
| `vigente` | `Boolean` | Solo una versión vigente por tipo y clave (hay muchas preguntas frecuentes vigentes, una por clave). |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `obtenerVigente()` | `tipo: TipoPlantilla` | `PlantillaMensaje` | «estático» Devuelve el contenido vigente del tipo: bienvenida, aviso, menú completo o básico, retoma, recordatorio o reactivación. | 1.2 (4); 1.2.1 (2, 3, 7, A1·7a) |
| `buscarRespuesta()` | `texto: String` | `PlantillaMensaje \| null` | «estático» Devuelve la pregunta frecuente que corresponde al texto, o null. | 1.2.2 (A2·3b) |
| `componer()` | `datos: Map<String, String>` | `String` | Reemplaza las variables y devuelve el texto final. | 1.2 (2); 1.2.1 (4) |

**Relaciones:**

- **Dependencia** («usa») desde `Conversacion`: Bienvenida, menús y retoma.
- **Dependencia** («usa») desde `Lead`: Plantilla de reactivación.
- **Dependencia** («usa») desde `Cita`: Plantilla de recordatorio.

#### ReglaNegocio

**Naturaleza:** «entidad» · **Categoría:** Configuración  
Parámetros de decisión publicados por versiones: reglas de precalificación (Comité de crédito), criterios de prioridad y reglas de enrutamiento (Jefe comercial).

| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | `TipoRegla` | PRECALIFICACION, PRIORIDAD o ENRUTAMIENTO. |
| `parametros` | `Map<String, String>` | Valores de la regla, por ejemplo: PRECALIFICACION: porcentajeMaximoCuota, edadMinima, edadMaxima. PRIORIDAD: condición de lead caliente, tibio y frío, maxReactivaciones. ENRUTAMIENTO: cargaMaxima, plazoAtencion. |
| `version` | `String` | Versión aprobada. |
| `publicadoPor` | `String` | Área responsable. |
| `vigente` | `Boolean` | Solo una versión por tipo es vigente. |

| Método | Entrada | Salida | Qué hace | Pasos de CU-08 |
|---|---|---|---|---|
| `obtenerVigente()` | `tipo: TipoRegla` | `ReglaNegocio` | «estático» Devuelve la versión vigente de la regla del tipo pedido. | 2.3.1 (2, 3); 3.1.1 (1, 2); 3.2.1 (2, 3) |

**Relaciones:**

- **Dependencia** («usa») desde `Lead`: Criterios de prioridad y enrutamiento.
- **Dependencia** («usa») desde `SolicitudCredito`: Reglas de precalificación.

## 5. Relaciones

| Tipo | Significado |
|---|---|
| Generalización | La subclase *es un* tipo de la superclase y hereda sus atributos y métodos. |
| Composición | La parte no existe sin el todo; se crea y se borra con él. |
| Agregación | El todo agrupa partes que pueden existir por su cuenta. |
| Asociación | Una clase guarda una referencia a otra. Multiplicidad: origen — destino. |
| Dependencia | Una clase usa o crea a otra en un método, sin guardarla. |

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
| 9 | `Lead` | Asociación | `AsesorComercial` | * — 0..1 | ↔ | Asesor asignado. |
| 10 | `Lead` | Asociación | `LineaCredito` | * — 1 | → | Línea del lead y de su solicitud. |
| 11 | `SolicitudCredito` | Asociación | `Simulacion` | 0..1 — 0..1 | → | Simulación elegida (una de las suyas). |
| 12 | `July` | Dependencia | `Conversacion` | «usa» | → | Registra y enruta cada mensaje. |
| 13 | `July` | Dependencia | `Canal` | «usa» | → | Recibe los mensajes de los canales. |
| 14 | `July` | Dependencia | `SistemaCore` | «usa» | → | Valida cédulas y consulta socios. |
| 15 | `July` | Dependencia | `CRMCooperativa` | «usa» | → | Sincroniza los leads. |
| 16 | `Canal` | Dependencia | `Mensaje` | «crea» | → | Convierte cada carga en un Mensaje. |
| 17 | `Conversacion` | Dependencia | `Canal` | «usa» | → | Envía los mensajes de salida. |
| 18 | `Conversacion` | Dependencia | `PlantillaMensaje` | «usa» | → | Bienvenida, menús y retoma. |
| 19 | `SistemaCore` | Dependencia | `Prospecto` | «usa» | → | Completa los datos registrados del socio. |
| 20 | `CRMCooperativa` | Dependencia | `Lead` | «usa» | → | Crea y actualiza el lead. |
| 21 | `Lead` | Dependencia | `ReglaNegocio` | «usa» | → | Criterios de prioridad y enrutamiento. |
| 22 | `Lead` | Dependencia | `PlantillaMensaje` | «usa» | → | Plantilla de reactivación. |
| 23 | `SolicitudCredito` | Dependencia | `ReglaNegocio` | «usa» | → | Reglas de precalificación. |
| 24 | `Cita` | Dependencia | `PlantillaMensaje` | «usa» | → | Plantilla de recordatorio. |
| 25 | `July` | Dependencia | `Mensaje` | «usa» | → | Recibe cada mensaje entrante. |

Navegación: → de origen a destino; ← de destino a origen; ↔ en ambos sentidos. Cada extremo navegable es un atributo de la clase que lo recorre.

## 6. Trazabilidad con CU-08

### 6.1 Entidades de CU-08

| Entidad en CU-08 | Queda como | Motivo |
|---|---|---|
| `AcuseRecepcion` | Respuesta sin error de Canal.recibir() y número de caso que devuelve SolicitudCredito.derivarARevision() | Un acuse es la respuesta de una llamada, no un dato que se guarde. |
| `AsesorComercial` | AsesorComercial | Se conserva: el enrutamiento necesita su disponibilidad y su carga. |
| `AsignacionLead` | Lead.asesor, fechaAsignacion, estado (ASIGNADO / EN_GESTION) | Una asignación es el estado del lead frente a un asesor. |
| `AvisoPrivacidad` | PlantillaMensaje (AVISO_PRIVACIDAD) + Prospecto.consentimientoAceptado | El texto es contenido publicado; la respuesta es un dato del prospecto. |
| `CasoRevision` | SolicitudCredito.numeroCasoRevision | El caso solo añade un número a la solicitud A_REVISAR. |
| `CatalogoCredito` | LineaCredito.listarVigentes() | El catálogo es el conjunto de líneas vigentes. |
| `Cita` | Cita | Se conserva y absorbe la agenda de la agencia y el recordatorio. |
| `ColaAtencion` | July.capacidadMaxima + July.atender() | La cola es un detalle de cómo July atiende los picos. |
| `Consentimiento` | Prospecto.consentimientoAceptado, versionAviso, fechaConsentimiento | Tres datos del prospecto. |
| `Consulta` | Mensaje | La consulta es el primer mensaje. |
| `Conversacion` | Conversacion | Se conserva y absorbe el origen y la sesión web. |
| `CriterioPrioridad` | ReglaNegocio (PRIORIDAD) | Misma estructura que las demás reglas: versión y parámetros. |
| `Derivacion` | Conversacion.traspasar() + July.notificar() | Derivar es traspasar la conversación a un asesor. |
| `DocumentoRequerido` | LineaCredito.requisitos | Lista de textos de la línea. |
| `EnvioCRM` | CRMCooperativa.sincronizarLead() | Los reintentos son parte de la integración, no una entidad del dominio. |
| `ErrorIntegracion` | Falla de SistemaCore, CRMCooperativa o Canal | Se maneja dentro del método que llama al sistema externo. |
| `ErrorValidacion` | Retorno String \| null de las validaciones | Basta con el motivo del error. |
| `EscenarioSimulacion` | Simulacion | Cada simulación es un escenario. |
| `FichaProspecto` | Lead.generarFicha() | Es una vista que se genera, no se guarda. |
| `GuionBienvenida` | PlantillaMensaje (BIENVENIDA) | Es contenido publicado. |
| `HorarioDisponible` | Cita.consultarHorarios() → List<DateTime> | Un horario libre es un valor de la agenda. |
| `IntencionCredito` | Lead.lineaCredito + Lead.necesidad | Identificarla es buscar la línea; cambiarla es `Lead.elegirLinea()`. |
| `Lead` | Lead | Se conserva y absorbe la asignación. |
| `LineaCredito` | LineaCredito | Se conserva y absorbe catálogo y requisitos. |
| `Mensaje` | Mensaje | Se conserva. |
| `MenuOpciones` | PlantillaMensaje (MENU, MENU_BASICO) | Es contenido publicado. |
| `OpcionMenu` | PlantillaMensaje.opciones | Una opción es un texto del menú. |
| `OrigenConversacion` | Conversacion.campana | El origen es un atributo de la conversación. |
| `PerfilEconomico` | SolicitudCredito.ingresosMensuales, actividadEconomica | Dos datos de la solicitud. |
| `PlantillaMensaje` | PlantillaMensaje | Se conserva y absorbe todo el contenido conversacional. |
| `Precalificacion` | SolicitudCredito (resultado, capacidadPago, factores…) | Es 1 a 1 con la solicitud. |
| `Pregunta` | Conversacion.enviarMensaje(…, opciones) | Reformular es enviar un mensaje con opciones cerradas. |
| `PreguntaFrecuente` | PlantillaMensaje (PREGUNTA_FRECUENTE) | Es contenido publicado. |
| `Prospecto` | Prospecto | Se conserva y absorbe socio y consentimiento. |
| `Recordatorio` | Cita.programarRecordatorio(), Conversacion.retomar(), Lead.reactivar() | Cada recordatorio es el envío de una plantilla. |
| `ReglaEnrutamiento` | ReglaNegocio (ENRUTAMIENTO) | Misma estructura que las demás reglas. |
| `ReglaPrecalificacion` | ReglaNegocio (PRECALIFICACION) | Misma estructura que las demás reglas. |
| `Requisito` | LineaCredito.requisitos | Lista de textos de la línea. |
| `RequisitoAfiliacion` | LineaCredito.requisitosAfiliacion | Lista de textos de la línea. |
| `ResolucionCredito` | SolicitudCredito.estado (APROBADA / NEGADA) | La resolución es el estado final. |
| `SesionChat` | Canal.abrirSesion() + Conversacion.tokenSesion | La sesión es del canal web. |
| `Simulacion` | Simulacion | Se conserva. |
| `Socio` | Prospecto.condicionSocio, fechaIngresoSocio, edad, actividadRegistrada | Datos del prospecto que vienen del core. |
| `SolicitudCredito` | SolicitudCredito | Se conserva y absorbe la precalificación. |
| `TablaAmortizacion` | Simulacion.generarTablaAmortizacion() | Se calcula a pedido. |
| `Webhook` | Canal.recibir(), verificarAutenticidad() | El webhook es el transporte de WhatsApp. |

### 6.2 Métodos de CU-08 unificados

Cada fila es un método del modelo y los métodos de CU-08 que reemplaza. Cubre los 237 pasos de los niveles 1 y 2, flujos alternativos incluidos. La columna suma 240 porque tres pasos usan dos métodos: 1.1 (1) abre la conversación con el mensaje recibido, 2.1.2 (A2·2b) registra el monto validando la línea y 3.1.1 (3) consolida la ficha con la prioridad calculada.

| Método del modelo | Métodos de CU-08 que reemplaza | Pasos |
|---|---|---|
| `July.atender()` | `Cita.solicitar()`, `Cita.solicitarCambio()`, `ColaAtencion.encolar()`, `Derivacion.solicitar()`, `DocumentoRequerido.consultar()`, `EscenarioSimulacion.solicitarAlternativa()`, `EscenarioSimulacion.solicitarComparacion()`, `HorarioDisponible.seleccionar()`, `IntencionCredito.describir()`, `LineaCredito.confirmar()`, `LineaCredito.consultar()`, `Mensaje.responderRetoma()`, `Mensaje.saludar()`, `OpcionMenu.seleccionar()`, `Precalificacion.solicitar()`, `Precalificacion.solicitarExplicacion()`, `Prospecto.confirmarDatosIdentidad()`, `Simulacion.solicitar()`, `Simulacion.solicitarCostoTotal()` | 25 |
| `July.notificar()` | `AsignacionLead.informarReasignacion()`, `Cita.notificar()`, `Cita.notificarAsistencia()`, `Cita.notificarAtencion()`, `Derivacion.enviar()`, `EnvioCRM.avisarPendiente()`, `Lead.informarFrio()`, `Lead.notificar()`, `OrigenConversacion.reportar()`, `ResolucionCredito.notificar()` | 12 |
| `Canal.recibir()` | `AcuseRecepcion.confirmar()`, `Consulta.enviar()`, `Consulta.escribir()`, `Mensaje.convertirFormatoComun()`, `Mensaje.entregar()`, `Mensaje.enviar()`, `Webhook.notificar()` | 13 |
| `Canal.verificarAutenticidad()` | `ErrorIntegracion.devolver()`, `SesionChat.validarToken()`, `Webhook.rechazar()`, `Webhook.verificarFirma()` | 4 |
| `Canal.enviar()` | `PlantillaMensaje.entregar()`, `Recordatorio.entregar()` | 2 |
| `Canal.abrirSesion()` | `SesionChat.abrir()`, `SesionChat.confirmar()` | 2 |
| `SistemaCore.validarCedula()` | `ErrorValidacion.informar()`, `Prospecto.confirmarValidezCedula()`, `Prospecto.verificarCedula()` | 3 |
| `SistemaCore.consultarSocio()` | `ErrorIntegracion.devolver()`, `Socio.consultar()`, `Socio.responderCondicion()`, `Socio.responderDatos()`, `Socio.responderSinRegistro()`, `Socio.solicitarDatos()` | 6 |
| `CRMCooperativa.buscarLead()` | `Lead.buscar()`, `Lead.responderRegistroExistente()`, `Lead.responderSinRegistro()` | 3 |
| `CRMCooperativa.sincronizarLead()` | `EnvioCRM.marcarPendiente()`, `EnvioCRM.registrarIntento()`, `EnvioCRM.reintentar()`, `ErrorIntegracion.devolver()`, `Lead.actualizar()`, `Lead.crear()`, `Lead.devolverIdentificador()`, `Lead.sincronizarEstado()` | 11 |
| `Prospecto.registrarConsentimiento()` | `AvisoPrivacidad.aceptar()`, `AvisoPrivacidad.rechazar()`, `Consentimiento.registrar()` | 5 |
| `AsesorComercial.cambiarDisponibilidad()` | `AsesorComercial.marcarDisponibilidad()` | 2 |
| `Conversacion.abrir()` | `Consulta.enviar()` | 1 |
| `Conversacion.registrarMensaje()` | `Conversacion.continuar()` | 1 |
| `Conversacion.enviarMensaje()` | `CasoRevision.informar()`, `Cita.enviarConfirmacion()`, `Cita.enviarReprogramacion()`, `ColaAtencion.avisarEspera()`, `Conversacion.avisarCambioAsesor()`, `ErrorValidacion.explicar()`, `EscenarioSimulacion.presentar()`, `HorarioDisponible.ofrecer()`, `Lead.entregarNumeroSeguimiento()`, `LineaCredito.informarCondiciones()`, `LineaCredito.informarRango()`, `LineaCredito.solicitarConfirmacion()`, `Mensaje.responder()`, `Mensaje.saludar()`, `Pregunta.reformular()`, `Prospecto.mostrarDatosIdentidad()`, `Prospecto.notificarValidacion()`, `Simulacion.mostrarCostoTotal()`, `Simulacion.presentar()` | 23 |
| `Conversacion.etiquetarOrigen()` | `OrigenConversacion.etiquetar()` | 3 |
| `Conversacion.guardarAvance()` | `Conversacion.guardarAvance()` | 2 |
| `Conversacion.marcarAbandonada()` | `Conversacion.dejarSinRespuesta()`, `Conversacion.marcarAbandonada()` | 2 |
| `Conversacion.retomar()` | `Conversacion.retomar()`, `PlantillaMensaje.enviarRetoma()` | 2 |
| `Conversacion.traspasar()` | `Conversacion.traspasar()`, `Derivacion.aceptar()` | 3 |
| `Lead.registrar()` | `Lead.registrar()` | 4 |
| `Lead.elegirLinea()` | `LineaCredito.seleccionar()` | 2 |
| `Lead.priorizar()` | `FichaProspecto.consolidar()`, `Lead.marcarFrio()` | 2 |
| `Lead.asignar()` | `AsignacionLead.asignar()`, `AsignacionLead.reasignar()`, `AsignacionLead.vencerPlazo()` | 4 |
| `Lead.aceptarAsignacion()` | `AsignacionLead.aceptar()` | 1 |
| `Lead.generarFicha()` | `Conversacion.adjuntarHistorial()`, `FichaProspecto.consolidar()`, `FichaProspecto.consolidarIncompleta()` | 4 |
| `Lead.vincularCRM()` | `Lead.vincularIdentificador()` | 2 |
| `Lead.actualizarEstado()` | `Lead.registrarEstadoFinal()` | 2 |
| `Lead.reactivar()` | `PlantillaMensaje.enviarReactivacion()`, `Recordatorio.dejarSinRespuesta()` | 2 |
| `SolicitudCredito.iniciar()` | `SolicitudCredito.iniciar()` | 2 |
| `SolicitudCredito.campoPendiente()` | `PerfilEconomico.solicitar()`, `Prospecto.solicitarDatosIdentidad()`, `SolicitudCredito.solicitarCondiciones()`, `SolicitudCredito.solicitarDato()`, `SolicitudCredito.solicitarDatos()` | 5 |
| `SolicitudCredito.registrarDato()` | `PerfilEconomico.declarar()`, `Prospecto.entregarCedula()`, `Prospecto.entregarDatosIdentidad()`, `Prospecto.entregarTelefono()`, `Prospecto.validarFormatoCedula()`, `Prospecto.validarFormatoTelefono()`, `SolicitudCredito.corregirDato()`, `SolicitudCredito.entregarDatos()`, `SolicitudCredito.entregarMonto()`, `SolicitudCredito.indicarCondiciones()`, `SolicitudCredito.validar()`, `SolicitudCredito.validarMonto()` | 12 |
| `SolicitudCredito.resumir()` | `SolicitudCredito.resumir()`, `SolicitudCredito.solicitarConfirmacion()` | 3 |
| `SolicitudCredito.actualizarEstado()` | `ResolucionCredito.comunicar()`, `SolicitudCredito.confirmar()`, `SolicitudCredito.enviar()` | 4 |
| `SolicitudCredito.precalificar()` | `Precalificacion.calcularCapacidadPago()`, `Precalificacion.clasificar()`, `Precalificacion.evaluar()`, `Precalificacion.evaluarDatosDeclarados()` | 5 |
| `SolicitudCredito.explicarResultado()` | `Precalificacion.comunicarResultado()`, `Precalificacion.explicar()`, `Precalificacion.explicarMotivo()` | 4 |
| `SolicitudCredito.derivarARevision()` | `AcuseRecepcion.confirmar()`, `CasoRevision.enviar()` | 2 |
| `SolicitudCredito.registrarDocumento()` | `DocumentoRequerido.registrarRecibido()` | 1 |
| `Simulacion.calcular()` | `EscenarioSimulacion.calcular()`, `Simulacion.calcular()`, `Simulacion.calcularCostoTotal()`, `Simulacion.calcularCuota()` | 4 |
| `Simulacion.generarTablaAmortizacion()` | `TablaAmortizacion.generar()` | 1 |
| `Simulacion.elegir()` | `EscenarioSimulacion.confirmar()`, `EscenarioSimulacion.guardar()`, `Simulacion.aceptar()` | 5 |
| `Simulacion.sugerirAlternativa()` | `EscenarioSimulacion.sugerir()` | 1 |
| `Cita.consultarHorarios()` | `HorarioDisponible.consultar()`, `HorarioDisponible.entregar()`, `HorarioDisponible.informarSinDisponibilidad()`, `HorarioDisponible.ofrecerCercanos()` | 5 |
| `Cita.reservar()` | `Cita.confirmarReserva()`, `Cita.reservar()` | 2 |
| `Cita.reprogramar()` | `Cita.reprogramar()`, `HorarioDisponible.confirmar()` | 2 |
| `Cita.actualizarEstado()` | `Cita.confirmarAsistencia()`, `Cita.registrarAtencion()` | 2 |
| `Cita.programarRecordatorio()` | `PlantillaMensaje.enviar()`, `Recordatorio.programar()` | 2 |
| `LineaCredito.listarVigentes()` | `CatalogoCredito.consultar()`, `CatalogoCredito.entregar()`, `LineaCredito.consultarCondiciones()`, `LineaCredito.entregarCondiciones()`, `LineaCredito.ofrecerAlternativas()`, `LineaCredito.presentar()`, `Requisito.consultar()`, `Requisito.entregar()` | 9 |
| `LineaCredito.buscar()` | `IntencionCredito.identificar()`, `LineaCredito.marcarNoVigente()` | 2 |
| `LineaCredito.validarCondiciones()` | `LineaCredito.verificarRango()`, `SolicitudCredito.validarMonto()` | 2 |
| `LineaCredito.requisitosPara()` | `DocumentoRequerido.enviarLista()`, `RequisitoAfiliacion.enviar()` | 3 |
| `PlantillaMensaje.obtenerVigente()` | `GuionBienvenida.consultar()`, `GuionBienvenida.entregar()`, `MenuOpciones.mostrar()`, `MenuOpciones.mostrarBasico()` | 5 |
| `PlantillaMensaje.buscarRespuesta()` | `PreguntaFrecuente.responder()` | 1 |
| `PlantillaMensaje.componer()` | `GuionBienvenida.presentar()` | 2 |
| `ReglaNegocio.obtenerVigente()` | `CriterioPrioridad.consultar()`, `CriterioPrioridad.entregar()`, `ReglaEnrutamiento.consultar()`, `ReglaEnrutamiento.entregar()`, `ReglaPrecalificacion.consultar()`, `ReglaPrecalificacion.entregar()` | 6 |

## 7. Tabla de resumen

| Entidad | Descripción | Categoría | Atributos | Métodos (entrada → salida) | Relaciones (tipo → destino [multiplicidad]) | Naturaleza |
|---|---|---|---|---|---|---|
| [`July`](#july) | Asistente virtual de la cooperativa y sistema que se diseña: recibe cada mensaje, decide qué caso de uso lo atiende y avisa a los colaboradores. | Control | `capacidadMaxima`: `Integer`<br>`tiempoRespuestaObjetivo`: `Duration`<br>`tiempoAbandono`: `Duration` | `atender(mensaje: Mensaje)` → `void`<br>`notificar(destinatario: String, contenido: String)` → `void` | Dependencia → Conversacion [usa]<br>Dependencia → Canal [usa]<br>Dependencia → SistemaCore [usa]<br>Dependencia → CRMCooperativa [usa]<br>Dependencia → Mensaje [usa] | «control» |
| [`Canal`](#canal) | Canal digital por el que entra y sale la conversación (WhatsApp Business API o widget web); convierte cada carga al formato común de July. | Sistema externo | `tipo`: `TipoCanal`<br>`credencial`: `String` | `recibir(carga: String)` → `Mensaje`<br>`verificarAutenticidad(carga: String, firma: String)` → `Boolean`<br>`enviar(destino: String, mensaje: Mensaje)` → `void`<br>`abrirSesion(paginaOrigen: String)` → `String` | Dependencia → Mensaje [crea]<br>Dependencia ← July [usa]<br>Dependencia ← Conversacion [usa] | «interfaz» |
| [`SistemaCore`](#sistemacore) | Sistema transaccional de la cooperativa: fuente oficial de socios y de identidad. | Sistema externo | `urlServicio`: `String`<br>`tiempoMaximoRespuesta`: `Duration` | `validarCedula(cedula: String)` → `Boolean`<br>`consultarSocio(prospecto: Prospecto)` → `CondicionSocio` | Dependencia → Prospecto [usa]<br>Dependencia ← July [usa] | «interfaz» |
| [`CRMCooperativa`](#crmcooperativa) | CRM comercial donde se registra el lead y se gestiona el embudo de ventas. | Sistema externo | `urlServicio`: `String`<br>`maxIntentos`: `Integer` | `buscarLead(cedula: String, telefono: String)` → `String \| null`<br>`sincronizarLead(lead: Lead)` → `String` | Dependencia → Lead [usa]<br>Dependencia ← July [usa] | «interfaz» |
| [`Prospecto`](#prospecto) | Persona que contacta a la cooperativa; guarda su identidad, su condición de socio y su consentimiento de datos. | Actor (entidad) | `idProspecto`: `UUID`<br>`nombres`: `String [0..1]`<br>`cedula`: `String [0..1]`<br>`telefono`: `String [0..1]`<br>`correo`: `String [0..1]`<br>`condicionSocio`: `CondicionSocio`<br>`fechaIngresoSocio`: `Date [0..1]`<br>`edad`: `Integer [0..1]`<br>`actividadRegistrada`: `String [0..1]`<br>`consentimientoAceptado`: `Boolean`<br>`versionAviso`: `String [0..1]`<br>`fechaConsentimiento`: `DateTime [0..1]` | `registrarConsentimiento(aceptado: Boolean, versionAviso: String)` → `void` | Asociación ← Conversacion [* — 1]<br>Asociación ← Lead [* — 1]<br>Dependencia ← SistemaCore [usa] | «entidad» |
| [`AsesorComercial`](#asesorcomercial) | Colaborador que atiende los leads; guarda su agencia, sus productos y su disponibilidad para el enrutamiento. | Actor (entidad) | `idAsesor`: `UUID`<br>`nombre`: `String`<br>`agencia`: `String`<br>`productos`: `List<String>`<br>`disponible`: `Boolean`<br>`leads`: `List<Lead>`<br>`/cargaActual`: `Integer` | `cambiarDisponibilidad(disponible: Boolean)` → `void` | Asociación ← Conversacion [* — 0..1]<br>Asociación ← Lead [* — 0..1] | «entidad» |
| [`Conversacion`](#conversacion) | Hilo de mensajes entre el prospecto, July y, si hay traspaso, el asesor; guarda el origen y el avance del flujo. | Entidad de negocio | `idConversacion`: `UUID`<br>`prospecto`: `Prospecto`<br>`canal`: `TipoCanal`<br>`campana`: `String [0..1]`<br>`tokenSesion`: `String [0..1]`<br>`estado`: `EstadoConversacion`<br>`ultimoPaso`: `String`<br>`fechaUltimaActividad`: `DateTime`<br>`asesorAsignado`: `AsesorComercial [0..1]`<br>`historial`: `List<Mensaje>` | `abrir(canal: TipoCanal, prospecto: Prospecto, tokenSesion: String \| null)` → `Conversacion`<br>`registrarMensaje(mensaje: Mensaje)` → `void`<br>`enviarMensaje(emisor: Emisor, contenido: String, opciones: List<String>)` → `Mensaje`<br>`etiquetarOrigen(campana: String \| null)` → `void`<br>`guardarAvance(paso: String)` → `void`<br>`marcarAbandonada()` → `void`<br>`retomar()` → `void`<br>`traspasar(asesor: AsesorComercial)` → `void` | Composición → Mensaje [1 — 0..*]<br>Asociación → Prospecto [* — 1]<br>Asociación → AsesorComercial [* — 0..1]<br>Dependencia → Canal [usa]<br>Dependencia → PlantillaMensaje [usa]<br>Asociación ← Lead [0..1 — 1]<br>Dependencia ← July [usa] | «entidad» |
| [`Mensaje`](#mensaje) | Un mensaje en formato común, sin importar el canal por el que llegó o salió. | Entidad de negocio | `idMensaje`: `UUID`<br>`idExterno`: `String`<br>`emisor`: `Emisor`<br>`tipo`: `TipoMensaje`<br>`contenido`: `String`<br>`adjuntos`: `List<String>`<br>`fechaHora`: `DateTime` | — | Composición ← Conversacion [1 — 0..*]<br>Dependencia ← Canal [crea]<br>Dependencia ← July [usa] | «entidad» |
| [`Lead`](#lead) | Oportunidad comercial: un prospecto con una intención de crédito, que July entrega al asesor y al CRM. | Entidad de negocio | `idLead`: `UUID`<br>`numeroSeguimiento`: `String`<br>`prospecto`: `Prospecto`<br>`conversacion`: `Conversacion`<br>`lineaCredito`: `LineaCredito`<br>`necesidad`: `String`<br>`prioridad`: `Prioridad [0..1]`<br>`estado`: `EstadoLead`<br>`asesor`: `AsesorComercial [0..1]`<br>`solicitud`: `SolicitudCredito [0..1]`<br>`citas`: `List<Cita>`<br>`fechaAsignacion`: `DateTime [0..1]`<br>`intentosReactivacion`: `Integer`<br>`idCRM`: `String [0..1]`<br>`motivoCierre`: `String [0..1]`<br>`fechaRegistro`: `DateTime` | `registrar(prospecto: Prospecto, conversacion: Conversacion, linea: LineaCredito, necesidad: String)` → `Lead`<br>`elegirLinea(linea: LineaCredito)` → `void`<br>`priorizar(criterios: ReglaNegocio)` → `Prioridad`<br>`asignar(enrutamiento: ReglaNegocio, asesores: List<AsesorComercial>)` → `AsesorComercial`<br>`aceptarAsignacion()` → `void`<br>`generarFicha()` → `String`<br>`vincularCRM(idCRM: String)` → `void`<br>`actualizarEstado(estado: EstadoLead, motivo: String \| null)` → `void`<br>`reactivar()` → `void` | Composición → SolicitudCredito [1 — 0..1]<br>Composición → Cita [1 — 0..*]<br>Asociación → Prospecto [* — 1]<br>Asociación → Conversacion [0..1 — 1]<br>Asociación → AsesorComercial [* — 0..1]<br>Asociación → LineaCredito [* — 1]<br>Dependencia → ReglaNegocio [usa]<br>Dependencia → PlantillaMensaje [usa]<br>Dependencia ← CRMCooperativa [usa] | «entidad» |
| [`SolicitudCredito`](#solicitudcredito) | Datos que el prospecto entrega para pedir el crédito (monto, plazo, destino, ingresos) y el resultado de su precalificación. | Entidad de negocio | `idSolicitud`: `UUID`<br>`lead`: `Lead`<br>`monto`: `Decimal [0..1]`<br>`plazo`: `Integer [0..1]`<br>`destino`: `String [0..1]`<br>`ingresosMensuales`: `Decimal [0..1]`<br>`actividadEconomica`: `String [0..1]`<br>`estado`: `EstadoSolicitud`<br>`simulacionElegida`: `Simulacion [0..1]`<br>`resultado`: `ResultadoPrecalificacion [0..1]`<br>`capacidadPago`: `Decimal [0..1]`<br>`factores`: `List<String>`<br>`resultadoCondicionado`: `Boolean`<br>`numeroCasoRevision`: `String [0..1]`<br>`documentosRecibidos`: `List<String>` | `iniciar(lead: Lead)` → `SolicitudCredito`<br>`campoPendiente()` → `CampoSolicitud \| null`<br>`registrarDato(campo: CampoSolicitud, valor: String)` → `String \| null`<br>`resumir()` → `String`<br>`actualizarEstado(estado: EstadoSolicitud)` → `void`<br>`precalificar(reglas: ReglaNegocio)` → `ResultadoPrecalificacion`<br>`explicarResultado()` → `String`<br>`derivarARevision()` → `String`<br>`registrarDocumento(documento: String)` → `void` | Composición → Simulacion [1 — 0..*]<br>Asociación → Simulacion [0..1 — 0..1]<br>Dependencia → ReglaNegocio [usa]<br>Composición ← Lead [1 — 0..1] | «entidad» |
| [`Simulacion`](#simulacion) | Escenario de crédito: un monto a un plazo con su cuota, intereses, seguros, cargos y total a pagar. | Entidad de negocio | `idSimulacion`: `UUID`<br>`solicitud`: `SolicitudCredito`<br>`monto`: `Decimal`<br>`plazo`: `Integer`<br>`tasa`: `Decimal`<br>`cuotaMensual`: `Decimal`<br>`intereses`: `Decimal`<br>`seguros`: `Decimal`<br>`cargos`: `Decimal`<br>`totalPagar`: `Decimal` | `calcular(solicitud: SolicitudCredito, monto: Decimal, plazo: Integer)` → `Simulacion`<br>`generarTablaAmortizacion()` → `List<Map<String, Decimal>>`<br>`elegir()` → `void`<br>`sugerirAlternativa(capacidadPago: Decimal)` → `Simulacion` | Composición ← SolicitudCredito [1 — 0..*]<br>Asociación ← SolicitudCredito [0..1 — 0..1] | «entidad» |
| [`Cita`](#cita) | Cita del prospecto en una agencia, con su estado y su recordatorio. | Entidad de negocio | `idCita`: `UUID`<br>`lead`: `Lead`<br>`agencia`: `String`<br>`fechaHora`: `DateTime`<br>`estado`: `EstadoCita`<br>`fechaRecordatorio`: `DateTime [0..1]` | `consultarHorarios(agencia: String, desde: Date, hasta: Date)` → `List<DateTime>`<br>`reservar(lead: Lead, agencia: String, fechaHora: DateTime)` → `Cita`<br>`reprogramar(fechaHora: DateTime)` → `void`<br>`actualizarEstado(estado: EstadoCita)` → `void`<br>`programarRecordatorio(fecha: DateTime)` → `void` | Dependencia → PlantillaMensaje [usa]<br>Composición ← Lead [1 — 0..*] | «entidad» |
| [`LineaCredito`](#lineacredito) | Producto de crédito del catálogo, con su tasa, plazos, montos y requisitos; lo publica el Área de productos y crédito. | Configuración | `codigo`: `String`<br>`nombre`: `String`<br>`tasa`: `Decimal`<br>`plazos`: `List<Integer>`<br>`montoMinimo`: `Decimal`<br>`montoMaximo`: `Decimal`<br>`palabrasClave`: `List<String>`<br>`requisitos`: `List<String>`<br>`requisitosAfiliacion`: `List<String>`<br>`vigente`: `Boolean`<br>`version`: `String` | `listarVigentes()` → `List<LineaCredito>`<br>`buscar(criterio: String)` → `LineaCredito \| null`<br>`validarCondiciones(monto: Decimal, plazo: Integer \| null)` → `String \| null`<br>`requisitosPara(condicion: CondicionSocio)` → `List<String>` | Asociación ← Lead [* — 1] | «entidad» |
| [`PlantillaMensaje`](#plantillamensaje) | Contenido conversacional publicado por versiones: bienvenida, aviso de privacidad, menús, preguntas frecuentes y plantillas de retoma, recordatorio y reactivación. | Configuración | `tipo`: `TipoPlantilla`<br>`clave`: `String`<br>`texto`: `String`<br>`opciones`: `List<String>`<br>`plantillaProveedor`: `String [0..1]`<br>`version`: `String`<br>`vigente`: `Boolean` | `obtenerVigente(tipo: TipoPlantilla)` → `PlantillaMensaje`<br>`buscarRespuesta(texto: String)` → `PlantillaMensaje \| null`<br>`componer(datos: Map<String, String>)` → `String` | Dependencia ← Conversacion [usa]<br>Dependencia ← Lead [usa]<br>Dependencia ← Cita [usa] | «entidad» |
| [`ReglaNegocio`](#reglanegocio) | Parámetros de decisión publicados por versiones: reglas de precalificación, criterios de prioridad y reglas de enrutamiento. | Configuración | `tipo`: `TipoRegla`<br>`parametros`: `Map<String, String>`<br>`version`: `String`<br>`publicadoPor`: `String`<br>`vigente`: `Boolean` | `obtenerVigente(tipo: TipoRegla)` → `ReglaNegocio` | Dependencia ← Lead [usa]<br>Dependencia ← SolicitudCredito [usa] | «entidad» |
