import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays1 } from '../js/trip-days-1.js';
import { tripDays2 } from '../js/trip-days-2.js';
import { tripDays3 } from '../js/trip-days-3.js';
import { walletItems, routeOverview } from '../js/trip-data.js';

const allDays = [...tripDays1, ...tripDays2, ...tripDays3];
const event = (date, title) => allDays.find((day) => day.date === date)?.events.find((item) => item.title.includes(title));
const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('paid Hungary and Slovenia attractions expose direct purchase links', () => {
  const required = [
    ['2026-09-09', 'Cruzeiro noturno no Danúbio'],
    ['2026-09-10', 'Matthias Church'],
    ['2026-09-10', 'Parlamento'],
    ['2026-09-10', 'St Stephen’s Basilica'],
    ['2026-09-10', 'Grande Sinagoga'],
    ['2026-09-10', 'Széchenyi Thermal Bath'],
    ['2026-09-11', 'Ljubljana Castle'],
    ['2026-09-12', 'Bled Castle'],
    ['2026-09-13', 'Predjama Castle'],
    ['2026-09-13', 'Postojna Cave']
  ];
  for (const [date, title] of required) {
    const item = event(date, title);
    assert.ok(item, `missing ${date} ${title}`);
    assert.match(item.buyUrl || '', /^https:\/\//, `${title} should have a direct buyUrl`);
  }

  const vintgar = event('2026-09-12', 'Vintgar Gorge');
  assert.equal(vintgar?.ticketId, 'vintgar-henrique');
});

test('attraction action row adds an Ingresso button only when a buyUrl exists', async () => {
  const source = await read('../js/attraction-info.js');
  assert.match(source, /event\.buyUrl/);
  assert.match(source, /🎟️ Ingresso/);
  assert.match(source, /tl-btn ticket-link/);
  assert.match(source, /target = '_blank'/);
});

test('runtime itinerary no longer contains the cancelled SIXT rental-car plan', async () => {
  const runtime = [
    await read('../js/trip-days-2.js'),
    await read('../js/trip-days-3.js'),
    await read('../js/trip-data.js')
  ].join('\n');
  const enhancer = await read('../js/attraction-info.js');

  assert.doesNotMatch(runtime, /SIXT/i);
  assert.doesNotMatch(runtime, /sixt-pula-split/i);
  assert.doesNotMatch(runtime, /retirada do carro|devolver carro|documentos do carro|carro só a partir/i);
  assert.equal(walletItems.some((item) => item.category === 'Carro'), false);
  assert.equal(routeOverview.some((stop) => /SIXT|carro/i.test(`${stop.detail} ${stop.next}`)), false);
  assert.match(enhancer, /sem aluguel de carro/);
  assert.match(enhancer, /carro só a partir de Pula/);
});

test('Istria and Plitvice days stay usable without a rental car', () => {
  const sep14 = allDays.find((day) => day.date === '2026-09-14');
  const sep15 = allDays.find((day) => day.date === '2026-09-15');
  const sep16 = allDays.find((day) => day.date === '2026-09-16');
  const sep17 = allDays.find((day) => day.date === '2026-09-17');

  assert.ok(sep14.events.some((item) => /Ônibus Rovinj → Pula/.test(item.title)));
  assert.ok(sep14.events.some((item) => /Kamenjak/.test(item.title)));
  assert.ok(sep15.events.some((item) => /Motovun/.test(item.title)));
  assert.ok(sep15.events.some((item) => /Grožnjan/.test(item.title)));
  assert.ok(sep16.events.some((item) => /transfer/i.test(item.title) && /Rovinj/.test(item.title)));
  assert.ok(sep16.events.some((item) => /Rastoke/.test(item.title)));
  assert.ok(sep17.events.some((item) => /Ônibus Plitvice → Split/.test(item.title)));
});

test('refreshes the PWA cache after ticket-link and no-car changes', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v27/);
});
