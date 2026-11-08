export function validateSiteUrl(value) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Site URL must be a bare HTTPS origin, e.g. https://www.pusatvinc.com');
  }
  if (!url.hostname.includes('.') || /^(localhost|127\.|0\.|\[)/.test(url.hostname)) {
    throw new Error('A public production hostname is required.');
  }
  return url.origin;
}

export function buildSeo(html, value) {
  const origin = validateSiteUrl(value);
  let metadata = '<meta name="robots" content="noindex, nofollow">';
  let robots = 'User-agent: *\nDisallow: /\n';
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n';
  if (origin) {
    const image = `${origin}/assets/images/social-share.jpg`;
    metadata = [
      `<link rel="canonical" href="${origin}/">`,
      `<meta name="robots" content="index, follow">`,
      `<meta property="og:url" content="${origin}/">`,
      `<meta property="og:image" content="${image}">`,
      '<meta property="og:image:type" content="image/jpeg">',
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:height" content="630">',
      '<meta property="og:image:alt" content="Pusat Vinç çalışma sahasında">',
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:title" content="Pusat Vinç — Ankara ve çevresi vinç hizmeti">',
      '<meta name="twitter:description" content="İşinizi konuşalım, birlikte planlayalım.">',
      `<meta name="twitter:image" content="${image}">`,
    ].join('\n  ');
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json" id="business-schema">([\s\S]*?)<\/script>/)[1]);
    Object.assign(schema, { '@id': `${origin}/#isletme`, url: `${origin}/`, image });
    html = html.replace(/(<script type="application\/ld\+json" id="business-schema">)[\s\S]*?(<\/script>)/, `$1\n  ${JSON.stringify(schema)}\n  $2`);
    robots = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
    sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`;
  }
  return { origin, html: html.replace('<!-- deployment-seo -->', metadata), robots, sitemap };
}
