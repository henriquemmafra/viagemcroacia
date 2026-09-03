export const VOICE_LOCALES = Object.freeze({
  Croata: 'hr-HR',
  Húngaro: 'hu-HU',
  Esloveno: 'sl-SI'
});

export function localeForLanguage(language) {
  return VOICE_LOCALES[language] || null;
}

export function buildSpeechRequest(text, language) {
  const cleanText = String(text ?? '').trim();
  const lang = localeForLanguage(language);
  if (!cleanText || !lang) return null;
  return { text: cleanText, lang, rate: 0.9 };
}

function findBestVoice(lang) {
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices?.() || [];
  const exact = voices.find((voice) => voice.lang?.toLowerCase() === lang.toLowerCase());
  if (exact) return exact;
  const base = lang.split('-')[0].toLowerCase();
  return voices.find((voice) => voice.lang?.toLowerCase().startsWith(`${base}-`)) || null;
}

function setSpeakingButton(activeButton) {
  document.querySelectorAll('.speak-phrase-btn.is-speaking').forEach((button) => {
    if (button !== activeButton) button.classList.remove('is-speaking');
  });
  activeButton?.classList.add('is-speaking');
}

export function speakPhrase(text, language, button = null) {
  const request = buildSpeechRequest(text, language);
  if (!request) return false;
  if (typeof speechSynthesis === 'undefined' || typeof SpeechSynthesisUtterance === 'undefined') return false;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(request.text);
  utterance.lang = request.lang;
  utterance.rate = request.rate;
  const voice = findBestVoice(request.lang);
  if (voice) utterance.voice = voice;

  utterance.onstart = () => setSpeakingButton(button);
  const finish = () => button?.classList.remove('is-speaking');
  utterance.onend = finish;
  utterance.onerror = finish;
  speechSynthesis.speak(utterance);
  return true;
}

export function enhancePhrasePronunciation(root = document) {
  root.querySelectorAll('.more-card').forEach((card) => {
    const language = card.querySelector('h3')?.textContent?.trim();
    if (!localeForLanguage(language)) return;
    const grid = card.querySelector('.phrase-grid');
    if (!grid) return;

    grid.querySelectorAll('b').forEach((translation) => {
      if (translation.dataset.speechEnhanced === 'true') return;
      const phrase = translation.textContent.trim();
      if (!phrase) return;

      translation.dataset.speechEnhanced = 'true';
      translation.classList.add('phrase-translation');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'speak-phrase-btn';
      button.dataset.speakPhrase = phrase;
      button.dataset.speakLanguage = language;
      button.setAttribute('aria-label', `Ouvir pronúncia em ${language}: ${phrase}`);
      button.title = 'Ouvir pronúncia';
      button.textContent = '🔊';
      translation.append(button);
    });
  });
}

function boot() {
  const main = document.querySelector('#app-main');
  if (!main) return;

  enhancePhrasePronunciation(main);
  const observer = new MutationObserver(() => enhancePhrasePronunciation(main));
  observer.observe(main, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-speak-phrase]');
    if (!button) return;
    event.preventDefault();
    const ok = speakPhrase(button.dataset.speakPhrase, button.dataset.speakLanguage, button);
    if (!ok) {
      button.title = 'Pronúncia não disponível neste navegador';
      button.classList.add('is-unavailable');
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
