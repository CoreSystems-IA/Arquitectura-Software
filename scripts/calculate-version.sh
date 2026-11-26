#!/usr/bin/env bash
# Versión de July calculada por nbgv (SAD-07, lección L-06). Jenkins la usa como etiqueta de cada imagen.
# Uso: scripts/calculate-version.sh [--variable SemVer2]
set -euo pipefail
variable="SemVer2"
if [[ "${1:-}" == "--variable" ]]; then variable="${2:?falta el nombre de la variable}"; fi
dotnet tool run nbgv get-version --variable "$variable"
