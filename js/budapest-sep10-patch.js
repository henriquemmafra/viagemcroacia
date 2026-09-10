import { tripDays1 } from './trip-days-1.js';

const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export function applyBudapestSep10Patch() {
  const day = tripDays1.find((item) => item.date === '2026-09-10');
  if (!day || day.datasetPatch === 'budapest-sep10-v1') return day;

  day.datasetPatch = 'budapest-sep10-v1';
  day.title = 'Pest → Buda · Wine Festival · Citadella · concerto';
  day.summary = 'Dia cheio em progressão geográfica: Pest de leste a oeste, travessia pela Chain Bridge, Castle District e Wine Festival, Citadella e retorno à Basílica com margem para o concerto.';
  day.heroLabel = 'BUDAPEST · PEST → BUDA → CONCERTO';
  day.bring = ['Budapest Card físico','Ingressos/QRs salvos offline','Ingressos do concerto na Apple Wallet','Powerbank','Passaporte/documento'];
  day.alerts = [
    '🍷 Budapest Wine Festival: hoje abre às 15h. O acesso às áreas do festival exige pulseira própria; a pulseira de visitante dos museus serve apenas para atravessar a área, não para permanecer no festival.',
    '🖼️ Durante o Wine Festival, National Gallery e St. Stephen’s Hall têm acesso especial controlado pelo Castle District. Seguir a sinalização/visitor point e não contar com circulação livre pelo Palace.',
    '🌅 Citadella entra como mirante/parque no fim da tarde; não depender da exposição interna para preservar o concerto.',
    '🎼 COMPROMISSO FIXO: estar na Basílica às 19h20. Concerto de órgão às 20h00; QR codes estão na Apple Wallet.',
    '🚌 Amanhã: saída do hotel 05h45 para o FlixBus das 06h45.'
  ];
  day.events = [
    ev('08:20','New York Café',{ end:'09:00', icon:'☕', location:loc('New York Café','Erzsébet körút 9-11, 1073 Budapest, Hungary'), note:'Começar pelo ponto mais a leste e depois avançar continuamente em direção ao Danúbio.', infoUrl:'https://newyorkcafe.hu/en/'}),
    ev('09:15','Shoes on the Danube Bank',{ end:'09:35', icon:'👞', location:loc('Shoes on the Danube Bank','Id. Antall József rkp., 1054 Budapest, Hungary'), note:'Parada curta à beira do Danúbio antes do Parlamento.', infoUrl:'https://www.budapest.com/en/locations/shoes-on-the-danube-bank'}),
    ev('09:40','Parlamento + Kossuth Square',{ end:'10:20', icon:'🇭🇺', location:loc('Hungarian Parliament Building','Kossuth Lajos tér 1-3, 1055 Budapest, Hungary'), note:'Exterior + praça. Visita interna somente se houver ingresso com horário compatível.', infoUrl:'https://www.parlament.hu/en/web/house-of-the-national-assembly/visiting-the-parliament'}),
    ev('10:35','Basílica de Santo Estêvão · Igreja + Panorâmico + Tesouro',{ end:'11:35', icon:'⛪', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-entry', status:'confirmed', note:'Ingresso já confirmado; QR disponível na Carteira.', infoUrl:'https://bazilikabudapest.hu/en/'}),
    ev('11:40','Váci utca · Kürtőskalács + caminhada',{ end:'12:15', icon:'🍰', location:loc('Váci utca','Váci utca, Budapest, Hungary'), note:'Pausa curta para kürtőskalács e caminhada pelo eixo central de Pest.'}),
    ev('12:25','Hungarian National Museum',{ end:'13:05', icon:'🏛️', location:loc('Hungarian National Museum','Múzeum krt. 14-16, 1088 Budapest, Hungary'), note:'Visita objetiva antes de cruzar definitivamente para Buda.', infoUrl:'https://mnm.hu/en'}),
    ev('13:20','Chain Bridge · travessia para Buda',{ end:'13:45', icon:'🌉', location:loc('Széchenyi Chain Bridge','Széchenyi Lánchíd, Budapest, Hungary'), note:'Travessia a pé; daqui em diante o roteiro permanece em Buda até a volta para o concerto.'}),
    ev('13:55','Buda Castle · chegada ao Palace District',{ end:'14:10', icon:'🏰', location:loc('Buda Castle','Szent György tér 2, 1014 Budapest, Hungary'), note:'Hoje há restrições do Wine Festival. Seguir os visitor points oficiais para acesso aos museus.', infoUrl:'https://budavaripalotanegyed.hu/en'}),
    ev('14:10','Hungarian National Gallery',{ end:'14:50', icon:'🖼️', location:loc('Hungarian National Gallery','Szent György tér 2, 1014 Budapest, Hungary'), note:'Durante o festival, visitantes do museu recebem acesso controlado para atravessar a área do evento; isso não autoriza permanecer no festival.', infoUrl:'https://en.mng.hu/'}),
    ev('14:55','St. Stephen’s Hall',{ end:'15:25', icon:'🏛️', location:loc('St. Stephen’s Hall','Buda Castle, Szent György tér 2, 1014 Budapest, Hungary'), note:'Usar o visitor point indicado no dia. O ingresso da sala permite passagem pela área do festival, não permanência.', infoUrl:'https://szentistvanterem.hu/en'}),
    ev('15:35','Matthias Church',{ end:'16:05', icon:'⛪', location:loc('Matthias Church','Szentháromság tér 2, 1014 Budapest, Hungary'), note:'Seguir para o norte do Castle District após o Palace.', infoUrl:'https://matyas-templom.hu/en/'}),
    ev('16:05','Fisherman’s Bastion',{ end:'16:30', icon:'🏰', location:loc('Fisherman’s Bastion','Szentháromság tér, 1014 Budapest, Hungary'), note:'Mirantes junto à Matthias Church; visita compacta antes de retornar ao setor do festival.', infoUrl:'https://fishermansbastion.com/'}),
    ev('16:40','Budapest Wine Festival',{ end:'17:25', icon:'🍷', location:loc('Budapest Wine Festival · Buda Castle','Buda Castle, 1014 Budapest, Hungary'), note:'Festival aberto hoje 15h–24h. Para ficar e degustar é necessário ingresso/pulseira do festival; pulseira de museu só permite passagem.', infoUrl:'https://aborfesztival.hu/en/informations/location'}),
    ev('17:25','Sair do Wine Festival → Citadella',{ end:'17:45', icon:'🚕', location:loc('Citadella','Citadella, Gellért Hill, 1118 Budapest, Hungary'), note:'Usar táxi/Uber para ganhar tempo e evitar uma caminhada longa antes do concerto.'}),
    ev('17:45','Citadella · mirantes + fim de tarde',{ end:'18:20', icon:'🌅', location:loc('Citadella','Citadella, Gellért Hill, 1118 Budapest, Hungary'), note:'Foco no parque, panorama e Liberty Statue. Saída rígida para proteger o concerto.', infoUrl:'https://www.citadella.hu/en'}),
    ev('18:20','SAIR da Citadella → Basílica',{ end:'18:50', icon:'🚕', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), perrengue:'Não atrasar esta saída. O concerto é o compromisso fixo da noite.'}),
    ev('18:50','Jantar/lanche rápido perto da Basílica',{ end:'19:15', icon:'🍽️', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), note:'Comer já no destino final; sem restaurante com fila ou reserva demorada.'}),
    ev('19:20','ESTAR na Basílica · concerto',{ end:'20:00', icon:'⏰', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-organ-concert', note:'Fornecedor orienta comparecer às 19h40. Meta de 19h20 preservada. Reserva 439041269; QR codes na Apple Wallet.'}),
    ev('20:00','Concerto de órgão na Basílica',{ end:'21:10', icon:'🎼', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-organ-concert', status:'confirmed', bookingUrl:'https://gyg.me/RqH55aso', note:'2 pessoas · ref. 439041269. Ingressos na Apple Wallet.'}),
    ev('21:20','Voltar ao Up Hotel · malas prontas',{ icon:'🧳', location:loc('Up Hotel Budapest','Csengery utca 31, 1067 Budapest, Hungary'), perrengue:'Amanhã sair 05h45 para Népliget; deixar passaportes, bilhetes e malas prontos.'})
  ];
  return day;
}

applyBudapestSep10Patch();
