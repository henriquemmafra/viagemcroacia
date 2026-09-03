import { tripDays1 } from './trip-days-1.js';
import { tripDays2 } from './trip-days-2.js';
import { tripDays3 } from './trip-days-3.js';

export const tripDays = [...tripDays1, ...tripDays2, ...tripDays3];

export const routeOverview = [
  { dates:'7–9 set', city:'Dubrovnik', detail:'Old Town · muralhas · Lokrum', next:'✈️ voo para Budapest' },
  { dates:'9–11 set', city:'Budapest', detail:'Buda · Széchenyi · Jewish Quarter', next:'🚌 FlixBus 06:45 para Ljubljana' },
  { dates:'11–13 set', city:'Ljubljana + Bled', detail:'Eslovênia sem carro · Bled/Vintgar de ônibus', next:'🚌 Postojna · Predjama · Koper' },
  { dates:'13–14 set', city:'Rovinj', detail:'Chegada de ônibus às ~18:05 · noite na Old Town', next:'🚌 08:00 para Pula' },
  { dates:'14–17 set', city:'Pula · Ístria · Plitvice', detail:'🚗 SIXT desde Pula 14/set 09:30', next:'🚗 devolução Split Airport 17/set 19:30' },
  { dates:'17–21 set', city:'Split + Krka + Vis', detail:'Sem carro · cidade, parques e ferry', next:'🚌 Split → Dubrovnik · ✈️ Brasil' }
];

export const walletItems = [
  { id:'sixt-pula-split', category:'Carro', title:'SIXT · BMW 1 Series ou similar', subtitle:'Pula Rodoviária → Split Airport · 14–17 set', date:'14 set 09:30 → 17 set 19:30', locator:'9738865814', status:'confirmed', note:'€532,40 · proteção sem franquia · caução €1.700 · pneus/vidros + roadside assistance incluídos.' },
  { id:'bus-rovinj-pula', category:'Ônibus', title:'Rovinj → Pula', subtitle:'Arriva · planejado 08:00 → 08:40', date:'14 set', status:'planned', note:'Comprar depois de confirmar o horário final; a retirada SIXT é 09:30.' },
  { id:'flixbus-koper-rovinj', category:'Ônibus', title:'Koper → Rovinj', subtitle:'FlixBus · planejado 16:30 → ~18:05', date:'13 set', status:'planned', note:'Não comprar sem garantir o transfer Postojna → Koper.' },
  { id:'vintgar-pass', category:'Atrações', title:'Vintgar Gorge', subtitle:'All-in-One Pass · meta 09:30', date:'12 set', status:'to-book', note:'Shuttle oficial de Bled incluído no passe.' },
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
  'Vintgar: comprar All-in-One Pass para 12/set, meta de entrada 09:30.',
  'Postojna + Predjama: comprar Two Adventures para 13/set, Postojna Cave 13:00.',
  'Postojna → Koper: fechar transfer/táxi que chegue a Koper antes das 15:45.',
  'FlixBus Koper → Rovinj: comprar 13/set 16:30 depois de travar o transfer.',
  'Ônibus Rovinj → Pula: comprar 14/set, meta 08:00 → 08:40.',
  'Plitvice: confirmar ingresso, Entrance 1 e horário definitivo.',
  'Ferry Vis/Jadrolinija: confirmar ida e volta de 20/set.',
  'Krka: confirmar tour, ponto de encontro e regras atuais do parque.'
];

export const phrases = {
  Croata: [['Olá','Bok / Dobar dan'],['Obrigado','Hvala'],['Por favor','Molim'],['A conta','Račun, molim'],['Onde fica...?','Gdje je...?']],
  Húngaro: [['Olá','Szia'],['Obrigado','Köszönöm'],['Por favor','Kérem'],['A conta','A számlát kérem'],['Onde fica metrô?','Hol a metró?']],
  Esloveno: [['Olá','Živijo / Dober dan'],['Obrigado','Hvala'],['Por favor','Prosim'],['A conta','Račun, prosim'],['Onde fica...?','Kje je...?']]
};
