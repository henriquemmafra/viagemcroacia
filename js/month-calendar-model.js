export const FONT_SCALE = 1.18;

const pad = (n) => String(n).padStart(2, '0');

export function tripDayIndexForDate(tripDays = [], dateKey = '') {
  return tripDays.findIndex((day) => day?.date === dateKey);
}

export function buildSeptemberCalendar(
  tripDays = [],
  ticketDates = new Map(),
  selectedDate = '',
  todayDate = ''
) {
  const firstDay = new Date(Date.UTC(2026, 8, 1));
  const mondayOffset = (firstDay.getUTCDay() + 6) % 7;
  const tripByDate = new Map(tripDays.map((day, index) => [day.date, { ...day, index }]));
  const cells = [];

  for (let i = 0; i < mondayOffset; i += 1) {
    cells.push({ date:null, day:null, selectable:false, markers:[], isSelected:false, isToday:false, tripIndex:-1, city:'' });
  }

  for (let day = 1; day <= 30; day += 1) {
    const date = `2026-09-${pad(day)}`;
    const trip = tripByDate.get(date);
    cells.push({
      date,
      day,
      selectable:Boolean(trip),
      markers:[...(ticketDates.get(date) || [])],
      isSelected:date === selectedDate,
      isToday:date === todayDate,
      tripIndex:trip?.index ?? -1,
      city:trip?.city || ''
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date:null, day:null, selectable:false, markers:[], isSelected:false, isToday:false, tripIndex:-1, city:'' });
  }
  return cells;
}
