import { tripDays1 } from './trip-days-1.js';
import { tripDays2 } from './trip-days-2.js';
import { tripDays3 } from './trip-days-3.js';

export const tripDays = [...tripDays1, ...tripDays2, ...tripDays3];

export const routeOverview = [
  { dates:'7–9 set', city:'Dubrovnik', detail:'Old Town · muralhas · museus · Srđ', next:'✈️ voo para Budapest' },
  { dates:'9–11 set', city:'Budapest', detail:'Danúbio · Basílica · Jewish Quarter · Buda', next:'🚌 FlixBus 06:45 para Ljubljana' },
  { dates:'11–13 set', city:'Ljubljana + Bled', detail:'Ljubljana a pé · Bled/Vintgar de ônibus e shuttle', next:'🚌 Postojna · Predjama · Koper' },
  { dates:'13–16 set', city:'Rovinj + Ístria', detail:'Pula/Kamenjak de ônibus + táxi · Motovun/Grožnjan com motorista', next:'🚐 transfer via Rastoke para Plitvice' },
  { dates:'16–17 set', city:'Rastoke + Plitvice', detail:'Transfer até a hospedagem · Programa H cedo', next:'🚌 direto Plitvice → Split' },
  { dates:'17–21 set', city:'Split + Krka + Vis', detail:'Cidade, parques, ônibus e ferry', next:'🚌 Split → Dubrovnik · ✈️ Brasil' }
];

export const walletItems = [
  { id:'budapest-card-voucher', category:'Passes', title:'Budapest Card · voucher de retirada', subtitle:'Tiqets · 2 × 72h · 1 QR para ambos', date:'09 set · retirar 16:45', status:'confirmed', locator:'111665639', codeAsset:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNyAzNyIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cmVjdCB3aWR0aD0iMzciIGhlaWdodD0iMzciIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTQgNGg3djFoLTd6TTEyIDRoM3YxaC0zek0xNiA0aDF2MWgtMXpNMTggNGg0djFoLTR6TTI2IDRoN3YxaC03ek00IDVoMXYxaC0xek0xMCA1aDF2MWgtMXpNMTIgNWgydjFoLTJ6TTIxIDVoMXYxaC0xek0yMyA1aDF2MWgtMXpNMjYgNWgxdjFoLTF6TTMyIDVoMXYxaC0xek00IDZoMXYxaC0xek02IDZoM3YxaC0zek0xMCA2aDF2MWgtMXpNMTIgNmgydjFoLTJ6TTE1IDZoMXYxaC0xek0yMCA2aDF2MWgtMXpNMjIgNmgxdjFoLTF6TTI2IDZoMXYxaC0xek0yOCA2aDN2MWgtM3pNMzIgNmgxdjFoLTF6TTQgN2gxdjFoLTF6TTYgN2gzdjFoLTN6TTEwIDdoMXYxaC0xek0xMyA3aDF2MWgtMXpNMTUgN2gydjFoLTJ6TTIxIDdoM3YxaC0zek0yNiA3aDF2MWgtMXpNMjggN2gzdjFoLTN6TTMyIDdoMXYxaC0xek00IDhoMXYxaC0xek02IDhoM3YxaC0zek0xMCA4aDF2MWgtMXpNMTIgOGgxdjFoLTF6TTE0IDhoMXYxaC0xek0xNiA4aDF2MWgtMXpNMTggOGgxdjFoLTF6TTIwIDhoMnYxaC0yek0yNCA4aDF2MWgtMXpNMjYgOGgxdjFoLTF6TTI4IDhoM3YxaC0zek0zMiA4aDF2MWgtMXpNNCA5aDF2MWgtMXpNMTAgOWgxdjFoLTF6TTE2IDloMXYxaC0xek0yMCA5aDJ2MWgtMnpNMjQgOWgxdjFoLTF6TTI2IDloMXYxaC0xek0zMiA5aDF2MWgtMXpNNCAxMGg3djFoLTd6TTEyIDEwaDF2MWgtMXpNMTQgMTBoMXYxaC0xek0xNiAxMGgxdjFoLTF6TTE4IDEwaDF2MWgtMXpNMjAgMTBoMXYxaC0xek0yMiAxMGgxdjFoLTF6TTI0IDEwaDF2MWgtMXpNMjYgMTBoN3YxaC03ek0xNCAxMWg0djFoLTR6TTIyIDExaDF2MWgtMXpNNCAxMmgxdjFoLTF6TTcgMTJoNnYxaC02ek0xNCAxMmgxdjFoLTF6TTE2IDEyaDJ2MWgtMnpNMTkgMTJoMnYxaC0yek0yMyAxMmgxdjFoLTF6TTI1IDEyaDF2MWgtMXpNMjggMTJoMXYxaC0xek0zMCAxMmgzdjFoLTN6TTUgMTNoMnYxaC0yek04IDEzaDF2MWgtMXpNMTcgMTNoMXYxaC0xek0xOSAxM2gxdjFoLTF6TTIyIDEzaDF2MWgtMXpNMjQgMTNoMXYxaC0xek0yOCAxM2gxdjFoLTF6TTMwIDEzaDF2MWgtMXpNOCAxNGgxdjFoLTF6TTEwIDE0aDF2MWgtMXpNMTMgMTRoMXYxaC0xek0xNyAxNGgxdjFoLTF6TTE5IDE0aDF2MWgtMXpNMjEgMTRoNHYxaC00ek0yNiAxNGgxdjFoLTF6TTI4IDE0aDF2MWgtMXpNMzAgMTRoMnYxaC0yek00IDE1aDJ2MWgtMnpNNyAxNWgxdjFoLTF6TTEyIDE1aDF2MWgtMXpNMTQgMTVoMXYxaC0xek0xNyAxNWgxdjFoLTF6TTIxIDE1aDF2MWgtMXpNMjQgMTVoMXYxaC0xek0yNyAxNWgydjFoLTJ6TTMyIDE1aDF2MWgtMXpNNCAxNmgxdjFoLTF6TTkgMTZoMnYxaC0yek0xMiAxNmgydjFoLTJ6TTE3IDE2aDF2MWgtMXpNMTkgMTZoMXYxaC0xek0yMSAxNmg0djFoLTR6TTI3IDE2aDN2MWgtM3pNMzEgMTZoMXYxaC0xek00IDE3aDJ2MWgtMnpNNyAxN2gxdjFoLTF6TTExIDE3aDF2MWgtMXpNMTMgMTdoMnYxaC0yek0xNyAxN2g1djFoLTV6TTIzIDE3aDJ2MWgtMnpNMjggMTdoMnYxaC0yek0zMiAxN2gxdjFoLTF6TTQgMThoNHYxaC00ek05IDE4aDJ2MWgtMnpNMTIgMThoMXYxaC0xek0xNyAxOGgxdjFoLTF6TTIwIDE4aDR2MWgtNHpNMjUgMThoNXYxaC01ek0zMiAxOGgxdjFoLTF6TTQgMTloMXYxaC0xek02IDE5aDR2MWgtNHpNMTMgMTloNHYxaC00ek0yMCAxOWgydjFoLTJ6TTIzIDE5aDN2MWgtM3pNMjkgMTloMnYxaC0yek00IDIwaDF2MWgtMXpNOCAyMGgxdjFoLTF6TTEwIDIwaDJ2MWgtMnpNMTMgMjBoMXYxaC0xek0xNiAyMGgxdjFoLTF6TTE4IDIwaDF2MWgtMXpNMjEgMjBoMnYxaC0yek0yNCAyMGgxdjFoLTF6TTI3IDIwaDF2MWgtMXpNMzAgMjBoMnYxaC0yek00IDIxaDF2MWgtMXpNNiAyMWgzdjFoLTN6TTExIDIxaDF2MWgtMXpNMTMgMjFoMXYxaC0xek0xNiAyMWgzdjFoLTN6TTIyIDIxaDF2MWgtMXpNMjYgMjFoM3YxaC0zek0zMCAyMWgydjFoLTJ6TTQgMjJoM3YxaC0zek04IDIyaDF2MWgtMXpNMTAgMjJoMnYxaC0yek0xMyAyMmgydjFoLTJ6TTIwIDIyaDR2MWgtNHpNMjYgMjJoMXYxaC0xek0yOSAyMmgxdjFoLTF6TTMxIDIyaDJ2MWgtMnpNNCAyM2gzdjFoLTN6TTkgMjNoMXYxaC0xek0xNCAyM2gzdjFoLTN6TTE4IDIzaDN2MWgtM3pNMjIgMjNoMXYxaC0xek0yNSAyM2gxdjFoLTF6TTMwIDIzaDJ2MWgtMnpNNCAyNGgzdjFoLTN6TTggMjRoMXYxaC0xek0xMCAyNGgydjFoLTJ6TTEzIDI0aDJ2MWgtMnpNMTYgMjRoM3YxaC0zek0yMiAyNGg3djFoLTd6TTEyIDI1aDF2MWgtMXpNMTUgMjVoMnYxaC0yek0xOCAyNWgxdjFoLTF6TTIwIDI1aDF2MWgtMXpNMjQgMjVoMXYxaC0xek0yOCAyNWgxdjFoLTF6TTMwIDI1aDF2MWgtMXpNMzIgMjVoMXYxaC0xek00IDI2aDd2MWgtN3pNMTIgMjZoMXYxaC0xek0xNSAyNmgydjFoLTJ6TTE4IDI2aDF2MWgtMXpNMjEgMjZoNHYxaC00ek0yNiAyNmgxdjFoLTF6TTI4IDI2aDF2MWgtMXpNNCAyN2gxdjFoLTF6TTEwIDI3aDF2MWgtMXpNMTIgMjdoMnYxaC0yek0xNiAyN2gxdjFoLTF6TTE4IDI3aDF2MWgtMXpNMjIgMjdoM3YxaC0zek0yOCAyN2gxdjFoLTF6TTMwIDI3aDJ2MWgtMnpNNCAyOGgxdjFoLTF6TTYgMjhoM3YxaC0zek0xMCAyOGgxdjFoLTF6TTEyIDI4aDJ2MWgtMnpNMTUgMjhoNHYxaC00ek0yMCAyOGgydjFoLTJ6TTI0IDI4aDZ2MWgtNnpNMzEgMjhoMnYxaC0yek00IDI5aDF2MWgtMXpNNiAyOWgzdjFoLTN6TTEwIDI5aDF2MWgtMXpNMTIgMjloMXYxaC0xek0xNiAyOWgxdjFoLTF6TTE5IDI5aDF2MWgtMXpNMjIgMjloMnYxaC0yek0yNSAyOWgxdjFoLTF6TTI4IDI5aDF2MWgtMXpNNCAzMGgxdjFoLTF6TTYgMzBoM3YxaC0zek0xMCAzMGgxdjFoLTF6TTEzIDMwaDN2MWgtM3pNMjAgMzBoMnYxaC0yek0yNSAzMGgydjFoLTJ6TTI4IDMwaDF2MWgtMXpNMzAgMzBoM3YxaC0zek00IDMxaDF2MWgtMXpNMTAgMzFoMXYxaC0xek0xNCAzMWgydjFoLTJ6TTE3IDMxaDJ2MWgtMnpNMjEgMzFoMnYxaC0yek0yNiAzMWgxdjFoLTF6TTI4IDMxaDF2MWgtMXpNMzIgMzFoMXYxaC0xek00IDMyaDd2MWgtN3pNMTIgMzJoMXYxaC0xek0xNCAzMmgxdjFoLTF6TTE3IDMyaDJ2MWgtMnpNMjIgMzJoMXYxaC0xek0yNCAzMmgydjFoLTJ6TTI3IDMyaDJ2MWgtMnoiIGZpbGw9ImJsYWNrIi8+PC9zdmc+', note:'Este QR é o voucher Tiqets para retirar os 2 cartões físicos de 72h; não é o cartão físico. Retirada em Király u. 13. Referência 111665639 · supplier H-2347375. Depois da retirada, preencher/ativar os cartões físicos conforme as instruções do cartão.' },
  { id:'budapest-danube-cruise', category:'Atrações', title:'Cruzeiro no Danúbio · Dock Zero', subtitle:'Duna-Weser Kft. · check-in 19:00 · saída 19:15', date:'09 set · 19:15', status:'confirmed', note:'Meta do roteiro: estar no Dock Zero às 18:20, com margem ampla antes da saída. Píer inferior no Carl Lutz rakpart; procurar Rubin Group e a placa vermelha “0”.' },
  { id:'basilica-entry', category:'Atrações', title:'Basílica de Santo Estêvão · Igreja + Panorâmico + Tesouro', subtitle:'GetYourGuide · collective', date:'10 set · a partir de 09:00', status:'confirmed', locator:'GYGKBR5RFY3N', codeAsset:'assets/tickets/basilica-entry-qr.svg', note:'Ingresso confirmado e QR salvo offline. Usar na visita da manhã.' },
  { id:'buda-castle-walk', category:'Atrações', title:'Buda Castle Walks', subtitle:'Dísz tér 15 · passeio guiado', date:'10 set · 14:30', status:'confirmed', note:'Fornecedor pede chegada até 14:15. O roteiro mira 13:40 para absorver trânsito e dificuldade para achar o portão verde.' },
  { id:'basilica-organ-concert', category:'Atrações', title:'Concerto de órgão · Basílica de Santo Estêvão', subtitle:'Hungaria Koncert Ltd. · 2 pessoas', date:'10 set · 20:00', status:'confirmed', locator:'439041269', bookingUrl:'https://gyg.me/RqH55aso', note:'Instrução do fornecedor: estar na Basílica às 19:40. O roteiro mira 19:20. QR codes já estão na Apple Wallet; o app mantém a referência e o link da reserva sem duplicar os códigos.' },
  { id:'bus-rovinj-pula', category:'Ônibus', title:'Rovinj → Pula', subtitle:'Arriva/Brioni · meta 08:00 → ~08:45', date:'14 set', status:'planned', note:'Confirmar a saída exata na véspera; há várias ligações diárias entre Rovinj e Pula.' },
  { id:'flixbus-koper-rovinj', category:'Ônibus', title:'Koper → Rovinj', subtitle:'FlixBus · planejado 16:30 → ~18:05', date:'13 set', status:'planned', note:'Não comprar sem garantir o transfer Postojna → Koper.' },
  { id:'bus-plitvice-split', category:'Ônibus', title:'Plitvice → Split', subtitle:'Direto · meta 16:20 → ~20:50', date:'17 set', status:'to-book', note:'Confirmar o ponto exato de embarque junto à Entrada 1/2 no bilhete final.' },
  { id:'vintgar-pass', category:'Atrações', title:'Vintgar Gorge', subtitle:'All-in-One Pass · tour 09:00', date:'12 set', status:'to-book', note:'Shuttle oficial de Bled incluído no passe.' },
  { id:'postojna-predjama', category:'Atrações', title:'Postojna Cave + Predjama', subtitle:'Two Adventures · Postojna 13:00', date:'13 set', status:'to-book', note:'Predjama primeiro: shuttle 10:40 ida / 12:05 volta.' },
  { id:'dubrovnik-pass-henrique', groupId:'dubrovnik-pass', groupTitle:'Dubrovnik Pass · 3 dias', groupSubtitle:'Henrique + Cibele', holder:'Henrique', category:'Passes', title:'Dubrovnik Pass - Henrique', subtitle:'3 dias · código FW321KW4', date:'08–09 set', codeAsset:'assets/tickets/dubrovnik-pass-henrique.png', note:'Ônibus: após o primeiro uso, guardar o ticket impresso.' },
  { id:'dubrovnik-pass-cibele', groupId:'dubrovnik-pass', groupTitle:'Dubrovnik Pass · 3 dias', groupSubtitle:'Henrique + Cibele', holder:'Cibele', category:'Passes', title:'Dubrovnik Pass - Cibele', subtitle:'3 dias · código JL67A7MI', date:'08–09 set', codeAsset:'assets/tickets/dubrovnik-pass-cibele.png', note:'Ônibus: após o primeiro uso, guardar o ticket impresso.' },
  { id:'wizz-henrique', groupId:'wizz-dbv-bud', groupTitle:'Wizz Air · DBV → BUD', groupSubtitle:'W6 2256 · Henrique + Cibele', holder:'Henrique', category:'Voos', title:'Wizz Air - Henrique', subtitle:'W6 2256 · DBV → BUD · assento 4B', date:'09 set · 14:10', locator:'KWKWWW', codeAsset:'assets/tickets/wizz-henrique-barcode.png', note:'Assento 4B · confirmação KWKWWW · porta fecha 13h40.' },
  { id:'wizz-cibele', groupId:'wizz-dbv-bud', groupTitle:'Wizz Air · DBV → BUD', groupSubtitle:'W6 2256 · Henrique + Cibele', holder:'Cibele', category:'Voos', title:'Wizz Air - Cibele', subtitle:'W6 2256 · DBV → BUD · assento 4A', date:'09 set · 14:10', locator:'KWKWWW', codeAsset:'assets/tickets/wizz-cibele-barcode.png', note:'Assento 4A · confirmação KWKWWW · porta fecha 13h40.' },
  { id:'flixbus-bud-lju', category:'Ônibus', title:'FlixBus Budapest → Ljubljana', subtitle:'Rota 403 · 11A/11B', date:'11 set · 06:45', locator:'338 838 9094', codeAsset:'assets/tickets/flixbus-qr.png', note:'Assentos 11A/11B · passaporte à mão · ticket válido impresso ou digital.' },
  { id:'flight-outbound', category:'Voos', title:'GRU → MAD → DBV', subtitle:'LA1579 + LA1815', date:'06–07 set', note:'Chegada Dubrovnik 07/set 19h00.' },
  { id:'flight-return', category:'Voos', title:'DBV → MAD → GRU', subtitle:'LA1814 + LA1572', date:'21–22 set', note:'DBV 19h50 · chegada GRU 05h55.' }
];

export const hotels = [
  { id:'hotel-lausa', city:'Dubrovnik', name:'Lausa Dubrovnik Rooms', dates:'7→9/set', confirmation:'6859609127', pin:'4841', destination:'Lausa Dubrovnik Rooms, Dubrovnik, Croatia' },
  { id:'hotel-up', city:'Budapest', name:'Up Hotel Budapest', dates:'9→11/set', confirmation:'72078073634790', pin:'—', destination:'Up Hotel Budapest, Csengery utca 31, Budapest, Hungary' },
  { id:'hotel-under-castle', city:'Ljubljana', name:'Under The Castle Apartments', dates:'11→13/set', confirmation:'5365081042', pin:'5211', destination:'Under The Castle Apartments, Ljubljana, Slovenia' },
  { id:'hotel-charmy', city:'Rovinj', name:'Charmy Rovinj', dates:'13→16/set', confirmation:'5693601849', pin:'9721', destination:'Charmy Rovinj, Rovinj, Croatia' },
  { id:'hotel-villa-prica', city:'Plitvice', name:'Villa Prica B&B', dates:'16→17/set', confirmation:'5248153221', pin:'7232', destination:'Villa Prica, Plitvica Selo 32, Croatia' },
  { id:'hotel-little-lion', city:'Split', name:'Little Lion', dates:'17→21/set', confirmation:'6930013359', pin:'0663', destination:'Little Lion, Split, Croatia' }
];

export const emergencyContacts = [
  { label:'Emergência Europa', value:'112', href:'tel:112' },
  { label:'Seguro AIG - exterior', value:'+1 636 722 7111', href:'tel:+16367227111' },
  { label:'Seguro AIG - Brasil', value:'0800 891 3294', href:'tel:08008913294' },
  { label:'Consulado do Brasil - Zagreb', value:'+385 1 489 0400', href:'tel:+38514890400' },
  { label:'Wizz Air', value:'+36 1 777 5477', href:'tel:+3617775477' },
  { label:'Iberia', value:'+34 901 111 500', href:'tel:+34901111500' }
];

export const packingChecklist = [
  'Biquíni/sunga - 2 conjuntos', 'Camisetas leves', 'Shorts', 'Calça para jantar', 'Moletom/casaco leve',
  'Agasalho para Postojna', 'Capa de chuva', 'Tênis fechado', 'Aqua-shoes', 'Sandália/chinelo',
  '2 toalhas de microfibra', 'Máscara de snorkel', 'Protetor solar 50+', 'Passaportes', 'Cartões/Wise/Nomad', 'Dinheiro em espécie'
];

export const pendingItems = [
  'Budapest Card: retirar os 2 cartões físicos e ativá-los hoje antes do cruzeiro.',
  'Budapest: reservas fixas de cruzeiro, Buda Castle Walks e concerto já incorporadas ao roteiro com margem de segurança.',
  'Vintgar: ingresso já comprado; usar o QR salvo na Carteira.',
  'Postojna + Predjama: comprar Two Adventures para 13/set, Postojna Cave 13:00.',
  'Postojna → Koper: fechar transfer/táxi que chegue a Koper antes das 15:45.',
  'FlixBus Koper → Rovinj: comprar 13/set 16:30 depois de travar o transfer.',
  'Rovinj ↔ Pula: confirmar/comprar ônibus de 14/set.',
  'Pula ↔ Kamenjak: fechar táxi/transfer de ida e volta para 14/set.',
  'Ístria interior: fechar motorista/tour Rovinj → Motovun → Grožnjan → Rovinj para 15/set.',
  'Rovinj → Plitvice: fechar transfer de 16/set com parada em Rastoke.',
  'Plitvice: comprar ingresso para 17/set, Entrada 2 / Programa H.',
  'Ônibus Plitvice → Split: comprar saída direta planejada 16:20 de 17/set.',
  'Ferry Vis/Jadrolinija: confirmar ida e volta de 20/set.',
  'Krka: confirmar tour, ponto de encontro e regras atuais do parque.'
];

export const phrases = {
  Croata: [
    ['Olá','Bok / Dobar dan'],
    ['Bom dia','Dobro jutro'],
    ['Boa tarde','Dobar dan'],
    ['Boa noite (cumprimento)','Dobra večer'],
    ['Boa noite (despedida)','Laku noć'],
    ['Tchau','Bok / Doviđenja'],
    ['Obrigado','Hvala'],
    ['Por favor','Molim'],
    ['Eu gostaria de...','Želio bih... / Željela bih...'],
    ['A conta','Račun, molim'],
    ['Onde fica...?','Gdje je...?'],
    ['Com licença','Oprostite'],
    ['Desculpa','Žao mi je'],
    ['Desculpa, não falo croata','Oprostite, ne govorim hrvatski'],
    ['Sim','Da'],
    ['Não','Ne']
  ],
  Húngaro: [
    ['Olá','Szia'],
    ['Bom dia','Jó reggelt'],
    ['Boa tarde','Jó napot'],
    ['Boa noite (cumprimento)','Jó estét'],
    ['Boa noite (despedida)','Jó éjszakát'],
    ['Tchau','Szia / Viszontlátásra'],
    ['Obrigado','Köszönöm'],
    ['Por favor','Kérem'],
    ['Eu gostaria de...','Szeretnék...'],
    ['A conta','A számlát kérem'],
    ['Onde fica metrô?','Hol a metró?'],
    ['Com licença','Elnézést'],
    ['Desculpa','Bocsánat'],
    ['Desculpa, não falo húngaro','Bocsánat, nem beszélek magyarul'],
    ['Sim','Igen'],
    ['Não','Nem']
  ],
  Esloveno: [
    ['Olá','Živijo / Dober dan'],
    ['Bom dia','Dobro jutro'],
    ['Boa tarde','Dober dan'],
    ['Boa noite (cumprimento)','Dober večer'],
    ['Boa noite (despedida)','Lahko noč'],
    ['Tchau','Adijo / Nasvidenje'],
    ['Obrigado','Hvala'],
    ['Por favor','Prosim'],
    ['Eu gostaria de...','Rad bi... / Rada bi...'],
    ['A conta','Račun, prosim'],
    ['Onde fica...?','Kje je...?'],
    ['Com licença','Oprostite'],
    ['Desculpa','Žal mi je'],
    ['Desculpa, não falo esloveno','Oprostite, ne govorim slovensko'],
    ['Sim','Da'],
    ['Não','Ne']
  ]
};
