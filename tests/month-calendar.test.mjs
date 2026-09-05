import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSeptemberCalendar,
  tripDayIndexForDate,
  FONT_SCALE
} from '../js/month-calendar-model.js';

const tripDays = Array.from({ length: 15 }, (_, i) => ({
  date: `2026-09-${String(i + 7).padStart(2, '0')}`,
  city: ['Dubrovnik','Budapest','Ljubljana','Bled','Rovinj','Pula','Kamenjak','Plitvice','Split'][Math.min(i, 8)]
}));

const ticketDates = new Map([
  ['2026-09-09', ['✈️']],
  ['2026-09-12', ['🎟️']]
]);

test('September 2026 calendar starts on Tuesday and includes all 30 days', () => {
  const cells = buildSeptemberCalendar(tripDays, ticketDates, '2026-09-12', '2026-09-10');
  assert.equal(cells.length, 35);
  assert.equal(cells[0].date, null);
  assert.equal(cells[1].day, 1);
  assert.equal([...cells].reverse().find((cell) => cell.day)?.day, 30);
});

test('marks only Sep 7-21 as selectable trip days and preserves selected/today/ticket markers', () => {
  const cells = buildSeptemberCalendar(tripDays, ticketDates, '2026-09-12', '2026-09-10');
  const sep6 = cells.find((cell) => cell.day === 6);
  const sep9 = cells.find((cell) => cell.day === 9);
  const sep10 = cells.find((cell) => cell.day === 10);
  const sep12 = cells.find((cell) => cell.day === 12);
  const sep22 = cells.find((cell) => cell.day === 22);
  assert.equal(sep6.selectable, false);
  assert.equal(sep9.selectable, true);
  assert.deepEqual(sep9.markers, ['✈️']);
  assert.equal(sep10.isToday, true);
  assert.equal(sep12.isSelected, true);
  assert.equal(sep22.selectable, false);
});

test('maps a trip date directly to the app day index', () => {
  assert.equal(tripDayIndexForDate(tripDays, '2026-09-07'), 0);
  assert.equal(tripDayIndexForDate(tripDays, '2026-09-21'), 14);
  assert.equal(tripDayIndexForDate(tripDays, '2026-09-22'), -1);
});

test('uses the approved overall font increase', () => {
  assert.equal(FONT_SCALE, 1.18);
});
