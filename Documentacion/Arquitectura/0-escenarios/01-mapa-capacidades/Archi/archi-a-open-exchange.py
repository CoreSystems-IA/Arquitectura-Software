"""Convierte un modelo nativo de Archi (.archimate) a ArchiMate 3.1 Open Exchange (XML).

Uso: python -I archi-a-open-exchange.py mapa-capacidades-y-casos-de-uso-etapa3.archimate mapa-capacidades-y-casos-de-uso-etapa3.xml
"""
import sys
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape, quoteattr

XSI = "{http://www.w3.org/2001/XMLSchema-instance}type"
STRATEGY = {"Capability", "ValueStream", "Resource", "CourseOfAction"}
BUSINESS_PREFIX = "Business"
APPLICATION_PREFIX = "Application"


def tipo(el):
    return el.get(XSI).split(":")[1]


def texto(tag, valor, ind):
    return f'{ind}<{tag} xml:lang="es">{escape(valor)}</{tag}>' if valor else ""


def main(origen, destino):
    raiz = ET.parse(origen).getroot()
    elementos, relaciones, vistas = [], [], []
    for el in raiz.iter("element"):
        t = tipo(el)
        if t == "ArchimateDiagramModel":
            vistas.append(el)
        elif t.endswith("Relationship"):
            relaciones.append(el)
        else:
            elementos.append(el)

    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<model xmlns="http://www.opengroup.org/xsd/archimate/3.0/" '
           'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
           'xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ '
           'http://www.opengroup.org/xsd/archimate/3.1/archimate3_Diagram.xsd" '
           f'identifier={quoteattr(raiz.get("id"))}>',
           texto("name", raiz.get("name"), "  ")]
    purpose = raiz.find("purpose")
    if purpose is not None and purpose.text:
        out.append(texto("documentation", purpose.text, "  "))

    out.append("  <elements>")
    for el in elementos:
        doc = el.find("documentation")
        cuerpo = f'<name xml:lang="es">{escape(el.get("name", "").strip())}</name>'
        if doc is not None and doc.text:
            cuerpo += f'<documentation xml:lang="es">{escape(doc.text)}</documentation>'
        out.append(f'    <element identifier={quoteattr(el.get("id"))} xsi:type="{tipo(el)}">{cuerpo}</element>')
    out.append("  </elements>")

    out.append("  <relationships>")
    for r in relaciones:
        t = tipo(r).replace("Relationship", "")
        extra = ""
        if t == "Access":
            extra = ' accessType="{}"'.format({"0": "Write", "1": "Read", "2": "Access", "3": "ReadWrite"}.get(r.get("accessType", "0"), "Write"))
        if t == "Association":
            extra = ' isDirected="{}"'.format("true" if r.get("directed") == "true" else "false")
        cuerpo = ""
        if r.get("name"):
            cuerpo += f'<name xml:lang="es">{escape(r.get("name"))}</name>'
        doc = r.find("documentation")
        if doc is not None and doc.text:
            cuerpo += f'<documentation xml:lang="es">{escape(doc.text)}</documentation>'
        apertura = (f'    <relationship identifier={quoteattr(r.get("id"))} source={quoteattr(r.get("source"))} '
                    f'target={quoteattr(r.get("target"))} xsi:type="{t}"{extra}')
        out.append(f"{apertura}>{cuerpo}</relationship>" if cuerpo else f"{apertura}/>")
    out.append("  </relationships>")

    # Organización por capa, como la exportación original.
    capas = {"Strategy": [], "Business": [], "Application": [], "Other": [], "Relations": [], "Views": []}
    for el in elementos:
        t = tipo(el)
        if t in STRATEGY:
            capas["Strategy"].append(el.get("id"))
        elif t.startswith(BUSINESS_PREFIX):
            capas["Business"].append(el.get("id"))
        elif t.startswith(APPLICATION_PREFIX):
            capas["Application"].append(el.get("id"))
        else:
            capas["Other"].append(el.get("id"))
    capas["Relations"] = [r.get("id") for r in relaciones]
    capas["Views"] = [v.get("id") for v in vistas]
    out.append("  <organizations>")
    for etiqueta, ids in capas.items():
        if ids:
            items = "".join(f'<item identifierRef="{i}"/>' for i in ids)
            out.append(f'    <item><label xml:lang="es">{etiqueta}</label>{items}</item>')
    out.append("  </organizations>")

    out.append("  <views>")
    out.append("    <diagrams>")
    for v in vistas:
        out.append(f'      <view identifier={quoteattr(v.get("id"))} xsi:type="Diagram">'
                   f'<name xml:lang="es">{escape(v.get("name", ""))}</name>')
        conexiones = []

        def nodo(ch, x0, y0, ind):
            b = ch.find("bounds")
            x = x0 + int(b.get("x", 0))
            y = y0 + int(b.get("y", 0))
            w = int(b.get("width", -1))
            h = int(b.get("height", -1))
            w = 120 if w < 0 else w
            h = 55 if h < 0 else h
            t = tipo(ch)
            if t in ("DiagramModelArchimateObject", "DiagramObject") and ch.get("archimateElement"):
                cab = f'{ind}<node identifier={quoteattr(ch.get("id"))} elementRef={quoteattr(ch.get("archimateElement"))} xsi:type="Element" x="{x}" y="{y}" w="{w}" h="{h}"'
                cuerpo = ""
            else:
                contenido = ch.get("name") or (ch.findtext("content") or "")
                xtipo = "Container" if t == "DiagramModelGroup" else "Label"
                cab = f'{ind}<node identifier={quoteattr(ch.get("id"))} xsi:type="{xtipo}" x="{x}" y="{y}" w="{w}" h="{h}"'
                cuerpo = f'<label xml:lang="es">{escape(contenido)}</label>'
            for sc in ch.findall("sourceConnection"):
                conexiones.append(sc)
            hijos = ch.findall("child")
            if not hijos:
                out.append(f"{cab}>{cuerpo}</node>" if cuerpo else f"{cab}/>")
                return
            out.append(f"{cab}>{cuerpo}")
            for h2 in hijos:
                nodo(h2, x, y, ind + "  ")
            out.append(f"{ind}</node>")

        for ch in v.findall("child"):
            nodo(ch, 0, 0, "        ")
        for c in conexiones:
            if c.get("archimateRelationship"):
                out.append(f'        <connection identifier={quoteattr(c.get("id"))} relationshipRef={quoteattr(c.get("archimateRelationship"))} '
                           f'xsi:type="Relationship" source={quoteattr(c.get("source"))} target={quoteattr(c.get("target"))}/>')
            else:
                out.append(f'        <connection identifier={quoteattr(c.get("id"))} xsi:type="Line" '
                           f'source={quoteattr(c.get("source"))} target={quoteattr(c.get("target"))}/>')
        out.append("      </view>")
    out.append("    </diagrams>")
    out.append("  </views>")
    out.append("</model>")
    with open(destino, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(l for l in out if l) + "\n")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
