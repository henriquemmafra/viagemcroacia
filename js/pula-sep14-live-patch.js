import { tripDays2 } from './trip-days-2.js';
import { walletItems } from './trip-data.js';

const loc = (name, destination) => ({ name, destination });
const ev = (time, title, options = {}) => ({ time, title, ...options });
const ARRIVA_PULA_ROVINJ = 'https://www.arriva.com.hr/hr-hr/bus-pula-rovinj';

export function applyPulaSep14LivePatch() {
  const day = tripDays2.find((item) => item.date === '2026-09-14');
  if (!day || day.datasetPatch === 'pula-sep14-live-v1') return day;

  day.datasetPatch = 'pula-sep14-live-v1';
  day.city = 'Pula';
  day.title = 'Pula romana · Zerostrasse → Kaštel → Fórum';
  day.summary = 'Roteiro atualizado ao vivo a partir da saída da Arena às 11:34: seguir a pé para Zerostrasse, subir ao Kaštel, descer ao Fórum e terminar no Arco dos Sérgios.';
  day.heroLabel = 'PULA · ROTEIRO AO VIVO';
  day.wear = ['Tênis confortável','Óculos de sol','Camada leve para Zerostrasse'];
  day.bring = ['Água','Powerbank','ISIC/documento'];
  day.alerts = [
    'Arena concluída: saída às 11:34. Próximo passo é caminhar para Twin Gates / Zerostrasse.',
    'Kamenjak foi removido do roteiro de hoje para manter a logística simples e contínua no centro de Pula.',
    'Volta Pula → Rovinj ainda sem horário definido: escolher e comprar diretamente na Arriva quando decidirem quanto tempo ficar.'
  ];
  day.events = [
    ev('10:50','Chegada a Pula · caminhada até a Arena',{ end:'11:00', icon:'🚌', location:loc('Pula Bus Station','Trg 1. istarske brigade 1, 52100 Pula, Croatia'), note:'Trecho Rovinj → Pula já realizado; não comprar novamente.'}),
    ev('11:00','Arena de Pula · concluída',{ end:'11:34', icon:'🏛️', location:loc('Pula Arena','Flavijevska ul., 52100 Pula, Croatia'), note:'Visita concluída. A partir daqui o roteiro foi recalculado para a posição real às 11:34.', infoUrl:'https://www.arenapula.hr/en/visitor-info/'}),
    ev('11:35','Arena → Twin Gates → Zerostrasse',{ end:'11:50', icon:'🚶', location:loc('Zerostrasse · Twin Gates','Carrarina ul. 3, 52100 Pula, Croatia'), note:'Caminhada curta pelo centro. Entrar em Zerostrasse pelo acesso próximo às Twin Gates.'}),
    ev('11:50','Zerostrasse → elevador → Kaštel',{ end:'13:05', icon:'🕳️', location:loc('Zerostrasse','Carrarina ul. 3, 52100 Pula, Croatia'), note:'Percorrer os túneis e usar o elevador interno para subir ao nível do Kaštel, evitando subir e descer a colina à toa.', tip:'Comprar o ingresso combinado no local. Priorizar túneis + vista do Kaštel.', infoUrl:'https://www.ppmi.hr/en/locations/zerostrasse/'}),
    ev('13:10','Fórum + Templo de Augusto',{ end:'13:40', icon:'🏛️', location:loc('Temple of Augustus','Forum, 52100 Pula, Croatia'), note:'Descer do Kaštel em direção ao Fórum. O templo é pequeno; a visita interna pode ser decidida na bilheteria.', infoUrl:'https://www.ami-pula.hr/en/locations/temple-of-augustus/'}),
    ev('13:40','Centro histórico → Arco dos Sérgios',{ end:'14:00', icon:'🏺', location:loc('Arch of the Sergii','Flanatička ul. 2, 52100 Pula, Croatia'), note:'Fechar o circuito romano caminhando pelas ruas do centro, sem retornar pelo mesmo caminho.'}),
    ev('14:00','Almoço no centro de Pula',{ end:'15:00', icon:'🍽️', location:loc('Pula Old Town','Pula Old Town, Pula, Croatia'), note:'Depois do circuito romano, almoçar sem criar um compromisso artificial com a rodoviária.'}),
    ev('','Comprar ônibus Pula → Rovinj',{ icon:'🚌', location:loc('Pula Bus Station','Trg 1. istarske brigade 1, 52100 Pula, Croatia'), status:'to-book', note:'Sem horário fixo. Abrir a Arriva quando decidirem quanto tempo querem ficar em Pula e comprar somente a volta.', buyUrl:ARRIVA_PULA_ROVINJ}),
    ev('15:00','Pula livre até o horário de volta escolhido',{ icon:'☀️', location:loc('Pula Old Town','Pula Old Town, Pula, Croatia'), note:'Depois de comprar a volta, ajustar o tempo livre ao horário real do ônibus.'})
  ];

  for (let index = walletItems.length - 1; index >= 0; index -= 1) {
    if (walletItems[index].id === 'bus-rovinj-pula' || walletItems[index].id === 'bus-pula-rovinj') walletItems.splice(index, 1);
  }
  walletItems.push({
    id:'bus-pula-rovinj',
    category:'Ônibus',
    title:'Pula → Rovinj · comprar volta',
    subtitle:'Arriva / Brioni · horário ainda não escolhido',
    date:'14 set · volta',
    status:'to-book',
    bookingUrl:ARRIVA_PULA_ROVINJ,
    note:'Comprar somente a volta. O trecho de ida já foi concluído. Escolher o horário diretamente na página oficial da Arriva depois de decidir quanto tempo ficar em Pula.'
  });

  return day;
}

applyPulaSep14LivePatch();
