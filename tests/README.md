# tests · pruebas

> **Estado:** carpeta de organización (etapa 0-A, [SAD-07, sección 10](../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)). Cada subcarpeta indica en su README en qué etapa recibe su contenido.

Pruebas separadas del código que se ejecuta (SAD-07, sección 7).

| Carpeta | Qué va |
|---|---|
| [`BuildingBlocks/`](BuildingBlocks) | Pruebas de las bibliotecas compartidas y reglas de dependencia |
| [`Services/`](Services) | Por microservicio: Unit, Integration, EndToEnd, Dependency y TestShared |
| [`Contrato/`](Contrato) | Pruebas de contrato con PactNet |
| [`E2E/`](E2E) | Los tres flujos de CU-08 con Playwright |
| [`Evals/`](Evals) | Evaluaciones del modelo de lenguaje (MS-03) |
| [`Shared/`](Shared) | Fixtures y datos de prueba comunes |
