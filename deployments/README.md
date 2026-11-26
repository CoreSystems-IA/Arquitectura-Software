# deployments · infraestructura

> **Estado:** carpeta de organización (etapa 0-A, [SAD-07, sección 10](../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)). Cada subcarpeta indica en su README en qué etapa recibe su contenido.

| Carpeta | Qué va |
|---|---|
| [`configs/`](configs) | Archivos que montan Compose y Helm: Oracle, RabbitMQ, observabilidad |
| [`docker-compose/`](docker-compose) | Infraestructura local y servicios en Docker |
| [`helm/`](helm) | Chart de biblioteca común y un chart por microservicio |
| [`terraform/`](terraform) | Red, clúster, bases y almacenamiento |
| [`wso2/`](wso2) | APIs y configuración del gateway WSO2 |

Kubernetes se despliega solo con Helm: no hay manifiestos planos ni Kustomize (lección L-07).
