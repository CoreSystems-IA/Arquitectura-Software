// Clases «interfaz» de CLS-01, simuladas: en el prototipo no hay conexión real con WhatsApp, el core ni el CRM.

class Canal {
  constructor({ tipo, credencial, july = null }) {
    this.tipo = tipo;
    this.credencial = credencial;
    this.july = july;
    this.token = null;
  }

  firmar(mensaje) {
    return `${this.credencial}:${mensaje.contenido.length}`;
  }

  recibir(mensaje) {
    mensaje.firma = this.tipo === 'WEB' ? this.token : this.firmar(mensaje);
    this.july.atender(mensaje);
  }

  verificarAutenticidad(mensaje) {
    return this.tipo === 'WEB' ? mensaje.firma === this.token : mensaje.firma === this.firmar(mensaje);
  }

  enviar(mensaje) {
    this.july.prospecto.recibir(mensaje);
  }

  abrirSesion(paginaOrigen) {
    this.token = `web-${paginaOrigen.length}-${Date.now()}`;
    return this.token;
  }
}

class SistemaCore {
  constructor({ registros, escenario }) {
    this.urlServicio = 'simulado://core';
    this.tiempoMaximoRespuesta = 3;
    this.registros = registros;
    this.escenario = escenario;
  }

  validarCedula(cedula) {
    return !this.registros.cedulasNoHabilitadas.includes(cedula);
  }

  consultarSocio(prospecto) {
    if (this.escenario.coreNoResponde) {
      prospecto.condicionSocio = 'POR_VERIFICAR';
      return prospecto.condicionSocio;
    }
    const socio = this.registros.socios.find((registro) => (
      prospecto.cedula ? registro.cedula === prospecto.cedula : registro.telefono === prospecto.telefono
    ));
    if (!socio) {
      prospecto.condicionSocio = 'NO_SOCIO';
      return prospecto.condicionSocio;
    }
    Object.assign(prospecto, {
      nombres: prospecto.nombres || socio.nombres,
      cedula: socio.cedula,
      correo: prospecto.correo || socio.correo,
      fechaIngresoSocio: socio.fechaIngresoSocio,
      edad: socio.edad,
      actividadRegistrada: socio.actividadRegistrada,
      condicionSocio: 'SOCIO',
    });
    return prospecto.condicionSocio;
  }
}

class CRMCooperativa {
  constructor({ escenario }) {
    this.urlServicio = 'simulado://crm';
    this.maxIntentos = 3;
    this.escenario = escenario;
    this.registros = new Map();
  }

  buscarLead(cedula, telefono) {
    if (this.escenario.crmDuplicado && !this.registros.size) return 'CRM-PREVIO-0042';
    const previo = [...this.registros.values()].find((lead) => (
      lead.prospecto.cedula === cedula || lead.prospecto.telefono === telefono
    ));
    return previo ? previo.idCRM : null;
  }

  sincronizarLead(lead) {
    if (this.escenario.crmFalla) throw new Error(`CRM sin respuesta tras ${this.maxIntentos} intentos`);
    const idCRM = lead.idCRM || `CRM-${String(this.registros.size + 1).padStart(4, '0')}`;
    this.registros.set(idCRM, lead);
    return idCRM;
  }
}
