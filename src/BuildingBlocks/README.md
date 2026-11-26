# BuildingBlocks · bibliotecas compartidas

> **Estado:** Ya tiene una primera versión, escrita y compilada antes de tiempo; queda **en pausa** hasta su etapa y se revisa entonces. Le corresponde la **etapa 0-C (base común de código)** ([SAD-07, sección 10](../../Documentacion/Complementarios/planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas)).

Bibliotecas técnicas, sin lógica de negocio y sin submódulo de Git (lección L-01):

| Proyecto | Qué resuelve |
|---|---|
| `July.BuildingBlocks.Core` | Comandos, consultas, resultados y errores; forma de un evento de integración |
| `July.BuildingBlocks.Persistence.Oracle` | DbContext base por esquema, *outbox* e *inbox* |
| `July.BuildingBlocks.Messaging.RabbitMQ` | Publicación del *outbox* y consumo idempotente |
| `July.BuildingBlocks.Security` | JWT interno (regla L5) y cifrado por columna |
