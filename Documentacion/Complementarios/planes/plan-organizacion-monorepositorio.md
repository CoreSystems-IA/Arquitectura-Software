# Plan de organización del monorrepositorio de July

| Campo | Valor |
|---|---|
| **ID** | SAD-07 |
| **Versión** | 1.2 |
| **Fecha** | 2026-11-26 |
| **Estado** | Borrador (etapa 0-A de organización aplicada; 0-B y 0-C adelantadas y en pausa; el plan sigue sin aprobar: PO-01 y PO-02) |
| **Deriva de** | REF-04 (manual de arquitectura de food-delivery-microservices), SAD-06 (vista de desarrollo, secciones 4, 7, 8, 9 y 12), SAD-05 (stack sobre las tecnologías de la cooperativa), SAD-03 (los 14 microservicios) |
| **Alimenta a** | SAD-06 (secciones 4, 7 y 12, decisiones DV-01, DV-02 y DA-06), SAD-03 (decisión D5), SAD-01 (DA-06), `CLAUDE.md` y `README.md` de la raíz, etapa 0 de construcción |
| **Cambios en 1.2** | El documento pasa de `Arquitectura/3-vista-de-desarrollo/` a `Complementarios/planes/` (todos los planes van ahí) y conserva su ID. La etapa 0 se divide en 0-A (organización), 0-B (configuración) y 0-C (base común de código), y la organización va primero (DO-06). Se aplica 0-A: el árbol de la sección 2 queda completo, con un `README.md` por carpeta y las 14 carpetas de microservicios. La primera versión de 0-B y 0-C, escrita antes, queda en pausa. Nueva sección 10.1 con el avance; nuevo pendiente PO-09 (traducción de DAT-02 por esquema). |
| **Cambios en 1.1** | July arranca directamente con microservicios: cada uno de los 14 tiene su host, su imagen y su chart desde la etapa 1. Se retiran los 6 desplegables agrupados y la carpeta `src/Hosts/` (secciones 1, 2, 3, 5, 6, 8, 10 y 11). |

> **Para qué sirve.** Propone cómo convertir este repositorio en el **monorrepositorio de July** tomando como modelo la organización de food-delivery-microservices ([REF-04](../referencias/Bibliografia/manual-arquitectura-food-delivery-microservices.md)): raíz con el contrato de compilación y de herramientas, `src/` con servicios en Vertical Slice, `tests/` aparte, `deployments/` con la infraestructura y una orquestación local con .NET Aspire. Adapta ese modelo a lo que July ya tiene decidido: 14 microservicios (SAD-03), gateway WSO2, Oracle, Jenkins y el panel en Angular (SAD-05).
>
> **Microservicios desde el inicio.** A diferencia de SAD-03 (D5) y SAD-06 (DA-06), July **no** empieza como monolito modular con 6 desplegables: cada microservicio se construye, se prueba y se despliega por separado desde la etapa 1, como en el manual (sección 6).
>
> **Supuesto.** El plan asume el stack de [SAD-05](../../Arquitectura/3-vista-de-desarrollo/stack_tecnologico_PJL.md) (.NET 10), que es el que siguen los informes por rol INF-01 a INF-06 y el que usa el manual de referencia. Si se aprobara SAD-04, la forma del árbol se mantiene y solo cambian los archivos de la raíz (sección 4).
>
> **Lo que no es:** no repite los criterios de partición (SAD-03) ni las capas y reglas de dependencia (SAD-06); los ubica en carpetas. No mueve nada de `Documentacion/`. Todo lo que aquí se nombra es **propuesta** hasta que se apruebe.

## Contenido

1. [Qué se toma del manual y qué no](#1-qué-se-toma-del-manual-y-qué-no)
2. [Árbol propuesto](#2-árbol-propuesto)
3. [Finalidad de cada carpeta](#3-finalidad-de-cada-carpeta)
4. [Archivos de la raíz y contrato de herramientas](#4-archivos-de-la-raíz-y-contrato-de-herramientas)
5. [Interior de un servicio: Vertical Slice con las reglas hexagonales](#5-interior-de-un-servicio-vertical-slice-con-las-reglas-hexagonales)
6. [Un desplegable por microservicio](#6-un-desplegable-por-microservicio)
7. [Pruebas](#7-pruebas)
8. [Integración continua con Jenkins](#8-integración-continua-con-jenkins)
9. [Lecciones del manual convertidas en reglas](#9-lecciones-del-manual-convertidas-en-reglas)
10. [Plan de migración por etapas](#10-plan-de-migración-por-etapas)
11. [Decisiones y pendientes](#11-decisiones-y-pendientes)

## 1. Qué se toma del manual y qué no

| Elemento de food-delivery-microservices | En July | Motivo |
|---|---|---|
| Monorrepositorio .NET 10 con `.slnx`, `global.json`, `Directory.Build.props` y `Directory.Packages.props` | **Se adopta** (`July.slnx`) | Mismo lenguaje que SAD-05; versiones y analizadores fijados en un solo lugar. |
| `src/Services/<Name>/` con `FoodDelivery.Services.X` + `FoodDelivery.Services.X.Api` | **Se adopta tal cual**: cada microservicio tiene su proyecto de servicio y su host `.Api` desde el inicio | July arranca con microservicios, sin monolito modular (sección 6). |
| Vertical Slice: `<Modulo>/Features/<CasoDeUso>/v1/` | **Se adopta** con las reglas de dependencia hexagonales de SAD-06 | Cada paso de CU-08 tiene una carpeta fija (sección 5). |
| `src/Services/Shared/` con contratos de eventos, permisos, roles y constantes | **Se adopta** | Equivale a `packages/dominio` y a los contratos de eventos de SAD-06. |
| `src/Aspire/` (AppHost y ServiceDefaults) | **Se adopta** solo para desarrollo local | Levanta los 14 microservicios, el BFF, Oracle Free, RabbitMQ y Redis con un comando; con 15 procesos, arrancarlos a mano no es viable. Producción sigue en Kubernetes y Helm (SAD-05). |
| `src/Bffs/` | **Se adopta con un solo BFF** (`Panel.Bff`) | El widget habla con el gateway y la app móvil existente es un cliente externo (SAD-05). |
| `src/UIs/` | **Se adopta**: panel en Angular 21 y widget en React 19 | SAD-05, sección 3. |
| `src/ApiGateway/` con YARP | **No se adopta** | El gateway es WSO2 API Manager (requisito fijo). Su configuración va en `deployments/wso2/`. |
| `src/BuildingBlocks/` como **submódulo** Git (Squirrel) | **Se adopta como carpeta normal**, sin submódulo | El manual muestra que un clon sin `--recurse-submodules` deja la solución sin compilar. |
| Mensajería Wolverine | **No se adopta** | SAD-05 fija `RabbitMQ.Client` con *outbox* en Oracle; la abstracción vive en `src/BuildingBlocks/`. |
| PostgreSQL (escritura) + MongoDB (lectura) | **No se adopta** | Oracle con un esquema por servicio (SAD-05); las proyecciones de lectura (D4 de SAD-03) son vistas o tablas del mismo esquema. |
| `tests/` separado de `src/`, con Unit, Integration, EndToEnd, Dependency y Load por servicio | **Se adopta** y se añaden Contrato, E2E de CU-08 y Evals | SAD-06, sección 10. |
| `deployments/` con `configs/`, `docker-compose/` y `k8s/` (manifiestos planos **y** Kustomize) | **Se adopta** con una sola vía para Kubernetes: Helm | Dos formas de desplegar lo mismo es duplicación; SAD-05 elige Helm. |
| `.config/dotnet-tools.json` | **Se adopta** solo con herramientas que se usan | El manual encontró 6 de 12 herramientas sin uso (sección 9). |
| `.husky/` | **Se adopta con los hooks activos** | En el manual las invocaciones estaban comentadas. |
| `.github/workflows/` | **Se sustituye** por `Jenkinsfile` | SAD-05: Jenkins con tuberías en Groovy. |
| `docs/eventcatalog/` | **No se adopta por ahora** | La documentación vive en `Documentacion/`; los eventos se describen en AsyncAPI (`src/Contracts/`). |
| `Makefile` y `mise.toml` | **Se adopta solo el `Makefile`** | Un único punto de entrada para los comandos; menos herramientas que instalar. |

## 2. Árbol propuesto

`Documentacion/`, `Assets/`, `README.md`, `CLAUDE.md` y `.gitignore` ya existen y no cambian de lugar. Lo demás es nuevo.

```text
Arquitectura-Software/                         ← monorrepositorio de July
├── .config/
│   └── dotnet-tools.json                      herramientas locales de .NET (sección 4)
├── .husky/                                    hooks de Git activos: pre-commit, pre-push, commit-msg
├── .vscode/                                   extensiones recomendadas, launch y settings (sin rutas locales)
├── Assets/                                    imágenes de la portada (ya existe)
├── Documentacion/                             documentación de arquitectura (ya existe, sin cambios)
├── _httpclients/                              archivos .http por servicio para probar a mano
├── deployments/
│   ├── configs/                               grafana, loki, tempo, prometheus, otel-collector, rabbitmq, oracle/init
│   ├── docker-compose/                        infraestructura sola y servicios; .env.sample
│   ├── helm/                                  chart de biblioteca común, un chart por microservicio, valores por entorno
│   ├── terraform/                             red, clúster, bases y almacenamiento
│   └── wso2/                                  apis/ para apictl y deployment.toml del gateway
├── scripts/                                   versión, pruebas, lint de Dockerfiles, arranque
├── src/
│   ├── Aspire/
│   │   ├── July.AppHost/                      orquestación local
│   │   └── July.ServiceDefaults/              OpenTelemetry, health checks, resiliencia
│   ├── Bffs/
│   │   └── Panel.Bff/July.Panel.Bff/          BFF del panel (ASP.NET Core + SignalR)
│   ├── BuildingBlocks/                        bibliotecas técnicas compartidas (sin submódulo)
│   ├── Contracts/
│   │   ├── openapi/                           un openapi.yaml por servicio, revisado como artefacto
│   │   └── asyncapi/                          eventos y comandos (AsyncAPI 3)
│   ├── Services/                              un desplegable por microservicio (sección 6)
│   │   ├── Ms01.Canales/                      July.Services.Canales + July.Services.Canales.Api
│   │   ├── Ms02.Conversacion/
│   │   ├── …                                  un directorio por microservicio, con su README.md desde la etapa 0-A
│   │   ├── Ms14.Auditoria/
│   │   └── Shared/July.Services.Shared/       contratos de eventos, enumeraciones de CLS-01, roles
│   └── UIs/
│       ├── panel-cooperativa/                 Angular 21
│       ├── widget-prospecto/                  React 19 + Vite (modo biblioteca)
│       └── package.json                       espacio de trabajo npm de las dos UIs
├── tests/
│   ├── BuildingBlocks/
│   ├── Services/<MsNN.Nombre>/                Unit, Integration, EndToEnd, Dependency, TestShared
│   ├── Contrato/                              PactNet
│   ├── E2E/                                   Playwright: los flujos de CU-08
│   ├── Evals/                                 intención, extracción y prompt injection (MS-03)
│   └── Shared/Tests.Shared/                   fixtures de Oracle, RabbitMQ y Redis; fábricas
├── .csharpierrc.yaml
├── .dockerignore
├── .editorconfig
├── .gitattributes
├── .gitignore                                 (ya existe; se amplía)
├── .gitleaks.toml
├── .prettierrc
├── CLAUDE.md                                  (ya existe; se actualiza, sección 10)
├── Directory.Build.props
├── Directory.Packages.props
├── Jenkinsfile
├── July.slnx
├── Makefile
├── README.md                                  (ya existe; se añade «Cómo arrancar»)
├── global.json
├── nuget.config
└── version.json
```

## 3. Finalidad de cada carpeta

| Ruta | Finalidad | Equivalente en el manual | Responsable (SAD-06, sección 11) |
|---|---|---|---|
| `Documentacion/` | Artefactos de arquitectura y material de apoyo. No cambia. | `docs/` | Todos |
| `src/Aspire/July.AppHost/` | Registra los 14 microservicios, el BFF, Oracle Database Free, RabbitMQ, Redis y Vault en modo desarrollo. Uso: `dotnet run --project src/Aspire/July.AppHost`. | `src/Aspire/FoodDelivery.AppHost/` | Arquitectura |
| `src/Aspire/July.ServiceDefaults/` | OpenTelemetry con `traceparent`, health checks, resiliencia HTTP y registros sin datos personales. Sustituye a `packages/observabilidad` de SAD-06. | `FoodDelivery.ServiceDefaults/` | Arquitectura |
| `src/Bffs/Panel.Bff/` | Une las bandejas de varios servicios, enmascara según el rol y mantiene el canal SignalR. Es lo único que el panel ve detrás del gateway. | `src/Bffs/Spa.Bff/` | Backend |
| `src/BuildingBlocks/` | `July.BuildingBlocks.Core` (comandos, consultas, resultados y errores), `.Persistence.Oracle` (DbContext base y outbox), `.Messaging.RabbitMQ` (publicador del outbox y consumidor idempotente), `.Security` (validación del JWT interno, regla L5, y cifrado por columna con llave en Vault). Sin lógica de negocio. | `src/BuildingBlocks/` (Squirrel) | Arquitectura y Backend |
| `src/Contracts/` | Contratos OpenAPI 3.1 y AsyncAPI 3. El gateway los importa y el panel y el widget generan sus clientes desde ellos (regla L1). | — (en el manual, los contratos de eventos están en `Services/Shared`) | Arquitectura |
| `src/Services/MsNN.Nombre/` | Un microservicio de SAD-03: proyecto del servicio en Vertical Slice (sección 5), su host `.Api`, `Dockerfile` y `Dockerfile.dev`. Es un desplegable por sí solo (sección 6). | `src/Services/<Name>/` | Backend; MS-02 Arquitectura; MS-14 Base de datos |
| `src/Services/Shared/July.Services.Shared/` | Contratos de eventos en C# (un espacio de nombres por servicio publicador), enumeraciones de CLS-01, la clase abstracta `Configuracion`, los 8 roles del panel y los nombres de recursos de Aspire. Solo tipos (regla R-D4). | `src/Services/Shared/` | Backend |
| `src/UIs/panel-cooperativa/` | Panel de la cooperativa (`PanelCooperativa` de CLS-01) en Angular 21. Cliente generado con `openapi-generator` (`typescript-angular`). | `src/UIs/BlazorWebApp/` | Frontend y UI/UX |
| `src/UIs/widget-prospecto/` | Chat incrustable en React 19 con Shadow DOM. | `src/UIs/Spa/react-food-delivery/` | Frontend y UI/UX |
| `tests/` | Pruebas separadas del código de runtime (sección 7). | `tests/` | Cada responsable de su componente |
| `deployments/configs/` | Archivos que montan Compose y Helm: observabilidad, `rabbitmq-plugins`, `oracle/init/` (un usuario por esquema `ms01` a `ms14`, más `quartz` y los permisos mínimos de la regla L2). | `deployments/configs/` | Seguridad y Base de datos |
| `deployments/docker-compose/` | `docker-compose.infrastructure.yaml` (Oracle Free, RabbitMQ, Redis, Vault, WSO2 API Manager, Identity Server y Micro Integrator) y `docker-compose.services.yaml`. Plantillas `.env.sample`, nunca `.env` reales. | `deployments/docker-compose/` | Seguridad |
| `deployments/helm/` | Un chart de biblioteca (`july-servicio`) con la plantilla común (Deployment, Service, HPA, sondas, NetworkPolicy, secretos de Vault) y un chart por microservicio que solo declara sus valores, con `values-desarrollo.yaml`, `values-pruebas.yaml` y `values-produccion.yaml` (SAD-06, sección 9). | `deployments/k8s/kustomize/` | Seguridad y Backend |
| `deployments/terraform/` | Red, clúster, bases y almacenamiento. | — | Seguridad |
| `deployments/wso2/` | `apis/` para `apictl` y `deployment.toml` versionado; se publica desde la tubería, nunca a mano (SAD-06, sección 8). Sustituye a `gateway/` de SAD-06. | `src/ApiGateway/` | Seguridad |
| `scripts/` | `calculate-version.sh`, `run-tests.sh`, `lint-dockerfiles.sh` y `traducir-ddl-oracle.sh` si se automatiza la traducción de DAT-02. | `scripts/` | Arquitectura |
| `_httpclients/` | Un `.http` por servicio con los pasos de CU-08 que expone; variables en `http-client.env.json`, el `.private` en `.gitignore`. | `_httpclients/` | Backend |

## 4. Archivos de la raíz y contrato de herramientas

| Archivo | Contenido propuesto | Lección del manual que aplica |
|---|---|---|
| `global.json` | SDK de .NET 10 fijado y el runner Microsoft.Testing.Platform. | — |
| `Directory.Build.props` | `net10.0`, `Nullable` y `ImplicitUsings` activos, `TreatWarningsAsErrors` en CI, analizadores (StyleCop, Roslynator) y `Nerdbank.GitVersioning`. | Un solo sistema de versionado: el manual mezcla `GitVersion.MsBuild` y nbgv. |
| `Directory.Packages.props` | Gestión central de paquetes: EF Core 10 con `Oracle.EntityFrameworkCore`, `RabbitMQ.Client`, Quartz.NET, `Microsoft.Extensions.AI`, SignalR, xUnit, Testcontainers, PactNet, NetArchTest. | Sin importar un props de un submódulo. |
| `nuget.config` | `<clear />`, nuget.org y, si existe, el feed interno de la cooperativa. | — |
| `July.slnx` | Todos los proyectos de `src/` y `tests/`, con carpetas de solución iguales al árbol. | — |
| `.editorconfig`, `.csharpierrc.yaml`, `.prettierrc` | Estilo de C# y de TypeScript. | El mismo formateador en local y en CI. |
| `.gitleaks.toml` | Reglas de secretos, más patrones de cédula ecuatoriana y teléfono para que no lleguen datos personales de prueba. | — |
| `version.json` | Esquema de nbgv; versión `0.1-preview.{height}` hasta la primera entrega a pruebas. | — |
| `Makefile` | `prepare` (restore de herramientas y solución, `husky install`, `npm ci` en `src/UIs`), `check` (formato, analizadores, reglas R-D), `test`, `run` (Aspire), `infra-up`. | Un solo punto de entrada. |
| `Jenkinsfile` | Tubería declarativa que usa la *shared library* en Groovy de la cooperativa (sección 8). | Reemplaza a `.github/workflows/`. |

### `.config/dotnet-tools.json`

Solo entran herramientas con un uso en el repositorio, todas con `rollForward: false` y la versión fijada en la etapa 0-B:

| Herramienta | Comando | Dónde se usa |
|---|---|---|
| `csharpier` | `dotnet csharpier` | `make check`, hook pre-commit y la tubería (la misma comprobación en los tres) |
| `husky` | `husky` | `make prepare`; grupos pre-commit, pre-push y commit-msg |
| `dotnet-ef` | `dotnet-ef` | Migraciones de cada servicio (si se elige EF Core, pendiente PO-04) |
| `nbgv` | `nbgv` | `scripts/calculate-version.sh` y la etiqueta de cada imagen |
| `aspire.cli` | `aspire` | `make run` |

No entran Tye, `gitversion.tool`, Swashbuckle CLI, `dotnet-openapi` ni Kiota mientras no haya un script que los use. El cliente del panel se genera con `openapi-generator`, que es una dependencia de npm en `src/UIs/package.json`.

## 5. Interior de un servicio: Vertical Slice con las reglas hexagonales

El manual organiza cada servicio por caso de uso (`Features/<CasoDeUso>/v1/`); SAD-06 (DV-02) lo organiza en capas hexagonales (`dominio/`, `aplicacion/`, `infraestructura/`, `api/`, `eventos/`). Las dos formas son compatibles: el Vertical Slice decide **dónde** está el código (junto al caso de uso) y las reglas hexagonales deciden **de qué** puede depender. Se propone el corte vertical del manual, conservando las reglas de dependencia de SAD-06.

```text
src/Services/Ms06.Solicitud/
├── July.Services.Solicitud/
│   ├── SolicitudCredito/                      una carpeta por clase de CLS-01 que posee el servicio
│   │   ├── Models/                            SolicitudCredito y sus invariantes          (dominio/)
│   │   ├── ValueObjects/                      montos, plazos, factores                    (dominio/)
│   │   ├── Features/                          un caso de uso por paso de CU-08           (aplicacion/ + api/)
│   │   │   ├── RegistrarDatoSolicitud/v1/     comando, validador, manejador y endpoint
│   │   │   ├── ResumirSolicitud/v1/
│   │   │   └── GuardarResultadoPrecalificacion/v1/   suscriptor de PrecalificacionEmitida (eventos/)
│   │   ├── Contracts/                         puertos: repositorio, cliente de MS-08       (aplicacion/)
│   │   ├── Data/                              configuración de EF Core y repositorio Oracle (infraestructura/)
│   │   ├── Dtos/v1/                           contratos de la API del servicio
│   │   └── Exceptions/                        Application/ y Domain/
│   ├── Shared/
│   │   ├── Data/                              SolicitudDbContext (esquema ms06), outbox, migraciones
│   │   ├── Clients/                           clientes HTTP hacia otros servicios (solo puertos de lectura)
│   │   └── Extensions/                        AddSolicitud() y MapSolicitudEndpoints()
│   ├── SolicitudConfiguration.cs              registro del servicio
│   └── README.md                              qué capacidades y pasos de CU-08 cubre
├── July.Services.Solicitud.Api/               host ASP.NET Core: Program.cs, appsettings, launchSettings
├── Dockerfile                                 imagen chiseled de .NET firmada con Cosign
└── Dockerfile.dev
```

El host `.Api` solo compone: llama a `AddServiceDefaults()`, `AddSolicitud()` y `MapSolicitudEndpoints()`. Toda la lógica vive en el proyecto del servicio, para que las pruebas lo usen sin levantar el host.

| Carpeta del Vertical Slice | Capa hexagonal de SAD-06 | Puede depender de | No puede depender de |
|---|---|---|---|
| `<Clase>/Models/`, `ValueObjects/` | `dominio/` | `July.Services.Shared` | Ninguna otra carpeta del servicio, EF Core, ASP.NET Core |
| `<Clase>/Features/<Caso>/v1/` (manejador) | `aplicacion/` | `Models/`, `Contracts/` | `Data/`, `Shared/Data/` |
| `<Clase>/Features/<Caso>/v1/` (endpoint o suscriptor) | `api/` y `eventos/` | El manejador de su carpeta | `Data/` |
| `<Clase>/Contracts/` | Puertos de `aplicacion/` | `Models/` | Implementaciones |
| `<Clase>/Data/`, `Shared/Data/`, `Shared/Clients/` | `infraestructura/` | `Contracts/` (los implementa), `Models/` | Endpoints |

Estas reglas, más R-D1 a R-D5 de SAD-06, se comprueban en `tests/Services/<MsNN>/…DependencyTests` con NetArchTest, igual que las `DependencyTests` del manual.

**Nombres.** Se mantienen las convenciones de SAD-06 (sección 7): las clases, los métodos y las tablas conservan los nombres de CLS-01 y DAT-01 (en C#, con la inicial en mayúscula: `RegistrarDato(campo, valor)`); el caso de uso lleva el nombre de SAD-06 (`RegistrarDatoSolicitud`) y el número del paso de CU-08 en su comentario; el esquema de Oracle es el número del servicio (`ms06`). Las carpetas técnicas de primer nivel (`src`, `tests`, `deployments`, `Features`, `Models`) quedan en inglés, como en el manual y en el ecosistema .NET; lo que viene del dominio queda en español.

## 6. Un desplegable por microservicio

July no pasa por un monolito modular: desde la etapa 1 cada microservicio de SAD-03 es un desplegable propio, con su host `.Api`, su imagen, su chart, su usuario de Oracle y su escalado, como en el manual (`FoodDelivery.Services.X.Api`). Esto deja sin efecto la decisión D5 de SAD-03 y DA-06 de SAD-01 (6 desplegables en la fase 1) y la etapa 5 «Separación» de SAD-06 (pendiente PO-07).

| Desplegable | Proyecto host | Imagen | Esquema de Oracle | Sistemas externos (regla L4) |
|---|---|---|---|---|
| MS-01 Canales | `July.Services.Canales.Api` | `ms01-canales` | `ms01` | WhatsApp Business API, widget |
| MS-02 Conversación | `July.Services.Conversacion.Api` | `ms02-conversacion` | `ms02` | — |
| MS-03 Comprensión del lenguaje | `July.Services.Comprension.Api` | `ms03-comprension` | — (sin estado) | Proveedor de LLM por el AI Gateway |
| MS-04 Prospectos y consentimiento | `July.Services.Prospectos.Api` | `ms04-prospectos` | `ms04` | Sistema core por el Micro Integrator |
| MS-05 Leads | `July.Services.Leads.Api` | `ms05-leads` | `ms05` | — |
| MS-06 Solicitud de crédito | `July.Services.Solicitud.Api` | `ms06-solicitud` | `ms06` | — |
| MS-07 Simulación financiera | `July.Services.Simulacion.Api` | `ms07-simulacion` | `ms07` | — |
| MS-08 Catálogo de productos | `July.Services.Catalogo.Api` | `ms08-catalogo` | `ms08` | — |
| MS-09 Precalificación | `July.Services.Precalificacion.Api` | `ms09-precalificacion` | `ms09` | — |
| MS-10 Agenda y citas | `July.Services.Agenda.Api` | `ms10-agenda` | `ms10` | — |
| MS-11 Entrega de oportunidades | `July.Services.Entrega.Api` | `ms11-entrega` | `ms11` | CRM por el Micro Integrator |
| MS-12 Asignación y seguimiento | `July.Services.Asignacion.Api` | `ms12-asignacion` | `ms12` | — |
| MS-13 Notificaciones | `July.Services.Notificaciones.Api` | `ms13-notificaciones` | `ms13` | Servicio de notificaciones |
| MS-14 Auditoría y trazabilidad | `July.Services.Auditoria.Api` | `ms14-auditoria` | `ms14` | — |
| BFF del panel | `July.Panel.Bff` | `bff-panel` | — | — |

Son 15 imágenes de .NET, más el panel y el widget como estáticos. Los servicios se comunican solo por red, con las tres formas de SAD-06 (sección 6): llamada HTTP descrita en `src/Contracts/openapi/`, y comando o evento por RabbitMQ descrito en `src/Contracts/asyncapi/`. No hay adaptadores en proceso ni referencias entre proyectos de servicios distintos.

### Qué cuesta y cómo se contiene

Empezar con microservicios multiplica desde el primer día lo que hay que construir, desplegar y observar. El plan lo contiene así:

| Costo | Cómo se contiene |
|---|---|
| 15 hosts con el mismo arranque (telemetría, salud, JWT interno, resiliencia) | `July.ServiceDefaults` y `July.BuildingBlocks`: cada `Program.cs` queda en unas pocas líneas. |
| 15 charts de Helm | Un chart de biblioteca común; cada servicio solo declara sus valores. |
| Tiempo de la tubería | Jenkins construye y prueba solo los servicios cuyo directorio cambió (sección 8). |
| Fallas en cadena entre servicios | Resiliencia HTTP con tiempo límite y reintentos en `ServiceDefaults`; árbol de llamadas con raíz en MS-02 (R-D1); coreografía por eventos desde la precalificación (D1 de SAD-03). |
| Consistencia entre servicios | *Outbox* en la misma transacción de Oracle y consumidores idempotentes (`July.BuildingBlocks.Messaging.RabbitMQ`). |
| Contratos que se rompen sin aviso | Pruebas de contrato con PactNet en cada cambio (sección 7) y versionado semántico de los contratos (SAD-06, sección 8). |
| Entorno local pesado | Aspire levanta todo con un comando; cada persona puede arrancar solo los servicios de su flujo. |
| Más recursos en el clúster | Réplicas mínimas por servicio en `desarrollo` y `pruebas`; escalado horizontal solo en `produccion`, empezando por MS-01, MS-02 y MS-03. |

## 7. Pruebas

| Carpeta | Qué contiene | Equivalente en el manual |
|---|---|---|
| `tests/Directory.Build.props` | xunit.v3, Microsoft Testing Platform, cobertura | Igual |
| `tests/BuildingBlocks/` | Unitarias del núcleo; integración del outbox con Oracle Free y RabbitMQ | `tests/BuildingBlocks/` |
| `tests/Services/<MsNN>/…UnitTests` | Un caso por paso de CU-08 que recibe el servicio, e invariantes de sus entidades | `*UnitTests` |
| `tests/Services/<MsNN>/…IntegrationTests` | Repositorio, migraciones y outbox con Testcontainers (Oracle Database Free) | `*IntegrationTests` |
| `tests/Services/<MsNN>/…EndToEndTests` | La API del servicio levantada en memoria | `*EndToEndTests` |
| `tests/Services/<MsNN>/…DependencyTests` | Reglas de la sección 5 y R-D1 a R-D5 con NetArchTest | `*DependencyTests` |
| `tests/Services/<MsNN>/…TestShared` | Fakes y constructores de datos del servicio | `*TestShared` |
| `tests/Contrato/` | PactNet entre consumidor y proveedor, una prueba por flecha de SAD-06, sección 6 | — |
| `tests/E2E/` | Playwright: los tres flujos de CU-08 con su principal y sus alternativos, con el número de paso en cada aserción (formato de PRO-01) | — |
| `tests/Evals/` | Intención, extracción de valores y prompt injection (SAD-02) | — |
| `tests/Shared/Tests.Shared/` | Fixtures de Oracle, RabbitMQ y Redis; autenticación simulada de los 8 roles | `tests/Shared/Tests.Shared/` |

Las pruebas de carga (`…LoadTests`) solo se crean para MS-01 y MS-02, que reciben el tráfico de entrada. Todo servicio implementado tiene su carpeta de pruebas desde el primer cambio (en el manual, Orders no la tiene).

## 8. Integración continua con Jenkins

El `Jenkinsfile` de la raíz usa la *shared library* de la cooperativa (SAD-05, sección 7) y sigue las etapas de SAD-06, sección 9:

1. `dotnet tool restore` y `dotnet restore July.slnx`; `npm ci` en `src/UIs`.
2. **Las mismas comprobaciones que en local:** `dotnet csharpier check .`, analizadores y `DependencyTests`. (El manual corre en CI una herramienta de formato distinta de la que se usa en local.)
3. Pruebas unitarias, de integración y de contrato; `ng test` y Vitest.
4. SonarQube, Semgrep, Trivy y Gitleaks.
5. Versión con nbgv; imágenes solo de los microservicios cuyo directorio cambió, firmadas con Cosign; charts de Helm.
6. Despliegue en `desarrollo`, publicación de APIs con `apictl`, E2E de CU-08, evals y OWASP ZAP.
7. Paso a `pruebas` y, con aprobación humana, a `produccion`.

La lista de imágenes que construye la tubería sale de los proyectos `*.Api` de `src/Services/` y de `src/Bffs/`: no se puede añadir un microservicio sin que entre en la tubería, ni dejar en la tubería uno que no existe (en el manual, CI solo publica 5 de los 16 servicios).

## 9. Lecciones del manual convertidas en reglas

| # | Hallazgo en food-delivery-microservices (REF-04) | Regla para July |
|---|---|---|
| L-01 | `src/BuildingBlocks` es un submódulo: un clon normal no compila. | Sin submódulos. Lo compartido vive en el repositorio. |
| L-02 | Once servicios son esqueletos (`Class1.cs` y un `Program.cs` vacío). | La carpeta de un servicio existe desde la etapa 0-A solo con su `README.md`; sus proyectos se crean cuando empieza su etapa (sección 10), con su prueba y su contrato. No hay proyectos esqueleto. |
| L-03 | El manifiesto `.config` tiene 6 herramientas sin uso. | Cada herramienta del manifiesto tiene un comando en `Makefile`, en un hook o en la tubería; si no, sale. |
| L-04 | Los hooks de Husky existen, pero su invocación está comentada; el README cita un `commit-msg` que no existe. | Los hooks quedan activos y los tres (pre-commit, pre-push, commit-msg) existen desde la etapa 0-B. |
| L-05 | Formato con csharpier en local y `dotnet format style` en CI. | Una sola comprobación de formato, la misma en local, en el hook y en Jenkins. |
| L-06 | Dos sistemas de versionado (`GitVersion.MsBuild` y nbgv). | Solo nbgv. |
| L-07 | Manifiestos de Kubernetes planos y Kustomize a la vez. | Solo Helm. |
| L-08 | El workspace de VS Code apunta a una ruta local (`d:/OpenSource/…`) y el README dice .NET 9 con .NET 10 en el código. | Sin rutas absolutas en archivos versionados; el `README.md` toma las versiones de `global.json` y `Directory.Packages.props`. |
| L-09 | Un typo en un nombre de archivo (`.env.cutomers.sample`) y en una carpeta (`GettingUerByEmail`). | Los nombres de carpetas de `Features/` se toman de SAD-06 y CLS-01, no se escriben de memoria. |
| L-10 | Orders no tiene carpeta de pruebas y el README promete event sourcing que el código no tiene. | Un servicio no entra a `main` sin pruebas; el `README.md` de cada servicio describe lo que hay y, mientras no tenga código, lo dice. |

## 10. Plan de migración por etapas

Las etapas siguen el orden de construcción de SAD-06 (sección 12), sin su etapa 5 «Separación»: no hace falta, porque cada servicio ya nace desplegable por separado. La etapa 0 se divide en tres y **la organización va primero** (DO-06): se fija el árbol del repositorio, con lo que va en cada carpeta, antes de escribir configuración o código.

| Paso | Qué se hace | Resultado verificable |
|---|---|---|
| **0-A** | **Organización** | |
| **0-A.1** | Actualizar `CLAUDE.md`: fuera de `Documentacion/` pasan a estar permitidas las carpetas de código de la sección 2. Registrar SAD-07 en `Documentacion/README.md`. | La regla del proyecto ya no contradice el árbol. |
| **0-A.2** | Crear el árbol de la sección 2 con un `README.md` en cada carpeta: qué va ahí, quién responde y en qué etapa recibe su contenido. Las 14 carpetas de microservicios existen desde ya, solo con su `README.md` (ficha de SAD-03, esquema, imagen y etapa). | Cada carpeta de la sección 2 tiene su `README.md` y sus enlaces a SAD-03, SAD-06 y SAD-07 funcionan. |
| **0-A.3** | Añadir a `README.md` de la raíz cómo está organizado el código, con enlaces a las carpetas. | La portada lleva a cada carpeta de `src/`, `tests/` y `deployments/`. |
| **0-B** | **Configuración** | |
| **0-B.1** | Crear los archivos de la raíz (sección 4) y `.config/dotnet-tools.json`; ampliar `.gitignore` (bin, obj, node_modules, `.env`, `*.private.env.json`). | `make prepare` termina sin errores. |
| **0-B.2** | Crear `.husky/` con los tres hooks activos y `.gitleaks.toml`. | Un commit con un secreto de prueba es rechazado. |
| **0-B.3** | Crear `deployments/configs/oracle/init/` con los usuarios por esquema y `deployments/docker-compose/docker-compose.infrastructure.yaml`. Traducir DAT-02 a Oracle (SAD-05, sección 6.2). Crear el chart de biblioteca `deployments/helm/july-servicio`. | `make infra-up` levanta Oracle, RabbitMQ, Redis y Vault; `helm lint` pasa. |
| **0-B.4** | Crear el `Jenkinsfile` con las etapas 1 a 4 de la sección 8. | La tubería pasa en una solicitud de cambio. |
| **0-B.5** | Añadir a `README.md` de la raíz la sección «Cómo arrancar» con los comandos del `Makefile`. | Una persona nueva arranca el entorno solo con el README. |
| **0-C** | **Base común de código** | |
| **0-C.1** | Crear `src/BuildingBlocks/`, `src/Services/Shared/`, `src/Aspire/` y `src/Contracts/` (vacío salvo el esquema común de errores). | `dotnet build July.slnx` compila. |
| **0-C.2** | Crear `tests/Shared/Tests.Shared/` y `tests/Directory.Build.props`. | `dotnet test` corre (sin pruebas de servicio aún). |
| **1** | Flujo 1: `Ms01` a `Ms05`, cada uno con su host, imagen y chart; `widget-prospecto`; sus pruebas y sus contratos. | E2E del flujo 1 de CU-08 con 5 servicios desplegados por separado. |
| **2** | Flujo 2: `Ms06` a `Ms10`, cada uno desplegable. | E2E del flujo 2. |
| **3** | Flujo 3: `Ms11` a `Ms13`, `Panel.Bff` y `panel-cooperativa`. | E2E del flujo 3. |
| **4** | Transversal: `Ms14` (puede ir en paralelo desde la etapa 1). | Bitácora encadenada verificada en integración. |

`Documentacion/Complementarios/prototipo/` (PRO-01) no se mueve: es un prototipo documental, y sus pruebas sirven de guion para `tests/E2E/`.

### 10.1 Avance de la etapa 0

La organización (0-A) se completó el 2026-11-26. Antes de decidir que la organización iba primero ya se había escrito una primera versión de 0-B y 0-C: queda en el repositorio, compilada y probada, pero **en pausa**. No se amplía ni se da por aprobada hasta que empiece su etapa, y entonces se revisa. Sus versiones de paquetes se fijaron consultando nuget.org el 2026-11-26: .NET 10 (SDK `10.0.100` o superior de la misma versión mayor, paquetes `Microsoft.*` 10.0.15), Aspire 17.0.0, RabbitMQ.Client 7.3.0, `Oracle.EntityFrameworkCore` 10.23.26400, xUnit v3 4.0.3 sobre Microsoft Testing Platform.

| Paso | Estado | Qué quedó | Comprobación |
|---|---|---|---|
| **0-A.1** | Hecho | `CLAUDE.md` permite las carpetas de código de la sección 2 y añade las reglas de código. | — |
| **0-A.2** | Hecho | El árbol de la sección 2 completo, con 41 `README.md`: `src/` (Aspire, Bffs y `Panel.Bff`, BuildingBlocks, Contracts, Services con las 14 carpetas `MsNN.Nombre` y `Shared`, UIs con `panel-cooperativa` y `widget-prospecto`), `tests/` (BuildingBlocks, Services, Contrato, E2E, Evals, Shared), `deployments/` (configs, docker-compose, helm, terraform, wso2), `scripts/` y `_httpclients/`. | Enlaces relativos de los `README.md` revisados. |
| **0-A.3** | Hecho | Sección «Cómo está organizado el código» en el `README.md` de la raíz. | — |
| **0-B.1** | En pausa | `global.json`, `Directory.Build.props`, `Directory.Packages.props`, `nuget.config`, `July.slnx`, `version.json`, `Makefile`, `.editorconfig`, `.csharpierrc.yaml`, `.prettierrc`, `.gitattributes`, `.dockerignore`, `.csharpierignore` (excluye `Documentacion/`), `.vscode/`, `.config/dotnet-tools.json` (las 5 herramientas de la sección 4) y `.gitignore` ampliado. | `dotnet tool restore` y `dotnet restore July.slnx` sin errores ni avisos (SDK 10.0.401). `make prepare` completo no se ha corrido en una máquina del equipo. |
| **0-B.2** | En pausa | `.husky/` con pre-commit (csharpier sobre lo preparado, Gitleaks y, si cambia `Documentacion/Arquitectura/`, `verificar-trazabilidad.py`), pre-push (`make check`) y commit-msg (primera línea de 10 a 72 caracteres). `.gitleaks.toml` con las reglas por omisión más cédula, celular ecuatoriano y llaves de cifrado. Los hooks se instalan con `make prepare`. | Probado en una copia del repositorio: el hook rechaza un `.cs` sin formato y un mensaje de commit corto. La regla de Gitleaks no se probó (sin Gitleaks en el entorno); el `.gitleaks.toml` es TOML válido. |
| **0-B.3** | En pausa; parcial | `deployments/configs/oracle/init/01-usuarios.sh` (usuarios `ms01` a `ms14`, sin `ms03`, y `quartz`, solo con permisos sobre su esquema), `deployments/configs/rabbitmq/` (exchange `july.eventos` y cola de fallidos) y `docker-compose.infrastructure.yaml` (Oracle Free, RabbitMQ, Redis y Vault; WSO2 en el perfil `wso2`). Chart de biblioteca `deployments/helm/july-servicio` (Deployment, Service, NetworkPolicy, HPA, anotaciones de Vault). **Falta traducir DAT-02 a Oracle** (pendiente PO-09). | `docker compose config` válido. `helm lint` del chart de biblioteca y de un chart de servicio de prueba: sin errores. `make infra-up` no se ha ejecutado. |
| **0-B.4** | En pausa | `Jenkinsfile` declarativo con las etapas 1 a 4 de la sección 8 (restauración, comprobaciones, pruebas con cobertura, Gitleaks, Semgrep, Trivy y SonarQube si está configurado). Sin la *shared library* hasta resolver PO-05. | No se ha ejecutado en el Jenkins de la cooperativa. |
| **0-B.5** | En pausa | Los comandos de `make` (`prepare`, `build`, `test`, `check`, `infra-up`, `run`) están escritos; la sección «Cómo arrancar» se añade a la portada al retomar 0-B. Por ahora la portada solo describe la organización (0-A.3). | — |
| **0-C.1** | En pausa | `src/BuildingBlocks/`: `Core` (resultado, error, comandos, consultas, evento de integración), `Persistence.Oracle` (DbContext base por esquema con *outbox* e *inbox*), `Messaging.RabbitMQ` (publicador del *outbox* con confirmación del broker y consumidor idempotente) y `Security` (JWT interno y cifrado AES-GCM por columna con índice ciego HMAC). `July.Services.Shared` con las 16 enumeraciones de CLS-01, los 8 roles, `Configuracion` y los nombres de recursos. `src/Aspire/` con el AppHost (solo infraestructura) y ServiceDefaults. `src/Contracts/` con el esquema común de errores y el sobre común de eventos. | `dotnet build July.slnx` con `TreatWarningsAsErrors` sin errores ni avisos; `dotnet csharpier check .` limpio. El AppHost no se ha ejecutado. |
| **0-C.2** | En pausa | `tests/Directory.Build.props`, `tests/Shared/Tests.Shared/` (fixtures de Oracle, RabbitMQ y Redis con Testcontainers; tokens de prueba de los 8 roles) y `tests/BuildingBlocks/July.BuildingBlocks.UnitTests` (resultado, cifrado, enumeraciones y reglas de dependencia con NetArchTest). | `dotnet test`: 15 pruebas, 15 correctas; las 3 de dependencias corren solas con `--filter-trait "Category=Dependencias"`. |

**Decisiones tomadas en la versión adelantada de 0-B y 0-C** (se revisan al retomar esas etapas):

- **Imagen de Oracle `gvenzl/oracle-free`** en Docker Compose, en Aspire y en Testcontainers, para que los tres entornos usen la misma base. Admite scripts de inicio, que la imagen oficial de Oracle no ejecuta igual. Por eso el AppHost declara Oracle como contenedor y no usa `Aspire.Hosting.Oracle`.
- **Carpetas con `README.md` desde 0-A.** Las carpetas que aún no tienen código (`_httpclients/`, `deployments/terraform/`, `deployments/wso2/`, `src/UIs/`, `src/Bffs/` y los 14 servicios) existen solo con su `README.md`; el `Makefile` y el `Jenkinsfile` no dependen de su contenido.
- **WSO2 en un perfil aparte** de Docker Compose (`make infra-wso2`): sus tres productos pesan más que el resto de la infraestructura junta y solo hacen falta para probar el gateway.
- **`System.Security.Cryptography.Pkcs` fijado en 10.0.15**: `Oracle.EntityFrameworkCore` trae la 8.0.1, que tiene vulnerabilidades conocidas (GHSA-846f-f764-76mx).
- **AppHost con `Microsoft.NET.Sdk`** y los paquetes `Aspire.Hosting.*`: en Aspire 17 el SDK `Aspire.AppHost.Sdk` está obsoleto (ASPIRE012).
- **Un solo exchange `july.eventos` de tipo topic**, con la clave `msNN.nombre-del-evento`; cada consumidor tiene su cola `servicio.clave` y los mensajes que fallan van a `july.fallidos`.

## 11. Decisiones y pendientes

| # | Decisión o pendiente | Detalle | Origen |
|---|---|---|---|
| DO-01 | **Este repositorio pasa a ser el monorrepositorio de July.** | El código convive con `Documentacion/`, como en el manual `docs/` convive con `src/`. Así la trazabilidad paso → método → código → prueba (SAD-06, sección 10) queda en un solo repositorio. | Esta propuesta |
| DO-02 | **Árbol de la raíz según el manual** (`src/`, `tests/`, `deployments/`, `scripts/`) en lugar de `apps/`, `services/`, `packages/`, `db/`, `gateway/` e `infra/` de SAD-06. | Es la forma habitual de un monorrepositorio .NET; la correspondencia está en la sección 3. | REF-04 |
| DO-03 | **Vertical Slice con las reglas hexagonales** dentro de cada servicio. | Sección 5. Modifica DV-02 de SAD-06 sin perder sus reglas de dependencia. | REF-04, SAD-06 |
| DO-04 | **Microservicios desde el inicio, sin monolito modular.** | Sección 6. Cada uno de los 14 microservicios y el BFF es un desplegable propio desde la etapa 1; se comunican solo por red. Reemplaza los 6 desplegables de la fase 1. | Decisión del equipo (2026-11-26) |
| DO-05 | **Sin submódulos, sin esqueletos y sin herramientas sin uso.** | Sección 9. | REF-04 |
| DO-06 | **La organización va antes que la configuración y el código.** | La etapa 0 empieza por el árbol de carpetas con su `README.md` (0-A); la configuración (0-B) y la base común de código (0-C) vienen después (sección 10). | Decisión del equipo (2026-11-26) |
| PO-01 | Aprobar el stack (PV-01 de SAD-06). | Este plan asume SAD-05. Con SAD-04 se cambian los archivos de la raíz y los nombres de proyecto, no el árbol. | SAD-06 |
| PO-02 | Aceptar .NET Aspire para el entorno local. | No está en SAD-05. Alternativa: solo `docker-compose` y `dotnet run` por host. No afecta producción. | Esta propuesta |
| PO-03 | Actualizar SAD-06: sección 7 (árbol), DV-01 y DV-02, para que coincidan con este plan si se aprueba. | Hasta entonces, SAD-06 y SAD-07 describen árboles distintos. | Esta propuesta |
| PO-04 | Migraciones con EF Core o con Liquibase. | Con EF Core van en `Shared/Data/Migrations/` de cada servicio; con Liquibase, en `deployments/configs/oracle/changelog/<esquema>/`. Lo decide el DBA de la cooperativa. | SAD-05, SAD-06 (PV-01) |
| PO-05 | Dónde vive la *shared library* de Jenkins. | Lo habitual es un repositorio propio de la cooperativa; si no existe, una carpeta `ci/jenkins/` en este repositorio. | SAD-05 |
| PO-06 | Feeds internos de NuGet y npm de la cooperativa. | Si existen, se añaden a `nuget.config` y a `.npmrc`. | Equipo de TI de la cooperativa |
| PO-07 | ~~Llevar DO-04 a los documentos que fijaban el monolito modular.~~ **Hecho (2026-11-26).** | SAD-03 v1.2 (D5), SAD-04 v2.1 y SAD-05 v1.1 (K4), SAD-06 v1.1 (secciones 4, 8 y 12, DA-06), SAD-01 v0.4 (DA-06 y secciones 7, 8 y 10), INF-01, INF-02 y la portada `README.md`. | Esta propuesta |
| PO-09 | Traducir DAT-02 a Oracle, un esquema por servicio. | DAT-02 es un solo esquema `july` de PostgreSQL con llaves foráneas entre tablas que en SAD-03 pertenecen a servicios distintos. Hay que repartir sus tablas por servicio (tabla de SAD-03), reemplazar las llaves foráneas entre esquemas por identificadores y eventos, y decidir dónde van las migraciones (PO-04). Bloquea la etapa 1. | Etapa 0 (paso 0-B.3) |
| PO-08 | Redibujar las figuras de despliegue y de componentes. | `4-vista-fisica/imagenes/despliegue-july.png` (figura 14 de SAD-01) aún agrupa los servicios en 6 desplegables y no hay fuente editable en el repositorio; `3-vista-de-desarrollo/imagenes/componentes-july.png` también debe revisarse (PV-06 de SAD-06). | Esta propuesta |
