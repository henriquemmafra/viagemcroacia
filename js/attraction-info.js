import { tripDays } from './trip-data.js';

const attractionEvents = tripDays
  .flatMap((day) => day.events || [])
  .filter((event) => event.infoUrl || event.buyUrl);

function eventForCard(card) {
  const heading = card?.querySelector?.('h3')?.textContent || '';
  if (!heading) return null;
  return attractionEvents.find((event) => heading.includes(event.title)) || null;
}

function externalLink(className, href, text, ariaLabel) {
  const link = document.createElement('a');
  link.className = className;
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = text;
  link.setAttribute('aria-label', ariaLabel);
  return link;
}

function updateRouteCopy(main) {
  const paragraph = main?.querySelector?.('.page-header p');
  if (!paragraph) return false;
  const next = 'A viagem inteira em uma linha: ônibus, ferry, táxi e transfers — sem aluguel de carro.';
  if (paragraph.textContent === next) return false;
  if (!paragraph.textContent?.includes('carro só a partir de Pula')) return false;
  paragraph.textContent = next;
  return true;
}

export function enhanceAttractionInfo(root = document) {
  const main = root.querySelector?.('#app-main') || root;
  if (!main?.querySelectorAll) return 0;
  let added = updateRouteCopy(main) ? 1 : 0;

  main.querySelectorAll('.tl-card').forEach((card) => {
    const nav = card.querySelector('.tl-nav');
    if (!nav) return;
    const event = eventForCard(card);
    if (!event) return;

    if (event.infoUrl && !nav.querySelector('.tl-btn.info')) {
      nav.append(externalLink(
        'tl-btn info',
        event.infoUrl,
        'ⓘ Sobre',
        `Sobre ${event.title}: resumo e fotos`
      ));
      added += 1;
    }

    if (event.buyUrl && !event.ticketId && !nav.querySelector('.tl-btn.ticket-link')) {
      nav.append(externalLink(
        'tl-btn ticket-link qr',
        event.buyUrl,
        '🎟️ Ingresso',
        `Comprar ingresso para ${event.title}`
      ));
      added += 1;
    }
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
