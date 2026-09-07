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
- atalho inteligente para **Google Tradutor**, abrindo Português ↔ Croata/Húngaro/Esloveno conforme o dia da viagem;
- em 13 de setembro, o atalho troca de esloveno para croata após a chegada planejada a Rovinj às 18:05;
- no Google Tradutor, o viajante pode usar texto, câmera, microfone e modo conversa sem nenhuma API própria do PWA;
- service worker para funcionamento offline dos arquivos e informações locais do app.

## Internet e privacidade

Roteiro, tickets precacheados e frases essenciais continuam disponíveis offline. O atalho do Google Tradutor requer internet para abrir e usar os recursos online do Google.

O PWA não mantém chave de API, Cloudflare Worker, gravação própria de áudio ou histórico de traduções. Dados de cartão, CVV, documentos digitalizados, chaves de API e dados bancários não fazem parte dos arquivos públicos do app.
