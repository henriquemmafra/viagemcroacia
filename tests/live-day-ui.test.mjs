import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('today screen uses one smart status card and live timeline state classes', async () => {
  const app = await readFile(new URL('../js/app.js', import.meta.url), 'utf8');
  assert.match(app, /function smartStatusCard\(/);
  assert.doesNotMatch(app, /class="now-next"/);
  assert.match(app, /getLeaveCue/);
  assert.match(app, /is-past/);
  assert.match(app, /--timeline-progress/);
  assert.match(app, /temporalRefresh/);
});

test('live day stylesheet defines smart card, faded past events and progress rail', async () => {
  const css = await readFile(new URL('../css/live-day.css', import.meta.url), 'utf8');
  assert.match(css, /\.smart-status-card/);
  assert.match(css, /\.tl-item\.is-past/);
  assert.match(css, /timeline.*--timeline-progress|--timeline-progress/);
});
