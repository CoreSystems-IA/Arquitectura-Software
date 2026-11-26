# MS-01 · Canales

> **Estado:** solo organización. El código se crea en la **etapa 1** (flujo 1 de CU-08: atracción y primer contacto), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Recibe el webhook de WhatsApp y los mensajes del widget, verifica la firma, descarta duplicados por `idExterno` y los unifica en un solo formato de mensaje en la cola de entrada. También envía las respuestas de July por el canal correcto. Publica `MensajeRecibido` para MS-02.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Genérico |
| Capacidad | 1.1 Canales de contacto |
| Datos propios | `campana`; deduplicación por `idExterno` y cola de entrada (Redis) |
| Esquema de Oracle | `ms01` |
| Sistemas externos | WhatsApp Business API, Widget web |
| Eventos que publica | `MensajeRecibido`, `MensajeEntregado` |
| Desplegable | imagen `ms01-canales`, host `July.Services.Canales.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms01.Canales/
├── July.Services.Canales/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Canales.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms01.Canales/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms01-canales/`.
