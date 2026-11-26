# UIs · interfaces de usuario

> **Estado:** organización hecha; el contenido llega en la **etapa 1 y etapa 3** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

| Carpeta | Qué es | Etapa |
|---|---|---|
| [`widget-prospecto/`](widget-prospecto) | Chat incrustable para el prospecto | 1 |
| [`panel-cooperativa/`](panel-cooperativa) | Panel de los colaboradores de la cooperativa | 3 |

Las dos comparten un espacio de trabajo de npm (`package.json` en esta carpeta) y generan su cliente de API desde `src/Contracts/openapi/`.
