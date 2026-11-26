# MS-02 · Conversación (orquestador)

> **Estado:** solo organización. El código se crea en la **etapa 1** (flujo 1 de CU-08: atracción y primer contacto), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Orquesta la conversación: con cada `MensajeRecibido` pide la intención a MS-03 y, según el paso, llama a MS-04, MS-05, MS-06, MS-07, MS-09 y MS-10. Guarda el historial y el avance, retoma tras un abandono y deriva al asesor con el contexto.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 1.2 Primer contacto · 2.1 Perfilamiento · 3.2 Asignación y seguimiento |
| Datos propios | `conversacion`, `mensaje`, `mensaje_opcion`, `mensaje_adjunto`, `plantilla_mensaje`, `plantilla_opcion` |
| Esquema de Oracle | `ms02` |
| Sistemas externos | — (canales por MS-01) |
| Eventos que publica | `ConversacionIniciada`, `ConversacionDerivada`, `ConversacionAbandonada`, `ConversacionRetomada` |
| Desplegable | imagen `ms02-conversacion`, host `July.Services.Conversacion.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Arquitectura de software ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms02.Conversacion/
├── July.Services.Conversacion/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Conversacion.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms02.Conversacion/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms02-conversacion/`.
