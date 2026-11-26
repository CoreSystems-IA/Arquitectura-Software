# Registro de cambios: del manual de referencia al monorrepositorio de July

| Campo | Valor |
|---|---|
| **ID** | REA-02 |
| **Versión** | 1.0 |
| **Fecha** | 2026-11-26 |
| **Estado** | Borrador |
| **Deriva de** | REF-04, SAD-07 y el historial de cambios de `Documentacion/README.md` |
| **Relacionado con** | REA-01 (guía de carpetas y archivos), SAD-01, SAD-03 a SAD-07, INF-01, INF-02 |

> **Para qué sirve.** Reúne en un solo lugar todo lo que se cambió en el repositorio entre el 2026-11-25 y el 2026-11-26, desde que se convirtió a Markdown el manual de food-delivery-microservices hasta que quedó organizado el monorrepositorio de July. Dice qué se hizo, en qué archivos, cómo se comprobó y qué quedó pendiente.
>
> **Estado en Git.** Nada de esto tiene commit todavía. El último commit es `950f9c3` («Plan de organizacion del repositorio»).

## Contenido

1. [Resumen](#1-resumen)
2. [Cambios por fase](#2-cambios-por-fase)
3. [Archivos tocados](#3-archivos-tocados)
4. [Comprobaciones](#4-comprobaciones)
5. [Incidentes y cómo se resolvieron](#5-incidentes-y-cómo-se-resolvieron)
6. [Pendientes](#6-pendientes)

## 1. Resumen

| # | Fase | Resultado |
|---|---|---|
| 1 | Conversión del manual | REF-03 (PDF) pasa a Markdown como REF-04, con sus tablas, árboles y 3 figuras. |
| 2 | Plan del monorrepositorio | SAD-07 v1.0: cómo convertir este repositorio en el monorrepositorio de July siguiendo REF-04. |
| 3 | Microservicios desde el inicio | SAD-07 v1.1 (decisión DO-04): sin monolito modular; 14 microservicios y el BFF, cada uno desplegable por separado desde la etapa 1. |
| 4 | Propagación de DO-04 | SAD-01, SAD-03, SAD-04, SAD-05, SAD-06, INF-01, INF-02 y la portada dejan de hablar de 6 desplegables en una fase 1. |
| 5 | Primera versión de configuración y código | Raíz de .NET 10, hooks, BuildingBlocks, Shared, Aspire, contratos, Compose, chart de Helm, pruebas y `Jenkinsfile`. Compila sin avisos y pasan 15 pruebas. |
| 6 | Solo organización | La etapa 0 se divide en 0-A (organización), 0-B (configuración) y 0-C (base de código), y la organización va primero (DO-06). El árbol queda completo con 41 `README.md`; lo de la fase 5 queda en pausa. |
| 7 | Planes y realizado | Se crean `Complementarios/planes/` y `Complementarios/realizado/`. SAD-07 y REV-02 se mueven a `planes/`; este documento y REA-01 van a `realizado/`. |

## 2. Cambios por fase

### 2.1 Conversión del manual (REF-03 → REF-04)

- **Nuevo:** `Complementarios/referencias/Bibliografia/manual-arquitectura-food-delivery-microservices.md`, con las figuras en `imagenes/food-delivery-figura-01.png` a `-03.png`.
- **Índice:** filas REF-03 (el PDF, que ya existía) y REF-04.

### 2.2 Plan del monorrepositorio (SAD-07 v1.0)

- **Nuevo:** `plan-organizacion-monorepositorio.md` (hoy en `Complementarios/planes/`).
- Contenido: qué se adopta del manual y qué no; árbol propuesto (`src/`, `tests/`, `deployments/`, `scripts/`); finalidad de cada carpeta; archivos de la raíz y herramientas; servicios en Vertical Slice con las reglas hexagonales de SAD-06; pruebas; Jenkins; lecciones L-01 a L-10; etapas; decisiones DO-01 a DO-05 y pendientes PO-01 a PO-08.

### 2.3 Microservicios desde el inicio (SAD-07 v1.1)

- Se retira `src/Hosts/` y los 6 desplegables agrupados. Cada microservicio tiene su host `.Api`, su imagen, su chart y su esquema de Oracle desde la etapa 1 (sección 6 de SAD-07, con una tabla de costos y cómo se contienen).
- Desaparece la etapa «Separación».

### 2.4 Propagación de DO-04

| Documento | Versión | Qué cambió |
|---|---|---|
| SAD-03 `microservicios-july.md` | 1.2 | D5 pasa a «Microservicios desde el inicio», con enlace a SAD-07. |
| SAD-04 `stack-tecnologico-july.md` | 2.1 | K4, filas de NestJS y redacción «desde el inicio». |
| SAD-05 `stack_tecnologico_PJL.md` | 1.1 | K4, fila de backend (un proyecto y un host por servicio) y orquestación: con 15 desplegables Kubernetes es necesario. |
| SAD-06 `vista-de-desarrollo-july.md` | 1.1 | La tabla de componentes muestra la imagen de cada uno; se quita la tabla de 6 desplegables; artefactos por servicio; sección 12 sin «Separación»; DA-06 y DV-04 reescritas. |
| SAD-01 `documento-arquitectura-software-july.docx` | 0.4 | DA-06, DA-07, sección 7.2 sin la tabla de 6 desplegables, sección 8, principio de microservicios de la sección 10 y fila 0.4 del resumen de cambios. El pie de la figura 14 advierte que la figura aún muestra 6 desplegables. |
| INF-01 `Informe_Arquitecto_Software.docx` | — | Párrafos de hoja de ruta y de monolito modular frente a microservicios. |
| INF-02 `Informe por rol (Viewpoint) - Backend - July.docx` | — | «Despliegue progresivo» pasa a «Microservicios desde el inicio». |
| Portada `README.md` | — | «Monolito modular → microservicios» pasa a «Microservicios por capacidad desde el inicio». |

La copia sin registrar `SAD - Documento de Arquitectura de Software - July v0.3.docx` no se modificó.

### 2.5 Primera versión de configuración y código (hoy etapas 0-B y 0-C, en pausa)

- **Raíz:** `global.json`, `Directory.Build.props`, `Directory.Packages.props`, `nuget.config`, `July.slnx`, `version.json`, `Makefile`, `Jenkinsfile`, `.editorconfig`, `.csharpierrc.yaml`, `.csharpierignore`, `.prettierrc`, `.gitattributes`, `.dockerignore`, `.gitleaks.toml`; `.gitignore` ampliado.
- **Herramientas y hooks:** `.config/dotnet-tools.json` (csharpier 1.4.1, husky 0.9.1, dotnet-ef 10.0.15, nbgv 3.10.94, aspire.cli 17.0.0), `.husky/` (pre-commit, pre-push, commit-msg y `task-runner.json`), `.vscode/` y `scripts/` (versión, secretos, mensaje de commit).
- **Código:** `src/BuildingBlocks/` (Core, Persistence.Oracle, Messaging.RabbitMQ, Security), `src/Services/Shared/July.Services.Shared/`, `src/Aspire/` (AppHost y ServiceDefaults), `src/Contracts/` (errores y sobre de eventos).
- **Pruebas:** `tests/Directory.Build.props`, `tests/Shared/Tests.Shared/` y `tests/BuildingBlocks/July.BuildingBlocks.UnitTests/` (15 pruebas).
- **Infraestructura:** `deployments/configs/oracle/init/01-usuarios.sh`, `deployments/configs/rabbitmq/`, `deployments/docker-compose/` y el chart de biblioteca `deployments/helm/july-servicio/`.
- **Versiones fijadas** consultando nuget.org el 2026-11-26: paquetes `Microsoft.*` en 10.x (SAD-05 fija .NET 10 aunque ya existe .NET 11), Aspire 17.0.0, RabbitMQ.Client 7.3.0, `Oracle.EntityFrameworkCore` 10.23.26400, OpenTelemetry 1.21.0, xUnit v3 4.0.3, Testcontainers 4.17.0.

El detalle de cada archivo está en [REA-01](guia-carpetas-y-archivos-monorepositorio.md).

### 2.6 Solo organización (etapa 0-A)

A pedido del equipo, el trabajo se centra en la organización y la configuración y el código quedan para después:

- **SAD-07 v1.2:** la etapa 0 se divide en 0-A, 0-B y 0-C (sección 10); nueva sección 10.1 con el avance; nueva decisión DO-06 (la organización va primero) y nuevo pendiente PO-09 (traducir DAT-02 a Oracle por esquema). La lección L-02 admite carpetas de servicio con solo su `README.md`, sin proyectos esqueleto.
- **Árbol completo con 41 `README.md`:** `src/` (Aspire, Bffs y `Panel.Bff`, BuildingBlocks, Contracts, Services con `Ms01.Canales` a `Ms14.Auditoria` y `Shared`, UIs con `panel-cooperativa` y `widget-prospecto`), `tests/` (BuildingBlocks, Services, Contrato, E2E, Evals, Shared), `deployments/` (configs, docker-compose, helm, terraform, wso2), `scripts/` y `_httpclients/`. Cada carpeta de microservicio lleva la ficha de SAD-03.
- **`CLAUDE.md`:** permite las carpetas de código fuera de `Documentacion/`, fija que por ahora solo se trabaja la organización y añade las reglas de código. Se corrigió además un error: la sección «Código» había quedado en medio de las reglas de documentación.
- **Portada:** la sección «Cómo arrancar el código» pasa a ser «Organización del monorrepositorio», con una tabla de las carpetas.

### 2.7 Carpetas `planes/` y `realizado/`

- **Regla nueva** (en `CLAUDE.md` y en el índice): todo plan va en `Complementarios/planes/` (prefijo `PLA`) y todo documento sobre lo ya hecho va en `Complementarios/realizado/` (prefijo `REA`).
- **Movidos a `planes/`**, conservando su ID: SAD-07 (`plan-organizacion-monorepositorio.md`, antes en `Arquitectura/3-vista-de-desarrollo/`) y REV-02 (`plan-trazabilidad-flujos-unificados.md`, antes en `Complementarios/revisiones/`). Se reescribieron los enlaces en 50 archivos (los `README.md` del monorrepositorio, la portada, `CLAUDE.md`, el índice, SAD-03, SAD-06, CU-08, REV-01, REV-03 y los dos planes).
- **Nuevos en `realizado/`:** REA-01 (guía de carpetas y archivos) y REA-02 (este registro).

## 3. Archivos tocados

| Tipo | Archivos |
|---|---|
| Documentos nuevos | REF-04 y sus 3 figuras; SAD-07; REA-01; REA-02 |
| Documentos modificados | SAD-01, SAD-03, SAD-04, SAD-05, SAD-06, INF-01, INF-02, CU-08 (enlace a REV-02), REV-01 y REV-03 (enlaces a REV-02), `Documentacion/README.md` |
| Documentos movidos | SAD-07 y REV-02 a `Complementarios/planes/` |
| Raíz | `README.md`, `CLAUDE.md`, `.gitignore` y los archivos nuevos de la sección 2.5 |
| Carpetas nuevas | `.config/`, `.husky/`, `.vscode/`, `scripts/`, `src/`, `tests/`, `deployments/`, `_httpclients/`, `Complementarios/planes/`, `Complementarios/realizado/` |

## 4. Comprobaciones

| Qué | Cómo | Resultado |
|---|---|---|
| Trazabilidad de la documentación | `python3 Documentacion/Complementarios/revisiones/verificar-trazabilidad.py` | V1 a V8 en OK después de cada fase |
| `.docx` modificados | `validate.py` del procesador de Word | SAD-01, INF-01 e INF-02 válidos |
| Compilación | `dotnet build July.slnx` con avisos como errores, en el contenedor del SDK de .NET 10 (10.0.401) | 0 errores, 0 avisos |
| Formato | `dotnet csharpier check .` | Limpio (50 archivos) |
| Pruebas | `dotnet test --solution July.slnx` | 15 de 15 correctas; las 3 de dependencias corren solas con `--filter-trait "Category=Dependencias"` |
| Hooks | Probados en una copia del repositorio | Rechazan un `.cs` sin formato y un mensaje de commit corto |
| Chart de Helm | `helm lint` y `helm template` con un chart de servicio de prueba | Sin errores; genera Deployment, Service, ServiceAccount, NetworkPolicy y HPA |
| Docker Compose | `docker compose config` | Válido |
| Enlaces de los `README.md` | Script que resuelve cada enlace relativo y cada ancla | 175 enlaces, ninguno roto |

**No comprobado:** el AppHost de Aspire, `make infra-up`, la regla de Gitleaks con un secreto real y el `Jenkinsfile` en el Jenkins de la cooperativa.

## 5. Incidentes y cómo se resolvieron

| Incidente | Causa | Solución |
|---|---|---|
| La exportación XML de Archi (`mapa-capacidades-y-casos-de-uso-etapa3.xml`) apareció modificada. | csharpier 1.x también formatea XML y se ejecutó sobre todo el repositorio. | Se restauró desde el último commit y se añadió `.csharpierignore` que excluye `Documentacion/` y `Assets/`. |
| Error NU1009 al restaurar el AppHost. | El SDK de Aspire define implícitamente `Aspire.Hosting.AppHost` y choca con la gestión central de paquetes. | El AppHost pasó a `Microsoft.NET.Sdk` con referencias explícitas (además, en Aspire 17 ese SDK está obsoleto: ASPIRE012). |
| Aviso de vulnerabilidad en `System.Security.Cryptography.Pkcs` 8.0.1. | Dependencia transitiva de `Oracle.ManagedDataAccess`. | Se fijó la 10.0.15 en `Directory.Packages.props`. |
| Constructores obsoletos de Testcontainers y reglas de StyleCop pensadas para inglés. | Versiones recientes de los paquetes. | Constructores con la imagen como parámetro; reglas de documentación de StyleCop desactivadas en `.editorconfig`. |
| La sección «Código» de `CLAUDE.md` quedó en medio de las reglas de documentación. | Error de edición. | Se movió al final del archivo. |

## 6. Pendientes

| # | Pendiente | Dónde |
|---|---|---|
| PO-01 | Aprobar el stack (SAD-05). | SAD-07 |
| PO-02 | Aceptar .NET Aspire para el entorno local. | SAD-07 |
| PO-03 | Alinear la sección 7, DV-01 y DV-02 de SAD-06 con el árbol de SAD-07. | SAD-07 |
| PO-08 | Redibujar las figuras de despliegue y de componentes (aún muestran 6 desplegables). | SAD-07 |
| PO-09 | Traducir DAT-02 a Oracle, un esquema por servicio. Bloquea la etapa 1. | SAD-07 |
| — | Retomar las etapas 0-B y 0-C: revisar la versión en pausa antes de ampliarla. | SAD-07, sección 10.1 |
| — | Instalar los hooks (`make prepare`) solo cuando el equipo tenga .NET 10 y Gitleaks: después, cada commit los necesita. | REA-01, sección 3 |
| — | Decidir qué hacer con la copia sin registrar `SAD - Documento de Arquitectura de Software - July v0.3.docx`. | `Complementarios/arquitectura/` |
| — | Hacer commit de todo lo anterior. | — |
