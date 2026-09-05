const pad = (n) => String(n).padStart(2, '0');

export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function resolveInitialDayIndex(days, now = new Date()) {
  if (!days?.length) return 0;
  const key = localDateKey(now);
  const exact = days.findIndex((day) => day.date === key);
  if (exact >= 0) return exact;
  if (key < days[0].date) return 0;
  return days.length - 1;
}

function eventDate(dayDate, hhmm) {
  if (!hhmm) return null;
  const [year, month, day] = dayDate.split('-').map(Number);
  const [hour, minute] = hhmm.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, 0, 0);
}

export function getDayTemporalState(day, now = new Date()) {
  const timed = (day?.events ?? []).filter((event) => /^\d{2}:\d{2}$/.test(event.time ?? ''));
  let current = null;
  let next = null;
  let nextAt = null;

  for (const event of timed) {
    const start = eventDate(day.date, event.time);
    const end = event.end ? eventDate(day.date, event.end) : new Date(start.getTime() + 60 * 60 * 1000);
    if (now >= start && now < end) current = event;
    if (!next && start > now) {
      next = event;
      nextAt = start;
    }
  }

  if (!current && timed.length && now < eventDate(day.date, timed[0].time)) {
    next = timed[0];
    nextAt = eventDate(day.date, timed[0].time);
  }

  return { current, next, nextAt };
}

export function formatCountdown(ms) {
  if (ms <= 0) return 'agora';
  const totalMinutes = Math.max(1, Math.round(ms / 60000));
  if (totalMinutes < 60) return `em ${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `em ${hours}h${pad(minutes)}` : `em ${hours}h`;
}

export function mapsUrl(location) {
  const params = new URLSearchParams({
    api: '1',
    destination: location.destination,
    dir_action: 'navigate'
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function wazeUrl(location) {
  const params = new URLSearchParams({ q: location.destination, navigate: 'yes' });
  return `https://waze.com/ul?${params.toString()}`;
}

export function uberUrl(location) {
  const params = new URLSearchParams({
    action: 'setPickup',
    pickup: 'my_location',
    'dropoff[formatted_address]': location.destination,
    'dropoff[nickname]': location.name || location.destination
  });
  return `https://m.uber.com/ul/?${params.toString()}`;
}

export function decideSwipeDay(dx, dy, width = 390) {
  const horizontal = Math.abs(dx);
  const vertical = Math.abs(dy);
  const threshold = Math.max(58, Math.min(110, width * 0.18));
  if (horizontal < threshold) return 0;
  if (horizontal < vertical * 1.25) return 0;
  return dx < 0 ? 1 : -1;
}

export function getTicketSlides(items, id) {
  const current = (items ?? []).find((item) => item.id === id);
  if (!current) return [];
  if (!current.groupId) return [current];
  const grouped = items.filter((item) => item.groupId === current.groupId && (item.codeAsset || item.ticketAsset));
  return grouped.length ? grouped : [current];
}

export function wrapCarouselIndex(index, delta, total) {
  if (!Number.isFinite(total) || total <= 1) return 0;
  return ((index + delta) % total + total) % total;
}

export const WEATHER_CARD_SCALE = 0.6;

export function getDayQuickAccessItems(day, items = [], temporal = {}) {
  const byGroup = new Map();
  for (const event of day?.events ?? []) {
    if (!event?.ticketId) continue;
    const item = items.find((candidate) => candidate.id === event.ticketId);
    if (!item) continue;
    const groupKey = item.groupId || item.id;
    const slides = item.groupId
      ? items.filter((candidate) => candidate.groupId === item.groupId && (candidate.codeAsset || candidate.ticketAsset))
      : (item.codeAsset || item.ticketAsset ? [item] : []);
    if (!slides.length) continue;
    const eventEmphasis = temporal.current === event ? 'current' : temporal.next === event ? 'next' : '';
    const existing = byGroup.get(groupKey);
    if (!existing) {
      byGroup.set(groupKey, {
        ticketId: item.id,
        groupKey,
        title: item.groupTitle || item.title,
        category: item.category,
        time: event.time || '',
        count: slides.length,
        emphasis: eventEmphasis
      });
      continue;
    }
    if (eventEmphasis === 'current' || (eventEmphasis === 'next' && existing.emphasis !== 'current')) {
      existing.emphasis = eventEmphasis;
      existing.time = event.time || existing.time;
    }
  }
  return [...byGroup.values()];
}

export function formatDayQuickAccessLabel(item = {}) {
  const icon = item.category === 'Voos' ? '✈️' : '🎟️';
  const count = Number(item.count) > 1 ? ` · ${item.count} códigos` : '';
  return `${icon} ${item.time || ''} · ${item.title || ''}${count}`.replace(/\s+·\s+·/g, ' ·').trim();
}

export function renderDayQuickAccessMarkup(items = []) {
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  }[char]));
  return items.map((item) => {
    const icon = item.category === 'Voos' ? '✈️' : '🎟️';
    const kind = item.category === 'Voos' ? 'BOARDING' : 'INGRESSO';
    const emphasis = item.emphasis === 'current' ? ' is-current' : item.emphasis === 'next' ? ' is-next' : '';
    const count = Number(item.count) > 1 ? ` · ${item.count} códigos` : '';
    return `<button class="day-ticket-button${emphasis}" type="button" data-quick-ticket="${escapeHtml(item.ticketId)}" aria-label="${escapeHtml(formatDayQuickAccessLabel(item))}"><span>${icon} ${kind}</span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.time || '')}${escapeHtml(count)}</small></button>`;
  }).join('');
}
