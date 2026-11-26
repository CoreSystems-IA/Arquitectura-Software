# Guía de carpetas y archivos del monorrepositorio de July

| Campo | Valor |
|---|---|
| **ID** | REA-01 |
| **Versión** | 1.0 |
| **Fecha** | 2026-11-26 |
| **Estado** | Borrador |
| **Deriva de** | SAD-07 (plan de organización del monorrepositorio), SAD-03 (microservicios), SAD-06 (vista de desarrollo), SAD-05 (stack de la cooperativa), CLS-01 (diccionario de datos) |
| **Relacionado con** | REA-02 (registro de cambios), `README.md` de cada carpeta |

> **Para qué sirve.** Explica, carpeta por carpeta y archivo por archivo, qué hay fuera de `Documentacion/`: **qué hace** cada cosa, **por qué existe** y **qué función cumple en July**, el asistente conversacional que atiende a los prospectos de crédito de la Cooperativa Padre Julián Lorente por WhatsApp y por el widget web.
>
> **Estado del código.** El monorrepositorio va por la **etapa 0-A (organización)** de [SAD-07](../planes/plan-organizacion-monorepositorio.md#10-plan-de-migración-por-etapas). Las carpetas marcadas *(solo organización)* tienen únicamente su `README.md`. Los archivos de configuración (etapa 0-B) y de código común (etapa 0-C) son una primera versión que compila y pasa sus pruebas, pero está **en pausa** hasta que se retomen esas etapas. Ningún microservicio tiene código todavía.

## Contenido

1. [Cómo se conectan las piezas en July](#1-cómo-se-conectan-las-piezas-en-july)
2. [Raíz del repositorio](#2-raíz-del-repositorio)
3. [Herramientas y hooks: `.config/`, `.husky/`, `.vscode/`, `scripts/`](#3-herramientas-y-hooks-config-husky-vscode-scripts)
4. [`src/`: el código de July](#4-src-el-código-de-july)
5. [`tests/`: las pruebas](#5-tests-las-pruebas)
6. [`deployments/`: la infraestructura](#6-deployments-la-infraestructura)
7. [`_httpclients/`](#7-_httpclients)
8. [Los `README.md` de cada carpeta](#8-los-readmemd-de-cada-carpeta)

## 1. Cómo se conectan las piezas en July

Un mensaje del prospecto recorre el monorrepositorio así:

1. Llega por WhatsApp o por el widget (`src/UIs/widget-prospecto/`) y entra por el gateway WSO2 (`deployments/wso2/`).
2. Lo recibe **MS-01 Canales** (`src/Services/Ms01.Canales/`) y lo pasa a **MS-02 Conversación**, el orquestador.
3. MS-02 pide a **MS-03** que entienda el texto y llama a los demás servicios según el paso de CU-08: prospecto (MS-04), lead (MS-05), solicitud (MS-06), simulación (MS-07), catálogo (MS-08), precalificación (MS-09) y cita (MS-10).
4. Desde la precalificación, los servicios se avisan por **eventos en RabbitMQ**: MS-11 entrega la oportunidad al CRM, MS-12 asigna el asesor, MS-13 envía los avisos y MS-14 guarda la bitácora.
5. Los colaboradores de la cooperativa ven y gestionan todo en el panel (`src/UIs/panel-cooperativa/`), a través del BFF (`src/Bffs/Panel.Bff/`).

Lo común a todos los servicios (errores, eventos, base de datos, mensajería, seguridad, telemetría) vive una sola vez en `src/BuildingBlocks/`, `src/Services/Shared/` y `src/Aspire/July.ServiceDefaults/`. Lo que fija cómo se compila, se prueba y se despliega vive en la raíz, en `tests/` y en `deployments/`.

## 2. Raíz del repositorio

| Carpeta o archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `Documentacion/` | Guarda toda la documentación de arquitectura (vistas 4+1) y el material de apoyo. | Es la fuente de la que sale el código: casos de uso, clases, datos, microservicios. | Define qué hace July paso a paso (CU-08) y con qué datos; el código conserva sus nombres. |
| `Assets/` | Imágenes de la portada. | La portada las enlaza. | Ninguna en ejecución. |
| `README.md` | Portada del repositorio: equipo, reto, avance y organización del monorrepositorio. | Es lo primero que ve quien abre el repositorio. | Explica qué es July y dónde está cada parte. |
| `CLAUDE.md` | Reglas del proyecto para el asistente de código: dónde va cada documento y cada carpeta de código. | Mantiene el orden del repositorio entre sesiones de trabajo. | Ninguna en ejecución; protege la trazabilidad. |
| `.gitignore` | Lista lo que Git no versiona: compilados (`bin/`, `obj/`), `node_modules/`, `.env` y secretos locales. | Evita subir binarios y claves. | Impide que credenciales de prueba de WhatsApp, Oracle o Vault lleguen al repositorio. |
| `.gitattributes` | Fija finales de línea LF y marca como binarios los `.png`, `.docx` y `.pdf`. | Que Windows y Linux no generen diferencias falsas. | Ninguna en ejecución. |
| `.editorconfig` | Estilo del código (sangría, nombres, avisos de los analizadores StyleCop y Roslynator). | Un solo estilo para todo el equipo y todos los editores. | Código de los 14 servicios con la misma forma. |
| `.csharpierrc.yaml` | Configura csharpier, el formateador de C# y XML (ancho 120, sangría 4; 2 en proyectos). | Lección L-05: el mismo formato en local, en el hook y en Jenkins. | Ninguna en ejecución. |
| `.csharpierignore` | Excluye `Documentacion/` y `Assets/` del formateador. | csharpier reformateó por error la exportación XML de Archi; esto lo impide. | Protege los modelos de la documentación. |
| `.prettierrc` | Formato de TypeScript, HTML y estilos. | Para el panel y el widget, cuando existan. | Panel y widget con el mismo estilo. |
| `.dockerignore` | Lo que no entra al construir una imagen (documentación, pruebas, `bin/`, `.env`). | Imágenes pequeñas y sin secretos. | Las 15 imágenes de los servicios solo llevan su código. |
| `.gitleaks.toml` | Reglas de Gitleaks: secretos comunes más cédula ecuatoriana, celular ecuatoriano y llaves de cifrado. | Ningún dato personal de un prospecto ni ninguna llave debe llegar al repositorio. | Protege los datos que July pide al prospecto (cédula, teléfono). |
| `global.json` | Fija el SDK de .NET 10 y el ejecutor de pruebas Microsoft Testing Platform. | Todos compilan con la misma versión (SAD-05). | Los servicios de July se compilan igual en cualquier máquina. |
| `Directory.Build.props` | Propiedades comunes a todos los proyectos: `net10.0`, nulabilidad, analizadores, versionado con nbgv, avisos como errores en Jenkins. | Que ningún `.csproj` repita configuración. | Calidad uniforme en los 15 desplegables. |
| `Directory.Packages.props` | Versiones de todos los paquetes NuGet, en un solo lugar. | Gestión central: no hay dos versiones del mismo paquete. Fija `System.Security.Cryptography.Pkcs` 10.0.15 para evitar una vulnerabilidad conocida. | Mismas librerías de Oracle, RabbitMQ, OpenTelemetry y pruebas en todos los servicios. |
| `nuget.config` | Origen de los paquetes: solo nuget.org (y el feed interno de la cooperativa cuando exista, PO-06). | Restauración predecible y segura. | Ninguna en ejecución. |
| `July.slnx` | Solución de .NET con todos los proyectos de `src/` y `tests/`, en carpetas iguales al árbol. | Abrir y compilar todo con un solo archivo. | Agrupa los servicios de July; cada servicio nuevo se añade aquí. |
| `version.json` | Esquema de versión de nbgv (`0.1-preview.{height}`); ignora los cambios de documentación. | Lección L-06: un solo sistema de versionado. | Etiqueta de cada imagen desplegada de July. |
| `Makefile` | Punto de entrada único: `prepare`, `build`, `test`, `check`, `format`, `trazabilidad`, `run`, `infra-up`, `infra-wso2`, `infra-down`, `helm-lint`, `version`. | Que nadie tenga que recordar comandos largos. | Levanta el entorno local de July y corre sus comprobaciones. |
| `Jenkinsfile` | Tubería de Jenkins: restauración, formato, compilación estricta, trazabilidad, pruebas con cobertura, Gitleaks, Semgrep, Trivy y SonarQube. | SAD-05 fija Jenkins; reemplaza a GitHub Actions del manual. | Ningún cambio llega a los entornos de July sin pasar estas comprobaciones. |

## 3. Herramientas y hooks: `.config/`, `.husky/`, `.vscode/`, `scripts/`

| Archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `.config/dotnet-tools.json` | Fija las 5 herramientas locales de .NET: csharpier, husky, dotnet-ef, nbgv y aspire. | Lección L-03: solo herramientas que se usan, con versión fija. | Formato, hooks, migraciones de Oracle, versión y entorno local. |
| `.husky/task-runner.json` | Define las tareas de los hooks: formato de C#, secretos y trazabilidad antes del commit; `make check` antes del push; mensaje de commit. | Lección L-04: hooks activos de verdad. | Detecta antes del commit un dato personal o una cadena de trazabilidad rota. |
| `.husky/pre-commit` | Hook de Git que ejecuta el grupo `pre-commit`. | Lo llama Git en cada commit, después de `make prepare`. | — |
| `.husky/pre-push` | Hook de Git que ejecuta el grupo `pre-push` (`make check`). | Lo mismo que revisará Jenkins, antes de subir. | — |
| `.husky/commit-msg` | Hook de Git que revisa el mensaje de commit. | Historial legible. | — |
| `.vscode/extensions.json` | Extensiones recomendadas de VS Code (C#, csharpier, Prettier, REST Client, YAML, Kubernetes). | Entorno igual para todo el equipo, sin rutas locales (lección L-08). | — |
| `.vscode/settings.json` | Formato al guardar con csharpier, solución por omisión `July.slnx`, finales LF. | Que el editor aplique el mismo formato que el hook. | — |
| `scripts/calculate-version.sh` | Devuelve la versión calculada por nbgv. | Jenkins la usa como etiqueta de imagen. | Identifica qué versión de cada servicio de July está desplegada. |
| `scripts/verificar-secretos.sh` | Corre Gitleaks sobre lo preparado para el commit. | Lo usa el hook pre-commit. | Evita que una cédula o un teléfono de prueba se versionen. |
| `scripts/verificar-mensaje-commit.sh` | Exige primera línea de 10 a 72 caracteres, sin punto final, y línea en blanco antes del cuerpo. | Lo usa el hook commit-msg. | — |

## 4. `src/`: el código de July

### 4.1 `src/Services/`: los 14 microservicios *(solo organización)*

Cada carpeta es un microservicio de [SAD-03](../../Arquitectura/3-vista-de-desarrollo/microservicios-july.md) y un desplegable propio: su host `.Api`, su imagen, su chart de Helm y su esquema de Oracle (SAD-07, sección 6). Por ahora solo tiene su `README.md` con la ficha del servicio; el código se crea en su etapa.

| Carpeta | Qué hará | Por qué es un servicio aparte | Función en July | Etapa |
|---|---|---|---|---|
| `Ms01.Canales/` | Recibe los mensajes de WhatsApp y del widget, verifica la firma y descarta duplicados. | Cada sistema externo entra por un solo servicio (criterio C4). | La puerta de entrada de toda conversación con el prospecto. | 1 |
| `Ms02.Conversacion/` | Orquesta la conversación: decide el siguiente paso de CU-08 y usa los guiones y plantillas. | Alguien debe hacer de control «Atender mensaje» (ROB-01). | El «cerebro» del diálogo de July. | 1 |
| `Ms03.Comprension/` | Detecta la intención y extrae valores (monto, plazo, cédula) del texto, por el AI Gateway. | Otra escala y otro costo (tokens); aísla al proveedor de LLM. | Que July entienda lo que escribe el prospecto. | 1 |
| `Ms04.Prospectos/` | Registra al prospecto y su consentimiento, con datos cifrados; consulta el sistema core. | `Prospecto` necesita un solo escritor y protección LOPDP. | Identifica a quién atiende July y si ya es socio. | 1 |
| `Ms05.Leads/` | Crea el lead y es el único que cambia su estado. | `Lead` lo tocan 10 capacidades; un solo escritor evita estados distintos. | Lleva el embudo: de NUEVO a DESEMBOLSADO o PERDIDO. | 1 |
| `Ms06.Solicitud/` | Guarda lo que declara el prospecto (ingresos, monto, plazo, destino) y lo valida. | Dato propio del perfilamiento, con un solo escritor. | Arma la solicitud de crédito durante la conversación. | 2 |
| `Ms07.Simulacion/` | Calcula cuota, tabla de amortización y comparaciones. | Cálculo determinista, distinto del catálogo. | Responde «¿cuánto pagaría?». | 2 |
| `Ms08.Catalogo/` | Publica las líneas de crédito versionadas (tasas, plazos, montos, requisitos). | Otro dueño (Área de productos) y otro ritmo de cambio. | Da a July las condiciones vigentes de cada crédito. | 2 |
| `Ms09.Precalificacion/` | Evalúa las reglas y emite APTO, A_REVISAR o NO_APTO, con explicación. | Reglas versionadas con dueño propio; el resultado debe poder explicarse (LOPDP). | Dice al prospecto si puede seguir y qué le falta. | 2 |
| `Ms10.Agenda/` | Reserva, confirma y reprograma la cita en la agencia. | La cita tiene su propio ciclo de vida. | Lleva al prospecto a la agencia. | 2 |
| `Ms11.Entrega/` | Arma la ficha del lead, calcula su prioridad y la sincroniza con el CRM. | Única entrada al CRM. | Entrega la oportunidad al equipo comercial. | 3 |
| `Ms12.Asignacion/` | Elige el asesor y vigila los plazos de seguimiento. | Dueño de las reglas de enrutamiento y de los temporizadores. | Que cada lead tenga un asesor y no se enfríe. | 3 |
| `Ms13.Notificaciones/` | Envía los avisos internos a asesores, agencias y jefe comercial. | Transversal, con registro de envíos propio. | Avisa a las personas de la cooperativa. | 3 |
| `Ms14.Auditoria/` | Guarda una bitácora de solo inserción, encadenada, con todos los eventos. | Transversal; cierra las brechas B-03 y B-04 de LIN-01. | Demuestra qué hizo July y cuándo (auditoría y LOPDP). | 4 |

### 4.2 `src/Services/Shared/July.Services.Shared/`: tipos compartidos *(en pausa, 0-C)*

| Archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `July.Services.Shared.csproj` | Proyecto de la biblioteca; solo depende de `July.BuildingBlocks.Core`. | Regla R-D4: lo compartido entre servicios son solo tipos. | — |
| `Enumeraciones/EnumeracionesCls01.cs` | Las 16 enumeraciones de CLS-01 (`TipoCanal`, `EstadoLead`, `ResultadoPrecalificacion`, `RolColaborador`…), con el valor original de CLS-01 en cada miembro. | Que los 14 servicios usen los mismos valores que el diccionario y la base. | Los estados de la conversación, del lead, de la solicitud y de la cita son los mismos en todo July. |
| `Enumeraciones/ValorClsAttribute.cs` | Atributo que guarda el texto de CLS-01 (por ejemplo `EN_CAPTURA`) en cada miembro. | C# usa `EnCaptura`; la base y los eventos usan `EN_CAPTURA`. | Los valores en eventos y tablas coinciden con DAT-02. |
| `Enumeraciones/ValorCls.cs` | Convierte entre el miembro de C# y su texto de CLS-01. | Serializar y leer sin escribir los textos a mano (lección L-09). | — |
| `Dominio/Configuracion.cs` | Clase abstracta `Configuracion` de CLS-01: versión, vigente y quién la publicó. | Base de líneas de crédito, plantillas y reglas, que publica un colaborador. | Lo que la cooperativa configura en el panel y July solo lee. |
| `Seguridad/RolesPanel.cs` | Los 8 roles del panel como texto, sacados de `RolColaborador`. | El rol del token y el de la base deben ser el mismo texto. | Quién puede ver o cambiar qué en el panel (marketing, comité, asesor…). |
| `Recursos/NombresRecursos.cs` | Nombres de Oracle, RabbitMQ, Redis, los 13 esquemas más `quartz` y las 15 imágenes. | Un solo lugar para nombres que usan Aspire, Helm y los servicios. | Cada servicio de July encuentra su base y su cola por el mismo nombre. |

### 4.3 `src/BuildingBlocks/`: bibliotecas técnicas *(en pausa, 0-C)*

Sin lógica de negocio y sin submódulo de Git (lección L-01). Las usan todos los servicios.

| Archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `July.BuildingBlocks.Core/July.BuildingBlocks.Core.csproj` | Proyecto sin dependencias externas. | El núcleo no debe depender de infraestructura (lo comprueba una prueba). | — |
| `Core/Results/Error.cs` | Error de un caso de uso con código estable (`MS06.MONTO_FUERA_DE_RANGO`) y tipo que decide el estado HTTP. | Devolver errores de negocio sin lanzar excepciones. | Cuando el prospecto da un monto fuera de rango, July recibe un error claro y reformula la pregunta. |
| `Core/Results/Result.cs` | Resultado exitoso con valor o fallido con error. | Forma única de responder de todos los casos de uso. | Cada paso de CU-08 devuelve éxito o error de la misma manera. |
| `Core/Cqrs/Abstracciones.cs` | Interfaces de comando, consulta y sus manejadores. | Separar lo que escribe de lo que solo lee. | Cada paso de CU-08 que cambia algo es un comando; cada consulta, una lectura. |
| `Core/Messaging/IntegrationEvent.cs` | Forma de un evento entre servicios (id, fecha, `traceparent`, clave de enrutamiento) y la interfaz para publicarlo. | Eventos iguales en todos los servicios. | Eventos como `LeadPrecalificado` llevan su traza hasta MS-14. |
| `July.BuildingBlocks.Persistence.Oracle/…csproj` | Proyecto con EF Core y el proveedor de Oracle. | SAD-05: Oracle con un esquema por servicio. | — |
| `Persistence.Oracle/JulyDbContext.cs` | Contexto base: fija el esquema del servicio y añade las tablas `OUTBOX` e `INBOX`; guarda eventos y marca procesados. | El evento y el cambio de estado se guardan en la misma transacción. | Si MS-09 precalifica, el aviso a MS-11 no se pierde aunque RabbitMQ esté caído. |
| `Persistence.Oracle/Outbox/OutboxMessage.cs` | Fila de un evento pendiente de publicar. | Patrón *outbox*. | — |
| `Persistence.Oracle/Inbox/InboxMessage.cs` | Fila de un evento ya procesado por un consumidor. | Consumo idempotente. | Un aviso repetido no asigna dos asesores ni envía dos notificaciones. |
| `Persistence.Oracle/DependencyInjection.cs` | Registra el contexto de un servicio contra su cadena de conexión (`ConnectionStrings:ms06`). | Un solo modo de conectar a Oracle. | Cada servicio entra solo a su esquema (regla L2). |
| `July.BuildingBlocks.Messaging.RabbitMQ/…csproj` | Proyecto con `RabbitMQ.Client`. | SAD-05 fija RabbitMQ.Client (sin Wolverine). | — |
| `Messaging.RabbitMQ/OpcionesRabbitMq.cs` | Configuración: exchange `july.eventos`, servicio, intervalo, lote y reintentos. | Valores ajustables por entorno. | — |
| `Messaging.RabbitMQ/ConexionRabbitMq.cs` | Una conexión por proceso, con recuperación automática; abre canales. | No abrir una conexión por mensaje. | — |
| `Messaging.RabbitMQ/OutboxDispatcher.cs` | Proceso en segundo plano que publica el *outbox* en orden, con confirmación del broker. | Llevar los eventos guardados hasta RabbitMQ. | Lleva `LeadPrecalificado`, `LeadSincronizado`, etc., a quien los espera. |
| `Messaging.RabbitMQ/IdempotentConsumer.cs` | Base para consumir un evento: declara la cola, procesa una vez y manda a fallidos lo que no se puede procesar. | Todos los consumidores siguen el mismo patrón. | MS-11, MS-12, MS-13 y MS-14 reaccionan a los eventos sin duplicar efectos. |
| `Messaging.RabbitMQ/Registros.cs` | Mensajes de registro de la mensajería, sin el contenido del evento. | Los registros nunca llevan datos personales. | — |
| `Messaging.RabbitMQ/DependencyInjection.cs` | Registra la conexión y el publicador del *outbox*. | — | — |
| `July.BuildingBlocks.Security/…csproj` | Proyecto con ASP.NET Core y JwtBearer. | — | — |
| `Security/Jwt/OpcionesJwtInterno.cs` | Configuración del JWT interno: autoridad (WSO2 Identity Server) y audiencia. | Regla L5: ningún servicio acepta llamadas sin token del gateway. | Solo el gateway y los servicios de July pueden llamar a un servicio. |
| `Security/Jwt/ClaimsJuly.cs` | Nombres de los claims de rol, agencia y servicio. | Un solo lugar para esos nombres. | El panel muestra a cada colaborador solo lo de su rol y su agencia. |
| `Security/Jwt/DependencyInjection.cs` | Valida firma, emisor, audiencia y vigencia del token. | — | — |
| `Security/Cifrado/IProveedorLlaves.cs` | Interfaz que entrega las llaves de cifrado (de Vault en Kubernetes). | Cambiar el origen de las llaves sin tocar el cifrado. | — |
| `Security/Cifrado/CifradorColumna.cs` | Cifra con AES-GCM los datos de identidad y calcula un índice ciego HMAC para buscarlos. | DAT-02 guarda cédula y teléfono cifrados (SAD-02, LOPDP). | La cédula del prospecto no queda legible en la base, pero July puede encontrarlo por ella. |
| `Security/Cifrado/ProveedorLlavesConfiguracion.cs` | Lee las llaves de la configuración (desarrollo, o la que llena el agente de Vault). | Permite rotar llaves por versión. | — |

### 4.4 `src/Aspire/`: entorno local *(en pausa, 0-C)*

| Archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `July.AppHost/July.AppHost.csproj` | Proyecto del orquestador local con Aspire 17. | Con 15 procesos, arrancarlos a mano no es viable (PO-02). | — |
| `July.AppHost/AppHost.cs` | Levanta Oracle Free (con los usuarios por esquema), RabbitMQ (con el exchange de eventos), Redis y Vault; los servicios se añaden en su etapa. | Un comando para tener todo July en una máquina. | Permite probar una conversación completa en local. |
| `July.AppHost/appsettings.json` | Niveles de registro del orquestador. | — | — |
| `July.AppHost/Properties/launchSettings.json` | Puertos del panel de Aspire en local. | — | — |
| `July.ServiceDefaults/July.ServiceDefaults.csproj` | Proyecto con OpenTelemetry, descubrimiento de servicios y resiliencia. | Arranque común de los 15 hosts. | — |
| `July.ServiceDefaults/Extensions.cs` | Telemetría (trazas, métricas, registros), sondas `/health` y `/alive`, reintentos y cortocircuito en llamadas HTTP. | Que cada `Program.cs` quede en pocas líneas. | Se puede seguir una conversación de punta a punta entre servicios, y una falla de un servicio no tumba a los demás. |

### 4.5 `src/Contracts/`: contratos *(en pausa, 0-C)*

| Archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `openapi/comun/errores.yaml` | Esquema común de errores (problem+json) que referencian todas las APIs. | Regla L1: el gateway y los clientes se generan desde los contratos. | El panel y el widget muestran los errores de cualquier servicio igual. |
| `asyncapi/comun/evento.yaml` | Sobre común de los eventos (id, fecha, `traceparent`) y el exchange `july.eventos`. | Documenta lo que viaja por RabbitMQ. | Cada evento de July tiene la misma forma en el cable. |

### 4.6 `src/Bffs/` y `src/UIs/` *(solo organización)*

| Carpeta | Qué hará | Por qué existe | Función en July | Etapa |
|---|---|---|---|---|
| `Bffs/Panel.Bff/` | Une las bandejas de varios servicios, enmascara datos según el rol y mantiene SignalR. | El panel no debe llamar a 14 servicios ni ver datos de más. | El panel de la cooperativa en tiempo real. | 3 |
| `UIs/widget-prospecto/` | Chat incrustable en React 19 con Shadow DOM. | El sitio web de la cooperativa necesita su canal de chat. | Es July en la web. | 1 |
| `UIs/panel-cooperativa/` | Panel en Angular 21 para los 8 roles. | Los colaboradores configuran y gestionan lo que July hace. | Catálogo, reglas, plantillas, bandejas de leads y seguimiento. | 3 |

## 5. `tests/`: las pruebas

| Carpeta o archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `Directory.Build.props` | Convierte en ejecutables de prueba los proyectos que terminan en `Tests`, con xUnit v3, cobertura y AwesomeAssertions. | No repetir esa configuración en cada proyecto. | — |
| `BuildingBlocks/July.BuildingBlocks.UnitTests/…csproj` | Proyecto de pruebas de las bibliotecas comunes. *(en pausa, 0-C)* | Lección L-10: nada entra sin pruebas. | — |
| `…UnitTests/Core/ResultTests.cs` | 4 pruebas del resultado y del error. | — | Garantiza que un error de negocio nunca se lea como éxito. |
| `…UnitTests/Security/CifradorColumnaTests.cs` | 5 pruebas: cifrar y descifrar, cifrado distinto cada vez, rotación de llave, alteración detectada e índice ciego. | El cifrado de datos personales no puede fallar en silencio. | Protege la cédula y el teléfono del prospecto. |
| `…UnitTests/Shared/EnumeracionesTests.cs` | 3 pruebas: valores de CLS-01, los 8 roles, cada miembro con su valor. | Detecta si alguien cambia una enumeración sin su valor. | — |
| `…UnitTests/Dependencias/DependenciasTests.cs` | 3 reglas de dependencia con NetArchTest (categoría `Dependencias`). | Lo compartido no puede depender de infraestructura ni de un servicio (R-D4). | Mantiene independientes los 14 servicios. |
| `Shared/Tests.Shared/Tests.Shared.csproj` | Biblioteca de apoyo a las pruebas. *(en pausa, 0-C)* | — | — |
| `Shared/Tests.Shared/Fixtures/OracleFixture.cs` | Oracle Free en un contenedor para pruebas de integración. | Probar contra la misma base que producción. | — |
| `Shared/Tests.Shared/Fixtures/RabbitMqFixture.cs` | RabbitMQ en un contenedor. | Probar el *outbox* y los consumidores. | — |
| `Shared/Tests.Shared/Fixtures/RedisFixture.cs` | Redis en un contenedor. | Estado de la conversación de MS-02. | — |
| `Shared/Tests.Shared/Seguridad/TokensPrueba.cs` | Emite JWT de prueba para cualquiera de los 8 roles. | Probar permisos sin el Identity Server real. | Verifica que un asesor no vea lo que solo ve el comité. |
| `Services/`, `Contrato/`, `E2E/`, `Evals/` | *(solo organización)* Pruebas por servicio, de contrato (PactNet), de punta a punta de los flujos de CU-08 (Playwright) y evaluaciones del modelo de lenguaje. | SAD-07, sección 7. | Demuestran que July cumple cada paso de CU-08 y resiste *prompt injection*. |

## 6. `deployments/`: la infraestructura

| Carpeta o archivo | Qué hace | Por qué existe | Función en July |
|---|---|---|---|
| `configs/oracle/init/01-usuarios.sh` | Crea en Oracle un usuario por esquema (`ms01` a `ms14`, sin `ms03`, y `quartz`), cada uno con permisos solo sobre lo suyo. *(en pausa, 0-B)* | Regla L2: ningún servicio lee las tablas de otro. | Aísla los datos del prospecto, del lead y de la bitácora. |
| `configs/rabbitmq/definitions.json` | Exchange `july.eventos`, exchange y cola `july.fallidos`, y la política que envía ahí los mensajes que fallan. | Que ningún evento fallido se pierda. | Un aviso de precalificación que falla queda guardado para revisarlo. |
| `configs/rabbitmq/rabbitmq.conf` | Hace que RabbitMQ cargue esas definiciones al arrancar. | — | — |
| `docker-compose/docker-compose.infrastructure.yaml` | Oracle Free, RabbitMQ, Redis y Vault para desarrollo; WSO2 en un perfil aparte. *(en pausa, 0-B)* | Infraestructura local sin instalar nada a mano. | El entorno donde se prueba July antes de Kubernetes. |
| `docker-compose/.env.sample` | Plantilla de claves locales; se copia a `.env`, que no se versiona. | Nunca versionar claves reales. | — |
| `helm/july-servicio/Chart.yaml` | Declara el chart de biblioteca común. *(en pausa, 0-B)* | Un chart común en vez de 15 copias. | — |
| `helm/july-servicio/values.yaml` | Plantilla de valores que copia cada servicio. | — | — |
| `helm/july-servicio/templates/_helpers.tpl` | Nombre y etiquetas comunes. | — | — |
| `helm/july-servicio/templates/_deployment.tpl` | Deployment con sondas, límites, usuario sin privilegios y secretos de Vault. | Seguridad igual en todos los servicios. | Cada servicio de July corre con lo mínimo y se reinicia si falla. |
| `helm/july-servicio/templates/_service.tpl` | Service y ServiceAccount del servicio. | — | — |
| `helm/july-servicio/templates/_networkpolicy.tpl` | Solo deja entrar al gateway y a los servicios de July, y salir hacia los servicios que llama y a datos. | Reglas L1 y L4: nadie habla con quien no debe. | Un servicio comprometido no puede llegar a otros. |
| `helm/july-servicio/templates/_hpa.tpl` | Autoescalado por CPU, solo si se activa. | Escalar MS-01, MS-02 y MS-03 en producción. | July aguanta picos de mensajes de campañas. |
| `helm/july-servicio/templates/_todo.tpl` | Junta todo lo anterior; cada chart de servicio solo incluye esta plantilla. | — | — |
| `terraform/`, `wso2/` | *(solo organización)* Infraestructura de los entornos y configuración del gateway WSO2. | SAD-05: WSO2 es requisito fijo. | El gateway es la única puerta de July hacia afuera. |

## 7. `_httpclients/`

*(Solo organización.)* Tendrá un archivo `.http` por servicio con los pasos de CU-08 que expone, para probarlos a mano desde el editor. Sirve para depurar un paso de la conversación sin pasar por WhatsApp.

## 8. Los `README.md` de cada carpeta

Hay 41 archivos `README.md` fuera de `Documentacion/` (la portada y uno por carpeta). Cada uno dice:

- **qué va** en la carpeta;
- **quién responde** por ella (rol del equipo, según SAD-06, sección 11);
- **en qué etapa** recibe su contenido y si ya tiene una versión en pausa;
- en las 14 carpetas de microservicios, la **ficha del servicio** de SAD-03: función, tipo, capacidad, tablas, esquema de Oracle, sistemas externos, eventos, imagen y host.

Existen para que el árbol se entienda sin abrir SAD-07. No reemplazan a la documentación: enlazan a ella.
