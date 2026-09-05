import { tripDays, walletItems } from './trip-data.js';
import { getDayQuickAccessItems, localDateKey } from './core.js';
import { buildSeptemberCalendar, tripDayIndexForDate, FONT_SCALE } from './month-calendar-model.js';

let observer = null;
let renderTimer = null;
let lastFocus = null;

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
}[char]));

function selectedDate() {
  const text = document.querySelector('#today-swipe .hero__date')?.textContent || '';
  const match = text.match(/DIA\s+(\d{1,2})\s*\/\s*\d+/i);
  const index = match ? Number(match[1]) - 1 : -1;
  return tripDays[index]?.date || '';
}

function ticketMarkersByDate() {
  const map = new Map();
  for (const day of tripDays) {
    const markers = [];
    for (const item of getDayQuickAccessItems(day, walletItems, {})) {
      const marker = item.category === 'Voos' ? '✈️' : '🎟️';
      if (!markers.includes(marker)) markers.push(marker);
    }
    if (markers.length) map.set(day.date, markers);
  }
  return map;
}

function shortCity(city = '') {
  const cleaned = city.replace(/\s+/g, ' ').trim();
  const pieces = cleaned.split(/\s*[→+·]\s*/).filter(Boolean);
  return (pieces[0] || cleaned).slice(0, 12);
}

function navigateToTripDay(date) {
  const index = tripDayIndexForDate(tripDays, date);
  if (index < 0) return;
  const routeTab = document.querySelector('.nav-button[data-tab="route"]');
  routeTab?.click();
  const dayButton = document.querySelector(`.route-day[data-day="${index}"]`);
  dayButton?.click();
  closeCalendar();
}

function calendarCellMarkup(cell) {
  if (!cell.date) return '<span class="month-day month-day--blank" aria-hidden="true"></span>';
  if (!cell.selectable) {
    return `<span class="month-day month-day--inactive"><b>${cell.day}</b></span>`;
  }
  const classes = [
    'month-day', 'month-day--trip',
    cell.isToday ? 'is-today' : '',
    cell.isSelected ? 'is-selected' : ''
  ].filter(Boolean).join(' ');
  const markerText = cell.markers.join('');
  const day = tripDays[cell.tripIndex];
  const labelBits = [
    `Dia ${cell.day} de setembro`,
    day?.city || '',
    cell.isToday ? 'hoje' : '',
    cell.isSelected ? 'selecionado' : '',
    markerText ? 'tem ingresso ou boarding pass' : ''
  ].filter(Boolean).join(', ');
  return `<button class="${classes}" type="button" data-calendar-date="${esc(cell.date)}" aria-label="${esc(labelBits)}">
    <span class="month-day__top"><b>${cell.day}</b><i>${markerText}</i></span>
    <small>${esc(shortCity(day?.city || cell.city))}</small>
  </button>`;
}

function buildCalendarMarkup() {
  const cells = buildSeptemberCalendar(
    tripDays,
    ticketMarkersByDate(),
    selectedDate(),
    localDateKey(new Date())
  );
  return `
    <div class="month-calendar-panel" role="dialog" aria-modal="true" aria-labelledby="month-calendar-title">
      <div class="month-calendar-head">
        <div><span>VIAGEM · 7–21 SET</span><h2 id="month-calendar-title">Setembro 2026</h2></div>
        <button class="month-calendar-close" type="button" aria-label="Fechar calendário">×</button>
      </div>
      <div class="month-weekdays" aria-hidden="true"><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span><span>DOM</span></div>
      <div class="month-grid">${cells.map(calendarCellMarkup).join('')}</div>
      <div class="month-calendar-legend"><span><i class="legend-today"></i> hoje</span><span><i class="legend-selected"></i> aberto</span><span>🎟️ ingresso</span><span>✈️ boarding</span></div>
    </div>`;
}

function ensureOverlay() {
  let overlay = document.querySelector('#month-calendar-overlay');
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.id = 'month-calendar-overlay';
  overlay.className = 'month-calendar-overlay';
  overlay.hidden = true;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeCalendar();
  });
  document.body.appendChild(overlay);
  return overlay;
}

function openCalendar() {
  const overlay = ensureOverlay();
  lastFocus = document.activeElement;
  overlay.innerHTML = buildCalendarMarkup();
  overlay.hidden = false;
  document.body.classList.add('month-calendar-open');
  overlay.querySelector('.month-calendar-close')?.addEventListener('click', closeCalendar);
  overlay.querySelectorAll('[data-calendar-date]').forEach((button) => {
    button.addEventListener('click', () => navigateToTripDay(button.dataset.calendarDate));
  });
  overlay.querySelector('.month-calendar-close')?.focus({ preventScroll:true });
}

function closeCalendar() {
  const overlay = document.querySelector('#month-calendar-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  overlay.innerHTML = '';
  document.body.classList.remove('month-calendar-open');
  if (lastFocus instanceof HTMLElement && document.contains(lastFocus)) lastFocus.focus({ preventScroll:true });
  lastFocus = null;
}

function renderLauncher() {
  const hero = document.querySelector('#today-swipe .hero');
  if (!hero || hero.querySelector('.month-calendar-launch')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'month-calendar-launch';
  button.setAttribute('aria-label', 'Abrir calendário de setembro');
  button.innerHTML = '<span aria-hidden="true">🗓</span>';
  button.addEventListener('click', openCalendar);
  hero.appendChild(button);
}

function injectStyles() {
  if (document.querySelector('#month-calendar-styles')) return;
  const style = document.createElement('style');
  style.id = 'month-calendar-styles';
  style.textContent = `
    .month-calendar-launch{position:absolute;z-index:7;left:61px;top:10px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(45,26,10,.12);background:rgba(251,248,242,.86);display:grid;place-items:center;font-size:20px;box-shadow:0 2px 8px rgba(45,26,10,.06);backdrop-filter:blur(8px)}
    .month-calendar-launch:active{transform:scale(.96)}
    .month-calendar-open{overflow:hidden}
    .month-calendar-overlay{position:fixed;z-index:90;inset:0;background:rgba(34,27,20,.48);backdrop-filter:blur(10px);padding:calc(62px + env(safe-area-inset-top)) 14px calc(20px + env(safe-area-inset-bottom));overflow:auto}
    .month-calendar-overlay[hidden]{display:none}
    .month-calendar-panel{width:min(100%,430px);margin:0 auto;background:#f8efd9;border:1px solid rgba(45,26,10,.16);border-radius:25px;padding:17px 14px 14px;box-shadow:0 22px 60px rgba(28,18,10,.28);animation:monthZoomOut .2s cubic-bezier(.2,.75,.25,1)}
    @keyframes monthZoomOut{from{opacity:.15;transform:scale(.91) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .month-calendar-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:0 3px 12px}
    .month-calendar-head span{font:800 9px/1 "Courier New",monospace;letter-spacing:1.35px;color:#8b6242}
    .month-calendar-head h2{font-size:27px;line-height:1;margin:5px 0 0;color:#2d1a0a}
    .month-calendar-close{width:44px;height:44px;border-radius:50%;border:1px solid rgba(45,26,10,.14);background:#fbf8f2;font-size:25px;display:grid;place-items:center}
    .month-weekdays,.month-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px}
    .month-weekdays{padding:0 2px 6px}
    .month-weekdays span{text-align:center;font:800 8px/1 "Courier New",monospace;letter-spacing:.45px;color:#8b6242}
    .month-day{min-width:0;min-height:58px;border:0;border-radius:11px;padding:6px 5px;background:transparent;color:#7d6b5c;text-align:left;overflow:hidden}
    .month-day--blank{visibility:hidden}
    .month-day--inactive{display:flex;align-items:flex-start;justify-content:flex-start;opacity:.36;font:700 13px/1 Georgia,serif}
    .month-day--trip{background:rgba(251,248,242,.88);border:1px solid rgba(45,26,10,.10);display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 4px rgba(45,26,10,.03)}
    .month-day--trip:active{transform:scale(.97)}
    .month-day__top{display:flex;align-items:flex-start;justify-content:space-between;gap:2px;width:100%}
    .month-day__top b{font-size:16px;line-height:1;color:#2d1a0a}
    .month-day__top i{font-style:normal;font-size:10px;line-height:1;letter-spacing:-2px;white-space:nowrap}
    .month-day small{width:100%;font:800 7px/1.05 "Courier New",monospace;color:#7b654f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .month-day.is-selected{background:#2d1a0a;border-color:#2d1a0a;box-shadow:0 4px 12px rgba(45,26,10,.18)}
    .month-day.is-selected .month-day__top b,.month-day.is-selected small{color:#f7ead0}
    .month-day.is-today{outline:2px solid #c85a3a;outline-offset:1px}
    .month-day.is-today:not(.is-selected) .month-day__top b{color:#a7432c}
    .month-calendar-legend{display:flex;flex-wrap:wrap;gap:7px 11px;padding:12px 3px 0;font:700 8.5px/1.2 "Courier New",monospace;color:#7b654f}
    .month-calendar-legend span{display:inline-flex;align-items:center;gap:4px}
    .month-calendar-legend i{width:9px;height:9px;border-radius:50%;display:inline-block}
    .legend-today{border:2px solid #c85a3a;background:transparent}.legend-selected{background:#2d1a0a}

    /* Global readability increase: roughly ${Math.round((FONT_SCALE - 1) * 100)}%, without enlarging the main cards. */
    .device-date{font-size:13px!important}.network-pill{font-size:10px!important}
    .hero-daynum{font-size:10.5px!important}.hero-city{font-size:16px!important}.hero-date{font-size:11.5px!important}.hero p{font-size:14px!important}.pretrip-banner{font-size:10.5px!important}
    .now-tag{font-size:9.5px!important}.now-title{font-size:15px!important}.now-time{font-size:11.5px!important}
    .section-title{font-size:10.5px!important}.outfit-chip,.bring-chip{font-size:13px!important}.day-alert{font-size:11.5px!important}
    .tl-time{font-size:10.5px!important}.tl-card h3{font-size:15px!important}.tl-card-sub{font-size:11px!important}.tl-card-note{font-size:13px!important}.status-badge{font-size:9px!important}
    .event-tip summary{font-size:10px!important}.event-tip p{font-size:13px!important}.alert-strip{font-size:11px!important}.alert-strip b{font-size:9.5px!important}.tl-btn{font-size:10.5px!important}
    .nav-button b{font-size:9.5px!important}.page-header p,.wallet-header p,.more-card p{font-size:14px!important}
    .journey-stop__date,.journey-stop__next,.route-day__date{font-size:10.5px!important}.journey-stop__body p,.route-day__city{font-size:12.5px!important}.route-day__title,.journey-stop__body h2{font-size:15px!important}
    .wallet-cat-title{font-size:11px!important}.ticket-name{font-size:15px!important}.ticket-detail,.ticket-conf{font-size:11.5px!important}.ticket-note-small{font-size:12.5px!important}.ticket-qr-btn,.hotel-actions a{font-size:10.5px!important}
    .more-card h3{font-size:16px!important}.checklist,.contact-row,.phrase-grid{font-size:13px!important}
    .day-ticket-access__head{font-size:10.5px!important}.day-ticket-access__head small{font-size:9.5px!important}.day-ticket-button span,.day-ticket-button small{font-size:9.5px!important}.day-ticket-button b{font-size:14px!important}
    .weather-section-head p{font-size:11.5px!important}.weather-refresh{font-size:9.5px!important}.weather-stop-head b{font-size:13.5px!important}.weather-stop-head small{font-size:9.5px!important}.weather-live-clock{font-size:10.5px!important}
    .weather-current-label{font-size:8px!important}.weather-current-feels{font-size:10.5px!important}.weather-day-range small{font-size:8px!important}.weather-day-range b{font-size:15px!important}.weather-condition b{font-size:12.5px!important}.weather-condition span{font-size:9.5px!important}.weather-metrics span{font-size:9.5px!important}.weather-advice{font-size:12px!important}.weather-advice b{font-size:9px!important}
    @media (max-width:360px){.month-calendar-overlay{padding-left:8px;padding-right:8px}.month-calendar-panel{padding-left:9px;padding-right:9px}.month-grid,.month-weekdays{gap:3px}.month-day{min-height:54px;padding:5px 4px}.month-day small{font-size:6.5px}.month-day__top i{font-size:9px}}
  `;
  document.head.appendChild(style);
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = window.setTimeout(renderLauncher, 25);
}

function init() {
  injectStyles();
  ensureOverlay();
  renderLauncher();
  const root = document.querySelector('#app-main');
  if (root) {
    observer = new MutationObserver(scheduleRender);
    observer.observe(root, { childList:true, subtree:true });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCalendar();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
}
