# deployments/docker-compose

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-B (configuración)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

`docker-compose.infrastructure.yaml` (Oracle Free, RabbitMQ, Redis y Vault; WSO2 en el perfil `wso2`) y, desde la etapa 1, `docker-compose.services.yaml`. Solo plantillas `.env.sample`; los `.env` reales no se versionan. Responsable: Seguridad.
