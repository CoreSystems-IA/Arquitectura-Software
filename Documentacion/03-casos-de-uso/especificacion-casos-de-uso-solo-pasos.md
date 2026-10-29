# Especificación de casos de uso · July (solo pasos)

**ID:** CU-09 · **Versión:** 1.0 · **Fecha:** 2026-10-29 · **Estado:** Borrador
**Deriva de:** CU-08 ([`especificaciones-casos-de-uso.md`](especificaciones-casos-de-uso.md))
**Uso:** lectura de los casos de uso sin la descomposición en sujeto, método, entidad y relación

Los 63 casos de uso de July (7 de nivel 1, 14 de nivel 2 y 42 de nivel 3) en el orden de CU-08, con su ficha y solo la oración de cada paso. La descomposición de cada paso en sujeto, verbo → método, sustantivo → entidad y relación, las convenciones de redacción y la correspondencia con los servicios ArchiMate están en CU-08; si cambia un paso, se cambia primero en CU-08 y luego aquí.

---

## Reglas transversales

Valen en cualquier paso de cualquier caso; por eso no tienen número de paso propio.

| Regla | Especificación |
|---|---|
| R1 · Consentimiento previo | **July** no pide ni guarda datos personales (identidad, contacto, ingresos) mientras el consentimiento no esté aceptado (CU 1.2.1.2). Sin consentimiento solo ofrece el menú básico. |
| R2 · Retiro del consentimiento | Si el **Prospecto** escribe que retira su consentimiento, **July** lo registra como rechazado, deja de pedir datos personales y avisa al **Delegado de protección de datos**, que atiende la eliminación o rectificación fuera de July. |

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
| 3 · Entrega, seguimiento y conversión | [CU 3.1 Recibir la oportunidad precalificada](#cu-3-1) | [CU 3.1.1 Generar la ficha del prospecto](#cu-3-1-1) | [3.1.1.1](#cu-3-1-1-1) · [3.1.1.2](#cu-3-1-1-2) · [3.1.1.3](#cu-3-1-1-3) |
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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía la consulta por WhatsApp o por el sitio web a **July**. |
| 2 | **July** etiqueta el origen de la conversación con su canal y su campaña. |
| 3 | **July** convierte el mensaje de la consulta al formato común. |
| 4 | **July** envía la respuesta inmediata al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** escribe la consulta a **WhatsApp Business API**. |
| 2 | **WhatsApp Business API** entrega el mensaje de la consulta con el teléfono del remitente a **July**. |
| 3 | **July** etiqueta el origen de la conversación con el canal WhatsApp y la campaña del mensaje. |
| 4 | **July** reporta el origen de la conversación al **Equipo de marketing**. Fin. |

**Flujos alternativos**

*A1 · El prospecto llega por el sitio web (reemplaza los pasos 1 y 2)*

| Paso | Especificación |
|---|---|
| 1a | **Prospecto** abre la sesión de chat desde una página del sitio con el **Widget web**. |
| 2a | **Widget web** confirma la sesión de chat abierta al **Prospecto**. |
| 3a | **Prospecto** escribe la consulta al **Widget web**. |
| 4a | **Widget web** entrega el mensaje de la consulta con la página de origen a **July**. Continúa en el paso 3. |

*A2 · El mensaje no trae campaña (reemplaza el paso 3)*

| Paso | Especificación |
|---|---|
| 3b | **July** etiqueta el origen de la conversación como «origen directo». |
| 4b | **July** reporta el origen directo de la conversación al **Equipo de marketing**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía un mensaje de texto, audio o imagen a **WhatsApp Business API**. |
| 2 | **WhatsApp Business API** notifica el mensaje nuevo con un webhook firmado a **July**. |
| 3 | **July** verifica la firma del webhook con su clave. |
| 4 | **July** confirma el acuse de recepción del webhook a **WhatsApp Business API**. |
| 5 | **WhatsApp Business API** entrega el contenido del mensaje con sus adjuntos a **July**. |
| 6 | **July** convierte el mensaje al formato común. |
| 7 | **July** responde el mensaje de inmediato al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · El mensaje llega por el sitio web (reemplaza los pasos 1 a 5)*

| Paso | Especificación |
|---|---|
| 1a | **Prospecto** envía un mensaje de texto al **Widget web**. |
| 2a | **Widget web** entrega el mensaje con el token de la sesión de chat a **July**. |
| 3a | **July** valida el token de la sesión de chat. Continúa en el paso 6. |

*A2 · La firma del webhook no es válida (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4b | **July** rechaza el webhook con firma inválida. |
| 5b | **July** devuelve el error de integración de firma inválida a **WhatsApp Business API**. Fin. |

*A3 · Hay un pico de demanda (reemplaza el paso 7)*

| Paso | Especificación |
|---|---|
| 7c | **July** encola el mensaje en la cola de atención. |
| 8c | **July** avisa el tiempo de espera de la cola de atención al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía el saludo inicial a **July**. |
| 2 | **July** presenta el guion de bienvenida con el aviso de privacidad al **Prospecto**. |
| 3 | **Prospecto** acepta el aviso de privacidad a **July**. |
| 4 | **July** muestra el menú de opciones al **Prospecto**. |
| 5 | **Prospecto** describe la necesidad de crédito a **July**. |
| 6 | **July** registra el lead con su intención y su condición de socio. |
| 7 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** envía el saludo inicial a **July**. |
| 2 | **July** consulta el guion de bienvenida vigente al **Administrador del asistente**. |
| 3 | **Administrador del asistente** entrega el guion de bienvenida publicado a **July**. |
| 4 | **July** presenta el saludo del guion de bienvenida con el aviso de privacidad al **Prospecto**. |
| 5 | **Prospecto** acepta el aviso de privacidad a **July**. |
| 6 | **July** registra el consentimiento aceptado con la versión del aviso. |
| 7 | **July** muestra el menú de opciones completo al **Prospecto**. |
| 8 | **Prospecto** selecciona una opción del menú a **July**. Fin. |

**Flujos alternativos**

*A1 · El prospecto no acepta el aviso (reemplaza el paso 5)*

| Paso | Especificación |
|---|---|
| 5a | **Prospecto** rechaza el aviso de privacidad a **July**. |
| 6a | **July** registra el consentimiento rechazado con la versión del aviso. |
| 7a | **July** muestra el menú básico de información general al **Prospecto**. Fin. |

*A2 · El prospecto pide hablar con una persona (reemplaza el paso 8)*

| Paso | Especificación |
|---|---|
| 8b | **Prospecto** solicita la derivación de la conversación a **July**. |
| 9b | **July** envía la derivación con el historial de la conversación al **Asesor comercial**. |
| 10b | **Asesor comercial** acepta la derivación a **July**. |
| 11b | **July** traspasa la conversación con su historial al **Asesor comercial**. |
| 12b | **Asesor comercial** envía el saludo del asesor al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** describe la necesidad de crédito a **July**. |
| 2 | **July** identifica la intención de crédito. |
| 3 | **July** solicita la confirmación de la línea de crédito detectada al **Prospecto**. |
| 4 | **Prospecto** confirma la línea de crédito a **July**. |
| 5 | **July** consulta la condición de socio por el teléfono del prospecto al **Sistema core**. |
| 6 | **Sistema core** responde la condición de socio y la fecha de ingreso a **July**. |
| 7 | **July** registra el lead con su intención y su condición de socio. |
| 8 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · July no reconoce la intención (reemplaza el paso 3)*

| Paso | Especificación |
|---|---|
| 3a | **July** reformula la pregunta con las líneas de crédito como opciones cerradas al **Prospecto**. Vuelve al paso 4. |

*A2 · Es una pregunta frecuente, no una solicitud de crédito (reemplaza el paso 3)*

| Paso | Especificación |
|---|---|
| 3b | **July** responde la pregunta frecuente al **Prospecto**. Fin. |

*A3 · El Sistema core no responde a tiempo (reemplaza el paso 6)*

| Paso | Especificación |
|---|---|
| 6c | **Sistema core** devuelve el error de integración por tiempo de espera agotado a **July**. |
| 7c | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. |

*A4 · El prospecto llegó por el widget web y aún no hay teléfono (reemplaza los pasos 5 a 7)*

| Paso | Especificación |
|---|---|
| 5d | **July** registra el lead con la condición «socio por verificar». Continúa en el paso 8. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito a **July**. |
| 2 | **July** solicita los datos de la solicitud de crédito al **Prospecto**. |
| 3 | **Prospecto** entrega los datos de la solicitud de crédito a **July**. |
| 4 | **July** valida los datos de la solicitud de crédito. |
| 5 | **July** guarda el avance de la conversación. |
| 6 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 7 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |

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
| Postcondiciones | July tiene monto, plazo, destino, identidad, contacto, ingresos y actividad confirmados por el prospecto. |

Primero se piden el monto, el plazo y el destino: con ellos el prospecto ya puede simular (CU 2.2) antes de dar sus datos personales. Si lo pide, July atiende la simulación y luego retoma la captura con el siguiente dato pendiente. July no vuelve a pedir lo que ya tiene (el teléfono de quien llegó por WhatsApp o los datos registrados del socio).

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito para la línea confirmada a **July**. |
| 2 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. |
| 3 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. |
| 4 | **July** solicita los nombres, la cédula, el correo y el teléfono al **Prospecto**. |
| 5 | **Prospecto** entrega los nombres, la cédula, el correo y el teléfono a **July**. |
| 6 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. |
| 7 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |

**Flujos alternativos**

*A1 · El prospecto ya es socio (reemplaza los pasos 4 y 5)*

| Paso | Especificación |
|---|---|
| 4a | **July** muestra los nombres, la cédula, el correo y el teléfono registrados del socio al **Prospecto**. |
| 5a | **Prospecto** confirma los nombres, la cédula, el correo y el teléfono registrados a **July**. Continúa en el paso 6. |

*A2 · El prospecto corrige un dato del resumen (reemplaza el paso 10)*

| Paso | Especificación |
|---|---|
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. |

<a id="cu-2-1-1-1"></a>
##### CU 2.1.1.1 · Registrar identidad y contacto (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.1](#cu-2-1-1), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1.1 Identidad y contacto |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July tenga los nombres, la cédula, el correo y el teléfono del prospecto, confirmados por él. |
| Pasos de CU 2.1.1 | 4, 5, 8, 9, 10, 4a, 5a, 10b |

| Paso | Especificación |
|---|---|
| 4 | **July** solicita los nombres, la cédula, el correo y el teléfono al **Prospecto**. |
| 5 | **Prospecto** entrega los nombres, la cédula, el correo y el teléfono a **July**. |
| 8 | **July** resume la solicitud de crédito con todos los datos recibidos. |
| 9 | **July** solicita la confirmación del resumen de la solicitud al **Prospecto**. |
| 10 | **Prospecto** confirma el resumen de la solicitud a **July**. Fin. |
| 4a | **July** muestra los nombres, la cédula, el correo y el teléfono registrados del socio al **Prospecto**. |
| 5a | **Prospecto** confirma los nombres, la cédula, el correo y el teléfono registrados a **July**. Continúa en el paso 6. |
| 10b | **Prospecto** corrige el dato equivocado de la solicitud a **July**. Vuelve al paso 8. |

<a id="cu-2-1-1-2"></a>
##### CU 2.1.1.2 · Declarar ingresos y actividad (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 2.1.1](#cu-2-1-1), dentro de [CU 2.1](#cu-2-1) |
| Capacidad | 2.1.1.2 Ingresos y actividad |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que July tenga los ingresos mensuales y la actividad económica que declara el prospecto. |
| Pasos de CU 2.1.1 | 6, 7, 8, 9, 10, 10b |

| Paso | Especificación |
|---|---|
| 6 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. |
| 7 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. |
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
| Objetivo | Que July tenga el monto, el plazo y el destino del crédito que pide el prospecto, para simular y precalificar. |
| Pasos de CU 2.1.1 | 1, 2, 3, 8, 9, 10, 10b |

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** inicia la solicitud de crédito para la línea confirmada a **July**. |
| 2 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. |
| 3 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. |
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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** entrega el número de cédula a **July**. |
| 2 | **July** valida el formato de la cédula (10 dígitos y dígito verificador). |
| 3 | **July** verifica la cédula con el **Sistema core**. |
| 4 | **Sistema core** confirma la validez de la cédula a **July**. |
| 5 | **July** guarda el avance de la conversación con la cédula como último dato. |
| 6 | **July** notifica la cédula validada al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · El dato es el teléfono (reemplaza los pasos 1 a 4)*

| Paso | Especificación |
|---|---|
| 1a | **Prospecto** entrega el número de teléfono a **July**. |
| 2a | **July** valida el formato del teléfono (10 dígitos que empiezan con 09). Continúa en el paso 5. |

*A2 · El dato es el monto (reemplaza los pasos 1 a 4)*

| Paso | Especificación |
|---|---|
| 1b | **Prospecto** entrega el monto del crédito a **July**. |
| 2b | **July** valida el monto contra el rango de la línea de crédito. Continúa en el paso 5. |

*A3 · La cédula no es válida (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4c | **Sistema core** informa el error de validación de la cédula a **July**. |
| 5c | **July** explica el error de validación de la cédula al **Prospecto**. Vuelve al paso 1. |

*A4 · El prospecto abandona la conversación (después del paso 6)*

| Paso | Especificación |
|---|---|
| 7d | **Prospecto** deja sin respuesta la conversación a **July**. |
| 8d | **July** marca la conversación como abandonada al vencer el tiempo de espera. |
| 9d | **July** envía la plantilla de retoma con el último paso guardado a **WhatsApp Business API**. |
| 10d | **WhatsApp Business API** entrega la plantilla de retoma al **Prospecto**. |
| 11d | **Prospecto** responde la plantilla de retoma a **July**. |
| 12d | **July** retoma la conversación desde el último paso guardado. |
| 13d | **July** solicita el siguiente dato pendiente de la solicitud al **Prospecto**. Vuelve al paso 1. |

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
| Precondiciones | La solicitud tiene monto y plazo declarados (CU 2.1.1, paso 3). La identidad y los ingresos pueden completarse después, antes de precalificar (CU 2.3). |
| Postcondiciones | El prospecto eligió una línea y un escenario, y July lo guardó para la precalificación. |

Primero se elige la línea (CU 2.2.2) y luego se calcula con sus condiciones (CU 2.2.1).

**Flujo**

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** consulta las líneas de crédito disponibles a **July**. |
| 2 | **July** presenta las líneas de crédito vigentes con su tasa, plazos y requisitos al **Prospecto**. |
| 3 | **Prospecto** selecciona la línea de crédito a **July**. |
| 4 | **July** calcula la simulación del crédito. |
| 5 | **July** presenta la simulación con la cuota, el total a pagar y los escenarios al **Prospecto**. |
| 6 | **Prospecto** confirma el escenario de simulación elegido a **July**. Fin. |

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
| Precondiciones | Hay una línea elegida con su tasa y plazos vigentes (CU 2.2.2) y un monto y un plazo declarados (CU 2.1.1, paso 3). |
| Postcondiciones | El prospecto eligió un escenario y July lo guardó para la precalificación. |

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la simulación del crédito con su monto y su plazo a **July**. |
| 2 | **July** calcula la cuota mensual de la simulación. |
| 3 | **July** genera la tabla de amortización de la simulación. |
| 4 | **July** presenta la cuota mensual con la tabla de amortización al **Prospecto**. |
| 5 | **Prospecto** solicita el costo total del crédito a **July**. |
| 6 | **July** calcula el costo total con intereses, seguros y cargos. |
| 7 | **July** muestra el costo total desglosado al **Prospecto**. |
| 8 | **Prospecto** solicita la comparación con otro monto o plazo a **July**. |
| 9 | **July** calcula el escenario alternativo de simulación. |
| 10 | **July** presenta los escenarios de simulación lado a lado al **Prospecto**. |
| 11 | **Prospecto** confirma el escenario de simulación elegido a **July**. |
| 12 | **July** guarda el escenario elegido para la precalificación. Fin. |

**Flujos alternativos**

*A1 · El monto está fuera del rango de la línea (reemplaza los pasos 2 a 4)*

| Paso | Especificación |
|---|---|
| 2a | **July** detecta que el monto está fuera del rango de la línea de crédito. |
| 3a | **July** informa los montos mínimo y máximo de la línea de crédito al **Prospecto**. Vuelve al paso 1. |

*A2 · El prospecto no quiere comparar (reemplaza los pasos 8 a 12)*

| Paso | Especificación |
|---|---|
| 8b | **Prospecto** acepta la simulación inicial a **July**. |
| 9b | **July** guarda la simulación inicial como escenario elegido. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** consulta las líneas de crédito disponibles a **July**. |
| 2 | **July** consulta el catálogo de crédito vigente al **Área de productos y crédito**. |
| 3 | **Área de productos y crédito** entrega el catálogo de crédito publicado con las líneas vigentes a **July**. |
| 4 | **July** presenta los nombres de las líneas de crédito vigentes al **Prospecto**. |
| 5 | **Prospecto** selecciona la línea de crédito a **July**. |
| 6 | **July** consulta la tasa y los plazos de la línea de crédito al **Área de productos y crédito**. |
| 7 | **Área de productos y crédito** entrega la tasa y los plazos vigentes de la línea de crédito a **July**. |
| 8 | **July** consulta los requisitos de la línea de crédito al **Área de productos y crédito**. |
| 9 | **Área de productos y crédito** entrega los requisitos vigentes de la línea de crédito a **July**. |
| 10 | **July** informa la tasa, los plazos y los requisitos de la línea de crédito al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · La línea elegida ya no está vigente (reemplaza el paso 7)*

| Paso | Especificación |
|---|---|
| 7a | **Área de productos y crédito** marca la línea de crédito como no vigente a **July**. |
| 8a | **July** ofrece las líneas de crédito alternativas vigentes al **Prospecto**. Vuelve al paso 5. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la precalificación del escenario elegido a **July**. |
| 2 | **July** evalúa la precalificación con las reglas vigentes. |
| 3 | **July** comunica el resultado preliminar de la precalificación al **Prospecto**. |
| 4 | **Prospecto** consulta los documentos requeridos a **July**. |
| 5 | **July** envía la lista de documentos requeridos al **Prospecto**. |
| 6 | **Prospecto** solicita la cita en agencia a **July**. |
| 7 | **July** envía la confirmación de la cita al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la precalificación del escenario elegido a **July**. |
| 2 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. |
| 3 | **Comité de crédito** entrega las reglas de precalificación aprobadas en la tabla de decisión a **July**. |
| 4 | **July** solicita la edad, la actividad y la condición de socio del prospecto al **Sistema core**. |
| 5 | **Sistema core** responde la edad, la actividad registrada y la condición de socio a **July**. |
| 6 | **July** calcula la capacidad de pago de la precalificación. |
| 7 | **July** clasifica la precalificación como apta o no apta según las reglas. |
| 8 | **July** comunica el resultado preliminar y no vinculante de la precalificación al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · El Sistema core no tiene registro del prospecto (reemplaza los pasos 5 y 6)*

| Paso | Especificación |
|---|---|
| 5a | **Sistema core** responde la ausencia de registro del socio a **July**. |
| 6a | **July** evalúa la precalificación solo con los datos declarados. Continúa en el paso 7. |

*A2 · El caso queda «a revisar» (reemplaza los pasos 7 y 8)*

| Paso | Especificación |
|---|---|
| 7b | **July** clasifica la precalificación como «a revisar». |
| 8b | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. |
| 9b | **Comité de crédito** confirma el acuse de recepción del caso con su número a **July**. |
| 10b | **July** informa el número del caso de revisión al **Prospecto**. Fin. |

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
| Pasos de CU 2.3.1 | 2, 3, 7, 8, 7b, 8b, 9b, 10b |

| Paso | Especificación |
|---|---|
| 2 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. |
| 3 | **Comité de crédito** entrega las reglas de precalificación aprobadas en la tabla de decisión a **July**. |
| 7 | **July** clasifica la precalificación como apta o no apta según las reglas. |
| 8 | **July** comunica el resultado preliminar y no vinculante de la precalificación al **Prospecto**. Fin. |
| 7b | **July** clasifica la precalificación como «a revisar». |
| 8b | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. |
| 9b | **Comité de crédito** confirma el acuse de recepción del caso con su número a **July**. |
| 10b | **July** informa el número del caso de revisión al **Prospecto**. Fin. |

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

| Paso | Especificación |
|---|---|
| 1 | **Prospecto** solicita la explicación del resultado de la precalificación a **July**. |
| 2 | **July** explica el resultado y los factores que pesaron al **Prospecto**. |
| 3 | **Prospecto** consulta los documentos que debe preparar a **July**. |
| 4 | **July** envía la lista de documentos requeridos para su línea y su condición de socio al **Prospecto**. |
| 5 | **Prospecto** solicita una cita en la agencia de su preferencia a **July**. |
| 6 | **July** consulta los horarios disponibles de la agencia para la fecha pedida al **Personal de agencia**. |
| 7 | **Personal de agencia** entrega los horarios libres de su agenda a **July**. |
| 8 | **July** ofrece los horarios disponibles al **Prospecto**. |
| 9 | **Prospecto** selecciona un horario disponible a **July**. |
| 10 | **July** reserva la cita en el horario elegido. |
| 11 | **July** notifica la cita reservada al **Personal de agencia**. |
| 12 | **Personal de agencia** confirma la reserva de la cita a **July**. |
| 13 | **July** envía la confirmación de la cita con la fecha, la hora y la agencia al **Prospecto**. Fin. |

**Flujos alternativos**

*A1 · El resultado es «no apto» (reemplaza el paso 2)*

| Paso | Especificación |
|---|---|
| 2a | **July** explica el motivo del resultado «no apto» al **Prospecto**. |
| 3a | **Prospecto** solicita una alternativa de monto o plazo a **July**. |
| 4a | **July** sugiere un escenario de simulación con otro monto o plazo al **Prospecto**. Fin. El prospecto puede volver a simular en CU 2.2.1. |

*A2 · El prospecto no es socio (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4b | **July** envía los requisitos de afiliación junto con los documentos del crédito al **Prospecto**. Continúa en el paso 5. |

*A3 · No hay horarios libres en la fecha pedida (reemplaza los pasos 7 y 8)*

| Paso | Especificación |
|---|---|
| 7c | **Personal de agencia** informa la falta de horarios libres en la fecha pedida a **July**. |
| 8c | **July** ofrece las fechas libres más cercanas al **Prospecto**. Vuelve al paso 9. |

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

Entran a este flujo los leads precalificados como APTO o A_REVISAR. Un lead NO_APTO recibe una alternativa de monto o plazo (CU 2.3.2, A1) y solo entra si vuelve a simular y su nueva precalificación es APTO o A_REVISAR.

<a id="cu-3-1"></a>
### CU 3.1 · Recibir la oportunidad precalificada (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Entrega de oportunidades |
| Capacidad | 3.1 Entrega de oportunidades |
| Actor principal | Asesor comercial (beneficiario: recibe la oportunidad lista; el caso lo dispara el fin de la precalificación) |
| Incluye | [CU 3.1.1](#cu-3-1-1), [CU 3.1.2](#cu-3-1-2) |
| Objetivo | Que cada lead precalificado tenga su ficha completa y quede registrado una sola vez en el CRM antes de asignarse a un asesor. |
| Disparador | El lead termina la precalificación como APTO o A_REVISAR (CU 2.3.1). |
| Precondiciones | El prospecto completó la precalificación (flujo 2). |
| Postcondiciones | La ficha del lead está consolidada y el lead existe en el CRM con su identificador enlazado en July, o su registro quedó pendiente. |

**Flujo**

| Paso | Especificación |
|---|---|
| 1 | **July** consolida la ficha del prospecto con datos, simulación, resultado y prioridad. |
| 2 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. |
| 3 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. |
| 4 | **July** vincula el identificador del CRM al lead. Fin. |

<a id="cu-3-1-1"></a>
#### CU 3.1.1 · Generar la ficha del prospecto (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1 Generación de la ficha |
| Actor principal | Asesor comercial (beneficiario) |
| Actores secundarios | Jefe comercial |
| Incluye | [CU 3.1.1.1](#cu-3-1-1-1), [CU 3.1.1.2](#cu-3-1-1-2), [CU 3.1.1.3](#cu-3-1-1-3) |
| Objetivo | Reunir en una sola ficha todo lo que July sabe del prospecto, con su prioridad y su historial, para el asesor al que se asigne. |
| Disparador | El lead termina la precalificación como APTO o A_REVISAR (CU 2.3.1). |
| Precondiciones | El Jefe comercial definió los criterios de prioridad. |
| Postcondiciones | La ficha está consolidada, priorizada y con el historial completo. |

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. |
| 2 | **Jefe comercial** entrega los criterios de lead caliente, tibio y frío a **July**. |
| 3 | **July** consolida la ficha con datos, simulación, resultado y prioridad. |
| 4 | **July** adjunta el historial completo de la conversación en la ficha. Fin. |

**Flujos alternativos**

*A1 · La ficha tiene datos incompletos (reemplaza el paso 3)*

| Paso | Especificación |
|---|---|
| 3a | **July** consolida la ficha con los datos faltantes marcados. Continúa en el paso 4. |

<a id="cu-3-1-1-1"></a>
##### CU 3.1.1.1 · Consolidar datos, simulación y resultado (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.1 Consolidación de datos |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que la ficha junte los datos, la simulación elegida y el resultado de la precalificación, marcando lo que falte. |
| Pasos de CU 3.1.1 | 3, 3a |

| Paso | Especificación |
|---|---|
| 3 | **July** consolida la ficha con datos, simulación, resultado y prioridad. |
| 3a | **July** consolida la ficha con los datos faltantes marcados. Continúa en el paso 4. |

<a id="cu-3-1-1-2"></a>
##### CU 3.1.1.2 · Priorizar el lead (caliente, tibio, frío) (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.2 Priorización del lead |
| Actor externo | Jefe comercial |
| Objetivo | Que la ficha lleve la prioridad que resulta de los criterios del Jefe comercial. |
| Pasos de CU 3.1.1 | 1, 2, 3 |

| Paso | Especificación |
|---|---|
| 1 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. |
| 2 | **Jefe comercial** entrega los criterios de lead caliente, tibio y frío a **July**. |
| 3 | **July** consolida la ficha con datos, simulación, resultado y prioridad. |

<a id="cu-3-1-1-3"></a>
##### CU 3.1.1.3 · Adjuntar el historial de conversación (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.1](#cu-3-1-1), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.1.3 Historial de conversación |
| Actor externo | Ninguno, lo resuelve July |
| Objetivo | Que la ficha lleve el historial completo de la conversación. |
| Pasos de CU 3.1.1 | 4 |

| Paso | Especificación |
|---|---|
| 4 | **July** adjunta el historial completo de la conversación en la ficha. Fin. |

<a id="cu-3-1-2"></a>
#### CU 3.1.2 · Registrar el lead en el CRM (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2 Integración con CRM |
| Actor principal | Asesor comercial (beneficiario) |
| Actores secundarios | CRM de la cooperativa, Jefe comercial |
| Incluye | [CU 3.1.2.1](#cu-3-1-2-1), [CU 3.1.2.2](#cu-3-1-2-2), [CU 3.1.2.3](#cu-3-1-2-3) |
| Objetivo | Crear o actualizar el lead en el CRM sin intervención manual, sin duplicados y sin perderlo si el CRM falla. |
| Disparador | La ficha del prospecto está consolidada (CU 3.1.1). |
| Precondiciones | El prospecto tiene la cédula y el teléfono validados (CU 2.1.2). |
| Postcondiciones | El lead existe una sola vez en el CRM, con su identificador enlazado en July, o el registro quedó pendiente y el Jefe comercial recibió el aviso. |

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. |
| 2 | **CRM de la cooperativa** responde la ausencia de registro previo del lead a **July**. |
| 3 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. |
| 4 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. |
| 5 | **July** vincula el identificador del CRM al lead. Fin. |

**Flujos alternativos**

*A1 · El lead ya existe en el CRM (reemplaza los pasos 2 y 3)*

| Paso | Especificación |
|---|---|
| 2a | **CRM de la cooperativa** responde con el registro existente del lead a **July**. |
| 3a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 4. |

*A2 · El CRM falla (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4b | **CRM de la cooperativa** devuelve el error de integración a **July**. |
| 5b | **July** registra el intento fallido de envío del lead. |
| 6b | **July** reintenta, tras la espera progresiva, el envío del lead al **CRM de la cooperativa**. Vuelve al paso 4. |

*A3 · Se agotan los reintentos (reemplaza el paso 6b)*

| Paso | Especificación |
|---|---|
| 6c | **July** marca como pendiente el envío del lead. |
| 7c | **July** avisa el registro pendiente del lead al **Jefe comercial**. Fin. |

<a id="cu-3-1-2-1"></a>
##### CU 3.1.2.1 · Crear o actualizar el lead en el CRM (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.1 Alta o actualización |
| Actor externo | CRM de la cooperativa |
| Objetivo | Que el lead quede creado o actualizado en el CRM, con su identificador enlazado en July. |
| Pasos de CU 3.1.2 | 3, 4, 5, 3a |

| Paso | Especificación |
|---|---|
| 3 | **July** crea el lead con su ficha en el **CRM de la cooperativa**. |
| 4 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. |
| 5 | **July** vincula el identificador del CRM al lead. Fin. |
| 3a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 4. |

<a id="cu-3-1-2-2"></a>
##### CU 3.1.2.2 · Controlar registros duplicados (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.2 Control de duplicados |
| Actor externo | CRM de la cooperativa |
| Objetivo | Que July busque el lead por cédula y teléfono antes de crearlo, para no duplicarlo. |
| Pasos de CU 3.1.2 | 1, 2, 2a, 3a |

| Paso | Especificación |
|---|---|
| 1 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. |
| 2 | **CRM de la cooperativa** responde la ausencia de registro previo del lead a **July**. |
| 2a | **CRM de la cooperativa** responde con el registro existente del lead a **July**. |
| 3a | **July** actualiza el registro existente del lead con la ficha en el **CRM de la cooperativa**. Continúa en el paso 4. |

<a id="cu-3-1-2-3"></a>
##### CU 3.1.2.3 · Reintentar el envío ante fallos (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.1.2](#cu-3-1-2), dentro de [CU 3.1](#cu-3-1) |
| Capacidad | 3.1.2.3 Reintentos ante fallos |
| Actor externo | CRM de la cooperativa, Jefe comercial |
| Objetivo | Que un fallo del CRM se reintente con espera progresiva y, si se agotan los intentos, el Jefe comercial sepa que el registro quedó pendiente. |
| Pasos de CU 3.1.2 | 4b, 5b, 6b, 6c, 7c |

| Paso | Especificación |
|---|---|
| 4b | **CRM de la cooperativa** devuelve el error de integración a **July**. |
| 5b | **July** registra el intento fallido de envío del lead. |
| 6b | **July** reintenta, tras la espera progresiva, el envío del lead al **CRM de la cooperativa**. Vuelve al paso 4. |
| 6c | **July** marca como pendiente el envío del lead. |
| 7c | **July** avisa el registro pendiente del lead al **Jefe comercial**. Fin. |

<a id="cu-3-2"></a>
### CU 3.2 · Dar seguimiento al lead hasta su cierre (nivel 1)

| Campo | Especificación |
|---|---|
| Nivel | 1 · etapa Asignación y seguimiento |
| Capacidad | 3.2 Asignación y seguimiento |
| Actor principal | Asesor comercial |
| Incluye | [CU 3.2.1](#cu-3-2-1), [CU 3.2.2](#cu-3-2-2) |
| Objetivo | Que cada lead llegue al asesor correcto y se cierre como desembolsado o perdido, con su estado final sincronizado en el CRM. |
| Disparador | El asesor marca su disponibilidad para recibir leads. |
| Precondiciones | La ficha del lead está consolidada (CU 3.1.1). |
| Postcondiciones | El lead quedó cerrado en July y en el CRM. |

**Flujo**

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** marca su disponibilidad para recibir leads a **July**. |
| 2 | **July** asigna el lead según la regla de enrutamiento. |
| 3 | **July** notifica el lead asignado al **Asesor comercial**. |
| 4 | **Asesor comercial** registra el estado final del lead a **July**. |
| 5 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. Fin. |

<a id="cu-3-2-1"></a>
#### CU 3.2.1 · Recibir el lead asignado (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.1 Asignación a asesor |
| Actor principal | Asesor comercial |
| Actores secundarios | Jefe comercial, Prospecto |
| Incluye | [CU 3.2.1.1](#cu-3-2-1-1), [CU 3.2.1.2](#cu-3-2-1-2), [CU 3.2.1.3](#cu-3-2-1-3) |
| Objetivo | Poner cada lead en manos del asesor correcto, avisarle y que continúe la conversación con la ficha y el historial, sin volver a pedir datos. |
| Disparador | Hay un lead con la ficha consolidada y sin asesor asignado. |
| Precondiciones | La ficha del lead está consolidada (CU 3.1.1). El Jefe comercial definió las reglas de enrutamiento. |
| Postcondiciones | El lead tiene un asesor asignado que ya tiene la ficha y continúa la conversación con el prospecto. |

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** marca su disponibilidad para recibir leads a **July**. |
| 2 | **July** consulta las reglas de enrutamiento por agencia, producto y carga al **Jefe comercial**. |
| 3 | **Jefe comercial** entrega la regla de enrutamiento aplicable al lead a **July**. |
| 4 | **July** asigna el lead según la regla de enrutamiento. |
| 5 | **July** notifica el lead asignado con su plazo de atención al **Asesor comercial**. |
| 6 | **Asesor comercial** acepta la asignación del lead a **July**. |
| 7 | **July** traspasa la conversación, con su historial y la ficha del prospecto, a la bandeja del asesor asignado. |
| 8 | **July** avisa el cambio de asesor de la conversación al **Prospecto**. |
| 9 | **Prospecto** continúa la conversación con el **Asesor comercial**. Fin. |

**Flujos alternativos**

*A1 · El asesor no acepta el lead a tiempo (reemplaza el paso 6)*

| Paso | Especificación |
|---|---|
| 6a | **Asesor comercial** deja vencer el plazo de atención de la asignación a **July**. |
| 7a | **July** reasigna el lead según la regla de enrutamiento. |
| 8a | **July** informa la reasignación del lead al **Jefe comercial**. Fin. |

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
| Objetivo | Que el asesor continúe la conversación con el prospecto desde la ficha y el historial, sin volver a pedir datos. |
| Pasos de CU 3.2.1 | 6, 7, 8, 9 |

| Paso | Especificación |
|---|---|
| 6 | **Asesor comercial** acepta la asignación del lead a **July**. |
| 7 | **July** traspasa la conversación, con su historial y la ficha del prospecto, a la bandeja del asesor asignado. |
| 8 | **July** avisa el cambio de asesor de la conversación al **Prospecto**. |
| 9 | **Prospecto** continúa la conversación con el **Asesor comercial**. Fin. |

<a id="cu-3-2-2"></a>
#### CU 3.2.2 · Hacer seguimiento y cerrar el lead (nivel 2)

| Campo | Especificación |
|---|---|
| Nivel | 2 · incluido por [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2 Seguimiento y cierre |
| Actor principal | Asesor comercial |
| Actores secundarios | Prospecto, WhatsApp Business API, Personal de agencia, Comité de crédito, CRM de la cooperativa |
| Incluye | [CU 3.2.2.1](#cu-3-2-2-1), [CU 3.2.2.2](#cu-3-2-2-2), [CU 3.2.2.3](#cu-3-2-2-3) |
| Objetivo | Llevar el lead hasta el desembolso o la pérdida: recordar pendientes, confirmar la cita, registrar la atención y los documentos, enviar la solicitud al comité, registrar su resolución y cerrar el lead con su motivo. |
| Disparador | El asesor tiene un lead asignado con documentos o cita pendientes. |
| Precondiciones | El lead está asignado (CU 3.2.1) y tiene una cita reservada (CU 2.3.2). |
| Postcondiciones | El lead quedó cerrado (desembolsado o perdido, con motivo) en July y en el CRM. |

Todos los pasos pasan por July: lo que ocurre en la agencia y en el comité se registra en July (pasos 6, 8 y 10), para que el estado del lead y de la solicitud no dependa de sistemas que July no ve.

**Flujo principal**

| Paso | Especificación |
|---|---|
| 1 | **Asesor comercial** programa el recordatorio de documentos y cita a **July**. |
| 2 | **July** envía la plantilla de recordatorio a **WhatsApp Business API**. |
| 3 | **WhatsApp Business API** entrega el recordatorio de documentos y cita al **Prospecto**. |
| 4 | **Prospecto** confirma su asistencia a la cita a **July**. |
| 5 | **July** notifica la asistencia confirmada del prospecto al **Personal de agencia**. |
| 6 | **Personal de agencia** registra la atención de la cita a **July**. |
| 7 | **July** notifica la cita atendida al **Asesor comercial**. |
| 8 | **Asesor comercial** registra los documentos recibidos en la agencia a **July**. |
| 9 | **July** envía la solicitud de crédito completa para su resolución al **Comité de crédito**. |
| 10 | **Comité de crédito** comunica la resolución del crédito a **July**. |
| 11 | **July** notifica la resolución del crédito al **Asesor comercial**. |
| 12 | **Asesor comercial** registra el estado final del lead (desembolsado o perdido, con motivo) a **July**. |
| 13 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. Fin. |

**Flujos alternativos**

*A1 · El prospecto no responde al recordatorio (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4a | **Prospecto** deja sin respuesta el recordatorio a **July**. |
| 5a | **July** envía la plantilla de reactivación a **WhatsApp Business API**. Vuelve al paso 3. |

*A2 · Se agotan los intentos de reactivación (reemplaza el paso 5a)*

| Paso | Especificación |
|---|---|
| 5b | **July** marca el lead como frío. |
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 12. |

*A3 · El prospecto pide cambiar la cita (reemplaza el paso 4)*

| Paso | Especificación |
|---|---|
| 4c | **Prospecto** solicita el cambio de fecha de la cita a **July**. |
| 5c | **July** consulta los horarios disponibles para la fecha nueva al **Personal de agencia**. |
| 6c | **Personal de agencia** confirma el horario disponible para la fecha nueva a **July**. |
| 7c | **July** reprograma la cita en el horario confirmado. |
| 8c | **July** envía la cita reprogramada al **Prospecto**. Vuelve al paso 4. |

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
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 12. |

<a id="cu-3-2-2-2"></a>
##### CU 3.2.2.2 · Confirmar la cita en agencia (nivel 3)

| Campo | Especificación |
|---|---|
| Nivel | 3 · incluido por [CU 3.2.2](#cu-3-2-2), dentro de [CU 3.2](#cu-3-2) |
| Capacidad | 3.2.2.2 Confirmación de citas |
| Actor externo | Prospecto, Personal de agencia |
| Objetivo | Que la asistencia a la cita quede confirmada, o la cita reprogramada, y que July registre la atención y los documentos recibidos. |
| Pasos de CU 3.2.2 | 4, 5, 6, 7, 8, 4c, 5c, 6c, 7c, 8c |

| Paso | Especificación |
|---|---|
| 4 | **Prospecto** confirma su asistencia a la cita a **July**. |
| 5 | **July** notifica la asistencia confirmada del prospecto al **Personal de agencia**. |
| 6 | **Personal de agencia** registra la atención de la cita a **July**. |
| 7 | **July** notifica la cita atendida al **Asesor comercial**. |
| 8 | **Asesor comercial** registra los documentos recibidos en la agencia a **July**. |
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
| Actor externo | Comité de crédito, CRM de la cooperativa |
| Objetivo | Que la solicitud llegue al comité, su resolución quede registrada, el lead se cierre con su motivo y el estado quede sincronizado en el CRM. |
| Pasos de CU 3.2.2 | 9, 10, 11, 12, 13, 5b, 6b |

| Paso | Especificación |
|---|---|
| 9 | **July** envía la solicitud de crédito completa para su resolución al **Comité de crédito**. |
| 10 | **Comité de crédito** comunica la resolución del crédito a **July**. |
| 11 | **July** notifica la resolución del crédito al **Asesor comercial**. |
| 12 | **Asesor comercial** registra el estado final del lead (desembolsado o perdido, con motivo) a **July**. |
| 13 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. Fin. |
| 5b | **July** marca el lead como frío. |
| 6b | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 12. |
