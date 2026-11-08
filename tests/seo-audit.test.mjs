import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditSeo } from '../scripts/audit-seo.mjs';
import { buildSeo } from '../scripts/seo.mjs';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const production = buildSeo(html, 'https://www.pusatvinc.com');
const input = { ...production, siteUrl: production.origin };

test('Both preview and production output pass their own indexing rules', () => {
  assert.ok(auditSeo({ ...buildSeo(html), siteUrl: null }).passed);
  assert.ok(auditSeo(input).passed);
});

test('Production audit blocks accidental noindex, wrong canonical and blocked robots', () => {
  const broken = [
    { html: production.html.replace('index, follow, max-image-preview:large', 'noindex, nofollow') },
    { html: production.html.replace('rel="canonical" href="https://www.pusatvinc.com/"', 'rel="canonical" href="https://example.com/"') },
    { robots: 'User-agent: *\nDisallow: /\n' },
  ];
  for (const change of broken) assert.equal(auditSeo({ ...input, ...change }).passed, false);
});

test('Catalog cannot pass the audit using schema text alone when the service is absent from the page', () => {
  const [head, body] = production.html.split('</head>');
  const missingService = `${head}</head>${body.replaceAll('Tank ve ekipman montaj desteği', 'Montaj işi')}`;
  assert.equal(auditSeo({ ...input, html: missingService }).passed, false);
});
