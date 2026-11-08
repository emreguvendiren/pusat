import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function auditSeo({ html, robots, sitemap, siteUrl }) {
  const checks = [];
  const check = (name, pass) => checks.push({ name, passed: Boolean(pass) });
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
  const bodyText = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  check('Turkish document language', /<html\b[^>]*lang="tr"/.test(html));
  check('Descriptive title', title.includes('Ankara') && title.includes('Vinç') && title.includes('Pusat'));
  check('Meta description', description.length > 0);
  check('One primary heading', [...html.matchAll(/<h1[ >]/g)].length === 1);
  const images = [...html.matchAll(/<img\b([^>]+)>/g)];
  check('Image alternative descriptions', images.length > 0 && images.every(([, attrs]) => /\balt="[^"]+"/.test(attrs)));
  check('Service content in delivered HTML', /id="hizmetler"/.test(html) && html.includes('Yük kaldırma ve yerleştirme'));
  check('Business phone link', html.includes('href="tel:+905425145338"'));
  check('No placeholder navigation', !html.includes('href="#"'));
  let schema;
  try { schema = JSON.parse(html.match(/id="business-schema">([\s\S]*?)<\/script>/)?.[1]); } catch { /* Report below. */ }
  check('Parseable JSON-LD', schema?.['@context'] === 'https://schema.org');
  if (siteUrl) {
    check('Production is indexable', /name="robots" content="index, follow/.test(html) && !/\bnoindex\b/.test(html));
    check('Canonical matches release domain', html.includes(`rel="canonical" href="${siteUrl}/"`));
    check('Robots allows crawling', /Allow: \/\s/.test(robots) && !/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
    check('Robots references the sitemap', robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
    check('Sitemap uses canonical homepage', sitemap.includes(`<loc>${siteUrl}/</loc>`));
    check('Sitemap includes original work photographs', [...sitemap.matchAll(/<image:loc>/g)].length === 3);
    check('Absolute social image', html.includes(`property="og:image" content="${siteUrl}/assets/images/social-share.jpg"`));
    const graph = schema?.['@graph'] || [];
    const organization = graph.find(node => node['@type'] === 'Organization');
    const service = graph.find(node => node['@type'] === 'Service');
    const website = graph.find(node => node['@type'] === 'WebSite');
    const webpage = graph.find(node => node['@type'] === 'WebPage');
    check('Business facts match verified content', organization?.telephone === '+905425145338' && organization?.areaServed === 'Ankara ve çevresi');
    check('Service links to its provider', Boolean(organization) && service?.provider?.['@id'] === organization['@id']);
    check('Page links to website and service', Boolean(website && service) && webpage?.isPartOf?.['@id'] === website['@id'] && webpage?.about?.['@id'] === service['@id']);
    check('Schema service catalog matches visible content', Boolean(organization?.hasOfferCatalog?.itemListElement?.length) && organization.hasOfferCatalog.itemListElement.every(offer => bodyText.includes(offer.itemOffered.name)));
  } else {
    check('Preview is not indexable', html.includes('noindex, nofollow') && robots.includes('Disallow: /'));
    check('Preview has no unconfirmed canonical', !html.includes('rel="canonical"'));
    check('Preview sitemap has no production URL', !sitemap.includes('<loc>'));
  }
  return { mode: siteUrl ? 'production' : 'preview', siteUrl: siteUrl || null, passed: checks.every(result => result.passed), checks };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const [html, robots, sitemap, release] = await Promise.all([
    readFile(path.join(root, 'dist/index.html'), 'utf8'), readFile(path.join(root, 'dist/robots.txt'), 'utf8'),
    readFile(path.join(root, 'dist/sitemap.xml'), 'utf8'), readFile(path.join(root, 'dist/release.json'), 'utf8'),
  ]);
  const result = auditSeo({ html, robots, sitemap, siteUrl: JSON.parse(release).siteUrl });
  await writeFile(path.join(root, 'docs/seo-audit.json'), JSON.stringify({ auditedAt: new Date().toISOString(), ...result }, null, 2));
  await writeFile(path.join(root, `docs/seo-audit-${result.mode}.json`), JSON.stringify(result, null, 2));
  console.log(`SEO ${result.mode}: ${result.checks.filter(check => check.passed).length}/${result.checks.length} checks passed.`);
  for (const check of result.checks.filter(check => !check.passed)) console.error(`FAIL: ${check.name}`);
  if (!result.passed) process.exitCode = 1;
}
