# Live Day + Conversation Mode — Design

Date: 2026-09-07
Repository: `henriquemmafra/viagemcroacia`
Branch: `feature/quick-translator-and-nav-icons`

## Goal

Make the travel PWA easier to use at a glance during the trip by turning the Today screen into a live, time-aware day view and by extending the translator into a two-way spoken conversation tool for Croatian, Hungarian, and Slovenian.

This design builds on the already implemented quick translator, speech playback, phrase audio, navigation icons, and PWA cache work in the feature branch.

## Scope

This package adds three approved behaviors:

1. Replace the separate `AGORA` and `PRÓXIMO` cards with one adaptive smart card.
2. Make the day timeline visibly progress with time while keeping past events visible but faded.
3. Add a spoken local-language → Brazilian Portuguese conversation path to the translator, with the local language chosen automatically from the itinerary date/city.

No previously approved feature is removed.

---

## 1. Single adaptive smart card

### Current behavior

The Today screen renders two cards side-by-side: one for `AGORA` and another for `PRÓXIMO`.

### New behavior

Replace those two cards with one larger card whose content depends on the current temporal state.

#### When an event is currently happening

Show:

- `▶ AGORA`
- event title
- start/end time
- location when available
- ticket button when available
- `Uber`, `📍 Maps`, and `🧭 Waze` when a location exists
- the next event as compact secondary context, including countdown when available

#### When no event is currently active but a future event exists

Show:

- `↓ PRÓXIMO`
- next event title
- event time
- countdown such as `em 42 min`
- location and available travel/ticket actions
- a departure cue when useful

#### Departure cue

The smart card may show `SAIR EM …` only when the event has an explicit usable departure lead time. Do not invent travel times from Maps or geolocation.

A new optional event field may be used:

```js
leaveBeforeMinutes: 30
```

For an event at 13:00 with `leaveBeforeMinutes: 30`, the leave target is 12:30. Before 12:30, show `SAIR EM 22 MIN`; at/after 12:30 show `HORA DE SAIR` until the event starts.

If `leaveBeforeMinutes` is absent, show the normal event countdown only.

#### Non-current itinerary day

When the user swipes to a future day, the smart card shows the first timed event as `PRÓXIMO` but does not show a live departure countdown against today's clock.

For a past selected day, show a neutral summary such as `DIA CONCLUÍDO` rather than pretending that an event is currently active.

---

## 2. Timeline that visually advances with time

### Event states

Every timed event on the selected current day gets one of four states:

- **past** — remains fully present in the timeline but visually faded; include a subtle `✓` state cue.
- **current** — strongest emphasis.
- **next** — secondary emphasis.
- **future** — normal appearance.

Untimed events remain normal unless they are explicitly marked otherwise by existing app logic.

### Determining past events

An event is past when:

- it has an explicit `end` time and now is at/after that end; or
- it has no `end`, and the next timed event has already started; or
- for the last timed event without an end, use the same one-hour fallback already used by `getDayTemporalState()`.

The temporal model should expose enough information for rendering without duplicating time-comparison logic inside `app.js`.

### Visual treatment

Past events:

- remain readable and tappable;
- use lower opacity/contrast than future events;
- must not be hidden, collapsed, removed, or reordered;
- navigation and ticket controls remain available.

Current event:

- stronger border/accent;
- current timeline dot filled;
- visually dominant over next/future events.

Next event:

- secondary border/accent.

### Timeline progress line

The vertical timeline rail becomes a progress indicator on the current day.

- The completed portion visually fills from the first timed event toward the current time.
- Progress is clamped between 0% and 100%.
- Before the first timed event: 0%.
- After the final timed event's effective end: 100%.
- On non-current selected days, do not animate against the current clock; future days show 0%, past days 100%.

Prefer a CSS custom property such as:

```css
.timeline { --timeline-progress: 46%; }
```

and render the progress fill using CSS rather than inserting many extra DOM elements.

### Live refresh

Temporal styling and smart-card content should update while the Today screen remains open.

Use a lightweight timer (approximately once per minute) and clear/reuse it safely when the tab/day changes so repeated renders do not create multiple intervals.

---

## 3. Spoken conversation mode

### Existing translator remains

Keep the current typed flow:

`🇧🇷 Português → 🇭🇷/🇭🇺/🇸🇮`

including:

- typed input;
- Google-powered translation through the secure Worker;
- copy;
- translated speech playback;
- Google attribution;
- fixed offline phrase cards.

### New local-language voice input

Above the Portuguese text input, add a prominent local-language voice button.

Examples by itinerary context:

- Croatia: `🇭🇷 PODE FALAR`
- Hungary: `🇭🇺 PODE FALAR`
- Slovenia: `🇸🇮 PODE FALAR`

The local language is chosen automatically from the selected itinerary day, not from geolocation.

### Itinerary-language mapping

Use an explicit mapping rather than fuzzy string detection where practical.

Expected trip context:

- Croatian (`hr-HR`) for Croatian stops such as Dubrovnik, Rovinj, Pula, Plitvice, Split.
- Hungarian (`hu-HU`) for Budapest.
- Slovenian (`sl-SI`) for Ljubljana, Bled, Postojna and other Slovenian stops.

If a day cannot be mapped confidently, default to the current manually selected translator target rather than guessing.

### Voice-state copy

The button text is intentionally communicative for the person holding/speaking toward the phone.

State flow:

1. idle: `🇭🇷 PODE FALAR`
2. recording: `🔴 ESTOU OUVINDO`
3. upload/transcription/translation: `⏳ TRADUZINDO…`
4. success: return to `🇭🇷 PODE FALAR`
5. error: return to idle and show a concise error message

The recording state must be visibly unmistakable.

### Audio capture

Do not depend solely on the browser's `SpeechRecognition` API.

Use `MediaRecorder` / `getUserMedia({ audio:true })` when supported to record a short utterance after an explicit tap.

Rules:

- microphone permission is requested only after the user taps `PODE FALAR`;
- provide an explicit stop action while recording, or auto-stop at a conservative maximum duration;
- maximum recording duration: 20 seconds;
- release microphone tracks immediately after recording or cancellation;
- do not record in the background;
- do not retain audio in browser storage;
- show a clear unsupported-browser message if audio capture is unavailable.

### Server flow

Extend the secure Worker with a dedicated speech endpoint/operation.

Conceptual data flow:

`iPhone microphone → Worker → Google Speech-to-Text → transcribed local text → Google Translation → Portuguese → PWA`

The Worker must keep all Google credentials server-side.

The browser sends:

- the recorded audio payload;
- the explicitly resolved local language code.

The Worker:

1. validates language (`hr-HR`, `hu-HU`, `sl-SI` only);
2. validates size/content type;
3. sends audio to Google Speech-to-Text using the correct language;
4. obtains the local-language transcript;
5. translates that transcript to Brazilian Portuguese;
6. returns only the transcript and Portuguese translation needed by the UI;
7. does not expose upstream errors or credentials.

### Conversation result UI

After success, show both sides:

```text
🇭🇷 Koliko košta karta?
🇧🇷 Quanto custa o ingresso?
```

Actions:

- `🔊 OUVIR ORIGINAL` — use the existing browser speech path with the local language.
- `RESPONDER` — focus the Portuguese typed-input area and keep the local target selected so the user can type a reply and translate/speak it back.

Do not add persistent conversation history in this package.

### Offline behavior

- Fixed phrase cards and their local browser speech remain available offline when supported by the device.
- Typed dynamic translation remains online-only.
- Local-language voice transcription/translation is online-only.
- When offline, `PODE FALAR` remains visible but produces a clear `Áudio precisa de internet.` state rather than requesting microphone access.

---

## Component boundaries

Keep responsibilities isolated.

### `js/core.js`

Own temporal calculations:

- event timing/state;
- timeline progress percentage;
- leave-time calculation.

No DOM manipulation.

### `js/app.js`

Own rendering/binding of:

- smart live card;
- timeline state classes;
- minute refresh lifecycle.

Do not put speech/network implementation here.

### `js/trip-data.js` / trip day modules

May add explicit metadata such as `leaveBeforeMinutes` only to events where the itinerary already provides a reliable buffer.

Do not fabricate travel-duration estimates.

### `js/translator.js`

Own existing typed translator and conversation-mode UI/state wiring.

### New `js/conversation-audio.js`

Own:

- itinerary language mapping helpers;
- audio recording lifecycle;
- MediaRecorder support detection;
- audio request construction/client call.

Avoid growing `translator.js` into a monolith.

### `worker/index.js`

Own server-side validation and Google API calls for translation and speech transcription.

### CSS

Use existing app visual variables and add only scoped styles needed for:

- smart-card states;
- timeline past/current/next/progress states;
- conversation button/result states.

---

## Privacy and safety

- No geolocation is required for selecting the spoken language.
- Microphone access occurs only after a direct tap.
- Recorded audio is sent only for the requested transcription/translation action.
- Do not store audio, transcripts, translations, or conversation history persistently.
- Do not add analytics or background recording.
- Google credentials remain outside browser-delivered code and GitHub repository secrets/files.

---

## Accessibility and iPhone behavior

- Keep touch targets at least 44px high.
- Voice status changes use `aria-live` so state is announced.
- `ESTOU OUVINDO` must not rely on color alone; the text itself conveys state.
- Past timeline events remain legible enough to read.
- Respect reduced-motion preferences; timeline progress does not require animation.
- When microphone permission is denied, return the UI to a usable idle state without breaking typed translation.

---

## Testing

Add/extend tests for at least:

### Smart card and timing

1. current event produces `AGORA` state;
2. gap between events produces `PRÓXIMO` state;
3. future selected day does not use today's countdown;
4. past selected day uses completed-day state;
5. explicit `leaveBeforeMinutes` produces `SAIR EM …` before leave time and `HORA DE SAIR` after it;
6. events without a leave buffer never invent one.

### Timeline

7. ended events are marked past but remain rendered;
8. current/next/future states are distinct;
9. timeline progress is 0% before first event, between 0–100% during the day, and 100% after the effective final end;
10. non-current future/past days use deterministic 0%/100%;
11. minute refresh does not accumulate duplicate intervals.

### Conversation language

12. Croatian itinerary dates resolve to `hr-HR` / 🇭🇷;
13. Budapest resolves to `hu-HU` / 🇭🇺;
14. Slovenian dates resolve to `sl-SI` / 🇸🇮;
15. unknown context falls back safely rather than guessing.

### Audio client

16. unsupported MediaRecorder/getUserMedia produces a safe message;
17. recording is capped at 20 seconds;
18. microphone tracks are stopped after completion/cancel/error;
19. offline state prevents microphone request;
20. UI state sequence uses exactly `PODE FALAR`, `ESTOU OUVINDO`, `TRADUZINDO…`.

### Worker

21. only `hr-HR`, `hu-HU`, and `sl-SI` speech input is accepted;
22. oversized/invalid audio is rejected before Google calls;
23. Google credential is never sent in query strings or returned to client;
24. speech transcript is translated to Portuguese and only safe fields are returned;
25. upstream speech/translation error detail is not leaked.

### Regression

26. existing typed translator tests still pass;
27. existing speech/phrase tests still pass;
28. existing navigation/ticket/day tests still pass;
29. service-worker cache version increments and new frontend asset is precached.

---

## Success criteria

The feature is complete when:

- the Today screen shows one adaptive `AGORA`/`PRÓXIMO` card instead of two competing cards;
- the timeline visually communicates past/current/next/future while all past events remain visible;
- the timeline rail indicates day progress;
- the view updates as time passes without page reload;
- the translator automatically shows the correct local flag/language for the selected itinerary day;
- a local speaker can tap `PODE FALAR`, see `ESTOU OUVINDO`, speak, and receive a Portuguese translation;
- the user can listen to the original transcript and immediately switch to typing a Portuguese reply;
- typed translation and fixed phrases continue to work as before;
- no microphone recording, transcript, or Google credential is persisted in the app;
- the entire automated test suite passes before integration to `main`.

## Deployment dependency

As with the already designed typed translator, live speech and translation require the Cloudflare Worker to be deployed with Google credentials configured as server-side secrets. The repository code can be fully implemented and tested without placing any secret in GitHub, but the live Google-backed features cannot operate until that external Worker is deployed and its endpoint is configured in the PWA.
