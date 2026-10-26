# Documentación — Proyecto Arq Software

Índice y matriz de trazabilidad de toda la documentación del proyecto. Cada documento nuevo se registra aquí en el mismo cambio en que se crea o modifica.

## Estructura

```
Documentacion/
├── README.md                  ← este índice
├── 01-referencias/
│   └── Bibliografia/          material fuente, su traducción y sus figuras (imagenes/)
├── 02-mapa-capacidades/       imagen del mapa de capacidades
│   └── Archi/                 modelos nativos de Archi (.archimate) y su exportación XML
├── 03-casos-de-uso/           diagramas (draw.io y PNG) y especificaciones de casos de uso
├── 04-diagrama-de-clase/      diccionario de datos y modelo de clases
├── 05-revisiones/             revisiones de consistencia y trazabilidad entre documentos
└── 06-negocio/                guías del dominio de negocio (cooperativa, crédito y captación)
```

| Carpeta | Contenido | Prefijo de ID |
|---|---|---|
| `01-referencias/` | Material fuente externo (libros, artículos, informes) y sus traducciones | `REF` |
| `02-mapa-capacidades/` | Mapa de capacidades de negocio y su modelado | `CAP` |
| `03-casos-de-uso/` | Casos de uso y su modelado | `CU` |
| `04-diagrama-de-clase/` | Diccionario de datos y modelo de clases | `CLS` |
| `05-revisiones/` | Revisiones de consistencia, redundancia y trazabilidad | `REV` |
| `06-negocio/` | Guías del dominio de negocio para entender a la cooperativa y preparar las reuniones | `NEG` |

## Convenciones

- **Ubicación:** todo documento generado en el proyecto se guarda dentro de `Documentacion/`, en la carpeta de su tipo. Las imágenes van en una subcarpeta `imagenes/` junto al documento que las usa, enlazadas con rutas relativas.
- **Identificador:** `<PREFIJO>-<NN>` (por ejemplo, `CAP-02`). Es único y no se reutiliza aunque el documento se retire.
- **No confundir identificadores:** `CU-NN` con guion es el ID de un documento de esta matriz. `CU 1.1.1` con espacio y puntos es un caso de uso de la especificación (CU-08). `SA-NN` es un servicio de aplicación del modelo ArchiMate (CAP-03); su correspondencia con los casos está en CU-08. Los modelos obsoletos CAP-01 y CAP-02 aún numeran esos servicios «CU-NN»; no se citan.
- **Nombre de archivo y carpeta:** en minúsculas, con guiones, sin espacios ni tildes (`mapa-capacidades-etapa-2.md`). Las carpetas de primer nivel llevan un número de orden (`04-...`).
- **Encabezado:** cada documento Markdown nuevo empieza con su identificador, versión, fecha y los documentos de los que deriva.
- **Trazabilidad:** la columna «Deriva de» indica de qué documentos sale cada uno; «Relacionado con» indica los documentos que deben mantenerse coherentes con él.
- **Estados:** `Borrador` → `En revisión` → `Aprobado` → `Obsoleto`.
- **Nueva carpeta:** cuando aparezca un tipo de documento que no encaje en las anteriores, se crea la carpeta con el siguiente número y se añade a la tabla de estructura con su prefijo.
- **Exportaciones:** el XML (Open Exchange) y los PNG son exportaciones de un modelo o diagrama fuente; se regeneran desde él cuando la fuente cambia. El XML de CAP-03 se genera con [`02-mapa-capacidades/Archi/archi-a-open-exchange.py`](02-mapa-capacidades/Archi/archi-a-open-exchange.py) o desde Archi con *Archivo › Exportar › Open Exchange*.

## Matriz de documentos

| ID | Documento | Ruta | Tipo | Deriva de | Relacionado con | Fecha | Estado |
|---|---|---|---|---|---|---|---|
| REF-01 | *The Business Capability Map: The «Rosetta Stone» of Business/IT Alignment* (Ulrich y Rosen, Cutter Consortium, 2011) | [`01-referencias/Bibliografia/rosetta-stone-ulrich-rosen-2011.pdf`](01-referencias/Bibliografia/rosetta-stone-ulrich-rosen-2011.pdf) | Referencia (PDF) | — | REF-02 | 2026-10-15 | Aprobado |
| REF-02 | Traducción al español de REF-01 (con sus 17 figuras) | [`01-referencias/Bibliografia/el-mapa-de-capacidades-de-negocio.md`](01-referencias/Bibliografia/el-mapa-de-capacidades-de-negocio.md) | Traducción (Markdown) | REF-01 | CAP-01 | 2026-10-21 | Aprobado |
| CAP-01 | Modelo ArchiMate: mapa de capacidades y casos de uso de July (Cooperativa Padre Julián Lorente), versión inicial | [`02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso.archimate`](02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso.archimate) | Modelo Archi (nativo) | REF-02 | CAP-02 | 2026-10-20 | Obsoleto |
| CAP-02 | Modelo ArchiMate, etapa 2: añade el flujo de valor con sus etapas (Canales de contacto, Primer contacto, Perfilamiento, Simulación financiera, Precalificación, Entrega de oportunidades, Asignación y seguimiento) | [`02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa2.archimate`](02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa2.archimate) | Modelo Archi (nativo) | CAP-01 | CAP-03 | 2026-10-24 | Obsoleto |
| CAP-03 | Modelo ArchiMate, etapa 3 (vigente): CAP-02 con los servicios renumerados SA-01 a SA-25 y los actores Comité de crédito y Equipo de marketing | [`02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa3.archimate`](02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa3.archimate) | Modelo Archi (nativo) | CAP-02 | CAP-04, CAP-05, CU-02 a CU-08 | 2026-10-24 | Borrador |
| CAP-04 | Imagen del mapa de capacidades con su flujo de valor (vista de CAP-03) | [`02-mapa-capacidades/mapa-capacidades-y-casos-de-uso-etapa3.png`](02-mapa-capacidades/mapa-capacidades-y-casos-de-uso-etapa3.png) | Exportación (PNG) | CAP-03 | CU-08 | 2026-10-24 | Borrador |
| CU-01 | Exportación ArchiMate 3.1 (Open Exchange) de CAP-01. Retirada: el archivo pasó a ser CAP-05 | `02-mapa-capacidades/Archi/mapa-capacidades-cod.xml` (ya no existe) | Modelo ArchiMate (XML de intercambio) | CAP-01 | CAP-05 | 2026-10-24 | Obsoleto |
| CAP-05 | Exportación ArchiMate 3.1 (Open Exchange) de CAP-03: 118 elementos, 215 relaciones y 7 vistas | [`02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa3.xml`](02-mapa-capacidades/Archi/mapa-capacidades-y-casos-de-uso-etapa3.xml) | Modelo ArchiMate (XML de intercambio) | CAP-03 | CAP-03 | 2026-10-24 | Borrador |
| CU-02 | Diagrama general de casos de uso de July: los 14 casos de nivel 2 (CU 1.1.1 a CU 3.2.2), cada uno ligado a su capacidad de nivel 2 | [`03-casos-de-uso/casos-de-uso-july.drawio`](03-casos-de-uso/casos-de-uso-july.drawio) | Diagrama (draw.io) | CAP-02 | CU-03 a CU-05, CU-08 | 2026-10-24 | Borrador |
| CU-03 | Diagrama de casos de uso del flujo de valor 1: Atracción y primer contacto (y su exportación `.png`) | [`03-casos-de-uso/casos-de-uso-flujo-01-atraccion-y-primer-contacto.drawio`](03-casos-de-uso/casos-de-uso-flujo-01-atraccion-y-primer-contacto.drawio) | Diagrama (draw.io + PNG) | CAP-02, CU-02 | CU-06, CU-08 | 2026-10-24 | Borrador |
| CU-04 | Diagrama de casos de uso del flujo de valor 2: Captura, simulación y precalificación (y su exportación `.png`) | [`03-casos-de-uso/casos-de-uso-flujo-02-captura-simulacion-y-precalificacion.drawio`](03-casos-de-uso/casos-de-uso-flujo-02-captura-simulacion-y-precalificacion.drawio) | Diagrama (draw.io + PNG) | CAP-02, CU-02 | CU-06, CU-08 | 2026-10-24 | Borrador |
| CU-05 | Diagrama de casos de uso del flujo de valor 3: Entrega, seguimiento y conversión (y su exportación `.png`) | [`03-casos-de-uso/casos-de-uso-flujo-03-entrega-seguimiento-y-conversion.drawio`](03-casos-de-uso/casos-de-uso-flujo-03-entrega-seguimiento-y-conversion.drawio) | Diagrama (draw.io + PNG) | CAP-02, CU-02 | CU-06, CU-08 | 2026-10-24 | Borrador |
| CU-06 | Casos de uso de July por flujo de valor (niveles 1, 2 y 3 con sus actores) | [`03-casos-de-uso/casos-de-uso-por-flujo.md`](03-casos-de-uso/casos-de-uso-por-flujo.md) | Descripción (Markdown) | CU-03 a CU-05 | CU-08 | 2026-10-24 | Borrador |
| CU-07 | Presentación de casos de uso: los 14 casos de nivel 2 con diagramas de secuencia. Reemplazada por CU-08; sus números de paso no coinciden con los de CU-08 | [`03-casos-de-uso/presentacion-casos-de-uso.md`](03-casos-de-uso/presentacion-casos-de-uso.md) | Presentación (Markdown + Mermaid) | CU-06, CU-03 a CU-05, CAP-02 | CU-08 | 2026-10-24 | Obsoleto |
| CU-08 | Especificaciones de los casos de uso de July en sus tres niveles (7 de nivel 1, 14 de nivel 2 y 42 de nivel 3; 237 pasos en los niveles 1 y 2): una oración y un verbo por paso, con sujeto, verbo → método, sustantivo → entidad y relación; incluye la correspondencia con los servicios SA-01 a SA-25, el alcance del reto y las reglas transversales de protección de datos | [`03-casos-de-uso/especificaciones-casos-de-uso.md`](03-casos-de-uso/especificaciones-casos-de-uso.md) | Especificación (Markdown) | CU-07, CU-06, CAP-03 | CLS-01, REV-01 | 2026-10-24 | Borrador |
| CLS-01 | Diccionario de datos, etapa 3: 15 clases y 55 métodos consolidados a partir de CU-08, con atributos y tipos, enumeraciones y sus transiciones, métodos con entrada y salida, relaciones con su tipo y multiplicidad, trazabilidad paso a paso con CU-08 y tabla de resumen con la descripción de cada entidad | [`04-diagrama-de-clase/diccionario-de-datos-etapa3.md`](04-diagrama-de-clase/diccionario-de-datos-etapa3.md) | Diccionario de datos (Markdown) | CU-08 | CU-08, CLS-02, REV-01 | 2026-10-24 | Borrador |
| CLS-02 | Diagrama de clases UML de July, etapa 3: las 15 clases de CLS-01 con sus estereotipos («control», «entidad», «interfaz»), atributos, 55 métodos, las 24 relaciones con su tipo y multiplicidad, las 13 enumeraciones y una leyenda por categoría (y su exportación [`.png`](04-diagrama-de-clase/diagrama-de-clases-etapa3.png)) | [`04-diagrama-de-clase/diagrama-de-clases-etapa3.drawio`](04-diagrama-de-clase/diagrama-de-clases-etapa3.drawio) | Diagrama (draw.io + PNG) | CLS-01 | CLS-01 | 2026-10-24 | Borrador |
| REV-01 | Revisión de consistencia, redundancia, ambigüedad y trazabilidad de la etapa 3, con lo corregido, las decisiones tomadas y la vista de desarrollo del chatbot | [`05-revisiones/revision-consistencia-etapa3.md`](05-revisiones/revision-consistencia-etapa3.md) | Revisión (Markdown) | CAP-03, CU-02 a CU-08, CLS-01 | CU-08, CLS-01 | 2026-10-24 | Borrador |
| NEG-01 | Guía del negocio de una cooperativa de ahorro y crédito y de la captación de prospectos: modelo de negocio, gobierno, regulación en Ecuador, productos, ciclo del crédito, evaluación, amortización, indicadores, embudo de captación y KPI, preguntas para los directivos, caso de ejemplo y diccionario de términos | [`06-negocio/guia-negocio-cooperativa-y-captacion.md`](06-negocio/guia-negocio-cooperativa-y-captacion.md) | Guía (Markdown + Mermaid) | CAP-03, CU-08, CLS-01 | CU-06, CU-08, CLS-01 | 2026-10-24 | Borrador |

## Historial de cambios del índice

| Fecha | Cambio |
|---|---|
| 2026-10-21 | Creación del índice y registro de los documentos existentes. |
| 2026-10-21 | Reorganización: carpetas numeradas sin espacios, imágenes movidas junto a REF-02 y archivos renombrados según la convención. |
| 2026-10-21 | Registro de CAP-02, CAP-03 y CU-02 a CU-07. CU-01 cambió de ruta a `02-mapa-capacidades/mapa-capacidades-cod.xml`. |
| 2026-10-24 | Registro de CU-08 (especificaciones de casos de uso en los tres niveles). |
| 2026-10-24 | Nueva carpeta `04-diagrama-de-clase/` (prefijo `CLS`) y registro de CLS-01 (diccionario de datos, etapa 3). |
| 2026-10-24 | CLS-01 v2.0: el modelo se reduce de 41 a 15 clases. |
| 2026-10-24 | Revisión REV-01: rutas corregidas (`Bibliografia/`, `Archi/`) y fila REF-02/CAP-01 separada; nueva carpeta `05-revisiones/` (prefijo `REV`); registro de CAP-04 (PNG del mapa) y de las exportaciones PNG de CU-03 a CU-05; nombres de etapa unificados con el mapa en CAP-02, CAP-03, CU-03 a CU-08; CU-02 renumerado con los IDs de nivel 2; CU-07 pasa a Obsoleto; CU-08 v1.1 y CLS-01 v2.1; eliminado el respaldo `.bak` de CAP-02. |
| 2026-10-24 | Decisiones de REV-01 aplicadas: CAP-03 vigente con servicios SA-01 a SA-25 y actores Comité de crédito y Equipo de marketing; CAP-01 y CAP-02 obsoletos; CU-01 retirado y su archivo regenerado desde CAP-03 como CAP-05; CU-08 v1.2 (flujo 3 automatizado, captura con monto primero, alcance del reto y reglas de datos personales); CLS-01 v2.2; CU-02, CU-05 y CU-06 actualizados. |
| 2026-10-24 | CLS-01: la tabla de resumen (sección 7) incluye una columna con la descripción de cada entidad. |
| 2026-10-24 | Registro de CLS-02 (diagrama de clases en draw.io, derivado de CLS-01) y de su exportación PNG. |
| 2026-10-24 | Nueva carpeta `06-negocio/` (prefijo `NEG`) y registro de NEG-01 (guía del negocio cooperativo y de la captación de prospectos). |
