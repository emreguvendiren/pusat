export function validateSiteUrl(value) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Site URL must be a bare HTTPS origin, e.g. https://www.pusatvinc.com');
  }
  if (!url.hostname.includes('.') || /^(localhost|127\.|0\.|\[)/.test(url.hostname)) {
    throw new Error('A public production hostname is required.');
  }
  if (!url.hostname.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)) || !/[a-z]/i.test(url.hostname.split('.').at(-1))) {
    throw new Error('Provide a valid public domain name.');
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
      `<meta name="robots" content="index, follow, max-image-preview:large">`,
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
    delete schema['@context'];
    const businessId = `${origin}/#isletme`;
    const websiteId = `${origin}/#web-sitesi`;
    const webpageId = `${origin}/#web-sayfasi`;
    const serviceId = `${origin}/#vinc-hizmeti`;
    Object.assign(schema, { '@id': businessId, url: `${origin}/`, image });
    const structuredData = { '@context': 'https://schema.org', '@graph': [
      schema,
      { '@type': 'WebSite', '@id': websiteId, url: `${origin}/`, name: schema.name, inLanguage: 'tr-TR', publisher: { '@id': businessId } },
      { '@type': 'WebPage', '@id': webpageId, url: `${origin}/`, name: html.match(/<title>([^<]+)<\/title>/)[1], inLanguage: 'tr-TR', isPartOf: { '@id': websiteId }, about: { '@id': serviceId }, primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } },
      { '@type': 'Service', '@id': serviceId, name: 'Ankara ve çevresi kamyon üzeri vinç hizmeti', serviceType: 'Kamyon üzeri vinç hizmeti', areaServed: schema.areaServed, provider: { '@id': businessId }, url: `${origin}/#hizmetler` },
    ] };
    html = html.replace(/(<script type="application\/ld\+json" id="business-schema">)[\s\S]*?(<\/script>)/, `$1\n  ${JSON.stringify(structuredData)}\n  $2`);
    robots = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
    const photographs = ['tank-operasyonu-1920.webp', 'bom-erisimi-1920.webp', 'santiye-calismasi-1920.webp'];
    const images = photographs.map(file => `<image:image><image:loc>${origin}/assets/images/${file}</image:loc></image:image>`).join('');
    sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>${origin}/</loc>${images}</url></urlset>\n`;
  }
  return { origin, html: html.replace('<!-- deployment-seo -->', metadata), robots, sitemap };
}
