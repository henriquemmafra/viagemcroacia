import test from 'node:test';
import assert from 'node:assert/strict';
import {
  conversationLanguageForDay,
  requestConversationTranslation,
  createHoldToTalkController
} from '../js/conversation-audio.js';

test('maps itinerary dates to Croatian, Hungarian and Slovenian speech locales', () => {
  assert.deepEqual(conversationLanguageForDay({ date:'2026-09-09' }), {
    target:'hu', speechLocale:'hu-HU', flag:'🇭🇺', label:'Húngaro'
  });
  assert.equal(conversationLanguageForDay({ date:'2026-09-12' }).speechLocale, 'sl-SI');
  assert.equal(conversationLanguageForDay({ date:'2026-09-18' }).speechLocale, 'hr-HR');
  assert.equal(conversationLanguageForDay({ date:'2026-09-30' }, 'sl').speechLocale, 'sl-SI');
});

test('switches the mixed September 13 itinerary from Slovenian to Croatian at Rovinj arrival', () => {
  assert.equal(
    conversationLanguageForDay({ date:'2026-09-13' }, 'hr', new Date(2026, 8, 13, 17, 30)).speechLocale,
    'sl-SI'
  );
  assert.equal(
    conversationLanguageForDay({ date:'2026-09-13' }, 'sl', new Date(2026, 8, 13, 18, 5)).speechLocale,
    'hr-HR'
  );
});

test('sends only audio and locale and returns transcript plus Portuguese translation', async () => {
  const blob = new Blob(['voice'], { type:'audio/webm' });
  const fetchImpl = async (_url, options) => {
    assert.equal(options.method, 'POST');
    assert.ok(options.body instanceof FormData);
    assert.deepEqual([...options.body.keys()].sort(), ['audio','locale']);
    assert.equal(options.body.get('locale'), 'hr-HR');
    assert.equal(options.body.get('audio').size, blob.size);
    return { ok:true, json:async () => ({ transcript:'Dobar dan', translation:'Bom dia' }) };
  };
  assert.deepEqual(await requestConversationTranslation({
    blob, locale:'hr-HR', endpoint:'https://example.test/translate', fetchImpl
  }), { transcript:'Dobar dan', translation:'Bom dia' });
});

test('maps upstream audio errors to a safe message', async () => {
  const fetchImpl = async () => ({ ok:false, json:async () => ({ error:'secret upstream detail' }) });
  await assert.rejects(
    requestConversationTranslation({
      blob:new Blob(['voice'], { type:'audio/webm' }), locale:'hr-HR', endpoint:'https://example.test/translate', fetchImpl
    }),
    /Não foi possível traduzir o áudio agora/
  );
});

class FakeRecorder {
  constructor(stream) {
    this.stream = stream;
    this.state = 'inactive';
    this.listeners = new Map();
    this.mimeType = 'audio/webm';
  }
  addEventListener(name, fn) { this.listeners.set(name, fn); }
  start() { this.state = 'recording'; }
  stop() {
    if (this.state === 'inactive') return;
    this.state = 'inactive';
    this.listeners.get('dataavailable')?.({ data:new Blob(['voice'], { type:'audio/webm' }) });
    this.listeners.get('stop')?.();
  }
}

function fakeStream() {
  const track = { stopped:false, stop() { this.stopped = true; } };
  return { track, getTracks:() => [track] };
}

test('hold starts listening and release stops tracks then submits audio', async () => {
  const stream = fakeStream();
  const states = [];
  const submitted = [];
  const controller = createHoldToTalkController({
    getUserMedia:async () => stream,
    MediaRecorderCtor:FakeRecorder,
    online:() => true,
    setStatus:(value) => states.push(value),
    onAudio:async (blob) => submitted.push(blob),
    setTimer:() => 1,
    clearTimer:() => {}
  });

  assert.equal(await controller.start(), true);
  assert.equal(states.at(-1), 'ESTOU OUVINDO');
  assert.equal(controller.stop({ submit:true }), true);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(states.includes('TRADUZINDO…'), true);
  assert.equal(stream.track.stopped, true);
  assert.equal(submitted.length, 1);
});

test('offline press never requests microphone permission', async () => {
  let requested = false;
  const states = [];
  const controller = createHoldToTalkController({
    getUserMedia:async () => { requested = true; return fakeStream(); },
    MediaRecorderCtor:FakeRecorder,
    online:() => false,
    setStatus:(value) => states.push(value),
    onAudio:async () => {}
  });
  assert.equal(await controller.start(), false);
  assert.equal(requested, false);
  assert.equal(states.at(-1), 'Áudio precisa de internet.');
});

test('release before microphone permission resolves never starts hidden recording', async () => {
  let resolvePermission;
  const permission = new Promise((resolve) => { resolvePermission = resolve; });
  const stream = fakeStream();
  const states = [];
  const controller = createHoldToTalkController({
    getUserMedia:() => permission,
    MediaRecorderCtor:FakeRecorder,
    online:() => true,
    setStatus:(value) => states.push(value),
    onAudio:async () => {}
  });

  const starting = controller.start();
  controller.stop({ submit:true });
  resolvePermission(stream);
  assert.equal(await starting, false);
  assert.equal(stream.track.stopped, true);
  assert.equal(states.includes('ESTOU OUVINDO'), false);
});

test('twenty second safety timer submits the utterance', async () => {
  const stream = fakeStream();
  let timerCallback;
  let submitted = 0;
  const controller = createHoldToTalkController({
    getUserMedia:async () => stream,
    MediaRecorderCtor:FakeRecorder,
    online:() => true,
    setStatus:() => {},
    onAudio:async () => { submitted += 1; },
    setTimer:(fn, ms) => { assert.equal(ms, 20_000); timerCallback = fn; return 7; },
    clearTimer:() => {}
  });
  await controller.start();
  timerCallback();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(submitted, 1);
  assert.equal(stream.track.stopped, true);
});
