# MS-05 · Leads

> **Estado:** solo organización. El código se crea en la **etapa 1** (flujo 1 de CU-08: atracción y primer contacto), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Crea el lead y es el único que cambia su estado (`EstadoLead`). Recibe comandos y eventos de MS-09 (precalificación), MS-11 (prioridad e `idCRM`) y MS-12 (asesor), y publica `LeadPrecalificado`, que activa la entrega en MS-11.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 1.2 Primer contacto · 3.2 Asignación y seguimiento |
| Datos propios | `lead` |
| Esquema de Oracle | `ms05` |
| Sistemas externos | — (CRM por MS-11) |
| Eventos que publica | `LeadRegistrado`, `LeadPrecalificado`, `LeadAsignado`, `LeadCerrado` |
| Desplegable | imagen `ms05-leads`, host `July.Services.Leads.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms05.Leads/
├── July.Services.Leads/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Leads.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms05.Leads/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms05-leads/`.
