import test from 'node:test';
import assert from 'node:assert/strict';

async function loadWorker() {
  return import('../worker/index.js');
}

function request(body, origin = 'https://henriquemmafra.github.io') {
  return new Request('https://worker.example/translate', {
    method:'POST',
    headers:{ 'content-type':'application/json', origin },
    body:JSON.stringify(body)
  });
}

test('worker rejects unsupported targets before contacting Google', async () => {
  const { handleRequest } = await loadWorker();
  let calls = 0;
  const response = await handleRequest(request({ text:'Olá', target:'de' }), { GOOGLE_TRANSLATE_API_KEY:'secret' }, async () => { calls += 1; });
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test('worker sends Google key only in x-goog-api-key and sends plain text translation payload', async () => {
  const { handleRequest, GOOGLE_TRANSLATE_URL } = await loadWorker();
  const fetchImpl = async (url, options) => {
    assert.equal(url, GOOGLE_TRANSLATE_URL);
    assert.equal(new URL(url).searchParams.has('key'), false);
    assert.equal(options.headers['x-goog-api-key'], 'secret');
    assert.deepEqual(JSON.parse(options.body), { q:'Onde fica?', source:'pt', target:'hr', format:'text' });
    return new Response(JSON.stringify({ data:{ translations:[{ translatedText:'Gdje je?' }] } }), { status:200, headers:{ 'content-type':'application/json' } });
  };
  const response = await handleRequest(request({ text:'Onde fica?', target:'hr' }), { GOOGLE_TRANSLATE_API_KEY:'secret' }, fetchImpl);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { translation:'Gdje je?' });
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://henriquemmafra.github.io');
});

test('worker does not leak Google upstream error details', async () => {
  const { handleRequest } = await loadWorker();
  const fetchImpl = async () => new Response(JSON.stringify({ error:{ message:'API key invalid: abc123' } }), { status:403 });
  const response = await handleRequest(request({ text:'Olá', target:'hr' }), { GOOGLE_TRANSLATE_API_KEY:'secret' }, fetchImpl);
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.match(text, /Tradução indisponível/);
  assert.doesNotMatch(text, /abc123|API key invalid/);
});

test('worker rejects browser origins outside the travel app origin', async () => {
  const { handleRequest } = await loadWorker();
  const response = await handleRequest(request({ text:'Olá', target:'hr' }, 'https://evil.example'), { GOOGLE_TRANSLATE_API_KEY:'secret' }, async () => { throw new Error('must not call'); });
  assert.equal(response.status, 403);
});
