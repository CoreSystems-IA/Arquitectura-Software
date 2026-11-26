# deployments/wso2 · gateway

> **Estado:** organización hecha; el contenido llega en la **etapa 0-B (configuración)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

`apis/` con la definición de cada API para `apictl` y el `deployment.toml` versionado del API Manager. Se publica desde la tubería, nunca a mano (SAD-06, sección 8). Sustituye a `gateway/` de SAD-06. Responsable: Seguridad.
