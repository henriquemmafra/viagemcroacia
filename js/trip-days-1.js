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
    date:'2026-09-09', city:'Dubrovnik → Budapest', title:'Rupe · voo · Budapest iluminada',
    summary:'Manhã segura em Dubrovnik, voo Wizz e primeira noite cheia em Pest: café histórico, bairro judeu, ruin bar e Danúbio iluminado.',
    theme:'budapest', heroIcon:'✈️', heroLabel:'DUBROVNIK → BUDAPEST',
    wear:['Roupa leve','Tênis confortável','Casaco leve para a noite'],
    bring:['Passaporte','Boarding pass Wizz Air','Powerbank'],
    alerts:[
      '🚨 W6 2256 sai às 14h10 e a porta de embarque fecha às 13h40.',
      'Meta segura: sair do hotel às 11h30 e estar no DBV por volta de 12h10.',
      'O cruzeiro noturno ainda depende de reserva/horário disponível; manter o restante da noite no mesmo eixo central de Pest.'
    ],
    events:[
      ev('08:00','Café da manhã sem pressa na Old Town',{ end:'08:50', icon:'☕', location:loc('Old Town Dubrovnik','Old Town, Dubrovnik, Croatia'), note:'Manhã propositalmente leve: nada de barco ou deslocamento longo antes do voo.'}),
      ev('09:00','Ethnographic Museum Rupe',{ end:'09:40', icon:'🏛️', location:loc('Ethnographic Museum Rupe','Od Rupa 3, 20000 Dubrovnik, Croatia'), ticketId:'dubrovnik-pass-henrique', note:'Abre às 09h e estava fechado ontem por ser terça-feira.'}),
      ev('09:45','Última volta pela Old Town + café/lembranças',{ end:'10:35', icon:'🚶', location:loc('Stradun','Stradun, Dubrovnik, Croatia'), tip:'Ficar dentro da Old Town e não iniciar nenhuma atração com fila ou transporte.'}),
      ev('10:40','Voltar ao hotel · malas + checkout',{ end:'11:20', icon:'🧳', location:loc('Lausa Dubrovnik Rooms','Garište ul. 4, 20000 Dubrovnik, Croatia'), note:'Deixar passaportes e cartões de embarque já separados antes de sair.'}),
      ev('11:30','SAIR para o aeroporto DBV',{ end:'12:10', icon:'🚕', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), ticketId:'wizz-henrique', perrengue:'Não atrasar esta saída.'}),
      ev('12:10','ESTAR no aeroporto DBV · segurança + portão',{ end:'13:20', icon:'🛫', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), ticketId:'wizz-henrique', note:'Chegada planejada com margem confortável.'}),
      ev('13:20','Estar no portão de embarque',{ end:'13:40', icon:'⏰', location:loc('Aeroporto de Dubrovnik','Dubrovnik Airport, Čilipi, Croatia'), ticketId:'wizz-henrique', perrengue:'Porta fecha às 13h40.'}),
      ev('14:10','W6 2256 Dubrovnik → Budapest',{ end:'15:30', icon:'✈️', ticketId:'wizz-henrique', note:'Henrique 4B · Cibele 4A · confirmação KWKWWW.'}),
      ev('15:30','Chegada Budapest Terminal 2B',{ end:'16:20', icon:'🛬', location:loc('Budapest Airport Terminal 2B','Budapest Ferenc Liszt International Airport Terminal 2B, Hungary')}),
      ev('16:30','Check-in Up Hotel Budapest',{ end:'17:15', icon:'🏨', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), ticketId:'hotel-up'}),
      ev('17:30','New York Café',{ end:'18:30', icon:'☕', location:loc('New York Café','New York Café, Erzsébet körút 9-11, Budapest, Hungary'), note:'Salão histórico Belle Époque; aqui a atração é tanto a arquitetura quanto o café.', tip:'Peça algo simples e aproveite o salão sem transformar a parada em jantar.', infoUrl:'https://newyorkcafe.hu/en/'}),
      ev('18:40','Grande Sinagoga · exterior + Dohány utca',{ end:'19:00', icon:'🕍', location:loc('Dohány Street Synagogue','Dohány u. 2, Budapest, Hungary'), note:'Primeiro contato com a Grande Sinagoga e o coração histórico do bairro judeu; visita interna fica para amanhã.', infoUrl:'https://dohany-zsinagoga.hu/'}),
      ev('19:00','Jewish Quarter · Kazinczy utca',{ end:'19:40', icon:'🚶', location:loc('Kazinczy utca','Kazinczy utca, Budapest, Hungary'), note:'Ruas do antigo bairro judeu, hoje cheias de bares, pátios, arte urbana e vida noturna.'}),
      ev('19:40','Szimpla Kert',{ end:'20:20', icon:'🍻', location:loc('Szimpla Kert','Szimpla Kert, Kazinczy utca 14, Budapest, Hungary'), note:'O ruin bar mais emblemático de Budapest, instalado em um prédio antigo cheio de ambientes e objetos reaproveitados.', infoUrl:'https://szimpla.hu/'}),
      ev('20:25','Gozsdu Udvar + jantar',{ end:'21:20', icon:'🍽️', location:loc('Gozsdu Udvar','Gozsdu Udvar, Király u. 13, Budapest, Hungary'), note:'Sequência de pátios entre Király e Dob, com restaurantes e movimento noturno; continua no mesmo eixo do Jewish Quarter.'}),
      ev('21:40','Cruzeiro noturno no Danúbio',{ end:'22:50', icon:'🚢', location:loc('Legenda City Cruises','Legenda City Cruises, Dock 7, Jane Haining rakpart, Budapest, Hungary'), status:'to-book', note:'Legenda Danube Legend: cerca de 1h, com Parlamento, Chain Bridge e Buda iluminados vistos da água.', perrengue:'Escolher o horário disponível e chegar ao píer com antecedência.', infoUrl:'https://legenda.hu/en/danube-legend', buyUrl:'https://webshop.legenda.hu/legenda/legenda_angol.reservation.page?cmd=2000'}),
      ev('23:10','Voltar ao Up Hotel',{ icon:'🌙', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), note:'Dormir: amanhã o roteiro começa cedo em Buda.'})
    ]
  },
  {
    date:'2026-09-10', city:'Budapest', title:'Buda → Danúbio → Pest → City Park',
    summary:'Dia cheio em fluxo geográfico: nascer da cidade em Buda, descida ao Danúbio, centro monumental de Pest, bairro judeu e termas no City Park.',
    theme:'budapest', heroIcon:'♨️', heroLabel:'BUDAPEST · DANUBE',
    wear:['Tênis','Roupa confortável','Casaco para a noite'],
    bring:['Roupa de banho','Toalha','Bilhete/transporte BKK','Powerbank'],
    alerts:[
      'Amanhã sair do hotel às 05h45 para o FlixBus das 06h45.',
      'Parlamento: interior somente se houver ingresso; sem ingresso, manter exterior + Kossuth Square.',
      'Széchenyi fecha às 20h na quinta; a piscina externa de lazer P3 está em manutenção entre 7–18/set, mas as piscinas termais seguem funcionando.'
    ],
    events:[
      ev('07:15','Sair do hotel para Buda',{ end:'07:40', icon:'🚕', location:loc('Fisherman’s Bastion','Fisherman’s Bastion, Budapest, Hungary'), note:'Começar no alto e depois descer progressivamente para Pest evita zigue-zague.'}),
      ev('07:45','Fisherman’s Bastion',{ end:'08:40', icon:'🏰', location:loc('Fisherman’s Bastion','Fisherman’s Bastion, Budapest, Hungary'), note:'Terraços neorromânicos com uma das vistas clássicas do Parlamento e do Danúbio.', tip:'Antes das 09h há muito menos gente e o acesso às áreas abertas é mais simples.', infoUrl:'https://fishermansbastion.com/'}),
      ev('09:00','Matthias Church',{ end:'09:40', icon:'⛪', location:loc('Matthias Church','Szentháromság tér 2, Budapest, Hungary'), status:'to-book', note:'Igreja histórica do Castle District, ligada a coroações e marcada pelo telhado colorido de cerâmica.', infoUrl:'https://matyas-templom.hu/', buyUrl:'https://matyas-templom.hu/en/buy-tickets/'}),
      ev('09:45','Buda Castle · Palácio Real e pátios',{ end:'10:40', icon:'👑', location:loc('Buda Castle','Buda Castle, Szent György tér, Budapest, Hungary'), note:'Complexo do antigo palácio real, hoje ocupado por importantes instituições culturais e mirantes sobre Pest.', infoUrl:'https://www.budacastle.hu/'}),
      ev('10:40','Castle Garden + descer e atravessar Chain Bridge',{ end:'11:10', icon:'🌉', location:loc('Széchenyi Chain Bridge','Széchenyi Chain Bridge, Budapest, Hungary'), note:'Descida natural de Castle Hill até o Danúbio e travessia pela ponte histórica para Pest.'}),
      ev('11:15','Shoes on the Danube Bank',{ end:'11:35', icon:'👞', location:loc('Shoes on the Danube Bank','Shoes on the Danube Bank, Id. Antall József rkp., Budapest, Hungary'), note:'Memorial às vítimas judias assassinadas às margens do Danúbio durante a Segunda Guerra Mundial.', infoUrl:'https://www.budapest.com/en/locations/shoes-on-the-danube-bank'}),
      ev('11:40','Parlamento + Kossuth Square',{ end:'12:50', icon:'🏛️', location:loc('Hungarian Parliament Building','Kossuth Lajos tér 1-3, Budapest, Hungary'), status:'to-book', note:'O Parlamento é o grande marco neogótico do Danúbio; a visita interna dura cerca de 45 min quando há ingresso.', perrengue:'Sem ingresso, não perder tempo em fila: fazer exterior, Kossuth Square e Visitor Centre.', infoUrl:'https://www.parlament.hu/en/web/house-of-the-national-assembly/visiting-the-parliament', buyUrl:'https://jegymester.hu/event-host/900/parlament'}),
      ev('13:00','Almoço rápido perto da Basílica',{ end:'13:40', icon:'🍽️', location:loc('St Stephen’s Basilica','Szent István tér 1, Budapest, Hungary'), note:'Almoço no caminho; nada de deslocamento extra.'}),
      ev('13:45','St Stephen’s Basilica + terraço panorâmico',{ end:'14:45', icon:'⛪', location:loc('St Stephen’s Basilica','Szent István tér 1, Budapest, Hungary'), status:'to-book', note:'Maior igreja de Budapest, dedicada a Santo Estêvão; a cúpula/terraço oferece visão 360° de Pest.', infoUrl:'https://bazilikabudapest.hu/en/', buyUrl:'https://www.bazilika.jegy.eu/en'}),
      ev('15:00','Grande Sinagoga + complexo judaico',{ end:'16:10', icon:'🕍', location:loc('Dohány Street Synagogue','Dohány u. 2, Budapest, Hungary'), status:'to-book', note:'Uma das maiores sinagogas do mundo, com memorial, cemitério e forte contexto da história judaica húngara.', infoUrl:'https://dohany-zsinagoga.hu/', buyUrl:'https://btm.jegy.hu/venue/dohany-utcai-zsinagoga/info?lang=en'}),
      ev('16:25','Heroes’ Square + Vajdahunyad Castle + City Park',{ end:'17:10', icon:'🗿', location:loc('Heroes’ Square','Heroes’ Square, Hősök tere, Budapest, Hungary'), note:'Praça monumental do milênio, seguida pelo castelo e pelo parque; tudo já encostado no Széchenyi.', infoUrl:'https://www.budapest.com/en/locations/vajdahunyad-castle'}),
      ev('17:15','Széchenyi Thermal Bath',{ end:'19:40', icon:'♨️', location:loc('Széchenyi Thermal Bath','Állatkerti krt. 9-11, Budapest, Hungary'), status:'to-book', note:'Maior complexo termal de Budapest, famoso pelas piscinas externas e salões neobarrocos.', perrengue:'Levar roupa de banho e toalha. A piscina externa de lazer P3 está em manutenção 7–18/set.', tip:'Comece pelas piscinas externas ainda com luz e depois vá para as áreas termais internas.', infoUrl:'https://www.szechenyibath.hu/', buyUrl:'https://tickets.szechenyibath.hu/'}),
      ev('20:10','Jantar perto do Up Hotel',{ end:'21:20', icon:'🍽️', location:loc('Up Hotel Budapest','Csengery utca 31, Budapest, Hungary'), note:'Encerrar perto do hotel para não criar deslocamento na véspera do ônibus cedo.'}),
      ev('21:30','Hotel · banho + malas prontas',{ icon:'🧳', location:loc('Up Hotel Budapest','Csengery utca 31, Budapest, Hungary'), perrengue:'Alarme cedo: saída 05h45 para Népliget.'})
    ]
  },
];
