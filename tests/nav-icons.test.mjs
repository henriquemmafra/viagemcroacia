import test from 'node:test';
import assert from 'node:assert/strict';

async function loadNavIcons() {
  return import('../js/nav-icons.js');
}

test('navigation labels add only the requested Maps and Waze iconography', async () => {
  const { navigationLabel } = await loadNavIcons();
  assert.equal(navigationLabel('maps'), '📍 Maps');
  assert.equal(navigationLabel('waze'), '🧭 Waze');
  assert.equal(navigationLabel('uber'), 'Uber');
  assert.equal(navigationLabel('other', 'Abrir'), 'Abrir');
});
