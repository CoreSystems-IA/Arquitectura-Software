# src · código de July

> **Estado:** carpeta de organización (etapa 0-A, [SAD-07, sección 10](../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)). Cada subcarpeta indica en su README en qué etapa recibe su contenido.

Todo el código que se ejecuta: microservicios, BFF, interfaces, bibliotecas compartidas y contratos. Las pruebas van aparte, en `tests/`; la infraestructura, en `deployments/`.

| Carpeta | Qué va |
|---|---|
| [`Aspire/`](Aspire) | Orquestación local con .NET Aspire (solo desarrollo) |
| [`Bffs/`](Bffs) | BFF del panel de la cooperativa |
| [`BuildingBlocks/`](BuildingBlocks) | Bibliotecas técnicas compartidas, sin lógica de negocio |
| [`Contracts/`](Contracts) | Contratos OpenAPI y AsyncAPI |
| [`Services/`](Services) | Un microservicio por carpeta (MS-01 a MS-14) y los tipos compartidos |
| [`UIs/`](UIs) | Panel de la cooperativa (Angular) y widget del prospecto (React) |
