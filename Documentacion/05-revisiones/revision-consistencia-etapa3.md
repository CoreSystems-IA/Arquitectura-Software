# Revisión de consistencia y trazabilidad · etapa 3

| Campo | Valor |
|---|---|
| **ID** | REV-01 |
| **Versión** | 1.0 |
| **Fecha** | 2026-10-24 |
| **Deriva de** | CAP-03, CU-02 a CU-08, CLS-01 |
| **Estado** | Borrador |

Revisión de la documentación de July con mirada de desarrollo: ¿un equipo podría construir el chatbot solo con estos documentos, sin adivinar? Se buscaron inconsistencias entre documentos, redundancias, ambigüedades y huecos de trazabilidad, y se dejó fuera todo lo que no sirve para construir July.

## Contenido

1. [Qué se revisó y cómo](#1-qué-se-revisó-y-cómo)
2. [Hallazgos corregidos](#2-hallazgos-corregidos)
3. [Decisiones pendientes](#3-decisiones-pendientes)
4. [Cadena de trazabilidad](#4-cadena-de-trazabilidad)
5. [Vista de desarrollo](#5-vista-de-desarrollo)

## 1. Qué se revisó y cómo

| Documento | Revisión |
|---|---|
| Índice (`README.md`) | Rutas, filas, estructura y archivos sin registrar. |
| CAP-01 a CAP-03, CU-01 | Nombres de capacidades y etapas, servicios «CU-01» a «CU-25», actores, sincronía del XML con el modelo nativo. |
| CU-02 a CU-05 | Identificadores y nombres de los casos en draw.io frente a CU-08. |
| CU-06 a CU-08 | Coherencia de nombres, flujos, precondiciones, objetivos y numeración de pasos. |
| CLS-01 | Atributos, tipos, multiplicidades, estados, métodos y trazabilidad paso a paso con CU-08. |

La trazabilidad CU-08 → CLS-01 se verificó con un script que lee las tablas de ambos documentos: los **245 pasos** de los niveles 1 y 2 tienen método, ningún método cita un paso que no existe y los **56 métodos** de la sección 4 coinciden con la sección 6.2.

## 2. Hallazgos corregidos

Tipos: **I** inconsistencia entre documentos, **R** redundancia, **A** ambigüedad, **T** hueco de trazabilidad.

| # | Tipo | Documento | Hallazgo | Corrección |
|---|---|---|---|---|
| C01 | I | Índice | Las filas de REF-02 y CAP-01 estaban fusionadas en una sola; REF-02 no tenía fecha ni estado. | Filas separadas. A REF-02 se le asignó 2026-10-21 (primer registro en el repositorio) y Aprobado; confirmar. |
| C02 | I | Índice | Las rutas no tenían las subcarpetas `Bibliografia/` y `Archi/`, y los enlaces estaban rotos. El árbol de estructura no reflejaba las carpetas reales. | Rutas y árbol corregidos. |
| C03 | T | Índice | El PNG del mapa y los PNG de los tres flujos no estaban registrados. | PNG del mapa registrado como CAP-04; los PNG de flujo, junto a su diagrama (CU-03 a CU-05). |
| C04 | R | CAP-02 | Se versionaba `…etapa2.archimate.bak`, copia anterior de CAP-02 con los nombres de etapa viejos. | Eliminado; `.gitignore` excluye `*.bak`. |
| C05 | I | CU-03 a CU-08 | El mapa (CAP-02, CAP-03, CAP-04) nombra las etapas Canales de contacto, Primer contacto, Perfilamiento, Simulación financiera, Precalificación, Entrega de oportunidades y Asignación y seguimiento. Los diagramas y especificaciones seguían con los nombres anteriores (Medios de contacto, Contacto, Perfil, Simulación, Calificación, Entrega, Seguimiento). | Nombres del mapa en todos los documentos y diagramas. |
| C06 | I | CAP-02, CAP-03 | La etapa « Primer contacto» tenía un espacio inicial. | Quitado. |
| C07 | A | CU-02 | El diagrama general numeraba sus 14 casos «CU-01» a «CU-14» con nombres distintos a los de nivel 2 de CU-08. «CU-08» significaba tres cosas: un documento, un servicio ArchiMate y un caso del diagrama. | Casos renumerados CU 1.1.1 a CU 3.2.2 con los nombres de CU-08. |
| C08 | R | CU-07, CU-08 | Los 14 casos de nivel 2 estaban especificados dos veces con números de paso distintos: «CU 2.3.1.3, pasos …» daba dos respuestas según el documento. | CU-07 pasa a Obsoleto con una nota que remite a CU-08. |
| C09 | T | CU-08, CAP-03 | No había enlace entre los 25 servicios del modelo ArchiMate y los casos de CU-08. | Tabla de correspondencia en CU-08, derivada de las realizaciones de capacidades del modelo. |
| C10 | A | CU-08 | CU 1.2.2 consulta al Sistema core «por el teléfono», pero quien llega por el widget web aún no lo ha dado. | Flujo alternativo A4 (paso 5d): el lead queda «socio por verificar» y se resuelve en CU 2.3.1 con la cédula. |
| C11 | A | CU-08, CLS-01 | En CU 2.3.2 (paso 12) la cita quedaba «confirmada» al reservarla, y en CU 3.2.2 (paso 4) «confirmada» era la asistencia del prospecto. | Paso 12 deja la cita RESERVADA; CLS-01 documenta las transiciones de `EstadoCita`. |
| C12 | I | CU-08 | El objetivo de CU 3.1.2 decía «sin intervención manual», pero el paso 1 lo dispara el asesor. | Objetivo: «a pedido del asesor, sin que nadie lo digite». |
| C13 | I | CU-08 | La regla 7 trataba al Comité de crédito, al Jefe comercial y al Equipo de marketing solo como configuración, pero reciben avisos y el comité resuelve créditos. | Regla 7 y tabla de participantes aclaradas. |
| C14 | I | CLS-01 | `Prospecto` exigía nombres, cédula, correo y teléfono, pero se crea con el primer mensaje, cuando aún no los hay (llegan en CU 2.1.1). Lo mismo con la versión y la fecha del consentimiento. | Atributos opcionales; `condicionSocio` empieza en POR_VERIFICAR. |
| C15 | A | CLS-01 | `SistemaCore.consultarSocio()` devolvía `Prospecto \| null`: no distinguía «no es socio» de «el core no respondió», y la actividad registrada no tenía atributo donde guardarse. | Devuelve `CondicionSocio` y completa el prospecto; nuevo atributo `actividadRegistrada`. |
| C16 | R | CLS-01 | La línea de crédito estaba en `Lead` y en `SolicitudCredito`, y la línea que el prospecto elige en CU 2.2.2 no se guardaba en ningún método. | Una sola referencia, `Lead.lineaCredito`; nuevo método `Lead.elegirLinea()` para CU 2.2 (3) y 2.2.2 (5). |
| C17 | R, A | CLS-01 | `Lead.asignacionAceptada` repetía lo que dice `EstadoLead` (ASIGNADO o EN_GESTION), y ningún método llevaba el lead a EN_CAPTURA, PRECALIFICADO, ASIGNADO ni EN_GESTION. | Atributo eliminado; tabla de transiciones con el método y el paso que fija cada estado. |
| C18 | I | CLS-01 | `Lead — Conversacion` era 1 — 1, pero una conversación que solo resolvió una pregunta frecuente no tiene lead. `Lead — LineaCredito` era 0..1, pero `Lead.registrar()` exige la línea. | 0..1 — 1 y * — 1. |
| C19 | I | CLS-01 | «Solo una versión vigente por tipo» de `PlantillaMensaje` impedía tener varias preguntas frecuentes. | Una versión vigente por tipo y clave. |
| C20 | A | CLS-01 | El tiempo de abandono, el plazo de atención del asesor y el máximo de reactivaciones no tenían dónde configurarse. | `July.tiempoAbandono`; parámetros `plazoAtencion` y `maxReactivaciones` en `ReglaNegocio`. |
| C21 | A | CLS-01 | `Mensaje.tipo` era texto libre; `cargaActual` parecía un dato guardado; `agencia` no decía si es nombre o código. | Enumeración `TipoMensaje`; `cargaActual` derivado; `agencia` es un código compartido con `Cita`. |
| C22 | I | CLS-01 | La sección 6.2 decía sumar 244 pasos, pero su columna sumaba 247. | Explicado: tres pasos usan dos métodos. Hoy: 245 pasos, la columna suma 248. |
| C23 | I | CLS-01 | Los datos de `SolicitudCredito` eran obligatorios, aunque se capturan uno a uno durante EN_CAPTURA. | Opcionales mientras se capturan; confirmar la solicitud exige que estén todos. |

## 3. Decisiones pendientes

Son cambios de alcance o de negocio, o requieren abrir Archi o draw.io. Se recomienda una opción para cada uno.

| # | Tema | Problema | Recomendación |
|---|---|---|---|
| P01 | Identificadores | «CU-NN» nombra a la vez documentos (CU-01 a CU-08) y servicios ArchiMate («CU-01» a «CU-25»). Además, CU-01 es un XML de la carpeta `02-mapa-capacidades/`, cuyo prefijo es CAP. | Renombrar en Archi los servicios a «SA-NN» (servicio de aplicación), volver a exportar el XML y dar a la exportación un ID CAP. Mientras tanto, el índice explica cómo citar cada uno. |
| P02 | Exportaciones | El XML (CU-01) es la exportación de CAP-01; no hay exportación de CAP-03, que añade el flujo de valor. Los PNG de CU-03 a CU-05 muestran todavía los nombres de etapa anteriores, y CU-02 no tiene PNG. | En Archi: *Archivo › Exportar › Open Exchange* desde CAP-03. En draw.io: volver a exportar los cuatro PNG. |
| P03 | Redundancia de modelos | CAP-02 y CAP-03 son el mismo archivo, byte a byte. | Trabajar solo en CAP-03 y marcar CAP-02 como Obsoleto cuando CAP-03 se apruebe. |
| P04 | Orden del flujo 3 | En CU 3.1 el asesor abre la ficha y pide registrar el lead en el CRM, pero el lead recién se le asigna en CU 3.2.1, cuyo disparador es «lead en el CRM sin asesor». No queda claro qué asesor abre la ficha. | Que July genere la ficha y sincronice el CRM al terminar la precalificación, sin esperar a un asesor; luego asigna; el asesor asignado revisa la ficha. Hay que reescribir los pasos 1 de CU 3.1.1 y 3.1.2. |
| P05 | Entrada al flujo 3 | No se dice si un prospecto NO_APTO pasa al asesor. | Pasan APTO y A_REVISAR. Un NO_APTO recibe la alternativa (CU 2.3.2·A1) y solo pasa si vuelve a simular y cambia el resultado. |
| P06 | Frontera de July | En los pasos 6 a 9 de CU 3.2.2, en el 9b de CU 2.3.1 y en el último paso de CU 3.2 y CU 3.2.2 (el CRM actualiza el embudo) July no participa, pero CLS-01 les asigna métodos de July (`Cita.actualizarEstado(ATENDIDA)`, `registrarDocumento()`, `SolicitudCredito.actualizarEstado()` con EN_RESOLUCION, APROBADA o NEGADA, `consultarEmbudo()`). | Decidir quién informa a July: lo más simple es que el asesor lo registre desde su panel (receptor July). Si no, quitar esos métodos del alcance. |
| P07 | Alcance del reto | Los servicios ArchiMate «CU-20», «CU-22» y «CU-23» (configuración), «CU-24» (trazabilidad y embudo) y «CU-25» (derechos sobre datos, LOPDP) no tienen caso en CU-08, y el Delegado de protección de datos no aparece. | Declarar CU-20 a CU-24 como back-office fuera del reto: la configuración se carga con datos iniciales versionados. CU-25 es obligación legal: especificar al menos el retiro del consentimiento y la eliminación de datos. |
| P08 | Actores del modelo | CAP-03 no tiene al Comité de crédito ni al Equipo de marketing, y «CU-22 Configurar reglas de precalificación» sirve al Área de productos, mientras CU-08 dice que las reglas las publica el Comité. | Añadir ambos actores en Archi y que CU-22 sirva al Comité. |
| P09 | Orden del flujo 2 | Para simular (CU 2.2), CU-08 exige la captura completa (cédula, ingresos, actividad) de CU 2.1. En captación conviene que la persona vea su cuota antes de dar datos personales. | Permitir CU 2.2 con solo la línea, el monto y el plazo, y pedir identidad e ingresos antes de precalificar. Es un cambio de negocio; validarlo con la cooperativa. |
| P10 | Avisos internos | El modelo tiene un «Servicio de notificaciones»; CLS-01 solo dice `July.notificar(destinatario, contenido)`. No se sabe por qué canal llegan los avisos. | Definir el canal (correo, panel del asesor o tarea en el CRM) y modelar el servicio como interfaz si es externo. |
| P11 | Plantillas de WhatsApp | La retoma, los recordatorios y las reactivaciones salen fuera de la ventana de 24 horas de WhatsApp, y Meta solo permite enviar ahí plantillas aprobadas. CLS-01 no guarda ese vínculo. | Añadir a `PlantillaMensaje` el nombre de la plantilla aprobada en el proveedor. |

## 4. Cadena de trazabilidad

Cada capacidad de nivel 2 del mapa tiene un caso de nivel 2 en CU-08, uno en el diagrama general CU-02 y las clases de CLS-01 que lo realizan.

| Capacidad nivel 2 | Caso de uso (CU-08, CU-02) | Servicio ArchiMate | Clases principales (CLS-01) |
|---|---|---|---|
| 1.1.1 Recepción multicanal | CU 1.1.1 Recibir la consulta por WhatsApp o web | «CU-01» | `Canal`, `Conversacion`, `Mensaje` |
| 1.1.2 Unificación de mensajes | CU 1.1.2 Unificar los mensajes entrantes | «CU-01» | `Canal`, `July`, `Mensaje` |
| 1.2.1 Atención inmediata | CU 1.2.1 Recibir atención inmediata | «CU-01», «CU-02», «CU-06» | `PlantillaMensaje`, `Prospecto`, `Conversacion` |
| 1.2.2 Identificación del prospecto | CU 1.2.2 Identificar al prospecto y su necesidad | «CU-03», «CU-04», «CU-05» | `LineaCredito`, `SistemaCore`, `Lead` |
| 2.1.1 Captura conversacional | CU 2.1.1 Entregar los datos conversando | «CU-07» | `SolicitudCredito`, `Prospecto` |
| 2.1.2 Validación y continuidad | CU 2.1.2 Validar los datos y mantener la continuidad | «CU-07», «CU-08» | `SolicitudCredito`, `SistemaCore`, `Conversacion` |
| 2.2.1 Cálculo del crédito | CU 2.2.1 Calcular las condiciones del crédito | «CU-09», «CU-10» | `Simulacion`, `LineaCredito` |
| 2.2.2 Productos y condiciones | CU 2.2.2 Consultar productos y condiciones | «CU-21» | `LineaCredito`, `Lead` |
| 2.3.1 Evaluación por reglas | CU 2.3.1 Evaluar al prospecto con reglas | «CU-11» | `SolicitudCredito`, `ReglaNegocio`, `SistemaCore` |
| 2.3.2 Orientación y requisitos | CU 2.3.2 Recibir orientación sobre el resultado | «CU-11», «CU-12» | `SolicitudCredito`, `LineaCredito`, `Cita` |
| 3.1.1 Generación de la ficha | CU 3.1.1 Revisar la ficha del prospecto | «CU-13» | `Lead`, `ReglaNegocio`, `Conversacion` |
| 3.1.2 Integración con CRM | CU 3.1.2 Registrar el lead en el CRM | «CU-14» | `CRMCooperativa`, `Lead` |
| 3.2.1 Asignación a asesor | CU 3.2.1 Recibir el lead asignado | «CU-15», «CU-16» | `Lead`, `AsesorComercial`, `Conversacion` |
| 3.2.2 Seguimiento y cierre | CU 3.2.2 Hacer seguimiento y cerrar el lead | «CU-17», «CU-18», «CU-19» | `Cita`, `Lead`, `SolicitudCredito`, `CRMCooperativa` |

El detalle por paso está en CU-08 (columna «CU nivel 3») y en CLS-01 (columna «Pasos de CU-08» y sección 6).

## 5. Vista de desarrollo

Cómo se construiría July a partir de CLS-01, para comprobar que el modelo alcanza. Usa el stack del equipo (portada del repositorio).

### Componentes

| Componente | Qué hace | Clases que implementa |
|---|---|---|
| Adaptadores de canal | Webhook de WhatsApp Cloud API (verificación de la firma `X-Hub-Signature-256`) y widget web por WebSocket con token de sesión. Convierten cada carga al `Mensaje` común y responden el acuse en milisegundos. | `Canal`, `Mensaje` |
| Cola de entrada | Redis: desacopla el acuse del procesamiento y absorbe los picos (CU 1.1.2.2). La clave `idExterno` evita procesar dos veces un mensaje que el proveedor reenvía. | `July.atender()` |
| Motor de conversación | Máquina de estados por conversación (`ultimoPaso`). La captura pide el siguiente dato con `campoPendiente()` y lo guarda con `registrarDato()`. Exige el consentimiento antes de pedir datos personales. | `July`, `Conversacion`, `SolicitudCredito` |
| Comprensión del lenguaje | Un LLM solo clasifica la intención (línea de crédito o pregunta frecuente) y extrae valores del texto libre. Su salida se valida contra las enumeraciones y el catálogo; si no encaja, July pregunta con opciones cerradas (CU 1.2.2·A1). | `LineaCredito.buscar()`, `PlantillaMensaje.buscarRespuesta()` |
| Motor financiero y de reglas | Código determinista, sin LLM: cuota fija y tabla de amortización, costo total, capacidad de pago y clasificación con la `ReglaNegocio` vigente. El resultado se comunica como preliminar y no vinculante. | `Simulacion`, `SolicitudCredito.precalificar()` |
| Integraciones | Clientes del Sistema core y del CRM con tiempo máximo, reintentos con espera progresiva y bandeja de salida para no perder envíos (CU 3.1.2.3). | `SistemaCore`, `CRMCooperativa` |
| Temporizador | Trabajos programados para el abandono (`tiempoAbandono`), el vencimiento del plazo de atención, los recordatorios y las reactivaciones. Corresponde al evento «Temporizador: pendiente vencido» del modelo. | `Conversacion.marcarAbandonada()`, `Lead.asignar()`, `Cita.programarRecordatorio()`, `Lead.reactivar()` |
| Panel del asesor | Web (Next.js): disponibilidad, bandeja de leads, ficha, toma de la conversación en tiempo real y registro del cierre. | `AsesorComercial`, `Lead`, `Conversacion.traspasar()` |

### Datos

- Una tabla por cada clase «entidad» de CLS-01 (11), con las enumeraciones como tipos `ENUM` o restricciones `CHECK` en PostgreSQL.
- `Decimal` se guarda como `NUMERIC(14,2)` para dinero y `NUMERIC(7,4)` para tasas; nunca como coma flotante.
- La configuración (`LineaCredito`, `PlantillaMensaje`, `ReglaNegocio`) se versiona: un índice único parcial garantiza una sola versión vigente por tipo (y clave), y cada `Simulacion` copia la tasa con la que se calculó.
- La cédula se valida con el dígito verificador (módulo 10) antes de consultar el core. Cédula y teléfono se cifran en reposo.
- Cada cambio de estado de `Lead`, `SolicitudCredito` y `Cita` deja un registro de auditoría: sirve al embudo y a la LOPDP.

### Pruebas

Cada flujo de CU-08 es un guion de prueba de extremo a extremo: los pasos del flujo principal y de cada alternativo se escriben como conversación esperada contra un core y un CRM simulados. Así la trazabilidad llega hasta las pruebas: paso de CU-08 → método de CLS-01 → prueba.

### Orden de construcción sugerido

1. Flujo 1 completo (canales, consentimiento, intención, lead), porque es el que mide la meta de responder en menos de 2 minutos.
2. Flujo 2 (captura, simulación, precalificación, cita), después de resolver P09.
3. Flujo 3 (ficha, CRM, asignación, seguimiento), después de resolver P04, P05 y P06.
