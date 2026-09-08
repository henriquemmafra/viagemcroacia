const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays3 = [
  {
    date:'2026-09-15', city:'Ístria interior', title:'Motovun · Grožnjan · Rovinj',
    summary:'Dia cheio pelo interior da Ístria com motorista/tour privado: Motovun, trufas, Grožnjan e fim de tarde no mar em Rovinj.',
    theme:'kamenjak', heroIcon:'🏰', heroLabel:'ISTRIA · HILL TOWNS',
    wear:['Tênis','Roupa leve','Óculos de sol'],
    bring:['Água','Powerbank','Dinheiro/cartão','Roupa de banho na mochila'],
    alerts:[
      'Sem aluguel de carro: usar motorista/tour privado saindo de Rovinj.',
      'Há opção local Rovinj → Motovun → Grožnjan → Rovinj com saída 10h e retorno 16h; fechar antes da data.',
      'Combinar preço fechado e pontos de encontro antes de sair.'
    ],
    events:[
      ev('08:30','Café + Rovinj Market',{ end:'09:30', icon:'☕', location:loc('Rovinj Market','Rovinj Market, Croatia'), note:'Manhã curta na cidade antes do passeio pelo interior.'}),
      ev('10:00','Motorista/tour Rovinj → Motovun',{ end:'11:00', icon:'🚐', location:loc('Motovun','Motovun, Croatia'), status:'to-book', note:'Transfer privado pelo interior da Ístria; a opção pesquisada inclui Motovun e Grožnjan no mesmo circuito.', infoUrl:'https://yctransfers-rovinj.hr/daily-experience'}),
      ev('11:00','Motovun · muralhas + trufas',{ end:'13:15', icon:'🏰', location:loc('Motovun','Motovun, Croatia'), note:'Cidade medieval no alto do vale do Mirna, conhecida pelas muralhas, vistas e gastronomia de trufas.', tip:'Almoçar aqui e provar algo com trufas sem alongar demais a parada.'}),
      ev('13:20','Transfer Motovun → Grožnjan',{ end:'14:00', icon:'🚐', location:loc('Grožnjan','Grožnjan, Croatia')}),
      ev('14:00','Grožnjan · ruelas + ateliês',{ end:'15:20', icon:'🎨', location:loc('Grožnjan','Grožnjan, Croatia'), note:'Pequena cidade de artistas com galerias, vielas de pedra e mirantes sobre a Ístria.', tip:'Aqui vale caminhar sem roteiro pelas ruelas e ateliês.'}),
      ev('15:20','Transfer Grožnjan → Rovinj',{ end:'16:00', icon:'🚐', location:loc('Rovinj','Rovinj, Croatia')}),
      ev('16:30','Mulini / Golden Cape · banho de mar',{ end:'18:30', icon:'🏖️', location:loc('Mulini Beach','Mulini Beach, Rovinj, Croatia'), note:'Fim de tarde livre no mar depois do interior da península.'}),
      ev('19:00','Old Town + pôr do sol',{ end:'19:45', icon:'🌅', location:loc('Rovinj Old Town','Rovinj Old Town, Croatia')}),
      ev('20:00','Jantar Orca',{ end:'21:15', icon:'🍽️', location:loc('Orca Rovinj','Orca, Obala Alda Rismonda 2, Rovinj, Croatia')})
    ]
  },
  {
    date:'2026-09-16', city:'Rovinj → Rastoke → Plitvice', title:'Transfer · Rastoke · Plitvice',
    summary:'Mudança de base sem aluguel de carro: transfer privado com bagagem, parada em Rastoke e chegada à Villa Prica ainda à tarde.',
    theme:'rastoke', heroIcon:'💧', heroLabel:'RASTOKE · PLITVICE',
    wear:['Roupa confortável','Tênis','Capa de chuva'],
    bring:['Reserva Villa Prica','Ingresso Plitvice se já emitido','Água','Bagagem completa'],
    alerts:[
      'Sem aluguel de carro: fechar transfer Rovinj → Plitvice com parada em Rastoke.',
      'Rastoke fica no caminho e é uma parada lógica; fornecedores de transfer aceitam incluir a vila.',
      'Dormir cedo para começar Plitvice às 07:30 amanhã.'
    ],
    events:[
      ev('07:45','Checkout Charmy Rovinj',{ end:'08:15', icon:'🧳', location:loc('Charmy Rovinj','Charmy Rovinj, Rovinj, Croatia'), ticketId:'hotel-charmy'}),
      ev('08:30','Transfer privado Rovinj → Rastoke',{ end:'11:30', icon:'🚐', location:loc('Rastoke','Rastoke, Slunj, Croatia'), status:'to-book', note:'Transfer com bagagem e parada intermediária; a duração real depende do trânsito.', infoUrl:'https://www.istramore.com/private-transfer-rovinj-to-plitvice-lakes'}),
      ev('11:30','Explorar Rastoke',{ end:'12:45', icon:'💧', location:loc('Rastoke','Rastoke, Slunj, Croatia'), note:'Vila de moinhos e pequenas quedas d’água junto aos rios Slunjčica e Korana.', tip:'As fotos mais bonitas combinam pontes, casas de madeira e quedas d’água.'}),
      ev('12:45','Almoço em Rastoke',{ end:'13:45', icon:'🍽️', location:loc('Rastoke','Rastoke, Slunj, Croatia')}),
      ev('13:45','Transfer Rastoke → Villa Prica',{ end:'14:30', icon:'🚐', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia')}),
      ev('14:30','Check-in Villa Prica',{ end:'15:15', icon:'🏨', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia'), ticketId:'hotel-villa-prica'}),
      ev('15:30','Reconhecer acesso ao parque + organizar amanhã',{ end:'17:00', icon:'📍', location:loc('Plitvice Entrance 2','Plitvice Lakes National Park Entrance 2, Croatia'), note:'Confirmar transporte curto da hospedagem até a Entrada 2, ponto inicial oficial do Programa H.', perrengue:'O Programa H começa na Entrada 2; não confundir com a Entrada 1.'}),
      ev('18:30','Jantar cedo perto da hospedagem',{ end:'20:00', icon:'🍽️', location:loc('Plitvica Selo','Plitvica Selo, Croatia')}),
      ev('21:30','Dormir cedo',{ icon:'🌙', note:'Acordar 06:15; objetivo é estar na Entrada 2 antes de 07:30.'})
    ]
  },
  {
    date:'2026-09-17', city:'Plitvice → Split', title:'Programa H · ônibus direto · Split',
    summary:'Plitvice cedo pelo Programa H e depois ônibus direto para Split; nenhuma etapa depende de carro alugado.',
    theme:'plitvice', heroIcon:'🌊', heroLabel:'PLITVICE · CROATIA',
    wear:['Tênis fechado','Capa de chuva','Camadas leves'],
    bring:['Ingresso Plitvice','Água','Bagagem completa','Reserva Little Lion'],
    alerts:[
      'Programa H começa oficialmente na Entrada 2 e leva cerca de 4–6h.',
      'Ônibus direto Plitvice → Split: alvo 16:20, chegada ~20:50; comprar/confirmar antes.',
      'Depois do parque, garantir a bagagem e estar no ponto do ônibus com pelo menos 20 min de margem.'
    ],
    events:[
      ev('06:15','Café na Villa Prica',{ end:'06:50', icon:'☕', location:loc('Villa Prica','Villa Prica, Plitvica Selo 32, Croatia')}),
      ev('06:50','Transfer curto → Entrada 2',{ end:'07:20', icon:'🚕', location:loc('Plitvice Entrance 2','Plitvice Lakes National Park Entrance 2, Croatia'), status:'to-finalize', perrengue:'Combinar esse deslocamento com a hospedagem no dia anterior.'}),
      ev('07:30','Programa H em Plitvice',{ end:'13:15', icon:'🥾', location:loc('Plitvice Entrance 2','Plitvice Lakes National Park Entrance 2, Croatia'), status:'to-book', note:'Programa oficial de 4–6h: lagos superiores, barco elétrico pelo Kozjak, lagos inferiores e Veliki Slap.', perrengue:'Tênis fechado e sem banho nos lagos.', tip:'Começar cedo é a maior vantagem: menos movimento e mais margem para o ônibus da tarde.', infoUrl:'https://np-plitvicka-jezera.hr/en/plan-your-visit/istrazite-jezera/activities/lake-tour-programmes/', buyUrl:'https://ticketing.np-plitvicka-jezera.hr/'}),
      ev('13:20','Almoço Lička kuća',{ end:'14:30', icon:'🍽️', location:loc('Lička Kuća','Lička Kuća, Plitvice Lakes National Park, Croatia'), tip:'Comer sem pressa excessiva; ainda é preciso recuperar bagagem e chegar ao ponto do ônibus.'}),
      ev('14:30','Bagagem + deslocar para ponto do ônibus',{ end:'15:45', icon:'🧳', location:loc('Plitvice Entrance 1','Plitvice Lakes National Park Entrance 1, Croatia'), perrengue:'Confirmar no bilhete qual entrada é o ponto exato de embarque. Os ônibus param na rodovia junto às entradas.'}),
      ev('16:20','Ônibus Plitvice → Split',{ end:'20:50', icon:'🚌', location:loc('Split Bus Station','Obala kneza Domagoja 12, Split, Croatia'), status:'to-book', note:'Serviço direto sazonal planejado para a tarde; confirmar o bilhete específico de 17/set antes de depender deste horário.'}),
      ev('20:50','Caminhar/táxi para Little Lion',{ end:'21:15', icon:'🚕', location:loc('Little Lion','Little Lion, Split, Croatia'), ticketId:'hotel-little-lion'}),
      ev('21:20','Jantar leve em Split',{ icon:'🍽️', location:loc('Split Old Town','Split Old Town, Croatia'), tip:'Escolher algo perto do hotel porque o ônibus chega à noite.'})
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
      ev('13:00','Almoço Konoba Bako',{ end:'14:15', icon:'🍽️', location:loc('Konoba Bako','Konoba Bako, Komiža, Croatia'), tip:'Priorize peixe e frutos do mar; sente perto da água se houver mesa disponível.'}),
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
