import test from 'node:test';
import assert from 'node:assert/strict';
import { tripDays1 } from '../js/trip-days-1.js';

test('9 Sep keeps a safe airport margin and removes Lokrum before the flight', () => {
  const day = tripDays1.find((item) => item.date === '2026-09-09');
  assert.ok(day, '9 Sep itinerary must exist');

  assert.match(day.title, /Rupe.*voo.*cruzeiro/i);
  assert.equal(day.events.some((event) => /Lokrum/i.test(event.title)), false, 'Lokrum must not be scheduled before the flight');
  assert.equal(day.events.some((event) => /Ethnographic Museum Rupe/i.test(event.title)), true, 'Rupe should replace Lokrum');

  const airportDeparture = day.events.find((event) => /sair.*aeroporto DBV|ir.*aeroporto DBV/i.test(event.title));
  assert.ok(airportDeparture, 'airport departure must be explicit');
  assert.equal(airportDeparture.time, '11:30');

  const airportArrival = day.events.find((event) => /estar no aeroporto DBV/i.test(event.title));
  assert.ok(airportArrival, 'airport arrival target must be explicit');
  assert.equal(airportArrival.time, '12:10');

  assert.equal(day.alerts.some((alert) => /porta.*13h40/i.test(alert)), true, 'gate-close time must remain visible');
});
