import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSeo } from './seo.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some(arg => !arg.startsWith('--site-url='))) throw new Error('Usage: node scripts/build.mjs [--site-url=https://your-domain.com]');
if (args.length > 1) throw new Error('Provide only one site URL.');
const seo = buildSeo(await readFile(path.join(root, 'index.html'), 'utf8'), args[0]?.slice('--site-url='.length));
const vendor = path.join(root, 'assets/vendor');
await mkdir(vendor, { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  await cp(path.join(root, 'node_modules/gsap/dist', file), path.join(vendor, file));
}
const license = await readFile(path.join(root, 'node_modules/gsap/package.json'), 'utf8');
const metadata = JSON.parse(license);
await writeFile(path.join(vendor, 'NOTICE.txt'), `GSAP ${metadata.version}\nhttps://gsap.com\nLicense: https://gsap.com/standard-license/\n`);
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of ['styles.css', 'app.js', 'quote.js', 'intro-story.js']) {
  await cp(path.join(root, file), path.join(output, file));
}
await writeFile(path.join(output, 'index.html'), seo.html);
await writeFile(path.join(output, 'robots.txt'), seo.robots);
// Always overwrite the sitemap, so a local rebuild cannot keep a previous domain.
await writeFile(path.join(output, 'sitemap.xml'), seo.sitemap);
await writeFile(path.join(output, 'release.json'), JSON.stringify({
  mode: seo.origin ? 'production' : 'preview', siteUrl: seo.origin || null,
  builtAt: new Date().toISOString(),
}, null, 2));
for (const directory of ['images', 'fonts', 'vendor']) {
  await cp(path.join(root, 'assets', directory), path.join(output, 'assets', directory), { recursive: true });
}
await cp(path.join(root, 'assets/favicon.svg'), path.join(output, 'assets/favicon.svg'));
console.log(`Static build ready: ${output}`);
