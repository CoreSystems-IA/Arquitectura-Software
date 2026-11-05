// Pantalla del prototipo: el chat del prospecto y el panel con lo que pasa por dentro.

const ETAPAS_VALOR = [
  ['1.1', 'Canales de contacto'], ['1.2', 'Primer contacto'], ['2.1', 'Perfilamiento'], ['2.2', 'Simulación financiera'],
  ['2.3', 'Precalificación'], ['3.1', 'Entrega de oportunidades'], ['3.2', 'Asignación y seguimiento'],
];

const INTERRUPTORES = [
  ['picoDemanda', 'Pico de demanda', 'La conversación pasa a la cola (flujo 1, A4)'],
  ['coreNoResponde', 'El Sistema core no responde', 'La condición queda por verificar (flujo 1, A9)'],
  ['lineaNoVigente', 'La próxima línea elegida sale de vigencia', 'Flujo 2, A8'],
  ['sinHorarios', 'Agenda sin horarios en la fecha pedida', 'Flujo 2, A14'],
  ['crmFalla', 'El CRM falla tras los reintentos', 'Flujo 3, A3'],
  ['crmDuplicado', 'El lead ya existe en el CRM', 'Flujo 3, A2'],
];

const SUGERENCIAS = ['Hola, necesito un crédito para mi negocio', 'Hola', '¿Dónde están ubicados?'];
const RETARDO_LECTURA = 22;

const $ = (selector) => document.querySelector(selector);

function crear(etiqueta, clase, texto) {
  const nodo = document.createElement(etiqueta);
  if (clase) nodo.className = clase;
  if (texto !== undefined) nodo.textContent = texto;
  return nodo;
}

// Convierte **texto** en negrita sin usar innerHTML.
function conNegritas(nodo, texto) {
  texto.split('**').forEach((parte, i) => {
    nodo.append(i % 2 ? crear('strong', '', parte) : document.createTextNode(parte));
  });
  return nodo;
}

const movimientoReducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esperar = (ms) => new Promise((resolver) => { setTimeout(resolver, ms); });

const estado = {
  sesion: null,
  generacion: 0,
  cola: [],
  procesando: false,
  esperas: [],
  reproduciendo: false,
  inicioPrimerMensaje: null,
  primeraRespuesta: null,
  pasos: new Set(),
  etapaActual: -1,
  etapaMaxima: -1,
  configuracion: { ...ESCENARIO_BASE },
};

// --- Sesión y cola de eventos ---

function iniciarSesion(opciones = {}) {
  estado.generacion += 1;
  estado.cola = [];
  estado.procesando = false;
  estado.esperas.splice(0).forEach((resolver) => resolver());
  estado.inicioPrimerMensaje = null;
  estado.primeraRespuesta = null;
  estado.pasos = new Set();
  estado.etapaActual = -1;
  estado.etapaMaxima = -1;
  estado.configuracion = { ...estado.configuracion, ...opciones };
  $('#mensajes').replaceChildren();
  $('#traza').replaceChildren(crear('li', 'traza__vacia', 'Aquí aparece cada paso de CU-08 a medida que July lo ejecuta.'));
  estado.sesion = new Sesion({ ...estado.configuracion }, recibirEvento);
  $('#canal-activo').textContent = estado.configuracion.canal === 'WEB' ? 'Widget web' : 'WhatsApp';
  mostrarInicio();
  sincronizarEscenarios();
  pintarPanel();
}

function recibirEvento(tipo, datos) {
  estado.cola.push({ tipo, datos });
  if (!estado.procesando) procesarCola();
}

async function procesarCola() {
  const generacion = estado.generacion;
  estado.procesando = true;
  while (estado.cola.length && generacion === estado.generacion) {
    const { tipo, datos } = estado.cola.shift();
    if (tipo === 'traza') agregarPaso(datos);
    if (tipo === 'cambio') pintarPanel();
    if (tipo === 'mensaje') await mostrarConRetardo(datos, generacion);
  }
  if (generacion !== estado.generacion) return;
  estado.procesando = false;
  pintarPanel();
  estado.esperas.splice(0).forEach((resolver) => resolver());
}

function colaVacia() {
  if (!estado.procesando && !estado.cola.length) return Promise.resolve();
  return new Promise((resolver) => { estado.esperas.push(resolver); });
}

async function mostrarConRetardo(mensaje, generacion) {
  if (!movimientoReducido()) {
    const indicador = crear('div', 'burbuja burbuja--july escribiendo');
    indicador.setAttribute('aria-hidden', 'true');
    indicador.append(crear('span'), crear('span'), crear('span'));
    agregarAlChat(indicador);
    await esperar(Math.min(1100, 320 + mensaje.contenido.length * RETARDO_LECTURA / 3));
    indicador.remove();
    if (generacion !== estado.generacion) return;
  }
  if (estado.inicioPrimerMensaje && estado.primeraRespuesta === null) {
    estado.primeraRespuesta = (Date.now() - estado.inicioPrimerMensaje) / 1000;
  }
  agregarMensaje(mensaje);
}

// --- Chat ---

function agregarAlChat(nodo) {
  const contenedor = $('#mensajes');
  contenedor.append(nodo);
  contenedor.scrollTop = contenedor.scrollHeight;
}

function quitarOpciones() {
  document.querySelectorAll('#mensajes .opciones, #mensajes .inicio').forEach((nodo) => nodo.remove());
}

function mostrarInicio() {
  const inicio = crear('div', 'inicio');
  inicio.append(crear('h2', '', 'Habla con July'), crear('p', '', 'Escribe como lo haría un prospecto, o abre Escenarios para ver un recorrido guiado.'));
  inicio.append(crearOpciones(SUGERENCIAS));
  agregarAlChat(inicio);
}

function crearOpciones(opciones) {
  const contenedor = crear('div', 'opciones');
  opciones.forEach((opcion) => {
    const boton = crear('button', 'opcion', opcion);
    boton.type = 'button';
    boton.addEventListener('click', () => enviarTexto(opcion));
    contenedor.append(boton);
  });
  return contenedor;
}

function agregarMensaje(mensaje) {
  const clase = { JULY: 'july', ASESOR: 'asesor', PROSPECTO: 'prospecto' }[mensaje.emisor];
  const burbuja = crear('div', `burbuja burbuja--${clase}`);
  if (mensaje.emisor === 'ASESOR') burbuja.append(crear('span', 'burbuja__etiqueta', 'Asesor comercial'));
  if (mensaje.tipo === 'PLANTILLA') burbuja.append(crear('span', 'burbuja__etiqueta burbuja__etiqueta--plantilla', 'Plantilla aprobada'));
  conNegritas(burbuja, mensaje.contenido);
  quitarOpciones();
  agregarAlChat(burbuja);
  if (mensaje.tarjeta) agregarAlChat(crearTarjeta(mensaje.tarjeta));
  if (mensaje.opciones.length) agregarAlChat(crearOpciones(mensaje.opciones));
}

function crearFilas(filas, total) {
  const lista = crear('dl', 'tarjeta__filas');
  filas.forEach(([clave, valor]) => {
    const fila = crear('div');
    fila.append(crear('dt', '', clave), crear('dd', '', valor));
    lista.append(fila);
  });
  if (total) {
    const fila = crear('div', 'tarjeta__total');
    fila.append(crear('dt', '', total[0]), crear('dd', '', total[1]));
    lista.append(fila);
  }
  return lista;
}

function crearTablaAmortizacion(tabla) {
  const detalle = crear('details');
  detalle.append(crear('summary', '', 'Ver tabla de amortización'));
  const contenedor = crear('div', 'tabla-amortizacion');
  contenedor.tabIndex = 0;
  const elemento = crear('table');
  const cabecera = crear('tr');
  ['N.º', 'Cuota', 'Capital', 'Interés', 'Saldo'].forEach((titulo) => {
    const celda = crear('th', '', titulo);
    celda.scope = 'col';
    cabecera.append(celda);
  });
  const cabeceraTabla = crear('thead');
  cabeceraTabla.append(cabecera);
  const cuerpo = crear('tbody');
  const numero = (valor) => valor.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  tabla.forEach((fila) => {
    const tr = crear('tr');
    tr.append(crear('td', '', fila.numero), crear('td', '', numero(fila.cuota)), crear('td', '', numero(fila.capital)), crear('td', '', numero(fila.interes)), crear('td', '', numero(fila.saldo)));
    cuerpo.append(tr);
  });
  elemento.append(cabeceraTabla, cuerpo);
  contenedor.append(elemento);
  detalle.append(contenedor);
  return detalle;
}

function crearTarjeta(datos) {
  const tarjeta = crear('div', 'tarjeta');
  if (datos.tipo === 'filas') {
    tarjeta.append(crear('h3', 'tarjeta__titulo', datos.titulo), crearFilas(datos.filas, datos.total));
  }
  if (datos.tipo === 'lista') {
    const lista = crear('ul', 'tarjeta__lista');
    datos.elementos.forEach((elemento) => lista.append(crear('li', '', elemento)));
    tarjeta.append(crear('h3', 'tarjeta__titulo', datos.titulo), lista);
  }
  if (datos.tipo === 'simulacion') {
    const cuota = crear('div', 'cuota');
    cuota.append(crear('span', 'cuota__rotulo', 'Cuota mensual fija'), crear('span', 'cuota__valor', dinero(datos.cuota)));
    tarjeta.append(cuota, crearFilas([
      ['Línea', datos.linea],
      ['Monto', dinero(datos.monto)],
      ['Plazo', `${datos.plazo} meses`],
      ['Tasa nominal anual', `${datos.tasa} %`],
      ['Tasa efectiva anual', `${datos.tasaEfectiva.toLocaleString('es-EC')} %`],
    ]), crearTablaAmortizacion(datos.tabla));
  }
  if (datos.tipo === 'comparacion') {
    const rejilla = crear('div', 'comparacion');
    datos.opciones.forEach((opcion) => {
      const columna = crear('div');
      columna.append(
        crear('h3', '', opcion.nombre),
        crear('strong', '', dinero(opcion.cuota)),
        crear('p', '', `${dinero(opcion.monto)} a ${opcion.plazo} meses`),
        crear('p', '', `Total: ${dinero(opcion.total)}`),
      );
      rejilla.append(columna);
    });
    tarjeta.append(rejilla);
  }
  if (datos.tipo === 'resultado') {
    tarjeta.classList.add(`resultado--${datos.resultado}`);
    const lista = crear('ul', 'tarjeta__lista');
    datos.factores.forEach((factor) => lista.append(crear('li', '', factor)));
    if (datos.condicionado) lista.append(crear('li', '', 'Calculado solo con los datos que declaraste.'));
    tarjeta.append(
      crear('div', 'resultado__cabecera', `Precalificación: ${datos.etiqueta}`),
      crear('p', 'resultado__motivo', datos.motivo),
      lista,
      crear('p', 'resultado__nota', datos.nota),
    );
  }
  return tarjeta;
}

function enviarTexto(texto) {
  const limpio = texto.trim();
  if (!limpio) return;
  if (!estado.inicioPrimerMensaje) estado.inicioPrimerMensaje = Date.now();
  quitarOpciones();
  agregarMensaje(new Mensaje({ emisor: 'PROSPECTO', contenido: limpio }));
  estado.sesion.escribir(limpio);
}

// --- Recorrido ---

function agregarPaso(paso) {
  const lista = $('#traza');
  lista.querySelector('.traza__vacia')?.remove();
  const esRegla = !paso.cu;
  const esRetorno = !esRegla && !paso.metodo;
  const clases = ['paso'];
  if (esRetorno) clases.push('paso--retorno');
  else if (esRegla) clases.push('paso--regla');
  else if (paso.alternativo) clases.push('paso--alterno');

  const nodo = crear('li', clases.join(' '));
  nodo.append(crear('span', 'paso__clave', paso.clave.replace(':', '·')));
  if (esRetorno) {
    nodo.append(crear('span', '', `↩ ${paso.oracion}`));
  } else {
    nodo.append(crear('span', 'paso__metodo', paso.metodo || 'Regla transversal'));
    const oracion = crear('span', 'paso__oracion', `${paso.oracion} `);
    if (paso.cu) oracion.append(crear('span', 'paso__cu', `CU ${paso.cu}${paso.alternativo ? ` · ${paso.alternativo}` : ''}`));
    nodo.append(oracion);
  }
  lista.append(nodo);
  lista.scrollTop = lista.scrollHeight;

  if (paso.cu) {
    estado.pasos.add(paso.clave);
    const indice = ETAPAS_VALOR.findIndex(([prefijo]) => paso.cu.startsWith(prefijo));
    estado.etapaActual = indice;
    estado.etapaMaxima = Math.max(estado.etapaMaxima, indice);
  }
  pintarRecorrido();
}

function pintarRecorrido() {
  $('#etapas').replaceChildren(...ETAPAS_VALOR.map(([, nombre], i) => {
    let clase = 'etapa';
    if (i === estado.etapaActual) clase += ' etapa--actual';
    else if (i <= estado.etapaMaxima) clase += ' etapa--hecha';
    const nodo = crear('li', clase, nombre);
    if (i === estado.etapaActual) nodo.setAttribute('aria-current', 'step');
    return nodo;
  }));
  const segundos = estado.primeraRespuesta;
  $('#metrica-respuesta').textContent = segundos === null ? '—' : `${segundos.toLocaleString('es-EC', { maximumFractionDigits: 1 })} s`;
  $('#metrica-pasos').textContent = estado.pasos.size;
  const { lead } = estado.sesion.july;
  $('#metrica-lead').textContent = lead ? lead.estado.replace('_', ' ') : 'Sin lead';
  $('#metrica-prioridad').textContent = lead && lead.prioridad ? `prioridad ${lead.prioridad}` : 'sin prioridad';
}

// --- Datos ---

function crearEntidad(titulo, estadoEntidad, filas) {
  const tarjeta = crear('article', 'entidad');
  const cabecera = crear('div', 'entidad__cabecera');
  cabecera.append(crear('h2', '', titulo));
  if (estadoEntidad) cabecera.append(crear('span', 'pastilla', estadoEntidad));
  tarjeta.append(cabecera);
  const lista = crear('dl');
  filas.forEach(([clave, valor]) => {
    const fila = crear('div');
    fila.append(crear('dt', '', clave), crear('dd', '', valor ?? '—'));
    lista.append(fila);
  });
  tarjeta.append(lista);
  return tarjeta;
}

function pintarDatos() {
  const { sesion } = estado;
  const { july, prospecto: p, conversacion: c } = sesion;
  const { lead, solicitud: s, cita } = july;
  const elegida = s && s.simulacionElegida;
  const rejilla = crear('div', 'rejilla');
  rejilla.append(
    crearEntidad('Prospecto', p.condicionSocio, [
      ['nombres', p.nombres], ['cedula', p.cedula], ['telefono', p.telefono], ['correo', p.correo], ['edad', p.edad],
      ['consentimientoAceptado', String(p.consentimientoAceptado)], ['versionAviso', p.versionAviso],
    ]),
    crearEntidad('Conversacion', c.estado, [
      ['canal', c.canal], ['campana', c.campana], ['tokenSesion', c.tokenSesion ? 'emitido' : null], ['ultimoPaso', c.ultimoPaso],
      ['asesorAsignado', c.asesorAsignado && c.asesorAsignado.nombre], ['historial', `${c.historial.length} mensajes`],
    ]),
  );
  if (lead) {
    rejilla.append(crearEntidad('Lead', lead.estado, [
      ['numeroSeguimiento', lead.numeroSeguimiento], ['lineaCredito', lead.lineaCredito.nombre], ['necesidad', lead.necesidad],
      ['prioridad', lead.prioridad], ['asesor', lead.asesor && lead.asesor.nombre], ['intentosReactivacion', lead.intentosReactivacion],
      ['idCRM', lead.idCRM], ['motivoCierre', lead.motivoCierre],
    ]));
  }
  if (s) {
    rejilla.append(crearEntidad('SolicitudCredito', s.estado, [
      ['monto', s.monto && dinero(s.monto)], ['plazo', s.plazo && `${s.plazo} meses`], ['destino', s.destino],
      ['ingresosMensuales', s.ingresosMensuales && dinero(s.ingresosMensuales)], ['actividadEconomica', s.actividadEconomica],
      ['capacidadPago', s.capacidadPago && dinero(s.capacidadPago)], ['resultado', s.resultado],
      ['resultadoCondicionado', String(s.resultadoCondicionado)], ['numeroCasoRevision', s.numeroCasoRevision],
    ]));
  }
  if (elegida) {
    rejilla.append(crearEntidad('Simulacion elegida', null, [
      ['monto', dinero(elegida.monto)], ['plazo', `${elegida.plazo} meses`], ['tasa', `${elegida.tasa} %`], ['cuotaMensual', dinero(elegida.cuotaMensual)],
      ['intereses', dinero(elegida.intereses)], ['totalPagar', dinero(elegida.totalPagar)],
    ]));
  }
  if (cita) {
    rejilla.append(crearEntidad('Cita', cita.estado, [
      ['agencia', cita.agencia], ['fechaHora', fechaLegible(cita.fechaHora)],
      ['fechaRecordatorio', cita.fechaRecordatorio && fechaLegible(cita.fechaRecordatorio)],
    ]));
  }
  $('#datos').replaceChildren(rejilla);
}

// --- Cooperativa ---

function crearAccion(accion) {
  const fila = crear('div', 'accion');
  const texto = crear('div');
  texto.append(crear('span', 'accion__rol', accion.rol), crear('span', 'accion__texto', accion.etiqueta));
  const boton = crear('button', `boton ${accion.secundaria ? 'boton--borde' : 'boton--verde'}`, 'Ejecutar');
  boton.type = 'button';
  boton.dataset.accion = accion.id;
  boton.setAttribute('aria-label', accion.etiqueta);
  boton.disabled = estado.reproduciendo;
  boton.addEventListener('click', () => estado.sesion.accion(accion.id));
  fila.append(texto, boton);
  return fila;
}

function crearConversacionAsesor(c) {
  const bloque = crear('section', 'bloque');
  bloque.append(crear('h2', '', `Conversación con ${c.asesorAsignado.nombre}`));
  const historial = crear('div', 'historial');
  const nombres = { PROSPECTO: 'Prospecto', JULY: 'July', ASESOR: 'Asesor' };
  c.historial.forEach((mensaje) => {
    const parrafo = crear('p');
    parrafo.append(crear('b', '', `${nombres[mensaje.emisor]}: `), mensaje.contenido.replaceAll('**', ''));
    historial.append(parrafo);
  });
  const formulario = crear('form', 'responder');
  const entrada = crear('input');
  entrada.placeholder = 'Responder como asesor…';
  entrada.setAttribute('aria-label', 'Responder como asesor');
  const boton = crear('button', 'boton', 'Enviar');
  formulario.append(entrada, boton);
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!entrada.value.trim()) return;
    estado.sesion.asesorEscribe(entrada.value.trim());
  });
  bloque.append(historial, formulario);
  requestAnimationFrame(() => { historial.scrollTop = historial.scrollHeight; });
  return bloque;
}

function pintarCooperativa() {
  const { sesion } = estado;
  const { july, conversacion: c } = sesion;
  const { lead } = july;
  const acciones = july.acciones();
  const contenedor = crear('div');

  const pendientes = crear('section', 'bloque');
  pendientes.append(crear('h2', '', 'Qué sigue'));
  if (acciones.length) pendientes.append(...acciones.map(crearAccion));
  else {
    const textoFase = july.fase === 'CERRADO' ? `Lead cerrado como ${lead.estado}.` : 'Aquí aparece lo que le toca hacer a cada colaborador cuando un lead llega al flujo 3 o se pide un asesor.';
    pendientes.append(crear('p', 'entidad--vacia', textoFase));
  }
  contenedor.append(pendientes);

  if (lead && lead.ficha) {
    const ficha = crear('section', 'bloque');
    ficha.append(crear('h2', '', 'Ficha del prospecto'));
    const tarjeta = crear('article', 'entidad');
    const cabecera = crear('div', 'entidad__cabecera');
    cabecera.append(crear('h2', '', lead.asesor ? `Asignado a ${lead.asesor.nombre}` : 'Sin asignar'));
    if (lead.prioridad) cabecera.append(crear('span', `pastilla ${lead.prioridad === 'CALIENTE' ? 'pastilla--verde' : ''}`, lead.prioridad));
    const lista = crear('dl');
    lead.ficha.split('\n').forEach((fila) => {
      const [clave, valor] = fila.split(/: (.+)/);
      const nodo = crear('div');
      nodo.append(crear('dt', '', clave), crear('dd', '', valor));
      lista.append(nodo);
    });
    tarjeta.append(cabecera, lista);
    ficha.append(tarjeta);
    contenedor.append(ficha);
  }

  if (c.asesorAsignado) contenedor.append(crearConversacionAsesor(c));

  const avisos = [...sesion.colaboradores, ...sesion.asesores].flatMap((colaborador) => (
    colaborador.bandeja.filter((mensaje) => mensaje.tipo === 'AVISO').map((mensaje) => ({ colaborador, mensaje }))
  )).sort((a, b) => a.mensaje.idMensaje.localeCompare(b.mensaje.idMensaje));
  if (avisos.length) {
    const bloque = crear('section', 'bloque');
    bloque.append(crear('h2', '', 'Avisos que envió July'));
    const lista = crear('ul', 'avisos');
    avisos.forEach(({ colaborador, mensaje }) => {
      const fila = crear('li');
      fila.append(crear('strong', '', colaborador.nombre), crear('span', '', mensaje.contenido));
      lista.append(fila);
    });
    bloque.append(lista);
    contenedor.append(bloque);
  }

  const activo = document.activeElement;
  const respondiendo = activo && activo.closest('.responder') ? activo.value : null;
  $('#cooperativa').replaceChildren(contenedor);
  if (respondiendo) {
    const entrada = $('#cooperativa .responder input');
    if (entrada) entrada.focus();
  }
  const insignia = $('#pendientes');
  insignia.hidden = !acciones.length;
  insignia.textContent = acciones.length;
}

function pintarPanel() {
  pintarRecorrido();
  pintarDatos();
  pintarCooperativa();
  $('#evento-abandono').disabled = !estado.sesion.july.puedeAbandonar() || estado.reproduciendo;
}

// --- Escenarios y recorridos guiados ---

function sincronizarEscenarios() {
  const { configuracion } = estado;
  $('#opcion-canal').value = configuracion.canal;
  $('#opcion-telefono').value = configuracion.telefono;
  $('#opcion-campana').value = configuracion.campana;
  $('#opcion-telefono').disabled = configuracion.canal === 'WEB';
  INTERRUPTORES.forEach(([clave]) => { $(`#interruptor-${clave}`).checked = configuracion[clave]; });
  $('#evento-firma').disabled = configuracion.canal === 'WEB';
}

function pintarEscenarios() {
  const contenedor = $('#interruptores');
  INTERRUPTORES.forEach(([clave, titulo, detalle]) => {
    const etiqueta = crear('label');
    const casilla = crear('input');
    casilla.type = 'checkbox';
    casilla.id = `interruptor-${clave}`;
    casilla.addEventListener('change', () => {
      estado.configuracion[clave] = casilla.checked;
      estado.sesion.escenario[clave] = casilla.checked;
    });
    const texto = crear('span', '', titulo);
    texto.append(crear('small', '', detalle));
    etiqueta.append(casilla, texto);
    contenedor.append(etiqueta);
  });

  GUIONES.filter((guion) => guion.demo).forEach((guion) => {
    const fila = crear('li', 'guion');
    const texto = crear('div');
    texto.append(crear('strong', '', guion.nombre), crear('span', '', guion.descripcion));
    const boton = crear('button', 'boton boton--verde', 'Reproducir');
    boton.type = 'button';
    boton.dataset.guion = guion.id;
    boton.setAttribute('aria-label', `Reproducir: ${guion.nombre}`);
    boton.addEventListener('click', () => reproducir(guion));
    fila.append(texto, boton);
    $('#guiones').append(fila);
  });
}

function bloquearEntrada(bloqueado) {
  estado.reproduciendo = bloqueado;
  $('#entrada').disabled = bloqueado;
  document.querySelector('.enviar').disabled = bloqueado;
  document.querySelectorAll('#guiones button').forEach((boton) => { boton.disabled = bloqueado; });
  $('#entrada').placeholder = bloqueado ? 'Reproduciendo el recorrido…' : 'Escribe como lo haría un prospecto…';
}

async function reproducir(guion) {
  iniciarSesion({ ...ESCENARIO_BASE, ...guion.escenario });
  const generacion = estado.generacion;
  bloquearEntrada(true);
  mostrarVista('chat');
  activarPestana('recorrido');
  const pausa = movimientoReducido() ? 0 : 650;

  for (const paso of guion.pasos) {
    await colaVacia();
    await esperar(pausa);
    if (generacion !== estado.generacion) return;
    if (typeof paso === 'string') {
      activarPestana('recorrido');
      enviarTexto(paso);
    } else if (paso.accion) {
      activarPestana('cooperativa');
      await esperar(pausa);
      if (generacion !== estado.generacion) return;
      estado.sesion.accion(paso.accion);
    } else if (paso.opcion !== undefined) {
      const opciones = document.querySelectorAll('#mensajes .opcion');
      enviarTexto(opciones[paso.opcion].textContent);
    }
  }
  await colaVacia();
  if (generacion === estado.generacion) bloquearEntrada(false);
  pintarPanel();
}

// --- Navegación ---

function activarPestana(nombre) {
  document.querySelectorAll('.pestanas [role="tab"]').forEach((pestana) => {
    const activa = pestana.id === `tab-${nombre}`;
    pestana.setAttribute('aria-selected', String(activa));
    pestana.tabIndex = activa ? 0 : -1;
    document.getElementById(pestana.getAttribute('aria-controls')).hidden = !activa;
  });
}

function mostrarVista(vista) {
  $('.escritorio').dataset.vistaActiva = vista;
  document.querySelectorAll('[data-vista]').forEach((boton) => boton.setAttribute('aria-pressed', String(boton.dataset.vista === vista)));
}

function conectarEventos() {
  $('#redactor').addEventListener('submit', (evento) => {
    evento.preventDefault();
    const entrada = $('#entrada');
    enviarTexto(entrada.value);
    entrada.value = '';
  });

  $('#reiniciar').addEventListener('click', () => {
    bloquearEntrada(false);
    iniciarSesion();
  });

  const pestanas = [...document.querySelectorAll('.pestanas [role="tab"]')];
  pestanas.forEach((pestana, i) => {
    pestana.addEventListener('click', () => activarPestana(pestana.id.replace('tab-', '')));
    pestana.addEventListener('keydown', (evento) => {
      const paso = { ArrowRight: 1, ArrowLeft: -1 }[evento.key];
      if (!paso) return;
      const siguiente = pestanas[(i + paso + pestanas.length) % pestanas.length];
      siguiente.focus();
      siguiente.click();
    });
  });

  document.querySelectorAll('[data-vista]').forEach((boton) => {
    boton.addEventListener('click', () => mostrarVista(boton.dataset.vista));
  });

  [['#opcion-canal', 'canal'], ['#opcion-telefono', 'telefono'], ['#opcion-campana', 'campana']].forEach(([selector, clave]) => {
    $(selector).addEventListener('change', (evento) => {
      bloquearEntrada(false);
      iniciarSesion({ [clave]: evento.target.value });
    });
  });

  $('#evento-abandono').addEventListener('click', () => {
    estado.sesion.july.vencerPlazo('RESPUESTA_PROSPECTO');
    activarPestana('recorrido');
    mostrarVista('chat');
  });

  $('#evento-firma').addEventListener('click', () => {
    estado.sesion.enviarFirmaFalsa('Mensaje alterado');
    activarPestana('recorrido');
  });
}

pintarEscenarios();
conectarEventos();
iniciarSesion();
