# Quick Translator + Essential Phrases — Design

Date: 2026-09-07
Repository: `henriquemmafra/viagemcroacia`

## Goal

Add a fast translation surface to the existing Adriático 2026 PWA so Henrique and Cibele can type any phrase in Portuguese and translate it into Croatian, Hungarian, or Slovenian while traveling. Preserve the existing fixed phrase cards for offline use and add four missing essential phrases.

## User experience

The `Mais` screen will show a new **Tradutor rápido** card above the existing language phrase cards.

The source language is fixed as Brazilian Portuguese and is shown as **🇧🇷 Português**.

The target language is selected through three large flag buttons:

- 🇭🇷 Croata
- 🇭🇺 Húngaro
- 🇸🇮 Esloveno

The selected target remains visually highlighted.

The card contains:

1. Portuguese text input / textarea with placeholder such as `Escreva em português…`.
2. `TRADUZIR COM GOOGLE` action.
3. Translation result area.
4. Google Translate attribution adjacent to the translated result, following the current Cloud Translation attribution requirements.
5. `🔊 OUVIR` action that speaks the translated text.
6. `COPIAR` action that copies only the translated text.
7. Compact loading and error states.

Example flow:

`🇧🇷 Onde fica a estação de ônibus?` → select 🇭🇷 → `Gdje je autobusni kolodvor?` → `🔊 OUVIR` / `COPIAR`.

Pressing Enter may submit on a single-line interaction; the interface must remain comfortable on iPhone and must not accidentally submit while the user is composing text with an IME.

## Translation architecture

The current application is a static GitHub Pages PWA. Google translation credentials must **not** be stored in `trip-data.js`, frontend JavaScript, HTML, the repository, or the service worker cache.

Use a small **Cloudflare Worker** as the HTTPS translation proxy between the PWA and Google Cloud Translation Basic v2:

`GitHub Pages PWA -> Cloudflare Worker -> Google Cloud Translation Basic v2 -> Worker -> PWA`

Cloud Translation Basic v2 is chosen because it supports API-key authentication. The Worker stores that key as a deployment secret; the browser never receives it.

The frontend sends only:

```json
{
  "text": "Onde fica a estação?",
  "target": "hr"
}
```

Accepted target values are strictly limited to:

- `hr` — Croatian
- `hu` — Hungarian
- `sl` — Slovenian

Source language is always `pt`.

The frontend endpoint URL will live in a small configuration constant. It is not a secret.

### Worker behavior

The Worker will:

- accept POST requests only;
- validate `text` and `target`;
- reject unsupported target languages;
- trim empty input;
- enforce a practical maximum input size;
- call `POST https://translation.googleapis.com/language/translate/v2` with source `pt`, the requested target, and plain-text format;
- authenticate to Google using a Worker secret passed via the `x-goog-api-key` request header;
- return a minimal JSON payload such as `{ "translation": "..." }`;
- return generic user-safe errors without leaking credentials or upstream internals;
- allow CORS only for the production GitHub Pages origin plus a local development origin if needed;
- apply a lightweight rate limit / abuse guard suitable for a small personal travel app.

The Worker implementation should live in the repository under a dedicated directory (for example `worker/`) so its code can be versioned, while the actual Google API key exists only in the Worker deployment secret store.

## Google attribution

Because the app displays unmodified Google translation results directly to users, the UI must comply with Google Cloud Translation attribution requirements current at implementation time.

At minimum:

- the translation action is labeled `Traduzir com Google`;
- the result area includes the required Google Translate attribution/badge adjacent to the translated text;
- the badge links to Google Translate as required;
- the app/help documentation states that Google Translate powers the dynamic translation feature.

Do not imitate the Google Translate product UI or modify Google brand assets beyond what the attribution guidance permits.

## Audio

Reuse the app's existing Web Speech / `speechSynthesis` implementation in `js/speech.js`.

Locale mapping already exists:

- Croatian → `hr-HR`
- Hungarian → `hu-HU`
- Slovenian → `sl-SI`

After a translation succeeds, `🔊 OUVIR` passes the translated text and selected language to the same speech path used by the fixed phrase cards.

If a matching system voice is unavailable, use the current fallback behavior and show the existing unavailable state rather than failing translation.

This keeps audio fast and avoids a second paid/network service for speech.

## Offline behavior

Dynamic translation is explicitly **online-only**.

If offline:

- keep the translator card visible;
- disable or gracefully reject `TRADUZIR COM GOOGLE` with a clear message such as `Tradução livre precisa de internet.`;
- keep the fixed phrase cards fully usable;
- keep fixed-phrase audio using local speech synthesis when supported by the device.

No translated user text is added to the service-worker precache.

## Fixed phrase additions

Extend the existing `phrases` structure in `js/trip-data.js` with these items:

### Croatian

- Com licença → `Oprostite`
- Desculpa → `Žao mi je`
- Sim → `Da`
- Não → `Ne`

### Hungarian

- Com licença → `Elnézést`
- Desculpa → `Bocsánat`
- Sim → `Igen`
- Não → `Nem`

### Slovenian

- Com licença → `Oprostite`
- Desculpa → `Žal mi je`
- Sim → `Da`
- Não → `Ne`

These entries automatically receive the existing 🔊 buttons because `enhancePhrasePronunciation()` enhances every translated `<b>` entry inside `.phrase-grid`.

## Frontend structure

Keep responsibilities separated:

- `js/trip-data.js` — fixed essential phrases only.
- `js/speech.js` — pronunciation / speech only.
- new `js/translator.js` — target-language configuration, request validation, HTTP translation call, and translator UI event handling.
- `js/app.js` — render the translator card in `renderMore()` and initialize/bind it after rendering.
- new or existing CSS file — translator layout, flag selector, loading/error/result states and attribution placement.
- `service-worker.js` — precache the new frontend asset(s) and increment the cache version so the installed PWA receives the update.
- `worker/` — Cloudflare Worker translation proxy and its tests/configuration, with no secrets committed.

Avoid putting network translation logic directly into `app.js`.

## Interaction details

- Default target: 🇭🇷 Croatian, because Croatia is the first country in the trip flow.
- Changing target after a result is shown clears the old result; it must never silently relabel a translation from a different language.
- Disable duplicate submissions while a request is pending.
- Preserve the typed Portuguese text after errors so it can be retried.
- `COPIAR` is disabled until a result exists.
- `OUVIR` is disabled until a result exists.
- Escape rendered content; do not inject translated text as HTML.
- Do not store translation history by default.

## Privacy and security

Do not send anything except the text the user explicitly submits and the selected target language.

Do not add analytics, translation history, geolocation, clipboard reads, or background translation requests.

Do not expose Google credentials in browser-delivered assets, GitHub commits, Pages configuration, service-worker files, or query strings.

## Testing

Add tests that verify at minimum:

1. all three target languages map to the expected language codes and speech locales;
2. unsupported target languages are rejected before network submission;
3. blank input is rejected;
4. successful API response exposes only translated text to the UI;
5. error responses produce a safe user-facing state;
6. `Com licença`, `Desculpa`, `Sim`, and `Não` exist for all three languages;
7. the translator frontend asset is included in the PWA precache;
8. the service-worker cache version changes;
9. the Worker accepts only the three target codes and does not leak upstream error details;
10. the Worker sends the Google key in `x-goog-api-key`, never in a query string;
11. Google attribution is present with dynamic translation results;
12. existing speech tests continue to pass.

## Success criteria

The feature is complete when, on iPhone:

- the user can open `Mais`, type Portuguese, select 🇭🇷/🇭🇺/🇸🇮, and receive a Google-powered translation;
- the translated result can be copied and spoken with one tap;
- Google attribution is displayed correctly;
- no Google credential is visible in browser source or repository files;
- fixed phrases continue to work without internet and include the four new essentials;
- installing/opening the updated PWA does not remain stuck on the previous cached version.

## Deployment prerequisite

One external deployment step is required because GitHub Pages cannot safely hold the Google credential: deploy the versioned `worker/` code to a Cloudflare Worker, add the Google API key as a Worker secret, and set the resulting public Worker URL in the frontend configuration.

The repository implementation can be completed and tested without committing any secret, but live dynamic translation will only work after that Worker endpoint is deployed and configured.

## Out of scope

- automatic language detection;
- translating from Croatian/Hungarian/Slovenian back to Portuguese;
- conversation mode or microphone dictation;
- saving translation history;
- Google Text-to-Speech audio;
- additional languages beyond Croatian, Hungarian, and Slovenian.
