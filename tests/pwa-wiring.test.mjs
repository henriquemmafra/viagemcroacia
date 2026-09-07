import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('loads and precaches contextual day tools, live day and Google translator shortcut with cache v19', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(index, /js\/day-tools\.js/);
  assert.match(index, /js\/month-calendar\.js/);
  assert.match(index, /js\/live-day\.js/);
  assert.match(index, /js\/translator\.js/);
  assert.match(index, /css\/live-day\.css/);
  assert.match(worker, /\.\/js\/day-tools\.js/);
  assert.match(worker, /\.\/js\/month-calendar-model\.js/);
  assert.match(worker, /\.\/js\/month-calendar\.js/);
  assert.match(worker, /\.\/js\/live-day\.js/);
  assert.match(worker, /\.\/js\/translator\.js/);
  assert.match(worker, /\.\/css\/live-day\.css/);
  assert.doesNotMatch(worker, /conversation-audio/);
  assert.match(worker, /adriatico-2026-v19/);
});
