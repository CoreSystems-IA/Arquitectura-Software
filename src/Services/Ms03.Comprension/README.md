# MS-03 · Comprensión del lenguaje

> **Estado:** solo organización. El código se crea en la **etapa 1** (flujo 1 de CU-08: atracción y primer contacto), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Servicio sin estado: recibe un texto de MS-02 y devuelve la intención y los valores extraídos (monto, plazo, destino), validados contra las palabras clave de MS-08. Es el único que habla con el proveedor de LLM; no calcula ni decide.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Soporte |
| Capacidad | 1.2 Primer contacto |
| Datos propios | Ninguno (sin estado). Lee palabras clave de MS-08 y preguntas frecuentes de MS-02 |
| Esquema de Oracle | — (sin estado) |
| Sistemas externos | Proveedor de LLM |
| Eventos que publica | `IntencionDetectada` |
| Desplegable | imagen `ms03-comprension`, host `July.Services.Comprension.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms03.Comprension/
├── July.Services.Comprension/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Comprension.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms03.Comprension/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms03-comprension/`.
