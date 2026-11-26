# Guion de presentación del README

**ID:** PRE-01 · **Versión:** 1.0 · **Fecha:** 2026-11-05 · **Estado:** Borrador  
**Deriva de:** [`README.md`](../../../README.md) del repositorio, [PRO-01](../prototipo/README.md), [CU-08](../../Arquitectura/0-escenarios/03-especificacion-casos-de-uso/especificaciones-casos-de-uso.md), [CLS-01](../../Arquitectura/1-vista-logica/05-diccionario-de-datos/diccionario-de-datos-etapa3.md) y el [índice de documentación](../../README.md)

Guion hablado para presentar el README completo, en su mismo orden. Cada bloque dice quién habla, qué se muestra en pantalla y qué se dice. Los turnos se repartieron según el rol de cada integrante y se pueden cambiar.

## Reparto y tiempos

| # | Bloque | Sección del README | Presenta | Tiempo |
|---|---|---|---|---|
| 1 | Apertura | Portada y navegación | Carlos | 0:40 |
| 2 | Quiénes somos, misión y visión | 1. Sobre nosotros | Carlos | 1:20 |
| 3 | Conceptos clave | Conceptos clave | Juan | 1:50 |
| 4 | DevOps y DevSecOps | Metodología DevOps | Juan | 1:10 |
| 5 | Normas y estándares | Normas y estándares | Alex | 2:40 |
| 6 | Stack, equipo y contacto | Stack · Equipo · Contacto | Todos | 2:00 |
| 7 | El reto | 2. El reto | Luis | 1:40 |
| 8 | Alcance | Alcance | Luis | 1:00 |
| 9 | Cadena de trazabilidad | 3. Avance del proyecto | Carlos | 1:20 |
| 10 | Mapa de capacidades | 01 | Carlos | 1:00 |
| 11 | Casos de uso y especificación | 02 y 03 | Jean Pool | 1:30 |
| 12 | Modelo de dominio y diccionario | 04 y 05 | Aaron | 1:20 |
| 13 | Clases y secuencia | 06 y 07 | Juan | 1:10 |
| 14 | Robustez | 08 | Jean Pool | 0:40 |
| 15 | Un paso de punta a punta | Cadena completa | Carlos | 1:00 |
| 16 | Demo del prototipo | Material complementario | Jean Pool y Luis | 3:00 |
| 17 | Material complementario y cierre | Material complementario | Carlos | 1:20 |
| | **Total** | | | **≈ 25 min** |

El texto hablado suma unas 2 500 palabras, cerca de 19 minutos a 130 palabras por minuto. El resto del tiempo es margen para los cambios de pantalla y la demo. Conviene cronometrar un ensayo completo.

**Si hay solo 15 minutos:** resumir los bloques 3 y 4 en una frase cada uno, decir solo el primer párrafo del bloque 5, reducir el bloque 6 a nombre y rol, y saltar los bloques 12, 13 y 14: el bloque 15 los recorre con un ejemplo.

## Antes de empezar

- Abrir el README en GitHub y, en otra pestaña, `Documentacion/Complementarios/prototipo/index.html`. No necesita internet.
- En el prototipo, dejar lista la pestaña **Escenarios** con «María: del anuncio al desembolso».
- Desplegar en el README los diagramas de secuencia y de robustez, que están plegados. En Normas solo aparece abierto el primer grupo.
- Tener a mano el `.png` de cada diagrama: los de clases, secuencia y robustez no se leen bien a tamaño de README.
- Ensayar la demo: se reproduce rápido, con 650 ms entre acciones, así que se comenta sobre todo al terminar.

---

## Parte 1 · Sobre nosotros

### Bloque 1 · Apertura

**Presenta:** Carlos · **En pantalla:** logo y portada del README

> Buenos días. Somos CoreSystems-AI, y hoy les presentamos nuestro trabajo en el reto de la Cooperativa de Ahorro y Crédito Padre Julián Lorente, dentro de la asignatura de Arquitectura de Software con el docente Armando Cabrera.
>
> Vamos a seguir el README del repositorio, que tiene tres partes: quiénes somos, en qué consiste el reto y cuánto hemos avanzado. Al final les mostramos a July funcionando en un prototipo.

### Bloque 2 · Quiénes somos, misión y visión

**Presenta:** Carlos · **En pantalla:** tabla «Herramienta tradicional / Sistema agéntico»

> CoreSystems-AI es una empresa de software agéntico. ¿Qué significa eso? Que ayudamos a las empresas a pasar de usar la IA como una herramienta a trabajar con agentes que toman un objetivo, lo planifican, lo ejecutan y lo verifican.
>
> La tabla muestra la diferencia. Una herramienta tradicional espera órdenes y resuelve un paso. Un sistema agéntico persigue un objetivo y resuelve la tarea completa. Pero hay una condición que para nosotros no se negocia: siempre con permisos, trazabilidad y supervisión humana.
>
> Por eso nuestra misión es crear programas inteligentes que hagan el trabajo pesado de las empresas, de forma rápida, segura y bien coordinada. Y nuestra visión es ser líderes en ayudar a las empresas a operar de manera automática, con personas e inteligencia artificial trabajando en equipo.

### Bloque 3 · Conceptos clave

**Presenta:** Juan · **En pantalla:** tabla de conceptos y, después, el diagrama del agente

> Trabajamos con ocho conceptos, y el más importante es el primero: Harness Engineering. Un modelo de IA es solo el motor. El harness es todo lo que lo rodea para que sea confiable: herramientas, permisos, contexto, memoria, bucles de verificación y límites de seguridad. Dos equipos con el mismo modelo obtienen resultados distintos, y la diferencia está en el harness.
>
> Los demás conceptos son piezas de esa idea. Context Engineering decide qué información ve el agente, cuándo y en qué formato. La orquestación multi-agente coordina agentes especializados, como un planificador, un ejecutor y un revisor. MCP es el estándar abierto para conectarlos con los sistemas de la empresa. Las evals prueban el resultado antes de que llegue a producción. Human-in-the-Loop hace que las acciones sensibles pasen por aprobación humana. Los guardrails impiden que un agente haga lo que no debe, incluso ante prompt injection. Y la mejora continua aprovecha los datos de cada ejecución.
>
> El diagrama lo resume. El humano define el objetivo, el agente planifica y ejecuta, y la verificación automática decide: si falla, vuelve a planificar. Si pasa, llega a una revisión humana. Nada se despliega sin esa aprobación.

### Bloque 4 · DevOps y DevSecOps

**Presenta:** Juan · **En pantalla:** ciclo DevOps y tabla de fases

> Nuestra columna vertebral es DevOps: ciclos cortos, automatización y retroalimentación constante. El ciclo tiene ocho fases, desde Plan hasta Monitor, y lo que se aprende en Monitor vuelve a Plan.
>
> Lo que nos distingue está en las dos últimas columnas de la tabla. En cada fase los agentes tienen una tarea concreta y un humano tiene una responsabilidad concreta. Por ejemplo, en Code los agentes generan y refactorizan, y las personas revisan los pull requests. En Deploy, los agentes despliegan con infraestructura como código, y las acciones críticas requieren aprobación. Además, la seguridad está en todas las fases, y eso es lo que llamamos DevSecOps.

### Bloque 5 · Normas y estándares

**Presenta:** Alex · **En pantalla:** recuadro de alcance y tabla «Obligatorias en Ecuador»

> Cada decisión de July se apoya en un marco de referencia con tres niveles: la ley ecuatoriana, que es obligatoria; las normas ISO, que son voluntarias; y las guías del sector.
>
> Queremos ser claros con dos cosas. Primero, no encontramos una ISO específica para la captación de prospectos financieros ni para chatbots, así que combinamos normas de atención al cliente, inteligencia artificial, privacidad y modelado. Segundo, esto es una referencia y no una certificación: ni July ni CoreSystems-AI están certificados, y las ISO se revisaron por sus resúmenes oficiales.
>
> Lo más importante es la Ley Orgánica de Protección de Datos Personales. Por ella, July muestra el aviso de privacidad y pide el consentimiento antes de solicitar cualquier dato personal. Su artículo 20 cambió nuestro diseño: una persona no debe quedar sometida a una decisión basada en valoraciones automatizadas. Por eso, un resultado «a revisar» llega al Comité de crédito, y un resultado «no apto» ofrece la revisión con un asesor.
>
> La tabla usa tres estados: reflejada en los artefactos, parcial y pendiente. De las 36 entradas, 9 están reflejadas, 11 son parciales y 16 están pendientes. Lo decimos abiertamente, porque ahí está el trabajo que sigue. Por ejemplo, la resolución de la Superintendencia de Protección de Datos Personales exige una evaluación de impacto antes del desarrollo, y ese documento todavía no existe. Tampoco hemos tratado aún amenazas como el prompt injection en los documentos de arquitectura.
>
> También dejamos constancia de cinco normas que evaluamos y no adoptamos. Por ejemplo, ISO 20022 es para mensajería entre entidades financieras, y July no ejecuta pagos.

### Bloque 6 · Stack, equipo y contacto

**Presenta:** todos · **En pantalla:** tabla del stack y fotos del equipo

**Carlos:**

> Este es nuestro stack de referencia para una aplicación web y móvil, organizado por rol. Es lo que proponemos para el producto. El prototipo que verán hoy es más simple: una página web sin dependencias. Ahora cada integrante les cuenta su punto de vista.
>
> Soy Carlos Sánchez, arquitecto de software. Me ocupo de la arquitectura global y del harness, porque un agente poderoso sin una buena arquitectura es solo un riesgo rápido.

**Alex:**

> Soy Alex Santiago, de seguridad. Trabajo en permisos mínimos, guardrails y auditoría, porque cuanta más autonomía, más importante es que cada acción sea controlada, trazable y reversible.

**Aaron:**

> Soy Aaron Robles, de base de datos. Modelo los datos y la memoria de los agentes, porque datos limpios, bien modelados y seguros dan decisiones confiables.

**Juan:**

> Soy Juan Cueva, de backend. Construyo la lógica de negocio, las APIs y el harness en código. El backend es el cerebro operativo.

**Jean Pool:**

> Soy Jean Pool, de frontend. Hago las interfaces y los paneles para ver, aprobar, pausar o corregir a los agentes, porque la interfaz es donde el humano supervisa al agente.

**Luis:**

> Soy Luis Aguilar, de UI/UX. Investigo a los usuarios y diseño la confianza, porque una IA poderosa que nadie entiende no sirve. Nuestros datos de contacto están al final de esta sección. Y con esto pasamos al reto.

---

## Parte 2 · El reto

### Bloque 7 · El reto

**Presenta:** Luis · **En pantalla:** ficha del reto y tabla de capacidades esperadas

> Nuestro reto se llama «Asistente Virtual Interactivo para Calificación y Captación de Prospectos». Es un reto empresarial real, trabajado con Aprendizaje Basado en Retos.
>
> La Cooperativa ya tiene una asistente virtual, July, y quiere convertirla en un prototipo conversacional avanzado que atienda a potenciales socios por WhatsApp o por la web.
>
> El problema es este: imaginen a alguien que escribe a la cooperativa porque necesita un crédito. En ese momento su interés es el más alto. Pero hoy las consultas digitales tardan en ser atendidas, y esa persona se va. La cooperativa pierde una oportunidad justo cuando era más fácil ganarla.
>
> Por eso se nos piden cinco cosas: capturar los requerimientos de crédito y los datos financieros básicos en una conversación; integrar un motor de simulación con cuotas, plazos y requisitos; hacer una precalificación básica; enviar automáticamente la ficha del prospecto al equipo comercial o al CRM; y reducir el tiempo de atención inicial a menos de dos minutos.
>
> Nuestro objetivo general es prototipar una solución de IA conversacional para July, orientada a la precalificación, la simulación y la captación automatizada de prospectos.

### Bloque 8 · Alcance

**Presenta:** Luis · **En pantalla:** tabla «Dentro / Fuera del alcance»

> July es el chatbot de captación. Atiende al prospecto desde que escribe por primera vez hasta que su oportunidad precalificada llega al asesor comercial y al CRM.
>
> Dentro del alcance están la atención por WhatsApp y web, el consentimiento, la captura de datos, la simulación, la precalificación por reglas, la ficha del prospecto y el seguimiento del lead.
>
> Y hay un límite muy importante: July precalifica, pero no aprueba créditos. La aprobación definitiva le corresponde al Comité de crédito. Tampoco administra líneas ni tasas, porque solo las lee, y los derechos sobre los datos los atiende el Delegado de protección de datos.

---

## Parte 3 · Avance del proyecto

### Bloque 9 · Cadena de trazabilidad

**Presenta:** Carlos · **En pantalla:** diagrama de la cadena y tabla de flujos de valor

> Todo nuestro trabajo está en la carpeta Documentación, y un índice registra cada artefacto con su identificador, de qué deriva, su fecha y su estado.
>
> La idea central es esta cadena de ocho artefactos. Empezamos por el mapa de capacidades de negocio, y cada artefacto sale del anterior. Eso significa que cualquier clase, método o mensaje del diseño se puede rastrear hasta la capacidad de negocio que lo justifica. Nada aparece porque sí.
>
> Y no lo comprobamos a ojo: tenemos un script que revisa la cadena con ocho reglas, de V1 a V8, y hoy todas pasan.
>
> Todo el modelo se organiza en tres flujos de valor y siete etapas, que se repiten en cada artefacto: atracción y primer contacto; captura, simulación y precalificación; y entrega, seguimiento y conversión. Todos los artefactos siguen en estado borrador.

### Bloque 10 · 01 Mapa de capacidades

**Presenta:** Carlos · **En pantalla:** imagen del mapa de capacidades

> Nos basamos en el artículo de Ulrich y Rosen, que llama al mapa de capacidades la «piedra de Rosetta» entre el negocio y TI. Lo tradujimos al español como referencia del equipo.
>
> Modelamos el mapa en ArchiMate con la herramienta Archi, y evolucionó en tres etapas. La vigente agrega los servicios de aplicación SA-01 a SA-25 y los actores Comité de crédito y Equipo de marketing.
>
> El mapa incluye el flujo de valor. Cada etapa se apoya en una capacidad de nivel 1, que se divide en dos de nivel 2, y cada una de ellas en tres de nivel 3. En total son 7, 14 y 42 capacidades.

### Bloque 11 · 02 Casos de uso y 03 Especificación

**Presenta:** Jean Pool · **En pantalla:** los tres diagramas de casos de uso y, después, un fragmento de CU-08

> Los casos de uso salen directamente del mapa: cada capacidad se convierte en un caso de uso con el mismo nivel y el mismo número. Hay un diagrama por flujo de valor. El Prospecto inicia los casos de nivel 1, que incluyen los de nivel 2, y estos los de nivel 3. Los actores externos, como WhatsApp, el Sistema core, el CRM o el Asesor comercial, solo participan en el nivel 3.
>
> Después viene la especificación, que es la pieza que alimenta todo lo demás. Hay una por flujo de valor, y en total suman 282 pasos, contando los flujos alternativos: 183 llamadas y 99 retornos.
>
> Cada paso es una oración con un solo verbo. Y de esa oración sacamos cuatro cosas: el sujeto, el método, la entidad y la relación. Por eso la especificación no es solo texto: es la materia prima del diseño. También incluye dos reglas de protección de datos que aplican en todo momento: el consentimiento previo y el retiro del consentimiento.

### Bloque 12 · 04 Modelo de dominio y 05 Diccionario de datos

**Presenta:** Aaron · **En pantalla:** modelo de dominio y, después, el diccionario

> El modelo de dominio recoge los conceptos del negocio que aparecen en la especificación: prospecto, conversación, solicitud, simulación, precalificación, lead, asesor, línea de crédito. Son 12 conceptos con sus atributos y asociaciones. Es deliberadamente limpio: no tiene métodos, ni tipos, ni clases del sistema. Es el negocio, sin tecnología.
>
> El diccionario de datos da el siguiente paso. A esos conceptos les agrega tipos, métodos y las clases del sistema: July como control; el Canal, el Sistema core y el CRM como interfaz; y los conceptos del dominio como entidades. El resultado son 17 clases, 53 métodos, 16 enumeraciones con sus transiciones de estado y 39 relaciones.
>
> La regla es simple: cada método es el verbo de un paso de la especificación, y está en la clase de quien lo recibe.

### Bloque 13 · 06 Clases y 07 Secuencia

**Presenta:** Juan · **En pantalla:** diagrama de clases y un diagrama de secuencia

> El diagrama de clases lleva ese diccionario a UML: clases con estereotipos, atributos y métodos, relaciones con multiplicidad y navegación, y enumeraciones.
>
> Los diagramas de secuencia muestran esas clases en acción. Hay uno por flujo de valor, y cada caso de nivel 2 va en su propio marco. La regla más estricta está aquí: cada llamada es un método de su clase en el diagrama de clases, con los mismos parámetros, y lleva el mismo número de paso de la especificación. Si un mensaje no existe como método, la cadena está rota.

### Bloque 14 · 08 Robustez

**Presenta:** Jean Pool · **En pantalla:** un diagrama de robustez

> El último artefacto es el diagrama de robustez. También hay uno por flujo, con tres tipos de objetos: borde, que es por donde entra y sale la información; control, que es la lógica; y entidad, que son los datos. Cada control lleva el método que lo implementa, y cada conexión lleva los pasos de la especificación que la recorren.

### Bloque 15 · Un paso de punta a punta

**Presenta:** Carlos · **En pantalla:** diagrama de la cadena, señalando cada artefacto

> Para que se vea que la cadena funciona, sigamos un solo paso. En el mapa está la capacidad 1.2.1.2, «Consentimiento de datos». Esa capacidad se convierte en el caso de uso 1.2.1.2, «Aceptar el aviso de privacidad». En la especificación es el paso 20 del flujo 1: «July registra el consentimiento aceptado en el Prospecto». Prospecto es un concepto del dominio. En el diccionario y en el diagrama de clases, ese verbo es el método `registrarConsentimiento`, con los parámetros `aceptado` y `versionAviso`. En la secuencia aparece como el mensaje 20. Y en robustez es el control «Registrar consentimiento».
>
> Es la misma decisión en ocho artefactos, y detrás de ella está la ley de protección de datos que mencionó Alex.

### Bloque 16 · Demo del prototipo

**Presenta:** Jean Pool maneja la pantalla y Luis narra · **En pantalla:** prototipo, pestaña Escenarios

**Luis**, antes de reproducir:

> Ahora vamos a ver todo esto funcionando. Este prototipo implementa las clases y los métodos del diagrama con sus mismos nombres. Se abre con doble clic, sin instalar nada.
>
> Vamos a seguir a María, que tiene una tienda de abarrotes, gana 1 400 dólares y pide 5 000 a 24 meses para comprar mercadería.

*Jean Pool pulsa **Reproducir** en «María: del anuncio al desembolso».*

**Luis**, mientras corre:

> Fíjense en dos cosas: la conversación en el chat y el recorrido, que muestra en vivo cada paso de la especificación con su método.

*Al terminar, Jean Pool recorre las pestañas **Recorrido**, **Datos** y **Cooperativa**.*

**Jean Pool:**

> Veamos qué pasó. María aceptó el aviso antes de dar sus datos. Su cuota a 24 meses era de 249,62 dólares, más de lo que su capacidad de pago permite en este prototipo, que son 210. Entonces July no la rechazó: le ofreció una alternativa a 36 meses, con una cuota de 180,76 dólares. Con eso quedó apta, y su lead pasó con prioridad caliente al asesor. Aquí, en el panel de la cooperativa, se ve lo que le toca hacer a cada colaborador, hasta llegar al desembolso.
>
> Las decisiones las siguen tomando personas: el asesor y la resolución del crédito están en manos de la cooperativa.

**Luis:**

> Hay que aclarar qué es real y qué no. Las pruebas recorren 281 de los 282 pasos. El que falta es la ficha con datos incompletos, que aquí no se puede alcanzar. Pero WhatsApp, el core y el CRM son simulados, la comprensión del lenguaje usa palabras clave y no un modelo de IA, y los montos, tasas y reglas son ilustrativos hasta confirmarlos con la cooperativa.

### Bloque 17 · Material complementario y cierre

**Presenta:** Carlos · **En pantalla:** tabla de material complementario y, al final, la portada

> Además de la cadena, tenemos material de apoyo. El Documento de Arquitectura de Software, o SAD, reúne las vistas de casos de uso, lógica y datos. La guía del negocio nos sirvió para entender a la cooperativa y preparar las preguntas para sus directivos. Las revisiones documentan la consistencia entre artefactos y el plan que unificó toda la cadena por flujo de valor. Y el índice completo guarda la matriz de trazabilidad y el historial de cambios.
>
> ¿Qué sigue? Tres cosas: validar valores y reglas con la cooperativa, completar las vistas del SAD que faltan, como procesos, despliegue, calidad y seguridad, y cerrar los pendientes normativos, empezando por la evaluación de impacto.
>
> En resumen: partimos de un problema real, que es perder prospectos por tardar en atenderlos. Lo convertimos en una cadena de diseño donde cada decisión se puede rastrear hasta el negocio. Y ya tenemos un prototipo que recorre los tres flujos, siempre con una persona a cargo de las decisiones importantes.
>
> Somos CoreSystems-AI: personas e IA, trabajando en equipo. Muchas gracias. Quedamos atentos a sus preguntas.

---

## Preguntas probables

| Pregunta | Respuesta | Responde |
|---|---|---|
| ¿July ya usa inteligencia artificial? | Todavía no. El prototipo entiende por palabras clave. REV-01 prevé un LLM solo para clasificar intenciones y extraer valores; el resto de la lógica es determinista. | Juan |
| ¿July decide si alguien recibe el crédito? | No. Solo precalifica. «A revisar» va al Comité de crédito, «no apto» ofrece la revisión con un asesor y la aprobación definitiva es del Comité. | Alex |
| ¿Ya cumplen la normativa? | No lo afirmamos. No hay certificación, y de 36 entradas hay 11 parciales y 16 pendientes. Faltan, entre otros, la evaluación de impacto y el registro de actividades de tratamiento. | Alex |
| ¿Ya logran atender en menos de 2 minutos? | Es la meta del reto. El prototipo mide la primera respuesta, pero con integraciones simuladas, así que no es una medición real. | Juan |
| ¿Por qué la capacidad de pago es el 15 % de los ingresos? | Es un supuesto del prototipo. NEG-01 la calcula con ingresos menos gastos, pero CU-08 y CLS-01 solo capturan ingresos. Hay que decidirlo con la cooperativa. | Aaron |
| ¿Por qué el prototipo cubre 281 y no 282 pasos? | El paso F3:6a, ficha con datos incompletos, no se puede alcanzar: en el prototipo, el flujo 3 solo arranca con la captura terminada. | Jean Pool |
| ¿Por qué la robustez va después de la secuencia? | En ICONIX suele ir antes. En nuestra cadena, ROB-01 deriva de SEC-01 y CLS-02: toma las líneas de vida de la secuencia y las resume por flujo como bordes, controles y entidades. | Carlos |
| ¿El stack del README ya está implementado? | No. Es el stack de referencia del equipo. El prototipo es HTML, CSS y JavaScript sin dependencias. | Carlos |
| ¿Qué falta en el SAD? | La visión general de procesos, las vistas de implementación y despliegue, calidad y seguridad, además de los datos de contacto y los nombres de autores y revisores. | Carlos |
