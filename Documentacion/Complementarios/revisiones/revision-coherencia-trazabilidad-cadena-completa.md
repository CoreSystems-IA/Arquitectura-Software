# Revisión de coherencia y trazabilidad · cadena completa (01 a 10)

| Campo | Valor |
|---|---|
| **ID** | REV-03 |
| **Versión** | 1.0 |
| **Fecha** | 2026-11-18 |
| **Estado** | Borrador |
| **Deriva de** | CAP-03, CAP-05, CU-02 a CU-09, DOM-01, DOM-02, CLS-01, CLS-02, SEC-01, ROB-01, LIN-01, DAT-01, DAT-02, SAD-01 a SAD-03, PRE-01, PRE-02, PRO-01, NEG-01, REV-01, REV-02 y el README del repositorio |
| **Relacionado con** | [REV-02](../planes/plan-trazabilidad-flujos-unificados.md) (reglas V1 a V8), [`Documentacion/README.md`](../../README.md) |

Revisión de toda la documentación en busca de incoherencias y de eslabones de trazabilidad rotos. Las reglas V1 a V8 de REV-02 cubren la cadena hasta ROB-01 y hoy salen en OK; esta revisión mira lo que esas reglas no cubren: el mapa contra los casos de uso, los diagramas de casos de uso, el linaje, el modelo de datos, los documentos complementarios, la portada y el índice. **Ningún documento se modificó**: cada hallazgo trae una propuesta de corrección.

## Contenido

1. [Qué se verificó y salió bien](#1-qué-se-verificó-y-salió-bien)
2. [Resumen de hallazgos](#2-resumen-de-hallazgos)
3. [Hallazgos de prioridad alta](#3-hallazgos-de-prioridad-alta)
4. [Hallazgos de prioridad media](#4-hallazgos-de-prioridad-media)
5. [Hallazgos de prioridad baja](#5-hallazgos-de-prioridad-baja)
6. [Orden sugerido de corrección](#6-orden-sugerido-de-corrección)

## 1. Qué se verificó y salió bien

| Comprobación | Cómo | Resultado |
|---|---|---|
| Reglas V1 a V8 (CU-06 → CU-08 → DOM-01 → CLS-01 → CLS-02 → SEC-01 → ROB-01 y enlaces) | `python3 Complementarios/revisiones/verificar-trazabilidad.py` | OK en las 8 reglas |
| CAP-05 sincronizado con CAP-03 | Se regeneró el XML con `archi-a-open-exchange.py` y se comparó byte a byte | Idéntico: 118 elementos, 215 relaciones, 7 vistas |
| CU-09 igual a CU-08 | Comparación paso a paso de la oración y el caso de nivel 3 | 282 pasos idénticos; 183 llamadas y 99 retornos, como dicen CU-08 y CLS-01 |
| CU-03 a CU-05 contra CU-06 | Actores externos de cada caso de nivel 3 en los `.drawio` | Coinciden en los 42 casos |
| Controles de ROB-01 contra CLS-01 | Los 51 controles de las 3 páginas contra la tabla de controles de CLS-01 | Coinciden nombre y método |
| Reglas de robustez | Ninguna conexión actor–control, actor–entidad, borde–entidad ni entidad–entidad | Sin violaciones |
| DAT-02 contra DAT-01 | Conteo de objetos del DDL | 26 tablas, 17 tipos, 39 FK, 28 `CHECK` con nombre, 6 triggers y 4 vistas, como declara DAT-01 |
| Atributos de CLS-01 en DAT-02 | Cada atributo de cada clase «entidad» contra las columnas del DDL | Todos tienen columna, tabla hija o tratamiento explicado en DAT-01, sección 7.4 |
| Prototipo PRO-01 | Se regeneró `pasos.js` desde CU-09 y CLS-01, y se ejecutaron las pruebas | `pasos.js` sincronizado; pruebas OK con 281 de 282 pasos |

## 2. Resumen de hallazgos

| ID | Prioridad | Hallazgo | Documentos |
|---|---|---|---|
| [A-01](#a-01) | Alta | La matriz tiene ciclos de derivación y `PanelCooperativa` no sale de la especificación ni del dominio | README, CLS-01, CLS-02, SEC-01, ROB-01 |
| [A-02](#a-02) | Alta | El diagrama general de casos de uso (CU-02) no coincide con CU-06, y CU-02 a CU-05 derivan de un modelo obsoleto | CU-02 a CU-05, CU-06, README |
| [A-03](#a-03) | Alta | El flujo 3 supone una cita que el flujo 2 deja como opcional, y su alternativo A1 es inalcanzable | CU-08, CLS-01, PRO-01, DAT-01 |
| [A-04](#a-04) | Alta | Servicios, actores y componentes del mapa que no llegan a la cadena | CAP-03, CU-06, CU-08, CLS-01, SEC-01, ROB-01 |
| [A-05](#a-05) | Alta | Cambios de estado ocultos: métodos que modifican otra clase sin un paso que lo muestre | CU-08, CLS-01, SEC-01 |
| [A-06](#a-06) | Alta | El modelo de datos va por delante del diccionario: tablas y columnas sin clase ni atributo de origen | DAT-01, DAT-02, LIN-01, CLS-01 |
| [M-01](#m-01) | Media | CLS-01 cita al revés los pasos de `Canal.recibir()` y `Canal.abrirSesion()` | CLS-01 |
| [M-02](#m-02) | Media | CLS-01 v3.2 quedó a medias: las relaciones 40 y 41 no aparecen en `July`, `Colaborador` ni en la tabla de resumen | CLS-01 |
| [M-03](#m-03) | Media | LIN-01: la matriz CRUD contradice su propia regla M7, y su encabezado no coincide con el índice | LIN-01, README |
| [M-04](#m-04) | Media | SAD-03: una tabla con tres dueños, una tabla sin dueño, un sistema externo nuevo y otra lectura de SA-24 | SAD-03, CU-08, DAT-01 |
| [M-05](#m-05) | Media | Documentos con cifras y cadena desactualizadas | SAD-01, PRE-01, PRE-02, REV-02, README del repositorio |
| [M-06](#m-06) | Media | El PNG de CLS-02 es de la versión 1 y la portada lo muestra | CLS-02, README del repositorio |
| [M-07](#m-07) | Media | El prototipo tiene atributos y una clase que no están en CLS-01 | PRO-01, CLS-01, PRE-02 |
| [B-01](#b-01) | Baja | Capacidades nombradas por la tecnología que las implementa | CAP-03, REF-02 |
| [B-02](#b-02) | Baja | La afiliación de la capacidad 2.3.2.3 no tiene caso ni paso | CAP-03, CU-06, CU-08 |
| [B-03](#b-03) | Baja | El alternativo A6 del flujo 2 casi no se puede alcanzar | CU-08 |
| [B-04](#b-04) | Baja | Cifra imprecisa en la regla 4 de CLS-01 | CLS-01 |
| [B-05](#b-05) | Baja | Convenciones del índice sin cumplir | REF-02, CU-07, plantillas, README |
| [B-06](#b-06) | Baja | La verificación automática no cubre la mitad de la cadena | REV-02 |

## 3. Hallazgos de prioridad alta

<a id="a-01"></a>
### A-01 · Ciclos de derivación y `PanelCooperativa` sin origen

**Evidencia.**

- En la matriz del índice, CLS-01 deriva de ROB-01; ROB-01 deriva de SEC-01 y CLS-02; CLS-02 deriva de CLS-01, ROB-01 y SEC-01; SEC-01 deriva de CLS-02. Hay dos ciclos: CLS-01 → CLS-02 → ROB-01 → CLS-01 y CLS-02 ↔ SEC-01. La portada y CLAUDE.md dicen que «cada artefacto deriva del anterior», en orden.
- La clase `PanelCooperativa` (CLS-01 v3.2) viene de ROB-01, no de CU-08 ni de DOM-01. No está en la tabla de participantes de CU-08, no es actor de CU-06, no tiene métodos y sus relaciones 40 y 41 no salen de ninguna pareja sujeto → receptor. Esto contradice la introducción de CLS-01: «cada relación sale de una pareja sujeto → receptor o de un concepto del dominio».
- REV-02 (sección 8) todavía dice que el panel «no es una línea de vida de SEC-01 ni una clase de CLS-02».
- CLS-01 clasifica el panel como «Sistema externo», pero lo describe como la vista de los colaboradores, es decir, parte del sistema que se diseña.

**Propuesta.** Separar en la matriz la **derivación** (de dónde sale el contenido) de la **alineación** (con qué debe ser coherente). Ejemplo: CLS-01 deriva de DOM-01 y CU-08, y se alinea con ROB-01. Para el panel hay dos caminos: (a) llevarlo a CU-08 como participante y bajarlo por la cadena, o (b) quitar la clase y dejarlo como vista marcada en ROB-01, como estaba. En cualquiera de los dos, su categoría debe ser «Borde del sistema» y no «Sistema externo». Actualizar la nota de REV-02.

<a id="a-02"></a>
### A-02 · CU-02 no coincide con CU-06, y CU-02 a CU-05 derivan de CAP-02

**Evidencia** (`casos-de-uso-july.drawio` contra `casos-de-uso-por-flujo.md`):

| En CU-06 | En CU-02 |
|---|---|
| El Comité de crédito participa en 2.3.1.1, 2.3.1.3 y 3.2.2.3 | No aparece el Comité de crédito. El Área de productos y crédito está unida a CU 2.3.1 |
| El Sistema core participa en 2.1.2.1 y 2.3.1.2 | Solo está unido a CU 1.2.2 |
| El Widget web participa en 1.1.2.1 | Solo está unido a CU 1.1.1 |
| WhatsApp participa en 2.1.2.3 y 3.2.2.1 | Solo está unido a CU 1.1.1 y CU 1.1.2 |
| El CRM participa en 3.2.2.3 | Solo está unido a CU 3.1.2 |
| El Asesor comercial participa en 1.2.1.3 | No está unido a ningún caso del flujo 1 |
| El Prospecto es el actor principal de todo el flujo 2 | No está unido a CU 2.2.2 |
| Las capacidades de nivel 3 son casos de uso incluidos | La nota del diagrama dice que «sus capacidades de nivel 3 son los pasos del caso» |

Además, el índice registra que CU-02 a CU-05 derivan de **CAP-02**, que está Obsoleto, y no de CAP-03, que es el vigente. REV-02 congeló CU-02 a CU-06 como «entrada fija», así que ninguna regla los vuelve a comparar.

**Propuesta.** Rehacer las uniones actor–caso de CU-02 desde CU-06, corregir la nota del diagrama, cambiar «Deriva de» de CU-02 a CU-05 a CAP-03 y añadir a la verificación una regla CU-02/CU-05 ↔ CU-06 (ver B-06).

<a id="a-03"></a>
### A-03 · El flujo 3 supone una cita opcional, y el alternativo A1 es inalcanzable

**Evidencia.**

- La postcondición del flujo 2 dice: «si el prospecto la pidió, la cita está reservada». Pero el flujo principal siempre reserva la cita (pasos 77 a 86) y ningún alternativo del flujo 2 permite no agendarla.
- El flujo 3 depende de que la cita exista: `Cita.programarRecordatorio()` (paso 26), `Cita.actualizarEstado()` (33 y 37) y A7. `Lead.asignar()` también «toma de ellas la agencia» (CLS-01, atributo `Lead.citas`). Un lead APTO sin cita no tiene cómo seguir.
- Un lead A_REVISAR entra al flujo 3 desde 74k → 73, pero tampoco hay un camino en el que no tenga cita.
- **F3 · A1 (6a, ficha con datos incompletos)** no se puede alcanzar: para confirmar la solicitud hace falta la captura completa (`SolicitudCredito.actualizarEstado()`, y en la base `ck_solicitud_completa`). PRO-01 lo reconoce: es el único paso que sus pruebas no recorren.

**Propuesta.** Añadir al flujo 2 un alternativo «el prospecto no quiere agendar ahora» y, en el flujo 3, un alternativo «el lead no tiene cita» (el asesor la agenda o July la ofrece de nuevo). Definir de dónde toma `asignar()` la agencia cuando no hay cita. Para 6a, decidir qué dato puede faltar de verdad (por ejemplo, la condición de socio POR_VERIFICAR o el correo) o retirar el alternativo.

<a id="a-04"></a>
### A-04 · Elementos del mapa que no llegan a la cadena

**Evidencia** (relaciones de CAP-03):

| Elemento de CAP-03 | Qué le falta |
|---|---|
| SA-20, SA-22, SA-23, SA-24 y SA-25 (paquete 4) | No realizan ninguna capacidad. En un mapa guiado por capacidades (REF-02), un servicio sin capacidad no tiene quién lo justifique. SA-21 sí realiza las 2.2.2.x |
| Actor «Delegado de protección de datos» | No aparece en CU-02 a CU-06. En CU-08 solo está en la regla transversal R2, que no tiene número de paso. Por eso R2 y SA-25 no tienen mensaje en SEC-01 ni conexión en ROB-01 |
| Componente «Servicio de notificaciones» (SA-15 lo usa) | No está en CU-06: 3.2.1.2 dice «Ninguno, lo resuelve July». Tampoco es participante de CU-08 ni clase de CLS-01. Reaparece en SAD-03 como MS-13 |
| Colaboradores, agencias y líneas de cada asesor | Ningún servicio los mantiene (brecha B-10 de LIN-01, todavía abierta) |

**Propuesta.** En CAP-03, añadir capacidades de gobierno y administración (configuración, cumplimiento de datos personales, gestión de colaboradores) y unirlas a SA-20 a SA-25, o declarar en el modelo que el paquete 4 queda fuera del mapa. Especificar R2 como alternativo numerado (por ejemplo, en el flujo 1) para que tenga mensajes en SEC-01 y ROB-01. Decidir si el Servicio de notificaciones es un borde (clase «interfaz» y actor en CU-06) o si se quita de SA-15.

<a id="a-05"></a>
### A-05 · Cambios de estado ocultos entre clases

**Evidencia** (CLS-01):

| Método | Efecto que no está en ningún paso |
|---|---|
| `SolicitudCredito.iniciar()` (F2: 2) | Pasa el **lead** a EN_CAPTURA |
| `SolicitudCredito.precalificar()` (F2: 68) | Pasa el **lead** a PRECALIFICADO |
| `Lead.actualizarEstado()` (F3: 51) | Pasa la **conversación** a CERRADA |
| `Conversacion.registrarMensaje()` (F1: 5) | **Crea el prospecto** con su teléfono; ninguna clase tiene un método que cree `Prospecto` |

CU-08 fija que el método es de la clase del receptor y que no hay pasos internos (reglas 2 y 7). Con estos efectos, las transiciones de `EstadoLead` y la creación del prospecto no tienen mensaje en SEC-01 ni conexión en ROB-01. LIN-01 tuvo que suplirlo a mano en su matriz CRUD; por ejemplo, Lead «A» en 2.1.1.3 y 2.3.1.1.

**Propuesta.** Hacer explícitos esos cambios con pasos propios (por ejemplo, «**July** actualiza el estado del lead en el **Lead**» → `Lead.actualizarEstado(estado)`), o declarar en CLS-01 una regla de «efectos de composición», con su reflejo en SEC-01 como nota.

<a id="a-06"></a>
### A-06 · DAT-01 y DAT-02 van por delante de CLS-01

**Evidencia.**

- DAT-01 incorpora 9 de las 10 brechas de LIN-01: 3 tablas sin clase (`agencia`, `campana`, `evento`), 4 enumeraciones nuevas y unas 20 columnas sin atributo en CLS-01 (`*_origen`, `id_regla_*`, `id_linea_version`, `seguro_tasa_mensual`, `cargos_fijos`, `id_colaborador_destino`…). DAT-01 lo reconoce en su sección 7.4 y deja la decisión abierta (D5).
- LIN-01, sección 11, dice «Ningún cambio está aplicado», pero DAT-02 ya los implementa y está «probado en PostgreSQL 16.14». Si se ejecuta el script, la base tiene elementos que no se pueden rastrear hacia atrás hasta un paso de CU-08 ni hasta una capacidad.

**Propuesta.** Tomar la decisión D5 de DAT-01. Si se aprueban las brechas, llevarlas primero a CU-08 y CLS-01, y de ahí bajarlas por la cadena (como indica LIN-01). Si no, marcar en DAT-02 con un comentario `-- PROPUESTA B-NN` cada objeto que no sale de CLS-01. En los dos casos, actualizar el estado de cada brecha en LIN-01, sección 11.

## 4. Hallazgos de prioridad media

<a id="m-01"></a>
### M-01 · CLS-01 cita al revés los pasos de `Canal`

En `diccionario-de-datos-etapa3.md`, sección «Controles de robustez», el último párrafo dice que `recibir(mensaje)` está en «F1: 1, 1a» y `abrirSesion(paginaOrigen)` en «F1: 3a». En CU-08 es al revés: el paso 1a es `Canal.abrirSesion()` y el 3a es `Canal.recibir()`. La tabla de métodos de `Canal` del mismo documento lo tiene bien.

<a id="m-02"></a>
### M-02 · CLS-01 v3.2 quedó a medias

Las relaciones 40 y 41 solo aparecen en la ficha de `PanelCooperativa` y en la tabla de la sección 5. Faltan en las listas «Relaciones» de `July` y de `Colaborador`, y en sus filas de la tabla de resumen (sección 7). Esto también afecta lo que SAD-01 toma de CLS-01.

<a id="m-03"></a>
### M-03 · LIN-01: matriz contra regla M7, y encabezado contra índice

- La regla M7 pone como ejemplo que F2: 16 «registra datos del `Prospecto` mediante `SolicitudCredito.registrarDato()` y pertenece a 2.1.2.1». Pero la matriz de la sección 8 deja 2.1.2.1 como **solo lectura** (L en Pro, Sol y Lín), y el resumen ejecutivo la cuenta entre las 5 capacidades «que solo leen». Según M7 y M2, 2.1.2.1 actualiza `Prospecto` y `SolicitudCredito`. El conteo pasaría a 38 que crean o actualizan y 4 que solo leen.
- El índice dice que LIN-01 se relaciona con CLS-01 y DAT-01. El encabezado de LIN-01 no los nombra.

<a id="m-04"></a>
### M-04 · SAD-03 contra su propio criterio y contra CU-08

- **Un solo dueño por tabla.** El texto dice que cada tabla de DAT-01 tiene un solo dueño, pero `regla_negocio` y `regla_parametro` se reparten entre MS-09 (PRECALIFICACION), MS-11 (PRIORIDAD) y MS-12 (ENRUTAMIENTO). La tabla `colaborador` no tiene microservicio: queda en el IAM, que la «Plataforma» no cuenta como servicio.
- **Sistema externo nuevo.** «Proveedor de LLM» (MS-03) no está en CAP-03, CU-06, CU-08 ni CLS-01, donde la intención se detecta con `LineaCredito.palabrasClave`. Solo tiene rastro en REV-01 (vista de desarrollo).
- **SA-24.** CU-08 lo deja fuera del reto porque «el embudo lo calcula el CRM». SAD-03 (MS-14) y DAT-01 (`evento`) lo implementan dentro de July.

**Propuesta.** Partir `regla_negocio` por tipo o declarar el patrón «tabla compartida con dueño por partición». Añadir el proveedor de LLM a CAP-03 como componente externo. Unificar en CU-08 la decisión sobre SA-24.

<a id="m-05"></a>
### M-05 · Cifras y cadena desactualizadas

| Documento | Dice | Vigente |
|---|---|---|
| SAD-01 v0.2 (y su fila en el índice) | 17 clases y 39 relaciones; cadena de «ocho artefactos»; sin LIN-01, DAT-01, SAD-02 ni SAD-03 | 18 clases y 41 relaciones; cadena de 10 artefactos |
| PRE-01 | 17 clases y 39 relaciones; «ocho artefactos» | Ídem |
| PRE-02 | «17 clases (una abstracta)… 39 relaciones» | Ídem |
| REV-02 (Aprobado) | Cadena de 8 artefactos; el panel no es clase de CLS-02 | Ver A-01 |
| README del repositorio | La cadena (Mermaid, tabla y navegación) termina en 08 · Robustez; faltan 09 · Linaje y 10 · Modelo de datos | CLAUDE.md y el índice ya llegan a 10 |
| README del repositorio | Ejemplo de conexión de robustez «2.2.1: 4» | ROB-01 v2 cita pasos de CU-08 por flujo («26h», «32, 30j») |
| README del repositorio | REV-02 es un «plan en curso» | REV-02 está Aprobado y ejecutado |
| README del repositorio | Clases «interfaz»: Canal, Sistema core y CRM | Se suma `PanelCooperativa` |
| README del repositorio | El material complementario no lista SAD-02, SAD-03, PRE-01 ni PRE-02 | Registrados en el índice |

<a id="m-06"></a>
### M-06 · PNG de CLS-02 desactualizado

`diagrama-de-clases-etapa3.png` es del 2026-11-04 (versión 1, 17 clases, sin capas). El `.drawio` es la versión 2 (2026-11-16). El índice lo advierte, pero la portada del repositorio muestra ese PNG como el diagrama vigente.

<a id="m-07"></a>
### M-07 · El prototipo se aparta de CLS-01

`js/dominio.js` agrega atributos que CLS-01 no tiene: `Lead.ficha`, `SolicitudCredito.fueraDeEdad` y `simulaciones`, `Simulacion.tasaEfectiva` y `lineaCredito`, y `Colaborador.agenda`, `bandeja` y `publicaciones`. También agrega una clase `Sesion`. PRE-02 lo deja como decisión abierta. Algunos coinciden con las brechas de LIN-01: `Simulacion.lineaCredito` es la versión de la línea de B-02, y `Colaborador.bandeja` es el panel. Conviene decidirlos junto con A-06.

## 5. Hallazgos de prioridad baja

<a id="b-01"></a>
**B-01 · Capacidades nombradas por la tecnología.** 1.1.1.1 «WhatsApp Business API», 1.1.1.2 «Widget web» y 1.1.2.3 «Verificación de webhooks» nombran el *cómo*. REF-02 (Ulrich y Rosen) pide que una capacidad diga *qué* hace el negocio, de forma estable frente a la tecnología. Por ejemplo: «Mensajería instantánea», «Chat en el sitio web» y «Autenticación de mensajes entrantes».

<a id="b-02"></a>
**B-02 · La afiliación de 2.3.2.3 no tiene caso ni paso.** La capacidad se llama «Afiliación y cita», pero CU-06 la reduce a «Agendar una cita en agencia». En CU-08 la afiliación solo aparece como `LineaCredito.requisitosAfiliacion` (A13). Hace falta ampliar el caso o renombrar la capacidad.

<a id="b-03"></a>
**B-03 · El alternativo A6 del flujo 2 casi no se puede alcanzar.** 39f («monto fuera del rango de la línea») reemplaza el paso 39. Pero el monto y el plazo ya se validaron contra la línea en el paso 9. Solo puede ocurrir al comparar otro escenario (46), que no tiene alternativo, o al cambiar de línea (61i). Conviene moverlo después del paso 47, o aclarar en qué caso ocurre.

<a id="b-04"></a>
**B-04 · Cifra imprecisa en CLS-01.** La regla 4 dice «33 pasos «… a **July**» de personas». 33 son solo los del Prospecto. Con el asesor (6) y los colaboradores (2) son 41, según la tabla 6.1 del mismo documento.

<a id="b-05"></a>
**B-05 · Convenciones del índice sin cumplir.**

- REF-02 no tiene encabezado con ID, versión, fecha y origen.
- CU-07 tiene fecha 2026-10-21 en su encabezado y 2026-10-24 en el índice.
- `Complementarios/plantillas/` tiene nombres con mayúsculas, espacios y guion bajo (`SAD_Template.docx`, `Software Architecture Document (SAD) (2).pdf`).
- Los PNG de CU-03 a CU-05 se reexportaron el 2026-11-05 sin entrada en el historial del índice.
- REV-02 dice que los generadores de los diagramas v2 «no se guardaron en el repositorio», así que no se pueden volver a producir igual.

<a id="b-06"></a>
**B-06 · La verificación automática no cubre la mitad de la cadena.** `verificar-trazabilidad.py` no comprueba:

- CAP-03 ↔ CU-06 (servicios, capacidades y actores);
- los `.drawio` de CU-02 a CU-05;
- CU-09 ↔ CU-08;
- LIN-01 ↔ CU-08 y CLS-01 (pasos y atributos citados);
- DAT-01 y DAT-02 ↔ CLS-01;
- SAD-03 ↔ CAP-03 y DAT-01;
- que el PNG de cada diagrama sea más reciente que su fuente.

A-02, M-02, M-03 y M-06 los habría detectado una regla así. Las comprobaciones de la sección 1 de este documento se pueden convertir en las reglas V9 en adelante.

## 6. Orden sugerido de corrección

1. **Decisiones de modelo** (necesitan acuerdo del equipo): A-01 (el panel y cómo leer «Deriva de»), A-03 (cita opcional y 6a), A-05 (cambios de estado explícitos), A-06 y M-07 (aprobar o no las brechas de LIN-01).
2. **Corrección de la entrada de la cadena:** A-02 (CU-02) y A-04 (CAP-03 y R2), y regenerar CAP-05 y CAP-04.
3. **Propagación:** CU-08 → CU-09 → DOM-01 → CLS-01 (incluye M-01, M-02 y B-04) → CLS-02 (y su PNG, M-06) → SEC-01 → ROB-01 → LIN-01 (M-03) → DAT-01 y DAT-02.
4. **Documentos que resumen la cadena:** SAD-01, SAD-03 (M-04), PRE-01, PRE-02, REV-02 y el README del repositorio (M-05).
5. **Verificación:** ampliar `verificar-trazabilidad.py` con las reglas de B-06 y registrar cada cambio en el índice.
