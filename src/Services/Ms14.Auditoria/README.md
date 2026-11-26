# MS-14 · Auditoría y trazabilidad

> **Estado:** solo organización. El código se crea en la **etapa 4** (transversal: puede ir en paralelo desde la etapa 1), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Escucha los eventos de los demás servicios y los guarda en una bitácora de solo inserción encadenada con SHA-256. Con ella se reconstruye el recorrido de cada lead y el embudo (SA-24). No publica eventos.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Genérico |
| Capacidad | Transversal (todas) |
| Datos propios | `evento` (encadenado con SHA-256), proyección del embudo |
| Esquema de Oracle | `ms14` |
| Sistemas externos | — |
| Eventos que publica | — (solo consume eventos) |
| Desplegable | imagen `ms14-auditoria`, host `July.Services.Auditoria.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Base de datos ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms14.Auditoria/
├── July.Services.Auditoria/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Auditoria.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms14.Auditoria/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms14-auditoria/`.
