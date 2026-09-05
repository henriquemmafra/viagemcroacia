import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('loads and precaches the contextual day tools with a fresh cache version', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(index, /js\/day-tools\.js/);
  assert.match(worker, /\.\/js\/day-tools\.js/);
  assert.match(worker, /adriatico-2026-v12/);
});
