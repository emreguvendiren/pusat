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
  const graph = JSON.parse(seo.html.match(/id="business-schema">([\s\S]*?)<\/script>/)[1])['@graph'];
  const schema = graph.find(node => node['@type'] === 'Organization');
  assert.equal(schema.url, 'https://www.pusatvinc.com/');
  assert.equal(schema.telephone, '+905425145338');
  assert.ok(!schema.address && !schema.openingHours && !schema.aggregateRating);
  const service = graph.find(node => node['@type'] === 'Service');
  assert.equal(service.provider['@id'], schema['@id']);
  assert.equal(graph.find(node => node['@type'] === 'WebPage').about['@id'], service['@id']);
  assert.equal([...seo.sitemap.matchAll(/<image:loc>/g)].length, 3);
  for (const offer of schema.hasOfferCatalog.itemListElement) assert.ok(html.includes(offer.itemOffered.name));
});

test('Unsafe or malformed deployment origins are rejected', () => {
  for (const value of ['http://example.com', 'https://example.com/path', 'https://user:password@example.com', 'https://example.com/?q="', 'https://localhost', 'https://127.0.0.1', 'https://example.com/#x', 'https://example.com:8080', 'https://foo&bar.com', 'https://1.1.1.1']) {
    assert.throws(() => validateSiteUrl(value), undefined, value);
  }
});
