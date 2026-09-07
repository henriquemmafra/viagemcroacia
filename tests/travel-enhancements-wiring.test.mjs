import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
  catch { return ''; }
}

test('index loads translator styling, translator module and nav icon module', async () => {
  const index = await read('../index.html');
  assert.match(index, /css\/translator\.css/);
  assert.match(index, /js\/translator\.js/);
  assert.match(index, /js\/nav-icons\.js/);
  assert.match(index, /name="adriatico-translator-endpoint"/);
});

test('PWA cache refreshes and precaches new travel enhancement assets', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v15/);
  assert.match(worker, /\.\/css\/translator\.css/);
  assert.match(worker, /\.\/js\/translator\.js/);
  assert.match(worker, /\.\/js\/nav-icons\.js/);
});

test('translator stylesheet includes touch-friendly target and action controls', async () => {
  const css = await read('../css/translator.css');
  assert.match(css, /\.translator-targets/);
  assert.match(css, /grid-template-columns:repeat\(3,1fr\)/);
  assert.match(css, /min-height:44px/);
  assert.match(css, /\.translator-google-badge/);
});
