import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../css/live-day.css', import.meta.url), 'utf8');
const worker = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');

test('raises contrast and small-text sizing for the live itinerary UI', () => {
  assert.match(css, /--readable-muted:#5c3d1e/);
  assert.match(css, /\.tl-time[^}]*font-size:10\.5px/);
  assert.match(css, /\.tl-card h3[^}]*font-size:14\.5px/);
  assert.match(css, /\.tl-card-sub[^}]*font-size:10\.5px/);
  assert.match(css, /\.tl-btn[^}]*font-size:10px/);
  assert.match(css, /\.smart-status-card__meta[^}]*font-size:11px/);
  assert.match(css, /body \.weather-stop-head small[^}]*font-size:11px/);
  assert.match(css, /body \.weather-condition span[^}]*font-size:11px/);
});

test('minimizes past timeline items instead of leaving full cards faded', () => {
  assert.match(css, /\.tl-item\.is-past \.tl-card-sub[^}]*display:none/);
  assert.match(css, /\.tl-item\.is-past \.tl-card-note[^}]*display:none/);
  assert.match(css, /\.tl-item\.is-past \.event-tip[^}]*display:none/);
  assert.match(css, /\.tl-item\.is-past \.alert-strip[^}]*display:none/);
  assert.match(css, /\.tl-item\.is-past \.tl-nav[^}]*display:none/);
  assert.match(css, /\.tl-item\.is-past \.tl-card[^}]*padding:6px 9px/);
});

test('keeps the readability update in the current PWA cache', () => {
  assert.match(worker, /adriatico-2026-v21/);
});
