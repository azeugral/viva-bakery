"""Renderiza a fumaça (assets/js/fumaca.js) quadro a quadro num Chromium headless e gera o MP4 das telas
de toque (assets/video/fumaca-celular.mp4, também usado na ficha de item sem foto) e o pôster.
O loop fecha sem emenda (fase 0 -> 2π). Modo, força e ciclo têm que bater com o site.js.

Uso: python -I tools/gerar_fumaca.py [--teste]   (--teste só salva quadros em ../_ref/folhas)
"""
import base64
import subprocess
import sys
from io import BytesIO
from pathlib import Path

import imageio_ffmpeg
from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
VID = RAIZ / "assets" / "video"
FPS = 24
MODO, FORCA, CICLO = 3, 1.6, 40
VERSOES = [("fumaca-celular", 720, 1560)]


def preparar(pg, w, h):
    pg.set_viewport_size({"width": w, "height": h})
    pg.evaluate(f"""(() => {{ document.body.innerHTML = '<canvas id="c"></canvas>';
        window.T = fumacaGL(document.getElementById('c'), {{preserveDrawingBuffer: true, modo: {MODO}, forca: {FORCA}}}); T.tamanho({w}, {h}); }})()""")


def quadro(pg, fase):
    return base64.b64decode(pg.evaluate(f"(T.desenhar({fase}), document.getElementById('c').toDataURL('image/png'))").split(",", 1)[1])


def main():
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = b.new_page()
        pg.set_content('<body style="margin:0;background:#000"></body>')
        pg.add_script_tag(content=(RAIZ / "assets" / "js" / "fumaca.js").read_text(encoding="utf-8"))
        if "--teste" in sys.argv:
            for nome, w, h in (("pc", 1440, 900), ("cel", 540, 1170)):
                preparar(pg, w, h)
                (RAIZ.parent / "_ref" / "folhas" / f"fumaca-{nome}.png").write_bytes(quadro(pg, 1.0))
            print("quadros de teste em _ref/folhas")
            return
        VID.mkdir(parents=True, exist_ok=True)
        for nome, w, h in VERSOES:
            mp4 = VID / f"{nome}.mp4"
            enc = subprocess.Popen([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS),
                                    "-c:v", "png", "-i", "-", "-vf", "scale=540:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "24",
                                    "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart", "-an", str(mp4)], stdin=subprocess.PIPE)
            preparar(pg, w, h)
            total = FPS * CICLO
            for i in range(total):
                png = quadro(pg, i / total * 6.283185307179586)
                enc.stdin.write(png)
                if i == 0:
                    Image.open(BytesIO(png)).convert("RGB").resize((540, 1170)).save(RAIZ / "assets" / "img" / "fumaca-poster.webp", quality=80)
            enc.stdin.close()
            enc.wait()
            print(mp4.name, round(mp4.stat().st_size / 1e6, 2), "MB", flush=True)
        b.close()


if __name__ == "__main__":
    main()
