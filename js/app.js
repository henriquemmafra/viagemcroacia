import {
tripDays,
walletItems,
hotels,
emergencyContacts,
packingChecklist,
pendingItems,
phrases,
routeOverview
} from './trip-data.js';
import {
resolveInitialDayIndex,
getDayTemporalState,
formatCountdown,
mapsUrl,
wazeUrl,
uberUrl,
localDateKey,
decideSwipeDay
} from './core.js';
const state = {
tab: 'today',
dayIndex: resolveInitialDayIndex(tripDays, new Date()),
wakeLock: null,
swiping: false
};
const main = document.querySelector('#app-main');
const deviceDate = document.querySelector('#device-date');
const networkPill = document.querySelector('#network-pill');
const modal = document.querySelector('#ticket-modal');
const modalCode = document.querySelector('#ticket-code');
const modalTitle = document.querySelector('#ticket-title');
const modalNote = document.querySelector('#ticket-note');
const modalFull = document.querySelector('#ticket-full');
const modalFullToggle = document.querySelector('#ticket-full-toggle');
const esc = (s = '') => String(s).replace(/[&<>'"]/g, (c) => ({
'&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;'
}[c]));
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday:'short' });
const monthDay = new Intl.DateTimeFormat('pt-BR', { day:'numeric', month:'long' });
const deviceFmt = new Intl.DateTimeFormat('pt-BR', { weekday:'long', day:'numeric', month:'long' });
function parseDayDate(dateKey) {
const [y,m,d] = dateKey.split('-').map(Number);
return new Date(y, m - 1, d, 12);
}
function prettyDay(dateKey) {
const d = parseDayDate(dateKey);
return `${weekday.format(d).replace('.','').toUpperCase()} · ${monthDay.format(d).toUpperCase()}`;
}
function updateDeviceDate() {
const text = deviceFmt.format(new Date());
deviceDate.textContent = text.charAt(0).toUpperCase() + text.slice(1);
}
function updateNetwork() {
const online = navigator.onLine;
networkPill.textContent = online ? 'online' : 'offline · salvo';
networkPill.classList.toggle('offline', !online);
}
function navActions(location) {
if (!location) return '';
return [
`<a class="tl-btn uber" href="${esc(uberUrl(location))}" target="_blank" rel="noopener">Uber</a>`,
`<a class="tl-btn maps" href="${esc(mapsUrl(location))}" target="_blank" rel="noopener">Maps</a>`,
`<a class="tl-btn waze" href="${esc(wazeUrl(location))}" target="_blank" rel="noopener">Waze</a>`
].join('');
}
function ticketButton(ticketId) {
if (!ticketId) return '';
const item = walletItems.find((i) => i.id === ticketId);
if (!item?.codeAsset) return '';
const label = item.category === 'Voos' ? 'BOARDING' : 'QR / TICKET';
return `<button class="tl-btn qr" data-ticket="${esc(ticketId)}">${label}</button>`;
}
const statusMap = {
confirmed: ['✓ confirmado','confirmed'],
planned: ['◷ planejado','planned'],
'to-book': ['＋ comprar','to-book'],
'to-finalize': ['! fechar','to-finalize']
};
function statusBadge(status) {
if (!statusMap[status]) return '';
const [label, cls] = statusMap[status];
return `<span class="status-badge ${cls}">${label}</span>`;
}
function eventCard(event, temporal = {}) {
const hasTicket = event.ticketId && walletItems.some((i) => i.id === event.ticketId && i.codeAsset);
const hasActions = event.location || hasTicket;
const temporalClass = temporal.current === event ? ' active-card' : temporal.next === event ? ' next-card' : '';
const dotClass = temporal.current === event ? ' now' : temporal.next === event ? ' next' : '';
return `<div class="tl-item">
<div class="tl-time">${esc(event.time)}</div>
<div class="tl-dot ${dotClass}"></div>
<article class="tl-card${temporalClass}">
<div class="tl-card-head">
<h3>${esc(event.icon || '•')} ${esc(event.title)}</h3>
${statusBadge(event.status)}
</div>
${event.end ? `<div class="tl-card-sub">${esc(event.time)}–${esc(event.end)}</div>` : ''}
${event.location ? `<div class="tl-card-sub">📍 ${esc(event.location.destination)}</div>` : ''}
${event.note ? `<div class="tl-card-note">${esc(event.note)}</div>` : ''}
${event.tip ? `<details class="event-tip"><summary>💡 Dica útil</summary><p>${esc(event.tip)}</p></details>` : ''}
${event.perrengue ? `<div class="alert-strip"><b>⚠ Evitar perrengue</b><br>${esc(event.perrengue)}</div>` : ''}
${hasActions ? `<div class="tl-nav">${ticketButton(event.ticketId)}${navActions(event.location)}</div>` : ''}
</article>
</div>`;
}
function getBeforeTripBanner(day) {
const now = new Date();
const first = parseDayDate(tripDays[0].date);
const today = localDateKey(now);
if (today < tripDays[0].date) {
const days = Math.ceil((first - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12)) / 86400000);
return `<div class="pretrip-banner"><b>PRÓXIMA VIAGEM</b> · faltam ${Math.max(0,days)} dias. Deslize pelos dias para revisar.</div>`;
}
if (today > tripDays.at(-1).date) return `<div class="pretrip-banner"><b>VIAGEM CONCLUÍDA</b> · o roteiro continua disponível como diário offline.</div>`;
if (day.date !== today) return `<div class="pretrip-banner">Você está vendo ${prettyDay(day.date)}. Deslize para navegar entre os dias.</div>`;
return '';
}
function getTemporal(day) {
const today = localDateKey(new Date());
if (day.date === today) return getDayTemporalState(day, new Date());
if (day.date > today) {
const next = day.events.find((e) => /^\d{2}:\d{2}$/.test(e.time));
return { current:null, next, nextAt:null };
}
return { current:null, next:null, nextAt:null };
}
function statusCards(day, temporal) {
const now = new Date();
const current = temporal.current;
const next = temporal.next;
let nextMeta = next ? `${esc(next.time)}${next.end ? `–${esc(next.end)}` : ''}` : esc(day.summary);
if (temporal.nextAt) nextMeta += ` <span class="countdown">${esc(formatCountdown(temporal.nextAt - now))}</span>`;
return `<div class="now-next">
<div class="now-card">
<div class="now-tag">▶ agora</div>
<div class="now-title">${esc(current?.title || 'Dia selecionado')}</div>
<div class="now-time">${current ? `${esc(current.time)}${current.end ? `–${esc(current.end)}` : ''}` : esc(day.city)}</div>
</div>
<div class="now-card next">
<div class="now-tag">↓ próximo</div>
<div class="now-title">${esc(next?.title || 'Sem próximo compromisso')}</div>
<div class="now-time">${nextMeta}</div>
</div>
</div>`;
}
function heroMarkup(day) {
const theme = esc(day.theme || 'default');
return `<div class="hero theme-${theme}">
<div class="hero-art" aria-hidden="true">
<div class="hero-art__wash"></div>
<div class="hero-art__lines"></div>
<div class="hero-art__icon">${esc(day.heroIcon || '✦')}</div>
</div>
<div class="stamp"><span>ADRIATIC</span><b>★ ✦ ★</b><span>2026</span></div>
<div class="swipe-hint">← deslizar →</div>
<div class="hero__nav">
<button class="day-arrow" id="prev-day" ${state.dayIndex === 0 ? 'disabled' : ''} aria-label="Dia anterior">‹</button>
<div class="hero__date">DIA ${state.dayIndex + 1}/${tripDays.length}</div>
<button class="day-arrow" id="next-day" ${state.dayIndex === tripDays.length - 1 ? 'disabled' : ''} aria-label="Próximo dia">›</button>
</div>
<div class="hero-meta">
<div class="hero-daynum">${esc(day.heroLabel || 'ADRIÁTICO 2026')}</div>
<h1>${esc(day.title)}</h1>
<div class="hero-city">${esc(day.city)}</div>
<div class="hero-date">${prettyDay(day.date)}</div>
<p>${esc(day.summary)}</p>
${getBeforeTripBanner(day)}
</div>
</div>`;
}
function renderToday() {
const day = tripDays[state.dayIndex];
const temporal = getTemporal(day);
main.innerHTML = `<section id="today-swipe" class="today-swipe">
${heroMarkup(day)}
${statusCards(day, temporal)}
<section class="section compact-section">
<div class="section-title">O que vestir</div>
<div class="outfit-row">${day.wear.map((x) => `<span class="outfit-chip">👕 ${esc(x)}</span>`).join('')}</div>
<div class="section-title">O que levar</div>
<div class="bring-row">${day.bring.map((x) => `<span class="bring-chip">＋ ${esc(x)}</span>`).join('')}</div>
${day.alerts?.map((a) => `<div class="day-alert">⚠ ${esc(a)}</div>`).join('') || ''}
</section>
<section class="section">
<div class="section-title">Timeline do dia</div>
<div class="timeline">${day.events.map((event) => eventCard(event, temporal)).join('')}</div>
</section>
</section>`;
bindToday();
bindTicketButtons();
}
function renderRoute() {
main.innerHTML = `<header class="page-header">
<div class="eyebrow">15 DIAS · 3 PAÍSES</div>
<h1>Roteiro</h1>
<p>A viagem inteira em uma linha: ônibus na Eslovênia, carro só a partir de Pula.</p>
</header>
<section class="journey-overview">
${routeOverview.map((stop, i) => `<div class="journey-stop">
<div class="journey-stop__date">${esc(stop.dates)}</div>
<div class="journey-stop__body"><h2>${esc(stop.city)}</h2><p>${esc(stop.detail)}</p></div>
<div class="journey-stop__next">${esc(stop.next)}</div>
${i < routeOverview.length - 1 ? '<div class="journey-line"></div>' : ''}
</div>`).join('')}
</section>
<div class="route-list">
${tripDays.map((day,i) => `<button class="route-day" data-day="${i}">
<span class="route-day__date">${prettyDay(day.date).split('·')[1] || prettyDay(day.date)}</span>
<span><span class="route-day__title">${esc(day.title)}</span><span class="route-day__city">${esc(day.city)}</span></span>
<span class="route-day__arrow">›</span>
</button>`).join('')}
</div>`;
main.querySelectorAll('[data-day]').forEach((btn) => btn.addEventListener('click', () => {
state.dayIndex = Number(btn.dataset.day);
setTab('today');
}));
}
const categoryIcon = { Voos:'✈️', Ônibus:'🚌', Passes:'🎫', Atrações:'🏛️', Carro:'🚗' };
function walletItemHtml(item) {
const status = item.status || (item.codeAsset || item.locator ? 'confirmed' : 'planned');
return `<article class="ticket-card">
<div class="ticket-top">
<div class="ticket-ico">${categoryIcon[item.category] || '▣'}</div>
<div class="ticket-main">
<div class="ticket-name">${esc(item.title)}</div>
<div class="ticket-detail">${esc(item.date)} · ${esc(item.subtitle || '')}</div>
${item.locator ? `<div class="ticket-conf">${esc(item.locator)}</div>` : ''}
</div>
${statusBadge(status)}
</div>
${item.note ? `<div class="ticket-note-small">${esc(item.note)}</div>` : ''}
${(item.codeAsset || item.ticketAsset) ? `<div class="ticket-bottom">
${item.codeAsset ? `<button class="ticket-qr-btn" data-ticket="${esc(item.id)}">▣ ABRIR CÓDIGO</button>` : ''}
${item.ticketAsset ? `<button class="ticket-qr-btn" data-full-ticket="${esc(item.id)}">VER TICKET</button>` : ''}
</div>` : ''}
</article>`;
}
function renderWallet() {
const cats = [...new Set(walletItems.map((i) => i.category))];
main.innerHTML = `<header class="wallet-header">
<div class="eyebrow">OFFLINE · ACESSO RÁPIDO</div>
<h1>Carteira</h1>
<p>Boarding passes, QR codes, reservas e PINs importantes.</p>
</header>
${cats.map((cat) => `<section class="wallet-cat"><div class="wallet-cat-title">${categoryIcon[cat] || '▣'} ${esc(cat)}</div>${walletItems.filter((i) => i.category === cat).map(walletItemHtml).join('')}</section>`).join('')}
<section class="wallet-cat"><div class="wallet-cat-title">🏨 Hotéis</div>
${hotels.map((h) => `<article class="ticket-card hotel-ticket">
<div class="ticket-top"><div class="ticket-ico">🏨</div><div class="ticket-main"><div class="ticket-name">${esc(h.city)} · ${esc(h.name)}</div><div class="ticket-detail">${esc(h.dates)}</div><div class="ticket-conf">Conf. ${esc(h.confirmation)} · PIN ${esc(h.pin)}</div></div></div>
<div class="hotel-actions"><a href="${esc(mapsUrl({destination:h.destination,name:h.name}))}" target="_blank" rel="noopener">MAPS</a><a href="${esc(wazeUrl({destination:h.destination,name:h.name}))}" target="_blank" rel="noopener">WAZE</a><a href="${esc(uberUrl({destination:h.destination,name:h.name}))}" target="_blank" rel="noopener">UBER</a></div>
</article>`).join('')}
</section>`;
bindTicketButtons();
main.querySelectorAll('[data-full-ticket]').forEach((btn) => btn.addEventListener('click', () => openTicket(btn.dataset.fullTicket, true)));
}
function renderMore() {
main.innerHTML = `<header class="page-header"><div class="eyebrow">SUPORTE · PLANO B</div><h1>Mais</h1><p>O que precisa estar fácil quando alguma coisa sai do planejado.</p></header>
<div class="more-grid">
<section class="more-card"><h3>Instalar no iPhone</h3><div class="install-steps"><div class="install-step">Abra no <b>Safari</b>.</div><div class="install-step">Toque em <b>Compartilhar</b>.</div><div class="install-step">Escolha <b>Adicionar à Tela de Início</b>.</div></div></section>
<section class="more-card"><h3>Pendências</h3><ul class="checklist">${pendingItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
<section class="more-card"><h3>Emergência e contatos</h3>${emergencyContacts.map((c) => `<div class="contact-row"><span>${esc(c.label)}</span><a href="${esc(c.href)}">${esc(c.value)}</a></div>`).join('')}</section>
<section class="more-card"><h3>Checklist essencial</h3><ul class="checklist">${packingChecklist.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
${Object.entries(phrases).map(([lang,items]) => `<section class="more-card"><h3>${esc(lang)}</h3><div class="phrase-grid">${items.map(([pt,local]) => `<span>${esc(pt)}</span><b>${esc(local)}</b>`).join('')}</div></section>`).join('')}
<section class="more-card"><h3>Offline</h3><p>Roteiro, dados e tickets incluídos são armazenados para uso sem internet. Uber, Maps e Waze precisam de conexão ao abrir a rota.</p></section>
</div>`;
}
function render() {
updateDeviceDate();
updateNetwork();
if (state.tab === 'today') renderToday();
if (state.tab === 'route') renderRoute();
if (state.tab === 'wallet') renderWallet();
if (state.tab === 'more') renderMore();
}
function setTab(tab) {
state.tab = tab;
document.querySelectorAll('.nav-button').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.tab === tab));
render();
main.focus({ preventScroll:true });
window.scrollTo({ top:0, behavior:'instant' });
}
function animateDayChange(delta) {
const next = Math.max(0, Math.min(tripDays.length - 1, state.dayIndex + delta));
if (next === state.dayIndex || state.swiping) return;
const surface = document.querySelector('#today-swipe');
const width = surface?.getBoundingClientRect().width || window.innerWidth;
state.swiping = true;
if (surface) {
surface.classList.add('swipe-animating');
surface.style.transform = `translate3d(${delta > 0 ? -width : width}px,0,0)`;
}
window.setTimeout(() => {
state.dayIndex = next;
renderToday();
window.scrollTo({ top:0, behavior:'instant' });
const incoming = document.querySelector('#today-swipe');
if (incoming) {
incoming.style.transition = 'none';
incoming.style.transform = `translate3d(${delta > 0 ? width * .45 : -width * .45}px,0,0)`;
requestAnimationFrame(() => requestAnimationFrame(() => {
incoming.style.transition = '';
incoming.classList.add('swipe-animating');
incoming.style.transform = 'translate3d(0,0,0)';
window.setTimeout(() => {
incoming.classList.remove('swipe-animating');
incoming.style.transform = '';
state.swiping = false;
}, 190);
}));
} else state.swiping = false;
}, 165);
}
function bindToday() {
document.querySelector('#prev-day')?.addEventListener('click', () => animateDayChange(-1));
document.querySelector('#next-day')?.addEventListener('click', () => animateDayChange(1));
const surface = document.querySelector('#today-swipe');
if (!surface) return;
let startX = 0;
let startY = 0;
let dx = 0;
let dy = 0;
let mode = null;
surface.addEventListener('touchstart', (e) => {
if (state.swiping) return;
const t = e.touches[0];
startX = t.clientX;
startY = t.clientY;
dx = 0;
dy = 0;
mode = null;
surface.classList.add('is-touching');
}, { passive:true });
surface.addEventListener('touchmove', (e) => {
if (state.swiping || !startX) return;
const t = e.touches[0];
dx = t.clientX - startX;
dy = t.clientY - startY;
if (!mode && Math.max(Math.abs(dx), Math.abs(dy)) > 9) mode = Math.abs(dx) > Math.abs(dy) * 1.12 ? 'horizontal' : 'vertical';
if (mode !== 'horizontal') return;
e.preventDefault();
const width = surface.getBoundingClientRect().width || window.innerWidth;
const edgeResistance = (state.dayIndex === 0 && dx > 0) || (state.dayIndex === tripDays.length - 1 && dx < 0);
const limited = Math.max(-width * .56, Math.min(width * .56, dx * (edgeResistance ? .28 : 1)));
surface.style.transform = `translate3d(${limited}px,0,0)`;
}, { passive:false });
surface.addEventListener('touchend', () => {
surface.classList.remove('is-touching');
const width = surface.getBoundingClientRect().width || window.innerWidth;
const delta = decideSwipeDay(dx, dy, width);
startX = 0;
startY = 0;
mode = null;
if (delta && !((state.dayIndex === 0 && delta < 0) || (state.dayIndex === tripDays.length - 1 && delta > 0))) {
surface.style.transform = '';
animateDayChange(delta);
return;
}
surface.classList.add('swipe-animating');
surface.style.transform = 'translate3d(0,0,0)';
window.setTimeout(() => {
surface.classList.remove('swipe-animating');
surface.style.transform = '';
}, 190);
}, { passive:true });
}
function bindTicketButtons() {
main.querySelectorAll('[data-ticket]').forEach((btn) => btn.addEventListener('click', () => openTicket(btn.dataset.ticket, false)));
}
async function requestWakeLock() {
try {
if ('wakeLock' in navigator) state.wakeLock = await navigator.wakeLock.request('screen');
} catch {}
}
async function releaseWakeLock() {
try { await state.wakeLock?.release(); } catch {}
state.wakeLock = null;
}
function openTicket(id, showFull = false) {
const item = walletItems.find((i) => i.id === id);
if (!item) return;
modalTitle.textContent = item.title;
modalNote.textContent = item.note || item.subtitle || '';
modalCode.hidden = !item.codeAsset;
if (item.codeAsset) modalCode.src = item.codeAsset;
modalFull.hidden = true;
modalFull.removeAttribute('src');
modalFullToggle.hidden = !item.ticketAsset;
modalFullToggle.textContent = showFull ? 'OCULTAR TICKET COMPLETO' : 'VER TICKET COMPLETO';
if (showFull && item.ticketAsset) {
modalFull.src = item.ticketAsset;
modalFull.hidden = false;
modalFullToggle.textContent = 'OCULTAR TICKET COMPLETO';
}
modalFullToggle.onclick = () => {
if (!item.ticketAsset) return;
const hiding = !modalFull.hidden;
if (hiding) {
modalFull.hidden = true;
modalFullToggle.textContent = 'VER TICKET COMPLETO';
} else {
modalFull.src = item.ticketAsset;
modalFull.hidden = false;
modalFullToggle.textContent = 'OCULTAR TICKET COMPLETO';
}
};
modal.hidden = false;
document.body.style.overflow = 'hidden';
requestWakeLock();
}
async function closeTicket() {
modal.hidden = true;
document.body.style.overflow = '';
modalCode.removeAttribute('src');
modalFull.removeAttribute('src');
await releaseWakeLock();
}
document.querySelectorAll('.nav-button').forEach((btn) => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
document.querySelector('#ticket-close').addEventListener('click', closeTicket);
window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);
document.addEventListener('visibilitychange', () => {
if (document.visibilityState === 'visible' && !modal.hidden) requestWakeLock();
});
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
render();
setInterval(() => {
updateDeviceDate();
if (state.tab === 'today' && !state.swiping) renderToday();
}, 60000);
