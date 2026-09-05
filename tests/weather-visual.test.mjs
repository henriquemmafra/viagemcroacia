import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildForecastUrl,
  summarizeHourlyForecast,
  weatherVisual
} from '../js/weather-engine.js';

test('forecast URL requests current weather and daily min/max', () => {
  const url = new URL(buildForecastUrl({
    lat:42.65, lon:18.09, date:'2026-09-08', timeZone:'Europe/Zagreb'
  }));
  assert.match(url.searchParams.get('current') || '', /temperature_2m/);
  assert.match(url.searchParams.get('current') || '', /weather_code/);
  assert.match(url.searchParams.get('daily') || '', /temperature_2m_min/);
  assert.match(url.searchParams.get('daily') || '', /temperature_2m_max/);
});

test('summary exposes current temperature and daily min/max on the selected local day', () => {
  const payload = {
    current:{ time:'2026-09-08T09:15', temperature_2m:22.4, apparent_temperature:21.8, weather_code:0 },
    daily:{ time:['2026-09-08'], temperature_2m_min:[16.2], temperature_2m_max:[27.8], weather_code:[1] },
    hourly:{
      time:['2026-09-08T08:00','2026-09-08T09:00','2026-09-08T10:00'],
      temperature_2m:[20,22,24], apparent_temperature:[19,21,23],
      precipitation_probability:[0,0,10], precipitation:[0,0,0],
      weather_code:[0,0,1], wind_speed_10m:[8,9,10], uv_index:[2,3,4]
    }
  };
  const summary = summarizeHourlyForecast(payload, { date:'2026-09-08', from:'08:00', to:'10:30' });
  assert.equal(summary.currentTemp, 22.4);
  assert.equal(summary.currentApparent, 21.8);
  assert.equal(summary.dayMinTemp, 16.2);
  assert.equal(summary.dayMaxTemp, 27.8);
  assert.equal(summary.displayTemp, 22.4);
  assert.equal(summary.displayLabel, 'AGORA');
});

test('future day uses itinerary-time forecast instead of labelling old current weather as AGORA', () => {
  const payload = {
    current:{ time:'2026-09-05T10:15', temperature_2m:25, apparent_temperature:25, weather_code:0 },
    daily:{ time:['2026-09-12'], temperature_2m_min:[12], temperature_2m_max:[23], weather_code:[2] },
    hourly:{
      time:['2026-09-12T06:00','2026-09-12T07:00','2026-09-12T08:00'],
      temperature_2m:[13,14,16], apparent_temperature:[12,13,15],
      precipitation_probability:[10,10,20], precipitation:[0,0,0],
      weather_code:[2,2,2], wind_speed_10m:[5,6,7], uv_index:[0,1,2]
    }
  };
  const summary = summarizeHourlyForecast(payload, { date:'2026-09-12', from:'07:00', to:'08:30' });
  assert.equal(summary.currentTemp, null);
  assert.equal(summary.displayTemp, 14);
  assert.equal(summary.displayLabel, '07:00');
});

test('visuals map clear, cloudy and rain to distinct iconographic themes', () => {
  assert.deepEqual(weatherVisual(0), { icon:'☀️', theme:'clear', label:'Céu limpo' });
  assert.equal(weatherVisual(3).icon, '☁️');
  assert.equal(weatherVisual(3).theme, 'cloudy');
  assert.equal(weatherVisual(61).icon, '🌧️');
  assert.equal(weatherVisual(61).theme, 'rain');
});
