import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate element IDs');
for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  if (/^(https?:|tel:|mailto:|data:)/.test(match[1])) continue;
  await access(path.join(root, match[1]));
}
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(match[1]), `Missing target: ${match[1]}`);
}
assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, 'Exactly one H1 expected');
assert.ok(!html.includes('href="#"'), 'Placeholder link found');
assert.ok(!/talebiniz alındı|SERTİFİKALI FİLO|TMMOB UYUMLU|HİDROLİK A\.Ş\./i.test(html), 'Unverified claim found');
for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
  for (const candidate of match[1].split(',')) await access(path.join(root, candidate.trim().split(/\s+/)[0]));
}
const schema = JSON.parse(html.match(/id="business-schema">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema.telephone, '+905425145338');
assert.equal(schema.areaServed, 'Ankara ve çevresi');
for (const file of ['app.js', 'quote.js', 'intro-story.js', 'scripts/build.mjs', 'scripts/serve.mjs', 'scripts/seo.mjs', 'scripts/metrics.js']) {
  execFileSync(process.execPath, ['--check', path.join(root, file)]);
}
console.log('Source checks passed: local assets, IDs, links, headings and JavaScript syntax.');
