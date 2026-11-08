# Yayın ve geri dönüş

## Mevcut durum

`www.pusatvinc.com` kullanıcı tarafından aday alan adı olarak belirtildi. Alan adının kesinleştiği, satın alındığı veya DNS erişiminin mevcut olduğu teyit edilmedi. Hosting henüz belirtilmedi. Dış yayın yapılmadı.

## Önizleme paketi

```powershell
./scripts/package.ps1
```

`artifacts/pusat-vinc-preview.zip` oluşur. Bu paket `noindex, nofollow` ve arama motorlarına kapalı robots ayarı içerir; kalıcı canonical veya alan adı içermez. Alan adı kesinleşmeden inceleme içindir.

## Üretim paketi

Alan adı ve hosting kesinleştikten sonra:

```powershell
./scripts/package.ps1 -SiteUrl 'https://www.pusatvinc.com'
```

Bu komut örnektir; alan adı henüz kesinleşmiş sayılmaz. Kesinleşen adres farklıysa o adres kullanılmalıdır. Komut dosyaları herhangi bir DNS değişikliği veya yükleme yapmaz.

Üretim paketinde:

- Canonical, Open Graph ve sosyal paylaşım görseli URL'leri seçilen HTTPS adresine bağlanır.
- Sitemap ve robots dosyaları aynı adresi kullanır.
- İşletme yapılandırılmış verisine URL ve fotoğraf adresi eklenir.
- `release.json`, yapı türünü ve kullanılan adresi kaydeder.
- ZIP'in SHA256 özeti ayrıca kaydedilir.

Temel build komutu da kullanılabilir:

```sh
node scripts/build.mjs --site-url=https://www.pusatvinc.com
```

## Sunucuya aktarım

1. Alan adı, DNS ve hosting erişimini netleştir.
2. Mevcut yayının dosyalarını veya hosting sürümünü yedekle.
3. Testleri çalıştır: `npm test`.
4. Kesin adresle üretim paketini oluştur; `release.json` içindeki adresi kontrol et.
5. ZIP içeriğini seçilen statik hostingin yayın köküne aktar. `index.html` kökte bulunmalıdır.
6. HTTPS sertifikasını ve www/çıplak alan adı tercihine göre yönlendirmeyi kontrol et.
7. HTML, CSS, JavaScript, WebP, JPEG ve fontların doğru MIME türleriyle sunulduğunu doğrula.
8. Yayındaki sayfada telefon/WhatsApp bağlantılarını, menüyü ve form taslağını kontrol et.
9. Canonical, sitemap ve robots adreslerini kontrol et. Üretimde `noindex` bulunmamalıdır.

Özgün kaynak fotoğrafları, ilk prototip, test sayfaları ve yerel QA ölçüm kodu ZIP'e dahil edilmez. Sunucu veya veritabanı kurulumu gerekmez.

## Geri dönüş

Sorun oluşursa son çalışan hosting sürümünü veya yedek dosyaları geri yükle. Önceki ve yeni paketleri tarihleri ve hash değerleriyle sakla. Geri dönüşten sonra HTTPS, ana sayfa ve iletişim akışını yeniden kontrol et. DNS değişikliğinin geri alınması gerekiyorsa hostingin DNS bilgileriyle birlikte değerlendirilmelidir.

## Yerel test sunucusu

Ek test rotaları normal sunucuda kapalıdır. İhtiyaç halinde ayrı portta açılır:

```powershell
$env:PORT='4174'
node scripts/serve.mjs --qa
```

- `/__qa/no-gsap`: GSAP scriptleri çıkarılmış, aynı uygulamanın temel etkileşimlerini test eden sürüm.
- `/__qa/performance`: Yerel LCP, FCP, CLS ve aktarım ölçümlerini sayfa sonundaki ayrı test çıktısında gösterir.

Bu ölçümler ağ/CPU kısıtlaması olmadan localhost üzerinde alınır. Lighthouse puanı veya gerçek ziyaretçi performansı değildir.

Şema referansı: [Google Organization](https://developers.google.com/search/docs/appearance/structured-data/organization). Güncel SEO notları `docs/SEO.md` içindedir.
