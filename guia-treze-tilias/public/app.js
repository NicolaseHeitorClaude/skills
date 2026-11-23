// Guia turístico de Treze Tílias — aplicação sem framework.
// Rotas: /  ·  /explorar?grupo=&cat=&q=&vista=mapa  ·  /local/:id  ·  /categoria/:id/:nome (endereços do guia atual)
//        /telefones-uteis (atalho)

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fold = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => matchMedia('(min-width: 900px)').matches;

const ICON = {
  route: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h3l1.5 4-2 1.3a12 12 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9.2 8.6c.2 2.6 3 5.3 5.7 5.6l1-1.3-1.8-1-.9.8a4.6 4.6 0 0 1-2.2-2.2l.8-.9-1-1.8z"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5l.5-3.5h-3V9a.5.5 0 0 1 .5-.5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  tour: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12c4 2 13 2 17 0"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
};

const DISTANCES = [['Videira', '32 km'], ['Joaçaba', '37 km'], ['Caçador', '76 km'], ['Chapecó', '176 km'], ['Lages', '200 km'],
  ['Curitiba', '361 km'], ['Joinville', '376 km'], ['Florianópolis', '421 km'], ['Porto Alegre', '545 km'], ['São Paulo', '779 km']];

const S = {
  data: null, byId: new Map(), legacy: new Map(), cat: new Map(), group: new Map(),
  route: { name: 'home' },       // estado derivado da URL
  selected: null,                // id do lugar selecionado
  map: null, markers: new Map(), mapReady: false, mapFailed: false,
  lastRenderKey: '',
};

// ---------- Dados ----------
async function load() {
  const res = await fetch('/data.json');
  S.data = await res.json();
  for (const c of S.data.categories) S.cat.set(c.id, c);
  for (const g of S.data.groups) S.group.set(g.id, g);
  for (const p of S.data.places) {
    S.byId.set(p.id, p);
    for (const n of p.legacy || []) S.legacy.set(String(n), p.id);
  }
}
const catName = (id) => S.cat.get(id)?.name ?? '';
const placeLabel = (p, cat) => (cat ? catName(cat) : '') || p.label || catName(p.cats[0]);
const groupOfCat = (id) => S.cat.get(id)?.group;
const placesIn = ({ group, cat }) => S.data.places.filter((p) =>
  cat ? p.cats.includes(cat) : group ? p.cats.some((c) => groupOfCat(c) === group) : true);
const isStay = (p) => p.cats.some((c) => [1, 2, 25].includes(c));
const isFood = (p) => p.cats.some((c) => [3, 24].includes(c));

function search(q) {
  const toks = fold(q).split(/\s+/).filter(Boolean);
  if (!toks.length) return { places: [], cats: [] };
  const hit = (s) => toks.every((t) => s.includes(t));
  const cats = S.data.categories.filter((c) => hit(fold(c.name)));
  const groups = S.data.groups.filter((g) => hit(fold(g.name)));
  const scored = [];
  for (const p of S.data.places) {
    if (!hit(p.search)) continue;
    const n = fold(p.name);
    const score = toks.every((t) => n.includes(t)) ? (n.startsWith(toks[0]) ? 0 : 1) : 2;
    scored.push([score, p]);
  }
  scored.sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name, 'pt'));
  return { places: scored.map((x) => x[1]), cats, groups };
}

// ---------- Rotas ----------
function parse(loc = location) {
  const u = new URL(loc.href);
  const parts = u.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  const qp = u.searchParams;
  const base = { q: qp.get('q') || '', vista: qp.get('vista') === 'mapa' ? 'mapa' : 'lista' };
  if (!parts.length) return { name: 'home' };
  if (parts[0] === 'telefones-uteis') return { name: 'explore', ...base, group: 'uteis', cat: 20 };
  if (parts[0] === 'categoria' && parts[1]) {
    const cat = Number(parts[1]);
    if (S.cat.has(cat)) return { name: 'explore', ...base, group: groupOfCat(cat), cat };
  }
  if (parts[0] === 'local' && /^\d+$/.test(parts[1] || '')) {
    // endereços do guia atual: /local/45/Monumento Águia do Tirol
    const id = S.legacy.get(parts[1]);
    if (id) return { name: 'explore', q: '', vista: 'lista', group: groupOfCat(S.byId.get(id).cats[0]) || null, cat: S.byId.get(id).cats[0] || null, place: id, legacy: true };
    // ID antigo ainda sem correspondência confirmada: procura pelo nome que veio no endereço
    const nome = (parts[2] || '').replace(/\s+-\s+Treze T[ií]lias$/i, '').trim();
    return { name: 'explore', q: nome, vista: 'lista', group: null, cat: null, legacyMiss: true };
  }
  if (parts[0] === 'local' && parts[1] && S.byId.has(parts[1])) {
    const p = S.byId.get(parts[1]);
    const cat = Number(qp.get('cat')) || null;
    const group = qp.get('grupo') || (cat ? groupOfCat(cat) : base.q ? null : groupOfCat(p.cats[0]));
    return { name: 'explore', ...base, group, cat: cat && S.cat.has(cat) ? cat : (base.q ? null : (qp.has('grupo') ? null : p.cats[0])), place: p.id };
  }
  if (parts[0] === 'explorar') {
    const cat = Number(qp.get('cat')) || null;
    const group = qp.get('grupo') || (cat ? groupOfCat(cat) : null);
    return { name: 'explore', ...base, group: S.group.has(group) ? group : null, cat: S.cat.has(cat) ? cat : null };
  }
  return { name: 'home' };
}
function exploreUrl({ group, cat, q, vista, place } = {}) {
  const qp = new URLSearchParams();
  if (group && !(cat && groupOfCat(cat) === group && place)) qp.set('grupo', group);
  if (cat) qp.set('cat', cat);
  if (q) qp.set('q', q);
  if (vista === 'mapa') qp.set('vista', 'mapa');
  const s = qp.toString();
  return (place ? `/local/${encodeURIComponent(place)}` : '/explorar') + (s ? `?${s}` : '');
}
function go(url, { replace = false, keepScroll = true } = {}) {
  const st = { scrollY: scrollY, listTop: $('#paneList')?.scrollTop ?? 0 };
  if (replace) history.replaceState(st, '', url); else { history.replaceState({ ...history.state, ...st }, '', location.href); history.pushState(null, '', url); }
  render({ fromNav: true, keepScroll });
}
addEventListener('popstate', () => render({ fromPop: true }));
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-link]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault();
  closeMenu();
  go(a.getAttribute('href'));
});

// ---------- Menu ----------
function renderMenu() {
  const r = S.route;
  const cur = r.name === 'explore' && !r.q ? r.group : null;
  $('#menu').innerHTML = S.data.groups.map((g) =>
    `<li><a href="${exploreUrl({ group: g.id })}" data-link ${cur === g.id && r.cat !== 20 ? 'aria-current="true"' : ''}>${esc(g.name)}</a></li>`).join('') +
    `<li class="menu-phones"><a href="/telefones-uteis" data-link ${r.cat === 20 ? 'aria-current="true"' : ''}>${ICON.phone.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:2"')} Telefones úteis</a></li>`;
}
const toggle = $('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = !$('#menu').classList.contains('open');
  $('#menu').classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open));
});
function closeMenu() { $('#menu').classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
document.addEventListener('click', (e) => { if (!e.target.closest('.mainnav')) closeMenu(); });

// ---------- Busca (componente compartilhado) ----------
function searchForm(q = '', idSuffix = 'home') {
  return `<form class="search" role="search" data-search>
    <label for="q-${idSuffix}">Busque um lugar ou uma experiência</label>
    <div class="search-row">
      <input id="q-${idSuffix}" name="q" type="search" value="${esc(q)}" placeholder="Ex.: águia, cerveja, pousada, táxi"
        autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-autocomplete="list" aria-controls="sug-${idSuffix}">
      <button type="submit">Buscar</button>
    </div>
    <ul class="suggest" id="sug-${idSuffix}" role="listbox" hidden></ul>
  </form>`;
}
function wireSearch(root) {
  const form = $('[data-search]', root); if (!form) return;
  const input = $('input', form), list = $('.suggest', form);
  let active = -1;
  const update = () => {
    const q = input.value.trim();
    if (q.length < 2) { list.hidden = true; return; }
    const r = search(q);
    const items = [
      ...r.cats.slice(0, 3).map((c) => ({ href: exploreUrl({ group: c.group, cat: c.id }), label: c.name, type: 'Categoria' })),
      ...r.places.slice(0, 6).map((p) => ({ href: exploreUrl({ q, place: p.id }), label: p.name, type: placeLabel(p) })),
    ];
    if (!items.length) { list.hidden = true; return; }
    active = -1;
    list.innerHTML = items.map((it, i) => `<li role="option"><a href="${it.href}" data-link id="opt-${i}"><span>${esc(it.label)}</span><span class="s-type">${esc(it.type)}</span></a></li>`).join('');
    list.hidden = false;
  };
  input.addEventListener('input', update);
  input.addEventListener('keydown', (e) => {
    const opts = [...list.querySelectorAll('a')];
    if (list.hidden || !opts.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === active)));
      input.setAttribute('aria-activedescendant', opts[active].id);
    } else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); opts[active].click(); }
    else if (e.key === 'Escape') { list.hidden = true; }
  });
  input.addEventListener('blur', () => setTimeout(() => { list.hidden = true; }, 150));
  form.addEventListener('submit', (e) => {
    e.preventDefault(); list.hidden = true;
    const q = input.value.trim();
    const r = S.route;
    go(exploreUrl({ q, vista: r.vista }));
  });
}

// ---------- Página inicial ----------
function renderHome() {
  const counts = (g) => placesIn({ group: g }).length;
  $('#home').innerHTML = `<div class="home">
    <div class="home-top">
      <figure class="cover">
        <img src="/assets/photos/abertura-800.webp" srcset="/assets/photos/abertura-800.webp 800w, /assets/photos/abertura-1600.webp 1600w"
          sizes="(min-width: 880px) 50vw, 100vw" width="1600" height="1067" alt="Monumento Águia do Tirol entre araucárias, com a cidade ao fundo" fetchpriority="high">
        <figcaption>Monumento Águia do Tirol, na entrada da cidade pela SC-355</figcaption>
      </figure>
      <div class="intro">
        <p class="kicker">O Tirol brasileiro</p>
        <h1>Guia turístico de Treze Tílias</h1>
        <p class="lede">Atrativos, ateliês de escultura, cozinha típica, cervejarias e hospedagem, com contato e localização de cada lugar.</p>
        ${searchForm('', 'home')}
      </div>
    </div>
    <nav class="paths" aria-labelledby="paths-h">
      <h2 id="paths-h">Explore por caminho</h2>
      <ul class="path-list">
        ${S.data.groups.map((g) => `<li><a class="path" href="${exploreUrl({ group: g.id })}" data-link>
            <span class="path-name">${esc(g.name)}</span><span class="path-lede">${esc(g.lede)}</span>
            <span class="path-count">${counts(g.id)}</span></a></li>`).join('')}
        <li><a class="path is-phones" href="/telefones-uteis" data-link>
          <span class="path-name">Telefones úteis</span><span class="path-lede">Bombeiros, polícia, saúde, táxi e atendimento ao turista</span>
          <span class="path-count">${placesIn({ cat: 20 }).length}</span></a></li>
      </ul>
    </nav>
    <div class="home-more">
      <section class="fact">
        <h2>Atendimento ao turista</h2>
        <p>CAT – Centro de Atendimento ao Turista, Rua Pedro Nelcido Käfer, 115, Centro.</p>
        <p style="margin-top:8px"><a href="tel:+5549991649034">(49) 99164 9034</a> · telefone e WhatsApp</p>
      </section>
      <section class="fact">
        <h2>Distâncias até Treze Tílias</h2>
        <ul class="dist">${DISTANCES.map(([c, d]) => `<li><span>${c}</span><b>${d}</b></li>`).join('')}</ul>
      </section>
      <section class="fact">
        <h2>Uma colônia de 1933</h2>
        <p>Fundada em 13 de outubro de 1933 por imigrantes do Tirol, de Vorarlberg e da Alta Áustria, liderados por Andreas Thaler. Emancipada em 29 de abril de 1963.</p>
      </section>
    </div>
  </div>`;
  wireSearch($('#home'));
}

// ---------- Explorar ----------
function currentList(r) {
  if (r.q) {
    const res = search(r.q);
    let places = res.places;
    if (r.cat) places = places.filter((p) => p.cats.includes(r.cat));
    else if (r.group) places = places.filter((p) => p.cats.some((c) => groupOfCat(c) === r.group));
    return { places, cats: res.cats, groups: res.groups };
  }
  let places = placesIn(r);
  if (r.cat === 20 || r.group === 'uteis') {
    places = [...places].sort((a, b) => (b.emergency ? 1 : 0) - (a.emergency ? 1 : 0));
  } else {
    places = [...places].sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  }
  return { places, cats: [] };
}

function renderToolbar(r) {
  const g = r.group ? S.group.get(r.group) : null;
  const tabs = g ? [{ id: null, name: 'Tudo' }, ...g.cats.map((id) => S.cat.get(id))] : [];
  const scope = r.q ? currentList({ ...r, cat: null, group: r.group }).places : null;
  const countFor = (cid) => (r.q ? scope.filter((p) => (cid ? p.cats.includes(cid) : true)).length
    : placesIn(cid ? { cat: cid } : { group: r.group }).length);
  $('#toolbar').innerHTML = `${searchForm(r.q, 'bar')}
    <div class="groups" aria-label="Caminhos">
      ${S.data.groups.map((x) => `<a class="group-chip" href="${exploreUrl({ group: x.id, q: r.q, vista: r.vista })}" data-link ${x.id === r.group ? 'aria-current="true"' : ''}>${esc(x.name)}</a>`).join('')}
      ${r.q ? `<a class="group-chip" href="${exploreUrl({ q: r.q, vista: r.vista })}" data-link ${!r.group ? 'aria-current="true"' : ''}>Todos os resultados</a>` : ''}
    </div>
    ${tabs.length ? `<div class="cats" role="group" aria-label="Categorias de ${esc(g.name)}">
      ${tabs.map((t) => `<button type="button" class="cat-tab" data-cat="${t.id ?? ''}" aria-pressed="${(t.id ?? null) === (r.cat ?? null)}">${esc(t.name)}<span class="n">${countFor(t.id)}</span></button>`).join('')}
      <span class="cat-indicator" aria-hidden="true"></span></div>` : '<div style="height:10px"></div>'}`;
  wireSearch($('#toolbar'));
  const chip = $('.group-chip[aria-current="true"]', $('#toolbar'));
  if (chip) { const bar = chip.parentElement; bar.scrollLeft = Math.max(0, chip.offsetLeft - 16); }
  $('#toolbar').querySelectorAll('.cat-tab').forEach((b) => b.addEventListener('click', () => switchCategory(b.dataset.cat ? Number(b.dataset.cat) : null)));
  placeIndicator(false);
}

// Movimento 3: o indicador desliza até a categoria; a lista é trocada sem piscar e sem voltar ao topo.
function placeIndicator(animate = true) {
  const bar = $('.cats'); if (!bar) return;
  const ind = $('.cat-indicator', bar), btn = $('.cat-tab[aria-pressed="true"]', bar) || $('.cat-tab', bar);
  if (!btn) return;
  if (!animate) ind.style.transition = 'none';
  ind.style.width = `${btn.offsetWidth - 16}px`;
  ind.style.transform = `translateX(${btn.offsetLeft + 8}px)`;
  if (!animate) { ind.offsetWidth; ind.style.transition = ''; }
  const l = btn.offsetLeft, rgt = l + btn.offsetWidth;
  if (l < bar.scrollLeft || rgt > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: l - 24, behavior: reduceMotion() ? 'auto' : 'smooth' });
}
function switchCategory(cat) {
  const r = S.route;
  $('#toolbar').querySelectorAll('.cat-tab').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.cat ? Number(b.dataset.cat) : null) === cat)));
  placeIndicator(true);
  const url = exploreUrl({ group: r.group, cat, q: r.q, vista: r.vista });
  history.replaceState(null, '', url);
  S.route = parse();
  S.selected = null;
  renderResults(S.route, { keepPosition: true });
  updateMap(S.route, { fit: true });
  renderMenu();
}

function cardHtml(p, r) {
  const ctxCat = r.cat && p.cats.includes(r.cat) ? r.cat : p.cats.find((c) => !r.group || groupOfCat(c) === r.group) ?? p.cats[0];
  const href = exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista, place: p.id });
  if (p.kind === 'service' && !p.photo) {
    const ph = p.phones?.[0];
    return `<li class="card is-service ${S.selected === p.id ? 'is-selected' : ''}" data-id="${esc(p.id)}">
      <div class="card-main"><a class="card-link" href="${href}" data-link data-open="${esc(p.id)}"><h3 class="card-name">${esc(p.name)}</h3></a>
        <p class="card-cat">${esc(p.group || catName(ctxCat))}${p.summary ? ` · <span style="color:var(--ink-2);font-weight:400">${esc(p.summary)}</span>` : ''}</p>
        ${p.emergency || ph ? `<p class="card-phone">${p.emergency ? `<span class="emergency">${esc(p.emergency)}</span>` : ''}${ph ? esc(ph.label) : ''}</p>` : ''}
      </div>
      ${p.emergency ? `<a class="card-call" href="tel:${p.emergency}">${ICON.phone.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:2"')} Ligar ${esc(p.emergency)}</a>`
        : ph ? `<a class="card-call" href="tel:${esc(ph.tel)}" aria-label="Ligar para ${esc(p.name)}">${ICON.phone.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:2"')} Ligar</a>` : ''}
    </li>`;
  }
  const meta = p.summary || [p.address, p.district].filter(Boolean).join(' · ');
  const flags = [p.coords ? 'No mapa' : null, p.hours ? 'Horário informado' : null, p.whatsapp ? 'WhatsApp' : null, p.tour ? 'Vista em 360°' : null].filter(Boolean);
  return `<li class="card ${S.selected === p.id ? 'is-selected' : ''}" data-id="${esc(p.id)}">
    <div class="card-main">
      <a class="card-link" href="${href}" data-link data-open="${esc(p.id)}"><h3 class="card-name">${esc(p.name)}</h3></a>
      <p class="card-cat">${esc(placeLabel(p, ctxCat))}</p>
      ${meta ? `<p class="card-meta">${esc(meta)}</p>` : ''}
      ${flags.length ? `<p class="card-flags">${flags.map((f) => `<span>${esc(f)}</span>`).join('<span aria-hidden="true">·</span>')}</p>` : ''}
    </div>
    ${p.photo ? `<div class="card-thumb ${p.photo.logo ? 'is-logo' : ''}"><img src="${p.photo['480']}" alt="" loading="lazy" decoding="async" width="88" height="88"></div>` : ''}
  </li>`;
}

function renderResults(r, { keepPosition = false } = {}) {
  const { places, cats, groups } = currentList(r);
  const el = $('#results');
  const title = r.q ? `Resultados para “${esc(r.q)}”` : r.cat ? esc(catName(r.cat)) : r.group ? esc(S.group.get(r.group).name) : 'Todos os lugares';
  const onMap = places.filter((p) => p.coords).length;
  let html = `<div class="results-head"><h2>${title}</h2><span>${places.length} ${places.length === 1 ? 'resultado' : 'resultados'}${onMap ? ` · ${onMap} no mapa` : ''}</span></div>`;
  if (r.q && (cats?.length || groups?.length)) {
    html += `<div class="cat-matches">${[...(groups || []).map((g) => `<a href="${exploreUrl({ group: g.id })}" data-link>${esc(g.name)}</a>`),
      ...cats.map((c) => `<a href="${exploreUrl({ group: c.group, cat: c.id })}" data-link>Categoria: ${esc(c.name)}</a>`)].join('')}</div>`;
  }
  if (!places.length) {
    html += `<div class="empty"><h2>Nada encontrado${r.q ? ` para “${esc(r.q)}”` : ' nesta categoria'}</h2>
      ${!r.q && r.cat ? '<p>Ainda não há lugares confirmados nesta categoria.</p>' : ''}
      <p>Tente:</p><ul>
        ${r.q && (r.group || r.cat) ? `<li><a href="${exploreUrl({ q: r.q })}" data-link>buscar “${esc(r.q)}” em todo o guia</a></li>` : ''}
        <li>uma palavra mais curta, como “pousada”, “café” ou “escultor”;</li>
        <li>um dos caminhos: ${S.data.groups.map((g) => `<a href="${exploreUrl({ group: g.id })}" data-link>${esc(g.name)}</a>`).join(', ')};</li>
        <li><a href="/telefones-uteis" data-link>Telefones úteis</a>, ou ligar para o Centro de Atendimento ao Turista: <a href="tel:+5549991649034">(49) 99164 9034</a>.</li>
      </ul></div>`;
  } else if (r.cat === 20 && !r.q) {
    const em = places.filter((p) => p.emergency), taxi = places.filter((p) => p.group === 'Táxi'), rest = places.filter((p) => !p.emergency && p.group !== 'Táxi');
    html += `<p class="section-label">Emergência</p><ul class="cards">${em.map((p) => cardHtml(p, r)).join('')}</ul>
      <p class="section-label">Saúde, serviços e atendimento</p><ul class="cards">${rest.map((p) => cardHtml(p, r)).join('')}</ul>
      <p class="section-label">Táxi</p><ul class="cards">${taxi.map((p) => cardHtml(p, r)).join('')}</ul>`;
  } else {
    html += `<ul class="cards">${places.map((p) => cardHtml(p, r)).join('')}</ul>`;
  }
  if (r.group === 'planejar' && !r.q && (!r.cat || r.cat === 28)) {
    html += `<section class="fact" style="margin-top:12px"><h2>Distâncias até Treze Tílias</h2><ul class="dist">${DISTANCES.map(([c, d]) => `<li><span>${c}</span><b>${d}</b></li>`).join('')}</ul></section>`;
  }

  // Troca sem piscar: mesma caixa, conteúdo substituído num único quadro; altura mínima mantida durante a troca.
  const pane = isDesktop() ? $('#paneList') : null;
  const tb = $('#toolbar');
  const before = pane ? pane.scrollTop : scrollY;
  el.style.minHeight = `${el.offsetHeight}px`;
  el.innerHTML = html;
  requestAnimationFrame(() => { el.style.minHeight = ''; });
  if (keepPosition) {
    // mantém a pessoa onde estava; só reposiciona se ela estava abaixo do início da lista
    const listTop = pane ? el.offsetTop - tb.offsetHeight : el.getBoundingClientRect().top + scrollY - S.headerH - tb.offsetHeight;
    const target = Math.min(before, Math.max(0, listTop));
    if (pane) pane.scrollTop = target; else scrollTo({ top: target, behavior: 'instant' });
  }
  updateToggle(r, onMap);
  updatePeek();
}

function updateToggle(r, onMap) {
  const b = $('#viewToggle');
  if (isDesktop() || !onMap) { b.hidden = true; return; }
  b.hidden = false;
  b.innerHTML = r.vista === 'mapa' ? `${ICON.list} Ver lista` : `${ICON.map} Ver no mapa (${onMap})`;
  b.onclick = () => {
    const url = exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista === 'mapa' ? 'lista' : 'mapa', place: S.route.place });
    S.listScroll = scrollY;
    history.replaceState(null, '', url);
    S.route = parse();
    applyView();
    renderResults(S.route);
    if (S.route.vista === 'mapa') { ensureMap(); setTimeout(() => { S.map?.invalidateSize(); updateMap(S.route, { fit: !S.selected }); if (S.selected) selectPlace(S.selected, { pan: true, scroll: false }); }, 0); }
    else { requestAnimationFrame(() => { const it = S.selected && $(`.card[data-id="${CSS.escape(S.selected)}"]`); if (it) it.scrollIntoView({ block: 'center' }); else scrollTo({ top: S.listScrollBefore || 0 }); }); }
  };
}
function applyView() {
  const v = $('#explore');
  v.classList.toggle('is-map', S.route.vista === 'mapa');
  document.documentElement.style.setProperty('--toolbar-h', `${$('#toolbar').offsetHeight}px`);
}

function updatePeek() {
  const peek = $('#mapPeek');
  if (isDesktop() || S.route.vista !== 'mapa' || !S.selected) { peek.hidden = true; return; }
  const p = S.byId.get(S.selected);
  peek.hidden = false;
  peek.innerHTML = `<ul class="cards">${cardHtml(p, S.route)}</ul>`;
}

// ---------- Mapa ----------
function ensureMap() {
  if (S.map || S.mapFailed) return;
  if (!window.L) { mapFail('O mapa não carregou. A lista, os endereços e os contatos continuam disponíveis.'); return; }
  try {
    S.map = L.map('map', { zoomControl: true, scrollWheelZoom: true, keyboard: true, zoomSnap: 0.5 }).setView([-26.9995, -51.4075], 14);
    let tileErrors = 0, tileOk = 0;
    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(S.map);
    layer.on('tileerror', () => { tileErrors++; if (tileErrors > 6 && !tileOk) mapFail('As imagens do mapa não carregaram. Use a lista e o botão “Como chegar” de cada lugar.'); });
    layer.on('tileload', () => { tileOk++; });
    S.mapReady = true;
  } catch { mapFail('O mapa não carregou. A lista, os endereços e os contatos continuam disponíveis.'); }
}
function mapFail(msg) {
  S.mapFailed = true;
  const f = $('#mapFallback'); f.hidden = false; f.innerHTML = `<p>${esc(msg)}</p>`;
}
function pinIcon(p) {
  const cls = isStay(p) ? 'is-stay' : isFood(p) ? 'is-food' : '';
  return L.divIcon({ className: '', iconSize: [28, 28], iconAnchor: [14, 14],
    html: `<span class="pin ${cls}" data-pin="${esc(p.id)}"><svg class="pin-ring" viewBox="0 0 46 46" aria-hidden="true"><circle cx="23" cy="23" r="20"/></svg><span class="pin-dot"></span></span>` });
}
function updateMap(r, { fit = false } = {}) {
  if (!S.map) return;
  const places = currentList(r).places.filter((p) => p.coords);
  const keep = new Set(places.map((p) => p.id));
  for (const [id, m] of S.markers) if (!keep.has(id)) { m.remove(); S.markers.delete(id); }
  for (const p of places) {
    if (S.markers.has(p.id)) continue;
    const m = L.marker(p.coords, { icon: pinIcon(p), title: p.name, alt: p.name, keyboard: true, riseOnHover: true });
    m.on('click', () => { selectPlace(p.id, { pan: false, scroll: true }); if (isDesktop()) openPlace(p.id); });
    m.on('keypress', (e) => { if (e.originalEvent.key === 'Enter') { selectPlace(p.id, { pan: false }); openPlace(p.id); } });
    m.addTo(S.map); S.markers.set(p.id, m);
  }
  markSelected();
  if (fit && places.length) {
    const b = L.latLngBounds(places.map((p) => p.coords));
    S.map.fitBounds(b, { padding: [40, 40], maxZoom: 16, animate: !reduceMotion() });
  }
}
function markSelected() {
  for (const [id, m] of S.markers) {
    const el = m.getElement()?.querySelector('.pin');
    if (el) el.classList.toggle('is-selected', id === S.selected);
    m.setZIndexOffset(id === S.selected ? 1000 : 0);
  }
}

// Movimento 1: destaca na lista e contorna o marcador; move o mapa uma única vez, só se o ponto estiver fora de vista.
function selectPlace(id, { pan = true, scroll = true } = {}) {
  S.selected = id;
  document.querySelectorAll('.card.is-selected').forEach((c) => c.classList.remove('is-selected'));
  const card = $(`#results .card[data-id="${CSS.escape(id)}"]`);
  if (card) {
    card.classList.add('is-selected');
    if (scroll && isDesktop()) {
      const pane = $('#paneList'); const cr = card.getBoundingClientRect(), pr = pane.getBoundingClientRect();
      const tbH = $('#toolbar').offsetHeight;
      if (cr.top < pr.top + tbH || cr.bottom > pr.bottom) card.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
    }
  }
  const m = S.markers.get(id);
  if (m && S.map) {
    markSelected();
    const el = m.getElement()?.querySelector('.pin');
    if (el) { el.classList.remove('ring-draw'); void el.offsetWidth; el.classList.add('ring-draw'); }
    if (pan) {
      const pad = isDesktop() && $('#sheet').classList.contains('is-open') ? L.point(40, 40) : L.point(40, 40);
      const size = S.map.getSize();
      const pt = S.map.latLngToContainerPoint(m.getLatLng());
      const leftCover = isDesktop() && $('#sheet').classList.contains('is-open') ? Math.max(0, $('#sheet').getBoundingClientRect().right - $('#paneMap').getBoundingClientRect().left) : 0;
      const bottomCover = !isDesktop() ? 150 : 0;
      const inView = pt.x > leftCover + pad.x && pt.x < size.x - pad.x && pt.y > pad.y && pt.y < size.y - pad.y - bottomCover;
      if (!inView) {
        const target = S.map.containerPointToLatLng(L.point(pt.x - (leftCover + (size.x - leftCover) / 2), pt.y - (size.y - bottomCover) / 2).add(S.map.getSize().divideBy(2)));
        S.map.panTo(target, { animate: !reduceMotion(), duration: 0.45, easeLinearity: 0.3 });
      }
    }
  }
  updatePeek();
}

// ---------- Ficha ----------
function directionsUrl(p) {
  if (p.coords) return `https://www.google.com/maps/dir/?api=1&destination=${p.coords[0]},${p.coords[1]}`;
  return p.map || null;
}
function primaryAction(p) {
  const tel = p.phones?.[0];
  if (p.emergency) return { href: `tel:${p.emergency}`, label: `Ligar ${p.emergency}`, icon: ICON.phone };
  if (p.kind === 'service' || p.cats.includes(20) || p.cats.includes(10) || p.cats.includes(9)) {
    if (tel) return { href: `tel:${tel.tel}`, label: 'Ligar', icon: ICON.phone };
    if (p.whatsapp) return { href: p.whatsapp, label: 'Conversar no WhatsApp', icon: ICON.wa, ext: true };
    if (p.link) return { href: p.link.url, label: p.link.label, icon: ICON.link, ext: true };
  }
  if (isStay(p)) {
    if (p.whatsapp) return { href: p.whatsapp, label: 'Entrar em contato pelo WhatsApp', icon: ICON.wa, ext: true };
    if (tel) return { href: `tel:${tel.tel}`, label: 'Entrar em contato', icon: ICON.phone };
  }
  const dir = directionsUrl(p);
  if (dir) return { href: dir, label: 'Como chegar', icon: ICON.route, ext: true };
  if (tel) return { href: `tel:${tel.tel}`, label: 'Ligar', icon: ICON.phone };
  if (p.link) return { href: p.link.url, label: p.link.label, icon: ICON.link, ext: true };
  return null;
}
function sheetHtml(p, r) {
  const ctx = r.cat && p.cats.includes(r.cat) ? r.cat : p.cats[0];
  const dir = directionsUrl(p);
  const pa = primaryAction(p);
  const acts = [];
  const add = (cond, href, label, icon, cls = '', ext = true) => { if (cond && href !== pa?.href) acts.push(`<a class="action ${cls}" href="${esc(href)}" ${ext ? 'target="_blank" rel="noopener"' : ''}>${icon}${esc(label)}</a>`); };
  add(!!dir, dir, 'Como chegar', ICON.route);
  add(!!p.phones?.length, `tel:${p.phones?.[0]?.tel}`, 'Ligar', ICON.phone, '', false);
  add(!!p.whatsapp, p.whatsapp, 'WhatsApp', ICON.wa);
  add(!!p.site, p.site, 'Site', ICON.web);
  add(!!p.instagram, p.instagram, 'Instagram', ICON.ig);
  add(!!p.facebook, p.facebook, 'Facebook', ICON.fb);
  add(!!p.email, `mailto:${p.email}`, 'E-mail', ICON.mail, '', false);
  add(!!p.link && pa?.href !== p.link?.url, p.link?.url, p.link?.label, ICON.link);
  const mapBtn = p.coords && !isDesktop() ? `<button type="button" class="action" data-show-map="${esc(p.id)}">${ICON.map}Ver no mapa do guia</button>` : '';
  const facts = [];
  if (p.address) facts.push(['Endereço', `${esc(p.address)}${p.district ? `<br>${esc(p.district)}` : ''}${p.address2 ? `<br>${esc(p.address2)}` : ''}${p.ref ? `<br><span style="color:var(--ink-3)">${esc(p.ref)}</span>` : ''}`]);
  if (p.hours) facts.push(['Horário', `${esc(p.hours)}${p.note ? `<br><span style="color:var(--ink-3)">${esc(p.note)}</span>` : ''}`]);
  if (p.phones?.length) facts.push(['Telefone', `<ul class="tel-list">${p.phones.map((t) => `<li><a href="tel:${esc(t.tel)}">${esc(t.label)}</a></li>`).join('')}</ul>${p.phoneLabel ? `<span style="color:var(--ink-3);font-size:.9rem">${esc(p.phoneLabel)}</span>` : ''}`]);
  if (p.email) facts.push(['E-mail', `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`]);
  if (!p.coords && p.map) facts.push(['Localização', `<a href="${esc(p.map)}" target="_blank" rel="noopener">Abrir a localização do cadastro</a>`]);
  if (p.cats.length > 1) facts.push(['Também em', p.cats.filter((c) => c !== ctx).map((c) => `<a href="${exploreUrl({ group: groupOfCat(c), cat: c })}" data-link>${esc(catName(c))}</a>`).join(', ')]);
  return `<div class="sheet-grab" aria-hidden="true"></div>
    <header class="sheet-head">
      <div><p class="sheet-cat">${esc(placeLabel(p, ctx))}</p><h2 class="sheet-title" id="sheetTitle">${esc(p.name)}</h2></div>
      <button type="button" class="sheet-close" data-close>${ICON.close}<span>Fechar</span></button>
      <div class="head-actions ${p.tour ? 'has-tour' : ''}">
        ${pa ? `<a class="primary-action" href="${esc(pa.href)}" ${pa.ext ? 'target="_blank" rel="noopener"' : ''}>${pa.icon}${esc(pa.label)}</a>` : ''}
        ${p.tour ? `<a class="tour-action" href="${esc(p.tour)}" target="_blank" rel="noopener" aria-label="Ver em 360° (${esc(p.tourNote || 'Street View')})">${ICON.tour}Ver em 360°</a>` : ''}
      </div>
      ${p.tour && p.tourNote ? `<p class="tour-note">${esc(p.tourNote)}</p>` : ''}
    </header>
    ${p.photo ? `<figure class="sheet-photo ${p.photo.logo ? 'is-logo' : ''}"><img src="${p.photo['960']}" srcset="${p.photo['480']} 480w, ${p.photo['960']} 960w" sizes="(min-width: 900px) 460px, 100vw" alt="${p.photo.logo ? `Marca de ${esc(p.name)}` : esc(p.name)}" width="960" height="${Math.round(960 / (p.photo.ratio || 1.6))}"><figcaption>${p.photo.logo ? 'Marca do estabelecimento' : 'Foto'}: cadastro no site da Asturtílias</figcaption></figure>` : ''}
    <div class="sheet-body">
      ${p.summary ? `<p class="sheet-summary">${esc(p.summary)}</p>` : ''}
      ${p.text ? `<p class="sheet-text">${esc(p.text)}</p>` : ''}
      ${acts.length || mapBtn ? `<div class="actions">${acts.join('')}${mapBtn}</div>` : ''}
      ${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
    </div>`;
}

let lastFocus = null;
// Movimento 2: no celular a ficha sobe da base; nome e ação principal chegam juntos. Fechar devolve posição e foco.
function openPlace(id) {
  const r = S.route;
  S.openedInApp = true;
  go(exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista, place: id }));
}
function showSheet(p) {
  const sheet = $('#sheet'), back = $('#sheetBackdrop');
  const wasOpen = sheet.classList.contains('is-open');
  if (!wasOpen) lastFocus = document.activeElement?.closest?.('.card') ? document.activeElement : $(`#results .card[data-id="${CSS.escape(p.id)}"] .card-link`);
  sheet.innerHTML = sheetHtml(p, S.route);
  sheet.scrollTop = 0;
  sheet.hidden = false;
  if (!isDesktop()) { back.hidden = false; }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    sheet.classList.add('is-open'); back.classList.add('is-open');
  }));
  $('[data-close]', sheet).addEventListener('click', closeSheet);
  const smap = $('[data-show-map]', sheet);
  if (smap) smap.addEventListener('click', () => {
    const r = S.route;
    S.selected = p.id;
    history.replaceState(null, '', exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: 'mapa' }));
    hideSheet(false); S.route = parse(); render({ keepScroll: true });
  });
  setTimeout(() => $('[data-close]', sheet)?.focus({ preventScroll: true }), wasOpen ? 0 : 60);
}
function hideSheet(restoreFocus = true) {
  const sheet = $('#sheet'), back = $('#sheetBackdrop');
  if (sheet.hidden) return;
  sheet.classList.remove('is-open'); back.classList.remove('is-open');
  const t = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--t-sheet')) || 0;
  setTimeout(() => { if (!sheet.classList.contains('is-open')) { sheet.hidden = true; back.hidden = true; } }, t + 30);
  if (restoreFocus) {
    const card = S.selected && $(`#results .card[data-id="${CSS.escape(S.selected)}"]`);
    const target = card ? $('.card-link', card) : lastFocus;
    target?.focus({ preventScroll: true });
  }
}
function closeSheet() {
  // volta para a lista pelo histórico quando a ficha foi aberta dentro do guia (preserva rolagem e filtros)
  if (S.openedInApp) { S.openedInApp = false; history.back(); }
  else { const r = S.route; go(exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista }), { replace: true }); }
}
$('#sheetBackdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });

// abrir ficha a partir dos cartões (mantém o contexto da lista)
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-open]');
  if (!a) return;
  e.preventDefault(); e.stopPropagation();
  const id = a.dataset.open;
  selectPlace(id, { pan: true, scroll: false });
  S.openedInApp = true;
  openPlace(id);
}, true);

// ---------- Renderização principal ----------
function render({ fromPop = false, keepScroll = true } = {}) {
  const prev = S.route;
  S.route = parse();
  const r = S.route;
  document.title = r.name === 'home' ? 'Guia turístico de Treze Tílias'
    : r.place ? `${S.byId.get(r.place).name} · Guia turístico de Treze Tílias`
    : `${r.q ? `Busca: ${r.q}` : r.cat ? catName(r.cat) : r.group ? S.group.get(r.group).name : 'Explorar'} · Guia turístico de Treze Tílias`;
  if (r.legacy) history.replaceState(history.state, '', exploreUrl({ group: r.group, cat: r.cat, place: r.place }));
  renderMenu();
  $('#home').hidden = r.name !== 'home';
  $('#explore').hidden = r.name !== 'explore';
  document.querySelector('.site-footer').classList.toggle('is-explore', r.name === 'explore');
  if (r.name === 'home') {
    hideSheet(false);
    renderHome();
    if (fromPop && history.state?.scrollY != null) scrollTo(0, history.state.scrollY); else if (!fromPop) scrollTo(0, 0);
    return;
  }
  const listKey = JSON.stringify([r.group, r.cat, r.q, r.vista]);
  const listChanged = listKey !== S.lastRenderKey || prev.name !== 'explore';
  if (listChanged) {
    renderToolbar(r);
    applyView();
    S.selected = r.place || (fromPop ? S.selected : null);
    renderResults(r);
    if (r.vista === 'mapa' || isDesktop()) { ensureMap(); setTimeout(() => { S.map?.invalidateSize(); updateMap(r, { fit: true }); if (r.place) selectPlace(r.place, { pan: true, scroll: true }); }, 0); }
    if (fromPop && history.state) {
      if (isDesktop()) $('#paneList').scrollTop = history.state.listTop || 0; else scrollTo(0, history.state.scrollY || 0);
    } else if (!r.place && !keepScroll) scrollTo(0, 0);
    else if (!r.place && prev.name !== 'explore') scrollTo(0, 0);
    S.lastRenderKey = listKey;
  }
  if (r.place) {
    const p = S.byId.get(r.place);
    if (!listChanged) selectPlace(p.id, { pan: true, scroll: false });
    showSheet(p);
  } else {
    hideSheet(true);
    if (fromPop && history.state && !listChanged) {
      if (isDesktop()) $('#paneList').scrollTop = history.state.listTop || 0; else scrollTo(0, history.state.scrollY || 0);
    }
  }
}

// ---------- Início ----------
(async function init() {
  try { await load(); }
  catch {
    $('#home').hidden = false;
    $('#home').innerHTML = '<div class="intro"><h1>Guia turístico de Treze Tílias</h1><p>Não foi possível carregar os dados do guia. Verifique a conexão e tente novamente.</p></div>';
    return;
  }
  S.headerH = $('.masthead').offsetHeight;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.pathname.startsWith('/local/')) S.openedInApp = false;
  render();
  addEventListener('resize', () => { placeIndicator(false); applyView(); S.map?.invalidateSize(); updateToggle(S.route, currentList(S.route).places.filter((p) => p.coords).length); });
  window.__leafletLoaded = !!window.L;
})();
