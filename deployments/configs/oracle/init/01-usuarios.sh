#!/bin/bash
# Usuarios de Oracle de July (SAD-07, paso 0.5): un esquema por microservicio con estado y uno para
# Quartz.NET. Cada servicio entra solo a su esquema y no recibe permisos sobre los demás (regla L2 de
# SAD-06). MS-03 (comprensión) no guarda estado y no tiene esquema.
#
# Lo ejecuta la imagen gvenzl/oracle-free la primera vez que crea la base (/container-entrypoint-initdb.d),
# tanto en docker-compose como en Aspire. La clave llega por la variable JULY_SCHEMA_PASSWORD; en
# Kubernetes los usuarios los crea el DBA y las credenciales las entrega Vault.
set -euo pipefail

: "${JULY_SCHEMA_PASSWORD:?Falta JULY_SCHEMA_PASSWORD (ver deployments/docker-compose/.env.sample)}"
PDB="${ORACLE_DATABASE:-FREEPDB1}"
ESQUEMAS="ms01 ms02 ms04 ms05 ms06 ms07 ms08 ms09 ms10 ms11 ms12 ms13 ms14 quartz"

{
  echo "WHENEVER SQLERROR EXIT SQL.SQLCODE"
  echo "ALTER SESSION SET CONTAINER = ${PDB};"
  for esquema in $ESQUEMAS; do
    cat <<SQL
CREATE USER ${esquema} IDENTIFIED BY "${JULY_SCHEMA_PASSWORD}" DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE, CREATE VIEW, CREATE TRIGGER, CREATE PROCEDURE TO ${esquema};
SQL
  done
  # MS-14 guarda la bitácora encadenada: su tabla de eventos solo admite INSERT (se impone en su migración).
  echo "EXIT"
} | sqlplus -s / as sysdba

echo "Esquemas de July creados en ${PDB}: ${ESQUEMAS}"
