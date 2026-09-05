import { tripDays, walletItems } from './trip-data.js';
import {
  getDayQuickAccessItems,
  getDayTemporalState,
  localDateKey,
  renderDayQuickAccessMarkup,
  WEATHER_CARD_SCALE
} from './core.js';

let observer = null;
let renderTimer = null;

function selectedDay() {
  const label = document.querySelector('#today-swipe .hero__date')?.textContent || '';
  const match = label.match(/DIA\s+(\d{1,2})\s*\/\s*\d+/i);
  const index = match ? Number(match[1]) - 1 : -1;
  return index >= 0 && index < tripDays.length ? tripDays[index] : null;
}

function temporalForDay(day) {
  const today = localDateKey(new Date());
  if (day?.date === today) return getDayTemporalState(day, new Date());
  if (day?.date > today) {
    const next = day.events?.find((event) => /^\d{2}:\d{2}$/.test(event.time || '')) || null;
    return { current:null, next, nextAt:null };
  }
  return { current:null, next:null, nextAt:null };
}

function openQuickTicket(ticketId) {
  const today = document.querySelector('#today-swipe');
  const timelineButton = [...(today?.querySelectorAll('[data-ticket]') || [])].find((button) => button.dataset.ticket === ticketId);
  if (timelineButton) {
    timelineButton.click();
    return;
  }
  const walletTab = document.querySelector('.nav-button[data-tab="wallet"]');
  if (!walletTab) return;
  walletTab.click();
  window.setTimeout(() => {
    const walletButton = [...document.querySelectorAll('[data-ticket]')].find((button) => button.dataset.ticket === ticketId);
    walletButton?.click();
  }, 60);
}

function renderQuickAccess() {
  const todaySurface = document.querySelector('#today-swipe');
  if (!todaySurface) return;
  const day = selectedDay();
  const nowNext = todaySurface.querySelector('.now-next');
  if (!day || !nowNext) return;

  const temporal = temporalForDay(day);
  const items = getDayQuickAccessItems(day, walletItems, temporal);
  const existing = todaySurface.querySelector('.day-ticket-access');
  if (!items.length) {
    existing?.remove();
    return;
  }

  const signature = JSON.stringify(items.map(({ ticketId, time, emphasis, count }) => [ticketId, time, emphasis, count]));
  let section = existing;
  if (!section) {
    section = document.createElement('section');
    section.className = 'day-ticket-access';
    nowNext.insertAdjacentElement('afterend', section);
  }
  if (section.dataset.signature === signature && section.dataset.date === day.date) return;

  const isToday = day.date === localDateKey(new Date());
  section.dataset.signature = signature;
  section.dataset.date = day.date;
  section.innerHTML = `<div class="day-ticket-access__head"><span>${isToday ? 'INGRESSOS DE HOJE' : 'INGRESSOS DO DIA'}</span><small>toque para abrir</small></div><div class="day-ticket-scroll">${renderDayQuickAccessMarkup(items)}</div>`;
  section.querySelectorAll('[data-quick-ticket]').forEach((button) => {
    button.addEventListener('click', () => openQuickTicket(button.dataset.quickTicket));
  });
}

function injectStyles() {
  if (document.querySelector('#day-tools-styles')) return;
  const style = document.createElement('style');
  style.id = 'day-tools-styles';
  const skyHeight = Math.round(124 * WEATHER_CARD_SCALE);
  const iconSize = Math.round(58 * WEATHER_CARD_SCALE);
  style.textContent = `
    .day-ticket-access{margin:-3px 0 10px;padding:9px 10px 10px;border:1px solid rgba(200,90,58,.20);border-radius:15px;background:linear-gradient(135deg,rgba(255,250,240,.94),rgba(255,242,231,.88));box-shadow:0 3px 12px rgba(59,43,20,.04)}
    .day-ticket-access__head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;font:800 9px/1 "Courier New",monospace;letter-spacing:1.25px;color:#8b3a1a}
    .day-ticket-access__head small{font:700 8px/1 "Courier New",monospace;letter-spacing:.2px;color:#9a806e;text-transform:none}
    .day-ticket-scroll{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding-bottom:1px;scroll-snap-type:x proximity}
    .day-ticket-scroll::-webkit-scrollbar{display:none}
    .day-ticket-button{scroll-snap-align:start;flex:0 0 min(76vw,270px);min-height:62px;border:1px solid rgba(139,58,26,.18);border-radius:12px;background:#fffaf3;padding:8px 10px;text-align:left;display:grid;grid-template-columns:1fr auto;grid-template-areas:"kind time" "title title";gap:3px 8px;color:#3e2a1c;box-shadow:0 2px 7px rgba(59,43,20,.04)}
    .day-ticket-button span{grid-area:kind;font:800 8px/1 "Courier New",monospace;letter-spacing:.9px;color:#b64c31}
    .day-ticket-button b{grid-area:title;font-size:12px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .day-ticket-button small{grid-area:time;align-self:start;font:800 8px/1 "Courier New",monospace;color:#866f5d;white-space:nowrap}
    .day-ticket-button.is-next{border-color:rgba(26,92,122,.58);box-shadow:0 0 0 2px rgba(26,92,122,.08)}
    .day-ticket-button.is-next span:after{content:" · PRÓXIMO";color:#1a5c7a}
    .day-ticket-button.is-current{border-color:#c85a3a;background:#fff2e8;box-shadow:0 0 0 2px rgba(200,90,58,.10)}
    .day-ticket-button.is-current span:after{content:" · AGORA";color:#9b351e}

    .weather-section{margin-top:10px!important;padding-top:8px!important}
    .weather-section-head{margin-bottom:6px!important;align-items:center!important}
    .weather-section-head p{font-size:10px!important;margin-top:1px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:245px}
    .weather-refresh{min-height:30px!important;padding:0 9px!important;font-size:8px!important}
    .weather-grid{gap:7px!important}
    .weather-stop-card{border-radius:15px!important}
    .weather-stop-head{gap:8px!important;padding:7px 9px 5px!important}
    .weather-stop-head b{font-size:12px!important;line-height:1.05!important}
    .weather-stop-head small{font-size:8px!important;margin-top:1px!important}
    .weather-live-clock{font-size:9px!important;padding:3px 5px!important;border-radius:7px!important}
    .weather-sky{grid-template-columns:46px minmax(0,1fr) auto!important;gap:6px!important;min-height:${skyHeight}px!important;padding:6px 9px 7px!important}
    .weather-sky::before{width:76px!important;height:76px!important;right:-24px!important;top:-32px!important}
    .weather-sky::after{width:48px!important;height:48px!important;left:-20px!important;bottom:-25px!important}
    .weather-icon{font-size:${iconSize}px!important;filter:drop-shadow(0 2px 4px rgba(28,55,75,.16))!important}
    .weather-current-label{font-size:7px!important;letter-spacing:.8px!important}
    .weather-current strong{font-size:32px!important;line-height:.9!important;letter-spacing:-1.5px!important}
    .weather-current-feels{margin-top:2px!important;font-size:9px!important}
    .weather-day-range{gap:3px!important;min-width:48px!important}
    .weather-day-range span{gap:4px!important;padding-left:6px!important}
    .weather-day-range small{font-size:7px!important;letter-spacing:.3px!important}
    .weather-day-range b{font-size:14px!important;letter-spacing:-.3px!important}
    .weather-condition{padding:5px 9px 0!important;gap:5px!important}
    .weather-condition b{font-size:11px!important}
    .weather-condition span{font-size:8.5px!important;white-space:nowrap}
    .weather-metrics{flex-wrap:nowrap!important;gap:4px!important;padding:5px 9px 7px!important;overflow-x:auto;scrollbar-width:none}
    .weather-metrics::-webkit-scrollbar{display:none}
    .weather-metrics span{font-size:8px!important;padding:3px 5px!important;white-space:nowrap}
    .weather-stale{margin:0 9px 6px!important;font-size:7.5px!important}
    .weather-advice{margin-top:7px!important;padding:7px 9px!important;font-size:10.5px!important}
    .weather-advice b{font-size:8px!important;margin-bottom:2px!important}
    @media (max-width:370px){.weather-sky{grid-template-columns:42px minmax(0,1fr) auto!important}.weather-icon{font-size:32px!important}.weather-current strong{font-size:29px!important}.weather-day-range b{font-size:13px!important}.day-ticket-button{flex-basis:82vw}}
  `;
  document.head.appendChild(style);
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = window.setTimeout(renderQuickAccess, 25);
}

function init() {
  injectStyles();
  renderQuickAccess();
  const root = document.querySelector('#app-main');
  if (root) {
    observer = new MutationObserver(scheduleRender);
    observer.observe(root, { childList:true, subtree:true });
  }
  window.setInterval(renderQuickAccess, 60000);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
}
