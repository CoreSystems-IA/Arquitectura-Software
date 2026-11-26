# MS-11 · Entrega de oportunidades

> **Estado:** solo organización. El código se crea en la **etapa 3** (flujo 3 de CU-08: entrega, seguimiento y conversión), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Se activa con `LeadPrecalificado`: arma la ficha a partir de eventos, calcula la prioridad y la sincroniza con el CRM por bandeja de salida y reintentos. Publica `LeadSincronizado` (lo escucha MS-12) o `SincronizacionFallida` (MS-13 avisa al jefe comercial).

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 3.1 Entrega de oportunidades |
| Datos propios | Proyección de la ficha (`v_ficha_lead` como modelo de lectura), `regla_negocio` de tipo PRIORIDAD, bandeja de salida al CRM y mapeo `idCRM` |
| Esquema de Oracle | `ms11` |
| Sistemas externos | CRM de la cooperativa |
| Eventos que publica | `FichaGenerada`, `PrioridadCalculada`, `LeadSincronizado`, `SincronizacionFallida` |
| Desplegable | imagen `ms11-entrega`, host `July.Services.Entrega.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms11.Entrega/
├── July.Services.Entrega/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Entrega.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms11.Entrega/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms11-entrega/`.
