# deployments/helm

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-B (configuración)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

`july-servicio/` es el chart de biblioteca con la plantilla común (Deployment, Service, NetworkPolicy, HPA y secretos de Vault). Cada microservicio tendrá su chart (`ms06-solicitud/`, …) que solo declara sus valores, con `values-desarrollo.yaml`, `values-pruebas.yaml` y `values-produccion.yaml`. Responsables: Seguridad y Backend.
