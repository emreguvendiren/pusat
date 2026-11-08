import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildSeo, validateSiteUrl } from '../scripts/seo.mjs';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('Preview cannot accidentally advertise an unconfirmed production domain', () => {
  const seo = buildSeo(html);
  assert.match(seo.html, /noindex, nofollow/);
  assert.doesNotMatch(seo.html, /rel="canonical"/);
  assert.doesNotMatch(seo.sitemap, /<loc>/);
  assert.match(seo.robots, /Disallow: \//);
});

test('Production metadata, schema and sitemap consistently use the selected origin', () => {
  const seo = buildSeo(html, 'https://www.pusatvinc.com/');
  assert.equal(seo.origin, 'https://www.pusatvinc.com');
  assert.match(seo.html, /rel="canonical" href="https:\/\/www.pusatvinc.com\/"/);
  assert.match(seo.html, /https:\/\/www.pusatvinc.com\/assets\/images\/social-share.jpg/);
  assert.match(seo.sitemap, /<loc>https:\/\/www.pusatvinc.com\/<\/loc>/);
  const schema = JSON.parse(seo.html.match(/id="business-schema">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.url, 'https://www.pusatvinc.com/');
  assert.equal(schema.telephone, '+905425145338');
  assert.ok(!schema.address && !schema.openingHours && !schema.aggregateRating);
});

test('Unsafe or malformed deployment origins are rejected', () => {
  for (const value of ['http://example.com', 'https://example.com/path', 'https://user:password@example.com', 'https://example.com/?q="', 'https://localhost', 'https://127.0.0.1', 'https://example.com/#x', 'https://example.com:8080']) {
    assert.throws(() => validateSiteUrl(value), undefined, value);
  }
});
