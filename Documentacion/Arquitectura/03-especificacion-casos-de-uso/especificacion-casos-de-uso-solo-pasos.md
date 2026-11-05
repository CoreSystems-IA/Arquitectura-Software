# Especificación de casos de uso · July · solo pasos

**ID:** CU-09 · **Versión:** 2.1 · **Fecha:** 2026-11-04 · **Estado:** Borrador  
**Deriva de:** CU-08 ([`especificaciones-casos-de-uso.md`](especificaciones-casos-de-uso.md))  

Las tres especificaciones unificadas de CU-08, una por flujo de valor, solo con la oración de cada paso y el caso de nivel 3 que realiza. La descomposición en sujeto, método, entidad y relación está en CU-08.

## Flujo 1 · Atracción y primer contacto

**Actor principal:** Prospecto · **Objetivo:** Recibir la demanda digital, responder al prospecto en menos de 2 minutos, obtener su consentimiento de datos y registrar su intención como lead.  
**Disparador:** El prospecto escribe al número de WhatsApp de la cooperativa o abre el chat del sitio web.

### CU 1.1 · Contactar a July por un canal digital (etapa Canales de contacto)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 1 | **Prospecto** escribe el mensaje de la consulta a **WhatsApp Business API**. | 1.1.1.1 |
| 2 | **WhatsApp Business API** notifica el mensaje con el webhook firmado a **July**. | 1.1.2.3 |
| 3 | **July** verifica la firma del mensaje con **WhatsApp Business API**. | 1.1.2.3 |
| 4 | **WhatsApp Business API** devuelve la firma válida a **July**. | 1.1.2.3 |
| 5 | **July** registra el mensaje en formato común en la **Conversación**. | 1.1.2.1 |
| 6 | **Conversación** devuelve la conversación abierta con su canal a **July**. | 1.1.2.1 |
| 7 | **July** etiqueta la campaña de origen en la **Conversación**. | 1.1.1.3 |
| 8 | **Conversación** devuelve el origen etiquetado a **July**. | 1.1.1.3 |
| 9 | **July** envía el aviso del origen de la conversación al **Equipo de marketing**. | 1.1.1.3 |
| 10 | **Equipo de marketing** devuelve el acuse del aviso a **July**. | 1.1.1.3 |
| 11 | **July** envía la respuesta inmediata a **WhatsApp Business API**. | 1.1.2.1 |
| 12 | **WhatsApp Business API** entrega la respuesta inmediata al **Prospecto**. | 1.1.1.1 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A1 · El prospecto llega por el sitio web (reemplaza los pasos 1 a 4)* | |
| 1a | **Prospecto** abre la sesión de chat desde una página del sitio con el **Widget web**. | 1.1.1.2 |
| 2a | **Widget web** devuelve el token de la sesión de chat al **Prospecto**. | 1.1.1.2 |
| 3a | **Prospecto** escribe el mensaje de la consulta al **Widget web**. | 1.1.1.2 |
| 4a | **Widget web** entrega el mensaje con el token de la sesión a **July**. | 1.1.2.1 |
| 5a | **July** verifica el token del mensaje con el **Widget web**. | 1.1.2.1 |
| 6a | **Widget web** devuelve el token válido a **July**. Continúa en el paso 5; las respuestas de los pasos 11 y 12 salen por el widget web. | 1.1.2.1 |
| | *A2 · El mensaje no trae campaña (reemplaza el paso 7)* | |
| 7b | **July** etiqueta el origen directo en la **Conversación**. | 1.1.1.3 |
| 8b | **Conversación** devuelve el origen directo a **July**. Continúa en el paso 9. | 1.1.1.3 |
| | *A3 · La firma del webhook no es válida (reemplaza el paso 4)* | |
| 4c | **WhatsApp Business API** devuelve la firma inválida a **July**. | 1.1.2.3 |
| 5c | **July** devuelve el error de integración por firma inválida a **WhatsApp Business API**. Fin. | 1.1.2.3 |
| | *A4 · Hay un pico de demanda (reemplaza el paso 11)* | |
| 11d | **July** pone en espera el mensaje en la **Conversación**. | 1.1.2.2 |
| 12d | **Conversación** devuelve el tiempo de espera estimado a **July**. | 1.1.2.2 |
| 13d | **July** envía el aviso del tiempo de espera a **WhatsApp Business API**. | 1.1.2.2 |
| 14d | **WhatsApp Business API** entrega el aviso del tiempo de espera al **Prospecto**. Continúa en el paso 13. | 1.1.2.2 |

### CU 1.2 · Recibir el primer contacto (etapa Primer contacto)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 13 | **Prospecto** envía el saludo inicial a **July**. | 1.2.1.1 |
| 14 | **July** consulta el guion de bienvenida vigente al **Administrador del asistente**. | 1.2.1.1 |
| 15 | **Administrador del asistente** devuelve el guion de bienvenida publicado a **July**. | 1.2.1.1 |
| 16 | **July** compone el saludo con el aviso de privacidad en la **Plantilla de mensaje**. | 1.2.1.1 |
| 17 | **Plantilla de mensaje** devuelve el saludo con el aviso de privacidad a **July**. | 1.2.1.2 |
| 18 | **July** envía el saludo con el aviso de privacidad al **Prospecto**. | 1.2.1.2 |
| 19 | **Prospecto** acepta el aviso de privacidad a **July**. | 1.2.1.2 |
| 20 | **July** registra el consentimiento aceptado en el **Prospecto**. | 1.2.1.2 |
| 21 | **Prospecto** devuelve el consentimiento registrado a **July**. | 1.2.1.2 |
| 22 | **July** consulta el menú de opciones vigente al **Administrador del asistente**. | 1.2.1.1 |
| 23 | **Administrador del asistente** devuelve el menú de opciones publicado a **July**. | 1.2.1.1 |
| 24 | **July** muestra el menú de opciones completo al **Prospecto**. | 1.2.1.1 |
| 25 | **Prospecto** describe la necesidad de crédito a **July**. | 1.2.2.1 |
| 26 | **July** busca la intención de crédito en la **Línea de crédito**. | 1.2.2.1 |
| 27 | **Línea de crédito** devuelve la línea detectada a **July**. | 1.2.2.1 |
| 28 | **July** solicita la confirmación de la línea detectada al **Prospecto**. | 1.2.2.1 |
| 29 | **Prospecto** confirma la línea de crédito a **July**. | 1.2.2.1 |
| 30 | **July** consulta la condición de socio del prospecto al **Sistema core**. | 1.2.2.2 |
| 31 | **Sistema core** devuelve la condición de socio y la fecha de ingreso a **July**. | 1.2.2.2 |
| 32 | **July** registra el lead con su línea y su necesidad en el **Lead**. | 1.2.2.3 |
| 33 | **Lead** devuelve el número de seguimiento a **July**. | 1.2.2.3 |
| 34 | **July** entrega el número de seguimiento del lead al **Prospecto**. Fin. | 1.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A5 · El prospecto no acepta el aviso (reemplaza los pasos 19 a 34)* | |
| 19e | **Prospecto** rechaza el aviso de privacidad a **July**. | 1.2.1.2 |
| 20e | **July** registra el consentimiento rechazado en el **Prospecto**. | 1.2.1.2 |
| 21e | **Prospecto** devuelve el consentimiento registrado a **July**. | 1.2.1.2 |
| 22e | **July** consulta el menú básico vigente al **Administrador del asistente**. | 1.2.1.2 |
| 23e | **Administrador del asistente** devuelve el menú básico publicado a **July**. | 1.2.1.2 |
| 24e | **July** muestra el menú básico de información general al **Prospecto**. Fin. | 1.2.1.2 |
| | *A6 · El prospecto pide hablar con una persona (reemplaza los pasos 25 a 34; también se llega desde el paso 74l del flujo 2)* | |
| 25f | **Prospecto** solicita hablar con un asesor a **July**. | 1.2.1.3 |
| 26f | **July** envía la derivación con el historial de la conversación al **Asesor comercial**. | 1.2.1.3 |
| 27f | **Asesor comercial** acepta la derivación a **July**. | 1.2.1.3 |
| 28f | **July** traspasa la conversación con su historial en la **Conversación**. | 1.2.1.3 |
| 29f | **Conversación** devuelve la conversación derivada a **July**. | 1.2.1.3 |
| 30f | **July** confirma el traspaso de la conversación al **Asesor comercial**. | 1.2.1.3 |
| 31f | **Asesor comercial** envía el saludo del asesor al **Prospecto**. Fin. | 1.2.1.3 |
| | *A7 · July no reconoce la intención (reemplaza los pasos 27 y 28)* | |
| 27g | **Línea de crédito** devuelve la ausencia de coincidencia a **July**. | 1.2.2.1 |
| 28g | **July** ofrece las líneas de crédito como opciones cerradas al **Prospecto**. Continúa en el paso 29. | 1.2.2.1 |
| | *A8 · Es una pregunta frecuente y no una solicitud de crédito (reemplaza los pasos 26 a 34)* | |
| 26h | **July** busca la respuesta a la pregunta frecuente en la **Plantilla de mensaje**. | 1.2.2.1 |
| 27h | **Plantilla de mensaje** devuelve la respuesta frecuente a **July**. | 1.2.2.1 |
| 28h | **July** responde la pregunta frecuente al **Prospecto**. Fin. | 1.2.2.1 |
| | *A9 · El Sistema core no responde a tiempo (reemplaza el paso 31)* | |
| 31i | **Sistema core** devuelve la condición «por verificar» por tiempo agotado a **July**. Continúa en el paso 32. | 1.2.2.2 |
| | *A10 · El prospecto llegó por el widget web y aún no hay teléfono (reemplaza los pasos 30 a 32)* | |
| 30j | **July** registra el lead con la condición «por verificar» en el **Lead**. Continúa en el paso 33. | 1.2.2.3 |

## Flujo 2 · Captura, simulación y precalificación

**Actor principal:** Prospecto · **Objetivo:** Convertir la conversación en una solicitud con datos validados, una simulación elegida, un resultado de precalificación y una cita en agencia.  
**Disparador:** El prospecto con lead registrado pide iniciar su solicitud de crédito.

### CU 2.1 · Completar el perfil del crédito (etapa Perfilamiento)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 1 | **Prospecto** pide iniciar la solicitud de crédito a **July**. | 2.1.1.3 |
| 2 | **July** inicia la solicitud de crédito para la línea del lead en la **Solicitud de crédito**. | 2.1.1.3 |
| 3 | **Solicitud de crédito** devuelve la solicitud abierta a **July**. | 2.1.1.3 |
| 4 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | 2.1.1.3 |
| 5 | **Solicitud de crédito** devuelve el campo pendiente de monto, plazo y destino a **July**. | 2.1.1.3 |
| 6 | **July** solicita el monto, el plazo y el destino del crédito al **Prospecto**. | 2.1.1.3 |
| 7 | **Prospecto** indica el monto, el plazo y el destino del crédito a **July**. | 2.1.1.3 |
| 8 | **July** registra el monto, el plazo y el destino en la **Solicitud de crédito**. | 2.1.1.3 |
| 9 | **Solicitud de crédito** devuelve el monto y el plazo válidos para la línea a **July**. | 2.1.2.1 |
| 10 | **July** guarda el avance de la conversación en la **Conversación**. | 2.1.2.2 |
| 11 | **Conversación** devuelve el avance guardado a **July**. | 2.1.2.2 |
| 12 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | 2.1.1.1 |
| 13 | **Solicitud de crédito** devuelve el campo pendiente de identidad y contacto a **July**. | 2.1.1.1 |
| 14 | **July** solicita los nombres, la cédula, el correo y el teléfono al **Prospecto**. | 2.1.1.1 |
| 15 | **Prospecto** entrega los nombres, la cédula, el correo y el teléfono a **July**. | 2.1.1.1 |
| 16 | **July** registra los nombres, la cédula, el correo y el teléfono en la **Solicitud de crédito**. | 2.1.2.1 |
| 17 | **Solicitud de crédito** devuelve el formato válido de los datos a **July**. | 2.1.2.1 |
| 18 | **July** valida la cédula con el **Sistema core**. | 2.1.2.1 |
| 19 | **Sistema core** devuelve la cédula válida a **July**. | 2.1.2.1 |
| 20 | **July** guarda el avance de la conversación en la **Conversación**. | 2.1.2.2 |
| 21 | **Conversación** devuelve el avance guardado a **July**. | 2.1.2.2 |
| 22 | **July** consulta el campo pendiente en la **Solicitud de crédito**. | 2.1.1.2 |
| 23 | **Solicitud de crédito** devuelve el campo pendiente de ingresos y actividad a **July**. | 2.1.1.2 |
| 24 | **July** solicita los ingresos mensuales y la actividad económica al **Prospecto**. | 2.1.1.2 |
| 25 | **Prospecto** declara los ingresos mensuales y la actividad económica a **July**. | 2.1.1.2 |
| 26 | **July** registra los ingresos y la actividad en la **Solicitud de crédito**. | 2.1.1.2 |
| 27 | **Solicitud de crédito** devuelve los ingresos y la actividad válidos a **July**. | 2.1.1.2 |
| 28 | **July** resume la solicitud en la **Solicitud de crédito**. | 2.1.1.1 |
| 29 | **Solicitud de crédito** devuelve el resumen con todos los datos a **July**. | 2.1.1.1 |
| 30 | **July** solicita la confirmación del resumen al **Prospecto**. | 2.1.1.1 |
| 31 | **Prospecto** confirma el resumen de la solicitud a **July**. | 2.1.1.1 |
| 32 | **July** confirma la solicitud en la **Solicitud de crédito**. | 2.1.1.1 |
| 33 | **Solicitud de crédito** devuelve la solicitud confirmada a **July**. | 2.1.1.1 |
| 34 | **July** guarda el avance de la conversación en la **Conversación**. | 2.1.2.2 |
| 35 | **Conversación** devuelve el avance guardado a **July**. | 2.1.2.2 |
| 36 | **July** informa la solicitud confirmada al **Prospecto**. | 2.1.1.1 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A1 · El prospecto ya es socio (reemplaza los pasos 14 a 19)* | |
| 14a | **July** muestra los datos registrados del socio al **Prospecto**. | 2.1.1.1 |
| 15a | **Prospecto** confirma los datos registrados a **July**. Continúa en el paso 20. | 2.1.1.1 |
| | *A2 · Un dato no tiene formato válido (reemplaza el paso 17; igual en los pasos 9 y 27)* | |
| 17b | **Solicitud de crédito** devuelve el motivo del error de formato a **July**. | 2.1.2.1 |
| 18b | **July** explica el error del dato al **Prospecto**. | 2.1.2.1 |
| 19b | **Prospecto** corrige el dato a **July**. Vuelve al paso 16. | 2.1.2.1 |
| | *A3 · La cédula no es válida en el Sistema core (reemplaza el paso 19)* | |
| 19c | **Sistema core** devuelve la cédula no válida a **July**. | 2.1.2.1 |
| 20c | **July** explica el error de validación de la cédula al **Prospecto**. | 2.1.2.1 |
| 21c | **Prospecto** corrige la cédula a **July**. Vuelve al paso 16. | 2.1.2.1 |
| | *A4 · El prospecto corrige un dato del resumen (reemplaza el paso 31)* | |
| 31d | **Prospecto** corrige el dato equivocado a **July**. | 2.1.1.1 |
| 32d | **July** registra el dato corregido en la **Solicitud de crédito**. | 2.1.1.1 |
| 33d | **Solicitud de crédito** devuelve el dato válido a **July**. Vuelve al paso 28. | 2.1.1.1 |
| | *A5 · El prospecto abandona la conversación (después del paso 24; igual tras cualquier pregunta de July)* | |
| 24e | **Prospecto** deja vencer el tiempo de respuesta a **July**. | 2.1.2.3 |
| 25e | **July** marca la conversación como abandonada en la **Conversación**. | 2.1.2.3 |
| 26e | **Conversación** devuelve la conversación abandonada a **July**. | 2.1.2.3 |
| 27e | **July** compone la plantilla de retoma con el último paso guardado en la **Plantilla de mensaje**. | 2.1.2.3 |
| 28e | **Plantilla de mensaje** devuelve la plantilla de retoma a **July**. | 2.1.2.3 |
| 29e | **July** envía la plantilla de retoma a **WhatsApp Business API**. | 2.1.2.3 |
| 30e | **WhatsApp Business API** entrega la plantilla de retoma al **Prospecto**. | 2.1.2.3 |
| 31e | **Prospecto** responde la plantilla de retoma a **July**. | 2.1.2.3 |
| 32e | **July** retoma la conversación desde el último paso guardado en la **Conversación**. | 2.1.2.2 |
| 33e | **Conversación** devuelve el último paso guardado a **July**. Vuelve al paso 22. | 2.1.2.2 |

### CU 2.2 · Simular el crédito (etapa Simulación financiera)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 37 | **Prospecto** solicita la simulación del crédito a **July**. | 2.2.1.1 |
| 38 | **July** calcula la cuota con el monto y el plazo en la **Simulación**. | 2.2.1.1 |
| 39 | **Simulación** devuelve la cuota mensual a **July**. | 2.2.1.1 |
| 40 | **July** genera la tabla de amortización en la **Simulación**. | 2.2.1.1 |
| 41 | **Simulación** devuelve la tabla de amortización a **July**. | 2.2.1.1 |
| 42 | **July** presenta la cuota con la tabla de amortización al **Prospecto**. | 2.2.1.1 |
| 43 | **Prospecto** solicita el costo total del crédito a **July**. | 2.2.1.2 |
| 44 | **July** muestra el total a pagar con intereses, seguros y cargos al **Prospecto**. | 2.2.1.2 |
| 45 | **Prospecto** solicita comparar otro monto o plazo a **July**. | 2.2.1.3 |
| 46 | **July** calcula el escenario alternativo en la **Simulación**. | 2.2.1.3 |
| 47 | **Simulación** devuelve el escenario alternativo a **July**. | 2.2.1.3 |
| 48 | **July** presenta los escenarios lado a lado al **Prospecto**. | 2.2.1.3 |
| 49 | **Prospecto** elige el escenario de la simulación a **July**. | 2.2.1.3 |
| 50 | **July** marca el escenario elegido en la **Simulación**. | 2.2.1.3 |
| 51 | **Simulación** devuelve la simulación elegida a **July**. | 2.2.1.3 |
| 52 | **July** confirma el escenario elegido al **Prospecto**. | 2.2.1.3 |
| 53 | **Prospecto** consulta las líneas de crédito disponibles a **July**. | 2.2.2.1 |
| 54 | **July** consulta el catálogo de líneas vigentes al **Área de productos y crédito**. | 2.2.2.1 |
| 55 | **Área de productos y crédito** devuelve el catálogo publicado con las líneas vigentes a **July**. | 2.2.2.1 |
| 56 | **July** presenta las líneas de crédito vigentes al **Prospecto**. | 2.2.2.1 |
| 57 | **Prospecto** selecciona la línea de crédito a **July**. | 2.2.2.2 |
| 58 | **July** cambia la línea elegida en el **Lead**. | 2.2.2.2 |
| 59 | **Lead** devuelve la línea elegida a **July**. | 2.2.2.2 |
| 60 | **July** informa la tasa y los plazos vigentes de la línea al **Prospecto**. | 2.2.2.2 |
| 61 | **Prospecto** consulta los requisitos de la línea a **July**. | 2.2.2.3 |
| 62 | **July** informa los requisitos publicados de la línea al **Prospecto**. | 2.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A6 · El monto está fuera del rango de la línea (reemplaza el paso 39)* | |
| 39f | **Simulación** devuelve el monto fuera del rango de la línea a **July**. | 2.2.1.1 |
| 40f | **July** valida el monto y el plazo en la **Línea de crédito**. | 2.2.1.1 |
| 41f | **Línea de crédito** devuelve los montos mínimo y máximo permitidos a **July**. | 2.2.1.1 |
| 42f | **July** informa los montos mínimo y máximo al **Prospecto**. Vuelve al paso 37. | 2.2.1.1 |
| | *A7 · El prospecto no quiere comparar (reemplaza los pasos 45 a 49)* | |
| 45g | **Prospecto** acepta la simulación inicial a **July**. Continúa en el paso 50. | 2.2.1.1 |
| | *A8 · La línea elegida ya no está vigente (reemplaza el paso 59)* | |
| 59h | **Lead** devuelve la línea no vigente a **July**. | 2.2.2.2 |
| 60h | **July** ofrece las líneas alternativas vigentes al **Prospecto**. Vuelve al paso 57. | 2.2.2.1 |
| | *A9 · La línea elegida no es la que se simuló (después del paso 60)* | |
| 61i | **Prospecto** pide simular con la nueva línea a **July**. Vuelve al paso 38. | 2.2.1.1 |

### CU 2.3 · Obtener la precalificación (etapa Precalificación)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 63 | **Prospecto** solicita la precalificación del escenario elegido a **July**. | 2.3.1.1 |
| 64 | **July** consulta las reglas de precalificación vigentes al **Comité de crédito**. | 2.3.1.1 |
| 65 | **Comité de crédito** devuelve las reglas aprobadas en la tabla de decisión a **July**. | 2.3.1.1 |
| 66 | **July** consulta la edad, la actividad y la condición de socio al **Sistema core**. | 2.3.1.2 |
| 67 | **Sistema core** devuelve la edad, la actividad registrada y la condición de socio a **July**. | 2.3.1.2 |
| 68 | **July** precalifica la simulación elegida con las reglas en la **Solicitud de crédito**. | 2.3.1.1 |
| 69 | **Solicitud de crédito** devuelve el resultado APTO con su capacidad de pago a **July**. | 2.3.1.3 |
| 70 | **July** explica el resultado en la **Solicitud de crédito**. | 2.3.2.1 |
| 71 | **Solicitud de crédito** devuelve la explicación del resultado y sus factores a **July**. | 2.3.2.1 |
| 72 | **July** comunica el resultado preliminar y no vinculante al **Prospecto**. | 2.3.2.1 |
| 73 | **Prospecto** consulta los documentos que debe preparar a **July**. | 2.3.2.2 |
| 74 | **July** consulta los documentos según la condición de socio en la **Línea de crédito**. | 2.3.2.2 |
| 75 | **Línea de crédito** devuelve la lista de documentos requeridos a **July**. | 2.3.2.2 |
| 76 | **July** envía la lista de documentos requeridos al **Prospecto**. | 2.3.2.2 |
| 77 | **Prospecto** solicita una cita en la agencia de su preferencia a **July**. | 2.3.2.3 |
| 78 | **July** consulta los horarios disponibles de la agencia al **Personal de agencia**. | 2.3.2.3 |
| 79 | **Personal de agencia** devuelve los horarios libres de su agenda a **July**. | 2.3.2.3 |
| 80 | **July** ofrece los horarios disponibles al **Prospecto**. | 2.3.2.3 |
| 81 | **Prospecto** selecciona un horario disponible a **July**. | 2.3.2.3 |
| 82 | **July** reserva la cita en el horario elegido en la **Cita**. | 2.3.2.3 |
| 83 | **Cita** devuelve la cita reservada a **July**. | 2.3.2.3 |
| 84 | **July** avisa la cita reservada al **Personal de agencia**. | 2.3.2.3 |
| 85 | **Personal de agencia** devuelve el acuse de la reserva a **July**. | 2.3.2.3 |
| 86 | **July** envía la confirmación de la cita con la fecha, la hora y la agencia al **Prospecto**. Fin. | 2.3.2.3 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A10 · El Sistema core no tiene registro del prospecto (reemplaza el paso 67)* | |
| 67j | **Sistema core** devuelve la ausencia de registro del socio a **July**. Continúa en el paso 68 y el resultado queda condicionado. | 2.3.1.2 |
| | *A11 · El caso queda «a revisar» (reemplaza los pasos 69 a 72)* | |
| 69k | **Solicitud de crédito** devuelve el resultado A_REVISAR a **July**. | 2.3.1.3 |
| 70k | **July** deriva la solicitud a revisión en la **Solicitud de crédito**. | 2.3.1.3 |
| 71k | **Solicitud de crédito** devuelve el número del caso de revisión a **July**. | 2.3.1.3 |
| 72k | **July** envía el caso de revisión con la precalificación al **Comité de crédito**. | 2.3.1.3 |
| 73k | **Comité de crédito** devuelve el acuse de recepción del caso a **July**. | 2.3.1.3 |
| 74k | **July** informa el número del caso de revisión al **Prospecto**. Continúa en el paso 73. | 2.3.1.3 |
| | *A12 · El resultado es «no apto» (reemplaza los pasos 69 a 86)* | |
| 69l | **Solicitud de crédito** devuelve el resultado NO_APTO con su capacidad de pago a **July**. | 2.3.1.3 |
| 70l | **July** explica el motivo del resultado en la **Solicitud de crédito**. | 2.3.2.1 |
| 71l | **Solicitud de crédito** devuelve el motivo del resultado «no apto» a **July**. | 2.3.2.1 |
| 72l | **July** sugiere un monto o plazo que quepa en la capacidad de pago en la **Simulación**. | 2.3.2.1 |
| 73l | **Simulación** devuelve el escenario alternativo a **July**. | 2.3.2.1 |
| 74l | **July** explica el motivo con el escenario alternativo y la opción de revisión con un asesor al **Prospecto**. Fin. El prospecto puede volver a simular desde el paso 37 o pedir la revisión con un asesor en el flujo 1, paso 25f (A6). | 2.3.2.1 |
| | *A13 · El prospecto no es socio (reemplaza el paso 75)* | |
| 75m | **Línea de crédito** devuelve los documentos con los requisitos de afiliación a **July**. Continúa en el paso 76. | 2.3.2.2 |
| | *A14 · No hay horarios libres en la fecha pedida (reemplaza los pasos 79 y 80)* | |
| 79n | **Personal de agencia** devuelve la agenda sin horarios libres a **July**. | 2.3.2.3 |
| 80n | **July** consulta las fechas libres más cercanas al **Personal de agencia**. | 2.3.2.3 |
| 81n | **Personal de agencia** devuelve los horarios libres más cercanos a **July**. | 2.3.2.3 |
| 82n | **July** ofrece los horarios libres más cercanos al **Prospecto**. Continúa en el paso 81. | 2.3.2.3 |

## Flujo 3 · Entrega, seguimiento y conversión

**Actor principal:** Asesor comercial · **Objetivo:** Poner cada lead precalificado en manos de un asesor y llevarlo hasta el desembolso o la pérdida, con su estado sincronizado en el CRM.  
**Disparador:** El lead termina la precalificación como APTO o A_REVISAR (flujo 2, paso 69 o alternativo A11). July inicia el flujo; el Asesor comercial es su beneficiario.

### CU 3.1 · Recibir la oportunidad precalificada (etapa Entrega de oportunidades)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 1 | **July** consulta los criterios de prioridad vigentes al **Jefe comercial**. | 3.1.1.2 |
| 2 | **Jefe comercial** devuelve los criterios de lead caliente, tibio y frío a **July**. | 3.1.1.2 |
| 3 | **July** prioriza el lead con los criterios en el **Lead**. | 3.1.1.2 |
| 4 | **Lead** devuelve la prioridad del lead a **July**. | 3.1.1.2 |
| 5 | **July** genera la ficha con datos, simulación y resultado en el **Lead**. | 3.1.1.1 |
| 6 | **Lead** devuelve la ficha del prospecto con el historial de la conversación a **July**. | 3.1.1.3 |
| 7 | **July** busca el lead por cédula y teléfono en el **CRM de la cooperativa**. | 3.1.2.2 |
| 8 | **CRM de la cooperativa** devuelve la ausencia de registro previo a **July**. | 3.1.2.2 |
| 9 | **July** registra el lead con su ficha en el **CRM de la cooperativa**. | 3.1.2.1 |
| 10 | **CRM de la cooperativa** devuelve el identificador del lead a **July**. | 3.1.2.1 |
| 11 | **July** vincula el identificador del CRM en el **Lead**. | 3.1.2.1 |
| 12 | **Lead** devuelve el lead vinculado a **July**. | 3.1.2.1 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A1 · La ficha tiene datos incompletos (reemplaza el paso 6)* | |
| 6a | **Lead** devuelve la ficha con los datos faltantes marcados a **July**. Continúa en el paso 7. | 3.1.1.1 |
| | *A2 · El lead ya existe en el CRM (reemplaza el paso 8)* | |
| 8b | **CRM de la cooperativa** devuelve el identificador del registro existente a **July**. Continúa en el paso 9, que actualiza ese registro. | 3.1.2.2 |
| | *A3 · El CRM falla y se agotan los reintentos (reemplaza el paso 10)* | |
| 10c | **CRM de la cooperativa** devuelve el error de integración tras los reintentos a **July**. | 3.1.2.3 |
| 11c | **July** avisa el registro pendiente del lead al **Jefe comercial**. | 3.1.2.3 |
| 12c | **Jefe comercial** devuelve el acuse del aviso a **July**. Continúa en el paso 13. | 3.1.2.3 |

### CU 3.2 · Dar seguimiento al lead hasta su cierre (etapa Asignación y seguimiento)

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| 13 | **July** consulta las reglas de enrutamiento por agencia, producto y carga al **Jefe comercial**. | 3.2.1.1 |
| 14 | **Jefe comercial** devuelve la regla de enrutamiento aplicable a **July**. | 3.2.1.1 |
| 15 | **July** asigna el lead a un asesor disponible en el **Lead**. | 3.2.1.1 |
| 16 | **Lead** devuelve el asesor asignado a **July**. | 3.2.1.1 |
| 17 | **July** notifica el lead asignado con su plazo de atención al **Asesor comercial**. | 3.2.1.2 |
| 18 | **Asesor comercial** acepta la asignación del lead a **July**. | 3.2.1.2 |
| 19 | **July** registra la aceptación en el **Lead**. | 3.2.1.3 |
| 20 | **Lead** devuelve el lead en gestión a **July**. | 3.2.1.3 |
| 21 | **July** traspasa la conversación con su historial y la ficha en la **Conversación**. | 3.2.1.3 |
| 22 | **Conversación** devuelve la conversación derivada a **July**. | 3.2.1.3 |
| 23 | **July** avisa el cambio de asesor al **Prospecto**. | 3.2.1.3 |
| 24 | **Prospecto** continúa la conversación con el **Asesor comercial**. | 3.2.1.3 |
| 25 | **Asesor comercial** programa el recordatorio de documentos y cita a **July**. | 3.2.2.1 |
| 26 | **July** programa el recordatorio en la **Cita**. | 3.2.2.1 |
| 27 | **Cita** devuelve el recordatorio programado a **July**. | 3.2.2.1 |
| 28 | **July** compone el recordatorio de documentos y cita en la **Plantilla de mensaje**. | 3.2.2.1 |
| 29 | **Plantilla de mensaje** devuelve el recordatorio a **July**. | 3.2.2.1 |
| 30 | **July** envía la plantilla de recordatorio a **WhatsApp Business API**. | 3.2.2.1 |
| 31 | **WhatsApp Business API** entrega el recordatorio de documentos y cita al **Prospecto**. | 3.2.2.1 |
| 32 | **Prospecto** confirma su asistencia a la cita a **July**. | 3.2.2.2 |
| 33 | **July** registra la asistencia confirmada en la **Cita**. | 3.2.2.2 |
| 34 | **Cita** devuelve la cita confirmada a **July**. | 3.2.2.2 |
| 35 | **July** avisa la asistencia confirmada al **Personal de agencia**. | 3.2.2.2 |
| 36 | **Personal de agencia** registra la atención de la cita a **July**. | 3.2.2.2 |
| 37 | **July** registra la cita atendida en la **Cita**. | 3.2.2.2 |
| 38 | **Cita** devuelve la cita atendida a **July**. | 3.2.2.2 |
| 39 | **July** avisa la cita atendida al **Asesor comercial**. | 3.2.2.2 |
| 40 | **Asesor comercial** registra los documentos recibidos en la agencia a **July**. | 3.2.2.2 |
| 41 | **July** registra los documentos recibidos en la **Solicitud de crédito**. | 3.2.2.2 |
| 42 | **Solicitud de crédito** devuelve los documentos registrados a **July**. | 3.2.2.2 |
| 43 | **July** pasa la solicitud a resolución en la **Solicitud de crédito**. | 3.2.2.3 |
| 44 | **Solicitud de crédito** devuelve la solicitud en resolución a **July**. | 3.2.2.3 |
| 45 | **July** envía la solicitud de crédito completa al **Comité de crédito**. | 3.2.2.3 |
| 46 | **Comité de crédito** comunica la resolución del crédito a **July**. | 3.2.2.3 |
| 47 | **July** registra la resolución en la **Solicitud de crédito**. | 3.2.2.3 |
| 48 | **Solicitud de crédito** devuelve la resolución registrada a **July**. | 3.2.2.3 |
| 49 | **July** notifica la resolución del crédito al **Asesor comercial**. | 3.2.2.3 |
| 50 | **Asesor comercial** registra el estado final del lead a **July**. | 3.2.2.3 |
| 51 | **July** cierra el lead con su estado final en el **Lead**. | 3.2.2.3 |
| 52 | **Lead** devuelve el lead cerrado a **July**. | 3.2.2.3 |
| 53 | **July** sincroniza el estado final del lead con el **CRM de la cooperativa**. | 3.2.2.3 |
| 54 | **CRM de la cooperativa** devuelve el identificador del lead actualizado a **July**. | 3.2.2.3 |
| 55 | **July** confirma el cierre del lead al **Asesor comercial**. Fin. | 3.2.2.3 |

**Flujos alternativos**

| Paso | Especificación | CU nivel 3 |
|---|---|---|
| | *A4 · El asesor no acepta el lead a tiempo (reemplaza los pasos 18 a 24)* | |
| 18d | **Asesor comercial** deja vencer el plazo de atención a **July**. | 3.2.1.2 |
| 19d | **July** reasigna el lead sin el asesor anterior en el **Lead**. | 3.2.1.1 |
| 20d | **Lead** devuelve el nuevo asesor asignado a **July**. | 3.2.1.1 |
| 21d | **July** informa la reasignación del lead al **Jefe comercial**. | 3.2.1.1 |
| 22d | **Jefe comercial** devuelve el acuse del aviso a **July**. Vuelve al paso 17. | 3.2.1.1 |
| | *A5 · El prospecto no responde al recordatorio (reemplaza el paso 32)* | |
| 32e | **Prospecto** deja vencer el plazo de respuesta del recordatorio a **July**. | 3.2.2.1 |
| 33e | **July** suma el intento de reactivación en el **Lead**. | 3.2.2.1 |
| 34e | **Lead** devuelve los intentos de reactivación que quedan a **July**. | 3.2.2.1 |
| 35e | **July** compone la plantilla de reactivación en la **Plantilla de mensaje**. | 3.2.2.1 |
| 36e | **Plantilla de mensaje** devuelve la plantilla de reactivación a **July**. | 3.2.2.1 |
| 37e | **July** envía la plantilla de reactivación a **WhatsApp Business API**. | 3.2.2.1 |
| 38e | **WhatsApp Business API** entrega la reactivación al **Prospecto**. Continúa en el paso 32. | 3.2.2.1 |
| | *A6 · Se agotan los intentos de reactivación (reemplaza los pasos 35e a 38e)* | |
| 35f | **July** prioriza el lead como frío en el **Lead**. | 3.2.2.1 |
| 36f | **Lead** devuelve la prioridad fría a **July**. | 3.2.2.1 |
| 37f | **July** informa el lead frío con sus intentos de reactivación al **Asesor comercial**. Continúa en el paso 50. | 3.2.2.3 |
| | *A7 · El prospecto pide cambiar la cita (reemplaza el paso 32)* | |
| 32g | **Prospecto** solicita el cambio de fecha de la cita a **July**. | 3.2.2.2 |
| 33g | **July** consulta los horarios para la fecha nueva al **Personal de agencia**. | 3.2.2.2 |
| 34g | **Personal de agencia** devuelve el horario disponible a **July**. | 3.2.2.2 |
| 35g | **July** reprograma la cita en la **Cita**. | 3.2.2.2 |
| 36g | **Cita** devuelve la cita reprogramada a **July**. | 3.2.2.2 |
| 37g | **July** envía la cita reprogramada al **Prospecto**. Vuelve al paso 32. | 3.2.2.2 |

## Reglas transversales

- **R1 · Consentimiento previo.** **July** no pide ni guarda datos personales mientras el consentimiento no esté aceptado; sin consentimiento solo ofrece el menú básico.
- **R2 · Retiro del consentimiento.** Si el **Prospecto** retira su consentimiento, **July** lo registra como rechazado, deja de pedir datos personales y avisa al **Delegado de protección de datos**.
