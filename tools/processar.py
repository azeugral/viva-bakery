"""Recorta e otimiza as fotos do Instagram (../_ref/ig) e os quadros de vídeo (../_ref/quadros) para assets/img,
e gera o logo gravado em PNG transparente nas cores do site.

Cada foto sai em duas larguras (-md 720 px, -lg 1280 px) em WebP, no recorte pedido.
Os arquivos de origem são "NNN-K.jpg" (ou "NNN-K-v.jpg", capa de vídeo): NNN é o post (0 = mais recente,
contando a partir de 27/10/2026) e K a foto do carrossel. Quadros de vídeo vêm como "q:nome".

Uso: python -I tools/processar.py
"""
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ.parent / "_ref" / "ig"
QUADROS = RAIZ.parent / "_ref" / "quadros"
SAIDA = RAIZ / "assets" / "img"

# nome: (origem, proporção w/h, foco vertical 0..1, foco horizontal 0..1)
FOTOS = {
    # cardápio
    "canele": ("006-2", 4 / 5, .5, .5),
    "caneles-prato": ("039-2", 4 / 5, .5, .5),
    "croissant": ("055-2", 4 / 5, .5, .5),
    "croissants": ("055-3", 4 / 5, .5, .5),
    "cruffin": ("021-1", 4 / 5, .5, .5),
    "morning-bun": ("015-1", 4 / 5, .5, .5),
    "pain-au-chocolat": ("004-4", 4 / 5, .5, .5),
    "ovo-poche": ("110-0", 4 / 5, .5, .5),
    "delirium": ("000-1", 4 / 5, .5, .5),
    "waffle": ("095-1", 4 / 5, .5, .5),
    "pizza-ny": ("053-3", 4 / 5, .5, .5),
    "pizza-taglio": ("053-2", 4 / 5, .5, .5),
    "queijo-quente": ("115-3", 4 / 5, .5, .5),
    "tartine": ("022-2", 4 / 5, .5, .5),
    "torta-maca": ("094-1", 4 / 5, .5, .5),
    "cafe": ("004-7", 4 / 5, .5, .5),
    "cafe-abobora": ("001-0", 4 / 5, .5, .5),
    "paes": ("112-4", 4 / 5, .5, .5),
    # a casa e o ofício
    "karina-gabriel": ("012-0", 4 / 5, .5, .5),
    "karina": ("061-4", 4 / 5, .3, .5),
    "massas": ("014-14", 4 / 5, .5, .5),
    "rigatoni": ("014-16", 4 / 5, .5, .5),
    "caneles-abobora": ("004-9", 4 / 5, .5, .5),
    "galette": ("106-2", 4 / 5, .5, .5),
    "supper": ("007-0", 4 / 5, .5, .5),
    # o lugar
    "fachada": ("092-0", 4 / 5, .5, .5),
    "letreiro": ("092-1", 4 / 5, .45, .5),
    "arvore": ("092-11", 4 / 5, .5, .5),
    "salao": ("q:097-14", 4 / 5, .55, .5),
    "jardim": ("q:097-20", 4 / 5, .55, .5),
    "estante": ("q:097-26", 4 / 5, .5, .5),
    "vidro": ("q:013-12", 4 / 5, .55, .5),
}


def achar(origem):
    if origem.startswith("q:"):
        return QUADROS / f"{origem[2:]}.jpg"
    for nome in (f"{origem}.jpg", f"{origem}-v.jpg"):
        if (ORIGEM / nome).exists():
            return ORIGEM / nome
    raise FileNotFoundError(origem)


def recortar(im, prop, fy, fx):
    w, h = im.size
    if w / h > prop:
        nw = round(h * prop)
        x = round((w - nw) * fx)
        return im.crop((x, 0, x + nw, h))
    nh = round(w / prop)
    y = round((h - nh) * fy)
    return im.crop((0, y, w, y + nh))


def salvar(im, nome):
    for sufixo, largura in (("md", 720), ("lg", 1280)):
        largura = min(largura, im.width)
        alt = round(im.height * largura / im.width)
        im.resize((largura, alt), Image.LANCZOS).save(SAIDA / f"{nome}-{sufixo}.webp", quality=82, method=6)


def logo():
    """A arte gravada do post 092 (tinta preta no branco) vira PNG transparente: a tinta é o alfa."""
    arte = ImageOps.grayscale(Image.open(ORIGEM / "092-5.jpg"))
    tinta = ImageOps.invert(arte).point(lambda v: 0 if v < 28 else min(255, int((v - 28) * 1.25)))
    caixa = tinta.getbbox()
    tinta = tinta.crop((caixa[0] - 8, caixa[1] - 8, caixa[2] + 8, caixa[3] + 8))
    for nome, cor in (("logo-creme", (244, 236, 223)), ("logo-tinta", (28, 40, 32))):
        out = Image.new("RGBA", tinta.size, cor + (0,))
        out.putalpha(tinta)
        out.save(SAIDA / f"{nome}.png", optimize=True)
        menor = out.resize((640, round(out.height * 640 / out.width)), Image.LANCZOS)
        menor.save(SAIDA / f"{nome}-sm.png", optimize=True)


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    for nome, (origem, prop, fy, fx) in FOTOS.items():
        im = Image.open(achar(origem)).convert("RGB")
        salvar(ImageEnhance.Contrast(recortar(im, prop, fy, fx)).enhance(1.03), nome)
    logo()
    print(len(FOTOS), "fotos e o logo em", SAIDA)


if __name__ == "__main__":
    main()
