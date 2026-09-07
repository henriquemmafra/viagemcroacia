import test from 'node:test';
import assert from 'node:assert/strict';

async function loadWorker() {
  return import('../worker/index.js');
}

function speechRequest(locale = 'hr-HR', blob = new Blob(['voice'], { type:'audio/webm;codecs=opus' })) {
  const form = new FormData();
  form.set('audio', blob, 'speech.webm');
  form.set('locale', locale);
  return new Request('https://worker.example/translate', {
    method:'POST',
    headers:{ origin:'https://henriquemmafra.github.io' },
    body:form
  });
}

const env = {
  GOOGLE_TRANSLATE_API_KEY:'translate-secret',
  GOOGLE_SPEECH_API_KEY:'speech-secret'
};

test('speech worker rejects unsupported locale before contacting Google', async () => {
  const { handleRequest } = await loadWorker();
  let calls = 0;
  const response = await handleRequest(speechRequest('de-DE'), env, async () => { calls += 1; });
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test('speech worker rejects oversized audio before contacting Google', async () => {
  const { handleRequest, MAX_AUDIO_BYTES } = await loadWorker();
  let calls = 0;
  const tooLarge = new Blob([new Uint8Array(MAX_AUDIO_BYTES + 1)], { type:'audio/webm;codecs=opus' });
  const response = await handleRequest(speechRequest('hr-HR', tooLarge), env, async () => { calls += 1; });
  assert.equal(response.status, 413);
  assert.equal(calls, 0);
});

test('speech worker transcribes WebM Opus then translates transcript to Portuguese', async () => {
  const { handleRequest, GOOGLE_SPEECH_URL, GOOGLE_TRANSLATE_URL } = await loadWorker();
  let call = 0;
  const fetchImpl = async (url, options) => {
    call += 1;
    assert.equal(new URL(url).searchParams.has('key'), false);
    if (call === 1) {
      assert.equal(url, GOOGLE_SPEECH_URL);
      assert.equal(options.headers['x-goog-api-key'], 'speech-secret');
      const body = JSON.parse(options.body);
      assert.equal(body.config.languageCode, 'hr-HR');
      assert.equal(body.config.encoding, 'WEBM_OPUS');
      assert.equal(body.config.sampleRateHertz, 48000);
      assert.equal(body.config.enableAutomaticPunctuation, true);
      assert.ok(body.audio.content.length > 0);
      return new Response(JSON.stringify({
        results:[{ alternatives:[{ transcript:'Koliko košta karta?' }] }]
      }), { status:200, headers:{ 'content-type':'application/json' } });
    }
    assert.equal(url, GOOGLE_TRANSLATE_URL);
    assert.equal(options.headers['x-goog-api-key'], 'translate-secret');
    assert.deepEqual(JSON.parse(options.body), {
      q:'Koliko košta karta?', source:'hr', target:'pt', format:'text'
    });
    return new Response(JSON.stringify({
      data:{ translations:[{ translatedText:'Quanto custa o ingresso?' }] }
    }), { status:200, headers:{ 'content-type':'application/json' } });
  };

  const response = await handleRequest(speechRequest(), env, fetchImpl);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    transcript:'Koliko košta karta?',
    translation:'Quanto custa o ingresso?'
  });
  assert.equal(call, 2);
});

test('speech worker never leaks upstream speech error details', async () => {
  const { handleRequest } = await loadWorker();
  const response = await handleRequest(speechRequest(), env, async () =>
    new Response(JSON.stringify({ error:{ message:'speech-secret credential invalid' } }), { status:403 })
  );
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.match(text, /Áudio indisponível/);
  assert.doesNotMatch(text, /speech-secret|credential invalid/);
});
