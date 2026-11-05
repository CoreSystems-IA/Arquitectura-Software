#!/usr/bin/env python3
"""Genera js/pasos.js con los pasos de CU-09 y sus métodos de CLS-01.

Uso:
    python3 generar-pasos.py

Se ejecuta otra vez cuando cambian CU-09 o la sección 6.2 de CLS-01, para que el
prototipo cite siempre la especificación vigente en lugar de una copia a mano.
"""
import json
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))
PROTOTIPO = os.path.dirname(AQUI)
ARQ = os.path.join(PROTOTIPO, '..', '..', 'Arquitectura')
CU09 = os.path.join(ARQ, '03-especificacion-casos-de-uso', 'especificacion-casos-de-uso-solo-pasos.md')
CLS01 = os.path.join(ARQ, '05-diccionario-de-datos', 'diccionario-de-datos-etapa3.md')
SALIDA = os.path.join(PROTOTIPO, 'js', 'pasos.js')


def leer(ruta):
    with open(ruta, encoding='utf-8') as f:
        return f.read()


def pasos_de_cu09():
    pasos, flujo, alternativo = {}, None, None
    for linea in leer(CU09).splitlines():
        titulo = re.match(r'## Flujo (\d)', linea)
        if titulo:
            flujo = titulo.group(1)
        if re.match(r'(###|\*\*Flujos alternativos)', linea):
            alternativo = None
        nombre_alt = re.match(r'\| \| \*(A\d+) · .*\* \| \|', linea)
        if nombre_alt:
            alternativo = nombre_alt.group(1)
        fila = re.match(r'\| (\d+[a-z]?) \| (.+) \| (\d\.\d\.\d\.\d) \|$', linea)
        if fila and flujo:
            clave = f'F{flujo}:{fila.group(1)}'
            if clave in pasos:
                raise SystemExit(f'Paso repetido en CU-09: {clave}')
            pasos[clave] = {
                'oracion': fila.group(2).replace('**', ''),
                'cu': fila.group(3),
                'alternativo': alternativo,
                'metodo': None,
            }
    return pasos


def agregar_metodos(pasos):
    flujo = None
    seccion = leer(CLS01).split('### 6.2 Paso → método')[1].split('## 7.')[0]
    for linea in seccion.splitlines():
        titulo = re.match(r'\*\*Flujo (\d)', linea)
        if titulo:
            flujo = titulo.group(1)
        fila = re.match(r'\| (\d+[a-z]?) \| `([^`]+)` \|', linea)
        if fila and flujo:
            clave = f'F{flujo}:{fila.group(1)}'
            if clave not in pasos:
                raise SystemExit(f'CLS-01 cita un paso que no está en CU-09: {clave}')
            pasos[clave]['metodo'] = fila.group(2)


def main():
    pasos = pasos_de_cu09()
    agregar_metodos(pasos)
    llamadas = sum(1 for p in pasos.values() if p['metodo'])
    with open(SALIDA, 'w', encoding='utf-8') as f:
        f.write('// Generado por herramientas/generar-pasos.py desde CU-09 y CLS-01. No editar a mano.\n')
        f.write('const PASOS = ')
        json.dump(pasos, f, ensure_ascii=False, indent=1)
        f.write(';\n')
    print(f'{len(pasos)} pasos: {llamadas} llamadas y {len(pasos) - llamadas} retornos')


if __name__ == '__main__':
    main()
