# Services · microservicios

> **Estado:** carpeta de organización (etapa 0-A, [SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)). Cada subcarpeta indica en su README en qué etapa recibe su contenido.

Una carpeta por microservicio de [SAD-03](../../Documentacion/Arquitectura/3-vista-de-desarrollo/microservicios-july.md). Cada una es un desplegable propio desde su etapa: host, imagen, chart y esquema de Oracle (SAD-07, sección 6). Los servicios solo se hablan por red; ninguno referencia el código de otro.

| Carpeta | Microservicio | Etapa |
|---|---|---|
| [`Ms01.Canales`](Ms01.Canales) | MS-01 Canales | 1 |
| [`Ms02.Conversacion`](Ms02.Conversacion) | MS-02 Conversación (orquestador) | 1 |
| [`Ms03.Comprension`](Ms03.Comprension) | MS-03 Comprensión del lenguaje | 1 |
| [`Ms04.Prospectos`](Ms04.Prospectos) | MS-04 Prospectos y consentimiento | 1 |
| [`Ms05.Leads`](Ms05.Leads) | MS-05 Leads | 1 |
| [`Ms06.Solicitud`](Ms06.Solicitud) | MS-06 Solicitud de crédito | 2 |
| [`Ms07.Simulacion`](Ms07.Simulacion) | MS-07 Simulación financiera | 2 |
| [`Ms08.Catalogo`](Ms08.Catalogo) | MS-08 Catálogo de productos | 2 |
| [`Ms09.Precalificacion`](Ms09.Precalificacion) | MS-09 Precalificación | 2 |
| [`Ms10.Agenda`](Ms10.Agenda) | MS-10 Agenda y citas | 2 |
| [`Ms11.Entrega`](Ms11.Entrega) | MS-11 Entrega de oportunidades | 3 |
| [`Ms12.Asignacion`](Ms12.Asignacion) | MS-12 Asignación y seguimiento | 3 |
| [`Ms13.Notificaciones`](Ms13.Notificaciones) | MS-13 Notificaciones | 3 |
| [`Ms14.Auditoria`](Ms14.Auditoria) | MS-14 Auditoría y trazabilidad | 4 |
| [`Shared`](Shared) | Tipos compartidos (sin lógica) | 0-C |
