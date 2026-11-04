# Proyecto Arq Software

Proyecto de arquitectura de software y empresarial: mapa de capacidades de negocio, casos de uso y modelos ArchiMate del asistente July (Cooperativa Padre Julián Lorente). Se trabaja en español.

## Documentación

- Todo documento que se genere en el proyecto va dentro de `Documentacion/`, en una de sus dos carpetas: `Arquitectura/` para los artefactos de la cadena de trazabilidad, numerados en su orden (`01-mapa-capacidades/`, `02-casos-de-uso/`, `03-especificacion-casos-de-uso/`, `04-modelo-de-dominio/`, `05-diccionario-de-datos/`, `06-diagrama-de-clases/`, `07-diagrama-de-secuencia/`, `08-diagrama-de-robustez/`), y `Complementarios/` para el material de apoyo, sin numeración (`referencias/`, `revisiones/`, `negocio/`, `arquitectura/`, `plantillas/`). Fuera de `Documentacion/` solo quedan la portada del repositorio (`README.md` y sus imágenes en `Assets/`) y archivos de configuración.
- Cada documento nuevo o modificado se registra en `Documentacion/README.md` en el mismo cambio, con su ID, origen («Deriva de»), relaciones, fecha y estado. Ahí están las convenciones de nombres e identificadores.
- Las imágenes van en una subcarpeta `imagenes/` junto al documento que las usa y se enlazan con rutas relativas.
- El modelo nativo de Archi (`.archimate`) es la fuente; la exportación XML (Open Exchange) se regenera a partir de él y debe estar sincronizada.
