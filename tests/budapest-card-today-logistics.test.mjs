import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays1 } from '../js/trip-days-1.js';
import { walletItems } from '../js/trip-data.js';

const day = (date) => tripDays1.find((item) => item.date === date);
const eventBy = (date, text) => day(date)?.events.find((item) => item.title.includes(text));

test('9 September leaves the hotel at 16:30, activates Budapest Card first, then reaches Dock Zero very early', () => {
  const sep9 = day('2026-09-09');
  assert.ok(sep9);

  const leaveHotel = eventBy('2026-09-09', 'Sair do hotel · Budapest Card');
  const card = eventBy('2026-09-09', 'Retirar + ativar Budapest Card');
  const quarter = eventBy('2026-09-09', 'Gozsdu + Jewish Quarter');
  const leaveDock = eventBy('2026-09-09', 'Sair para Dock Zero');
  const dock = eventBy('2026-09-09', 'ESTAR no Dock Zero');
  const cruise = eventBy('2026-09-09', 'Cruzeiro no Danúbio');

  assert.equal(leaveHotel?.time, '16:30');
  assert.equal(card?.time, '16:45');
  assert.equal(card?.ticketId, 'budapest-card-voucher');
  assert.match(card?.location?.destination || '', /Király u\. 13/i);
  assert.match(card?.note || '', /data.*hora.*passaporte/i);
  assert.match(card?.perrengue || '', /frontoffice@hungariagroup\.com/i);
  assert.equal(quarter?.time, '17:05');
  assert.equal(leaveDock?.time, '17:40');
  assert.equal(dock?.time, '18:20');
  assert.equal(cruise?.time, '19:15');
});

test('wallet keeps the Budapest Card collection voucher offline for both physical 72h cards', () => {
  const item = walletItems.find((entry) => entry.id === 'budapest-card-voucher');
  assert.ok(item);
  assert.equal(item.category, 'Passes');
  assert.match(item.subtitle, /2 × 72h/i);
  assert.equal(item.locator, '111665639');
  assert.match(item.codeAsset || '', /^data:image\/png;base64,/);
  assert.match(item.note || '', /retirar os 2 cartões físicos/i);
  assert.match(item.note || '', /não é o cartão físico/i);
});

test('10 September keeps the organ concert protected and points QR access to Apple Wallet', () => {
  const meet = eventBy('2026-09-10', 'ESTAR na Basílica · concerto');
  const concert = eventBy('2026-09-10', 'Concerto de órgão');
  const item = walletItems.find((entry) => entry.id === 'basilica-organ-concert');

  assert.equal(meet?.time, '19:20');
  assert.equal(concert?.time, '20:00');
  assert.equal(concert?.bookingUrl, 'https://gyg.me/RqH55aso');
  assert.equal(item?.locator, '439041269');
  assert.equal(item?.codeAsset, undefined);
  assert.match(item?.note || '', /Apple Wallet/i);
  assert.ok(day('2026-09-10')?.bring.some((entry) => /Apple Wallet/i.test(entry)));
});

test('refreshes the PWA cache for the revised Budapest arrival evening', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(worker, /adriatico-2026-v29/);
});
