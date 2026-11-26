# MS-06 · Solicitud de crédito

> **Estado:** solo organización. El código se crea en la **etapa 2** (flujo 2 de CU-08: captura, simulación y precalificación), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Guarda lo que declara el prospecto (ingresos, actividad, monto, plazo y destino) y valida formatos y rangos con MS-08. Registra el escenario elegido en MS-07, el resultado que publica MS-09 y, al final, los documentos y la resolución del Comité.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 2.1 Perfilamiento |
| Datos propios | `solicitud_credito`, `solicitud_factor`, `solicitud_documento` |
| Esquema de Oracle | `ms06` |
| Sistemas externos | — |
| Eventos que publica | `SolicitudConfirmada`, `EscenarioElegido`, `DocumentosRecibidos` |
| Desplegable | imagen `ms06-solicitud`, host `July.Services.Solicitud.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms06.Solicitud/
├── July.Services.Solicitud/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Solicitud.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms06.Solicitud/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms06-solicitud/`.
