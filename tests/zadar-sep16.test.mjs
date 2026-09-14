import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const patchPath = resolve(root, 'js/zadar-sep16-patch.js');

test('Sep 16 is replaced by the confirmed Rovinj → Pula → Zadar day', async () => {
  assert.equal(existsSync(patchPath), true, 'zadar-sep16 patch must exist');

  const { tripDays, walletItems, hotels, routeOverview } = await import('../js/trip-data.js');
  await import('../js/zadar-sep16-patch.js');

  const day = tripDays.find((item) => item.date === '2026-09-16');
  assert.equal(day.city, 'Rovinj → Pula → Zadar');
  assert.match(day.title, /Zadar/);

  const titles = day.events.map((event) => event.title);
  assert.deepEqual(titles.slice(0, 5), [
    'Checkout Charmy Rovinj',
    'Ônibus Rovinj → Pula',
    'Transfer curto → porto de Pula',
    'Embarque Krilo Lux',
    'Ferry Pula → Zadar'
  ]);
  assert.equal(day.events.find((event) => event.title === 'Ônibus Rovinj → Pula').time, '04:40');
  assert.equal(day.events.find((event) => event.title === 'Ferry Pula → Zadar').time, '07:00');
  assert.equal(day.events.find((event) => event.title === 'Ferry Pula → Zadar').end, '11:45');
  assert.ok(titles.includes('Almoço primeiro · Old Town'));
  assert.ok(titles.includes('Fórum Romano + São Donato'));
  assert.ok(titles.includes('Catedral de Santa Anastásia + campanário'));
  assert.ok(titles.includes('Museu do Vidro Antigo · opcional'));
  assert.ok(titles.includes('Portão de Terraferma + Foša'));
  assert.ok(titles.includes('Órgão do Mar · chegar antes do pôr do sol'));
  assert.ok(titles.includes('Saudação ao Sol'));
  assert.ok(titles.includes('Jantar · Konoba Dalmatina'));

  const museum = day.events.find((event) => event.title === 'Museu do Vidro Antigo · opcional');
  assert.equal(museum.status, 'optional');
  assert.match(museum.note, /21:00/);
  assert.match(museum.note, /€7/);

  const hotel = hotels.find((item) => item.id === 'hotel-zadar-old-town');
  assert.equal(hotel.confirmation, '6766053082');
  assert.equal(hotel.destination, '4 Ulica Ilije Smiljanića, 23000 Zadar, Croatia');
  assert.equal(hotels.some((item) => item.id === 'hotel-villa-prica'), false);

  assert.ok(walletItems.some((item) => item.id === 'bus-rovinj-pula-sep16' && item.status === 'confirmed'));
  assert.ok(walletItems.some((item) => item.id === 'ferry-pula-zadar-sep16' && item.status === 'confirmed'));
  assert.ok(walletItems.some((item) => item.id === 'hotel-zadar-old-town-booking' && item.status === 'confirmed'));

  assert.equal(routeOverview.some((item) => item.city.includes('Rastoke + Plitvice') && item.dates === '16–17 set'), false);
  assert.ok(routeOverview.some((item) => item.city === 'Zadar' && item.dates === '16–17 set'));
});

test('the Zadar patch is wired into the page before the main app', () => {
  const index = readFileSync(resolve(root, 'index.html'), 'utf8');
  const patchIndex = index.indexOf('js/zadar-sep16-patch.js');
  const appIndex = index.indexOf('js/app.js');
  assert.ok(patchIndex >= 0, 'index.html must load the Zadar patch');
  assert.ok(patchIndex < appIndex, 'Zadar patch must run before app.js');
});

test('the Zadar patch is available offline through the service worker', () => {
  const serviceWorker = readFileSync(resolve(root, 'service-worker.js'), 'utf8');
  assert.match(serviceWorker, /js\/zadar-sep16-patch\.js/);
});
