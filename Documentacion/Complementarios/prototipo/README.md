# Prototipo conversacional de July

**ID:** PRO-01 · **Versión:** 0.1 · **Fecha:** 2026-11-04 · **Estado:** Borrador  
**Deriva de:** [CU-08](../../Arquitectura/03-especificacion-casos-de-uso/especificaciones-casos-de-uso.md), [CU-09](../../Arquitectura/03-especificacion-casos-de-uso/especificacion-casos-de-uso-solo-pasos.md), [CLS-01](../../Arquitectura/05-diccionario-de-datos/diccionario-de-datos-etapa3.md), CLS-02, [NEG-01](../negocio/guia-negocio-cooperativa-y-captacion.md) y [REV-01](../revisiones/revision-consistencia-etapa3.md)

Primer prototipo funcional del chatbot: un prospecto conversa con July mientras un panel muestra, en vivo, qué paso de CU-08 se ejecuta, qué método de CLS-02 lo realiza y qué le toca hacer a cada colaborador de la cooperativa.

## Cómo abrirlo

Abre [`index.html`](index.html) con doble clic en cualquier navegador. No necesita instalación, servidor ni internet; sin conexión solo cambia la tipografía.

Para una presentación, abre la pestaña **Escenarios** y pulsa **Reproducir** en «María: del anuncio al desembolso».

## Qué hay en la pantalla

| Zona | Qué muestra |
|---|---|
| **Chat** | La conversación del prospecto con July y, tras el traspaso, con el asesor. |
| **Recorrido** | Las 7 etapas del flujo de valor, la primera respuesta medida y cada paso de CU-08 con su método. |
| **Datos** | El estado de `Prospecto`, `Conversacion`, `Lead`, `SolicitudCredito`, `Simulacion` y `Cita`. |
| **Cooperativa** | El panel de los colaboradores: acciones pendientes por rol, ficha del prospecto, conversación del asesor y avisos enviados. |
| **Escenarios** | Recorridos guiados, canal, perfil del prospecto, origen, condiciones de falla y datos de prueba. |

## Qué cubre

Los tres flujos de valor de CU-08, con sus alternativos y las reglas R1 y R2. Las pruebas recorren **281 de los 282 pasos**. El que falta, F3:6a (ficha con datos incompletos), no se puede alcanzar aquí porque el flujo 3 solo arranca con la captura terminada.

La simulación reproduce los valores de NEG-01: 5 000 USD a 24 meses da una cuota de 249,62 USD y un total de 5 990,89 USD, y a 36 meses una cuota de 180,76 USD.

## Qué es simulado

- **WhatsApp, Sistema core y CRM:** no hay conexión real. Sus clases responden con datos de `js/datos.js`.
- **Comprensión del lenguaje:** usa las `palabrasClave` de cada línea, no un LLM. REV-01 prevé un LLM solo para clasificar intenciones y extraer valores; el resto de la lógica ya es determinista.
- **Datos:** viven en memoria y se pierden al reiniciar.

## De dónde salen los datos

| Dato | Origen |
|---|---|
| Las 5 líneas de crédito, agencias, dirección y teléfono | [lorente.fin.ec](https://www.lorente.fin.ec/) |
| Montos, plazos y tasas | **Ilustrativos**, de NEG-01 cuando existen. La cooperativa no los publica en esas páginas. |
| Requisitos, reglas, asesores y personas | **Ilustrativos o ficticios.** Las cédulas son sintéticas. |
| Seguros y cargos | En 0, por definir (NEG-01, sección 12, pregunta 5). |

Antes de mostrar valores como reales hay que confirmarlos con la cooperativa y cambiarlos en `js/datos.js`.

## Colores

| Color | Valor | Uso | Origen |
|---|---|---|---|
| Azul | `#0069b2` | Cabecera del chat, títulos, mensajes del prospecto | Oficial: títulos de lorente.fin.ec |
| Blanco | `#ffffff` | Fondo principal, tarjetas | Oficial |
| Tinte azul | `#e6eff4` | Fondos suaves, etapas recorridas | Oficial: fondo de lorente.fin.ec |
| Verde | `#187a4c` | Enviar, confirmar, resultado APTO, etapa actual, asesor | **Propuesta.** El logo y el sitio no usan verde |

El sitio usa además un dorado que se dejó fuera, porque la colorimetría pedida es azul, blanco y verde. Un resultado NO_APTO va en gris neutro y no en rojo, para orientar sin alarmar y mantener la paleta. El logo oficial no se incluye: la cabecera solo escribe el nombre.

## Diferencias con el modelo

El prototipo implementa las clases y los métodos de CLS-02 con sus mismos nombres y parámetros. Estos puntos no están en la cadena de trazabilidad y conviene decidirlos:

| Punto | Qué hace el prototipo | Por decidir |
|---|---|---|
| **Capacidad de pago** | NEG-01 la calcula con ingresos menos gastos, pero CU-08 y CLS-01 solo capturan los ingresos. Usa `ingresos × 15 %`, que da los 210 USD de María. | Si se capturan los gastos o se confirma una regla sobre ingresos. |
| **Umbral de A_REVISAR** | CLS-01 no define «justo en el límite». Usa `umbralRevision`: APTO hasta el 90 % de la capacidad y A_REVISAR hasta el 100 %. | Valor y nombre del parámetro, con el Comité de crédito. |
| **Inicio del flujo 3** | CU-08 lo dispara al terminar la precalificación. Aquí arranca después de la cita, para que `priorizar()` sepa si hay cita (criterio de CALIENTE en NEG-01). | Si CU-08 se ajusta o si la prioridad se recalcula al reservar. |
| **Captura de datos** | Los pasos 14 y 24 de CU-08 piden varios datos juntos. Aquí se piden de uno en uno, según NEG-01 («evitar formularios largos»), y monto, plazo y destino también se aceptan en una frase. | Si la especificación lo refleja. |
| **Atributos de apoyo** | `Mensaje.tarjeta`, `Lead.ficha`, `Simulacion.lineaCredito`, `Simulacion.tasaEfectiva` y `SolicitudCredito.fueraDeEdad` no están en CLS-01. | Cuáles pasan al modelo. |

## Estructura

```
prototipo/
├── index.html              pantalla
├── css/estilos.css         estilos y colores
├── js/
│   ├── pasos.js            pasos de CU-09 y métodos de CLS-01 (generado)
│   ├── datos.js            configuración: líneas, plantillas, reglas y registros simulados
│   ├── dominio.js          clases «entidad»
│   ├── sistemas.js         clases «interfaz»: Canal, SistemaCore, CRMCooperativa
│   ├── july.js             clase «control» July y armado de la sesión
│   ├── guiones.js          recorridos: se reproducen en pantalla y son las pruebas
│   └── interfaz.js         chat y panel
├── pruebas/pruebas.js      guiones, matemática de NEG-01 y cobertura de CU-08
└── herramientas/generar-pasos.py
```

## Mantenimiento

Para correr las pruebas, que necesitan Node.js:

```bash
node pruebas/pruebas.js
```

Cuando cambien CU-09 o la sección 6.2 de CLS-01, regenera los pasos y vuelve a correr las pruebas. Si un paso citado desaparece de la especificación, July falla y la prueba lo señala.

```bash
python3 herramientas/generar-pasos.py
```
