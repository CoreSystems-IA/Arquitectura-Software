// Datos iniciales versionados: lo que publican las áreas de la cooperativa y July solo lee (CU-08, alcance del reto).
//
// Las cinco líneas, las agencias y los datos de contacto salen de lorente.fin.ec.
// Los montos, plazos, tasas, requisitos y reglas son ILUSTRATIVOS: la cooperativa no los publica,
// y los valores de referencia vienen de NEG-01 (secciones 6.2, 8.2 y 9). Hay que confirmarlos con ella.

const DATOS = {
  version: '2026.11-prototipo',

  colaboradores: [
    { nombre: 'Equipo de marketing', rol: 'MARKETING', correo: 'marketing@ejemplo.test' },
    { nombre: 'Administrador del asistente', rol: 'ADMINISTRADOR', correo: 'asistente@ejemplo.test' },
    { nombre: 'Área de productos y crédito', rol: 'PRODUCTOS_CREDITO', correo: 'productos@ejemplo.test' },
    { nombre: 'Comité de crédito', rol: 'COMITE_CREDITO', correo: 'comite@ejemplo.test' },
    { nombre: 'Jefe comercial', rol: 'JEFE_COMERCIAL', correo: 'comercial@ejemplo.test' },
    { nombre: 'Personal de agencia', rol: 'AGENCIA', correo: 'agencia@ejemplo.test' },
    { nombre: 'Delegado de protección de datos', rol: 'PROTECCION_DATOS', correo: 'datos@ejemplo.test' },
  ],

  asesores: [
    { nombre: 'Ana Torres', agencia: 'LOJA', productos: ['MICRO', 'CONSUMO', 'EMERGENTE', 'DPF', 'CONVENIO'] },
    { nombre: 'Luis Castillo', agencia: 'LOJA', productos: ['MICRO', 'CONSUMO', 'EMERGENTE'] },
    { nombre: 'Carla Ochoa', agencia: 'CENTRO', productos: ['MICRO', 'CONSUMO', 'DPF', 'CONVENIO'] },
    { nombre: 'Diego Ramón', agencia: 'CATAMAYO', productos: ['MICRO', 'CONSUMO', 'EMERGENTE', 'DPF', 'CONVENIO'] },
    { nombre: 'Paola Celi', agencia: 'CARIAMANGA', productos: ['MICRO', 'CONSUMO', 'EMERGENTE', 'DPF', 'CONVENIO'] },
  ],

  agencias: [
    { codigo: 'LOJA', nombre: 'Agencia Loja' },
    { codigo: 'CENTRO', nombre: 'Agencia Centro' },
    { codigo: 'CATAMAYO', nombre: 'Agencia Catamayo' },
    { codigo: 'CARIAMANGA', nombre: 'Agencia Cariamanga' },
  ],

  lineas: [
    {
      codigo: 'MICRO',
      nombre: 'Microcrédito',
      descripcion: 'Para materias primas, insumos, maquinaria, vehículos de trabajo o consolidar deudas de tu negocio.',
      tasa: 18,
      plazos: [6, 12, 18, 24, 36],
      montoMinimo: 500,
      montoMaximo: 20000,
      palabrasClave: ['microcredito', 'negocio', 'mercaderia', 'emprendimiento', 'tienda', 'local', 'insumos', 'materia prima', 'materias primas', 'maquinaria', 'capital de trabajo', 'microempresa', 'vehiculo de trabajo'],
      requisitos: ['Cédula de identidad', 'Planilla de un servicio básico', 'RUC o RISE', 'Facturas o respaldos del negocio'],
    },
    {
      codigo: 'CONSUMO',
      nombre: 'Crédito de consumo',
      descripcion: 'Para comprar bienes o pagar servicios, con ingreso fijo mensual como fuente de pago.',
      tasa: 16,
      plazos: [12, 24, 36, 48, 60],
      montoMinimo: 1000,
      montoMaximo: 30000,
      palabrasClave: ['consumo', 'compra', 'comprar', 'electrodomestico', 'viaje', 'salud', 'estudios', 'sueldo', 'rol de pagos', 'empleado'],
      requisitos: ['Cédula de identidad', 'Planilla de un servicio básico', 'Rol de pagos o certificado de ingresos'],
    },
    {
      codigo: 'DPF',
      nombre: 'Crédito con depósito a plazo fijo',
      descripcion: 'Hasta el 90 % del valor de tu certificado de depósito, sin encaje y de trámite inmediato.',
      tasa: 12,
      plazos: [6, 12, 24, 36],
      montoMinimo: 500,
      montoMaximo: 50000,
      palabrasClave: ['plazo fijo', 'deposito', 'certificado de deposito', 'dpf', 'poliza', 'garantizado'],
      requisitos: ['Cédula de identidad', 'Certificado de depósito a plazo fijo'],
    },
    {
      codigo: 'EMERGENTE',
      nombre: 'Crédito emergente',
      descripcion: 'Plazo máximo de 12 meses, con garantías personales, hipotecarias o certificados de depósito.',
      tasa: 17,
      plazos: [3, 6, 9, 12],
      montoMinimo: 200,
      montoMaximo: 3000,
      palabrasClave: ['emergente', 'emergencia', 'urgente', 'urgencia', 'imprevisto', 'rapido'],
      requisitos: ['Cédula de identidad', 'Planilla de un servicio básico', 'Respaldo de la garantía'],
    },
    {
      codigo: 'CONVENIO',
      nombre: 'Crédito bajo convenio institucional',
      descripcion: 'Para miembros de instituciones públicas o privadas con convenio con la cooperativa.',
      tasa: 15,
      plazos: [12, 24, 36, 48],
      montoMinimo: 500,
      montoMaximo: 20000,
      palabrasClave: ['convenio', 'institucion', 'institucional', 'gremio', 'asociacion'],
      requisitos: ['Cédula de identidad', 'Certificado de la institución con convenio', 'Rol de pagos'],
    },
  ],

  requisitosAfiliacion: ['Abrir una cuenta de ahorros', 'Aportar los certificados de aportación'],

  // CU-08 pide mostrar seguros y cargos, pero sus valores siguen abiertos (NEG-01, sección 12, pregunta 5).
  costos: { tasaSeguroMensual: 0, cargoFijo: 0 },

  plantillas: [
    {
      tipo: 'BIENVENIDA',
      texto: '¡Hola! Soy July, la asistente virtual de la Cooperativa Padre Julián Lorente.',
    },
    {
      tipo: 'AVISO_PRIVACIDAD',
      texto: 'Antes de seguir: usaré tus datos solo para atender tu consulta de crédito y comunicarme contigo, según la Ley Orgánica de Protección de Datos Personales. Puedes retirar tu consentimiento cuando quieras.\n\n¿Aceptas el aviso de privacidad?',
      opciones: ['Acepto', 'No acepto'],
    },
    {
      tipo: 'MENU',
      texto: 'Gracias. ¿En qué te ayudo? Elige una opción o cuéntame con tus palabras qué necesitas.',
      opciones: ['Solicitar un crédito', 'Preguntas frecuentes', 'Hablar con un asesor'],
    },
    {
      tipo: 'MENU_BASICO',
      texto: 'Entendido, no guardaré tus datos. Puedo darte información general:',
      opciones: ['Líneas de crédito', 'Agencias y contacto', 'Cómo hacerme socio', 'Revisar el aviso de privacidad'],
    },
    {
      tipo: 'PREGUNTA_FRECUENTE',
      clave: 'agencias contacto direccion telefono horario horarios donde ubicados oficina atencion',
      texto: 'Nuestra oficina está en Mercadillo 162-18 y Olmedo, Loja, y el teléfono es (07) 257 1135. Atendemos de lunes a viernes; el horario cambia según la agencia.',
    },
    {
      tipo: 'PREGUNTA_FRECUENTE',
      clave: 'socio socia afiliar afiliarme afiliacion aportacion cuenta',
      texto: 'Para ser socio abres una cuenta de ahorros y aportas tus certificados de aportación. Un asesor te guía en una agencia.',
    },
    {
      tipo: 'PREGUNTA_FRECUENTE',
      clave: 'seguro seguros cosede protegido ahorros seguridad',
      texto: 'Tus depósitos están protegidos por el Seguro de Depósitos (COSEDE), hasta el tope que fija la ley.',
    },
    {
      tipo: 'PREGUNTA_FRECUENTE',
      clave: 'lineas productos creditos tienen ofrecen catalogo',
      texto: 'Tenemos cinco líneas: microcrédito, consumo, con depósito a plazo fijo, emergente y bajo convenio institucional.',
    },
    {
      tipo: 'RETOMA',
      plantillaProveedor: 'july_retoma_v1',
      texto: 'Hola, {nombre}. Tu solicitud quedó guardada donde la dejamos. ¿Seguimos?',
      opciones: ['Sí, continuar'],
    },
    {
      tipo: 'RECORDATORIO',
      plantillaProveedor: 'july_recordatorio_v1',
      texto: 'Hola, {nombre}. Te recordamos tu cita del {fechaCita} en {agencia}. Lleva: {documentos}.\n\n¿Confirmas tu asistencia?',
      opciones: ['Confirmo mi asistencia', 'Necesito cambiar la fecha'],
    },
    {
      tipo: 'REACTIVACION',
      plantillaProveedor: 'july_reactivacion_v1',
      texto: 'Hola, {nombre}. Seguimos esperándote para tu crédito. ¿Confirmas tu cita del {fechaCita}?',
      opciones: ['Confirmo mi asistencia', 'Necesito cambiar la fecha'],
    },
  ],

  reglas: {
    // CU-08 y CLS-01 solo capturan los ingresos, no los gastos. El 15 % reproduce los 210 USD del caso de María
    // en NEG-01 (1 400 USD de ingresos). umbralRevision define «justo en el límite» y no está en CLS-01.
    PRECALIFICACION: { porcentajeMaximoCuota: 0.15, umbralRevision: 0.9, edadMinima: 18, edadMaxima: 75 },
    PRIORIDAD: { maxReactivaciones: 2 },
    ENRUTAMIENTO: { cargaMaxima: 10, plazoAtencion: '2 horas' },
  },

  // Registros simulados del Sistema core. Las cédulas son sintéticas, con dígito verificador válido.
  core: {
    socios: [
      {
        nombres: 'Rosa Jiménez Paladines',
        cedula: '2222222222',
        telefono: '0990000002',
        correo: 'rosa@ejemplo.test',
        fechaIngresoSocio: '2019-03-12',
        edad: 45,
        actividadRegistrada: 'Docente',
      },
      {
        nombres: 'Manuel Vivanco Soto',
        cedula: '0303030308',
        telefono: '0990000003',
        correo: 'manuel@ejemplo.test',
        fechaIngresoSocio: '2001-07-02',
        edad: 79,
        actividadRegistrada: 'Agricultor',
      },
    ],
    cedulasNoHabilitadas: ['1212121212'],
  },
};

const ESCENARIO_BASE = {
  canal: 'WHATSAPP',
  campana: 'Facebook · Crédito para tu negocio',
  telefono: '0990000001',
  coreNoResponde: false,
  picoDemanda: false,
  sinHorarios: false,
  lineaNoVigente: false,
  crmFalla: false,
  crmDuplicado: false,
};
