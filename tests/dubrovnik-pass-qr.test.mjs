import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
  catch { return ''; }
}

test('records the official Dubrovnik Pass QR payloads next to each pass', async () => {
  const data = await read('../js/trip-data.js');

  assert.match(data, /id:'dubrovnik-pass-henrique'[\s\S]*?codeAsset:'assets\/tickets\/dubrovnik-pass-henrique\.png'[\s\S]*?qrPayload:'c0572227-7ff7-41b9-8177-35aca3f55fc3'/);
  assert.match(data, /id:'dubrovnik-pass-cibele'[\s\S]*?codeAsset:'assets\/tickets\/dubrovnik-pass-cibele\.png'[\s\S]*?qrPayload:'e5f52e1e-3e4d-4a4d-8976-561dfdd38f3c'/);
});

test('refreshes the PWA cache while keeping both Dubrovnik Pass QR assets offline', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v22/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-henrique\.png/);
  assert.match(worker, /\.\/assets\/tickets\/dubrovnik-pass-cibele\.png/);
});
