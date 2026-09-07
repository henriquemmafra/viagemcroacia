import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('translator imports conversation audio and selected itinerary date is exposed by live day enhancer', async () => {
  const translator = await readFile(new URL('../js/translator.js', import.meta.url), 'utf8');
  const liveDay = await readFile(new URL('../js/live-day.js', import.meta.url), 'utf8');
  assert.match(translator, /conversation-audio\.js/);
  assert.match(liveDay, /dataset\.tripDate\s*=\s*day\.date/);
});

test('frontend endpoint remains a non-secret Worker hook rather than a Google API URL', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const match = index.match(/<meta name="adriatico-translator-endpoint" content="([^"]*)">/);
  assert.ok(match);
  const endpoint = match[1];
  assert.doesNotMatch(endpoint, /translation\.googleapis\.com|speech\.googleapis\.com/i);
  assert.doesNotMatch(endpoint, /[?&]key=/i);
});

test('production translator UI does not contain the retired PODE FALAR copy', async () => {
  const translator = await readFile(new URL('../js/translator.js', import.meta.url), 'utf8');
  assert.doesNotMatch(translator, /PODE FALAR/);
  assert.match(translator, /ESTOU OUVINDO/);
  assert.match(translator, /TRADUZINDO…/);
});
