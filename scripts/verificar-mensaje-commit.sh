#!/usr/bin/env bash
# Revisa el mensaje de commit (hook commit-msg, SAD-07 paso 0.3).
# Reglas: primera línea de 10 a 72 caracteres, sin punto final, y línea en blanco antes del cuerpo.
set -euo pipefail
archivo="${1:?falta la ruta del mensaje}"
primera=$(grep -v '^#' "$archivo" | head -n 1)
segunda=$(grep -v '^#' "$archivo" | sed -n 2p)
largo=${#primera}
error=0
if (( largo < 10 || largo > 72 )); then
  echo "La primera línea tiene $largo caracteres; debe tener entre 10 y 72." >&2; error=1
fi
if [[ "$primera" == *. ]]; then
  echo "La primera línea no termina en punto." >&2; error=1
fi
if [[ -n "$segunda" ]]; then
  echo "Deja una línea en blanco entre la primera línea y el cuerpo." >&2; error=1
fi
exit $error
