const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays1 = [
  {
    date: '2026-09-07', city: 'Dubrovnik', title: 'Chegada Dubrovnik',
    summary: 'Chegada ao Adriático, check-in na Old Town e jantar leve.',
    theme:'dubrovnik', heroIcon:'🏰', heroLabel:'DUBROVNIK · ADRIATIC',
    wear: ['Roupa de viagem confortável', 'Tênis', 'Moletom leve'],
    bring: ['Passaporte', 'Celular + carregador', 'Confirmação do hotel'],
    alerts: ['Não ativar o Dubrovnik Pass hoje; o livreto orienta ativá-lo amanhã para aproveitar as 72h.'],
    events: [
      ev('19:00', 'Pouso em Dubrovnik (DBV)', { end:'19:30', icon:'✈️', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), note:'Chegada prevista 19h.' }),
      ev('19:30', 'Táxi ou Uber para a Old Town', { end:'20:20', icon:'🚕', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia'), perrengue:'Com bagagem grande e cansaço, o livreto recomenda não usar ônibus.' }),
      ev('20:30', 'Check-in Lausa Dubrovnik Rooms', { end:'21:00', icon:'🏨', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia'), ticketId:'hotel-lausa' }),
      ev('21:00', 'Jantar Lady Pi-Pi', { end:'22:15', icon:'🍽️', location:loc('Lady Pi-Pi','Lady Pi-Pi, Peline 1, Dubrovnik, Croatia'), note:'Cozinha dálmata e grelhados.', tip:'Se houver opção, sente na área externa. Para primeiro jantar, grelhados e pratos dálmatas são uma escolha simples.' }),
      ev('22:30', 'Dormir cedo', { icon:'🌙', note:'Amanhã: acordar 7h e chegar às muralhas antes das 8h.' })
    ]
  },
  {
    date: '2026-09-08', city: 'Dubrovnik', title: 'Muralhas · Lovrijenac · Monte Srđ',
    summary: 'Dubrovnik Pass, muralhas cedo e pôr do sol no Monte Srđ.',
    theme:'dubrovnik', heroIcon:'🧱', heroLabel:'DUBROVNIK · WALLS',
    wear: ['Tênis fechado', 'Boné', 'Roupa leve'],
    bring: ['Dubrovnik Pass', '1 L de água/pessoa', 'Protetor 50+'],
    alerts: ['QR do ônibus do Dubrovnik Pass funciona uma vez; guardar o ticket impresso entregue pelo motorista.'],
    events: [
      ev('07:30','Ativar Dubrovnik Pass na Porta Pile',{ end:'07:45', icon:'🎟️', location:loc('Pile Gate','Pile Gate, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', perrengue:'Ativar aqui, não no dia anterior.'}),
      ev('07:45','Muralhas Medievais',{ end:'09:30', icon:'🏰', location:loc('Dubrovnik City Walls - Pile Gate','Dubrovnik City Walls, Pile Gate, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', perrengue:'O livreto recomenda entrar antes das 8h para evitar calor e lotação.', tip:'Na primeira metade do circuito, pare nos pontos que enquadram telhados + Adriático; depois a luz fica mais dura.'}),
      ev('09:30','Fortaleza Lovrijenac + Stradun',{ end:'10:30', icon:'🏯', location:loc('Fort Lovrijenac','Fort Lovrijenac, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique'}),
      ev('10:30','Farmácia Mala Braća',{ end:'11:15', icon:'⚕️', location:loc('Franciscan Pharmacy','Franciscan Monastery Pharmacy, Dubrovnik, Croatia')}),
      ev('13:00','Almoço Proto',{ end:'14:30', icon:'🍽️', location:loc('Proto Fish Restaurant','Proto Fish Restaurant, Široka 1, Dubrovnik, Croatia'), tip:'Priorize peixe/frutos do mar e pergunte pelo pescado do dia; almoço é melhor que jantar para manter a noite livre.'}),
      ev('15:00','Descanso no hotel',{ end:'17:00', icon:'🛏️', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia'), note:'Evitar sol de pico.'}),
      ev('17:30','Subida ao Monte Srđ',{ end:'19:00', icon:'🥾', location:loc('Mount Srđ trail','Mount Srđ hiking trail, Dubrovnik, Croatia'), perrengue:'Trilha descrita no livreto como 2,5 km e 45–75 min de subida.'}),
      ev('19:00','Pôr do sol no Monte Srđ',{ end:'20:00', icon:'🌅', location:loc('Mount Srđ summit','Mount Srđ, Dubrovnik, Croatia'), tip:'O melhor enquadramento é a Old Town inteira com as ilhas ao fundo; chegue antes do sol encostar no horizonte.'}),
      ev('20:30','Jantar Konoba Tabak',{ icon:'🍽️', location:loc('Konoba Tabak','Konoba Tabak, Dubrovnik, Croatia')})
    ]
  },
  {
    date:'2026-09-09', city:'Dubrovnik → Budapest', title:'Lokrum + voo + Budapest',
    summary:'Manhã de mar em Lokrum, voo Wizz Air e chegada a Budapest.',
    theme:'budapest', heroIcon:'✈️', heroLabel:'DUBROVNIK → BUDAPEST',
    wear:['Biquíni/sunga por baixo','Roupa leve','Casaco leve para a noite'],
    bring:['Toalha','Passaporte','Boarding pass Wizz Air','Powerbank'],
    alerts:['Porta do voo fecha 13h40.','Confirmar no dia o último ferry de Lokrum.'],
    events:[
      ev('08:00','Ferry para Lokrum',{ end:'08:30', icon:'⛴️', location:loc('Old Port Dubrovnik','Old Port, Dubrovnik, Croatia'), perrengue:'Confirmar horário do ferry de volta antes de desembarcar.'}),
      ev('08:30','Lokrum: lago salgado e ilha',{ end:'10:45', icon:'🏝️', location:loc('Lokrum Island','Lokrum, Dubrovnik, Croatia'), note:'Levar toalha; o livreto indica ausência de vestiário na ilha.', tip:'Faça primeiro os pontos mais distantes do cais e volte em direção ao embarque; reduz o risco de perder o ferry.'}),
      ev('11:30','Voltar e fazer checkout',{ end:'12:30', icon:'🧳', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia')}),
      ev('13:00','Ir para o aeroporto DBV',{ end:'13:40', icon:'🚕', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), ticketId:'wizz-henrique', perrengue:'Porta fecha 13h40.'}),
      ev('14:10','W6 2256 Dubrovnik → Budapest',{ end:'15:30', icon:'✈️', ticketId:'wizz-henrique', note:'Henrique 4B · Cibele 4A · confirmação KWKWWW.'}),
      ev('15:30','Chegada Budapest Terminal 2B',{ end:'16:20', icon:'🛬', location:loc('Budapest Airport Terminal 2B','Budapest Ferenc Liszt International Airport Terminal 2B, Hungary')}),
      ev('16:30','Check-in Up Hotel Budapest',{ end:'18:00', icon:'🏨', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), ticketId:'hotel-up'}),
      ev('20:00','Jewish Quarter + Szimpla Kert',{ icon:'🌙', location:loc('Szimpla Kert','Szimpla Kert, Kazinczy utca 14, Budapest, Hungary')})
    ]
  },
  {
    date:'2026-09-10', city:'Budapest', title:'Castelo · Széchenyi · Ruin Bars',
    summary:'Café histórico, Buda, termas e noite no bairro judeu.',
    theme:'budapest', heroIcon:'♨️', heroLabel:'BUDAPEST · DANUBE',
    wear:['Tênis','Roupa confortável','Casaco para a noite'],
    bring:['Roupa de banho','Toalha','Bilhete/transporte BKK'],
    alerts:['Amanhã sair do hotel às 05h45 para o FlixBus das 06h45.'],
    events:[
      ev('08:30','Café da manhã New York Café',{ end:'09:45', icon:'☕', location:loc('New York Café','New York Café, Erzsébet körút 9-11, Budapest, Hungary'), tip:'Aqui a experiência é o salão: peça algo simples e aproveite a arquitetura, sem transformar o café em uma refeição longa.'}),
      ev('10:00','Castelo de Buda + Bastião dos Pescadores',{ end:'11:30', icon:'🏰', location:loc('Fisherman’s Bastion','Fisherman’s Bastion, Budapest, Hungary'), tip:'Para a foto clássica do Parlamento, procure os arcos do Bastião que enquadram o Danúbio.'}),
      ev('11:30','Palácio Real + Igreja de Matias',{ end:'13:00', icon:'⛪', location:loc('Matthias Church','Matthias Church, Budapest, Hungary')}),
      ev('14:30','Széchenyi Thermal Bath',{ end:'16:15', icon:'♨️', location:loc('Széchenyi Thermal Bath','Széchenyi Thermal Bath, Budapest, Hungary'), perrengue:'Levar roupa de banho e toalha.', tip:'Comece pelas piscinas externas; são as mais icônicas e você evita ficar molhado procurando caminho depois.'}),
      ev('16:30','Grande Sinagoga',{ end:'18:00', icon:'🕍', location:loc('Dohány Street Synagogue','Dohány Street Synagogue, Budapest, Hungary')}),
      ev('18:30','Szimpla Kert',{ end:'19:45', icon:'🍻', location:loc('Szimpla Kert','Szimpla Kert, Kazinczy utca 14, Budapest, Hungary')}),
      ev('20:00','Jantar Borkonyha',{ icon:'🍽️', location:loc('Borkonyha Winekitchen','Borkonyha Winekitchen, Sas utca 3, Budapest, Hungary'), perrengue:'O livreto recomenda reservar.', tip:'Se quiser vinho, peça sugestão de taça húngara para acompanhar o prato em vez de fechar uma garrafa.'})
    ]
  },
];
