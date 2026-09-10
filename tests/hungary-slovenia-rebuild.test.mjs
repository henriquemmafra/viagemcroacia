import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays1 } from '../js/trip-days-1.js';
import '../js/budapest-sep10-patch.js';
import { tripDays2 } from '../js/trip-days-2.js';

const titles = (day) => day.events.map((event) => event.title);
const ordered = (actual, expected) => {
  let cursor = -1;
  for (const title of expected) {
    const index = actual.findIndex((item, i) => i > cursor && item.includes(title));
    assert.ok(index > cursor, `expected ${title} after position ${cursor}; got ${actual.join(' | ')}`);
    cursor = index;
  }
};
const read = async (path) => { try { return await readFile(new URL(path, import.meta.url), 'utf8'); } catch { return ''; } };

test('Budapest arrival evening activates the card first and prioritizes the confirmed cruise with safe boarding margin', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-09');
  ordered(titles(day), ['Check-in rápido Up Hotel Budapest','Sair do hotel · Budapest Card','Retirar + ativar Budapest Card','Gozsdu + Jewish Quarter','Sair para Dock Zero','ESTAR no Dock Zero','Cruzeiro no Danúbio','New York Café','Szimpla Kert']);
});

test('Budapest Sep 10 follows the approved geographic route and protects the Basilica concert', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-10');
  ordered(titles(day), ['New York Café','Shoes on the Danube','Parlamento','Basílica de Santo Estêvão','Váci utca','Hungarian National Museum','Chain Bridge','Buda Castle','Hungarian National Gallery','St. Stephen’s Hall','Matthias Church','Fisherman’s Bastion','Budapest Wine Festival','Citadella','ESTAR na Basílica','Concerto de órgão']);
  const concert = day.events.find((event) => event.title.includes('Concerto de órgão'));
  assert.equal(concert?.time, '20:00');
  assert.equal(concert?.ticketId, 'basilica-organ-concert');
  assert.equal(concert?.status, 'confirmed');
  assert.match(day.alerts.join(' '), /Wine Festival/i);
  assert.match(day.alerts.join(' '), /19h20/);
});

test('Ljubljana arrival day forms a continuous castle-to-river walking route', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-11');
  ordered(titles(day), ['Open Kitchen','Dragon Bridge','Ljubljana Castle','St Nicholas Cathedral','Town Hall','Cobblers’ Bridge','National & University Library','Križanke','Congress Square','Triple Bridge','Ljubljanica']);
});

test('Bled day continues from Vintgar around the lake without backtracking', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-12');
  ordered(titles(day), ['Vintgar Gorge','Bled Castle','kremšnita','Mlino','Pletna','Velika Zaka','Ojstrica','Jantar em Bled','Bled → Ljubljana']);
});

test('Postojna day uses the morning gap for Vivarium or EXPO before Predjama and the cave', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-13');
  ordered(titles(day), ['Postojna','Vivarium / EXPO Cave Karst','Predjama','Postojna Cave','Postojna → Koper','Koper → Rovinj']);
});

test('major attractions expose an official info link beside Uber, Maps and Waze', async () => {
  const events = [...tripDays1, ...tripDays2].filter((day) => day.date >= '2026-09-09' && day.date <= '2026-09-13').flatMap((day) => day.events);
  const attractionTitles = ['New York Café','Fisherman’s Bastion','Basílica de Santo Estêvão','Open Kitchen','Ljubljana Castle','Vintgar Gorge','Bled Castle','Ojstrica','Predjama','Postojna Cave'];
  for (const title of attractionTitles) {
    const event = events.find((item) => item.title === title) || events.find((item) => item.title.includes(title));
    assert.ok(event, `missing attraction ${title}`);
    assert.match(event.infoUrl || '', /^https:\/\//, `${title} should have an official infoUrl`);
  }
  const index = await read('../index.html');
  const moduleSource = await read('../js/attraction-info.js');
  assert.match(index, /js\/attraction-info\.js/);
  assert.match(moduleSource, /tl-btn info/);
  assert.match(moduleSource, /ⓘ Sobre/);
  assert.match(moduleSource, /\.tl-nav/);
});

test('refreshes the PWA cache for the rebuilt itinerary and info actions', async () => {
  const worker = await read('../service-worker.js');
  assert.match(worker, /adriatico-2026-v29/);
  assert.match(worker, /\.\/js\/attraction-info\.js/);
});
