import { tripDays3 } from './trip-days-3.js';
import { walletItems, hotels, routeOverview } from './trip-data.js';

const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

const ARRIVA_ROVINJ_PULA = 'https://www.arriva.com.hr/en-us/bus-rovinj-pula';
const KRILO_PULA = 'https://krilo.hr/en/destinations/pula';
const ANCIENT_GLASS = 'https://www.mas-zadar.hr/hr/o-muzeju/o-nama';

export function applyZadarSep16Patch() {
  const day = tripDays3.find((item) => item.date === '2026-09-16');
  if (!day || day.datasetPatch === 'zadar-sep16-v1') return day;

  day.datasetPatch = 'zadar-sep16-v1';
  day.city = 'Rovinj → Pula → Zadar';
  day.title = 'Ônibus cedo · Krilo Lux · Zadar ao pôr do sol';
  day.summary = 'Saída de Rovinj de madrugada, ferry Pula → Zadar e tarde a pé no centro histórico: almoço primeiro, ruínas romanas, catedral, muralhas, Órgão do Mar e jantar.';
  day.theme = 'zadar';
  day.heroIcon = '🌅';
  day.heroLabel = 'ZADAR · OLD TOWN · SUNSET';
  day.wear = ['Tênis confortável','Roupa leve','Camada fina para o ferry'];
  day.bring = ['Bilhetes Arriva + Krilo','Documento','Powerbank','Água','Bagagem completa'];
  day.alerts = [
    'Ônibus confirmado: Rovinj 04:40 → Pula 05:15. Estar na rodoviária até 04:25.',
    'Ferry confirmado: Krilo Lux Pula 07:00 → Zadar 11:45. A Krilo pede presença no embarque pelo menos 15 min antes; o roteiro deixa margem bem maior.',
    'Ao chegar em Zadar: ALMOÇO PRIMEIRO. Nada de começar passeio em jejum depois de acordar de madrugada.',
    'Museu do Vidro Antigo é opcional: se o cansaço bater, cortar sem culpa e usar o tempo no Queen Jelena Madijevka Park.',
    'Pôr do sol em 16/set fica por volta de 19:09. Meta: estar sentado no Órgão do Mar às 18:40.',
    'Konoba Dalmatina costuma formar fila e relatos recentes indicam que não trabalha com reservas; chegar cedo é mais seguro.'
  ];
  day.events = [
    ev('03:55','Checkout Charmy Rovinj',{ end:'04:20', icon:'🧳', location:loc('Charmy Rovinj','Charmy Rovinj, Rovinj, Croatia'), ticketId:'hotel-charmy', note:'Sair com tudo pronto. Meta: chegar à rodoviária até 04:25.'}),
    ev('04:40','Ônibus Rovinj → Pula',{ end:'05:15', icon:'🚌', location:loc('Rovinj Bus Station','Trg na lokvi 6, 52210 Rovinj, Croatia'), ticketId:'bus-rovinj-pula-sep16', note:'Arriva / Autotrans · pedido 372998757432. Serviço confirmado 04:40 → 05:15.', infoUrl:ARRIVA_ROVINJ_PULA}),
    ev('05:15','Transfer curto → porto de Pula',{ end:'05:35', icon:'🚕', location:loc('Riječki Gat · Pula','Riva - Riječki Gat, Pula, Croatia'), note:'Ir direto da rodoviária para a área do porto. A Krilo mantém ponto de atendimento em Riva – Riječki Gat; confirmar a sinalização exata do embarque ao chegar.'}),
    ev('05:35','Embarque Krilo Lux',{ end:'06:55', icon:'🎟️', location:loc('Riječki Gat · Pula','Riva - Riječki Gat, Pula, Croatia'), ticketId:'ferry-pula-zadar-sep16', note:'E-ticket já emitido para 2 passageiros. Não deixar para procurar o barco perto das 07:00.', infoUrl:KRILO_PULA}),
    ev('07:00','Ferry Pula → Zadar',{ end:'11:45', icon:'⛴️', location:loc('Zadar','Zadar, Croatia'), ticketId:'ferry-pula-zadar-sep16', note:'Krilo Lux · duração 4h45. Aproveitar para descansar e comer algo leve, mas guardar fome para o almoço em Zadar.'}),
    ev('11:45','Chegada a Zadar · ir para o Old Town',{ end:'12:00', icon:'🧳', location:loc('Zadar Old Town','Zadar Old Town, Croatia'), note:'Sem atrações agora: primeiro objetivo é sentar, comer e recuperar energia.'}),
    ev('12:00','Almoço primeiro · Old Town',{ end:'13:00', icon:'🍽️', location:loc('Zadar Old Town','Zadar Old Town, Croatia'), note:'Vocês estarão acordados desde antes das 04:00. Almoçar antes de começar qualquer visita.'}),
    ev('13:05','Check-in · Luxury 4 star apartment',{ end:'13:35', icon:'🏨', location:loc('Luxury 4 star apartment in the Old Town Zadar','4 Ulica Ilije Smiljanića, 23000 Zadar, Croatia'), ticketId:'hotel-zadar-old-town-booking', note:'Check-in permitido 12:30–20:30. Chaves em cofre no local.'}),
    ev('13:35','Pausa curta + reorganizar mochila',{ end:'14:05', icon:'☕', location:loc('Luxury 4 star apartment in the Old Town Zadar','4 Ulica Ilije Smiljanića, 23000 Zadar, Croatia'), note:'Banho rápido, água e só o essencial para caminhar até a noite.'}),
    ev('14:10','Fórum Romano + São Donato',{ end:'14:55', icon:'🏛️', location:loc('Roman Forum & St Donatus','Roman Forum, Zadar, Croatia'), note:'As ruínas romanas e São Donato ficam no mesmo largo; fazer tudo de uma vez sem zigue-zague.'}),
    ev('15:00','Catedral de Santa Anastásia + campanário',{ end:'16:00', icon:'⛪', location:loc('Cathedral of St. Anastasia','Trg Svete Stošije 2, 23000 Zadar, Croatia'), note:'Visitar a catedral e subir o campanário. O campanário tem ingresso separado; a vista do alto é o melhor mirante do circuito.'}),
    ev('16:10','Museu do Vidro Antigo · opcional',{ end:'17:00', icon:'🏺', location:loc('Museum of Ancient Glass','Poljana Zemaljskog odbora 1, 23000 Zadar, Croatia'), status:'optional', note:'Opcional. Horário oficial de verão: até 21:00. Adulto: €7. Se estiverem cansados, cortar e ir direto ao parque.', infoUrl:ANCIENT_GLASS}),
    ev('17:05','Queen Jelena Madijevka Park + Five Wells',{ end:'17:40', icon:'🌳', location:loc('Queen Jelena Madijevka Park','Queen Jelena Madijevka Park, Zadar, Croatia'), note:'Parada leve e sentada. Se pularem o museu, esticar este trecho sem pressa.'}),
    ev('17:40','Portão de Terraferma + Foša',{ end:'18:05', icon:'🦁', location:loc('Land Gate','Land Gate, Zadar, Croatia'), note:'Olhar o Portão de Terraferma pelo lado do porto Foša para ver a fachada e o leão de São Marcos por inteiro.'}),
    ev('18:05','Caminhada pelas muralhas → Riva',{ end:'18:35', icon:'🚶', location:loc('Zadar Riva','Zadar Riva, Croatia'), note:'Seguir pela orla em direção ao Órgão do Mar, sem voltar para dentro do centro histórico.'}),
    ev('18:40','Órgão do Mar · chegar antes do pôr do sol',{ end:'19:15', icon:'🌊', location:loc('Sea Organ','Obala kralja Petra Krešimira IV, 23000 Zadar, Croatia'), note:'Chegar cerca de 30 min antes para conseguir um degrau. Pôr do sol calculado para aproximadamente 19:09 em 16/set.'}),
    ev('19:15','Saudação ao Sol',{ end:'19:40', icon:'☀️', location:loc('Greeting to the Sun','Istarska obala, 23000 Zadar, Croatia'), note:'Fica ao lado do Órgão do Mar. Esperar escurecer: a instalação ganha sentido depois do pôr do sol.'}),
    ev('19:40','Caminhar para Konoba Dalmatina',{ end:'19:55', icon:'🚶', location:loc('Konoba Dalmatina','Kovačka ul. 10, 23000 Zadar, Croatia'), note:'Ir cedo porque é pequena e costuma ter fila.'}),
    ev('20:00','Jantar · Konoba Dalmatina',{ end:'21:30', icon:'🍽️', location:loc('Konoba Dalmatina','Kovačka ul. 10, 23000 Zadar, Croatia'), note:'Konoba familiar no Old Town. Relatos recentes indicam fila e ausência de reservas; a sopa de peixe é uma das sugestões recorrentes.'})
  ];

  for (let index = walletItems.length - 1; index >= 0; index -= 1) {
    if (['bus-rovinj-pula','bus-rovinj-pula-sep16','ferry-pula-zadar-sep16','hotel-zadar-old-town-booking'].includes(walletItems[index].id)) {
      walletItems.splice(index, 1);
    }
  }
  walletItems.push(
    {
      id:'bus-rovinj-pula-sep16',
      category:'Ônibus',
      title:'Rovinj → Pula',
      subtitle:'Arriva / Autotrans · 04:40 → 05:15',
      date:'16 set · 04:40',
      status:'confirmed',
      locator:'372998757432',
      bookingUrl:ARRIVA_ROVINJ_PULA,
      note:'2 bilhetes confirmados. Saída do Autobusni kolodvor Rovinj, Trg na lokvi 6. Bagagem pode ser cobrada à parte pelo motorista.'
    },
    {
      id:'ferry-pula-zadar-sep16',
      category:'Ferry',
      title:'Pula → Zadar · Krilo Lux',
      subtitle:'Kapetan Luka Krilo · 07:00 → 11:45',
      date:'16 set · 07:00',
      status:'confirmed',
      locator:'B29ZKNJKXN2',
      bookingUrl:KRILO_PULA,
      note:'2 passageiros · e-ticket emitido. Embarque mínimo recomendado pela Krilo: 15 min antes; o roteiro chega com margem ampla.'
    },
    {
      id:'hotel-zadar-old-town-booking',
      category:'Hospedagem',
      title:'Luxury 4 star apartment in the Old Town Zadar',
      subtitle:'4 Ulica Ilije Smiljanića · check-in 12:30–20:30',
      date:'16→17 set',
      status:'confirmed',
      locator:'6766053082',
      note:'1 diária · 2 adultos · chaves em cofre no local. PIN não é armazenado no app público.'
    }
  );

  for (let index = hotels.length - 1; index >= 0; index -= 1) {
    if (hotels[index].id === 'hotel-villa-prica' || hotels[index].id === 'hotel-zadar-old-town') hotels.splice(index, 1);
  }
  hotels.push({
    id:'hotel-zadar-old-town',
    city:'Zadar',
    name:'Luxury 4 star apartment in the Old Town Zadar',
    dates:'16→17/set',
    confirmation:'6766053082',
    pin:'consultar Booking',
    destination:'4 Ulica Ilije Smiljanića, 23000 Zadar, Croatia'
  });

  const istriaRow = routeOverview.find((item) => item.dates === '13–16 set');
  if (istriaRow) istriaRow.next = '🚌 Rovinj 04:40 → Pula · ⛴️ 07:00 → Zadar';

  const oldPlitviceIndex = routeOverview.findIndex((item) => item.dates === '16–17 set');
  const zadarRow = {
    dates:'16–17 set',
    city:'Zadar',
    detail:'Old Town · Fórum · São Donato · muralhas · Sea Organ · sunset',
    next:'17/set: programação seguinte ainda será revisada'
  };
  if (oldPlitviceIndex >= 0) routeOverview.splice(oldPlitviceIndex, 1, zadarRow);
  else routeOverview.push(zadarRow);

  return day;
}

applyZadarSep16Patch();
