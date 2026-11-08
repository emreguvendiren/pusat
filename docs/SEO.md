# Pusat Vinç — SEO uygulaması

Güncelleme: 8 Kasım 2026

## Uygulananlar

- Sayfa başlığı: **Ankara Vinç Hizmeti | Kamyon Üzeri Vinç — Pusat Vinç**.
- Açılış metni; Ankara ve çevresi, kamyon üzeri vinç, yük kaldırma, yerleştirme ve montaj desteğini doğal bir dille tanımlar. Mevcut büyük açılış başlığı korunur.
- Hizmet bilgileri ve dört soru-cevap ilk HTML yanıtında bulunur; metinleri görmek için JavaScript ile veri yüklemek gerekmez.
- Telefon, marka ve hizmet bölgesi doğrulanmış bilgilerle tutarlıdır.
- Üretim build'inde **Organization, WebSite, WebPage ve Service** bir JSON-LD grafiğiyle birbirine bağlanır. Hizmet kataloğu sayfadaki üç somut hizmet başlığını içerir.
- Açık adres teyit edilmediğinden adres gerektiren Google LocalBusiness zengin sonuçlarına uygunluk iddiası yapılmaz. Mevcut şema Organization olarak düzenlenmiştir; adres, puan, yorum veya sabit çalışma saati uydurulmaz.
- Üretim canonical, sosyal paylaşım URL'leri, robots ve sitemap aynı kesin alan adına göre oluşturulur.
- Sitemap yalnızca gerçek ana sayfayı ve üç saha fotoğrafını içerir. Tek sayfanın bölüm bağlantıları ayrı sayfalarmış gibi sitemap'e eklenmez.
- Büyük görsel önizlemeleri için `max-image-preview:large` üretim robots meta etiketine eklenmiştir.
- Önizleme sürümü `noindex, nofollow` olarak kalır; aday alan adına bağlı canonical üretilmez.

Soru-cevap alanı ziyaretçiye yardımcı olmak için eklendi. Bu ticari site için Google'da FAQ zengin sonuç sözü verilmez; ayrıca FAQPage şeması eklenmedi.

## Kontrol komutları

```sh
npm run build
npm run check
npm test
npm run seo:check
```

Önizleme denetimi 12, üretim denetimi 20 kontrol içerir. Bunlar proje içi teknik doğrulamalardır; Google sıralaması veya bir SEO puanı değildir. Raporlar `docs/seo-audit-preview.json` ve `docs/seo-audit-production.json` dosyalarına yazılır. `docs/seo-audit.json` son çalıştırmanın raporudur.

Alan adı kesinleştikten sonra üretim paketini hazırlama:

```powershell
./scripts/package.ps1 -SiteUrl 'https://www.pusatvinc.com'
```

`www.pusatvinc.com` hâlâ adaydır. Bu komut alan adı, DNS, hosting veya arama motoru hesabı üzerinde değişiklik yapmaz. Paketleme, SEO denetimi geçmezse durur. Normal yerel çalışma için alan adı vermeden build alınmalıdır.

## Yayın sonrası yapılacaklar

1. Kesin alan adı ve www yönlendirme tercihini belirle; üretim build'ini o adresle al.
2. HTTPS, canonical, sosyal paylaşım görseli, sitemap ve robots dosyalarını gerçek adreste kontrol et. Üretim sayfasında `noindex` kalmamalı.
3. Google Search Console'da alan adı sahipliğini doğrula; sitemap'i gönder ve ana sayfayı URL Denetimi ile kontrol et.
4. Google İşletme Profili mevcutsa marka, telefon ve hizmet bölgesini siteyle tutarlı hale getir; web sitesi adresini ekle.
5. Search Console'da gösterim, tıklama ve gelen sorguları izle. Yeni hizmet sayfalarını ancak ayrı ve yeterli gerçek içerik varsa planla; aynı metni ilçelere çoğaltma.
6. Gerçek mobil cihaz/ağ üzerinde performans ve kullanım ölçümünü tamamla.

Bu aşamada Search Console veya İşletme Profili hesabına erişilmedi; bir kayıt, indeksleme isteği veya dış yayın yapılmadı.

## Resmi kaynaklar

- [Google: Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link)
- [Google: Canonical URL kullanımı](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Organization yapılandırılmış verisi](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: LocalBusiness yapılandırılmış verisi](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: FAQ zengin sonuçlarıyla ilgili değişiklik](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
