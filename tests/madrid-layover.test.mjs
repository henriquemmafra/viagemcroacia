import test from 'node:test';
import assert from 'node:assert/strict';
import { tripDays1 } from '../js/trip-days-1.js';

test('September 7 shows the Madrid layover and safe return-to-airport plan', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-07');
  assert.ok(day, 'September 7 itinerary must exist');

  const byTime = new Map(day.events.map((event) => [event.time, event]));
  assert.match(byTime.get('05:25')?.title || '', /Madrid/i);
  assert.match(byTime.get('06:45')?.title || '', /aeroporto|Madrid/i);
  assert.match(byTime.get('07:30')?.title || '', /Madrid/i);
  assert.match(byTime.get('12:15')?.title || '', /aeroporto/i);
  assert.match(byTime.get('13:00')?.title || '', /T4|terminal/i);
  assert.match(byTime.get('16:05')?.title || '', /Dubrovnik/i);
  assert.match(byTime.get('19:00')?.title || '', /Dubrovnik/i);

  assert.ok(day.alerts.some((alert) => /bagagem|mala/i.test(alert) && /DBV|Dubrovnik/i.test(alert)));
  assert.ok(day.alerts.some((alert) => /12:15/.test(alert) && /retorn|voltar/i.test(alert)));
});
