import { walletItems } from './trip-data.js';
import { tripDays2 } from './trip-days-2.js';

const QR_HENRIQUE = 'data:image/png;base64,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';
const QR_CIBELE = 'data:image/png;base64,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';

const tickets = [
  {
    id:'omio-lju-bled', groupId:'omio-lju-bled-pair', groupTitle:'Ljubljana → Bled · Omio/Nomago', groupSubtitle:'Nomago InterCity · Mamut Sport · 2 passageiros', holder:'Henrique',
    category:'Ônibus', title:'Ljubljana → Bled - Henrique', subtitle:'Nomago InterCity · Mamut Sport', date:'12 set · 07:15', status:'confirmed', locator:'37706-1-2-2026', codeAsset:QR_HENRIQUE,
    note:'Bilhete 1867007911 · saída 07:15 de Ljubljana Bus Station · plataforma 30 · chegada 08:00 em Bled Central. Estar na plataforma pelo menos 15 min antes. Total da reserva €37,80. O transporte pode ser shuttle/van sem identificação Nomago.'
  },
  {
    id:'omio-lju-bled-cibele', groupId:'omio-lju-bled-pair', groupTitle:'Ljubljana → Bled · Omio/Nomago', groupSubtitle:'Nomago InterCity · Mamut Sport · 2 passageiros', holder:'Cibele',
    category:'Ônibus', title:'Ljubljana → Bled - Cibele', subtitle:'Nomago InterCity · Mamut Sport', date:'12 set · 07:15', status:'confirmed', locator:'37706-1-2-2026', codeAsset:QR_CIBELE,
    note:'Bilhete 1887167963 · saída 07:15 de Ljubljana Bus Station · plataforma 30 · chegada 08:00 em Bled Central. Estar na plataforma pelo menos 15 min antes. Total da reserva €37,80. O transporte pode ser shuttle/van sem identificação Nomago.'
  }
];

for (let index = walletItems.length - 1; index >= 0; index -= 1) {
  const item = walletItems[index];
  if (item.id === 'omio-lju-bled' || item.id === 'omio-lju-bled-cibele' || item.groupId === 'omio-lju-bled-pair') walletItems.splice(index, 1);
}
const vintgarIndex = walletItems.findIndex((item) => item.groupId === 'vintgar-12sep' || item.id?.startsWith('vintgar-'));
if (vintgarIndex >= 0) walletItems.splice(vintgarIndex, 0, ...tickets);
else walletItems.push(...tickets);

const day = tripDays2.find((item) => item.date === '2026-09-12');
if (day) {
  day.summary = 'Ônibus confirmado 07:15 Ljubljana → Bled; conexão protegida por táxi/transfer até o Vintgar Guided Tour das 09:00; depois Castelo, lago, ilha e Ojstrica.';
  day.bring = Array.from(new Set([...(day.bring || []), 'Ticket Omio/Nomago']));
  day.alerts = [
    'Ônibus confirmado: Ljubljana Bus Station 07:15 → Bled Central 08:00 · plataforma 30.',
    'Chegar à plataforma até 07:00; a operadora pede no mínimo 15 minutos de antecedência.',
    'O veículo pode ser shuttle/van sem identificação Nomago. Mostrar o QR do passageiro no celular ao motorista.',
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
