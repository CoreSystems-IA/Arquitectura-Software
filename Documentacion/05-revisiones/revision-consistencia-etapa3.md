# Revisión de consistencia y trazabilidad · etapa 3

| Campo | Valor |
|---|---|
| **ID** | REV-01 |
| **Versión** | 1.1 |
| **Fecha** | 2026-10-24 |
| **Deriva de** | CAP-03, CU-02 a CU-08, CLS-01 |
| **Estado** | Borrador |

Revisión de la documentación de July con mirada de desarrollo: ¿un equipo podría construir el chatbot solo con estos documentos, sin adivinar? Se buscaron inconsistencias entre documentos, redundancias, ambigüedades y huecos de trazabilidad, y se dejó fuera todo lo que no sirve para construir July.

## Contenido

1. [Qué se revisó y cómo](#1-qué-se-revisó-y-cómo)
2. [Hallazgos corregidos](#2-hallazgos-corregidos)
3. [Decisiones aplicadas](#3-decisiones-aplicadas)
4. [Cadena de trazabilidad](#4-cadena-de-trazabilidad)
5. [Vista de desarrollo](#5-vista-de-desarrollo)

## 1. Qué se revisó y cómo

| Documento | Revisión |
|---|---|
| Índice (`README.md`) | Rutas, filas, estructura y archivos sin registrar. |
| CAP-01 a CAP-03, CU-01 | Nombres de capacidades y etapas, servicios «CU-01» a «CU-25» (hoy SA-01 a SA-25), actores, sincronía del XML con el modelo nativo. |
| CU-02 a CU-05 | Identificadores y nombres de los casos en draw.io frente a CU-08. |
| CU-06 a CU-08 | Coherencia de nombres, flujos, precondiciones, objetivos y numeración de pasos. |
| CLS-01 | Atributos, tipos, multiplicidades, estados, métodos y trazabilidad paso a paso con CU-08. |

La trazabilidad CU-08 → CLS-01 se verifica con un script que lee las tablas de ambos documentos: cada paso de los niveles 1 y 2 tiene método, ningún método cita un paso que no existe, y la tabla 6.2 de CLS-01 lista exactamente los métodos de CU-08 de esos pasos con su conteo. Tras aplicar las decisiones de la sección 3 hay **237 pasos** y **55 métodos**.

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
| C12 | I | CU-08 | El objetivo de CU 3.1.2 decía «sin intervención manual», pero el paso 1 lo dispara el asesor. | Primero se reformuló el objetivo; con P04 el registro pasa a ser automático y el objetivo vuelve a «sin intervención manual», ahora coherente con los pasos. |
| C13 | I | CU-08 | La regla 7 trataba al Comité de crédito, al Jefe comercial y al Equipo de marketing solo como configuración, pero reciben avisos y el comité resuelve créditos. | Regla 7 y tabla de participantes aclaradas. |
| C14 | I | CLS-01 | `Prospecto` exigía nombres, cédula, correo y teléfono, pero se crea con el primer mensaje, cuando aún no los hay (llegan en CU 2.1.1). Lo mismo con la versión y la fecha del consentimiento. | Atributos opcionales; `condicionSocio` empieza en POR_VERIFICAR. |
| C15 | A | CLS-01 | `SistemaCore.consultarSocio()` devolvía `Prospecto \| null`: no distinguía «no es socio» de «el core no respondió», y la actividad registrada no tenía atributo donde guardarse. | Devuelve `CondicionSocio` y completa el prospecto; nuevo atributo `actividadRegistrada`. |
| C16 | R | CLS-01 | La línea de crédito estaba en `Lead` y en `SolicitudCredito`, y la línea que el prospecto elige en CU 2.2.2 no se guardaba en ningún método. | Una sola referencia, `Lead.lineaCredito`; nuevo método `Lead.elegirLinea()` para CU 2.2 (3) y 2.2.2 (5). |
| C17 | R, A | CLS-01 | `Lead.asignacionAceptada` repetía lo que dice `EstadoLead` (ASIGNADO o EN_GESTION), y ningún método llevaba el lead a EN_CAPTURA, PRECALIFICADO, ASIGNADO ni EN_GESTION. | Atributo eliminado; tabla de transiciones con el método y el paso que fija cada estado. |
| C18 | I | CLS-01 | `Lead — Conversacion` era 1 — 1, pero una conversación que solo resolvió una pregunta frecuente no tiene lead. `Lead — LineaCredito` era 0..1, pero `Lead.registrar()` exige la línea. | 0..1 — 1 y * — 1. |
| C19 | I | CLS-01 | «Solo una versión vigente por tipo» de `PlantillaMensaje` impedía tener varias preguntas frecuentes. | Una versión vigente por tipo y clave. |
| C20 | A | CLS-01 | El tiempo de abandono, el plazo de atención del asesor y el máximo de reactivaciones no tenían dónde configurarse. | `July.tiempoAbandono`; parámetros `plazoAtencion` y `maxReactivaciones` en `ReglaNegocio`. |
| C21 | A | CLS-01 | `Mensaje.tipo` era texto libre; `cargaActual` parecía un dato guardado; `agencia` no decía si es nombre o código. | Enumeración `TipoMensaje`; `cargaActual` derivado; `agencia` es un código compartido con `Cita`. |
| C22 | I | CLS-01 | La sección 6.2 decía sumar 244 pasos, pero su columna sumaba 247. | Explicado: tres pasos usan dos métodos. Tras la sección 3: 237 pasos y la columna suma 240. |
| C23 | I | CLS-01 | Los datos de `SolicitudCredito` eran obligatorios, aunque se capturan uno a uno durante EN_CAPTURA. | Opcionales mientras se capturan; confirmar la solicitud exige que estén todos. |

## 3. Decisiones aplicadas

Las once decisiones que quedaron abiertas en la versión 1.0 se aplicaron con la opción recomendada. Lo que no se pudo hacer sin la herramienta de origen está en la columna «Queda».

| # | Tema | Problema | Decisión aplicada | Queda |
|---|---|---|---|---|
| P01 | Identificadores | «CU-NN» nombraba a la vez documentos (CU-01 a CU-08) y servicios ArchiMate («CU-01» a «CU-25»). CU-01 era además un XML de la carpeta CAP. | En CAP-03 los servicios pasan a SA-01 a SA-25 (nombres y documentación). CU-01 se retira y su archivo pasa a ser CAP-05. CAP-01 y CAP-02 quedan Obsoletos y conservan la numeración vieja como historia. | — |
| P02 | Exportaciones | No había XML de CAP-03, y los PNG de los flujos mostraban los nombres de etapa anteriores. | El XML se regeneró desde CAP-03 (CAP-05, `mapa-capacidades-y-casos-de-uso-etapa3.xml`) con `archi-a-open-exchange.py`. El conversor se validó regenerando el XML de CAP-01: coincidieron todos los elementos, relaciones, nodos y conexiones del original. | Volver a exportar desde draw.io los PNG de CU-03 a CU-05 y crear el de CU-02 (draw.io no está instalado en este equipo). |
| P03 | Redundancia de modelos | CAP-02 y CAP-03 eran idénticos. | CAP-03 es el único modelo vigente; CAP-02 queda Obsoleto. Ya no son idénticos: CAP-03 tiene P01 y P08. | — |
| P04 | Orden del flujo 3 | El asesor abría la ficha y pedía el registro en el CRM antes de que el lead se le asignara. | CU 3.1 lo dispara el fin de la precalificación: July consolida la ficha (CU 3.1.1, renombrado «Generar la ficha del prospecto») y registra el lead en el CRM (CU 3.1.2) sin intervención del asesor; si se agotan los reintentos avisa al Jefe comercial. El asesor recibe la ficha con la conversación al aceptar la asignación (CU 3.2.1, paso 7). | — |
| P05 | Entrada al flujo 3 | No se decía si un NO_APTO pasa al asesor. | Pasan APTO y A_REVISAR. Un NO_APTO recibe la alternativa (CU 2.3.2·A1) y solo entra si vuelve a simular y su nueva precalificación cambia. Anotado en CU-08, CU-06 y en la tabla de estados de CLS-01. | — |
| P06 | Frontera de July | Varios pasos ocurrían entre la agencia, el asesor y el comité, sin July, pero CLS-01 les daba métodos de July. | En CU 3.2.2 la agencia registra la atención en July (paso 6), el asesor registra los documentos (8), July envía la solicitud al comité (9) y el comité le comunica la resolución (10). En CU 2.3.1 se quitó el paso interno del comité. `CRMCooperativa.consultarEmbudo()` sale del modelo: el embudo lo calcula el CRM (SA-24, fuera del reto). | — |
| P07 | Alcance del reto | SA-20 a SA-25 no tenían caso en CU-08. | CU-08 declara fuera del reto el back-office de configuración (SA-20 a SA-23) y el embudo (SA-24): la configuración se carga como datos iniciales versionados. SA-25 queda cubierto por las reglas transversales R1 (consentimiento previo) y R2 (retiro del consentimiento, con aviso al Delegado de protección de datos). | — |
| P08 | Actores del modelo | Faltaban el Comité de crédito y el Equipo de marketing. | Añadidos a CAP-03, con sus relaciones de servicio (SA-01 → Equipo de marketing; SA-11 y SA-22 → Comité de crédito) y sus nodos en las vistas de los paquetes 1, 2 y 4. SA-22 sigue sirviendo también al Área de productos, que carga la tabla que el comité aprueba. | Revisar en Archi la ubicación de los tres nodos nuevos. |
| P09 | Orden del flujo 2 | Para simular había que entregar antes la identidad y los ingresos. | CU 2.1.1 pide primero monto, plazo y destino (pasos 2 y 3); con eso el prospecto puede simular (CU 2.2) y luego July retoma la captura. La identidad incluye ahora el teléfono, que faltaba para quien llega por la web. | Validar el cambio con la cooperativa. |
| P10 | Avisos internos | No se sabía por qué canal llegan los avisos de `July.notificar()`. | Los entrega el Servicio de notificaciones del modelo: en el panel si el destinatario es un asesor y por correo si es un área. | — |
| P11 | Plantillas de WhatsApp | La retoma, los recordatorios y las reactivaciones salen fuera de la ventana de 24 horas. | Nuevo atributo `PlantillaMensaje.plantillaProveedor` con el nombre de la plantilla aprobada por Meta, obligatorio para esos tres tipos. | — |

## 4. Cadena de trazabilidad

Cada capacidad de nivel 2 del mapa tiene un caso de nivel 2 en CU-08 y en el diagrama general CU-02, los servicios de CAP-03 que la realizan y las clases de CLS-01 que la implementan.

| Capacidad nivel 2 | Caso de uso (CU-08, CU-02) | Servicio ArchiMate | Clases principales (CLS-01) |
|---|---|---|---|
| 1.1.1 Recepción multicanal | CU 1.1.1 Recibir la consulta por WhatsApp o web | SA-01 | `Canal`, `Conversacion`, `Mensaje` |
| 1.1.2 Unificación de mensajes | CU 1.1.2 Unificar los mensajes entrantes | SA-01 | `Canal`, `July`, `Mensaje` |
| 1.2.1 Atención inmediata | CU 1.2.1 Recibir atención inmediata | SA-01, SA-02, SA-06 | `PlantillaMensaje`, `Prospecto`, `Conversacion` |
| 1.2.2 Identificación del prospecto | CU 1.2.2 Identificar al prospecto y su necesidad | SA-03, SA-04, SA-05 | `LineaCredito`, `SistemaCore`, `Lead` |
| 2.1.1 Captura conversacional | CU 2.1.1 Entregar los datos conversando | SA-07 | `SolicitudCredito`, `Prospecto` |
| 2.1.2 Validación y continuidad | CU 2.1.2 Validar los datos y mantener la continuidad | SA-07, SA-08 | `SolicitudCredito`, `SistemaCore`, `Conversacion` |
| 2.2.1 Cálculo del crédito | CU 2.2.1 Calcular las condiciones del crédito | SA-09, SA-10 | `Simulacion`, `LineaCredito` |
| 2.2.2 Productos y condiciones | CU 2.2.2 Consultar productos y condiciones | SA-21 | `LineaCredito`, `Lead` |
| 2.3.1 Evaluación por reglas | CU 2.3.1 Evaluar al prospecto con reglas | SA-11 | `SolicitudCredito`, `ReglaNegocio`, `SistemaCore` |
| 2.3.2 Orientación y requisitos | CU 2.3.2 Recibir orientación sobre el resultado | SA-11, SA-12 | `SolicitudCredito`, `LineaCredito`, `Cita` |
| 3.1.1 Generación de la ficha | CU 3.1.1 Generar la ficha del prospecto | SA-13 | `Lead`, `ReglaNegocio`, `Conversacion` |
| 3.1.2 Integración con CRM | CU 3.1.2 Registrar el lead en el CRM | SA-14 | `CRMCooperativa`, `Lead` |
| 3.2.1 Asignación a asesor | CU 3.2.1 Recibir el lead asignado | SA-15, SA-16 | `Lead`, `AsesorComercial`, `Conversacion` |
| 3.2.2 Seguimiento y cierre | CU 3.2.2 Hacer seguimiento y cerrar el lead | SA-17, SA-18, SA-19 | `Cita`, `Lead`, `SolicitudCredito`, `CRMCooperativa` |

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
