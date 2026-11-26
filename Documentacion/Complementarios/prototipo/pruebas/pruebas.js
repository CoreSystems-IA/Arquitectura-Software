#!/usr/bin/env node
// Corre los guiones de js/guiones.js contra July y comprueba la matemática de NEG-01.
// Al final informa qué pasos de CU-08 recorrió cada corrida. Uso: node pruebas/pruebas.js

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const raiz = path.join(__dirname, '..');
['pasos', 'datos', 'dominio', 'sistemas', 'july', 'guiones'].forEach((archivo) => {
  vm.runInThisContext(fs.readFileSync(path.join(raiz, 'js', `${archivo}.js`), 'utf8'), { filename: `${archivo}.js` });
});
const { PASOS, GUIONES, Sesion, Simulacion, cedulaTieneFormatoValido } = vm.runInThisContext(
  '({ PASOS, GUIONES, Sesion, Simulacion, cedulaTieneFormatoValido })',
);

let fallas = 0;
const recorridos = new Set();

function prueba(nombre, cuerpo) {
  try {
    cuerpo();
    console.log(`  ok    ${nombre}`);
  } catch (error) {
    fallas += 1;
    console.log(`  FALLA ${nombre}\n        ${error.message}`);
  }
}

function correr(guion) {
  const mensajes = [];
  const sesion = new Sesion({ ...guion.escenario }, (evento, datos) => {
    if (evento === 'traza' && datos.clave.startsWith('F')) recorridos.add(datos.clave);
    if (evento === 'mensaje') mensajes.push(datos);
  });
  guion.pasos.forEach((paso) => {
    if (typeof paso === 'string') sesion.escribir(paso);
    else if (paso.accion) {
      const permitidas = sesion.july.acciones().map((accion) => accion.id);
      assert.ok(permitidas.includes(paso.accion), `«${paso.accion}» no está disponible en la fase ${sesion.july.fase} (${permitidas})`);
      sesion.accion(paso.accion);
    } else if (paso.abandono) sesion.july.vencerPlazo('RESPUESTA_PROSPECTO');
    else sesion.escribir(mensajes[mensajes.length - 1].opciones[paso.opcion]);
  });
  return { sesion, mensajes };
}

function comprobar({ sesion, mensajes }, espera) {
  const { july, prospecto, conversacion } = sesion;
  const { lead, solicitud } = july;
  const textos = mensajes.map((mensaje) => mensaje.contenido).join('\n');
  assert.ok(!/undefined|NaN|null/.test(textos), 'Un mensaje muestra un valor vacío');
  if (espera.resultado) assert.equal(solicitud.resultado, espera.resultado);
  if (espera.prioridad) assert.equal(lead.prioridad, espera.prioridad);
  if (espera.estadoLead) assert.equal(lead.estado, espera.estadoLead);
  if (espera.cuota) assert.equal(solicitud.simulacionElegida.cuotaMensual, espera.cuota);
  if (espera.plazo) assert.equal(solicitud.simulacionElegida.plazo, espera.plazo);
  if (espera.condicion) assert.equal(prospecto.condicionSocio, espera.condicion);
  if (espera.consentimiento === false) assert.equal(prospecto.consentimientoAceptado, false);
  if (espera.sinLead) assert.equal(lead, null);
  if (espera.sinCRM) assert.equal(lead.idCRM, null);
  if (espera.idCRM) assert.equal(lead.idCRM, espera.idCRM);
  if (espera.estadoConversacion) assert.equal(conversacion.estado, espera.estadoConversacion);
}

console.log('\nMatemática de NEG-01');
const simulacionDe = (monto, plazo, tasa) => new Simulacion({ solicitud: { lead: { lineaCredito: null } }, monto, plazo, tasa });
prueba('5 000 USD a 24 meses al 18 %: cuota de 249,62 y total de 5 990,89', () => {
  const s = simulacionDe(5000, 24, 18);
  assert.equal(s.cuotaMensual, 249.62);
  assert.equal(s.totalPagar, 5990.89);
});
prueba('5 000 USD a 36 meses al 18 %: cuota de 180,76', () => assert.equal(simulacionDe(5000, 36, 18).cuotaMensual, 180.76));
prueba('Tasa efectiva del 18 % nominal: 19,56 %', () => assert.equal(simulacionDe(5000, 24, 18).tasaEfectiva, 19.56));
prueba('Tabla de 1 200 USD a 6 meses: la primera fila y el saldo final', () => {
  const tabla = simulacionDe(1200, 6, 18).generarTablaAmortizacion();
  assert.deepEqual(tabla[0], { numero: 1, cuota: 210.63, capital: 192.63, interes: 18, saldo: 1007.37 });
  assert.equal(tabla[5].saldo, 0);
});
prueba('Cédula: módulo 10', () => {
  ['1111111116', '2222222222', '1212121212', '0303030308'].forEach((cedula) => assert.ok(cedulaTieneFormatoValido(cedula), cedula));
  ['1234567890', '9911111116', '111111111', '1191111116'].forEach((cedula) => assert.ok(!cedulaTieneFormatoValido(cedula), cedula));
});

console.log('\nGuiones de CU-08');
GUIONES.forEach((guion) => prueba(guion.nombre, () => comprobar(correr(guion), guion.espera)));

prueba('Una firma falsa no abre la conversación (flujo 1, A3)', () => {
  const sesion = new Sesion({}, (evento, datos) => {
    if (evento === 'traza' && datos.clave.startsWith('F')) recorridos.add(datos.clave);
  });
  sesion.enviarFirmaFalsa('Hola');
  assert.equal(sesion.conversacion.estado, null);
});

const todos = Object.keys(PASOS);
const faltan = todos.filter((clave) => !recorridos.has(clave));
console.log(`\nCobertura de CU-08: ${recorridos.size} de ${todos.length} pasos`);
if (faltan.length) console.log(`Sin recorrer: ${faltan.join(', ')}`);
console.log(fallas ? `\n${fallas} prueba(s) fallaron.\n` : '\nTodas las pruebas pasaron.\n');
process.exit(fallas ? 1 : 0);
