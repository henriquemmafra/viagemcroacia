import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('loads and precaches contextual day tools and September calendar with cache v13', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(index, /js\/day-tools\.js/);
  assert.match(index, /js\/month-calendar\.js/);
  assert.match(worker, /\.\/js\/day-tools\.js/);
  assert.match(worker, /\.\/js\/month-calendar-model\.js/);
  assert.match(worker, /\.\/js\/month-calendar\.js/);
  assert.match(worker, /adriatico-2026-v13/);
});
