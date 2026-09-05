import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../js/core.js';

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
