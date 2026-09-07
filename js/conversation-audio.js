const LANGUAGES = Object.freeze({
  hr:Object.freeze({ target:'hr', speechLocale:'hr-HR', flag:'🇭🇷', label:'Croata' }),
  hu:Object.freeze({ target:'hu', speechLocale:'hu-HU', flag:'🇭🇺', label:'Húngaro' }),
  sl:Object.freeze({ target:'sl', speechLocale:'sl-SI', flag:'🇸🇮', label:'Esloveno' })
});

const DATE_LANGUAGE = Object.freeze({
  '2026-09-07':'hr',
  '2026-09-08':'hr',
  '2026-09-09':'hu',
  '2026-09-10':'hu',
  '2026-09-11':'sl',
  '2026-09-12':'sl',
  '2026-09-13':'sl',
  '2026-09-14':'hr',
  '2026-09-15':'hr',
  '2026-09-16':'hr',
  '2026-09-17':'hr',
  '2026-09-18':'hr',
  '2026-09-19':'hr',
  '2026-09-20':'hr',
  '2026-09-21':'hr'
});

export function conversationLanguageForDay(day = {}, fallbackTarget = 'hr') {
  const code = DATE_LANGUAGE[String(day?.date || '')] || (LANGUAGES[fallbackTarget] ? fallbackTarget : 'hr');
  return { ...LANGUAGES[code] };
}

export async function requestConversationTranslation({ blob, locale, endpoint, fetchImpl = fetch }) {
  if (!endpoint) throw new Error('Tradutor de áudio ainda não configurado.');
  if (!(blob instanceof Blob) || !blob.size) throw new Error('Nenhum áudio gravado.');
  if (!['hr-HR','hu-HU','sl-SI'].includes(locale)) throw new Error('Idioma de áudio não suportado.');

  const form = new FormData();
  form.set('audio', blob, 'speech.webm');
  form.set('locale', locale);

  try {
    const response = await fetchImpl(endpoint, { method:'POST', body:form });
    if (!response.ok) throw new Error('upstream');
    const data = await response.json();
    const transcript = String(data?.transcript || '').trim();
    const translation = String(data?.translation || '').trim();
    if (!transcript || !translation) throw new Error('empty');
    return { transcript, translation };
  } catch (error) {
    if (/^(Tradutor de áudio|Nenhum áudio|Idioma de áudio)/.test(error?.message || '')) throw error;
    throw new Error('Não foi possível traduzir o áudio agora.');
  }
}

function preferredMimeType(MediaRecorderCtor) {
  const supports = MediaRecorderCtor?.isTypeSupported?.bind(MediaRecorderCtor);
  if (!supports) return '';
  return [
    'audio/webm;codecs=opus',
    'audio/ogg;codecs=opus',
    'audio/webm',
    'audio/mp4'
  ].find((type) => supports(type)) || '';
}

export function createHoldToTalkController({
  getUserMedia = globalThis.navigator?.mediaDevices?.getUserMedia?.bind(globalThis.navigator.mediaDevices),
  MediaRecorderCtor = globalThis.MediaRecorder,
  online = () => globalThis.navigator?.onLine !== false,
  setStatus = () => {},
  onAudio = async () => {},
  setTimer = globalThis.setTimeout?.bind(globalThis),
  clearTimer = globalThis.clearTimeout?.bind(globalThis),
  maxDurationMs = 20_000
} = {}) {
  let generation = 0;
  let pressed = false;
  let recorder = null;
  let stream = null;
  let chunks = [];
  let timer = null;
  let submitOnStop = false;

  const clearSafetyTimer = () => {
    if (timer !== null && clearTimer) clearTimer(timer);
    timer = null;
  };

  const stopTracks = (targetStream = stream) => {
    try { targetStream?.getTracks?.().forEach((track) => track.stop()); } catch {}
    if (targetStream === stream) stream = null;
  };

  const resetRecorder = () => {
    recorder = null;
    chunks = [];
    submitOnStop = false;
  };

  async function finishRecording(localRecorder) {
    clearSafetyTimer();
    const shouldSubmit = submitOnStop;
    const mimeType = localRecorder?.mimeType || chunks.find((chunk) => chunk?.type)?.type || 'audio/webm';
    const blob = chunks.length ? new Blob(chunks, { type:mimeType }) : null;
    stopTracks();
    resetRecorder();

    if (!shouldSubmit || !blob?.size) {
      setStatus('IDLE');
      return;
    }

    setStatus('TRADUZINDO…');
    try {
      await onAudio(blob);
      setStatus('IDLE');
    } catch (error) {
      setStatus(error?.message || 'Não foi possível traduzir o áudio agora.');
    }
  }

  async function start() {
    if (pressed || recorder) return false;
    if (!online()) {
      setStatus('Áudio precisa de internet.');
      return false;
    }
    if (typeof getUserMedia !== 'function' || typeof MediaRecorderCtor !== 'function') {
      setStatus('Microfone não disponível neste navegador.');
      return false;
    }

    pressed = true;
    const token = ++generation;
    let grantedStream;
    try {
      grantedStream = await getUserMedia({ audio:true });
    } catch {
      if (token === generation) {
        pressed = false;
        setStatus('Não foi possível acessar o microfone.');
      }
      return false;
    }

    if (!pressed || token !== generation) {
      stopTracks(grantedStream);
      return false;
    }

    stream = grantedStream;
    chunks = [];
    const mimeType = preferredMimeType(MediaRecorderCtor);
    try {
      recorder = mimeType ? new MediaRecorderCtor(stream, { mimeType }) : new MediaRecorderCtor(stream);
    } catch {
      pressed = false;
      stopTracks();
      setStatus('Microfone não disponível neste navegador.');
      return false;
    }

    const localRecorder = recorder;
    localRecorder.addEventListener('dataavailable', (event) => {
      if (event?.data?.size) chunks.push(event.data);
    });
    localRecorder.addEventListener('stop', () => { void finishRecording(localRecorder); }, { once:true });
    localRecorder.start();
    setStatus('ESTOU OUVINDO');
    if (setTimer) timer = setTimer(() => stop({ submit:true }), maxDurationMs);
    return true;
  }

  function stop({ submit = true } = {}) {
    if (!pressed && !recorder) return false;
    pressed = false;

    if (!recorder) {
      generation += 1;
      clearSafetyTimer();
      setStatus('IDLE');
      return true;
    }

    submitOnStop = Boolean(submit);
    clearSafetyTimer();
    if (recorder.state !== 'inactive') recorder.stop();
    else void finishRecording(recorder);
    return true;
  }

  function cancel() {
    return stop({ submit:false });
  }

  return { start, stop, cancel };
}
