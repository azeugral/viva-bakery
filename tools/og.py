"""Gera assets/img/og.jpg (1200x630), favicon.png (64) e apple-touch-icon.png (180) num Chromium headless.
A og tem a fumaça do hero (assets/js/fumaca.js) sobre o verde e o monograma VB com o nome no centro, dentro do
quadrado central de 630 px, porque o WhatsApp corta a miniatura em quadrado. O ícone é o monograma
num círculo verde.

Uso: python -I tools/og.py
"""
import base64
from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
IMG = RAIZ / "assets" / "img"
FONTE = '<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=IBM+Plex+Sans:wght@500&display=swap" rel="stylesheet">'
VERDE, CREME = "#18291f", "#f4ecdf"


def main():
    fumaca = (RAIZ / "assets" / "js" / "fumaca.js").read_text(encoding="utf-8")
    logo = "data:image/png;base64," + base64.b64encode((IMG / "logo-creme-sm.png").read_bytes()).decode()  # set_content não lê file://
    og = f"""<html><head>{FONTE}<style>
    body{{margin:0;background:{VERDE};font-family:'IBM Plex Sans',sans-serif;color:{CREME}}}
    .og{{position:relative;width:1200px;height:630px;overflow:hidden;background:{VERDE}}}
    .og canvas{{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:screen}}
    .og .veu{{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(24,41,31,.82) 0,rgba(24,41,31,.5) 38%,rgba(24,41,31,0) 70%)}}
    .og .tx{{position:absolute;left:285px;top:0;width:630px;height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center}}
    .og img{{width:230px}}
    .og h1{{margin:20px 0 0;font:400 92px/1 'Libre Caslon Display',serif;letter-spacing:-.01em}}
    .og p{{margin:22px 0 0;font-size:19px;letter-spacing:.24em;text-transform:uppercase;color:#d98a52;font-weight:500}}
    </style></head><body><div class="og"><canvas id="c" width="1200" height="630"></canvas>
    <div class="veu"></div><div class="tx"><img src="{logo}"><h1>Viva Bakery</h1><p>Padaria artesanal · Americana</p></div></div></body></html>"""
    icone = f"""<html><head>{FONTE}<style>body{{margin:0;background:transparent}}
    .s{{width:180px;height:180px;border-radius:50%;background:{VERDE};display:flex;align-items:center;justify-content:center}}
    .s img{{width:122px}}</style></head>
    <body><div class="s"><img src="{logo}"></div></body></html>"""
    with sync_playwright() as pw:
        b = pw.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = b.new_page(viewport={"width": 1200, "height": 630})
        pg.set_content(og, wait_until="networkidle")
        pg.add_script_tag(content=fumaca)
        pg.evaluate("fumacaGL(document.getElementById('c'), {modo: 3, forca: 1.6, preserveDrawingBuffer: true}).desenhar(1.0)")
        pg.wait_for_timeout(600)
        pg.screenshot(path=str(IMG / "og.jpg"), type="jpeg", quality=88)
        pg = b.new_page(viewport={"width": 180, "height": 180})
        pg.set_content(icone, wait_until="networkidle")
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(IMG / "apple-touch-icon.png"), omit_background=True)
        b.close()
    from PIL import Image
    Image.open(IMG / "apple-touch-icon.png").resize((64, 64), Image.LANCZOS).save(IMG / "favicon.png")
    print("og.jpg, favicon.png e apple-touch-icon.png em", IMG)


if __name__ == "__main__":
    main()
