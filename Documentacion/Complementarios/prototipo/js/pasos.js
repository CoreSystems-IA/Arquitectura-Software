// Generado por herramientas/generar-pasos.py desde CU-09 y CLS-01. No editar a mano.
const PASOS = {
 "F1:1": {
  "oracion": "Prospecto escribe el mensaje de la consulta a WhatsApp Business API.",
  "cu": "1.1.1.1",
  "alternativo": null,
  "metodo": "Canal.recibir(mensaje)"
 },
 "F1:2": {
  "oracion": "WhatsApp Business API notifica el mensaje con el webhook firmado a July.",
  "cu": "1.1.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F1:3": {
  "oracion": "July verifica la firma del mensaje con WhatsApp Business API.",
  "cu": "1.1.2.3",
  "alternativo": null,
  "metodo": "Canal.verificarAutenticidad(mensaje)"
 },
 "F1:4": {
  "oracion": "WhatsApp Business API devuelve la firma válida a July.",
  "cu": "1.1.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F1:5": {
  "oracion": "July registra el mensaje en formato común en la Conversación.",
  "cu": "1.1.2.1",
  "alternativo": null,
  "metodo": "Conversacion.registrarMensaje(mensaje)"
 },
 "F1:6": {
  "oracion": "Conversación devuelve la conversación abierta con su canal a July.",
  "cu": "1.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F1:7": {
  "oracion": "July etiqueta la campaña de origen en la Conversación.",
  "cu": "1.1.1.3",
  "alternativo": null,
  "metodo": "Conversacion.etiquetarOrigen(campana)"
 },
 "F1:8": {
  "oracion": "Conversación devuelve el origen etiquetado a July.",
  "cu": "1.1.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F1:9": {
  "oracion": "July envía el aviso del origen de la conversación al Equipo de marketing.",
  "cu": "1.1.1.3",
  "alternativo": null,
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F1:10": {
  "oracion": "Equipo de marketing devuelve el acuse del aviso a July.",
  "cu": "1.1.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F1:11": {
  "oracion": "July envía la respuesta inmediata a WhatsApp Business API.",
  "cu": "1.1.2.1",
  "alternativo": null,
  "metodo": "Canal.enviar(mensaje)"
 },
 "F1:12": {
  "oracion": "WhatsApp Business API entrega la respuesta inmediata al Prospecto.",
  "cu": "1.1.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:1a": {
  "oracion": "Prospecto abre la sesión de chat desde una página del sitio con el Widget web.",
  "cu": "1.1.1.2",
  "alternativo": "A1",
  "metodo": "Canal.abrirSesion(paginaOrigen)"
 },
 "F1:2a": {
  "oracion": "Widget web devuelve el token de la sesión de chat al Prospecto.",
  "cu": "1.1.1.2",
  "alternativo": "A1",
  "metodo": null
 },
 "F1:3a": {
  "oracion": "Prospecto escribe el mensaje de la consulta al Widget web.",
  "cu": "1.1.1.2",
  "alternativo": "A1",
  "metodo": "Canal.recibir(mensaje)"
 },
 "F1:4a": {
  "oracion": "Widget web entrega el mensaje con el token de la sesión a July.",
  "cu": "1.1.2.1",
  "alternativo": "A1",
  "metodo": "July.atender(mensaje)"
 },
 "F1:5a": {
  "oracion": "July verifica el token del mensaje con el Widget web.",
  "cu": "1.1.2.1",
  "alternativo": "A1",
  "metodo": "Canal.verificarAutenticidad(mensaje)"
 },
 "F1:6a": {
  "oracion": "Widget web devuelve el token válido a July. Continúa en el paso 5; las respuestas de los pasos 11 y 12 salen por el widget web.",
  "cu": "1.1.2.1",
  "alternativo": "A1",
  "metodo": null
 },
 "F1:7b": {
  "oracion": "July etiqueta el origen directo en la Conversación.",
  "cu": "1.1.1.3",
  "alternativo": "A2",
  "metodo": "Conversacion.etiquetarOrigen(campana)"
 },
 "F1:8b": {
  "oracion": "Conversación devuelve el origen directo a July. Continúa en el paso 9.",
  "cu": "1.1.1.3",
  "alternativo": "A2",
  "metodo": null
 },
 "F1:4c": {
  "oracion": "WhatsApp Business API devuelve la firma inválida a July.",
  "cu": "1.1.2.3",
  "alternativo": "A3",
  "metodo": null
 },
 "F1:5c": {
  "oracion": "July devuelve el error de integración por firma inválida a WhatsApp Business API. Fin.",
  "cu": "1.1.2.3",
  "alternativo": "A3",
  "metodo": null
 },
 "F1:11d": {
  "oracion": "July pone en espera el mensaje en la Conversación.",
  "cu": "1.1.2.2",
  "alternativo": "A4",
  "metodo": "Conversacion.encolar()"
 },
 "F1:12d": {
  "oracion": "Conversación devuelve el tiempo de espera estimado a July.",
  "cu": "1.1.2.2",
  "alternativo": "A4",
  "metodo": null
 },
 "F1:13d": {
  "oracion": "July envía el aviso del tiempo de espera a WhatsApp Business API.",
  "cu": "1.1.2.2",
  "alternativo": "A4",
  "metodo": "Canal.enviar(mensaje)"
 },
 "F1:14d": {
  "oracion": "WhatsApp Business API entrega el aviso del tiempo de espera al Prospecto. Continúa en el paso 13.",
  "cu": "1.1.2.2",
  "alternativo": "A4",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:13": {
  "oracion": "Prospecto envía el saludo inicial a July.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F1:14": {
  "oracion": "July consulta el guion de bienvenida vigente al Administrador del asistente.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F1:15": {
  "oracion": "Administrador del asistente devuelve el guion de bienvenida publicado a July.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F1:16": {
  "oracion": "July compone el saludo con el aviso de privacidad en la Plantilla de mensaje.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": "PlantillaMensaje.componer(datos)"
 },
 "F1:17": {
  "oracion": "Plantilla de mensaje devuelve el saludo con el aviso de privacidad a July.",
  "cu": "1.2.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F1:18": {
  "oracion": "July envía el saludo con el aviso de privacidad al Prospecto.",
  "cu": "1.2.1.2",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:19": {
  "oracion": "Prospecto acepta el aviso de privacidad a July.",
  "cu": "1.2.1.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F1:20": {
  "oracion": "July registra el consentimiento aceptado en el Prospecto.",
  "cu": "1.2.1.2",
  "alternativo": null,
  "metodo": "Prospecto.registrarConsentimiento(aceptado, versionAviso)"
 },
 "F1:21": {
  "oracion": "Prospecto devuelve el consentimiento registrado a July.",
  "cu": "1.2.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F1:22": {
  "oracion": "July consulta el menú de opciones vigente al Administrador del asistente.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F1:23": {
  "oracion": "Administrador del asistente devuelve el menú de opciones publicado a July.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F1:24": {
  "oracion": "July muestra el menú de opciones completo al Prospecto.",
  "cu": "1.2.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:25": {
  "oracion": "Prospecto describe la necesidad de crédito a July.",
  "cu": "1.2.2.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F1:26": {
  "oracion": "July busca la intención de crédito en la Línea de crédito.",
  "cu": "1.2.2.1",
  "alternativo": null,
  "metodo": "LineaCredito.buscar(criterio)"
 },
 "F1:27": {
  "oracion": "Línea de crédito devuelve la línea detectada a July.",
  "cu": "1.2.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F1:28": {
  "oracion": "July solicita la confirmación de la línea detectada al Prospecto.",
  "cu": "1.2.2.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:29": {
  "oracion": "Prospecto confirma la línea de crédito a July.",
  "cu": "1.2.2.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F1:30": {
  "oracion": "July consulta la condición de socio del prospecto al Sistema core.",
  "cu": "1.2.2.2",
  "alternativo": null,
  "metodo": "SistemaCore.consultarSocio(prospecto)"
 },
 "F1:31": {
  "oracion": "Sistema core devuelve la condición de socio y la fecha de ingreso a July.",
  "cu": "1.2.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F1:32": {
  "oracion": "July registra el lead con su línea y su necesidad en el Lead.",
  "cu": "1.2.2.3",
  "alternativo": null,
  "metodo": "Lead.registrar(prospecto, conversacion, linea, necesidad)"
 },
 "F1:33": {
  "oracion": "Lead devuelve el número de seguimiento a July.",
  "cu": "1.2.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F1:34": {
  "oracion": "July entrega el número de seguimiento del lead al Prospecto. Fin.",
  "cu": "1.2.2.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:19e": {
  "oracion": "Prospecto rechaza el aviso de privacidad a July.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": "July.atender(mensaje)"
 },
 "F1:20e": {
  "oracion": "July registra el consentimiento rechazado en el Prospecto.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": "Prospecto.registrarConsentimiento(aceptado, versionAviso)"
 },
 "F1:21e": {
  "oracion": "Prospecto devuelve el consentimiento registrado a July.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": null
 },
 "F1:22e": {
  "oracion": "July consulta el menú básico vigente al Administrador del asistente.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F1:23e": {
  "oracion": "Administrador del asistente devuelve el menú básico publicado a July.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": null
 },
 "F1:24e": {
  "oracion": "July muestra el menú básico de información general al Prospecto. Fin.",
  "cu": "1.2.1.2",
  "alternativo": "A5",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:25f": {
  "oracion": "Prospecto solicita hablar con un asesor a July.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "July.atender(mensaje)"
 },
 "F1:26f": {
  "oracion": "July envía la derivación con el historial de la conversación al Asesor comercial.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F1:27f": {
  "oracion": "Asesor comercial acepta la derivación a July.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "July.atender(mensaje)"
 },
 "F1:28f": {
  "oracion": "July traspasa la conversación con su historial en la Conversación.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "Conversacion.traspasar(asesor)"
 },
 "F1:29f": {
  "oracion": "Conversación devuelve la conversación derivada a July.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": null
 },
 "F1:30f": {
  "oracion": "July confirma el traspaso de la conversación al Asesor comercial.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F1:31f": {
  "oracion": "Asesor comercial envía el saludo del asesor al Prospecto. Fin.",
  "cu": "1.2.1.3",
  "alternativo": "A6",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:27g": {
  "oracion": "Línea de crédito devuelve la ausencia de coincidencia a July.",
  "cu": "1.2.2.1",
  "alternativo": "A7",
  "metodo": null
 },
 "F1:28g": {
  "oracion": "July ofrece las líneas de crédito como opciones cerradas al Prospecto. Continúa en el paso 29.",
  "cu": "1.2.2.1",
  "alternativo": "A7",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:26h": {
  "oracion": "July busca la respuesta a la pregunta frecuente en la Plantilla de mensaje.",
  "cu": "1.2.2.1",
  "alternativo": "A8",
  "metodo": "PlantillaMensaje.buscarRespuesta(texto)"
 },
 "F1:27h": {
  "oracion": "Plantilla de mensaje devuelve la respuesta frecuente a July.",
  "cu": "1.2.2.1",
  "alternativo": "A8",
  "metodo": null
 },
 "F1:28h": {
  "oracion": "July responde la pregunta frecuente al Prospecto. Fin.",
  "cu": "1.2.2.1",
  "alternativo": "A8",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F1:31i": {
  "oracion": "Sistema core devuelve la condición «por verificar» por tiempo agotado a July. Continúa en el paso 32.",
  "cu": "1.2.2.2",
  "alternativo": "A9",
  "metodo": null
 },
 "F1:30j": {
  "oracion": "July registra el lead con la condición «por verificar» en el Lead. Continúa en el paso 33.",
  "cu": "1.2.2.3",
  "alternativo": "A10",
  "metodo": "Lead.registrar(prospecto, conversacion, linea, necesidad)"
 },
 "F2:1": {
  "oracion": "Prospecto pide iniciar la solicitud de crédito a July.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:2": {
  "oracion": "July inicia la solicitud de crédito para la línea del lead en la Solicitud de crédito.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "SolicitudCredito.iniciar(lead)"
 },
 "F2:3": {
  "oracion": "Solicitud de crédito devuelve la solicitud abierta a July.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:4": {
  "oracion": "July consulta el campo pendiente en la Solicitud de crédito.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "SolicitudCredito.campoPendiente()"
 },
 "F2:5": {
  "oracion": "Solicitud de crédito devuelve el campo pendiente de monto, plazo y destino a July.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:6": {
  "oracion": "July solicita el monto, el plazo y el destino del crédito al Prospecto.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:7": {
  "oracion": "Prospecto indica el monto, el plazo y el destino del crédito a July.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:8": {
  "oracion": "July registra el monto, el plazo y el destino en la Solicitud de crédito.",
  "cu": "2.1.1.3",
  "alternativo": null,
  "metodo": "SolicitudCredito.registrarDato(campo, valor)"
 },
 "F2:9": {
  "oracion": "Solicitud de crédito devuelve el monto y el plazo válidos para la línea a July.",
  "cu": "2.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:10": {
  "oracion": "July guarda el avance de la conversación en la Conversación.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": "Conversacion.guardarAvance(paso)"
 },
 "F2:11": {
  "oracion": "Conversación devuelve el avance guardado a July.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:12": {
  "oracion": "July consulta el campo pendiente en la Solicitud de crédito.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.campoPendiente()"
 },
 "F2:13": {
  "oracion": "Solicitud de crédito devuelve el campo pendiente de identidad y contacto a July.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:14": {
  "oracion": "July solicita los nombres, la cédula, el correo y el teléfono al Prospecto.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:15": {
  "oracion": "Prospecto entrega los nombres, la cédula, el correo y el teléfono a July.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:16": {
  "oracion": "July registra los nombres, la cédula, el correo y el teléfono en la Solicitud de crédito.",
  "cu": "2.1.2.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.registrarDato(campo, valor)"
 },
 "F2:17": {
  "oracion": "Solicitud de crédito devuelve el formato válido de los datos a July.",
  "cu": "2.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:18": {
  "oracion": "July valida la cédula con el Sistema core.",
  "cu": "2.1.2.1",
  "alternativo": null,
  "metodo": "SistemaCore.validarCedula(cedula)"
 },
 "F2:19": {
  "oracion": "Sistema core devuelve la cédula válida a July.",
  "cu": "2.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:20": {
  "oracion": "July guarda el avance de la conversación en la Conversación.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": "Conversacion.guardarAvance(paso)"
 },
 "F2:21": {
  "oracion": "Conversación devuelve el avance guardado a July.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:22": {
  "oracion": "July consulta el campo pendiente en la Solicitud de crédito.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": "SolicitudCredito.campoPendiente()"
 },
 "F2:23": {
  "oracion": "Solicitud de crédito devuelve el campo pendiente de ingresos y actividad a July.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:24": {
  "oracion": "July solicita los ingresos mensuales y la actividad económica al Prospecto.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:25": {
  "oracion": "Prospecto declara los ingresos mensuales y la actividad económica a July.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:26": {
  "oracion": "July registra los ingresos y la actividad en la Solicitud de crédito.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": "SolicitudCredito.registrarDato(campo, valor)"
 },
 "F2:27": {
  "oracion": "Solicitud de crédito devuelve los ingresos y la actividad válidos a July.",
  "cu": "2.1.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:28": {
  "oracion": "July resume la solicitud en la Solicitud de crédito.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.resumir()"
 },
 "F2:29": {
  "oracion": "Solicitud de crédito devuelve el resumen con todos los datos a July.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:30": {
  "oracion": "July solicita la confirmación del resumen al Prospecto.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:31": {
  "oracion": "Prospecto confirma el resumen de la solicitud a July.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:32": {
  "oracion": "July confirma la solicitud en la Solicitud de crédito.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.actualizarEstado(estado)"
 },
 "F2:33": {
  "oracion": "Solicitud de crédito devuelve la solicitud confirmada a July.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:34": {
  "oracion": "July guarda el avance de la conversación en la Conversación.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": "Conversacion.guardarAvance(paso)"
 },
 "F2:35": {
  "oracion": "Conversación devuelve el avance guardado a July.",
  "cu": "2.1.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:36": {
  "oracion": "July informa la solicitud confirmada al Prospecto.",
  "cu": "2.1.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:14a": {
  "oracion": "July muestra los datos registrados del socio al Prospecto.",
  "cu": "2.1.1.1",
  "alternativo": "A1",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:15a": {
  "oracion": "Prospecto confirma los datos registrados a July. Continúa en el paso 20.",
  "cu": "2.1.1.1",
  "alternativo": "A1",
  "metodo": "July.atender(mensaje)"
 },
 "F2:17b": {
  "oracion": "Solicitud de crédito devuelve el motivo del error de formato a July.",
  "cu": "2.1.2.1",
  "alternativo": "A2",
  "metodo": null
 },
 "F2:18b": {
  "oracion": "July explica el error del dato al Prospecto.",
  "cu": "2.1.2.1",
  "alternativo": "A2",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:19b": {
  "oracion": "Prospecto corrige el dato a July. Vuelve al paso 16.",
  "cu": "2.1.2.1",
  "alternativo": "A2",
  "metodo": "July.atender(mensaje)"
 },
 "F2:19c": {
  "oracion": "Sistema core devuelve la cédula no válida a July.",
  "cu": "2.1.2.1",
  "alternativo": "A3",
  "metodo": null
 },
 "F2:20c": {
  "oracion": "July explica el error de validación de la cédula al Prospecto.",
  "cu": "2.1.2.1",
  "alternativo": "A3",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:21c": {
  "oracion": "Prospecto corrige la cédula a July. Vuelve al paso 16.",
  "cu": "2.1.2.1",
  "alternativo": "A3",
  "metodo": "July.atender(mensaje)"
 },
 "F2:31d": {
  "oracion": "Prospecto corrige el dato equivocado a July.",
  "cu": "2.1.1.1",
  "alternativo": "A4",
  "metodo": "July.atender(mensaje)"
 },
 "F2:32d": {
  "oracion": "July registra el dato corregido en la Solicitud de crédito.",
  "cu": "2.1.1.1",
  "alternativo": "A4",
  "metodo": "SolicitudCredito.registrarDato(campo, valor)"
 },
 "F2:33d": {
  "oracion": "Solicitud de crédito devuelve el dato válido a July. Vuelve al paso 28.",
  "cu": "2.1.1.1",
  "alternativo": "A4",
  "metodo": null
 },
 "F2:24e": {
  "oracion": "Prospecto deja vencer el tiempo de respuesta a July.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "July.vencerPlazo(plazo)"
 },
 "F2:25e": {
  "oracion": "July marca la conversación como abandonada en la Conversación.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "Conversacion.marcarAbandonada()"
 },
 "F2:26e": {
  "oracion": "Conversación devuelve la conversación abandonada a July.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": null
 },
 "F2:27e": {
  "oracion": "July compone la plantilla de retoma con el último paso guardado en la Plantilla de mensaje.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "PlantillaMensaje.componer(datos)"
 },
 "F2:28e": {
  "oracion": "Plantilla de mensaje devuelve la plantilla de retoma a July.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": null
 },
 "F2:29e": {
  "oracion": "July envía la plantilla de retoma a WhatsApp Business API.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "Canal.enviar(mensaje)"
 },
 "F2:30e": {
  "oracion": "WhatsApp Business API entrega la plantilla de retoma al Prospecto.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:31e": {
  "oracion": "Prospecto responde la plantilla de retoma a July.",
  "cu": "2.1.2.3",
  "alternativo": "A5",
  "metodo": "July.atender(mensaje)"
 },
 "F2:32e": {
  "oracion": "July retoma la conversación desde el último paso guardado en la Conversación.",
  "cu": "2.1.2.2",
  "alternativo": "A5",
  "metodo": "Conversacion.retomar()"
 },
 "F2:33e": {
  "oracion": "Conversación devuelve el último paso guardado a July. Vuelve al paso 22.",
  "cu": "2.1.2.2",
  "alternativo": "A5",
  "metodo": null
 },
 "F2:37": {
  "oracion": "Prospecto solicita la simulación del crédito a July.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:38": {
  "oracion": "July calcula la cuota con el monto y el plazo en la Simulación.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": "Simulacion.calcular(solicitud, monto, plazo)"
 },
 "F2:39": {
  "oracion": "Simulación devuelve la cuota mensual a July.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:40": {
  "oracion": "July genera la tabla de amortización en la Simulación.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": "Simulacion.generarTablaAmortizacion()"
 },
 "F2:41": {
  "oracion": "Simulación devuelve la tabla de amortización a July.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:42": {
  "oracion": "July presenta la cuota con la tabla de amortización al Prospecto.",
  "cu": "2.2.1.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:43": {
  "oracion": "Prospecto solicita el costo total del crédito a July.",
  "cu": "2.2.1.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:44": {
  "oracion": "July muestra el total a pagar con intereses, seguros y cargos al Prospecto.",
  "cu": "2.2.1.2",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:45": {
  "oracion": "Prospecto solicita comparar otro monto o plazo a July.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:46": {
  "oracion": "July calcula el escenario alternativo en la Simulación.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "Simulacion.calcular(solicitud, monto, plazo)"
 },
 "F2:47": {
  "oracion": "Simulación devuelve el escenario alternativo a July.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:48": {
  "oracion": "July presenta los escenarios lado a lado al Prospecto.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:49": {
  "oracion": "Prospecto elige el escenario de la simulación a July.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:50": {
  "oracion": "July marca el escenario elegido en la Simulación.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "Simulacion.elegir()"
 },
 "F2:51": {
  "oracion": "Simulación devuelve la simulación elegida a July.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:52": {
  "oracion": "July confirma el escenario elegido al Prospecto.",
  "cu": "2.2.1.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:53": {
  "oracion": "Prospecto consulta las líneas de crédito disponibles a July.",
  "cu": "2.2.2.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:54": {
  "oracion": "July consulta el catálogo de líneas vigentes al Área de productos y crédito.",
  "cu": "2.2.2.1",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F2:55": {
  "oracion": "Área de productos y crédito devuelve el catálogo publicado con las líneas vigentes a July.",
  "cu": "2.2.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:56": {
  "oracion": "July presenta las líneas de crédito vigentes al Prospecto.",
  "cu": "2.2.2.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:57": {
  "oracion": "Prospecto selecciona la línea de crédito a July.",
  "cu": "2.2.2.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:58": {
  "oracion": "July cambia la línea elegida en el Lead.",
  "cu": "2.2.2.2",
  "alternativo": null,
  "metodo": "Lead.elegirLinea(linea)"
 },
 "F2:59": {
  "oracion": "Lead devuelve la línea elegida a July.",
  "cu": "2.2.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:60": {
  "oracion": "July informa la tasa y los plazos vigentes de la línea al Prospecto.",
  "cu": "2.2.2.2",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:61": {
  "oracion": "Prospecto consulta los requisitos de la línea a July.",
  "cu": "2.2.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:62": {
  "oracion": "July informa los requisitos publicados de la línea al Prospecto.",
  "cu": "2.2.2.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:39f": {
  "oracion": "Simulación devuelve el monto fuera del rango de la línea a July.",
  "cu": "2.2.1.1",
  "alternativo": "A6",
  "metodo": null
 },
 "F2:40f": {
  "oracion": "July valida el monto y el plazo en la Línea de crédito.",
  "cu": "2.2.1.1",
  "alternativo": "A6",
  "metodo": "LineaCredito.validarCondiciones(monto, plazo)"
 },
 "F2:41f": {
  "oracion": "Línea de crédito devuelve los montos mínimo y máximo permitidos a July.",
  "cu": "2.2.1.1",
  "alternativo": "A6",
  "metodo": null
 },
 "F2:42f": {
  "oracion": "July informa los montos mínimo y máximo al Prospecto. Vuelve al paso 37.",
  "cu": "2.2.1.1",
  "alternativo": "A6",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:45g": {
  "oracion": "Prospecto acepta la simulación inicial a July. Continúa en el paso 50.",
  "cu": "2.2.1.1",
  "alternativo": "A7",
  "metodo": "July.atender(mensaje)"
 },
 "F2:59h": {
  "oracion": "Lead devuelve la línea no vigente a July.",
  "cu": "2.2.2.2",
  "alternativo": "A8",
  "metodo": null
 },
 "F2:60h": {
  "oracion": "July ofrece las líneas alternativas vigentes al Prospecto. Vuelve al paso 57.",
  "cu": "2.2.2.1",
  "alternativo": "A8",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:61i": {
  "oracion": "Prospecto pide simular con la nueva línea a July. Vuelve al paso 38.",
  "cu": "2.2.1.1",
  "alternativo": "A9",
  "metodo": "July.atender(mensaje)"
 },
 "F2:63": {
  "oracion": "Prospecto solicita la precalificación del escenario elegido a July.",
  "cu": "2.3.1.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:64": {
  "oracion": "July consulta las reglas de precalificación vigentes al Comité de crédito.",
  "cu": "2.3.1.1",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F2:65": {
  "oracion": "Comité de crédito devuelve las reglas aprobadas en la tabla de decisión a July.",
  "cu": "2.3.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:66": {
  "oracion": "July consulta la edad, la actividad y la condición de socio al Sistema core.",
  "cu": "2.3.1.2",
  "alternativo": null,
  "metodo": "SistemaCore.consultarSocio(prospecto)"
 },
 "F2:67": {
  "oracion": "Sistema core devuelve la edad, la actividad registrada y la condición de socio a July.",
  "cu": "2.3.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:68": {
  "oracion": "July precalifica la simulación elegida con las reglas en la Solicitud de crédito.",
  "cu": "2.3.1.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.precalificar(reglas)"
 },
 "F2:69": {
  "oracion": "Solicitud de crédito devuelve el resultado APTO con su capacidad de pago a July.",
  "cu": "2.3.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:70": {
  "oracion": "July explica el resultado en la Solicitud de crédito.",
  "cu": "2.3.2.1",
  "alternativo": null,
  "metodo": "SolicitudCredito.explicarResultado()"
 },
 "F2:71": {
  "oracion": "Solicitud de crédito devuelve la explicación del resultado y sus factores a July.",
  "cu": "2.3.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F2:72": {
  "oracion": "July comunica el resultado preliminar y no vinculante al Prospecto.",
  "cu": "2.3.2.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:73": {
  "oracion": "Prospecto consulta los documentos que debe preparar a July.",
  "cu": "2.3.2.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:74": {
  "oracion": "July consulta los documentos según la condición de socio en la Línea de crédito.",
  "cu": "2.3.2.2",
  "alternativo": null,
  "metodo": "LineaCredito.requisitosPara(condicion)"
 },
 "F2:75": {
  "oracion": "Línea de crédito devuelve la lista de documentos requeridos a July.",
  "cu": "2.3.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F2:76": {
  "oracion": "July envía la lista de documentos requeridos al Prospecto.",
  "cu": "2.3.2.2",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:77": {
  "oracion": "Prospecto solicita una cita en la agencia de su preferencia a July.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:78": {
  "oracion": "July consulta los horarios disponibles de la agencia al Personal de agencia.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "Colaborador.consultarAgenda(agencia, desde, hasta)"
 },
 "F2:79": {
  "oracion": "Personal de agencia devuelve los horarios libres de su agenda a July.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:80": {
  "oracion": "July ofrece los horarios disponibles al Prospecto.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:81": {
  "oracion": "Prospecto selecciona un horario disponible a July.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F2:82": {
  "oracion": "July reserva la cita en el horario elegido en la Cita.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "Cita.reservar(lead, agencia, fechaHora)"
 },
 "F2:83": {
  "oracion": "Cita devuelve la cita reservada a July.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:84": {
  "oracion": "July avisa la cita reservada al Personal de agencia.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F2:85": {
  "oracion": "Personal de agencia devuelve el acuse de la reserva a July.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F2:86": {
  "oracion": "July envía la confirmación de la cita con la fecha, la hora y la agencia al Prospecto. Fin.",
  "cu": "2.3.2.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:67j": {
  "oracion": "Sistema core devuelve la ausencia de registro del socio a July. Continúa en el paso 68 y el resultado queda condicionado.",
  "cu": "2.3.1.2",
  "alternativo": "A10",
  "metodo": null
 },
 "F2:69k": {
  "oracion": "Solicitud de crédito devuelve el resultado A_REVISAR a July.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": null
 },
 "F2:70k": {
  "oracion": "July deriva la solicitud a revisión en la Solicitud de crédito.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": "SolicitudCredito.derivarARevision()"
 },
 "F2:71k": {
  "oracion": "Solicitud de crédito devuelve el número del caso de revisión a July.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": null
 },
 "F2:72k": {
  "oracion": "July envía el caso de revisión con la precalificación al Comité de crédito.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F2:73k": {
  "oracion": "Comité de crédito devuelve el acuse de recepción del caso a July.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": null
 },
 "F2:74k": {
  "oracion": "July informa el número del caso de revisión al Prospecto. Continúa en el paso 73.",
  "cu": "2.3.1.3",
  "alternativo": "A11",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:69l": {
  "oracion": "Solicitud de crédito devuelve el resultado NO_APTO con su capacidad de pago a July.",
  "cu": "2.3.1.3",
  "alternativo": "A12",
  "metodo": null
 },
 "F2:70l": {
  "oracion": "July explica el motivo del resultado en la Solicitud de crédito.",
  "cu": "2.3.2.1",
  "alternativo": "A12",
  "metodo": "SolicitudCredito.explicarResultado()"
 },
 "F2:71l": {
  "oracion": "Solicitud de crédito devuelve el motivo del resultado «no apto» a July.",
  "cu": "2.3.2.1",
  "alternativo": "A12",
  "metodo": null
 },
 "F2:72l": {
  "oracion": "July sugiere un monto o plazo que quepa en la capacidad de pago en la Simulación.",
  "cu": "2.3.2.1",
  "alternativo": "A12",
  "metodo": "Simulacion.sugerirAlternativa(capacidadPago)"
 },
 "F2:73l": {
  "oracion": "Simulación devuelve el escenario alternativo a July.",
  "cu": "2.3.2.1",
  "alternativo": "A12",
  "metodo": null
 },
 "F2:74l": {
  "oracion": "July explica el motivo con el escenario alternativo y la opción de revisión con un asesor al Prospecto. Fin. El prospecto puede volver a simular desde el paso 37 o pedir la revisión con un asesor en el flujo 1, paso 25f (A6).",
  "cu": "2.3.2.1",
  "alternativo": "A12",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F2:75m": {
  "oracion": "Línea de crédito devuelve los documentos con los requisitos de afiliación a July. Continúa en el paso 76.",
  "cu": "2.3.2.2",
  "alternativo": "A13",
  "metodo": null
 },
 "F2:79n": {
  "oracion": "Personal de agencia devuelve la agenda sin horarios libres a July.",
  "cu": "2.3.2.3",
  "alternativo": "A14",
  "metodo": null
 },
 "F2:80n": {
  "oracion": "July consulta las fechas libres más cercanas al Personal de agencia.",
  "cu": "2.3.2.3",
  "alternativo": "A14",
  "metodo": "Colaborador.consultarAgenda(agencia, desde, hasta)"
 },
 "F2:81n": {
  "oracion": "Personal de agencia devuelve los horarios libres más cercanos a July.",
  "cu": "2.3.2.3",
  "alternativo": "A14",
  "metodo": null
 },
 "F2:82n": {
  "oracion": "July ofrece los horarios libres más cercanos al Prospecto. Continúa en el paso 81.",
  "cu": "2.3.2.3",
  "alternativo": "A14",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F3:1": {
  "oracion": "July consulta los criterios de prioridad vigentes al Jefe comercial.",
  "cu": "3.1.1.2",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F3:2": {
  "oracion": "Jefe comercial devuelve los criterios de lead caliente, tibio y frío a July.",
  "cu": "3.1.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:3": {
  "oracion": "July prioriza el lead con los criterios en el Lead.",
  "cu": "3.1.1.2",
  "alternativo": null,
  "metodo": "Lead.priorizar(criterios)"
 },
 "F3:4": {
  "oracion": "Lead devuelve la prioridad del lead a July.",
  "cu": "3.1.1.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:5": {
  "oracion": "July genera la ficha con datos, simulación y resultado en el Lead.",
  "cu": "3.1.1.1",
  "alternativo": null,
  "metodo": "Lead.generarFicha()"
 },
 "F3:6": {
  "oracion": "Lead devuelve la ficha del prospecto con el historial de la conversación a July.",
  "cu": "3.1.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:7": {
  "oracion": "July busca el lead por cédula y teléfono en el CRM de la cooperativa.",
  "cu": "3.1.2.2",
  "alternativo": null,
  "metodo": "CRMCooperativa.buscarLead(cedula, telefono)"
 },
 "F3:8": {
  "oracion": "CRM de la cooperativa devuelve la ausencia de registro previo a July.",
  "cu": "3.1.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:9": {
  "oracion": "July registra el lead con su ficha en el CRM de la cooperativa.",
  "cu": "3.1.2.1",
  "alternativo": null,
  "metodo": "CRMCooperativa.sincronizarLead(lead)"
 },
 "F3:10": {
  "oracion": "CRM de la cooperativa devuelve el identificador del lead a July.",
  "cu": "3.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:11": {
  "oracion": "July vincula el identificador del CRM en el Lead.",
  "cu": "3.1.2.1",
  "alternativo": null,
  "metodo": "Lead.vincularCRM(idCRM)"
 },
 "F3:12": {
  "oracion": "Lead devuelve el lead vinculado a July.",
  "cu": "3.1.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:6a": {
  "oracion": "Lead devuelve la ficha con los datos faltantes marcados a July. Continúa en el paso 7.",
  "cu": "3.1.1.1",
  "alternativo": "A1",
  "metodo": null
 },
 "F3:8b": {
  "oracion": "CRM de la cooperativa devuelve el identificador del registro existente a July. Continúa en el paso 9, que actualiza ese registro.",
  "cu": "3.1.2.2",
  "alternativo": "A2",
  "metodo": null
 },
 "F3:10c": {
  "oracion": "CRM de la cooperativa devuelve el error de integración tras los reintentos a July.",
  "cu": "3.1.2.3",
  "alternativo": "A3",
  "metodo": null
 },
 "F3:11c": {
  "oracion": "July avisa el registro pendiente del lead al Jefe comercial.",
  "cu": "3.1.2.3",
  "alternativo": "A3",
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F3:12c": {
  "oracion": "Jefe comercial devuelve el acuse del aviso a July. Continúa en el paso 13.",
  "cu": "3.1.2.3",
  "alternativo": "A3",
  "metodo": null
 },
 "F3:13": {
  "oracion": "July consulta las reglas de enrutamiento por agencia, producto y carga al Jefe comercial.",
  "cu": "3.2.1.1",
  "alternativo": null,
  "metodo": "Colaborador.consultarPublicacion(tipo)"
 },
 "F3:14": {
  "oracion": "Jefe comercial devuelve la regla de enrutamiento aplicable a July.",
  "cu": "3.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:15": {
  "oracion": "July asigna el lead a un asesor disponible en el Lead.",
  "cu": "3.2.1.1",
  "alternativo": null,
  "metodo": "Lead.asignar(enrutamiento, asesores)"
 },
 "F3:16": {
  "oracion": "Lead devuelve el asesor asignado a July.",
  "cu": "3.2.1.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:17": {
  "oracion": "July notifica el lead asignado con su plazo de atención al Asesor comercial.",
  "cu": "3.2.1.2",
  "alternativo": null,
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:18": {
  "oracion": "Asesor comercial acepta la asignación del lead a July.",
  "cu": "3.2.1.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:19": {
  "oracion": "July registra la aceptación en el Lead.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": "Lead.aceptarAsignacion()"
 },
 "F3:20": {
  "oracion": "Lead devuelve el lead en gestión a July.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:21": {
  "oracion": "July traspasa la conversación con su historial y la ficha en la Conversación.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": "Conversacion.traspasar(asesor)"
 },
 "F3:22": {
  "oracion": "Conversación devuelve la conversación derivada a July.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:23": {
  "oracion": "July avisa el cambio de asesor al Prospecto.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F3:24": {
  "oracion": "Prospecto continúa la conversación con el Asesor comercial.",
  "cu": "3.2.1.3",
  "alternativo": null,
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:25": {
  "oracion": "Asesor comercial programa el recordatorio de documentos y cita a July.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:26": {
  "oracion": "July programa el recordatorio en la Cita.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": "Cita.programarRecordatorio(fecha)"
 },
 "F3:27": {
  "oracion": "Cita devuelve el recordatorio programado a July.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:28": {
  "oracion": "July compone el recordatorio de documentos y cita en la Plantilla de mensaje.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": "PlantillaMensaje.componer(datos)"
 },
 "F3:29": {
  "oracion": "Plantilla de mensaje devuelve el recordatorio a July.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": null
 },
 "F3:30": {
  "oracion": "July envía la plantilla de recordatorio a WhatsApp Business API.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": "Canal.enviar(mensaje)"
 },
 "F3:31": {
  "oracion": "WhatsApp Business API entrega el recordatorio de documentos y cita al Prospecto.",
  "cu": "3.2.2.1",
  "alternativo": null,
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F3:32": {
  "oracion": "Prospecto confirma su asistencia a la cita a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:33": {
  "oracion": "July registra la asistencia confirmada en la Cita.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "Cita.actualizarEstado(estado)"
 },
 "F3:34": {
  "oracion": "Cita devuelve la cita confirmada a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:35": {
  "oracion": "July avisa la asistencia confirmada al Personal de agencia.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F3:36": {
  "oracion": "Personal de agencia registra la atención de la cita a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:37": {
  "oracion": "July registra la cita atendida en la Cita.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "Cita.actualizarEstado(estado)"
 },
 "F3:38": {
  "oracion": "Cita devuelve la cita atendida a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:39": {
  "oracion": "July avisa la cita atendida al Asesor comercial.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:40": {
  "oracion": "Asesor comercial registra los documentos recibidos en la agencia a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:41": {
  "oracion": "July registra los documentos recibidos en la Solicitud de crédito.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": "SolicitudCredito.registrarDocumento(documento)"
 },
 "F3:42": {
  "oracion": "Solicitud de crédito devuelve los documentos registrados a July.",
  "cu": "3.2.2.2",
  "alternativo": null,
  "metodo": null
 },
 "F3:43": {
  "oracion": "July pasa la solicitud a resolución en la Solicitud de crédito.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "SolicitudCredito.actualizarEstado(estado)"
 },
 "F3:44": {
  "oracion": "Solicitud de crédito devuelve la solicitud en resolución a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:45": {
  "oracion": "July envía la solicitud de crédito completa al Comité de crédito.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F3:46": {
  "oracion": "Comité de crédito comunica la resolución del crédito a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:47": {
  "oracion": "July registra la resolución en la Solicitud de crédito.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "SolicitudCredito.actualizarEstado(estado)"
 },
 "F3:48": {
  "oracion": "Solicitud de crédito devuelve la resolución registrada a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:49": {
  "oracion": "July notifica la resolución del crédito al Asesor comercial.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:50": {
  "oracion": "Asesor comercial registra el estado final del lead a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "July.atender(mensaje)"
 },
 "F3:51": {
  "oracion": "July cierra el lead con su estado final en el Lead.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "Lead.actualizarEstado(estado, motivo)"
 },
 "F3:52": {
  "oracion": "Lead devuelve el lead cerrado a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:53": {
  "oracion": "July sincroniza el estado final del lead con el CRM de la cooperativa.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "CRMCooperativa.sincronizarLead(lead)"
 },
 "F3:54": {
  "oracion": "CRM de la cooperativa devuelve el identificador del lead actualizado a July.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": null
 },
 "F3:55": {
  "oracion": "July confirma el cierre del lead al Asesor comercial. Fin.",
  "cu": "3.2.2.3",
  "alternativo": null,
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:18d": {
  "oracion": "Asesor comercial deja vencer el plazo de atención a July.",
  "cu": "3.2.1.2",
  "alternativo": "A4",
  "metodo": "July.vencerPlazo(plazo)"
 },
 "F3:19d": {
  "oracion": "July reasigna el lead sin el asesor anterior en el Lead.",
  "cu": "3.2.1.1",
  "alternativo": "A4",
  "metodo": "Lead.asignar(enrutamiento, asesores)"
 },
 "F3:20d": {
  "oracion": "Lead devuelve el nuevo asesor asignado a July.",
  "cu": "3.2.1.1",
  "alternativo": "A4",
  "metodo": null
 },
 "F3:21d": {
  "oracion": "July informa la reasignación del lead al Jefe comercial.",
  "cu": "3.2.1.1",
  "alternativo": "A4",
  "metodo": "Colaborador.recibir(mensaje)"
 },
 "F3:22d": {
  "oracion": "Jefe comercial devuelve el acuse del aviso a July. Vuelve al paso 17.",
  "cu": "3.2.1.1",
  "alternativo": "A4",
  "metodo": null
 },
 "F3:32e": {
  "oracion": "Prospecto deja vencer el plazo de respuesta del recordatorio a July.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": "July.vencerPlazo(plazo)"
 },
 "F3:33e": {
  "oracion": "July suma el intento de reactivación en el Lead.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": "Lead.reactivar()"
 },
 "F3:34e": {
  "oracion": "Lead devuelve los intentos de reactivación que quedan a July.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": null
 },
 "F3:35e": {
  "oracion": "July compone la plantilla de reactivación en la Plantilla de mensaje.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": "PlantillaMensaje.componer(datos)"
 },
 "F3:36e": {
  "oracion": "Plantilla de mensaje devuelve la plantilla de reactivación a July.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": null
 },
 "F3:37e": {
  "oracion": "July envía la plantilla de reactivación a WhatsApp Business API.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": "Canal.enviar(mensaje)"
 },
 "F3:38e": {
  "oracion": "WhatsApp Business API entrega la reactivación al Prospecto. Continúa en el paso 32.",
  "cu": "3.2.2.1",
  "alternativo": "A5",
  "metodo": "Prospecto.recibir(mensaje)"
 },
 "F3:35f": {
  "oracion": "July prioriza el lead como frío en el Lead.",
  "cu": "3.2.2.1",
  "alternativo": "A6",
  "metodo": "Lead.priorizar(criterios)"
 },
 "F3:36f": {
  "oracion": "Lead devuelve la prioridad fría a July.",
  "cu": "3.2.2.1",
  "alternativo": "A6",
  "metodo": null
 },
 "F3:37f": {
  "oracion": "July informa el lead frío con sus intentos de reactivación al Asesor comercial. Continúa en el paso 50.",
  "cu": "3.2.2.3",
  "alternativo": "A6",
  "metodo": "AsesorComercial.recibir(mensaje)"
 },
 "F3:32g": {
  "oracion": "Prospecto solicita el cambio de fecha de la cita a July.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": "July.atender(mensaje)"
 },
 "F3:33g": {
  "oracion": "July consulta los horarios para la fecha nueva al Personal de agencia.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": "Colaborador.consultarAgenda(agencia, desde, hasta)"
 },
 "F3:34g": {
  "oracion": "Personal de agencia devuelve el horario disponible a July.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": null
 },
 "F3:35g": {
  "oracion": "July reprograma la cita en la Cita.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": "Cita.reprogramar(fechaHora)"
 },
 "F3:36g": {
  "oracion": "Cita devuelve la cita reprogramada a July.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": null
 },
 "F3:37g": {
  "oracion": "July envía la cita reprogramada al Prospecto. Vuelve al paso 32.",
  "cu": "3.2.2.2",
  "alternativo": "A7",
  "metodo": "Prospecto.recibir(mensaje)"
 }
};
