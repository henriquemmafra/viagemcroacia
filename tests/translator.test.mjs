import test from 'node:test';
import assert from 'node:assert/strict';

async function loadTranslator() {
  return import('../js/translator.js');
}

test('shortcut maps trip days to Croatian, Hungarian and Slovenian', async () => {
  const { translatorTargetForMoment } = await loadTranslator();
  assert.equal(translatorTargetForMoment({ date:'2026-09-08', minutes:600 }), 'hr');
  assert.equal(translatorTargetForMoment({ date:'2026-09-09', minutes:600 }), 'hu');
  assert.equal(translatorTargetForMoment({ date:'2026-09-12', minutes:600 }), 'sl');
  assert.equal(translatorTargetForMoment({ date:'2026-09-18', minutes:600 }), 'hr');
});

test('September 13 switches from Slovenian to Croatian at the planned Rovinj arrival', async () => {
  const { translatorTargetForMoment } = await loadTranslator();
  assert.equal(translatorTargetForMoment({ date:'2026-09-13', minutes:18 * 60 + 4 }), 'sl');
  assert.equal(translatorTargetForMoment({ date:'2026-09-13', minutes:18 * 60 + 5 }), 'hr');
});

test('Google Translate URL opens Portuguese and the local language directly', async () => {
  const { googleTranslateUrl } = await loadTranslator();
  assert.equal(googleTranslateUrl('hr'), 'https://translate.google.com/?sl=pt&tl=hr&op=translate');
  assert.equal(googleTranslateUrl('hu'), 'https://translate.google.com/?sl=pt&tl=hu&op=translate');
  assert.equal(googleTranslateUrl('sl'), 'https://translate.google.com/?sl=pt&tl=sl&op=translate');
});

test('translator card is a single Google Translate shortcut with no custom translator or microphone', async () => {
  const { translatorMarkup } = await loadTranslator();
  const html = translatorMarkup('hu');
  assert.match(html, /TRADUTOR/);
  assert.match(html, /🇧🇷 Português/);
  assert.match(html, /🇭🇺 Húngaro/);
  assert.match(html, /🇭🇺 ABRIR GOOGLE TRADUTOR/);
  assert.match(html, /translate\.google\.com/);
  assert.doesNotMatch(html, /textarea|ESTOU OUVINDO|data-conversation-mic|TRADUZIR COM GOOGLE/);
});

test('translator update does not rewrite identical text nodes', async () => {
  const { updateTranslatorCard, googleTranslateUrl } = await loadTranslator();
  let headingText = '🇧🇷 Português ↔ 🇭🇷 Croata';
  let linkText = '🇭🇷 ABRIR GOOGLE TRADUTOR';
  let headingWrites = 0;
  let linkWrites = 0;
  const heading = {
    get textContent() { return headingText; },
    set textContent(value) { headingWrites += 1; headingText = value; }
  };
  const link = {
    href:googleTranslateUrl('hr'),
    get textContent() { return linkText; },
    set textContent(value) { linkWrites += 1; linkText = value; }
  };
  const card = {
    dataset:{ translatorTarget:'hr' },
    querySelector(selector) {
      if (selector === 'h3') return heading;
      if (selector === '[data-translator-open]') return link;
      return null;
    }
  };

  assert.equal(updateTranslatorCard(card, 'hr'), true);
  assert.equal(headingWrites, 0);
  assert.equal(linkWrites, 0);
});
