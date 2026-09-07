# Live Day + Conversation Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Today screen into a live time-aware view and extend the translator with press-and-hold local-language voice translation to Brazilian Portuguese.

**Architecture:** Extend the existing pure timing helpers in `js/core.js`, keep Today-screen rendering in `js/app.js`, isolate microphone and itinerary-language logic in a new `js/conversation-audio.js`, and extend the existing Cloudflare Worker with a separate speech operation. The browser never receives Google credentials and records only while the microphone control is intentionally held.

**Tech Stack:** Static ES modules, browser Pointer Events + MediaRecorder/getUserMedia, Node built-in test runner, GitHub Pages/PWA service worker, Cloudflare Worker Web APIs, Google Cloud Translation Basic v2, Google Cloud Speech-to-Text REST API.

**Spec:** `docs/superpowers/specs/2026-09-07-live-day-and-conversation-mode-design.md`

## Global Constraints

- Keep all past timeline events visible; fade them rather than hiding, collapsing, removing, or reordering them.
- Current event is strongest emphasis; next event is secondary emphasis; future events remain normal.
- The timeline rail uses a 0–100% progress value and refreshes approximately once per minute while Today is open.
- Replace the two `AGORA`/`PRÓXIMO` cards with one adaptive smart card.
- Never invent departure time. Show `SAIR EM …`/`HORA DE SAIR` only when `leaveBeforeMinutes` exists on an event.
- Typed `🇧🇷 Português → local language` translation remains unchanged.
- Voice input is local language → Brazilian Portuguese and uses itinerary context, not geolocation.
- Idle voice control is icon-first: local flag + microphone; do not display `PODE FALAR`.
- Hold starts recording; release submits; recording state text is exactly `ESTOU OUVINDO`; processing state is `TRADUZINDO…`.
- Maximum recording duration is 20 seconds.
- Audio, transcript, translation, and conversation history are not persisted.
- Google credentials remain server-side only.
- Voice translation is online-only; existing fixed phrases and their local speech remain offline-capable.
- Keep existing Maps/Waze/Uber, ticket, weather, calendar, phrase, and translator behavior working.

---

### Task 1: Extend temporal model for past/current/next/future, progress, and leave cues

**Files:**
- Modify: `js/core.js`
- Create: `tests/live-day-core.test.mjs`

**Interfaces:**
- Produces: `getDayTemporalState(day, now)` with existing `{current,next,nextAt}` plus `eventStates: Map<Event,string>` and `progress: number`.
- Produces: `getLeaveCue(day, event, now)` returning `null`, `SAIR EM <N> MIN`, or `HORA DE SAIR`.
- Existing consumers of `current`, `next`, and `nextAt` remain source-compatible.

- [ ] **Step 1: Write failing tests**

Create `tests/live-day-core.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getDayTemporalState, getLeaveCue } from '../js/core.js';

const day = {
  date:'2026-09-07',
  events:[
    { time:'09:00', end:'10:00', title:'A' },
    { time:'11:00', title:'B', leaveBeforeMinutes:30 },
    { time:'13:00', end:'14:00', title:'C' }
  ]
};

test('marks ended/current/next/future events while keeping references', () => {
  const state = getDayTemporalState(day, new Date(2026, 8, 7, 11, 30));
  assert.equal(state.eventStates.get(day.events[0]), 'past');
  assert.equal(state.eventStates.get(day.events[1]), 'current');
  assert.equal(state.eventStates.get(day.events[2]), 'next');
});

test('uses the next timed event as effective end when end is omitted', () => {
  const state = getDayTemporalState(day, new Date(2026, 8, 7, 12, 59));
  assert.equal(state.current, day.events[1]);
  assert.equal(state.eventStates.get(day.events[1]), 'current');
});

test('timeline progress clamps from zero to one hundred', () => {
  assert.equal(getDayTemporalState(day, new Date(2026, 8, 7, 8, 0)).progress, 0);
  const during = getDayTemporalState(day, new Date(2026, 8, 7, 11, 30)).progress;
  assert.ok(during > 0 && during < 100);
  assert.equal(getDayTemporalState(day, new Date(2026, 8, 7, 15, 0)).progress, 100);
});

test('leave cue is emitted only for explicit leaveBeforeMinutes', () => {
  assert.equal(getLeaveCue(day, day.events[1], new Date(2026, 8, 7, 10, 10)), 'SAIR EM 20 MIN');
  assert.equal(getLeaveCue(day, day.events[1], new Date(2026, 8, 7, 10, 35)), 'HORA DE SAIR');
  assert.equal(getLeaveCue(day, day.events[2], new Date(2026, 8, 7, 12, 0)), null);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/live-day-core.test.mjs`

Expected: FAIL because `eventStates`, `progress`, and `getLeaveCue` do not exist.

- [ ] **Step 3: Implement timing helpers in `js/core.js`**

Add a pure helper for effective timed ranges. Preserve event-object identity so `eventStates.get(event)` works.

```js
function timedEventRanges(day) {
  const timed = (day?.events ?? []).filter((event) => /^\d{2}:\d{2}$/.test(event.time ?? ''));
  return timed.map((event, index) => {
    const start = eventDate(day.date, event.time);
    const nextStart = timed[index + 1] ? eventDate(day.date, timed[index + 1].time) : null;
    const end = event.end
      ? eventDate(day.date, event.end)
      : nextStart || new Date(start.getTime() + 60 * 60 * 1000);
    return { event, start, end };
  });
}
```

Refactor `getDayTemporalState()` to set exactly one state per timed event: `past`, `current`, `next`, or `future`, where `next` is the first future event. Compute `progress` using the first range start and final range end, clamped with:

```js
const progress = Math.max(0, Math.min(100, ((now - firstStart) / (lastEnd - firstStart)) * 100));
```

Add:

```js
export function getLeaveCue(day, event, now = new Date()) {
  const minutes = Number(event?.leaveBeforeMinutes);
  if (!Number.isFinite(minutes) || minutes <= 0 || !/^\d{2}:\d{2}$/.test(event?.time ?? '')) return null;
  const start = eventDate(day.date, event.time);
  if (now >= start) return null;
  const leaveAt = new Date(start.getTime() - minutes * 60000);
  if (now >= leaveAt) return 'HORA DE SAIR';
  const remaining = Math.max(1, Math.round((leaveAt - now) / 60000));
  return `SAIR EM ${remaining} MIN`;
}
```

- [ ] **Step 4: Run focused and regression core tests**

Run: `node --test tests/live-day-core.test.mjs tests/day-tools.test.mjs tests/month-calendar.test.mjs`

Expected: PASS.

---

### Task 2: Replace two Today status cards with one smart card and live timeline styling

**Files:**
- Modify: `js/app.js`
- Modify: `css/app.css`
- Create: `tests/live-day-ui.test.mjs`

**Interfaces:**
- Consumes: `getDayTemporalState`, `getLeaveCue`, existing `formatCountdown`, `navActions`, and `ticketButton`.
- Produces: `smartStatusCard(day, temporal, now)` markup and event cards with `is-past`, `is-current`, `is-next`, `is-future` classes.
- Produces: one minute refresh interval stored in `state.temporalRefresh`.

- [ ] **Step 1: Write failing UI wiring tests**

Create `tests/live-day-ui.test.mjs` that reads `js/app.js` and `css/app.css` and asserts:

```js
assert.match(app, /function smartStatusCard\(/);
assert.doesNotMatch(app, /class=\"now-next\"/);
assert.match(app, /getLeaveCue/);
assert.match(app, /is-past/);
assert.match(app, /--timeline-progress/);
assert.match(app, /temporalRefresh/);
assert.match(css, /\.smart-status-card/);
assert.match(css, /\.tl-item\.is-past/);
assert.match(css, /timeline-progress/);
```

Also assert `Maps`/`Waze` labels are not regressed by this task; `nav-icons.js` remains responsible for icon decoration.

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/live-day-ui.test.mjs`

Expected: FAIL because the smart card and timeline state classes are absent.

- [ ] **Step 3: Modify `js/app.js` imports and state**

Import `getLeaveCue` from `./core.js` and add `temporalRefresh:null` to `state`.

- [ ] **Step 4: Replace `statusCards()` with `smartStatusCard()`**

Use this behavior:

```js
function smartStatusCard(day, temporal, now = new Date()) {
  const current = temporal.current;
  const next = temporal.next;
  const focus = current || next;
  const tag = current ? '▶ AGORA' : next ? '↓ PRÓXIMO' : '✓ DIA CONCLUÍDO';
  const leaveCue = !current && next ? getLeaveCue(day, next, now) : null;
  const countdown = !current && temporal.nextAt ? formatCountdown(temporal.nextAt - now) : '';
  // Render focus title/time/location/actions; when current exists add compact next-event context.
}
```

Rules:
- if current: primary content is current event and compact footer previews next event/countdown;
- if no current but next: primary content is next event, with explicit `leaveCue` preferred over ordinary countdown;
- if neither: show completed/neutral summary;
- use existing `ticketButton()` and `navActions()` for actions;
- future selected days do not compare their first event against today's clock; past selected days show completed state.

- [ ] **Step 5: Add event state classes and progress variable**

In `eventCard(event, temporal)` derive:

```js
const eventState = temporal.eventStates?.get(event) || 'future';
const stateClass = ` is-${eventState}`;
```

Keep every event in `day.events.map(...)` and preserve all buttons. For past state, render a subtle `✓` cue on the dot or time without removing content.

Render timeline with:

```js
<div class="timeline" style="--timeline-progress:${Number(temporal.progress || 0).toFixed(2)}%">
```

- [ ] **Step 6: Add safe minute refresh lifecycle**

Create helpers:

```js
function clearTemporalRefresh() {
  if (state.temporalRefresh) clearInterval(state.temporalRefresh);
  state.temporalRefresh = null;
}

function scheduleTemporalRefresh() {
  clearTemporalRefresh();
  if (state.tab !== 'today') return;
  state.temporalRefresh = setInterval(() => {
    if (state.tab === 'today') renderToday();
  }, 60_000);
}
```

Call `scheduleTemporalRefresh()` after Today renders and `clearTemporalRefresh()` when switching away from Today.

- [ ] **Step 7: Add scoped CSS to `css/app.css`**

Use existing variables only. Required selectors:

```css
.smart-status-card { margin:10px 0 14px; border-radius:16px; padding:14px; background:var(--ink); color:var(--paper); }
.smart-status-card.is-next { background:var(--white); color:var(--ink); border:1px solid rgba(26,92,122,.35); }
.smart-status-card__actions { display:flex; gap:5px; flex-wrap:wrap; margin-top:10px; }
.tl-item.is-past { opacity:.48; }
.tl-item.is-past .tl-card { box-shadow:none; }
.tl-item.is-current { opacity:1; }
.timeline { --timeline-progress:0%; }
.timeline:before { content:""; position:absolute; left:41px; top:14px; bottom:14px; width:1px; background:var(--border); }
.timeline:after { content:""; position:absolute; left:41px; top:14px; width:2px; height:var(--timeline-progress); max-height:calc(100% - 28px); background:var(--med-blue); }
```

Adjust existing per-item rail so it does not visually double the new shared rail.

- [ ] **Step 8: Run UI + existing day tests**

Run: `node --test tests/live-day-core.test.mjs tests/live-day-ui.test.mjs tests/day-tools.test.mjs tests/nav-icons.test.mjs`

Expected: PASS.

---

### Task 3: Add itinerary-aware hold-to-talk audio client

**Files:**
- Create: `js/conversation-audio.js`
- Create: `tests/conversation-audio.test.mjs`
- Modify: `js/translator.js`
- Modify: `css/translator.css`

**Interfaces:**
- Produces: `conversationLanguageForDay(day, fallbackTarget='hr')` → `{ target, speechLocale, flag, label }`.
- Produces: `requestConversationTranslation({blob, locale, endpoint, fetchImpl})` → `{ transcript, translation }`.
- Produces: `createHoldToTalkController(options)` with `start()`, `stop({submit})`, and `cancel()` methods.
- `translator.js` consumes those helpers and renders `[data-conversation-mic]`, transcript/result, `OUVIR ORIGINAL`, and `RESPONDER`.

- [ ] **Step 1: Write failing language/audio tests**

Create `tests/conversation-audio.test.mjs` covering:

```js
assert.deepEqual(conversationLanguageForDay({ date:'2026-09-09', city:'Budapest' }), {
  target:'hu', speechLocale:'hu-HU', flag:'🇭🇺', label:'Húngaro'
});
assert.equal(conversationLanguageForDay({ date:'2026-09-12', city:'Bled' }).speechLocale, 'sl-SI');
assert.equal(conversationLanguageForDay({ date:'2026-09-18', city:'Split' }).speechLocale, 'hr-HR');
assert.equal(conversationLanguageForDay({ date:'2026-09-30', city:'Unknown' }, 'sl').speechLocale, 'sl-SI');
```

Test `requestConversationTranslation` sends a `FormData` payload containing exactly `audio` and `locale`, rejects missing endpoint, rejects empty response, and maps upstream failures to `Não foi possível traduzir o áudio agora.`.

Test `createHoldToTalkController` with injected `getUserMedia`, `MediaRecorderCtor`, and timers so:
- `start()` sets `ESTOU OUVINDO`;
- `stop({submit:true})` stops recorder and all tracks then sets `TRADUZINDO…` before request;
- `cancel()` stops tracks without request;
- 20-second timer auto-stops;
- offline prevents `getUserMedia` from being called;
- release-before-permission resolution never starts hidden recording.

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/conversation-audio.test.mjs`

Expected: FAIL because `js/conversation-audio.js` does not exist.

- [ ] **Step 3: Implement itinerary language mapping**

Use explicit itinerary date ranges first, with fallback target:

```js
const LANGUAGES = Object.freeze({
  hr:{ target:'hr', speechLocale:'hr-HR', flag:'🇭🇷', label:'Croata' },
  hu:{ target:'hu', speechLocale:'hu-HU', flag:'🇭🇺', label:'Húngaro' },
  sl:{ target:'sl', speechLocale:'sl-SI', flag:'🇸🇮', label:'Esloveno' }
});

const DATE_LANGUAGE = Object.freeze({
  '2026-09-07':'hr','2026-09-08':'hr','2026-09-09':'hu','2026-09-10':'hu',
  '2026-09-11':'sl','2026-09-12':'sl','2026-09-13':'sl',
  '2026-09-14':'hr','2026-09-15':'hr','2026-09-16':'hr','2026-09-17':'hr',
  '2026-09-18':'hr','2026-09-19':'hr','2026-09-20':'hr','2026-09-21':'hr'
});
```

For 13 September, the selected itinerary day may contain Slovenia→Croatia travel; use the day context's explicit language metadata if added later, otherwise keep Slovenian for the daytime itinerary and allow manual target override.

- [ ] **Step 4: Implement audio request client**

```js
export async function requestConversationTranslation({ blob, locale, endpoint, fetchImpl = fetch }) {
  if (!endpoint) throw new Error('Tradutor de áudio ainda não configurado.');
  if (!(blob instanceof Blob) || !blob.size) throw new Error('Nenhum áudio gravado.');
  const form = new FormData();
  form.set('audio', blob, 'speech.webm');
  form.set('locale', locale);
  // POST, require ok response and non-empty transcript + translation.
}
```

- [ ] **Step 5: Implement hold-to-talk controller with dependency injection**

`createHoldToTalkController` accepts:

```js
{
  getUserMedia,
  MediaRecorderCtor,
  online,
  setStatus,
  onAudio,
  setTimer = globalThis.setTimeout,
  clearTimer = globalThis.clearTimeout,
  maxDurationMs = 20_000
}
```

Track `pressGeneration` so an async permission grant from an already-released press is immediately closed without starting a recorder.

- [ ] **Step 6: Wire conversation UI in `translator.js`**

Extend `translatorMarkup()` above the Portuguese textarea with:

```html
<div class="conversation-panel" data-conversation-panel>
  <button type="button" class="conversation-mic" data-conversation-mic aria-label="Segure para falar">
    <span data-conversation-mic-content>🇭🇷 🎙️</span>
  </button>
  <div class="conversation-state" data-conversation-state aria-live="polite"></div>
  <div class="conversation-result" data-conversation-result hidden>
    <div data-conversation-original></div>
    <div data-conversation-portuguese></div>
    <div class="conversation-actions">
      <button type="button" data-conversation-listen>🔊 OUVIR ORIGINAL</button>
      <button type="button" data-conversation-reply>RESPONDER</button>
    </div>
  </div>
</div>
```

Resolve the current selected itinerary day from a document attribute supplied by Today/route navigation or, if `translator.js` is rendered on More, from a lightweight shared value placed on `document.documentElement.dataset.tripDate` by `app.js`. On target changes, keep the conversation fallback synchronized.

Pointer behavior:
- `pointerdown`: prevent text selection, capture pointer, call controller `start()`;
- `pointerup`: call `stop({submit:true})`;
- `pointercancel`: call `cancel()`;
- Space/Enter `keydown`/`keyup`: same start/submit flow.

Status copy:
- idle content: `<flag> 🎙️` only;
- recording: button content `🔴 ESTOU OUVINDO`;
- processing: button content `⏳ TRADUZINDO…`;
- success/error: return button content to idle flag + mic.

On success show `<flag> <transcript>` and `🇧🇷 <translation>`. `OUVIR ORIGINAL` calls existing `speakPhrase(transcript, label, button)`. `RESPONDER` focuses the Portuguese textarea and selects the matching target.

- [ ] **Step 7: Add conversation CSS**

Append to `css/translator.css`:

```css
.conversation-panel{margin:10px 0 12px;padding:10px;border:1px solid var(--border);border-radius:14px;background:rgba(251,248,242,.72)}
.conversation-mic{width:100%;min-height:64px;border:1px solid rgba(26,92,122,.28);border-radius:16px;background:var(--white);font-size:24px;touch-action:none;user-select:none;-webkit-user-select:none}
.conversation-mic.is-recording{font-size:13px;font-weight:700;color:var(--coral)}
.conversation-mic.is-processing{font-size:12px;font-weight:700;color:var(--med-blue)}
.conversation-state{min-height:16px;margin-top:5px;font-family:"Courier New",monospace;font-size:9px;color:var(--ink3)}
.conversation-result{margin-top:8px;padding:10px;border-radius:12px;background:var(--white);line-height:1.4}
.conversation-result[hidden]{display:none}
.conversation-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.conversation-actions button{min-height:44px;flex:1;border:1px solid var(--border);border-radius:9px;background:var(--paper);font-family:"Courier New",monospace;font-size:9px;font-weight:700}
```

- [ ] **Step 8: Run conversation + typed translator regression tests**

Run: `node --test tests/conversation-audio.test.mjs tests/translator.test.mjs tests/speech.test.mjs`

Expected: PASS.

---

### Task 4: Extend Cloudflare Worker for Google Speech-to-Text + Portuguese translation

**Files:**
- Modify: `worker/index.js`
- Modify: `worker/README.md`
- Modify: `worker/wrangler.jsonc`
- Create: `tests/conversation-worker.test.mjs`

**Interfaces:**
- Existing JSON translation POST remains unchanged.
- New multipart speech request accepts `audio` and `locale`.
- Produces safe JSON `{ transcript, translation }`.
- Consumes `GOOGLE_TRANSLATE_API_KEY` and a new server-side `GOOGLE_SPEECH_API_KEY` secret.

- [ ] **Step 1: Write failing Worker tests**

Create `tests/conversation-worker.test.mjs` for:
- locale whitelist accepts only `hr-HR`, `hu-HU`, `sl-SI`;
- multipart form with missing audio returns 400 before upstream calls;
- audio larger than 1.5 MiB returns 413 before upstream calls;
- Speech request uses `x-goog-api-key`, never query-string key;
- Speech request body uses `config.languageCode = locale` and base64 audio content;
- returned transcript is then sent to Translation with `source` matching `hr`/`hu`/`sl` and `target:'pt'`;
- success returns only `{ transcript, translation }`;
- upstream error bodies are not returned.

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/conversation-worker.test.mjs`

Expected: FAIL because multipart speech flow does not exist.

- [ ] **Step 3: Add speech constants and safe helpers**

In `worker/index.js` add:

```js
export const GOOGLE_SPEECH_URL = 'https://speech.googleapis.com/v1/speech:recognize';
const SPEECH_LOCALES = new Set(['hr-HR','hu-HU','sl-SI']);
const MAX_AUDIO_BYTES = 1_572_864;
```

Add a locale→translation-source helper:

```js
function sourceForLocale(locale) {
  return ({ 'hr-HR':'hr', 'hu-HU':'hu', 'sl-SI':'sl' })[locale] || '';
}
```

- [ ] **Step 4: Route multipart separately from existing JSON translation**

In `handleRequest`, after CORS/rate checks:
- `application/json` → existing typed translation path;
- `multipart/form-data` → speech path;
- anything else → 415.

Keep existing typed path behavior identical.

- [ ] **Step 5: Implement speech transcription**

Read `request.formData()`, validate `locale`, and require `audio` to be a `File`/`Blob` with `0 < size <= MAX_AUDIO_BYTES`.

Convert bytes to base64 without logging them. In Workers, use chunk-safe conversion rather than spreading arbitrarily large arrays:

```js
function bytesToBase64(bytes) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
```

Send:

```js
await fetchImpl(GOOGLE_SPEECH_URL, {
  method:'POST',
  headers:{ 'content-type':'application/json; charset=utf-8', 'x-goog-api-key':env.GOOGLE_SPEECH_API_KEY },
  body:JSON.stringify({
    config:{ languageCode:locale, enableAutomaticPunctuation:true },
    audio:{ content:base64 }
  })
});
```

Extract the first non-empty `alternatives[0].transcript` across results and cap accepted transcript length to 1000 characters.

- [ ] **Step 6: Translate local transcript to Portuguese**

Reuse a private translation helper so typed and speech paths share upstream error handling. For speech path call Translation with:

```js
{ q:transcript, source:sourceForLocale(locale), target:'pt', format:'text' }
```

Return only:

```js
{ transcript, translation }
```

- [ ] **Step 7: Update Worker docs/config**

Document two secrets:

```text
GOOGLE_TRANSLATE_API_KEY
GOOGLE_SPEECH_API_KEY
```

`wrangler.jsonc` must not contain either secret value. Keep allowed origins as non-secret configuration.

- [ ] **Step 8: Run Worker tests**

Run: `node --test tests/translator-worker.test.mjs tests/conversation-worker.test.mjs`

Expected: PASS.

---

### Task 5: Wire selected itinerary context, refresh PWA cache, and verify complete branch

**Files:**
- Modify: `js/app.js`
- Modify: `index.html` only if an additional non-secret endpoint hook is needed; prefer the existing translator endpoint for both JSON and multipart requests.
- Modify: `service-worker.js`
- Modify: `tests/pwa-wiring.test.mjs`
- Create: `tests/conversation-wiring.test.mjs`
- Modify: `README.md`

**Interfaces:**
- `app.js` sets `document.documentElement.dataset.tripDate = day.date` whenever the selected itinerary day changes/renders.
- `conversation-audio.js` is loaded as an ES module and precached.
- Existing endpoint meta remains a non-secret Worker URL shared by typed and voice translation.

- [ ] **Step 1: Write failing wiring tests**

Assert:

```js
assert.match(app, /dataset\.tripDate\s*=\s*day\.date/);
assert.match(index, /js\/conversation-audio\.js/);
assert.match(worker, /\.\/js\/conversation-audio\.js/);
assert.match(worker, /adriatico-2026-v16/);
```

Also assert the endpoint meta does not contain `translation.googleapis.com`, `speech.googleapis.com`, or an API key-like query string.

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/conversation-wiring.test.mjs tests/pwa-wiring.test.mjs`

Expected: FAIL because the new module/cache version are absent.

- [ ] **Step 3: Wire itinerary date and module loading**

Set the dataset in `renderToday()` before/while rendering the selected day. Also update it from route-day selection before switching to Today. Add:

```html
<script type="module" src="js/conversation-audio.js"></script>
```

only if `translator.js` does not import it directly. Prefer importing it from `translator.js`; if imported, do not add a duplicate script tag.

- [ ] **Step 4: Bump PWA cache**

Change:

```js
const CACHE = 'adriatico-2026-v16';
```

and add `./js/conversation-audio.js` to `PRECACHE`. Do not cache POST translation or speech responses.

- [ ] **Step 5: Update README**

Document:
- live smart card and timeline states;
- hold-to-talk microphone behavior;
- voice requires internet;
- Worker requires both Google secrets;
- no audio/history persistence.

- [ ] **Step 6: Run the full suite in GitHub Actions**

Run command in CI: `node --test tests/*.test.mjs`

Expected: all tests PASS, zero failures.

- [ ] **Step 7: Review branch diff against spec**

Verify:
- no `PODE FALAR` remains in production UI;
- `ESTOU OUVINDO` and `TRADUZINDO…` exist;
- past events remain in map/render loop;
- no API keys or Google credentials are committed;
- service-worker is v16 and includes the audio module;
- typed translation, phrase audio, Maps/Waze icons, weather, calendar, and tickets still have passing regression tests.

- [ ] **Step 8: Keep work on feature branch until user chooses integration**

Do not merge to `main` or publish until final verification is green and the user explicitly chooses integration.
