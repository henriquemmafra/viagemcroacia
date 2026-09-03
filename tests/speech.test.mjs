import test from 'node:test';
import assert from 'node:assert/strict';
import { localeForLanguage, buildSpeechRequest } from '../js/speech.js';

test('maps each itinerary language to the correct speech locale', () => {
  assert.equal(localeForLanguage('Croata'), 'hr-HR');
  assert.equal(localeForLanguage('Húngaro'), 'hu-HU');
  assert.equal(localeForLanguage('Esloveno'), 'sl-SI');
});

test('builds a speech request using only the foreign phrase', () => {
  assert.deepEqual(buildSpeechRequest('Račun, molim', 'Croata'), {
    text: 'Račun, molim',
    lang: 'hr-HR',
    rate: 0.9
  });
});

test('does not build a speech request for unsupported languages or blank text', () => {
  assert.equal(buildSpeechRequest('Hello', 'Inglês'), null);
  assert.equal(buildSpeechRequest('   ', 'Croata'), null);
});
