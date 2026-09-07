# Adriático Translator Worker

Proxy pequeno para tradução digitada e conversa por áudio do PWA. As credenciais Google ficam somente no Worker e nunca entram no GitHub Pages.

## Serviços Google

Habilite no mesmo projeto Google Cloud:

- **Cloud Translation API (Basic v2)** para português ↔ croata/húngaro/esloveno;
- **Cloud Speech-to-Text API** para transcrever `hr-HR`, `hu-HU` e `sl-SI`.

Crie chaves restritas às respectivas APIs. O frontend nunca recebe essas chaves.

## Publicar

1. Entre na conta Cloudflare pelo Wrangler.
2. Dentro de `worker/`, grave as duas chaves como secrets:

```bash
npx wrangler@latest secret put GOOGLE_TRANSLATE_API_KEY
npx wrangler@latest secret put GOOGLE_SPEECH_API_KEY
```

3. Publique:

```bash
npx wrangler@latest deploy
```

4. Copie a URL `https://adriatico-translator.<subdominio>.workers.dev` retornada pelo deploy para:

```html
<meta name="adriatico-translator-endpoint" content="">
```

em `index.html`.

Não coloque nenhuma API key em `wrangler.jsonc`, `index.html`, JavaScript do frontend, query string ou service worker.

## Tradução digitada

- navegador envia JSON contendo apenas `text` e `target`;
- origem da frase: `pt`;
- destinos aceitos: `hr`, `hu`, `sl`;
- limite: 500 caracteres;
- resposta: `{ "translation": "..." }`.

## Conversa por áudio

- navegador envia `multipart/form-data` com apenas `audio` e `locale`;
- locales aceitos: `hr-HR`, `hu-HU`, `sl-SI`;
- áudio esperado: WebM/Opus gravado pelo navegador;
- limite de payload de áudio: 1,5 MiB;
- o Worker envia o áudio ao Speech-to-Text, traduz a transcrição para português e retorna somente `{ transcript, translation }`;
- áudio, transcrição e tradução não são persistidos pelo código do Worker.

## Segurança e operação

- origem padrão permitida: `https://henriquemmafra.github.io`;
- chaves enviadas ao Google somente no header `x-goog-api-key`;
- erros upstream são reduzidos a mensagens genéricas;
- respostas usam `cache-control: no-store`;
- limite leve por instância: 30 solicitações/minuto por IP/origem;
- `wrangler.jsonc` contém somente configuração não secreta.
