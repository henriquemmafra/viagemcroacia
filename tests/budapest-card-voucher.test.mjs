import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { walletItems, tripDays } from '../js/trip-data.js';

const qrUrl = new URL('../assets/tickets/budapest-card-voucher-qr.png', import.meta.url);

function event(date, title) {
  return tripDays.find((day) => day.date === date)?.events.find((item) => item.title.includes(title));
}

test('stores the exact QR image extracted from the original Tiqets voucher', async () => {
  assert.equal(existsSync(qrUrl), true, 'original Budapest Card QR asset is missing');
  const bytes = await readFile(qrUrl);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), 'aed37ab08d4ac12491406a92d6e1b56abf44380a4970dc9260745309e35164ca');
});

test('wallet explains that one original voucher QR is used to collect both physical 72h cards', () => {
  const item = walletItems.find((entry) => entry.id === 'budapest-card-voucher');
  assert.ok(item);
  assert.equal(item.category, 'Passes');
  assert.equal(item.codeAsset, 'assets/tickets/budapest-card-voucher-qr.png');
  assert.match(item.subtitle, /2 × 72h/i);
  assert.match(item.note, /retirar os 2 cartões físicos/i);
  assert.match(item.note, /não é o cartão físico/i);
});

test('arrival itinerary prioritizes collecting and activating the Budapest Card at Király u. 13', () => {
  const pickup = event('2026-09-09', 'Retirar + ativar Budapest Card');
  assert.ok(pickup);
  assert.equal(pickup.ticketId, 'budapest-card-voucher');
  assert.match(pickup.location?.destination || '', /Király u\. 13/i);
  assert.match(pickup.note || '', /data.*hora.*passaporte/i);
  assert.match(pickup.perrengue || '', /confirmar.*frontoffice@hungariagroup\.com/i);
});

test('refreshes the installed PWA cache for the new offline voucher QR', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(worker, /adriatico-2026-v27-budapest-card/);
  assert.match(worker, /\.\/assets\/tickets\/budapest-card-voucher-qr\.png/);
});
