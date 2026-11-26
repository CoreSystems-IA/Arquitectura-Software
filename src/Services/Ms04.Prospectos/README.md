# MS-04 · Prospectos y consentimiento

> **Estado:** solo organización. El código se crea en la **etapa 1** (flujo 1 de CU-08: atracción y primer contacto), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Registra el consentimiento con la versión del aviso, guarda la identidad y el contacto, valida la cédula y consulta al core si la persona es socia. MS-09 le pide edad, actividad y condición de socio; publica `ConsentimientoAceptado` y `SocioReconocido`.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Núcleo |
| Capacidad | 1.2 Primer contacto · 2.1 Perfilamiento |
| Datos propios | `prospecto` (cédula y teléfono cifrados) |
| Esquema de Oracle | `ms04` |
| Sistemas externos | Sistema core |
| Eventos que publica | `ConsentimientoAceptado`, `ConsentimientoRetirado`, `SocioReconocido`, `IdentidadValidada` |
| Desplegable | imagen `ms04-prospectos`, host `July.Services.Prospectos.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms04.Prospectos/
├── July.Services.Prospectos/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Prospectos.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms04.Prospectos/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms04-prospectos/`.
