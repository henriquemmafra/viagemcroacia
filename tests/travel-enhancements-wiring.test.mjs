import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
  catch { return ''; }
}

test('index loads translator shortcut styling, module and nav icon module', async () => {
  const index = await read('../index.html');
  assert.match(index, /css\/translator\.css/);
  assert.match(index, /js\/translator\.js/);
  assert.match(index, /js\/nav-icons\.js/);
  assert.doesNotMatch(index, /adriatico-translator-endpoint/);
});

test('PWA cache refreshes and precaches travel enhancement assets', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v29/);
  assert.match(worker, /\.\/css\/translator\.css/);
  assert.match(worker, /\.\/js\/translator\.js/);
  assert.match(worker, /\.\/js\/nav-icons\.js/);
  assert.match(worker, /\.\/css\/live-day\.css/);
  assert.match(worker, /\.\/js\/live-day\.js/);
  assert.doesNotMatch(worker, /conversation-audio/);
});

test('translator stylesheet exposes one large touch-friendly Google shortcut', async () => {
  const css = await read('../css/translator.css');
  assert.match(css, /\.translator-open/);
  assert.match(css, /min-height:54px/);
  assert.doesNotMatch(css, /conversation-mic|translator-input|translator-targets/);
});
