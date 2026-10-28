# Viva Bakery · site

Site de apresentação da Viva Bakery (Rua dos Bambus, 1399, Jardim Glória, Americana, SP), padaria artesanal
da Karina Ruiz e do Gabriel. O cardápio é completo, cada item abre uma ficha e o botão **Pedir este no iFood**
leva direto para aquele produto no iFood.

Publicado em https://azeugral.github.io/viva-bakery/ (com `noindex` até virar oficial).
Feito na mesma base do site do Cafezito.

## Como funciona

- `index.html`, `assets/css/style.css`, `assets/js/site.js`: HTML, CSS e JS puros, sem build.
- `assets/js/cardapio.js`: o cardápio inteiro (45 itens do iFood em 28/10/2026; ficaram de fora refrigerante, tônica e cartão postal), o horário da semana e os
  textos dos destaques por hora. O link do item é `link da loja + ?prato=<código>` e abre o iFood já no
  produto. Item sem código cai na loja.
- `assets/js/fumaca.js`: a fumaça do hero (o shader do Zaparolli, no modo 3, que ocupa a área toda), sobre o
  verde. No celular é o MP4 `assets/video/fumaca-celular.mp4` (`tools/gerar_fumaca.py`). O mesmo vídeo
  sobe na cor do item na ficha dos itens sem foto.
- **Agora na Viva:** os destaques mudam com a hora de São Paulo (manhã, almoço, café da tarde). O status
  mostra se está aberto, e o domingo só conta quando é o último do mês.
- **Link de um item:** `#item/canele` abre a ficha direto, para usar em story ou no WhatsApp.
- **Modo balcão:** `?balcao` esconde todos os botões do iFood, para usar em QR code nas mesas.
- O logo é o monograma VB enviado pelo cliente (`_ref/logo/vb-monograma.webp`), transformado em PNG
  transparente creme por `tools/processar.py`. Vai no hero, no topo, no rodapé, no ícone e na og, sempre
  com o nome "Viva Bakery" em Libre Caslon ao lado ou embaixo.
- Fotos: 32 do Instagram (recortes em `tools/processar.py`) e 20 do próprio iFood em 900x675
  (`_ref/ifood/<id>.jpg`, saem como `if-<slug>`). 9 itens também não têm foto no iFood e ficam com a cor
  do item e a fumaça.

## Ferramentas

| Comando | O que faz |
|---|---|
| `python -I tools/processar.py` | recorta as fotos (Instagram, quadros de vídeo e iFood) e gera o logo |
| `python -I tools/gerar_fumaca.py` | renderiza o MP4 da fumaça para o celular (`--teste` salva quadros) |
| `python -I tools/og.py` | gera og.jpg, favicon e apple-touch-icon |
| `python -I tools/prints.py` | prints de revisão em PC e celular (`--ficha slug` para uma ficha) |

Depois de mudar CSS, JS ou vídeo, subir o `?v=` no `index.html`, senão o navegador serve a versão antiga.

## CONFIRMAR com o cliente

- [ ] Domingo: a bio diz "abertos todo último domingo do mês", e os posts recentes falam em 9h às 14h. O site
      usa esse horário e só considera aberto no último domingo.
- [ ] O WhatsApp (19) 98334-9032 veio do Perfil do Google. É o de atendimento?
- [ ] Preços: o site mostra os do iFood. No balcão são outros?
- [ ] Fotos de Sanduíche no Croissant, Croque Monsieur, Croque Forestier, Bolo Inglês de Cacau, Chocolate Quente,
      Cafés Gelados, Granola e Mousse: não estão nem no Instagram nem no iFood.
- [ ] Se dá para usar as fotos da Karina, do Gabriel e do Pumpkin, e as do salão (estas são quadros de vídeo).
- [ ] Os links dos cursos são de afiliado Hotmart do Linktree. São os oficiais?
- [ ] Domínio e tirar o `noindex` quando for oficial.
- [ ] Se um produto for recriado no iFood, o código muda: atualizar o `ifood` daquele item em `cardapio.js`.

Site por L R G Z.
