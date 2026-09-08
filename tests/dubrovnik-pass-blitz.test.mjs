import test from 'node:test';
import assert from 'node:assert/strict';
import { tripDays1 } from '../js/trip-days-1.js';

const day = tripDays1.find((item) => item.date === '2026-09-08');
const event = (title) => day.events.find((item) => item.title === title);

test('September 8 follows the Dubrovnik Pass blitz in geographic order', () => {
  assert.ok(day, 'September 8 itinerary is missing');
  const expected = [
    ['08:05','Muralhas Medievais'],
    ['09:30','Fortaleza Lovrijenac'],
    ['10:05','Museu Franciscano + Farmácia Mala Braća'],
    ['10:30','House of Marin Držić'],
    ['10:55','Dubrovnik Natural History Museum'],
    ['11:20','Rector’s Palace'],
    ['11:55','Dulčić–Masle–Pulitika Gallery'],
    ['12:15','Maritime Museum + Pulitika Studio'],
    ['13:00','Almoço Proto'],
    ['14:30','Archaeological Exhibitions · Revelin'],
    ['15:00','Museum of Modern Art Dubrovnik'],
    ['15:45','Descanso no hotel'],
    ['17:30','Subida ao Monte Srđ'],
    ['19:00','Pôr do sol no Monte Srđ'],
    ['20:30','Jantar Konoba Tabak']
  ];

  assert.deepEqual(day.events.map(({ time, title }) => [time, title]), expected);
});

test('Dubrovnik Pass blitz keeps addresses, pass access and priority notes', () => {
  assert.equal(event('Museu Franciscano + Farmácia Mala Braća').location.destination, 'Placa 2, 20000 Dubrovnik, Croatia');
  assert.equal(event('House of Marin Držić').location.destination, 'Široka ul. 7, 20000 Dubrovnik, Croatia');
  assert.equal(event('Dubrovnik Natural History Museum').location.destination, 'Androvićeva 1, 20000 Dubrovnik, Croatia');
  assert.equal(event('Rector’s Palace').location.destination, 'Pred Dvorom 3, 20000 Dubrovnik, Croatia');
  assert.equal(event('Dulčić–Masle–Pulitika Gallery').location.destination, 'Poljana Marina Držića 1, 20000 Dubrovnik, Croatia');
  assert.equal(event('Archaeological Exhibitions · Revelin').location.destination, 'Revelin Fortress, Dubrovnik, Croatia');
  assert.equal(event('Museum of Modern Art Dubrovnik').location.destination, 'Put Frana Supila 23, 20000 Dubrovnik, Croatia');

  assert.equal(event('Rector’s Palace').ticketId, 'dubrovnik-pass-henrique');
  assert.equal(event('Maritime Museum + Pulitika Studio').ticketId, 'dubrovnik-pass-henrique');
  assert.match(event('Archaeological Exhibitions · Revelin').perrengue, /16h/);
  assert.ok(day.alerts.some((item) => /Rupe/i.test(item) && /terça/i.test(item)));
});
