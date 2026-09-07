import { phrases } from './trip-data.js';
import { translatorMarkup, translatorTargetForMoment } from './translator.js';

const LANGUAGE_NAMES = new Set(['Croata', 'Húngaro', 'Esloveno']);

const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;'
}[char]));

function localIsoDate(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function selectedTranslatorTarget(root = document, now = new Date()) {
  const today = localIsoDate(now);
  const selectedDate = root.documentElement?.dataset?.tripDate || today;
  const minutes = selectedDate === today ? now.getHours() * 60 + now.getMinutes() : 12 * 60;
  return translatorTargetForMoment({ date:selectedDate, minutes });
}

export function languagesPageMarkup(target = 'hr') {
  const cards = Object.entries(phrases).map(([language, items]) => `
    <section class="more-card language-card" data-language-card="${esc(language)}">
      <h3>${esc(language)}</h3>
      <div class="phrase-grid">${items.map(([pt, local]) => `<span>${esc(pt)}</span><b>${esc(local)}</b>`).join('')}</div>
    </section>`).join('');

  return `<header class="page-header">
    <div class="eyebrow">FRASES · PRONÚNCIA · TRADUTOR</div>
    <h1>Línguas</h1>
    <p>Frases essenciais em croata, húngaro e esloveno, com pronúncia e acesso rápido ao Google Tradutor.</p>
  </header>
  <div class="languages-grid">
    ${translatorMarkup(target)}
    ${cards}
  </div>`;
}

export function stripLanguagesFromMore(root) {
  if (!root || root.querySelector('h1')?.textContent?.trim() !== 'Mais') return false;
  let changed = false;
  root.querySelectorAll('.more-card').forEach((card) => {
    const heading = card.querySelector('h3')?.textContent?.trim();
    if (card.matches?.('[data-translator-card]') || LANGUAGE_NAMES.has(heading)) {
      card.remove();
      changed = true;
    }
  });
  return changed;
}

export function installLanguagesTab(root = document) {
  const main = root.querySelector?.('#app-main');
  const button = root.querySelector?.('[data-tab="languages"]');
  if (!main || !button) return false;

  const renderLanguages = () => {
    main.innerHTML = languagesPageMarkup(selectedTranslatorTarget(root));
    main.focus?.({ preventScroll:true });
    globalThis.scrollTo?.({ top:0, behavior:'instant' });
  };

  button.addEventListener('click', renderLanguages);

  const observer = new MutationObserver(() => stripLanguagesFromMore(main));
  observer.observe(main, { childList:true, subtree:true });
  stripLanguagesFromMore(main);

  globalThis.addEventListener?.('pagehide', () => observer.disconnect(), { once:true });
  return true;
}

if (typeof document !== 'undefined') {
  const boot = () => installLanguagesTab(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
}
