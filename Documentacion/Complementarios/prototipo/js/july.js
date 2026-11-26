// Clase «control» July: recorre los pasos de CU-08 y coordina a las entidades y a los sistemas.
// Cada llamada a `_t()` deja en la traza los pasos que se acaban de ejecutar, con su número en CU-08.

const GRUPO_CAMPO = {
  MONTO: 'CONDICIONES', PLAZO: 'CONDICIONES', DESTINO: 'CONDICIONES',
  NOMBRES: 'IDENTIDAD', CEDULA: 'IDENTIDAD', CORREO: 'IDENTIDAD', TELEFONO: 'IDENTIDAD',
  INGRESOS_MENSUALES: 'INGRESOS', ACTIVIDAD_ECONOMICA: 'INGRESOS',
};

// Pasos de CU-08 de cada grupo de datos: consulta, pregunta, registro y validación.
const PASOS_GRUPO = {
  CONDICIONES: { consulta: [4, 5], pregunta: 6, respuesta: 7, registro: 8, valido: 9, avance: [10, 11] },
  IDENTIDAD: { consulta: [12, 13], pregunta: 14, respuesta: 15, registro: 16, valido: 17, avance: [20, 21] },
  INGRESOS: { consulta: [22, 23], pregunta: 24, respuesta: 25, registro: 26, valido: 27, avance: [] },
};

const CAMPOS_CORREGIBLES = {
  Monto: 'MONTO', Plazo: 'PLAZO', Destino: 'DESTINO', Nombres: 'NOMBRES', Cédula: 'CEDULA',
  Correo: 'CORREO', Teléfono: 'TELEFONO', Ingresos: 'INGRESOS_MENSUALES', Actividad: 'ACTIVIDAD_ECONOMICA',
};

const OPCIONES_SIMULADA = ['Precalificarme', 'Ver líneas de crédito', 'Ver requisitos'];
const PIDE_ASESOR = /(hablar|comunicar|atender|pasar|quiero|necesito).*(asesor|persona|humano|agente)/;
const RETIRA_DATOS = /retir\w* (mi |el )?consentimiento|no (quiero|deseo) que (usen|guarden|utilicen) mis datos|borr\w+ mis datos/;

function leerNumero(texto) {
  const limpio = normalizar(texto).replace(/\$|usd|dolares/g, ' ');
  const hallado = limpio.match(/(\d[\d.,\s]*\d|\d)\s*(mil\b)?/);
  if (!hallado) return null;
  const crudo = hallado[1].replace(/\s/g, '');
  const valor = /^\d{1,3}([.,]\d{3})+$/.test(crudo) ? Number(crudo.replace(/[.,]/g, '')) : Number(crudo.replace(',', '.'));
  return hallado[2] ? valor * 1000 : valor;
}

function leerCondiciones(texto) {
  const limpio = normalizar(texto);
  const plazo = limpio.match(/(\d+)\s*(meses|mes|anos|ano|anios|anio)\b/);
  const sinPlazo = plazo ? limpio.replace(plazo[0], ' ') : limpio;
  const destino = String(texto).match(/\bpara\s+(.+)$/i);
  return {
    monto: leerNumero(sinPlazo.split(/\bpara\b/)[0]),
    plazo: plazo ? Number(plazo[1]) * (plazo[2].startsWith('mes') ? 1 : 12) : null,
    destino: destino ? destino[1].trim() : null,
  };
}

function extraerValores(texto, campo) {
  if (GRUPO_CAMPO[campo] === 'CONDICIONES') {
    const { monto, plazo, destino } = leerCondiciones(texto);
    const valores = [];
    if (campo === 'MONTO' && monto !== null) valores.push(['MONTO', monto]);
    if (plazo !== null) valores.push(['PLAZO', plazo]);
    else if (campo === 'PLAZO' && monto !== null) valores.push(['PLAZO', monto]);
    if (destino) valores.push(['DESTINO', destino]);
    else if (campo === 'DESTINO') valores.push(['DESTINO', texto.trim()]);
    return valores;
  }
  if (campo === 'CEDULA' || campo === 'TELEFONO') return [[campo, texto.replace(/\D/g, '')]];
  if (campo === 'INGRESOS_MENSUALES') {
    const numero = leerNumero(texto);
    return numero === null ? [] : [[campo, numero]];
  }
  return [[campo, texto.trim()]];
}

class July {
  constructor({ canal, core, crm, colaboradores, asesores, conversacion, escenario, oyente }) {
    this.capacidadMaxima = 50;
    this.tiempoRespuestaObjetivo = 120;
    this.tiempoAbandono = 900;
    this.canal = canal;
    this.core = core;
    this.crm = crm;
    this.col = colaboradores;
    this.asesores = asesores;
    this.conversacion = conversacion;
    this.prospecto = conversacion.prospecto;
    this.escenario = escenario;
    this.oyente = oyente;
    this.etapa = 'INICIO';
    this.fase = null;
    this.lead = null;
    this.solicitud = null;
    this.cita = null;
    this.asesorDerivacion = null;
    this.ultimaPregunta = null;
    this.grupoActual = null;
    this.simulacion = null;
    this.alternativa = null;
    this.comparadas = [];
    this.horarios = [];
    this.agenciaElegida = null;
    this.primerMensaje = '';
    this.corrigiendo = null;
    this.socioConfirmado = false;
  }

  // --- Métodos de CLS-01 ---

  atender(mensaje) {
    if (mensaje.emisor === 'PROSPECTO') this._atenderProspecto(mensaje);
    else this._atenderColaborador(mensaje);
    this.oyente('cambio');
  }

  vencerPlazo(plazo) {
    if (plazo === 'RESPUESTA_PROSPECTO') this._abandonar();
    if (plazo === 'ATENCION_ASESOR') this._reasignar();
    if (plazo === 'RECORDATORIO') this._reactivar();
    this.oyente('cambio');
  }

  // --- Apoyo ---

  _t(flujo, ...pasos) {
    pasos.forEach((paso) => {
      const clave = `F${flujo}:${paso}`;
      if (!PASOS[clave]) throw new Error(`El paso ${clave} no existe en CU-09`);
      this.oyente('traza', { clave, ...PASOS[clave] });
    });
  }

  _regla(nombre, detalle) {
    this.oyente('traza', { clave: nombre, oracion: detalle, cu: null, metodo: null });
  }

  _decir(contenido, { opciones = [], tarjeta = null, tipo = 'TEXTO', emisor = 'JULY' } = {}) {
    const mensaje = new Mensaje({ emisor, tipo, contenido, opciones, tarjeta });
    this.conversacion.registrarMensaje(mensaje);
    if (tipo === 'TEXTO') this.ultimaPregunta = mensaje;
    this.prospecto.recibir(mensaje);
    return mensaje;
  }

  _noEntendi() {
    const pregunta = this.ultimaPregunta;
    this._decir(`No te entendí bien. ${pregunta ? pregunta.contenido : '¿Me lo dices de otra forma?'}`, { opciones: pregunta ? pregunta.opciones : [] });
    this.ultimaPregunta = pregunta;
  }

  _avisar(colaborador, contenido) {
    colaborador.recibir(new Mensaje({ emisor: 'JULY', tipo: 'AVISO', contenido }));
  }

  _plantilla(tipo) {
    return PlantillaMensaje.delTipo(tipo);
  }

  _nombreCorto() {
    return this.prospecto.nombres ? this.prospecto.nombres.split(' ')[0] : 'de nuevo';
  }

  _opcionesDeLineas(lineas = LineaCredito.vigentes()) {
    return lineas.map((linea) => linea.nombre);
  }

  _lineaDeTexto(texto) {
    const buscado = normalizar(texto);
    return LineaCredito.catalogo.find((linea) => normalizar(linea.nombre) === buscado) || LineaCredito.buscar(texto);
  }

  // --- Atención del prospecto ---

  _atenderProspecto(mensaje) {
    const conv = this.conversacion;
    if (conv.estado === null) {
      this._primerContacto(mensaje);
      return;
    }
    if (!this.canal.verificarAutenticidad(mensaje)) {
      this._t(1, '4c', '5c');
      return;
    }
    conv.registrarMensaje(mensaje);
    const texto = mensaje.contenido.trim();
    const n = normalizar(texto);

    if (conv.estado === 'CERRADA') {
      this._decir('Esta conversación ya se cerró. Si necesitas algo más, escríbenos cuando quieras.');
    } else if (conv.estado === 'ABANDONADA') {
      this._retomar();
    } else if (this.etapa !== 'AVISO' && RETIRA_DATOS.test(n)) {
      this._retirarConsentimiento();
    } else if (this.etapa === 'RECORDATORIO') {
      this._enRecordatorio(n);
    } else if (conv.estado === 'DERIVADA') {
      if (this.fase !== 'ASESOR_LIBRE') this._t(3, 24);
      conv.asesorAsignado.recibir(mensaje);
    } else if (this.etapa === 'ESPERA_ASESOR') {
      this._decir('Sigo buscando un asesor disponible, gracias por esperar.');
    } else if (this.etapa !== 'AVISO' && PIDE_ASESOR.test(n)) {
      this._derivar();
    } else {
      this[`_en${this.etapa}`](texto, n);
    }
  }

  // --- Flujo 1 · CU 1.1 ---

  abrirWidget() {
    this._t(1, '1a');
    this.conversacion.tokenSesion = this.canal.abrirSesion('/credito');
    this._t(1, '2a');
  }

  _primerContacto(mensaje) {
    const conv = this.conversacion;
    const web = this.canal.tipo === 'WEB';
    if (web) this._t(1, '3a', '4a', '5a');
    else this._t(1, 1, 2, 3);
    if (!this.canal.verificarAutenticidad(mensaje)) {
      this._t(1, '4c', '5c');
      return;
    }
    this._t(1, web ? '6a' : 4, 5);
    conv.registrarMensaje(mensaje);
    this._t(1, 6);
    this.primerMensaje = mensaje.contenido;

    const campana = this.escenario.campana || null;
    this._t(1, campana ? 7 : '7b');
    conv.etiquetarOrigen(campana);
    this._t(1, campana ? 8 : '8b', 9);
    this._avisar(this.col.marketing, `Origen de la conversación: ${campana || 'directo'}`);
    this._t(1, 10);

    if (this.escenario.picoDemanda) {
      this._t(1, '11d');
      const espera = conv.encolar();
      this._t(1, '12d', '13d', '14d');
      this._decir(`Estamos atendiendo a muchas personas. Tu tiempo de espera estimado es de ${espera} segundos.`);
      conv.estado = 'ACTIVA';
    } else {
      this._t(1, 11, 12);
      this._decir('Recibí tu mensaje, te atiendo enseguida.');
    }
    this._saludar();
  }

  // --- Flujo 1 · CU 1.2 ---

  _saludar() {
    this._t(1, 13, 14);
    const [bienvenida, aviso] = this.col.administrador.consultarPublicacion('BIENVENIDA');
    this._t(1, 15, 16);
    const texto = `${bienvenida.componer({})}\n\n${aviso.componer({})}`;
    this._t(1, 17, 18);
    this._decir(texto, { opciones: aviso.opciones });
    this.etapa = 'AVISO';
  }

  _enAVISO(texto, n) {
    if (/\bno\b|rechaz/.test(n)) this._rechazarAviso();
    else if (/acept|de acuerdo|\bsi\b|\bok\b/.test(n)) this._aceptarAviso();
    else this._noEntendi();
  }

  _aceptarAviso() {
    this._t(1, 19, 20);
    this.prospecto.registrarConsentimiento(true, DATOS.version);
    this._t(1, 21, 22);
    const [menu] = this.col.administrador.consultarPublicacion('MENU');
    this._t(1, 23, 24);
    this._decir(menu.componer({}), { opciones: menu.opciones });
    this.etapa = 'NECESIDAD';
    if (LineaCredito.buscar(this.primerMensaje)) this._enNECESIDAD(this.primerMensaje);
  }

  _rechazarAviso() {
    this._t(1, '19e', '20e');
    this.prospecto.registrarConsentimiento(false, DATOS.version);
    this._t(1, '21e', '22e');
    const [menu] = this.col.administrador.consultarPublicacion('MENU_BASICO');
    this._t(1, '23e', '24e');
    this._decir(menu.componer({}), { opciones: menu.opciones });
    this.etapa = 'BASICO';
  }

  _enBASICO(texto, n) {
    if (n.includes('aviso')) {
      const aviso = this._plantilla('AVISO_PRIVACIDAD');
      this._decir(aviso.componer({}), { opciones: aviso.opciones });
      this.etapa = 'AVISO';
      return;
    }
    const menu = this._plantilla('MENU_BASICO');
    const respuesta = PlantillaMensaje.buscarRespuesta(texto);
    if (respuesta) this._decir(respuesta.texto, { opciones: menu.opciones });
    else this._decir('Sin aceptar el aviso solo puedo darte información general.', { opciones: menu.opciones });
  }

  _enNECESIDAD(texto, n = normalizar(texto)) {
    if (n === 'preguntas frecuentes') {
      this._decir('¿Qué quieres saber?', { opciones: ['Agencias y contacto', 'Cómo hacerme socio', 'Seguro de mis ahorros'] });
      return;
    }
    this._t(1, 25);
    const linea = LineaCredito.buscar(texto);
    const respuesta = linea ? null : PlantillaMensaje.buscarRespuesta(texto);
    if (respuesta) {
      this._t(1, '26h', '27h', '28h');
      this._decir(respuesta.texto, { opciones: this._plantilla('MENU').opciones });
      return;
    }
    this.necesidad = texto;
    this._t(1, 26);
    if (linea) {
      this._t(1, 27, 28);
      this.lineaDetectada = linea;
      this._decir(`Creo que lo tuyo es el **${linea.nombre}**. ${linea.descripcion}\n\n¿Es lo que buscas?`, { opciones: ['Sí, es esa', 'Ver otras líneas'] });
      this.etapa = 'CONFIRMAR_LINEA';
    } else {
      this._ofrecerLineas();
    }
  }

  _ofrecerLineas() {
    this._t(1, '27g', '28g');
    this._decir('Estas son nuestras líneas de crédito. ¿Cuál se ajusta a lo que necesitas?', { opciones: this._opcionesDeLineas() });
    this.etapa = 'ELEGIR_LINEA';
  }

  _enCONFIRMAR_LINEA(texto, n) {
    if (/otra|\bno\b/.test(n)) this._ofrecerLineas();
    else if (/\bsi\b|esa|correcto|claro|exacto/.test(n)) this._registrarLead(this.lineaDetectada);
    else this._noEntendi();
  }

  _enELEGIR_LINEA(texto) {
    const linea = this._lineaDeTexto(texto);
    if (linea) this._registrarLead(linea);
    else this._noEntendi();
  }

  _registrarLead(linea) {
    const p = this.prospecto;
    this._t(1, 29);
    if (!p.telefono && !p.cedula) {
      this._t(1, '30j');
    } else {
      this._t(1, 30);
      const condicion = this.core.consultarSocio(p);
      this._t(1, condicion === 'POR_VERIFICAR' ? '31i' : 31, 32);
    }
    this.lead = Lead.registrar(p, this.conversacion, linea, this.necesidad);
    this._t(1, 33, 34);
    const saludo = p.condicionSocio === 'SOCIO' ? `Qué gusto saludarte, ${this._nombreCorto()}: ya eres parte de la cooperativa. ` : '';
    this._decir(`${saludo}Registré tu interés en el **${linea.nombre}**. Tu número de seguimiento es **${this.lead.numeroSeguimiento}**.`, { opciones: ['Iniciar mi solicitud', 'Hablar con un asesor'] });
    this.etapa = 'LEAD_REGISTRADO';
  }

  _derivar() {
    if (this.fase) {
      const nombre = this.lead && this.lead.asesor ? this.lead.asesor.nombre : 'Un asesor';
      this._decir(`${nombre} ya tiene tu caso y te escribirá por este chat.`);
      return;
    }
    this._t(1, '25f', '26f');
    this.asesorDerivacion = this.asesores.find((asesor) => asesor.disponible);
    this._avisar(this.asesorDerivacion, 'Derivación con el historial de la conversación');
    this.fase = 'DERIVACION_PENDIENTE';
    this.etapa = 'ESPERA_ASESOR';
    this._decir('Te comunico con un asesor. Le paso todo lo que hemos conversado para que no tengas que repetirlo.');
  }

  _retirarConsentimiento() {
    this._regla('R2', 'Prospecto.registrarConsentimiento(false, versionAviso): July deja de pedir datos personales.');
    this.prospecto.registrarConsentimiento(false, DATOS.version);
    this._regla('R2', 'July avisa el retiro del consentimiento al Delegado de protección de datos.');
    this._avisar(this.col.proteccion, 'Retiro del consentimiento');
    const menu = this._plantilla('MENU_BASICO');
    this._decir('Listo, registré el retiro de tu consentimiento y ya no te pediré datos personales. El Delegado de protección de datos quedó avisado.', { opciones: menu.opciones });
    this.etapa = 'BASICO';
  }

  // --- Flujo 2 · CU 2.1 ---

  _enLEAD_REGISTRADO(texto, n) {
    if (/iniciar|solicitud|\bsi\b|empezar|continuar/.test(n)) this._iniciarSolicitud();
    else this._noEntendi();
  }

  _iniciarSolicitud() {
    this._t(2, 1, 2);
    this.solicitud = SolicitudCredito.iniciar(this.lead);
    this._t(2, 3);
    this.etapa = 'CAPTURA';
    this._continuarCaptura();
  }

  _preguntar(campo) {
    const linea = this.lead.lineaCredito;
    const preguntas = {
      MONTO: [`¿Cuánto necesitas? El ${linea.nombre} va de ${dinero(linea.montoMinimo)} a ${dinero(linea.montoMaximo)}.\n\nPuedes decírmelo todo junto, por ejemplo: «5000 a 24 meses para mercadería».`],
      PLAZO: ['¿A qué plazo quieres pagarlo?', linea.plazos.map((plazo) => `${plazo} meses`)],
      DESTINO: ['¿Para qué usarás el crédito?'],
      NOMBRES: ['Ahora tus datos. ¿Cuáles son tus nombres y apellidos?'],
      CEDULA: ['¿Cuál es tu número de cédula?'],
      CORREO: ['¿Cuál es tu correo electrónico?'],
      TELEFONO: ['¿A qué teléfono celular podemos llamarte?'],
      INGRESOS_MENSUALES: ['¿Cuánto ganas al mes, aproximadamente?'],
      ACTIVIDAD_ECONOMICA: ['¿A qué te dedicas?'],
    };
    const [texto, opciones = []] = preguntas[campo];
    this._t(2, PASOS_GRUPO[GRUPO_CAMPO[campo]].pregunta);
    this._decir(texto, { opciones });
  }

  _guardarAvance(pasos) {
    if (!pasos.length) return;
    this._t(2, pasos[0]);
    this.conversacion.guardarAvance(this.etapa);
    this._t(2, pasos[1]);
  }

  _continuarCaptura() {
    const anterior = this.grupoActual;
    const esSocio = this.prospecto.condicionSocio === 'SOCIO' && !this.socioConfirmado;
    const campo = this.solicitud.campoPendiente();
    const grupo = campo ? GRUPO_CAMPO[campo] : null;

    if (grupo !== anterior) {
      if (anterior) this._guardarAvance(PASOS_GRUPO[anterior].avance);
      if (anterior === 'CONDICIONES' && esSocio) {
        this._mostrarDatosSocio();
        return;
      }
      this.grupoActual = grupo;
      if (grupo) this._t(2, ...PASOS_GRUPO[grupo].consulta);
    }
    if (campo) this._preguntar(campo);
    else this._resumir();
  }

  _mostrarDatosSocio() {
    const p = this.prospecto;
    this._t(2, 12, 13, '14a');
    this._decir('Tengo estos datos tuyos. ¿Siguen vigentes?', {
      opciones: ['Sí, son correctos'],
      tarjeta: { tipo: 'filas', titulo: 'Tus datos registrados', filas: [['Nombres', p.nombres], ['Cédula', `•••••${p.cedula.slice(-5)}`], ['Correo', p.correo], ['Teléfono', p.telefono]] },
    });
    this.etapa = 'CONFIRMAR_SOCIO';
  }

  _enCONFIRMAR_SOCIO(texto, n) {
    if (!/\bsi\b|correct|vigente|confirmo/.test(n)) {
      this._noEntendi();
      return;
    }
    this._t(2, '15a');
    this.socioConfirmado = true;
    this.grupoActual = 'IDENTIDAD';
    this.etapa = 'CAPTURA';
    this._continuarCaptura();
  }

  _enCAPTURA(texto) {
    const s = this.solicitud;
    const campo = s.campoPendiente();
    const pasos = PASOS_GRUPO[GRUPO_CAMPO[campo]];
    const valores = extraerValores(texto, campo);
    this._t(2, pasos.respuesta);
    if (this.corrigiendo) this._t(2, this.corrigiendo);
    this.corrigiendo = null;
    if (!valores.length) {
      this._noEntendi();
      return;
    }
    for (const [dato, valor] of valores) {
      this._t(2, pasos.registro);
      const error = s.registrarDato(dato, valor);
      if (error) {
        this._t(2, '17b', '18b');
        this.corrigiendo = '19b';
        this._decir(`${error} Inténtalo otra vez.`);
        return;
      }
      this._t(2, pasos.valido);
      if (dato === 'CEDULA' && !this._validarCedula()) return;
    }
    this._continuarCaptura();
  }

  _validarCedula() {
    this._t(2, 18);
    if (this.core.validarCedula(this.prospecto.cedula)) {
      this._t(2, 19);
      return true;
    }
    this.prospecto.cedula = null;
    this._t(2, '19c', '20c');
    this.corrigiendo = '21c';
    this._decir('Esa cédula no consta como habilitada en nuestro sistema. Revísala y escríbela otra vez, por favor.');
    return false;
  }

  _resumir() {
    this._t(2, 28);
    const resumen = this.solicitud.resumir();
    this._t(2, 29, 30);
    this._decir('Revisa que todo esté bien:', {
      opciones: ['Todo está correcto', 'Corregir un dato'],
      tarjeta: { tipo: 'filas', titulo: 'Resumen de tu solicitud', filas: resumen.split('\n').map((fila) => fila.split(/: (.+)/).slice(0, 2)) },
    });
    this.etapa = 'RESUMEN';
  }

  _enRESUMEN(texto, n) {
    if (/corregir|cambiar|equivocado/.test(n)) {
      this._t(2, '31d');
      this._decir('¿Qué dato quieres corregir?', { opciones: Object.keys(CAMPOS_CORREGIBLES) });
      this.etapa = 'CORREGIR_CAMPO';
    } else if (/correcto|confirmo|\bsi\b|bien/.test(n)) {
      this._t(2, 31, 32);
      this.solicitud.actualizarEstado('CONFIRMADA');
      this._t(2, 33);
      this._guardarAvance([34, 35]);
      this._t(2, 36);
      this._decir('Tu solicitud quedó confirmada. Ahora veamos cuánto pagarías.', { opciones: ['Simular mi crédito'] });
      this.etapa = 'SOLICITUD_CONFIRMADA';
    } else {
      this._noEntendi();
    }
  }

  _enCORREGIR_CAMPO(texto) {
    const etiqueta = Object.keys(CAMPOS_CORREGIBLES).find((nombre) => normalizar(nombre) === normalizar(texto));
    if (!etiqueta) {
      this._noEntendi();
      return;
    }
    this.campoACorregir = CAMPOS_CORREGIBLES[etiqueta];
    this._decir(`Escribe el nuevo valor de: ${etiqueta.toLowerCase()}.`);
    this.etapa = 'CORREGIR_VALOR';
  }

  _enCORREGIR_VALOR(texto) {
    const campo = this.campoACorregir;
    const [par] = extraerValores(texto, campo);
    this._t(2, '32d');
    const error = par ? this.solicitud.registrarDato(par[0], par[1]) : 'No logré leer ese valor.';
    if (error) {
      this._decir(`${error} Inténtalo otra vez.`);
      return;
    }
    if (campo === 'CEDULA' && !this.core.validarCedula(this.prospecto.cedula)) {
      this.prospecto.cedula = null;
      this.etapa = 'CAPTURA';
      this._t(2, '19c', '20c');
      this._decir('Esa cédula no consta como habilitada en nuestro sistema. Escríbela otra vez, por favor.');
      return;
    }
    this._t(2, '33d');
    this._resumir();
  }

  // --- Flujo 2 · CU 2.2 ---

  _enSOLICITUD_CONFIRMADA(texto, n) {
    if (/simul|\bsi\b|cuota/.test(n)) {
      this._t(2, 37);
      this._simular(this.solicitud.monto, this.solicitud.plazo);
    } else {
      this._noEntendi();
    }
  }

  _rechazoDeRango(monto, plazo) {
    const linea = this.lead.lineaCredito;
    this._t(2, '39f', '40f');
    const motivo = linea.validarCondiciones(monto, plazo);
    this._t(2, '41f', '42f');
    return motivo;
  }

  _simular(monto, plazo) {
    const s = this.solicitud;
    this._t(2, 38);
    const simulacion = Simulacion.calcular(s, monto, plazo);
    if (!simulacion) {
      this._decir(`${this._rechazoDeRango(monto, plazo)} ¿Qué monto y plazo quieres simular?`);
      this.etapa = 'MONTO_SIMULACION';
      return;
    }
    this._t(2, 39, 40);
    const tabla = simulacion.generarTablaAmortizacion();
    this._t(2, 41, 42);
    this.simulacion = simulacion;
    this._decir('Esta es tu simulación:', {
      opciones: ['Ver el costo total'],
      tarjeta: {
        tipo: 'simulacion',
        linea: simulacion.lineaCredito.nombre,
        cuota: simulacion.cuotaMensual,
        monto: simulacion.monto,
        plazo: simulacion.plazo,
        tasa: simulacion.tasa,
        tasaEfectiva: simulacion.tasaEfectiva,
        tabla,
      },
    });
    this.etapa = 'SIMULADO';
  }

  _enMONTO_SIMULACION(texto) {
    const { monto, plazo } = leerCondiciones(texto);
    if (monto === null && plazo === null) {
      this._noEntendi();
      return;
    }
    this._t(2, 37);
    this._simular(monto ?? this.solicitud.monto, plazo ?? this.solicitud.plazo);
  }

  _enSIMULADO(texto, n) {
    if (!/costo|total|ver/.test(n)) {
      this._noEntendi();
      return;
    }
    const s = this.simulacion;
    this._t(2, 43, 44);
    this._decir('Esto es lo que pagarías en total:', {
      opciones: ['Comparar otro plazo', 'Seguir con esta simulación'],
      tarjeta: {
        tipo: 'filas',
        titulo: 'Costo total del crédito',
        filas: [['Monto', dinero(s.monto)], ['Intereses', dinero(s.intereses)], ['Seguros', `${dinero(s.seguros)} (por definir)`], ['Cargos', `${dinero(s.cargos)} (por definir)`]],
        total: ['Total a pagar', dinero(s.totalPagar)],
      },
    });
    this.etapa = 'COSTO_MOSTRADO';
  }

  _enCOSTO_MOSTRADO(texto, n) {
    if (/compar|otro/.test(n)) {
      this._t(2, 45);
      const otros = this.lead.lineaCredito.plazos.filter((plazo) => plazo !== this.simulacion.plazo).slice(-3);
      this._decir('¿Con qué plazo o monto quieres comparar?', { opciones: otros.map((plazo) => `${plazo} meses`) });
      this.etapa = 'COMPARAR';
    } else if (/seguir|esta|\bsi\b|acept/.test(n)) {
      this._t(2, '45g');
      this._elegir(this.simulacion);
    } else {
      this._noEntendi();
    }
  }

  _enCOMPARAR(texto) {
    const { monto, plazo } = leerCondiciones(texto);
    if (monto === null && plazo === null) {
      this._noEntendi();
      return;
    }
    const numeroEsPlazo = plazo === null && monto <= 120;
    const nuevoPlazo = plazo ?? (numeroEsPlazo ? monto : this.simulacion.plazo);
    const nuevoMonto = numeroEsPlazo || monto === null ? this.simulacion.monto : monto;
    this._t(2, 46);
    const alterna = Simulacion.calcular(this.solicitud, nuevoMonto, nuevoPlazo);
    if (!alterna) {
      this._decir(`${this._rechazoDeRango(nuevoMonto, nuevoPlazo)} Prueba con otro monto o plazo.`);
      return;
    }
    this._t(2, 47, 48);
    this.comparadas = [this.simulacion, alterna];
    this._decir('Compáralas lado a lado:', {
      opciones: ['Opción A', 'Opción B'],
      tarjeta: {
        tipo: 'comparacion',
        opciones: this.comparadas.map((s, i) => ({ nombre: `Opción ${'AB'[i]}`, monto: s.monto, plazo: s.plazo, cuota: s.cuotaMensual, total: s.totalPagar })),
      },
    });
    this.etapa = 'ELEGIR_ESCENARIO';
  }

  _enELEGIR_ESCENARIO(texto, n) {
    const indice = /\bb\b|segunda/.test(n) ? 1 : /\ba\b|primera/.test(n) ? 0 : -1;
    if (indice < 0) {
      this._noEntendi();
      return;
    }
    this._t(2, 49);
    this._elegir(this.comparadas[indice]);
  }

  _elegir(simulacion) {
    this._t(2, 50);
    simulacion.elegir();
    this.simulacion = simulacion;
    this.solicitud.monto = simulacion.monto;
    this.solicitud.plazo = simulacion.plazo;
    this._t(2, 51, 52);
    this._decir(`Elegiste ${dinero(simulacion.monto)} a ${simulacion.plazo} meses, con una cuota de **${dinero(simulacion.cuotaMensual)}**. ¿Qué hacemos ahora?`, { opciones: OPCIONES_SIMULADA });
    this.etapa = 'ESCENARIO_ELEGIDO';
  }

  _enESCENARIO_ELEGIDO(texto, n) {
    if (/simular/.test(n) && this.simulacion.lineaCredito !== this.lead.lineaCredito) {
      this._t(2, '61i');
      this._simular(this.solicitud.monto, this.solicitud.plazo);
    } else if (/precalif|evalu/.test(n)) {
      this._precalificar();
    } else if (/linea/.test(n)) {
      this._t(2, 53, 54);
      this.col.productos.consultarPublicacion('CATALOGO');
      this._t(2, 55, 56);
      this._decir('Estas son las líneas vigentes:', {
        opciones: this._opcionesDeLineas(),
        tarjeta: {
          tipo: 'filas',
          titulo: 'Catálogo de líneas',
          filas: LineaCredito.vigentes().map((linea) => [linea.nombre, `${linea.tasa} % anual`]),
        },
      });
      this.etapa = 'ELEGIR_LINEA_CATALOGO';
    } else if (/requisit|document/.test(n)) {
      const linea = this.lead.lineaCredito;
      this._t(2, 61, 62);
      this._decir('Estos son los requisitos publicados:', {
        opciones: OPCIONES_SIMULADA,
        tarjeta: { tipo: 'lista', titulo: linea.nombre, elementos: linea.requisitos },
      });
    } else {
      this._noEntendi();
    }
  }

  _enELEGIR_LINEA_CATALOGO(texto) {
    const linea = this._lineaDeTexto(texto);
    if (!linea) {
      this._noEntendi();
      return;
    }
    this._t(2, 57, 58);
    if (this.escenario.lineaNoVigente) {
      linea.vigente = false;
      this.escenario.lineaNoVigente = false;
    }
    if (!this.lead.elegirLinea(linea)) {
      this._t(2, '59h', '60h');
      this._decir(`El ${linea.nombre} acaba de salir de vigencia. Estas sí están disponibles:`, { opciones: this._opcionesDeLineas() });
      return;
    }
    this._t(2, 59, 60);
    const cambio = this.simulacion.lineaCredito !== linea;
    const opciones = cambio ? ['Simular con esta línea', 'Ver requisitos'] : OPCIONES_SIMULADA;
    this._decir(`El **${linea.nombre}** tiene una tasa de ${linea.tasa} % anual y plazos de ${linea.plazos.join(', ')} meses.`, { opciones });
    this.etapa = 'ESCENARIO_ELEGIDO';
  }

  // --- Flujo 2 · CU 2.3 ---

  _precalificar() {
    const s = this.solicitud;
    const p = this.prospecto;
    if (s.simulacionElegida.lineaCredito !== this.lead.lineaCredito) {
      this._decir('Cambiaste de línea, así que primero debemos simular con la nueva.', { opciones: ['Simular con esta línea'] });
      return;
    }
    this._t(2, 63, 64);
    const [reglas] = this.col.comite.consultarPublicacion('PRECALIFICACION');
    this._t(2, 65, 66);
    this.core.consultarSocio(p);
    this._t(2, p.edad === null ? '67j' : 67, 68);
    const resultado = s.precalificar(reglas);

    if (resultado === 'APTO') {
      this._t(2, 69, 70);
      const explicacion = s.explicarResultado();
      this._t(2, 71, 72);
      this._comunicarResultado('Apto', explicacion, 'Tu resultado preliminar es favorable.');
    } else if (resultado === 'A_REVISAR') {
      this._t(2, '69k', '70k');
      const numero = s.derivarARevision();
      this._t(2, '71k', '72k');
      this._avisar(this.col.comite, `Caso de revisión ${numero} con su precalificación`);
      this._t(2, '73k', '74k');
      this._comunicarResultado('A revisar', s.explicarResultado(), `Tu caso necesita una revisión del Comité de crédito. Tu número de caso es **${numero}**.`);
    } else {
      this._t(2, '69l', '70l');
      const explicacion = s.explicarResultado();
      this._t(2, '71l', '72l');
      const capacidad = s.capacidadPago * reglas.parametros.umbralRevision;
      this.alternativa = s.fueraDeEdad ? null : s.simulacionElegida.sugerirAlternativa(capacidad);
      this._t(2, '73l', '74l');
      this._comunicarNoApto(explicacion);
    }
  }

  _tarjetaResultado(etiqueta, explicacion) {
    const [motivo, ...factores] = explicacion.split('\n');
    return {
      tipo: 'resultado',
      resultado: this.solicitud.resultado,
      etiqueta,
      motivo,
      factores,
      condicionado: this.solicitud.resultadoCondicionado,
      nota: 'Resultado preliminar y no vinculante: la aprobación la da la cooperativa.',
    };
  }

  _comunicarResultado(etiqueta, explicacion, texto) {
    this._decir(texto, { opciones: ['Qué documentos necesito', 'Agendar una cita'], tarjeta: this._tarjetaResultado(etiqueta, explicacion) });
    this.etapa = 'RESULTADO';
  }

  _comunicarNoApto(explicacion) {
    const alterna = this.alternativa;
    const texto = alterna
      ? `Por ahora no entra, pero hay una opción: **${dinero(alterna.monto)} a ${alterna.plazo} meses**, con una cuota de **${dinero(alterna.cuotaMensual)}**. Si prefieres, un asesor puede revisar tu caso.`
      : 'Por ahora no podemos avanzar con esta solicitud. Un asesor puede revisar tu caso y orientarte con otras alternativas.';
    const opciones = alterna ? ['Usar la alternativa', 'Hablar con un asesor', 'Terminar por ahora'] : ['Hablar con un asesor', 'Terminar por ahora'];
    this._decir(texto, { opciones, tarjeta: this._tarjetaResultado('No apto', explicacion) });
    this.etapa = 'NO_APTO';
  }

  _enNO_APTO(texto, n) {
    if (/alternativa|\bsi\b|usar/.test(n) && this.alternativa) {
      this._t(2, 37);
      this._simular(this.alternativa.monto, this.alternativa.plazo);
    } else if (/terminar|\bno\b|gracias/.test(n)) {
      this._decir('De acuerdo. Tu solicitud queda guardada: si cambias de idea, escríbeme con tu número de seguimiento.');
      this.etapa = 'FIN';
    } else {
      this._noEntendi();
    }
  }

  _enRESULTADO(texto, n) {
    if (/document|requisit/.test(n)) {
      this._t(2, 73, 74);
      const documentos = this.lead.lineaCredito.requisitosPara(this.prospecto.condicionSocio);
      this._t(2, this.prospecto.condicionSocio === 'SOCIO' ? 75 : '75m', 76);
      this._decir('Esto es lo que debes preparar:', {
        opciones: ['Agendar una cita', 'Terminar por ahora'],
        tarjeta: { tipo: 'lista', titulo: 'Documentos requeridos', elementos: documentos },
      });
    } else if (/cita|agendar/.test(n)) {
      this._decir('¿En qué agencia prefieres que te atendamos?', { opciones: DATOS.agencias.map((agencia) => agencia.nombre) });
      this.etapa = 'ELEGIR_AGENCIA';
    } else if (/terminar|\bno\b|gracias/.test(n)) {
      this._decir('Perfecto. Un asesor revisará tu solicitud y te escribirá pronto.');
      this.etapa = 'FIN';
      this._iniciarFlujo3();
    } else {
      this._noEntendi();
    }
  }

  _enELEGIR_AGENCIA(texto, n) {
    const agencia = DATOS.agencias.find((opcion) => normalizar(opcion.nombre) === n || n.includes(normalizar(opcion.codigo)));
    if (!agencia) {
      this._noEntendi();
      return;
    }
    this.agenciaElegida = agencia;
    this._t(2, 77, 78);
    const dia = 86400000;
    const ahora = Date.now();
    this.horarios = this.col.agencia.consultarAgenda(agencia.codigo, new Date(ahora + dia), new Date(ahora + 3 * dia));
    if (this.horarios.length) {
      this._t(2, 79, 80);
      this._ofrecerHorarios(`Estos son los horarios libres en ${agencia.nombre}:`);
    } else {
      this._t(2, '79n', '80n');
      this.horarios = this.col.agencia.consultarAgenda(agencia.codigo, new Date(ahora + 4 * dia), new Date(ahora + 10 * dia));
      this._t(2, '81n', '82n');
      this._ofrecerHorarios(`No hay horarios libres en esos días. Los más cercanos en ${agencia.nombre} son:`);
    }
  }

  _ofrecerHorarios(texto) {
    this.horarios = this.horarios.slice(0, 4);
    this._decir(texto, { opciones: this.horarios.map(fechaLegible) });
    this.etapa = 'ELEGIR_HORARIO';
  }

  _enELEGIR_HORARIO(texto) {
    const fechaHora = this.horarios.find((horario) => fechaLegible(horario) === texto);
    if (!fechaHora) {
      this._noEntendi();
      return;
    }
    this._t(2, 81, 82);
    this.cita = Cita.reservar(this.lead, this.agenciaElegida.codigo, fechaHora);
    this._t(2, 83, 84);
    this._avisar(this.col.agencia, `Cita reservada: ${fechaLegible(fechaHora)}`);
    this._t(2, 85, 86);
    this._decir('¡Listo! Tu cita quedó reservada. Un asesor te escribirá por este chat.', {
      tarjeta: {
        tipo: 'filas',
        titulo: 'Tu cita',
        filas: [['Fecha y hora', fechaLegible(fechaHora)], ['Agencia', this.agenciaElegida.nombre], ['Seguimiento', this.lead.numeroSeguimiento]],
      },
    });
    this.etapa = 'FIN';
    this._iniciarFlujo3();
  }

  _enFIN() {
    this._decir('Tu solicitud sigue en marcha. Si necesitas algo, dime «hablar con un asesor».');
  }

  // --- Abandono y retoma (flujo 2, A5) ---

  puedeAbandonar() {
    return this.conversacion.estado === 'ACTIVA' && Boolean(this.solicitud) && this.fase === null && this.etapa !== 'FIN';
  }

  _abandonar() {
    const conv = this.conversacion;
    this._t(2, '24e', '25e');
    conv.guardarAvance(this.etapa);
    conv.marcarAbandonada();
    this._t(2, '26e', '27e');
    const plantilla = this._plantilla('RETOMA');
    const texto = plantilla.componer({ nombre: this._nombreCorto() });
    this._t(2, '28e', '29e');
    const mensaje = new Mensaje({ emisor: 'JULY', tipo: 'PLANTILLA', contenido: texto, opciones: plantilla.opciones });
    conv.historial.push(mensaje);
    this._t(2, '30e');
    this.canal.enviar(mensaje);
  }

  _retomar() {
    this._t(2, '31e', '32e');
    this.etapa = this.conversacion.retomar();
    this._t(2, '33e');
    const pregunta = this.ultimaPregunta;
    this._decir(`Sigamos donde lo dejamos. ${pregunta.contenido}`, { opciones: pregunta.opciones });
  }

  // --- Flujo 3 · CU 3.1 y CU 3.2 ---

  _iniciarFlujo3() {
    const lead = this.lead;
    this._t(3, 1);
    const [criterios] = this.col.jefe.consultarPublicacion('PRIORIDAD');
    this._t(3, 2, 3);
    lead.priorizar(criterios);
    this._t(3, 4, 5);
    const ficha = lead.generarFicha();
    this._t(3, ficha.includes('⚠') ? '6a' : 6, 7);
    const previo = this.crm.buscarLead(this.prospecto.cedula, this.prospecto.telefono);
    this._t(3, previo ? '8b' : 8, 9);
    if (previo) lead.vincularCRM(previo);
    this._registrarEnCRM();
    this._t(3, 13);
    const [enrutamiento] = this.col.jefe.consultarPublicacion('ENRUTAMIENTO');
    this._t(3, 14, 15);
    const asesor = lead.asignar(enrutamiento, this.asesores);
    this._t(3, 16, 17);
    this._avisar(asesor, `Lead asignado con plazo de atención de ${enrutamiento.parametros.plazoAtencion}`);
    this.fase = 'ASIGNADO';
  }

  _registrarEnCRM() {
    const lead = this.lead;
    try {
      const idCRM = this.crm.sincronizarLead(lead);
      this._t(3, 10, 11);
      lead.vincularCRM(idCRM);
      this._t(3, 12);
    } catch (error) {
      this._t(3, '10c', '11c');
      this._avisar(this.col.jefe, `Registro pendiente en el CRM: ${lead.numeroSeguimiento}`);
      this._t(3, '12c');
    }
  }

  _reasignar() {
    const lead = this.lead;
    this._t(3, '18d', '19d');
    const [enrutamiento] = this.col.jefe.consultarPublicacion('ENRUTAMIENTO');
    const asesor = lead.asignar(enrutamiento, this.asesores);
    this._t(3, '20d', '21d');
    this._avisar(this.col.jefe, `Lead ${lead.numeroSeguimiento} reasignado a ${asesor.nombre}`);
    this._t(3, '22d', 17);
    this._avisar(asesor, 'Lead asignado');
  }

  _reactivar() {
    const lead = this.lead;
    const [criterios] = this.col.jefe.consultarPublicacion('PRIORIDAD');
    this._t(3, '32e', '33e');
    const intentos = lead.reactivar();
    this._t(3, '34e');
    if (intentos < criterios.parametros.maxReactivaciones) {
      this._t(3, '35e');
      const plantilla = this._plantilla('REACTIVACION');
      const texto = plantilla.componer({ nombre: this._nombreCorto(), fechaCita: fechaLegible(this.cita.fechaHora) });
      this._t(3, '36e', '37e', '38e');
      this._decir(texto, { opciones: plantilla.opciones, tipo: 'PLANTILLA' });
      return;
    }
    this._t(3, '35f');
    lead.priorizar(criterios);
    this._t(3, '36f', '37f');
    this._avisar(lead.asesor, `Lead frío tras ${intentos} intentos de reactivación`);
    this.etapa = 'CON_ASESOR';
    this.fase = 'SIN_RESPUESTA';
  }

  _enRecordatorio(n) {
    if (/cambiar|otra fecha|reprogram/.test(n)) {
      const cita = this.cita;
      const dia = 86400000;
      const desde = new Date(cita.fechaHora.getTime() + dia);
      this._t(3, '32g', '33g');
      const [nuevo] = this.col.agencia.consultarAgenda(cita.agencia, desde, new Date(desde.getTime() + 7 * dia));
      this._t(3, '34g', '35g');
      cita.reprogramar(nuevo);
      this._t(3, '36g', '37g');
      this._decir(`Tu cita pasó al ${fechaLegible(nuevo)}. ¿Confirmas tu asistencia?`, { opciones: ['Confirmo mi asistencia', 'Necesito cambiar la fecha'] });
    } else if (/confirmo|\bsi\b|asist/.test(n)) {
      this._t(3, 32, 33);
      this.cita.actualizarEstado('CONFIRMADA');
      this._t(3, 34, 35);
      this._avisar(this.col.agencia, 'Asistencia confirmada');
      this._decir('Gracias, tu asistencia quedó confirmada. Te esperamos.');
      this.etapa = 'CON_ASESOR';
      this.fase = 'CITA_CONFIRMADA';
    } else {
      this._noEntendi();
    }
  }

  _enCON_ASESOR() {
    this._decir('Tu asesor verá este mensaje y te responderá por aquí.');
  }

  acciones() {
    const conCita = Boolean(this.cita);
    const aprobada = this.solicitud && this.solicitud.estado === 'APROBADA';
    const porFase = {
      DERIVACION_PENDIENTE: [{ id: 'ACEPTAR_DERIVACION', rol: 'Asesor comercial', etiqueta: 'Aceptar la derivación' }],
      ASIGNADO: [
        { id: 'ACEPTAR_LEAD', rol: 'Asesor comercial', etiqueta: 'Aceptar el lead' },
        { id: 'VENCER_ATENCION', rol: 'Temporizador', etiqueta: 'Dejar vencer el plazo', secundaria: true },
      ],
      GESTION: conCita
        ? [{ id: 'PROGRAMAR_RECORDATORIO', rol: 'Asesor comercial', etiqueta: 'Enviar recordatorio de cita' }]
        : [{ id: 'CERRAR_PERDIDO', rol: 'Asesor comercial', etiqueta: 'Cerrar como perdido', secundaria: true }],
      RECORDATORIO: [{ id: 'VENCER_RECORDATORIO', rol: 'Temporizador', etiqueta: 'El prospecto no responde', secundaria: true }],
      CITA_CONFIRMADA: [{ id: 'REGISTRAR_ATENCION', rol: 'Personal de agencia', etiqueta: 'Registrar la atención de la cita' }],
      CITA_ATENDIDA: [{ id: 'REGISTRAR_DOCUMENTOS', rol: 'Asesor comercial', etiqueta: 'Registrar documentos y enviar a resolución' }],
      EN_COMITE: [
        { id: 'RESOLVER_APROBADA', rol: 'Comité de crédito', etiqueta: 'Aprobar el crédito' },
        { id: 'RESOLVER_NEGADA', rol: 'Comité de crédito', etiqueta: 'Negar el crédito', secundaria: true },
      ],
      RESUELTA: aprobada
        ? [{ id: 'CERRAR_DESEMBOLSADO', rol: 'Asesor comercial', etiqueta: 'Cerrar como desembolsado' }, { id: 'CERRAR_PERDIDO', rol: 'Asesor comercial', etiqueta: 'Cerrar como perdido', secundaria: true }]
        : [{ id: 'CERRAR_PERDIDO', rol: 'Asesor comercial', etiqueta: 'Cerrar como perdido' }],
      SIN_RESPUESTA: [{ id: 'CERRAR_PERDIDO', rol: 'Asesor comercial', etiqueta: 'Cerrar como perdido' }],
    };
    return porFase[this.fase] || [];
  }

  _atenderColaborador(mensaje) {
    const acciones = {
      ACEPTAR_DERIVACION: () => this._aceptarDerivacion(),
      ACEPTAR_LEAD: () => this._aceptarLead(),
      PROGRAMAR_RECORDATORIO: () => this._enviarRecordatorio(),
      REGISTRAR_ATENCION: () => this._registrarAtencion(),
      REGISTRAR_DOCUMENTOS: () => this._registrarDocumentos(),
      RESOLVER_APROBADA: () => this._resolver('APROBADA'),
      RESOLVER_NEGADA: () => this._resolver('NEGADA'),
      CERRAR_DESEMBOLSADO: () => this._cerrar('DESEMBOLSADO', null),
      CERRAR_PERDIDO: () => this._cerrar('PERDIDO', this._motivoDePerdida()),
    };
    acciones[mensaje.contenido]();
  }

  _aceptarDerivacion() {
    const conv = this.conversacion;
    const asesor = this.asesorDerivacion;
    this._t(1, '27f', '28f');
    conv.traspasar(asesor);
    this._t(1, '29f', '30f');
    this._avisar(asesor, 'Traspaso confirmado');
    this._t(1, '31f');
    this.fase = 'ASESOR_LIBRE';
    this.etapa = 'CON_ASESOR';
    this._decir(`Hola, soy ${asesor.nombre}, del equipo comercial de la cooperativa. Ya leí tu conversación con July. ¿En qué te ayudo?`, { emisor: 'ASESOR' });
  }

  _aceptarLead() {
    const lead = this.lead;
    this._t(3, 18, 19);
    lead.aceptarAsignacion();
    this._t(3, 20, 21);
    this.conversacion.traspasar(lead.asesor);
    this._t(3, 22, 23);
    this._decir(`Desde ahora te acompaña ${lead.asesor.nombre}, del equipo comercial. Ya tiene tu ficha y todo lo que conversamos.`);
    this.etapa = 'CON_ASESOR';
    this.fase = 'GESTION';
  }

  _enviarRecordatorio() {
    const cita = this.cita;
    const agencia = DATOS.agencias.find((opcion) => opcion.codigo === cita.agencia);
    const documentos = this.lead.lineaCredito.requisitosPara(this.prospecto.condicionSocio).join(', ');
    this._t(3, 25, 26);
    cita.programarRecordatorio(new Date(cita.fechaHora.getTime() - 86400000));
    this._t(3, 27, 28);
    const plantilla = this._plantilla('RECORDATORIO');
    const texto = plantilla.componer({ nombre: this._nombreCorto(), fechaCita: fechaLegible(cita.fechaHora), agencia: agencia.nombre, documentos });
    this._t(3, 29, 30, 31);
    this._decir(texto, { opciones: plantilla.opciones, tipo: 'PLANTILLA' });
    this.etapa = 'RECORDATORIO';
    this.fase = 'RECORDATORIO';
  }

  _registrarAtencion() {
    this._t(3, 36, 37);
    this.cita.actualizarEstado('ATENDIDA');
    this._t(3, 38, 39);
    this._avisar(this.lead.asesor, 'Cita atendida');
    this.fase = 'CITA_ATENDIDA';
  }

  _registrarDocumentos() {
    const s = this.solicitud;
    this._t(3, 40, 41);
    this.lead.lineaCredito.requisitosPara(this.prospecto.condicionSocio).forEach((documento) => s.registrarDocumento(documento));
    this._t(3, 42, 43);
    s.actualizarEstado('EN_RESOLUCION');
    this._t(3, 44, 45);
    this._avisar(this.col.comite, `Solicitud completa ${this.lead.numeroSeguimiento}`);
    this.fase = 'EN_COMITE';
  }

  _resolver(estado) {
    this._t(3, 46, 47);
    this.solicitud.actualizarEstado(estado);
    this._t(3, 48, 49);
    this._avisar(this.lead.asesor, `Resolución del crédito: ${estado}`);
    this.fase = 'RESUELTA';
  }

  _motivoDePerdida() {
    if (this.fase === 'SIN_RESPUESTA') return 'No responde a las reactivaciones';
    if (this.solicitud && this.solicitud.estado === 'NEGADA') return 'Crédito negado por el Comité de crédito';
    return 'El prospecto desiste';
  }

  _cerrar(estado, motivo) {
    const lead = this.lead;
    this._t(3, 50, 51);
    lead.actualizarEstado(estado, motivo);
    this._t(3, 52, 53);
    try {
      lead.vincularCRM(this.crm.sincronizarLead(lead));
      this._t(3, 54);
    } catch (error) {
      this._regla('F3:53', 'El CRM sigue sin responder: el estado final queda pendiente de sincronizar.');
    }
    this._t(3, 55);
    this._avisar(lead.asesor, `Lead cerrado: ${estado}`);
    this.fase = 'CERRADO';
  }
}

// Arma July con su configuración, sus canales y sus sistemas simulados.
class Sesion {
  constructor(escenario = {}, oyente = () => {}) {
    this.escenario = { ...ESCENARIO_BASE, ...escenario };
    const rol = (nombre) => this.colaboradores.find((colaborador) => colaborador.rol === nombre);
    const meta = (publicadoPor) => ({ version: DATOS.version, publicadoPor });

    this.colaboradores = DATOS.colaboradores.map((datos) => new Colaborador(datos));
    const col = {
      marketing: rol('MARKETING'),
      administrador: rol('ADMINISTRADOR'),
      productos: rol('PRODUCTOS_CREDITO'),
      comite: rol('COMITE_CREDITO'),
      jefe: rol('JEFE_COMERCIAL'),
      agencia: rol('AGENCIA'),
      proteccion: rol('PROTECCION_DATOS'),
    };

    LineaCredito.catalogo = DATOS.lineas.map((datos) => new LineaCredito({ ...datos, ...meta(col.productos), requisitosAfiliacion: DATOS.requisitosAfiliacion }));
    PlantillaMensaje.lista = DATOS.plantillas.map((datos) => new PlantillaMensaje({ ...datos, ...meta(col.administrador) }));
    const regla = (tipo) => new ReglaNegocio({ tipo, parametros: DATOS.reglas[tipo], ...meta(tipo === 'PRECALIFICACION' ? col.comite : col.jefe) });

    col.administrador.publicaciones = {
      BIENVENIDA: [PlantillaMensaje.delTipo('BIENVENIDA'), PlantillaMensaje.delTipo('AVISO_PRIVACIDAD')],
      MENU: [PlantillaMensaje.delTipo('MENU')],
      MENU_BASICO: [PlantillaMensaje.delTipo('MENU_BASICO')],
    };
    col.productos.publicaciones = { CATALOGO: LineaCredito.catalogo };
    col.comite.publicaciones = { PRECALIFICACION: [regla('PRECALIFICACION')] };
    col.jefe.publicaciones = { PRIORIDAD: [regla('PRIORIDAD')], ENRUTAMIENTO: [regla('ENRUTAMIENTO')] };
    col.agencia.agenda = (agencia, desde, hasta) => this._agenda(desde, hasta);

    const web = this.escenario.canal === 'WEB';
    this.prospecto = new Prospecto({ telefono: web ? null : this.escenario.telefono });
    this.prospecto.alRecibir = (mensaje) => oyente('mensaje', mensaje);
    this.conversacion = new Conversacion({ prospecto: this.prospecto, canal: this.escenario.canal });
    this.asesores = DATOS.asesores.map((datos) => new AsesorComercial(datos));
    this.canal = new Canal({ tipo: this.escenario.canal, credencial: 'clave-simulada' });
    this.crm = new CRMCooperativa({ escenario: this.escenario });
    this.july = new July({
      canal: this.canal,
      core: new SistemaCore({ registros: DATOS.core, escenario: this.escenario }),
      crm: this.crm,
      colaboradores: col,
      asesores: this.asesores,
      conversacion: this.conversacion,
      escenario: this.escenario,
      oyente,
    });
    this.canal.july = this.july;
    if (web) this.july.abrirWidget();
  }

  _agenda(desde, hasta) {
    const dia = 86400000;
    if (this.escenario.sinHorarios && hasta - desde <= 4 * dia) return [];
    const horarios = [];
    for (let t = desde.getTime(); t <= hasta.getTime(); t += dia) {
      const fecha = new Date(t);
      if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;
      [9, 11, 15].forEach((hora) => {
        const horario = new Date(fecha);
        horario.setHours(hora, 0, 0, 0);
        horarios.push(horario);
      });
    }
    return horarios;
  }

  escribir(texto) {
    this.canal.recibir(new Mensaje({ emisor: 'PROSPECTO', contenido: texto }));
  }

  enviarFirmaFalsa(texto) {
    const mensaje = new Mensaje({ emisor: 'PROSPECTO', contenido: texto, firma: 'firma-falsa' });
    this.july.atender(mensaje);
  }

  accion(id) {
    if (id === 'VENCER_ATENCION') this.july.vencerPlazo('ATENCION_ASESOR');
    else if (id === 'VENCER_RECORDATORIO') this.july.vencerPlazo('RECORDATORIO');
    else this.july.atender(new Mensaje({ emisor: 'ASESOR', tipo: 'AVISO', contenido: id }));
  }

  asesorEscribe(texto) {
    this.july._decir(texto, { emisor: 'ASESOR' });
    this.july.oyente('cambio');
  }
}
