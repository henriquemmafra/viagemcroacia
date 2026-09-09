import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('moves language tools into a dedicated bottom navigation tab', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../css/languages-tab.css', import.meta.url), 'utf8');
  const moduleSource = await readFile(new URL('../js/languages-tab.js', import.meta.url), 'utf8');

  const navTabs = [...index.matchAll(/data-tab="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(navTabs, ['today', 'route', 'wallet', 'languages', 'more']);
  assert.match(index, /data-tab="languages"[^>]*>[\s\S]*?<b>LÍNGUAS<\/b>/);
  assert.match(index, /css\/languages-tab\.css/);
  assert.match(index, /js\/languages-tab\.js/);
  assert.match(css, /\.bottom-nav\{[^}]*grid-template-columns:repeat\(5,1fr\)/);

  assert.match(moduleSource, /function languagesPageMarkup|export function languagesPageMarkup/);
  assert.match(moduleSource, /Object\.entries\(phrases\)/);
  assert.match(moduleSource, /translatorMarkup/);
  assert.match(moduleSource, /stripLanguagesFromMore/);
});

test('language page renders translator plus all three phrase groups', async () => {
  const { languagesPageMarkup } = await import('../js/languages-tab.js');
  const html = languagesPageMarkup('hu');
  assert.match(html, /<h1>Línguas<\/h1>/);
  assert.match(html, /🇭🇺 Húngaro/);
  assert.match(html, /<h3>Croata<\/h3>/);
  assert.match(html, /<h3>Húngaro<\/h3>/);
  assert.match(html, /<h3>Esloveno<\/h3>/);
  assert.match(html, /ABRIR GOOGLE TRADUTOR/);
});

test('refreshes the PWA cache and precaches the dedicated languages tab assets', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(worker, /adriatico-2026-v28/);
  assert.match(worker, /\.\/js\/languages-tab\.js/);
  assert.match(worker, /\.\/css\/languages-tab\.css/);
});
