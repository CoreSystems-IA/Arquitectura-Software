# MS-12 · Asignación y seguimiento

> **Estado:** solo organización. El código se crea en la **etapa 3** (flujo 3 de CU-08: entrega, seguimiento y conversión), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Se activa con `LeadSincronizado`: elige el asesor según línea, agencia y carga, lo notifica por MS-13 y avisa a MS-05 con `AsesorAsignado`. Vigila los plazos de atención, los recordatorios y las reactivaciones.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 3.2 Asignación y seguimiento |
| Datos propios | `asesor_comercial`, `asesor_linea`, `regla_negocio` de tipo ENRUTAMIENTO, `v_asesor_carga`; temporizadores («pendiente vencido») |
| Esquema de Oracle | `ms12` |
| Sistemas externos | — (avisos por MS-13) |
| Eventos que publica | `AsesorAsignado`, `PlazoAtencionVencido`, `ReactivacionSolicitada` |
| Desplegable | imagen `ms12-asignacion`, host `July.Services.Asignacion.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms12.Asignacion/
├── July.Services.Asignacion/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Asignacion.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms12.Asignacion/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms12-asignacion/`.
