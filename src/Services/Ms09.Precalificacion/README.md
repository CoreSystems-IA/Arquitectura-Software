# MS-09 · Precalificación

> **Estado:** solo organización. El código se crea en la **etapa 2** (flujo 2 de CU-08: captura, simulación y precalificación), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Evalúa las reglas con los datos de MS-06 y MS-04 y emite APTO, A_REVISAR o NO_APTO con la versión de la regla y su explicación. Publica `PrecalificacionEmitida`: MS-06 guarda el resultado y MS-05 pasa el lead a PRECALIFICADO; «a revisar» abre un caso para el Comité.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 2.3 Precalificación |
| Datos propios | `regla_negocio` y `regla_parametro` de tipo PRECALIFICACION |
| Esquema de Oracle | `ms09` |
| Sistemas externos | Sistema core (por MS-04) |
| Eventos que publica | `PrecalificacionEmitida` (APTO, A_REVISAR o NO_APTO, con la versión de la regla), `CasoRevisionAbierto` |
| Desplegable | imagen `ms09-precalificacion`, host `July.Services.Precalificacion.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms09.Precalificacion/
├── July.Services.Precalificacion/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Precalificacion.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms09.Precalificacion/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms09-precalificacion/`.
