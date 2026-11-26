# deployments/configs

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-B (configuración)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

Archivos que montan Docker Compose y Helm: `oracle/init/` (un usuario por esquema `ms01` a `ms14`, más `quartz`), `rabbitmq/` (exchange de eventos y cola de fallidos) y, cuando haga falta, `grafana/`, `loki/`, `tempo/`, `prometheus/` y `otel-collector/`. Responsables: Seguridad y Base de datos.
