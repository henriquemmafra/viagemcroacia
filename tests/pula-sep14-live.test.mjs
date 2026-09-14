import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays2 } from '../js/trip-days-2.js';
import { walletItems } from '../js/trip-data.js';

let patchError = null;
try {
  await import('../js/pula-sep14-live-patch.js');
} catch (error) {
  patchError = error;
}

const pulaDay = () => tripDays2.find((item) => item.date === '2026-09-14');

test('14 Sep live Pula patch exists and replaces the obsolete Kamenjak plan', () => {
  assert.equal(patchError, null, `live Pula patch failed to load: ${patchError?.message || patchError}`);
  const day = pulaDay();
  assert.ok(day, 'missing 14 Sep itinerary');
  assert.equal(day.datasetPatch, 'pula-sep14-live-v1');
  assert.match(day.title, /Pula romana/i);
  assert.equal(day.events.some((event) => /Kamenjak/i.test(event.title)), false);
});

test('timeline resumes from leaving the Arena at 11:34 and follows a logical walking route', () => {
  assert.equal(patchError, null, `live Pula patch failed to load: ${patchError?.message || patchError}`);
  const events = pulaDay().events;
  const arena = events.find((event) => /Arena de Pula/i.test(event.title));
  const walk = events.find((event) => /Twin Gates.*Zerostrasse|Zerostrasse.*Twin Gates/i.test(event.title));
  const zero = events.find((event) => /Zerostrasse.*Kaštel|Kaštel.*Zerostrasse/i.test(event.title));
  const temple = events.find((event) => /Templo de Augusto/i.test(event.title));
  const arch = events.find((event) => /Arco dos Sérgios/i.test(event.title));

  assert.equal(arena?.end, '11:34');
  assert.equal(walk?.time, '11:35');
  assert.equal(zero?.time, '11:50');
  assert.equal(temple?.time, '13:10');
  assert.equal(arch?.time, '13:40');
});

test('the return bus is explicitly to-book from Arriva without inventing a departure time', () => {
  assert.equal(patchError, null, `live Pula patch failed to load: ${patchError?.message || patchError}`);
  const day = pulaDay();
  const buy = day.events.find((event) => /ônibus.*Pula.*Rovinj|Pula.*Rovinj.*ônibus/i.test(event.title));
  assert.ok(buy, 'missing return-bus purchase action');
  assert.equal(buy.time, '');
  assert.equal(buy.status, 'to-book');
  assert.equal(buy.buyUrl, 'https://www.arriva.com.hr/hr-hr/bus-pula-rovinj');
  assert.match(buy.note || '', /escolher.*horário|sem.*horário/i);

  assert.equal(walletItems.some((item) => item.id === 'bus-rovinj-pula'), false);
  const item = walletItems.find((entry) => entry.id === 'bus-pula-rovinj');
  assert.ok(item, 'missing Pula → Rovinj item in wallet');
  assert.equal(item.status, 'to-book');
  assert.equal(item.bookingUrl, 'https://www.arriva.com.hr/hr-hr/bus-pula-rovinj');
});

test('page and offline cache load the live Pula patch', async () => {
  const [index, worker] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../service-worker.js', import.meta.url), 'utf8')
  ]);
  assert.match(index, /js\/pula-sep14-live-patch\.js/);
  assert.match(worker, /\.\/js\/pula-sep14-live-patch\.js/);
  assert.match(worker, /adriatico-2026-v29/);
});
