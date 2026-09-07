import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { translatorMarkup } from '../js/translator.js';

test('translator renders icon-first hold-to-talk microphone without old prompt copy', () => {
  const html = translatorMarkup();
  assert.match(html, /data-conversation-mic/);
  assert.match(html, /🇭🇷/);
  assert.match(html, /🎙️/);
  assert.doesNotMatch(html, /PODE FALAR/);
  assert.match(html, /data-conversation-original/);
  assert.match(html, /data-conversation-portuguese/);
  assert.match(html, /OUVIR ORIGINAL/);
  assert.match(html, /RESPONDER/);
});

test('translator wires press, release, cancel and keyboard hold-to-talk events', async () => {
  const source = await readFile(new URL('../js/translator.js', import.meta.url), 'utf8');
  assert.match(source, /conversation-audio\.js/);
  assert.match(source, /pointerdown/);
  assert.match(source, /pointerup/);
  assert.match(source, /pointercancel/);
  assert.match(source, /keydown/);
  assert.match(source, /keyup/);
  assert.match(source, /ESTOU OUVINDO/);
  assert.match(source, /TRADUZINDO…/);
});

test('translator stylesheet provides a large touch-first microphone control', async () => {
  const css = await readFile(new URL('../css/translator.css', import.meta.url), 'utf8');
  assert.match(css, /\.conversation-mic/);
  assert.match(css, /min-height:64px/);
  assert.match(css, /touch-action:none/);
});
