{{- define "july-servicio.deployment" -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "july-servicio.nombre" . }}
  labels: {{- include "july-servicio.etiquetas" . | nindent 4 }}
spec:
  {{- if not .Values.autoescalado.activo }}
  replicas: {{ .Values.replicas }}
  {{- end }}
  selector:
    matchLabels: {{- include "july-servicio.selector" . | nindent 6 }}
  template:
    metadata:
      labels: {{- include "july-servicio.etiquetas" . | nindent 8 }}
      {{- if .Values.vault.activo }}
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: {{ .Values.vault.rol | default (include "july-servicio.nombre" .) | quote }}
        {{- range .Values.vault.secretos }}
        vault.hashicorp.com/agent-inject-secret-{{ .archivo }}: {{ .ruta | quote }}
        {{- end }}
      {{- end }}
    spec:
      serviceAccountName: {{ include "july-servicio.nombre" . }}
      automountServiceAccountToken: {{ .Values.vault.activo }}
      securityContext:
        runAsNonRoot: true
        seccompProfile: { type: RuntimeDefault }
      containers:
        - name: {{ include "july-servicio.nombre" . }}
          image: "{{ required "imagen.repositorio es obligatorio" .Values.imagen.repositorio }}:{{ required "imagen.etiqueta es obligatoria" .Values.imagen.etiqueta }}"
          imagePullPolicy: {{ .Values.imagen.politica }}
          ports:
            - name: http
              containerPort: {{ .Values.puerto }}
          env:
            - name: ASPNETCORE_HTTP_PORTS
              value: {{ .Values.puerto | quote }}
            - name: RabbitMq__Servicio
              value: {{ include "july-servicio.nombre" . | quote }}
            {{- range $clave, $valor := .Values.entorno }}
            - name: {{ $clave }}
              value: {{ $valor | quote }}
            {{- end }}
          readinessProbe:
            httpGet: { path: /health, port: http }
            periodSeconds: 10
          livenessProbe:
            httpGet: { path: /alive, port: http }
            periodSeconds: 20
          resources: {{- toYaml .Values.recursos | nindent 12 }}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities: { drop: [ALL] }
{{- end -}}
