# Especificaciones de casos de uso · July

**ID:** CU-08 · **Versión:** 1.1 · **Fecha:** 2026-10-24 · **Estado:** Borrador  
**Deriva de:** CU-07 ([`presentacion-casos-de-uso.md`](presentacion-casos-de-uso.md)) y CU-06 ([`casos-de-uso-por-flujo.md`](casos-de-uso-por-flujo.md))  
**Uso:** fuente del diccionario de datos y del diagrama de clases  

Especificaciones de los casos de uso de July en sus tres niveles: 7 de nivel 1, 14 de nivel 2 y 42 de nivel 3. Cada paso es una oración con un solo verbo que se descompone en sujeto, método, entidad y relación.

---

## Cómo leer las especificaciones

### La oración de cada paso

Cada paso es una oración con la forma **Sujeto** + verbo + sustantivo + **Receptor**. El receptor con el que termina una oración es el sujeto con el que empieza la siguiente:

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) |
|---|---|---|---|---|---|
| 1 | **Cliente** hace el pedido de pasaje a la **Aerolínea**. | `Cliente` | hace → `Pedido.hacer()` | `Pedido` (origen, destino, fecha) | `Cliente` → `Aerolinea` |
| 2 | **Aerolínea** confirma los espacios disponibles en los vuelos al **Cliente**. | `Aerolinea` | confirma → `EspacioVuelo.confirmar()` | `EspacioVuelo` (vuelo, asientosLibres) | `Aerolinea` → `Cliente` |
| 3 | **Cliente** selecciona el vuelo a la **Aerolínea**. | `Cliente` | selecciona → `Vuelo.seleccionar()` | `Vuelo` (numero, fechaHora) | `Cliente` → `Aerolinea` |
| 4 | **Aerolínea** pasa el vuelo reservado al **Cliente**. | `Aerolinea` | pasa → `Vuelo.pasar()` | `Vuelo` (numero, asiento) | `Aerolinea` → `Cliente` |

Cada parte de la oración alimenta el diccionario de datos:

| Parte de la oración | Qué es en el modelo | Ejemplo (paso 1) |
|---|---|---|
| **Sujeto** | Entidad que inicia la interacción. | `Cliente` |
| Verbo | **Método de la entidad** del sustantivo, escrito `Entidad.verbo()`. | `Pedido.hacer()` |
| Sustantivo | **Entidad** que se intercambia. Entre paréntesis van sus **atributos**. | `Pedido` (origen, destino, fecha) |
| **Receptor** | Entidad con la que interactúa el sujeto. La pareja sujeto → receptor es una **relación** entre entidades. | `Cliente` → `Aerolinea` |

### Reglas para evitar la ambigüedad

1. **Una oración, un verbo.** Si una acción tiene dos verbos, se separa en dos pasos.
2. **Sujeto y receptor con su nombre completo y en negrita.** No se usan pronombres (*le*, *lo*, *se la*) para referirse a ellos.
3. **El sustantivo es un dato concreto**, nombrado igual en todos los casos (por ejemplo, siempre «la solicitud de crédito», nunca «los datos» a secas).
4. **La preposición indica la relación:** *a* cuando el sujeto entrega o pide algo al receptor; *con* cuando lo verifica, sincroniza o conversa con él; *en* cuando crea, busca o actualiza un registro dentro de un sistema externo.
5. **Acción interna.** Cuando el sujeto trabaja sobre su propia entidad, sin otro participante, la oración no lleva receptor: el sujeto es su propio receptor, la relación se marca *(interno)* y la oración siguiente vuelve a empezar con él.
6. **Flujos alternativos.** Se nombran con una letra por flujo (a, b, c, d) y el número del paso del que salen. Empiezan con el mismo sujeto del paso que reemplazan y terminan en *Fin* o en *Continúa / Vuelve al paso N*, cuyo sujeto es el receptor del último paso del alternativo.
7. **Actores de configuración.** El Equipo de marketing, el Administrador del asistente, el Área de productos y crédito, el Comité de crédito y el Jefe comercial no conversan en tiempo real. Cuando July les consulta algo, responden con la configuración que publicaron (guion, catálogo, reglas, criterios). Cuando July les informa algo (origen de campaña, caso de revisión, reasignación), lo reciben como un aviso. El Comité de crédito, además, resuelve las solicitudes fuera de July (CU 3.2.2, pasos 8 y 9).

### Niveles

| Nivel | Qué representa | Qué contiene su especificación |
|---|---|---|
| 1 | Etapa del flujo de valor. La inicia el actor principal. | Ficha del caso y flujo resumido; cada paso indica el caso de nivel 2 que lo resuelve. |
| 2 | Caso que incluye («include») tres casos de nivel 3. | Ficha completa, flujo principal y flujos alternativos, paso a paso. |
| 3 | Capacidad de nivel 3 del mapa, vista como caso de uso. | Ficha del caso y los pasos del nivel 2 que lo realizan. |

### Participantes

| Participante | Entidad | Tipo |
|---|---|---|
| Prospecto | `Prospecto` | Persona · actor principal de los flujos 1 y 2 |
| Asesor comercial | `AsesorComercial` | Persona · actor principal del flujo 3 |
| July | `July` | Sistema en diseño |
| WhatsApp Business API | `WhatsAppBusinessAPI` | Sistema externo |
| Widget web | `WidgetWeb` | Sistema externo |
| Sistema core | `SistemaCore` | Sistema externo |
| CRM de la cooperativa | `CRMCooperativa` | Sistema externo |
| Equipo de marketing | `EquipoMarketing` | Persona · configuración (campañas) y avisos |
| Administrador del asistente | `AdministradorAsistente` | Persona · configuración |
| Área de productos y crédito | `AreaProductosCredito` | Persona · configuración |
| Comité de crédito | `ComiteCredito` | Persona · configuración (reglas), avisos y resolución del crédito |
| Jefe comercial | `JefeComercial` | Persona · configuración (prioridad y enrutamiento) y avisos |
| Personal de agencia | `PersonalAgencia` | Persona |

En el diccionario de datos ([CLS-01](../04-diagrama-de-clase/diccionario-de-datos-etapa3.md)) estos participantes se consolidan: WhatsApp Business API y Widget web son la clase `Canal`; los actores de configuración aparecen como `publicadoPor` de la configuración o como destinatarios de `July.notificar()`.

### Correspondencia con el modelo ArchiMate

El modelo ArchiMate (CAP-02/CAP-03) representa los casos de uso como 25 servicios de aplicación numerados «CU-01» a «CU-25». Esos números no son los de esta especificación: cada servicio realiza capacidades de nivel 3, y por esas capacidades se enlaza con los casos de aquí.

| Servicio ArchiMate | Casos de esta especificación |
|---|---|
| «CU-01 Iniciar conversación» | CU 1.1 (1.1.1.1 a 1.1.2.3) y CU 1.2.1.1 |
| «CU-02 Aceptar aviso de privacidad» | CU 1.2.1.2 |
| «CU-03 Registrar lead» | CU 1.2.2.3 |
| «CU-04 Identificar intención y responder preguntas frecuentes» | CU 1.2.2.1 |
| «CU-05 Reconocer socio existente» | CU 1.2.2.2 |
| «CU-06 Derivar a asesor humano» | CU 1.2.1.3 |
| «CU-07 Capturar datos del prospecto» | CU 2.1.1 (2.1.1.1 a 2.1.1.3), CU 2.1.2.1 y CU 2.1.2.2 |
| «CU-08 Retomar conversación abandonada» | CU 2.1.2.3 |
| «CU-09 Simular crédito» | CU 2.2.1.1 y CU 2.2.1.2 |
| «CU-10 Comparar escenarios» | CU 2.2.1.3 |
| «CU-11 Precalificar prospecto» | CU 2.3.1 (2.3.1.1 a 2.3.1.3) y CU 2.3.2.1 |
| «CU-12 Consultar requisitos y agendar cita» | CU 2.3.2.2 y CU 2.3.2.3 |
| «CU-13 Generar ficha del prospecto» | CU 3.1.1 (3.1.1.1 a 3.1.1.3) |
| «CU-14 Sincronizar lead con el CRM» | CU 3.1.2 (3.1.2.1 a 3.1.2.3) |
| «CU-15 Asignar lead a asesor» | CU 3.2.1.1 y CU 3.2.1.2 |
| «CU-16 Atender lead asignado» | CU 3.2.1.3 |
| «CU-17 Enviar recordatorios y reactivar leads» | CU 3.2.2.1 |
| «CU-18 Confirmar cita en agencia» | CU 3.2.2.2 |
| «CU-19 Actualizar estado y cerrar lead» | CU 3.2.2.3 |
| «CU-21 Gestionar líneas, tasas y requisitos» | Publica lo que consulta CU 2.2.2 (2.2.2.1 a 2.2.2.3); no tiene especificación propia |
| «CU-20», «CU-22», «CU-23», «CU-24», «CU-25» | Sin caso en esta especificación (configuración, trazabilidad y derechos de datos); ver [REV-01](../05-revisiones/revision-consistencia-etapa3.md) |

---

## Índice

| Flujo de valor | Nivel 1 | Nivel 2 | Nivel 3 |
|---|---|---|---|
| 1 · Atracción y primer contacto | [CU 1.1 Contactar a July por un canal digital](#cu-1-1) | [CU 1.1.1 Recibir la consulta por WhatsApp o web](#cu-1-1-1) | [1.1.1.1](#cu-1-1-1-1) · [1.1.1.2](#cu-1-1-1-2) · [1.1.1.3](#cu-1-1-1-3) |
|  | [CU 1.1 Contactar a July por un canal digital](#cu-1-1) | [CU 1.1.2 Unificar los mensajes entrantes](#cu-1-1-2) | [1.1.2.1](#cu-1-1-2-1) · [1.1.2.2](#cu-1-1-2-2) · [1.1.2.3](#cu-1-1-2-3) |
|  | [CU 1.2 Recibir el primer contacto](#cu-1-2) | [CU 1.2.1 Recibir atención inmediata](#cu-1-2-1) | [1.2.1.1](#cu-1-2-1-1) · [1.2.1.2](#cu-1-2-1-2) · [1.2.1.3](#cu-1-2-1-3) |
|  | [CU 1.2 Recibir el primer contacto](#cu-1-2) | [CU 1.2.2 Identificar al prospecto y su necesidad](#cu-1-2-2) | [1.2.2.1](#cu-1-2-2-1) · [1.2.2.2](#cu-1-2-2-2) · [1.2.2.3](#cu-1-2-2-3) |
| 2 · Captura, simulación y precalificación | [CU 2.1 Completar el perfil del crédito](#cu-2-1) | [CU 2.1.1 Entregar los datos conversando](#cu-2-1-1) | [2.1.1.1](#cu-2-1-1-1) · [2.1.1.2](#cu-2-1-1-2) · [2.1.1.3](#cu-2-1-1-3) |
|  | [CU 2.1 Completar el perfil del crédito](#cu-2-1) | [CU 2.1.2 Validar los datos y mantener la continuidad](#cu-2-1-2) | [2.1.2.1](#cu-2-1-2-1) · [2.1.2.2](#cu-2-1-2-2) · [2.1.2.3](#cu-2-1-2-3) |
|  | [CU 2.2 Simular el crédito](#cu-2-2) | [CU 2.2.1 Calcular las condiciones del crédito](#cu-2-2-1) | [2.2.1.1](#cu-2-2-1-1) · [2.2.1.2](#cu-2-2-1-2) · [2.2.1.3](#cu-2-2-1-3) |
|  | [CU 2.2 Simular el crédito](#cu-2-2) | [CU 2.2.2 Consultar productos y condiciones](#cu-2-2-2) | [2.2.2.1](#cu-2-2-2-1) · [2.2.2.2](#cu-2-2-2-2) · [2.2.2.3](#cu-2-2-2-3) |
|  | [CU 2.3 Obtener la precalificación](#cu-2-3) | [CU 2.3.1 Evaluar al prospecto con reglas](#cu-2-3-1) | [2.3.1.1](#cu-2-3-1-1) · [2.3.1.2](#cu-2-3-1-2) · [2.3.1.3](#cu-2-3-1-3) |
|  | [CU 2.3 Obtener la precalificación](#cu-2-3) | [CU 2.3.2 Recibir orientación sobre el resultado](#cu-2-3-2) | [2.3.2.1](#cu-2-3-2-1) · [2.3.2.2](#cu-2-3-2-2) · [2.3.2.3](#cu-2-3-2-3) |
| 3 · Entrega, seguimiento y conversión | [CU 3.1 Recibir la oportunidad precalificada](#cu-3-1) | [CU 3.1.1 Revisar la ficha del prospecto](#cu-3-1-1) | [3.1.1.1](#cu-3-1-1-1) · [3.1.1.2](#cu-3-1-1-2) · [3.1.1.3](#cu-3-1-1-3) |
|  | [CU 3.1 Recibir la oportunidad precalificada](#cu-3-1) | [CU 3.1.2 Registrar el lead en el CRM](#cu-3-1-2) | [3.1.2.1](#cu-3-1-2-1) · [3.1.2.2](#cu-3-1-2-2) · [3.1.2.3](#cu-3-1-2-3) |
|  | [CU 3.2 Dar seguimiento al lead hasta su cierre](#cu-3-2) | [CU 3.2.1 Recibir el lead asignado](#cu-3-2-1) | [3.2.1.1](#cu-3-2-1-1) · [3.2.1.2](#cu-3-2-1-2) · [3.2.1.3](#cu-3-2-1-3) |
|  | [CU 3.2 Dar seguimiento al lead hasta su cierre](#cu-3-2) | [CU 3.2.2 Hacer seguimiento y cerrar el lead](#cu-3-2-2) | [3.2.2.1](#cu-3-2-2-1) · [3.2.2.2](#cu-3-2-2-2) · [3.2.2.3](#cu-3-2-2-3) |

---

## Flujo de valor 1 · Atracción y primer contacto

**Actor principal:** Prospecto · **Objetivo del flujo:** Recibir la demanda digital y responder al prospecto en menos de 2 minutos.

<a id="cu-1-1"></a>
### CU 1.1 · Contactar a July por un canal digital (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Canales de contacto |
| Capacidad | 1.1 Canales de contacto |
| Actor principal | Prospecto |
| Incluye | [CU 1.1.1](#cu-1-1-1), [CU 1.1.2](#cu-1-1-2) |
| Objetivo | Que la consulta del prospecto llegue a July por WhatsApp o por la web y reciba una respuesta inmediata. |
| Disparador | El prospecto escribe al número de WhatsApp de la cooperativa o abre el chat del sitio web. |
| Precondiciones | El número de WhatsApp y el widget web están conectados a July. |
| Postcondiciones | La consulta está en July, en formato común y con su origen etiquetado, y el prospecto recibió una respuesta. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** envía la consulta por WhatsApp o por el sitio web a **July**. | `Prospecto` | envía → `Consulta.enviar()` | `Consulta` (texto, canal) | `Prospecto` → `July` | CU 1.1.1 |
| 2 | **July** etiqueta el origen de la conversación con su canal y su campaña. | `July` | etiqueta → `OrigenConversacion.etiquetar()` | `OrigenConversacion` (canal, campana) | `July` (interno) | CU 1.1.1 |
| 3 | **July** convierte el mensaje de la consulta al formato común. | `July` | convierte → `Mensaje.convertirFormatoComun()` | `Mensaje` (formatoComun) | `July` (interno) | CU 1.1.2 |
| 4 | **July** envía la respuesta inmediata al **Prospecto**. Fin. | `July` | envía → `Mensaje.responder()` | `Mensaje` (contenido) | `July` → `Prospecto` | CU 1.1.2 |

<a id="cu-1-1-1"></a>
#### CU 1.1.1 · Recibir la consulta por WhatsApp o web (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.1 Recepción multicanal |
| Actor principal | Prospecto |
| Actores secundarios | WhatsApp Business API, Widget web, Equipo de marketing |
| Incluye | [CU 1.1.1.1](#cu-1-1-1-1), [CU 1.1.1.2](#cu-1-1-1-2), [CU 1.1.1.3](#cu-1-1-1-3) |
| Objetivo | Que la consulta llegue a July desde cualquier canal y quede registrado de dónde vino. |
| Disparador | El prospecto escribe al número de WhatsApp de la cooperativa o abre el chat del sitio web. |
| Precondiciones | El número de WhatsApp y el widget están conectados a July. El Equipo de marketing tiene definidas las campañas activas. |
| Postcondiciones | La consulta está en July con su canal y su campaña de origen etiquetados, y el Equipo de marketing recibió ese origen. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** escribe la consulta a **WhatsApp Business API**. | `Prospecto` | escribe → `Consulta.escribir()` | `Consulta` (texto, numeroDestino) | `Prospecto` → `WhatsAppBusinessAPI` | 1.1.1.1 |
| 2 | **WhatsApp Business API** entrega el mensaje de la consulta con el teléfono del remitente a **July**. | `WhatsAppBusinessAPI` | entrega → `Mensaje.entregar()` | `Mensaje` (contenido, telefonoRemitente) | `WhatsAppBusinessAPI` → `July` | 1.1.1.1 |
| 3 | **July** etiqueta el origen de la conversación con el canal WhatsApp y la campaña del mensaje. | `July` | etiqueta → `OrigenConversacion.etiquetar()` | `OrigenConversacion` (canal = whatsapp, campana) | `July` (interno) | 1.1.1.3 |
| 4 | **July** reporta el origen de la conversación al **Equipo de marketing**. Fin. | `July` | reporta → `OrigenConversacion.reportar()` | `OrigenConversacion` (canal, campana) | `July` → `EquipoMarketing` | 1.1.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El prospecto llega por el sitio web (reemplaza los pasos 1 y 2)* | | | | | |
| 1a | **Prospecto** abre la sesión de chat desde una página del sitio con el **Widget web**. | `Prospecto` | abre → `SesionChat.abrir()` | `SesionChat` (paginaOrigen) | `Prospecto` → `WidgetWeb` | 1.1.1.2 |
| 2a | **Widget web** confirma la sesión de chat abierta al **Prospecto**. | `WidgetWeb` | confirma → `SesionChat.confirmar()` | `SesionChat` (token) | `WidgetWeb` → `Prospecto` | 1.1.1.2 |
| 3a | **Prospecto** escribe la consulta al **Widget web**. | `Prospecto` | escribe → `Consulta.escribir()` | `Consulta` (texto) | `Prospecto` → `WidgetWeb` | 1.1.1.2 |
| 4a | **Widget web** entrega el mensaje de la consulta con la página de origen a **July**. Continúa en el paso 3. | `WidgetWeb` | entrega → `Mensaje.entregar()` | `Mensaje` (contenido, paginaOrigen) | `WidgetWeb` → `July` | 1.1.1.2 |
| | *A2 · El mensaje no trae campaña (reemplaza el paso 3)* | | | | | |
| 3b | **July** etiqueta el origen de la conversación como «origen directo». | `July` | etiqueta → `OrigenConversacion.etiquetar()` | `OrigenConversacion` (canal, origenDirecto = sí) | `July` (interno) | 1.1.1.3 |
| 4b | **July** reporta el origen directo de la conversación al **Equipo de marketing**. Fin. | `July` | reporta → `OrigenConversacion.reportar()` | `OrigenConversacion` (canal, origenDirecto) | `July` → `EquipoMarketing` | 1.1.1.3 |

<a id="cu-1-1-1-1"></a>
##### CU 1.1.1.1 · Recibir el mensaje por WhatsApp (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.1](#cu-1-1-1), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.1.1 WhatsApp Business API |
| Actor externo | WhatsApp Business API |
| Objetivo | Que la consulta escrita en WhatsApp llegue a July como mensaje, con el teléfono del remitente. |
| Pasos de CU 1.1.1 | 1, 2 |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** escribe la consulta a **WhatsApp Business API**. |
| 2 | **WhatsApp Business API** entrega el mensaje de la consulta con el teléfono del remitente a **July**. |

<a id="cu-1-1-1-2"></a>
##### CU 1.1.1.2 · Abrir el chat desde el sitio web (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.1](#cu-1-1-1), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.1.2 Widget web |
| Actor externo | Widget web |
| Objetivo | Que el prospecto abra una sesión de chat en el sitio y su consulta llegue a July con la página de origen. |
| Pasos de CU 1.1.1 | 1a, 2a, 3a, 4a |

| Paso | Especificación |
|---|---|
| 1a | **Prospecto** abre la sesión de chat desde una página del sitio con el **Widget web**. |
| 2a | **Widget web** confirma la sesión de chat abierta al **Prospecto**. |
| 3a | **Prospecto** escribe la consulta al **Widget web**. |
| 4a | **Widget web** entrega el mensaje de la consulta con la página de origen a **July**. Continúa en el paso 3. |

<a id="cu-1-1-1-3"></a>
##### CU 1.1.1.3 · Etiquetar el origen de la conversación (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.1](#cu-1-1-1), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.1.3 Registro de origen |
| Actor externo | Equipo de marketing |
| Objetivo | Que cada conversación quede etiquetada con su canal y su campaña, u «origen directo», y el Equipo de marketing reciba ese origen. |
| Pasos de CU 1.1.1 | 3, 4, 3b, 4b |

| Paso | Especificación |
|---|---|
| 3 | **July** etiqueta el origen de la conversación con el canal WhatsApp y la campaña del mensaje. |
| 4 | **July** reporta el origen de la conversación al **Equipo de marketing**. Fin. |
| 3b | **July** etiqueta el origen de la conversación como «origen directo». |
| 4b | **July** reporta el origen directo de la conversación al **Equipo de marketing**. Fin. |

<a id="cu-1-1-2"></a>
#### CU 1.1.2 · Unificar los mensajes entrantes (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.2 Unificación de mensajes |
| Actor principal | Prospecto |
| Actores secundarios | WhatsApp Business API, Widget web |
| Incluye | [CU 1.1.2.1](#cu-1-1-2-1), [CU 1.1.2.2](#cu-1-1-2-2), [CU 1.1.2.3](#cu-1-1-2-3) |
| Objetivo | Que todo mensaje, venga del canal que venga, llegue a July verificado y en un mismo formato, aun en picos de demanda. |
| Disparador | Llega un mensaje nuevo desde WhatsApp o desde el widget web. |
| Precondiciones | July tiene la clave para verificar los webhooks de WhatsApp Business API. |
| Postcondiciones | El mensaje está verificado, convertido al formato común y respondido o en cola. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** envía un mensaje de texto, audio o imagen a **WhatsApp Business API**. | `Prospecto` | envía → `Mensaje.enviar()` | `Mensaje` (tipo (texto, audio, imagen)) | `Prospecto` → `WhatsAppBusinessAPI` | 1.1.2.1 |
| 2 | **WhatsApp Business API** notifica el mensaje nuevo con un webhook firmado a **July**. | `WhatsAppBusinessAPI` | notifica → `Webhook.notificar()` | `Webhook` (firma, idMensaje) | `WhatsAppBusinessAPI` → `July` | 1.1.2.3 |
| 3 | **July** verifica la firma del webhook con su clave. | `July` | verifica → `Webhook.verificarFirma()` | `Webhook` (firma) | `July` (interno) | 1.1.2.3 |
| 4 | **July** confirma el acuse de recepción del webhook a **WhatsApp Business API**. | `July` | confirma → `AcuseRecepcion.confirmar()` | `AcuseRecepcion` (idMensaje, fechaHora) | `July` → `WhatsAppBusinessAPI` | 1.1.2.3 |
| 5 | **WhatsApp Business API** entrega el contenido del mensaje con sus adjuntos a **July**. | `WhatsAppBusinessAPI` | entrega → `Mensaje.entregar()` | `Mensaje` (contenido, adjuntos) | `WhatsAppBusinessAPI` → `July` | 1.1.2.1 |
| 6 | **July** convierte el mensaje al formato común. | `July` | convierte → `Mensaje.convertirFormatoComun()` | `Mensaje` (formatoComun) | `July` (interno) | 1.1.2.1 |
| 7 | **July** responde el mensaje de inmediato al **Prospecto**. Fin. | `July` | responde → `Mensaje.responder()` | `Mensaje` (contenido) | `July` → `Prospecto` | 1.1.2.1 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El mensaje llega por el sitio web (reemplaza los pasos 1 a 5)* | | | | | |
| 1a | **Prospecto** envía un mensaje de texto al **Widget web**. | `Prospecto` | envía → `Mensaje.enviar()` | `Mensaje` (tipo) | `Prospecto` → `WidgetWeb` | 1.1.2.1 |
| 2a | **Widget web** entrega el mensaje con el token de la sesión de chat a **July**. | `WidgetWeb` | entrega → `Mensaje.entregar()` | `Mensaje` (contenido, tokenSesion) | `WidgetWeb` → `July` | 1.1.2.1 |
| 3a | **July** valida el token de la sesión de chat. Continúa en el paso 6. | `July` | valida → `SesionChat.validarToken()` | `SesionChat` (token) | `July` (interno) | 1.1.2.1 |
| | *A2 · La firma del webhook no es válida (reemplaza el paso 4)* | | | | | |
| 4b | **July** rechaza el webhook con firma inválida. | `July` | rechaza → `Webhook.rechazar()` | `Webhook` (firma) | `July` (interno) | 1.1.2.3 |
| 5b | **July** devuelve el error de integración de firma inválida a **WhatsApp Business API**. Fin. | `July` | devuelve → `ErrorIntegracion.devolver()` | `ErrorIntegracion` (codigo, descripcion) | `July` → `WhatsAppBusinessAPI` | 1.1.2.3 |
| | *A3 · Hay un pico de demanda (reemplaza el paso 7)* | | | | | |
| 7c | **July** encola el mensaje en la cola de atención. | `July` | encola → `ColaAtencion.encolar()` | `ColaAtencion` (posicion) | `July` (interno) | 1.1.2.2 |
| 8c | **July** avisa el tiempo de espera de la cola de atención al **Prospecto**. Fin. | `July` | avisa → `ColaAtencion.avisarEspera()` | `ColaAtencion` (tiempoEspera) | `July` → `Prospecto` | 1.1.2.2 |

<a id="cu-1-1-2-1"></a>
##### CU 1.1.2.1 · Convertir el mensaje a un formato común (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.2](#cu-1-1-2), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.2.1 Formato común por canal |
| Actor externo | WhatsApp Business API, Widget web |
| Objetivo | Que todo mensaje y sus adjuntos queden en el mismo formato sin importar el canal, y el prospecto reciba respuesta. |
| Pasos de CU 1.1.2 | 1, 5, 6, 7, 1a, 2a, 3a |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía un mensaje de texto, audio o imagen a **WhatsApp Business API**. |
| 5 | **WhatsApp Business API** entrega el contenido del mensaje con sus adjuntos a **July**. |
| 6 | **July** convierte el mensaje al formato común. |
| 7 | **July** responde el mensaje de inmediato al **Prospecto**. Fin. |
| 1a | **Prospecto** envía un mensaje de texto al **Widget web**. |
| 2a | **Widget web** entrega el mensaje con el token de la sesión de chat a **July**. |
| 3a | **July** valida el token de la sesión de chat. Continúa en el paso 6. |

<a id="cu-1-1-2-2"></a>
##### CU 1.1.2.2 · Encolar mensajes en picos de demanda (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.2](#cu-1-1-2), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.2.2 Absorción de picos |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que en un pico de demanda el mensaje espere en la cola y el prospecto sepa cuánto esperará. |
| Pasos de CU 1.1.2 | 7c, 8c |

| Paso | Especificación |
|---|---|
| 7c | **July** encola el mensaje en la cola de atención. |
| 8c | **July** avisa el tiempo de espera de la cola de atención al **Prospecto**. Fin. |

<a id="cu-1-1-2-3"></a>
##### CU 1.1.2.3 · Verificar la firma del webhook (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.1.2](#cu-1-1-2), dentro de [CU 1.1](#cu-1-1) |
| Capacidad | 1.1.2.3 Verificación de webhooks |
| Actor externo | WhatsApp Business API |
| Objetivo | Que July solo acepte las notificaciones de WhatsApp con firma válida y rechace las demás. |
| Pasos de CU 1.1.2 | 2, 3, 4, 4b, 5b |

| Paso | Especificación |
|---|---|
| 2 | **WhatsApp Business API** notifica el mensaje nuevo con un webhook firmado a **July**. |
| 3 | **July** verifica la firma del webhook con su clave. |
| 4 | **July** confirma el acuse de recepción del webhook a **WhatsApp Business API**. |
| 4b | **July** rechaza el webhook con firma inválida. |
| 5b | **July** devuelve el error de integración de firma inválida a **WhatsApp Business API**. Fin. |

<a id="cu-1-2"></a>
### CU 1.2 · Recibir el primer contacto (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Primer contacto |
| Capacidad | 1.2 Primer contacto |
| Actor principal | Prospecto |
| Incluye | [CU 1.2.1](#cu-1-2-1), [CU 1.2.2](#cu-1-2-2) |
| Objetivo | Que el prospecto reciba atención inmediata, dé su consentimiento de datos y quede registrado como lead con su necesidad. |
| Disparador | El prospecto envía su primer mensaje. |
| Precondiciones | El mensaje ya pasó por CU 1.1. |
| Postcondiciones | El consentimiento quedó registrado y el lead tiene número de seguimiento. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** envía el saludo inicial a **July**. | `Prospecto` | envía → `Mensaje.saludar()` | `Mensaje` (contenido) | `Prospecto` → `July` | CU 1.2.1 |
| 2 | **July** presenta el guion de bienvenida con el aviso de privacidad al **Prospecto**. | `July` | presenta → `GuionBienvenida.presentar()` | `GuionBienvenida` (saludo, avisoPrivacidad) | `July` → `Prospecto` | CU 1.2.1 |
| 3 | **Prospecto** acepta el aviso de privacidad a **July**. | `Prospecto` | acepta → `AvisoPrivacidad.aceptar()` | `AvisoPrivacidad` (version) | `Prospecto` → `July` | CU 1.2.1 |
| 4 | **July** muestra el menú de opciones al **Prospecto**. | `July` | muestra → `MenuOpciones.mostrar()` | `MenuOpciones` (opciones) | `July` → `Prospecto` | CU 1.2.1 |
| 5 | **Prospecto** describe la necesidad de crédito a **July**. | `Prospecto` | describe → `IntencionCredito.describir()` | `IntencionCredito` (descripcion) | `Prospecto` → `July` | CU 1.2.2 |
| 6 | **July** registra el lead con su intención y su condición de socio. | `July` | registra → `Lead.registrar()` | `Lead` (intencion, condicionSocio) | `July` (interno) | CU 1.2.2 |
| 7 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. | `July` | entrega → `Lead.entregarNumeroSeguimiento()` | `Lead` (numeroSeguimiento) | `July` → `Prospecto` | CU 1.2.2 |

<a id="cu-1-2-1"></a>
#### CU 1.2.1 · Recibir atención inmediata (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.1 Atención inmediata |
| Actor principal | Prospecto |
| Actores secundarios | Administrador del asistente, Asesor comercial |
| Incluye | [CU 1.2.1.1](#cu-1-2-1-1), [CU 1.2.1.2](#cu-1-2-1-2), [CU 1.2.1.3](#cu-1-2-1-3) |
| Objetivo | Responder al instante, obtener el consentimiento de datos y orientar al prospecto con un menú, o pasarlo a un asesor si lo pide. |
| Disparador | El prospecto envía su primer mensaje. |
| Precondiciones | El mensaje ya pasó por CU 1.1. El Administrador del asistente publicó el guion de bienvenida (saludo, aviso de privacidad y menú). |
| Postcondiciones | El consentimiento quedó registrado (aceptado o rechazado) y el prospecto eligió una opción o fue derivado a un asesor. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** envía el saludo inicial a **July**. | `Prospecto` | envía → `Mensaje.saludar()` | `Mensaje` (contenido) | `Prospecto` → `July` | 1.2.1.1 |
| 2 | **July** consulta el guion de bienvenida vigente al **Administrador del asistente**. | `July` | consulta → `GuionBienvenida.consultar()` | `GuionBienvenida` (version) | `July` → `AdministradorAsistente` | 1.2.1.1 |
| 3 | **Administrador del asistente** entrega el guion de bienvenida publicado a **July**. | `AdministradorAsistente` | entrega → `GuionBienvenida.entregar()` | `GuionBienvenida` (saludo, avisoPrivacidad, menu) | `AdministradorAsistente` → `July` | 1.2.1.1 |
| 4 | **July** presenta el saludo del guion de bienvenida con el aviso de privacidad al **Prospecto**. | `July` | presenta → `GuionBienvenida.presentar()` | `GuionBienvenida` (saludo, avisoPrivacidad) | `July` → `Prospecto` | 1.2.1.1, 1.2.1.2 |
| 5 | **Prospecto** acepta el aviso de privacidad a **July**. | `Prospecto` | acepta → `AvisoPrivacidad.aceptar()` | `AvisoPrivacidad` (version) | `Prospecto` → `July` | 1.2.1.2 |
| 6 | **July** registra el consentimiento aceptado con la versión del aviso. | `July` | registra → `Consentimiento.registrar()` | `Consentimiento` (aceptado = sí, versionAviso, fechaHora) | `July` (interno) | 1.2.1.2 |
| 7 | **July** muestra el menú de opciones completo al **Prospecto**. | `July` | muestra → `MenuOpciones.mostrar()` | `MenuOpciones` (opciones) | `July` → `Prospecto` | 1.2.1.1 |
| 8 | **Prospecto** selecciona una opción del menú a **July**. Fin. | `Prospecto` | selecciona → `OpcionMenu.seleccionar()` | `OpcionMenu` (etiqueta) | `Prospecto` → `July` | 1.2.1.1 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El prospecto no acepta el aviso (reemplaza el paso 5)* | | | | | |
| 5a | **Prospecto** rechaza el aviso de privacidad a **July**. | `Prospecto` | rechaza → `AvisoPrivacidad.rechazar()` | `AvisoPrivacidad` (version) | `Prospecto` → `July` | 1.2.1.2 |
| 6a | **July** registra el consentimiento rechazado con la versión del aviso. | `July` | registra → `Consentimiento.registrar()` | `Consentimiento` (aceptado = no, versionAviso, fechaHora) | `July` (interno) | 1.2.1.2 |
| 7a | **July** muestra el menú básico de información general al **Prospecto**. Fin. | `July` | muestra → `MenuOpciones.mostrarBasico()` | `MenuOpciones` (opciones, tipo = básico, avisoRestriccion) | `July` → `Prospecto` | 1.2.1.2 |
| | *A2 · El prospecto pide hablar con una persona (reemplaza el paso 8)* | | | | | |
| 8b | **Prospecto** solicita la derivación de la conversación a **July**. | `Prospecto` | solicita → `Derivacion.solicitar()` | `Derivacion` (motivo) | `Prospecto` → `July` | 1.2.1.3 |
| 9b | **July** envía la derivación con el historial de la conversación al **Asesor comercial**. | `July` | envía → `Derivacion.enviar()` | `Derivacion` (motivo, historial) | `July` → `AsesorComercial` | 1.2.1.3 |
| 10b | **Asesor comercial** acepta la derivación a **July**. | `AsesorComercial` | acepta → `Derivacion.aceptar()` | `Derivacion` (asesorAsignado, fechaHora) | `AsesorComercial` → `July` | 1.2.1.3 |
| 11b | **July** traspasa la conversación con su historial al **Asesor comercial**. | `July` | traspasa → `Conversacion.traspasar()` | `Conversacion` (historial, asesorAsignado) | `July` → `AsesorComercial` | 1.2.1.3 |
| 12b | **Asesor comercial** envía el saludo del asesor al **Prospecto**. Fin. | `AsesorComercial` | envía → `Mensaje.saludar()` | `Mensaje` (contenido) | `AsesorComercial` → `Prospecto` | 1.2.1.3 |

<a id="cu-1-2-1-1"></a>
##### CU 1.2.1.1 · Recibir saludo y menú de opciones (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.1](#cu-1-2-1), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.1.1 Respuesta automática |
| Actor externo | Administrador del asistente |
| Objetivo | Que el prospecto reciba el saludo vigente y el menú de opciones, y elija una. |
| Pasos de CU 1.2.1 | 1, 2, 3, 4, 7, 8 |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía el saludo inicial a **July**. |
| 2 | **July** consulta el guion de bienvenida vigente al **Administrador del asistente**. |
| 3 | **Administrador del asistente** entrega el guion de bienvenida publicado a **July**. |
| 4 | **July** presenta el saludo del guion de bienvenida con el aviso de privacidad al **Prospecto**. |
| 7 | **July** muestra el menú de opciones completo al **Prospecto**. |
| 8 | **Prospecto** selecciona una opción del menú a **July**. Fin. |

<a id="cu-1-2-1-2"></a>
##### CU 1.2.1.2 · Aceptar el aviso de privacidad (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.1](#cu-1-2-1), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.1.2 Consentimiento de datos |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que la respuesta del prospecto al aviso de privacidad quede registrada como consentimiento, aceptado o rechazado. |
| Pasos de CU 1.2.1 | 4, 5, 6, 5a, 6a, 7a |

| Paso | Especificación |
|---|---|
| 4 | **July** presenta el saludo del guion de bienvenida con el aviso de privacidad al **Prospecto**. |
| 5 | **Prospecto** acepta el aviso de privacidad a **July**. |
| 6 | **July** registra el consentimiento aceptado con la versión del aviso. |
| 5a | **Prospecto** rechaza el aviso de privacidad a **July**. |
| 6a | **July** registra el consentimiento rechazado con la versión del aviso. |
| 7a | **July** muestra el menú básico de información general al **Prospecto**. Fin. |

<a id="cu-1-2-1-3"></a>
##### CU 1.2.1.3 · Derivar a un asesor humano (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.1](#cu-1-2-1), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.1.3 Derivación a asesor |
| Actor externo | Asesor comercial |
| Objetivo | Que el prospecto que lo pida pase a un asesor con el historial de su conversación. |
| Pasos de CU 1.2.1 | 8b, 9b, 10b, 11b, 12b |

| Paso | Especificación |
|---|---|
| 8b | **Prospecto** solicita la derivación de la conversación a **July**. |
| 9b | **July** envía la derivación con el historial de la conversación al **Asesor comercial**. |
| 10b | **Asesor comercial** acepta la derivación a **July**. |
| 11b | **July** traspasa la conversación con su historial al **Asesor comercial**. |
| 12b | **Asesor comercial** envía el saludo del asesor al **Prospecto**. Fin. |

<a id="cu-1-2-2"></a>
#### CU 1.2.2 · Identificar al prospecto y su necesidad (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.2 Identificación del prospecto |
| Actor principal | Prospecto |
| Actores secundarios | Sistema core |
| Incluye | [CU 1.2.2.1](#cu-1-2-2-1), [CU 1.2.2.2](#cu-1-2-2-2), [CU 1.2.2.3](#cu-1-2-2-3) |
| Objetivo | Saber qué línea de crédito busca la persona, si ya es socia, y dejar el lead registrado desde el primer contacto. |
| Disparador | El prospecto elige la opción de crédito del menú o escribe lo que necesita. |
| Precondiciones | El prospecto aceptó el aviso de privacidad (CU 1.2.1). |
| Postcondiciones | El lead está registrado con su intención, su condición de socio y un número de seguimiento. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** describe la necesidad de crédito a **July**. | `Prospecto` | describe → `IntencionCredito.describir()` | `IntencionCredito` (descripcion) | `Prospecto` → `July` | 1.2.2.1 |
| 2 | **July** identifica la intención de crédito. | `July` | identifica → `IntencionCredito.identificar()` | `IntencionCredito` (lineaDetectada) | `July` (interno) | 1.2.2.1 |
| 3 | **July** solicita la confirmación de la línea de crédito detectada al **Prospecto**. | `July` | solicita → `LineaCredito.solicitarConfirmacion()` | `LineaCredito` (nombre) | `July` → `Prospecto` | 1.2.2.1 |
| 4 | **Prospecto** confirma la línea de crédito a **July**. | `Prospecto` | confirma → `LineaCredito.confirmar()` | `LineaCredito` (nombre) | `Prospecto` → `July` | 1.2.2.1 |
| 5 | **July** consulta la condición de socio por el teléfono del prospecto al **Sistema core**. | `July` | consulta → `Socio.consultar()` | `Socio` (telefono) | `July` → `SistemaCore` | 1.2.2.2 |
| 6 | **Sistema core** responde la condición de socio y la fecha de ingreso a **July**. | `SistemaCore` | responde → `Socio.responderCondicion()` | `Socio` (esSocio, fechaIngreso) | `SistemaCore` → `July` | 1.2.2.2 |
| 7 | **July** registra el lead con su intención y su condición de socio. | `July` | registra → `Lead.registrar()` | `Lead` (intencion, condicionSocio) | `July` (interno) | 1.2.2.3 |
| 8 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. | `July` | entrega → `Lead.entregarNumeroSeguimiento()` | `Lead` (numeroSeguimiento) | `July` → `Prospecto` | 1.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · July no reconoce la intención (reemplaza el paso 3)* | | | | | |
| 3a | **July** reformula la pregunta con las líneas de crédito como opciones cerradas al **Prospecto**. Vuelve al paso 4. | `July` | reformula → `Pregunta.reformular()` | `Pregunta` (opciones) | `July` → `Prospecto` | 1.2.2.1 |
| | *A2 · Es una pregunta frecuente, no una solicitud de crédito (reemplaza el paso 3)* | | | | | |
| 3b | **July** responde la pregunta frecuente al **Prospecto**. Fin. | `July` | responde → `PreguntaFrecuente.responder()` | `PreguntaFrecuente` (pregunta, respuesta) | `July` → `Prospecto` | 1.2.2.1 |
| | *A3 · El Sistema core no responde a tiempo (reemplaza el paso 6)* | | | | | |
| 6c | **Sistema core** devuelve el error de integración por tiempo de espera agotado a **July**. | `SistemaCore` | devuelve → `ErrorIntegracion.devolver()` | `ErrorIntegracion` (codigo, descripcion) | `SistemaCore` → `July` | 1.2.2.2 |
| 7c | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. | `July` | registra → `Lead.registrar()` | `Lead` (intencion, condicionSocio = por verificar) | `July` (interno) | 1.2.2.3 |
| | *A4 · El prospecto llegó por el widget web y aún no hay teléfono (reemplaza los pasos 5 a 7)* | | | | | |
| 5d | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. | `July` | registra → `Lead.registrar()` | `Lead` (intencion, condicionSocio = por verificar) | `July` (interno) | 1.2.2.3 |

La condición «socio por verificar» se resuelve en CU 2.3.1, cuando July consulta al Sistema core con la cédula ya capturada.

<a id="cu-1-2-2-1"></a>
##### CU 1.2.2.1 · Detectar la intención de crédito (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.2](#cu-1-2-2), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.2.1 Detección de intención |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July identifique la línea de crédito que busca el prospecto y la confirme con él. |
| Pasos de CU 1.2.2 | 1, 2, 3, 4, 3a, 3b |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** describe la necesidad de crédito a **July**. |
| 2 | **July** identifica la intención de crédito. |
| 3 | **July** solicita la confirmación de la línea de crédito detectada al **Prospecto**. |
| 4 | **Prospecto** confirma la línea de crédito a **July**. |
| 3a | **July** reformula la pregunta con las líneas de crédito como opciones cerradas al **Prospecto**. Vuelve al paso 4. |
| 3b | **July** responde la pregunta frecuente al **Prospecto**. Fin. |

<a id="cu-1-2-2-2"></a>
##### CU 1.2.2.2 · Reconocer si ya es socio (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.2](#cu-1-2-2), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.2.2 Reconocimiento de socio |
| Actor externo | Sistema core |
| Objetivo | Que July sepa, por el teléfono, si el prospecto es socio y desde cuándo. |
| Pasos de CU 1.2.2 | 5, 6, 6c |

| Paso | Especificación |
|---|---|
| 5 | **July** consulta la condición de socio por el teléfono del prospecto al **Sistema core**. |
| 6 | **Sistema core** responde la condición de socio y la fecha de ingreso a **July**. |
| 6c | **Sistema core** devuelve el error de integración por tiempo de espera agotado a **July**. |

<a id="cu-1-2-2-3"></a>
##### CU 1.2.2.3 · Registrar el lead (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 1.2.2](#cu-1-2-2), dentro de [CU 1.2](#cu-1-2) |
| Capacidad | 1.2.2.3 Registro del lead |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el lead quede registrado con su intención y su condición de socio, y el prospecto reciba su número de seguimiento. |
| Pasos de CU 1.2.2 | 7, 8, 7c, 5d |

| Paso | Especificación |
|---|---|
| 7 | **July** registra el lead con su intención y su condición de socio. |
| 8 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. |
| 7c | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. |
| 5d | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. |

---

## Flujo de valor 2 · Captura, simulación y precalificación

**Actor principal:** Prospecto · **Objetivo del flujo:** Convertir la conversación en un prospecto con datos validados, una simulación elegida y un resultado de precalificación.

<a id="cu-2-1"></a>
### CU 2.1 · Completar el perfil del crédito (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Perfilamiento |
| Capacidad | 2.1 Perfilamiento |
| Actor principal | Prospecto |
| Incluye | [CU 2.1.1](#cu-2-1-1), [CU 2.1.2](#cu-2-1-2) |
| Objetivo | Que July reúna, valide y guarde los datos que necesitan la simulación y la precalificación. |
| Disparador | El prospecto pide iniciar su solicitud de crédito. |
| Precondiciones | El lead está registrado y aceptó el aviso de privacidad (flujo 1). |
| Postcondiciones | La solicitud tiene identidad, perfil económico, monto, plazo y destino validados y confirmados por el prospecto. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito a **July**. | `Prospecto` | inicia → `SolicitudCredito.iniciar()` | `SolicitudCredito` (lineaCredito) | `Prospecto` → `July` | CU 2.1.1 |
| 2 | **July** solicita los datos de la solicitud de crédito al **Prospecto**. | `July` | solicita → `SolicitudCredito.solicitarDatos()` | `SolicitudCredito` (identidad, perfilEconomico, monto, plazo, destino) | `July` → `Prospecto` | CU 2.1.1 |
| 3 | **Prospecto** entrega los datos de la solicitud de crédito a **July**. | `Prospecto` | entrega → `SolicitudCredito.entregarDatos()` | `SolicitudCredito` (identidad, perfilEconomico, monto, plazo, destino) | `Prospecto` → `July` | CU 2.1.1 |
| 4 | **July** valida los datos de la solicitud de crédito. | `July` | valida → `SolicitudCredito.validar()` | `SolicitudCredito` (cedula, telefono, monto) | `July` (interno) | CU 2.1.2 |
| 5 | **July** guarda el avance de la conversación. | `July` | guarda → `Conversacion.guardarAvance()` | `Conversacion` (ultimoPaso) | `July` (interno) | CU 2.1.2 |
| 6 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. | `July` | solicita → `SolicitudCredito.solicitarConfirmacion()` | `SolicitudCredito` (resumen) | `July` → `Prospecto` | CU 2.1.1 |
| 7 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. | `Prospecto` | confirma → `SolicitudCredito.confirmar()` | `SolicitudCredito` (confirmada = sí) | `Prospecto` → `July` | CU 2.1.1 |

<a id="cu-2-1-1"></a>
#### CU 2.1.1 · Entregar los datos conversando (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1 Captura conversacional |
| Actor principal | Prospecto |
| Actores secundarios | Ninguno, lo resuelve July |
| Incluye | [CU 2.1.1.1](#cu-2-1-1-1), [CU 2.1.1.2](#cu-2-1-1-2), [CU 2.1.1.3](#cu-2-1-1-3) |
| Objetivo | Reunir, conversando y sin formularios, los datos que necesitan la simulación y la precalificación. |
| Disparador | El prospecto pide iniciar su solicitud de crédito. |
| Precondiciones | El lead está registrado y aceptó el aviso de privacidad (flujo 1). |
| Postcondiciones | July tiene identidad, contacto, ingresos, actividad, monto, plazo y destino confirmados por el prospecto. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito para la línea confirmada a **July**. | `Prospecto` | inicia → `SolicitudCredito.iniciar()` | `SolicitudCredito` (lineaCredito) | `Prospecto` → `July` | 2.1.1.1 |
| 2 | **July** solicita los nombres, la cédula y el correo al **Prospecto**. | `July` | solicita → `Prospecto.solicitarDatosIdentidad()` | `Prospecto` (nombres, cedula, correo) | `July` → `Prospecto` | 2.1.1.1 |
| 3 | **Prospecto** entrega los nombres, la cédula y el correo a **July**. | `Prospecto` | entrega → `Prospecto.entregarDatosIdentidad()` | `Prospecto` (nombres, cedula, correo) | `Prospecto` → `July` | 2.1.1.1 |
| 4 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. | `July` | solicita → `PerfilEconomico.solicitar()` | `PerfilEconomico` (ingresosMensuales, actividad) | `July` → `Prospecto` | 2.1.1.2 |
| 5 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. | `Prospecto` | declara → `PerfilEconomico.declarar()` | `PerfilEconomico` (ingresosMensuales, actividad) | `Prospecto` → `July` | 2.1.1.2 |
| 6 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. | `July` | solicita → `SolicitudCredito.solicitarCondiciones()` | `SolicitudCredito` (monto, plazo, destino) | `July` → `Prospecto` | 2.1.1.3 |
| 7 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. | `Prospecto` | indica → `SolicitudCredito.indicarCondiciones()` | `SolicitudCredito` (monto, plazo, destino) | `Prospecto` → `July` | 2.1.1.3 |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. | `July` | resume → `SolicitudCredito.resumir()` | `SolicitudCredito` (resumen) | `July` (interno) | 2.1.1.1, 2.1.1.2, 2.1.1.3 |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. | `July` | solicita → `SolicitudCredito.solicitarConfirmacion()` | `SolicitudCredito` (resumen) | `July` → `Prospecto` | 2.1.1.1, 2.1.1.2, 2.1.1.3 |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. | `Prospecto` | confirma → `SolicitudCredito.confirmar()` | `SolicitudCredito` (confirmada = sí) | `Prospecto` → `July` | 2.1.1.1, 2.1.1.2, 2.1.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El prospecto ya es socio (reemplaza los pasos 2 y 3)* | | | | | |
| 2a | **July** muestra los nombres, la cédula y el correo registrados del socio al **Prospecto**. | `July` | muestra → `Prospecto.mostrarDatosIdentidad()` | `Prospecto` (nombres, cedula, correo) | `July` → `Prospecto` | 2.1.1.1 |
| 3a | **Prospecto** confirma los nombres, la cédula y el correo registrados a **July**. Continúa en el paso 4. | `Prospecto` | confirma → `Prospecto.confirmarDatosIdentidad()` | `Prospecto` (nombres, cedula, correo) | `Prospecto` → `July` | 2.1.1.1 |
| | *A2 · El prospecto corrige un dato del resumen (reemplaza el paso 10)* | | | | | |
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. | `Prospecto` | corrige → `SolicitudCredito.corregirDato()` | `SolicitudCredito` (campo, valorNuevo) | `Prospecto` → `July` | 2.1.1.1, 2.1.1.2, 2.1.1.3 |

<a id="cu-2-1-1-1"></a>
##### CU 2.1.1.1 · Registrar identidad y contacto (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.1](#cu-2-1-1), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1.1 Identidad y contacto |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July tenga los nombres, la cédula y el correo del prospecto, confirmados por él. |
| Pasos de CU 2.1.1 | 1, 2, 3, 8, 9, 10, 2a, 3a, 10b |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito para la línea confirmada a **July**. |
| 2 | **July** solicita los nombres, la cédula y el correo al **Prospecto**. |
| 3 | **Prospecto** entrega los nombres, la cédula y el correo a **July**. |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |
| 2a | **July** muestra los nombres, la cédula y el correo registrados del socio al **Prospecto**. |
| 3a | **Prospecto** confirma los nombres, la cédula y el correo registrados a **July**. Continúa en el paso 4. |
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. |

<a id="cu-2-1-1-2"></a>
##### CU 2.1.1.2 · Declarar ingresos y actividad (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.1](#cu-2-1-1), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1.2 Ingresos y actividad |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July tenga los ingresos mensuales y la actividad económica que declara el prospecto. |
| Pasos de CU 2.1.1 | 4, 5, 8, 9, 10, 10b |

| Paso | Especificación |
|---|---|
| 4 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. |
| 5 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. |

<a id="cu-2-1-1-3"></a>
##### CU 2.1.1.3 · Indicar monto, plazo y destino (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.1](#cu-2-1-1), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1.3 Monto, plazo y destino |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July tenga el monto, el plazo y el destino del crédito que pide el prospecto. |
| Pasos de CU 2.1.1 | 6, 7, 8, 9, 10, 10b |

| Paso | Especificación |
|---|---|
| 6 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. |
| 7 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. |

<a id="cu-2-1-2"></a>
#### CU 2.1.2 · Validar los datos y mantener la continuidad (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.2 Validación y continuidad |
| Actor principal | Prospecto |
| Actores secundarios | Sistema core, WhatsApp Business API |
| Incluye | [CU 2.1.2.1](#cu-2-1-2-1), [CU 2.1.2.2](#cu-2-1-2-2), [CU 2.1.2.3](#cu-2-1-2-3) |
| Objetivo | Validar cada dato al recibirlo, guardar el avance y retomar la conversación si el prospecto la abandona, sin volver a pedirle lo que ya dio. |
| Disparador | El prospecto entrega su cédula, su teléfono o el monto durante CU 2.1.1. |
| Precondiciones | Hay una conversación de captura en curso. |
| Postcondiciones | El dato quedó validado y guardado, o el prospecto recibió un recordatorio para retomar. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** entrega el número de cédula a **July**. | `Prospecto` | entrega → `Prospecto.entregarCedula()` | `Prospecto` (cedula) | `Prospecto` → `July` | 2.1.2.1 |
| 2 | **July** valida el formato de la cédula (10 dígitos y dígito verificador). | `July` | valida → `Prospecto.validarFormatoCedula()` | `Prospecto` (cedula) | `July` (interno) | 2.1.2.1 |
| 3 | **July** verifica la cédula con el **Sistema core**. | `July` | verifica → `Prospecto.verificarCedula()` | `Prospecto` (cedula) | `July` → `SistemaCore` | 2.1.2.1 |
| 4 | **Sistema core** confirma la validez de la cédula a **July**. | `SistemaCore` | confirma → `Prospecto.confirmarValidezCedula()` | `Prospecto` (cedula, valida = sí) | `SistemaCore` → `July` | 2.1.2.1 |
| 5 | **July** guarda el avance de la conversación con la cédula como último dato. | `July` | guarda → `Conversacion.guardarAvance()` | `Conversacion` (ultimoPaso) | `July` (interno) | 2.1.2.2 |
| 6 | **July** notifica la cédula validada al **Prospecto**. Fin. | `July` | notifica → `Prospecto.notificarValidacion()` | `Prospecto` (cedula) | `July` → `Prospecto` | 2.1.2.1 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El dato es el teléfono (reemplaza los pasos 1 a 4)* | | | | | |
| 1a | **Prospecto** entrega el número de teléfono a **July**. | `Prospecto` | entrega → `Prospecto.entregarTelefono()` | `Prospecto` (telefono) | `Prospecto` → `July` | 2.1.2.1 |
| 2a | **July** valida el formato del teléfono (10 dígitos que empiezan con 09). Continúa en el paso 5. | `July` | valida → `Prospecto.validarFormatoTelefono()` | `Prospecto` (telefono) | `July` (interno) | 2.1.2.1 |
| | *A2 · El dato es el monto (reemplaza los pasos 1 a 4)* | | | | | |
| 1b | **Prospecto** entrega el monto del crédito a **July**. | `Prospecto` | entrega → `SolicitudCredito.entregarMonto()` | `SolicitudCredito` (monto) | `Prospecto` → `July` | 2.1.2.1 |
| 2b | **July** valida el monto contra el rango de la línea de crédito. Continúa en el paso 5. | `July` | valida → `SolicitudCredito.validarMonto()` | `SolicitudCredito` (monto, montoMinimo, montoMaximo) | `July` (interno) | 2.1.2.1 |
| | *A3 · La cédula no es válida (reemplaza el paso 4)* | | | | | |
| 4c | **Sistema core** informa el error de validación de la cédula a **July**. | `SistemaCore` | informa → `ErrorValidacion.informar()` | `ErrorValidacion` (campo = cedula, motivo) | `SistemaCore` → `July` | 2.1.2.1 |
| 5c | **July** explica el error de validación de la cédula al **Prospecto**. Vuelve al paso 1. | `July` | explica → `ErrorValidacion.explicar()` | `ErrorValidacion` (motivo) | `July` → `Prospecto` | 2.1.2.1 |
| | *A4 · El prospecto abandona la conversación (después del paso 6)* | | | | | |
| 7d | **Prospecto** deja sin respuesta la conversación a **July**. | `Prospecto` | deja sin respuesta → `Conversacion.dejarSinRespuesta()` | `Conversacion` (fechaUltimaActividad) | `Prospecto` → `July` | 2.1.2.3 |
| 8d | **July** marca la conversación como abandonada al vencer el tiempo de espera. | `July` | marca → `Conversacion.marcarAbandonada()` | `Conversacion` (estado = abandonada) | `July` (interno) | 2.1.2.3 |
| 9d | **July** envía la plantilla de retoma con el último paso guardado a **WhatsApp Business API**. | `July` | envía → `PlantillaMensaje.enviarRetoma()` | `PlantillaMensaje` (tipo = retoma, ultimoPaso) | `July` → `WhatsAppBusinessAPI` | 2.1.2.3 |
| 10d | **WhatsApp Business API** entrega la plantilla de retoma al **Prospecto**. | `WhatsAppBusinessAPI` | entrega → `PlantillaMensaje.entregar()` | `PlantillaMensaje` (tipo = retoma, contenido) | `WhatsAppBusinessAPI` → `Prospecto` | 2.1.2.3 |
| 11d | **Prospecto** responde la plantilla de retoma a **July**. | `Prospecto` | responde → `Mensaje.responderRetoma()` | `Mensaje` (contenido) | `Prospecto` → `July` | 2.1.2.3 |
| 12d | **July** retoma la conversación desde el último paso guardado. | `July` | retoma → `Conversacion.retomar()` | `Conversacion` (ultimoPaso, estado = activa) | `July` (interno) | 2.1.2.2, 2.1.2.3 |
| 13d | **July** solicita el siguiente dato pendiente de la solicitud al **Prospecto**. Vuelve al paso 1. | `July` | solicita → `SolicitudCredito.solicitarDato()` | `SolicitudCredito` (campoPendiente) | `July` → `Prospecto` | 2.1.2.3 |

<a id="cu-2-1-2-1"></a>
##### CU 2.1.2.1 · Validar cédula, teléfono y montos (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.2](#cu-2-1-2), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.2.1 Validación de formatos |
| Actor externo | Sistema core |
| Objetivo | Que la cédula, el teléfono y el monto se validen al recibirlos, y la cédula se verifique con el Sistema core. |
| Pasos de CU 2.1.2 | 1, 2, 3, 4, 6, 1a, 2a, 1b, 2b, 4c, 5c |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** entrega el número de cédula a **July**. |
| 2 | **July** valida el formato de la cédula (10 dígitos y dígito verificador). |
| 3 | **July** verifica la cédula con el **Sistema core**. |
| 4 | **Sistema core** confirma la validez de la cédula a **July**. |
| 6 | **July** notifica la cédula validada al **Prospecto**. Fin. |
| 1a | **Prospecto** entrega el número de teléfono a **July**. |
| 2a | **July** valida el formato del teléfono (10 dígitos que empiezan con 09). Continúa en el paso 5. |
| 1b | **Prospecto** entrega el monto del crédito a **July**. |
| 2b | **July** valida el monto contra el rango de la línea de crédito. Continúa en el paso 5. |
| 4c | **Sistema core** informa el error de validación de la cédula a **July**. |
| 5c | **July** explica el error de validación de la cédula al **Prospecto**. Vuelve al paso 1. |

<a id="cu-2-1-2-2"></a>
##### CU 2.1.2.2 · Guardar el avance de la conversación (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.2](#cu-2-1-2), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.2.2 Guardado del avance |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que cada dato validado quede guardado como último paso, para retomar desde ahí. |
| Pasos de CU 2.1.2 | 5, 12d |

| Paso | Especificación |
|---|---|
| 5 | **July** guarda el avance de la conversación con la cédula como último dato. |
| 12d | **July** retoma la conversación desde el último paso guardado. |

<a id="cu-2-1-2-3"></a>
##### CU 2.1.2.3 · Retomar la conversación abandonada (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.2](#cu-2-1-2), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.2.3 Retoma tras abandono |
| Actor externo | WhatsApp Business API |
| Objetivo | Que la conversación abandonada se retome con una plantilla de WhatsApp sin volver a pedir los datos ya dados. |
| Pasos de CU 2.1.2 | 7d, 8d, 9d, 10d, 11d, 12d, 13d |

| Paso | Especificación |
|---|---|
| 7d | **Prospecto** deja sin respuesta la conversación a **July**. |
| 8d | **July** marca la conversación como abandonada al vencer el tiempo de espera. |
| 9d | **July** envía la plantilla de retoma con el último paso guardado a **WhatsApp Business API**. |
| 10d | **WhatsApp Business API** entrega la plantilla de retoma al **Prospecto**. |
| 11d | **Prospecto** responde la plantilla de retoma a **July**. |
| 12d | **July** retoma la conversación desde el último paso guardado. |
| 13d | **July** solicita el siguiente dato pendiente de la solicitud al **Prospecto**. Vuelve al paso 1. |

<a id="cu-2-2"></a>
### CU 2.2 · Simular el crédito (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Simulación financiera |
| Capacidad | 2.2 Simulación financiera |
| Actor principal | Prospecto |
| Incluye | [CU 2.2.2](#cu-2-2-2), [CU 2.2.1](#cu-2-2-1) |
| Objetivo | Que el prospecto elija una línea de crédito, conozca sus condiciones y elija un escenario de cuota y plazo. |
| Disparador | El prospecto pregunta qué créditos ofrece la cooperativa o pide simular su crédito. |
| Precondiciones | La solicitud tiene monto y plazo declarados (CU 2.1). |
| Postcondiciones | El prospecto eligió una línea y un escenario, y July lo guardó para la precalificación. |

Primero se elige la línea (CU 2.2.2) y luego se calcula con sus condiciones (CU 2.2.1).

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** consulta las líneas de crédito disponibles a **July**. | `Prospecto` | consulta → `LineaCredito.consultar()` | `LineaCredito` (nombre) | `Prospecto` → `July` | CU 2.2.2 |
| 2 | **July** presenta las líneas de crédito vigentes con su tasa, plazos y requisitos al **Prospecto**. | `July` | presenta → `LineaCredito.presentar()` | `LineaCredito` (nombre, tasa, plazos, requisitos) | `July` → `Prospecto` | CU 2.2.2 |
| 3 | **Prospecto** selecciona la línea de crédito a **July**. | `Prospecto` | selecciona → `LineaCredito.seleccionar()` | `LineaCredito` (nombre) | `Prospecto` → `July` | CU 2.2.2 |
| 4 | **July** calcula la simulación del crédito. | `July` | calcula → `Simulacion.calcular()` | `Simulacion` (cuotaMensual, totalPagar) | `July` (interno) | CU 2.2.1 |
| 5 | **July** presenta la simulación con la cuota, el total a pagar y los escenarios al **Prospecto**. | `July` | presenta → `Simulacion.presentar()` | `Simulacion` (cuotaMensual, totalPagar, escenarios) | `July` → `Prospecto` | CU 2.2.1 |
| 6 | **Prospecto** confirma el escenario de simulación elegido a **July**. Fin. | `Prospecto` | confirma → `EscenarioSimulacion.confirmar()` | `EscenarioSimulacion` (monto, plazo) | `Prospecto` → `July` | CU 2.2.1 |

<a id="cu-2-2-1"></a>
#### CU 2.2.1 · Calcular las condiciones del crédito (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.1 Cálculo del crédito |
| Actor principal | Prospecto |
| Actores secundarios | Ninguno, lo resuelve July |
| Incluye | [CU 2.2.1.1](#cu-2-2-1-1), [CU 2.2.1.2](#cu-2-2-1-2), [CU 2.2.1.3](#cu-2-2-1-3) |
| Objetivo | Mostrar cuánto pagaría la persona según la línea, el monto y el plazo, y dejarla comparar opciones. |
| Disparador | El prospecto pide simular su crédito. |
| Precondiciones | Hay una línea elegida con su tasa y plazos vigentes (CU 2.2.2) y un monto y un plazo declarados (CU 2.1.1). |
| Postcondiciones | El prospecto eligió un escenario y July lo guardó para la precalificación. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** solicita la simulación del crédito con su monto y su plazo a **July**. | `Prospecto` | solicita → `Simulacion.solicitar()` | `Simulacion` (monto, plazo, lineaCredito) | `Prospecto` → `July` | 2.2.1.1 |
| 2 | **July** calcula la cuota mensual de la simulación. | `July` | calcula → `Simulacion.calcularCuota()` | `Simulacion` (cuotaMensual) | `July` (interno) | 2.2.1.1 |
| 3 | **July** genera la tabla de amortización de la simulación. | `July` | genera → `TablaAmortizacion.generar()` | `TablaAmortizacion` (cuotas (numero, capital, interes, saldo)) | `July` (interno) | 2.2.1.1 |
| 4 | **July** presenta la cuota mensual con la tabla de amortización al **Prospecto**. | `July` | presenta → `Simulacion.presentar()` | `Simulacion` (cuotaMensual, tablaAmortizacion) | `July` → `Prospecto` | 2.2.1.1 |
| 5 | **Prospecto** solicita el costo total del crédito a **July**. | `Prospecto` | solicita → `Simulacion.solicitarCostoTotal()` | `Simulacion` (totalPagar) | `Prospecto` → `July` | 2.2.1.2 |
| 6 | **July** calcula el costo total con intereses, seguros y cargos. | `July` | calcula → `Simulacion.calcularCostoTotal()` | `Simulacion` (totalPagar, intereses, seguros, cargos) | `July` (interno) | 2.2.1.2 |
| 7 | **July** muestra el costo total desglosado al **Prospecto**. | `July` | muestra → `Simulacion.mostrarCostoTotal()` | `Simulacion` (totalPagar, intereses, seguros, cargos) | `July` → `Prospecto` | 2.2.1.2 |
| 8 | **Prospecto** solicita la comparación con otro monto o plazo a **July**. | `Prospecto` | solicita → `EscenarioSimulacion.solicitarComparacion()` | `EscenarioSimulacion` (monto, plazo) | `Prospecto` → `July` | 2.2.1.3 |
| 9 | **July** calcula el escenario alternativo de simulación. | `July` | calcula → `EscenarioSimulacion.calcular()` | `EscenarioSimulacion` (monto, plazo, cuotaMensual, totalPagar) | `July` (interno) | 2.2.1.3 |
| 10 | **July** presenta los escenarios de simulación lado a lado al **Prospecto**. | `July` | presenta → `EscenarioSimulacion.presentar()` | `EscenarioSimulacion` (monto, plazo, cuotaMensual, totalPagar) | `July` → `Prospecto` | 2.2.1.3 |
| 11 | **Prospecto** confirma el escenario de simulación elegido a **July**. | `Prospecto` | confirma → `EscenarioSimulacion.confirmar()` | `EscenarioSimulacion` (monto, plazo) | `Prospecto` → `July` | 2.2.1.3 |
| 12 | **July** guarda el escenario elegido para la precalificación. Fin. | `July` | guarda → `EscenarioSimulacion.guardar()` | `EscenarioSimulacion` (elegido = sí) | `July` (interno) | 2.2.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El monto está fuera del rango de la línea (reemplaza los pasos 2 a 4)* | | | | | |
| 2a | **July** detecta que el monto está fuera del rango de la línea de crédito. | `July` | detecta → `LineaCredito.verificarRango()` | `LineaCredito` (monto, montoMinimo, montoMaximo) | `July` (interno) | 2.2.1.1 |
| 3a | **July** informa los montos mínimo y máximo de la línea de crédito al **Prospecto**. Vuelve al paso 1. | `July` | informa → `LineaCredito.informarRango()` | `LineaCredito` (montoMinimo, montoMaximo) | `July` → `Prospecto` | 2.2.1.1 |
| | *A2 · El prospecto no quiere comparar (reemplaza los pasos 8 a 12)* | | | | | |
| 8b | **Prospecto** acepta la simulación inicial a **July**. | `Prospecto` | acepta → `Simulacion.aceptar()` | `Simulacion` (aceptada = sí) | `Prospecto` → `July` | 2.2.1.1 |
| 9b | **July** guarda la simulación inicial como escenario elegido. Fin. | `July` | guarda → `EscenarioSimulacion.guardar()` | `EscenarioSimulacion` (monto, plazo, elegido = sí) | `July` (interno) | 2.2.1.1 |

<a id="cu-2-2-1-1"></a>
##### CU 2.2.1.1 · Calcular cuota y tabla de amortización (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.1](#cu-2-2-1), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.1.1 Cuota y amortización |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el prospecto conozca su cuota mensual y su tabla de amortización, dentro del rango de montos de la línea. |
| Pasos de CU 2.2.1 | 1, 2, 3, 4, 2a, 3a, 8b, 9b |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la simulación del crédito con su monto y su plazo a **July**. |
| 2 | **July** calcula la cuota mensual de la simulación. |
| 3 | **July** genera la tabla de amortización de la simulación. |
| 4 | **July** presenta la cuota mensual con la tabla de amortización al **Prospecto**. |
| 2a | **July** detecta que el monto está fuera del rango de la línea de crédito. |
| 3a | **July** informa los montos mínimo y máximo de la línea de crédito al **Prospecto**. Vuelve al paso 1. |
| 8b | **Prospecto** acepta la simulación inicial a **July**. |
| 9b | **July** guarda la simulación inicial como escenario elegido. Fin. |

<a id="cu-2-2-1-2"></a>
##### CU 2.2.1.2 · Mostrar el total a pagar (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.1](#cu-2-2-1), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.1.2 Total a pagar |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el prospecto conozca el total a pagar con intereses, seguros y cargos. |
| Pasos de CU 2.2.1 | 5, 6, 7 |

| Paso | Especificación |
|---|---|
| 5 | **Prospecto** solicita el costo total del crédito a **July**. |
| 6 | **July** calcula el costo total con intereses, seguros y cargos. |
| 7 | **July** muestra el costo total desglosado al **Prospecto**. |

<a id="cu-2-2-1-3"></a>
##### CU 2.2.1.3 · Comparar escenarios de monto y plazo (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.1](#cu-2-2-1), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.1.3 Comparación de escenarios |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el prospecto compare escenarios de monto y plazo y elija uno para la precalificación. |
| Pasos de CU 2.2.1 | 8, 9, 10, 11, 12 |

| Paso | Especificación |
|---|---|
| 8 | **Prospecto** solicita la comparación con otro monto o plazo a **July**. |
| 9 | **July** calcula el escenario alternativo de simulación. |
| 10 | **July** presenta los escenarios de simulación lado a lado al **Prospecto**. |
| 11 | **Prospecto** confirma el escenario de simulación elegido a **July**. |
| 12 | **July** guarda el escenario elegido para la precalificación. Fin. |

<a id="cu-2-2-2"></a>
#### CU 2.2.2 · Consultar productos y condiciones (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.2 Productos y condiciones |
| Actor principal | Prospecto |
| Actores secundarios | Área de productos y crédito |
| Incluye | [CU 2.2.2.1](#cu-2-2-2-1), [CU 2.2.2.2](#cu-2-2-2-2), [CU 2.2.2.3](#cu-2-2-2-3) |
| Objetivo | Que el prospecto conozca las líneas de crédito vigentes con su tasa, plazos y requisitos. |
| Disparador | El prospecto pregunta qué créditos ofrece la cooperativa. |
| Precondiciones | El Área de productos y crédito publicó el catálogo vigente. |
| Postcondiciones | El prospecto eligió una línea y conoce su tasa, sus plazos y sus requisitos. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** consulta las líneas de crédito disponibles a **July**. | `Prospecto` | consulta → `LineaCredito.consultar()` | `LineaCredito` (nombre) | `Prospecto` → `July` | 2.2.2.1 |
| 2 | **July** consulta el catálogo de crédito vigente al **Área de productos y crédito**. | `July` | consulta → `CatalogoCredito.consultar()` | `CatalogoCredito` (version) | `July` → `AreaProductosCredito` | 2.2.2.1 |
| 3 | **Área de productos y crédito** entrega el catálogo de crédito publicado con las líneas vigentes a **July**. | `AreaProductosCredito` | entrega → `CatalogoCredito.entregar()` | `CatalogoCredito` (lineas, fechaPublicacion) | `AreaProductosCredito` → `July` | 2.2.2.1 |
| 4 | **July** presenta los nombres de las líneas de crédito vigentes al **Prospecto**. | `July` | presenta → `LineaCredito.presentar()` | `LineaCredito` (nombre) | `July` → `Prospecto` | 2.2.2.1 |
| 5 | **Prospecto** selecciona la línea de crédito a **July**. | `Prospecto` | selecciona → `LineaCredito.seleccionar()` | `LineaCredito` (nombre) | `Prospecto` → `July` | 2.2.2.2 |
| 6 | **July** consulta la tasa y los plazos de la línea de crédito al **Área de productos y crédito**. | `July` | consulta → `LineaCredito.consultarCondiciones()` | `LineaCredito` (tasa, plazos) | `July` → `AreaProductosCredito` | 2.2.2.2 |
| 7 | **Área de productos y crédito** entrega la tasa y los plazos vigentes de la línea de crédito a **July**. | `AreaProductosCredito` | entrega → `LineaCredito.entregarCondiciones()` | `LineaCredito` (tasa, plazos, vigente) | `AreaProductosCredito` → `July` | 2.2.2.2 |
| 8 | **July** consulta los requisitos de la línea de crédito al **Área de productos y crédito**. | `July` | consulta → `Requisito.consultar()` | `Requisito` (lineaCredito) | `July` → `AreaProductosCredito` | 2.2.2.3 |
| 9 | **Área de productos y crédito** entrega los requisitos vigentes de la línea de crédito a **July**. | `AreaProductosCredito` | entrega → `Requisito.entregar()` | `Requisito` (descripcion) | `AreaProductosCredito` → `July` | 2.2.2.3 |
| 10 | **July** informa la tasa, los plazos y los requisitos de la línea de crédito al **Prospecto**. Fin. | `July` | informa → `LineaCredito.informarCondiciones()` | `LineaCredito` (tasa, plazos, requisitos) | `July` → `Prospecto` | 2.2.2.2, 2.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · La línea elegida ya no está vigente (reemplaza el paso 7)* | | | | | |
| 7a | **Área de productos y crédito** marca la línea de crédito como no vigente a **July**. | `AreaProductosCredito` | marca → `LineaCredito.marcarNoVigente()` | `LineaCredito` (vigente = no) | `AreaProductosCredito` → `July` | 2.2.2.2 |
| 8a | **July** ofrece las líneas de crédito alternativas vigentes al **Prospecto**. Vuelve al paso 5. | `July` | ofrece → `LineaCredito.ofrecerAlternativas()` | `LineaCredito` (nombre) | `July` → `Prospecto` | 2.2.2.1 |

<a id="cu-2-2-2-1"></a>
##### CU 2.2.2.1 · Consultar el catálogo de líneas (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.2](#cu-2-2-2), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.2.1 Catálogo de líneas |
| Actor externo | Área de productos y crédito |
| Objetivo | Que el prospecto conozca las líneas de crédito vigentes del catálogo publicado. |
| Pasos de CU 2.2.2 | 1, 2, 3, 4, 8a |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** consulta las líneas de crédito disponibles a **July**. |
| 2 | **July** consulta el catálogo de crédito vigente al **Área de productos y crédito**. |
| 3 | **Área de productos y crédito** entrega el catálogo de crédito publicado con las líneas vigentes a **July**. |
| 4 | **July** presenta los nombres de las líneas de crédito vigentes al **Prospecto**. |
| 8a | **July** ofrece las líneas de crédito alternativas vigentes al **Prospecto**. Vuelve al paso 5. |

<a id="cu-2-2-2-2"></a>
##### CU 2.2.2.2 · Consultar tasas y plazos por línea (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.2](#cu-2-2-2), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.2.2 Tasas y plazos por línea |
| Actor externo | Área de productos y crédito |
| Objetivo | Que el prospecto conozca la tasa y los plazos vigentes de la línea que eligió. |
| Pasos de CU 2.2.2 | 5, 6, 7, 10, 7a |

| Paso | Especificación |
|---|---|
| 5 | **Prospecto** selecciona la línea de crédito a **July**. |
| 6 | **July** consulta la tasa y los plazos de la línea de crédito al **Área de productos y crédito**. |
| 7 | **Área de productos y crédito** entrega la tasa y los plazos vigentes de la línea de crédito a **July**. |
| 10 | **July** informa la tasa, los plazos y los requisitos de la línea de crédito al **Prospecto**. Fin. |
| 7a | **Área de productos y crédito** marca la línea de crédito como no vigente a **July**. |

<a id="cu-2-2-2-3"></a>
##### CU 2.2.2.3 · Consultar requisitos por línea (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.2.2](#cu-2-2-2), dentro de [CU 2.2](#cu-2-2) |
| Capacidad | 2.2.2.3 Requisitos por línea |
| Actor externo | Área de productos y crédito |
| Objetivo | Que el prospecto conozca los requisitos vigentes de la línea que eligió. |
| Pasos de CU 2.2.2 | 8, 9, 10 |

| Paso | Especificación |
|---|---|
| 8 | **July** consulta los requisitos de la línea de crédito al **Área de productos y crédito**. |
| 9 | **Área de productos y crédito** entrega los requisitos vigentes de la línea de crédito a **July**. |
| 10 | **July** informa la tasa, los plazos y los requisitos de la línea de crédito al **Prospecto**. Fin. |

<a id="cu-2-3"></a>
### CU 2.3 · Obtener la precalificación (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Precalificación |
| Capacidad | 2.3 Precalificación |
| Actor principal | Prospecto |
| Incluye | [CU 2.3.1](#cu-2-3-1), [CU 2.3.2](#cu-2-3-2) |
| Objetivo | Que el prospecto reciba una respuesta preliminar sobre su crédito, sepa qué documentos preparar y tenga una cita en agencia. |
| Disparador | El prospecto pide saber si califica, después de simular. |
| Precondiciones | El perfil está completo (CU 2.1) y hay un escenario elegido (CU 2.2). |
| Postcondiciones | El prospecto conoce su resultado, tiene la lista de documentos y una cita confirmada. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** solicita la precalificación del escenario elegido a **July**. | `Prospecto` | solicita → `Precalificacion.solicitar()` | `Precalificacion` (escenarioElegido) | `Prospecto` → `July` | CU 2.3.1 |
| 2 | **July** evalúa la precalificación con las reglas vigentes. | `July` | evalúa → `Precalificacion.evaluar()` | `Precalificacion` (capacidadPago, clasificacion) | `July` (interno) | CU 2.3.1 |
| 3 | **July** comunica el resultado preliminar de la precalificación al **Prospecto**. | `July` | comunica → `Precalificacion.comunicarResultado()` | `Precalificacion` (clasificacion, resultado) | `July` → `Prospecto` | CU 2.3.1 |
| 4 | **Prospecto** consulta los documentos requeridos a **July**. | `Prospecto` | consulta → `DocumentoRequerido.consultar()` | `DocumentoRequerido` (lineaCredito, condicionSocio) | `Prospecto` → `July` | CU 2.3.2 |
| 5 | **July** envía la lista de documentos requeridos al **Prospecto**. | `July` | envía → `DocumentoRequerido.enviarLista()` | `DocumentoRequerido` (nombre) | `July` → `Prospecto` | CU 2.3.2 |
| 6 | **Prospecto** solicita la cita en agencia a **July**. | `Prospecto` | solicita → `Cita.solicitar()` | `Cita` (agencia, fechaDeseada) | `Prospecto` → `July` | CU 2.3.2 |
| 7 | **July** envía la confirmación de la cita al **Prospecto**. Fin. | `July` | envía → `Cita.enviarConfirmacion()` | `Cita` (fechaHora, agencia) | `July` → `Prospecto` | CU 2.3.2 |

<a id="cu-2-3-1"></a>
#### CU 2.3.1 · Evaluar al prospecto con reglas (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.1 Evaluación por reglas |
| Actor principal | Prospecto |
| Actores secundarios | Comité de crédito, Sistema core |
| Incluye | [CU 2.3.1.1](#cu-2-3-1-1), [CU 2.3.1.2](#cu-2-3-1-2), [CU 2.3.1.3](#cu-2-3-1-3) |
| Objetivo | Dar una respuesta preliminar y no vinculante sobre la viabilidad del crédito con las reglas aprobadas por el Comité de crédito. |
| Disparador | El prospecto pide saber si califica, después de simular. |
| Precondiciones | El perfil está completo (CU 2.1) y hay un escenario elegido (CU 2.2). El Comité de crédito aprobó la tabla de decisión vigente. |
| Postcondiciones | El prospecto quedó clasificado como apto, a revisar o no apto, y conoce el resultado. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** solicita la precalificación del escenario elegido a **July**. | `Prospecto` | solicita → `Precalificacion.solicitar()` | `Precalificacion` (escenarioElegido) | `Prospecto` → `July` | 2.3.1.1 |
| 2 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. | `July` | consulta → `ReglaPrecalificacion.consultar()` | `ReglaPrecalificacion` (version) | `July` → `ComiteCredito` | 2.3.1.1, 2.3.1.3 |
| 3 | **Comité de crédito** entrega las reglas de precalificación aprobadas en la tabla de decisión a **July**. | `ComiteCredito` | entrega → `ReglaPrecalificacion.entregar()` | `ReglaPrecalificacion` (limiteCapacidadPago, criterioClasificacion) | `ComiteCredito` → `July` | 2.3.1.1, 2.3.1.3 |
| 4 | **July** solicita la edad, la actividad y la condición de socio del prospecto al **Sistema core**. | `July` | solicita → `Socio.solicitarDatos()` | `Socio` (edad, actividad, condicionSocio) | `July` → `SistemaCore` | 2.3.1.2 |
| 5 | **Sistema core** responde la edad, la actividad registrada y la condición de socio a **July**. | `SistemaCore` | responde → `Socio.responderDatos()` | `Socio` (edad, actividad, condicionSocio) | `SistemaCore` → `July` | 2.3.1.2 |
| 6 | **July** calcula la capacidad de pago de la precalificación. | `July` | calcula → `Precalificacion.calcularCapacidadPago()` | `Precalificacion` (capacidadPago) | `July` (interno) | 2.3.1.1 |
| 7 | **July** clasifica la precalificación como apta o no apta según las reglas. | `July` | clasifica → `Precalificacion.clasificar()` | `Precalificacion` (clasificacion (apto, noApto)) | `July` (interno) | 2.3.1.3 |
| 8 | **July** comunica el resultado preliminar y no vinculante de la precalificación al **Prospecto**. Fin. | `July` | comunica → `Precalificacion.comunicarResultado()` | `Precalificacion` (clasificacion, resultado) | `July` → `Prospecto` | 2.3.1.1, 2.3.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El Sistema core no tiene registro del prospecto (reemplaza los pasos 5 y 6)* | | | | | |
| 5a | **Sistema core** responde la ausencia de registro del socio a **July**. | `SistemaCore` | responde → `Socio.responderSinRegistro()` | `Socio` (registro = no encontrado) | `SistemaCore` → `July` | 2.3.1.2 |
| 6a | **July** evalúa la precalificación solo con los datos declarados. Continúa en el paso 7. | `July` | evalúa → `Precalificacion.evaluarDatosDeclarados()` | `Precalificacion` (capacidadPago, resultadoCondicionado = sí) | `July` (interno) | 2.3.1.1 |
| | *A2 · El caso queda «a revisar» (reemplaza los pasos 7 y 8)* | | | | | |
| 7b | **July** clasifica la precalificación como «a revisar». | `July` | clasifica → `Precalificacion.clasificar()` | `Precalificacion` (clasificacion = aRevisar) | `July` (interno) | 2.3.1.3 |
| 8b | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. | `July` | envía → `CasoRevision.enviar()` | `CasoRevision` (precalificacion, motivo) | `July` → `ComiteCredito` | 2.3.1.3 |
| 9b | **Comité de crédito** registra el caso de revisión en su bandeja. | `ComiteCredito` | registra → `CasoRevision.registrar()` | `CasoRevision` (numeroCaso, estado = recibido) | `ComiteCredito` (interno) | 2.3.1.3 |
| 10b | **Comité de crédito** confirma el acuse de recepción del caso a **July**. | `ComiteCredito` | confirma → `AcuseRecepcion.confirmar()` | `AcuseRecepcion` (numeroCaso, fechaHora) | `ComiteCredito` → `July` | 2.3.1.3 |
| 11b | **July** informa el número del caso de revisión al **Prospecto**. Fin. | `July` | informa → `CasoRevision.informar()` | `CasoRevision` (numeroCaso, estado) | `July` → `Prospecto` | 2.3.1.3 |

<a id="cu-2-3-1-1"></a>
##### CU 2.3.1.1 · Evaluar la capacidad de pago (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.1](#cu-2-3-1), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.1.1 Capacidad de pago |
| Actor externo | Comité de crédito |
| Objetivo | Que July calcule la capacidad de pago con los límites aprobados por el Comité de crédito. |
| Pasos de CU 2.3.1 | 1, 2, 3, 6, 8, 6a |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la precalificación del escenario elegido a **July**. |
| 2 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. |
| 3 | **Comité de crédito** entrega las reglas de precalificación aprobadas en la tabla de decisión a **July**. |
| 6 | **July** calcula la capacidad de pago de la precalificación. |
| 8 | **July** comunica el resultado preliminar y no vinculante de la precalificación al **Prospecto**. Fin. |
| 6a | **July** evalúa la precalificación solo con los datos declarados. Continúa en el paso 7. |

<a id="cu-2-3-1-2"></a>
##### CU 2.3.1.2 · Revisar edad, actividad y condición de socio (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.1](#cu-2-3-1), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.1.2 Edad, actividad y socio |
| Actor externo | Sistema core |
| Objetivo | Que July obtenga del Sistema core la edad, la actividad y la condición de socio para la evaluación. |
| Pasos de CU 2.3.1 | 4, 5, 5a |

| Paso | Especificación |
|---|---|
| 4 | **July** solicita la edad, la actividad y la condición de socio del prospecto al **Sistema core**. |
| 5 | **Sistema core** responde la edad, la actividad registrada y la condición de socio a **July**. |
| 5a | **Sistema core** responde la ausencia de registro del socio a **July**. |

<a id="cu-2-3-1-3"></a>
##### CU 2.3.1.3 · Clasificar como apto, a revisar o no apto (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.1](#cu-2-3-1), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.1.3 Clasificación final |
| Actor externo | Comité de crédito |
| Objetivo | Que el prospecto quede clasificado según la tabla de decisión, y los casos dudosos lleguen al Comité de crédito. |
| Pasos de CU 2.3.1 | 2, 3, 7, 8, 7b, 8b, 9b, 10b, 11b |

| Paso | Especificación |
|---|---|
| 2 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. |
| 3 | **Comité de crédito** entrega las reglas de precalificación aprobadas en la tabla de decisión a **July**. |
| 7 | **July** clasifica la precalificación como apta o no apta según las reglas. |
| 8 | **July** comunica el resultado preliminar y no vinculante de la precalificación al **Prospecto**. Fin. |
| 7b | **July** clasifica la precalificación como «a revisar». |
| 8b | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. |
| 9b | **Comité de crédito** registra el caso de revisión en su bandeja. |
| 10b | **Comité de crédito** confirma el acuse de recepción del caso a **July**. |
| 11b | **July** informa el número del caso de revisión al **Prospecto**. Fin. |

<a id="cu-2-3-2"></a>
#### CU 2.3.2 · Recibir orientación sobre el resultado (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.2 Orientación y requisitos |
| Actor principal | Prospecto |
| Actores secundarios | Personal de agencia |
| Incluye | [CU 2.3.2.1](#cu-2-3-2-1), [CU 2.3.2.2](#cu-2-3-2-2), [CU 2.3.2.3](#cu-2-3-2-3) |
| Objetivo | Que el prospecto entienda su resultado, sepa qué documentos preparar (y cómo hacerse socio si no lo es) y reserve una cita en agencia. |
| Disparador | El prospecto recibe su resultado de precalificación (CU 2.3.1). |
| Precondiciones | Existe un resultado de precalificación. El Personal de agencia mantiene su agenda publicada. |
| Postcondiciones | El prospecto tiene la lista de documentos y una cita confirmada en agencia. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Prospecto** solicita la explicación del resultado de la precalificación a **July**. | `Prospecto` | solicita → `Precalificacion.solicitarExplicacion()` | `Precalificacion` (resultado) | `Prospecto` → `July` | 2.3.2.1 |
| 2 | **July** explica el resultado y los factores que pesaron al **Prospecto**. | `July` | explica → `Precalificacion.explicar()` | `Precalificacion` (resultado, factores) | `July` → `Prospecto` | 2.3.2.1 |
| 3 | **Prospecto** consulta los documentos que debe preparar a **July**. | `Prospecto` | consulta → `DocumentoRequerido.consultar()` | `DocumentoRequerido` (lineaCredito, condicionSocio) | `Prospecto` → `July` | 2.3.2.2 |
| 4 | **July** envía la lista de documentos requeridos para su línea y su condición de socio al **Prospecto**. | `July` | envía → `DocumentoRequerido.enviarLista()` | `DocumentoRequerido` (nombre) | `July` → `Prospecto` | 2.3.2.2 |
| 5 | **Prospecto** solicita una cita en la agencia de su preferencia a **July**. | `Prospecto` | solicita → `Cita.solicitar()` | `Cita` (agencia, fechaDeseada) | `Prospecto` → `July` | 2.3.2.3 |
| 6 | **July** consulta los horarios disponibles de la agencia para la fecha pedida al **Personal de agencia**. | `July` | consulta → `HorarioDisponible.consultar()` | `HorarioDisponible` (agencia, fecha) | `July` → `PersonalAgencia` | 2.3.2.3 |
| 7 | **Personal de agencia** entrega los horarios libres de su agenda a **July**. | `PersonalAgencia` | entrega → `HorarioDisponible.entregar()` | `HorarioDisponible` (fechaHora, disponible = sí) | `PersonalAgencia` → `July` | 2.3.2.3 |
| 8 | **July** ofrece los horarios disponibles al **Prospecto**. | `July` | ofrece → `HorarioDisponible.ofrecer()` | `HorarioDisponible` (fechaHora) | `July` → `Prospecto` | 2.3.2.3 |
| 9 | **Prospecto** selecciona un horario disponible a **July**. | `Prospecto` | selecciona → `HorarioDisponible.seleccionar()` | `HorarioDisponible` (fechaHora) | `Prospecto` → `July` | 2.3.2.3 |
| 10 | **July** reserva la cita en el horario elegido. | `July` | reserva → `Cita.reservar()` | `Cita` (fechaHora, agencia, estado = reservada) | `July` (interno) | 2.3.2.3 |
| 11 | **July** notifica la cita reservada al **Personal de agencia**. | `July` | notifica → `Cita.notificar()` | `Cita` (fechaHora, prospecto) | `July` → `PersonalAgencia` | 2.3.2.3 |
| 12 | **Personal de agencia** confirma la reserva de la cita a **July**. | `PersonalAgencia` | confirma → `Cita.confirmarReserva()` | `Cita` (estado = reservada) | `PersonalAgencia` → `July` | 2.3.2.3 |
| 13 | **July** envía la confirmación de la cita con la fecha, la hora y la agencia al **Prospecto**. Fin. | `July` | envía → `Cita.enviarConfirmacion()` | `Cita` (fechaHora, agencia) | `July` → `Prospecto` | 2.3.2.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El resultado es «no apto» (reemplaza el paso 2)* | | | | | |
| 2a | **July** explica el motivo del resultado «no apto» al **Prospecto**. | `July` | explica → `Precalificacion.explicarMotivo()` | `Precalificacion` (motivo) | `July` → `Prospecto` | 2.3.2.1 |
| 3a | **Prospecto** solicita una alternativa de monto o plazo a **July**. | `Prospecto` | solicita → `EscenarioSimulacion.solicitarAlternativa()` | `EscenarioSimulacion` (monto, plazo) | `Prospecto` → `July` | 2.3.2.1 |
| 4a | **July** sugiere un escenario de simulación con otro monto o plazo al **Prospecto**. Fin. El prospecto puede volver a simular en CU 2.2.1. | `July` | sugiere → `EscenarioSimulacion.sugerir()` | `EscenarioSimulacion` (monto, plazo, cuotaMensual) | `July` → `Prospecto` | 2.3.2.1 |
| | *A2 · El prospecto no es socio (reemplaza el paso 4)* | | | | | |
| 4b | **July** envía los requisitos de afiliación junto con los documentos del crédito al **Prospecto**. Continúa en el paso 5. | `July` | envía → `RequisitoAfiliacion.enviar()` | `RequisitoAfiliacion` (pasosAfiliacion, documentosAfiliacion, documentosCredito) | `July` → `Prospecto` | 2.3.2.2, 2.3.2.3 |
| | *A3 · No hay horarios libres en la fecha pedida (reemplaza los pasos 7 y 8)* | | | | | |
| 7c | **Personal de agencia** informa la falta de horarios libres en la fecha pedida a **July**. | `PersonalAgencia` | informa → `HorarioDisponible.informarSinDisponibilidad()` | `HorarioDisponible` (fecha, disponible = no) | `PersonalAgencia` → `July` | 2.3.2.3 |
| 8c | **July** ofrece las fechas libres más cercanas al **Prospecto**. Vuelve al paso 9. | `July` | ofrece → `HorarioDisponible.ofrecerCercanos()` | `HorarioDisponible` (fechaHora) | `July` → `Prospecto` | 2.3.2.3 |

<a id="cu-2-3-2-1"></a>
##### CU 2.3.2.1 · Recibir la explicación del resultado (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.2](#cu-2-3-2), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.2.1 Explicación del resultado |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el prospecto entienda su resultado y, si no es apto, reciba una alternativa de monto o plazo. |
| Pasos de CU 2.3.2 | 1, 2, 2a, 3a, 4a |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la explicación del resultado de la precalificación a **July**. |
| 2 | **July** explica el resultado y los factores que pesaron al **Prospecto**. |
| 2a | **July** explica el motivo del resultado «no apto» al **Prospecto**. |
| 3a | **Prospecto** solicita una alternativa de monto o plazo a **July**. |
| 4a | **July** sugiere un escenario de simulación con otro monto o plazo al **Prospecto**. Fin. El prospecto puede volver a simular en CU 2.2.1. |

<a id="cu-2-3-2-2"></a>
##### CU 2.3.2.2 · Consultar los documentos a preparar (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.2](#cu-2-3-2), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.2.2 Documentos a preparar |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el prospecto reciba la lista de documentos según su línea y su condición de socio. |
| Pasos de CU 2.3.2 | 3, 4, 4b |

| Paso | Especificación |
|---|---|
| 3 | **Prospecto** consulta los documentos que debe preparar a **July**. |
| 4 | **July** envía la lista de documentos requeridos para su línea y su condición de socio al **Prospecto**. |
| 4b | **July** envía los requisitos de afiliación junto con los documentos del crédito al **Prospecto**. Continúa en el paso 5. |

<a id="cu-2-3-2-3"></a>
##### CU 2.3.2.3 · Agendar una cita en agencia (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.3.2](#cu-2-3-2), dentro de [CU 2.3](#cu-2-3) |
| Capacidad | 2.3.2.3 Afiliación y cita |
| Actor externo | Personal de agencia |
| Objetivo | Que el prospecto reserve una cita confirmada en agencia y, si no es socio, sepa cómo afiliarse. |
| Pasos de CU 2.3.2 | 5, 6, 7, 8, 9, 10, 11, 12, 13, 4b, 7c, 8c |

| Paso | Especificación |
|---|---|
| 5 | **Prospecto** solicita una cita en la agencia de su preferencia a **July**. |
| 6 | **July** consulta los horarios disponibles de la agencia para la fecha pedida al **Personal de agencia**. |
| 7 | **Personal de agencia** entrega los horarios libres de su agenda a **July**. |
| 8 | **July** ofrece los horarios disponibles al **Prospecto**. |
| 9 | **Prospecto** selecciona un horario disponible a **July**. |
| 10 | **July** reserva la cita en el horario elegido. |
| 11 | **July** notifica la cita reservada al **Personal de agencia**. |
| 12 | **Personal de agencia** confirma la reserva de la cita a **July**. |
| 13 | **July** envía la confirmación de la cita con la fecha, la hora y la agencia al **Prospecto**. Fin. |
| 4b | **July** envía los requisitos de afiliación junto con los documentos del crédito al **Prospecto**. Continúa en el paso 5. |
| 7c | **Personal de agencia** informa la falta de horarios libres en la fecha pedida a **July**. |
| 8c | **July** ofrece las fechas libres más cercanas al **Prospecto**. Vuelve al paso 9. |

---

## Flujo de valor 3 · Entrega, seguimiento y conversión

**Actor principal:** Asesor comercial · **Objetivo del flujo:** Poner cada lead precalificado en manos de un asesor y llevarlo hasta el desembolso o la pérdida, con su estado sincronizado en el CRM.

<a id="cu-3-1"></a>
### CU 3.1 · Recibir la oportunidad precalificada (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Entrega de oportunidades |
| Capacidad | 3.1 Entrega de oportunidades |
| Actor principal | Asesor comercial |
| Incluye | [CU 3.1.1](#cu-3-1-1), [CU 3.1.2](#cu-3-1-2) |
| Objetivo | Que el asesor reciba la ficha completa del prospecto y el lead quede registrado una sola vez en el CRM. |
| Disparador | El asesor abre un lead precalificado. |
| Precondiciones | El prospecto completó la precalificación (flujo 2). |
| Postcondiciones | El asesor revisó la ficha y el lead existe en el CRM con su identificador enlazado en July. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** solicita la ficha del prospecto a **July**. | `AsesorComercial` | solicita → `FichaProspecto.solicitar()` | `FichaProspecto` (numeroSeguimiento) | `AsesorComercial` → `July` | CU 3.1.1 |
| 2 | **July** presenta la ficha consolidada con su prioridad y su historial al **Asesor comercial**. | `July` | presenta → `FichaProspecto.presentar()` | `FichaProspecto` (datos, simulacion, resultado, prioridad, historial) | `July` → `AsesorComercial` | CU 3.1.1 |
| 3 | **Asesor comercial** solicita el registro del lead en el CRM a **July**. | `AsesorComercial` | solicita → `Lead.solicitarRegistroCRM()` | `Lead` (fichaProspecto) | `AsesorComercial` → `July` | CU 3.1.2 |
| 4 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. | `July` | crea → `Lead.crear()` | `Lead` (fichaProspecto, cedula, telefono) | `July` → `CRMCooperativa` | CU 3.1.2 |
| 5 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. | `CRMCooperativa` | devuelve → `Lead.devolverIdentificador()` | `Lead` (idCRM) | `CRMCooperativa` → `July` | CU 3.1.2 |
| 6 | **July** confirma el registro del lead con su identificador del CRM al **Asesor comercial**. Fin. | `July` | confirma → `Lead.confirmarRegistro()` | `Lead` (idCRM, enlaceCRM) | `July` → `AsesorComercial` | CU 3.1.2 |

<a id="cu-3-1-1"></a>
#### CU 3.1.1 · Revisar la ficha del prospecto (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1 Generación de la ficha |
| Actor principal | Asesor comercial |
| Actores secundarios | Jefe comercial |
| Incluye | [CU 3.1.1.1](#cu-3-1-1-1), [CU 3.1.1.2](#cu-3-1-1-2), [CU 3.1.1.3](#cu-3-1-1-3) |
| Objetivo | Darle al asesor, en una sola ficha, todo lo que July sabe del prospecto, con su prioridad y su historial. |
| Disparador | El asesor abre un lead precalificado. |
| Precondiciones | El prospecto completó la precalificación (flujo 2). El Jefe comercial definió los criterios de prioridad. |
| Postcondiciones | El asesor tiene la ficha consolidada, priorizada y con el historial completo. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** solicita la ficha del prospecto por el número de seguimiento del lead a **July**. | `AsesorComercial` | solicita → `FichaProspecto.solicitar()` | `FichaProspecto` (numeroSeguimiento) | `AsesorComercial` → `July` | 3.1.1.1 |
| 2 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. | `July` | consulta → `CriterioPrioridad.consultar()` | `CriterioPrioridad` (version) | `July` → `JefeComercial` | 3.1.1.2 |
| 3 | **Jefe comercial** entrega los criterios de lead caliente, tibio y frío a **July**. | `JefeComercial` | entrega → `CriterioPrioridad.entregar()` | `CriterioPrioridad` (nivel, condicion) | `JefeComercial` → `July` | 3.1.1.2 |
| 4 | **July** consolida la ficha con datos, simulación, resultado y prioridad. | `July` | consolida → `FichaProspecto.consolidar()` | `FichaProspecto` (datos, simulacion, resultado, prioridad) | `July` (interno) | 3.1.1.1, 3.1.1.2 |
| 5 | **July** presenta la ficha consolidada del prospecto al **Asesor comercial**. | `July` | presenta → `FichaProspecto.presentar()` | `FichaProspecto` (datos, simulacion, resultado, prioridad) | `July` → `AsesorComercial` | 3.1.1.1, 3.1.1.2 |
| 6 | **Asesor comercial** solicita el historial de la conversación a **July**. | `AsesorComercial` | solicita → `Conversacion.solicitarHistorial()` | `Conversacion` (historial) | `AsesorComercial` → `July` | 3.1.1.3 |
| 7 | **July** adjunta el historial completo de la conversación en la ficha. | `July` | adjunta → `Conversacion.adjuntarHistorial()` | `Conversacion` (historial) | `July` (interno) | 3.1.1.3 |
| 8 | **July** presenta la ficha con el historial adjunto al **Asesor comercial**. Fin. | `July` | presenta → `FichaProspecto.presentar()` | `FichaProspecto` (historial) | `July` → `AsesorComercial` | 3.1.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · La ficha tiene datos incompletos (reemplaza el paso 5)* | | | | | |
| 5a | **July** presenta la ficha con los datos faltantes marcados al **Asesor comercial**. Continúa en el paso 6. | `July` | presenta → `FichaProspecto.presentarIncompleta()` | `FichaProspecto` (datosFaltantes) | `July` → `AsesorComercial` | 3.1.1.1 |

<a id="cu-3-1-1-1"></a>
##### CU 3.1.1.1 · Consolidar datos, simulación y resultado (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.1 Consolidación de datos |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que la ficha junte los datos, la simulación elegida y el resultado de la precalificación, marcando lo que falte. |
| Pasos de CU 3.1.1 | 1, 4, 5, 5a |

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** solicita la ficha del prospecto por el número de seguimiento del lead a **July**. |
| 4 | **July** consolida la ficha con datos, simulación, resultado y prioridad. |
| 5 | **July** presenta la ficha consolidada del prospecto al **Asesor comercial**. |
| 5a | **July** presenta la ficha con los datos faltantes marcados al **Asesor comercial**. Continúa en el paso 6. |

<a id="cu-3-1-1-2"></a>
##### CU 3.1.1.2 · Priorizar el lead (caliente, tibio, frío) (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.2 Priorización del lead |
| Actor externo | Jefe comercial |
| Objetivo | Que la ficha lleve la prioridad que resulta de los criterios del Jefe comercial. |
| Pasos de CU 3.1.1 | 2, 3, 4, 5 |

| Paso | Especificación |
|---|---|
| 2 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. |
| 3 | **Jefe comercial** entrega los criterios de lead caliente, tibio y frío a **July**. |
| 4 | **July** consolida la ficha con datos, simulación, resultado y prioridad. |
| 5 | **July** presenta la ficha consolidada del prospecto al **Asesor comercial**. |

<a id="cu-3-1-1-3"></a>
##### CU 3.1.1.3 · Adjuntar el historial de conversación (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.3 Historial de conversación |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el asesor vea en la ficha el historial completo de la conversación. |
| Pasos de CU 3.1.1 | 6, 7, 8 |

| Paso | Especificación |
|---|---|
| 6 | **Asesor comercial** solicita el historial de la conversación a **July**. |
| 7 | **July** adjunta el historial completo de la conversación en la ficha. |
| 8 | **July** presenta la ficha con el historial adjunto al **Asesor comercial**. Fin. |

<a id="cu-3-1-2"></a>
#### CU 3.1.2 · Registrar el lead en el CRM (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2 Integración con CRM |
| Actor principal | Asesor comercial |
| Actores secundarios | CRM de la cooperativa |
| Incluye | [CU 3.1.2.1](#cu-3-1-2-1), [CU 3.1.2.2](#cu-3-1-2-2), [CU 3.1.2.3](#cu-3-1-2-3) |
| Objetivo | Crear o actualizar el lead en el CRM a pedido del asesor, sin que nadie lo digite, sin duplicados y sin perderlo si el CRM falla. |
| Disparador | El asesor solicita registrar la ficha revisada en el CRM. |
| Precondiciones | La ficha del prospecto está generada (CU 3.1.1). |
| Postcondiciones | El lead existe una sola vez en el CRM, con su identificador enlazado en July, o el registro quedó pendiente. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** solicita el registro del lead en el CRM con la ficha revisada a **July**. | `AsesorComercial` | solicita → `Lead.solicitarRegistroCRM()` | `Lead` (fichaProspecto) | `AsesorComercial` → `July` | 3.1.2.1 |
| 2 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. | `July` | busca → `Lead.buscar()` | `Lead` (cedula, telefono) | `July` → `CRMCooperativa` | 3.1.2.2 |
| 3 | **CRM de la cooperativa** responde la ausencia de registro previo del lead a **July**. | `CRMCooperativa` | responde → `Lead.responderSinRegistro()` | `Lead` (registro = no encontrado) | `CRMCooperativa` → `July` | 3.1.2.2 |
| 4 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. | `July` | crea → `Lead.crear()` | `Lead` (fichaProspecto, cedula, telefono) | `July` → `CRMCooperativa` | 3.1.2.1 |
| 5 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. | `CRMCooperativa` | devuelve → `Lead.devolverIdentificador()` | `Lead` (idCRM) | `CRMCooperativa` → `July` | 3.1.2.1 |
| 6 | **July** confirma el registro del lead con su identificador del CRM al **Asesor comercial**. Fin. | `July` | confirma → `Lead.confirmarRegistro()` | `Lead` (idCRM, enlaceCRM) | `July` → `AsesorComercial` | 3.1.2.1 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El lead ya existe en el CRM (reemplaza los pasos 3 y 4)* | | | | | |
| 3a | **CRM de la cooperativa** responde con el registro existente del lead a **July**. | `CRMCooperativa` | responde → `Lead.responderRegistroExistente()` | `Lead` (idCRM) | `CRMCooperativa` → `July` | 3.1.2.2 |
| 4a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 5. | `July` | actualiza → `Lead.actualizar()` | `Lead` (idCRM, fichaProspecto) | `July` → `CRMCooperativa` | 3.1.2.1, 3.1.2.2 |
| | *A2 · El CRM falla (reemplaza el paso 5)* | | | | | |
| 5b | **CRM de la cooperativa** devuelve el error de integración a **July**. | `CRMCooperativa` | devuelve → `ErrorIntegracion.devolver()` | `ErrorIntegracion` (codigo, descripcion) | `CRMCooperativa` → `July` | 3.1.2.3 |
| 6b | **July** registra el intento fallido de envío del lead. | `July` | registra → `EnvioCRM.registrarIntento()` | `EnvioCRM` (intentos, esperaProgresiva) | `July` (interno) | 3.1.2.3 |
| 7b | **July** reintenta, tras la espera progresiva, el envío del lead al **CRM de la cooperativa**. Vuelve al paso 5. | `July` | reintenta → `EnvioCRM.reintentar()` | `EnvioCRM` (intentos) | `July` → `CRMCooperativa` | 3.1.2.3 |
| | *A3 · Se agotan los reintentos (reemplaza el paso 7b)* | | | | | |
| 7c | **July** marca como pendiente el envío del lead. | `July` | marca → `EnvioCRM.marcarPendiente()` | `EnvioCRM` (estado = pendiente) | `July` (interno) | 3.1.2.3 |
| 8c | **July** avisa el registro pendiente del lead al **Asesor comercial**. Fin. | `July` | avisa → `EnvioCRM.avisarPendiente()` | `EnvioCRM` (estado = pendiente, intentos) | `July` → `AsesorComercial` | 3.1.2.3 |

<a id="cu-3-1-2-1"></a>
##### CU 3.1.2.1 · Crear o actualizar el lead en el CRM (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.1 Alta o actualización |
| Actor externo | CRM de la cooperativa |
| Objetivo | Que el lead quede creado o actualizado en el CRM, con su identificador enlazado en July. |
| Pasos de CU 3.1.2 | 1, 4, 5, 6, 4a |

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** solicita el registro del lead en el CRM con la ficha revisada a **July**. |
| 4 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. |
| 5 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. |
| 6 | **July** confirma el registro del lead con su identificador del CRM al **Asesor comercial**. Fin. |
| 4a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 5. |

<a id="cu-3-1-2-2"></a>
##### CU 3.1.2.2 · Controlar registros duplicados (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.2 Control de duplicados |
| Actor externo | CRM de la cooperativa |
| Objetivo | Que July busque el lead por cédula y teléfono antes de crearlo, para no duplicarlo. |
| Pasos de CU 3.1.2 | 2, 3, 3a, 4a |

| Paso | Especificación |
|---|---|
| 2 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. |
| 3 | **CRM de la cooperativa** responde la ausencia de registro previo del lead a **July**. |
| 3a | **CRM de la cooperativa** responde con el registro existente del lead a **July**. |
| 4a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 5. |

<a id="cu-3-1-2-3"></a>
##### CU 3.1.2.3 · Reintentar el envío ante fallos (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.3 Reintentos ante fallos |
| Actor externo | CRM de la cooperativa |
| Objetivo | Que un fallo del CRM se reintente con espera progresiva y, si se agotan los intentos, el asesor sepa que el registro quedó pendiente. |
| Pasos de CU 3.1.2 | 5b, 6b, 7b, 7c, 8c |

| Paso | Especificación |
|---|---|
| 5b | **CRM de la cooperativa** devuelve el error de integración a **July**. |
| 6b | **July** registra el intento fallido de envío del lead. |
| 7b | **July** reintenta, tras la espera progresiva, el envío del lead al **CRM de la cooperativa**. Vuelve al paso 5. |
| 7c | **July** marca como pendiente el envío del lead. |
| 8c | **July** avisa el registro pendiente del lead al **Asesor comercial**. Fin. |

<a id="cu-3-2"></a>
### CU 3.2 · Dar seguimiento al lead hasta su cierre (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Asignación y seguimiento |
| Capacidad | 3.2 Asignación y seguimiento |
| Actor principal | Asesor comercial |
| Incluye | [CU 3.2.1](#cu-3-2-1), [CU 3.2.2](#cu-3-2-2) |
| Objetivo | Que cada lead llegue al asesor correcto y se cierre como desembolsado o perdido, con el embudo comercial actualizado. |
| Disparador | El asesor marca su disponibilidad para recibir leads. |
| Precondiciones | El lead está en el CRM (CU 3.1.2). |
| Postcondiciones | El lead quedó cerrado en July y en el CRM, y el embudo del Jefe comercial está actualizado. |

**Flujo**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | Caso incluido |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** marca su disponibilidad para recibir leads a **July**. | `AsesorComercial` | marca → `AsesorComercial.marcarDisponibilidad()` | `AsesorComercial` (disponibilidad = sí) | `AsesorComercial` → `July` | CU 3.2.1 |
| 2 | **July** asigna el lead según la regla de enrutamiento. | `July` | asigna → `AsignacionLead.asignar()` | `AsignacionLead` (asesor, plazoAtencion) | `July` (interno) | CU 3.2.1 |
| 3 | **July** notifica el lead asignado al **Asesor comercial**. | `July` | notifica → `Lead.notificar()` | `Lead` (numeroSeguimiento, prioridad) | `July` → `AsesorComercial` | CU 3.2.1 |
| 4 | **Asesor comercial** registra el estado final del lead a **July**. | `AsesorComercial` | registra → `Lead.registrarEstadoFinal()` | `Lead` (estado, motivoCierre) | `AsesorComercial` → `July` | CU 3.2.2 |
| 5 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. | `July` | sincroniza → `Lead.sincronizarEstado()` | `Lead` (estado, motivoCierre) | `July` → `CRMCooperativa` | CU 3.2.2 |
| 6 | **CRM de la cooperativa** actualiza el embudo comercial al **Jefe comercial**. Fin. | `CRMCooperativa` | actualiza → `EmbudoComercial.actualizar()` | `EmbudoComercial` (leadsPorEstado) | `CRMCooperativa` → `JefeComercial` | CU 3.2.2 |

<a id="cu-3-2-1"></a>
#### CU 3.2.1 · Recibir el lead asignado (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.1 Asignación a asesor |
| Actor principal | Asesor comercial |
| Actores secundarios | Jefe comercial, Prospecto |
| Incluye | [CU 3.2.1.1](#cu-3-2-1-1), [CU 3.2.1.2](#cu-3-2-1-2), [CU 3.2.1.3](#cu-3-2-1-3) |
| Objetivo | Poner cada lead en manos del asesor correcto, avisarle y que continúe la conversación sin volver a pedir datos. |
| Disparador | Hay un lead registrado en el CRM sin asesor asignado. |
| Precondiciones | El lead está en el CRM (CU 3.1.2). El Jefe comercial definió las reglas de enrutamiento. |
| Postcondiciones | El lead tiene un asesor asignado que ya continúa la conversación con el prospecto. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** marca su disponibilidad para recibir leads a **July**. | `AsesorComercial` | marca → `AsesorComercial.marcarDisponibilidad()` | `AsesorComercial` (disponibilidad = sí) | `AsesorComercial` → `July` | 3.2.1.1 |
| 2 | **July** consulta las reglas de enrutamiento por agencia, producto y carga al **Jefe comercial**. | `July` | consulta → `ReglaEnrutamiento.consultar()` | `ReglaEnrutamiento` (agencia, producto, carga) | `July` → `JefeComercial` | 3.2.1.1 |
| 3 | **Jefe comercial** entrega la regla de enrutamiento aplicable al lead a **July**. | `JefeComercial` | entrega → `ReglaEnrutamiento.entregar()` | `ReglaEnrutamiento` (agencia, producto, carga) | `JefeComercial` → `July` | 3.2.1.1 |
| 4 | **July** asigna el lead según la regla de enrutamiento. | `July` | asigna → `AsignacionLead.asignar()` | `AsignacionLead` (asesor, fechaAsignacion, plazoAtencion) | `July` (interno) | 3.2.1.1 |
| 5 | **July** notifica el lead asignado con su plazo de atención al **Asesor comercial**. | `July` | notifica → `Lead.notificar()` | `Lead` (numeroSeguimiento, prioridad, plazoAtencion) | `July` → `AsesorComercial` | 3.2.1.2 |
| 6 | **Asesor comercial** acepta la asignación del lead a **July**. | `AsesorComercial` | acepta → `AsignacionLead.aceptar()` | `AsignacionLead` (fechaAceptacion) | `AsesorComercial` → `July` | 3.2.1.3 |
| 7 | **July** traspasa la conversación, con su historial, a la bandeja del asesor asignado. | `July` | traspasa → `Conversacion.traspasar()` | `Conversacion` (historial, asesorAsignado) | `July` (interno) | 3.2.1.3 |
| 8 | **July** avisa el cambio de asesor de la conversación al **Prospecto**. | `July` | avisa → `Conversacion.avisarCambioAsesor()` | `Conversacion` (asesorAsignado) | `July` → `Prospecto` | 3.2.1.3 |
| 9 | **Prospecto** continúa la conversación con el **Asesor comercial**. Fin. | `Prospecto` | continúa → `Conversacion.continuar()` | `Conversacion` (mensaje) | `Prospecto` → `AsesorComercial` | 3.2.1.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El asesor no acepta el lead a tiempo (reemplaza el paso 6)* | | | | | |
| 6a | **Asesor comercial** deja vencer el plazo de atención de la asignación a **July**. | `AsesorComercial` | deja vencer → `AsignacionLead.vencerPlazo()` | `AsignacionLead` (plazoAtencion, estado = vencida) | `AsesorComercial` → `July` | 3.2.1.2 |
| 7a | **July** reasigna el lead según la regla de enrutamiento. | `July` | reasigna → `AsignacionLead.reasignar()` | `AsignacionLead` (asesorSiguiente, plazoAtencion) | `July` (interno) | 3.2.1.1 |
| 8a | **July** informa la reasignación del lead al **Jefe comercial**. Fin. | `July` | informa → `AsignacionLead.informarReasignacion()` | `AsignacionLead` (asesorAnterior, asesorNuevo) | `July` → `JefeComercial` | 3.2.1.1 |

<a id="cu-3-2-1-1"></a>
##### CU 3.2.1.1 · Enrutar por agencia, producto o carga (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.1](#cu-3-2-1), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.1.1 Enrutamiento |
| Actor externo | Jefe comercial |
| Objetivo | Que el lead se asigne, o se reasigne, al asesor que indica la regla de enrutamiento. |
| Pasos de CU 3.2.1 | 1, 2, 3, 4, 7a, 8a |

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** marca su disponibilidad para recibir leads a **July**. |
| 2 | **July** consulta las reglas de enrutamiento por agencia, producto y carga al **Jefe comercial**. |
| 3 | **Jefe comercial** entrega la regla de enrutamiento aplicable al lead a **July**. |
| 4 | **July** asigna el lead según la regla de enrutamiento. |
| 7a | **July** reasigna el lead según la regla de enrutamiento. |
| 8a | **July** informa la reasignación del lead al **Jefe comercial**. Fin. |

<a id="cu-3-2-1-2"></a>
##### CU 3.2.1.2 · Notificar al asesor del lead nuevo (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.1](#cu-3-2-1), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.1.2 Notificación al asesor |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que el asesor reciba el aviso del lead asignado con su plazo de atención. |
| Pasos de CU 3.2.1 | 5, 6a |

| Paso | Especificación |
|---|---|
| 5 | **July** notifica el lead asignado con su plazo de atención al **Asesor comercial**. |
| 6a | **Asesor comercial** deja vencer el plazo de atención de la asignación a **July**. |

<a id="cu-3-2-1-3"></a>
##### CU 3.2.1.3 · Tomar la conversación con su historial (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.1](#cu-3-2-1), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.1.3 Traspaso con contexto |
| Actor externo | Prospecto |
| Objetivo | Que el asesor continúe la conversación con el prospecto desde el historial, sin volver a pedir datos. |
| Pasos de CU 3.2.1 | 6, 7, 8, 9 |

| Paso | Especificación |
|---|---|
| 6 | **Asesor comercial** acepta la asignación del lead a **July**. |
| 7 | **July** traspasa la conversación, con su historial, a la bandeja del asesor asignado. |
| 8 | **July** avisa el cambio de asesor de la conversación al **Prospecto**. |
| 9 | **Prospecto** continúa la conversación con el **Asesor comercial**. Fin. |

<a id="cu-3-2-2"></a>
#### CU 3.2.2 · Hacer seguimiento y cerrar el lead (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2 Seguimiento y cierre |
| Actor principal | Asesor comercial |
| Actores secundarios | Prospecto, WhatsApp Business API, Personal de agencia, Comité de crédito, CRM de la cooperativa, Jefe comercial |
| Incluye | [CU 3.2.2.1](#cu-3-2-2-1), [CU 3.2.2.2](#cu-3-2-2-2), [CU 3.2.2.3](#cu-3-2-2-3) |
| Objetivo | Llevar el lead hasta el desembolso o la pérdida: recordar pendientes, confirmar la cita, resolver el crédito y registrar el cierre con su motivo. |
| Disparador | El asesor tiene un lead asignado con documentos o cita pendientes. |
| Precondiciones | El lead está asignado (CU 3.2.1) y tiene una cita reservada (CU 2.3.2). |
| Postcondiciones | El lead quedó cerrado (desembolsado o perdido, con motivo) en July y en el CRM, y el embudo del Jefe comercial está actualizado. |

**Flujo principal**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| 1 | **Asesor comercial** programa el recordatorio de documentos y cita a **July**. | `AsesorComercial` | programa → `Recordatorio.programar()` | `Recordatorio` (documentos, cita, fechaEnvio) | `AsesorComercial` → `July` | 3.2.2.1 |
| 2 | **July** envía la plantilla de recordatorio a **WhatsApp Business API**. | `July` | envía → `PlantillaMensaje.enviar()` | `PlantillaMensaje` (tipo = recordatorio, documentos, cita) | `July` → `WhatsAppBusinessAPI` | 3.2.2.1 |
| 3 | **WhatsApp Business API** entrega el recordatorio de documentos y cita al **Prospecto**. | `WhatsAppBusinessAPI` | entrega → `Recordatorio.entregar()` | `Recordatorio` (documentos, cita) | `WhatsAppBusinessAPI` → `Prospecto` | 3.2.2.1 |
| 4 | **Prospecto** confirma su asistencia a la cita a **July**. | `Prospecto` | confirma → `Cita.confirmarAsistencia()` | `Cita` (asistencia = sí) | `Prospecto` → `July` | 3.2.2.2 |
| 5 | **July** notifica la asistencia confirmada del prospecto al **Personal de agencia**. | `July` | notifica → `Cita.notificarAsistencia()` | `Cita` (fechaHora, asistencia) | `July` → `PersonalAgencia` | 3.2.2.2 |
| 6 | **Personal de agencia** atiende la cita del prospecto en la agencia. | `PersonalAgencia` | atiende → `Cita.atender()` | `Cita` (estado = atendida) | `PersonalAgencia` (interno) | 3.2.2.2 |
| 7 | **Personal de agencia** reporta los documentos recibidos al **Asesor comercial**. | `PersonalAgencia` | reporta → `DocumentoRequerido.reportarRecibido()` | `DocumentoRequerido` (nombre, recibido = sí) | `PersonalAgencia` → `AsesorComercial` | 3.2.2.2 |
| 8 | **Asesor comercial** envía la solicitud de crédito completa para su resolución al **Comité de crédito**. | `AsesorComercial` | envía → `SolicitudCredito.enviar()` | `SolicitudCredito` (monto, plazo, destino, documentos) | `AsesorComercial` → `ComiteCredito` | 3.2.2.3 |
| 9 | **Comité de crédito** comunica la resolución del crédito al **Asesor comercial**. | `ComiteCredito` | comunica → `ResolucionCredito.comunicar()` | `ResolucionCredito` (decision, fecha) | `ComiteCredito` → `AsesorComercial` | 3.2.2.3 |
| 10 | **Asesor comercial** registra el estado final del lead (desembolsado o perdido, con motivo) a **July**. | `AsesorComercial` | registra → `Lead.registrarEstadoFinal()` | `Lead` (estado, motivoCierre) | `AsesorComercial` → `July` | 3.2.2.3 |
| 11 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. | `July` | sincroniza → `Lead.sincronizarEstado()` | `Lead` (estado, motivoCierre) | `July` → `CRMCooperativa` | 3.2.2.3 |
| 12 | **CRM de la cooperativa** actualiza el embudo comercial al **Jefe comercial**. Fin. | `CRMCooperativa` | actualiza → `EmbudoComercial.actualizar()` | `EmbudoComercial` (leadsPorEstado) | `CRMCooperativa` → `JefeComercial` | 3.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo → entidad (atributos) | Relación (sujeto → receptor) | CU nivel 3 |
|---|---|---|---|---|---|---|
| | *A1 · El prospecto no responde al recordatorio (reemplaza el paso 4)* | | | | | |
| 4a | **Prospecto** deja sin respuesta el recordatorio a **July**. | `Prospecto` | deja sin respuesta → `Recordatorio.dejarSinRespuesta()` | `Recordatorio` (respondido = no) | `Prospecto` → `July` | 3.2.2.1 |
| 5a | **July** envía la plantilla de reactivación a **WhatsApp Business API**. Vuelve al paso 3. | `July` | envía → `PlantillaMensaje.enviarReactivacion()` | `PlantillaMensaje` (tipo = reactivacion) | `July` → `WhatsAppBusinessAPI` | 3.2.2.1 |
| | *A2 · Se agotan los intentos de reactivación (reemplaza el paso 5a)* | | | | | |
| 5b | **July** marca el lead como frío. | `July` | marca → `Lead.marcarFrio()` | `Lead` (prioridad = frio) | `July` (interno) | 3.2.2.1, 3.2.2.3 |
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 10. | `July` | informa → `Lead.informarFrio()` | `Lead` (prioridad, intentosReactivacion) | `July` → `AsesorComercial` | 3.2.2.1, 3.2.2.3 |
| | *A3 · El prospecto pide cambiar la cita (reemplaza el paso 4)* | | | | | |
| 4c | **Prospecto** solicita el cambio de fecha de la cita a **July**. | `Prospecto` | solicita → `Cita.solicitarCambio()` | `Cita` (fechaNueva) | `Prospecto` → `July` | 3.2.2.2 |
| 5c | **July** consulta los horarios disponibles para la fecha nueva al **Personal de agencia**. | `July` | consulta → `HorarioDisponible.consultar()` | `HorarioDisponible` (agencia, fecha) | `July` → `PersonalAgencia` | 3.2.2.2 |
| 6c | **Personal de agencia** confirma el horario disponible para la fecha nueva a **July**. | `PersonalAgencia` | confirma → `HorarioDisponible.confirmar()` | `HorarioDisponible` (fechaHora) | `PersonalAgencia` → `July` | 3.2.2.2 |
| 7c | **July** reprograma la cita en el horario confirmado. | `July` | reprograma → `Cita.reprogramar()` | `Cita` (fechaHora, estado = reprogramada) | `July` (interno) | 3.2.2.2 |
| 8c | **July** envía la cita reprogramada al **Prospecto**. Vuelve al paso 4. | `July` | envía → `Cita.enviarReprogramacion()` | `Cita` (fechaHora, agencia) | `July` → `Prospecto` | 3.2.2.2 |

<a id="cu-3-2-2-1"></a>
##### CU 3.2.2.1 · Enviar recordatorios y reactivar (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.2](#cu-3-2-2), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2.1 Recordatorios y reactivación |
| Actor externo | Prospecto, WhatsApp Business API |
| Objetivo | Que el prospecto reciba recordatorios de documentos y cita, y que un lead que no responde se reactive o pase a frío. |
| Pasos de CU 3.2.2 | 1, 2, 3, 4a, 5a, 5b, 6b |

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** programa el recordatorio de documentos y cita a **July**. |
| 2 | **July** envía la plantilla de recordatorio a **WhatsApp Business API**. |
| 3 | **WhatsApp Business API** entrega el recordatorio de documentos y cita al **Prospecto**. |
| 4a | **Prospecto** deja sin respuesta el recordatorio a **July**. |
| 5a | **July** envía la plantilla de reactivación a **WhatsApp Business API**. Vuelve al paso 3. |
| 5b | **July** marca el lead como frío. |
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 10. |

<a id="cu-3-2-2-2"></a>
##### CU 3.2.2.2 · Confirmar la cita en agencia (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.2](#cu-3-2-2), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2.2 Confirmación de citas |
| Actor externo | Prospecto, Personal de agencia |
| Objetivo | Que la asistencia a la cita quede confirmada, o la cita reprogramada, y la agencia reporte los documentos recibidos. |
| Pasos de CU 3.2.2 | 4, 5, 6, 7, 4c, 5c, 6c, 7c, 8c |

| Paso | Especificación |
|---|---|
| 4 | **Prospecto** confirma su asistencia a la cita a **July**. |
| 5 | **July** notifica la asistencia confirmada del prospecto al **Personal de agencia**. |
| 6 | **Personal de agencia** atiende la cita del prospecto en la agencia. |
| 7 | **Personal de agencia** reporta los documentos recibidos al **Asesor comercial**. |
| 4c | **Prospecto** solicita el cambio de fecha de la cita a **July**. |
| 5c | **July** consulta los horarios disponibles para la fecha nueva al **Personal de agencia**. |
| 6c | **Personal de agencia** confirma el horario disponible para la fecha nueva a **July**. |
| 7c | **July** reprograma la cita en el horario confirmado. |
| 8c | **July** envía la cita reprogramada al **Prospecto**. Vuelve al paso 4. |

<a id="cu-3-2-2-3"></a>
##### CU 3.2.2.3 · Actualizar el estado y registrar el cierre (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.2](#cu-3-2-2), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2.3 Estados y cierre |
| Actor externo | CRM de la cooperativa, Jefe comercial, Comité de crédito |
| Objetivo | Que la solicitud se resuelva, el lead se cierre con su motivo y el estado quede sincronizado en el CRM y en el embudo. |
| Pasos de CU 3.2.2 | 8, 9, 10, 11, 12, 5b, 6b |

| Paso | Especificación |
|---|---|
| 8 | **Asesor comercial** envía la solicitud de crédito completa para su resolución al **Comité de crédito**. |
| 9 | **Comité de crédito** comunica la resolución del crédito al **Asesor comercial**. |
| 10 | **Asesor comercial** registra el estado final del lead (desembolsado o perdido, con motivo) a **July**. |
| 11 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. |
| 12 | **CRM de la cooperativa** actualiza el embudo comercial al **Jefe comercial**. Fin. |
| 5b | **July** marca el lead como frío. |
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 10. |
