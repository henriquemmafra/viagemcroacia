export function navigationLabel(kind, current = '') {
  if (kind === 'maps') return '📍 Maps';
  if (kind === 'waze') return '🧭 Waze';
  if (kind === 'uber') return 'Uber';
  return current;
}

function kindForLink(link) {
  const href = String(link?.getAttribute?.('href') || '').toLowerCase();
  const cls = link?.classList;
  const text = String(link?.textContent || '').trim().toLowerCase();
  if (cls?.contains('maps') || href.includes('google.com/maps') || text === 'maps') return 'maps';
  if (cls?.contains('waze') || href.includes('waze.com') || text === 'waze') return 'waze';
  if (cls?.contains('uber') || href.includes('uber.com') || text === 'uber') return 'uber';
  return null;
}

export function enhanceNavigationLabels(root = document) {
  const links = root.querySelectorAll?.('.tl-nav a, .hotel-actions a') || [];
  links.forEach((link) => {
    const kind = kindForLink(link);
    if (!kind || kind === 'uber') return;
    const label = navigationLabel(kind, link.textContent.trim());
    if (link.textContent !== label) link.textContent = label;
    link.setAttribute('aria-label', kind === 'maps' ? 'Abrir no Google Maps' : 'Abrir no Waze');
  });
}

function boot(root = document) {
  const main = root.querySelector?.('#app-main');
  if (!main) return;
  enhanceNavigationLabels(main);
  const observer = new MutationObserver(() => enhanceNavigationLabels(main));
  observer.observe(main, { childList:true, subtree:true });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot(document), { once:true });
  else boot(document);
}
