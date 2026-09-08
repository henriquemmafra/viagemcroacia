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

  // Henrique: official QR payload c0572227-7ff7-41b9-8177-35aca3f55fc3
  assert.equal(await sha256('../assets/tickets/dubrovnik-pass-henrique.png'), '04e616fd1e0f44ad82e871968db3de091179e074ffd5709dcbf534a2f930ad32');
  // Cibele: official QR payload e5f52e1e-3e4d-4a4d-8976-561dfdd38f3c
  assert.equal(await sha256('../assets/tickets/dubrovnik-pass-cibele.png'), 'dda89e3b8e41cc3cf476a6c4e017d238960e3b0a5b732fba39aed1db218802c5');
});

test('refreshes the PWA cache while keeping both Dubrovnik Pass QR assets offline', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v26/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-henrique\.png/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-cibele\.png/);
});
