{{/*
  Punto de entrada para el chart de cada servicio. Su templates/servicio.yaml contiene solo:
    {{ include "july-servicio.todo" . }}
*/}}
{{- define "july-servicio.todo" -}}
{{ include "july-servicio.deployment" . }}
---
{{ include "july-servicio.service" . }}
---
{{ include "july-servicio.networkpolicy" . }}
{{- if .Values.autoescalado.activo }}
---
{{ include "july-servicio.hpa" . }}
{{- end }}
{{- end -}}
