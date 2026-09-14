import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../js/core.js';
import { tripDays2 } from '../js/trip-days-2.js';
import '../js/pula-sep14-live-patch.js';

test('builds one quick-access item per ticket group and highlights the next ticket event', () => {
  assert.equal(typeof core.getDayQuickAccessItems, 'function');
  const boarding = { id:'wizz-h', groupId:'wizz', groupTitle:'Wizz Air · DBV → BUD', category:'Voos', codeAsset:'qr-h' };
  const boarding2 = { id:'wizz-c', groupId:'wizz', groupTitle:'Wizz Air · DBV → BUD', category:'Voos', codeAsset:'qr-c' };
  const day = { events:[
    { time:'09:00', title:'Passeio' },
    { time:'13:00', title:'Aeroporto', ticketId:'wizz-h' },
    { time:'14:10', title:'Voo', ticketId:'wizz-h' }
  ]};
  const items = core.getDayQuickAccessItems(day, [boarding, boarding2], { next:day.events[1] });
  assert.deepEqual(items, [{
    ticketId:'wizz-h', groupKey:'wizz', title:'Wizz Air · DBV → BUD', category:'Voos', time:'13:00', count:2, emphasis:'next'
  }]);
});

test('ignores event ticket ids that have no QR or ticket asset', () => {
  assert.equal(typeof core.getDayQuickAccessItems, 'function');
  const day = { events:[{ time:'20:00', title:'Hotel', ticketId:'hotel-x' }] };
  const items = core.getDayQuickAccessItems(day, [{ id:'hotel-x', title:'Hotel', category:'Hotéis' }], {});
  assert.deepEqual(items, []);
});

test('defines the requested 40 percent weather-card reduction scale', () => {
  assert.equal(core.WEATHER_CARD_SCALE, 0.6);
});

test('formats a compact boarding-pass quick-access label', () => {
  assert.equal(typeof core.formatDayQuickAccessLabel, 'function');
  assert.equal(core.formatDayQuickAccessLabel({ category:'Voos', time:'13:00', title:'Wizz Air · DBV → BUD', count:2 }), '✈️ 13:00 · Wizz Air · DBV → BUD · 2 códigos');
});

test('renders quick-access buttons with current/next emphasis and ticket ids', () => {
  assert.equal(typeof core.renderDayQuickAccessMarkup, 'function');
  const html = core.renderDayQuickAccessMarkup([{ ticketId:'wizz-h', title:'Wizz Air · DBV → BUD', category:'Voos', time:'13:00', count:2, emphasis:'next' }]);
  assert.match(html, /data-quick-ticket="wizz-h"/);
  assert.match(html, /day-ticket-button is-next/);
  assert.match(html, /BOARDING/);
  assert.match(html, /2 códigos/);
});

test('keeps a grouped boarding pass highlighted when a later event using the same ticket is current', () => {
  const boarding = { id:'wizz-h', groupId:'wizz', groupTitle:'Wizz Air · DBV → BUD', category:'Voos', codeAsset:'qr-h' };
  const day = { events:[
    { time:'13:00', title:'Aeroporto', ticketId:'wizz-h' },
    { time:'14:10', title:'Voo', ticketId:'wizz-h' }
  ]};
  const items = core.getDayQuickAccessItems(day, [boarding], { current:day.events[1] });
  assert.equal(items[0].emphasis, 'current');
  assert.equal(items[0].time, '14:10');
});

test('Sep 14 Pula route follows the approved live plan and removes Kamenjak', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-14');
  assert.ok(day, 'Sep 14 day must exist');
  assert.equal(day.datasetPatch, 'pula-sep14-live-v1');
  const titles = day.events.map((event) => event.title).join(' | ');
  assert.match(titles, /Arena de Pula/);
  assert.match(titles, /Twin Gates/);
  assert.match(titles, /Zerostrasse/);
  assert.match(titles, /Kaštel/);
  assert.match(titles, /Templo de Augusto/);
  assert.doesNotMatch(titles, /Kamenjak/i);
  const returnBus = day.events.find((event) => /Pula → Rovinj/.test(event.title));
  assert.ok(returnBus, 'return bus action must exist');
  assert.equal(returnBus.time, '', 'return bus must not impose a fixed departure time');
  assert.match(returnBus.buyUrl ?? '', /arriva\.com\.hr/);
});