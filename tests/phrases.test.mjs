import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../js/trip-data.js', import.meta.url), 'utf8');

const expected = [
  ["Com licença","Oprostite"], ["Desculpa","Žao mi je"], ["Sim","Da"], ["Não","Ne"],
  ["Com licença","Elnézést"], ["Desculpa","Bocsánat"], ["Sim","Igen"], ["Não","Nem"],
  ["Com licença","Oprostite"], ["Desculpa","Žal mi je"]
];

test('includes the approved new essential phrases for all three languages', () => {
  for (const [pt, local] of expected) {
    assert.ok(source.includes(`['${pt}','${local}']`), `${pt} → ${local} missing`);
  }
});
