# Plan de organización del monorrepositorio de July

| Campo | Valor |
|---|---|
| **ID** | SAD-07 |
| **Versión** | 1.0 |
| **Fecha** | 2026-11-26 |
| **Estado** | Borrador |
| **Deriva de** | REF-04 (manual de arquitectura de food-delivery-microservices), SAD-06 (vista de desarrollo, secciones 4, 7, 8, 9 y 12), SAD-05 (stack sobre las tecnologías de la cooperativa), SAD-03 (microservicios y desplegables de la fase 1) |
| **Alimenta a** | SAD-06 (sección 7 y decisión DV-02), `CLAUDE.md` y `README.md` de la raíz, etapa 0 de construcción |

> **Para qué sirve.** Propone cómo convertir este repositorio en el **monorrepositorio de July** tomando como modelo la organización de food-delivery-microservices ([REF-04](../../Complementarios/referencias/Bibliografia/manual-arquitectura-food-delivery-microservices.md)): raíz con el contrato de compilación y de herramientas, `src/` con servicios en Vertical Slice, `tests/` aparte, `deployments/` con la infraestructura y una orquestación local con .NET Aspire. Adapta ese modelo a lo que July ya tiene decidido: 14 microservicios agrupados en 6 desplegables (SAD-03), gateway WSO2, Oracle, Jenkins y el panel en Angular (SAD-05).
>
> **Supuesto.** El plan asume el stack de [SAD-05](stack_tecnologico_PJL.md) (.NET 10), que es el que siguen los informes por rol INF-01 a INF-06 y el que usa el manual de referencia. Si se aprobara SAD-04, la forma del árbol se mantiene y solo cambian los archivos de la raíz (sección 4).
>
> **Lo que no es:** no repite los criterios de partición (SAD-03) ni las capas y reglas de dependencia (SAD-06); los ubica en carpetas. No mueve nada de `Documentacion/`. Todo lo que aquí se nombra es **propuesta** hasta que se apruebe.

## Contenido

1. [Qué se toma del manual y qué no](#1-qué-se-toma-del-manual-y-qué-no)
2. [Árbol propuesto](#2-árbol-propuesto)
3. [Finalidad de cada carpeta](#3-finalidad-de-cada-carpeta)
4. [Archivos de la raíz y contrato de herramientas](#4-archivos-de-la-raíz-y-contrato-de-herramientas)
5. [Interior de un servicio: Vertical Slice con las reglas hexagonales](#5-interior-de-un-servicio-vertical-slice-con-las-reglas-hexagonales)
6. [Seis desplegables hoy, catorce mañana](#6-seis-desplegables-hoy-catorce-mañana)
7. [Pruebas](#7-pruebas)
8. [Integración continua con Jenkins](#8-integración-continua-con-jenkins)
9. [Lecciones del manual convertidas en reglas](#9-lecciones-del-manual-convertidas-en-reglas)
10. [Plan de migración por etapas](#10-plan-de-migración-por-etapas)
11. [Decisiones y pendientes](#11-decisiones-y-pendientes)

## 1. Qué se toma del manual y qué no

| Elemento de food-delivery-microservices | En July | Motivo |
|---|---|---|
| Monorrepositorio .NET 10 con `.slnx`, `global.json`, `Directory.Build.props` y `Directory.Packages.props` | **Se adopta** (`July.slnx`) | Mismo lenguaje que SAD-05; versiones y analizadores fijados en un solo lugar. |
| `src/Services/<Name>/` con `FoodDelivery.Services.X` + `FoodDelivery.Services.X.Api` | **Se adopta, adaptado**: un proyecto de módulo por microservicio; el host `.Api` propio llega en la fase 2 | En la fase 1 hay 6 desplegables, no 14 (sección 6). |
| Vertical Slice: `<Modulo>/Features/<CasoDeUso>/v1/` | **Se adopta** con las reglas de dependencia hexagonales de SAD-06 | Cada paso de CU-08 tiene una carpeta fija (sección 5). |
| `src/Services/Shared/` con contratos de eventos, permisos, roles y constantes | **Se adopta** | Equivale a `packages/dominio` y a los contratos de eventos de SAD-06. |
| `src/Aspire/` (AppHost y ServiceDefaults) | **Se adopta** solo para desarrollo local | Levanta los 6 desplegables, Oracle Free, RabbitMQ y Redis con un comando. Producción sigue en Kubernetes y Helm (SAD-05). |
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
│   ├── helm/                                  un chart por desplegable y valores por entorno
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
│   ├── Hosts/                                 los 6 desplegables de la fase 1 (sección 6)
│   ├── Services/
│   │   ├── Ms01.Canales/
│   │   ├── Ms02.Conversacion/
│   │   ├── …                                  un directorio por microservicio, al empezar su etapa
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
| `src/Aspire/July.AppHost/` | Registra los 6 desplegables, el BFF, Oracle Database Free, RabbitMQ, Redis y Vault en modo desarrollo. Uso: `dotnet run --project src/Aspire/July.AppHost`. | `src/Aspire/FoodDelivery.AppHost/` | Arquitectura |
| `src/Aspire/July.ServiceDefaults/` | OpenTelemetry con `traceparent`, health checks, resiliencia HTTP y registros sin datos personales. Sustituye a `packages/observabilidad` de SAD-06. | `FoodDelivery.ServiceDefaults/` | Arquitectura |
| `src/Bffs/Panel.Bff/` | Une las bandejas de varios servicios, enmascara según el rol y mantiene el canal SignalR. Es lo único que el panel ve detrás del gateway. | `src/Bffs/Spa.Bff/` | Backend |
| `src/BuildingBlocks/` | `July.BuildingBlocks.Core` (comandos, consultas, resultados y errores), `.Persistence.Oracle` (DbContext base y outbox), `.Messaging.RabbitMQ` (publicador del outbox y consumidor idempotente), `.Security` (validación del JWT interno, regla L5, y cifrado por columna con llave en Vault). Sin lógica de negocio. | `src/BuildingBlocks/` (Squirrel) | Arquitectura y Backend |
| `src/Contracts/` | Contratos OpenAPI 3.1 y AsyncAPI 3. El gateway los importa y el panel y el widget generan sus clientes desde ellos (regla L1). | — (en el manual, los contratos de eventos están en `Services/Shared`) | Arquitectura |
| `src/Hosts/` | Proyectos ejecutables de la fase 1: cada uno referencia los módulos de su desplegable (sección 6). | Los `*.Api` de cada servicio | Backend |
| `src/Services/MsNN.Nombre/` | Un microservicio de SAD-03: proyecto de módulo en Vertical Slice (sección 5) y, en la fase 2, su host `.Api`. | `src/Services/<Name>/` | Backend; MS-02 Arquitectura; MS-14 Base de datos |
| `src/Services/Shared/July.Services.Shared/` | Contratos de eventos en C# (un espacio de nombres por servicio publicador), enumeraciones de CLS-01, la clase abstracta `Configuracion`, los 8 roles del panel y los nombres de recursos de Aspire. Solo tipos (regla R-D4). | `src/Services/Shared/` | Backend |
| `src/UIs/panel-cooperativa/` | Panel de la cooperativa (`PanelCooperativa` de CLS-01) en Angular 21. Cliente generado con `openapi-generator` (`typescript-angular`). | `src/UIs/BlazorWebApp/` | Frontend y UI/UX |
| `src/UIs/widget-prospecto/` | Chat incrustable en React 19 con Shadow DOM. | `src/UIs/Spa/react-food-delivery/` | Frontend y UI/UX |
| `tests/` | Pruebas separadas del código de runtime (sección 7). | `tests/` | Cada responsable de su componente |
| `deployments/configs/` | Archivos que montan Compose y Helm: observabilidad, `rabbitmq-plugins`, `oracle/init/` (un usuario por esquema `ms01` a `ms14`, más `quartz` y los permisos mínimos de la regla L2). | `deployments/configs/` | Seguridad y Base de datos |
| `deployments/docker-compose/` | `docker-compose.infrastructure.yaml` (Oracle Free, RabbitMQ, Redis, Vault, WSO2 API Manager, Identity Server y Micro Integrator) y `docker-compose.services.yaml`. Plantillas `.env.sample`, nunca `.env` reales. | `deployments/docker-compose/` | Seguridad |
| `deployments/helm/` | Un chart por desplegable con `values-desarrollo.yaml`, `values-pruebas.yaml` y `values-produccion.yaml` (SAD-06, sección 9). | `deployments/k8s/kustomize/` | Seguridad y Backend |
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

Solo entran herramientas con un uso en el repositorio, todas con `rollForward: false` y la versión fijada en la etapa 0:

| Herramienta | Comando | Dónde se usa |
|---|---|---|
| `csharpier` | `dotnet csharpier` | `make check`, hook pre-commit y la tubería (la misma comprobación en los tres) |
| `husky` | `husky` | `make prepare`; grupos pre-commit, pre-push y commit-msg |
| `dotnet-ef` | `dotnet-ef` | Migraciones de cada módulo (si se elige EF Core, pendiente PO-04) |
| `nbgv` | `nbgv` | `scripts/calculate-version.sh` y la etiqueta de cada imagen |
| `aspire.cli` | `aspire` | `make run` |

No entran Tye, `gitversion.tool`, Swashbuckle CLI, `dotnet-openapi` ni Kiota mientras no haya un script que los use. El cliente del panel se genera con `openapi-generator`, que es una dependencia de npm en `src/UIs/package.json`.

## 5. Interior de un servicio: Vertical Slice con las reglas hexagonales

El manual organiza cada servicio por caso de uso (`Features/<CasoDeUso>/v1/`); SAD-06 (DV-02) lo organiza en capas hexagonales (`dominio/`, `aplicacion/`, `infraestructura/`, `api/`, `eventos/`). Las dos formas son compatibles: el Vertical Slice decide **dónde** está el código (junto al caso de uso) y las reglas hexagonales deciden **de qué** puede depender. Se propone el corte vertical del manual, conservando las reglas de dependencia de SAD-06.

```text
src/Services/Ms06.Solicitud/
└── July.Services.Solicitud/
    ├── SolicitudCredito/                      una carpeta por clase de CLS-01 que posee el servicio
    │   ├── Models/                            SolicitudCredito y sus invariantes          (dominio/)
    │   ├── ValueObjects/                      montos, plazos, factores                    (dominio/)
    │   ├── Features/                          un caso de uso por paso de CU-08           (aplicacion/ + api/)
    │   │   ├── RegistrarDatoSolicitud/v1/     comando, validador, manejador y endpoint
    │   │   ├── ResumirSolicitud/v1/
    │   │   └── GuardarResultadoPrecalificacion/v1/   suscriptor de PrecalificacionEmitida (eventos/)
    │   ├── Contracts/                         puertos: repositorio, cliente de MS-08       (aplicacion/)
    │   ├── Data/                              configuración de EF Core y repositorio Oracle (infraestructura/)
    │   ├── Dtos/v1/                           contratos de la API del módulo
    │   └── Exceptions/                        Application/ y Domain/
    ├── Shared/
    │   ├── Data/                              SolicitudDbContext (esquema ms06), outbox, migraciones
    │   ├── Clients/                           clientes hacia otros servicios (solo puertos de lectura)
    │   └── Extensions/                        AddSolicitudModule() y MapSolicitudEndpoints()
    ├── SolicitudModule.cs                     registro del módulo
    └── readme.md                              qué capacidades y pasos de CU-08 cubre
```

| Carpeta del Vertical Slice | Capa hexagonal de SAD-06 | Puede depender de | No puede depender de |
|---|---|---|---|
| `<Clase>/Models/`, `ValueObjects/` | `dominio/` | `July.Services.Shared` | Ninguna otra carpeta del módulo, EF Core, ASP.NET Core |
| `<Clase>/Features/<Caso>/v1/` (manejador) | `aplicacion/` | `Models/`, `Contracts/` | `Data/`, `Shared/Data/` |
| `<Clase>/Features/<Caso>/v1/` (endpoint o suscriptor) | `api/` y `eventos/` | El manejador de su carpeta | `Data/` |
| `<Clase>/Contracts/` | Puertos de `aplicacion/` | `Models/` | Implementaciones |
| `<Clase>/Data/`, `Shared/Data/`, `Shared/Clients/` | `infraestructura/` | `Contracts/` (los implementa), `Models/` | Endpoints |

Estas reglas, más R-D1 a R-D5 de SAD-06, se comprueban en `tests/Services/<MsNN>/…DependencyTests` con NetArchTest, igual que las `DependencyTests` del manual.

**Nombres.** Se mantienen las convenciones de SAD-06 (sección 7): las clases, los métodos y las tablas conservan los nombres de CLS-01 y DAT-01 (en C#, con la inicial en mayúscula: `RegistrarDato(campo, valor)`); el caso de uso lleva el nombre de SAD-06 (`RegistrarDatoSolicitud`) y el número del paso de CU-08 en su comentario; el esquema de Oracle es el número del servicio (`ms06`). Las carpetas técnicas de primer nivel (`src`, `tests`, `deployments`, `Features`, `Models`) quedan en inglés, como en el manual y en el ecosistema .NET; lo que viene del dominio queda en español.

## 6. Seis desplegables hoy, catorce mañana

En el manual cada servicio tiene su propio host (`FoodDelivery.Services.X.Api`). July empieza como monolito modular con 6 desplegables (D5 de SAD-03, DA-06 de SAD-01), así que el host se separa del módulo:

| Desplegable (fase 1) | Proyecto en `src/Hosts/` | Módulos que referencia |
|---|---|---|
| 1 · Canales | `July.Hosts.Canales` | `Ms01.Canales` |
| 2 · Comprensión del lenguaje | `July.Hosts.Comprension` | `Ms03.Comprension` |
| 3 · Núcleo de captación | `July.Hosts.NucleoCaptacion` | `Ms02.Conversacion`, `Ms04.Prospectos`, `Ms05.Leads`, `Ms06.Solicitud` |
| 4 · Motor financiero | `July.Hosts.MotorFinanciero` | `Ms07.Simulacion`, `Ms08.Catalogo`, `Ms09.Precalificacion` |
| 5 · Gestión comercial | `July.Hosts.GestionComercial` | `Ms10.Agenda`, `Ms11.Entrega`, `Ms12.Asignacion`, `Ms13.Notificaciones` |
| 6 · Auditoría | `July.Hosts.Auditoria` | `Ms14.Auditoria` |

Cada host solo llama a `AddXModule()` y `MapXEndpoints()` de sus módulos. Dentro de un desplegable los módulos se hablan por el puerto de `Contracts/`, con un adaptador en proceso; nunca leen las tablas del otro (SAD-06, sección 4). En la **fase 2** (etapa 5 de SAD-06) cada módulo recibe su propio host `July.Services.X.Api` dentro de su carpeta, el adaptador en proceso se cambia por uno HTTP o de mensajería, y el host agrupado se retira. El código del módulo no cambia.

Cada host tiene su `Dockerfile` (imagen `chiseled` de .NET firmada con Cosign) y su chart en `deployments/helm/`.

## 7. Pruebas

| Carpeta | Qué contiene | Equivalente en el manual |
|---|---|---|
| `tests/Directory.Build.props` | xunit.v3, Microsoft Testing Platform, cobertura | Igual |
| `tests/BuildingBlocks/` | Unitarias del núcleo; integración del outbox con Oracle Free y RabbitMQ | `tests/BuildingBlocks/` |
| `tests/Services/<MsNN>/…UnitTests` | Un caso por paso de CU-08 que recibe el servicio, e invariantes de sus entidades | `*UnitTests` |
| `tests/Services/<MsNN>/…IntegrationTests` | Repositorio, migraciones y outbox con Testcontainers (Oracle Database Free) | `*IntegrationTests` |
| `tests/Services/<MsNN>/…EndToEndTests` | La API del módulo levantada en memoria | `*EndToEndTests` |
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
5. Versión con nbgv; imágenes solo de los desplegables que cambiaron, firmadas con Cosign; charts de Helm.
6. Despliegue en `desarrollo`, publicación de APIs con `apictl`, E2E de CU-08, evals y OWASP ZAP.
7. Paso a `pruebas` y, con aprobación humana, a `produccion`.

La lista de desplegables que construye la tubería sale de `src/Hosts/`: no se puede añadir un desplegable sin que entre en la tubería, ni dejar en la tubería uno que no existe.

## 9. Lecciones del manual convertidas en reglas

| # | Hallazgo en food-delivery-microservices (REF-04) | Regla para July |
|---|---|---|
| L-01 | `src/BuildingBlocks` es un submódulo: un clon normal no compila. | Sin submódulos. Lo compartido vive en el repositorio. |
| L-02 | Once servicios son esqueletos (`Class1.cs` y un `Program.cs` vacío). | Una carpeta de servicio se crea cuando empieza su etapa (sección 10), con su prueba y su contrato. No hay esqueletos. |
| L-03 | El manifiesto `.config` tiene 6 herramientas sin uso. | Cada herramienta del manifiesto tiene un comando en `Makefile`, en un hook o en la tubería; si no, sale. |
| L-04 | Los hooks de Husky existen, pero su invocación está comentada; el README cita un `commit-msg` que no existe. | Los hooks quedan activos y los tres (pre-commit, pre-push, commit-msg) existen desde la etapa 0. |
| L-05 | Formato con csharpier en local y `dotnet format style` en CI. | Una sola comprobación de formato, la misma en local, en el hook y en Jenkins. |
| L-06 | Dos sistemas de versionado (`GitVersion.MsBuild` y nbgv). | Solo nbgv. |
| L-07 | Manifiestos de Kubernetes planos y Kustomize a la vez. | Solo Helm. |
| L-08 | El workspace de VS Code apunta a una ruta local (`d:/OpenSource/…`) y el README dice .NET 9 con .NET 10 en el código. | Sin rutas absolutas en archivos versionados; el `README.md` toma las versiones de `global.json` y `Directory.Packages.props`. |
| L-09 | Un typo en un nombre de archivo (`.env.cutomers.sample`) y en una carpeta (`GettingUerByEmail`). | Los nombres de carpetas de `Features/` se toman de SAD-06 y CLS-01, no se escriben de memoria. |
| L-10 | Orders no tiene carpeta de pruebas y el README promete event sourcing que el código no tiene. | Un servicio no entra a `main` sin pruebas; `readme.md` de cada módulo describe lo que hay, no lo que se planea. |

## 10. Plan de migración por etapas

Las etapas siguen el orden de construcción de SAD-06 (sección 12). La etapa 0 es la que este documento detalla.

| Paso | Qué se hace | Resultado verificable |
|---|---|---|
| **0.1** | Actualizar `CLAUDE.md`: fuera de `Documentacion/` pasan a estar permitidas las carpetas de código de la sección 2. Registrar SAD-07 en `Documentacion/README.md`. | La regla del proyecto ya no contradice el árbol. |
| **0.2** | Crear los archivos de la raíz (sección 4) y `.config/dotnet-tools.json`; ampliar `.gitignore` (bin, obj, node_modules, `.env`, `*.private.env.json`). | `make prepare` termina sin errores. |
| **0.3** | Crear `.husky/` con los tres hooks activos y `.gitleaks.toml`. | Un commit con un secreto de prueba es rechazado. |
| **0.4** | Crear `src/BuildingBlocks/`, `src/Services/Shared/`, `src/Aspire/` y `src/Contracts/` (vacío salvo el esquema común de errores). | `dotnet build July.slnx` compila. |
| **0.5** | Crear `deployments/configs/oracle/init/` con los usuarios por esquema y `deployments/docker-compose/docker-compose.infrastructure.yaml`. Traducir DAT-02 a Oracle (SAD-05, sección 6.2). | `make infra-up` levanta Oracle, RabbitMQ, Redis y Vault. |
| **0.6** | Crear `tests/Shared/Tests.Shared/` y `tests/Directory.Build.props`. | `dotnet test` corre (sin pruebas de servicio aún). |
| **0.7** | Crear el `Jenkinsfile` con las etapas 1 a 4 de la sección 8. | La tubería pasa en una solicitud de cambio. |
| **0.8** | Añadir a `README.md` de la raíz la sección «Cómo arrancar» con los comandos del `Makefile`. | Una persona nueva arranca el entorno solo con el README. |
| **1** | Flujo 1: `Ms01` a `Ms05`, hosts 1, 2 y 3 (parcial), `widget-prospecto`, sus pruebas y sus contratos. | E2E del flujo 1 de CU-08. |
| **2** | Flujo 2: `Ms06` a `Ms10`, hosts 3 y 4. | E2E del flujo 2. |
| **3** | Flujo 3: `Ms11` a `Ms13`, host 5, `Panel.Bff` y `panel-cooperativa`. | E2E del flujo 3. |
| **4** | Transversal: `Ms14` y host 6 (puede ir en paralelo desde la etapa 1). | Bitácora encadenada verificada en integración. |
| **5** | Separación: un host `.Api` por módulo; se retiran los hosts agrupados. | 14 desplegables, mismas pruebas en verde. |

`Documentacion/Complementarios/prototipo/` (PRO-01) no se mueve: es un prototipo documental, y sus pruebas sirven de guion para `tests/E2E/`.

## 11. Decisiones y pendientes

| # | Decisión o pendiente | Detalle | Origen |
|---|---|---|---|
| DO-01 | **Este repositorio pasa a ser el monorrepositorio de July.** | El código convive con `Documentacion/`, como en el manual `docs/` convive con `src/`. Así la trazabilidad paso → método → código → prueba (SAD-06, sección 10) queda en un solo repositorio. | Esta propuesta |
| DO-02 | **Árbol de la raíz según el manual** (`src/`, `tests/`, `deployments/`, `scripts/`) en lugar de `apps/`, `services/`, `packages/`, `db/`, `gateway/` e `infra/` de SAD-06. | Es la forma habitual de un monorrepositorio .NET; la correspondencia está en la sección 3. | REF-04 |
| DO-03 | **Vertical Slice con las reglas hexagonales** dentro de cada servicio. | Sección 5. Modifica DV-02 de SAD-06 sin perder sus reglas de dependencia. | REF-04, SAD-06 |
| DO-04 | **Hosts separados de los módulos** (`src/Hosts/`) en la fase 1. | Sección 6. Permite pasar de 6 a 14 desplegables sin tocar los módulos. | SAD-03 (D5) |
| DO-05 | **Sin submódulos, sin esqueletos y sin herramientas sin uso.** | Sección 9. | REF-04 |
| PO-01 | Aprobar el stack (PV-01 de SAD-06). | Este plan asume SAD-05. Con SAD-04 se cambian los archivos de la raíz y los nombres de proyecto, no el árbol. | SAD-06 |
| PO-02 | Aceptar .NET Aspire para el entorno local. | No está en SAD-05. Alternativa: solo `docker-compose` y `dotnet run` por host. No afecta producción. | Esta propuesta |
| PO-03 | Actualizar SAD-06: sección 7 (árbol), DV-01 y DV-02, para que coincidan con este plan si se aprueba. | Hasta entonces, SAD-06 y SAD-07 describen árboles distintos. | Esta propuesta |
| PO-04 | Migraciones con EF Core o con Liquibase. | Con EF Core van en `Shared/Data/Migrations/` de cada módulo; con Liquibase, en `deployments/configs/oracle/changelog/<esquema>/`. Lo decide el DBA de la cooperativa. | SAD-05, SAD-06 (PV-01) |
| PO-05 | Dónde vive la *shared library* de Jenkins. | Lo habitual es un repositorio propio de la cooperativa; si no existe, una carpeta `ci/jenkins/` en este repositorio. | SAD-05 |
| PO-06 | Feeds internos de NuGet y npm de la cooperativa. | Si existen, se añaden a `nuget.config` y a `.npmrc`. | Equipo de TI de la cooperativa |
