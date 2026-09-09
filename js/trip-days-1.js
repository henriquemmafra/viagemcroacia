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
    date:'2026-09-09', city:'Dubrovnik → Budapest', title:'Rupe · voo · cruzeiro reservado',
    summary:'Manhã segura em Dubrovnik, voo Wizz e primeira noite em Budapest organizada em torno do cruzeiro confirmado no Dock Zero, com margem real para localizar o píer.',
    theme:'budapest', heroIcon:'✈️', heroLabel:'DUBROVNIK → BUDAPEST',
    wear:['Roupa leve','Tênis confortável','Casaco leve para o Danúbio'],
    bring:['Passaporte','Boarding pass Wizz Air','Powerbank','Reserva GetYourGuide do cruzeiro'],
    alerts:[
      '🚨 W6 2256 sai às 14h10 e a porta de embarque fecha às 13h40.',
      'Meta segura: sair do hotel às 11h30 e estar no DBV por volta de 12h10.',
      '🚢 Cruzeiro confirmado: saída 19h15. O fornecedor pede chegada 19h00; o roteiro mira 18h45 para haver margem para descer ao cais e localizar a placa vermelha “0”.'
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
      ev('17:30','New York Café',{ end:'18:15', icon:'☕', location:loc('New York Café','New York Café, Erzsébet körút 9-11, Budapest, Hungary'), note:'Parada encurtada para não sacrificar a margem do cruzeiro.', tip:'Às 18h15, sair mesmo que ainda esteja agradável; o compromisso fixo é o barco.', infoUrl:'https://newyorkcafe.hu/en/'}),
      ev('18:15','Sair para Dock Zero · margem de segurança',{ end:'18:45', icon:'🚕', location:loc('Dock Zero · Rubin Group','Budapest, Carl Lutz rkp., 1133 Hungary'), note:'Preferir Uber/táxi para evitar baldeação e depois descer ao nível inferior do cais.', perrengue:'Não confiar apenas no endereço. Procurar “Rubin Group” no Maps e a placa grande vermelha “0” no cais inferior.'}),
      ev('18:45','ESTAR no Dock Zero · embarque',{ end:'19:15', icon:'⏰', location:loc('Dock Zero · Rubin Group','Budapest, Carl Lutz rkp., 1133 Hungary'), ticketId:'budapest-danube-cruise', note:'Fornecedor pede chegada até 19h00. A meta de 18h45 dá 30 minutos antes da saída e 15 minutos extras além do mínimo.', perrengue:'Se o carro deixar no nível da rua, ainda é necessário descer as passarelas/escadas até o Carl Lutz rakpart.'}),
      ev('19:15','Cruzeiro no Danúbio · Dock Zero',{ end:'20:30', icon:'🚢', location:loc('Dock Zero · Rubin Group','Budapest, Carl Lutz rkp., 1133 Hungary'), ticketId:'budapest-danube-cruise', status:'confirmed', bookingUrl:'https://gyg.me/Wn4Sqie6', note:'Cruzeiro confirmado de aproximadamente 75 minutos; o restante da noite só começa depois do desembarque.'}),
      ev('20:45','Gozsdu Udvar + jantar',{ end:'21:35', icon:'🍽️', location:loc('Gozsdu Udvar','Gozsdu Udvar, Király u. 13, Budapest, Hungary'), note:'Jantar já dentro do Jewish Quarter, sem criar outro compromisso cronometrado.'}),
      ev('21:40','Szimpla Kert',{ end:'22:25', icon:'🍻', location:loc('Szimpla Kert','Szimpla Kert, Kazinczy utca 14, Budapest, Hungary'), note:'Opcional depois do cruzeiro e jantar; se estiverem cansados, cortar sem prejuízo.', infoUrl:'https://szimpla.hu/'}),
      ev('22:40','Voltar ao Up Hotel',{ icon:'🌙', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), note:'Dormir bem: amanhã há dois compromissos fixos e o ônibus para Ljubljana sai cedo no dia seguinte.'})
    ]
  },
  {
    date:'2026-09-10', city:'Budapest', title:'Pest cedo · Buda reservado · concerto',
    summary:'Manhã em Pest com Basílica e Sinagoga, deslocamento antecipado para o passeio reservado em Buda e retorno com folga para o concerto noturno na Basílica.',
    theme:'budapest', heroIcon:'🎟️', heroLabel:'BUDAPEST · RESERVAS FIXAS',
    wear:['Tênis confortável','Roupa com joelhos e ombros cobertos','Casaco leve'],
    bring:['QR da Basílica salvo offline','Reservas GetYourGuide','Powerbank','Bilhete/transporte BKK'],
    alerts:[
      '🚨 Buda Castle Walks começa 14h30 em Dísz tér 15. O fornecedor pede 14h15; a meta é chegar 13h40.',
      '🎼 Concerto na Basílica: estar lá 19h40; a meta é 19h20.',
      '♨️ Széchenyi foi retirado deste dia: encaixá-lo entre o passeio de Buda e o concerto deixaria a logística apertada demais.',
      'Amanhã sair do hotel às 05h45 para o FlixBus das 06h45.'
    ],
    events:[
      ev('08:20','Sair do hotel para o Parlamento',{ end:'08:50', icon:'🚕', location:loc('Hungarian Parliament Building','Kossuth Lajos tér 1-3, Budapest, Hungary'), note:'Começar em Pest e avançar a pé para o sul evita cruzar o Danúbio duas vezes antes do passeio reservado.'}),
      ev('08:50','Parlamento + Kossuth Square',{ end:'09:25', icon:'🏛️', location:loc('Hungarian Parliament Building','Kossuth Lajos tér 1-3, Budapest, Hungary'), note:'Exterior + praça. Só entrar se já houver ingresso com horário compatível; não entrar em fila que ameace o restante do dia.', infoUrl:'https://www.parlament.hu/en/web/house-of-the-national-assembly/visiting-the-parliament'}),
      ev('09:30','Shoes on the Danube Bank',{ end:'09:50', icon:'👞', location:loc('Shoes on the Danube Bank','Shoes on the Danube Bank, Id. Antall József rkp., Budapest, Hungary'), note:'Parada curta no caminho para a Basílica.', infoUrl:'https://www.budapest.com/en/locations/shoes-on-the-danube-bank'}),
      ev('10:05','Basílica de Santo Estêvão · Igreja + Panorâmico + Tesouro',{ end:'11:20', icon:'⛪', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-entry', status:'confirmed', note:'Ingresso confirmado, válido a partir de 09h00. QR disponível na Carteira do app.', infoUrl:'https://bazilikabudapest.hu/en/'}),
      ev('11:30','Almoço cedo perto da Basílica',{ end:'12:10', icon:'🍽️', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), note:'Almoço curto e central; nada de deslocamento extra.'}),
      ev('12:20','Grande Sinagoga + complexo judaico',{ end:'13:00', icon:'🕍', location:loc('Dohány Street Synagogue','Dohány u. 2, 1074 Budapest, Hungary'), note:'Janela propositalmente limitada. Se houver fila relevante, reduzir ou cortar: o passeio das 14h30 é a prioridade fixa.', perrengue:'Às 13h05 sair obrigatoriamente, mesmo que a visita não tenha terminado.', infoUrl:'https://dohany-zsinagoga.hu/'}),
      ev('13:05','SAIR da Sinagoga → Dísz tér · Uber/táxi',{ end:'13:40', icon:'🚕', location:loc('Buda Castle Walks meeting point','Budapest, Dísz tér 15, 1014 Hungary'), note:'Janela de 35 min para um trajeto que normalmente é bem menor; a diferença é margem para trânsito, desembarque e localização do portão.'}),
      ev('13:40','ESTAR em Dísz tér 15 · localizar guia',{ end:'14:30', icon:'⏰', location:loc('Buda Castle Walks meeting point','Budapest, Dísz tér 15, 1014 Hungary'), ticketId:'buda-castle-walk', note:'Ao lado do prédio “Posta”, no grande portão verde. Procurar o guia com guarda-chuva turquesa da Buda Castle Walks.', perrengue:'O fornecedor pede chegada 14h15 e avisa que não espera atrasados. A meta de 13h40 deixa 35 minutos extras.'}),
      ev('14:30','Buda Castle Walks · passeio guiado',{ end:'16:00', icon:'🏰', location:loc('Buda Castle Walks','Budapest, Dísz tér 15, 1014 Hungary'), ticketId:'buda-castle-walk', status:'confirmed', bookingUrl:'https://gyg.me/Ww3oPthA', note:'Reserva confirmada. Planejado como 90 min; calçado confortável e casaco leve ajudam nas áreas subterrâneas/frias.'}),
      ev('16:00','Fisherman’s Bastion + Matthias Church exterior',{ end:'16:40', icon:'🏰', location:loc('Fisherman’s Bastion','Fisherman’s Bastion, Budapest, Hungary'), note:'Fica no mesmo setor do fim do passeio; aproveitar sem novo deslocamento. Sem fila interna e sem compromisso adicional.', infoUrl:'https://fishermansbastion.com/'}),
      ev('16:40','Voltar ao hotel',{ end:'17:20', icon:'🚕', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), note:'Retorno com folga. Se houver trânsito, ainda existe bastante margem até o concerto.'}),
      ev('17:20','Descanso no hotel',{ end:'18:00', icon:'🛏️', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), note:'Banho, carregar celular e separar a reserva do concerto.'}),
      ev('18:00','Jantar cedo perto da Basílica',{ end:'18:50', icon:'🍽️', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), note:'Jantar antes do concerto e já no destino final; não marcar reserva rígida de restaurante.'}),
      ev('18:50','Ir para a Basílica sem pressa',{ end:'19:20', icon:'🚶', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), note:'Mesmo estando perto, reservar esta janela para conta, caminhada e eventual fila de entrada.'}),
      ev('19:20','ESTAR na Basílica · concerto',{ end:'20:00', icon:'⏰', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-organ-concert', note:'Fornecedor orienta comparecer às 19h40. A meta de 19h20 dá 20 minutos extras para entrada e localização do assento.'}),
      ev('20:00','Concerto de órgão na Basílica',{ end:'21:10', icon:'🎼', location:loc('St Stephen’s Basilica','Szent István tér 1, 1051 Budapest, Hungary'), ticketId:'basilica-organ-concert', status:'confirmed', bookingUrl:'https://gyg.me/RqH55aso', note:'Compromisso confirmado; não programar nada com horário fixo imediatamente depois.'}),
      ev('21:20','Voltar ao Up Hotel',{ end:'21:40', icon:'🚕', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), note:'Encerrar cedo por causa do FlixBus.'}),
      ev('21:40','Hotel · banho + malas prontas',{ icon:'🧳', location:loc('Up Hotel Budapest','Up Hotel Budapest, Csengery utca 31, Budapest, Hungary'), perrengue:'Alarme cedo: saída 05h45 para Népliget. Passaportes, bilhetes e malas devem ficar prontos hoje.'})
    ]
  },
];