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
