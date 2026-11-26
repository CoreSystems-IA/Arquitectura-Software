#!/usr/bin/env bash
# Revisa con Gitleaks lo que está en el área de preparación (hook pre-commit, SAD-07 paso 0.3).
# Usa las reglas de .gitleaks.toml: secretos y datos personales de prueba (cédula, teléfono).
set -euo pipefail
if ! command -v gitleaks >/dev/null 2>&1; then
  echo "Falta gitleaks. Instálalo (https://github.com/gitleaks/gitleaks) o usa la imagen de Jenkins." >&2
  exit 1
fi
gitleaks git --staged --config .gitleaks.toml --redact --no-banner
