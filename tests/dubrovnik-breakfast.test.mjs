import test from 'node:test';
import assert from 'node:assert/strict';
import { tripDays1 } from '../js/trip-days-1.js';

test('September 8 starts with Bakery Mokosica before the Dubrovnik walls', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-08');
  assert.ok(day, 'September 8 itinerary must exist');

  const breakfast = day.events.find((event) => /Bakery Mokošica|Bakery Mokosica/i.test(event.title));
  assert.ok(breakfast, 'Bakery Mokosica breakfast must be in the September 8 itinerary');
  assert.equal(breakfast.time, '07:00');
  assert.match(breakfast.location?.destination || '', /Boškovićeva 7|Boskoviceva 7/i);

  const pass = day.events.find((event) => /Dubrovnik Pass/i.test(event.title));
  assert.equal(pass?.time, '07:30');
});
