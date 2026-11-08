# Pusat Vinç — Web Sitesi Yol Haritası

Oluşturulma: 21 Ekim 2026  
Durum: İlk yerel sürüm uygulandı. Tasarım, site temeli, GSAP ve WhatsApp akışı hazır; içerik son kontrolü, kapsamlı cihaz testleri ve yayın işleri açık.

## Amaç

Pusat Vinç için gerçek saha fotoğraflarını ve mevcut kamyon üzeri vinci merkeze alan, telefon ve WhatsApp üzerinden nitelikli talep oluşturan, mobilde rahat kullanılan bir web sitesi hazırlamak. Görsel kimlik makinenin sarı, siyah ve beyaz renklerinden beslenecek. GSAP ve ScrollTrigger, ekipmanı anlatmak ve sayfa akışını güçlendirmek için kullanılacak.

## İlk analizdeki başlangıç noktası (referans)

- `code.html`: Tek sayfalık görsel prototip. Bölümler ve temel fotoğraf değiştirme etkileşimi mevcut.
- `DESIGN.md`: Endüstriyel tasarım dili, renkler, tipografi ve bileşen kuralları.
- `screen.png`: Mevcut tasarımın referans ekran görüntüsü.
- GSAP/ScrollTrigger henüz uygulanmamış.
- Teklif formu veri göndermeden başarı mesajı gösteriyor.
- Üst ve alt menü bağlantıları ile mobil navigasyon tamamlanmamış.
- İşletme unvanı, sertifikalar, çalışma saatleri ve teknik kapasite gibi içerikler doğrulama gerektiriyor.

## Proje ilkeleri

1. Tek araç ve gerçek hizmet kapsamı esas alınacak; filo büyüklüğü veya farklı ekipman varlığı ima edilmeyecek.
2. Kapasite, erişim, sertifika ve güvenlik iddiaları işletmenin doğruladığı bilgilerle sınırlı olacak. Fotoğraftan teknik kapasite çıkarılmayacak.
3. Gerçek fotoğraflar ve okunabilir içerik, dekoratif göstergelerden daha fazla yer kaplayacak.
4. Ana dönüşüm kanalları telefon ve WhatsApp olacak.
5. Animasyonlar mobil kullanımı, erişilebilirliği ve yükleme hızını destekleyecek.
6. Doğrulanmış bir gönderim gerçekleşmeden “talebiniz alındı” mesajı gösterilmeyecek.

## Faz 1 — İçerik ve varlıkların doğrulanması

**Hedef:** Tasarımı doğru işletme bilgileri üzerine kurmak.

- [x] Kullanılacak marka adını ve varsa yasal işletme unvanını doğrula.
- [x] Telefon ve WhatsApp numarasını kullanıcıyla doğrula; doğrulanmayan e-posta adresini kullanma.
- [x] Hizmet bölgelerini ve çalışma saatlerini netleştir.
- [x] Teknik bilgi politikasını netleştir: kullanıcının tercihiyle sayısal kapasite/erişim yerine genel ifade kullan; model tahmini yapma.
- [x] Sertifika ve yetkinlik ifadelerinin dayanaklarını kontrol et; doğrulanmayanları kaldır.
- [ ] Sunulan işleri ve sunulmayan hizmetleri belirle; platform hizmetinin kapsamını ayrıca netleştir.
- [x] Üç orijinal saha fotoğrafını kalıcı varlık klasörüne al; orijinal logo eksikliğini CONTENT.md dosyasına kaydet.
- [x] Fotoğraflara gerçek iş türleriyle uyumlu açıklamalar hazırla.
- [x] Eksik bilgiler için dahili içerik listesi oluştur; yer tutucu bilgileri yayına taşıma.

**Çıktı:** Onaylı işletme bilgileri, içerik listesi ve orijinal görsel arşivi.

**Tamamlanma kriteri:** Yayınlanacak her işletme ve ekipman iddiasının doğrulanmış bir kaynağı var; açık kalan bilgiler işaretlenmiş veya yayından çıkarılmış.

## Faz 2 — Sayfa yapısı ve tasarımın sadeleştirilmesi

**Hedef:** Mevcut görsel yönü Pusat Vinç'e özgü, anlaşılır bir yapıya dönüştürmek.

- [x] Sayfa sırasını kesinleştir: açılış → ekipman anlatımı → hizmetler → saha galerisi → çalışma yaklaşımı → iletişim.
- [x] Açılışta gerçek aracı, açık hizmet tanımını ve telefon/WhatsApp çağrılarını öne çıkar.
- [x] Hizmetleri aynı ekipmanın kullanım alanları olarak anlat; ayrı bir araç filosu izlenimi oluşturma.
- [x] Sahte canlı durum etiketlerini, gereksiz teknik kodları ve profil fotoğrafını kaldır.
- [x] Başlıklardaki büyük harf kullanımını ve küçük teknik metin yoğunluğunu azalt.
- [x] Fotoğraf üzerindeki koyu katmanları, aracı görünür tutacak şekilde düzenle.
- [x] Renk, tipografi, köşe ve gölge kararlarını tutarlı hale getirerek `DESIGN.md` dosyasını güncelle.
- [x] Mobil ve masaüstü yerleşimleri ile animasyon akışını taslak olarak tanımla.

**Çıktı:** Güncel tasarım kuralları, nihai bölüm sırası ve animasyon taslağı.

**Tamamlanma kriteri:** İlk ekranda işletmenin ne yaptığı, nerede hizmet verdiği ve nasıl aranacağı anlaşılır; tüm bölümler tek araç odağıyla tutarlı.

## Faz 3 — Çalışan ve duyarlı site temeli

**Hedef:** Animasyon olmadan da eksiksiz kullanılabilen bir site oluşturmak.

- [x] Projenin ihtiyacına uygun sade geliştirme ve derleme yapısını kur.
- [x] Tailwind CDN bağımlılığını kaldır; aynı görsel ihtiyaçları yerel CSS ile karşıla. (Basit statik site için ayrı Tailwind derlemesi gerekmiyor.)
- [x] İçerik, stil ve davranış kodunu bakımı kolay dosyalara ayır.
- [x] Fotoğraf ve logoları yerel dosyalara bağla; uygun boyutlarda WebP/AVIF türevleri hazırla.
- [x] Bölüm kimliklerini ve üst/alt menü bağlantılarını düzelt.
- [x] Sabit başlığın bağlantıyla gidilen bölüm başlıklarını örtmesini önle.
- [x] Erişilebilir mobil menü ekle; açma, kapama, Escape ve odak davranışlarını tamamla.
- [x] Telefon ve WhatsApp çağrılarını küçük ekranlarda kolay erişilebilir hale getir.
- [x] Başlık hiyerarşisi, form etiketleri, alternatif metinler ve görünür klavye odağını düzenle.
- [x] Küçük ekranlarda yatay taşmayı ve fotoğraf üzerindeki etiket çakışmalarını gider.

**Çıktı:** Mobil ve masaüstünde çalışan, animasyonsuz temel site.

**Tamamlanma kriteri:** Menü ve bölüm bağlantıları doğru çalışır; 360, 390, 768 ve 1440 piksel genişliklerde temel içerikte yatay taşma yoktur; klavyeyle temel görevler tamamlanabilir.

## Faz 4 — GSAP ve ScrollTrigger deneyimi

**Hedef:** Kaydırmayı, gerçek ekipmanı anlatan kontrollü bir görsel deneyime dönüştürmek.

- [x] GSAP ve ScrollTrigger kurulumunu yap.
- [x] Açılış metni ve fotoğrafı için kısa, okunabilir giriş geçişleri hazırla.
- [x] Masaüstünde ekipman anlatımına sabitlenen bir sahne uygula; kaydırmayla fotoğraf ve açıklamaları eşleştir.
- [x] Sahneleri doğrulanmış başlıklara göre kur: araç yapısı, bom, denge ayakları ve kullanım örnekleri.
- [x] Galeri ve hizmet bölümlerinde sınırlı giriş animasyonları kullan.
- [x] Kullanıcının ek isteğiyle mobil ve masaüstünde üç sahneli sabit açılış uygula; hareket azaltma ve çok kısa ekranlarda doğal akışı koru.
- [x] `prefers-reduced-motion` tercihinde sabitleme ve yoğun hareketi kaldır.
- [x] Ekran boyutu değişimlerinde animasyonları temizleyip yeniden kur; görsel yüklenmesi sonrası ölçümleri güncelle.
- [x] Animasyon başlatılamadığında içeriğin görünür ve kullanılabilir kalmasını sağla.

**Çıktı:** Masaüstü ve mobil için uyarlanmış kaydırma deneyimi.

**Tamamlanma kriteri:** Kaydırma takılmadan ilerler; içerik animasyon nedeniyle kaybolmaz; hareket azaltma tercihinde sayfa tam kullanılabilir; yeniden boyutlandırma yerleşimi bozmaz.

## Faz 5 — İletişim ve gerçek talep akışı

**Hedef:** Kullanıcının talebini açık ve güvenilir biçimde işletmeye ulaştırmak.

- [x] Telefon ve WhatsApp hedeflerini doğrulanmış numarayla bağla.
- [x] İlk sürümde form alanlarından WhatsApp mesaj taslağı oluşturan akışı uygula.
- [x] Kullanıcıya WhatsApp'ta mesajı kendisinin göndereceğini açıkça belirt; taslak açılmasını teslim edilmiş talep gibi gösterme.
- [x] Formu konum, iş türü ve yük/operasyon açıklaması gibi gerekli alanlarla sınırla.
- [x] Alan doğrulamalarını ve anlaşılır hata mesajlarını ekle.
- [x] WhatsApp'a geçilmeden formu sıfırlama; bağlantı açılamadığında bilgilerin kaybolmasını önle.
- [x] Sunucu üzerinden form/e-posta gönderimini ilk yayın sonrası kapsamına bırak; ilk sürümde WhatsApp taslağı kullan.

**Çıktı:** Çalışan telefon ve WhatsApp talep akışı.

**Tamamlanma kriteri:** Hazırlanan mesaj doğru alıcıyı ve form bilgilerini içerir; kullanıcı gönderimin hangi adımda olduğunu anlar; gerçekte iletilmeyen talebe başarı mesajı verilmez.

## Faz 6 — Arama görünürlüğü ve performans

**Hedef:** Sitenin hızlı açılmasını ve işletmeyi doğru tanıtmasını sağlamak.

- [x] Sayfa başlığını ve meta açıklamasını gerçek hizmet ve bölgelere göre yaz.
- [ ] Nihai alan adı belli olduğunda canonical, sitemap ve robots dosyalarını düzenle.
- [x] Sosyal paylaşım başlığı, açıklaması, görseli ve favicon ekle; mutlak görsel URL’sini üretim build’inde oluştur.
- [x] Doğrulanmış işletme bilgileriyle uygun yapılandırılmış veri hazırla.
- [x] Görsellere boyut bilgileri ekle; ekran altındaki fotoğraflarda gecikmeli yükleme kullan.
- [x] Açılış görselini önceliklendir; gereksiz font ve simge yüklerini azalt.
- [x] Aynı görselin gereksiz büyük veya tekrarlı indirilmesini önle.
- [x] Mobil genişlikte yerel başlangıç performansını ölç ve kaydet; gerçek cihaz/ağ ölçümünü yayın öncesi açık tut.

**Çıktı:** Yayın bilgileri tamamlanmış, optimize edilmiş site.

**Tamamlanma kriteri:** Kritik SEO alanları dolu, görseller optimize ve belirgin yerleşim sıçramaları giderilmiş; ölçülen performans sonuçları kaydedilmiş.

## Faz 7 — Son kontroller ve yayın

**Hedef:** Doğrulanmış sürümü işletmenin kullanımına açmak.

- [ ] İçerikleri, iletişim bilgilerini ve işletme iddialarını son kez kontrol et.
- [ ] Telefon, WhatsApp, menü, galeri ve talep akışını mobil ve masaüstünde dene.
- [ ] Gerçek bir mobil cihazda kullanım kontrolü yap; cihaz erişimi yoksa bunu açık test maddesi olarak kaydet.
- [ ] Klavye kullanımı, odak görünürlüğü ve hareket azaltma tercihini kontrol et.
- [ ] Desteklenen tarayıcılarda görünümü ve kaydırma davranışını kontrol et.
- [x] Konsol hatalarını, kırık bağlantıları ve eksik görselleri gider.
- [ ] Önizleme sürümünü, yayın hedefini ve geri dönüş yöntemini hazırla.
- [ ] İşletmeyle nihai içerik ve görünüm değerlendirmesini tamamla.
- [ ] Alan adı ve barındırma hedefi netleşip yayın yetkisi alındığında siteyi yayınla.
- [ ] Yayındaki adreste HTTPS, görseller, bağlantılar ve iletişim akışını tekrar kontrol et.

**Çıktı:** Yayındaki site ve kısa bakım notları.

**Tamamlanma kriteri:** Kritik hata kalmamış; canlı adreste temel kullanıcı görevleri çalışıyor; sonraki değişiklik ve geri dönüş adımları kayıtlı.

## Uygulama sırası ve öncelikler

Fazlar 1 → 2 → 3 → 4 → 5 → 6 → 7 sırasıyla ilerler. İçerik doğrulamasını beklemeyen teknik hazırlıklar yapılabilir; doğrulanmamış bilgi yayına taşınmaz. Faz 3'e başlanırken mevcut yanıltıcı form başarı davranışı devre dışı bırakılır.

| Öncelik | İş | İlgili faz |
|---|---|---|
| P0 | İşletme iddialarını doğrulama ve yanıltıcı form başarısını kaldırma | 1, 3, 5 |
| P1 | Menü, mobil kullanım, yerel görseller ve iletişim bağlantıları | 3, 5 |
| P1 | İstenen GSAP/ScrollTrigger ekipman anlatımı | 4 |
| P1 | Yayın öncesi içerik, erişilebilirlik ve işlev kontrolleri | 6, 7 |
| P2 | Sunucu üzerinden form gönderimi, ek galeri işlevleri ve ölçüme dayalı geliştirmeler | İlk yayın sonrası |

## İlk sürümün kapsam sınırı

İlk sürüm tek sayfalı tanıtım, ekipman anlatımı, hizmetler, saha galerisi ve telefon/WhatsApp iletişimini kapsar. Kullanıcı hesabı, yönetim paneli, canlı araç takibi, çevrimiçi rezervasyon, ödeme, otomatik fiyat hesaplama ve teknik kaldırma simülatörü kapsam dışıdır.

## İlerleme takibi

Her faz sonunda tamamlanan kutular işaretlenir; açık sorunlar ve doğrulama sonuçları aşağıya eklenir. Bir faz, yalnızca çıktıları ve tamamlanma kriterleri karşılandığında bitmiş sayılır.

| Faz | Durum | Sonuç / açık konu |
|---|---|---|
| 1 — İçerik ve varlıklar | İlk sürüm hazır / açık konu var | Numara, WhatsApp, Ankara ve esnek saatler kullanıcı tarafından teyit edildi. Orijinal logo ve hizmet kapsamının son kontrolü açık. CONTENT.md dosyasına bakın. |
| 2 — Tasarım | Uygulandı | Fotoğraf ağırlıklı tasarım ve açık hizmet bölümü hazır; DESIGN.md güncellendi. |
| 3 — Site temeli | Uygulandı / temel QA geçti | Yerel CSS ve varlıklar, mobil menü, bağlantılar, dört genişlikte taşma kontrolü tamam. Ekran okuyucu kontrolü açık. |
| 4 — Animasyon | Uygulandı / ek QA açık | GSAP, ekipman pin sahnesi ve fotoğraf değişimi çalışıyor. Üç sahneli açılış, normal akışa dönüş ve GSAP yokluğu test edildi. Sistem hareket azaltma tercihi testi açık. |
| 5 — İletişim | Uygulandı / taslak testi geçti | Doğru alıcı, mesaj kodlaması, boş alanlar ve veri koruma kontrol edildi. Mesaj gönderilmedi. |
| 6 — SEO ve performans | Yerel hazırlık tamam / yayın bilgisi açık | SEO üretimi, paylaşım görseli, şema ve yerel ölçüm hazır. Kesin alan adı, hosting ve gerçek cihaz/ağ ölçümü açık. |
| 7 — Kontrol ve yayın | Yerel QA yapıldı / yayın bekliyor | Test kaydı docs/QA.md içinde. Gerçek cihaz, diğer tarayıcılar, son içerik ve yayın hedefi açık. |

## 21 Ekim 2026 — Uygulama notları

- Aktif giriş dosyası `index.html`; ilk prototip `code.html` referans olarak korundu ve dağıtımdan çıkarıldı.
- `CONTENT.md`, `README.md` ve `docs/QA.md` eklendi.
- Marka ve iletişim metinleri bu konuşmadaki kullanıcı teyidine göre güncellendi.
- Yerel dağıtım `dist/` klasöründe. Harici yayın yapılmadı.
- İşaretlenen kutular uygulanan işleri gösterir; fazın doğrulama sınırları yukarıdaki durum tablosunda ve QA kaydında ayrıca belirtilir.

## Devam çalışması — Açılış anlatımı ve yayın hazırlığı

- Kullanıcının isteğiyle açılış üç tam ekran sahneye dönüştürüldü: güç → erişim → saha. Kaydırma sırasında ana ekran sabit, üçüncü sahneden sonra normal akış sürüyor.
- Masaüstü/telefon ekranlarına uyarlanan GSAP `pin + scrub + snap` eklendi; atlama bağlantısı ve etkin olmayan sahneler için odak yönetimi hazır.
- `scripts/seo.mjs` canonical, sosyal paylaşım, sitemap ve robots adreslerini kesinleşen alan adına göre üretir. Varsayılan önizleme arama motorlarına kapalıdır.
- `www.pusatvinc.com` aday olarak kaydedildi; alan adı ve hosting kesinleşmediği için harici yayın yapılmadı.
- `scripts/package.ps1` ile sürüm ve SHA256 özeti içeren önizleme paketi hazırlanır. Yayın/geri dönüş adımları `docs/DEPLOYMENT.md` içindedir.
- SEO ve WhatsApp için toplam 5 otomatik test geçti. GSAP olmadan temel etkileşimler ve klavye odak çevrimi ayrıca tarayıcıda kontrol edildi.

- Son görsel düzenleme: Açılış metinleri dönüşümlü soldan/sağdan geliyor; kaydırma mesafesi yaklaşık %46 kısaltıldı.
