"""Prints de revisão do site local (http://localhost:8835) em PC e celular, salvos em ../_ref/prints.

Uso: python -I tools/prints.py [url] [--ficha slug]
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ.parent / "_ref" / "prints"
URL = next((a for a in sys.argv[1:] if a.startswith("http")), "http://localhost:8836/")
SECOES = [".agora", "#vitrine", "#carta", "#casa", ".dupla", "#oficio", ".trio", "#cursos", ".lugar", ".lugar__grade", ".eventos", "#visite", ".rodape"]
FICHA = sys.argv[sys.argv.index("--ficha") + 1] if "--ficha" in sys.argv else None


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        b = pw.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        for nome, w, h, mob in (("pc", 1440, 900, False), ("cel", 390, 844, True)):
            pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1, is_mobile=mob, has_touch=mob)
            pg.goto(URL + (f"#item/{FICHA}" if FICHA else ""), wait_until="networkidle")
            pg.wait_for_timeout(3500)
            pg.screenshot(path=str(SAIDA / f"{nome}-topo.png"))
            if FICHA:
                continue
            # rola tudo para disparar as revelações e o carregamento das imagens
            alt = pg.evaluate("document.body.scrollHeight")
            for y in range(0, alt, 500):
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(120)
            pg.evaluate("document.querySelectorAll('.revela').forEach(e=>e.classList.add('visto'))")
            # um print por seção (o full_page do headless repete trechos em páginas longas)
            for k, sel in enumerate(SECOES):
                pg.evaluate(f"document.querySelector('{sel}').scrollIntoView()")
                pg.wait_for_timeout(700)
                pg.screenshot(path=str(SAIDA / f"{nome}-{k}.png"))
            pg.close()
        b.close()
    print("prints em", SAIDA)


if __name__ == "__main__":
    main()
