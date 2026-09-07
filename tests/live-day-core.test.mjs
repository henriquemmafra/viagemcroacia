import test from 'node:test';
import assert from 'node:assert/strict';
import { getDayTemporalState, getLeaveCue } from '../js/core.js';

const day = {
  date:'2026-09-07',
  events:[
    { time:'09:00', end:'10:00', title:'A' },
    { time:'11:00', title:'B', leaveBeforeMinutes:30 },
    { time:'13:00', end:'14:00', title:'C' }
  ]
};

test('marks ended, current and next timed events without removing references', () => {
  const state = getDayTemporalState(day, new Date(2026, 8, 7, 11, 30));
  assert.equal(state.eventStates.get(day.events[0]), 'past');
  assert.equal(state.eventStates.get(day.events[1]), 'current');
  assert.equal(state.eventStates.get(day.events[2]), 'next');
});

test('uses the next timed event as effective end when end is omitted', () => {
  const state = getDayTemporalState(day, new Date(2026, 8, 7, 12, 59));
  assert.equal(state.current, day.events[1]);
  assert.equal(state.eventStates.get(day.events[1]), 'current');
});

test('timeline progress clamps from zero to one hundred', () => {
  assert.equal(getDayTemporalState(day, new Date(2026, 8, 7, 8, 0)).progress, 0);
  const during = getDayTemporalState(day, new Date(2026, 8, 7, 11, 30)).progress;
  assert.ok(during > 0 && during < 100);
  assert.equal(getDayTemporalState(day, new Date(2026, 8, 7, 15, 0)).progress, 100);
});

test('leave cue is emitted only for explicit leaveBeforeMinutes', () => {
  assert.equal(getLeaveCue(day, day.events[1], new Date(2026, 8, 7, 10, 10)), 'SAIR EM 20 MIN');
  assert.equal(getLeaveCue(day, day.events[1], new Date(2026, 8, 7, 10, 35)), 'HORA DE SAIR');
  assert.equal(getLeaveCue(day, day.events[2], new Date(2026, 8, 7, 12, 0)), null);
});
