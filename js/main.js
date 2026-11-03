(() => {
  'use strict';

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const ORN = '<span class="orn-line" aria-hidden="true"></span>';
  const panel = (title, body, cls = '') =>
    `<section class="panel ${cls}">${title ? `<h3 class="panel-title">${esc(title)}</h3>` : ''}${body}</section>`;

  const PXHEART = '<svg class="pxheart" viewBox="0 0 7 6" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 0h2v1H1zM4 0h2v1H4zM0 1h1v2H0zM3 1h1v1H3zM6 1h1v2H6zM1 3h1v1H1zM5 3h1v1H5zM2 4h1v1H2zM4 4h1v1H4zM3 5h1v1H3z"/></svg>';
  const logoHTML = (t) => esc(t).replace(/♡/g, PXHEART).replace(/\n/g, '<br>');
  const TITLE = S.title.replace(/\n/g, '');

  /* 文字 */
  document.title = TITLE;
  const menuLogo = $('#menu-logo');
  menuLogo.innerHTML = logoHTML(S.title);
  menuLogo.setAttribute('aria-label', TITLE);
  menuLogo.dataset.text = S.title;
  $('#mini-logo').innerHTML = logoHTML(TITLE);
  $('#credit').textContent = `© ${S.author}`;

  const menuBar = (m, i) =>
    `<a class="bar" href="#${esc(m.id)}" style="--i:${i}"><span class="en">${esc(m.label)}</span>${m.ja ? `<span class="ja">${esc(m.ja)}</span>` : ''}</a>`;
  $('#menu-list').innerHTML = [...S.menu, { id: 'title', label: 'TITLE', ja: 'はじめから' }].map(menuBar).join('');
  $('#ov-menu-list').innerHTML = S.menu.map(menuBar).join('');

  /* 背景写真 */
  if (S.background) {
    const url = `url("${S.background}")`;
    $('#bg-blur').style.backgroundImage = url;
    $('#bg-photo').style.backgroundImage = url;
    const im = new Image();
    im.onload = () => $('#bg-photo').style.setProperty('--bg-ar', (im.naturalWidth / im.naturalHeight).toFixed(4));
    im.src = S.background;
  }
  const setBg = (mode) => { document.body.dataset.bg = mode; };

  /* ホバー画像の先読み */
  for (const n of ['auto', 'skip', 'log', 'screen', 'menu', 'title', 'close']) new Image().src = `images/ui/${n}-hover.png`;
  for (const n of ['select-hover', 'select-active']) new Image().src = `images/ui/${n}.png`;

  /* 画面の切り替え */
  const views = { title: $('#view-title'), menu: $('#view-menu'), page: $('#view-page') };
  function show(name) {
    for (const [k, v] of Object.entries(views)) v.hidden = k !== name;
  }


  /* オーバーレイ */
  let openOv = null;
  let lastFocus = null;
  function openOverlay(id) {
    closeOverlay(false);
    const el = $('#' + id);
    lastFocus = document.activeElement;
    el.hidden = false;
    openOv = el;
    const first = $('a, button', el);
    if (first) first.focus({ preventScroll: true });
  }
  function closeOverlay(restore = true) {
    if (!openOv) return;
    openOv.hidden = true;
    openOv = null;
    if (restore && lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  for (const ov of $$('.overlay')) {
    ov.addEventListener('click', (e) => {
      if (e.target === ov && ov.id !== 'ov-load') closeOverlay();
    });
  }
  $('#ov-menu-list').addEventListener('click', (e) => {
    if (e.target.closest('a')) closeOverlay(false);
  });

  function loading(ms = 650) {
    const ov = $('#ov-load');
    const pets = S.loadingImages.map((c) => c.pet).filter(Boolean);
    const img = $('#load-pet');
    if (pets.length) { img.src = pickOne(pets); img.hidden = false; } else img.hidden = true;
    const dur = reduce ? 120 : ms;
    ov.style.setProperty('--dur', dur + 'ms');
    const bar = $('.load-bar i', ov);
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = '';
    ov.hidden = false;
    return wait(dur + 120).then(() => { ov.hidden = true; });
  }

  function tear() {
    if (reduce) return Promise.resolve();
    const t = $('#tear');
    for (const i of $$('i', t)) {
      i.style.top = Math.random() * 92 + '%';
      i.style.height = 2 + Math.random() * 12 + 'vh';
      i.style.animationDelay = Math.random() * 0.18 + 's';
    }
    t.hidden = true;
    void t.offsetWidth;
    t.hidden = false;
    setTimeout(() => { t.hidden = true; }, 950);
    return wait(520);
  }

  /* ボタンの動作 */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'menu') openOverlay('ov-menu');
    else if (act === 'close') closeOverlay();
    else if (act === 'title') { closeOverlay(false); go('title'); }
    else if (act === 'auto') toggleAuto();
    else if (act === 'skip') goMenu();
    else if (act === 'log') openLog();
    else if (act === 'screen') toggleScreen();
  });

  let onKey = null;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (openOv && openOv.id !== 'ov-load') closeOverlay();
      return;
    }
    if (openOv) {
      if (openOv.id === 'ov-view') {
        if (e.key === 'ArrowLeft') stepViewer(-1);
        if (e.key === 'ArrowRight') stepViewer(1);
      }
      return;
    }
    if (!views.title.hidden && !$('#game').hidden && (e.key === 'Enter' || e.key === ' ')) {
      if (e.target.closest && e.target.closest('button, a')) return;
      e.preventDefault();
      advance();
    }
    if (onKey) onKey(e);
  });

  const screenBtn = $('[data-act="screen"]');
  if (!document.fullscreenEnabled) screenBtn.hidden = true;
  function toggleScreen() {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => {});
    } catch (err) { /* 対応していないブラウザ */ }
  }

  function go(hash) {
    if (location.hash.slice(1) === hash) route();
    else location.hash = hash;
  }

  async function goMenu() {
    stopGame();
    await tear();
    go('menu');
  }

  /* 開頭 */
  const game = $('#game');
  const msg = $('#msg');
  const msgName = $('#msg-name');
  const msgText = $('#msg-text');
  const choicesEl = $('#choices');
  const stage = $('#game-stage');
  const autoBtn = $('[data-act="auto"]');

  const G = { scene: 0, line: 0, phase: 'title', typing: false, full: '', typeTimer: 0, autoTimer: 0, auto: false, log: [] };

  function stopGame() {
    clearInterval(G.typeTimer);
    clearTimeout(G.autoTimer);
    G.typing = false;
  }

  function resetTitle() {
    stopGame();
    G.phase = 'title';
    game.classList.remove('is-bad');
    document.body.classList.remove('is-bad');
    $('#title-start').hidden = false;
    game.hidden = true;
  }

  $('#title-start').addEventListener('click', () => {
    $('#title-start').hidden = true;
    game.hidden = false;
    G.log = [];
    G.scene = 0;
    game.tabIndex = -1;
    game.focus({ preventScroll: true });
    playScene();
  });

  game.addEventListener('click', (e) => {
    if (e.target.closest('button, a')) return;
    advance();
  });

  const currentLines = () => (G.phase === 'bad' ? S.badEnd.lines : S.opening[G.scene].lines);

  function playScene() {
    G.phase = 'lines';
    G.line = 0;
    game.classList.remove('is-bad');
    document.body.classList.remove('is-bad');
    choicesEl.hidden = true;
    const sc = S.opening[G.scene];
    stage.innerHTML = sc.image ? `<img src="${esc(sc.image)}" alt="">` : '';
    showLine();
  }

  function showLine() {
    const raw = currentLines()[G.line];
    const sc = S.opening[G.scene] || {};
    const speaker = G.phase === 'bad' ? S.badEnd.speaker : sc.speaker;
    const line = typeof raw === 'string' ? { name: speaker || '', text: raw } : raw;
    msgName.textContent = line.name || '';
    G.log.push({ name: line.name || '', text: line.text });
    typeText(line.text);
  }

  function typeText(text) {
    clearInterval(G.typeTimer);
    clearTimeout(G.autoTimer);
    msg.classList.remove('is-done');
    G.full = text;
    if (reduce) { finishLine(); return; }
    G.typing = true;
    let i = 0;
    const chars = [...text];
    msgText.textContent = '';
    G.typeTimer = setInterval(() => {
      i += 1;
      msgText.textContent = chars.slice(0, i).join('');
      if (i >= chars.length) finishLine();
    }, 45);
  }

  function finishLine() {
    clearInterval(G.typeTimer);
    G.typing = false;
    msgText.textContent = G.full;
    const isLast = G.line >= currentLines().length - 1;
    if (isLast) {
      setTimeout(showChoices, 180);
    } else {
      msg.classList.add('is-done');
      if (G.auto) G.autoTimer = setTimeout(advance, 1600);
    }
  }

  function advance() {
    if (openOv) return;
    if (G.phase !== 'lines' && G.phase !== 'bad') return;
    if (G.typing) { finishLine(); return; }
    if (G.line < currentLines().length - 1) {
      G.line += 1;
      showLine();
    }
  }

  function showChoices() {
    if (G.phase !== 'lines' && G.phase !== 'bad') return;
    if (G.phase === 'bad') {
      G.phase = 'badchoice';
      const list = S.badEnd.choices && S.badEnd.choices.length ? S.badEnd.choices : [{ text: '最初から' }];
      choicesEl.innerHTML = list
        .map((c, i) => `<button class="bar" style="--i:${i}" data-retry>${esc(c.text)}</button>`)
        .join('');
    } else {
      G.phase = 'choices';
      choicesEl.innerHTML = S.opening[G.scene].choices
        .map((c, i) => `<button class="bar" style="--i:${i}" data-choice="${i}">${esc(c.text)}</button>`)
        .join('');
    }
    choicesEl.hidden = false;
  }

  choicesEl.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    e.stopPropagation();
    if (b.hasAttribute('data-retry')) {
      G.log.push({ pick: b.textContent }, { sep: true });
      G.scene = 0;
      playScene();
      return;
    }
    const c = S.opening[G.scene].choices[+b.dataset.choice];
    G.log.push({ pick: c.text });
    if (c.correct) {
      G.scene += 1;
      if (G.scene >= S.opening.length) { choicesEl.hidden = true; goMenu(); }
      else playScene();
    } else {
      badEnd();
    }
  });

  function badEnd() {
    G.phase = 'bad';
    G.line = 0;
    choicesEl.hidden = true;
    game.classList.add('is-bad');
    document.body.classList.add('is-bad');
    showLine();
  }

  function toggleAuto() {
    G.auto = !G.auto;
    autoBtn.setAttribute('aria-pressed', String(G.auto));
    msg.classList.toggle('is-auto', G.auto);
    clearTimeout(G.autoTimer);
    if (G.auto && !G.typing && (G.phase === 'lines' || G.phase === 'bad') && G.line < currentLines().length - 1) {
      G.autoTimer = setTimeout(advance, 900);
    }
  }

  function openLog() {
    const list = $('#log-list');
    list.innerHTML = G.log.length
      ? G.log.map((l) => {
        if (l.sep) return '<li class="sep">― ― ―</li>';
        if (l.pick) return `<li class="pick-line">${esc(l.pick)}</li>`;
        return `<li>${l.name ? `<span class="who">${esc(l.name)}</span>` : ''}${esc(l.text)}</li>`;
      }).join('')
      : '<li class="sep">まだ何もありません</li>';
    openOverlay('ov-log');
    list.scrollTop = list.scrollHeight;
  }

  /* 主選單 */
  function showMenu() {
    show('menu');
    setBg('menu');
    document.title = TITLE;
  }

  /* 跳轉頁 */
  const page = $('#page');
  const menuOf = (id) => S.menu.find((m) => m.id === id) || { label: id, ja: '' };
  function head(id) {
    const m = menuOf(id);
    document.title = `${m.label} | ${TITLE}`;
    return `<header class="page-head"><h1 class="page-title">${esc(m.label)}</h1>${m.ja ? `<p class="sys page-sub">${esc(m.ja)}</p>` : ''}</header>`;
  }
  const isTransparent = (src) => /\.(png|gif)$/i.test(src || '');
  const charById = (id) => S.characters.find((c) => c.id === id);

  const pages = {};

  /* INTRO */
  pages.intro = () => {
    const it = S.intro;
    page.innerHTML = head('intro') +
      `<div class="intro">${panel('', `<p class="intro-text${it.vertical ? ' vertical' : ''}">${esc(it.text)}</p>`)}</div>`;
  };

   /* CHAR */
  const boxCache = new Map();
  function figureBox(img) {
    const key = img.currentSrc || img.src;
    if (boxCache.has(key)) return boxCache.get(key);
    let box = { x0: 0, y0: 0, x1: 1, y1: 1, ux0: 0, ux1: 1 };
    try {
      const w = 200;
      const h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h).data;
      const rows = [];
      let y0 = h, y1 = -1, x0 = w, x1 = -1;
      for (let y = 0; y < h; y++) {
        let a = w, b = -1;
        for (let x = 0; x < w; x++) {
          if (d[(y * w + x) * 4 + 3] > 24) { if (x < a) a = x; b = x; }
        }
        rows.push([a, b]);
        if (b >= 0) { if (y < y0) y0 = y; y1 = y; if (a < x0) x0 = a; if (b > x1) x1 = b; }
      }
      if (y1 > y0 && x1 > x0) {
        let ux0 = w, ux1 = -1;
        const mid = y0 + (y1 - y0) * 0.45;
        for (let y = y0; y <= mid; y++) {
          const [a, b] = rows[y];
          if (b >= 0) { if (a < ux0) ux0 = a; if (b > ux1) ux1 = b; }
        }
        box = { x0: x0 / w, x1: (x1 + 1) / w, y0: y0 / h, y1: (y1 + 1) / h, ux0: ux0 / w, ux1: (ux1 + 1) / w };
      }
    } catch (err) { /* 読み取れない画像はそのまま表示 */ }
    boxCache.set(key, box);
    return box;
  }

  function frameFigure(stageEl, img, mode) {
    if (!img.naturalWidth) return;
    const W = stageEl.clientWidth;
    const H = stageEl.clientHeight;
    const k = Math.min(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * k;
    const dh = img.naturalHeight * k;
    const ox = (W - dw) / 2;
    const oy = (H - dh) / 2;
    const b = figureBox(img);
    const bx0 = ox + b.x0 * dw, bw = (b.x1 - b.x0) * dw;
    const by0 = oy + b.y0 * dh, bh = (b.y1 - b.y0) * dh;
    let s, tx, ty;
    if (mode === 'bust') {
      s = H / (bh * 0.56);
      const ucx = ox + ((b.ux0 + b.ux1) / 2) * dw;
      tx = W / 2 - s * ucx;
      ty = -s * (by0 - bh * 0.03);
    } else {
      s = Math.min((W * 0.9) / bw, (H * 0.94) / bh);
      tx = W / 2 - s * (bx0 + bw / 2);
      ty = H / 2 - s * (by0 + bh / 2);
    }
    img.style.transformOrigin = '0 0';
    img.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(4)})`;
  }


  function framePair(stageEl, imgs, heights) {
    if (imgs.some((im) => !im.naturalWidth)) return;
    const W = stageEl.clientWidth;
    const H = stageEl.clientHeight;
    const maxH = Math.max(...heights);
    const figs = imgs.map((im, i) => {
      const b = figureBox(im);
      const fw = (b.x1 - b.x0) * im.naturalWidth;
      const fh = (b.y1 - b.y0) * im.naturalHeight;
      const s = (H * 0.86 * (heights[i] / maxH)) / fh;
      return { im, b, s, w: fw * s };
    });
    const overlap = 0.12;
    let total = figs.reduce((t, f) => t + f.w, 0) - figs[0].w * overlap;
    const fit = Math.min(1, (W * 0.96) / total);
    figs.forEach((f) => { f.s *= fit; f.w *= fit; });
    total *= fit;
    let x = (W - total) / 2;
    const base = H * 0.95;
    figs.forEach((f, i) => {
      const nw = f.im.naturalWidth;
      const nh = f.im.naturalHeight;
      f.im.style.width = nw + 'px';
      f.im.style.height = nh + 'px';
      f.im.style.transformOrigin = '0 0';
      const tx = x - f.s * f.b.x0 * nw;
      const ty = base - f.s * f.b.y1 * nh;
      f.im.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${f.s.toFixed(4)})`;
      x += f.w - (i === 0 ? f.w * overlap : 0);
    });
  }

  function loadInto(img, src) {
    return new Promise((resolve) => {
      if (img.getAttribute('src') === src && img.complete && img.naturalWidth) { resolve(); return; }
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  }

  let refit = null;
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (refit) refit(); }, 120);
  });

  /* キャラクター選択 */
  function selectHTML(active) {
    return `<div class="select" role="group" aria-label="キャラクターを選ぶ">${S.characters.map((c, i) =>
      `<button class="pick" data-i="${i}" style="--c:${esc(c.color)}" aria-pressed="${i === active}">
        <span class="pick-img"><img src="${esc(c.icon)}" alt=""></span><span class="pick-name">${esc(c.name)}</span>
      </button>`).join('')}</div>`;
  }

  const CH = { i: 0, full: true };
  let fitPair = null;

  pages.character = () => {
    const rel = S.relationship;
    page.innerHTML = head('character') + selectHTML(CH.i) +
      `<div class="chara" id="chara">
        <div class="stage-wrap">
          <button class="arrow prev" id="ch-prev" aria-label="前のキャラクター"></button>
          <div class="stage is-swapping" id="stage"></div>
          <button class="arrow next" id="ch-next" aria-label="次のキャラクター"></button>
        </div>
        <div class="chara-side" id="chara-side"></div>
      </div>
      ${rel ? `<section class="pair-sec" id="pair-sec">
        <header class="sec-head"><h2 class="sec-title">RELATIONSHIP</h2><p class="sys page-sub">ふたりの関係</p></header>
        <div class="chara pair-grid">
          <div class="stage-wrap"><div class="stage pair is-swapping" id="pair-stage"></div></div>
          <div class="chara-side" id="pair-side"></div>
        </div>
      </section>` : ''}`;

    $$('.pick', page).forEach((b) => b.addEventListener('click', () => setChar(+b.dataset.i)));
    $('#ch-prev').addEventListener('click', () => setChar(CH.i - 1));
    $('#ch-next').addEventListener('click', () => setChar(CH.i + 1));

    let sx = null;
    const st = $('#stage');
    st.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    st.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) setChar(CH.i + (dx < 0 ? 1 : -1));
      sx = null;
    });
    onKey = (e) => {
      if (e.key === 'ArrowLeft') setChar(CH.i - 1);
      if (e.key === 'ArrowRight') setChar(CH.i + 1);
    };
    fitPair = null;
    refit = () => { applyZoom(true); if (fitPair) fitPair(); };
    setChar(CH.i, true);
    if (rel) buildPair();
  };

  function applyZoom(instant = false) {
    const img = $('#stage-img');
    const btn = $('#expand');
    const st = $('#stage');
    if (!img || !btn) return;
    const card = $('#stage-card');
    const leavingCard = !CH.full && !!card && st.classList.contains('is-full');
    img.style.transitionDelay = leavingCard && !instant ? '.25s' : '0s';
    if (CH.full && card) {
      img.style.transformOrigin = '0 0';
      img.style.transform = 'translate(0px, 0px) scale(1)';
    } else {
      frameFigure(st, img, CH.full ? 'full' : 'bust');
    }
    st.classList.toggle('is-full', CH.full && !!card);
    $('#chara').classList.toggle('is-full', CH.full);
    btn.textContent = CH.full ? '半身を見る' : '全身にもどす';
    btn.setAttribute('aria-pressed', String(CH.full));
  }

  let swapToken = 0;
  async function setChar(i, first = false) {
    const n = S.characters.length;
    CH.i = (i + n) % n;
    const token = ++swapToken;
    $$('.pick', page).forEach((b, k) => b.setAttribute('aria-pressed', String(k === CH.i)));
    const st = $('#stage');
    const side = $('#chara-side');
    st.classList.add('is-swapping');
    if (!first && !reduce) await wait(200);
    if (token !== swapToken) return;

    const c = S.characters[CH.i];
    const chara = $('#chara');
    chara.style.setProperty('--c', c.color);
    chara.style.setProperty('--aura', hexA(c.color, 0.26));
    st.innerHTML = `<div class="stage-figs"><img id="stage-img" alt="${esc(c.name)}の立ち絵"></div>${c.card ? '<img class="stage-card" id="stage-card" alt="" aria-hidden="true">' : ''}<button class="expand" id="expand" aria-pressed="false"></button>`;
    $('#expand').addEventListener('click', () => { CH.full = !CH.full; applyZoom(); });

    side.innerHTML = panel('',
      `<h2 class="p-name">${esc(c.name)}</h2>
       ${c.reading ? `<p class="sys p-reading">${esc(c.reading)}</p>` : ''}
       ${c.tags && c.tags.length ? `<ul class="tags">${c.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
       ${c.profile && c.profile.length ? `<dl class="p-list">${c.profile.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
       ${(c.sections || []).map((s, k) => `<div class="p-sec">
          <p class="p-sec-title"><b>${pad(k + 1)}</b>${esc(s.title)}</p>
          ${s.head ? `<p class="p-sec-head">${esc(s.head)}</p>` : ''}
          <p class="p-sec-text">${esc(s.text)}</p>
        </div>`).join('')}`, 'profile');

    const img = $('#stage-img');
    const cardImg = $('#stage-card');
    await Promise.all([loadInto(img, c.full), cardImg ? loadInto(cardImg, c.card) : null]);
    if (token !== swapToken) return;
    img.style.transition = 'none';
    applyZoom(true);
    void img.offsetWidth;
    img.style.transition = '';
    st.classList.remove('is-swapping');
  }

  async function buildPair() {
    const cs = S.characters;
    const rel = S.relationship;
    const st = $('#pair-stage');
    const side = $('#pair-side');
    st.innerHTML = `<div class="stage-figs">${cs.map((c) => `<img alt="${esc(c.name)}の立ち絵">`).join('')}</div>`;
    const [a, b] = cs;
    const val = (sl, c) => clamp(Number(sl[c.id]) || 0, 0, 100);
    side.innerHTML =
      panel('',
        `<div class="legend"><span class="a" style="--c:${esc(a.color)}"><i></i>${esc(a.name)}</span><span class="b" style="--c:${esc(b.color)}"><i></i>${esc(b.name)}</span></div>
         <ul class="sliders">${rel.sliders.map((sl) => `<li class="sl">
            <span class="sl-label">${esc(sl.label)}</span>
            <span class="sl-track" role="img" aria-label="${esc(sl.label)}：${esc(a.name)} ${val(sl, a)}、${esc(b.name)} ${val(sl, b)}">
              <i class="mk a" style="--c:${esc(a.color)};left:50%" data-v="${val(sl, a)}"></i>
              <i class="mk b" style="--c:${esc(b.color)};left:50%" data-v="${val(sl, b)}"></i>
            </span>
            <span class="sl-val"><b style="--c:${esc(a.color)}">${val(sl, a)}</b> / <b style="--c:${esc(b.color)}">${val(sl, b)}</b></span>
          </li>`).join('')}</ul>`, 'rel') +
      (rel.text ? panel(rel.title || '', `<p class="rel-text">${esc(rel.text)}</p>`) : '');

    const marks = $$('.mk', side);
    const play = () => marks.forEach((m) => { m.style.left = m.dataset.v + '%'; });
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver((ents) => {
        if (ents.some((en) => en.isIntersecting)) { play(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe($('.sliders', side));
    } else play();

    const imgs = $$('img', st);
    await Promise.all(imgs.map((im, k) => loadInto(im, cs[k].full)));
    if (!document.contains(st)) return;
    const heights = cs.map((c) => Number(c.heightCm) || 160);
    fitPair = () => framePair(st, imgs, heights);
    imgs.forEach((im) => { im.style.transition = 'none'; });
    fitPair();
    void st.offsetWidth;
    imgs.forEach((im) => { im.style.transition = ''; });
    st.classList.remove('is-swapping');
  }

  function hexA(hex, a) {
    const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex || '');
    if (!m) return `rgba(112, 82, 204, ${a})`;
    return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${a})`;
  }

  /* リスト */
  const PER_PAGE = 8;
  function slotsHTML(list, pageNo, render) {
    const start = pageNo * PER_PAGE;
    const items = list.slice(start, start + PER_PAGE).map((it, k) => render(it, start + k)).join('');
    const pagesN = Math.ceil(list.length / PER_PAGE);
    const pager = pagesN > 1
      ? `<nav class="pager" aria-label="ページ">${Array.from({ length: pagesN }, (_, p) => `<button data-page="${p}" aria-current="${p === pageNo}">${p + 1}</button>`).join('')}</nav>`
      : '';
    return { items, pager };
  }
  function thumbHTML(src, label = 'NO IMAGE') {
    if (!src) return `<span class="slot-thumb"><span class="sys">${esc(label)}</span></span>`;
    return `<span class="slot-thumb${isTransparent(src) ? ' fit-contain' : ''}"><img src="${esc(src)}" alt="" loading="lazy"></span>`;
  }

  /* GALLERY */
  let galleryPage = 0;
  pages.gallery = () => {
    const list = S.gallery;
    const n = list.length;
    const { items, pager } = slotsHTML(list, galleryPage, (g, i) =>
      `<button class="slot" data-i="${i}">
        ${thumbHTML(g.thumb || g.image)}
        <span><span class="slot-no">No.${pad(n - i)}</span><span class="slot-title">${esc(g.title)}</span><span class="slot-meta"><time>${esc(g.date)}</time></span></span>
      </button>`);
    page.innerHTML = head('gallery') + (n ? `<div class="slots">${items}</div>${pager}` : '<p class="empty">まだ作品がありません</p>');
    $$('.slot', page).forEach((b) => b.addEventListener('click', async () => {
      await loading();
      openViewer(+b.dataset.i);
    }));
    $$('.pager button', page).forEach((b) => b.addEventListener('click', () => {
      galleryPage = +b.dataset.page;
      pages.gallery();
      window.scrollTo(0, 0);
    }));
  };

  let viewIdx = 0;
  function openViewer(i) {
    viewIdx = (i + S.gallery.length) % S.gallery.length;
    const g = S.gallery[viewIdx];
    const n = S.gallery.length;
    $('#viewer-no').textContent = `No.${pad(n - viewIdx)}`;
    $('#viewer-title').textContent = g.title || '';
    $('#view-img').src = g.image;
    $('#view-img').alt = g.title || '';
    $('#view-date').textContent = g.date || '';
    const single = n < 2;
    $('#view-prev').hidden = single;
    $('#view-next').hidden = single;
    if ($('#ov-view').hidden) openOverlay('ov-view');
  }
  function stepViewer(d) { if (S.gallery.length > 1) openViewer(viewIdx + d); }
  $('#view-prev').addEventListener('click', () => stepViewer(-1));
  $('#view-next').addEventListener('click', () => stepViewer(1));

  /* STORY */
  let storyPage = 0;
  const TYPE = { novel: '小説', comic: '漫画' };
  pages.story = () => {
    const list = S.stories;
    const n = list.length;
    const { items, pager } = slotsHTML(list, storyPage, (s, i) =>
      `<a class="slot" href="#story-${esc(s.id)}">
        ${thumbHTML(s.thumb, TYPE[s.type] || 'NO IMAGE')}
        <span><span class="slot-no">No.${pad(n - i)}</span><span class="slot-title">${esc(s.title)}</span><span class="slot-meta"><time>${esc(s.date)}</time><span class="tag ${s.type === 'comic' ? 'comic' : ''}">${TYPE[s.type] || ''}</span></span></span>
      </a>`);
    page.innerHTML = head('story') + (n ? `<div class="slots single">${items}</div>${pager}` : '<p class="empty">まだ作品がありません</p>');
    $$('.slot', page).forEach((a) => a.addEventListener('click', async (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      await loading();
      location.hash = a.getAttribute('href').slice(1);
    }));
    $$('.pager button', page).forEach((b) => b.addEventListener('click', () => {
      storyPage = +b.dataset.page;
      pages.story();
      window.scrollTo(0, 0);
    }));
  };

  function renderStory(id) {
    const list = S.stories;
    const i = list.findIndex((s) => String(s.id) === id);
    const back = '<a class="back" href="#story">STORY 一覧へ</a>';
    if (i < 0) {
      page.innerHTML = `<div class="reader">${back}<p class="empty" style="margin-top:40px">この作品は見つかりませんでした。</p></div>`;
      return;
    }
    const s = list[i];
    document.title = `${s.title} | ${TITLE}`;
    const newer = list[i - 1];
    const older = list[i + 1];
    page.innerHTML =
      `<article class="reader">
        <header class="reader-head"><h2>${esc(s.title)}</h2><p class="sys">${esc(s.date)}　${TYPE[s.type] || ''}</p>${ORN}</header>
        <div class="${s.type === 'comic' ? 'comic' : 'novel'}" id="story-body"></div>
        <nav class="reader-nav">
          <span>${older ? `<a href="#story-${esc(older.id)}">◀ ${esc(older.title)}</a>` : ''}</span>
          <span>${newer ? `<a href="#story-${esc(newer.id)}">${esc(newer.title)} ▶</a>` : ''}</span>
        </nav>
      </article>`;
    const body = $('#story-body');
    if (s.type === 'comic') {
      body.innerHTML = (s.pages || []).map((p, k) => `<img src="${esc(p)}" alt="${k + 1}ページ目" loading="${k < 2 ? 'eager' : 'lazy'}">`).join('');
      return;
    }
    body.innerHTML = '<p class="sys">Now Loading…</p>';
    fetch(s.file)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then((t) => { body.innerHTML = parseNovel(t); })
      .catch(() => {
        body.innerHTML = `<p class="empty">本文を読み込めませんでした（${esc(s.file)}）。ファイル名を確認してください。</p>`;
      });
  }

  function parseNovel(text) {
    return text.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).map((block) => {
      const img = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(block.trim());
      if (img) return `<img src="${esc(img[2])}" alt="${esc(img[1])}" loading="lazy">`;
      const html = esc(block)
        .replace(/[|｜]([^|｜《\n]+)《([^》\n]+)》/g, '<ruby>$1<rt>$2</rt></ruby>')
        .replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    }).join('');
  }

  /* 衣 */
  const WD = { c: 0, k: 0 };
  pages.wardrobe = () => {
    const c = S.characters[WD.c];
    const items = S.wardrobe.filter((w) => w.chara === c.id);
    if (WD.k >= items.length) WD.k = 0;
    const w = items[WD.k];
    page.innerHTML = head('wardrobe') + selectHTML(WD.c) +
      (w ? `<div class="wd" style="--aura:${hexA(c.color, 0.22)}">
        <div class="wd-list">${items.map((x, k) => `<button class="bar" data-k="${k}" aria-pressed="${k === WD.k}">${esc(x.name)}</button>`).join('')}</div>
        <div class="stage wd-stage is-swapping" id="wd-stage"><div class="stage-figs"><img id="wd-img" alt="${esc(w.name)}"></div></div>
        ${panel(w.name, `<p class="wd-note">${esc(w.note)}</p>`)}
      </div>` : '<p class="empty">まだ衣装がありません</p>');
    $$('.pick', page).forEach((b) => b.addEventListener('click', () => { WD.c = +b.dataset.i; WD.k = 0; pages.wardrobe(); }));
    $$('.wd-list .bar', page).forEach((b) => b.addEventListener('click', () => { WD.k = +b.dataset.k; pages.wardrobe(); }));
    if (w) {
      const st = $('#wd-stage');
      const img = $('#wd-img');
      refit = () => frameFigure(st, img, 'full');
      loadInto(img, w.image).then(() => { refit(); st.classList.remove('is-swapping'); });
    }
  };

  /* LAST */
  pages.update = () => {
    page.innerHTML = head('update') +
      `<div class="stack">${panel('',
        `<ul class="updates">${S.updates.map((u) => `<li><time>${esc(u.date)}</time><span>${esc(u.text)}</span></li>`).join('')}</ul>`)}</div>`;
  };

  pages.about = () => {
    const a = S.about;
    const chibis = S.characters.map((c) => `<img src="images/${esc(c.id)}/chibi.gif" alt="" loading="lazy">`).join('');
    page.innerHTML = head('about') +
      `<div class="stack">
        ${panel('PROFILE', `<div class="about-me"><div class="chibis">${chibis}</div><div><p class="about-name">${esc(S.author)}</p><p class="pre">${esc(a.text)}</p></div></div>`)}
        ${a.links && a.links.length ? panel('LINK', `<ul class="links">${a.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join('')}</ul>`) : ''}
        ${a.rules ? panel('RULES', `<p class="pre">${esc(a.rules)}</p>`) : ''}
      </div>`;
  };

  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    closeOverlay(false);
    onKey = null;
    refit = null;
    if (!h || h === 'title') {
      show('title');
      setBg('scene');
      document.title = TITLE;
      resetTitle();
      return;
    }
    stopGame();
    document.body.classList.remove('is-bad');
    if (h === 'menu') { showMenu(); window.scrollTo(0, 0); return; }
    const m = /^story-(.+)$/.exec(h);
    $('#back-btn').setAttribute('href', m ? '#story' : '#menu');
    show('page');
    if (m) { setBg('plain'); renderStory(m[1]); }
    else if (pages[h]) { setBg('page'); pages[h](); }
    else { showMenu(); return; }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
})();
