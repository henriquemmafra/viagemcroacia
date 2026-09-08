const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays1 = [
  {
    date: '2026-09-07', city: 'Madrid → Dubrovnik', title: 'Escala Madrid + chegada Dubrovnik',
    summary: 'Conexão longa em Madrid com passeio curto e retorno conservador ao aeroporto antes do voo para Dubrovnik.',
    theme:'dubrovnik', heroIcon:'✈️', heroLabel:'MADRID → DUBROVNIK',
    wear: ['Roupa de viagem confortável', 'Tênis', 'Moletom leve'],
    bring: ['Passaporte', 'Celular + carregador', 'Boarding pass MAD → DBV', 'Confirmação do hotel'],
    alerts: [
      '⏰ 12:15 é a hora-limite planejada para começar o retorno ao aeroporto; meta: estar novamente na T4 às 13:00 para o voo das 16:05.',
      'Em GRU, confirmar que as bagagens despachadas foram etiquetadas diretamente até DBV/Dubrovnik.',
      'Não ativar o Dubrovnik Pass hoje; o livreto orienta ativá-lo amanhã para aproveitar as 72h.'
    ],
    events: [
      ev('05:25', 'Pouso em Madrid (MAD) · T4S', { end:'06:15', icon:'🛬', location:loc('Madrid-Barajas T4S','Adolfo Suárez Madrid–Barajas Airport Terminal 4S, Madrid, Spain'), note:'Chegada prevista do LA1579/IB268. Fazer imigração Schengen e seguir T4S → T4/saída.' }),
      ev('06:45', 'Saída prevista do aeroporto para Madrid', { end:'07:30', icon:'🚆', location:loc('Madrid centro','Madrid, Spain'), note:'Janela conservadora considerando desembarque, imigração e deslocamento interno desde a T4S.' }),
      ev('07:30', 'Madrid centro · café + passeio leve', { end:'11:45', icon:'🇪🇸', location:loc('Madrid centro','Puerta del Sol, Madrid, Spain'), tip:'Mantenha o passeio concentrado no centro e acompanhe o trânsito/tempo de deslocamento de volta. Não estique o roteiro por causa da conexão.' }),
      ev('12:15', 'COMEÇAR retorno ao aeroporto', { end:'13:00', icon:'⏰', location:loc('Madrid-Barajas T4','Adolfo Suárez Madrid–Barajas Airport Terminal 4, Madrid, Spain'), perrengue:'Este é o horário de segurança do roteiro. Mesmo se o passeio estiver ótimo, sair às 12:15 para preservar margem para transporte, segurança e portão.' }),
      ev('13:00', 'ESTAR na T4 · margem de segurança', { end:'15:15', icon:'🛫', location:loc('Madrid-Barajas T4','Adolfo Suárez Madrid–Barajas Airport Terminal 4, Madrid, Spain'), note:'Objetivo: estar na T4 cerca de 3h antes da saída. Conferir portão no painel/app da companhia e seguir para o embarque sem pressa.' }),
      ev('16:05', 'Voo Madrid → Dubrovnik', { end:'19:00', icon:'✈️', note:'LA1815 / IB937 · saída prevista de Madrid às 16:05.' }),
      ev('19:00', 'Pouso em Dubrovnik (DBV)', { end:'19:30', icon:'✈️', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), note:'Chegada prevista 19h.' }),
      ev('19:30', 'Táxi ou Uber para a Old Town', { end:'20:20', icon:'🚕', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia'), perrengue:'Com bagagem grande e cansaço, o livreto recomenda não usar ônibus.' }),
      ev('20:30', 'Check-in Lausa Dubrovnik Rooms', { end:'21:00', icon:'🏨', location:loc('Lausa Dubrovnik Rooms','Lausa Dubrovnik Rooms, Dubrovnik, Croatia'), ticketId:'hotel-lausa' }),
      ev('21:00', 'Jantar Lady Pi-Pi', { end:'22:15', icon:'🍽️', location:loc('Lady Pi-Pi','Lady Pi-Pi, Peline 1, Dubrovnik, Croatia'), note:'Cozinha dálmata e grelhados.', tip:'Se houver opção, sente na área externa. Para primeiro jantar, grelhados e pratos dálmatas são uma escolha simples.' }),
      ev('22:30', 'Dormir cedo', { icon:'🌙', note:'Amanhã: acordar 7h e chegar às muralhas antes das 8h.' })
    ]
  },
  {
    date: '2026-09-08', city: 'Dubrovnik', title: 'Dubrovnik Pass · muralhas · museus · Srđ',
    summary: 'Rota intensiva do Dubrovnik Pass pela Old Town, incluindo Lovrijenac e Revelin, com Proto, descanso e pôr do sol no Monte Srđ.',
    theme:'dubrovnik', heroIcon:'🎟️', heroLabel:'DUBROVNIK PASS · BLITZ',
    wear: ['Tênis fechado', 'Boné', 'Roupa leve'],
    bring: ['Dubrovnik Pass', '1 L de água/pessoa', 'Protetor 50+'],
    alerts: [
      'QR do ônibus do Dubrovnik Pass funciona uma vez; guardar o ticket impresso entregue pelo motorista.',
      'Ethnographic Museum Rupe fica fora hoje porque terça-feira é o dia de fechamento.',
      'Prioridade de horário: chegar às Archaeological Exhibitions no Forte Revelin antes das 16h.'
    ],
    events: [
      ev('08:05','Muralhas Medievais',{ end:'09:30', icon:'🏰', location:loc('Dubrovnik City Walls - Pile Gate','Dubrovnik City Walls, Pile Gate, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Circuito principal das muralhas incluído no Dubrovnik Pass.', tip:'Faça as paradas panorâmicas no início do circuito, antes da luz ficar mais dura.'}),
      ev('09:30','Fortaleza Lovrijenac',{ end:'10:00', icon:'🏯', location:loc('Fort Lovrijenac','Fort Lovrijenac, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Fortaleza incluída no acesso do Dubrovnik Pass; visita curta para preservar o restante da manhã.'}),
      ev('10:05','Museu Franciscano + Farmácia Mala Braća',{ end:'10:25', icon:'⚕️', location:loc('Franciscan Monastery Museum','Placa 2, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Museu do mosteiro + passagem pela histórica Farmácia Mala Braća.'}),
      ev('10:30','House of Marin Držić',{ end:'10:50', icon:'🏛️', location:loc('House of Marin Držić','Široka ul. 7, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Visita rápida focada na casa-museu e no contexto do dramaturgo renascentista.'}),
      ev('10:55','Dubrovnik Natural History Museum',{ end:'11:15', icon:'🦉', location:loc('Dubrovnik Natural History Museum','Androvićeva 1, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Parada curta para manter o circuito compacto.'}),
      ev('11:20','Rector’s Palace',{ end:'11:50', icon:'🏛️', location:loc('Rector’s Palace','Pred Dvorom 3, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Uma das prioridades do passe: antigo centro político da República de Ragusa.', tip:'Se precisar cortar alguma coisa por atraso, preserve esta visita.'}),
      ev('11:55','Dulčić–Masle–Pulitika Gallery',{ end:'12:10', icon:'🖼️', location:loc('Dulčić–Masle–Pulitika Gallery','Poljana Marina Držića 1, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Galeria compacta; 15 minutos são suficientes para uma passagem objetiva.'}),
      ev('12:15','Maritime Museum + Pulitika Studio',{ end:'12:45', icon:'⚓', location:loc('Maritime Museum · Fort St John','Fort St John, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Dois itens do passe concentrados no Forte St. John.', tip:'O Maritime Museum é prioridade se houver atraso.'}),
      ev('13:00','Almoço Proto',{ end:'14:15', icon:'🍽️', location:loc('Proto Fish Restaurant','Široka ul. 1, 20000 Dubrovnik, Croatia'), tip:'Priorize peixe/frutos do mar e pergunte pelo pescado do dia; manter o almoço em até 1h15 preserva Revelin.'}),
      ev('14:30','Archaeological Exhibitions · Revelin',{ end:'14:50', icon:'🏰', location:loc('Revelin Fortress','Revelin Fortress, Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', perrengue:'Esta é a parada com horário mais crítico: chegar antes das 16h.', note:'Exposições arqueológicas dentro do Forte Revelin.'}),
      ev('15:00','Museum of Modern Art Dubrovnik',{ end:'15:35', icon:'🖼️', location:loc('Museum of Modern Art Dubrovnik','Put Frana Supila 23, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Última atração do passe antes do descanso; fica a leste da Old Town.'}),
      ev('15:45','Descanso no hotel',{ end:'17:15', icon:'🛏️', location:loc('Lausa Dubrovnik Rooms','Garište ul. 4, 20000 Dubrovnik, Croatia'), note:'Banho, água e descanso antes da subida ao Srđ.'}),
      ev('17:30','Subida ao Monte Srđ',{ end:'19:00', icon:'🥾', location:loc('Mount Srđ trail','Mount Srđ hiking trail, Dubrovnik, Croatia'), perrengue:'Trilha de aproximadamente 2,5 km e 45–75 min de subida; levar água.'}),
      ev('19:00','Pôr do sol no Monte Srđ',{ end:'20:00', icon:'🌅', location:loc('Mount Srđ summit','Mount Srđ, Dubrovnik, Croatia'), tip:'Melhor enquadramento: Old Town inteira, muralhas e ilhas ao fundo.'}),
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
