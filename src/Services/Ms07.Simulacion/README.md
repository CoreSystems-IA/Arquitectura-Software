# MS-07 · Simulación financiera

> **Estado:** solo organización. El código se crea en la **etapa 2** (flujo 2 de CU-08: captura, simulación y precalificación), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Calcula la cuota, la tabla de amortización, el total a pagar y la comparación de escenarios con aritmética decimal exacta. Lee la tasa y la versión vigentes de MS-08 y devuelve la simulación a MS-02.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 2.2 Simulación financiera |
| Datos propios | `simulacion` (copia la tasa y la versión de la línea) |
| Esquema de Oracle | `ms07` |
| Sistemas externos | — |
| Eventos que publica | `SimulacionCalculada` |
| Desplegable | imagen `ms07-simulacion`, host `July.Services.Simulacion.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms07.Simulacion/
├── July.Services.Simulacion/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Simulacion.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms07.Simulacion/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms07-simulacion/`.
