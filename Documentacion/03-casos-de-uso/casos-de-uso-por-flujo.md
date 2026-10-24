# Casos de uso de July por flujo de valor

**ID:** CU-06 · **Versión:** 1.1 · **Fecha:** 2026-10-24 · **Estado:** Borrador  
**Deriva de:** CU-03 a CU-05 (diagramas de draw.io por flujo de valor)  
**Especificación completa:** [CU-08](especificaciones-casos-de-uso.md)

Hay un diagrama de draw.io por cada flujo de valor. En cada uno, el actor principal solo inicia los casos de nivel 1, que son las etapas de valor. Cada caso de nivel 1 incluye («include») sus casos de nivel 2, y estos incluyen sus casos de nivel 3, que salen de las capacidades del mapa. Los actores externos solo participan en el nivel 3.

## Flujo de valor 1: Atracción y primer contacto

Actor principal: **Prospecto**. Archivo: `casos-de-uso-flujo-01-….drawio`.

### Nivel 1 · 1.1 Contactar a July por un canal digital (etapa Canales de contacto)

**Nivel 2 · 1.1.1 Recibir la consulta por WhatsApp o web**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 1.1.1.1 | Recibir el mensaje por WhatsApp | WhatsApp Business API |
| 1.1.1.2 | Abrir el chat desde el sitio web | Widget web |
| 1.1.1.3 | Etiquetar el origen de la conversación | Equipo de marketing |

**Nivel 2 · 1.1.2 Unificar los mensajes entrantes**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 1.1.2.1 | Convertir el mensaje a un formato común | WhatsApp Business API, Widget web |
| 1.1.2.2 | Encolar mensajes en picos de demanda | Ninguno, lo resuelve July |
| 1.1.2.3 | Verificar la firma del webhook | WhatsApp Business API |

### Nivel 1 · 1.2 Recibir el primer contacto (etapa Primer contacto)

**Nivel 2 · 1.2.1 Recibir atención inmediata**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 1.2.1.1 | Recibir saludo y menú de opciones | Administrador del asistente |
| 1.2.1.2 | Aceptar el aviso de privacidad | Ninguno, lo resuelve July |
| 1.2.1.3 | Derivar a un asesor humano | Asesor comercial |

**Nivel 2 · 1.2.2 Identificar al prospecto y su necesidad**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 1.2.2.1 | Detectar la intención de crédito | Ninguno, lo resuelve July |
| 1.2.2.2 | Reconocer si ya es socio | Sistema core |
| 1.2.2.3 | Registrar el lead | Ninguno, lo resuelve July |

## Flujo de valor 2: Captura, simulación y precalificación

Actor principal: **Prospecto**. Archivo: `casos-de-uso-flujo-02-….drawio`.

### Nivel 1 · 2.1 Completar el perfil del crédito (etapa Perfilamiento)

**Nivel 2 · 2.1.1 Entregar los datos conversando**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.1.1.1 | Registrar identidad y contacto | Ninguno, lo resuelve July |
| 2.1.1.2 | Declarar ingresos y actividad | Ninguno, lo resuelve July |
| 2.1.1.3 | Indicar monto, plazo y destino | Ninguno, lo resuelve July |

**Nivel 2 · 2.1.2 Validar los datos y mantener la continuidad**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.1.2.1 | Validar cédula, teléfono y montos | Sistema core |
| 2.1.2.2 | Guardar el avance de la conversación | Ninguno, lo resuelve July |
| 2.1.2.3 | Retomar la conversación abandonada | WhatsApp Business API |

### Nivel 1 · 2.2 Simular el crédito (etapa Simulación financiera)

**Nivel 2 · 2.2.1 Calcular las condiciones del crédito**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.2.1.1 | Calcular cuota y tabla de amortización | Ninguno, lo resuelve July |
| 2.2.1.2 | Mostrar el total a pagar | Ninguno, lo resuelve July |
| 2.2.1.3 | Comparar escenarios de monto y plazo | Ninguno, lo resuelve July |

**Nivel 2 · 2.2.2 Consultar productos y condiciones**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.2.2.1 | Consultar el catálogo de líneas | Área de productos y crédito |
| 2.2.2.2 | Consultar tasas y plazos por línea | Área de productos y crédito |
| 2.2.2.3 | Consultar requisitos por línea | Área de productos y crédito |

### Nivel 1 · 2.3 Obtener la precalificación (etapa Precalificación)

**Nivel 2 · 2.3.1 Evaluar al prospecto con reglas**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.3.1.1 | Evaluar la capacidad de pago | Comité de crédito |
| 2.3.1.2 | Revisar edad, actividad y condición de socio | Sistema core |
| 2.3.1.3 | Clasificar como apto, a revisar o no apto | Comité de crédito |

**Nivel 2 · 2.3.2 Recibir orientación sobre el resultado**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 2.3.2.1 | Recibir la explicación del resultado | Ninguno, lo resuelve July |
| 2.3.2.2 | Consultar los documentos a preparar | Ninguno, lo resuelve July |
| 2.3.2.3 | Agendar una cita en agencia | Personal de agencia |

## Flujo de valor 3: Entrega, seguimiento y conversión

Actor principal: **Asesor comercial**. Archivo: `casos-de-uso-flujo-03-….drawio`.

### Nivel 1 · 3.1 Recibir la oportunidad precalificada (etapa Entrega de oportunidades)

**Nivel 2 · 3.1.1 Revisar la ficha del prospecto**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 3.1.1.1 | Consolidar datos, simulación y resultado | Ninguno, lo resuelve July |
| 3.1.1.2 | Priorizar el lead (caliente, tibio, frío) | Jefe comercial |
| 3.1.1.3 | Adjuntar el historial de conversación | Ninguno, lo resuelve July |

**Nivel 2 · 3.1.2 Registrar el lead en el CRM**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 3.1.2.1 | Crear o actualizar el lead en el CRM | CRM de la cooperativa |
| 3.1.2.2 | Controlar registros duplicados | CRM de la cooperativa |
| 3.1.2.3 | Reintentar el envío ante fallos | CRM de la cooperativa |

### Nivel 1 · 3.2 Dar seguimiento al lead hasta su cierre (etapa Asignación y seguimiento)

**Nivel 2 · 3.2.1 Recibir el lead asignado**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 3.2.1.1 | Enrutar por agencia, producto o carga | Jefe comercial |
| 3.2.1.2 | Notificar al asesor del lead nuevo | Ninguno, lo resuelve July |
| 3.2.1.3 | Tomar la conversación con su historial | Prospecto |

**Nivel 2 · 3.2.2 Hacer seguimiento y cerrar el lead**

| Nivel 3 | Caso de uso | Actores externos |
|---|---|---|
| 3.2.2.1 | Enviar recordatorios y reactivar | Prospecto, WhatsApp Business API |
| 3.2.2.2 | Confirmar la cita en agencia | Prospecto, Personal de agencia |
| 3.2.2.3 | Actualizar el estado y registrar el cierre | CRM de la cooperativa, Jefe comercial, Comité de crédito |
