const stop = (id, label, lat, lon, timeZone, from, to) => ({ id, label, lat, lon, timeZone, from, to });

export const TRIP_WEATHER_STOPS = {
  '2026-09-07': [stop('dubrovnik','Dubrovnik',42.6507,18.0944,'Europe/Zagreb','19:00','22:30')],
  '2026-09-08': [stop('dubrovnik','Dubrovnik',42.6507,18.0944,'Europe/Zagreb','07:30','21:30')],
  '2026-09-09': [
    stop('dubrovnik-lokrum','Dubrovnik / Lokrum',42.6350,18.1110,'Europe/Zagreb','08:00','13:40'),
    stop('budapest','Budapest',47.4979,19.0402,'Europe/Budapest','15:30','22:30')
  ],
  '2026-09-10': [stop('budapest','Budapest',47.4979,19.0402,'Europe/Budapest','08:30','22:00')],
  '2026-09-11': [
    stop('budapest','Budapest',47.4979,19.0402,'Europe/Budapest','05:45','06:45'),
    stop('ljubljana','Ljubljana',46.0569,14.5058,'Europe/Ljubljana','12:50','21:30')
  ],
  '2026-09-12': [
    stop('ljubljana','Ljubljana',46.0569,14.5058,'Europe/Ljubljana','06:30','07:00'),
    stop('vintgar','Vintgar',46.3923,14.0840,'Europe/Ljubljana','08:25','12:30'),
    stop('bled','Bled',46.3692,14.1136,'Europe/Ljubljana','13:00','18:30')
  ],
  '2026-09-13': [
    stop('postojna-predjama','Postojna / Predjama',45.7950,14.1700,'Europe/Ljubljana','08:00','14:40'),
    stop('koper','Koper',45.5481,13.7302,'Europe/Ljubljana','15:35','16:30'),
    stop('rovinj','Rovinj',45.0812,13.6387,'Europe/Zagreb','18:05','22:30')
  ],
  '2026-09-14': [
    stop('pula','Pula',44.8666,13.8496,'Europe/Zagreb','08:00','12:40'),
    stop('motovun','Motovun',45.3368,13.8280,'Europe/Zagreb','13:45','15:20'),
    stop('groznjan','Grožnjan',45.3780,13.7220,'Europe/Zagreb','16:00','17:20'),
    stop('rovinj','Rovinj',45.0812,13.6387,'Europe/Zagreb','18:30','22:30')
  ],
  '2026-09-15': [
    stop('rovinj','Rovinj',45.0812,13.6387,'Europe/Zagreb','09:00','10:00'),
    stop('kamenjak','Cabo Kamenjak',44.7724,13.9129,'Europe/Zagreb','10:50','16:45'),
    stop('rovinj-evening','Rovinj',45.0812,13.6387,'Europe/Zagreb','18:00','22:30')
  ],
  '2026-09-16': [
    stop('rastoke','Rastoke',45.1175,15.5851,'Europe/Zagreb','09:50','13:30'),
    stop('plitvice','Plitvice',44.9028,15.6114,'Europe/Zagreb','14:00','22:00')
  ],
  '2026-09-17': [
    stop('plitvice','Plitvice',44.9028,15.6114,'Europe/Zagreb','06:30','15:30'),
    stop('split','Split',43.5081,16.4402,'Europe/Zagreb','18:30','22:30')
  ],
  '2026-09-18': [
    stop('split','Split',43.5081,16.4402,'Europe/Zagreb','08:30','10:00'),
    stop('klis','Klis',43.5593,16.5220,'Europe/Zagreb','10:00','12:30'),
    stop('split-afternoon','Split / Bačvice',43.5070,16.4470,'Europe/Zagreb','13:00','22:30')
  ],
  '2026-09-19': [
    stop('krka','Krka / Skradinski Buk',43.8059,15.9630,'Europe/Zagreb','08:30','15:30'),
    stop('split','Split',43.5081,16.4402,'Europe/Zagreb','17:00','22:30')
  ],
  '2026-09-20': [
    stop('split','Split',43.5081,16.4402,'Europe/Zagreb','08:00','10:15'),
    stop('vis-stiniva','Vis / Stiniva',43.0420,16.1800,'Europe/Zagreb','10:15','17:30'),
    stop('split-evening','Split',43.5081,16.4402,'Europe/Zagreb','19:45','22:30')
  ],
  '2026-09-21': [
    stop('split','Split',43.5081,16.4402,'Europe/Zagreb','09:00','13:00'),
    stop('dubrovnik','Dubrovnik',42.6507,18.0944,'Europe/Zagreb','16:00','20:00')
  ]
};

const HOURLY_FIELDS = ['temperature_2m','apparent_temperature','precipitation_probability','precipitation','weather_code','wind_speed_10m','uv_index'];
const CURRENT_FIELDS = ['temperature_2m','apparent_temperature','precipitation','weather_code','wind_speed_10m'];
const DAILY_FIELDS = ['temperature_2m_min','temperature_2m_max','weather_code'];
const round1 = (n) => Math.round((Number(n) || 0) * 10) / 10;
const finite = (values) => values.map(Number).filter(Number.isFinite);
const lower = (value) => String(value || '').trim().toLocaleLowerCase('pt-BR');

export function formatLocalTime(date = new Date(), timeZone) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false,
    timeZoneName:'short'
  }).format(date);
}

export function buildForecastUrl({ lat, lon, date, timeZone }) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('hourly', HOURLY_FIELDS.join(','));
  url.searchParams.set('current', CURRENT_FIELDS.join(','));
  url.searchParams.set('daily', DAILY_FIELDS.join(','));
  url.searchParams.set('temperature_unit', 'celsius');
  url.searchParams.set('wind_speed_unit', 'kmh');
  url.searchParams.set('precipitation_unit', 'mm');
  url.searchParams.set('timezone', timeZone);
  url.searchParams.set('start_date', date);
  url.searchParams.set('end_date', date);
  return url.toString();
}

function severity(code) {
  if ([95,96,99].includes(code)) return 7;
  if ([71,73,75,77,85,86].includes(code)) return 6;
  if ([61,63,65,66,67,80,81,82].includes(code)) return 5;
  if ([51,53,55,56,57].includes(code)) return 4;
  if ([45,48].includes(code)) return 3;
  if (code === 3) return 2;
  if ([1,2].includes(code)) return 1;
  return 0;
}

export function weatherCodeLabel(code) {
  const n = Number(code);
  if ([95,96,99].includes(n)) return 'Trovoada';
  if ([71,73,75,77,85,86].includes(n)) return 'Neve';
  if ([61,63,65,66,67,80,81,82].includes(n)) return 'Chuva';
  if ([51,53,55,56,57].includes(n)) return 'Garoa';
  if ([45,48].includes(n)) return 'Nevoeiro';
  if (n === 3) return 'Nublado';
  if ([1,2].includes(n)) return 'Parcialmente nublado';
  return 'Céu limpo';
}

export function weatherVisual(code) {
  const n = Number(code);
  if ([95,96,99].includes(n)) return { icon:'⛈️', theme:'storm', label:'Trovoada' };
  if ([71,73,75,77,85,86].includes(n)) return { icon:'❄️', theme:'snow', label:'Neve' };
  if ([61,63,65,66,67,80,81,82].includes(n)) return { icon:'🌧️', theme:'rain', label:'Chuva' };
  if ([51,53,55,56,57].includes(n)) return { icon:'🌦️', theme:'drizzle', label:'Garoa' };
  if ([45,48].includes(n)) return { icon:'🌫️', theme:'fog', label:'Nevoeiro' };
  if (n === 3) return { icon:'☁️', theme:'cloudy', label:'Nublado' };
  if ([1,2].includes(n)) return { icon:'🌤️', theme:'partly', label:'Parcialmente nublado' };
  return { icon:'☀️', theme:'clear', label:'Céu limpo' };
}

function minuteOfDay(hhmm) {
  const [h,m] = String(hhmm || '00:00').split(':').map(Number);
  return h * 60 + m;
}

export function summarizeHourlyForecast(payload, { date, from='00:00', to='23:59' }) {
  const hourly = payload?.hourly;
  if (!hourly?.time?.length) throw new Error('Previsão horária indisponível.');
  const start = minuteOfDay(from);
  const end = minuteOfDay(to);
  const indexes = [];
  const dayIndexes = [];
  for (let i = 0; i < hourly.time.length; i += 1) {
    const stamp = hourly.time[i];
    if (!stamp?.startsWith(`${date}T`)) continue;
    dayIndexes.push(i);
    const hourStart = minuteOfDay(stamp.slice(11,16));
    const hourEnd = hourStart + 60;
    if (hourEnd > start && hourStart <= end) indexes.push(i);
  }
  if (!indexes.length) throw new Error('Sem horas de previsão para o período do roteiro.');
  const pick = (field) => indexes.map(i => hourly[field]?.[i]);
  const temps = finite(pick('temperature_2m'));
  const apparent = finite(pick('apparent_temperature'));
  const precipProb = finite(pick('precipitation_probability'));
  const precip = finite(pick('precipitation'));
  const winds = finite(pick('wind_speed_10m'));
  const uv = finite(pick('uv_index'));
  const codes = finite(pick('weather_code'));
  if (!temps.length || !apparent.length) throw new Error('Temperatura indisponível para o período.');
  const worstCode = [...codes].sort((a,b) => severity(b) - severity(a))[0] ?? 0;

  const daily = payload?.daily;
  const dailyIndex = Array.isArray(daily?.time) ? daily.time.indexOf(date) : -1;
  const allDayTemps = finite(dayIndexes.map(i => hourly.temperature_2m?.[i]));
  const dayMinRaw = dailyIndex >= 0 ? Number(daily.temperature_2m_min?.[dailyIndex]) : NaN;
  const dayMaxRaw = dailyIndex >= 0 ? Number(daily.temperature_2m_max?.[dailyIndex]) : NaN;
  const dayMinTemp = Number.isFinite(dayMinRaw) ? round1(dayMinRaw) : round1(Math.min(...allDayTemps));
  const dayMaxTemp = Number.isFinite(dayMaxRaw) ? round1(dayMaxRaw) : round1(Math.max(...allDayTemps));

  const current = payload?.current;
  const currentIsSelectedDay = Boolean(current?.time?.startsWith(`${date}T`));
  const currentTemp = currentIsSelectedDay && Number.isFinite(Number(current?.temperature_2m)) ? round1(current.temperature_2m) : null;
  const currentApparent = currentIsSelectedDay && Number.isFinite(Number(current?.apparent_temperature)) ? round1(current.apparent_temperature) : null;
  const currentWeatherCode = currentIsSelectedDay && Number.isFinite(Number(current?.weather_code)) ? Number(current.weather_code) : null;

  const focusIndex = indexes.reduce((best, i) => {
    const hhmm = hourly.time[i]?.slice(11,16) || '00:00';
    const distance = Math.abs(minuteOfDay(hhmm) - start);
    if (!best || distance < best.distance) return { i, distance };
    return best;
  }, null)?.i ?? indexes[0];
  const forecastDisplayTemp = Number.isFinite(Number(hourly.temperature_2m?.[focusIndex])) ? round1(hourly.temperature_2m[focusIndex]) : round1(temps[0]);
  const forecastDisplayCode = Number.isFinite(Number(hourly.weather_code?.[focusIndex])) ? Number(hourly.weather_code[focusIndex]) : worstCode;
  const forecastDisplayTime = hourly.time?.[focusIndex]?.slice(11,16) || from;
  const displayTemp = currentTemp ?? forecastDisplayTemp;
  const displayWeatherCode = currentWeatherCode ?? forecastDisplayCode;
  const displayLabel = currentTemp !== null ? 'AGORA' : forecastDisplayTime;

  return {
    minTemp: round1(Math.min(...temps)), maxTemp: round1(Math.max(...temps)),
    minApparent: round1(Math.min(...apparent)), maxApparent: round1(Math.max(...apparent)),
    dayMinTemp, dayMaxTemp,
    currentTemp, currentApparent, currentWeatherCode,
    displayTemp, displayWeatherCode, displayLabel,
    precipProbability: round1(Math.max(0, ...precipProb)),
    precipitation: round1(precip.reduce((sum,v) => sum + v, 0)),
    maxWind: round1(Math.max(0, ...winds)), maxUv: round1(Math.max(0, ...uv)),
    condition: weatherCodeLabel(worstCode),
    displayCondition: weatherCodeLabel(displayWeatherCode),
    weatherCode: worstCode
  };
}

function includesSimilar(list, candidate) {
  const needle = lower(candidate).replace(/[+\/]/g, ' ');
  return (list || []).some(item => {
    const hay = lower(item).replace(/[+\/]/g, ' ');
    return hay.includes(needle) || needle.includes(hay);
  });
}

export function buildWeatherAdvice(summaries = [], baseline = {}) {
  const valid = summaries.filter(Boolean);
  if (!valid.length) return { wear:[], bring:[] };
  const minApparent = Math.min(...valid.map(x => Number(x.minApparent)).filter(Number.isFinite));
  const maxApparent = Math.max(...valid.map(x => Number(x.maxApparent)).filter(Number.isFinite));
  const rainChance = Math.max(...valid.map(x => Number(x.precipProbability) || 0));
  const rain = valid.reduce((sum,x) => sum + (Number(x.precipitation) || 0), 0);
  const wind = Math.max(...valid.map(x => Number(x.maxWind) || 0));
  const uv = Math.max(...valid.map(x => Number(x.maxUv) || 0));
  const wear = [];
  const bring = [];
  const addWear = item => { if (!includesSimilar(baseline.wear,item) && !includesSimilar(wear,item)) wear.push(item); };
  const addBring = item => { if (!includesSimilar(baseline.bring,item) && !includesSimilar(bring,item)) bring.push(item); };
  if (Number.isFinite(minApparent) && Number.isFinite(maxApparent) && maxApparent - minApparent >= 8) addWear('Vista-se em camadas');
  if (minApparent <= 12) addWear('Camada quente / agasalho');
  else if (minApparent <= 18) addWear('Casaco leve');
  if (maxApparent >= 28) addWear('Roupa leve e respirável');
  if (wind >= 35) addWear('Corta-vento');
  if (rainChance >= 40 || rain >= 1) { addWear('Capa de chuva'); addBring('Meias extras secas'); }
  if (maxApparent >= 27) addBring('Água extra');
  if (uv >= 6) addBring('Protetor solar 50+');
  return { wear, bring };
}