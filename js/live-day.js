import { tripDays, walletItems } from './trip-data.js';
import {
  getDayTemporalState,
  getLeaveCue,
  formatCountdown,
  localDateKey,
  mapsUrl,
  wazeUrl,
  uberUrl
} from './core.js';

const main = document.querySelector('#app-main');
const stateClasses = ['is-past', 'is-current', 'is-next', 'is-future'];

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
}[char]));

function selectedDayFromDom() {
  const label = main?.querySelector('.hero__date')?.textContent || '';
  const match = label.match(/DIA\s+(\d+)\s*\/\s*(\d+)/i);
  const index = match ? Number(match[1]) - 1 : -1;
  return index >= 0 ? tripDays[index] || null : null;
}

function timedEvents(day) {
  return (day?.events || []).filter((event) => /^\d{2}:\d{2}$/.test(event?.time || ''));
}

function temporalForSelectedDay(day, now = new Date()) {
  const today = localDateKey(now);
  if (day.date === today) return getDayTemporalState(day, now);

  const timed = timedEvents(day);
  const eventStates = new Map();
  if (day.date < today) {
    timed.forEach((event) => eventStates.set(event, 'past'));
    return { current:null, next:null, nextAt:null, eventStates, progress:100, selectedDay:'past' };
  }

  const next = timed[0] || null;
  timed.forEach((event, index) => eventStates.set(event, index === 0 ? 'next' : 'future'));
  return { current:null, next, nextAt:null, eventStates, progress:0, selectedDay:'future' };
}

function eventTime(event) {
  if (!event) return '';
  return `${event.time || ''}${event.end ? `–${event.end}` : ''}`;
}

function navActions(location) {
  if (!location) return '';
  return [
    `<a class="tl-btn uber" href="${esc(uberUrl(location))}" target="_blank" rel="noopener">Uber</a>`,
    `<a class="tl-btn maps" href="${esc(mapsUrl(location))}" target="_blank" rel="noopener">Maps</a>`,
    `<a class="tl-btn waze" href="${esc(wazeUrl(location))}" target="_blank" rel="noopener">Waze</a>`
  ].join('');
}

function ticketAction(event) {
  if (!event?.ticketId) return '';
  const item = walletItems.find((candidate) => candidate.id === event.ticketId);
  if (!item?.codeAsset) return '';
  const label = item.category === 'Voos' ? 'BOARDING' : 'QR / TICKET';
  return `<button class="tl-btn qr" type="button" data-live-ticket="${esc(event.ticketId)}">${label}</button>`;
}

function eventActions(event) {
  if (!event) return '';
  const actions = `${ticketAction(event)}${navActions(event.location)}`;
  return actions ? `<div class="smart-status-card__actions">${actions}</div>` : '';
}

export function smartStatusCard(day, temporal, now = new Date()) {
  const today = localDateKey(now);
  const current = temporal.current;
  const next = temporal.next;

  if (day.date < today || (!current && !next && day.date === today)) {
    return {
      className:'is-done',
      html:`<div class="smart-status-card__tag">✓ DIA CONCLUÍDO</div><div class="smart-status-card__title">${esc(day.title || day.city)}</div><div class="smart-status-card__meta">${esc(day.summary || day.city)}</div>`
    };
  }

  if (current) {
    const nextMeta = next
      ? `<div class="smart-status-card__next"><span>↓ PRÓXIMO</span><b>${esc(next.time)} · ${esc(next.title)}</b>${temporal.nextAt ? `<small>${esc(formatCountdown(temporal.nextAt - now))}</small>` : ''}</div>`
      : '';
    return {
      className:'is-current',
      html:`<div class="smart-status-card__tag">▶ AGORA</div><div class="smart-status-card__title">${esc(current.title)}</div><div class="smart-status-card__meta">${esc(eventTime(current))}</div>${current.location ? `<div class="smart-status-card__location">📍 ${esc(current.location.destination)}</div>` : ''}${eventActions(current)}${nextMeta}`
    };
  }

  if (next) {
    const isCurrentDay = day.date === today;
    const leaveCue = isCurrentDay ? getLeaveCue(day, next, now) : null;
    const countdown = isCurrentDay && temporal.nextAt ? formatCountdown(temporal.nextAt - now) : '';
    const cue = leaveCue || countdown;
    return {
      className:'is-next',
      html:`<div class="smart-status-card__tag">↓ PRÓXIMO</div><div class="smart-status-card__title">${esc(next.title)}</div><div class="smart-status-card__meta">${esc(eventTime(next))}${cue ? ` <span class="smart-status-card__countdown">${esc(cue)}</span>` : ''}</div>${next.location ? `<div class="smart-status-card__location">📍 ${esc(next.location.destination)}</div>` : ''}${eventActions(next)}`
    };
  }

  return {
    className:'is-done',
    html:`<div class="smart-status-card__tag">DIA SELECIONADO</div><div class="smart-status-card__title">${esc(day.title || day.city)}</div><div class="smart-status-card__meta">${esc(day.summary || '')}</div>`
  };
}

export function updateSmartStatusElement(status, smart) {
  if (!status || !smart) return false;
  const nextClassName = `smart-status-card ${smart.className}`;
  const nextHtml = String(smart.html ?? '');
  let changed = false;

  if (status.className !== nextClassName) {
    status.className = nextClassName;
    changed = true;
  }
  if (status.dataset?.liveDay !== 'true') {
    status.dataset.liveDay = 'true';
    changed = true;
  }
  if (status.innerHTML !== nextHtml) {
    status.innerHTML = nextHtml;
    changed = true;
  }
  return changed;
}

function bindSmartTicketActions() {
  main?.querySelectorAll('[data-live-ticket]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.liveTicket;
      const source = [...main.querySelectorAll('button[data-ticket]')]
        .find((candidate) => candidate.dataset.ticket === id && !candidate.dataset.liveTicket);
      source?.click();
    });
  });
}

function applyTimelineStates(day, temporal) {
  const timeline = main?.querySelector('.timeline');
  if (!timeline) return;
  timeline.style.setProperty('--timeline-progress', `${Math.max(0, Math.min(100, Number(temporal.progress) || 0)).toFixed(2)}%`);

  const items = [...timeline.querySelectorAll('.tl-item')];
  day.events.forEach((event, index) => {
    const item = items[index];
    if (!item) return;
    item.classList.remove(...stateClasses);
    const eventState = temporal.eventStates?.get(event);
    if (eventState) item.classList.add(`is-${eventState}`);
    const dot = item.querySelector('.tl-dot');
    if (dot && eventState === 'past') dot.setAttribute('data-state-cue', '✓');
    else dot?.removeAttribute('data-state-cue');
  });
}

export function enhanceLiveDay(now = new Date()) {
  const status = main?.querySelector('.now-next');
  if (!status) return false;
  const day = selectedDayFromDom();
  if (!day) return false;

  document.documentElement.dataset.tripDate = day.date;
  const temporal = temporalForSelectedDay(day, now);
  const smart = smartStatusCard(day, temporal, now);
  const smartHtmlChanged = status.innerHTML !== smart.html;
  updateSmartStatusElement(status, smart);
  applyTimelineStates(day, temporal);
  if (smartHtmlChanged) bindSmartTicketActions();
  return true;
}

function installLiveDay() {
  if (!main) return false;
  enhanceLiveDay();
  const observer = new MutationObserver(() => {
    if (main.querySelector('.now-next')) queueMicrotask(() => enhanceLiveDay());
  });
  observer.observe(main, { childList:true, subtree:true });
  return true;
}

if (typeof document !== 'undefined') {
  const boot = () => installLiveDay();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
}
