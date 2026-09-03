const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });

export const tripDays2 = [
  {
    date:'2026-09-11', city:'Budapest → Ljubljana', title:'FlixBus · Ljubljana a pé',
    summary:'Ônibus cedo para a Eslovênia e tarde tranquila no centro histórico, sem carro.',
    theme:'ljubljana', heroIcon:'🐉', heroLabel:'LJUBLJANA · SLOVENIA',
    wear:['Roupa confortável de viagem','Tênis','Moletom leve'],
    bring:['Passaporte à mão','Ticket FlixBus','Powerbank'],
    alerts:['Não há carro alugado na Eslovênia.','Controles de fronteira podem atrasar o FlixBus.'],
    events:[
      ev('05:45','Sair do Up Hotel para Népliget',{ end:'06:15', icon:'🚕', location:loc('Budapest Népliget Bus Station','Budapest Népliget Bus Station, Üllői út 131, Budapest, Hungary'), ticketId:'flixbus-bud-lju'}),
      ev('06:15','Embarque FlixBus Rota 403',{ end:'06:45', icon:'🎫', location:loc('Budapest Népliget Bus Station','Budapest Népliget Bus Station, Üllői út 131, Budapest, Hungary'), ticketId:'flixbus-bud-lju', status:'confirmed', perrengue:'Passaporte à mão e chegar ao terminal com 30 minutos de folga.'}),
      ev('06:45','FlixBus Budapest → Ljubljana',{ end:'12:50', icon:'🚌', ticketId:'flixbus-bud-lju', status:'confirmed'}),
      ev('12:50','Chegada Ljubljana Bus Station',{ end:'13:20', icon:'📍', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('13:30','Check-in Under The Castle Apartments',{ end:'14:30', icon:'🏨', location:loc('Under The Castle Apartments','Under The Castle Apartments, Ljubljana, Slovenia'), ticketId:'hotel-under-castle'}),
      ev('15:00','Mercado Central · Tromostovje · Rio Ljubljanica',{ end:'16:30', icon:'🚶', location:loc('Ljubljana Central Market','Ljubljana Central Market, Slovenia'), tip:'Faça o trecho do rio sem pressa; a área entre o mercado, as três pontes e a ponte dos dragões é a parte mais gostosa para caminhar.'}),
      ev('16:30','Funicular + Castelo de Ljubljana',{ end:'18:30', icon:'🏰', location:loc('Ljubljana Castle Funicular','Ljubljana Castle Funicular, Krekov trg, Ljubljana, Slovenia'), tip:'Suba de funicular e desça a pé se estiver com disposição; as melhores vistas abertas ficam nos terraços do castelo.'}),
      ev('19:30','Jantar em Ljubljana',{ icon:'🍽️', location:loc('Ljubljana Old Town','Ljubljana Old Town, Slovenia'), tip:'Escolha algo perto do rio para não criar deslocamento extra depois do dia de ônibus.'})
    ]
  },
  {
    date:'2026-09-12', city:'Bled + Vintgar', title:'Vintgar · Lago Bled · castelo',
    summary:'Bate-volta inteiramente de transporte público: ônibus, shuttle oficial e Lago Bled.',
    theme:'bled', heroIcon:'🏔️', heroLabel:'BLED · JULIAN ALPS',
    wear:['Tênis com boa aderência','Roupa em camadas','Roupa de banho se o tempo ajudar'],
    bring:['Vintgar Pass','Água','Toalha pequena','Powerbank'],
    alerts:['Vintgar pode estar molhado e escorregadio.','Não depender de carro: todo o dia foi redesenhado para ônibus + shuttle oficial.'],
    events:[
      ev('06:35','Caminhar até Ljubljana Bus Station',{ end:'06:50', icon:'🚶', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('07:00','Ônibus Ljubljana → Bled Union',{ end:'08:19', icon:'🚌', location:loc('Bled Union Bus Stop','Bled Union, Bled, Slovenia'), status:'planned', perrengue:'Horário planejado; confirmar no ticket antes da viagem.'}),
      ev('08:25','VINTGAR Shuttle saindo de Bled',{ end:'09:15', icon:'🚌', location:loc('Bled Central Bus Station','Bled Bus Station, Slovenia'), status:'planned', note:'Shuttle oficial incluso no Vintgar Pass.', tip:'Sente perto da saída do ônibus para descer rápido e ganhar alguns minutos antes da faixa mais cheia.'}),
      ev('09:30','Vintgar Gorge',{ end:'12:15', icon:'🥾', location:loc('Vintgar Gorge','Vintgar Gorge, Slovenia'), status:'planned', perrengue:'Passarelas molhadas; tênis é a escolha certa.', tip:'A melhor sensação é entrar cedo e caminhar sem parar muito no início; deixe as fotos longas para pontos mais abertos.'}),
      ev('12:30','Shuttle Vintgar → Bled',{ end:'13:00', icon:'🚌', location:loc('Bled Central Bus Station','Bled Bus Station, Slovenia')}),
      ev('13:10','Almoço + kremšnita em Bled',{ end:'14:00', icon:'🍰', location:loc('Lake Bled Promenade','Lake Bled, Slovenia'), tip:'A sobremesa clássica é a kremšnita; vale dividir uma antes do barco.'}),
      ev('14:00','Pletna + Ilha de Bled',{ end:'15:30', icon:'🚣', location:loc('Lake Bled','Lake Bled, Slovenia'), tip:'No barco, tente sentar na lateral para ter a vista aberta do castelo na aproximação da ilha.'}),
      ev('15:45','Castelo de Bled + mirantes',{ end:'17:15', icon:'🏰', location:loc('Bled Castle','Bled Castle, Slovenia'), tip:'A vista mais importante é a do lago com a ilha; reserve alguns minutos no terraço em vez de passar rápido pelos interiores.'}),
      ev('17:20','Passeio pelo lago / banho se estiver agradável',{ end:'18:10', icon:'🌊', location:loc('Lake Bled','Lake Bled, Slovenia')}),
      ev('18:30','Ônibus Bled → Ljubljana',{ end:'19:45', icon:'🚌', location:loc('Bled Bus Station','Bled Bus Station, Slovenia'), status:'planned', perrengue:'Horário de retorno é flexível; usar o bilhete confirmado como fonte final.'})
    ]
  },
  {
    date:'2026-09-13', city:'Ljubljana → Postojna → Rovinj', title:'Predjama · Postojna · Koper · Rovinj',
    summary:'Dia de conexão inteligente: atrações eslovenas, transfer a Koper e ônibus para a Croácia.',
    theme:'postojna', heroIcon:'🕳️', heroLabel:'POSTOJNA · KARST',
    wear:['Agasalho para a caverna','Tênis','Roupa confortável de viagem'],
    bring:['Ingressos Postojna/Predjama','Bagagem pronta','Água','Powerbank'],
    alerts:['Postojna é fria: levar casaco.','Não há carro alugado neste dia.','O trecho Postojna → Koper é transfer/táxi para proteger a conexão das 16:30.'],
    events:[
      ev('07:20','Checkout + Ljubljana Bus Station',{ end:'07:50', icon:'🧳', location:loc('Ljubljana Bus Station','Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia')}),
      ev('08:00','Ônibus Ljubljana → Postojna',{ end:'09:00', icon:'🚌', location:loc('Postojna Cave','Postojna Cave, Jamska cesta 30, Postojna, Slovenia'), status:'planned', perrengue:'Guardar bagagem nos lockers/EXPO assim que chegar.'}),
      ev('09:05','Guardar malas + café em Postojna',{ end:'10:25', icon:'🧳', location:loc('Postojna Cave Park','Postojna Cave Park, Jamska cesta 30, Postojna, Slovenia')}),
      ev('10:40','Shuttle Postojna → Predjama',{ end:'11:00', icon:'🚌', location:loc('Predjama Castle','Predjama Castle, Predjama 1, Postojna, Slovenia'), status:'planned'}),
      ev('11:00','Castelo de Predjama',{ end:'12:00', icon:'🏰', location:loc('Predjama Castle','Predjama Castle, Predjama 1, Postojna, Slovenia'), tip:'A fachada encaixada na rocha é a foto principal; faça a foto aberta antes de entrar no castelo.'}),
      ev('12:05','Shuttle Predjama → Postojna',{ end:'12:25', icon:'🚌', location:loc('Postojna Cave','Postojna Cave, Jamska cesta 30, Postojna, Slovenia'), status:'planned'}),
      ev('13:00','Postojna Cave',{ end:'14:30', icon:'🚂', location:loc('Postojna Cave','Postojna Cave, Jamska cesta 30, Postojna, Slovenia'), status:'planned', perrengue:'Chegar ao embarque com antecedência e manter o casaco acessível.', tip:'Não guarde o casaco no fundo da mala: o trecho de trem já entra em ambiente bem mais frio.'}),
      ev('14:40','Transfer/táxi Postojna → Koper',{ end:'15:35', icon:'🚕', location:loc('Koper Bus Station','Koper Bus Station, Kolodvorska cesta 11, Koper, Slovenia'), status:'to-finalize', perrengue:'Este trecho não está tratado como ônibus confirmado; a prioridade é chegar a Koper com margem.'}),
      ev('16:30','FlixBus Koper → Rovinj',{ end:'18:05', icon:'🚌', location:loc('Rovinj Bus Station','Rovinj Bus Station, Trg na lokvi 6, Rovinj, Croatia'), status:'planned', perrengue:'Chegar ao terminal de Koper pelo menos 30–40 min antes.'}),
      ev('18:20','Check-in Charmy Rovinj',{ end:'19:00', icon:'🏨', location:loc('Charmy Rovinj','Charmy Rovinj, Rovinj, Croatia'), ticketId:'hotel-charmy'}),
      ev('19:15','Santa Eufêmia + pôr do sol',{ end:'20:10', icon:'🌅', location:loc('Church of St. Euphemia','Church of St. Euphemia, Rovinj, Croatia'), tip:'Suba pelo miolo da Old Town e deixe a orla para a descida; o pôr do sol fica melhor do alto.'}),
      ev('20:20','Jantar em Rovinj',{ icon:'🍽️', location:loc('Rovinj Old Town','Rovinj Old Town, Croatia'), tip:'Depois de um dia longo de conexão, escolha restaurante dentro da Old Town e evite deslocamento extra.'})
    ]
  },
  {
    date:'2026-09-14', city:'Rovinj → Pula · Motovun · Grožnjan', title:'Ônibus para Pula · SIXT · Ístria',
    summary:'Ônibus cedo para Pula, retirada do carro confirmada e roadtrip pelas vilas da Ístria.',
    theme:'pula', heroIcon:'🏛️', heroLabel:'PULA · ISTRIA',
    wear:['Tênis','Roupa leve','Óculos de sol'],
    bring:['Reserva SIXT','CNH + PID','Cartão físico do locatário','Água'],
    alerts:['Carro começa somente hoje, em Pula.','Retirada SIXT confirmada às 09:30.','Depósito informado pela SIXT: €1.700.'],
    events:[
      ev('07:30','Caminhar até Rovinj Bus Station',{ end:'07:50', icon:'🚶', location:loc('Rovinj Bus Station','Rovinj Bus Station, Trg na lokvi 6, Rovinj, Croatia')}),
      ev('08:00','Ônibus Rovinj → Pula',{ end:'08:40', icon:'🚌', location:loc('Pula Bus Station','Pula Bus Station, Trg I istarske brigade 1, Pula, Croatia'), status:'planned', perrengue:'Ônibus ainda deve ser comprado; manter chegada com folga para a SIXT.'}),
      ev('09:30','Retirar carro SIXT — Pula Rodoviária',{ end:'10:00', icon:'🚗', location:loc('SIXT Pula Bus Station','Trg I istarske brigade 1, Pula, Croatia'), ticketId:'sixt-pula-split', status:'confirmed', perrengue:'Levar CNH/PID e o cartão físico usado na reserva. Fotografar o carro na retirada.'}),
      ev('10:10','Arena de Pula + centro romano',{ end:'11:45', icon:'🏛️', location:loc('Pula Arena','Pula Arena, Flavijevska ul., Pula, Croatia'), tip:'Entre cedo na Arena e faça a foto externa antes do fluxo maior. Depois, siga a pé pelo Arco dos Sérgios e Fórum.'}),
      ev('11:45','Café/almoço leve em Pula',{ end:'12:35', icon:'🍽️', location:loc('Pula Old Town','Pula Old Town, Croatia'), tip:'Coma leve: a tarde tem estrada e ladeiras em Motovun.'}),
      ev('12:40','Drive Pula → Motovun',{ end:'13:45', icon:'🚗', location:loc('Motovun','Motovun, Croatia')}),
      ev('13:45','Motovun',{ end:'15:15', icon:'🏰', location:loc('Motovun','Motovun, Croatia'), tip:'Procure massas ou pratos com trufas. Para fotos, as muralhas e os mirantes sobre o vale do Mirna são o ponto alto.'}),
      ev('15:20','Drive Motovun → Grožnjan',{ end:'16:00', icon:'🚗', location:loc('Grožnjan','Grožnjan, Croatia')}),
      ev('16:00','Grožnjan',{ end:'17:15', icon:'🎨', location:loc('Grožnjan','Grožnjan, Croatia'), tip:'Caminhe sem roteiro pelas ruelas e ateliês; as melhores fotos aparecem nas portas, escadas e vistas entre as casas.'}),
      ev('17:20','Drive Grožnjan → Rovinj',{ end:'18:30', icon:'🚗', location:loc('Rovinj','Rovinj, Croatia')}),
      ev('20:00','Jantar Puntulina',{ icon:'🍽️', location:loc('Puntulina','Puntulina, Svetog Križa 38, Rovinj, Croatia'), tip:'Se houver escolha, peça mesa voltada para o mar/rochas; é a graça do lugar.', perrengue:'Reservar.'})
    ]
  },
];
