import { walletItems } from './trip-data.js';
import { tripDays2 } from './trip-days-2.js';

const ticket = {
  id:'omio-lju-bled',
  category:'Ônibus',
  title:'Ljubljana → Bled · Omio/Nomago',
  subtitle:'Nomago InterCity · Mamut Sport · 2 passageiros',
  date:'12 set · 07:15',
  status:'confirmed',
  locator:'37706-1-2-2026',
  note:'Saída 07:15 de Ljubljana Bus Station · plataforma 30 · chegada 08:00 em Bled Central. Estar na plataforma pelo menos 15 min antes. Bilhetes: Henrique 1867007911 · Cibele 1887167963. Total €37,80. O transporte pode ser shuttle/van sem identificação Nomago; mostrar o ticket no celular ao motorista.'
};

const existingTicketIndex = walletItems.findIndex((item) => item.id === ticket.id);
if (existingTicketIndex >= 0) walletItems.splice(existingTicketIndex, 1, ticket);
else {
  const vintgarIndex = walletItems.findIndex((item) => item.groupId === 'vintgar-12sep' || item.id?.startsWith('vintgar-'));
  if (vintgarIndex >= 0) walletItems.splice(vintgarIndex, 0, ticket);
  else walletItems.push(ticket);
}

const day = tripDays2.find((item) => item.date === '2026-09-12');
if (day) {
  day.summary = 'Ônibus confirmado 07:15 Ljubljana → Bled; conexão protegida por táxi/transfer até o Vintgar Guided Tour das 09:00; depois Castelo, lago, ilha e Ojstrica.';
  day.bring = Array.from(new Set([...(day.bring || []), 'Ticket Omio/Nomago']));
  day.alerts = [
    'Ônibus confirmado: Ljubljana Bus Station 07:15 → Bled Central 08:00 · plataforma 30.',
    'Chegar à plataforma até 07:00; a operadora pede no mínimo 15 minutos de antecedência.',
    'O veículo pode ser shuttle/van sem identificação Nomago. Mostrar o ticket no celular ao motorista.',
    'Vintgar Guided Tour confirmado: meeting point 08:50, tour 09:00.',
    'Ao chegar em Bled às 08:00, seguir direto de táxi/transfer para o Vintgar Visitor Centre; não esperar o shuttle de 07:30.'
  ];

  const walk = day.events.find((event) => event.title.includes('Caminhar até Ljubljana Bus Station'));
  if (walk) Object.assign(walk, {
    time:'06:30', end:'06:45',
    note:'Sair com bagagem leve para chegar à rodoviária com folga antes do embarque.'
  });

  const coffee = day.events.find((event) => event.title.includes('Café rápido em Bled'));
  if (coffee) Object.assign(coffee, {
    time:'06:45', end:'07:00', title:'Café/lanche rápido + plataforma 30', icon:'☕',
    location:{ name:'Ljubljana Bus Station', destination:'Ljubljana Bus Station, Trg Osvobodilne fronte 4, Ljubljana, Slovenia' },
    note:'Comprar algo rápido e estar na plataforma 30 até 07:00.'
  });

  const bus = day.events.find((event) => event.title.includes('Ônibus Ljubljana → Bled'));
  if (bus) Object.assign(bus, {
    time:'07:15', end:'08:00', title:'Ônibus Ljubljana → Bled · Nomago/Mamut', icon:'🚌',
    location:{ name:'Bled Central Bus Station', destination:'Bled Central Bus Station, Bled, Slovenia' },
    status:'confirmed', ticketId:'omio-lju-bled',
    note:'Reserva Omio 37706-1-2-2026 · plataforma 30 em Ljubljana · chegada 08:00 em Bled Central.',
    perrengue:'Estar na plataforma pelo menos 15 min antes. O veículo pode ser shuttle/van sem identificação Nomago.'
  });

  const shuttle = day.events.find((event) => event.title.includes('VINTGAR Shuttle saindo de Bled'));
  if (shuttle) Object.assign(shuttle, {
    time:'08:05', end:'08:25', title:'Táxi/transfer → Vintgar Visitor Centre', icon:'🚕',
    location:{ name:'Vintgar Visitor Centre', destination:'Vintgar Gorge Visitor Centre, Podhom, Slovenia' },
    status:'planned',
    note:'Saída direta de Bled Central após o ônibus. Meta: chegar por volta de 08:25 e preservar margem para o meeting point das 08:50.',
    perrengue:'Não esperar o shuttle de 07:30: ele sai antes da chegada do ônibus confirmado.'
  });
}
