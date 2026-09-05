import {
  TRIP_WEATHER_STOPS,
  formatLocalTime,
  buildForecastUrl,
  summarizeHourlyForecast,
  buildWeatherAdvice
} from './weather-engine.js';

const CACHE_PREFIX = 'adriatico-weather-v1:';
const CACHE_TTL_MS = 15 * 60 * 1000;
let observer = null;
let clockTimer = null;
let renderTimer = null;
let activeDate = null;

export function tripDateFromDayNumber(dayNumber) {
  const n = Number(dayNumber);
  if (!Number.isInteger(n) || n < 1 || n > 15) return null;
  return `2026-09-${String(n + 6).padStart(2,'0')}`;
}

export function parseVisibleDayNumber(text) {
  const match = String(text || '').match(/DIA\s+(\d{1,2})\s*\/\s*15/i);
  const value = match ? Number(match[1]) : NaN;
  return Number.isInteger(value) && value >= 1 && value <= 15 ? value : null;
}

function fmtTemp(min, max) {
  const a = Math.round(Number(min));
  const b = Math.round(Number(max));
  return a === b ? `${a}°C` : `${a}–${b}°C`;
}

function esc(value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
}

export function renderStopWeatherCard(stop, summary = null, meta = {}) {
  const clock = `<span class="weather-live-clock" data-weather-clock="${esc(stop.id)}" data-timezone="${esc(stop.timeZone)}">--:--:--</span>`;
  const stale = meta.stale ? '<span class="weather-stale">offline · última previsão salva</span>' : '';
  if (!summary) {
    const message = meta.error || 'Carregando previsão…';
    return `<article class="weather-stop-card" data-weather-stop="${esc(stop.id)}">
      <div class="weather-stop-head"><div><b>${esc(stop.label)}</b><small>${esc(stop.from)}–${esc(stop.to)}</small></div>${clock}</div>
      <div class="weather-unavailable">${esc(message)}</div>${stale}
    </article>`;
  }
  return `<article class="weather-stop-card" data-weather-stop="${esc(stop.id)}">
    <div class="weather-stop-head"><div><b>${esc(stop.label)}</b><small>${esc(stop.from)}–${esc(stop.to)}</small></div>${clock}</div>
    <div class="weather-main"><strong>${fmtTemp(summary.minTemp, summary.maxTemp)}</strong><span>${esc(summary.condition)}</span></div>
    <div class="weather-metrics">
      <span>sensação ${fmtTemp(summary.minApparent, summary.maxApparent)}</span>
      <span>chuva ${Math.round(summary.precipProbability)}%</span>
      <span>${Number(summary.precipitation).toFixed(1)} mm</span>
      <span>vento ${Math.round(summary.maxWind)} km/h</span>
      <span>UV ${Math.round(summary.maxUv)}</span>
    </div>${stale}
  </article>`;
}

function injectStyles() {
  if (document.querySelector('#weather-patch-styles')) return;
  const style = document.createElement('style');
  style.id = 'weather-patch-styles';
  style.textContent = `
    .weather-section{padding-top:16px!important}
    .weather-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:10px}
    .weather-section-head p{margin:3px 0 0;color:#6f6b62;font-size:12px}
    .weather-refresh{border:1px solid #d8d0c0;background:#fffaf0;border-radius:999px;min-height:36px;padding:0 12px;font:700 10px/1 "Courier New",monospace;letter-spacing:.4px;color:#594f43}
    .weather-grid{display:grid;gap:10px}
    .weather-stop-card{border:1px solid rgba(78,65,47,.16);border-radius:16px;padding:12px;background:rgba(255,255,255,.72);box-shadow:0 3px 12px rgba(59,43,20,.04)}
    .weather-stop-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
    .weather-stop-head b{display:block;font-size:14px;color:#2e291f}
    .weather-stop-head small{display:block;margin-top:2px;color:#81776a;font:700 10px/1.2 "Courier New",monospace}
    .weather-live-clock{white-space:nowrap;font:800 12px/1.2 "Courier New",monospace;color:#b64c31;background:#fff3ea;padding:5px 7px;border-radius:9px}
    .weather-main{display:flex;align-items:baseline;gap:9px;margin-top:10px}
    .weather-main strong{font-size:25px;letter-spacing:-.8px;color:#26221b}
    .weather-main span{font-size:12px;color:#5f574d}
    .weather-metrics{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
    .weather-metrics span{font:700 10px/1.1 "Courier New",monospace;background:#f4efe4;border-radius:999px;padding:5px 7px;color:#5a5247}
    .weather-unavailable{margin-top:10px;color:#776e62;font-size:12px}
    .weather-stale{display:block;margin-top:7px;color:#a36b37;font:700 9px/1.2 "Courier New",monospace;text-transform:uppercase}
    .weather-advice{margin-top:10px;padding:10px 11px;border-left:3px solid #c85a3a;background:#fff7ef;border-radius:4px 12px 12px 4px;font-size:12px;color:#4f463c}
    .weather-advice b{display:block;margin-bottom:3px;font:800 10px/1 "Courier New",monospace;letter-spacing:.5px;text-transform:uppercase;color:#b64c31}
    .weather-extra{outline:1px dashed rgba(200,90,58,.45)}
    @media (min-width:700px){.weather-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  `;
  document.head.appendChild(style);
}

function cacheKey(date, stop) { return `${CACHE_PREFIX}${date}:${stop.id}`; }
function readCache(date, stop) {
  try {
    const raw = localStorage.getItem(cacheKey(date, stop));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.summary || !parsed?.fetchedAt) return null;
    return parsed;
  } catch { return null; }
}
function writeCache(date, stop, summary) {
  try { localStorage.setItem(cacheKey(date, stop), JSON.stringify({ summary, fetchedAt:Date.now() })); } catch {}
}

async function fetchSummary(date, stop, force=false) {
  const cached = readCache(date, stop);
  const age = cached ? Date.now() - cached.fetchedAt : Infinity;
  if (!force && cached && age < CACHE_TTL_MS) return { ...cached, stale:false };
  if (!navigator.onLine && cached) return { ...cached, stale:true };
  if (!navigator.onLine) throw new Error('Sem internet e sem previsão salva para este local.');
  try {
    const response = await fetch(buildForecastUrl({ ...stop, date }), { cache:'no-store' });
    if (!response.ok) {
      let reason = '';
      try { reason = (await response.json())?.reason || ''; } catch {}
      if (/forecast|date|range|past/i.test(reason)) throw new Error('Previsão ainda não disponível para esta data.');
      throw new Error('Não foi possível atualizar a previsão agora.');
    }
    const payload = await response.json();
    const summary = summarizeHourlyForecast(payload, { date, from:stop.from, to:stop.to });
    writeCache(date, stop, summary);
    return { summary, fetchedAt:Date.now(), stale:false };
  } catch (error) {
    if (cached) return { ...cached, stale:true, error:error.message };
    throw error;
  }
}

function updateClocks() {
  document.querySelectorAll('[data-weather-clock][data-timezone]').forEach(el => {
    try { el.textContent = formatLocalTime(new Date(), el.dataset.timezone); }
    catch { el.textContent = '--:--:--'; }
  });
}

function baselineFromDom() {
  const compact = document.querySelector('#today-swipe .compact-section');
  if (!compact) return { wear:[], bring:[] };
  const sections = [...compact.querySelectorAll('.section-title')];
  const wearTitle = sections.find(x => /vestir/i.test(x.textContent));
  const bringTitle = sections.find(x => /levar/i.test(x.textContent));
  const rowAfter = title => title?.nextElementSibling;
  const texts = row => row ? [...row.children].filter(x => !x.hasAttribute('data-weather-extra')).map(x => x.textContent.replace(/^[👕＋+\s]+/u,'').trim()) : [];
  return { wear:texts(rowAfter(wearTitle)), bring:texts(rowAfter(bringTitle)) };
}

function applyAdvice(summaries) {
  document.querySelectorAll('[data-weather-extra]').forEach(el => el.remove());
  const compact = document.querySelector('#today-swipe .compact-section');
  const weatherSection = document.querySelector('.weather-section');
  if (!compact || !weatherSection) return;
  const baseline = baselineFromDom();
  const advice = buildWeatherAdvice(summaries, baseline);
  const titles = [...compact.querySelectorAll('.section-title')];
  const wearRow = titles.find(x => /vestir/i.test(x.textContent))?.nextElementSibling;
  const bringRow = titles.find(x => /levar/i.test(x.textContent))?.nextElementSibling;
  advice.wear.forEach(item => {
    const span = document.createElement('span'); span.className='outfit-chip weather-extra'; span.dataset.weatherExtra='1'; span.textContent=`☁️ ${item}`; wearRow?.appendChild(span);
  });
  advice.bring.forEach(item => {
    const span = document.createElement('span'); span.className='bring-chip weather-extra'; span.dataset.weatherExtra='1'; span.textContent=`☁️ ${item}`; bringRow?.appendChild(span);
  });
  let box = weatherSection.querySelector('.weather-advice');
  if (!box) { box = document.createElement('div'); box.className='weather-advice'; weatherSection.appendChild(box); }
  const parts = [];
  if (advice.wear.length) parts.push(`Vestir: ${advice.wear.join(' · ')}`);
  if (advice.bring.length) parts.push(`Levar: ${advice.bring.join(' · ')}`);
  box.innerHTML = parts.length ? `<b>Ajuste pelo clima</b>${esc(parts.join(' | '))}` : '<b>Ajuste pelo clima</b>O planejamento original já está adequado à previsão.';
}

async function loadWeather(date, stops, force=false) {
  const summaries = [];
  await Promise.all(stops.map(async stop => {
    let result;
    try { result = await fetchSummary(date, stop, force); }
    catch (error) { result = { summary:null, stale:false, error:error.message }; }
    if (date !== activeDate) return;
    const current = document.querySelector(`[data-weather-stop="${CSS.escape(stop.id)}"]`);
    if (current) {
      const wrap = document.createElement('div');
      wrap.innerHTML = renderStopWeatherCard(stop, result.summary, result);
      current.replaceWith(wrap.firstElementChild);
    }
    if (result.summary) summaries.push(result.summary);
    updateClocks();
  }));
  if (date === activeDate && summaries.length) applyAdvice(summaries);
}

function selectedTripDate() {
  const dayLabel = document.querySelector('#today-swipe .hero__date');
  return tripDateFromDayNumber(parseVisibleDayNumber(dayLabel?.textContent));
}

function renderWeatherSection(force=false) {
  const today = document.querySelector('#today-swipe');
  if (!today) { activeDate = null; return; }
  const date = selectedTripDate();
  const stops = TRIP_WEATHER_STOPS[date] || [];
  const compact = today.querySelector('.compact-section');
  if (!date || !stops.length || !compact) return;
  const existing = today.querySelector('.weather-section');
  if (existing && existing.dataset.date === date && !force) { activeDate = date; updateClocks(); return; }
  existing?.remove();
  document.querySelectorAll('[data-weather-extra]').forEach(el => el.remove());
  activeDate = date;
  const section = document.createElement('section');
  section.className = 'section weather-section';
  section.dataset.date = date;
  section.innerHTML = `<div class="weather-section-head"><div><div class="section-title">Clima do dia</div><p>Previsão nos horários do roteiro · relógio local ao vivo</p></div><button class="weather-refresh" type="button">ATUALIZAR</button></div><div class="weather-grid">${stops.map(stop => renderStopWeatherCard(stop)).join('')}</div>`;
  compact.parentNode.insertBefore(section, compact);
  section.querySelector('.weather-refresh')?.addEventListener('click', () => loadWeather(date, stops, true));
  updateClocks();
  loadWeather(date, stops, force);
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => renderWeatherSection(false), 30);
}

function init() {
  injectStyles();
  scheduleRender();
  observer = new MutationObserver(scheduleRender);
  const root = document.querySelector('#app-main');
  if (root) observer.observe(root, { childList:true, subtree:true });
  clockTimer = setInterval(updateClocks, 1000);
  window.addEventListener('online', () => renderWeatherSection(true));
  window.addEventListener('offline', updateClocks);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
}
