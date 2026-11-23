// Guia turístico de Treze Tílias — aplicação sem framework.
// Rotas: /  ·  /explorar?grupo=&cat=&q=&vista=mapa  ·  /local/:id[?ficha=resumo]  ·  /categoria/:id/:nome
//        /local/45/… e /local/131/… (IDs do guia atual)  ·  /telefones-uteis
//
// Movimento: três momentos visíveis, ligados pelo vermelho da Asturtílias
//   1. troca de categoria (sublinhado desliza)  2. seleção do ponto (anel se expande)  3. ficha (sobe da base / abre ao lado)
// O resto responde rápido e discreto. Com prefers-reduced-motion tudo vai direto ao estado final.

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fold = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => matchMedia('(min-width: 900px)').matches;
const ms = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

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
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
};
const icon = (name, size = 18) => ICON[name].replace('<svg', `<svg width="${size}" height="${size}" class="i"`);

const DISTANCES = [['Videira', '32 km'], ['Joaçaba', '37 km'], ['Caçador', '76 km'], ['Chapecó', '176 km'], ['Lages', '200 km'],
  ['Curitiba', '361 km'], ['Joinville', '376 km'], ['Florianópolis', '421 km'], ['Porto Alegre', '545 km'], ['São Paulo', '779 km']];

// fotografias reais já presentes no guia, uma por caminho principal
const PATH_PHOTO = { fazer: 'museu-andreas-thaler', comer: 'restaurante-edelweiss', ficar: 'hotel-13-linden' };

const S = {
  data: null, byId: new Map(), legacy: new Map(), cat: new Map(), group: new Map(),
  route: { name: 'home' }, selected: null,
  map: null, markers: new Map(), mapFailed: false, mapLoaded: false,
  lastListKey: '', sheetMode: null, savedView: null, openedInApp: false,
  anims: new Map(),
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
  if (!toks.length) return { places: [], cats: [], groups: [] };
  const hit = (s) => toks.every((t) => s.includes(t));
  const cats = S.data.categories.filter((c) => hit(fold(c.name)));
  const groups = S.data.groups.filter((g) => hit(fold(g.name)));
  const scored = [];
  for (const p of S.data.places) {
    if (!hit(p.search)) continue;
    const n = fold(p.name);
    scored.push([toks.every((t) => n.includes(t)) ? (n.startsWith(toks[0]) ? 0 : 1) : 2, p]);
  }
  scored.sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name, 'pt'));
  return { places: scored.map((x) => x[1]), cats, groups };
}

// ---------- Rotas ----------
function parse(loc = location) {
  const u = new URL(loc.href);
  const parts = u.pathname.split('/').filter(Boolean).map((x) => { try { return decodeURIComponent(x); } catch { return x; } });
  const qp = u.searchParams;
  const base = { q: qp.get('q') || '', vista: qp.get('vista') === 'mapa' ? 'mapa' : 'lista', ficha: qp.get('ficha') === 'resumo' ? 'resumo' : null };
  if (!parts.length) return { name: 'home' };
  if (parts[0] === 'telefones-uteis') return { name: 'explore', ...base, group: 'uteis', cat: 20 };
  if (parts[0] === 'categoria' && parts[1]) {
    const cat = Number(parts[1]);
    if (S.cat.has(cat)) return { name: 'explore', ...base, group: groupOfCat(cat), cat };
  }
  if (parts[0] === 'local' && /^\d+$/.test(parts[1] || '')) {
    const id = S.legacy.get(parts[1]);
    if (id) { const c = S.byId.get(id).cats[0] || null; return { name: 'explore', q: '', vista: 'lista', ficha: null, group: groupOfCat(c) || null, cat: c, place: id, legacy: true }; }
    const nome = (parts[2] || '').replace(/\s+-\s+Treze T[ií]lias$/i, '').trim();
    return { name: 'explore', q: nome, vista: 'lista', ficha: null, group: null, cat: null };
  }
  if (parts[0] === 'local' && parts[1] && S.byId.has(parts[1])) {
    const p = S.byId.get(parts[1]);
    const cat = Number(qp.get('cat')) || null;
    const group = qp.get('grupo') || (cat ? groupOfCat(cat) : base.q ? null : groupOfCat(p.cats[0]) || null);
    return { name: 'explore', ...base, group, cat: cat && S.cat.has(cat) ? cat : (base.q || qp.has('grupo') ? null : p.cats[0] || null), place: p.id };
  }
  if (parts[0] === 'explorar') {
    const cat = Number(qp.get('cat')) || null;
    const group = qp.get('grupo') || (cat ? groupOfCat(cat) : null);
    return { name: 'explore', ...base, group: S.group.has(group) ? group : null, cat: S.cat.has(cat) ? cat : null };
  }
  return { name: 'home' };
}
function exploreUrl({ group, cat, q, vista, place, ficha } = {}) {
  const qp = new URLSearchParams();
  if (group && !(cat && groupOfCat(cat) === group && place)) qp.set('grupo', group);
  if (cat) qp.set('cat', cat);
  if (q) qp.set('q', q);
  if (vista === 'mapa') qp.set('vista', 'mapa');
  if (place && ficha === 'resumo') qp.set('ficha', 'resumo');
  const s = qp.toString();
  return (place ? `/local/${encodeURIComponent(place)}` : '/explorar') + (s ? `?${s}` : '');
}
const routeUrl = (patch = {}) => { const r = S.route; return exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista, ...patch }); };
function saveScroll() {
  history.replaceState({ ...(history.state || {}), scrollY, listTop: $('#paneList')?.scrollTop ?? 0 }, '', location.href);
}
function go(url, { replace = false } = {}) {
  if (replace) history.replaceState(null, '', url);
  else { saveScroll(); history.pushState(null, '', url); }
  render();
}
addEventListener('popstate', () => render({ fromPop: true }));
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-link]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
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
    `<li class="menu-phones"><a href="/telefones-uteis" data-link ${r.cat === 20 ? 'aria-current="true"' : ''}>${icon('phone')} Telefones úteis</a></li>`;
}
const toggle = $('.menu-toggle');
function setMenu(open) {
  const m = $('#menu');
  m.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.menu-label').textContent = open ? 'Fechar' : 'Menu';
}
toggle.addEventListener('click', () => setMenu(!$('#menu').classList.contains('open')));
function closeMenu() { if ($('#menu').classList.contains('open')) setMenu(false); }
document.addEventListener('click', (e) => { if (!e.target.closest('.mainnav')) closeMenu(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('#menu').classList.contains('open')) { setMenu(false); toggle.focus(); e.stopImmediatePropagation(); }
}, true);

// ---------- Busca ----------
function searchForm(q = '', idSuffix = 'home') {
  return `<form class="search" role="search" data-search>
    <label for="q-${idSuffix}">Busque um lugar ou uma experiência</label>
    <div class="search-row">
      <input id="q-${idSuffix}" name="q" type="search" value="${esc(q)}" placeholder="Ex.: águia, cerveja, pousada, táxi"
        autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-autocomplete="list" aria-controls="sug-${idSuffix}">
      <button type="submit" class="btn-primary">Buscar</button>
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
    list.innerHTML = items.map((it, i) => `<li role="option"><a href="${it.href}" data-link id="opt-${idSuffixOf(form)}-${i}"><span>${esc(it.label)}</span><span class="s-type">${esc(it.type)}</span></a></li>`).join('');
    list.hidden = false;
  };
  input.addEventListener('input', update);
  input.addEventListener('keydown', (e) => {
    const opts = $$('a', list);
    if (list.hidden || !opts.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === active)));
      input.setAttribute('aria-activedescendant', opts[active].id);
    } else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); opts[active].click(); }
    else if (e.key === 'Escape') { list.hidden = true; e.stopPropagation(); }
  });
  input.addEventListener('blur', () => setTimeout(() => { list.hidden = true; }, 150));
  form.addEventListener('submit', (e) => {
    e.preventDefault(); list.hidden = true;
    input.blur();
    go(exploreUrl({ q: input.value.trim(), vista: S.route.vista }));
  });
}
const idSuffixOf = (form) => $('input', form).id.replace('q-', '');

// ---------- Abertura ----------
function renderHome(firstVisit) {
  const counts = (g) => placesIn({ group: g }).length;
  const main = ['fazer', 'comer', 'ficar'].map((id) => S.group.get(id));
  const photo = (gid) => S.byId.get(PATH_PHOTO[gid])?.photo;
  $('#home').innerHTML = `<div class="home ${firstVisit && !reduceMotion() ? 'intro-anim' : ''}">
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
      <h2 id="paths-h">Explore Treze Tílias</h2>
      <ul class="path-main">
        ${main.map((g) => { const ph = photo(g.id); return `<li><a class="path-card" href="${exploreUrl({ group: g.id })}" data-link>
          <span class="path-thumb">${ph ? `<img src="${ph['480']}" alt="" width="480" height="${Math.round(480 / ph.ratio)}" loading="lazy" decoding="async">` : ''}</span>
          <span class="path-text"><span class="path-name">${esc(g.name)}</span><span class="path-lede">${esc(g.lede)}</span></span>
          <span class="path-go"><span class="path-count">${counts(g.id)} lugares</span>${icon('arrow', 20)}</span></a></li>`; }).join('')}
      </ul>
      <ul class="path-short" aria-label="Atalhos">
        <li><a href="${exploreUrl({ group: 'planejar' })}" data-link>Planejar a visita ${icon('arrow', 16)}</a></li>
        <li><a href="${exploreUrl({ group: 'uteis' })}" data-link>Informações úteis ${icon('arrow', 16)}</a></li>
        <li><a class="is-phones" href="/telefones-uteis" data-link>${icon('phone', 16)} Telefones úteis</a></li>
      </ul>
    </nav>
    <div class="home-more">
      <section class="fact">
        <h2>Atendimento ao turista</h2>
        <p>CAT – Centro de Atendimento ao Turista, Rua Pedro Nelcido Käfer, 115, Centro.</p>
        <p class="fact-tel"><a href="tel:+5549991649034">(49) 99164 9034</a> · telefone e WhatsApp</p>
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

// ---------- Explorar: lista ----------
function currentList(r) {
  if (r.q) {
    const res = search(r.q);
    let places = res.places;
    if (r.cat) places = places.filter((p) => p.cats.includes(r.cat));
    else if (r.group) places = places.filter((p) => p.cats.some((c) => groupOfCat(c) === r.group));
    return { places, cats: res.cats, groups: res.groups };
  }
  let places = placesIn(r);
  places = (r.cat === 20 || r.group === 'uteis')
    ? [...places].sort((a, b) => (b.emergency ? 1 : 0) - (a.emergency ? 1 : 0))
    : [...places].sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  return { places, cats: [], groups: [] };
}

function renderToolbar(r) {
  const g = r.group ? S.group.get(r.group) : null;
  const tabs = g ? [{ id: null, name: 'Tudo' }, ...g.cats.map((id) => S.cat.get(id))] : [];
  const scope = r.q ? currentList({ ...r, cat: null }).places : null;
  const countFor = (cid) => (r.q ? scope.filter((p) => (cid ? p.cats.includes(cid) : true)).length : placesIn(cid ? { cat: cid } : { group: r.group }).length);
  $('#toolbar').innerHTML = `${searchForm(r.q, 'bar')}
    <div class="groups" aria-label="Caminhos">
      ${S.data.groups.map((x) => `<a class="group-chip" href="${exploreUrl({ group: x.id, q: r.q, vista: r.vista })}" data-link ${x.id === r.group ? 'aria-current="true"' : ''}>${esc(x.name)}</a>`).join('')}
      ${r.q ? `<a class="group-chip" href="${exploreUrl({ q: r.q, vista: r.vista })}" data-link ${!r.group ? 'aria-current="true"' : ''}>Todos os resultados</a>` : ''}
    </div>
    ${tabs.length ? `<div class="cats" role="group" aria-label="Categorias de ${esc(g.name)}">
      ${tabs.map((t) => `<button type="button" class="cat-tab" data-cat="${t.id ?? ''}" aria-pressed="${(t.id ?? null) === (r.cat ?? null)}">${esc(t.name)}<span class="n">${countFor(t.id)}</span></button>`).join('')}
      <span class="cat-indicator" aria-hidden="true"></span></div>` : ''}
    <div class="resultbar">
      <p class="count" id="resultCount" aria-live="polite"></p>
      <div class="seg" role="group" aria-label="Visualização">
        <button type="button" data-view="lista" aria-pressed="${r.vista !== 'mapa'}">${icon('list', 16)}Lista</button>
        <button type="button" data-view="mapa" aria-pressed="${r.vista === 'mapa'}">${icon('map', 16)}Mapa</button>
      </div>
    </div>`;
  wireSearch($('#toolbar'));
  const chip = $('.group-chip[aria-current="true"]', $('#toolbar'));
  if (chip) revealInScroller(chip.parentElement, chip, false);
  $$('.cat-tab', $('#toolbar')).forEach((b) => b.addEventListener('click', () => switchCategory(b.dataset.cat ? Number(b.dataset.cat) : null)));
  $$('.seg button', $('#toolbar')).forEach((b) => b.addEventListener('click', () => switchView(b.dataset.view)));
  placeIndicator(false);
}

// desloca uma barra horizontal só o suficiente para mostrar o item inteiro
function revealInScroller(bar, item, smooth = true) {
  const pad = 16;
  const l = item.offsetLeft, rgt = l + item.offsetWidth;
  let to = null;
  if (l - pad < bar.scrollLeft) to = l - pad;
  else if (rgt + pad > bar.scrollLeft + bar.clientWidth) to = rgt + pad - bar.clientWidth;
  if (to !== null) bar.scrollTo({ left: Math.max(0, to), behavior: smooth && !reduceMotion() ? 'smooth' : 'auto' });
}

// Movimento 1: o sublinhado vermelho desliza da categoria anterior até a nova e ajusta a largura ao texto.
function placeIndicator(animate = true) {
  const bar = $('.cats'); if (!bar) return;
  const ind = $('.cat-indicator', bar), btn = $('.cat-tab[aria-pressed="true"]', bar) || $('.cat-tab', bar);
  if (!btn) return;
  if (!animate) ind.style.transition = 'none';
  // a transição CSS parte da posição atual (inclusive no meio de outra transição): toques rápidos seguem a última escolha
  ind.style.width = `${btn.offsetWidth - 20}px`;
  ind.style.transform = `translateX(${btn.offsetLeft + 10}px)`;
  if (!animate) { void ind.offsetWidth; ind.style.transition = ''; }
  revealInScroller(bar, btn, animate);
}
function switchCategory(cat) {
  if ((S.route.cat ?? null) === cat) return;
  $$('.cat-tab', $('#toolbar')).forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.cat ? Number(b.dataset.cat) : null) === cat)));
  placeIndicator(true);
  history.replaceState(null, '', routeUrl({ cat }));
  S.route = parse();
  S.selected = null;
  S.lastListKey = listKey(S.route);
  renderResults(S.route, { keepPosition: true, fade: true });
  updateMap(S.route, { fit: true });
  renderMenu();
}

function switchView(vista) {
  if (S.route.vista === vista) return;
  saveScroll();
  const listY = scrollY;
  history.replaceState(history.state, '', routeUrl({ vista, place: S.route.place, ficha: S.route.ficha }));
  S.route = parse();
  S.lastListKey = listKey(S.route);
  $$('.seg button', $('#toolbar')).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === vista)));
  applyView();
  if (vista === 'mapa') {
    S.listY = listY;
    scrollTo({ top: 0, behavior: 'instant' });
    ensureMap();
    requestAnimationFrame(() => {
      S.map?.invalidateSize();
      updateMap(S.route, { fit: !S.selected || !S.markers.has(S.selected) });
      if (S.selected && S.markers.has(S.selected)) { markSelected(); S.map.setView(S.markers.get(S.selected).getLatLng(), Math.max(S.map.getZoom(), 15), { animate: false }); }
    });
  } else {
    requestAnimationFrame(() => {
      const card = S.selected && $(`#results .card[data-id="${CSS.escape(S.selected)}"]`);
      if (card) { const r = card.getBoundingClientRect(); const top = toolbarBottom(); if (r.top < top || r.bottom > innerHeight) scrollTo({ top: scrollY + r.top - top - 12, behavior: 'instant' }); }
      else scrollTo({ top: S.listY || 0, behavior: 'instant' });
    });
  }
}
const toolbarBottom = () => $('#toolbar').getBoundingClientRect().bottom;
const listKey = (r) => JSON.stringify([r.group, r.cat, r.q]);

function cardHtml(p, r) {
  const ctxCat = r.cat && p.cats.includes(r.cat) ? r.cat : p.cats.find((c) => !r.group || groupOfCat(c) === r.group) ?? p.cats[0];
  const href = exploreUrl({ group: r.group, cat: r.cat, q: r.q, vista: r.vista, place: p.id });
  if (p.kind === 'service' && !p.photo) {
    const ph = p.phones?.[0];
    return `<li class="card is-service ${S.selected === p.id ? 'is-selected' : ''}" data-id="${esc(p.id)}">
      <div class="card-main"><a class="card-link" href="${href}" data-open="${esc(p.id)}"><h3 class="card-name">${esc(p.name)}</h3></a>
        <p class="card-cat">${esc(p.group || catName(ctxCat))}${p.summary ? ` · <span class="card-sub">${esc(p.summary)}</span>` : ''}</p>
        ${p.emergency || ph ? `<p class="card-phone">${p.emergency ? `<span class="emergency">${esc(p.emergency)}</span>` : ''}${ph ? esc(ph.label) : ''}</p>` : ''}
      </div>
      ${p.emergency ? `<a class="card-call btn-primary" href="tel:${p.emergency}">${icon('phone')} Ligar ${esc(p.emergency)}</a>`
        : ph ? `<a class="card-call btn-primary" href="tel:${esc(ph.tel)}" aria-label="Ligar para ${esc(p.name)}">${icon('phone')} Ligar</a>` : ''}
    </li>`;
  }
  const meta = p.summary || [p.address, p.district].filter(Boolean).join(' · ');
  const flags = [p.coords ? 'No mapa' : null, p.hours ? 'Horário informado' : null, p.whatsapp ? 'WhatsApp' : null, p.tour ? 'Vista em 360°' : null].filter(Boolean);
  return `<li class="card ${S.selected === p.id ? 'is-selected' : ''}" data-id="${esc(p.id)}">
    <div class="card-main">
      <a class="card-link" href="${href}" data-open="${esc(p.id)}"><h3 class="card-name">${esc(p.name)}</h3></a>
      <p class="card-cat">${esc(placeLabel(p, ctxCat))}</p>
      ${meta ? `<p class="card-meta">${esc(meta)}</p>` : ''}
      ${flags.length ? `<p class="card-flags">${flags.map((f) => `<span>${esc(f)}</span>`).join('<span aria-hidden="true">·</span>')}</p>` : ''}
    </div>
    ${p.photo ? `<div class="card-thumb ${p.photo.logo ? 'is-logo' : ''}"><img src="${p.photo['480']}" alt="" loading="lazy" decoding="async" width="88" height="88"></div>` : ''}
  </li>`;
}

function renderResults(r, { keepPosition = false, fade = false } = {}) {
  const { places, cats, groups } = currentList(r);
  const el = $('#results');
  const title = r.q ? `Resultados para “${esc(r.q)}”` : r.cat ? esc(catName(r.cat)) : r.group ? esc(S.group.get(r.group).name) : 'Todos os lugares';
  const onMap = places.filter((p) => p.coords).length;
  const count = $('#resultCount');
  if (count) count.textContent = `${places.length} ${places.length === 1 ? 'lugar' : 'lugares'}${onMap ? ` · ${onMap} no mapa` : ''}`;
  const seg = $('.seg', $('#toolbar'));
  if (seg) { seg.hidden = !onMap; }
  let html = `<h2 class="results-title">${title}</h2>`;
  if (r.q && (cats?.length || groups?.length)) {
    html += `<div class="cat-matches">${[...(groups || []).map((g) => `<a href="${exploreUrl({ group: g.id })}" data-link>${esc(g.name)}</a>`),
      ...cats.map((c) => `<a href="${exploreUrl({ group: c.group, cat: c.id })}" data-link>Categoria: ${esc(c.name)}</a>`)].join('')}</div>`;
  }
  if (!places.length) {
    html += `<div class="empty"><h3>Nada encontrado${r.q ? ` para “${esc(r.q)}”` : ' nesta categoria'}</h3>
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
    html += `<section class="fact"><h2>Distâncias até Treze Tílias</h2><ul class="dist">${DISTANCES.map(([c, d]) => `<li><span>${c}</span><b>${d}</b></li>`).join('')}</ul></section>`;
  }
  const pane = isDesktop() ? $('#paneList') : null;
  const before = pane ? pane.scrollTop : scrollY;
  el.style.minHeight = `${el.offsetHeight}px`;    // evita que a página encolha e pule durante a troca
  el.innerHTML = html;
  requestAnimationFrame(() => { el.style.minHeight = ''; });
  if (keepPosition) {
    const tb = $('#toolbar');
    const listTop = pane ? el.offsetTop - tb.offsetHeight : el.getBoundingClientRect().top + scrollY - S.headerH - tb.offsetHeight;
    const target = Math.min(before, Math.max(0, listTop));
    if (pane) pane.scrollTop = target; else scrollTo({ top: target, behavior: 'instant' });
  }
  if (fade) animate(el, 'results', [{ opacity: 0.35 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
}

// animações JS interrompíveis: uma nova chamada com a mesma chave cancela a anterior
function animate(el, key, frames, opts) {
  S.anims.get(key)?.cancel();
  if (reduceMotion() || !el.animate) return null;
  const a = el.animate(frames, opts);
  S.anims.set(key, a);
  return a;
}

function applyView() {
  $('#explore').classList.toggle('is-map', S.route.vista === 'mapa');
  document.body.classList.toggle('map-mode', S.route.name === 'explore' && S.route.vista === 'mapa' && !isDesktop());
  document.documentElement.style.setProperty('--toolbar-h', `${$('#toolbar').offsetHeight}px`);
}

// ---------- Mapa ----------
function ensureMap() {
  if (S.map || S.mapFailed) return;
  const loading = $('#mapLoading');
  if (!window.L) { mapFail('O mapa não carregou. A lista, os endereços e os contatos continuam disponíveis.'); return; }
  try {
    loading.hidden = false;
    S.map = L.map('map', { zoomControl: true, scrollWheelZoom: true, keyboard: true, zoomSnap: 0.5, fadeAnimation: true }).setView([-26.9995, -51.4075], 14);
    let errors = 0;
    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(S.map);
    const done = () => {
      if (S.mapLoaded) return; S.mapLoaded = true;
      loading.classList.add('is-done');
      setTimeout(() => { loading.hidden = true; }, reduceMotion() ? 0 : 220);
    };
    layer.on('load', done);
    let firstTiles = 0;
    layer.on('tileload', () => { if (++firstTiles >= 4) setTimeout(done, 120); });
    layer.on('tileerror', () => { if (++errors > 6 && !S.mapLoaded) mapFail('As imagens do mapa não carregaram. Use a lista e o botão “Como chegar” de cada lugar.'); });
    // toque no mapa: escolhe o ponto mais próximo do dedo (até 26 px). Áreas de toque grandes não "roubam" o vizinho.
    S.map.on('click', (e) => {
      if (!e.containerPoint) return;
      const id = nearestMarker(e.containerPoint, 26);
      if (id) tapMarker(id);
      else if (S.sheetMode === 'half') closeSheet();
    });
    S.map.on('mousemove', (e) => { $('#map').style.cursor = nearestMarker(e.containerPoint, 26) ? 'pointer' : ''; });
  } catch { mapFail('O mapa não carregou. A lista, os endereços e os contatos continuam disponíveis.'); }
}
function nearestMarker(pt, max) {
  let best = null, bd = max;
  for (const [id, m] of S.markers) {
    const c = S.map.latLngToContainerPoint(m.getLatLng()).add(L.point(m.pinOff || [0, 0]));
    const d = c.distanceTo(pt);
    if (d <= bd) { bd = d; best = id; }
  }
  return best;
}
function mapFail(msg) {
  S.mapFailed = true;
  $('#mapLoading').hidden = true;
  const f = $('#mapFallback'); f.hidden = false; f.innerHTML = `<p>${esc(msg)}</p>`;
}
function pinIcon(p, off = [0, 0]) {
  const cls = isStay(p) ? 'is-stay' : isFood(p) ? 'is-food' : '';
  return L.divIcon({ className: 'pin-icon', iconSize: [44, 44], iconAnchor: [22 - off[0], 22 - off[1]],
    html: `<span class="pin ${cls}" data-pin="${esc(p.id)}"><span class="pin-ring"></span><span class="pin-dot"></span></span>` });
}
function updateMap(r, { fit = false } = {}) {
  if (!S.map) return;
  const places = currentList(r).places.filter((p) => p.coords);
  const keep = new Set(places.map((p) => p.id));
  for (const [id, m] of S.markers) if (!keep.has(id)) { m.remove(); S.markers.delete(id); }
  // lugares com a mesma coordenada ficam lado a lado, a 12 px do ponto comum, para que todos possam ser tocados
  const groups = new Map();
  for (const p of places) { const k = p.coords.join(','); groups.set(k, [...(groups.get(k) || []), p.id]); }
  const offsetOf = (p) => { const g = groups.get(p.coords.join(',')); if (g.length < 2) return [0, 0]; const i = g.indexOf(p.id), a = (2 * Math.PI * i) / g.length - Math.PI / 2; return [Math.round(Math.cos(a) * 12), Math.round(Math.sin(a) * 12)]; };
  for (const p of places) {
    const off = offsetOf(p);
    if (S.markers.has(p.id)) { const m0 = S.markers.get(p.id); if (String(m0.pinOff) !== String(off)) { m0.pinOff = off; m0.setIcon(pinIcon(p, off)); } continue; }
    const m = L.marker(p.coords, { icon: pinIcon(p, off), title: p.name, alt: p.name, keyboard: true, riseOnHover: true });
    m.pinOff = off;
    m.on('keypress', (e) => { if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') tapMarker(p.id); });
    m.addTo(S.map); S.markers.set(p.id, m);
  }
  markSelected();
  if (fit && places.length) {
    const b = L.latLngBounds(places.map((p) => p.coords));
    S.map.fitBounds(b, { padding: [36, 36], maxZoom: 16, animate: !reduceMotion() && S.mapLoaded });
  }
}
function markSelected() {
  for (const [id, m] of S.markers) {
    m.getElement()?.querySelector('.pin')?.classList.toggle('is-selected', id === S.selected);
    m.setZIndexOffset(id === S.selected ? 1000 : 0);
  }
}

// Movimento 2: um único anel vermelho se expande e some; o ponto continua destacado depois.
function ringMarker(id) {
  const ring = S.markers.get(id)?.getElement()?.querySelector('.pin-ring');
  if (!ring) return;
  animate(ring, 'ring', [
    { transform: 'scale(.45)', opacity: 0.95 },
    { transform: 'scale(1.9)', opacity: 0 },
  ], { duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)' });
}

function highlightCard(id, { scroll = false } = {}) {
  $$('#results .card.is-selected').forEach((c) => c.classList.remove('is-selected'));
  const card = id && $(`#results .card[data-id="${CSS.escape(id)}"]`);
  if (!card) return;
  card.classList.add('is-selected');
  if (scroll && isDesktop()) {
    const pane = $('#paneList'), cr = card.getBoundingClientRect(), pr = pane.getBoundingClientRect();
    if (cr.top < pr.top + $('#toolbar').offsetHeight || cr.bottom > pr.bottom) card.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
  }
}
function selectPlace(id, { ring = true, scroll = false } = {}) {
  S.selected = id;
  highlightCard(id, { scroll });
  if (S.map) { markSelected(); if (ring) ringMarker(id); }
}

// área do mapa que fica visível com a ficha aberta (coordenadas do contêiner do mapa)
function visibleMapRect(mode) {
  const size = S.map.getSize();
  const mapBox = $('#map').getBoundingClientRect();
  let left = 0, bottom = size.y;
  if (isDesktop() && mode) left = Math.max(0, $('#sheet').getBoundingClientRect().width - ($('#paneList').getBoundingClientRect().width));
  if (!isDesktop() && mode === 'half') bottom = Math.min(size.y, innerHeight - halfHeight() - mapBox.top);
  return { left, top: 0, right: size.x, bottom };
}
// câmera: se o ponto já está bem enquadrado, fica parada; senão, um único deslocamento suave.
function frameMarker(id, mode) {
  const m = S.markers.get(id);
  if (!m || !S.map) return false;
  const v = visibleMapRect(mode), pad = 40;
  const pt = S.map.latLngToContainerPoint(m.getLatLng()).add(L.point(m.pinOff || [0, 0]));
  const ok = pt.x > v.left + pad && pt.x < v.right - pad && pt.y > v.top + pad && pt.y < v.bottom - pad;
  if (ok) return false;
  const target = L.point((v.left + v.right) / 2, v.top + (v.bottom - v.top) * 0.5);
  S.map.panBy(pt.subtract(target), { animate: !reduceMotion(), duration: ms('--t-sheet') / 1000 || 0.36, easeLinearity: 0.25 });
  return true;
}

function tapMarker(id) {
  if (isDesktop()) {
    selectPlace(id, { scroll: true });
    openPlace(id, 'full');
    return;
  }
  // celular: resumo em meia altura; câmera e ficha começam no mesmo quadro
  if (S.sheetMode !== 'half') S.savedView = { center: S.map.getCenter(), zoom: S.map.getZoom() };
  selectPlace(id);
  openPlace(id, 'half');
}

// ---------- Ficha ----------
function directionsUrl(p) {
  if (p.coords) return `https://www.google.com/maps/dir/?api=1&destination=${p.coords[0]},${p.coords[1]}`;
  return p.map || null;
}
function primaryAction(p) {
  const tel = p.phones?.[0];
  if (p.emergency) return { href: `tel:${p.emergency}`, label: `Ligar ${p.emergency}`, icon: 'phone' };
  if (p.kind === 'service' || p.cats.includes(20) || p.cats.includes(10) || p.cats.includes(9)) {
    if (tel) return { href: `tel:${tel.tel}`, label: 'Ligar', icon: 'phone' };
    if (p.whatsapp) return { href: p.whatsapp, label: 'Conversar no WhatsApp', icon: 'wa', ext: true };
    if (p.link) return { href: p.link.url, label: p.link.label, icon: 'link', ext: true };
  }
  if (isStay(p)) {
    if (p.whatsapp) return { href: p.whatsapp, label: 'Entrar em contato pelo WhatsApp', icon: 'wa', ext: true };
    if (tel) return { href: `tel:${tel.tel}`, label: 'Entrar em contato', icon: 'phone' };
  }
  const dir = directionsUrl(p);
  if (dir) return { href: dir, label: 'Como chegar', icon: 'route', ext: true };
  if (tel) return { href: `tel:${tel.tel}`, label: 'Ligar', icon: 'phone' };
  if (p.link) return { href: p.link.url, label: p.link.label, icon: 'link', ext: true };
  return null;
}
function sheetHtml(p, r) {
  const ctx = r.cat && p.cats.includes(r.cat) ? r.cat : p.cats[0];
  const dir = directionsUrl(p);
  const pa = primaryAction(p);
  const acts = [];
  const add = (cond, href, label, ic, ext = true) => { if (cond && href !== pa?.href) acts.push(`<a class="action" href="${esc(href)}" ${ext ? 'target="_blank" rel="noopener"' : ''}>${icon(ic, 20)}${esc(label)}</a>`); };
  add(!!dir, dir, 'Como chegar', 'route');
  add(!!p.phones?.length, `tel:${p.phones?.[0]?.tel}`, 'Ligar', 'phone', false);
  add(!!p.whatsapp, p.whatsapp, 'WhatsApp', 'wa');
  add(!!p.site, p.site, 'Site', 'web');
  add(!!p.instagram, p.instagram, 'Instagram', 'ig');
  add(!!p.facebook, p.facebook, 'Facebook', 'fb');
  add(!!p.email, `mailto:${p.email}`, 'E-mail', 'mail', false);
  add(!!p.link && pa?.href !== p.link?.url, p.link?.url, p.link?.label, 'link');
  const mapBtn = p.coords && !isDesktop() && r.vista !== 'mapa' ? `<button type="button" class="action" data-show-map>${icon('map', 20)}Ver no mapa do guia</button>` : '';
  const facts = [];
  if (p.address) facts.push(['Endereço', `${esc(p.address)}${p.district ? `<br>${esc(p.district)}` : ''}${p.address2 ? `<br>${esc(p.address2)}` : ''}${p.ref ? `<br><span class="muted">${esc(p.ref)}</span>` : ''}`]);
  if (p.hours) facts.push(['Horário', `${esc(p.hours)}${p.note ? `<br><span class="muted">${esc(p.note)}</span>` : ''}`]);
  if (p.phones?.length) facts.push(['Telefone', `<ul class="tel-list">${p.phones.map((t) => `<li><a href="tel:${esc(t.tel)}">${esc(t.label)}</a></li>`).join('')}</ul>${p.phoneLabel ? `<span class="muted small">${esc(p.phoneLabel)}</span>` : ''}`]);
  if (p.email) facts.push(['E-mail', `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`]);
  if (!p.coords && p.map) facts.push(['Localização', `<a href="${esc(p.map)}" target="_blank" rel="noopener">Abrir a localização do cadastro</a>`]);
  if (p.cats.length > 1) facts.push(['Também em', p.cats.filter((c) => c !== ctx).map((c) => `<a href="${exploreUrl({ group: groupOfCat(c), cat: c })}" data-link>${esc(catName(c))}</a>`).join(', ')]);
  const logo = p.photo?.logo;
  return `<div class="sheet-grab" aria-hidden="true"></div>
    <header class="sheet-head">
      ${logo ? `<img class="sheet-logo" src="${p.photo['480']}" alt="Marca de ${esc(p.name)}" width="56" height="56">` : ''}
      <div class="sheet-id"><p class="sheet-cat">${esc(placeLabel(p, ctx))}</p><h2 class="sheet-title" id="sheetTitle" tabindex="-1">${esc(p.name)}</h2></div>
      <button type="button" class="sheet-close" data-close aria-label="Fechar a ficha">${icon('close')}<span>Fechar</span></button>
      <div class="head-actions ${p.tour ? 'has-tour' : ''}">
        ${pa ? `<a class="primary-action btn-primary" href="${esc(pa.href)}" ${pa.ext ? 'target="_blank" rel="noopener"' : ''}>${icon(pa.icon, 20)}${esc(pa.label)}</a>` : ''}
        ${p.tour ? `<a class="tour-action" href="${esc(p.tour)}" target="_blank" rel="noopener" aria-label="Ver em 360° (${esc(p.tourNote || 'Street View')})">${icon('tour', 20)}Ver em 360°</a>` : ''}
      </div>
      ${p.tour && p.tourNote ? `<p class="tour-note">${esc(p.tourNote)}</p>` : ''}
      <button type="button" class="sheet-expand" data-expand aria-expanded="false" aria-controls="sheetBody">${icon('up')}<span>Ver detalhes</span></button>
    </header>
    <div class="sheet-body" id="sheetBody">
      ${p.photo && !logo ? `<figure class="sheet-photo"><img src="${p.photo['960']}" srcset="${p.photo['480']} 480w, ${p.photo['960']} 960w" sizes="(min-width: 900px) 460px, 100vw" alt="${esc(p.name)}" width="960" height="${Math.round(960 / (p.photo.ratio || 1.6))}"></figure>` : ''}
      <div class="sheet-inner">
        ${p.summary ? `<p class="sheet-summary">${esc(p.summary)}</p>` : ''}
        ${p.text ? `<p class="sheet-text">${esc(p.text)}</p>` : ''}
        ${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
        ${acts.length || mapBtn ? `<div class="actions">${acts.join('')}${mapBtn}</div>` : ''}
        ${p.photo ? `<p class="credit">${logo ? 'Marca' : 'Foto'}: cadastro do estabelecimento no site da Asturtílias</p>` : ''}
      </div>
    </div>`;
}

const halfHeight = () => Math.round(Math.min(innerHeight * 0.5, Math.max(innerHeight * 0.42, $('#sheet .sheet-head')?.offsetHeight + 72 || 0)));

let lastFocus = null;
function openPlace(id, mode = 'full') {
  const ficha = mode === 'half' ? 'resumo' : null;
  const url = routeUrl({ place: id, ficha });
  // com uma ficha já aberta, trocar de lugar substitui a entrada: Voltar/Esc fecham em vez de voltar à ficha anterior
  if (S.sheetMode && S.openedInApp) go(url, { replace: true });
  else { S.openedInApp = true; go(url); }
}
function setSheetMode(mode, { instant = false } = {}) {
  const sheet = $('#sheet');
  S.sheetMode = mode;
  sheet.dataset.mode = mode;
  const expand = $('[data-expand]', sheet);
  if (expand) expand.setAttribute('aria-expanded', String(mode === 'full'));
  if (!isDesktop()) {
    const h = sheet.offsetHeight;
    const offset = mode === 'half' ? Math.max(0, h - halfHeight()) : 0;
    if (instant) sheet.style.transition = 'none';
    sheet.style.setProperty('--sheet-y', `${offset}px`);
    if (instant) { void sheet.offsetWidth; sheet.style.transition = ''; }
    $('#sheetBackdrop').classList.toggle('is-open', mode === 'full');
    $('#sheetBackdrop').hidden = mode !== 'full';
  }
}
function showSheet(p, mode) {
  const sheet = $('#sheet');
  const wasOpen = sheet.classList.contains('is-open');
  const prevMode = S.sheetMode;
  if (!wasOpen) {
    const ae = document.activeElement;
    lastFocus = ae?.closest?.('.card') ? ae : $(`#results .card[data-id="${CSS.escape(p.id)}"] .card-link`);
  }
  sheet.innerHTML = sheetHtml(p, S.route);
  sheet.scrollTop = 0;
  sheet.hidden = false;
  sheet.setAttribute('aria-modal', String(!isDesktop() && mode === 'full'));
  $('[data-close]', sheet).addEventListener('click', closeSheet);
  $('[data-expand]', sheet).addEventListener('click', () => expandSheet());
  $('.sheet-grab', sheet).addEventListener('click', () => (S.sheetMode === 'half' ? expandSheet() : null));
  $('[data-show-map]', sheet)?.addEventListener('click', () => {
    S.selected = p.id;
    if (S.map) S.savedView = null;
    go(routeUrl({ vista: 'mapa', place: p.id, ficha: 'resumo' }), { replace: true });
  });
  if (!wasOpen) {
    // posição inicial fora da tela, depois sobe até o estado pedido
    sheet.classList.remove('is-open');
    if (!isDesktop()) { sheet.style.transition = 'none'; sheet.style.setProperty('--sheet-y', `${sheet.offsetHeight + 24}px`); void sheet.offsetWidth; sheet.style.transition = ''; }
    // câmera e ficha no mesmo quadro: o ponto termina visível acima do resumo
    if (mode === 'half' && S.map) frameMarker(p.id, 'half');
    if (isDesktop() && S.map) requestAnimationFrame(() => frameMarker(p.id, 'full'));
    requestAnimationFrame(() => { sheet.classList.add('is-open'); setSheetMode(mode); });
  } else {
    setSheetMode(mode, { instant: prevMode === mode });
    if (mode === 'half' && S.map) frameMarker(p.id, 'half');
    if (isDesktop() && S.map) frameMarker(p.id, 'full');
    if (prevMode === mode) animate($('.sheet-head', sheet), 'swap', [{ opacity: 0.4 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
  }
  const focusTarget = mode === 'half' ? $('#sheetTitle', sheet) : $('[data-close]', sheet);
  setTimeout(() => focusTarget?.focus({ preventScroll: true }), wasOpen ? 0 : 40);
}
function expandSheet() {
  if (S.sheetMode !== 'half') return;
  history.replaceState(history.state, '', routeUrl({ place: S.route.place }));
  S.route = parse();
  setSheetMode('full');
  $('#sheet').setAttribute('aria-modal', 'true');
  $('[data-close]', $('#sheet')).focus({ preventScroll: true });
}
function hideSheet({ restoreFocus = true } = {}) {
  const sheet = $('#sheet'), back = $('#sheetBackdrop');
  if (sheet.hidden) return;
  const wasHalfOnMap = !isDesktop() && S.route.vista === 'mapa';
  sheet.classList.remove('is-open');
  if (!isDesktop()) sheet.style.setProperty('--sheet-y', `${sheet.offsetHeight + 24}px`);
  back.classList.remove('is-open');
  S.sheetMode = null;
  // movimento inverso: a câmera volta à região de antes, sem mudar o zoom
  if (wasHalfOnMap && S.map && S.savedView) {
    S.map.panTo(S.savedView.center, { animate: !reduceMotion(), duration: ms('--t-sheet') / 1000 || 0.3, easeLinearity: 0.25 });
  }
  S.savedView = null;
  const t = ms('--t-sheet');
  setTimeout(() => { if (!sheet.classList.contains('is-open')) { sheet.hidden = true; back.hidden = true; } }, t + 40);
  if (restoreFocus) {
    const card = S.selected && $(`#results .card[data-id="${CSS.escape(S.selected)}"]`);
    const pin = S.selected && S.markers.get(S.selected)?.getElement();
    const target = (S.route.vista === 'mapa' && !isDesktop() && pin) ? pin : card ? $('.card-link', card) : lastFocus;
    target?.focus?.({ preventScroll: true });
  }
}
function closeSheet() {
  if (S.openedInApp) { S.openedInApp = false; history.back(); }
  else go(routeUrl({ place: null, ficha: null }), { replace: true });
}
$('#sheetBackdrop').addEventListener('click', closeSheet);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || $('#sheet').hidden) return;
  e.preventDefault();
  closeSheet();
});

// abrir ficha pelos cartões: completa desde o início, mantendo o contexto da lista
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-open]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault();
  const id = a.dataset.open;
  selectPlace(id, { ring: isDesktop() });
  if (isDesktop()) S.savedView = null;
  openPlace(id, 'full');
});

// ---------- Renderização principal ----------
function render({ fromPop = false } = {}) {
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
    document.body.classList.remove('map-mode');
    hideSheet({ restoreFocus: false });
    let first = false;
    try { first = !sessionStorage.getItem('tt-intro'); sessionStorage.setItem('tt-intro', '1'); } catch { first = !S.introDone; }
    S.introDone = true;
    renderHome(first && !fromPop && prev.name === 'home' && !S.rendered);
    if (fromPop && history.state?.scrollY != null) scrollTo(0, history.state.scrollY); else scrollTo(0, 0);
    S.rendered = true;
    S.lastListKey = '';
    return;
  }
  const key = listKey(r);
  const viewChanged = prev.vista !== r.vista;
  const listChanged = key !== S.lastListKey || prev.name !== 'explore';
  if (listChanged || viewChanged) {
    const fade = prev.name === 'explore' && listChanged;
    renderToolbar(r);
    applyView();
    if (listChanged) S.selected = r.place || (fromPop ? S.selected : null);
    renderResults(r, { fade });
    if (r.vista === 'mapa' || isDesktop()) {
      ensureMap();
      S.map?.invalidateSize();
      updateMap(r, { fit: listChanged && !(r.place && S.markers.size) });
      if (r.place && S.markers.has(r.place) && (listChanged || !S.mapLoaded)) {
        // ficha aberta direto pelo endereço: enquadra o ponto sem animação
        S.map.setView(S.byId.get(r.place).coords, 16, { animate: false });
      }
    }
    if (fromPop && history.state) {
      if (isDesktop()) $('#paneList').scrollTop = history.state.listTop || 0; else scrollTo(0, history.state.scrollY || 0);
    } else if (!r.place && listChanged) {
      if (isDesktop()) $('#paneList').scrollTop = 0; else scrollTo(0, 0);
    }
    S.lastListKey = key;
  }
  if (r.place) {
    const p = S.byId.get(r.place);
    const mode = (r.ficha === 'resumo' && !isDesktop() && r.vista === 'mapa') ? 'half' : 'full';
    if (S.selected !== p.id) selectPlace(p.id, { ring: S.route.vista === 'mapa' || isDesktop(), scroll: true });
    else highlightCard(p.id, { scroll: isDesktop() });
    if (mode === 'half' && !S.savedView && S.map) S.savedView = { center: S.map.getCenter(), zoom: S.map.getZoom() };
    showSheet(p, mode);
  } else {
    hideSheet();
    if (fromPop && history.state && !listChanged) {
      if (isDesktop()) $('#paneList').scrollTop = history.state.listTop || 0;
      else if (r.vista !== 'mapa') scrollTo(0, history.state.scrollY || 0);
    }
  }
  S.rendered = true;
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
  render();
  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      placeIndicator(false); applyView(); S.map?.invalidateSize();
      if (S.sheetMode) setSheetMode(S.sheetMode, { instant: true });
    }, 80);
  });
})();
