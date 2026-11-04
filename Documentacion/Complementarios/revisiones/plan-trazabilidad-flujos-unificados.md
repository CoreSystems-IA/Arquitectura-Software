# Plan de implementación · Trazabilidad unificada por flujo de valor

**ID:** REV-02 · **Versión:** 1.3 · **Fecha:** 2026-11-04 · **Estado:** Aprobado  
**Deriva de:** REV-01, CAP-03, CU-02 a CU-09, CLS-01, CLS-02, DOM-01, DOM-02, SEC-01, ROB-01  
**Alcance:** plan de cambios, ya ejecutado; el resultado está en la [sección 8](#8-ejecución).

Plan para rehacer la cadena de documentos de July de modo que cada artefacto salga del anterior sin tablas de conversión intermedias. Primero muestra el diagnóstico de lo que hoy rompe la cadena y después los cambios, documento por documento, en el orden en que se harán.

**El mapa de capacidades y los casos de uso no cambian.** Son la entrada fija del plan: los diagramas CU-02 a CU-05 y la descripción CU-06 se quedan como están, y la especificación toma de ellos los números, los nombres y los actores de cada caso. En la fase 0 sí cambian de carpeta, pero sin cambiar su contenido.

**Las carpetas siguen el orden de la cadena.** La fase 0 separa la documentación en dos carpetas: `Arquitectura/`, con los 8 artefactos de la cadena numerados en ese orden, y `Complementarios/`, con referencias, revisiones, negocio, el documento de arquitectura y las plantillas, sin numeración.

---

## 1. Cadena de trazabilidad pedida

| # | Artefacto | Toma del anterior | Entrega al siguiente | Documento actual | Carpeta nueva | ¿Cambia el contenido? |
|---|---|---|---|---|---|---|
| 1 | Mapa de capacidades | — (fuente) | 3 flujos de valor, 7 etapas, 14 capacidades de nivel 2 y 42 de nivel 3 | CAP-03, CAP-04, CAP-05 | `Arquitectura/01-mapa-capacidades/` | No |
| 2 | Casos de uso | Etapa → caso de nivel 1; capacidad N2 → nivel 2; capacidad N3 → nivel 3 con su actor o entidad externa | Los 63 casos de los 3 flujos, con sus actores | CU-02 a CU-07 | `Arquitectura/02-casos-de-uso/` | No |
| 3 | Especificación | Un solo flujo continuo por flujo de valor, ordenado por sus casos de nivel 1, 2 y 3 | Sujeto, verbo, sustantivo y receptor de cada paso | CU-08 (y su vista CU-09) | `Arquitectura/03-especificacion-casos-de-uso/` | Sí |
| 4 | Modelo de dominio | Sustantivos y participantes de la especificación como conceptos; parejas sujeto → receptor como asociaciones | Conceptos con atributos y asociaciones | DOM-01, DOM-02 | `Arquitectura/04-modelo-de-dominio/` | Sí |
| 5 | Diccionario de datos | Conceptos del dominio + verbos de la especificación | Clases, atributos con tipo, métodos y relaciones | CLS-01 | `Arquitectura/05-diccionario-de-datos/` | Sí |
| 6 | Diagrama de clases | El diccionario, sin agregar ni quitar nada | Clases y métodos válidos para las llamadas | CLS-02 | `Arquitectura/06-diagrama-de-clases/` | Sí |
| 7 | Diagrama de secuencia | Un mensaje por paso de la especificación, con el método de CLS-02 | Líneas de vida y llamadas por flujo | SEC-01 | `Arquitectura/07-diagrama-de-secuencia/` | Sí |
| 8 | Diagrama de robustez | Las líneas de vida de SEC-01 como borde, control y entidad, y sus llamadas como conexiones | — | ROB-01 | `Arquitectura/08-diagrama-de-robustez/` | Sí |

---

## 2. Diagnóstico: qué rompe hoy la cadena

| # | Artefacto | Hallazgo | Evidencia |
|---|---|---|---|
| H1 | Especificación (CU-08) | La especificación está partida en 63 casos (7 + 14 + 42). Cada caso de nivel 2 termina en «Fin», así que la cadena «receptor = siguiente sujeto» se corta entre casos. | 457 filas de pasos en total, contando las fichas de nivel 3 que repiten pasos de nivel 2. |
| H2 | Especificación | Un mismo hecho se describe varias veces con métodos distintos. | «El prospecto escribe la consulta» aparece en CU 1.1 paso 1 (`Consulta.enviar()`), CU 1.1.1 paso 1 (`Consulta.escribir()`) y CU 1.1.2 paso 1 (`Mensaje.enviar()`). |
| H3 | Especificación → clases | Los verbos y sustantivos de CU-08 no son los del diagrama de clases. CLS-01 tiene que convertirlos con su propia tabla. | CU-08 nombra 46 entidades y 185 métodos; CLS-01 los reduce a 15 clases y 55 métodos (sus secciones 1 y 6). |
| H4 | Especificación → clases | Hoy el método es de la clase del **sustantivo** (`Pedido.hacer()`). Con la decisión D1, el método pasa a ser del **receptor**. | Convención de CU-08 y de CLS-01. |
| H5 | Modelo de dominio | El modelo de dominio sale del diccionario, al revés del orden pedido. | DOM-01 y DOM-02: «Deriva de CLS-01». |
| H6 | Diccionario y clases | Siete actores que son receptores de pasos no son clases, así que no pueden tener métodos. | Regla 9 de CLS-01: Equipo de marketing, Administrador, Área de productos, Comité de crédito, Jefe comercial, Personal de agencia y Delegado de protección de datos. |
| H7 | Secuencia (SEC-01) | 179 de 399 mensajes no son métodos de CLS-02. Algunos son retornos, que son válidos, pero muchos son mensajes entre un actor y un borde escritos en lenguaje natural. | «1: escribe la consulta», «4: acuse de recepción», «9b: derivación con historial», «5: acepta el aviso», «3: pide confirmar la línea detectada». |
| H8 | Secuencia | La secuencia sale de la robustez, al revés del orden pedido. | SEC-01: «Deriva de CU-08, ROB-01, CLS-02». |
| H9 | Robustez (ROB-01) | Las conexiones citan «caso: paso» de CU-08 y los controles citan métodos de CLS-01. Ambas referencias cambian con la unificación. | Etiquetas como «1.2.2: 3» y «Canal.verificarAutenticidad()». |
| H10 | Documentos derivados | CU-09, SAD-01 y NEG-01 copian o citan pasos y métodos que van a cambiar. | SAD-01 incluye la especificación de los 14 casos de nivel 2; NEG-01 cita CU-08 y CLS-01. |
| H11 | Carpetas | Las carpetas no siguen el orden de la cadena y mezclan artefactos. | El modelo de dominio (paso 4) está en `09-`; la especificación comparte carpeta con los casos de uso; el diccionario y el diagrama de clases comparten `04-diagrama-de-clase/`; referencias, revisiones, negocio y arquitectura están numeradas entre los artefactos. |

---

## 3. Decisiones

| # | Decisión | Origen |
|---|---|---|
| D1 | **El método es de la clase del receptor y el sustantivo es su parámetro.** «July valida la conversación al Prospecto» se escribe `Prospecto.validar(conversacion)`. En la secuencia es `:July ──validar(conversacion)──▶ :Prospecto`. | Usuario |
| D2 | **Los casos de uso quedan fijos.** La especificación usa los números, los nombres y los actores de CU-03 a CU-06 tal como están, y ninguna fase cambia su contenido. La única excepción es la ruta del enlace a la especificación en CU-06 y CU-07, que se corrige en la fase 0 porque la especificación cambia de carpeta. | Usuario |
| D3 | **Un retorno no es un método.** Cuando el receptor solo devuelve el resultado de la llamada anterior, el paso se escribe «**X** devuelve … a **Y**». En la secuencia es una flecha punteada y no agrega métodos. Así se mantiene la cadena sin inflar las clases. | Propuesta |
| D4 | **No hay pasos internos.** El trabajo de July sobre sus datos se escribe con la entidad como receptor: «**July** etiqueta la campaña en la **Conversación**» → `Conversacion.etiquetarOrigen(campana)`. | Propuesta |
| D5 | **Cada paso cita su caso de nivel 3 y el actor que CU-06 le asigna.** En los 16 casos que CU-06 marca «Ninguno, lo resuelve July», el paso se cita igual, sin actor externo. | Propuesta |
| D6 | **Unificar clases y generalizar métodos sin pasar del modelo actual:** como máximo 18 clases y 55 métodos. Candidatos: `Colaborador` como superclase de `AsesorComercial`, con rol para marketing, jefe comercial, comité, agencia, áreas y delegado, y un único `recibirAviso()`; un `recibir(mensaje)` común a los receptores de mensajes; WhatsApp y Widget siguen siendo `Canal` con `tipo`. | Propuesta |
| D7 | **Dos carpetas en `Documentacion/`.** `Arquitectura/` reúne los 8 artefactos de la cadena, numerados `01-` a `08-` en su orden. `Complementarios/` reúne los demás sin numeración. Los identificadores de los documentos (CAP, CU, CLS, DOM, SEC, ROB, REF, REV, NEG, SAD) no cambian. El nombre `Complementarios` es una propuesta. | Usuario (nombre propuesto) |

---

## 4. Forma de la nueva especificación

Hay una especificación por flujo de valor: **Flujo 1 · Atracción y primer contacto**, **Flujo 2 · Captura, simulación y precalificación** y **Flujo 3 · Entrega, seguimiento y conversión**. Cada una tiene una ficha y un solo flujo principal numerado de corrido (1, 2, 3…). Los pasos se agrupan por los casos de nivel 1 y 2 de CU-06. Los flujos alternativos usan la letra y el paso del que salen (`5a`) y vuelven al flujo principal.

**Regla de la oración:** **Sujeto** + verbo + sustantivo + **Receptor**. El receptor de un paso es el sujeto del siguiente, también al pasar de un caso al siguiente.

Columnas: Paso · Especificación · Sujeto · Verbo → método (`Receptor.verbo(sustantivo)`) · Sustantivo → entidad (atributos) · Relación (sujeto → receptor) · CU nivel 3 · Actor o entidad externa (de CU-06).

Ejemplo ilustrativo del inicio del flujo 1. Los nombres definitivos de métodos se fijan en la fase 5.

| Paso | Especificación | Sujeto | Verbo → método | Sustantivo (atributos) | Relación | CU N3 |
|---|---|---|---|---|---|---|
| | *CU 1.1 Contactar a July por un canal digital · CU 1.1.1 Recibir la consulta por WhatsApp o web / CU 1.1.2 Unificar los mensajes entrantes* | | | | | |
| 1 | **Prospecto** escribe el mensaje a **WhatsApp Business API**. | `Prospecto` | escribe → `Canal.recibir(mensaje)` | `Mensaje` (contenido, tipo, adjuntos) | `Prospecto` → `Canal` | 1.1.1.1 |
| 2 | **WhatsApp Business API** notifica el mensaje firmado a **July**. | `Canal` | notifica → `July.atender(mensaje)` | `Mensaje` (idExterno, firma, telefono) | `Canal` → `July` | 1.1.2.3 |
| 3 | **July** verifica la firma del mensaje con **WhatsApp Business API**. | `July` | verifica → `Canal.verificarAutenticidad(mensaje)` | `Mensaje` (firma) | `July` → `Canal` | 1.1.2.3 |
| 4 | **WhatsApp Business API** devuelve la firma válida a **July**. | `Canal` | devuelve → *retorno* (`Boolean`) | — | `Canal` → `July` | 1.1.2.3 |
| 5 | **July** registra el mensaje en formato común en la **Conversación**. | `July` | registra → `Conversacion.registrarMensaje(mensaje)` | `Mensaje` (emisor, tipo, contenido) | `July` → `Conversacion` | 1.1.2.1 |
| 6 | **Conversación** devuelve la conversación con su canal a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.2.1 |
| 7 | **July** etiqueta la campaña de origen en la **Conversación**. | `July` | etiqueta → `Conversacion.etiquetarOrigen(campana)` | `Conversacion` (canal, campana) | `July` → `Conversacion` | 1.1.1.3 |
| 8 | **Conversación** devuelve el origen etiquetado a **July**. | `Conversacion` | devuelve → *retorno* | — | `Conversacion` → `July` | 1.1.1.3 |
| 9 | **July** avisa el origen de la conversación al **Equipo de marketing**. | `July` | avisa → `Colaborador.recibirAviso(aviso)` | `Conversacion` (canal, campana) | `July` → `Colaborador` | 1.1.1.3 |
| 10 | **Equipo de marketing** devuelve el acuse del aviso a **July**. | `Colaborador` | devuelve → *retorno* | — | `Colaborador` → `July` | 1.1.1.3 |
| 11 | **July** envía la respuesta inmediata a **WhatsApp Business API**. | `July` | envía → `Canal.enviar(mensaje)` | `Mensaje` (contenido) | `July` → `Canal` | 1.1.2.1 |
| 12 | **WhatsApp Business API** entrega la respuesta al **Prospecto**. | `Canal` | entrega → `Prospecto.recibir(mensaje)` | `Mensaje` (contenido) | `Canal` → `Prospecto` | 1.1.1.1 |
| | *A1 · Llega por el sitio web (reemplaza 1 a 4): pasos 1a a 4a con el Widget web, CU 1.1.1.2* | | | | | |
| | *A2 · Pico de demanda (reemplaza 11): July encola el mensaje y avisa la espera, CU 1.1.2.2* | | | | | |
| | *CU 1.2 Recibir el primer contacto · CU 1.2.1 Recibir atención inmediata — el paso 13 empieza con **Prospecto**, el receptor del paso 12* | | | | | |

Los 42 casos de nivel 3 de CU-06 tienen que aparecer en al menos un paso, con el actor externo que CU-06 les asigna (D5).

---

## 5. Cambios por fase

Cada fase toma solo lo que entrega la anterior y cierra con su verificación (sección 6).

### Fase 0 · Reorganización de carpetas

Va primero para que las fases siguientes escriban directamente en las rutas nuevas. Los archivos se mueven con `git mv` para conservar su historial, y nombres y contenido no cambian salvo los enlaces indicados abajo.

```
Documentacion/
├── README.md
├── Arquitectura/
│   ├── 01-mapa-capacidades/             ← 02-mapa-capacidades/ (con Archi/)
│   ├── 02-casos-de-uso/                 ← 03-casos-de-uso/: diagramas, CU-06 y CU-07
│   ├── 03-especificacion-casos-de-uso/  ← 03-casos-de-uso/: CU-08 y CU-09
│   ├── 04-modelo-de-dominio/            ← 09-modelo-de-dominio/
│   ├── 05-diccionario-de-datos/         ← 04-diagrama-de-clase/: CLS-01
│   ├── 06-diagrama-de-clases/           ← 04-diagrama-de-clase/: CLS-02 (.drawio y .png)
│   ├── 07-diagrama-de-secuencia/        ← 07-diagrama-de-secuencia/
│   └── 08-diagrama-de-robustez/         ← 08-diagrama-de-robustez/
└── Complementarios/
    ├── referencias/                     ← 01-referencias/ (con Bibliografia/)
    ├── revisiones/                      ← 05-revisiones/ (REV-01 y este plan)
    ├── negocio/                         ← 06-negocio/
    ├── arquitectura/                    ← 10-arquitectura/ (SAD-01)
    └── plantillas/                      ← templates/
```

Enlaces y rutas que se corrigen:

| Archivo | Enlaces |
|---|---|
| CU-06 `casos-de-uso-por-flujo.md` y CU-07 `presentacion-casos-de-uso.md` | Solo la ruta a la especificación: `../03-especificacion-casos-de-uso/especificaciones-casos-de-uso.md` (excepción de D2). |
| CU-08 `especificaciones-casos-de-uso.md` | CU-06, CU-07, REV-01 y CLS-01. Igual se reescribe en la fase 3. |
| CLS-01 `diccionario-de-datos-etapa3.md` | La especificación. |
| DOM-02 `modelo-de-dominio-etapa3.md` | CLS-01. |
| NEG-01 `guia-negocio-cooperativa-y-captacion.md` | Los enlaces al mapa (`.archimate`), CU-06, CU-08 y CLS-01, ahora con `../../Arquitectura/…`. |
| REV-02 (este plan) | `../../README.md`. |
| `Documentacion/README.md` | El árbol de «Estructura», la tabla de carpetas y prefijos (cada carpeta nueva con su prefijo; CU sirve para `02-` y `03-` y CLS para `05-` y `06-`), la convención de nombres (las carpetas de `Arquitectura/` llevan el número de la cadena; las de `Complementarios/` no llevan número), la ruta del script de exportación y la columna «Ruta» de todas las filas de la matriz. El historial anterior no se toca. |
| `CLAUDE.md` | La regla de ubicación: los ejemplos `01-referencias/`, `02-mapa-capacidades/` y `03-casos-de-uso/` se reemplazan por las dos carpetas y su numeración. |

El script `archi-a-open-exchange.py`, los `.drawio`, los PNG y SAD-01 no tienen rutas de carpeta, así que no se tocan. La memoria del proyecto tampoco depende de las carpetas.

### Fase 1 · Herramienta de verificación

- **Nuevo:** `Complementarios/revisiones/verificar-trazabilidad.py`. Lee CU-06, la especificación en Markdown, CLS-01 y los `.drawio` de clases, secuencia y robustez, y comprueba las reglas V1 a V8 de la sección 6. Se registra en el README como herramienta de REV-02.

### Fase 2 · Mapa de capacidades y casos de uso (CAP-03 a CAP-05, CU-02 a CU-06)

- **Sin cambios de contenido.** Solo se extrae de CU-06 la lista de casos de nivel 1, 2 y 3 con sus números, nombres y actores, que usan las fases siguientes.

### Fase 3 · Especificación (CU-08, CU-09)

| Archivo | Cambio |
|---|---|
| `especificaciones-casos-de-uso.md` (CU-08 v2.0) | Se reescribe como **3 especificaciones unificadas**, una por flujo, con la forma de la sección 4. La regla «método del sustantivo» se reemplaza por D1 y se agregan D3 a D5. Se eliminan las fichas separadas por caso de nivel 1, 2 y 3 y sus pasos repetidos (H1 y H2). Se mantienen la tabla de participantes, la correspondencia SA-01 a SA-25, el alcance del reto y las reglas R1 y R2. El índice por niveles se reemplaza por una tabla caso de nivel 3 → pasos. |
| `especificacion-casos-de-uso-solo-pasos.md` (CU-09 v2.0) | Se regenera desde CU-08 v2.0: los 3 flujos solo con la oración de cada paso. |
| `presentacion-casos-de-uso.md` (CU-07) | Sin cambios; ya es obsoleto. |

### Fase 4 · Modelo de dominio (DOM-01, DOM-02)

- **Origen nuevo:** CU-08 v2.0 en lugar de CLS-01 (H5).
- Los conceptos son los sustantivos y los participantes de negocio de la especificación: actores, entidades de negocio y configuración. July y los sistemas externos quedan fuera, como hoy.
- Las asociaciones salen de las parejas sujeto → receptor y de los sustantivos que se intercambian, con nombre y multiplicidad. Se agrega `Colaborador` si D6 se confirma.
- Se rehacen el `.drawio`, el PNG y la guía DOM-02.

### Fase 5 · Diccionario de datos (CLS-01 v3.0)

- **Origen:** DOM-01 + CU-08 v2.0.
- **Clases:** los conceptos de DOM-01 más July y los sistemas externos (`Canal`, `SistemaCore`, `CRMCooperativa`). Se aplica la unificación de D6 y los actores receptores se vuelven clases (H6).
- **Métodos:** cada verbo de un paso es un método de la clase del **receptor**, con el sustantivo como parámetro (D1). Los verbos sinónimos se generalizan en un solo método, con un máximo de 55 en total. Los retornos no son métodos (D3).
- **Relaciones:** cada pareja sujeto → receptor es una dependencia o asociación; las composiciones vienen de DOM-01.
- **Sección 6:** se reemplazan las tablas de consolidación (46 → 15 y 185 → 55) por una trazabilidad 1:1 **paso → método**. Ya no hace falta convertir nombres (H3).
- Se mantienen las enumeraciones y sus transiciones, revisadas contra los pasos.

### Fase 6 · Diagrama de clases (CLS-02)

- Se redibuja desde CLS-01 v3.0 con las mismas clases, atributos, métodos y parámetros, la generalización de D6 y las relaciones nuevas. Se regenera el PNG.

### Fase 7 · Diagrama de secuencia (SEC-01 v2)

- **Origen:** CU-08 v2.0 + CLS-02. Ya no deriva de ROB-01 (H8).
- 3 páginas, una por flujo. Cada paso es **un** mensaje `Sujeto → Receptor : método(parámetros)`, numerado con el paso de la especificación. El método es de la clase del receptor y está en CLS-02 con los mismos parámetros. Los retornos van como flechas punteadas.
- Los mensajes en lenguaje natural entre actor y borde se reemplazan por métodos (`Canal.recibir(mensaje)`, `Prospecto.recibir(mensaje)`, `Colaborador.recibirAviso(aviso)`) (H7).
- Los flujos alternativos van en `alt`, `opt` y `loop` con su letra de paso, y cada caso de nivel 1 y 2 se marca con un separador. Se regeneran los 3 PNG.

### Fase 8 · Diagrama de robustez (ROB-01 v2)

- **Origen:** SEC-01 v2 + CLS-02.
- Las líneas de vida se clasifican así: actores; bordes (`Canal`, `SistemaCore`, `CRMCooperativa` y las bandejas de colaboradores); controles (cada método que July invoca); y entidades (las clases «entidad»).
- Las conexiones citan el paso unificado (`Flujo 1 · 12`) en lugar de «caso: paso» (H9). Se regeneran los 3 PNG.

### Fase 9 · Documentos derivados y registro

| Documento | Cambio |
|---|---|
| `README.md` | Se registra REV-02. Se actualizan la versión, la descripción, «Deriva de» y la fecha de CU-08, CU-09, DOM-01, DOM-02, CLS-01, CLS-02, SEC-01 y ROB-01, con la cadena de la sección 1. Se agrega una entrada al historial. Las filas de CU-02 a CU-06 solo cambian de ruta, en la fase 0. |
| SAD-01 (`.docx`) | Los diagramas de casos de uso se quedan. Se reemplazan la especificación de los 14 casos de nivel 2 por la unificada, la vista lógica (clases, robustez y secuencia nuevas) y la vista de datos (dominio). |
| NEG-01 | Se actualizan las citas a pasos y métodos que cambien. |
| REV-01 | Sin cambios de contenido; se agrega una nota de que REV-02 lo reemplaza en la trazabilidad. |
| CAP-03 a CAP-05, CU-02 a CU-07 | Sin cambios de contenido. |

---

## 6. Verificación

El script de la fase 1 tiene que pasar sin errores al final de cada fase.

| # | Regla | Entre |
|---|---|---|
| V1 | Cada caso de nivel 3 de CU-06 aparece en al menos un paso de la especificación, y cada paso cita un caso de nivel 3 de su flujo con el actor que CU-06 le asigna. | Casos de uso ↔ especificación |
| V2 | En cada flujo, el receptor del paso *n* es el sujeto del paso *n + 1*, también en los alternativos al volver al flujo principal. | Especificación |
| V3 | Cada sustantivo y cada participante es un concepto de DOM-01, o July, o un sistema externo. | Especificación ↔ dominio |
| V4 | Cada método de un paso existe en CLS-01 en la clase del receptor, con los mismos parámetros, y CLS-01 no tiene métodos que no use ningún paso. | Especificación ↔ diccionario |
| V5 | CLS-01 y CLS-02 tienen exactamente las mismas clases, atributos, métodos y relaciones. | Diccionario ↔ clases |
| V6 | Cada mensaje no punteado de SEC-01 es `método(parámetros)` de la clase de la línea de vida que lo recibe en CLS-02, y lleva el número de un paso. Cada paso tiene su mensaje. | Clases ↔ secuencia |
| V7 | Cada objeto de ROB-01 es una línea de vida de SEC-01, y cada conexión corresponde a un mensaje de SEC-01 con el mismo paso. | Secuencia ↔ robustez |
| V8 | Cada enlace relativo de los `.md` de `Documentacion/` apunta a un archivo que existe, y cada ruta de la matriz del README existe. | Carpetas |

---

## 7. Riesgos y límites

- **Cantidad de pasos.** Los retornos explícitos (D3) alargan la especificación, aunque los pasos repetidos que se eliminan compensan una parte. Si la especificación de un flujo pasa de unos 120 pasos, se puede escribir el retorno en la misma fila que la llamada, pero solo si se acuerda.
- **Métodos de actores humanos.** D1 da métodos a clases que representan personas (`Prospecto.recibir()`, `Colaborador.recibirAviso()`). Es correcto en un modelo de análisis, pero hay que explicarlo en CLS-01 para que no se lea como código del prospecto.
- **Nombre parecido.** `Arquitectura/` (la cadena) y `Complementarios/arquitectura/` (SAD-01) se llaman casi igual. Si confunde, la segunda puede llamarse `documento-arquitectura/`.
- **Mover archivos cambia rutas.** Hay que mover en un solo commit, sin mezclarlo con cambios de contenido, para que `git log --follow` siga cada archivo.
- **SAD-01** es un `.docx` armado a mano. Su actualización se hace al final, en un solo paso, para no rehacerlo dos veces.
- Los PNG se exportan desde draw.io; si no se pueden exportar en este entorno, quedan pendientes y se indica así en el README.

---

## 8. Ejecución

Las fases 0 a 9 se ejecutaron el 2026-11-04. Al final, `python3 verificar-trazabilidad.py` da OK en las reglas V1 a V8.

| Fase | Resultado |
|---|---|
| 0 | `Documentacion/` quedó en `Arquitectura/` (01- a 08-) y `Complementarios/`. Se corrigieron los enlaces, el README y `CLAUDE.md`. |
| 1 | [`verificar-trazabilidad.py`](verificar-trazabilidad.py) con las reglas V1 a V8. La V4 también comprueba que cada pareja sujeto → receptor tenga su relación en CLS-01. |
| 2 | CU-02 a CU-06 sin cambios: 42 casos de nivel 3 (12, 18 y 12 por flujo). |
| 3 | CU-08 v2.0 y CU-09 v2.0: 282 pasos (68, 133 y 81 por flujo), 183 llamadas y 99 retornos. Antes eran 457 filas de pasos en 63 casos. |
| 4 | DOM-01 y DOM-02 derivados de CU-08: 12 conceptos (se agrega `Colaborador`), 14 asociaciones, una generalización y 2 dependencias. |
| 5 | CLS-01 v3.0: 17 clases, 53 métodos, 16 enumeraciones y 39 relaciones; trazabilidad 1:1 paso → método. |
| 6 | CLS-02 regenerado desde CLS-01, con rutas explícitas para las relaciones. |
| 7 | SEC-01 v2: 183 llamadas y 99 retornos en 3 páginas; 0 mensajes sin método. Antes eran 179 de 399. |
| 8 | ROB-01 v2: 29, 43 y 36 objetos por flujo, tomados de SEC-01. |
| 9 | SAD-01 v0.2, README y nota en REV-01. NEG-01 no necesitó cambios: los casos, reglas y métodos que cita siguen existiendo. |

**Diferencias con el plan:**

- **Largo del flujo 2.** Tiene 133 pasos contando los alternativos (86 en el flujo principal). Los retornos se mantuvieron como pasos propios (D3), para no romper la cadena.
- **Dependencias de configuración.** En el dominio bajaron de 5 a 2. Con D4, las plantillas las compone July y ninguna entidad las usa directamente.
- **Panel de la cooperativa.** En la robustez, los colaboradores llegan a July por el borde «Panel de la cooperativa», que no es una línea de vida de SEC-01 ni una clase de CLS-02. Está marcado `vista="1"` y la regla V7 lo admite.
- **Clase `Participante` retirada.** D6 la proponía para generalizar `recibir(mensaje)`, pero no tenía atributos ni salía del dominio. El método pasó a `Prospecto` y a `Colaborador`. Solo se generaliza lo que comparte datos: `Configuracion` y `AsesorComercial` → `Colaborador`.
- **SAD.** Se agregaron los tres diagramas de secuencia en la sección 6.2 (figuras 9 a 11). El modelo de dominio pasó a ser la figura 12.
- **Generadores.** Los diagramas y los documentos v2 se generaron con scripts a partir de una sola fuente de datos. Los scripts no se guardaron en el repositorio: la fuente son los documentos, y el script de verificación comprueba que sigan alineados.
