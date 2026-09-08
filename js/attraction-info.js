import { tripDays } from './trip-data.js';

const attractionEvents = tripDays
  .flatMap((day) => day.events || [])
  .filter((event) => event.infoUrl);

function eventForCard(card) {
  const heading = card?.querySelector?.('h3')?.textContent || '';
  if (!heading) return null;
  return attractionEvents.find((event) => heading.includes(event.title)) || null;
}

export function enhanceAttractionInfo(root = document) {
  const main = root.querySelector?.('#app-main') || root;
  if (!main?.querySelectorAll) return 0;
  let added = 0;

  main.querySelectorAll('.tl-card').forEach((card) => {
    const nav = card.querySelector('.tl-nav');
    if (!nav || nav.querySelector('.tl-btn.info')) return;
    const event = eventForCard(card);
    if (!event?.infoUrl) return;

    const link = document.createElement('a');
    link.className = 'tl-btn info';
    link.href = event.infoUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'ⓘ Sobre';
    link.setAttribute('aria-label', `Sobre ${event.title}: resumo e fotos`);
    nav.append(link);
    added += 1;
  });

  return added;
}

function boot() {
  const main = document.querySelector('#app-main');
  if (!main) return;
  enhanceAttractionInfo(main);
  const observer = new MutationObserver(() => enhanceAttractionInfo(main));
  observer.observe(main, { childList:true, subtree:true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
else boot();
