import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('live day enhancer builds one smart status card and timeline states', async () => {
  const liveDay = await readFile(new URL('../js/live-day.js', import.meta.url), 'utf8');
  assert.match(liveDay, /smartStatusCard/);
  assert.match(liveDay, /getLeaveCue/);
  assert.match(liveDay, /is-past/);
  assert.match(liveDay, /--timeline-progress/);
  assert.match(liveDay, /dataset\.tripDate/);
  assert.doesNotMatch(liveDay, /setInterval\(/, 'reuse app minute refresh instead of creating a duplicate interval');
});

test('live day stylesheet defines smart card, faded past events and progress rail', async () => {
  const css = await readFile(new URL('../css/live-day.css', import.meta.url), 'utf8');
  assert.match(css, /\.smart-status-card/);
  assert.match(css, /\.tl-item\.is-past/);
  assert.match(css, /--timeline-progress/);
});

test('index loads live day enhancer after the main app', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const appPos = index.indexOf('js/app.js');
  const livePos = index.indexOf('js/live-day.js');
  assert.ok(appPos >= 0 && livePos > appPos);
  assert.match(index, /css\/live-day\.css/);
});
