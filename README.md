# Adriático 2026 — Travel Companion PWA

PWA iPhone-first para a viagem de Henrique & Cibele (7–21 setembro de 2026), baseada no livreto definitivo.

## O que já funciona

- Home abre no dia correspondente à data local do aparelho; antes da viagem abre 7/set com contagem regressiva.
- Swipe esquerda/direita entre dias.
- Cards AGORA e PRÓXIMO com contagem regressiva durante o dia real.
- Timeline dos 15 dias.
- O que vestir / o que levar / alertas e perrengues.
- Botões Uber, Google Maps e Waze em locais relevantes.
- Carteira offline com Dubrovnik Pass, Wizz Air e FlixBus extraídos do livreto.
- Hotéis e confirmações.
- Emergências, checklist, frases e pendências.
- Service worker + manifest + ícones para instalação como Web App.

## Testar localmente

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Instalar no iPhone

A PWA precisa estar publicada em HTTPS (GitHub Pages, Cloudflare Pages, Netlify etc.). Depois:

1. Abra a URL no Safari.
2. Compartilhar.
3. Adicionar à Tela de Início / Abrir como App da Web.
4. Abra uma vez com internet para preencher o cache offline.

## Atualizar roteiro

Edite `js/trip-data.js`. Não é necessário alterar a interface para adicionar observações, tickets ou eventos.

## Observação de precisão

Os links de navegação usam nomes/endereços textuais do roteiro, sem coordenadas inventadas. Itens que estavam pendentes no livreto continuam explicitamente marcados para confirmação.
