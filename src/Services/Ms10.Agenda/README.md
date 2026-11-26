# MS-10 · Agenda y citas

> **Estado:** solo organización. El código se crea en la **etapa 2** (flujo 2 de CU-08: captura, simulación y precalificación), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Reserva, confirma y reprograma la cita en la agencia con los horarios que publica el Personal de agencia. MS-02 lo llama durante la conversación y MS-13 envía los avisos de la cita.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Soporte |
| Capacidad | 2.3 Precalificación · 3.2 Asignación y seguimiento |
| Datos propios | `cita`, `agencia` |
| Esquema de Oracle | `ms10` |
| Sistemas externos | — (horarios que publica el Personal de agencia) |
| Eventos que publica | `CitaReservada`, `CitaConfirmada`, `CitaReprogramada`, `CitaAtendida` |
| Desplegable | imagen `ms10-agenda`, host `July.Services.Agenda.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms10.Agenda/
├── July.Services.Agenda/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Agenda.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms10.Agenda/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms10-agenda/`.
