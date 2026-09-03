import test from 'node:test';
import assert from 'node:assert/strict';
import '../js/vintgar-patch.js';
import { walletItems, pendingItems } from '../js/trip-data.js';
import { tripDays2 } from '../js/trip-days-2.js';

test('Vintgar booking is confirmed with two offline QR tickets', () => {
  const tickets = walletItems.filter((item) => item.groupId === 'vintgar-12sep');
  assert.equal(tickets.length, 2);
  assert.deepEqual(tickets.map((item) => item.holder), ['Henrique', 'Cibele']);
  assert.ok(tickets.every((item) => item.status === 'confirmed'));
  assert.ok(tickets.every((item) => item.codeAsset?.startsWith('data:image/png;base64,')));
});

test('Vintgar day uses the purchased 09:00 guided tour and 08:50 meeting time', () => {
  const day = tripDays2.find((item) => item.date === '2026-09-12');
  const meeting = day.events.find((event) => event.title.includes('Meeting point Vintgar'));
  const tour = day.events.find((event) => event.title === 'Vintgar Gorge');
  assert.equal(meeting?.time, '08:50');
  assert.equal(meeting?.status, 'confirmed');
  assert.equal(tour?.time, '09:00');
  assert.equal(tour?.status, 'confirmed');
  assert.equal(tour?.ticketId, 'vintgar-henrique');
});

test('Vintgar is removed from pending items after purchase', () => {
  assert.equal(pendingItems.some((item) => item.startsWith('Vintgar:')), false);
});
