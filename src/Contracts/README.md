# Contracts · contratos entre componentes

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-C (base común de código)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

- `openapi/`: un `openapi.yaml` por servicio (OpenAPI 3.1). El gateway WSO2 los importa y el panel y el widget generan sus clientes desde ellos (regla L1).
- `asyncapi/`: eventos y comandos de RabbitMQ (AsyncAPI 3).
- `comun/` en cada una: el esquema común de errores y el sobre común de eventos.

Se revisan como artefactos y se versionan con semver (SAD-06, sección 8). Responsable: Arquitectura de software.
