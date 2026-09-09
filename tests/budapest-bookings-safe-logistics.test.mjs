import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays1 } from '../js/trip-days-1.js';
import { walletItems } from '../js/trip-data.js';

const titles = (day) => day.events.map((event) => event.title);
const ordered = (actual, expected) => {
  let cursor = -1;
  for (const title of expected) {
    const index = actual.findIndex((item, i) => i > cursor && item.includes(title));
    assert.ok(index > cursor, `expected ${title} after position ${cursor}; got ${actual.join(' | ')}`);
    cursor = index;
  }
};

const eventBy = (day, text) => day.events.find((event) => event.title.includes(text));

test('9 September reaches Dock Zero well before boarding and only resumes nightlife after the cruise', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-09');
  ordered(titles(day), [
    'Check-in Up Hotel Budapest',
    'New York Café',
    'Sair para Dock Zero',
    'ESTAR no Dock Zero',
    'Cruzeiro no Danúbio',
    'Gozsdu Udvar',
    'Szimpla Kert',
    'Voltar ao Up Hotel'
  ]);
  assert.equal(eventBy(day, 'ESTAR no Dock Zero').time, '18:45');
  assert.equal(eventBy(day, 'Cruzeiro no Danúbio').time, '19:15');
  assert.match(eventBy(day, 'Cruzeiro no Danúbio').location.destination, /Carl Lutz rkp/i);
  assert.equal(eventBy(day, 'Cruzeiro no Danúbio').bookingUrl, 'https://gyg.me/Wn4Sqie6');
});

test('10 September protects both booked meeting times with generous transit buffers', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-10');
  ordered(titles(day), [
    'Parlamento',
    'Shoes on the Danube',
    'Basílica de Santo Estêvão · Igreja + Panorâmico + Tesouro',
    'Grande Sinagoga',
    'SAIR da Sinagoga → Dísz tér',
    'ESTAR em Dísz tér 15',
    'Buda Castle Walks',
    'Fisherman’s Bastion',
    'Voltar ao hotel',
    'Jantar cedo perto da Basílica',
    'ESTAR na Basílica · concerto',
    'Concerto de órgão na Basílica',
    'Hotel · banho + malas prontas'
  ]);

  const castleMeet = eventBy(day, 'ESTAR em Dísz tér 15');
  const castleTour = eventBy(day, 'Buda Castle Walks');
  const concertMeet = eventBy(day, 'ESTAR na Basílica · concerto');
  const concert = eventBy(day, 'Concerto de órgão');

  assert.equal(castleMeet.time, '13:40');
  assert.equal(castleTour.time, '14:30');
  assert.match(castleMeet.location.destination, /Dísz tér 15/i);
  assert.equal(castleTour.bookingUrl, 'https://gyg.me/Ww3oPthA');
  assert.equal(concertMeet.time, '19:20');
  assert.equal(concert.time, '20:00');
  assert.equal(concert.bookingUrl, 'https://gyg.me/RqH55aso');
  assert.ok(!titles(day).some((title) => title.includes('Széchenyi Thermal Bath')), 'thermal bath must not be squeezed between fixed bookings');
});

test('confirmed Basilica entry is stored offline with its QR and booking code', async () => {
  const item = walletItems.find((entry) => entry.id === 'basilica-entry');
  assert.ok(item, 'missing Basilica entry wallet item');
  assert.equal(item.status, 'confirmed');
  assert.equal(item.locator, 'GYGKBR5RFY3N');
  assert.equal(item.codeAsset, 'assets/tickets/basilica-entry-qr.svg');
  const qr = await readFile(new URL('../assets/tickets/basilica-entry-qr.svg', import.meta.url), 'utf8');
  assert.match(qr, /<rect[^>]+fill="#fff"/i, 'offline QR needs an explicit white background so scanners can read it');
});

test('booking links render as reservation actions and the PWA pre-caches the Basilica QR', async () => {
  const attractionInfo = await readFile(new URL('../js/attraction-info.js', import.meta.url), 'utf8');
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(attractionInfo, /event\.bookingUrl/);
  assert.match(attractionInfo, /🎟️ Reserva/);
  assert.match(worker, /adriatico-2026-v28/);
  assert.match(worker, /assets\/tickets\/basilica-entry-qr\.svg/);
});
