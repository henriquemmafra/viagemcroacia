import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays1 } from '../js/trip-days-1.js';
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

test('Budapest arrival evening is full and geographically grouped', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-09');
  ordered(titles(day), [
    'Check-in Up Hotel Budapest',
    'New York Café',
    'Grande Sinagoga',
    'Jewish Quarter',
    'Szimpla Kert',
    'Gozsdu Udvar',
    'Cruzeiro noturno no Danúbio'
  ]);
});

test('Budapest full day flows from Buda through central Pest to City Park', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-10');
  ordered(titles(day), [
    'Fisherman’s Bastion',
    'Matthias Church',
    'Buda Castle',
    'Chain Bridge',
    'Shoes on the Danube',
    'Parlamento',
    'St Stephen’s Basilica',
    'Grande Sinagoga',
    'Heroes’ Square',
    'Széchenyi Thermal Bath'
  ]);
});

test('Ljubljana arrival day forms a continuous castle-to-river walking route', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-11');
  ordered(titles(day), [
    'Open Kitchen',
    'Dragon Bridge',
    'Ljubljana Castle',
    'St Nicholas Cathedral',
    'Town Hall',
    'Cobblers’ Bridge',
    'National & University Library',
    'Križanke',
    'Congress Square',
    'Triple Bridge',
    'Ljubljanica'
  ]);
});

test('Bled day continues from Vintgar around the lake without backtracking', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-12');
  ordered(titles(day), [
    'Vintgar Gorge',
    'Bled Castle',
    'kremšnita',
    'Mlino',
    'Pletna',
    'Velika Zaka',
    'Ojstrica',
    'Jantar em Bled',
    'Bled → Ljubljana'
  ]);
});

test('Postojna day uses the morning gap for Vivarium or EXPO before Predjama and the cave', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-13');
  ordered(titles(day), [
    'Postojna',
    'Vivarium / EXPO Cave Karst',
    'Predjama',
    'Postojna Cave',
    'Postojna → Koper',
    'Koper → Rovinj'
  ]);
});

test('major attractions expose an official info link beside Uber, Maps and Waze', async () => {
  const days = [...tripDays1, ...tripDays2].filter((day) => day.date >= '2026-09-09' && day.date <= '2026-09-13');
  const attractionTitles = [
    'New York Café','Fisherman’s Bastion','Matthias Church','Széchenyi Thermal Bath',
    'Open Kitchen','Ljubljana Castle','Vintgar Gorge','Bled Castle','Ojstrica','Predjama','Postojna Cave'
  ];
  for (const title of attractionTitles) {
    const event = days.flatMap((day) => day.events).find((item) => item.title.includes(title));
    assert.ok(event, `missing attraction ${title}`);
    assert.match(event.infoUrl || '', /^https:\/\//, `${title} should have an official infoUrl`);
  }

  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const moduleSource = await readFile(new URL('../js/attraction-info.js', import.meta.url), 'utf8');
  assert.match(index, /js\/attraction-info\.js/);
  assert.match(moduleSource, /tl-btn info/);
  assert.match(moduleSource, /ⓘ Sobre/);
  assert.match(moduleSource, /\.tl-nav/);
});

test('refreshes the PWA cache for the rebuilt itinerary and info actions', async () => {
  const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
  assert.match(worker, /adriatico-2026-v26/);
  assert.match(worker, /\.\/js\/attraction-info\.js/);
});
