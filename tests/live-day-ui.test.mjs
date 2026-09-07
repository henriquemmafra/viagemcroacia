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

test('smart status update does not rewrite identical HTML', async () => {
  const previousDocument = globalThis.document;
  globalThis.document = {
    querySelector:() => null,
    readyState:'complete',
    documentElement:{ dataset:{} }
  };
  try {
    const { updateSmartStatusElement } = await import('../js/live-day.js?touch-regression');
    let html = '<div>same</div>';
    let htmlWrites = 0;
    const status = {
      className:'smart-status-card is-next',
      dataset:{ liveDay:'true' },
      get innerHTML() { return html; },
      set innerHTML(value) { htmlWrites += 1; html = value; }
    };

    const changed = updateSmartStatusElement(status, { className:'is-next', html:'<div>same</div>' });
    assert.equal(changed, false);
    assert.equal(htmlWrites, 0);

    const changedAgain = updateSmartStatusElement(status, { className:'is-next', html:'<div>changed</div>' });
    assert.equal(changedAgain, true);
    assert.equal(htmlWrites, 1);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
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
