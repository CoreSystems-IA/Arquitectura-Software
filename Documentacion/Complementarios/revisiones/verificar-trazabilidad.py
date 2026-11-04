#!/usr/bin/env python3
"""Verifica la trazabilidad de la cadena de documentos de July (REV-02, sección 6).

Uso:
    python3 verificar-trazabilidad.py            # todas las reglas
    python3 verificar-trazabilidad.py V2 V4      # solo esas reglas

Reglas:
    V1  Casos de uso (CU-06)        ↔ especificación (CU-08)
    V2  Cadena «receptor = siguiente sujeto» dentro de la especificación
    V3  Especificación               ↔ modelo de dominio (DOM-01)
    V4  Especificación               ↔ diccionario de datos (CLS-01)
    V5  Diccionario (CLS-01)         ↔ diagrama de clases (CLS-02)
    V6  Diagrama de clases y especificación ↔ diagrama de secuencia (SEC-01)
    V7  Diagrama de secuencia        ↔ diagrama de robustez (ROB-01); un borde marcado vista="1"
        (el panel de la cooperativa) puede no ser una línea de vida
    V8  Enlaces relativos de los .md y rutas de la matriz del README

Sale con código 1 si alguna regla falla.
"""
import html
import os
import re
import sys
import xml.etree.ElementTree as ET

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ARQ = os.path.join(RAIZ, 'Arquitectura')
CU06 = os.path.join(ARQ, '02-casos-de-uso', 'casos-de-uso-por-flujo.md')
CU08 = os.path.join(ARQ, '03-especificacion-casos-de-uso', 'especificaciones-casos-de-uso.md')
DOM01 = os.path.join(ARQ, '04-modelo-de-dominio', 'modelo-de-dominio-etapa3.drawio')
CLS01 = os.path.join(ARQ, '05-diccionario-de-datos', 'diccionario-de-datos-etapa3.md')
CLS02 = os.path.join(ARQ, '06-diagrama-de-clases', 'diagrama-de-clases-etapa3.drawio')
SEC01 = os.path.join(ARQ, '07-diagrama-de-secuencia', 'diagramas-de-secuencia-etapa3.drawio')
ROB01 = os.path.join(ARQ, '08-diagrama-de-robustez', 'diagramas-de-robustez-etapa3.drawio')

# Clases del sistema que no son conceptos del dominio.
CLASES_SISTEMA = {'July', 'Canal', 'SistemaCore', 'CRMCooperativa'}


def leer(ruta):
    with open(ruta, encoding='utf-8') as f:
        return f.read()


def texto(valor):
    """Texto plano de una etiqueta HTML de draw.io."""
    v = html.unescape(valor or '')
    v = re.sub(r'<br\s*/?>', '\n', v)
    v = re.sub(r'<[^>]+>', '', v)
    return html.unescape(v).strip()


def celdas(fila):
    """Celdas de una fila de tabla Markdown; respeta los «\\|» escapados."""
    return [c.strip() for c in re.split(r'(?<!\\)\|', fila.strip().strip('|'))]


def firma(cadena):
    """'metodo(a: T, b: U)' o 'metodo(a, b)' → ('metodo', ('a', 'b'))."""
    m = re.match(r'\s*(\w+)\((.*)\)', cadena)
    if not m:
        return None
    params = []
    for p in re.split(r',(?![^<]*>)', m.group(2)):
        p = p.strip()
        if not p:
            continue
        params.append(re.split(r'\s*[:=]\s*', p)[0].strip())
    return m.group(1), tuple(params)


# ---------------------------------------------------------------- lectores

def leer_cu06():
    """{flujo: {caso N3: actores}}"""
    flujos, flujo = {}, None
    for linea in leer(CU06).split('\n'):
        m = re.match(r'## Flujo de valor (\d)', linea)
        if m:
            flujo = int(m.group(1))
            flujos[flujo] = {}
        m = re.match(r'\| (\d\.\d\.\d\.\d) \| [^|]+ \| ([^|]+) \|', linea)
        if m and flujo:
            flujos[flujo][m.group(1)] = m.group(2).strip()
    return flujos


def leer_especificacion():
    """Devuelve (participantes, flujos).

    participantes: {nombre: clase}
    flujos: {n: [paso, ...]}, donde cada paso es un dict con id, texto, sujeto,
    receptor, retorno, clase, metodo, params, sustantivo, rel, cu3, actor y alt
    (encabezado del flujo alternativo al que pertenece, o None).
    """
    participantes, flujos = {}, {}
    flujo, seccion, alt = None, None, None
    for linea in leer(CU08).split('\n'):
        if linea.startswith('### Participantes'):
            seccion = 'participantes'
            continue
        if linea.startswith('#'):
            seccion = None
        m = re.match(r'## Flujo (\d) · ', linea)
        if m:
            flujo = int(m.group(1))
            flujos[flujo] = []
            alt = None
            continue
        if seccion == 'participantes' and linea.startswith('| ') and '`' in linea:
            c = celdas(linea)
            participantes[c[0]] = c[1].strip('`')
            continue
        if flujo is None or not linea.startswith('|'):
            continue
        c = celdas(linea)
        if c[0] == 'Paso':
            alt = None
            continue
        if len(c) >= 2 and c[0] == '' and c[1].startswith('*'):
            alt = c[1].strip('*')
            continue
        if not re.fullmatch(r'\d+[a-z]?', c[0]) or len(c) < 8:
            continue
        negritas = re.findall(r'\*\*(.+?)\*\*', c[1])
        metodo = re.search(r'`(\w+)\.(\w+\(.*?\))`', c[3])
        rel = re.findall(r'`(\w+)`', c[5])
        sust = re.match(r'`(\w+)`', c[4])
        f = firma(metodo.group(2)) if metodo else None
        flujos[flujo].append({
            'id': c[0], 'texto': c[1],
            'sujeto': negritas[0] if negritas else None,
            'receptor': negritas[-1] if len(negritas) > 1 else None,
            'retorno': '*retorno*' in c[3],
            'clase': metodo.group(1) if metodo else None,
            'metodo': f[0] if f else None, 'params': f[1] if f else None,
            'sustantivo': sust.group(1) if sust else None,
            'rel': tuple(rel[:2]) if len(rel) >= 2 else None,
            'cu3': c[6], 'actor': c[7], 'alt': alt,
        })
    return participantes, flujos


def leer_dominio():
    raiz = ET.parse(DOM01).getroot()
    conceptos = set()
    for c in raiz.iter('mxCell'):
        if c.get('vertex') == '1' and (c.get('style') or '').startswith('swimlane'):
            nombre = texto(c.get('value')).split('\n')[-1].strip()
            if nombre:
                conceptos.add(nombre)
    return conceptos


def leer_diccionario():
    """Devuelve (clases, relaciones).

    clases: {clase: {'atributos': set, 'metodos': {nombre: params}}}
    relaciones: set de (origen, tipo, destino)
    """
    clases, relaciones = {}, set()
    contenido = leer(CLS01)
    resumen = contenido[contenido.index('## 7. Tabla de resumen'):]
    for linea in resumen.split('\n'):
        m = re.match(r'\| \[`(\w+)`\]', linea)
        if not m:
            continue
        c = celdas(linea)
        atributos = set(re.findall(r'`/?(\w+)`: `', c[3]))
        metodos = {}
        for parte in c[4].split('<br>'):
            parte = parte.strip().strip('`')
            f = firma(parte.split('` →')[0].strip('`')) if parte and parte != '—' else None
            if f:
                metodos[f[0]] = f[1]
        clases[m.group(1)] = {'atributos': atributos, 'metodos': metodos}
    seccion = contenido[contenido.index('## 5. Relaciones'):contenido.index('## 6.')]
    for linea in seccion.split('\n'):
        m = re.match(r'\| \d+ \| `(\w+)` \| (\w+) \| `(\w+)` \|', linea)
        if m:
            relaciones.add((m.group(1), m.group(2), m.group(3)))
    return clases, relaciones


def superclases(relaciones):
    return {o: d for (o, t, d) in relaciones if t == 'Generalización'}


def buscar_metodo(clases, padres, clase, metodo):
    while clase:
        if clase in clases and metodo in clases[clase]['metodos']:
            return clases[clase]['metodos'][metodo]
        clase = padres.get(clase)
    return None


def leer_diagrama_clases():
    raiz = ET.parse(CLS02).getroot()
    celdas_xml = {c.get('id'): c for c in raiz.iter('mxCell')}
    clases, ids = {}, {}
    for c in celdas_xml.values():
        estilo = c.get('style') or ''
        if c.get('vertex') == '1' and estilo.startswith('swimlane'):
            lineas = texto(c.get('value')).split('\n')
            if any('enumeration' in l for l in lineas):
                continue
            nombre = lineas[-1].strip()
            clases[nombre] = {'atributos': set(), 'metodos': {}}
            ids[c.get('id')] = nombre
    for c in celdas_xml.values():
        padre = ids.get(c.get('parent'))
        if not padre:
            continue
        for l in texto(c.get('value')).split('\n'):
            l = l.strip()
            if l.startswith('-') or (l.startswith('/') and ':' in l):
                clases[padre]['atributos'].add(re.match(r'[-\s]*/?(\w+)', l).group(1))
            elif l.startswith('+'):
                f = firma(l[1:].rsplit('):', 1)[0] + ')')
                if f:
                    clases[padre]['metodos'][f[0]] = f[1]
    relaciones = set()
    for c in celdas_xml.values():
        if c.get('edge') != '1':
            continue
        o, d = ids.get(c.get('source')), ids.get(c.get('target'))
        if not o or not d:
            continue
        e = c.get('style') or ''
        if 'endArrow=block' in e and 'endFill=0' in e:
            tipo = 'Generalización'
        elif 'startArrow=diamondThin' in e and 'startFill=1' in e:
            tipo = 'Composición'
        elif 'dashed=1' in e:
            tipo = 'Dependencia'
        else:
            tipo = 'Asociación'
        relaciones.add((o, tipo, d))
    return clases, relaciones


def objetos_drawio(ruta):
    """{página: [atributos de cada <object>]}"""
    raiz = ET.parse(ruta).getroot()
    paginas = {}
    for d in raiz.iter('diagram'):
        paginas[d.get('name')] = [dict(o.attrib) for o in d.iter('object')]
    return paginas


# ------------------------------------------------------------------ reglas

def pasos_por_id(pasos):
    return {p['id']: p for p in pasos}


def v1():
    errores = []
    cu06 = leer_cu06()
    _, flujos = leer_especificacion()
    for n, casos in cu06.items():
        pasos = flujos.get(n, [])
        if not pasos:
            errores.append(f'Flujo {n}: la especificación no tiene pasos')
            continue
        usados = set()
        for p in pasos:
            if p['cu3'] not in casos:
                errores.append(f'Flujo {n} paso {p["id"]}: «{p["cu3"]}» no es un caso de nivel 3 del flujo en CU-06')
                continue
            usados.add(p['cu3'])
            if p['actor'] != casos[p['cu3']]:
                errores.append(f'Flujo {n} paso {p["id"]}: actor «{p["actor"]}» y CU-06 dice «{casos[p["cu3"]]}»')
        for caso in sorted(set(casos) - usados):
            errores.append(f'Flujo {n}: el caso {caso} de CU-06 no aparece en ningún paso')
    return errores


def v2():
    errores = []
    _, flujos = leer_especificacion()
    for n, pasos in flujos.items():
        por_id = pasos_por_id(pasos)
        for p in pasos:
            if not p['sujeto'] or not p['receptor']:
                errores.append(f'Flujo {n} paso {p["id"]}: la oración necesita sujeto y receptor en negrita')
        principal = [p for p in pasos if p['alt'] is None]
        for a, b in zip(principal, principal[1:]):
            if 'Fin.' in a['texto']:
                continue
            if a['receptor'] != b['sujeto']:
                errores.append(f'Flujo {n}: paso {a["id"]} termina en «{a["receptor"]}» y el paso {b["id"]} empieza con «{b["sujeto"]}»')
        bloques = {}
        for p in pasos:
            if p['alt']:
                bloques.setdefault(p['alt'], []).append(p)
        for encabezado, bloque in bloques.items():
            m = re.search(r'reemplaza (?:el paso|los pasos) (\d+[a-z]?)', encabezado)
            d = re.search(r'después del paso (\d+[a-z]?)', encabezado)
            if m and m.group(1) in por_id:
                if bloque[0]['sujeto'] != por_id[m.group(1)]['sujeto']:
                    errores.append(f'Flujo {n} {encabezado[:30]}: empieza con «{bloque[0]["sujeto"]}» y el paso {m.group(1)} que reemplaza empieza con «{por_id[m.group(1)]["sujeto"]}»')
            elif d and d.group(1) in por_id:
                if bloque[0]['sujeto'] != por_id[d.group(1)]['receptor']:
                    errores.append(f'Flujo {n} {encabezado[:30]}: empieza con «{bloque[0]["sujeto"]}» y el paso {d.group(1)} termina en «{por_id[d.group(1)]["receptor"]}»')
            else:
                errores.append(f'Flujo {n}: el alternativo «{encabezado[:40]}» no dice qué paso reemplaza')
            for a, b in zip(bloque, bloque[1:]):
                if 'Fin.' not in a['texto'] and a['receptor'] != b['sujeto']:
                    errores.append(f'Flujo {n}: paso {a["id"]} termina en «{a["receptor"]}» y el paso {b["id"]} empieza con «{b["sujeto"]}»')
            ultimo = bloque[-1]
            vuelta = re.search(r'(?:Continúa en el|Vuelve al) paso (\d+[a-z]?)', ultimo['texto'])
            if vuelta:
                destino = por_id.get(vuelta.group(1))
                if not destino:
                    errores.append(f'Flujo {n} paso {ultimo["id"]}: vuelve a un paso que no existe ({vuelta.group(1)})')
                elif destino['sujeto'] != ultimo['receptor']:
                    errores.append(f'Flujo {n} paso {ultimo["id"]}: termina en «{ultimo["receptor"]}» y el paso {destino["id"]} empieza con «{destino["sujeto"]}»')
            elif 'Fin.' not in ultimo['texto']:
                errores.append(f'Flujo {n} paso {ultimo["id"]}: el alternativo debe terminar en «Fin.», «Continúa en el paso N» o «Vuelve al paso N»')
    return errores


def v3():
    errores = []
    participantes, flujos = leer_especificacion()
    validos = leer_dominio() | CLASES_SISTEMA
    for nombre, clase in participantes.items():
        if clase not in validos:
            errores.append(f'Participante «{nombre}»: la clase {clase} no es un concepto de DOM-01 ni una clase del sistema')
    for n, pasos in flujos.items():
        for p in pasos:
            for quien in (p['sujeto'], p['receptor']):
                if quien and quien not in participantes:
                    errores.append(f'Flujo {n} paso {p["id"]}: «{quien}» no está en la tabla de participantes')
            if not p['retorno'] and p['sustantivo'] not in validos:
                errores.append(f'Flujo {n} paso {p["id"]}: el sustantivo {p["sustantivo"]} no es un concepto de DOM-01 ni una clase del sistema')
    return errores


def v4():
    errores = []
    participantes, flujos = leer_especificacion()
    clases, relaciones = leer_diccionario()
    padres = superclases(relaciones)
    usados = set()
    for n, pasos in flujos.items():
        for p in pasos:
            sujeto = participantes.get(p['sujeto'])
            receptor = participantes.get(p['receptor'])
            if p['rel'] != (sujeto, receptor):
                errores.append(f'Flujo {n} paso {p["id"]}: la relación {p["rel"]} no es ({sujeto}, {receptor})')
            if p['retorno']:
                continue
            if not p['metodo']:
                errores.append(f'Flujo {n} paso {p["id"]}: falta el método')
                continue
            if p['clase'] != receptor:
                errores.append(f'Flujo {n} paso {p["id"]}: el método es de {p["clase"]} y el receptor es {receptor}')
            params = buscar_metodo(clases, padres, p['clase'], p['metodo'])
            if params is None:
                errores.append(f'Flujo {n} paso {p["id"]}: {p["clase"]}.{p["metodo"]}() no está en CLS-01')
            elif params != p['params']:
                errores.append(f'Flujo {n} paso {p["id"]}: {p["clase"]}.{p["metodo"]}{p["params"]} y CLS-01 dice {params}')
            clase = p['clase']
            while clase and p['metodo'] not in clases.get(clase, {}).get('metodos', {}):
                clase = padres.get(clase)
            usados.add((clase, p['metodo']))
            ancestros, c = set(), sujeto
            while c:
                ancestros.add(c)
                c = padres.get(c)
            if clase and not any(o in ancestros and d == clase for (o, _, d) in relaciones):
                errores.append(f'Flujo {n} paso {p["id"]}: no hay relación de {sujeto} (o una superclase) hacia {clase} en CLS-01')
    for clase, datos in clases.items():
        for metodo in datos['metodos']:
            if (clase, metodo) not in usados:
                errores.append(f'CLS-01: {clase}.{metodo}() no lo usa ningún paso')
    return errores


def v5():
    errores = []
    c1, r1 = leer_diccionario()
    c2, r2 = leer_diagrama_clases()
    for clase in sorted(set(c1) ^ set(c2)):
        errores.append(f'La clase {clase} está solo en {"CLS-01" if clase in c1 else "CLS-02"}')
    for clase in sorted(set(c1) & set(c2)):
        a, b = c1[clase], c2[clase]
        for x in sorted(a['atributos'] ^ b['atributos']):
            errores.append(f'{clase}.{x}: atributo solo en {"CLS-01" if x in a["atributos"] else "CLS-02"}')
        for m in sorted(set(a['metodos']) | set(b['metodos'])):
            if a['metodos'].get(m) != b['metodos'].get(m):
                errores.append(f'{clase}.{m}(): CLS-01 {a["metodos"].get(m)} y CLS-02 {b["metodos"].get(m)}')
    for r in sorted(r1 ^ r2):
        errores.append(f'Relación {r[0]} —{r[1]}→ {r[2]} solo en {"CLS-01" if r in r1 else "CLS-02"}')
    return errores


def v6():
    errores = []
    participantes, flujos = leer_especificacion()
    clases, relaciones = leer_diccionario()
    padres = superclases(relaciones)
    for pagina, objetos in objetos_drawio(SEC01).items():
        m = re.match(r'Flujo (\d)', pagina or '')
        if not m:
            continue
        n = int(m.group(1))
        pasos = pasos_por_id(flujos.get(n, []))
        vidas = {o['nombre']: o['clase'] for o in objetos if o.get('tipo') == 'lifeline'}
        vistos = set()
        for o in objetos:
            if o.get('tipo') not in ('llamada', 'retorno'):
                continue
            paso = pasos.get(o.get('paso'))
            vistos.add(o.get('paso'))
            if not paso:
                errores.append(f'{pagina}: el mensaje del paso {o.get("paso")} no corresponde a ningún paso')
                continue
            if (o.get('desde'), o.get('hacia')) != (paso['sujeto'], paso['receptor']):
                errores.append(f'{pagina} paso {paso["id"]}: va de {o.get("desde")} a {o.get("hacia")} y la especificación dice {paso["sujeto"]} → {paso["receptor"]}')
            for quien in (o.get('desde'), o.get('hacia')):
                if quien not in vidas:
                    errores.append(f'{pagina} paso {paso["id"]}: «{quien}» no tiene línea de vida')
            if o['tipo'] == 'retorno':
                if not paso['retorno']:
                    errores.append(f'{pagina} paso {paso["id"]}: es un retorno y en la especificación es una llamada')
                continue
            if paso['retorno']:
                errores.append(f'{pagina} paso {paso["id"]}: es una llamada y en la especificación es un retorno')
                continue
            etiqueta = re.sub(r'^[\w·\s]+:\s*', '', texto(o.get('label')))
            f = firma(etiqueta)
            clase = vidas.get(o.get('hacia'))
            if not f:
                errores.append(f'{pagina} paso {paso["id"]}: «{etiqueta}» no es una llamada a un método')
                continue
            params = buscar_metodo(clases, padres, clase, f[0])
            if params is None:
                errores.append(f'{pagina} paso {paso["id"]}: {f[0]}() no es un método de {clase} en CLS-01/CLS-02')
            elif params != f[1]:
                errores.append(f'{pagina} paso {paso["id"]}: {f[0]}{f[1]} y la clase dice {params}')
            if (f[0], f[1]) != (paso['metodo'], paso['params']):
                errores.append(f'{pagina} paso {paso["id"]}: {f[0]}{f[1]} y la especificación dice {paso["metodo"]}{paso["params"]}')
        for falta in sorted(set(pasos) - vistos, key=lambda x: (int(re.match(r'\d+', x).group()), x)):
            errores.append(f'{pagina}: el paso {falta} no tiene mensaje')
    return errores


def v7():
    errores = []
    _, flujos = leer_especificacion()
    sec = objetos_drawio(SEC01)
    for pagina, objetos in objetos_drawio(ROB01).items():
        m = re.match(r'Flujo (\d)', pagina or '')
        if not m:
            continue
        n = int(m.group(1))
        pasos = {p['id'] for p in flujos.get(n, []) if not p['retorno']}
        vidas = {o['nombre'] for o in sec.get(pagina, []) if o.get('tipo') == 'lifeline'}
        mensajes = {o.get('paso') for o in sec.get(pagina, []) if o.get('tipo') == 'llamada'}
        for o in objetos:
            if o.get('tipo') in ('actor', 'borde', 'control', 'entidad') and o.get('nombre') not in vidas and o.get('vista') != '1':
                errores.append(f'{pagina}: el objeto «{o.get("nombre")}» no es una línea de vida de SEC-01')
        cubiertos = set()
        for o in objetos:
            if o.get('tipo') != 'conexion':
                continue
            for p in [x.strip() for x in o.get('pasos', '').split(',') if x.strip()]:
                if p not in mensajes:
                    errores.append(f'{pagina}: la conexión cita el paso {p}, que no es una llamada de SEC-01')
                cubiertos.add(p)
        for falta in sorted(pasos - cubiertos, key=lambda x: (int(re.match(r'\d+', x).group()), x)):
            errores.append(f'{pagina}: el paso {falta} no aparece en ninguna conexión')
    return errores


def v8():
    errores = []
    for base, _, archivos in os.walk(RAIZ):
        for a in archivos:
            if not a.endswith('.md'):
                continue
            ruta = os.path.join(base, a)
            contenido = re.sub(r'```.*?```', '', leer(ruta), flags=re.S)
            for destino in re.findall(r'\]\(([^)\s]+)\)', contenido):
                if re.match(r'(https?:|mailto:|#)', destino):
                    continue
                destino = destino.split('#')[0]
                if not os.path.exists(os.path.normpath(os.path.join(base, destino))):
                    errores.append(f'{os.path.relpath(ruta, RAIZ)}: enlace roto a {destino}')
    for ruta in re.findall(r'\| \[`([^`]+)`\]', leer(os.path.join(RAIZ, 'README.md'))):
        if not os.path.exists(os.path.join(RAIZ, ruta)):
            errores.append(f'README: la ruta {ruta} no existe')
    return errores


REGLAS = {'V1': v1, 'V2': v2, 'V3': v3, 'V4': v4, 'V5': v5, 'V6': v6, 'V7': v7, 'V8': v8}


def main():
    pedidas = [r.upper() for r in sys.argv[1:]] or list(REGLAS)
    fallos = 0
    for regla in pedidas:
        try:
            errores = REGLAS[regla]()
        except (OSError, ValueError, ET.ParseError, KeyError, IndexError) as e:
            errores = [f'no se pudo verificar: {type(e).__name__}: {e}']
        estado = 'OK' if not errores else f'{len(errores)} error(es)'
        print(f'{regla}: {estado}')
        for e in errores[:40]:
            print(f'   - {e}')
        if len(errores) > 40:
            print(f'   … y {len(errores) - 40} más')
        fallos += bool(errores)
    sys.exit(1 if fallos else 0)


if __name__ == '__main__':
    main()
