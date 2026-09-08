import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

async function read(path) {
  try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
  catch { return ''; }
}

async function sha256(path) {
  const bytes = await readFile(new URL(path, import.meta.url));
  return createHash('sha256').update(bytes).digest('hex');
}

test('uses the verified official Dubrovnik Pass QR images', async () => {
  const data = await read('../js/trip-data.js');
  assert.match(data, /codeAsset:'assets\/tickets\/dubrovnik-pass-henrique\.png'/);
  assert.match(data, /codeAsset:'assets\/tickets\/dubrovnik-pass-cibele\.png'/);

  assert.equal(await sha256('../assets/tickets/dubrovnik-pass-henrique.png'), 'c5a5c57191f36d03f1a31ac7e9b10b61f9284f29726d06aee0fdb0e35a4aef72');
  assert.equal(await sha256('../assets/tickets/dubrovnik-pass-cibele.png'), '0392a417c39b99464308540d3c2b7bf521dcbfa20614f82a3f900e7e21698dbb');
});

test('refreshes the PWA cache while keeping both Dubrovnik Pass QR assets offline', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v24/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-henrique\.png/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-cibele\.png/);
});
