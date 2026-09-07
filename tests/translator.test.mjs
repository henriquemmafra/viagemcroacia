import test from 'node:test';
import assert from 'node:assert/strict';

async function loadTranslator() {
  return import('../js/translator.js');
}

test('translator exposes only Croatian, Hungarian and Slovenian targets', async () => {
  const { TRANSLATOR_TARGETS } = await loadTranslator();
  assert.deepEqual(Object.keys(TRANSLATOR_TARGETS), ['hr', 'hu', 'sl']);
  assert.deepEqual(TRANSLATOR_TARGETS.hr, { label:'Croata', flag:'🇭🇷', speechLanguage:'Croata' });
  assert.deepEqual(TRANSLATOR_TARGETS.hu, { label:'Húngaro', flag:'🇭🇺', speechLanguage:'Húngaro' });
  assert.deepEqual(TRANSLATOR_TARGETS.sl, { label:'Esloveno', flag:'🇸🇮', speechLanguage:'Esloveno' });
});

test('translator validates blank, long and unsupported input before fetch', async () => {
  const { validateTranslationInput } = await loadTranslator();
  assert.throws(() => validateTranslationInput('   ', 'hr'), /Digite uma frase/);
  assert.throws(() => validateTranslationInput('Olá', 'de'), /Idioma não suportado/);
  assert.throws(() => validateTranslationInput('x'.repeat(501), 'hr'), /500 caracteres/);
});

test('translator sends only text and target and returns translated text', async () => {
  const { requestTranslation } = await loadTranslator();
  const fetchImpl = async (url, options) => {
    assert.equal(url, 'https://example.test/translate');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), { text:'Onde fica?', target:'hr' });
    return { ok:true, json:async () => ({ translation:'Gdje je?', ignored:'secret' }) };
  };
  const result = await requestTranslation({ text:' Onde fica? ', target:'hr', endpoint:'https://example.test/translate', fetchImpl });
  assert.equal(result, 'Gdje je?');
});

test('translator converts upstream errors to a safe user-facing error', async () => {
  const { requestTranslation } = await loadTranslator();
  const fetchImpl = async () => ({ ok:false, json:async () => ({ error:'upstream internals' }) });
  await assert.rejects(
    requestTranslation({ text:'Olá', target:'hr', endpoint:'https://example.test/translate', fetchImpl }),
    /Não foi possível traduzir agora/
  );
});

test('translator markup uses Brazilian Portuguese, three flags and Google attribution hook', async () => {
  const { translatorMarkup } = await loadTranslator();
  const html = translatorMarkup();
  assert.match(html, /🇧🇷 Português/);
  assert.match(html, /🇭🇷 Croata/);
  assert.match(html, /🇭🇺 Húngaro/);
  assert.match(html, /🇸🇮 Esloveno/);
  assert.match(html, /TRADUZIR COM GOOGLE/);
  assert.match(html, /data-translator-attribution/);
  assert.match(html, /translate\.google\.com/);
});
