// Recorridos de CU-08 escritos como conversación esperada (REV-01, sección 5, «Pruebas»).
// Los que llevan `demo: true` se pueden reproducir en la pantalla; todos corren en pruebas/pruebas.js.
// Un texto es lo que escribe el prospecto; `{ opcion: n }` toca la opción n del último mensaje de July;
// `{ accion: id }` es lo que hace un colaborador en el panel; `{ abandono: true }` vence el plazo de respuesta.

const DATOS_MARIA = ['María Cueva Ordóñez', '1111111116', 'maria@ejemplo.test', '1400', 'Tienda de abarrotes'];
const SEGUIMIENTO_COMPLETO = [
  { accion: 'ACEPTAR_LEAD' },
  'Gracias, ¿me confirma la dirección de la agencia?',
  { accion: 'PROGRAMAR_RECORDATORIO' },
  'Confirmo mi asistencia',
  { accion: 'REGISTRAR_ATENCION' },
  { accion: 'REGISTRAR_DOCUMENTOS' },
  { accion: 'RESOLVER_APROBADA' },
  { accion: 'CERRAR_DESEMBOLSADO' },
];

const GUIONES = [
  {
    id: 'maria',
    demo: true,
    nombre: 'María: del anuncio al desembolso',
    descripcion: 'El caso de NEG-01: no entra a 24 meses, acepta 36 y llega al desembolso.',
    escenario: {},
    pasos: [
      'Hola, necesito un crédito para mi negocio', 'Acepto', 'Sí, es esa', 'Iniciar mi solicitud',
      '5000 a 24 meses para comprar mercadería', ...DATOS_MARIA, 'Todo está correcto', 'Simular mi crédito',
      'Ver el costo total', 'Seguir con esta simulación', 'Precalificarme',
      'Usar la alternativa', 'Ver el costo total', 'Seguir con esta simulación', 'Precalificarme',
      'Qué documentos necesito', 'Agendar una cita', 'Agencia Loja', { opcion: 0 },
      ...SEGUIMIENTO_COMPLETO,
    ],
    espera: { resultado: 'APTO', prioridad: 'CALIENTE', estadoLead: 'DESEMBOLSADO', cuota: 180.76, plazo: 36 },
  },
  {
    id: 'socia',
    demo: true,
    nombre: 'Rosa: una socia que compara plazos',
    descripcion: 'El core la reconoce, confirma sus datos, compara dos plazos y revisa el catálogo.',
    escenario: { telefono: '0990000002', campana: '' },
    pasos: [
      'Hola', 'Acepto', 'Quiero comprar una refrigeradora, soy empleada', 'Sí, es esa', 'Iniciar mi solicitud',
      '3000', '24 meses', 'Comprar electrodomésticos', 'Sí, son correctos', '1800', 'Docente',
      'Corregir un dato', 'Ingresos', '2000', 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total',
      'Comparar otro plazo', '36 meses', 'Opción B', 'Ver requisitos', 'Ver líneas de crédito', 'Crédito de consumo',
      'Precalificarme', 'Qué documentos necesito', 'Agendar una cita', 'Agencia Centro', { opcion: 1 },
      { accion: 'VENCER_ATENCION' }, { accion: 'ACEPTAR_LEAD' }, { accion: 'PROGRAMAR_RECORDATORIO' },
      'Necesito cambiar la fecha', 'Confirmo mi asistencia', { accion: 'REGISTRAR_ATENCION' },
      { accion: 'REGISTRAR_DOCUMENTOS' }, { accion: 'RESOLVER_NEGADA' }, { accion: 'CERRAR_PERDIDO' },
    ],
    espera: { resultado: 'APTO', estadoLead: 'PERDIDO', condicion: 'SOCIO' },
  },
  {
    id: 'revision',
    demo: true,
    nombre: 'Por la web: caso a revisar',
    descripcion: 'Entra por el widget sin campaña, sin teléfono, y el resultado queda en el límite.',
    escenario: { canal: 'WEB', campana: '' },
    pasos: [
      'Buenas tardes', 'Acepto', 'Solicitar un crédito', 'Microcrédito', 'Iniciar mi solicitud',
      '5000', '36 meses', 'Mercadería', 'Pedro Ríos Vega', '1111111116', 'pedro@ejemplo.test', '0990000009',
      '1300', 'Carpintería', 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total',
      'Seguir con esta simulación', 'Precalificarme', 'Terminar por ahora',
      { accion: 'ACEPTAR_LEAD' }, { accion: 'CERRAR_PERDIDO' },
    ],
    espera: { resultado: 'A_REVISAR', prioridad: 'TIBIO', estadoLead: 'PERDIDO' },
  },
  {
    id: 'rechazo',
    demo: true,
    nombre: 'Rechaza el aviso de privacidad',
    descripcion: 'Sin consentimiento, July solo ofrece el menú básico y no pide datos.',
    escenario: {},
    pasos: ['Hola', 'No acepto', 'Agencias y contacto', 'Cómo hacerme socio'],
    espera: { consentimiento: false, sinLead: true },
  },
  {
    id: 'asesor',
    demo: true,
    nombre: 'Pide hablar con una persona',
    descripcion: 'July deriva la conversación con su historial y el asesor la toma.',
    escenario: {},
    pasos: ['Hola', 'Acepto', 'Hablar con un asesor', { accion: 'ACEPTAR_DERIVACION' }, 'Gracias, quiero saber de las tasas'],
    espera: { estadoConversacion: 'DERIVADA', sinLead: true },
  },
  {
    id: 'revision-asesor',
    nombre: 'No apto y pide la revisión con un asesor',
    escenario: { telefono: '0990000003' },
    pasos: [
      'Hola', 'Acepto', 'Quiero un crédito para mi negocio', 'Sí, es esa', 'Iniciar mi solicitud', '1000 a 12 meses para semillas',
      'Sí, son correctos', '2000', 'Agricultor', 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total',
      'Seguir con esta simulación', 'Precalificarme', 'Hablar con un asesor', { accion: 'ACEPTAR_DERIVACION' },
    ],
    espera: { resultado: 'NO_APTO', estadoConversacion: 'DERIVADA' },
  },
  {
    id: 'correcciones',
    nombre: 'Errores de captura, abandono y línea no vigente',
    escenario: { lineaNoVigente: true, coreNoResponde: true, picoDemanda: true },
    pasos: [
      'Quiero información', 'tal vez', 'Acepto', '¿Dónde están ubicados?', 'Quiero un crédito', 'Microcrédito', 'Iniciar mi solicitud',
      'muchísimo', '50000', '5000', '7', '12', 'Mercadería', 'Ana', 'Ana Ruiz Mora', '1234567890', '1212121212', '1111111116',
      'correo-malo', 'ana@ejemplo.test', { abandono: true }, 'Sí, continuar', '900', 'Costurera',
      'Todo está correcto', 'Simular mi crédito', 'Ver el costo total', 'Comparar otro plazo', '90000', '24 meses', 'Opción A',
      'Ver líneas de crédito', 'Crédito de consumo', 'Crédito emergente', 'Simular con esta línea', '3000 a 12 meses',
      'Ver el costo total', 'Seguir con esta simulación', 'Precalificarme',
    ],
    espera: { resultado: 'NO_APTO', condicion: 'POR_VERIFICAR' },
  },
  {
    id: 'seguimiento',
    nombre: 'Fallas del CRM, agenda llena y reactivación',
    escenario: { sinHorarios: true, crmFalla: true },
    pasos: [
      'Hola, quiero un microcrédito', 'Acepto', 'Sí, es esa', 'Iniciar mi solicitud', '5000 a 36 meses para mercadería',
      ...DATOS_MARIA, 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total', 'Seguir con esta simulación',
      'Precalificarme', 'Agendar una cita', 'Agencia Catamayo', { opcion: 0 },
      { accion: 'ACEPTAR_LEAD' }, { accion: 'PROGRAMAR_RECORDATORIO' }, { accion: 'VENCER_RECORDATORIO' }, { accion: 'VENCER_RECORDATORIO' },
      { accion: 'CERRAR_PERDIDO' },
    ],
    espera: { resultado: 'APTO', prioridad: 'FRIO', estadoLead: 'PERDIDO', sinCRM: true },
  },
  {
    id: 'retiro',
    nombre: 'Retira el consentimiento (regla R2)',
    escenario: { crmDuplicado: true },
    pasos: ['Hola', 'Acepto', 'Quiero un crédito emergente', 'Sí, es esa', 'Iniciar mi solicitud', 'Retiro mi consentimiento', 'Líneas de crédito'],
    espera: { consentimiento: false },
  },
  {
    id: 'edad',
    nombre: 'Socio fuera del rango de edad',
    escenario: { telefono: '0990000003' },
    pasos: [
      'Hola', 'Acepto', 'Quiero un crédito para mi negocio', 'Sí, es esa', 'Iniciar mi solicitud', '1000 a 12 meses para semillas',
      'Sí, son correctos', '2000', 'Agricultor', 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total',
      'Seguir con esta simulación', 'Precalificarme', 'Terminar por ahora',
    ],
    espera: { resultado: 'NO_APTO' },
  },
  {
    id: 'duplicado',
    nombre: 'Lead que ya existe en el CRM',
    escenario: { crmDuplicado: true },
    pasos: [
      'Quiero un crédito para mi negocio', 'Acepto', 'Sí, es esa', 'Iniciar mi solicitud', '5000 a 36 meses para mercadería',
      ...DATOS_MARIA, 'Todo está correcto', 'Simular mi crédito', 'Ver el costo total', 'Seguir con esta simulación',
      'Precalificarme', 'Agendar una cita', 'Agencia Cariamanga', { opcion: 2 },
    ],
    espera: { resultado: 'APTO', idCRM: 'CRM-PREVIO-0042' },
  },
];
