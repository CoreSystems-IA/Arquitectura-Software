# Especificaciones de casos de uso · July

**ID:** CU-08 · **Versión:** 2.1 · **Fecha:** 2026-11-04 · **Estado:** Borrador  
**Deriva de:** CU-03 a CU-06 ([`casos-de-uso-por-flujo.md`](../02-casos-de-uso/casos-de-uso-por-flujo.md)), CAP-03 y las decisiones de [REV-02](../../Complementarios/revisiones/plan-trazabilidad-flujos-unificados.md)  
**Uso:** fuente del modelo de dominio (DOM-01), del diccionario de datos (CLS-01) y de los diagramas de secuencia (SEC-01)  

Especificación unificada de los casos de uso de July: **una por flujo de valor**, con un solo flujo principal numerado de corrido que recorre sus casos de nivel 1 y 2 en el orden de CU-06 y llega hasta los actores y sistemas externos. Cada paso es una oración con un solo verbo y cita el caso de nivel 3 de CU-06 que realiza. En total hay 282 pasos: 183 llamadas a un método y 99 retornos.

Los casos de uso (CU-02 a CU-06) no cambian: esta especificación toma de ellos los números, los nombres y los actores.

---

## Cómo leer las especificaciones

### La oración de cada paso

Cada paso es una oración con la forma **Sujeto** + verbo + sustantivo + **Receptor**. El receptor con el que termina una oración es el sujeto con el que empieza la siguiente:

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) |
|---|---|---|---|---|---|
| 1 | **Cliente** hace el pedido de pasaje a la **Aerolínea**. | `Cliente` | hace → `Aerolinea.hacer(pedido)` | `Pedido` (origen, destino, fecha) | `Cliente` → `Aerolinea` |
| 2 | **Aerolínea** confirma los espacios disponibles en los vuelos al **Cliente**. | `Aerolinea` | confirma → `Cliente.confirmar(espacioVuelo)` | `EspacioVuelo` (vuelo, asientosLibres) | `Aerolinea` → `Cliente` |
| 3 | **Cliente** selecciona el vuelo a la **Aerolínea**. | `Cliente` | selecciona → `Aerolinea.seleccionar(vuelo)` | `Vuelo` (numero, fechaHora) | `Cliente` → `Aerolinea` |
| 4 | **Aerolínea** pasa el vuelo reservado al **Cliente**. | `Aerolinea` | pasa → `Cliente.pasar(vuelo)` | `Vuelo` (numero, asiento) | `Aerolinea` → `Cliente` |

Cada parte de la oración alimenta el modelo:

| Parte de la oración | Qué es en el modelo | Ejemplo (paso 1) |
|---|---|---|
| **Sujeto** | Clase que inicia la interacción: quien llama al método. | `Cliente` |
| Verbo | **Método de la clase del receptor**, con el sustantivo como parámetro: `Receptor.verbo(sustantivo)`. En el diagrama de secuencia es la flecha del sujeto al receptor. | `Aerolinea.hacer(pedido)` |
| Sustantivo | **Entidad** que se intercambia. Entre paréntesis van sus **atributos**. | `Pedido` (origen, destino, fecha) |
| **Receptor** | Clase dueña del método. La pareja sujeto → receptor es una **relación** del diagrama de clases. | `Cliente` → `Aerolinea` |

### Reglas

1. **Una oración, un verbo.** Si una acción tiene dos verbos, se separa en dos pasos.
2. **Sujeto y receptor con su nombre completo y en negrita**, tal como están en la tabla de participantes. No se usan pronombres.
3. **El sustantivo es un dato concreto**, nombrado igual en todos los pasos (siempre «la solicitud de crédito», nunca «los datos»).
4. **La preposición indica la relación:** *a* cuando el sujeto entrega o pide algo al receptor; *con* cuando lo verifica, valida o sincroniza con él; *en* cuando crea, busca o actualiza algo dentro del receptor.
5. **Cadena.** El receptor de un paso es el sujeto del siguiente, también al pasar de un caso de nivel 1 al siguiente.
6. **Retornos.** Cuando el receptor solo devuelve el resultado de la llamada anterior, el paso se escribe «**X** devuelve … a **Y**» y se marca *retorno*: no es un método nuevo. En el diagrama de secuencia es una flecha punteada.
7. **No hay pasos internos.** El trabajo de July sobre sus datos se escribe con la entidad como receptor: «**July** etiqueta la campaña de origen en la **Conversación**» → `Conversacion.etiquetarOrigen(campana)`.
8. **Canal.** Los pasos 1 a 12 del flujo 1 muestran cómo viaja un mensaje entre el Prospecto y July por WhatsApp Business API o el Widget web. Para no repetirlo, los pasos siguientes escriben ese intercambio directo (`July.atender(mensaje)` y `Prospecto.recibir(mensaje)`); solo nombran el canal cuando July envía una plantilla fuera de la conversación (retoma, recordatorio, reactivación).
9. **Actores de configuración.** El Administrador del asistente, el Área de productos y crédito, el Comité de crédito, el Jefe comercial y el Personal de agencia no conversan en tiempo real: cuando July les consulta algo (`Colaborador.consultarPublicacion(tipo)`, `Colaborador.consultarAgenda(…)`), devuelven lo que publicaron. Cuando July les informa algo, lo reciben como un mensaje (`Colaborador.recibir(mensaje)`) y devuelven el acuse.
10. **Flujos alternativos.** Se nombran con un número de alternativo (A1, A2…) y una letra en sus pasos (5a, 5b…). Dicen qué pasos reemplazan («reemplaza el paso N») o después de cuál ocurren («después del paso N»), empiezan con el sujeto de ese paso y terminan en *Fin*, *Continúa en el paso N* o *Vuelve al paso N*, cuyo sujeto es el receptor del último paso del alternativo.
11. **Caso de nivel 3.** Cada paso cita un solo caso de nivel 3 de CU-06 y su actor externo tal como CU-06 lo nombra.

### Participantes

| Participante | Clase | Tipo |
|---|---|---|
| Prospecto | `Prospecto` | Persona · actor principal de los flujos 1 y 2 |
| Asesor comercial | `AsesorComercial` | Persona · actor principal del flujo 3 |
| July | `July` | Sistema en diseño · control |
| WhatsApp Business API | `Canal` | Sistema externo · canal |
| Widget web | `Canal` | Sistema externo · canal |
| Sistema core | `SistemaCore` | Sistema externo |
| CRM de la cooperativa | `CRMCooperativa` | Sistema externo |
| Equipo de marketing | `Colaborador` | Persona · recibe avisos (origen de campaña) |
| Administrador del asistente | `Colaborador` | Persona · publica guiones, menús y plantillas |
| Área de productos y crédito | `Colaborador` | Persona · publica el catálogo de líneas |
| Comité de crédito | `Colaborador` | Persona · publica las reglas, recibe casos y solicitudes y comunica la resolución |
| Jefe comercial | `Colaborador` | Persona · publica prioridad y enrutamiento y recibe avisos |
| Personal de agencia | `Colaborador` | Persona · publica la agenda y registra la atención de la cita |
| Delegado de protección de datos | `Colaborador` | Persona · recibe avisos (retiro del consentimiento) |
| Conversación | `Conversacion` | Entidad |
| Lead | `Lead` | Entidad |
| Solicitud de crédito | `SolicitudCredito` | Entidad |
| Simulación | `Simulacion` | Entidad |
| Cita | `Cita` | Entidad |
| Línea de crédito | `LineaCredito` | Entidad · configuración |
| Plantilla de mensaje | `PlantillaMensaje` | Entidad · configuración |

WhatsApp Business API y el Widget web son dos instancias de `Canal`. Los colaboradores que solo publican configuración o reciben avisos son instancias de `Colaborador` con su rol; el Asesor comercial es un `Colaborador` con clase propia (`AsesorComercial`) porque el enrutamiento necesita su agencia, sus productos y su carga. El Delegado de protección de datos solo aparece en la regla transversal R2.

### Correspondencia con el modelo ArchiMate

El modelo ArchiMate (CAP-03) representa los casos de uso como 25 servicios de aplicación numerados SA-01 a SA-25. Cada servicio realiza capacidades de nivel 3, y por esas capacidades se enlaza con los casos de nivel 3 que citan los pasos (ver el [índice](#indice)).

| Servicio ArchiMate | Casos de uso |
|---|---|
| SA-01 Iniciar conversación | CU 1.1 (1.1.1.1 a 1.1.2.3) y CU 1.2.1.1 |
| SA-02 Aceptar aviso de privacidad | CU 1.2.1.2 |
| SA-03 Registrar lead | CU 1.2.2.3 |
| SA-04 Identificar intención y responder preguntas frecuentes | CU 1.2.2.1 |
| SA-05 Reconocer socio existente | CU 1.2.2.2 |
| SA-06 Derivar a asesor humano | CU 1.2.1.3 |
| SA-07 Capturar datos del prospecto | CU 2.1.1 (2.1.1.1 a 2.1.1.3), CU 2.1.2.1 y CU 2.1.2.2 |
| SA-08 Retomar conversación abandonada | CU 2.1.2.3 |
| SA-09 Simular crédito | CU 2.2.1.1 y CU 2.2.1.2 |
| SA-10 Comparar escenarios | CU 2.2.1.3 |
| SA-11 Precalificar prospecto | CU 2.3.1 (2.3.1.1 a 2.3.1.3) y CU 2.3.2.1 |
| SA-12 Consultar requisitos y agendar cita | CU 2.3.2.2 y CU 2.3.2.3 |
| SA-13 Generar ficha del prospecto | CU 3.1.1 (3.1.1.1 a 3.1.1.3) |
| SA-14 Sincronizar lead con el CRM | CU 3.1.2 (3.1.2.1 a 3.1.2.3) |
| SA-15 Asignar lead a asesor | CU 3.2.1.1 y CU 3.2.1.2 |
| SA-16 Atender lead asignado | CU 3.2.1.3 |
| SA-17 Enviar recordatorios y reactivar leads | CU 3.2.2.1 |
| SA-18 Confirmar cita en agencia | CU 3.2.2.2 |
| SA-19 Actualizar estado y cerrar lead | CU 3.2.2.3 |
| SA-20 Configurar guiones, intenciones y plantillas | Fuera del alcance del reto (ver abajo) |
| SA-21 Gestionar líneas, tasas y requisitos | Fuera del alcance del reto; publica lo que consulta CU 2.2.2 |
| SA-22 Configurar reglas de precalificación | Fuera del alcance del reto |
| SA-23 Configurar priorización y enrutamiento | Fuera del alcance del reto |
| SA-24 Consultar trazabilidad y embudo | Fuera del alcance del reto: el embudo lo calcula el CRM |
| SA-25 Atender derechos sobre datos personales | Reglas transversales R1 y R2 (abajo); los derechos de acceso, rectificación y eliminación los atiende el Delegado de protección de datos fuera de July |

**Alcance del reto.** July es el chatbot de captación. La configuración que publican las áreas (guiones, catálogo, reglas, criterios, agenda) se carga como datos iniciales versionados y July solo la lee; su edición desde un back-office (SA-20 a SA-23) y el tablero del embudo (SA-24) quedan fuera del reto.

### Reglas transversales

Valen en cualquier paso de cualquier flujo; por eso no tienen número de paso propio.

| Regla | Especificación | Métodos (CLS-01) |
|---|---|---|
| R1 · Consentimiento previo | **July** no pide ni guarda datos personales (identidad, contacto, ingresos) mientras el consentimiento no esté aceptado (flujo 1, paso 20). Sin consentimiento solo ofrece el menú básico (flujo 1, A5). | `July.atender(mensaje)` revisa `Prospecto.consentimientoAceptado` |
| R2 · Retiro del consentimiento | Si el **Prospecto** escribe que retira su consentimiento, **July** lo registra como rechazado en el **Prospecto**, deja de pedir datos personales y avisa al **Delegado de protección de datos**, que atiende la eliminación o rectificación fuera de July. | `Prospecto.registrarConsentimiento(aceptado, versionAviso)`, `Colaborador.recibir(mensaje)` |

---

<a id="indice"></a>
## Índice: caso de nivel 3 → pasos

| Flujo | CU nivel 3 | Caso de uso (CU-06) | Actor externo | Pasos principales | Pasos alternativos |
|---|---|---|---|---|---|
| [1](#flujo-1) | 1.1.1.1 | Recibir el mensaje por WhatsApp | WhatsApp Business API | 1, 12 | — |
| [1](#flujo-1) | 1.1.1.2 | Abrir el chat desde el sitio web | Widget web | — | 1a, 2a, 3a |
| [1](#flujo-1) | 1.1.1.3 | Etiquetar el origen de la conversación | Equipo de marketing | 7, 8, 9, 10 | 7b, 8b |
| [1](#flujo-1) | 1.1.2.1 | Convertir el mensaje a un formato común | WhatsApp Business API, Widget web | 5, 6, 11 | 4a, 5a, 6a |
| [1](#flujo-1) | 1.1.2.2 | Encolar mensajes en picos de demanda | Ninguno, lo resuelve July | — | 11d, 12d, 13d, 14d |
| [1](#flujo-1) | 1.1.2.3 | Verificar la firma del webhook | WhatsApp Business API | 2, 3, 4 | 4c, 5c |
| [1](#flujo-1) | 1.2.1.1 | Recibir saludo y menú de opciones | Administrador del asistente | 13, 14, 15, 16, 22, 23, 24 | — |
| [1](#flujo-1) | 1.2.1.2 | Aceptar el aviso de privacidad | Ninguno, lo resuelve July | 17, 18, 19, 20, 21 | 19e, 20e, 21e, 22e, 23e, 24e |
| [1](#flujo-1) | 1.2.1.3 | Derivar a un asesor humano | Asesor comercial | — | 25f, 26f, 27f, 28f, 29f, 30f, 31f |
| [1](#flujo-1) | 1.2.2.1 | Detectar la intención de crédito | Ninguno, lo resuelve July | 25, 26, 27, 28, 29 | 27g, 28g, 26h, 27h, 28h |
| [1](#flujo-1) | 1.2.2.2 | Reconocer si ya es socio | Sistema core | 30, 31 | 31i |
| [1](#flujo-1) | 1.2.2.3 | Registrar el lead | Ninguno, lo resuelve July | 32, 33, 34 | 30j |
| [2](#flujo-2) | 2.1.1.1 | Registrar identidad y contacto | Ninguno, lo resuelve July | 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 36 | 14a, 15a, 31d, 32d, 33d |
| [2](#flujo-2) | 2.1.1.2 | Declarar ingresos y actividad | Ninguno, lo resuelve July | 22, 23, 24, 25, 26, 27 | — |
| [2](#flujo-2) | 2.1.1.3 | Indicar monto, plazo y destino | Ninguno, lo resuelve July | 1, 2, 3, 4, 5, 6, 7, 8 | — |
| [2](#flujo-2) | 2.1.2.1 | Validar cédula, teléfono y montos | Sistema core | 9, 16, 17, 18, 19 | 17b, 18b, 19b, 19c, 20c, 21c |
| [2](#flujo-2) | 2.1.2.2 | Guardar el avance de la conversación | Ninguno, lo resuelve July | 10, 11, 20, 21, 34, 35 | 32e, 33e |
| [2](#flujo-2) | 2.1.2.3 | Retomar la conversación abandonada | WhatsApp Business API | — | 24e, 25e, 26e, 27e, 28e, 29e, 30e, 31e |
| [2](#flujo-2) | 2.2.1.1 | Calcular cuota y tabla de amortización | Ninguno, lo resuelve July | 37, 38, 39, 40, 41, 42 | 39f, 40f, 41f, 42f, 45g, 61i |
| [2](#flujo-2) | 2.2.1.2 | Mostrar el total a pagar | Ninguno, lo resuelve July | 43, 44 | — |
| [2](#flujo-2) | 2.2.1.3 | Comparar escenarios de monto y plazo | Ninguno, lo resuelve July | 45, 46, 47, 48, 49, 50, 51, 52 | — |
| [2](#flujo-2) | 2.2.2.1 | Consultar el catálogo de líneas | Área de productos y crédito | 53, 54, 55, 56 | 60h |
| [2](#flujo-2) | 2.2.2.2 | Consultar tasas y plazos por línea | Área de productos y crédito | 57, 58, 59, 60 | 59h |
| [2](#flujo-2) | 2.2.2.3 | Consultar requisitos por línea | Área de productos y crédito | 61, 62 | — |
| [2](#flujo-2) | 2.3.1.1 | Evaluar la capacidad de pago | Comité de crédito | 63, 64, 65, 68 | — |
| [2](#flujo-2) | 2.3.1.2 | Revisar edad, actividad y condición de socio | Sistema core | 66, 67 | 67j |
| [2](#flujo-2) | 2.3.1.3 | Clasificar como apto, a revisar o no apto | Comité de crédito | 69 | 69k, 70k, 71k, 72k, 73k, 74k, 69l |
| [2](#flujo-2) | 2.3.2.1 | Recibir la explicación del resultado | Ninguno, lo resuelve July | 70, 71, 72 | 70l, 71l, 72l, 73l, 74l |
| [2](#flujo-2) | 2.3.2.2 | Consultar los documentos a preparar | Ninguno, lo resuelve July | 73, 74, 75, 76 | 75m |
| [2](#flujo-2) | 2.3.2.3 | Agendar una cita en agencia | Personal de agencia | 77, 78, 79, 80, 81, 82, 83, 84, 85, 86 | 79n, 80n, 81n, 82n |
| [3](#flujo-3) | 3.1.1.1 | Consolidar datos, simulación y resultado | Ninguno, lo resuelve July | 5 | 6a |
| [3](#flujo-3) | 3.1.1.2 | Priorizar el lead (caliente, tibio, frío) | Jefe comercial | 1, 2, 3, 4 | — |
| [3](#flujo-3) | 3.1.1.3 | Adjuntar el historial de conversación | Ninguno, lo resuelve July | 6 | — |
| [3](#flujo-3) | 3.1.2.1 | Crear o actualizar el lead en el CRM | CRM de la cooperativa | 9, 10, 11, 12 | — |
| [3](#flujo-3) | 3.1.2.2 | Controlar registros duplicados | CRM de la cooperativa | 7, 8 | 8b |
| [3](#flujo-3) | 3.1.2.3 | Reintentar el envío ante fallos | CRM de la cooperativa, Jefe comercial | — | 10c, 11c, 12c |
| [3](#flujo-3) | 3.2.1.1 | Enrutar por agencia, producto o carga | Jefe comercial | 13, 14, 15, 16 | 19d, 20d, 21d, 22d |
| [3](#flujo-3) | 3.2.1.2 | Notificar al asesor del lead nuevo | Ninguno, lo resuelve July | 17, 18 | 18d |
| [3](#flujo-3) | 3.2.1.3 | Tomar la conversación con su historial | Prospecto | 19, 20, 21, 22, 23, 24 | — |
| [3](#flujo-3) | 3.2.2.1 | Enviar recordatorios y reactivar | Prospecto, WhatsApp Business API | 25, 26, 27, 28, 29, 30, 31 | 32e, 33e, 34e, 35e, 36e, 37e, 38e, 35f, 36f |
| [3](#flujo-3) | 3.2.2.2 | Confirmar la cita en agencia | Prospecto, Personal de agencia | 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42 | 32g, 33g, 34g, 35g, 36g, 37g |
| [3](#flujo-3) | 3.2.2.3 | Actualizar el estado y registrar el cierre | CRM de la cooperativa, Comité de crédito | 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55 | 37f |

---

<a id="flujo-1"></a>
## Flujo 1 · Atracción y primer contacto

| Campo | Especificación |
|---|---|
| Flujo de valor | 1 · Atracción y primer contacto |
| Casos de nivel 1 | CU 1.1 Contactar a July por un canal digital (etapa Canales de contacto), CU 1.2 Recibir el primer contacto (etapa Primer contacto) |
| Actor principal | Prospecto |
| Actores secundarios | WhatsApp Business API, Widget web, Equipo de marketing, Administrador del asistente, Asesor comercial, Sistema core |
| Objetivo | Recibir la demanda digital, responder al prospecto en menos de 2 minutos, obtener su consentimiento de datos y registrar su intención como lead. |
| Disparador | El prospecto escribe al número de WhatsApp de la cooperativa o abre el chat del sitio web. |
| Precondiciones | El número de WhatsApp y el widget web están conectados a July. El Administrador del asistente publicó el guion de bienvenida y los menús. |
| Postcondiciones | El mensaje está en July, verificado y con su origen etiquetado; el consentimiento quedó registrado; el lead tiene número de seguimiento, o el prospecto fue derivado a un asesor. |

### CU 1.1 · Contactar a July por un canal digital (nivel 1 · etapa Canales de contacto)

Incluye CU 1.1.1 Recibir la consulta por WhatsApp o web y CU 1.1.2 Unificar los mensajes entrantes.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 1 | **Prospecto** escribe el mensaje de la consulta a **WhatsApp Business API**. | `Prospecto` | escribe → `Canal.recibir(mensaje)` | `Mensaje` (contenido, tipo, adjuntos) | `Prospecto` → `Canal` | 1.1.1.1 | WhatsApp Business API |
| 2 | **WhatsApp Business API** notifica el mensaje con el webhook firmado a **July**. | `Canal` | notifica → `July.atender(mensaje)` | `Mensaje` (idExterno, contenido, firma) | `Canal` → `July` | 1.1.2.3 | WhatsApp Business API |
| 3 | **July** verifica la firma del mensaje con **WhatsApp Business API**. | `July` | verifica → `Canal.verificarAutenticidad(mensaje)` | `Mensaje` (firma) | `July` → `Canal` | 1.1.2.3 | WhatsApp Business API |
| 4 | **WhatsApp Business API** devuelve la firma válida a **July**. | `Canal` | devuelve → *retorno* | — | `Canal` → `July` | 1.1.2.3 | WhatsApp Business API |
| 5 | **July** registra el mensaje en formato común en la **Conversación**. | `July` | registra → `Conversacion.registrarMensaje(mensaje)` | `Mensaje` (emisor, tipo, contenido, adjuntos) | `July` → `Conversacion` | 1.1.2.1 | WhatsApp Business API, Widget web |
| 6 | **Conversación** devuelve la conversación abierta con su canal a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.2.1 | WhatsApp Business API, Widget web |
| 7 | **July** etiqueta la campaña de origen en la **Conversación**. | `July` | etiqueta → `Conversacion.etiquetarOrigen(campana)` | `Conversacion` (canal, campana) | `July` → `Conversacion` | 1.1.1.3 | Equipo de marketing |
| 8 | **Conversación** devuelve el origen etiquetado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.1.3 | Equipo de marketing |
| 9 | **July** envía el aviso del origen de la conversación al **Equipo de marketing**. | `July` | envía → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = canal y campaña) | `July` → `Colaborador` | 1.1.1.3 | Equipo de marketing |
| 10 | **Equipo de marketing** devuelve el acuse del aviso a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 1.1.1.3 | Equipo de marketing |
| 11 | **July** envía la respuesta inmediata a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (contenido) | `July` → `Canal` | 1.1.2.1 | WhatsApp Business API, Widget web |
| 12 | **WhatsApp Business API** entrega la respuesta inmediata al **Prospecto**. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 1.1.1.1 | WhatsApp Business API |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A1 · El prospecto llega por el sitio web (reemplaza los pasos 1 a 4)* | | | | | | |
| 1a | **Prospecto** abre la sesión de chat desde una página del sitio con el **Widget web**. | `Prospecto` | abre → `Canal.abrirSesion(paginaOrigen)` | `Conversacion` (tokenSesion) | `Prospecto` → `Canal` | 1.1.1.2 | Widget web |
| 2a | **Widget web** devuelve el token de la sesión de chat al **Prospecto**. | `Canal` | devuelve → *retorno* | — | `Canal` → `Prospecto` | 1.1.1.2 | Widget web |
| 3a | **Prospecto** escribe el mensaje de la consulta al **Widget web**. | `Prospecto` | escribe → `Canal.recibir(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `Canal` | 1.1.1.2 | Widget web |
| 4a | **Widget web** entrega el mensaje con el token de la sesión a **July**. | `Canal` | entrega → `July.atender(mensaje)` | `Mensaje` (contenido, firma) | `Canal` → `July` | 1.1.2.1 | WhatsApp Business API, Widget web |
| 5a | **July** verifica el token del mensaje con el **Widget web**. | `July` | verifica → `Canal.verificarAutenticidad(mensaje)` | `Mensaje` (firma) | `July` → `Canal` | 1.1.2.1 | WhatsApp Business API, Widget web |
| 6a | **Widget web** devuelve el token válido a **July**. Continúa en el paso 5; las respuestas de los pasos 11 y 12 salen por el widget web. | `Canal` | devuelve → *retorno* | — | `Canal` → `July` | 1.1.2.1 | WhatsApp Business API, Widget web |
| | *A2 · El mensaje no trae campaña (reemplaza el paso 7)* | | | | | | |
| 7b | **July** etiqueta el origen directo en la **Conversación**. | `July` | etiqueta → `Conversacion.etiquetarOrigen(campana)` | `Conversacion` (canal, campana = null) | `July` → `Conversacion` | 1.1.1.3 | Equipo de marketing |
| 8b | **Conversación** devuelve el origen directo a **July**. Continúa en el paso 9. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.1.3 | Equipo de marketing |
| | *A3 · La firma del webhook no es válida (reemplaza el paso 4)* | | | | | | |
| 4c | **WhatsApp Business API** devuelve la firma inválida a **July**. | `Canal` | devuelve → *retorno* | — | `Canal` → `July` | 1.1.2.3 | WhatsApp Business API |
| 5c | **July** devuelve el error de integración por firma inválida a **WhatsApp Business API**. Fin. | `July` | devuelve → *retorno* | — | `July` → `Canal` | 1.1.2.3 | WhatsApp Business API |
| | *A4 · Hay un pico de demanda (reemplaza el paso 11)* | | | | | | |
| 11d | **July** pone en espera el mensaje en la **Conversación**. | `July` | pone en espera → `Conversacion.encolar()` | `Conversacion` (estado = EN_COLA) | `July` → `Conversacion` | 1.1.2.2 | Ninguno, lo resuelve July |
| 12d | **Conversación** devuelve el tiempo de espera estimado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.2.2 | Ninguno, lo resuelve July |
| 13d | **July** envía el aviso del tiempo de espera a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (contenido = tiempo de espera) | `July` → `Canal` | 1.1.2.2 | Ninguno, lo resuelve July |
| 14d | **WhatsApp Business API** entrega el aviso del tiempo de espera al **Prospecto**. Continúa en el paso 13. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 1.1.2.2 | Ninguno, lo resuelve July |

### CU 1.2 · Recibir el primer contacto (nivel 1 · etapa Primer contacto)

Incluye CU 1.2.1 Recibir atención inmediata y CU 1.2.2 Identificar al prospecto y su necesidad.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 13 | **Prospecto** envía el saludo inicial a **July**. | `Prospecto` | envía → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 1.2.1.1 | Administrador del asistente |
| 14 | **July** consulta el guion de bienvenida vigente al **Administrador del asistente**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `PlantillaMensaje` (tipo = BIENVENIDA, texto, version) | `July` → `Colaborador` | 1.2.1.1 | Administrador del asistente |
| 15 | **Administrador del asistente** devuelve el guion de bienvenida publicado a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 1.2.1.1 | Administrador del asistente |
| 16 | **July** compone el saludo con el aviso de privacidad en la **Plantilla de mensaje**. | `July` | compone → `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` (texto, opciones) | `July` → `PlantillaMensaje` | 1.2.1.1 | Administrador del asistente |
| 17 | **Plantilla de mensaje** devuelve el saludo con el aviso de privacidad a **July**. | `PlantillaMensaje` | devuelve → *retorno* | — | `PlantillaMensaje` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 18 | **July** envía el saludo con el aviso de privacidad al **Prospecto**. | `July` | envía → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 1.2.1.2 | Ninguno, lo resuelve July |
| 19 | **Prospecto** acepta el aviso de privacidad a **July**. | `Prospecto` | acepta → `July.atender(mensaje)` | `Mensaje` (contenido = acepto) | `Prospecto` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 20 | **July** registra el consentimiento aceptado en el **Prospecto**. | `July` | registra → `Prospecto.registrarConsentimiento(aceptado, versionAviso)` | `Prospecto` (consentimientoAceptado = true, versionAviso, fechaConsentimiento) | `July` → `Prospecto` | 1.2.1.2 | Ninguno, lo resuelve July |
| 21 | **Prospecto** devuelve el consentimiento registrado a **July**. | `Prospecto` | devuelve → *retorno* | — | `Prospecto` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 22 | **July** consulta el menú de opciones vigente al **Administrador del asistente**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `PlantillaMensaje` (tipo = MENU, opciones) | `July` → `Colaborador` | 1.2.1.1 | Administrador del asistente |
| 23 | **Administrador del asistente** devuelve el menú de opciones publicado a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 1.2.1.1 | Administrador del asistente |
| 24 | **July** muestra el menú de opciones completo al **Prospecto**. | `July` | muestra → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 1.2.1.1 | Administrador del asistente |
| 25 | **Prospecto** describe la necesidad de crédito a **July**. | `Prospecto` | describe → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 1.2.2.1 | Ninguno, lo resuelve July |
| 26 | **July** busca la intención de crédito en la **Línea de crédito**. | `July` | busca → `LineaCredito.buscar(criterio)` | `LineaCredito` (codigo, nombre, palabrasClave) | `July` → `LineaCredito` | 1.2.2.1 | Ninguno, lo resuelve July |
| 27 | **Línea de crédito** devuelve la línea detectada a **July**. | `LineaCredito` | devuelve → *retorno* | — | `LineaCredito` → `July` | 1.2.2.1 | Ninguno, lo resuelve July |
| 28 | **July** solicita la confirmación de la línea detectada al **Prospecto**. | `July` | solicita → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 1.2.2.1 | Ninguno, lo resuelve July |
| 29 | **Prospecto** confirma la línea de crédito a **July**. | `Prospecto` | confirma → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 1.2.2.1 | Ninguno, lo resuelve July |
| 30 | **July** consulta la condición de socio del prospecto al **Sistema core**. | `July` | consulta → `SistemaCore.consultarSocio(prospecto)` | `Prospecto` (telefono, condicionSocio) | `July` → `SistemaCore` | 1.2.2.2 | Sistema core |
| 31 | **Sistema core** devuelve la condición de socio y la fecha de ingreso a **July**. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 1.2.2.2 | Sistema core |
| 32 | **July** registra el lead con su línea y su necesidad en el **Lead**. | `July` | registra → `Lead.registrar(prospecto, conversacion, linea, necesidad)` | `Lead` (lineaCredito, necesidad, estado = NUEVO) | `July` → `Lead` | 1.2.2.3 | Ninguno, lo resuelve July |
| 33 | **Lead** devuelve el número de seguimiento a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 1.2.2.3 | Ninguno, lo resuelve July |
| 34 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. | `July` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = numeroSeguimiento) | `July` → `Prospecto` | 1.2.2.3 | Ninguno, lo resuelve July |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A5 · El prospecto no acepta el aviso (reemplaza los pasos 19 a 34)* | | | | | | |
| 19e | **Prospecto** rechaza el aviso de privacidad a **July**. | `Prospecto` | rechaza → `July.atender(mensaje)` | `Mensaje` (contenido = no acepto) | `Prospecto` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 20e | **July** registra el consentimiento rechazado en el **Prospecto**. | `July` | registra → `Prospecto.registrarConsentimiento(aceptado, versionAviso)` | `Prospecto` (consentimientoAceptado = false, versionAviso) | `July` → `Prospecto` | 1.2.1.2 | Ninguno, lo resuelve July |
| 21e | **Prospecto** devuelve el consentimiento registrado a **July**. | `Prospecto` | devuelve → *retorno* | — | `Prospecto` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 22e | **July** consulta el menú básico vigente al **Administrador del asistente**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `PlantillaMensaje` (tipo = MENU_BASICO, opciones) | `July` → `Colaborador` | 1.2.1.2 | Ninguno, lo resuelve July |
| 23e | **Administrador del asistente** devuelve el menú básico publicado a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 1.2.1.2 | Ninguno, lo resuelve July |
| 24e | **July** muestra el menú básico de información general al **Prospecto**. Fin. | `July` | muestra → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 1.2.1.2 | Ninguno, lo resuelve July |
| | *A6 · El prospecto pide hablar con una persona (reemplaza los pasos 25 a 34; también se llega desde el paso 74l del flujo 2)* | | | | | | |
| 25f | **Prospecto** solicita hablar con un asesor a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 1.2.1.3 | Asesor comercial |
| 26f | **July** envía la derivación con el historial de la conversación al **Asesor comercial**. | `July` | envía → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido = derivación e historial) | `July` → `AsesorComercial` | 1.2.1.3 | Asesor comercial |
| 27f | **Asesor comercial** acepta la derivación a **July**. | `AsesorComercial` | acepta → `July.atender(mensaje)` | `Mensaje` (contenido = acepto) | `AsesorComercial` → `July` | 1.2.1.3 | Asesor comercial |
| 28f | **July** traspasa la conversación con su historial en la **Conversación**. | `July` | traspasa → `Conversacion.traspasar(asesor)` | `Conversacion` (asesorAsignado, estado = DERIVADA) | `July` → `Conversacion` | 1.2.1.3 | Asesor comercial |
| 29f | **Conversación** devuelve la conversación derivada a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.2.1.3 | Asesor comercial |
| 30f | **July** confirma el traspaso de la conversación al **Asesor comercial**. | `July` | confirma → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `AsesorComercial` | 1.2.1.3 | Asesor comercial |
| 31f | **Asesor comercial** envía el saludo del asesor al **Prospecto**. Fin. | `AsesorComercial` | envía → `Prospecto.recibir(mensaje)` | `Mensaje` (emisor = ASESOR, contenido) | `AsesorComercial` → `Prospecto` | 1.2.1.3 | Asesor comercial |
| | *A7 · July no reconoce la intención (reemplaza los pasos 27 y 28)* | | | | | | |
| 27g | **Línea de crédito** devuelve la ausencia de coincidencia a **July**. | `LineaCredito` | devuelve → *retorno* | — | `LineaCredito` → `July` | 1.2.2.1 | Ninguno, lo resuelve July |
| 28g | **July** ofrece las líneas de crédito como opciones cerradas al **Prospecto**. Continúa en el paso 29. | `July` | ofrece → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 1.2.2.1 | Ninguno, lo resuelve July |
| | *A8 · Es una pregunta frecuente y no una solicitud de crédito (reemplaza los pasos 26 a 34)* | | | | | | |
| 26h | **July** busca la respuesta a la pregunta frecuente en la **Plantilla de mensaje**. | `July` | busca → `PlantillaMensaje.buscarRespuesta(texto)` | `PlantillaMensaje` (tipo = PREGUNTA_FRECUENTE, texto) | `July` → `PlantillaMensaje` | 1.2.2.1 | Ninguno, lo resuelve July |
| 27h | **Plantilla de mensaje** devuelve la respuesta frecuente a **July**. | `PlantillaMensaje` | devuelve → *retorno* | — | `PlantillaMensaje` → `July` | 1.2.2.1 | Ninguno, lo resuelve July |
| 28h | **July** responde la pregunta frecuente al **Prospecto**. Fin. | `July` | responde → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 1.2.2.1 | Ninguno, lo resuelve July |
| | *A9 · El Sistema core no responde a tiempo (reemplaza el paso 31)* | | | | | | |
| 31i | **Sistema core** devuelve la condición «por verificar» por tiempo agotado a **July**. Continúa en el paso 32. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 1.2.2.2 | Sistema core |
| | *A10 · El prospecto llegó por el widget web y aún no hay teléfono (reemplaza los pasos 30 a 32)* | | | | | | |
| 30j | **July** registra el lead con la condición «por verificar» en el **Lead**. Continúa en el paso 33. | `July` | registra → `Lead.registrar(prospecto, conversacion, linea, necesidad)` | `Lead` (lineaCredito, necesidad, estado = NUEVO) | `July` → `Lead` | 1.2.2.3 | Ninguno, lo resuelve July |

<a id="flujo-2"></a>
## Flujo 2 · Captura, simulación y precalificación

| Campo | Especificación |
|---|---|
| Flujo de valor | 2 · Captura, simulación y precalificación |
| Casos de nivel 1 | CU 2.1 Completar el perfil del crédito (etapa Perfilamiento), CU 2.2 Simular el crédito (etapa Simulación financiera), CU 2.3 Obtener la precalificación (etapa Precalificación) |
| Actor principal | Prospecto |
| Actores secundarios | Sistema core, WhatsApp Business API, Área de productos y crédito, Comité de crédito, Personal de agencia |
| Objetivo | Convertir la conversación en una solicitud con datos validados, una simulación elegida, un resultado de precalificación y una cita en agencia. |
| Disparador | El prospecto con lead registrado pide iniciar su solicitud de crédito. |
| Precondiciones | El lead está registrado y el prospecto aceptó el aviso de privacidad (flujo 1). El Área de productos y crédito publicó el catálogo, el Comité de crédito las reglas de precalificación y el Personal de agencia su agenda. |
| Postcondiciones | La solicitud está confirmada y precalificada como APTO, A_REVISAR o NO_APTO; la simulación elegida está guardada y, si el prospecto la pidió, la cita está reservada. Con un resultado NO_APTO, el prospecto puede quedar derivado a un asesor para revisar su caso. |

### CU 2.1 · Completar el perfil del crédito (nivel 1 · etapa Perfilamiento)

Incluye CU 2.1.1 Entregar los datos conversando y CU 2.1.2 Validar los datos y mantener la continuidad.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 1 | **Prospecto** pide iniciar la solicitud de crédito a **July**. | `Prospecto` | pide → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.1.3 | Ninguno, lo resuelve July |
| 2 | **July** inicia la solicitud de crédito para la línea del lead en la **Solicitud de crédito**. | `July` | inicia → `SolicitudCredito.iniciar(lead)` | `SolicitudCredito` (lead, estado = EN_CAPTURA) | `July` → `SolicitudCredito` | 2.1.1.3 | Ninguno, lo resuelve July |
| 3 | **Solicitud de crédito** devuelve la solicitud abierta a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.3 | Ninguno, lo resuelve July |
| 4 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | `July` | consulta → `SolicitudCredito.campoPendiente()` | `SolicitudCredito` (monto, plazo, destino) | `July` → `SolicitudCredito` | 2.1.1.3 | Ninguno, lo resuelve July |
| 5 | **Solicitud de crédito** devuelve el campo pendiente de monto, plazo y destino a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.3 | Ninguno, lo resuelve July |
| 6 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. | `July` | solicita → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.1.1.3 | Ninguno, lo resuelve July |
| 7 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. | `Prospecto` | indica → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.1.3 | Ninguno, lo resuelve July |
| 8 | **July** registra el monto, el plazo y el destino en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` (monto, plazo, destino) | `July` → `SolicitudCredito` | 2.1.1.3 | Ninguno, lo resuelve July |
| 9 | **Solicitud de crédito** devuelve el monto y el plazo válidos para la línea a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.2.1 | Sistema core |
| 10 | **July** guarda el avance de la conversación en la **Conversación**. | `July` | guarda → `Conversacion.guardarAvance(paso)` | `Conversacion` (ultimoPaso, fechaUltimaActividad) | `July` → `Conversacion` | 2.1.2.2 | Ninguno, lo resuelve July |
| 11 | **Conversación** devuelve el avance guardado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 2.1.2.2 | Ninguno, lo resuelve July |
| 12 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | `July` | consulta → `SolicitudCredito.campoPendiente()` | `SolicitudCredito` (lead) | `July` → `SolicitudCredito` | 2.1.1.1 | Ninguno, lo resuelve July |
| 13 | **Solicitud de crédito** devuelve el campo pendiente de identidad y contacto a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 14 | **July** solicita los nombres, la cédula, el correo y el teléfono al **Prospecto**. | `July` | solicita → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.1.1.1 | Ninguno, lo resuelve July |
| 15 | **Prospecto** entrega los nombres, la cédula, el correo y el teléfono a **July**. | `Prospecto` | entrega → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 16 | **July** registra los nombres, la cédula, el correo y el teléfono en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.registrarDato(campo, valor)` | `Prospecto` (nombres, cedula, correo, telefono) | `July` → `SolicitudCredito` | 2.1.2.1 | Sistema core |
| 17 | **Solicitud de crédito** devuelve el formato válido de los datos a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.2.1 | Sistema core |
| 18 | **July** valida la cédula con el **Sistema core**. | `July` | valida → `SistemaCore.validarCedula(cedula)` | `Prospecto` (cedula) | `July` → `SistemaCore` | 2.1.2.1 | Sistema core |
| 19 | **Sistema core** devuelve la cédula válida a **July**. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 2.1.2.1 | Sistema core |
| 20 | **July** guarda el avance de la conversación en la **Conversación**. | `July` | guarda → `Conversacion.guardarAvance(paso)` | `Conversacion` (ultimoPaso, fechaUltimaActividad) | `July` → `Conversacion` | 2.1.2.2 | Ninguno, lo resuelve July |
| 21 | **Conversación** devuelve el avance guardado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 2.1.2.2 | Ninguno, lo resuelve July |
| 22 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | `July` | consulta → `SolicitudCredito.campoPendiente()` | `SolicitudCredito` (ingresosMensuales, actividadEconomica) | `July` → `SolicitudCredito` | 2.1.1.2 | Ninguno, lo resuelve July |
| 23 | **Solicitud de crédito** devuelve el campo pendiente de ingresos y actividad a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.2 | Ninguno, lo resuelve July |
| 24 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. | `July` | solicita → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.1.1.2 | Ninguno, lo resuelve July |
| 25 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. | `Prospecto` | declara → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.1.2 | Ninguno, lo resuelve July |
| 26 | **July** registra los ingresos y la actividad en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` (ingresosMensuales, actividadEconomica) | `July` → `SolicitudCredito` | 2.1.1.2 | Ninguno, lo resuelve July |
| 27 | **Solicitud de crédito** devuelve los ingresos y la actividad válidos a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.2 | Ninguno, lo resuelve July |
| 28 | **July** resume la solicitud en la **Solicitud de crédito**. | `July` | resume → `SolicitudCredito.resumir()` | `SolicitudCredito` (monto, plazo, destino, ingresosMensuales, actividadEconomica) | `July` → `SolicitudCredito` | 2.1.1.1 | Ninguno, lo resuelve July |
| 29 | **Solicitud de crédito** devuelve el resumen con todos los datos a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 30 | **July** solicita la confirmación del resumen al **Prospecto**. | `July` | solicita → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.1.1.1 | Ninguno, lo resuelve July |
| 31 | **Prospecto** confirma el resumen de la solicitud a **July**. | `Prospecto` | confirma → `July.atender(mensaje)` | `Mensaje` (contenido = confirmo) | `Prospecto` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 32 | **July** confirma la solicitud en la **Solicitud de crédito**. | `July` | confirma → `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` (estado = CONFIRMADA) | `July` → `SolicitudCredito` | 2.1.1.1 | Ninguno, lo resuelve July |
| 33 | **Solicitud de crédito** devuelve la solicitud confirmada a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 34 | **July** guarda el avance de la conversación en la **Conversación**. | `July` | guarda → `Conversacion.guardarAvance(paso)` | `Conversacion` (ultimoPaso, fechaUltimaActividad) | `July` → `Conversacion` | 2.1.2.2 | Ninguno, lo resuelve July |
| 35 | **Conversación** devuelve el avance guardado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 2.1.2.2 | Ninguno, lo resuelve July |
| 36 | **July** informa la solicitud confirmada al **Prospecto**. | `July` | informa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.1.1.1 | Ninguno, lo resuelve July |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A1 · El prospecto ya es socio (reemplaza los pasos 14 a 19)* | | | | | | |
| 14a | **July** muestra los datos registrados del socio al **Prospecto**. | `July` | muestra → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = nombres, cédula, correo y teléfono del core) | `July` → `Prospecto` | 2.1.1.1 | Ninguno, lo resuelve July |
| 15a | **Prospecto** confirma los datos registrados a **July**. Continúa en el paso 20. | `Prospecto` | confirma → `July.atender(mensaje)` | `Mensaje` (contenido = confirmo) | `Prospecto` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| | *A2 · Un dato no tiene formato válido (reemplaza el paso 17; igual en los pasos 9 y 27)* | | | | | | |
| 17b | **Solicitud de crédito** devuelve el motivo del error de formato a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.2.1 | Sistema core |
| 18b | **July** explica el error del dato al **Prospecto**. | `July` | explica → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = motivo y valores permitidos) | `July` → `Prospecto` | 2.1.2.1 | Sistema core |
| 19b | **Prospecto** corrige el dato a **July**. Vuelve al paso 16. | `Prospecto` | corrige → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.2.1 | Sistema core |
| | *A3 · La cédula no es válida en el Sistema core (reemplaza el paso 19)* | | | | | | |
| 19c | **Sistema core** devuelve la cédula no válida a **July**. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 2.1.2.1 | Sistema core |
| 20c | **July** explica el error de validación de la cédula al **Prospecto**. | `July` | explica → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.1.2.1 | Sistema core |
| 21c | **Prospecto** corrige la cédula a **July**. Vuelve al paso 16. | `Prospecto` | corrige → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.2.1 | Sistema core |
| | *A4 · El prospecto corrige un dato del resumen (reemplaza el paso 31)* | | | | | | |
| 31d | **Prospecto** corrige el dato equivocado a **July**. | `Prospecto` | corrige → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| 32d | **July** registra el dato corregido en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.registrarDato(campo, valor)` | `SolicitudCredito` (campo corregido) | `July` → `SolicitudCredito` | 2.1.1.1 | Ninguno, lo resuelve July |
| 33d | **Solicitud de crédito** devuelve el dato válido a **July**. Vuelve al paso 28. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.1.1.1 | Ninguno, lo resuelve July |
| | *A5 · El prospecto abandona la conversación (después del paso 24; igual tras cualquier pregunta de July)* | | | | | | |
| 24e | **Prospecto** deja vencer el tiempo de respuesta a **July**. | `Prospecto` | deja vencer → `July.vencerPlazo(plazo)` | `Conversacion` (fechaUltimaActividad) | `Prospecto` → `July` | 2.1.2.3 | WhatsApp Business API |
| 25e | **July** marca la conversación como abandonada en la **Conversación**. | `July` | marca → `Conversacion.marcarAbandonada()` | `Conversacion` (estado = ABANDONADA) | `July` → `Conversacion` | 2.1.2.3 | WhatsApp Business API |
| 26e | **Conversación** devuelve la conversación abandonada a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 2.1.2.3 | WhatsApp Business API |
| 27e | **July** compone la plantilla de retoma con el último paso guardado en la **Plantilla de mensaje**. | `July` | compone → `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` (tipo = RETOMA, plantillaProveedor) | `July` → `PlantillaMensaje` | 2.1.2.3 | WhatsApp Business API |
| 28e | **Plantilla de mensaje** devuelve la plantilla de retoma a **July**. | `PlantillaMensaje` | devuelve → *retorno* | — | `PlantillaMensaje` → `July` | 2.1.2.3 | WhatsApp Business API |
| 29e | **July** envía la plantilla de retoma a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (tipo = PLANTILLA, contenido) | `July` → `Canal` | 2.1.2.3 | WhatsApp Business API |
| 30e | **WhatsApp Business API** entrega la plantilla de retoma al **Prospecto**. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 2.1.2.3 | WhatsApp Business API |
| 31e | **Prospecto** responde la plantilla de retoma a **July**. | `Prospecto` | responde → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.2.3 | WhatsApp Business API |
| 32e | **July** retoma la conversación desde el último paso guardado en la **Conversación**. | `July` | retoma → `Conversacion.retomar()` | `Conversacion` (ultimoPaso, estado = ACTIVA) | `July` → `Conversacion` | 2.1.2.2 | Ninguno, lo resuelve July |
| 33e | **Conversación** devuelve el último paso guardado a **July**. Vuelve al paso 22. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 2.1.2.2 | Ninguno, lo resuelve July |

### CU 2.2 · Simular el crédito (nivel 1 · etapa Simulación financiera)

Incluye CU 2.2.1 Calcular las condiciones del crédito y CU 2.2.2 Consultar productos y condiciones.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 37 | **Prospecto** solicita la simulación del crédito a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| 38 | **July** calcula la cuota con el monto y el plazo en la **Simulación**. | `July` | calcula → `Simulacion.calcular(solicitud, monto, plazo)` | `Simulacion` (monto, plazo, tasa, cuotaMensual, totalPagar) | `July` → `Simulacion` | 2.2.1.1 | Ninguno, lo resuelve July |
| 39 | **Simulación** devuelve la cuota mensual a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| 40 | **July** genera la tabla de amortización en la **Simulación**. | `July` | genera → `Simulacion.generarTablaAmortizacion()` | `Simulacion` (cuotaMensual, plazo, tasa) | `July` → `Simulacion` | 2.2.1.1 | Ninguno, lo resuelve July |
| 41 | **Simulación** devuelve la tabla de amortización a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| 42 | **July** presenta la cuota con la tabla de amortización al **Prospecto**. | `July` | presenta → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.2.1.1 | Ninguno, lo resuelve July |
| 43 | **Prospecto** solicita el costo total del crédito a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.2 | Ninguno, lo resuelve July |
| 44 | **July** muestra el total a pagar con intereses, seguros y cargos al **Prospecto**. | `July` | muestra → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = intereses, seguros, cargos y totalPagar) | `July` → `Prospecto` | 2.2.1.2 | Ninguno, lo resuelve July |
| 45 | **Prospecto** solicita comparar otro monto o plazo a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.3 | Ninguno, lo resuelve July |
| 46 | **July** calcula el escenario alternativo en la **Simulación**. | `July` | calcula → `Simulacion.calcular(solicitud, monto, plazo)` | `Simulacion` (monto, plazo, cuotaMensual, totalPagar) | `July` → `Simulacion` | 2.2.1.3 | Ninguno, lo resuelve July |
| 47 | **Simulación** devuelve el escenario alternativo a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.2.1.3 | Ninguno, lo resuelve July |
| 48 | **July** presenta los escenarios lado a lado al **Prospecto**. | `July` | presenta → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.2.1.3 | Ninguno, lo resuelve July |
| 49 | **Prospecto** elige el escenario de la simulación a **July**. | `Prospecto` | elige → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.3 | Ninguno, lo resuelve July |
| 50 | **July** marca el escenario elegido en la **Simulación**. | `July` | marca → `Simulacion.elegir()` | `SolicitudCredito` (simulacionElegida) | `July` → `Simulacion` | 2.2.1.3 | Ninguno, lo resuelve July |
| 51 | **Simulación** devuelve la simulación elegida a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.2.1.3 | Ninguno, lo resuelve July |
| 52 | **July** confirma el escenario elegido al **Prospecto**. | `July` | confirma → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.2.1.3 | Ninguno, lo resuelve July |
| 53 | **Prospecto** consulta las líneas de crédito disponibles a **July**. | `Prospecto` | consulta → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.2.1 | Área de productos y crédito |
| 54 | **July** consulta el catálogo de líneas vigentes al **Área de productos y crédito**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `LineaCredito` (codigo, nombre, tasa, plazos, requisitos, vigente) | `July` → `Colaborador` | 2.2.2.1 | Área de productos y crédito |
| 55 | **Área de productos y crédito** devuelve el catálogo publicado con las líneas vigentes a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.2.2.1 | Área de productos y crédito |
| 56 | **July** presenta las líneas de crédito vigentes al **Prospecto**. | `July` | presenta → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.2.2.1 | Área de productos y crédito |
| 57 | **Prospecto** selecciona la línea de crédito a **July**. | `Prospecto` | selecciona → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.2.2 | Área de productos y crédito |
| 58 | **July** cambia la línea elegida en el **Lead**. | `July` | cambia → `Lead.elegirLinea(linea)` | `Lead` (lineaCredito) | `July` → `Lead` | 2.2.2.2 | Área de productos y crédito |
| 59 | **Lead** devuelve la línea elegida a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 2.2.2.2 | Área de productos y crédito |
| 60 | **July** informa la tasa y los plazos vigentes de la línea al **Prospecto**. | `July` | informa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = tasa y plazos) | `July` → `Prospecto` | 2.2.2.2 | Área de productos y crédito |
| 61 | **Prospecto** consulta los requisitos de la línea a **July**. | `Prospecto` | consulta → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.2.3 | Área de productos y crédito |
| 62 | **July** informa los requisitos publicados de la línea al **Prospecto**. | `July` | informa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = requisitos) | `July` → `Prospecto` | 2.2.2.3 | Área de productos y crédito |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A6 · El monto está fuera del rango de la línea (reemplaza el paso 39)* | | | | | | |
| 39f | **Simulación** devuelve el monto fuera del rango de la línea a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| 40f | **July** valida el monto y el plazo en la **Línea de crédito**. | `July` | valida → `LineaCredito.validarCondiciones(monto, plazo)` | `LineaCredito` (montoMinimo, montoMaximo, plazos) | `July` → `LineaCredito` | 2.2.1.1 | Ninguno, lo resuelve July |
| 41f | **Línea de crédito** devuelve los montos mínimo y máximo permitidos a **July**. | `LineaCredito` | devuelve → *retorno* | — | `LineaCredito` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| 42f | **July** informa los montos mínimo y máximo al **Prospecto**. Vuelve al paso 37. | `July` | informa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.2.1.1 | Ninguno, lo resuelve July |
| | *A7 · El prospecto no quiere comparar (reemplaza los pasos 45 a 49)* | | | | | | |
| 45g | **Prospecto** acepta la simulación inicial a **July**. Continúa en el paso 50. | `Prospecto` | acepta → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |
| | *A8 · La línea elegida ya no está vigente (reemplaza el paso 59)* | | | | | | |
| 59h | **Lead** devuelve la línea no vigente a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 2.2.2.2 | Área de productos y crédito |
| 60h | **July** ofrece las líneas alternativas vigentes al **Prospecto**. Vuelve al paso 57. | `July` | ofrece → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.2.2.1 | Área de productos y crédito |
| | *A9 · La línea elegida no es la que se simuló (después del paso 60)* | | | | | | |
| 61i | **Prospecto** pide simular con la nueva línea a **July**. Vuelve al paso 38. | `Prospecto` | pide → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.2.1.1 | Ninguno, lo resuelve July |

### CU 2.3 · Obtener la precalificación (nivel 1 · etapa Precalificación)

Incluye CU 2.3.1 Evaluar al prospecto con reglas y CU 2.3.2 Recibir orientación sobre el resultado.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 63 | **Prospecto** solicita la precalificación del escenario elegido a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.3.1.1 | Comité de crédito |
| 64 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `ReglaNegocio` (tipo = PRECALIFICACION, parametros, version) | `July` → `Colaborador` | 2.3.1.1 | Comité de crédito |
| 65 | **Comité de crédito** devuelve las reglas aprobadas en la tabla de decisión a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.1.1 | Comité de crédito |
| 66 | **July** consulta la edad, la actividad y la condición de socio al **Sistema core**. | `July` | consulta → `SistemaCore.consultarSocio(prospecto)` | `Prospecto` (edad, actividadRegistrada, condicionSocio) | `July` → `SistemaCore` | 2.3.1.2 | Sistema core |
| 67 | **Sistema core** devuelve la edad, la actividad registrada y la condición de socio a **July**. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 2.3.1.2 | Sistema core |
| 68 | **July** precalifica la simulación elegida con las reglas en la **Solicitud de crédito**. | `July` | precalifica → `SolicitudCredito.precalificar(reglas)` | `SolicitudCredito` (capacidadPago, resultado, factores) | `July` → `SolicitudCredito` | 2.3.1.1 | Comité de crédito |
| 69 | **Solicitud de crédito** devuelve el resultado APTO con su capacidad de pago a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.1.3 | Comité de crédito |
| 70 | **July** explica el resultado en la **Solicitud de crédito**. | `July` | explica → `SolicitudCredito.explicarResultado()` | `SolicitudCredito` (resultado, factores) | `July` → `SolicitudCredito` | 2.3.2.1 | Ninguno, lo resuelve July |
| 71 | **Solicitud de crédito** devuelve la explicación del resultado y sus factores a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.2.1 | Ninguno, lo resuelve July |
| 72 | **July** comunica el resultado preliminar y no vinculante al **Prospecto**. | `July` | comunica → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.3.2.1 | Ninguno, lo resuelve July |
| 73 | **Prospecto** consulta los documentos que debe preparar a **July**. | `Prospecto` | consulta → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.3.2.2 | Ninguno, lo resuelve July |
| 74 | **July** consulta los documentos según la condición de socio en la **Línea de crédito**. | `July` | consulta → `LineaCredito.requisitosPara(condicion)` | `LineaCredito` (requisitos, requisitosAfiliacion) | `July` → `LineaCredito` | 2.3.2.2 | Ninguno, lo resuelve July |
| 75 | **Línea de crédito** devuelve la lista de documentos requeridos a **July**. | `LineaCredito` | devuelve → *retorno* | — | `LineaCredito` → `July` | 2.3.2.2 | Ninguno, lo resuelve July |
| 76 | **July** envía la lista de documentos requeridos al **Prospecto**. | `July` | envía → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.3.2.2 | Ninguno, lo resuelve July |
| 77 | **Prospecto** solicita una cita en la agencia de su preferencia a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.3.2.3 | Personal de agencia |
| 78 | **July** consulta los horarios disponibles de la agencia al **Personal de agencia**. | `July` | consulta → `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Cita` (agencia, fechaHora) | `July` → `Colaborador` | 2.3.2.3 | Personal de agencia |
| 79 | **Personal de agencia** devuelve los horarios libres de su agenda a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.2.3 | Personal de agencia |
| 80 | **July** ofrece los horarios disponibles al **Prospecto**. | `July` | ofrece → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.3.2.3 | Personal de agencia |
| 81 | **Prospecto** selecciona un horario disponible a **July**. | `Prospecto` | selecciona → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.3.2.3 | Personal de agencia |
| 82 | **July** reserva la cita en el horario elegido en la **Cita**. | `July` | reserva → `Cita.reservar(lead, agencia, fechaHora)` | `Cita` (agencia, fechaHora, estado = RESERVADA) | `July` → `Cita` | 2.3.2.3 | Personal de agencia |
| 83 | **Cita** devuelve la cita reservada a **July**. | `Cita` | devuelve → *retorno* | — | `Cita` → `July` | 2.3.2.3 | Personal de agencia |
| 84 | **July** avisa la cita reservada al **Personal de agencia**. | `July` | avisa → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = fecha, hora y prospecto) | `July` → `Colaborador` | 2.3.2.3 | Personal de agencia |
| 85 | **Personal de agencia** devuelve el acuse de la reserva a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.2.3 | Personal de agencia |
| 86 | **July** envía la confirmación de la cita con la fecha, la hora y la agencia al **Prospecto**. Fin. | `July` | envía → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.3.2.3 | Personal de agencia |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A10 · El Sistema core no tiene registro del prospecto (reemplaza el paso 67)* | | | | | | |
| 67j | **Sistema core** devuelve la ausencia de registro del socio a **July**. Continúa en el paso 68 y el resultado queda condicionado. | `SistemaCore` | devuelve → *retorno* | — | `SistemaCore` → `July` | 2.3.1.2 | Sistema core |
| | *A11 · El caso queda «a revisar» (reemplaza los pasos 69 a 72)* | | | | | | |
| 69k | **Solicitud de crédito** devuelve el resultado A_REVISAR a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.1.3 | Comité de crédito |
| 70k | **July** deriva la solicitud a revisión en la **Solicitud de crédito**. | `July` | deriva → `SolicitudCredito.derivarARevision()` | `SolicitudCredito` (numeroCasoRevision) | `July` → `SolicitudCredito` | 2.3.1.3 | Comité de crédito |
| 71k | **Solicitud de crédito** devuelve el número del caso de revisión a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.1.3 | Comité de crédito |
| 72k | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. | `July` | envía → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = caso y precalificación) | `July` → `Colaborador` | 2.3.1.3 | Comité de crédito |
| 73k | **Comité de crédito** devuelve el acuse de recepción del caso a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.1.3 | Comité de crédito |
| 74k | **July** informa el número del caso de revisión al **Prospecto**. Continúa en el paso 73. | `July` | informa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido = numeroCasoRevision) | `July` → `Prospecto` | 2.3.1.3 | Comité de crédito |
| | *A12 · El resultado es «no apto» (reemplaza los pasos 69 a 86)* | | | | | | |
| 69l | **Solicitud de crédito** devuelve el resultado NO_APTO con su capacidad de pago a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.1.3 | Comité de crédito |
| 70l | **July** explica el motivo del resultado en la **Solicitud de crédito**. | `July` | explica → `SolicitudCredito.explicarResultado()` | `SolicitudCredito` (resultado, factores) | `July` → `SolicitudCredito` | 2.3.2.1 | Ninguno, lo resuelve July |
| 71l | **Solicitud de crédito** devuelve el motivo del resultado «no apto» a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 2.3.2.1 | Ninguno, lo resuelve July |
| 72l | **July** sugiere un monto o plazo que quepa en la capacidad de pago en la **Simulación**. | `July` | sugiere → `Simulacion.sugerirAlternativa(capacidadPago)` | `Simulacion` (monto, plazo, cuotaMensual) | `July` → `Simulacion` | 2.3.2.1 | Ninguno, lo resuelve July |
| 73l | **Simulación** devuelve el escenario alternativo a **July**. | `Simulacion` | devuelve → *retorno* | — | `Simulacion` → `July` | 2.3.2.1 | Ninguno, lo resuelve July |
| 74l | **July** explica el motivo con el escenario alternativo y la opción de revisión con un asesor al **Prospecto**. Fin. El prospecto puede volver a simular desde el paso 37 o pedir la revisión con un asesor en el flujo 1, paso 25f (A6). | `July` | explica → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 2.3.2.1 | Ninguno, lo resuelve July |
| | *A13 · El prospecto no es socio (reemplaza el paso 75)* | | | | | | |
| 75m | **Línea de crédito** devuelve los documentos con los requisitos de afiliación a **July**. Continúa en el paso 76. | `LineaCredito` | devuelve → *retorno* | — | `LineaCredito` → `July` | 2.3.2.2 | Ninguno, lo resuelve July |
| | *A14 · No hay horarios libres en la fecha pedida (reemplaza los pasos 79 y 80)* | | | | | | |
| 79n | **Personal de agencia** devuelve la agenda sin horarios libres a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.2.3 | Personal de agencia |
| 80n | **July** consulta las fechas libres más cercanas al **Personal de agencia**. | `July` | consulta → `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Cita` (agencia, fechaHora) | `July` → `Colaborador` | 2.3.2.3 | Personal de agencia |
| 81n | **Personal de agencia** devuelve los horarios libres más cercanos a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 2.3.2.3 | Personal de agencia |
| 82n | **July** ofrece los horarios libres más cercanos al **Prospecto**. Continúa en el paso 81. | `July` | ofrece → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido, opciones) | `July` → `Prospecto` | 2.3.2.3 | Personal de agencia |

<a id="flujo-3"></a>
## Flujo 3 · Entrega, seguimiento y conversión

| Campo | Especificación |
|---|---|
| Flujo de valor | 3 · Entrega, seguimiento y conversión |
| Casos de nivel 1 | CU 3.1 Recibir la oportunidad precalificada (etapa Entrega de oportunidades), CU 3.2 Dar seguimiento al lead hasta su cierre (etapa Asignación y seguimiento) |
| Actor principal | Asesor comercial |
| Actores secundarios | Jefe comercial, CRM de la cooperativa, Prospecto, WhatsApp Business API, Personal de agencia, Comité de crédito |
| Objetivo | Poner cada lead precalificado en manos de un asesor y llevarlo hasta el desembolso o la pérdida, con su estado sincronizado en el CRM. |
| Disparador | El lead termina la precalificación como APTO o A_REVISAR (flujo 2, paso 69 o alternativo A11). July inicia el flujo; el Asesor comercial es su beneficiario. |
| Precondiciones | El prospecto completó la precalificación (flujo 2). El Jefe comercial publicó los criterios de prioridad y las reglas de enrutamiento. |
| Postcondiciones | El lead está registrado en el CRM, asignado a un asesor y cerrado como DESEMBOLSADO o PERDIDO, con su estado final sincronizado. |

### CU 3.1 · Recibir la oportunidad precalificada (nivel 1 · etapa Entrega de oportunidades)

Incluye CU 3.1.1 Generar la ficha del prospecto y CU 3.1.2 Registrar el lead en el CRM.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 1 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `ReglaNegocio` (tipo = PRIORIDAD, parametros) | `July` → `Colaborador` | 3.1.1.2 | Jefe comercial |
| 2 | **Jefe comercial** devuelve los criterios de lead caliente, tibio y frío a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 3.1.1.2 | Jefe comercial |
| 3 | **July** prioriza el lead con los criterios en el **Lead**. | `July` | prioriza → `Lead.priorizar(criterios)` | `Lead` (prioridad) | `July` → `Lead` | 3.1.1.2 | Jefe comercial |
| 4 | **Lead** devuelve la prioridad del lead a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.1.1.2 | Jefe comercial |
| 5 | **July** genera la ficha con datos, simulación y resultado en el **Lead**. | `July` | genera → `Lead.generarFicha()` | `Lead` (prospecto, solicitud, prioridad) | `July` → `Lead` | 3.1.1.1 | Ninguno, lo resuelve July |
| 6 | **Lead** devuelve la ficha del prospecto con el historial de la conversación a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.1.1.3 | Ninguno, lo resuelve July |
| 7 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. | `July` | busca → `CRMCooperativa.buscarLead(cedula, telefono)` | `Prospecto` (cedula, telefono) | `July` → `CRMCooperativa` | 3.1.2.2 | CRM de la cooperativa |
| 8 | **CRM de la cooperativa** devuelve la ausencia de registro previo a **July**. | `CRMCooperativa` | devuelve → *retorno* | — | `CRMCooperativa` → `July` | 3.1.2.2 | CRM de la cooperativa |
| 9 | **July** registra el lead con su ficha en el **CRM de la cooperativa**. | `July` | registra → `CRMCooperativa.sincronizarLead(lead)` | `Lead` (prioridad, estado, idCRM) | `July` → `CRMCooperativa` | 3.1.2.1 | CRM de la cooperativa |
| 10 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. | `CRMCooperativa` | devuelve → *retorno* | — | `CRMCooperativa` → `July` | 3.1.2.1 | CRM de la cooperativa |
| 11 | **July** vincula el identificador del CRM en el **Lead**. | `July` | vincula → `Lead.vincularCRM(idCRM)` | `Lead` (idCRM) | `July` → `Lead` | 3.1.2.1 | CRM de la cooperativa |
| 12 | **Lead** devuelve el lead vinculado a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.1.2.1 | CRM de la cooperativa |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A1 · La ficha tiene datos incompletos (reemplaza el paso 6)* | | | | | | |
| 6a | **Lead** devuelve la ficha con los datos faltantes marcados a **July**. Continúa en el paso 7. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.1.1.1 | Ninguno, lo resuelve July |
| | *A2 · El lead ya existe en el CRM (reemplaza el paso 8)* | | | | | | |
| 8b | **CRM de la cooperativa** devuelve el identificador del registro existente a **July**. Continúa en el paso 9, que actualiza ese registro. | `CRMCooperativa` | devuelve → *retorno* | — | `CRMCooperativa` → `July` | 3.1.2.2 | CRM de la cooperativa |
| | *A3 · El CRM falla y se agotan los reintentos (reemplaza el paso 10)* | | | | | | |
| 10c | **CRM de la cooperativa** devuelve el error de integración tras los reintentos a **July**. | `CRMCooperativa` | devuelve → *retorno* | — | `CRMCooperativa` → `July` | 3.1.2.3 | CRM de la cooperativa, Jefe comercial |
| 11c | **July** avisa el registro pendiente del lead al **Jefe comercial**. | `July` | avisa → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = lead pendiente en el CRM) | `July` → `Colaborador` | 3.1.2.3 | CRM de la cooperativa, Jefe comercial |
| 12c | **Jefe comercial** devuelve el acuse del aviso a **July**. Continúa en el paso 13. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 3.1.2.3 | CRM de la cooperativa, Jefe comercial |

### CU 3.2 · Dar seguimiento al lead hasta su cierre (nivel 1 · etapa Asignación y seguimiento)

Incluye CU 3.2.1 Recibir el lead asignado y CU 3.2.2 Hacer seguimiento y cerrar el lead.

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| 13 | **July** consulta las reglas de enrutamiento por agencia, producto y carga al **Jefe comercial**. | `July` | consulta → `Colaborador.consultarPublicacion(tipo)` | `ReglaNegocio` (tipo = ENRUTAMIENTO, parametros) | `July` → `Colaborador` | 3.2.1.1 | Jefe comercial |
| 14 | **Jefe comercial** devuelve la regla de enrutamiento aplicable a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 3.2.1.1 | Jefe comercial |
| 15 | **July** asigna el lead a un asesor disponible en el **Lead**. | `July` | asigna → `Lead.asignar(enrutamiento, asesores)` | `Lead` (asesor, estado = ASIGNADO, fechaAsignacion) | `July` → `Lead` | 3.2.1.1 | Jefe comercial |
| 16 | **Lead** devuelve el asesor asignado a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.1.1 | Jefe comercial |
| 17 | **July** notifica el lead asignado con su plazo de atención al **Asesor comercial**. | `July` | notifica → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido = ficha y plazo de atención) | `July` → `AsesorComercial` | 3.2.1.2 | Ninguno, lo resuelve July |
| 18 | **Asesor comercial** acepta la asignación del lead a **July**. | `AsesorComercial` | acepta → `July.atender(mensaje)` | `Mensaje` (contenido = acepto) | `AsesorComercial` → `July` | 3.2.1.2 | Ninguno, lo resuelve July |
| 19 | **July** registra la aceptación en el **Lead**. | `July` | registra → `Lead.aceptarAsignacion()` | `Lead` (estado = EN_GESTION) | `July` → `Lead` | 3.2.1.3 | Prospecto |
| 20 | **Lead** devuelve el lead en gestión a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.1.3 | Prospecto |
| 21 | **July** traspasa la conversación con su historial y la ficha en la **Conversación**. | `July` | traspasa → `Conversacion.traspasar(asesor)` | `Conversacion` (asesorAsignado, estado = DERIVADA) | `July` → `Conversacion` | 3.2.1.3 | Prospecto |
| 22 | **Conversación** devuelve la conversación derivada a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 3.2.1.3 | Prospecto |
| 23 | **July** avisa el cambio de asesor al **Prospecto**. | `July` | avisa → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 3.2.1.3 | Prospecto |
| 24 | **Prospecto** continúa la conversación con el **Asesor comercial**. | `Prospecto` | continúa → `AsesorComercial.recibir(mensaje)` | `Mensaje` (emisor = PROSPECTO, contenido) | `Prospecto` → `AsesorComercial` | 3.2.1.3 | Prospecto |
| 25 | **Asesor comercial** programa el recordatorio de documentos y cita a **July**. | `AsesorComercial` | programa → `July.atender(mensaje)` | `Mensaje` (contenido = fecha del recordatorio) | `AsesorComercial` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 26 | **July** programa el recordatorio en la **Cita**. | `July` | programa → `Cita.programarRecordatorio(fecha)` | `Cita` (fechaRecordatorio) | `July` → `Cita` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 27 | **Cita** devuelve el recordatorio programado a **July**. | `Cita` | devuelve → *retorno* | — | `Cita` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 28 | **July** compone el recordatorio de documentos y cita en la **Plantilla de mensaje**. | `July` | compone → `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` (tipo = RECORDATORIO, plantillaProveedor) | `July` → `PlantillaMensaje` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 29 | **Plantilla de mensaje** devuelve el recordatorio a **July**. | `PlantillaMensaje` | devuelve → *retorno* | — | `PlantillaMensaje` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 30 | **July** envía la plantilla de recordatorio a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (tipo = PLANTILLA, contenido) | `July` → `Canal` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 31 | **WhatsApp Business API** entrega el recordatorio de documentos y cita al **Prospecto**. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 32 | **Prospecto** confirma su asistencia a la cita a **July**. | `Prospecto` | confirma → `July.atender(mensaje)` | `Mensaje` (contenido = confirmo) | `Prospecto` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 33 | **July** registra la asistencia confirmada en la **Cita**. | `July` | registra → `Cita.actualizarEstado(estado)` | `Cita` (estado = CONFIRMADA) | `July` → `Cita` | 3.2.2.2 | Prospecto, Personal de agencia |
| 34 | **Cita** devuelve la cita confirmada a **July**. | `Cita` | devuelve → *retorno* | — | `Cita` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 35 | **July** avisa la asistencia confirmada al **Personal de agencia**. | `July` | avisa → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Colaborador` | 3.2.2.2 | Prospecto, Personal de agencia |
| 36 | **Personal de agencia** registra la atención de la cita a **July**. | `Colaborador` | registra → `July.atender(mensaje)` | `Mensaje` (contenido = cita atendida) | `Colaborador` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 37 | **July** registra la cita atendida en la **Cita**. | `July` | registra → `Cita.actualizarEstado(estado)` | `Cita` (estado = ATENDIDA) | `July` → `Cita` | 3.2.2.2 | Prospecto, Personal de agencia |
| 38 | **Cita** devuelve la cita atendida a **July**. | `Cita` | devuelve → *retorno* | — | `Cita` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 39 | **July** avisa la cita atendida al **Asesor comercial**. | `July` | avisa → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `AsesorComercial` | 3.2.2.2 | Prospecto, Personal de agencia |
| 40 | **Asesor comercial** registra los documentos recibidos en la agencia a **July**. | `AsesorComercial` | registra → `July.atender(mensaje)` | `Mensaje` (contenido = documentos) | `AsesorComercial` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 41 | **July** registra los documentos recibidos en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.registrarDocumento(documento)` | `SolicitudCredito` (documentosRecibidos) | `July` → `SolicitudCredito` | 3.2.2.2 | Prospecto, Personal de agencia |
| 42 | **Solicitud de crédito** devuelve los documentos registrados a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 43 | **July** pasa la solicitud a resolución en la **Solicitud de crédito**. | `July` | pasa → `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` (estado = EN_RESOLUCION) | `July` → `SolicitudCredito` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 44 | **Solicitud de crédito** devuelve la solicitud en resolución a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 45 | **July** envía la solicitud de crédito completa al **Comité de crédito**. | `July` | envía → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = solicitud y documentos) | `July` → `Colaborador` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 46 | **Comité de crédito** comunica la resolución del crédito a **July**. | `Colaborador` | comunica → `July.atender(mensaje)` | `Mensaje` (contenido = APROBADA o NEGADA) | `Colaborador` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 47 | **July** registra la resolución en la **Solicitud de crédito**. | `July` | registra → `SolicitudCredito.actualizarEstado(estado)` | `SolicitudCredito` (estado = APROBADA o NEGADA) | `July` → `SolicitudCredito` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 48 | **Solicitud de crédito** devuelve la resolución registrada a **July**. | `SolicitudCredito` | devuelve → *retorno* | — | `SolicitudCredito` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 49 | **July** notifica la resolución del crédito al **Asesor comercial**. | `July` | notifica → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `AsesorComercial` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 50 | **Asesor comercial** registra el estado final del lead a **July**. | `AsesorComercial` | registra → `July.atender(mensaje)` | `Mensaje` (contenido = DESEMBOLSADO o PERDIDO y motivo) | `AsesorComercial` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 51 | **July** cierra el lead con su estado final en el **Lead**. | `July` | cierra → `Lead.actualizarEstado(estado, motivo)` | `Lead` (estado = DESEMBOLSADO o PERDIDO, motivoCierre) | `July` → `Lead` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 52 | **Lead** devuelve el lead cerrado a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 53 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. | `July` | sincroniza → `CRMCooperativa.sincronizarLead(lead)` | `Lead` (estado, motivoCierre, idCRM) | `July` → `CRMCooperativa` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 54 | **CRM de la cooperativa** devuelve el identificador del lead actualizado a **July**. | `CRMCooperativa` | devuelve → *retorno* | — | `CRMCooperativa` → `July` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| 55 | **July** confirma el cierre del lead al **Asesor comercial**. Fin. | `July` | confirma → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `AsesorComercial` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 | Actor externo (CU-06) |
|---|---|---|---|---|---|---|---|
| | *A4 · El asesor no acepta el lead a tiempo (reemplaza los pasos 18 a 24)* | | | | | | |
| 18d | **Asesor comercial** deja vencer el plazo de atención a **July**. | `AsesorComercial` | deja vencer → `July.vencerPlazo(plazo)` | `Lead` (fechaAsignacion) | `AsesorComercial` → `July` | 3.2.1.2 | Ninguno, lo resuelve July |
| 19d | **July** reasigna el lead sin el asesor anterior en el **Lead**. | `July` | reasigna → `Lead.asignar(enrutamiento, asesores)` | `Lead` (asesor, fechaAsignacion) | `July` → `Lead` | 3.2.1.1 | Jefe comercial |
| 20d | **Lead** devuelve el nuevo asesor asignado a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.1.1 | Jefe comercial |
| 21d | **July** informa la reasignación del lead al **Jefe comercial**. | `July` | informa → `Colaborador.recibir(mensaje)` | `Mensaje` (contenido = reasignación) | `July` → `Colaborador` | 3.2.1.1 | Jefe comercial |
| 22d | **Jefe comercial** devuelve el acuse del aviso a **July**. Vuelve al paso 17. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 3.2.1.1 | Jefe comercial |
| | *A5 · El prospecto no responde al recordatorio (reemplaza el paso 32)* | | | | | | |
| 32e | **Prospecto** deja vencer el plazo de respuesta del recordatorio a **July**. | `Prospecto` | deja vencer → `July.vencerPlazo(plazo)` | `Cita` (fechaRecordatorio) | `Prospecto` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 33e | **July** suma el intento de reactivación en el **Lead**. | `July` | suma → `Lead.reactivar()` | `Lead` (intentosReactivacion) | `July` → `Lead` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 34e | **Lead** devuelve los intentos de reactivación que quedan a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 35e | **July** compone la plantilla de reactivación en la **Plantilla de mensaje**. | `July` | compone → `PlantillaMensaje.componer(datos)` | `PlantillaMensaje` (tipo = REACTIVACION, plantillaProveedor) | `July` → `PlantillaMensaje` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 36e | **Plantilla de mensaje** devuelve la plantilla de reactivación a **July**. | `PlantillaMensaje` | devuelve → *retorno* | — | `PlantillaMensaje` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 37e | **July** envía la plantilla de reactivación a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (tipo = PLANTILLA, contenido) | `July` → `Canal` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 38e | **WhatsApp Business API** entrega la reactivación al **Prospecto**. Continúa en el paso 32. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| | *A6 · Se agotan los intentos de reactivación (reemplaza los pasos 35e a 38e)* | | | | | | |
| 35f | **July** prioriza el lead como frío en el **Lead**. | `July` | prioriza → `Lead.priorizar(criterios)` | `Lead` (prioridad = FRIO) | `July` → `Lead` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 36f | **Lead** devuelve la prioridad fría a **July**. | `Lead` | devuelve → *retorno* | — | `Lead` → `July` | 3.2.2.1 | Prospecto, WhatsApp Business API |
| 37f | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 50. | `July` | informa → `AsesorComercial.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `AsesorComercial` | 3.2.2.3 | CRM de la cooperativa, Comité de crédito |
| | *A7 · El prospecto pide cambiar la cita (reemplaza el paso 32)* | | | | | | |
| 32g | **Prospecto** solicita el cambio de fecha de la cita a **July**. | `Prospecto` | solicita → `July.atender(mensaje)` | `Mensaje` (contenido) | `Prospecto` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 33g | **July** consulta los horarios para la fecha nueva al **Personal de agencia**. | `July` | consulta → `Colaborador.consultarAgenda(agencia, desde, hasta)` | `Cita` (agencia, fechaHora) | `July` → `Colaborador` | 3.2.2.2 | Prospecto, Personal de agencia |
| 34g | **Personal de agencia** devuelve el horario disponible a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 35g | **July** reprograma la cita en la **Cita**. | `July` | reprograma → `Cita.reprogramar(fechaHora)` | `Cita` (fechaHora, estado = REPROGRAMADA) | `July` → `Cita` | 3.2.2.2 | Prospecto, Personal de agencia |
| 36g | **Cita** devuelve la cita reprogramada a **July**. | `Cita` | devuelve → *retorno* | — | `Cita` → `July` | 3.2.2.2 | Prospecto, Personal de agencia |
| 37g | **July** envía la cita reprogramada al **Prospecto**. Vuelve al paso 32. | `July` | envía → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `July` → `Prospecto` | 3.2.2.2 | Prospecto, Personal de agencia |
