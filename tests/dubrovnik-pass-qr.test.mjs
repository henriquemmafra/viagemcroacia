import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
  catch { return ''; }
}

test('uses the official Dubrovnik Pass QR payloads for Henrique and Cibele', async () => {
  const data = await read('../js/trip-data.js');
  const henrique = await read('../assets/tickets/dubrovnik-pass-henrique.svg');
  const cibele = await read('../assets/tickets/dubrovnik-pass-cibele.svg');

  assert.match(data, /dubrovnik-pass-henrique\.svg/);
  assert.match(data, /dubrovnik-pass-cibele\.svg/);
  assert.doesNotMatch(data, /dubrovnik-pass-henrique\.png/);
  assert.doesNotMatch(data, /dubrovnik-pass-cibele\.png/);

  assert.match(henrique, /c0572227-7ff7-41b9-8177-35aca3f55fc3/);
  assert.match(cibele, /e5f52e1e-3e4d-4a4d-8976-561dfdd38f3c/);
});

test('refreshes the PWA cache and precaches the official Dubrovnik Pass QRs', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v22/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-henrique\.svg/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-cibele\.svg/);
});
