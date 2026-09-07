# Adriático 2026

PWA mobile-first para a viagem de Henrique & Cibele em setembro de 2026.

## Roteiro atual

- 7–9 set · Dubrovnik
- 9–11 set · Budapest
- 11–13 set · Ljubljana + Bled, sem carro
- 13 set · Postojna + Predjama → Koper → Rovinj
- 14 set · ônibus Rovinj → Pula; retirada SIXT às 09:30
- 14–17 set · Ístria → Rastoke → Plitvice de carro
- 17 set · devolução SIXT Split Airport às 19:30
- 17–21 set · Split + Krka + Vis, sem carro

## PWA

- tela **Hoje** com um cartão inteligente que alterna entre **AGORA**, **PRÓXIMO** e **DIA CONCLUÍDO**;
- timeline do dia com eventos passados ainda visíveis porém esmaecidos, destaque para atual/próximo e indicador visual do progresso do dia;
- swipe entre dias, vestir/levar, alertas, clima, tickets e ações rápidas de navegação;
- tela **Roteiro** com visão geral da viagem;
- **Carteira** offline com QR codes, boarding passes, reservas e PINs;
- Maps/Waze/Uber por deeplink, com iconografia rápida para Maps e Waze;
- frases essenciais em croata, húngaro e esloveno com pronúncia local quando disponível;
- tradutor digitado de português para croata, húngaro e esloveno por meio de proxy seguro;
- modo conversa com botão **bandeira + 🎙️**: segure para gravar, `ESTOU OUVINDO` durante a fala e `TRADUZINDO…` após soltar;
- idioma de conversa escolhido pelo contexto do roteiro, com croata, húngaro e esloveno suportados;
- resultado de conversa mostra a transcrição original e a tradução em português, com **OUVIR ORIGINAL** e **RESPONDER**;
- service worker para funcionamento offline dos arquivos e informações locais do app.

## Internet e privacidade

A tradução digitada e a conversa por áudio requerem internet. As frases essenciais, roteiro e arquivos precacheados permanecem disponíveis offline.

O áudio é capturado somente enquanto o controle de microfone está sendo segurado, limitado a 20 segundos e não é persistido pelo app. Transcrições e traduções também não são armazenadas como histórico.

As chaves das APIs Google ficam somente no Cloudflare Worker como secrets. Dados de cartão, CVV, documentos digitalizados, chaves de API e dados bancários não fazem parte dos arquivos públicos do app.
