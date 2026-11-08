# Pusat Vinç

Ankara ve çevresine yönelik tek sayfalık, yerel fotoğraflarla hazırlanmış vinç hizmeti sitesi. HTML, CSS, JavaScript ve GSAP/ScrollTrigger kullanır. Sunucu uygulaması veya veritabanı gerektirmez.

## Yerel geliştirme

Node.js 22 veya üzeriyle:

```sh
npm ci
npm run build
npm run dev
```

Önizleme: http://127.0.0.1:4173

Dosya değişikliklerinden sonra `npm run build` çalıştırıp tarayıcıyı yenileyin. Sunucu `dist/` klasörünü sunar; kaynak HTML dosyasını `file://` ile açmak modül kodu için uygun değildir.

Kontroller:

```sh
npm run check
npm test
```

`check` öncesinde bir kez build alınmalıdır; build GSAP dosyalarını yerel varlık klasörüne kopyalar. Windows'ta npm başlatıcısı sorun çıkarırsa `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run build` biçimi kullanılabilir.

## Dosyalar

- `index.html`: Aktif sayfa, içerik ve meta bilgiler.
- `styles.css`: Tüm duyarlı yerleşim, tipografi ve bileşen stilleri. Tailwind CDN bağımlılığı kaldırıldı.
- `app.js`: Menü, form ve GSAP davranışları.
- `quote.js`: Doğrulanmış telefon numarası ve WhatsApp mesaj oluşturma.
- `intro-story.js`: Üç sahneli sabit açılış ve kaydırma zaman çizelgesi.
- `assets/originals/`: Konuşmadaki üç orijinal fotoğraf. Build'e dahil edilmez.
- `assets/images/`: Optimize edilmiş WebP fotoğraflar.
- `assets/fonts/`: Yerelden sunulan yazı tipleri.
- `assets/vendor/`: Build sırasında kopyalanan GSAP dağıtımı.
- `dist/`: Statik barındırmaya aktarılabilecek çıktı.
- `CONTENT.md`: Teyit edilmiş bilgiler ve açık içerik konuları.
- `DESIGN.md`: Güncel tasarım kararları.
- `docs/QA.md`: Yapılan kontroller ve test sınırları.
- `ROADMAP.md`: Fazlar ve ilerleme.
- `code.html`, `screen.png`, `DESIGN.reference.md`: İlk prototip referansları. Aktif sitede kullanılmaz, build'e dahil edilmez.

## Etkileşimler

- Açılışta üç tam ekran sahne, GSAP ScrollTrigger `pin`, `scrub` ve `snap` ile aynı alanda değişir. Üçüncü sahnenin ardından normal sayfa kaydırması devam eder.
- Masaüstünde ekipman görseli de sabitlenir; yanındaki anlatıma göre fotoğraf değişir.
- Mobilde de üç sahneli açılış ve sabit telefon/WhatsApp çubuğu bulunur. Çok kısa ekranlarda ve hareket azaltma tercihinde sahneler doğal akışla gösterilir.
- Sistem hareket azaltma tercihinde yoğun animasyonlar ve GSAP sabitleme devre dışıdır.
- Form yalnızca WhatsApp mesaj taslağı hazırlar. Mesajı ziyaretçi WhatsApp'ta gönderir. Bir başarı/teslim edildi iddiası gösterilmez ve form kendiliğinden temizlenmez.
- Site, çalışma sırasında Google Fonts veya görsel CDN isteği yapmaz.

## Yayın öncesi

Alan adı kesinleşince `node scripts/build.mjs --site-url=https://kesin-alan-adi` canonical, sosyal paylaşım, sitemap ve robots adreslerini üretir. Adres verilmezse önizleme `noindex` olarak oluşturulur. Ayrıntılar `docs/DEPLOYMENT.md` dosyasındadır. Gerçek mobil cihaz, diğer tarayıcılar ve performans ölçümü bekleyen işlerdir. Şu an yalnızca yerel sürüm hazırlanmıştır.

GSAP uygulaması için başvurulan resmi dokümanlar: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) ve [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()).
