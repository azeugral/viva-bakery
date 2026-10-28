/* Viva Bakery · hero com fumaça, cardápio, ficha do item com link direto do iFood, destaques pela hora,
   status aberto/fechado, modo balcão (?balcao) e revelar ao rolar */
(() => {
  const D = window.VIVA;
  const doc = document.documentElement;
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = matchMedia("(min-width: 901px)").matches;
  const params = new URLSearchParams(location.search);
  const balcao = params.has("balcao");
  if (balcao) doc.classList.add("balcao");
  const porSlug = Object.fromEntries(D.itens.map(i => [i.slug, i]));
  const catNome = Object.fromEntries(D.categorias.map(c => [c.id, c.nome]));
  const linkIfood = it => it && it.ifood ? `${D.loja}?prato=${it.ifood}` : D.loja;
  const img = (nome, tam = "md") => `assets/img/${nome}-${tam}.webp`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  document.querySelectorAll(".js-ifood").forEach(a => (a.href = D.loja));

  // entrada do hero
  requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.add("pronto")));
  setTimeout(() => doc.classList.add("pronto"), 1500);

  // fumaça branca na área toda (modo 3 do shader do Zaparolli): ao vivo no desktop, MP4 no celular.
  // Meia resolução basta, porque a fumaça é macia; se o quadro passar de ~22 ms, baixa mais.
  const hero = document.querySelector(".hero");
  const tela = document.getElementById("fumaca");
  const video = document.getElementById("fumaca-video");
  let T = null;
  if (!reduz && desktop && tela && window.fumacaGL) try { T = window.fumacaGL(tela, { modo: 3, forca: 1.6 }); } catch (e) { T = null; }
  if (T) {
    const ciclo = 40000, t0 = performance.now();
    let visivel = true, esc = Math.min(devicePixelRatio || 1, 2) * .5, ult = 0, soma = 0, n = 0;
    const ajusta = () => T.tamanho(Math.max(2, Math.round(hero.clientWidth * esc)), Math.max(2, Math.round(hero.clientHeight * esc)));
    ajusta();
    addEventListener("resize", ajusta);
    const laco = agora => {
      requestAnimationFrame(laco);
      if (!visivel || document.hidden) { ult = 0; return; }
      if (ult) { soma += agora - ult; n++; }
      ult = agora;
      if (n === 40) { if (soma / n > 22 && esc > .3) { esc *= .8; ajusta(); } soma = 0; n = 0; }
      T.desenhar(((agora - t0) % ciclo) / ciclo * Math.PI * 2);
      tela.classList.add("liga");
    };
    requestAnimationFrame(laco);
    new IntersectionObserver(es => { visivel = es[0].isIntersecting; ult = 0; }).observe(hero);
  } else if (!reduz && video) {
    video.src = video.dataset.src;
    video.addEventListener("loadeddata", () => video.classList.add("liga"), { once: true });
    video.play().catch(() => video.classList.add("liga"));
    new IntersectionObserver(es => (es[0].isIntersecting ? video.play().catch(() => {}) : video.pause())).observe(hero);
  }

  // hora de São Paulo, aberto ou fechado (o horário vem de cardapio.js; domingo só no último do mês)
  const agoraSP = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: false })
      .formatToParts(new Date()).map(x => [x.type, x.value]));
    const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { dia, data: +p.day, min: (+p.hour % 24) * 60 + +p.minute };
  };
  const { dia, data, min } = agoraSP();
  const nomesDia = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const fimMes = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); })();
  // horário de um dia daqui a n dias (o "último domingo" só vale quando é o último do mês)
  const horaDe = n => {
    const d = (dia + n) % 7, h = D.horario[d];
    if (!h) return null;
    if (h[2] === "ultimo" && data + n + 7 <= fimMes) return null;
    return h;
  };
  const hoje = horaDe(0);
  const aberto = hoje && min >= hoje[0] * 60 && min < hoje[1] * 60;
  const status = document.getElementById("status");
  const statusTexto = document.getElementById("status-texto");
  if (aberto) {
    status.classList.add("aberto");
    statusTexto.textContent = `Aberto agora · fecha às ${hoje[1]}h · delivery pelo iFood`;
  } else {
    let n = hoje && min < hoje[0] * 60 ? 0 : 1;
    while (n < 8 && !horaDe(n)) n++;
    const quando = n === 0 ? "hoje" : n === 1 ? "amanhã" : nomesDia[(dia + n) % 7];
    statusTexto.textContent = `Fechado agora · abre ${quando} às ${horaDe(n)[0]}h`;
  }

  // cards com foto
  const card = (it, tam = "md") => `
    <button class="card revela" type="button" data-item="${it.slug}">
      <span class="card__foto"><img src="${img(it.foto, tam)}" alt="${esc(it.nome)}" loading="lazy" width="720" height="900"></span>
      <span class="card__linha"><span class="card__nome">${esc(it.nome)}</span><span class="card__preco">R$ ${it.preco}</span></span>
      <span class="card__desc">${esc(it.desc)}</span>
    </button>`;

  // agora na Viva: destaques conforme a hora (momentos em cardapio.js)
  const h = min / 60;
  const momento = Object.keys(D.momentos).find(k => h < D.momentos[k][0]);
  document.getElementById("agora-titulo").textContent = D.momentos[momento][1];
  document.getElementById("agora-texto").textContent = D.momentos[momento][2];
  const doMomento = D.itens.filter(i => i.foto && (i.momento || []).includes(momento)).slice(0, 4);
  document.getElementById("agora-lista").innerHTML = doMomento.map(i => card(i)).join("");

  // vitrine e carta completa
  document.getElementById("vitrine").innerHTML = D.vitrine.map(s => card(porSlug[s])).join("");
  const abas = document.getElementById("abas");
  abas.innerHTML = D.categorias.map((c, k) => `<button class="aba" type="button" role="tab" aria-selected="${k === 0}" data-alvo="cat-${c.id}">${esc(c.nome)}</button>`).join("");
  document.getElementById("carta").innerHTML = D.categorias.map(c => `
    <div class="carta__grupo" id="cat-${c.id}">
      <h3>${esc(c.nome)}</h3>
      <p>${esc(c.linha)}</p>
      <ul class="carta__itens">${D.itens.filter(i => i.cat === c.id).map(i => `
        <li><button class="item" type="button" data-item="${i.slug}">
          ${i.foto ? `<span class="item__mini" style="background-image:url(${img(i.foto)})"></span>` : `<span class="item__mini item__mini--cor" style="--cor:${i.cor}" data-letra="${esc(i.nome[0])}"></span>`}
          <span><span class="item__nome">${esc(i.nome)}</span><span class="item__desc">${esc(i.desc)}${i.qtd ? ` · ${i.qtd}` : ""}</span></span>
          <span class="item__preco">R$ ${i.preco}${i.de ? `<s>R$ ${i.de}</s>` : ""}<span class="item__seta">Ver ficha</span></span>
        </button></li>`).join("")}
      </ul>
    </div>`).join("");

  // abas: rolam até a categoria; a aba ativa segue a rolagem
  const navH = () => parseFloat(getComputedStyle(doc).getPropertyValue("--nav-h")) || 70;
  abas.addEventListener("click", e => {
    const b = e.target.closest(".aba");
    if (!b) return;
    const alvo = document.getElementById(b.dataset.alvo);
    scrollTo({ top: alvo.getBoundingClientRect().top + scrollY - navH() - abas.offsetHeight + 1, behavior: reduz ? "auto" : "smooth" });
  });
  const grupos = [...document.querySelectorAll(".carta__grupo")];
  const marcarAba = () => {
    const linha = navH() + abas.offsetHeight + 40;
    let atual = grupos[0];
    grupos.forEach(g => { if (g.getBoundingClientRect().top <= linha) atual = g; });
    abas.querySelectorAll(".aba").forEach(b => {
      const sim = b.dataset.alvo === atual.id;
      if (sim && b.getAttribute("aria-selected") !== "true") b.scrollIntoView({ block: "nearest", inline: "center" });
      b.setAttribute("aria-selected", sim);
    });
  };

  // ficha do item
  const ficha = document.getElementById("ficha");
  const $ = id => document.getElementById(id);
  let aberta = null;
  const abrir = (slug, { historico = true } = {}) => {
    const it = porSlug[slug];
    if (!it) return;
    aberta = it;
    ficha.querySelector(".ficha__caixa").style.setProperty("--cor", it.cor);
    $("ficha-midia").innerHTML = it.foto
      ? `<img src="${img(it.foto, "lg")}" alt="${esc(it.nome)}" width="1280" height="1600">`
      : `<div class="ficha__letra">${reduz ? "" : `<video class="ficha__fumaca" src="assets/video/fumaca-celular.mp4?v=20261027g" muted loop playsinline autoplay aria-hidden="true"></video>`}<span>${esc(it.nome)}<small>${esc(catNome[it.cat])}</small></span></div>`;
    $("ficha-cat").textContent = catNome[it.cat] + (it.qtd ? ` · ${it.qtd}` : "");
    $("ficha-nome").textContent = it.nome;
    $("ficha-desc").textContent = it.desc;
    $("ficha-preco").innerHTML = `R$ ${it.preco}${it.de ? `<s>R$ ${it.de}</s>` : ""}<small>${balcao ? "Preço do iFood. No balcão pode ser diferente." : "Preço no iFood"}</small>`;
    const pedir = $("ficha-pedir");
    if (balcao) {
      pedir.hidden = true;
      $("ficha-aviso").textContent = "Peça no balcão. A gente prepara na hora.";
    } else {
      pedir.hidden = false;
      pedir.href = linkIfood(it);
      $("ficha-aviso").textContent = it.ifood ? "Abre o iFood direto neste item." : `Abre a loja da ${D.nome} no iFood.`;
    }
    const comb = (it.combina || []).map(s => porSlug[s]).filter(Boolean);
    $("ficha-combina").innerHTML = comb.length ? `<h4>Combina com</h4><div>${comb.map(c => `<button type="button" data-item="${c.slug}">${esc(c.nome)}</button>`).join("")}</div>` : "";
    ficha.querySelector(".ficha__corpo").scrollTop = 0;
    ficha.querySelector(".ficha__caixa").scrollTop = 0;
    if (!ficha.open) { ficha.showModal(); document.body.classList.add("travado"); }
    if (historico) history.replaceState(null, "", `#item/${slug}`);
  };
  const fechar = () => {
    if (ficha.open) ficha.close();
  };
  ficha.addEventListener("close", () => {
    document.body.classList.remove("travado");
    aberta = null;
    if (location.hash.startsWith("#item/")) history.replaceState(null, "", location.pathname + location.search);
  });
  ficha.querySelector(".ficha__fechar").addEventListener("click", fechar);
  ficha.addEventListener("click", e => { if (e.target === ficha) fechar(); });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-item]");
    if (b) abrir(b.dataset.item);
  });
  $("ficha-partilhar").addEventListener("click", async () => {
    if (!aberta) return;
    const url = `${location.origin}${location.pathname}#item/${aberta.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: `${aberta.nome} · ${D.nome}`, url });
      else { await navigator.clipboard.writeText(url); $("ficha-partilhar").textContent = "Link copiado"; setTimeout(() => ($("ficha-partilhar").textContent = "Compartilhar este item"), 2000); }
    } catch (e) { /* cancelado */ }
  });
  // link direto para um item (#item/slug), útil no story do Instagram
  const doHash = () => { const m = location.hash.match(/^#item\/([\w-]+)/); if (m) abrir(m[1], { historico: false }); };
  doHash();
  addEventListener("hashchange", doHash);

  // menu do celular
  const botaoMenu = document.querySelector(".topo__abrir");
  const gaveta = document.getElementById("gaveta");
  const menu = abre => {
    botaoMenu.setAttribute("aria-expanded", abre);
    botaoMenu.setAttribute("aria-label", abre ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("travado", abre);
    if (abre) { gaveta.hidden = false; void gaveta.offsetWidth; gaveta.classList.add("aberta"); }
    else { gaveta.classList.remove("aberta"); setTimeout(() => { if (!gaveta.classList.contains("aberta")) gaveta.hidden = true; }, 300); }
  };
  botaoMenu.addEventListener("click", () => menu(botaoMenu.getAttribute("aria-expanded") !== "true"));
  gaveta.addEventListener("click", e => { if (e.target.closest("a")) menu(false); });
  document.querySelector(".marca").addEventListener("click", e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduz ? "auto" : "smooth" }); });

  // topo sólido, botão flutuante, seção ativa no menu
  const topo = document.querySelector(".topo");
  const flut = document.querySelector(".flutuante");
  const links = [...document.querySelectorAll(".menu a")];
  const secoes = links.map(a => document.querySelector(a.getAttribute("href")));
  const aoRolar = () => {
    const y = scrollY;
    topo.classList.toggle("solido", y > 30);
    flut.classList.toggle("mostra", y > innerHeight * .8 && y < document.body.scrollHeight - innerHeight * 1.6);
    let ativa = -1;
    secoes.forEach((s, k) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) ativa = k; });
    links.forEach((a, k) => a.classList.toggle("ativo", k === ativa));
    marcarAba();
  };
  addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  // revelar ao rolar; uma varredura por tempo garante que nada fique escondido
  const revelaveis = () => document.querySelectorAll(".revela:not(.visto)");
  document.querySelectorAll(".cab, .dupla figure, .trio figure, .casa__frase, .casa__fecho, .cafe__dados, .lugar__grade figure, .visite__grade > *, .eventos__texto").forEach(el => el.classList.add("revela"));
  if (reduz) { revelaveis().forEach(el => el.classList.add("visto")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  revelaveis().forEach(el => io.observe(el));
  setInterval(() => revelaveis().forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("visto"); }), 700);
})();
