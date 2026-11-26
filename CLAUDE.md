# Proyecto Arq Software

Proyecto de arquitectura de software y empresarial: mapa de capacidades de negocio, casos de uso y modelos ArchiMate del asistente July (Cooperativa Padre Julián Lorente). Se trabaja en español.

## Documentación

- Todo documento que se genere en el proyecto va dentro de `Documentacion/`, en una de sus dos carpetas: `Arquitectura/` para los artefactos de arquitectura, agrupados por las vistas 4+1 de Kruchten y, dentro de cada vista, numerados en su orden en la cadena de trazabilidad: `0-escenarios/` (`01-mapa-capacidades/`, `02-casos-de-uso/`, `03-especificacion-casos-de-uso/`), `1-vista-logica/` (`04-modelo-de-dominio/`, `05-diccionario-de-datos/`, `06-diagrama-de-clases/`, `08-diagrama-de-robustez/`, `09-linaje-de-datos/`, `10-modelo-de-datos/`), `2-vista-de-procesos/` (`07-diagrama-de-secuencia/`), `3-vista-de-desarrollo/` (microservicios y stack tecnológico) y `4-vista-fisica/` (despliegue), y `Complementarios/` para el material de apoyo, sin numeración (`referencias/`, `revisiones/`, `planes/`, `realizado/`, `negocio/`, `arquitectura/`, `plantillas/`, `informesROL/`, `prototipo/`, `presentacion/`). Fuera de `Documentacion/` solo quedan la portada del repositorio (`README.md` y sus imágenes en `Assets/`), los archivos de configuración de la raíz y el código del monorrepositorio de July según SAD-07 (`Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md`): `src/`, `tests/`, `deployments/`, `scripts/`, `_httpclients/`, `.config/`, `.husky/` y `.vscode/`. Como documentación, en esas carpetas solo va un `README.md` por carpeta (qué va ahí, quién responde y en qué etapa recibe su contenido); la documentación de arquitectura sigue en `Documentacion/`.

- **Todo plan** que se genere (qué se va a hacer, en qué orden y cómo se comprueba) va en `Documentacion/Complementarios/planes/`, y **todo documento sobre lo que ya se hizo** (guías de lo construido, registros de cambios) va en `Documentacion/Complementarios/realizado/`.
- Cada documento nuevo o modificado se registra en `Documentacion/README.md` en el mismo cambio, con su ID, origen («Deriva de»), relaciones, fecha y estado. Ahí están las convenciones de nombres e identificadores.
- Las imágenes van en una subcarpeta `imagenes/` junto al documento que las usa y se enlazan con rutas relativas.
- El modelo nativo de Archi (`.archimate`) es la fuente; la exportación XML (Open Exchange) se regenera a partir de él y debe estar sincronizada.

## Código

- **Por ahora solo organización (etapa 0-A de SAD-07).** No se añade ni se amplía configuración ni código; la primera versión de la configuración (0-B) y de la base de código (0-C) que ya está en el repositorio queda en pausa hasta que se retomen esas etapas.
- El árbol, los nombres y las etapas de construcción salen de SAD-07; las capas y reglas de dependencia, de SAD-06; el stack, de SAD-05 (.NET 10: los paquetes `Microsoft.*` se quedan en 10.x).
- Versiones de paquetes solo en `Directory.Packages.props`; herramientas solo en `.config/dotnet-tools.json`, y cada una con un uso en el `Makefile`, un hook o el `Jenkinsfile`.
- La carpeta de cada microservicio existe desde la etapa 0-A solo con su `README.md`; sus proyectos se crean cuando empieza su etapa, con sus pruebas y su contrato: no hay proyectos esqueleto (lección L-02 de SAD-07).
- Las clases, métodos, enumeraciones y tablas conservan los nombres de CLS-01 y DAT-01; las carpetas técnicas (`src`, `Features`, `Models`) van en inglés.
- Comprobación local: `make check` (formato, analizadores, pruebas de dependencias y trazabilidad).
