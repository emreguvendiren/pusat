# Pusat Vinç — Güncel tasarım sistemi

Güncelleme: 21 Ekim 2026

## Yön

Fotoğraf ağırlıklı endüstriyel editoryal tasarım. Makinenin sarısı, koyu çalışma yüzeyleri ve açık renkli hizmet bölümüyle güçlü bir ritim kurulur. Gerçek araç ve sade hizmet anlatımı merkezdedir. İlk prototipin tasarım belgesi `DESIGN.reference.md` altında korunur.

## Renkler

| Rol | Değer |
|---|---|
| Ana koyu zemin | `#141719` |
| Derin zemin | `#101315` |
| Panel | `#1c2022` |
| Vinç sarısı | `#eeb545` |
| Açık hizmet zemini | `#f0eee8` |
| Ana metin | `#f6f4ef` |
| İkincil metin | `#a9adab` |

Sarı; eylemler, bölüm numaraları ve vurgu için kullanılır. Açık hizmet bölümünde koyu metin ve daha koyu vurgu renkleri bulunur. Kenarlar düz, çizgiler ince ve gölgeler sınırlıdır.

## Tipografi

- Başlıklar ve marka yazımı: Barlow Condensed, 600–800.
- Gövde ve kontroller: Manrope, 400–700.
- Büyük harfler ana bölüm başlıklarında; açıklamalar ve hizmet adlarında doğal cümle düzeni kullanılır.
- Yazı tipleri yerelden sunulur. Sistem fontları yedektir.

## Sayfa akışı

1. Gerçek saha fotoğrafı, açık hizmet bölgesi ve doğrudan arama/WhatsApp eylemleri.
2. Hizmet bölgesi, ekipman, planlama ve çalışma saatlerini özetleyen sarı şerit.
3. Üç anlatımlı ekipman bölümü: araç, erişim, saha.
4. Açık zemin üzerinde genişletilebilir hizmet satırları.
5. Üç orijinal fotoğraftan saha galerisi.
6. İşin paylaşılması, değerlendirme ve zaman planlamasından oluşan çalışma yaklaşımı.
7. Büyük telefon numarası ve WhatsApp taslak formu.

## Yerleşim ve görseller

- Geniş ekranlarda en fazla 1440 px içerik genişliği.
- Masaüstünde 56 px, tablette 24–36 px, mobilde 16–20 px dış boşluk.
- 960 px altında mobil navigasyon; 768 px altında tek kolon ağırlıklı akış.
- Masaüstü açılışında yatay tank sahası fotoğrafı; mobilde aracı kadrajda tutan dikey açık saha fotoğrafı.
- Fotoğraflar değiştirilmez; yalnızca web için boyutlandırılıp sıkıştırılır.
- Marka adı tipografik olarak yazılır. Orijinal logo temin edildiğinde değerlendirilir.

## Hareket

- Açılışta kısa metin ve eylem girişleri. Üç tam ekran sahne, aynı sabit alan içinde kaydırmayla değişir; son sahneden sonra normal sayfa akışı başlar.
- ScrollTrigger `pin` sahneyi tutar, `scrub` geçişi kaydırmaya bağlar, `snap` durulduğunda okunabilir bir sahneye yerleştirir. Fotoğraflar perde geçişiyle değişir; metinler üst üste saydamlaşmaz.
- Kullanıcı “Tanıtımı geç” bağlantısıyla doğrudan ekipman bölümüne gidebilir. Etkin olmayan sahneler klavye odağı ve erişilebilirlik ağacından çıkarılır.
- 960 px ve üzeri masaüstünde GSAP/ScrollTrigger ile sabitlenen ekipman görseli; anlatım bölümüne göre fotoğraf değişimi.
- Masaüstü açılış fotoğrafında kaydırmaya bağlı hafif hareket.
- Diğer bölümlerde kısa girişler kullanılır. Mobilde de istenen üç sahneli açılış bulunur; çok kısa yatay ekranlarda doğal akışa dönülür.
- Hareket azaltma tercihinde yoğun hareket ve sabitleme kaldırılır.
- İçerik, GSAP başlamadan önce görünürdür.

## Etkileşim ve içerik kuralları

- Menü bağlantıları gerçek bölüm hedeflerine gider; sabit başlık hedefleri örtmez.
- Mobil menüde Escape ve odak yönetimi; mobil altta doğrudan iletişim çubuğu.
- Hizmet ayrıntıları yerel `details/summary` bileşeniyle açılır.
- Fotoğraflar büyük sürümlerine bağlanır.
- Formun eylemi “WhatsApp mesajı hazırla”dır; gönderim ziyaretçiye aittir.
- Sayısal kapasite, sertifika, filo veya canlı telemetri iddiası kullanılmaz.

### Yatay geçiş güncellemesi

İlk geçişte metin sağa çıkar, ikinci sahnenin metni soldan sağa gelir. Sonraki geçişte metin sola çıkar, üçüncü sahnenin metni sağdan sola gelir. Fotoğraf perdesi aynı yatay yönü izler. Kaydırma alanı 2.8 ekran yüksekliğinden 1.5 ekran yüksekliğine indirildi; scrub 0.7 ve sahneye yerleşme süresi 0.45 saniye oldu.

Ekipman fotoğrafları 0.75 saniyelik çapraz solma ve hafif ölçek hareketiyle değişir. Fotoğraf üzerindeki işaretler aynı katmanda sabit kalır; hareket azaltma tercihi geçişi devre dışı bırakır.
