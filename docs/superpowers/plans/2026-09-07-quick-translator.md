# Quick Translator + Essential Phrases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Google-powered Portuguese → Croatian/Hungarian/Slovenian quick translator with copy and local speech playback, while preserving offline essential phrases and adding Com licença, Desculpa, Sim, and Não.

**Architecture:** The GitHub Pages PWA renders a translator card on the `Mais` screen and calls a dedicated `js/translator.js` module. That module sends only `{text,target}` to a versioned Cloudflare Worker, which stores the Google Cloud Translation Basic v2 API key as a deployment secret and returns only translated text. Audio continues through the existing browser `speechSynthesis` path; fixed phrase cards remain offline-capable.

**Tech Stack:** Static ES modules, Node built-in test runner (`node --test`), GitHub Pages/PWA service worker, Cloudflare Worker Web APIs, Google Cloud Translation Basic v2.

**Spec:** `docs/superpowers/specs/2026-09-07-quick-translator-design.md`

## Global Constraints

- Source language is fixed to Brazilian Portuguese and displayed as `🇧🇷 Português`.
- Targets are exactly `hr`/Croata, `hu`/Húngaro, and `sl`/Esloveno.
- Dynamic translation is online-only; fixed phrases remain usable offline.
- Do not commit the Google API key or place it in frontend code, HTML, service worker, query strings, or repository config.
- Dynamic results must show current Google Translate attribution adjacent to the translated result.
- Do not store translation history, analytics, geolocation, clipboard reads, or background translations.
- Reuse `js/speech.js` for audio; do not add Google Text-to-Speech.
- Increment the PWA cache from `adriatico-2026-v14` so installed iPhones receive the update.

---

### Task 1: Add the four offline essential phrases

**Files:**
- Modify: `js/trip-data.js`
- Create: `tests/phrases.test.mjs`

**Interfaces:**
- Consumes: existing exported `phrases` object from `js/trip-data.js`.
- Produces: each language contains Portuguese labels `Com licença`, `Desculpa`, `Sim`, `Não` with the approved local-language text.

- [ ] **Step 1: Write the failing phrase test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { phrases } from '../js/trip-data.js';

const expected = {
  Croata: {
    'Com licença': 'Oprostite',
    'Desculpa': 'Žao mi je',
    'Sim': 'Da',
    'Não': 'Ne'
  },
  Húngaro: {
    'Com licença': 'Elnézést',
    'Desculpa': 'Bocsánat',
    'Sim': 'Igen',
    'Não': 'Nem'
  },
  Esloveno: {
    'Com licença': 'Oprostite',
    'Desculpa': 'Žal mi je',
    'Sim': 'Da',
    'Não': 'Ne'
  }
};

for (const [language, entries] of Object.entries(expected)) {
  test(`${language} includes new essential phrases`, () => {
    const actual = Object.fromEntries(phrases[language]);
    for (const [pt, local] of Object.entries(entries)) assert.equal(actual[pt], local);
  });
}
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/phrases.test.mjs`

Expected: FAIL because at least `Com licença` is missing.

- [ ] **Step 3: Extend each array in `js/trip-data.js`**

Append exactly these entries without removing the existing phrases:

```js
Croata: [
  ['Olá','Bok / Dobar dan'], ['Obrigado','Hvala'], ['Por favor','Molim'],
  ['A conta','Račun, molim'], ['Onde fica...?','Gdje je...?'],
  ['Com licença','Oprostite'], ['Desculpa','Žao mi je'], ['Sim','Da'], ['Não','Ne']
],
Húngaro: [
  ['Olá','Szia'], ['Obrigado','Köszönöm'], ['Por favor','Kérem'],
  ['A conta','A számlát kérem'], ['Onde fica metrô?','Hol a metró?'],
  ['Com licença','Elnézést'], ['Desculpa','Bocsánat'], ['Sim','Igen'], ['Não','Nem']
],
Esloveno: [
  ['Olá','Živijo / Dober dan'], ['Obrigado','Hvala'], ['Por favor','Prosim'],
  ['A conta','Račun, prosim'], ['Onde fica...?','Kje je...?'],
  ['Com licença','Oprostite'], ['Desculpa','Žal mi je'], ['Sim','Da'], ['Não','Ne']
]
```

- [ ] **Step 4: Run phrase and speech tests**

Run: `node --test tests/phrases.test.mjs tests/speech.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/trip-data.js tests/phrases.test.mjs
git commit -m "feat: add essential travel phrases"
```

---

### Task 2: Build translator client logic as a focused ES module

**Files:**
- Create: `js/translator.js`
- Create: `tests/translator.test.mjs`

**Interfaces:**
- Consumes: a configured endpoint string and injected `fetchImpl` for tests.
- Produces: `TRANSLATOR_TARGETS`, `translatorLanguageName(code)`, `validateTranslationInput(text,target)`, `requestTranslation({text,target,endpoint,fetchImpl})`, and `translatorMarkup()`.

- [ ] **Step 1: Write failing module tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TRANSLATOR_TARGETS,
  validateTranslationInput,
  requestTranslation
} from '../js/translator.js';

test('exposes only approved target languages', () => {
  assert.deepEqual(Object.keys(TRANSLATOR_TARGETS), ['hr','hu','sl']);
  assert.equal(TRANSLATOR_TARGETS.hr.label, 'Croata');
  assert.equal(TRANSLATOR_TARGETS.hr.flag, '🇭🇷');
  assert.equal(TRANSLATOR_TARGETS.hu.label, 'Húngaro');
  assert.equal(TRANSLATOR_TARGETS.sl.label, 'Esloveno');
});

test('rejects blank text and unsupported targets before fetch', () => {
  assert.throws(() => validateTranslationInput('   ', 'hr'), /Digite uma frase/);
  assert.throws(() => validateTranslationInput('Olá', 'de'), /Idioma não suportado/);
});

test('returns only translated text from a successful response', async () => {
  const fetchImpl = async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body), { text:'Onde fica?', target:'hr' });
    return { ok:true, json:async () => ({ translation:'Gdje je?' }) };
  };
  assert.equal(await requestTranslation({
    text:'Onde fica?', target:'hr', endpoint:'https://example.test/translate', fetchImpl
  }), 'Gdje je?');
});

test('turns upstream errors into a safe client error', async () => {
  const fetchImpl = async () => ({ ok:false, json:async () => ({ error:'internal details' }) });
  await assert.rejects(
    requestTranslation({ text:'Olá', target:'hr', endpoint:'https://example.test/translate', fetchImpl }),
    /Não foi possível traduzir agora/
  );
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/translator.test.mjs`

Expected: FAIL because `js/translator.js` does not exist.

- [ ] **Step 3: Implement the minimal module**

Use this public shape:

```js
export const TRANSLATOR_TARGETS = Object.freeze({
  hr: Object.freeze({ label:'Croata', flag:'🇭🇷', speechLanguage:'Croata' }),
  hu: Object.freeze({ label:'Húngaro', flag:'🇭🇺', speechLanguage:'Húngaro' }),
  sl: Object.freeze({ label:'Esloveno', flag:'🇸🇮', speechLanguage:'Esloveno' })
});

export function validateTranslationInput(text, target) {
  const cleanText = String(text ?? '').trim();
  if (!cleanText) throw new Error('Digite uma frase em português.');
  if (!TRANSLATOR_TARGETS[target]) throw new Error('Idioma não suportado.');
  if (cleanText.length > 500) throw new Error('Use até 500 caracteres por tradução.');
  return { text: cleanText, target };
}

export async function requestTranslation({ text, target, endpoint, fetchImpl = fetch }) {
  const payload = validateTranslationInput(text, target);
  if (!endpoint) throw new Error('Tradutor ainda não configurado.');
  try {
    const response = await fetchImpl(endpoint, {
      method:'POST',
      headers:{ 'content-type':'application/json' },
      body:JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('upstream');
    const data = await response.json();
    const translation = String(data?.translation ?? '').trim();
    if (!translation) throw new Error('empty');
    return translation;
  } catch (error) {
    if (/^(Digite|Idioma|Use até|Tradutor)/.test(error.message)) throw error;
    throw new Error('Não foi possível traduzir agora. Tente novamente.');
  }
}
```

Also export `translatorMarkup()` returning semantic HTML for the card with `data-translator-*` hooks, Brazilian source label, three flag buttons, textarea, result/status elements, `TRADUZIR COM GOOGLE`, disabled `OUVIR`/`COPIAR`, and the Google attribution container.

- [ ] **Step 4: Run tests**

Run: `node --test tests/translator.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/translator.js tests/translator.test.mjs
git commit -m "feat: add quick translator client logic"
```

---

### Task 3: Wire the translator into `Mais`, copy, audio, flags, errors, and attribution

**Files:**
- Modify: `js/app.js`
- Modify: `js/translator.js`
- Modify: `index.html`
- Create: `css/translator.css`
- Create: `tests/translator-ui.test.mjs`

**Interfaces:**
- Consumes: `translatorMarkup`, `requestTranslation`, `TRANSLATOR_TARGETS`, existing `speakPhrase` from `js/speech.js`.
- Produces: `bindTranslator(root, { endpoint, speak, clipboard, online })` and a rendered translator card in `renderMore()`.

- [ ] **Step 1: Write failing UI wiring tests**

Test static/wiring behavior without a DOM dependency:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { translatorMarkup } from '../js/translator.js';

test('translator markup uses Brazilian Portuguese and all target flags', () => {
  const html = translatorMarkup();
  assert.match(html, /🇧🇷 Português/);
  assert.match(html, /🇭🇷/);
  assert.match(html, /🇭🇺/);
  assert.match(html, /🇸🇮/);
  assert.match(html, /TRADUZIR COM GOOGLE/);
  assert.match(html, /data-translator-attribution/);
});

test('app renders translator before fixed phrase cards and loads its stylesheet', async () => {
  const app = await readFile(new URL('../js/app.js', import.meta.url), 'utf8');
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(app, /translatorMarkup\(\)/);
  assert.match(app, /bindTranslator/);
  assert.match(index, /css\/translator\.css/);
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/translator-ui.test.mjs`

Expected: FAIL because the translator is not wired into the app.

- [ ] **Step 3: Add translator rendering and behavior**

In `js/app.js`, import:

```js
import { translatorMarkup, bindTranslator } from './translator.js';
import { speakPhrase } from './speech.js';
```

Define a non-secret endpoint constant:

```js
const TRANSLATOR_ENDPOINT = 'https://adriatico-translator.<worker-subdomain>.workers.dev';
```

During implementation, replace this with the real deployed Worker URL before declaring live translation complete. If the Worker is not yet deployed, use an empty string and let the UI display `Tradutor ainda não configurado.` rather than inventing a URL.

In `renderMore()`, place `${translatorMarkup()}` before the `Object.entries(phrases)` cards, then call:

```js
bindTranslator(main, {
  endpoint: TRANSLATOR_ENDPOINT,
  speak: speakPhrase,
  clipboard: navigator.clipboard,
  online: () => navigator.onLine
});
```

Implement `bindTranslator` so that:

- target defaults to `hr`;
- selecting a flag updates `aria-pressed`, clears any old result, and disables Copy/Listen;
- submit refuses while offline with `Tradução livre precisa de internet.`;
- submit disables itself during the request and preserves textarea text after failures;
- successful result is written using `textContent`, never `innerHTML`;
- `OUVIR` calls `speak(translatedText, TRANSLATOR_TARGETS[target].speechLanguage, button)`;
- `COPIAR` calls `clipboard.writeText(translatedText)`;
- attribution is shown only with a successful dynamic Google translation.

- [ ] **Step 4: Add responsive iPhone-focused CSS**

Create `css/translator.css` with selectors scoped under `.translator-card`. Requirements:

```css
.translator-targets { display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem; }
.translator-target[aria-pressed="true"] { font-weight:700; transform:translateY(-1px); }
.translator-input { width:100%; min-height:5.5rem; resize:vertical; font:inherit; }
.translator-result[hidden], .translator-attribution[hidden] { display:none; }
.translator-actions { display:flex; gap:.5rem; flex-wrap:wrap; }
.translator-actions button { min-height:44px; }
```

Use the app's existing colors/borders/spacing variables rather than introducing an unrelated visual theme. Add `<link rel="stylesheet" href="./css/translator.css">` to `index.html` after existing app/speech CSS.

- [ ] **Step 5: Add Google attribution markup**

The result block must include a separate `data-translator-attribution` element adjacent to the result. Use the currently permitted Google attribution asset/link per the approved spec; do not draw a fake Google logo with CSS or plain text if current guidance requires an official badge asset.

- [ ] **Step 6: Run translator + existing speech tests**

Run: `node --test tests/translator.test.mjs tests/translator-ui.test.mjs tests/speech.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add js/app.js js/translator.js index.html css/translator.css tests/translator-ui.test.mjs
git commit -m "feat: add translator interface to travel app"
```

---

### Task 4: Implement the Cloudflare translation proxy without leaking the Google key

**Files:**
- Create: `worker/index.js`
- Create: `worker/wrangler.toml`
- Create: `tests/translator-worker.test.mjs`

**Interfaces:**
- Consumes: POST JSON `{ text:string, target:'hr'|'hu'|'sl' }`, `env.GOOGLE_TRANSLATE_API_KEY`, and `env.ALLOWED_ORIGIN`.
- Produces: HTTP 200 `{translation:string}` or generic 4xx/5xx `{error:string}`; CORS only for the allowed origin.

- [ ] **Step 1: Write failing Worker tests**

Design the Worker as an exported object with `fetch(request, env, ctx)` so Node can call it directly:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.js';

const env = {
  GOOGLE_TRANSLATE_API_KEY:'secret-test-key',
  ALLOWED_ORIGIN:'https://henriquemmafra.github.io'
};

test('rejects unsupported target without calling Google', async () => {
  const request = new Request('https://worker.test/', {
    method:'POST',
    headers:{ origin:env.ALLOWED_ORIGIN, 'content-type':'application/json' },
    body:JSON.stringify({ text:'Olá', target:'de' })
  });
  const response = await worker.fetch(request, env, {});
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error:'Pedido de tradução inválido.' });
});

test('uses x-goog-api-key and not a key query parameter', async () => {
  const originalFetch = globalThis.fetch;
  let googleRequest;
  globalThis.fetch = async (url, options) => {
    googleRequest = { url:String(url), options };
    return new Response(JSON.stringify({ data:{ translations:[{ translatedText:'Gdje je?' }] } }), {
      status:200,
      headers:{ 'content-type':'application/json' }
    });
  };
  try {
    const request = new Request('https://worker.test/', {
      method:'POST',
      headers:{ origin:env.ALLOWED_ORIGIN, 'content-type':'application/json' },
      body:JSON.stringify({ text:'Onde fica?', target:'hr' })
    });
    const response = await worker.fetch(request, env, {});
    assert.equal(response.status, 200);
    assert.equal(googleRequest.options.headers['x-goog-api-key'], 'secret-test-key');
    assert.doesNotMatch(googleRequest.url, /key=/);
    assert.deepEqual(await response.json(), { translation:'Gdje je?' });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('does not leak upstream errors', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('credential detail', { status:403 });
  try {
    const request = new Request('https://worker.test/', {
      method:'POST',
      headers:{ origin:env.ALLOWED_ORIGIN, 'content-type':'application/json' },
      body:JSON.stringify({ text:'Olá', target:'hr' })
    });
    const response = await worker.fetch(request, env, {});
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error:'Serviço de tradução indisponível.' });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/translator-worker.test.mjs`

Expected: FAIL because `worker/index.js` does not exist.

- [ ] **Step 3: Implement the Worker**

Core constants:

```js
const TARGETS = new Set(['hr','hu','sl']);
const GOOGLE_URL = 'https://translation.googleapis.com/language/translate/v2';
const MAX_TEXT = 500;
```

For a valid POST, call Google with:

```js
await fetch(GOOGLE_URL, {
  method:'POST',
  headers:{
    'content-type':'application/json',
    'x-goog-api-key':env.GOOGLE_TRANSLATE_API_KEY
  },
  body:JSON.stringify({ q:text, source:'pt', target, format:'text' })
});
```

Return only the decoded `data.translations[0].translatedText`. For invalid JSON, missing/blank/over-500 text, or unsupported target, return 400 with exactly `{error:'Pedido de tradução inválido.'}`. For Google failures or malformed upstream responses, return 502 with exactly `{error:'Serviço de tradução indisponível.'}`. Reject disallowed origins with 403. Handle `OPTIONS` for the allowed origin. Do not echo request bodies, upstream errors, or secrets.

For the lightweight abuse guard, reject payloads over 2 KiB using `content-length` when present and keep the 500-character validated text limit. Do not add a stateful third-party rate-limit dependency for this personal app.

- [ ] **Step 4: Add Worker config without secrets**

`worker/wrangler.toml`:

```toml
name = "adriatico-translator"
main = "index.js"
compatibility_date = "2026-09-07"

[vars]
ALLOWED_ORIGIN = "https://henriquemmafra.github.io"
```

The Google key is set only with Cloudflare's secret mechanism (`GOOGLE_TRANSLATE_API_KEY`) at deployment time; it must not appear in this file.

- [ ] **Step 5: Run Worker tests**

Run: `node --test tests/translator-worker.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add worker/index.js worker/wrangler.toml tests/translator-worker.test.mjs
git commit -m "feat: add secure translation worker"
```

---

### Task 5: Refresh PWA cache and verify the full regression suite

**Files:**
- Modify: `service-worker.js`
- Modify: `tests/pwa-wiring.test.mjs`

**Interfaces:**
- Consumes: new `js/translator.js` and `css/translator.css` assets.
- Produces: cache `adriatico-2026-v15` containing both new frontend assets.

- [ ] **Step 1: Update the failing PWA expectation first**

Change the wiring test so it expects:

```js
assert.match(index, /css\/translator\.css/);
assert.match(worker, /\.\/js\/translator\.js/);
assert.match(worker, /\.\/css\/translator\.css/);
assert.match(worker, /adriatico-2026-v15/);
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/pwa-wiring.test.mjs`

Expected: FAIL while service worker still uses v14 and lacks translator assets.

- [ ] **Step 3: Update service worker**

Change:

```js
const CACHE = 'adriatico-2026-v15';
```

Add to `PRECACHE`:

```js
'./css/translator.css',
'./js/translator.js',
```

Do not cache user-entered text or translation API responses.

- [ ] **Step 4: Run the complete Node test suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add service-worker.js tests/pwa-wiring.test.mjs
git commit -m "chore: refresh PWA cache for translator"
```

---

### Task 6: Deployment configuration and live smoke test

**Files:**
- Modify: `README.md`
- Modify: `js/app.js` only after the real Worker URL is known

**Interfaces:**
- Consumes: deployed Cloudflare Worker URL and secret `GOOGLE_TRANSLATE_API_KEY` stored outside Git.
- Produces: live translator on the production GitHub Pages PWA.

- [ ] **Step 1: Document deployment commands and secret boundary**

Add a README section containing these operational steps without the actual secret value:

```text
1. Enable Google Cloud Translation Basic v2 for the chosen Google Cloud project.
2. Create/restrict an API key for the Translation API.
3. Deploy `worker/` to Cloudflare Workers.
4. Store the key as Worker secret `GOOGLE_TRANSLATE_API_KEY`.
5. Set `ALLOWED_ORIGIN` to the exact GitHub Pages origin.
6. Put the deployed Worker HTTPS URL in `TRANSLATOR_ENDPOINT` in `js/app.js`.
7. Re-run `node --test tests/*.test.mjs` before publishing.
```

- [ ] **Step 2: Deploy Worker outside the repository secret surface**

Use the Cloudflare account's Worker deployment flow and set the secret there. Do not paste the key into a commit, issue, PR, Pages variable, or chat-visible source file.

Expected: Worker endpoint returns 200 for an allowed-origin POST and does not reveal the key in source or responses.

- [ ] **Step 3: Set the real endpoint URL in `js/app.js` and run tests**

Replace the empty/config placeholder with the real HTTPS Worker URL. Run:

`node --test tests/*.test.mjs`

Expected: all tests PASS.

- [ ] **Step 4: Production smoke test on iPhone**

Verify, in order:

1. Open `Mais` and confirm `🇧🇷 Português` with 🇭🇷 🇭🇺 🇸🇮 target buttons.
2. Translate `Onde fica a estação de ônibus?` to Croatian.
3. Confirm a non-empty result and Google attribution appear together.
4. Tap `COPIAR` and paste into a temporary text field to confirm only translated text copied.
5. Tap `🔊 OUVIR` and confirm Croatian speech starts.
6. Change to Hungarian and verify the old Croatian result clears before a new request.
7. Turn off connectivity and verify dynamic translation says `Tradução livre precisa de internet.` while fixed phrase cards remain visible.
8. Tap audio on a fixed phrase such as `Oprostite` and confirm the existing local speech path still works.

- [ ] **Step 5: Commit deployment wiring/docs**

```bash
git add README.md js/app.js
git commit -m "docs: document and wire translator deployment"
```

---

## Plan self-review

- Spec coverage: fixed phrases, three targets, Brazilian source flag, online translation, copy, local audio, offline fallback, no history, Google attribution, Worker secret boundary, CORS, generic errors, cache refresh, and iPhone smoke test are all assigned to explicit tasks.
- Placeholder scan: the only endpoint placeholder is intentionally forbidden from being committed as a fake live value; Task 6 requires replacing it with the actual deployment URL before live-complete status.
- Type/interface consistency: target codes are `hr|hu|sl` throughout; speech labels are `Croata|Húngaro|Esloveno`; frontend request/Worker payload is consistently `{text,target}`; Worker response is consistently `{translation}`.
