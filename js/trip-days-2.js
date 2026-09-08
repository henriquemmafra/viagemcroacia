const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays2 = [
  {
    date:'2026-09-11', city:'Budapest → Ljubljana', title:'FlixBus · Ljubljana inteira a pé',
    summary:'Chegada à Eslovênia e tarde cheia em um percurso contínuo: Open Kitchen, Dragões, Castelo, Plečnik, centro histórico e rio.',
    theme:'ljubljana', heroIcon:'🐉', heroLabel:'LJUBLJANA · SLOVENIA',
    wear:['Roupa confortável de viagem','Tênis','Moletom leve'],
    bring:['Passaporte à mão','Ticket FlixBus','Powerbank'],
    alerts:[
      'Toda a Eslovênia segue sem aluguel de carro.',
      'Controles de fronteira podem atrasar o FlixBus; se a chegada atrasar, preserve Castelo + eixo do rio.',
      'Open Kitchen acontece nesta sexta no Central Market; aproveitar como almoço tardio sem sair da rota.'
    ],
    events:[
      ev('05:45','Sair do Up Hotel para Népliget',{ end:'06:15', icon:'🚕', location:loc('Budapest Népliget Bus Station','Budapest Népliget Bus Station, Üllői út 131, Budapest, Hungary'), ticketId:'flixbus-bud-lju'}),
      ev('06:15','Embarque FlixBus Rota 403',{ end:'06:45', icon:'🎫', location:loc('Budapest Népliget Bus Station','Budapest Népliget Bus Station, Üllői út 131, Budapest, Hungary'), ticketId:'flixbus-bud-lju', status:'confirmed', perrengue:'Passaporte à mão e chegar ao terminal com 30 minutos de folga.'}),
      ev('06:45','FlixBus Budapest → Ljubljana',{ end:'12:50', icon:'🚌', ticketId:'flixbus-bud-lju', status:'confirmed'}),
      ev('12:50','Chegada Ljubljana Bus Station',{ end:'13:20', icon:'📍', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('13:20','Deixar malas · Under The Castle Apartments',{ end:'13:40', icon:'🏨', location:loc('Under The Castle Apartments','Under The Castle Apartments, Ljubljana, Slovenia'), ticketId:'hotel-under-castle', note:'Check-in rápido / deixar bagagem e sair leve para o centro.'}),
      ev('13:45','Open Kitchen + Central Market',{ end:'14:40', icon:'🍴', location:loc('Open Kitchen · Pogačarjev trg','Pogačarjev trg, Ljubljana, Slovenia'), note:'Feira gastronômica de sexta-feira com cozinhas locais e internacionais no coração do mercado.', tip:'Almoçar aqui resolve a refeição sem quebrar o sentido geográfico do passeio.', infoUrl:'https://www.odprtakuhna.si/en/events/511/open-kitchen'}),
      ev('14:40','Dragon Bridge',{ end:'14:55', icon:'🐉', location:loc('Dragon Bridge','Zmajski most, Ljubljana, Slovenia'), note:'A ponte dos quatro dragões é um dos símbolos de Ljubljana e uma referência marcante da arquitetura do início do século XX.', infoUrl:'https://www.visitljubljana.com/en/poi/dragon-bridge/'}),
      ev('15:00','Funicular + Ljubljana Castle',{ end:'17:00', icon:'🏰', location:loc('Ljubljana Castle Funicular','Krekov trg 4, Ljubljana, Slovenia'), status:'to-book', note:'Fortaleza no alto da colina com exposições, pátios e vistas abertas sobre o centro e os Alpes ao fundo.', tip:'Subir de funicular e descer a pé apenas se ainda estiverem dispostos; o restante da rota é todo em descida/terreno plano.', infoUrl:'https://www.ljubljanskigrad.si/en/', buyUrl:'https://www.ljubljanskigrad.si/en/tickets/'}),
      ev('17:10','St Nicholas Cathedral',{ end:'17:25', icon:'⛪', location:loc('Ljubljana Cathedral','Dolničarjeva ulica 1, Ljubljana, Slovenia'), note:'Catedral barroca de Ljubljana, conhecida pela cúpula verde e pelas portas de bronze.', infoUrl:'https://www.visitljubljana.com/en/poi/the-cathedral-church-of-st-nicholas'}),
      ev('17:25','Town Hall + Robba Fountain + Mestni trg',{ end:'17:45', icon:'🏛️', location:loc('Ljubljana Town Hall','Mestni trg 1, Ljubljana, Slovenia'), note:'Praça cívica do centro antigo, com a prefeitura e a fonte barroca de Robba.'}),
      ev('17:45','Cobblers’ Bridge',{ end:'18:00', icon:'🌉', location:loc('Cobblers’ Bridge','Čevljarski most, Ljubljana, Slovenia'), note:'Uma das pontes mais características de Plečnik, marcada por colunas e balaustradas que transformam a travessia em uma pequena praça.', infoUrl:'https://www.visitljubljana.com/en/poi/cobblers-bridge'}),
      ev('18:00','National & University Library · Plečnik',{ end:'18:15', icon:'📚', location:loc('National and University Library','Turjaška ulica 1, Ljubljana, Slovenia'), note:'A biblioteca nacional é uma das obras-primas de Jože Plečnik; a fachada mistura tijolo e pedra de forma deliberadamente irregular.', infoUrl:'https://www.visitljubljana.com/en/poi/national-and-university-library'}),
      ev('18:15','Križanke',{ end:'18:30', icon:'🎭', location:loc('Križanke','Trg francoske revolucije 1, Ljubljana, Slovenia'), note:'Antigo mosteiro convertido por Plečnik em complexo cultural e espaço de espetáculos.'}),
      ev('18:30','Congress Square',{ end:'18:45', icon:'🌳', location:loc('Congress Square','Kongresni trg, Ljubljana, Slovenia'), note:'Grande praça verde cercada por edifícios históricos, universidade e a Igreja Ursulina.'}),
      ev('18:45','Triple Bridge + Prešeren Square',{ end:'19:10', icon:'🌉', location:loc('Triple Bridge','Tromostovje, Ljubljana, Slovenia'), note:'O conjunto de três pontes de Plečnik conecta a praça principal ao centro antigo e é o núcleo visual da cidade.', infoUrl:'https://www.visitljubljana.com/en/visitors/sights-and-activities/plecniks-ljubljana'}),
      ev('19:10','Ljubljanica · barco ou caminhada pelas margens',{ end:'20:00', icon:'🚤', location:loc('Ljubljanica River','Ljubljanica River, Ljubljana, Slovenia'), note:'Final relaxado no eixo do rio, passando sob as pontes e pelas fachadas do centro histórico.', tip:'Se houver barco saindo logo, fazer o passeio; se não, seguir a pé pelas margens sem perder tempo esperando.', infoUrl:'https://www.visitljubljana.com/en/visitors/sights-and-activities/the-river-ljubljanica-and-its-bridges'}),
      ev('20:00','Jantar à beira do Ljubljanica',{ end:'21:30', icon:'🍽️', location:loc('Ljubljana Riverside','Petkovškovo nabrežje, Ljubljana, Slovenia'), note:'Escolher restaurante na própria margem para encerrar sem deslocamento extra.'}),
      ev('21:30','Old Town iluminada → hotel',{ icon:'🌙', location:loc('Under The Castle Apartments','Under The Castle Apartments, Ljubljana, Slovenia'), note:'Volta curta pelo centro iluminado antes de dormir.'})
    ]
  },
  {
    date:'2026-09-12', city:'Bled + Vintgar', title:'Vintgar → Castelo → lago → ilha → Ojstrica',
    summary:'Dia inteiro em fluxo contínuo: Vintgar cedo, Castelo de Bled e depois avanço pela margem até ilha, Velika Zaka e Ojstrica.',
    theme:'bled', heroIcon:'🏔️', heroLabel:'BLED · JULIAN ALPS',
    wear:['Tênis com boa aderência','Roupa em camadas','Roupa de banho se o tempo ajudar'],
    bring:['Vintgar Pass','Água','Toalha pequena','Powerbank'],
    alerts:[
      'Vintgar Guided Tour confirmado: meeting point 08:50, tour 09:00.',
      'Vintgar pode estar molhado e escorregadio.',
      'Ônibus Ljubljana → Bled ainda deve ser confirmado/comprado; alvo é a saída 05:55 para proteger o tour.'
    ],
    events:[
      ev('05:25','Caminhar até Ljubljana Bus Station',{ end:'05:40', icon:'🚶', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('05:55','Ônibus Ljubljana → Bled Union',{ end:'07:14', icon:'🚌', location:loc('Bled Union Bus Stop','Bled Union, Bled, Slovenia'), status:'planned', perrengue:'Confirmar/comprar especificamente para 12/set; este horário protege o meeting point das 08:50.'}),
      ev('07:20','Café rápido em Bled',{ end:'07:30', icon:'☕', location:loc('Bled Bus Station','Cesta svobode 4, Bled, Slovenia'), note:'Só café/lanche rápido antes do shuttle; não sentar para café demorado.'}),
      ev('07:30','VINTGAR Shuttle saindo de Bled',{ end:'08:15', icon:'🚌', location:loc('Bled Central Bus Station','Bled Bus Station, Slovenia'), status:'planned', note:'Shuttle oficial de Bled para Vintgar; seguir a sinalização/conexão do serviço oficial.', infoUrl:'https://www.bled.si/en/information/getting-around-bled/2024081213233767/vintgar-shuttle/'}),
      ev('09:00','Vintgar Gorge',{ end:'12:00', icon:'🥾', location:loc('Vintgar Gorge','Vintgar Gorge Visitor Centre, Podhom, Slovenia'), status:'confirmed', ticketId:'vintgar-henrique', note:'Guided Tour confirmado; passarelas acompanham o rio Radovna entre paredes rochosas, corredeiras e quedas d’água.', perrengue:'Meeting point 08:50; tênis confortável, água e roupa adequada ao clima.', infoUrl:'https://www.vintgar.si/'}),
      ev('12:00','Shuttle Vintgar → Bled',{ end:'12:25', icon:'🚌', location:loc('Bled Central Bus Station','Bled Bus Station, Slovenia'), status:'planned'}),
      ev('12:40','Bled Castle + mirantes',{ end:'13:40', icon:'🏰', location:loc('Bled Castle','Grajska cesta 61, Bled, Slovenia'), status:'to-book', note:'Castelo medieval erguido sobre a falésia acima do lago; o principal prêmio é a vista panorâmica da ilha e dos Alpes.', tip:'Priorizar os terraços e mirantes; não gastar a maior parte da hora em interiores.', infoUrl:'https://www.blejski-grad.si/en/', buyUrl:'https://blejski-grad.mojekarte.si/en/all.html'}),
      ev('13:50','Almoço + kremšnita em Bled',{ end:'14:30', icon:'🍰', location:loc('Lake Bled Promenade','Cesta svobode, Bled, Slovenia'), note:'Kremšnita é o clássico bolo de creme de Bled; almoço compacto para continuar o circuito do lago.'}),
      ev('14:30','Caminhada pela margem até Mlino',{ end:'15:00', icon:'🚶', location:loc('Mlino','Mlino, Bled, Slovenia'), note:'Seguir pela margem sul em direção ao embarque tradicional das pletnas.'}),
      ev('15:00','Pletna + Ilha de Bled',{ end:'16:30', icon:'🚣', location:loc('Bled Island','Bled Island, Slovenia'), note:'Travessia no barco tradicional pletna até a única ilha natural da Eslovênia, com igreja e escadaria histórica.', tip:'Na ida, olhar para trás para ver o castelo enquadrado sobre a água.', infoUrl:'https://www.bled.si/en/what-to-see-do/attractions/2/bled-island/'}),
      ev('16:30','Margem do lago → Velika Zaka',{ end:'17:00', icon:'🌊', location:loc('Velika Zaka','Velika Zaka, Bled, Slovenia'), note:'Continuar no mesmo sentido pela margem oeste, aproximando-se do início da trilha de Ojstrica.'}),
      ev('17:00','Ojstrica viewpoint',{ end:'17:50', icon:'🥾', location:loc('Ojstrica','Ojstrica, Bled, Slovenia'), note:'Mirante elevado com a composição clássica do lago, ilha, castelo e montanhas.', perrengue:'Subida curta, porém íngreme; cerca de 20 min até o mirante. Evitar se o piso estiver muito molhado.', infoUrl:'https://www.bled.si/en/what-to-see-do/attractions/4/ojstrica/'}),
      ev('17:50','Volta pela margem do Lago Bled',{ end:'19:00', icon:'🌅', location:loc('Lake Bled','Lake Bled, Slovenia'), note:'Completar o trecho da margem com luz de fim de tarde, sem voltar de um lado para o outro.'}),
      ev('19:00','Jantar em Bled',{ end:'19:45', icon:'🍽️', location:loc('Bled Centre','Bled, Slovenia'), note:'Jantar simples no centro antes do ônibus.'}),
      ev('20:00','Ônibus Bled → Ljubljana',{ end:'21:15', icon:'🚌', location:loc('Bled Bus Station','Bled Bus Station, Slovenia'), status:'planned', perrengue:'Horário final deve ser confirmado no bilhete/rodoviária; não perder a última opção conveniente.'})
    ]
  },
  {
    date:'2026-09-13', city:'Ljubljana → Postojna → Rovinj', title:'Vivarium · Predjama · Postojna · Rovinj',
    summary:'Conexão aproveitada ao máximo: manhã no complexo de Postojna, Predjama primeiro, caverna às 13h e transfer protegido até Koper.',
    theme:'postojna', heroIcon:'🕳️', heroLabel:'POSTOJNA · KARST',
    wear:['Agasalho para a caverna','Tênis','Roupa confortável de viagem'],
    bring:['Ingressos Postojna/Predjama','Bagagem pronta','Água','Powerbank'],
    alerts:[
      'Postojna é fria: casaco deve ficar acessível, não no fundo da mala.',
      'Shuttle planejado: 10:40 Postojna → Predjama e 12:05 Predjama → Postojna.',
      'Chegar à área de embarque da Cave antes das 12:45; tour das 13:00.',
      'Postojna → Koper continua sendo transfer/táxi para proteger o FlixBus das 16:30.'
    ],
    events:[
      ev('07:20','Checkout + Ljubljana Bus Station',{ end:'07:50', icon:'🧳', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('08:00','Ônibus Ljubljana → Postojna Cave',{ end:'09:00', icon:'🚌', location:loc('Postojna Cave','Jamska cesta 30, Postojna, Slovenia'), status:'planned', perrengue:'Guardar bagagem nos lockers do complexo assim que chegar.'}),
      ev('09:05','Vivarium / EXPO Cave Karst + café',{ end:'10:20', icon:'🐉', location:loc('Postojna Cave Park','Jamska cesta 30, Postojna, Slovenia'), status:'to-book', note:'Usar a antiga espera da manhã para conhecer o mundo subterrâneo, o proteus e a exposição sobre o carste.', tip:'Se o tempo apertar, priorizar Vivarium/EXPO mais próximo e deixar o café para algo rápido.', infoUrl:'https://www.postojnska-jama.eu/en/', buyUrl:'https://www.postojnska-jama.eu/en/information/tickets/'}),
      ev('10:40','Shuttle Postojna → Predjama',{ end:'11:00', icon:'🚌', location:loc('Predjama Castle','Predjama 1, Postojna, Slovenia'), status:'planned', perrengue:'Levar dinheiro se o shuttle exigir pagamento em espécie e estar no ponto alguns minutos antes.', infoUrl:'https://www.postojnska-jama.eu/en/information/shuttle-bus/'}),
      ev('11:00','Predjama Castle',{ end:'12:00', icon:'🏰', location:loc('Predjama Castle','Predjama 1, Postojna, Slovenia'), status:'to-book', note:'Castelo construído na boca de uma caverna, encaixado diretamente no paredão de rocha; é uma das imagens mais marcantes da Eslovênia.', tip:'Fazer a foto ampla da fachada antes de entrar, porque o shuttle de volta é fixo.', infoUrl:'https://www.postojnska-jama.eu/en/', buyUrl:'https://www.postojnska-jama.eu/en/information/tickets/'}),
      ev('12:05','Shuttle Predjama → Postojna',{ end:'12:25', icon:'🚌', location:loc('Postojna Cave','Jamska cesta 30, Postojna, Slovenia'), status:'planned'}),
      ev('12:25','Lanche + chegar ao embarque da caverna',{ end:'12:50', icon:'🥪', location:loc('Postojna Cave','Jamska cesta 30, Postojna, Slovenia'), perrengue:'Não sentar para almoço longo. A prioridade é estar pronto para o tour das 13h.'}),
      ev('13:00','Postojna Cave',{ end:'14:30', icon:'🚂', location:loc('Postojna Cave','Jamska cesta 30, Postojna, Slovenia'), status:'to-book', note:'Sistema de cavernas visitado parcialmente de trem e parcialmente a pé, com grandes salões e formações calcárias.', perrengue:'Casaco acessível; o ambiente subterrâneo é frio mesmo no verão.', infoUrl:'https://www.postojnska-jama.eu/en/', buyUrl:'https://www.postojnska-jama.eu/en/information/tickets/'}),
      ev('14:35','Transfer/táxi Postojna → Koper',{ end:'15:30', icon:'🚕', location:loc('Koper Bus Station','Kolodvorska cesta 11, Koper, Slovenia'), status:'to-finalize', perrengue:'Trecho crítico da conexão: não substituir por opção lenta sem recalcular a margem para o ônibus das 16:30.'}),
      ev('15:30','Koper · margem de segurança / mini-passeio',{ end:'16:10', icon:'🌊', location:loc('Koper Bus Station','Kolodvorska cesta 11, Koper, Slovenia'), note:'Primeiro garantir o terminal e a plataforma. Só caminhar nas proximidades se malas e horário estiverem sob controle.'}),
      ev('16:30','FlixBus Koper → Rovinj',{ end:'18:05', icon:'🚌', location:loc('Rovinj Bus Station','Trg na lokvi 6, Rovinj, Croatia'), status:'planned', perrengue:'Estar no terminal com antecedência.'}),
      ev('18:20','Check-in Charmy Rovinj',{ end:'19:00', icon:'🏨', location:loc('Charmy Rovinj','Charmy Rovinj, Rovinj, Croatia'), ticketId:'hotel-charmy'}),
      ev('19:15','Santa Eufêmia + pôr do sol',{ end:'20:10', icon:'🌅', location:loc('Church of St. Euphemia','Church of St. Euphemia, Rovinj, Croatia'), tip:'Subir pelo miolo da Old Town e deixar a orla para a descida; o pôr do sol fica melhor do alto.'}),
      ev('20:20','Jantar em Rovinj',{ icon:'🍽️', location:loc('Rovinj Old Town','Rovinj Old Town, Croatia'), tip:'Depois do dia longo de conexão, escolher restaurante dentro da Old Town.'})
    ]
  },
  {
    date:'2026-09-14', city:'Rovinj → Pula + Kamenjak', title:'Pula romana → Kamenjak · sem carro',
    summary:'Ônibus até Pula, centro romano a pé e tarde no Cabo Kamenjak usando táxi/transfer; volta a Rovinj sem aluguel de carro.',
    theme:'pula', heroIcon:'🏛️', heroLabel:'PULA · KAMENJAK',
    wear:['Tênis','Roupa de banho por baixo','Óculos de sol'],
    bring:['Toalha','Aqua-shoes','Protetor 50+','Água','Powerbank'],
    alerts:[
      'Aluguel de carro cancelado: este dia é ônibus + táxi/transfer.',
      'Rovinj ↔ Pula tem várias saídas diárias; confirmar os horários escolhidos no dia anterior.',
      'Fechar o táxi/transfer Pula ↔ Kamenjak antes de sair para evitar perder tempo em Premantura.'
    ],
    events:[
      ev('07:30','Caminhar até Rovinj Bus Station',{ end:'07:50', icon:'🚶', location:loc('Rovinj Bus Station','Trg na lokvi 6, Rovinj, Croatia')}),
      ev('08:00','Ônibus Rovinj → Pula',{ end:'08:45', icon:'🚌', location:loc('Pula Bus Station','Trg I istarske brigade 1, Pula, Croatia'), status:'planned', perrengue:'Confirmar a saída exata na Arriva/rodoviária na véspera.'}),
      ev('09:00','Arena de Pula + centro romano',{ end:'10:45', icon:'🏛️', location:loc('Pula Arena','Flavijevska ul., Pula, Croatia'), note:'Arena primeiro, depois Arco dos Sérgios, Fórum e Templo de Augusto em sequência a pé.', tip:'Fazer a foto externa da Arena antes de entrar e depois seguir sempre em direção ao Fórum.'}),
      ev('10:45','Mercado de Pula + café',{ end:'11:20', icon:'☕', location:loc('Pula Market','Narodni trg 9, Pula, Croatia'), note:'Parada curta no caminho, sem voltar para a rodoviária.'}),
      ev('11:30','Almoço leve em Pula',{ end:'12:20', icon:'🍽️', location:loc('Pula Old Town','Pula, Croatia'), tip:'Comer leve antes da tarde de praia.'}),
      ev('12:30','Táxi/transfer Pula → Cabo Kamenjak',{ end:'13:00', icon:'🚕', location:loc('Cape Kamenjak','Cape Kamenjak, Premantura, Croatia'), status:'to-finalize', perrengue:'Combinar também a hora/local da volta antes de descer do carro.'}),
      ev('13:00','Cabo Kamenjak · nadar + snorkel',{ end:'17:00', icon:'🤿', location:loc('Cape Kamenjak','Cape Kamenjak, Premantura, Croatia'), note:'Tarde inteira de enseadas, rochas e água clara no extremo sul da Ístria.', perrengue:'Aqua-shoes recomendados por rochas/ouriços.'}),
      ev('17:00','Táxi/transfer Kamenjak → Pula',{ end:'17:35', icon:'🚕', location:loc('Pula Bus Station','Trg I istarske brigade 1, Pula, Croatia'), status:'to-finalize'}),
      ev('18:00','Ônibus Pula → Rovinj',{ end:'18:45', icon:'🚌', location:loc('Rovinj Bus Station','Trg na lokvi 6, Rovinj, Croatia'), status:'planned', perrengue:'Usar a melhor saída confirmada; 18:00 é a meta de planejamento, não um ticket emitido.'}),
      ev('19:00','Rovinj · orla + pôr do sol',{ end:'19:45', icon:'🌅', location:loc('Rovinj Waterfront','Rovinj, Croatia'), note:'Volta leve pela orla antes do jantar.'}),
      ev('20:00','Jantar Puntulina',{ icon:'🍽️', location:loc('Puntulina','Puntulina, Svetog Križa 38, Rovinj, Croatia'), tip:'Se houver escolha, pedir mesa voltada para o mar/rochas.', perrengue:'Reservar.'})
    ]
  },
];
