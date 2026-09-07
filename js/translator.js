export const TRANSLATOR_TARGETS = Object.freeze({
  hr:Object.freeze({ label:'Croata', flag:'🇭🇷' }),
  hu:Object.freeze({ label:'Húngaro', flag:'🇭🇺' }),
  sl:Object.freeze({ label:'Esloveno', flag:'🇸🇮' })
});

const DATE_LANGUAGE = Object.freeze({
  '2026-09-07':'hr',
  '2026-09-08':'hr',
  '2026-09-09':'hu',
  '2026-09-10':'hu',
  '2026-09-11':'sl',
  '2026-09-12':'sl',
  '2026-09-13':'sl',
  '2026-09-14':'hr',
  '2026-09-15':'hr',
  '2026-09-16':'hr',
  '2026-09-17':'hr',
  '2026-09-18':'hr',
  '2026-09-19':'hr',
  '2026-09-20':'hr',
  '2026-09-21':'hr'
});

const ROVINJ_ARRIVAL_MINUTES = 18 * 60 + 5;

export function translatorTargetForMoment({ date = '', minutes = 12 * 60 } = {}, fallback = 'hr') {
  const cleanDate = String(date || '');
  if (cleanDate === '2026-09-13' && Number(minutes) >= ROVINJ_ARRIVAL_MINUTES) return 'hr';
  return DATE_LANGUAGE[cleanDate] || (TRANSLATOR_TARGETS[fallback] ? fallback : 'hr');
}

export function googleTranslateUrl(target = 'hr') {
  const safeTarget = TRANSLATOR_TARGETS[target] ? target : 'hr';
  return `https://translate.google.com/?sl=pt&tl=${safeTarget}&op=translate`;
}

export function translatorMarkup(target = 'hr') {
  const safeTarget = TRANSLATOR_TARGETS[target] ? target : 'hr';
  const item = TRANSLATOR_TARGETS[safeTarget];
  return `<section class="more-card translator-card" data-translator-card data-translator-target="${safeTarget}">
    <div class="translator-head">
      <div>
        <div class="translator-kicker">TRADUTOR</div>
        <h3>🇧🇷 Português ↔ ${item.flag} ${item.label}</h3>
      </div>
      <span class="translator-online-note">internet</span>
    </div>
    <p class="translator-copy">Abra o Google Tradutor já no idioma local. Lá você pode escrever, usar o microfone, câmera ou modo conversa.</p>
    <a class="translator-open" data-translator-open href="${googleTranslateUrl(safeTarget)}" target="_blank" rel="noopener noreferrer">${item.flag} ABRIR GOOGLE TRADUTOR</a>
  </section>`;
}

function localIsoDate(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function targetForDocument(doc, now = new Date()) {
  const selectedDate = doc.documentElement?.dataset?.tripDate || localIsoDate(now);
  const minutes = selectedDate === localIsoDate(now)
    ? now.getHours() * 60 + now.getMinutes()
    : 12 * 60;
  return translatorTargetForMoment({ date:selectedDate, minutes });
}

export function updateTranslatorCard(card, target) {
  if (!card || !TRANSLATOR_TARGETS[target]) return false;
  const item = TRANSLATOR_TARGETS[target];
  card.dataset.translatorTarget = target;
  const heading = card.querySelector('h3');
  const link = card.querySelector('[data-translator-open]');
  if (heading) heading.textContent = `🇧🇷 Português ↔ ${item.flag} ${item.label}`;
  if (link) {
    link.href = googleTranslateUrl(target);
    link.textContent = `${item.flag} ABRIR GOOGLE TRADUTOR`;
  }
  return true;
}

export function installTranslator(root = document) {
  const main = root.querySelector?.('#app-main');
  if (!main) return false;

  const enhance = () => {
    const target = targetForDocument(root);
    let card = main.querySelector('[data-translator-card]');
    if (!card) {
      const cards = [...main.querySelectorAll('.more-card')];
      const firstLanguageCard = cards.find((candidate) => ['Croata','Húngaro','Esloveno'].includes(candidate.querySelector('h3')?.textContent?.trim()));
      if (firstLanguageCard) {
        firstLanguageCard.insertAdjacentHTML('beforebegin', translatorMarkup(target));
        card = main.querySelector('[data-translator-card]');
      }
    }
    if (card) updateTranslatorCard(card, target);
  };

  enhance();
  const observer = new MutationObserver(enhance);
  observer.observe(main, { childList:true, subtree:true });
  const refresh = globalThis.setInterval?.(enhance, 60_000);
  globalThis.addEventListener?.('pagehide', () => {
    observer.disconnect();
    if (refresh) clearInterval(refresh);
  }, { once:true });
  return true;
}

if (typeof document !== 'undefined') {
  const boot = () => installTranslator(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
}
