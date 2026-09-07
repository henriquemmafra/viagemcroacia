# Adriático Translator Worker

Proxy pequeno para a tradução livre do PWA. O navegador envia apenas `text` e `target`; a chave do Google Cloud Translation nunca entra no GitHub Pages.

## Publicar

1. No Google Cloud, habilite **Cloud Translation API (Basic v2)** e crie/restrinja uma API key para essa API.
2. Entre na conta Cloudflare pelo Wrangler.
3. Dentro de `worker/`, grave a chave como secret:

```bash
npx wrangler@latest secret put GOOGLE_TRANSLATE_API_KEY
```

4. Publique:

```bash
npx wrangler@latest deploy
```

5. Copie a URL `https://adriatico-translator.<subdominio>.workers.dev` retornada pelo deploy para o atributo `content` de:

```html
<meta name="adriatico-translator-endpoint" content="">
```

em `index.html`.

Não coloque a API key em `wrangler.jsonc`, `index.html`, JavaScript do frontend, query string ou service worker.

## Comportamento

- origem padrão permitida: `https://henriquemmafra.github.io`;
- idiomas de destino: `hr`, `hu`, `sl`;
- fonte fixa: `pt`;
- limite por frase: 500 caracteres;
- chave enviada ao Google somente no header `x-goog-api-key`;
- erros upstream são reduzidos a uma mensagem genérica;
- limite leve por instância: 30 solicitações/minuto por IP/origem.
