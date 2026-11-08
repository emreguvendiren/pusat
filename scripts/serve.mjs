import http from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const qa = process.argv.includes('--qa');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain', '.json': 'application/json', '.xml': 'application/xml' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (qa && pathname === '/__qa/no-gsap') {
      let html = await readFile(path.join(root, 'index.html'), 'utf8');
      html = html.replace('<head>', '<head><base href="/">');
      html = html.replace(/<script src="assets\/vendor\/[^\"]+" defer><\/script>/g, '');
      res.writeHead(200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-store' });
      res.end(html); return;
    }
    if (qa && pathname === '/__qa/performance') {
      let html = await readFile(path.join(root, 'index.html'), 'utf8');
      html = html.replace('<head>', '<head><base href="/">');
      html = html.replace('</head>', '<script src="/__qa/metrics.js" defer></script></head>');
      res.writeHead(200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-store' });
      res.end(html); return;
    }
    if (qa && pathname === '/__qa/metrics.js') {
      res.writeHead(200, { 'Content-Type': types['.js'], 'Cache-Control': 'no-store' });
      res.end(await readFile(new URL('./metrics.js', import.meta.url))); return;
    }
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Sayfa bulunamadı');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
