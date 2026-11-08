# Yerel sürüm kontrol kaydı

Tarih: 21 Ekim 2026  
Ortam: Windows, Codex uygulama içi Chromium tarayıcısı; localhost önizlemesi.

## Geçen kontroller

| Kontrol | Sonuç |
|---|---|
| Statik build | `node scripts/build.mjs` başarılı. Orijinal fotoğraflar ve prototip dosyaları dağıtıma alınmıyor. |
| Kaynak ve bağlantılar | `node scripts/check.mjs` başarılı: JS sözdizimi, yerel src/href varlıkları, benzersiz kimlikler, bölüm hedefleri, tek H1 ve kaldırılan doğrulanmamış iddialar. |
| WhatsApp mesaj kodlaması | 2 Node testi başarılı. Türkçe karakterler, satır sonları ve `&`, `#`, `+`, `?` işaretleri mesaj içinde korunuyor. Boş ve yalnızca boşluk içeren alanlar reddediliyor. |
| 360 px genişlik | Yatay taşma yok; GSAP sabitleme yok. |
| 390 px genişlik | Yatay taşma yok; mobil menü ve sabit iletişim çubuğu görsel olarak incelendi. |
| 768 px genişlik | Yatay taşma yok; masaüstü GSAP sabitlemesi devre dışı. |
| 1440 px genişlik | Yatay taşma yok; bir GSAP pin sahnesi etkin. |
| Ekipman sahnesi | İkinci anlatım görünümünde “Bom erişimi” fotoğrafına geçiş ve sabit görselin 115 px üst konumu gözlendi. |
| Mobil menü | Açılışta ilk bağlantıya odaklanma, Escape ile kapanma, menü düğmesine odak dönüşü ve bölüm seçilince kapanma doğrulandı. |
| Form doğrulama | Boş gönderimde üç zorunlu alan geçersiz; taslak veya başarı mesajı oluşmuyor. |
| Form taslağı | Örnek bilgiler doğru numara için WhatsApp URL'sine dönüştü. Bilgiler formda korundu. Mesaj gönderilmedi. |
| Düzenleme sonrası taslak | Alan değiştiğinde eski taslak bağlantısı ve durum mesajı gizleniyor. |
| Kaynak yüklemesi | Kontrol anında kırık yüklenmiş görsel yok; yerel yazı tipleri yüklendi. |
| Tarayıcı konsolu | Kontrol edilen oturumda hata veya uyarı kaydı yok. |

Ekran görüntüleri `.preview/` klasörüne kaydedilir; dağıtıma dahil edilmez.

## Uygulandı, ayrıca doğrulanacak

- `prefers-reduced-motion` için CSS ve GSAP eşleşmeleri eklendi; sistem tercihi değiştirilerek uçtan uca test yapılmadı.
- GSAP olmadan üç açılış sahnesi normal akışta görünür; temel menü/form davranışları ayrı QA rotasında doğrulandı.
- Menüde Tab/Shift+Tab ileri/geri odak çevrimi doğrulandı; tüm sayfanın ekran okuyucu kontrolü yapılmadı.

## Yayın öncesi kalanlar

- Gerçek iOS/Android cihaz testi ve tarayıcılar arası kontrol.
- Lighthouse veya eşdeğer performans/erişilebilirlik ölçümü; henüz puan raporlanmıyor.
- Alan adına bağlı SEO bilgileri ve yapılandırılmış veri.
- Son içerik değerlendirmesi, orijinal logo ve yayın hedefi.
- Yayındaki adres üzerinde HTTPS ve iletişim bağlantılarının kontrolü.

Telefon araması başlatılmadı, WhatsApp mesajı gönderilmedi, harici yayın yapılmadı.

## Devam sürümü — Üç sahneli sabit açılış

- Masaüstünde 1366×850 boyutta PageDown ile 1 → 2 → 3 sahne geçişleri gözlendi. İkinci ve üçüncü sahnede ana ekranın üst konumu 88 px olarak sabit kaldı.
- Üçüncü sahneden sonraki kaydırmada ana ekranın üst konumu negatife geçti ve alt içerik görünmeye başladı; normal sayfa akışına dönüş doğrulandı.
- Mobilde 390×844 boyutta ikinci sahneye geçiş, 70 px sabit üst konum ve yatay taşma olmadığı doğrulandı.
- “Tanıtımı geç” bağlantısı sonrasında ekipman bölümü 90 px üst konumda göründü.
- Etkin olmayan sahneler erişilebilirlik ağacından çıkarılıyor; görünür sahnenin başlığı ağaçta yer alıyor.
- GSAP scriptleri çıkarılmış QA sayfasında üç sahne 774 px yüksekliğinde normal akışa döndü, gizli/etkin olmayan sahne bırakılmadı.
- 1366×650 kısa laptop ekranında ekipman fotoğrafı 445 px yükseklik ve 115 px üst konumla ekrana sığdı; açıklama/ilerleme satırı 612 px konumunda kaldı.
- Önizleme ve üretim SEO davranışları için 3 yeni test eklendi; toplam 5 test geçti.
- Üretim build'i aday alan adıyla yalnızca yerel entegrasyon testinde denendi; ardından önizleme build'ine dönüldü. Harici yükleme yapılmadı.
- `scripts/package.ps1` ZIP ve SHA256 dosyası üretiyor; alan adı belirtilmezse önizleme arama motorlarına kapalı kalıyor.

Sistem hareket azaltma tercihi, gerçek mobil cihazlar, Safari/Firefox ve ekran okuyucu testleri hâlâ açık. Yerel ölçüm raporu Lighthouse veya gerçek ziyaretçi ölçümü yerine geçmez.

### Son yerel mobil genişlik ölçümü

390×844 görünüm, localhost, ağ/CPU kısıtlaması olmadan: FCP 80 ms, LCP 128 ms, CLS 0.0099, aktarılan veri yaklaşık 1.52 MB, harici kaynak isteği 0. Ham kayıt `docs/performance-local.json` dosyasındadır. Bu bir yerel başlangıç ölçümüdür; mobil donanım, mobil ağ, INP veya Lighthouse puanı ölçülmedi. Yeni sahneler için kullanılan üç fotoğraf yerelden yüklenir.

### Dönüşümlü yatay geçişler

1366×850 görünümde ikinci sahnenin metni başlangıçta -173 px, üçüncü sahneninki +173 px yatay ötelenmiş olarak gözlendi. İkinci sahneye gelindiğinde metin 0 px ve tam görünür, ilk metin sağa ötelenmiş ve görünmezdi. Toplam sabitleme mesafesi 1275 px (1.5 ekran yüksekliği); önceki 2380 px mesafeye göre yaklaşık %46 azaldı. Kaynak/build kontrolleri geçti.
