<div align="center">

<!-- 👇 Coloca tu logo en assets/logo.png -->
<img src="./Assets/Logo.jpeg" alt="CoreSystems-AI Logo" width="260"/>

# 🧠 CoreSystems-AI

### *Software agéntico para empresas que quieren funcionar solas*

> **Ayudamos a las empresas a funcionar de forma automática creando sistemas de inteligencia artificial que ejecutan tareas complejas de principio a fin, siempre bajo supervisión humana.**

![Agentic AI](https://img.shields.io/badge/Agentic-AI-00d4ff?style=for-the-badge&logo=openai&logoColor=white)
![Human in the Loop](https://img.shields.io/badge/Human_in_the_Loop-Siempre-7c3aed?style=for-the-badge)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Integrado-10b981?style=for-the-badge)
![Harness Engineering](https://img.shields.io/badge/Harness-Engineering-f59e0b?style=for-the-badge)

</div>

---

## 🧭 Navegación rápida

<div align="center">

[![Misión](https://img.shields.io/badge/🎯_Misión-0ea5e9?style=for-the-badge)](#mision)
[![Visión](https://img.shields.io/badge/🔭_Visión-8b5cf6?style=for-the-badge)](#vision)
[![DevOps](https://img.shields.io/badge/♾️_DevOps-10b981?style=for-the-badge)](#devops)
[![Stack](https://img.shields.io/badge/🧱_Stack-475569?style=for-the-badge)](#stack)

[![Arquitecto](https://img.shields.io/badge/🏗️_Arquitecto-1d4ed8?style=for-the-badge)](#arquitecto)
[![Seguridad](https://img.shields.io/badge/🛡️_Seguridad-dc2626?style=for-the-badge)](#seguridad)
[![Base de datos](https://img.shields.io/badge/🗄️_Base_de_datos-0891b2?style=for-the-badge)](#base-de-datos)

[![Backend](https://img.shields.io/badge/⚙️_Backend-16a34a?style=for-the-badge)](#backend)
[![Frontend](https://img.shields.io/badge/🖥️_Frontend-ea580c?style=for-the-badge)](#frontend)
[![UI/UX](https://img.shields.io/badge/🎨_UI/UX-db2777?style=for-the-badge)](#uiux)

</div>

---

## 🚀 ¿Quién es CoreSystems-AI?

Somos una empresa de **software agéntico**. Ayudamos a otras empresas a dar el salto de *"usar IA como herramienta"* a **convertirse en organizaciones agénticas**: equipos donde personas y agentes de IA trabajan **mano a mano**, y donde los agentes no solo responden preguntas, sino que **toman un objetivo, lo planifican, lo ejecutan y lo verifican**.

| 🛠️ Herramienta tradicional | 🤖 Sistema agéntico de CoreSystems-AI |
|---|---|
| Espera órdenes | Persigue objetivos |
| Resuelve un paso | Resuelve la tarea completa, de inicio a fin |
| Es estática | Aprende y mejora con cada ciclo |
| Se usa sola | Trabaja codo a codo con el programador |
| Sin control claro | Con permisos, trazabilidad y supervisión humana |

<a id="mision"></a>
## 🎯 Misión

> Crear programas inteligentes que hagan el trabajo pesado de las empresas por sí solos. En lugar de ser herramientas que solo esperan órdenes, desarrollamos asistentes de IA que resuelven tareas completas de inicio a fin, de forma **rápida, segura y bien coordinada**.

<a id="vision"></a>
## 🔭 Visión

> Ser los líderes en ayudar a las empresas a operar de manera automática, logrando que las personas y la inteligencia artificial trabajen en equipo con **sistemas seguros que aprenden y mejoran solos**.

---

## 💡 Conceptos clave con los que trabajamos

Estas son las ideas que están definiendo la siguiente generación de software, y que son parte de nuestro día a día:

### 🧰 Harness Engineering
Un modelo de IA por sí solo es solo el "motor". El **harness** es todo lo que lo rodea para que sea confiable en el mundo real: las **herramientas** que puede usar, los **permisos** que tiene, cómo se gestiona su **contexto y memoria**, los **bucles de verificación**, los **sub-agentes** y los **límites de seguridad**. Dos equipos con el mismo modelo pueden obtener resultados completamente distintos; la diferencia está en el harness. **Ahí es donde ponemos nuestra ingeniería.**

### 🧩 Context Engineering
Decidir *qué* información ve el agente, *cuándo* y *en qué formato*. Un agente con el contexto correcto rinde mucho más que uno con un prompt largo y desordenado.

### 🕸️ Orquestación multi-agente
Varios agentes especializados (planificador, ejecutor, revisor, auditor de seguridad) coordinados como un equipo, cada uno con su rol y sus herramientas.

### 🔌 MCP (Model Context Protocol)
Un estándar abierto para conectar agentes con sistemas de la empresa (bases de datos, APIs, repositorios, herramientas internas) de forma ordenada y controlada.

### ✅ Evals y bucles de verificación
Los agentes no se "creen" sin medir. Usamos pruebas automáticas, evaluaciones y revisión cruzada para comprobar que cada resultado es correcto antes de que llegue a producción.

### 🙋 Human-in-the-Loop
La autonomía total no es el objetivo; la **autonomía supervisada** sí. Las acciones sensibles pasan por aprobación humana, y todo queda registrado y es auditable.

### 🛡️ Guardrails y defensa contra prompt injection
Límites técnicos que impiden que un agente haga lo que no debe, incluso si alguien intenta engañarlo con instrucciones maliciosas escondidas en un documento o una página web.

### 🔁 Sistemas que aprenden y mejoran
Cada ejecución deja datos: qué funcionó, qué falló, qué se corrigió. Esa retroalimentación alimenta la mejora continua del sistema.

---

## 🤝 Cómo trabaja un agente junto al programador

```mermaid
flowchart LR
    H1([🧑‍💻 Humano define el objetivo]) --> P[🧠 Agente planifica]
    P --> E[🛠️ Ejecuta con herramientas]
    E --> V{✅ Verificación<br/>tests y evals}
    V -- Falla --> P
    V -- Pasa --> R[👀 Revisión humana]
    R -- Aprobado --> D([🚀 Despliegue])
    R -- Ajustes --> P
```

El programador deja de escribir cada línea y pasa a **dirigir, revisar y decidir**. El agente se encarga del trabajo repetitivo y pesado. El resultado: **más velocidad sin perder control**.

---

<a id="devops"></a>
## ♾️ Metodología DevOps (y DevSecOps)

Trabajamos con **DevOps** como columna vertebral: ciclos cortos, automatización de punta a punta y feedback constante. La seguridad no es una fase final; está presente en **todas** las etapas (**DevSecOps**). Los agentes de IA participan en cada fase, siempre con un humano responsable.

```mermaid
flowchart LR
    A[📝 Plan] --> B[💻 Code] --> C[🔨 Build] --> D[🧪 Test]
    D --> E[📦 Release] --> F[🚀 Deploy] --> G[⚙️ Operate] --> H[📊 Monitor]
    H --> A
```

| Fase | Qué pasa | Rol de los agentes | Supervisión humana |
|---|---|---|---|
| 📝 **Plan** | Se definen objetivos y diseño | Analizan requisitos y proponen planes | Arquitectura valida |
| 💻 **Code** | Se escribe el código | Generan y refactorizan código | Revisión de *pull requests* |
| 🔨 **Build** | Se compila y empaqueta | Pipelines CI automatizados | Equipo de backend |
| 🧪 **Test** | Se prueba todo | Crean y ejecutan pruebas y evals | QA y seguridad |
| 📦 **Release** | Se prepara la versión | Generan notas y verifican cambios | Aprobación final |
| 🚀 **Deploy** | Se publica | Despliegue con Infraestructura como Código | Aprobación en acciones críticas |
| ⚙️ **Operate** | Se opera el sistema | Resuelven incidentes rutinarios | Escalamiento a humanos |
| 📊 **Monitor** | Se observa y se aprende | Detectan anomalías y proponen mejoras | Retroalimentación al plan |

---

<a id="stack"></a>
## 🧱 Stack tecnológico (aplicación web + móvil)

Una sola base de conocimiento y de código compartido para llegar a **web** y **móvil**, con agentes de IA integrados en el núcleo.

| Rol | 🌐 Web | 📱 Móvil | 🤖 Agentes / IA |
|---|---|---|---|
| 🏗️ Arquitectura | Monolito modular → microservicios | API-first compartida con web | Orquestación y MCP |
| 🛡️ Seguridad | OWASP ASVS, OAuth 2.0 / OIDC | OWASP MASVS, almacenamiento seguro | Guardrails y auditoría |
| 🗄️ Base de datos | PostgreSQL, Redis | SQLite local (modo offline) | Memoria y búsqueda vectorial |
| ⚙️ Backend | FastAPI, NestJS | Misma API REST / WebSockets | Bucle de agente y herramientas |
| 🖥️ Frontend | Next.js, React | React Native + Expo | Paneles de supervisión |
| 🎨 UI/UX | Figma, sistema de diseño | Guías iOS y Android | Diseño de confianza |

---

## 👥 Nuestro equipo

Cada integrante aporta su punto de vista y su "granito de arena" para que los sistemas agénticos sean **bien diseñados, seguros, rápidos y agradables de usar**. Cada rol se apoya en **normas ISO** como referencia de calidad y en un **stack tecnológico** para web y móvil.

---

<a id="arquitecto"></a>
## 🏗️ Arquitecto de Software

<table>
<tr>
<td width="220" align="center">
<img src="./Assets/Carlos.jpeg" alt="Carlos Sánchez" width="200"/>
<br/><b>Carlos Sánchez</b>
<br/><i>Arquitecto de Software</i>
</td>
<td>

**👁️ Punto de vista:** *"Un agente poderoso sin una buena arquitectura es solo un riesgo rápido. Diseñamos primero la estructura, luego la autonomía."*

**🧱 Su aporte:**
- Diseña la arquitectura global del sistema agéntico y el **harness** que rodea a los agentes.
- Define cómo se comunican los agentes, las herramientas y los servicios (incluyendo integraciones tipo MCP).
- Decide límites de autonomía, puntos de aprobación humana y estrategias de escalabilidad.
- Documenta decisiones técnicas (ADRs) para que el equipo avance alineado.

**♾️ En DevOps:** lidera las fases de **Plan** y **Code**, y valida el diseño antes de cada release.

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO/IEC/IEEE 42010** | Descripción y documentación de arquitectura |
| **ISO/IEC 25010** | Modelo de calidad del software (fiabilidad, mantenibilidad, rendimiento) |
| **ISO/IEC/IEEE 12207** | Procesos del ciclo de vida del software |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🌐 **Web y móvil** | ![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square&logo=openapiinitiative&logoColor=white) ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white) ![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=flat-square&logo=socketdotio&logoColor=white) |
| ☁️ **Infraestructura** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white) |
| 📨 **Mensajería** | ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) ![Kafka](https://img.shields.io/badge/Kafka-231F20?style=flat-square&logo=apachekafka&logoColor=white) |
| 🤖 **Agentes** | ![MCP](https://img.shields.io/badge/MCP-000000?style=flat-square) ![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langchain&logoColor=white) ![Claude](https://img.shields.io/badge/Claude_API-D97757?style=flat-square&logo=anthropic&logoColor=white) |
| 📐 **Documentación** | ![Mermaid](https://img.shields.io/badge/Mermaid-FF3670?style=flat-square&logo=mermaid&logoColor=white) ![C4 Model](https://img.shields.io/badge/C4_Model-08427B?style=flat-square) ![ADRs](https://img.shields.io/badge/ADRs-475569?style=flat-square) |

</td>
</tr>
</table>

---

<a id="seguridad"></a>
## 🛡️ Seguridad

<table>
<tr>
<td width="220" align="center">
<img src="./Assets/Alex.jpeg" alt="Alex Santiago" width="200"/>
<br/><b>Alex Santiago</b>
<br/><i>Seguridad</i>
</td>
<td>

**👁️ Punto de vista:** *"Cuanta más autonomía le damos a un agente, más importante es que cada acción sea controlada, trazable y reversible."*

**🔐 Su aporte:**
- Define permisos mínimos, sandboxing y **guardrails** para cada agente.
- Protege contra *prompt injection*, fuga de datos y uso indebido de herramientas.
- Integra seguridad en el pipeline (**DevSecOps**): análisis de código, dependencias y secretos.
- Establece registros de auditoría para saber qué hizo cada agente y por qué.

**♾️ En DevOps:** presente en **todas las fases**, con foco especial en **Test**, **Deploy** y **Monitor**.

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO/IEC 27001** | Sistema de gestión de seguridad de la información |
| **ISO/IEC 27002** | Controles y buenas prácticas de seguridad |
| **ISO/IEC 42001** | Sistema de gestión de inteligencia artificial responsable |
| **ISO/IEC 27034** | Seguridad en las aplicaciones |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🌐 **Web** | ![OWASP](https://img.shields.io/badge/OWASP_ASVS-000000?style=flat-square&logo=owasp&logoColor=white) ![OAuth](https://img.shields.io/badge/OAuth_2.0_/_OIDC-EB5424?style=flat-square&logo=auth0&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare_WAF-F38020?style=flat-square&logo=cloudflare&logoColor=white) |
| 📱 **Móvil** | ![MASVS](https://img.shields.io/badge/OWASP_MASVS-000000?style=flat-square&logo=owasp&logoColor=white) ![Biometría](https://img.shields.io/badge/Biometría-4285F4?style=flat-square) ![Cert Pinning](https://img.shields.io/badge/Certificate_Pinning-475569?style=flat-square) ![Keychain](https://img.shields.io/badge/Keychain_/_Keystore-000000?style=flat-square&logo=apple&logoColor=white) |
| 🔎 **Análisis (DevSecOps)** | ![Semgrep](https://img.shields.io/badge/Semgrep-3DDC84?style=flat-square) ![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white) ![Trivy](https://img.shields.io/badge/Trivy-1904DA?style=flat-square&logo=aqua&logoColor=white) ![OWASP ZAP](https://img.shields.io/badge/OWASP_ZAP-00549E?style=flat-square&logo=zap&logoColor=white) |
| 🔑 **Secretos e identidad** | ![Vault](https://img.shields.io/badge/HashiCorp_Vault-FFEC6E?style=flat-square&logo=vault&logoColor=black) ![Keycloak](https://img.shields.io/badge/Keycloak-4D4D4D?style=flat-square&logo=keycloak&logoColor=white) |
| 🤖 **Seguridad de agentes** | ![LLM Top 10](https://img.shields.io/badge/OWASP_Top_10_for_LLMs-000000?style=flat-square&logo=owasp&logoColor=white) ![Sandboxing](https://img.shields.io/badge/Sandboxing-DC2626?style=flat-square) ![Audit Logs](https://img.shields.io/badge/Audit_Logs-475569?style=flat-square) |

</td>
</tr>
</table>

---

<a id="base-de-datos"></a>
## 🗄️ Base de Datos

<table>
<tr>
<td width="220" align="center">
<img src="./Assets/Aaron.jpeg" alt="Aaron Robles" width="200"/>
<br/><b>Aaron Robles</b>
<br/><i>Base de Datos</i>
</td>
<td>

**👁️ Punto de vista:** *"Los agentes son tan buenos como los datos y la memoria que reciben. Datos limpios, bien modelados y seguros igual a decisiones confiables."*

**💾 Su aporte:**
- Modela y optimiza las bases de datos que alimentan a los agentes.
- Diseña la **memoria persistente** y el almacenamiento de contexto (incluyendo búsqueda semántica cuando aplica).
- Garantiza integridad, respaldos, rendimiento y calidad de los datos.
- Gestiona migraciones de esquema como parte del pipeline de despliegue.

**♾️ En DevOps:** participa en **Code**, **Build** y **Deploy** (migraciones automatizadas) y en **Monitor** (rendimiento).

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO/IEC 9075** | Estándar del lenguaje SQL |
| **ISO/IEC 25012** | Modelo de calidad de datos |
| **ISO 8000** | Calidad e integridad de datos |
| **ISO/IEC 27701** | Gestión de privacidad de la información |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🌐 **Web (servidor)** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) |
| 📱 **Móvil (local / offline)** | ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) ![MMKV](https://img.shields.io/badge/MMKV-475569?style=flat-square) ![Sync](https://img.shields.io/badge/Sincronización_offline-0891B2?style=flat-square) |
| 🧠 **Memoria de agentes** | ![pgvector](https://img.shields.io/badge/pgvector-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Qdrant](https://img.shields.io/badge/Qdrant-DC244C?style=flat-square) |
| 🔄 **Migraciones y ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) ![Alembic](https://img.shields.io/badge/Alembic-6BA81E?style=flat-square) ![Flyway](https://img.shields.io/badge/Flyway-CC0200?style=flat-square&logo=flyway&logoColor=white) |
| ☁️ **Archivos y respaldos** | ![S3](https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=amazons3&logoColor=white) ![pgBackRest](https://img.shields.io/badge/pgBackRest-336791?style=flat-square) |

</td>
</tr>
</table>

---

<a id="backend"></a>
## ⚙️ Backend

<table>
<tr>
<td width="220" align="center">
<img src="./Assets/Juan.jpeg" alt="Juan Cueva" width="200"/>
<br/><b>Juan Cueva</b>
<br/><i>Backend</i>
</td>
<td>

**👁️ Punto de vista:** *"El backend es el cerebro operativo: aquí los agentes se conectan con el mundo real mediante APIs, herramientas y flujos bien orquestados."*

**🧠 Su aporte:**
- Construye la lógica de negocio, las APIs y los servicios que usan los agentes.
- Implementa el **harness** en código: bucles de agente, herramientas, colas de tareas y orquestación.
- Escribe pruebas automáticas y *evals* para verificar el comportamiento de los agentes.
- Revisa el código generado por agentes antes de integrarlo.

**♾️ En DevOps:** protagonista en **Code**, **Build** y **Test**, con integración y entrega continuas (CI/CD).

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO/IEC 25010** | Calidad del producto de software |
| **ISO/IEC/IEEE 29119** | Pruebas de software |
| **ISO/IEC/IEEE 12207** | Procesos del ciclo de vida |
| **ISO/IEC 5338** | Ciclo de vida de sistemas de IA |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🧠 **Lenguajes y frameworks** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) |
| 🔌 **APIs (web y móvil)** | ![REST](https://img.shields.io/badge/REST-009688?style=flat-square) ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white) ![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=flat-square&logo=socketdotio&logoColor=white) ![Push](https://img.shields.io/badge/Push_Notifications-FFCA28?style=flat-square&logo=firebase&logoColor=black) |
| 🤖 **Agentes e IA** | ![Claude](https://img.shields.io/badge/Claude_API-D97757?style=flat-square&logo=anthropic&logoColor=white) ![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langchain&logoColor=white) ![MCP](https://img.shields.io/badge/MCP-000000?style=flat-square) |
| ⏱️ **Tareas en segundo plano** | ![Celery](https://img.shields.io/badge/Celery-37814A?style=flat-square&logo=celery&logoColor=white) ![BullMQ](https://img.shields.io/badge/BullMQ-DC382D?style=flat-square) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) |
| 🧪 **Pruebas y CI/CD** | ![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) |

</td>
</tr>
</table>

---

<a id="frontend"></a>
## 🖥️ Frontend

<table>
<tr>
<td width="220" align="center">
<!-- 👇 Reemplaza con la foto real: assets/team/Jean.jpeg -->
<img src="https://placehold.co/200x200/ea580c/ffffff?text=Foto" alt="Jean Pool" width="200"/>
<br/><b>Jean Pool</b>
<br/><i>Frontend</i>
</td>
<td>

**👁️ Punto de vista:** *"La interfaz es donde el humano supervisa al agente. Debe mostrar qué está haciendo, por qué, y permitir intervenir en cualquier momento."*

**🖥️ Su aporte:**
- Convierte los diseños de UI/UX en interfaces rápidas, responsivas y accesibles.
- Construye paneles de control para **ver, aprobar, pausar o corregir** a los agentes en tiempo real.
- Muestra el progreso, los resultados y el historial de acciones de forma clara.
- Optimiza rendimiento y compatibilidad entre dispositivos.

**♾️ En DevOps:** activo en **Code**, **Build**, **Test** (pruebas de interfaz) y **Deploy**.

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO/IEC 40500 (WCAG)** | Accesibilidad web |
| **ISO/IEC 25010** | Usabilidad y eficiencia de uso |
| **ISO 9241-11** | Usabilidad: efectividad, eficiencia y satisfacción |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🌐 **Web** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |
| 📱 **Móvil** | ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black) ![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| 🔄 **Estado y datos** | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square) ![WebSockets](https://img.shields.io/badge/Tiempo_real-010101?style=flat-square&logo=socketdotio&logoColor=white) |
| 🧩 **Componentes** | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white) |
| 🧪 **Pruebas** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white) ![Detox](https://img.shields.io/badge/Detox_(móvil)-475569?style=flat-square) |

</td>
</tr>
</table>

---

<a id="uiux"></a>
## 🎨 UI/UX

<table>
<tr>
<td width="220" align="center">
<!-- 👇 Reemplaza con la foto real: assets/team/Luis.jpeg -->
<img src="https://placehold.co/200x200/db2777/ffffff?text=Foto" alt="Luis Aguilar" width="200"/>
<br/><b>Luis Aguilar</b>
<br/><i>UI/UX</i>
</td>
<td>

**👁️ Punto de vista:** *"Una IA poderosa que nadie entiende no sirve. Diseñamos para que trabajar con agentes se sienta natural, transparente y confiable."*

**✏️ Su aporte:**
- Investiga a los usuarios y diseña experiencias centradas en las personas.
- Diseña la **confianza**: cómo se comunica el agente, cómo pide aprobación y cómo explica sus decisiones.
- Define el sistema de diseño, la identidad visual y los prototipos.
- Valida con usuarios reales y retroalimenta el ciclo de mejora.

**♾️ En DevOps:** lidera **Plan** (descubrimiento y diseño) y aporta en **Monitor** (feedback de uso real).

**📜 ISOs representativas:**

| Norma | Para qué la usamos |
|---|---|
| **ISO 9241-210** | Diseño centrado en el ser humano |
| **ISO 9241-11** | Medición de usabilidad |
| **ISO 9241-110** | Principios de interacción persona-sistema |

**🧱 Stack tecnológico:**

| Área | Tecnologías |
|---|---|
| 🎨 **Diseño y prototipado** | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) ![FigJam](https://img.shields.io/badge/FigJam-A259FF?style=flat-square&logo=figma&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-0055FF?style=flat-square&logo=framer&logoColor=white) |
| 🌐 **Web** | ![Design Tokens](https://img.shields.io/badge/Design_Tokens-db2777?style=flat-square) ![Responsive](https://img.shields.io/badge/Responsive_Design-0EA5E9?style=flat-square) ![WCAG](https://img.shields.io/badge/WCAG_2.2-005A9C?style=flat-square&logo=w3c&logoColor=white) |
| 📱 **Móvil** | ![Material Design](https://img.shields.io/badge/Material_Design-757575?style=flat-square&logo=materialdesign&logoColor=white) ![HIG](https://img.shields.io/badge/Apple_HIG-000000?style=flat-square&logo=apple&logoColor=white) ![Lottie](https://img.shields.io/badge/Lottie-00DDB3?style=flat-square) |
| 🔬 **Investigación de usuarios** | ![Maze](https://img.shields.io/badge/Maze-6C47FF?style=flat-square) ![Hotjar](https://img.shields.io/badge/Hotjar-FD3A5C?style=flat-square&logo=hotjar&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white) |
| 🧩 **Entrega a desarrollo** | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white) ![Figma Dev Mode](https://img.shields.io/badge/Figma_Dev_Mode-F24E1E?style=flat-square&logo=figma&logoColor=white) |

</td>
</tr>
</table>

---

## 🌟 ¿Por qué CoreSystems-AI?

- 🧰 **Ingeniería de harness:** no solo conectamos un modelo; construimos el sistema que lo hace confiable.
- 🙋 **Humano siempre en control:** autonomía supervisada, auditable y reversible.
- 🛡️ **Seguridad desde el diseño:** DevSecOps y alineación con normas ISO.
- 🤝 **Equipo completo:** arquitectura, seguridad, datos, backend, frontend y experiencia de usuario bajo un mismo techo.
- 📱 **Web y móvil:** un solo ecosistema, dos plataformas.
- 📈 **Mejora continua:** sistemas que aprenden de cada ejecución.

---

## 📬 Contacto

<div align="center">

| | |
|---|---|
| 🌐 **Web** | _(próximamente)_ |
| ✉️ **Correo** | _contacto@coresystems-ai.com_ |
| 💼 **LinkedIn** | _(agregar enlace)_ |

**¿Eres inversor o empresa interesada en volverte agéntica?** Escríbenos; construyamos juntos el futuro del trabajo.

<br/>

**CoreSystems-AI** · *Personas + IA, trabajando en equipo.*

</div>
