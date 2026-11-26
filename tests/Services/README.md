# tests/Services · pruebas por microservicio

> **Estado:** organización hecha; el contenido llega en la **etapa de cada servicio (1 a 4)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

Una carpeta por microservicio con el mismo nombre que en `src/Services/` (`Ms06.Solicitud/`, …), creada junto con el servicio. Dentro: `…UnitTests` (un caso por paso de CU-08), `…IntegrationTests` (Oracle Free con Testcontainers), `…EndToEndTests` (la API en memoria), `…DependencyTests` (reglas de la sección 5 de SAD-07 y R-D1 a R-D5) y `…TestShared`. Las pruebas de carga solo para MS-01 y MS-02. Ningún servicio entra a `main` sin pruebas (lección L-10).
