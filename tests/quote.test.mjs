import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuoteMessage, createQuoteUrl } from '../quote.js';

test('WhatsApp draft preserves Turkish characters, newlines and reserved URL characters', () => {
  const fields = { service: 'Tank & ekipman', location: 'İvedik OSB / Ankara', details: 'Çatı işi?\nYük: 2 parça #1 + #2, ölçü: 3×4' };
  const url = new URL(createQuoteUrl(fields));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/905425145338');
  assert.equal(url.searchParams.get('text'), createQuoteMessage(fields));
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.hash, '');
});

test('Empty or whitespace-only fields cannot generate a misleading draft', () => {
  for (const key of ['service', 'location', 'details']) {
    const fields = { service: 'Şantiye', location: 'Ankara', details: 'Malzeme kaldırma', [key]: '  \n ' };
    assert.throws(() => createQuoteUrl(fields), /doldurun/);
  }
});
