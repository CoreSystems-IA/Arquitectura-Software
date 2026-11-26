{{/* Nombre del desplegable: el del servicio (ms06-solicitud). */}}
{{- define "july-servicio.nombre" -}}
{{- required "servicio.nombre es obligatorio" .Values.servicio.nombre | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "july-servicio.etiquetas" -}}
app.kubernetes.io/name: {{ include "july-servicio.nombre" . }}
app.kubernetes.io/part-of: july
app.kubernetes.io/version: {{ .Values.imagen.etiqueta | default .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "july-servicio.selector" -}}
app.kubernetes.io/name: {{ include "july-servicio.nombre" . }}
app.kubernetes.io/part-of: july
{{- end -}}
