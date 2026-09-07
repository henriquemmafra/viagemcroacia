export const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';
export const GOOGLE_SPEECH_URL = 'https://speech.googleapis.com/v1/speech:recognize';
export const MAX_AUDIO_BYTES = 1_572_864;

const TARGETS = new Set(['hr', 'hu', 'sl']);
const SPEECH_LOCALES = new Set(['hr-HR', 'hu-HU', 'sl-SI']);
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

function sourceForLocale(locale) {
  return ({ 'hr-HR':'hr', 'hu-HU':'hu', 'sl-SI':'sl' })[locale] || '';
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

async function translateText({ text, source, target, apiKey, fetchImpl }) {
  let upstream;
  try {
    upstream = await fetchImpl(GOOGLE_TRANSLATE_URL, {
      method:'POST',
      headers:{
        'content-type':'application/json; charset=utf-8',
        'x-goog-api-key':apiKey
      },
      body:JSON.stringify({ q:text, source, target, format:'text' })
    });
  } catch {
    return null;
  }
  if (!upstream.ok) return null;
  try {
    const data = await upstream.json();
    const translated = decodeBasicEntities(data?.data?.translations?.[0]?.translatedText).trim();
    return translated || null;
  } catch {
    return null;
  }
}

async function handleTypedTranslation(request, env, fetchImpl, origin) {
  let body;
  try { body = await request.json(); }
  catch { return json({ error:'Solicitação inválida.' }, 400, origin); }

  const text = String(body?.text ?? '').trim();
  const target = String(body?.target ?? '').trim();
  if (!text) return json({ error:'Digite uma frase.' }, 400, origin);
  if (text.length > 500) return json({ error:'Use até 500 caracteres.' }, 400, origin);
  if (!TARGETS.has(target)) return json({ error:'Idioma não suportado.' }, 400, origin);
  if (!env.GOOGLE_TRANSLATE_API_KEY) return json({ error:'Tradução indisponível.' }, 503, origin);

  const translated = await translateText({
    text,
    source:'pt',
    target,
    apiKey:env.GOOGLE_TRANSLATE_API_KEY,
    fetchImpl
  });
  if (!translated) return json({ error:'Tradução indisponível.' }, 502, origin);
  return json({ translation:translated }, 200, origin);
}

async function handleSpeechTranslation(request, env, fetchImpl, origin) {
  let form;
  try { form = await request.formData(); }
  catch { return json({ error:'Áudio inválido.' }, 400, origin); }

  const locale = String(form.get('locale') ?? '').trim();
  const audio = form.get('audio');
  if (!SPEECH_LOCALES.has(locale)) return json({ error:'Idioma de áudio não suportado.' }, 400, origin);
  if (!(audio instanceof Blob) || !audio.size) return json({ error:'Áudio inválido.' }, 400, origin);
  if (audio.size > MAX_AUDIO_BYTES) return json({ error:'Áudio muito grande.' }, 413, origin);

  const audioType = String(audio.type || '').toLowerCase();
  if (audioType && !audioType.includes('webm')) return json({ error:'Formato de áudio não suportado.' }, 415, origin);
  if (!env.GOOGLE_SPEECH_API_KEY || !env.GOOGLE_TRANSLATE_API_KEY) return json({ error:'Áudio indisponível.' }, 503, origin);

  let content;
  try {
    const bytes = new Uint8Array(await audio.arrayBuffer());
    content = bytesToBase64(bytes);
  } catch {
    return json({ error:'Áudio inválido.' }, 400, origin);
  }

  let speechResponse;
  try {
    speechResponse = await fetchImpl(GOOGLE_SPEECH_URL, {
      method:'POST',
      headers:{
        'content-type':'application/json; charset=utf-8',
        'x-goog-api-key':env.GOOGLE_SPEECH_API_KEY
      },
      body:JSON.stringify({
        config:{
          encoding:'WEBM_OPUS',
          sampleRateHertz:48000,
          languageCode:locale,
          enableAutomaticPunctuation:true
        },
        audio:{ content }
      })
    });
  } catch {
    return json({ error:'Áudio indisponível.' }, 502, origin);
  }

  if (!speechResponse.ok) return json({ error:'Áudio indisponível.' }, 502, origin);

  let transcript = '';
  try {
    const speechData = await speechResponse.json();
    transcript = (speechData?.results ?? [])
      .map((result) => String(result?.alternatives?.[0]?.transcript ?? '').trim())
      .filter(Boolean)
      .join(' ')
      .slice(0, 1000)
      .trim();
  } catch {
    return json({ error:'Áudio indisponível.' }, 502, origin);
  }
  if (!transcript) return json({ error:'Áudio indisponível.' }, 502, origin);

  const translation = await translateText({
    text:transcript,
    source:sourceForLocale(locale),
    target:'pt',
    apiKey:env.GOOGLE_TRANSLATE_API_KEY,
    fetchImpl
  });
  if (!translation) return json({ error:'Áudio indisponível.' }, 502, origin);

  return json({ transcript, translation }, 200, origin);
}

export async function handleRequest(request, env = {}, fetchImpl = fetch) {
  const origin = request.headers.get('origin') || '';
  if (origin && !allowedOrigins(env).has(origin)) return json({ error:'Origem não permitida.' }, 403);

  if (request.method === 'OPTIONS') return new Response(null, { status:204, headers:cors(origin || 'https://henriquemmafra.github.io') });
  if (request.method !== 'POST') return json({ error:'Método não permitido.' }, 405, origin);
  if (rateLimited(request)) return json({ error:'Muitas solicitações. Tente novamente em instantes.' }, 429, origin);

  const contentType = String(request.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('application/json')) return handleTypedTranslation(request, env, fetchImpl, origin);
  if (contentType.includes('multipart/form-data')) return handleSpeechTranslation(request, env, fetchImpl, origin);
  return json({ error:'Conteúdo inválido.' }, 415, origin);
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  }
};
