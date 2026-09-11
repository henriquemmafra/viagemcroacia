import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tripDays2 } from '../js/trip-days-2.js';
import { walletItems } from '../js/trip-data.js';
import '../js/vintgar-patch.js';
import '../js/bled-bus-ticket-patch.js';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('12 Sep uses the confirmed Ljubljana to Bled booking and preserves Vintgar margin', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-12');
  assert.ok(day, 'missing 12 Sep itinerary');

  const bus = day.events.find((event) => event.title.includes('Ljubljana → Bled'));
  assert.equal(bus?.time, '07:15');
  assert.equal(bus?.end, '08:00');
  assert.equal(bus?.status, 'confirmed');
  assert.equal(bus?.ticketId, 'omio-lju-bled');
  assert.match(`${bus?.note || ''} ${bus?.perrengue || ''}`, /plataforma 30/i);
  assert.match(`${bus?.note || ''} ${bus?.perrengue || ''}`, /15 min/i);

  assert.equal(day.events.some((event) => event.time === '05:55' && event.title.includes('Ljubljana → Bled')), false);
  assert.equal(day.events.some((event) => event.time === '07:30' && event.title.includes('VINTGAR Shuttle')), false);

  const connection = day.events.find((event) => event.title.includes('Vintgar Visitor Centre'));
  assert.ok(connection, 'missing protected transfer from Bled to Vintgar');
  assert.ok(connection.time >= '08:00' && connection.end <= '08:50');
  assert.equal(connection.status, 'planned');
});

test('wallet contains the Omio/Nomago booking details for both passengers', () => {
  const ticket = walletItems.find((item) => item.id === 'omio-lju-bled');
  assert.ok(ticket, 'missing Ljubljana to Bled ticket');
  assert.equal(ticket.status, 'confirmed');
  assert.equal(ticket.locator, '37706-1-2-2026');
  assert.equal(ticket.date, '12 set · 07:15');
  assert.match(ticket.subtitle || '', /Nomago/i);
  assert.match(ticket.note || '', /1867007911/);
  assert.match(ticket.note || '', /1887167963/);
  assert.match(ticket.note || '', /plataforma 30/i);
  assert.match(ticket.note || '', /€37,80/);
});

test('page loads and precaches the Bled bus patch', async () => {
  const [index, worker] = await Promise.all([read('../index.html'), read('../service-worker.js')]);
  assert.match(index, /js\/bled-bus-ticket-patch\.js/);
  assert.match(worker, /\.\/js\/bled-bus-ticket-patch\.js/);
});
