/* Cardápio da Viva Bakery, igual ao iFood em 28/10/2026.
   ifood: o código do item na loja (o link abre direto no produto). Sem código, o botão cai na loja.
   foto: nome em assets/img (sem -md/-lg); "if-" são as fotos do próprio iFood (tools/processar.py). cor: o tom que a ficha do item assume.
   combina: slugs sugeridos na ficha. momento: manha | almoco | tarde (destaques conforme a hora). */
window.VIVA = {
  nome: "Viva Bakery",
  loja: "https://www.ifood.com.br/delivery/americana-sp/viva-bakery-jardim-sao-paulo/2eeeb6f3-771f-405a-a0f2-e9079b4689db",
  // horário por dia da semana (0 = domingo), em horas; domingo só no último do mês
  horario: { 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 16], 0: [9, 14, "ultimo"] },
  // destaques do momento: [até que hora vale, título, texto]
  momentos: {
    manha: [11.5, "Pra começar o dia", "Folhados saindo do forno, café coado e o que acabou de ir pra vitrine."],
    almoco: [15, "Pro almoço", "A cozinha abre às 11h30: tartines, sanduíches no brioche e pizza al taglio."],
    tarde: [24, "Pro café da tarde", "Canelé, cruffin e a confeitaria da casa, enquanto ainda tem."]
  },
  categorias: [
    { id: "folhados", nome: "Viennoiserie", linha: "Massa folhada laminada aqui, com manteiga de verdade e tempo." },
    { id: "salgados", nome: "Salgados", linha: "Folhados, sanduíches no brioche e tartines." },
    { id: "almoco", nome: "Almoço e pizza", linha: "A cozinha abre às 11h30. A pizza é romana, de longa fermentação." },
    { id: "confeitaria", nome: "Confeitaria", linha: "Canelé, tortas, cheesecake e as sobremesas da casa." },
    { id: "paes", nome: "Pães", linha: "Fermentação natural, pra levar pra casa." },
    { id: "bebidas", nome: "Bebidas", linha: "Café da Virginia Coffee Roasters, chocolate e gelados." },
    { id: "mercado", nome: "Mercado", linha: "Granola, café em grão e moído, mousse no pote." }
  ],
  itens: [
    { slug: "croissant", nome: "Croissant Tradicional", cat: "folhados", preco: "25,00", desc: "Massa folhada amanteigada.", foto: "croissant", cor: "#8a5320", ifood: "c8949a55-c04b-4fca-9221-2c01c7a7c9d7", combina: ["cafe-coado", "chocolate-quente"], momento: ["manha"] },
    { slug: "morning-bun", nome: "Morning Bun", cat: "folhados", preco: "35,00", desc: "Massa folhada com laranja e canela.", foto: "morning-bun", cor: "#9a5a1e", ifood: "6b47fe80-1ceb-44f5-943e-78887be70fce", combina: ["cafe-coado"], momento: ["manha"] },
    { slug: "pain-au-chocolat", nome: "Pain au Chocolat", cat: "folhados", preco: "29,00", desc: "Massa folhada com gotas de chocolate.", foto: "pain-au-chocolat", cor: "#5a3418", ifood: "9018af41-b8af-4132-8279-d8e166c4c7a2", combina: ["cafe-gelado-baunilha"], momento: ["manha"] },
    { slug: "frangipane", nome: "Frangipane", cat: "folhados", preco: "42,00", desc: "Massa folhada recheada com creme de amêndoas.", foto: "if-frangipane", cor: "#8c6a3a", ifood: "856a180a-0a0d-49b6-9cd4-8eef18733df2", combina: ["cafe-coado"] },
    { slug: "frangipane-chocolat", nome: "Frangipane no Pain au Chocolat", cat: "folhados", preco: "42,00", desc: "Massa folhada com gotas de chocolate, recheada com creme de amêndoas.", foto: "if-frangipane-chocolat", cor: "#6b4424", ifood: "17cf10b8-af4a-41d8-bd5e-8e6a193f6aa9", combina: ["chocolate-quente"] },
    { slug: "escargot-pistache", nome: "Escargot de Pistache", cat: "folhados", preco: "50,00", desc: "Massa folhada recheada com mousseline de pistache.", foto: "if-escargot-pistache", cor: "#5c6b2e", ifood: "c57429a3-8ffd-4da8-ae67-ce843d81434f", combina: ["matcha"] },
    { slug: "cruffin", nome: "Cruffin de Pistache", cat: "folhados", preco: "50,00", desc: "Massa folhada recheada com creme confeiteiro de pistache e geleia de frutas vermelhas. A casa faz cruffin desde 2018.", foto: "cruffin", cor: "#6f6a32", ifood: "96e6d5ba-bf5b-4a81-a38a-dd43a03fcf63", combina: ["cafe-gelado-caramelo"], momento: ["tarde"] },
    { slug: "palmier", nome: "Palmier", cat: "folhados", preco: "19,00", desc: "Massa folhada caramelizada com açúcar.", foto: "if-palmier", cor: "#a0691f", ifood: "e0aa8a07-3a4d-4cba-ada5-748ddfe9b2ec", combina: ["cafe-coado"] },
    { slug: "palmier-chocolate", nome: "Palmier com Chocolate", cat: "folhados", preco: "22,00", desc: "Folhado açucarado coberto com chocolate meio amargo.", foto: "if-palmier-chocolate", cor: "#4a2a18", ifood: "a1586bf0-ffa3-48de-ad18-8e3b592989a1", combina: ["cafe-coado"] },
    { slug: "folhado-morango", nome: "Doce Folhado de Morango e Baunilha", cat: "folhados", preco: "36,00", desc: "No pote: massa folhada caramelizada, creme de baunilha e morangos frescos.", foto: "if-folhado-morango", cor: "#9a2e36", ifood: "a3bae3f7-855a-4707-a5b7-e6b4fd91590b", combina: ["lemonade"] },

    { slug: "ovo-poche", nome: "Folhado de Ovo Pochê", cat: "salgados", preco: "58,00", desc: "Massa folhada recheada com creme de queijo e muçarela, com ovo pochê e molho hollandaise. Uma criação da casa.", foto: "ovo-poche", cor: "#a77a14", ifood: "314761e1-4d75-4b27-8c78-e48dc09b6cf0", combina: ["cafe-coado"], momento: ["manha", "almoco"] },
    { slug: "queijo-quente", nome: "Queijo Quente", cat: "salgados", preco: "54,00", desc: "Muçarela no brioche folhado, com manteiga de canelé.", foto: "queijo-quente", cor: "#a8781e", ifood: "0469dc3a-a03d-40a9-b126-97c413114644", combina: ["lemonade"], momento: ["almoco"] },
    { slug: "sanduiche-croissant", nome: "Sanduíche no Croissant", cat: "salgados", preco: "38,00", desc: "Massa folhada com creme de queijo, muçarela, mix de folhas e tomate.", cor: "#6e7a32", ifood: "85f4bf1c-558a-4c5e-903b-e1068d43330f", combina: ["lemonade"] },
    { slug: "croque-monsieur", nome: "Croque Monsieur", cat: "salgados", preco: "57,00", desc: "Brioche com mostarda, bechamel e muçarela, com ovo frito por cima.", cor: "#9a6a24", ifood: "85c60995-e05f-454f-9565-5a4b5442ad56", combina: ["cafe-coado"] },
    { slug: "croque-forestier", nome: "Croque Forestier", cat: "salgados", preco: "62,00", desc: "Brioche com bechamel e muçarela, acompanhado de cogumelos.", cor: "#6b5236", ifood: "12f023f8-3594-4e78-9344-5b50278b7646", combina: ["cafe-coado"] },
    { slug: "tartine", nome: "Tartine", cat: "salgados", preco: "55,00", desc: "Pão italiano com homus, tomatinhos assados, muçarela fresca e manjericão.", foto: "tartine", cor: "#8f3a24", ifood: "2d7b4aa5-3c37-4989-a14f-de6d3a3f456f", combina: ["lemonade"], momento: ["almoco"] },

    { slug: "nova-york", nome: "Pizza Nova York (fatia)", cat: "almoco", preco: "32,00", desc: "Molho de tomate, parmesão e stracciatella.", foto: "pizza-ny", cor: "#9a3220", ifood: "c06e48cd-1e5f-4db0-8488-c4ea9a6a2dd5", combina: ["lemonade"], momento: ["almoco"] },
    { slug: "pizza-taglio", nome: "Pizza al Taglio Margherita", cat: "almoco", preco: "44,00", desc: "Estilo romano, massa de longa fermentação, em fatias retangulares de 20 x 12 cm.", foto: "pizza-taglio", cor: "#a1361f", ifood: "3a8c5705-c653-4628-999a-cf621ed7b002", combina: ["lemonade"], momento: ["almoco"] },
    { slug: "shakshuka", nome: "Shakshuka", cat: "almoco", preco: "50,00", desc: "Molho de tomate com ovos pochê e pão italiano.", foto: "if-shakshuka", cor: "#8f2c1c", ifood: "4019830c-15c5-4600-a2df-45a011f26b84", combina: ["pao-italiano"] },
    { slug: "salada-labneh", nome: "Salada de Labneh", cat: "almoco", preco: "62,00", desc: "Labneh com ovo pochê, cogumelos, tomatinho e pão italiano.", foto: "if-salada-labneh", cor: "#5d6b3a", ifood: "d1f9acbc-cc05-4fdd-8245-3049339803a0", combina: ["lemonade"] },

    { slug: "canele", nome: "Canelé de Bordeaux", cat: "confeitaria", preco: "17,00", desc: "Flan francês de rum e baunilha, crocante por fora e macio por dentro. O doce que fez a fama da Karina.", foto: "canele", cor: "#5a2a14", ifood: "35ac5d63-6b59-4c5a-a9fc-1123abf0774e", combina: ["cafe-coado", "delirium"], momento: ["tarde"] },
    { slug: "delirium", nome: "Viva Delirium", cat: "confeitaria", preco: "50,00", desc: "Creme diplomata, bolo de cacau e crémeux de avelãs.", foto: "delirium", cor: "#3e2416", ifood: "07e8461b-bcb0-4a48-b9c9-9d7093ca5a06", combina: ["canele"], momento: ["tarde"] },
    { slug: "waffle", nome: "Waffle com Frutas Vermelhas", cat: "confeitaria", preco: "54,00", desc: "Frutas vermelhas frescas, geleia feita na casa e mel.", foto: "waffle", cor: "#9a1f30", ifood: "0f49e58c-e83c-410f-a682-75bdb161c2ee", combina: ["cafe-coado"], momento: ["manha", "tarde"] },
    { slug: "torta-maca", nome: "Torta de Maçã (fatia)", cat: "confeitaria", preco: "40,00", desc: "Torta americana com maçãs, canela e cardamomo.", foto: "torta-maca", cor: "#8a5222", ifood: "d1d2f3d0-c043-4355-beba-778fe29e320f", combina: ["cafe-coado"], momento: ["tarde"] },
    { slug: "rabanada", nome: "Rabanada", cat: "confeitaria", preco: "50,00", desc: "Brioche na calda de leite e especiarias, tostado na frigideira, com creme inglês de baunilha.", foto: "if-rabanada", cor: "#9c6a2a", ifood: "32b8f298-a491-4ef5-a0d4-d29fefd3e483", combina: ["cafe-coado"] },
    { slug: "financier", nome: "Financier de Pistache", cat: "confeitaria", preco: "25,00", desc: "Bolinho de farinha de amêndoas assado com pistache.", foto: "if-financier", cor: "#6d6e30", ifood: "82e07142-1bd9-4beb-b277-39d84b183ef1", combina: ["cafe-coado"] },
    { slug: "pavlova", nome: "Pavlova", cat: "confeitaria", preco: "45,00", desc: "Suspiro com creme de baunilha, geleia de frutas vermelhas e frutas frescas.", foto: "if-pavlova", cor: "#a0384a", ifood: "c5c38512-a5cd-40f3-a268-a90f0d36e04a", combina: ["lemonade"] },
    { slug: "cheesecake", nome: "Cheesecake Tradicional (fatia)", cat: "confeitaria", preco: "45,00", desc: "A clássica, em fatia.", foto: "if-cheesecake", cor: "#a58a5a", ifood: "56684886-e6ef-43d5-af59-e2aa034b3000", combina: ["cafe-coado"] },
    { slug: "cheesecake-caramelo", nome: "Cheesecake de Caramelo (fatia)", cat: "confeitaria", preco: "35,00", desc: "Com caramelo e amêndoas.", foto: "if-cheesecake-caramelo", cor: "#9a5f1e", ifood: "f090b0e8-0a3e-43e3-9c44-2e3059725ff0", combina: ["cafe-coado"] },
    { slug: "bolo-cacau", nome: "Bolo Inglês 100% Cacau", cat: "confeitaria", preco: "50,00", desc: "Vegano, inteiro.", cor: "#3a2016", ifood: "5a14269d-c8b7-403e-a4b1-b2d3b1c95467", combina: ["cafe-coado"] },

    { slug: "pao-italiano", nome: "Pão Italiano Integral", cat: "paes", preco: "42,00", desc: "Fermentação natural, farinha integral.", foto: "paes", cor: "#6e4a26", ifood: "3f654abd-d8a4-4fb6-85e1-716f554f0c79", combina: ["granola"], momento: ["manha"] },
    { slug: "pain-de-mie", nome: "Pain de Mie", cat: "paes", preco: "42,00", desc: "Pão de forma de fermentação natural, 100% integral, com mel e manteiga.", foto: "if-pain-de-mie", cor: "#8a6a3a", ifood: "95f91286-7b9c-4055-af80-00f60ec82a78", combina: ["granola"] },
    { slug: "pao-fuba", nome: "Pão de Fubá", cat: "paes", preco: "48,00", desc: "Pão de forma feito com fubá.", foto: "if-pao-fuba", cor: "#b08a24", ifood: "a2d30db0-a440-4b90-853a-ab6de129eff6", combina: ["cafe-coado"] },
    { slug: "honey-butter", nome: "Honey Butter Toast", cat: "paes", preco: "45,00", desc: "Brioche tostado com mel e manteiga.", foto: "if-honey-butter", cor: "#b07a1c", ifood: "d8145955-35f6-4b2a-af7b-03bdfa964db1", combina: ["cafe-coado"] },

    { slug: "cafe-coado", nome: "Café Coado (200 ml)", cat: "bebidas", preco: "20,00", desc: "Café da Virginia Coffee Roasters, coado na hora.", foto: "cafe", cor: "#4a3020", ifood: "29f20b42-d1db-4d0d-8756-bb688b80f22e", combina: ["canele", "croissant"], momento: ["manha"] },
    { slug: "chocolate-quente", nome: "Chocolate Quente (200 ml)", cat: "bebidas", preco: "26,00", desc: "Chocolate meio amargo com raspas de laranja.", cor: "#3d2116", ifood: "bdbfe39b-4512-4549-b7c7-5937f3320e1b", combina: ["croissant"] },
    { slug: "cafe-gelado-caramelo", nome: "Café Gelado de Caramelo (400 ml)", cat: "bebidas", preco: "35,00", desc: "Xarope de caramelo salgado e leite vaporizado.", cor: "#8a5a26", ifood: "fa81da0d-81db-4486-8f60-6544120c8bd5", combina: ["cruffin"] },
    { slug: "cafe-gelado-baunilha", nome: "Café Gelado de Baunilha (400 ml)", cat: "bebidas", preco: "35,00", desc: "Gelado, com baunilha.", cor: "#9a7a4a", ifood: "7b359ca8-5132-4edc-8826-0554c14cca9e", combina: ["pain-au-chocolat"] },
    { slug: "chocolate-gelado", nome: "Chocolate Gelado (400 ml)", cat: "bebidas", preco: "36,00", desc: "Chocolate meio amargo com raspas de laranja.", foto: "if-chocolate-gelado", cor: "#3a2016", ifood: "5871d888-6f10-4a4d-93c4-cc34bc51c30b", combina: ["waffle"] },
    { slug: "matcha", nome: "Matcha Latte Gelado", cat: "bebidas", preco: "39,00", desc: "Matcha, leite e geleia de frutas vermelhas.", foto: "if-matcha", cor: "#566f2a", ifood: "7abe98d4-dd9f-4c07-b290-0fbaa04eea75", combina: ["escargot-pistache"] },
    { slug: "lemonade", nome: "Old Fashioned Lemonade", cat: "bebidas", preco: "32,00", desc: "Suco de limão, água com gás e xarope de grenadine.", foto: "if-lemonade", cor: "#a3233f", ifood: "d481d5c6-1223-4143-988b-2f7c898a3583", combina: ["tartine"] },

    { slug: "cafe-graos", nome: "Café em Grãos (250 g)", cat: "mercado", preco: "68,00", desc: "O café da casa, da Virginia Coffee Roasters.", foto: "cafe-abobora", cor: "#5a3a22", ifood: "f4db9315-4e53-4838-97e6-8f3e013d4e1a", combina: ["granola"] },
    { slug: "cafe-moido", nome: "Café Moído (250 g)", cat: "mercado", preco: "68,00", desc: "O café da casa, da Virginia Coffee Roasters, já moído.", foto: "if-cafe-moido", cor: "#5a3a22", ifood: "1fe427c8-9834-482a-bb7a-bed9eb1c84b8", combina: ["granola"] },
    { slug: "granola", nome: "Granola", cat: "mercado", preco: "45,00", desc: "Caju, castanha-do-pará, avelã, nozes, amêndoas, semente de abóbora, mel e cardamomo. Cerca de 150 g.", cor: "#8a6a2a", ifood: "6c0a18e2-ab1f-4c8a-8a4f-621d0d5dfeca", combina: ["pao-italiano"] },
    { slug: "mousse", nome: "Mousse de Chocolate no Pote (250 g)", cat: "mercado", preco: "44,00", desc: "Chocolate meio amargo.", cor: "#3a2016", ifood: "a8db04b0-a01e-4165-b882-3f4c37252ce7", combina: ["canele"] }
  ],
  // destaques com foto na vitrine principal, na ordem
  vitrine: ["canele", "croissant", "cruffin", "morning-bun", "ovo-poche", "delirium", "waffle", "nova-york"]
};
