{{- define "july-servicio.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "july-servicio.nombre" . }}
  labels: {{- include "july-servicio.etiquetas" . | nindent 4 }}
spec:
  selector: {{- include "july-servicio.selector" . | nindent 4 }}
  ports:
    - name: http
      port: 80
      targetPort: http
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: {{ include "july-servicio.nombre" . }}
  labels: {{- include "july-servicio.etiquetas" . | nindent 4 }}
{{- end -}}
