import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../js/trip-data.js', import.meta.url), 'utf8');

const expected = [
  ["Com licença","Oprostite"], ["Desculpa","Žao mi je"], ["Sim","Da"], ["Não","Ne"],
  ["Com licença","Elnézést"], ["Desculpa","Bocsánat"], ["Sim","Igen"], ["Não","Nem"],
  ["Com licença","Oprostite"], ["Desculpa","Žal mi je"],

  ["Bom dia","Dobro jutro"], ["Boa tarde","Dobar dan"],
  ["Boa noite (cumprimento)","Dobra večer"], ["Boa noite (despedida)","Laku noć"],
  ["Tchau","Bok / Doviđenja"], ["Desculpa, não falo croata","Oprostite, ne govorim hrvatski"],
  ["Eu gostaria de...","Želio bih... / Željela bih..."],

  ["Bom dia","Jó reggelt"], ["Boa tarde","Jó napot"],
  ["Boa noite (cumprimento)","Jó estét"], ["Boa noite (despedida)","Jó éjszakát"],
  ["Tchau","Szia / Viszontlátásra"], ["Desculpa, não falo húngaro","Bocsánat, nem beszélek magyarul"],
  ["Eu gostaria de...","Szeretnék..."],

  ["Bom dia","Dobro jutro"], ["Boa tarde","Dober dan"],
  ["Boa noite (cumprimento)","Dober večer"], ["Boa noite (despedida)","Lahko noč"],
  ["Tchau","Adijo / Nasvidenje"], ["Desculpa, não falo esloveno","Oprostite, ne govorim slovensko"],
  ["Eu gostaria de...","Rad bi... / Rada bi..."]
];

test('includes the approved essential and greeting phrases for all three languages', () => {
  for (const [pt, local] of expected) {
    assert.ok(source.includes(`['${pt}','${local}']`), `${pt} → ${local} missing`);
  }
});
