const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays3 = [
  {
    date:'2026-09-15', city:'Cabo Kamenjak', title:'Praia total · snorkel · 23°C',
    summary:'Dia de enseadas, snorkel, picnic e último pôr do sol na Ístria.',
    theme:'kamenjak', heroIcon:'🤿', heroLabel:'KAMENJAK · ADRIATIC',
    wear:['Biquíni/sunga desde manhã','Aqua-shoes','Roupa leve'],
    bring:['1,5 L água/pessoa','Comida/picnic','Toalha','Protetor 50+','Snorkel'],
    alerts:['Sem infraestrutura segundo o livreto: levar água, comida e recolher o lixo.','Últimos quilômetros de terra; dirigir devagar.'],
    events:[
      ev('09:00','Comprar picnic no mercado',{ end:'10:00', icon:'🥖', location:loc('Rovinj Market','Rovinj Market, Croatia')}),
      ev('10:00','Drive Rovinj → Cabo Kamenjak',{ end:'10:50', icon:'🚗', location:loc('Cape Kamenjak','Cape Kamenjak, Premantura, Croatia'), perrengue:'Últimos quilômetros em estrada de terra.'}),
      ev('10:50','Entrada Kamenjak',{ end:'11:00', icon:'🎟️', location:loc('Kamenjak entrance','Cape Kamenjak entrance, Premantura, Croatia')}),
      ev('11:00','Nadar + snorkel + picnic',{ end:'16:00', icon:'🤿', location:loc('Cape Kamenjak','Cape Kamenjak, Premantura, Croatia'), perrengue:'Aqua-shoes recomendados por rochas/ouriços.'}),
      ev('16:45','Volta para Rovinj',{ end:'18:00', icon:'🚗', location:loc('Valdibora Parking','Valdibora Parking, Rovinj, Croatia')}),
      ev('20:00','Jantar Orca',{ end:'21:00', icon:'🍽️', location:loc('Orca Rovinj','Orca, Obala Alda Rismonda 2, Rovinj, Croatia')}),
      ev('21:00','Old Town à noite',{ icon:'🌙', location:loc('Rovinj Old Town','Rovinj Old Town, Croatia')})
    ]
  },
  {
    date:'2026-09-16', city:'Rovinj → Plitvice', title:'Rastoke · cascatas · Plitvice',
    summary:'Roadtrip para Rastoke e noite ao lado do parque.',
    theme:'rastoke', heroIcon:'💧', heroLabel:'RASTOKE · PLITVICE',
    wear:['Roupa confortável','Tênis','Capa de chuva'],
    bring:['Reserva Villa Prica','Ingresso Plitvice se já emitido','Água'],
    alerts:['Dormir cedo para Plitvice.','O livreto diz que a Villa Prica fica a 2,6 km da Entrada 1.'],
    events:[
      ev('08:00','Drive Rovinj → Rastoke',{ end:'09:50', icon:'🚗', location:loc('Rastoke','Rastoke, Slunj, Croatia'), tip:'As fotos mais bonitas são de fora das casas, procurando pontes e quedas d’água no mesmo enquadramento.'}),
      ev('10:00','Explorar Rastoke',{ end:'11:30', icon:'💧', location:loc('Rastoke','Rastoke, Slunj, Croatia')}),
      ev('12:00','Almoço em Rastoke',{ end:'13:30', icon:'🍽️', location:loc('Rastoke','Rastoke, Slunj, Croatia')}),
      ev('13:30','Drive Rastoke → Villa Prica',{ end:'14:00', icon:'🚗', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia')}),
      ev('14:00','Check-in Villa Prica',{ end:'15:00', icon:'🏨', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia'), ticketId:'hotel-villa-prica'}),
      ev('15:00','Reconhecer acesso à Entrada 1',{ end:'16:30', icon:'📍', location:loc('Plitvice Entrance 1','Plitvice Lakes National Park Entrance 1, Croatia'), perrengue:'Confirmar ingresso/horário antes de dormir.'}),
      ev('22:00','Dormir cedo',{ icon:'🌙', note:'Acordar 6h30.'})
    ]
  },
  {
    date:'2026-09-17', city:'Plitvice → Split', title:'Percurso H · roadtrip final · Split',
    summary:'Lagos cedo, estrada até a Dalmácia e devolução confirmada do carro no aeroporto de Split.',
    theme:'plitvice', heroIcon:'🌊', heroLabel:'PLITVICE · CROATIA',
    wear:['Tênis fechado','Capa de chuva','Camadas leves'],
    bring:['Ingresso Plitvice','Água','Documentos do carro','Reserva Little Lion'],
    alerts:['Não nadar em Plitvice.','SIXT Split Airport: devolução confirmada às 19:30.','Tanque cheio e fotos do carro antes da entrega.'],
    events:[
      ev('06:30','Café na Villa Prica',{ end:'07:15', icon:'☕', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia')}),
      ev('07:30','Percurso H em Plitvice',{ end:'13:30', icon:'🥾', location:loc('Plitvice Entrance 1','Plitvice Lakes National Park Entrance 1, Croatia'), perrengue:'Tênis fechado e sem banho nos lagos.', tip:'Comece sem enrolar nas primeiras passarelas. A luz e o parque mais vazio de manhã são a maior vantagem do horário cedo.'}),
      ev('13:30','Almoço Lička kuća',{ end:'14:40', icon:'🍽️', location:loc('Lička Kuća','Lička Kuća, Plitvice Lakes National Park, Croatia'), tip:'Boa hora para experimentar comida regional mais robusta antes da estrada; não estenda demais o almoço.'}),
      ev('15:30','Drive Plitvice → Split Airport',{ end:'18:30', icon:'🚗', location:loc('Split Airport','Split Airport, Kaštela, Croatia'), perrengue:'Sair com margem real; a reserva do carro termina às 19:30.'}),
      ev('18:30','Abastecer + fotos finais do carro',{ end:'19:15', icon:'⛽', location:loc('Split Airport','Split Airport, Kaštela, Croatia')}),
      ev('19:30','Devolver carro SIXT — Split Airport',{ end:'19:50', icon:'🔑', location:loc('SIXT Split Airport','Split Airport, Cesta Dr. Franje Tuđmana 1270, Kaštel Štafilić, Croatia'), ticketId:'sixt-pula-split', status:'confirmed', perrengue:'Confirmar recibo de devolução e guardar fotos.'}),
      ev('20:00','Táxi/Uber para Little Lion',{ end:'20:40', icon:'🚕', location:loc('Little Lion','Little Lion, Split, Croatia'), ticketId:'hotel-little-lion'}),
      ev('21:00','Jantar leve em Split',{ icon:'🍽️', location:loc('Split Old Town','Split Old Town, Croatia'), tip:'Hoje vale escolher algo perto do hotel: vocês chegam depois de Plitvice + estrada.'})
    ]
  },
  {
    date:'2026-09-18', city:'Split', title:'Diocleciano · Klis · Bačvice',
    summary:'Roma, fortaleza de Klis e fim da tarde no mar.',
    theme:'split', heroIcon:'🏛️', heroLabel:'SPLIT · DALMATIA',
    wear:['Biquíni/sunga','Tênis','Sandália na mochila'],
    bring:['Toalha','Protetor solar','Dinheiro/transporte'],
    alerts:['Verificar no dia os horários de retorno do ônibus 22 de Klis.'],
    events:[
      ev('08:30','Palácio de Diocleciano',{ end:'10:00', icon:'🏛️', location:loc('Diocletian’s Palace','Diocletian’s Palace, Split, Croatia'), tip:'Entre cedo pelo Peristilo e suba para os pontos altos antes das excursões; depois explore as ruelas sem roteiro.'}),
      ev('10:00','Fortaleza de Klis',{ end:'12:30', icon:'🏰', location:loc('Klis Fortress','Klis Fortress, Klis, Croatia'), perrengue:'Verificar horários do ônibus 22 para a volta.'}),
      ev('13:00','Almoço Fife',{ end:'14:15', icon:'🍽️', location:loc('Fife','Fife, Trumbićeva obala 11, Split, Croatia')}),
      ev('14:30','Parque Marjan',{ end:'16:00', icon:'🥾', location:loc('Marjan Forest Park','Marjan Forest Park, Split, Croatia')}),
      ev('16:00','Praia Bačvice',{ end:'18:30', icon:'🏖️', location:loc('Bačvice Beach','Bačvice Beach, Split, Croatia')}),
      ev('20:30','Jantar Villa Spiza',{ icon:'🍽️', location:loc('Villa Spiza','Villa Spiza, Petra Kružića 3, Split, Croatia')})
    ]
  },
  {
    date:'2026-09-19', city:'Krka', title:'7 cachoeiras · passeio · natureza',
    summary:'Bate-volta a Krka e fim de tarde em Split.',
    theme:'krka', heroIcon:'💦', heroLabel:'KRKA · DALMATIA',
    wear:['Roupa leve','Tênis','Roupa de banho se permitida no ponto visitado'],
    bring:['Toalha','Protetor solar','Reserva do tour','Água'],
    alerts:['Tour ainda precisava ser reservado no livreto.','Regras de banho podem mudar: confirmar com o parque/tour no dia.'],
    events:[
      ev('08:30','Tour Split → Krka',{ end:'09:30', icon:'🚌', location:loc('Krka National Park','Krka National Park, Croatia'), perrengue:'Confirmar ponto exato de encontro do tour após reservar.'}),
      ev('09:30','Krka + Skradinski Buk',{ end:'13:30', icon:'💦', location:loc('Skradinski Buk','Skradinski Buk, Krka National Park, Croatia'), perrengue:'Confirmar regras atuais de banho; não confiar apenas no livreto.', tip:'Faça primeiro a passarela completa de Skradinski Buk e só depois pare para almoço/fotos demoradas.'}),
      ev('13:30','Almoço no parque',{ end:'15:30', icon:'🍽️', location:loc('Lozovac','Lozovac, Krka National Park, Croatia')}),
      ev('15:30','Transfer de volta a Split',{ end:'17:00', icon:'🚌', location:loc('Split Old Town','Split, Croatia')}),
      ev('17:00','Praia Kaštelet',{ end:'18:30', icon:'🏖️', location:loc('Kaštelet Beach','Kaštelet Beach, Split, Croatia')}),
      ev('20:30','Jantar Zrno Soli',{ icon:'🍽️', location:loc('Zrno Soli','Zrno Soli, Uvala Baluni 8, Split, Croatia')})
    ]
  },
  {
    date:'2026-09-20', city:'Vis', title:'Ferry · Komiža · Stiniva',
    summary:'Ilha de Vis, vila de pescadores e enseada entre falésias.',
    theme:'vis', heroIcon:'⛵', heroLabel:'VIS · ADRIATIC',
    wear:['Biquíni/sunga','Aqua-shoes','Roupa leve'],
    bring:['Bilhete do ferry','Toalha','Protetor solar','Água'],
    alerts:['Ferry Jadrolinija estava pendente de confirmação no livreto.','Confirmar o horário de volta antes de seguir para Stiniva.'],
    events:[
      ev('08:00','Ferry Split → Vis',{ end:'10:15', icon:'⛴️', location:loc('Split Ferry Port','Split Ferry Port, Obala kneza Domagoja, Split, Croatia'), perrengue:'Confirmar terminal e horário exatos no ticket Jadrolinija.'}),
      ev('10:15','Vis Town',{ end:'11:00', icon:'🏘️', location:loc('Vis Town','Vis, Croatia')}),
      ev('11:00','Táxi/scooter para Komiža',{ end:'12:00', icon:'🚕', location:loc('Komiža','Komiža, Vis, Croatia')}),
      ev('13:00','Almoço Konoba Bako',{ end:'14:15', icon:'🍽️', location:loc('Konoba Bako','Konoba Bako, Komiža, Vis, Croatia'), tip:'Priorize peixe e frutos do mar; sente perto da água se houver mesa disponível.'}),
      ev('14:30','Ir para Stiniva',{ end:'16:00', icon:'⛵', location:loc('Stiniva Cove','Stiniva Cove, Vis, Croatia'), perrengue:'Antes de ir, reconfirmar ferry de volta.'}),
      ev('16:00','Nadar em Stiniva',{ end:'17:15', icon:'🏊', location:loc('Stiniva Cove','Stiniva Cove, Vis, Croatia'), perrengue:'Fundo rochoso; aqua-shoes.'}),
      ev('17:30','Retorno Vis → Split',{ end:'19:45', icon:'⛴️', location:loc('Vis Ferry Port','Vis Ferry Port, Vis, Croatia'), perrengue:'Horário no livreto é provisório; usar o ticket confirmado.'}),
      ev('20:00','Jantar Dvor',{ icon:'🍽️', location:loc('Dvor','Dvor, Put Firula 14, Split, Croatia')})
    ]
  },
  {
    date:'2026-09-21', city:'Split → Dubrovnik → Brasil', title:'Bačvice · compras · ônibus · voo',
    summary:'Último mergulho, compras, ônibus para Dubrovnik e voo ao Brasil.',
    theme:'split', heroIcon:'🧳', heroLabel:'SPLIT → DUBROVNIK',
    wear:['Roupa de banho pela manhã','Roupa de viagem','Tênis confortável'],
    bring:['Passaporte à mão','Boarding pass Iberia/LATAM','Toalha na mochila','Bagagem completa'],
    alerts:['O livreto afirma que o ônibus cruza a Bósnia/Neum: passaporte à mão para controles.','Boarding previsto 19h15 para voo 19h50.'],
    events:[
      ev('09:00','Último mergulho em Bačvice',{ end:'10:30', icon:'🏖️', location:loc('Bačvice Beach','Bačvice Beach, Split, Croatia')}),
      ev('11:00','Compras no Pazar',{ end:'12:00', icon:'🛍️', location:loc('Pazar Market','Pazar Market, Split, Croatia')}),
      ev('12:00','Almoço + checkout',{ end:'12:45', icon:'🍽️', location:loc('Fife','Fife, Trumbićeva obala 11, Split, Croatia')}),
      ev('13:00','Ônibus Split → Dubrovnik',{ end:'17:30', icon:'🚌', location:loc('Split Bus Station','Split Bus Station, Obala kneza Domagoja 12, Split, Croatia'), perrengue:'Passaporte à mão durante o trajeto.'}),
      ev('17:30','Chegada Gruž e táxi para DBV',{ end:'18:20', icon:'🚕', location:loc('Dubrovnik Airport','Dubrovnik Airport, Čilipi, Croatia')}),
      ev('19:15','Boarding voo LA1814',{ end:'19:50', icon:'🎫', location:loc('Dubrovnik Airport','Dubrovnik Airport, Čilipi, Croatia')}),
      ev('19:50','DBV → MAD → GRU',{ icon:'✈️', note:'LA1814 + LA1572 · chegada GRU prevista 22/set 05h55.'})
    ]
  }
];
