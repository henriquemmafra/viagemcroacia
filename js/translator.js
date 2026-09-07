import { speakPhrase } from './speech.js';
import {
  conversationLanguageForDay,
  requestConversationTranslation,
  createHoldToTalkController
} from './conversation-audio.js';

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
    if (/^(Digite|Idioma|Use até|Tradutor)/.test(error?.message || '')) throw error;
    throw new Error('Não foi possível traduzir agora. Tente novamente.');
  }
}

export function translatorMarkup() {
  return `<section class="more-card translator-card" data-translator-card>
    <div class="translator-head">
      <div><div class="translator-kicker">TRADUTOR RÁPIDO</div><h3>🇧🇷 Português</h3></div>
      <span class="translator-online-note">internet necessária</span>
    </div>
    <div class="translator-direction" aria-label="Escolher idioma de destino">
      <span>🇧🇷</span><span aria-hidden="true">→</span>
      <div class="translator-targets">
        ${Object.entries(TRANSLATOR_TARGETS).map(([code, item], index) => `<button type="button" class="translator-target" data-translator-target="${code}" aria-pressed="${index === 0 ? 'true' : 'false'}">${item.flag} ${item.label}</button>`).join('')}
      </div>
    </div>
    <div class="conversation-panel" data-conversation-panel>
      <div class="conversation-kicker">SEGURE O MICROFONE PARA OUVIR O IDIOMA LOCAL</div>
      <button type="button" class="conversation-mic" data-conversation-mic aria-label="Segure para falar em croata">
        <span data-conversation-mic-content>🇭🇷 🎙️</span>
      </button>
      <div class="conversation-state" data-conversation-state aria-live="polite"></div>
      <div class="conversation-result" data-conversation-result hidden>
        <div class="conversation-line conversation-line--original" data-conversation-original></div>
        <div class="conversation-line conversation-line--portuguese" data-conversation-portuguese></div>
        <div class="conversation-actions">
          <button type="button" data-conversation-listen>🔊 OUVIR ORIGINAL</button>
          <button type="button" data-conversation-reply>RESPONDER</button>
        </div>
      </div>
    </div>
    <form data-translator-form>
      <label class="translator-label" for="translator-input">Escreva em português</label>
      <textarea id="translator-input" class="translator-input" data-translator-input maxlength="500" rows="3" placeholder="Ex.: Onde fica a estação de ônibus?"></textarea>
      <button class="translator-submit" data-translator-submit type="submit">TRADUZIR COM GOOGLE</button>
    </form>
    <div class="translator-status" data-translator-status role="status" aria-live="polite"></div>
    <div class="translator-result-wrap" data-translator-result-wrap hidden>
      <div class="translator-result-label">Tradução</div>
      <div class="translator-result" data-translator-result></div>
      <a class="translator-attribution" data-translator-attribution href="https://translate.google.com" target="_blank" rel="noopener" hidden aria-label="Powered by Google Translate">
        <span class="translator-google-badge"><img src="https://docs.cloud.google.com/static/translate/images/text-attribution.png" alt="powered by Google Translate"></span>
      </a>
      <div class="translator-actions">
        <button type="button" data-translator-speak disabled>🔊 OUVIR</button>
        <button type="button" data-translator-copy disabled>COPIAR</button>
      </div>
    </div>
    <details class="translator-disclaimer"><summary>Sobre a tradução</summary><p>This service may contain translations powered by Google. Google disclaims all warranties related to the translations.</p></details>
  </section>`;
}

function translatorEndpoint(doc = document) {
  return doc.querySelector('meta[name="adriatico-translator-endpoint"]')?.getAttribute('content')?.trim() || '';
}

export function bindTranslator(root, {
  endpoint = translatorEndpoint(root?.ownerDocument || document),
  fetchImpl = fetch,
  speak = speakPhrase,
  clipboard = globalThis.navigator?.clipboard,
  online = () => globalThis.navigator?.onLine !== false
} = {}) {
  const card = root?.querySelector?.('[data-translator-card]');
  if (!card || card.dataset.translatorBound === 'true') return false;
  card.dataset.translatorBound = 'true';

  const doc = card.ownerDocument || document;
  const form = card.querySelector('[data-translator-form]');
  const input = card.querySelector('[data-translator-input]');
  const submit = card.querySelector('[data-translator-submit]');
  const status = card.querySelector('[data-translator-status]');
  const resultWrap = card.querySelector('[data-translator-result-wrap]');
  const result = card.querySelector('[data-translator-result]');
  const attribution = card.querySelector('[data-translator-attribution]');
  const speakButton = card.querySelector('[data-translator-speak]');
  const copyButton = card.querySelector('[data-translator-copy]');
  const targetButtons = [...card.querySelectorAll('[data-translator-target]')];
  const mic = card.querySelector('[data-conversation-mic]');
  const micContent = card.querySelector('[data-conversation-mic-content]');
  const conversationState = card.querySelector('[data-conversation-state]');
  const conversationResult = card.querySelector('[data-conversation-result]');
  const conversationOriginal = card.querySelector('[data-conversation-original]');
  const conversationPortuguese = card.querySelector('[data-conversation-portuguese]');
  const conversationListen = card.querySelector('[data-conversation-listen]');
  const conversationReply = card.querySelector('[data-conversation-reply]');
  let target = targetButtons.find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.translatorTarget || 'hr';
  let pending = false;
  let voiceTranscript = '';
  let voiceLanguage = conversationLanguageForDay({ date:doc.documentElement?.dataset?.tripDate }, target);

  const clearResult = () => {
    result.textContent = '';
    resultWrap.hidden = true;
    attribution.hidden = true;
    speakButton.disabled = true;
    copyButton.disabled = true;
    status.textContent = '';
  };

  const selectTarget = (code, { clear = true } = {}) => {
    if (!TRANSLATOR_TARGETS[code]) return;
    target = code;
    targetButtons.forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.translatorTarget === code)));
    if (clear) clearResult();
  };

  const updateVoiceLanguage = () => {
    voiceLanguage = conversationLanguageForDay({ date:doc.documentElement?.dataset?.tripDate }, target);
    if (!mic.disabled) mic.setAttribute('aria-label', `Segure para falar em ${voiceLanguage.label.toLowerCase()}`);
    if (!mic.classList.contains('is-recording') && !mic.classList.contains('is-processing')) micContent.textContent = `${voiceLanguage.flag} 🎙️`;
  };

  const setVoiceStatus = (value) => {
    mic.classList.remove('is-recording', 'is-processing');
    if (value === 'ESTOU OUVINDO') {
      mic.disabled = false;
      mic.classList.add('is-recording');
      micContent.textContent = '🔴 ESTOU OUVINDO';
      conversationState.textContent = '';
      return;
    }
    if (value === 'TRADUZINDO…') {
      mic.disabled = true;
      mic.classList.add('is-processing');
      micContent.textContent = '⏳ TRADUZINDO…';
      conversationState.textContent = '';
      return;
    }
    mic.disabled = false;
    updateVoiceLanguage();
    conversationState.textContent = value === 'IDLE' ? '' : String(value || '');
  };

  const showConversation = ({ transcript, translation }) => {
    voiceTranscript = transcript;
    conversationOriginal.textContent = `${voiceLanguage.flag} ${transcript}`;
    conversationPortuguese.textContent = `🇧🇷 ${translation}`;
    conversationResult.hidden = false;
  };

  const controller = createHoldToTalkController({
    online,
    setStatus:setVoiceStatus,
    onAudio:async (blob) => {
      const response = await requestConversationTranslation({
        blob,
        locale:voiceLanguage.speechLocale,
        endpoint,
        fetchImpl
      });
      showConversation(response);
    }
  });

  updateVoiceLanguage();

  targetButtons.forEach((button) => button.addEventListener('click', () => {
    selectTarget(button.dataset.translatorTarget);
    updateVoiceLanguage();
  }));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending) return;
    if (!online()) {
      status.textContent = 'Tradução livre precisa de internet.';
      return;
    }
    pending = true;
    submit.disabled = true;
    status.textContent = 'Traduzindo…';
    try {
      const translated = await requestTranslation({ text:input.value, target, endpoint, fetchImpl });
      result.textContent = translated;
      resultWrap.hidden = false;
      attribution.hidden = false;
      speakButton.disabled = false;
      copyButton.disabled = false;
      status.textContent = '';
    } catch (error) {
      status.textContent = error?.message || 'Não foi possível traduzir agora. Tente novamente.';
    } finally {
      pending = false;
      submit.disabled = false;
    }
  });

  speakButton.addEventListener('click', () => {
    const text = result.textContent.trim();
    if (text) speak(text, TRANSLATOR_TARGETS[target].speechLanguage, speakButton);
  });

  copyButton.addEventListener('click', async () => {
    const text = result.textContent.trim();
    if (!text || !clipboard?.writeText) return;
    try {
      await clipboard.writeText(text);
      status.textContent = 'Tradução copiada.';
    } catch {
      status.textContent = 'Não foi possível copiar automaticamente.';
    }
  });

  const beginHold = async (event) => {
    if (!endpoint) {
      setVoiceStatus('Tradutor de áudio ainda não configurado.');
      return;
    }
    event?.preventDefault?.();
    try { if (event?.pointerId !== undefined) mic.setPointerCapture?.(event.pointerId); } catch {}
    await controller.start();
  };
  const endHold = (event) => {
    event?.preventDefault?.();
    controller.stop({ submit:true });
  };
  const cancelHold = () => controller.cancel();

  mic.addEventListener('pointerdown', beginHold);
  mic.addEventListener('pointerup', endHold);
  mic.addEventListener('pointercancel', cancelHold);
  mic.addEventListener('contextmenu', (event) => event.preventDefault());

  mic.addEventListener('keydown', (event) => {
    if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) void beginHold(event);
  });
  mic.addEventListener('keyup', (event) => {
    if (event.key === ' ' || event.key === 'Enter') endHold(event);
  });

  conversationListen.addEventListener('click', () => {
    if (voiceTranscript) speak(voiceTranscript, voiceLanguage.label, conversationListen);
  });

  conversationReply.addEventListener('click', () => {
    selectTarget(voiceLanguage.target, { clear:false });
    input.focus();
    input.scrollIntoView?.({ block:'center', behavior:'smooth' });
  });

  const disconnectObserver = new MutationObserver(() => {
    if (!card.isConnected) {
      controller.cancel();
      disconnectObserver.disconnect();
    }
  });
  disconnectObserver.observe(root, { childList:true, subtree:true });

  doc.addEventListener('visibilitychange', () => {
    if (doc.visibilityState === 'hidden') controller.cancel();
  });

  return true;
}

export function installTranslator(root = document) {
  const main = root.querySelector?.('#app-main');
  if (!main) return false;
  const enhance = () => {
    if (!main.querySelector('[data-translator-card]')) {
      const cards = [...main.querySelectorAll('.more-card')];
      const firstLanguageCard = cards.find((card) => TRANSLATOR_TARGETS.hr.label === card.querySelector('h3')?.textContent?.trim()) ||
        cards.find((card) => ['Croata','Húngaro','Esloveno'].includes(card.querySelector('h3')?.textContent?.trim()));
      if (firstLanguageCard) firstLanguageCard.insertAdjacentHTML('beforebegin', translatorMarkup());
    }
    bindTranslator(main);
  };
  enhance();
  const observer = new MutationObserver(enhance);
  observer.observe(main, { childList:true, subtree:true });
  return true;
}

if (typeof document !== 'undefined') {
  const boot = () => installTranslator(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
}
