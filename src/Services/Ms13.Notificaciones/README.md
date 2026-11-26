# MS-13 · Notificaciones

> **Estado:** solo organización. El código se crea en la **etapa 3** (flujo 3 de CU-08: entrega, seguimiento y conversión), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Envía los avisos internos a asesores, agencias, jefe comercial y Delegado de protección de datos cuando se lo piden MS-02, MS-04, MS-10, MS-11 o MS-12, y registra cada envío y cada falla.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Genérico |
| Capacidad | Transversal (apoya 1.2, 2.3 y 3.2) |
| Datos propios | Registro de envíos y plantillas de aviso interno |
| Esquema de Oracle | `ms13` |
| Sistemas externos | Servicio de notificaciones |
| Eventos que publica | `NotificacionEnviada`, `NotificacionFallida` |
| Desplegable | imagen `ms13-notificaciones`, host `July.Services.Notificaciones.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms13.Notificaciones/
├── July.Services.Notificaciones/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Notificaciones.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms13.Notificaciones/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms13-notificaciones/`.
