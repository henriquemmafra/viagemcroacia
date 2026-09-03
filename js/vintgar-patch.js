import { walletItems, pendingItems } from './trip-data.js';
import { tripDays2 } from './trip-days-2.js';

const QR_HENRIQUE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAGfAQAAAACPG6GUAAAFxUlEQVR42u1bW4wTVRj+zszYVljpCEYLrrtDJMTHjRBFwZ3hojEEE+ODxgcCig88qDH4IDGwHHZXYwwa9AWv0Cghhgdi4iUkKk6BcIkKjTwQiSQtLLGAlynbwGyZmd+HznTb7nRqaEVXz8luZub0y/+d+c45//n/01NGaFEyEloWAfmLkHJryGGjsUZprDCSray4uNQKMgLiLSBpYGtDFasfL64CyE7keCkBcHkkUdYna05EEtDI1EBU9l88guhI5aJFELHKJW43JRpruIYQFaod1RSSbmjTxLa41W5nXpO2lIIbnqwTmMbLxcdPAQCSVFvMMHWTVstpb7eeAYmOzKNJRjS5m1vvX9huALghctr/B5YJmf9uMo7qHy58d2Lb+CMbfDgPMqNNkHkNbUlN9O4S2PcpDYgFdRoAyJs5AKwBHEAB7YXal3UUB6kCYKcArM5wqiViiVJfDp5U6+amVxCmT0QLEH/u0j039sd3XfnBhHT28PvvPFTcnnrjcp8BOIAEHEHMWQy6j065kgaWfWXp2nLibbZoI8ygxXZ51bKpt9m/xvhdO52+E0M/XsCeXdtWJtOPsNMVIiQga7n5Hq5y+TUA7kkVj+FZsBz2B0QlfL55O6agDHkQObjnl2EPXwee9t24BCiud4ZvsLNkeJfBgWEH0/n68qztq+VAuuXo2Z07x6YmD8mvA4gPmakY9pJ3BJU3ApnDTElwQ0pIyhLAlJgM9WamSio3ZwMymQ09zXjDfbx1T1eI2h0vCiBV56MGIGFAhVG7aDmAgoU0iaaagPy/IC7zi+oyZFQAmaBGSNcBiB/DQSZmwGVBcOcI6ToCyTDGALiMTMjkj2dV6NIWRJmwFjIkhS5/G4RMuEzo0tmxq1OQmesWCPDdg5CuE+r6ozUJUEb9TSEUmZCubUhY4l6c4UzixP3fGO8GUa7iP6KoABnVFfFuh2IGVyHdmgGGJIHp5hgDECchXdsQmaBbAGOqy4LtC5mgi2yiPQj8lIzI8iWuPJqBute0dyggdSkwQSeqxGFkJoNH3ZJJqNsBdYPiAHr1DkkS6nYiZgj2yACgyFgQPQjpOuR3iXyngMAz+HVCuvYh/h4ZQJRXQGZRQSXoFdJ1FpJ0wFivA2R6RUTWqWwiSCmqmTDT8wwkpOsApBqRMdY7xqBb/igW0nVgVRt3CkFKQZX9HbGqte0Z5PGdMvL/xy9CuskF0UaCri0AcJ8JgfAKxK0crpPUEIjlH+V7iecAeF1hbakct3KG0V37SS3EMJX39o+qY5I7Z85gsX8kBGInPePbV23ga6zaZJ0Ja4vG18/9wM5JGDO3LIgPWKG6HMpJRx0P0N466DwdZsWZfVDTbABLHD58U3+YlST2/ZxLIIF9I5t4V7Uttcunh3v/0OYp5C3Rnlg09PzJECsJnePY4Rw2DKT5orVVdWtTS3uA5fkLcQd2vAe57jXB19q1EJLzGbuXZOfOHYrV/2Lo6UUAl6Y1VEzc1E60HlJ2a0hnrEwTE1ZABCQKUjorpUsjGM40h8SUAcSAL6fxSKKyR0v9g4thEKUAxAqoO6vdACEMoyxDWhdFtAExFd6bza3gUaC8s/o9ZxhEAjC3m0dKpwEvS+wbak7EMJifnzaX1/4CgImfeVw/CG1cVyoNYmvtMdKG7JOZXwC3c/WXVAQRISHB7opoy8YSLjMzXYqA5KZwiYwVXRGZMGyAmaVSV3MrF04hQZSNsmJMNW0Y86KsKAzweCLqjbTsae2ct6kkxu4/sS2SNc7z+DLAW2jIH6EnDKI/efWrrlmAtWBl7GIVUkdkOsiBiG6FBXAeEvrR8Sujn+1wP3R3jP109Nix8J1ZCznukDMC61AzK8fPpvTRmaMzi1t6t6wIrMi1DrSQvft+radb6553x6OzF79b8Zr5eqI0VqcLbsHBp1lvgIe9ERm4BVlkGaYAPFQ6b2jswatPHXjggPyx+4kYu9cF8icw8N2H3etFUgAAAABJRU5ErkJggg==';
const QR_CIBELE = 'data:image/png;base64,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';

const oldWalletIndex = walletItems.findIndex((item) => item.id === 'vintgar-pass');
const vintgarTickets = [
  {
    id:'vintgar-henrique', groupId:'vintgar-12sep', groupTitle:'Vintgar Gorge · Guided Tour', groupSubtitle:'Henrique + Cibele · 09:00', holder:'Henrique',
    category:'Atrações', title:'Vintgar Gorge - Henrique', subtitle:'Guided Tour · entrada 09:00', date:'12 set · 09:00', status:'confirmed', codeAsset:QR_HENRIQUE,
    note:'Meeting point 08:50: em frente ao grande mapa de Vintgar, do lado oposto ao Visitor Center. Caminhada guiada 2,5–3 h.'
  },
  {
    id:'vintgar-cibele', groupId:'vintgar-12sep', groupTitle:'Vintgar Gorge · Guided Tour', groupSubtitle:'Henrique + Cibele · 09:00', holder:'Cibele',
    category:'Atrações', title:'Vintgar Gorge - Cibele', subtitle:'Guided Tour · entrada 09:00', date:'12 set · 09:00', status:'confirmed', codeAsset:QR_CIBELE,
    note:'Meeting point 08:50: em frente ao grande mapa de Vintgar, do lado oposto ao Visitor Center. Caminhada guiada 2,5–3 h.'
  }
];
if (oldWalletIndex >= 0) walletItems.splice(oldWalletIndex, 1, ...vintgarTickets);
else if (!walletItems.some((item) => item.groupId === 'vintgar-12sep')) walletItems.push(...vintgarTickets);

const pendingIndex = pendingItems.findIndex((item) => item.startsWith('Vintgar:'));
if (pendingIndex >= 0) pendingItems.splice(pendingIndex, 1);

const day = tripDays2.find((item) => item.date === '2026-09-12');
if (day) {
  day.summary = 'Vintgar Guided Tour confirmado às 09:00; depois Lago Bled, ilha e castelo.';
  day.alerts = [
    'Vintgar Guided Tour confirmado: meeting point 08:50, tour 09:00.',
    'Levar tênis confortável, água e roupa adequada ao clima.',
    'O ônibus Ljubljana → Bled ainda precisa ser comprado/confirmado; com tour às 09:00, prefira uma saída bem mais cedo que 07:00.'
  ];

  const walk = day.events.find((event) => event.title.includes('Caminhar até Ljubljana Bus Station'));
  if (walk) Object.assign(walk, { time:'05:25', end:'05:40' });

  const bus = day.events.find((event) => event.title.includes('Ônibus Ljubljana → Bled Union'));
  if (bus) Object.assign(bus, {
    time:'05:55', end:'07:14', status:'planned',
    perrengue:'Horário-alvo para dar margem ao tour das 09:00; confirmar/comprar especificamente para 12/set antes da viagem.'
  });

  const shuttle = day.events.find((event) => event.title.includes('VINTGAR Shuttle saindo de Bled'));
  if (shuttle) Object.assign(shuttle, {
    time:'07:30', end:'08:15', status:'planned',
    note:'Shuttle oficial: Bled Main Bus Station → VINTGAR LIP e conexão para o Visitor Centre. Saídas frequentes.'
  });

  const tourIndex = day.events.findIndex((event) => event.title === 'Vintgar Gorge');
  if (tourIndex >= 0) {
    const existingMeeting = day.events.find((event) => event.title.includes('Meeting point Vintgar'));
    if (!existingMeeting) day.events.splice(tourIndex, 0, {
      time:'08:50', end:'09:00', title:'Meeting point Vintgar Guided Tour', icon:'📍', status:'confirmed',
      location:{ name:'Vintgar Visitor Centre', destination:'Vintgar Gorge Visitor Centre, Podhom, Slovenia' },
      note:'Em frente ao grande mapa de Vintgar, do lado oposto ao Visitor Center. Chegar 10 minutos antes.', ticketId:'vintgar-henrique'
    });
    const tour = day.events.find((event) => event.title === 'Vintgar Gorge');
    Object.assign(tour, {
      time:'09:00', end:'12:00', status:'confirmed', ticketId:'vintgar-henrique',
      note:'Guided Tour confirmado. Duração informada: 2,5–3 horas.',
      perrengue:'Chegar ao meeting point às 08:50; tênis confortável, água e roupa adequada ao clima.'
    });
  }
}
