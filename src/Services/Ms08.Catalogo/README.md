# MS-08 · Catálogo de productos

> **Estado:** solo organización. El código se crea en la **etapa 2** (flujo 2 de CU-08: captura, simulación y precalificación), según [SAD-07, sección 10](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas).

Publica las líneas de crédito versionadas (tasas, plazos, montos, palabras clave y requisitos) con una sola versión vigente. Lo leen, entre otros, MS-03 (palabras clave), MS-06 (rangos) y MS-07 (tasa); avisa los cambios con `CatalogoPublicado`.

| Campo | Valor |
|---|---|
| Ficha completa | [SAD-03, sección 2](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md#2-tabla-resumen-de-microservicios) |
| Tipo | Soporte |
| Capacidad | 2.2 Simulación financiera · 2.3 Precalificación |
| Datos propios | `linea_credito`, `linea_credito_version`, `linea_plazo`, `linea_palabra_clave`, `linea_requisito` |
| Esquema de Oracle | `ms08` |
| Sistemas externos | — |
| Eventos que publica | `CatalogoPublicado` |
| Desplegable | imagen `ms08-catalogo`, host `July.Services.Catalogo.Api` ([SAD-07, sección 6](../../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#6-un-desplegable-por-microservicio)) |
| Responsable | Backend ([SAD-06, sección 11](../../../Documentacion/Arquitectura/3-vista-de-desarrollo/vista-de-desarrollo-july.md#11-reparto-del-trabajo)) |

## Qué va en esta carpeta

```text
Ms08.Catalogo/
├── July.Services.Catalogo/          proyecto del servicio en Vertical Slice (SAD-07, sección 5)
│   ├── <Clase de CLS-01>/        Models, ValueObjects, Features/<CasoDeUso>/v1, Contracts, Data, Dtos, Exceptions
│   └── Shared/                   Data (DbContext del esquema, outbox), Clients, Extensions
├── July.Services.Catalogo.Api/      host ASP.NET Core: solo compone
├── Dockerfile
└── Dockerfile.dev
```

Sus pruebas van en `tests/Services/Ms08.Catalogo/`, su contrato en `src/Contracts/` y su chart en `deployments/helm/ms08-catalogo/`.
