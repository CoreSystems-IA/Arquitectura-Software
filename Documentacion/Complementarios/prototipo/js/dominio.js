// Clases «entidad» de CLS-01 y CLS-02, con los mismos nombres de clase, método y parámetro.

let ultimoId = 0;
const nuevoId = (prefijo) => `${prefijo}-${String(++ultimoId).padStart(5, '0')}`;
const redondear = (valor) => Math.round((valor + Number.EPSILON) * 100) / 100;
const normalizar = (texto) => String(texto).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const dinero = (valor) => `${Number(valor).toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;

const fechaLegible = (fecha) => new Date(fecha).toLocaleString('es-EC', {
  weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
});

function cedulaTieneFormatoValido(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = Number(cedula.slice(0, 2));
  if ((provincia < 1 || provincia > 24) && provincia !== 30) return false;
  if (Number(cedula[2]) > 5) return false;
  const suma = [...cedula.slice(0, 9)].reduce((total, digito, i) => {
    const valor = Number(digito) * (i % 2 === 0 ? 2 : 1);
    return total + (valor > 9 ? valor - 9 : valor);
  }, 0);
  return (10 - (suma % 10)) % 10 === Number(cedula[9]);
}

class Mensaje {
  // `tarjeta` no está en CLS-01: es solo la presentación de un resultado en el chat.
  constructor({ emisor, tipo = 'TEXTO', contenido = '', opciones = [], adjuntos = [], firma = null, idExterno = null, tarjeta = null }) {
    this.idMensaje = nuevoId('MSG');
    this.idExterno = idExterno;
    this.emisor = emisor;
    this.tipo = tipo;
    this.contenido = contenido;
    this.opciones = opciones;
    this.adjuntos = adjuntos;
    this.firma = firma;
    this.fechaHora = new Date();
    this.tarjeta = tarjeta;
  }
}

class Prospecto {
  constructor({ telefono = null } = {}) {
    this.idProspecto = nuevoId('PRO');
    this.nombres = null;
    this.cedula = null;
    this.telefono = telefono;
    this.correo = null;
    this.condicionSocio = 'POR_VERIFICAR';
    this.fechaIngresoSocio = null;
    this.edad = null;
    this.actividadRegistrada = null;
    this.consentimientoAceptado = false;
    this.versionAviso = null;
    this.fechaConsentimiento = null;
    this.alRecibir = () => {};
  }

  recibir(mensaje) {
    this.alRecibir(mensaje);
  }

  registrarConsentimiento(aceptado, versionAviso) {
    this.consentimientoAceptado = aceptado;
    this.versionAviso = versionAviso;
    this.fechaConsentimiento = new Date();
  }
}

class Colaborador {
  constructor({ nombre, rol, agencia = null, correo = '' }) {
    this.idColaborador = nuevoId('COL');
    this.nombre = nombre;
    this.rol = rol;
    this.agencia = agencia;
    this.correo = correo;
    this.publicaciones = {};
    this.bandeja = [];
    this.agenda = () => [];
  }

  recibir(mensaje) {
    this.bandeja.push(mensaje);
  }

  consultarPublicacion(tipo) {
    return this.publicaciones[tipo] || [];
  }

  consultarAgenda(agencia, desde, hasta) {
    return this.agenda(agencia, desde, hasta);
  }
}

class AsesorComercial extends Colaborador {
  constructor({ nombre, agencia, productos }) {
    super({ nombre, rol: 'ASESOR', agencia });
    this.productos = productos;
    this.disponible = true;
    this.leads = [];
  }

  get cargaActual() {
    return this.leads.filter((lead) => ['ASIGNADO', 'EN_GESTION'].includes(lead.estado)).length;
  }
}

class Conversacion {
  constructor({ prospecto, canal }) {
    this.idConversacion = nuevoId('CON');
    this.prospecto = prospecto;
    this.canal = canal;
    this.campana = null;
    this.tokenSesion = null;
    this.estado = null;
    this.ultimoPaso = 'INICIO';
    this.fechaUltimaActividad = null;
    this.asesorAsignado = null;
    this.historial = [];
  }

  registrarMensaje(mensaje) {
    if (!this.estado) this.estado = 'ACTIVA';
    this.historial.push(mensaje);
    this.fechaUltimaActividad = mensaje.fechaHora;
    return this;
  }

  etiquetarOrigen(campana) {
    this.campana = campana;
  }

  encolar() {
    this.estado = 'EN_COLA';
    return 45;
  }

  guardarAvance(paso) {
    this.ultimoPaso = paso;
  }

  marcarAbandonada() {
    this.estado = 'ABANDONADA';
  }

  retomar() {
    this.estado = 'ACTIVA';
    return this.ultimoPaso;
  }

  traspasar(asesor) {
    this.asesorAsignado = asesor;
    this.estado = 'DERIVADA';
  }
}

class Configuracion {
  constructor({ version, vigente = true, publicadoPor }) {
    this.version = version;
    this.vigente = vigente;
    this.publicadoPor = publicadoPor;
  }
}

class LineaCredito extends Configuracion {
  static catalogo = [];

  constructor(datos) {
    super(datos);
    Object.assign(this, datos);
    this.requisitosAfiliacion = datos.requisitosAfiliacion || [];
  }

  static vigentes() {
    return LineaCredito.catalogo.filter((linea) => linea.vigente);
  }

  static buscar(criterio) {
    const texto = normalizar(criterio);
    const puntaje = (linea) => {
      const nombre = texto.includes(normalizar(linea.nombre)) ? 5 : 0;
      return nombre + linea.palabrasClave.filter((clave) => texto.includes(clave)).length;
    };
    const [mejor] = LineaCredito.vigentes().map((linea) => ({ linea, puntos: puntaje(linea) })).sort((a, b) => b.puntos - a.puntos);
    return mejor && mejor.puntos > 0 ? mejor.linea : null;
  }

  validarCondiciones(monto, plazo) {
    if (monto < this.montoMinimo || monto > this.montoMaximo) {
      return `El ${this.nombre} va de ${dinero(this.montoMinimo)} a ${dinero(this.montoMaximo)}.`;
    }
    if (plazo !== null && !this.plazos.includes(plazo)) {
      return `Los plazos del ${this.nombre} son ${this.plazos.join(', ')} meses.`;
    }
    return null;
  }

  requisitosPara(condicion) {
    return condicion === 'SOCIO' ? [...this.requisitos] : [...this.requisitos, ...this.requisitosAfiliacion];
  }
}

class PlantillaMensaje extends Configuracion {
  static lista = [];

  constructor(datos) {
    super(datos);
    this.tipo = datos.tipo;
    this.clave = datos.clave || '';
    this.texto = datos.texto;
    this.opciones = datos.opciones || [];
    this.plantillaProveedor = datos.plantillaProveedor || null;
  }

  static delTipo(tipo) {
    return PlantillaMensaje.lista.find((plantilla) => plantilla.tipo === tipo && plantilla.vigente);
  }

  componer(datos) {
    return this.texto.replace(/\{(\w+)\}/g, (_, variable) => datos[variable] ?? '');
  }

  static buscarRespuesta(texto) {
    const palabras = normalizar(texto).split(/\W+/);
    const [mejor] = PlantillaMensaje.lista
      .filter((plantilla) => plantilla.tipo === 'PREGUNTA_FRECUENTE')
      .map((plantilla) => ({ plantilla, puntos: plantilla.clave.split(' ').filter((clave) => palabras.includes(clave)).length }))
      .sort((a, b) => b.puntos - a.puntos);
    return mejor && mejor.puntos > 0 ? mejor.plantilla : null;
  }
}

class ReglaNegocio extends Configuracion {
  constructor({ tipo, parametros, ...configuracion }) {
    super(configuracion);
    this.tipo = tipo;
    this.parametros = parametros;
  }
}

class Lead {
  constructor({ prospecto, conversacion, linea, necesidad }) {
    this.idLead = nuevoId('LEAD');
    this.numeroSeguimiento = `PJL-${String(Math.floor(Math.random() * 900000) + 100000)}`;
    this.prospecto = prospecto;
    this.conversacion = conversacion;
    this.lineaCredito = linea;
    this.necesidad = necesidad;
    this.prioridad = null;
    this.estado = 'NUEVO';
    this.asesor = null;
    this.solicitud = null;
    this.citas = [];
    this.fechaAsignacion = null;
    this.intentosReactivacion = 0;
    this.idCRM = null;
    this.motivoCierre = null;
    this.fechaRegistro = new Date();
    this.ficha = '';
  }

  static registrar(prospecto, conversacion, linea, necesidad) {
    return new Lead({ prospecto, conversacion, linea, necesidad });
  }

  elegirLinea(linea) {
    if (!linea.vigente) return false;
    this.lineaCredito = linea;
    return true;
  }

  priorizar(criterios) {
    const resultado = this.solicitud && this.solicitud.resultado;
    const agotado = this.intentosReactivacion >= criterios.parametros.maxReactivaciones;
    if (agotado) this.prioridad = 'FRIO';
    else if (resultado === 'APTO' && this.citas.length > 0) this.prioridad = 'CALIENTE';
    else if (resultado === 'APTO' || resultado === 'A_REVISAR') this.prioridad = 'TIBIO';
    else this.prioridad = 'FRIO';
    return this.prioridad;
  }

  asignar(enrutamiento, asesores) {
    const anterior = this.asesor;
    const agencia = this.citas[0] && this.citas[0].agencia;
    const candidatos = asesores
      .filter((asesor) => asesor !== anterior && asesor.disponible)
      .filter((asesor) => asesor.productos.includes(this.lineaCredito.codigo))
      .filter((asesor) => asesor.cargaActual < enrutamiento.parametros.cargaMaxima);
    const deLaAgencia = candidatos.filter((asesor) => asesor.agencia === agencia);
    const [elegido] = (deLaAgencia.length ? deLaAgencia : candidatos).sort((a, b) => a.cargaActual - b.cargaActual);
    if (anterior) anterior.leads = anterior.leads.filter((lead) => lead !== this);
    this.asesor = elegido;
    elegido.leads.push(this);
    this.estado = 'ASIGNADO';
    this.fechaAsignacion = new Date();
    return elegido;
  }

  aceptarAsignacion() {
    this.estado = 'EN_GESTION';
  }

  generarFicha() {
    const { prospecto: p, solicitud: s } = this;
    const elegida = s && s.simulacionElegida;
    const cita = this.citas[0];
    const falta = '⚠ Falta';
    this.ficha = [
      `Número de seguimiento: ${this.numeroSeguimiento}`,
      `Nombres: ${p.nombres || falta}`,
      `Cédula: ${p.cedula || falta}`,
      `Teléfono: ${p.telefono || falta}`,
      `Correo: ${p.correo || falta}`,
      `Condición de socio: ${p.condicionSocio}`,
      `Línea: ${this.lineaCredito.nombre}`,
      `Necesidad: ${this.necesidad}`,
      `Ingresos mensuales: ${s && s.ingresosMensuales ? dinero(s.ingresosMensuales) : falta}`,
      `Actividad: ${(s && s.actividadEconomica) || falta}`,
      `Simulación: ${elegida ? `${dinero(elegida.monto)} a ${elegida.plazo} meses, cuota de ${dinero(elegida.cuotaMensual)}` : falta}`,
      `Precalificación: ${s && s.resultado ? s.resultado : falta}${s && s.resultadoCondicionado ? ' (condicionado)' : ''}`,
      `Prioridad: ${this.prioridad || falta}`,
      `Cita: ${cita ? `${fechaLegible(cita.fechaHora)}, ${cita.agencia}` : 'Sin cita'}`,
      `Origen: ${this.conversacion.campana || 'Directo'} por ${this.conversacion.canal}`,
      `Historial: ${this.conversacion.historial.length} mensajes`,
    ].join('\n');
    return this.ficha;
  }

  vincularCRM(idCRM) {
    this.idCRM = idCRM;
  }

  actualizarEstado(estado, motivo) {
    this.estado = estado;
    this.motivoCierre = motivo;
    if (['DESEMBOLSADO', 'PERDIDO'].includes(estado)) this.conversacion.estado = 'CERRADA';
  }

  reactivar() {
    this.intentosReactivacion += 1;
    return this.intentosReactivacion;
  }
}

class SolicitudCredito {
  constructor({ lead }) {
    this.idSolicitud = nuevoId('SOL');
    this.lead = lead;
    this.monto = null;
    this.plazo = null;
    this.destino = null;
    this.ingresosMensuales = null;
    this.actividadEconomica = null;
    this.estado = 'EN_CAPTURA';
    this.simulaciones = [];
    this.simulacionElegida = null;
    this.resultado = null;
    this.capacidadPago = null;
    this.factores = [];
    this.resultadoCondicionado = false;
    this.numeroCasoRevision = null;
    this.documentosRecibidos = [];
  }

  static iniciar(lead) {
    const solicitud = new SolicitudCredito({ lead });
    lead.solicitud = solicitud;
    lead.estado = 'EN_CAPTURA';
    return solicitud;
  }

  campoPendiente() {
    const p = this.lead.prospecto;
    const pendientes = [
      ['MONTO', this.monto], ['PLAZO', this.plazo], ['DESTINO', this.destino],
      ['NOMBRES', p.nombres], ['CEDULA', p.cedula], ['CORREO', p.correo], ['TELEFONO', p.telefono],
      ['INGRESOS_MENSUALES', this.ingresosMensuales], ['ACTIVIDAD_ECONOMICA', this.actividadEconomica],
    ];
    const pendiente = pendientes.find(([, valor]) => valor === null || valor === '');
    return pendiente ? pendiente[0] : null;
  }

  registrarDato(campo, valor) {
    const p = this.lead.prospecto;
    const linea = this.lead.lineaCredito;
    const texto = String(valor).trim();
    const numero = Number(valor);
    switch (campo) {
      case 'MONTO': {
        if (!(numero > 0)) return 'Necesito el monto en números, por ejemplo 5000.';
        const error = linea.validarCondiciones(numero, null);
        if (error) return error;
        this.monto = numero;
        return null;
      }
      case 'PLAZO': {
        const error = linea.validarCondiciones(this.monto, numero);
        if (error) return error;
        this.plazo = numero;
        return null;
      }
      case 'DESTINO':
        if (texto.length < 3) return 'Cuéntame en pocas palabras para qué usarás el crédito.';
        this.destino = texto;
        return null;
      case 'NOMBRES':
        if (!/^[\p{L}' -]+$/u.test(texto) || texto.split(/\s+/).length < 2) return 'Necesito tus nombres y apellidos, solo con letras.';
        p.nombres = texto;
        return null;
      case 'CEDULA':
        if (!cedulaTieneFormatoValido(texto)) return 'Esa cédula no es válida: debe tener 10 dígitos y un dígito verificador correcto.';
        p.cedula = texto;
        return null;
      case 'CORREO':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) return 'Ese correo no parece válido, revisa que tenga la forma nombre@dominio.com.';
        p.correo = texto;
        return null;
      case 'TELEFONO':
        if (!/^09\d{8}$/.test(texto)) return 'El teléfono debe tener 10 dígitos y empezar con 09.';
        p.telefono = texto;
        return null;
      case 'INGRESOS_MENSUALES':
        if (!(numero > 0)) return 'Necesito tus ingresos mensuales en números, por ejemplo 1400.';
        this.ingresosMensuales = numero;
        return null;
      case 'ACTIVIDAD_ECONOMICA':
        if (texto.length < 3) return 'Cuéntame a qué te dedicas, por ejemplo «tienda de abarrotes».';
        this.actividadEconomica = texto;
        return null;
      default:
        return `Dato desconocido: ${campo}`;
    }
  }

  resumir() {
    const p = this.lead.prospecto;
    return [
      `Línea: ${this.lead.lineaCredito.nombre}`,
      `Monto: ${dinero(this.monto)}`,
      `Plazo: ${this.plazo} meses`,
      `Destino: ${this.destino}`,
      `Nombres: ${p.nombres}`,
      `Cédula: ${p.cedula}`,
      `Correo: ${p.correo}`,
      `Teléfono: ${p.telefono}`,
      `Ingresos mensuales: ${dinero(this.ingresosMensuales)}`,
      `Actividad: ${this.actividadEconomica}`,
    ].join('\n');
  }

  actualizarEstado(estado) {
    this.estado = estado;
  }

  precalificar(reglas) {
    const { porcentajeMaximoCuota, umbralRevision, edadMinima, edadMaxima } = reglas.parametros;
    const p = this.lead.prospecto;
    const cuota = this.simulacionElegida.cuotaMensual;
    this.capacidadPago = redondear(this.ingresosMensuales * porcentajeMaximoCuota);
    this.resultadoCondicionado = p.edad === null;
    const proporcion = cuota / this.capacidadPago;
    const fueraDeEdad = p.edad !== null && (p.edad < edadMinima || p.edad > edadMaxima);
    this.fueraDeEdad = fueraDeEdad;

    this.factores = [
      `Cuota de ${dinero(cuota)} frente a una capacidad de pago de ${dinero(this.capacidadPago)}.`,
      `Actividad: ${this.actividadEconomica}.`,
      p.condicionSocio === 'SOCIO' ? 'Ya eres socio de la cooperativa.' : 'Aún no eres socio: el crédito incluye afiliarte.',
    ];
    if (fueraDeEdad) {
      this.factores.unshift(`La edad registrada está fuera del rango de la línea (${edadMinima} a ${edadMaxima} años).`);
      this.resultado = 'NO_APTO';
    } else if (proporcion <= umbralRevision) this.resultado = 'APTO';
    else if (proporcion <= 1) this.resultado = 'A_REVISAR';
    else this.resultado = 'NO_APTO';

    this.lead.estado = 'PRECALIFICADO';
    return this.resultado;
  }

  explicarResultado() {
    const motivo = {
      APTO: 'Tu cuota entra con holgura en tu capacidad de pago.',
      A_REVISAR: 'Tu cuota está justo en el límite de tu capacidad de pago.',
      NO_APTO: 'Con este monto y plazo la cuota supera tu capacidad de pago.',
    }[this.resultado];
    return [motivo, ...this.factores].join('\n');
  }

  derivarARevision() {
    this.numeroCasoRevision = `REV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    return this.numeroCasoRevision;
  }

  registrarDocumento(documento) {
    this.documentosRecibidos.push(documento);
  }
}

class Simulacion {
  constructor({ solicitud, monto, plazo, tasa }) {
    const i = tasa / 100 / 12;
    const cuota = (monto * i) / (1 - (1 + i) ** -plazo);
    const { tasaSeguroMensual, cargoFijo } = DATOS.costos;
    this.idSimulacion = nuevoId('SIM');
    this.solicitud = solicitud;
    this.lineaCredito = solicitud.lead.lineaCredito;
    this.monto = monto;
    this.plazo = plazo;
    this.tasa = tasa;
    this.cuotaMensual = redondear(cuota);
    this.intereses = redondear(cuota * plazo - monto);
    this.seguros = redondear(monto * tasaSeguroMensual * plazo);
    this.cargos = cargoFijo;
    this.totalPagar = redondear(monto + this.intereses + this.seguros + this.cargos);
    this.tasaEfectiva = redondear(((1 + i) ** 12 - 1) * 100);
  }

  static calcular(solicitud, monto, plazo) {
    const linea = solicitud.lead.lineaCredito;
    if (linea.validarCondiciones(monto, plazo)) return null;
    const simulacion = new Simulacion({ solicitud, monto, plazo, tasa: linea.tasa });
    solicitud.simulaciones.push(simulacion);
    return simulacion;
  }

  generarTablaAmortizacion() {
    const i = this.tasa / 100 / 12;
    const tabla = [];
    let saldo = this.monto;
    for (let numero = 1; numero <= this.plazo; numero += 1) {
      const interes = redondear(saldo * i);
      const capital = numero === this.plazo ? saldo : redondear(this.cuotaMensual - interes);
      saldo = redondear(saldo - capital);
      tabla.push({ numero, cuota: redondear(capital + interes), capital, interes, saldo });
    }
    return tabla;
  }

  elegir() {
    this.solicitud.simulacionElegida = this;
  }

  sugerirAlternativa(capacidadPago) {
    const { solicitud, monto, tasa } = this;
    const linea = solicitud.lead.lineaCredito;
    const cuotaDe = (valor, plazo) => {
      const i = tasa / 100 / 12;
      return (valor * i) / (1 - (1 + i) ** -plazo);
    };
    const plazoQueCabe = linea.plazos.find((plazo) => plazo > this.plazo && cuotaDe(monto, plazo) <= capacidadPago);
    if (plazoQueCabe) return Simulacion.calcular(solicitud, monto, plazoQueCabe);

    const plazoMaximo = Math.max(...linea.plazos);
    const i = tasa / 100 / 12;
    const montoQueCabe = Math.floor((capacidadPago * (1 - (1 + i) ** -plazoMaximo)) / i / 50) * 50;
    return montoQueCabe >= linea.montoMinimo ? Simulacion.calcular(solicitud, montoQueCabe, plazoMaximo) : null;
  }
}

class Cita {
  constructor({ lead, agencia, fechaHora }) {
    this.idCita = nuevoId('CITA');
    this.lead = lead;
    this.agencia = agencia;
    this.fechaHora = fechaHora;
    this.estado = 'RESERVADA';
    this.fechaRecordatorio = null;
  }

  static reservar(lead, agencia, fechaHora) {
    const cita = new Cita({ lead, agencia, fechaHora });
    lead.citas.push(cita);
    return cita;
  }

  reprogramar(fechaHora) {
    this.fechaHora = fechaHora;
    this.estado = 'REPROGRAMADA';
  }

  actualizarEstado(estado) {
    this.estado = estado;
  }

  programarRecordatorio(fecha) {
    this.fechaRecordatorio = fecha;
  }
}
