# Aspire · entorno local

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-C (base común de código)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

`July.AppHost` levanta en una sola orden los 14 microservicios, el BFF, Oracle Free, RabbitMQ, Redis y Vault. `July.ServiceDefaults` es el arranque común de los 15 hosts: telemetría, sondas de salud y resiliencia. Producción no usa Aspire: usa Kubernetes y Helm (pendiente PO-02).
