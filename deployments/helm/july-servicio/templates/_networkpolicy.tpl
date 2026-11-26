{{- define "july-servicio.networkpolicy" -}}
# Solo entra tráfico del gateway (WSO2) y de los servicios que llaman a este; solo sale hacia los
# servicios de .Values.llamaA, Oracle, RabbitMQ, Redis, Vault y DNS (reglas L1 y L4 de SAD-06).
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: {{ include "july-servicio.nombre" . }}
  labels: {{- include "july-servicio.etiquetas" . | nindent 4 }}
spec:
  podSelector:
    matchLabels: {{- include "july-servicio.selector" . | nindent 6 }}
  policyTypes: [Ingress, Egress]
  ingress:
    - from:
        - podSelector:
            matchLabels: { app.kubernetes.io/part-of: july }
        - namespaceSelector:
            matchLabels: { july.coop/zona: gateway }
      ports:
        - port: {{ .Values.puerto }}
  egress:
    {{- range .Values.llamaA }}
    - to:
        - podSelector:
            matchLabels: { app.kubernetes.io/name: {{ . }} }
    {{- end }}
    - to:
        - namespaceSelector:
            matchLabels: { july.coop/zona: datos }
    - ports:
        - { port: 53, protocol: UDP }
        - { port: 53, protocol: TCP }
{{- end -}}
