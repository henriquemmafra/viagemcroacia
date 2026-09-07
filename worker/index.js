export const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

const TARGETS = new Set(['hr', 'hu', 'sl']);
const DEFAULT_ALLOWED_ORIGINS = new Set([
  'https://henriquemmafra.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
]);
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 30;
const rateBuckets = new Map();

function allowedOrigins(env = {}) {
  const extra = String(env.ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean);
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra]);
}

function cors(origin) {
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    'vary': 'Origin'
  };
}

function json(payload, status, origin = '') {
  const headers = { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' };
  if (origin) Object.assign(headers, cors(origin));
  return new Response(JSON.stringify(payload), { status, headers });
}

function decodeBasicEntities(value) {
  return String(value ?? '')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

function rateLimited(request) {
  const now = Date.now();
  const key = request.headers.get('cf-connecting-ip') || request.headers.get('origin') || 'anonymous';
  const previous = rateBuckets.get(key);
  if (!previous || now - previous.startedAt >= RATE_WINDOW_MS) {
    rateBuckets.set(key, { startedAt:now, count:1 });
    return false;
  }
  previous.count += 1;
  if (rateBuckets.size > 500) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (now - bucket.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(bucketKey);
    }
  }
  return previous.count > RATE_LIMIT;
}

export async function handleRequest(request, env = {}, fetchImpl = fetch) {
  const origin = request.headers.get('origin') || '';
  if (origin && !allowedOrigins(env).has(origin)) return json({ error:'Origem não permitida.' }, 403);

  if (request.method === 'OPTIONS') return new Response(null, { status:204, headers:cors(origin || 'https://henriquemmafra.github.io') });
  if (request.method !== 'POST') return json({ error:'Método não permitido.' }, 405, origin);
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return json({ error:'Conteúdo inválido.' }, 415, origin);
  if (rateLimited(request)) return json({ error:'Muitas solicitações. Tente novamente em instantes.' }, 429, origin);

  let body;
  try { body = await request.json(); }
  catch { return json({ error:'Solicitação inválida.' }, 400, origin); }

  const text = String(body?.text ?? '').trim();
  const target = String(body?.target ?? '').trim();
  if (!text) return json({ error:'Digite uma frase.' }, 400, origin);
  if (text.length > 500) return json({ error:'Use até 500 caracteres.' }, 400, origin);
  if (!TARGETS.has(target)) return json({ error:'Idioma não suportado.' }, 400, origin);
  if (!env.GOOGLE_TRANSLATE_API_KEY) return json({ error:'Tradução indisponível.' }, 503, origin);

  let upstream;
  try {
    upstream = await fetchImpl(GOOGLE_TRANSLATE_URL, {
      method:'POST',
      headers:{
        'content-type':'application/json; charset=utf-8',
        'x-goog-api-key':env.GOOGLE_TRANSLATE_API_KEY
      },
      body:JSON.stringify({ q:text, source:'pt', target, format:'text' })
    });
  } catch {
    return json({ error:'Tradução indisponível.' }, 502, origin);
  }

  if (!upstream.ok) return json({ error:'Tradução indisponível.' }, 502, origin);

  try {
    const data = await upstream.json();
    const translated = decodeBasicEntities(data?.data?.translations?.[0]?.translatedText).trim();
    if (!translated) return json({ error:'Tradução indisponível.' }, 502, origin);
    return json({ translation:translated }, 200, origin);
  } catch {
    return json({ error:'Tradução indisponível.' }, 502, origin);
  }
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  }
};
