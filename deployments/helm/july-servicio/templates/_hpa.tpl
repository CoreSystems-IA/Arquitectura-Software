{{- define "july-servicio.hpa" -}}
{{- if .Values.autoescalado.activo }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "july-servicio.nombre" . }}
  labels: {{- include "july-servicio.etiquetas" . | nindent 4 }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "july-servicio.nombre" . }}
  minReplicas: {{ .Values.autoescalado.minimo }}
  maxReplicas: {{ .Values.autoescalado.maximo }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: {{ .Values.autoescalado.cpuObjetivo }} }
{{- end }}
{{- end -}}
