import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('moves language tools into a dedicated bottom navigation tab', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const app = await readFile(new URL('../js/app.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');

  const navTabs = [...index.matchAll(/data-tab="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(navTabs, ['today', 'route', 'wallet', 'languages', 'more']);
  assert.match(index, /data-tab="languages"[^>]*>[\s\S]*?<b>LÍNGUAS<\/b>/);
  assert.match(css, /\.bottom-nav\{[^}]*grid-template-columns:repeat\(5,1fr\)/);

  assert.match(app, /function renderLanguages\(\)/);
  assert.match(app, /state\.tab === 'languages'\) renderLanguages\(\)/);

  const languagesBlock = app.match(/function renderLanguages\(\) \{([\s\S]*?)\n\}\nfunction renderMore\(\)/)?.[1] || '';
  const moreBlock = app.match(/function renderMore\(\) \{([\s\S]*?)\n\}\nfunction render\(\)/)?.[1] || '';
  assert.match(languagesBlock, /Object\.entries\(phrases\)/);
  assert.match(languagesBlock, /Línguas/);
  assert.doesNotMatch(moreBlock, /Object\.entries\(phrases\)/);
});

test('refreshes the PWA cache for the dedicated languages tab', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(worker, /adriatico-2026-v21/);
});
