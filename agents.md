# Dizme Portfolio AI Çalışma Rehberi

Bu dosya, Dizme projesinin Next.js'ten Astro + Tailwind CSS'e dönüşüm sürecinde ve sonrasında çalışan tüm yapay zekalar ve geliştiriciler için tek referans kaynağıdır.

## 1. Proje Özeti
- **Proje Adı:** Dizme
- **Tür:** Kişisel Portföy / Ajans Teması
- **Konum:** `d:\Astro\dizme`
- **Hedef Mimari:** Astro (Latest) + React (Interaktif bileşenler için) + Tailwind CSS v4
- **Öncelikli Hedef:** Maksimum performans (Lighthouse %100), temiz kod ve yönetilebilir CSS.

## 2. Mevcut Durum Analizi
- **Kaynak:** Next.js 12 / React 17 (`references/package/dizme` klasöründe)
- **Stil:** `style.css` (73KB) ve `plugins.css` (285KB) gibi devasa monolithic dosyalar.
- **İçerik:** `src/components` altında React bileşenleri.
- **Efektler:** Swiper, Isotope, Wowjs, Vanilla-tilt.

### Destek ve Referans Kaynakları
Geliştirme sürecinde esinlenmek, animasyon/stil karşılaştırması yapmak ve kod desteği almak için `references` klasörü altında şu şablonlar bulundurulmaktadır:
1. **Next.js Orijinal Şablon (`references/package`):** Next.js 12 ve React 17 tabanlı, orijinal monolithic CSS kullanan ham kaynak kodları barındırır.
2. **Taildark Projesi (`references/taildark`):** Tailwind CSS entegrasyonu, koyu tema (dark mode) uyumluluğu, Adobe marka renk kodları (Ai, Ps vb.) ve premium kart yerleşimleri için referans alınan Tailwind tabanlı modern portföy projesidir.
3. **Taildown Projesi (`references/taildown`):** Yapısal düzenler, grid sistemleri ve mobil uyumluluk kontrollerinde yararlanılan diğer bir Tailwind CSS şablonudur.

## 3. Dönüşüm Stratejisi (Astro + Tailwind)

### A. Bileşen Mimarisi
- **Aşama 1 (Hibrit):** Mevcut React bileşenleri (`.js`) doğrudan Astro içinde kullanılacak. `client:load` veya `client:visible` direktifleri ile interaktivite korunacak.
- **Aşama 2 (Refactor):** Statik kısımlar (Hero, About vb.) `.astro` bileşenlerine, interaktif kısımlar ise Tailwind destekli modern React bileşenlerine dönüştürülecek.

### B. Stil Yönetimi (Tailwind CSS)
- **Kural 1:** İlk aşamada mevcut CSS dosyaları (`style.css`, `plugins.css`) global olarak projeye dahil edilecek.
- **Kural 2:** Dönüşüm ilerledikçe bu dosyalar devreden çıkarılacak ve tüm stil Tailwind CSS sınıfları ile yazılacak.
- **Kural 3:** Custom animasyonlar mümkünse Tailwind'in `animate-*` sınıfları ile, karmaşık olanlar `framer-motion` ile değiştirilmelidir.

### C. Görsel Optimizasyonu
- Tüm görseller `src/assets` altına taşınmalı ve Astro'nun `<Image />` bileşeni kullanılmalıdır.
- Fırça efektleri (brush images) SVG veya optimize edilmiş WebP formatına dönüştürülmelidir.

## 4. Teknik Kurallar
- **Interaktivite:** `window` nesnesine bağımlı kütüphaneler (Isotope vb.) için `client:only="react"` kullanılmalıdır.
- **SEO:** Her sayfa için `Layout.astro` içinde SEO meta etiketleri standartlaştırılmalıdır.
- **Dosya Yapısı:**
  - `src/components/` -> Mevcut React ve yeni Astro bileşenleri
  - `src/layouts/` -> Ana sayfa şablonları (`BaseLayout.astro`)
  - `src/pages/` -> Sayfa rotaları
  - `src/styles/` -> Global Tailwind ve eski CSS dosyaları

## 5. Blogger Çalışma Alanı

Bu bölüm, Blogger temasına özel çalışma disiplinini tanımlar. Astro tarafı ile Blogger tarafı birbirine benzetilmeye çalışılırken hibrit yapıdan doğan çakışmalar yaşandığı için, Blogger tarafında artık daha kontrollü ve karşılaştırmalı ilerlenmelidir.

### A. Aktif ve Referans Dosyalar
- **Aktif çalışma dosyası:** `blogger/Tailwind_Theme.xml`
- **Koyu tema referansı:** `blogger/theme_dark_v2.4.1.xml`
- **Aydınlık tema referansı:** `blogger/theme_light_v2.4.1.xml`

### B. Amaç
- Blogger ana sayfasını, Astro ana sayfasındaki güncel `Home.astro` ve `Header.astro` görünümüne mümkün olduğunca yaklaştırmak.
- Ancak bunu eski zombi tema üstüne rastgele yama atarak değil, kademeli olarak Tailwind mantığına daha yakın, izole bloklarla yapmak.
- Blogger tarafına taşınacak her yeni bölüm önce Astro tarafında görsel olarak netleşmiş ve mümkün olduğunca Tailwind-first hale gelmiş olmalıdır.

### C. Mevcut Durum Tespiti
- Blogger tarafında eski tema altyapısı, özel widget yapıları ve legacy CSS/JS hâlâ güçlü biçimde etkili.
- Astro tarafında da tam saf Tailwind dönüşümü henüz bitmediği için, Blogger tarafında birebir kopyalama denemeleri kolayca bozulabiliyor.
- Bu nedenle Blogger sorunlarının önemli kısmı, yalnızca Blogger dosyasından değil Astro tarafındaki hibrit yapıdan da kaynaklanabilir.

### D. Çalışma Kuralları
1. **Doğrudan aktif dosyada çalış:** Blogger için yeni denemeler `blogger/Tailwind_Theme.xml` üzerinde yapılmalıdır.
2. **Referans dosyaları bozma:** `theme_dark_v2.4.1.xml` ve `theme_light_v2.4.1.xml` karşılaştırma amacıyla korunmalıdır.
3. **Büyük çaplı yapıştırma yapma:** Astro’dan Blogger’a tek seferde büyük HTML/CSS blokları taşımak yerine bölüm bölüm ilerlenmelidir.
4. **Önce altyapı, sonra piksel:** Eğer bir görünüm sorunu legacy CSS/JS çakışmasından kaynaklanıyorsa önce altyapı sadeleştirilmeli, sonra görsel ince ayar yapılmalıdır.
5. **Tek kaynak gerçeği Astro olsun:** Metin, görsel, spacing, header davranışı ve hero düzeni için ana referans Astro bileşenleri olmalıdır.
6. **Aydınlık mod ayrı kontrol edilmelidir:** Karanlık mod düzgün görünse bile aydınlık mod ayrıca test edilmeden iş tamam kabul edilmemelidir.

### E. Blogger İçin Önerilen İlerleme Sırası
1. Astro tarafında `Header`, `Home`, `CopyRight` ve ortak layout davranışlarını saf Tailwind mantığına yaklaştır.
2. Astro tarafında legacy davranışları azalt: ortak `utilits.js`, eski selector bağımlılıkları, global tema sınıfları.
3. Ardından Blogger `Tailwind_Theme.xml` içinde sadece üst bölümden başla:
   - Header
   - Hero
   - Hero altı divider / kağıt kesiği efekti
4. Üst bölüm oturduktan sonra:
   - post grid alanı
   - filtreler / etiket satırı
   - footer / alt bilgi alanı
5. Her turda koyu ve aydınlık mod ekran görüntüsü karşılaştırması yapılmalıdır.

### F. Karşılaştırma Disiplini
- Blogger ile Astro kıyaslanırken özellikle şu başlıklar ayrı ayrı kontrol edilmelidir:
  - Header yüksekliği
  - Logo boyutu
  - Menü boşlukları
  - Hero içeriğinin soldan başlangıç noktası
  - Avatar boyutu ve skill badge konumları
  - Hero alt divider görünürlüğü
  - Aydınlık mod zemin tonları
  - Post kartları ve footer geçişi

### G. Uygulama Notu
- Eğer Blogger tarafında bir şey bozulduysa, ilk soru “CSS yanlış mı?” değil, “bu bölüm legacy tema tarafından hâlâ etkileniyor mu?” olmalıdır.
- Blogger teması, Astro tarafı yeterince saf Tailwind hale gelmeden son kaliteye ulaşmayabilir. Bu normal kabul edilmeli ve önce sağlam temel kurulmalıdır.

## 6. Tailwind CSS Refactor Planı (Bileşen Bazlı)

Bu fazın amacı, `style.css` ve `plugins.css` dosyalarına olan bağımlılığı sıfıra indirerek projenin stil yönetimini tamamen Tailwind CSS'e taşımaktır.

### A. Tasarım Sistemi Tanımlama (Faz 1)
Herhangi bir bileşene dokunmadan önce, projenin mevcut renk paleti ve tipografisi `tailwind.config.js` veya `global.css` (Tailwind v4 ise) içine aktarılmalıdır:
- **Renkler:** `colors.css` içindeki ana renkler (Orange, Green, Purple vb.) Tailwind custom colors olarak tanımlanmalı.
- **Tipografi:** Google Fonts (Jost, Open Sans) entegre edilmeli.
- **Container:** Dizme'nin özel `container` genişlikleri Tailwind `container` sınıfına uyarlanmalı.

### B. Refactor Öncelik Sırası (Faz 2)
Bileşenler en az interaktivite gerektirenlerden en çok gerektirenlere doğru şu sırayla dönüştürülmelidir:
1.  **Layout Elements:** `Header`, `Footer` (CopyRight), `MobileMenu`.
2.  **Simple Sections:** `Hero` (Home), `About`, `Process`.
3.  **Data Driven Sections:** `Services`, `Skills`, `News`, `Newsletter`.
4.  **Complex Interactivity:** `Portfolio` (Isotope), `Testimonial` (Swiper), `Popups`.

### C. Refactor Uygulama Kuralları
Her bileşen dönüştürülürken şu adımlar izlenmelidir:
1.  **Astro Dönüşümü:** Bileşen tamamen statikse (örn: About), `.jsx` yerine `.astro` olarak yeniden yazılmalıdır.
2.  **Sınıf Değişimi:** Mevcut özel sınıflar (örn: `.dizme_tm_about`) silinmeli ve yerlerine Tailwind sınıfları (`flex`, `grid`, `py-20` vb.) yazılmalıdır.
3.  **Görsel Optimizasyonu:** `<img>` etiketleri Astro'nun `<Image />` bileşeni ile değiştirilmelidir.
4.  **CSS Temizliği:** Bir bileşen tamamen Tailwind'e geçtiğinde, o bileşene ait stiller `style.css` dosyasından **tamamen silinmelidir**.

### D. İlerleme Takibi
Her bileşenin dönüşüm durumu `task.md` üzerinden takip edilmeli ve "Done" statüsüne geçmeden önce Lighthouse testi ile görsel parity kontrol edilmelidir.

## 7. Astro Tarafı Net Yapılacaklar Listesi

Bu bölüm, Astro tarafını gerçekten saf Tailwind tabanlı hale getirmek için izlenecek somut görev listesidir. Amaç yalnızca görünümü korumak değil, legacy tema izlerini sistemli biçimde temizlemektir.

### A. Ortak Altyapı Temizliği
- [ ] `src/layouts/BaseLayout.astro` içinde legacy tema mantığı kalıp kalmadığı her turda kontrol edilmeli.
- [ ] Ortak davranışlar tek merkezli eski tema mantığıyla değil, ilgili bileşenin kendi içinde yönetilmelidir.
- [ ] `src/utilits.js` tamamen emekliye ayrılmalıdır.
- [ ] `src/utilits.js` içindeki gerekli kalan davranışlar bileşen bazında dağıtılmalıdır:
  - Header sticky davranışı
  - aktif menü takibi
  - scroll progress
  - custom cursor
  - giriş animasyon gözlemcisi
- [ ] `dizme_tm_*` sınıf isimleri zorunlu değilse kaldırılmalıdır.

### B. Global CSS Tasfiyesi
- [ ] `src/styles/global.css` dosyası bileşenlerden bağımsız eski tema çöplüğüne dönüşmemelidir.
- [ ] Global dosyada yalnızca şu tip stiller bırakılmalıdır:
  - `@theme` tasarım değişkenleri
  - gerçekten global base kuralları
  - tüm projede ortak kullanılan az sayıdaki utility/helper
- [ ] Aşağıdaki legacy sınıflar bileşen içine taşınmalı veya Tailwind utility karşılığına dönüştürülmelidir:
  - `.dizme_tm_down`
  - `.anim_moveBottom`
  - `.dizme_tm_portfolio_titles`
  - `.mouse-cursor`
  - `.progressbar`
  - `.theme-toggle-btn`
  - `.card-hover`
- [ ] `[data-animate]` sistemi ya küçük bir ortak utility olarak netleştirilmeli ya da section bazında daha kontrollü hale getirilmelidir.
- [ ] Global CSS içinde sadece tek bir bileşenin kullandığı kurallar tespit edilip o bileşene taşınmalıdır.

### C. Header ve Layout
- [ ] `src/components/Header.astro` tamamen bağımsız ve self-contained olmalıdır.
- [ ] Header için gerekli stiller mümkün olduğunca doğrudan Tailwind class’larıyla çözülmelidir.
- [ ] Header sticky davranışı eski tema selector mantığına değil, kendi veri attribute veya kendi class sistemine dayanmalıdır.
- [ ] Mobil menü davranışı Header bileşeni içinde izole tutulmalıdır.
- [ ] Logo, nav boşlukları, dil seçici ve tema butonu tek bir tasarım sistemiyle uyumlu hale getirilmelidir.

### D. Hero / Home Bölümü
- [ ] `src/components/Home.astro` içindeki yardımcı özel sınıflar en aza indirilmelidir.
- [ ] Hero alt divider / kağıt kesiği efekti global bağımlılık olmadan çalışmalıdır.
- [ ] Scroll indicator mümkünse tamamen Tailwind utility + küçük local style ile çözülmelidir.
- [ ] Floating skill badge animasyonları bileşen içinde tanımlı ve izole olmalıdır.
- [ ] Hero oranları, spacing ve görsel yerleşim masaüstü ve mobil için net breakpoint mantığıyla sadeleştirilmelidir.

### E. Section Bazlı Temizlik
- [ ] `About.astro` içindeki özel animasyon ve dekoratif katmanlar gözden geçirilmeli.
- [ ] `Service.astro` içinde yalnızca bu bölüme ait efektler localize edilmelidir.
- [ ] `Skills.astro` içinde progress bar görsel sistemi bileşen odaklı sadeleştirilmelidir.
- [ ] `Portfolio.astro` içindeki hover title sistemi global sınıf yerine bileşen mantığına alınmalıdır.
- [ ] `News.astro` kart sistemi global kart kurallarına ihtiyaç duymadan çalışmalıdır.
- [ ] `Contact.astro` form elemanları ortak form utility’leriyle sadeleştirilmelidir.
- [ ] `CopyRight.astro` ve footer parçaları tamamen Tailwind utility ile yönetilmelidir.

### F. Legacy İzlerinin Tespiti
- [ ] Tüm `src/components` içinde `dizme_tm_`, `uk-`, `wow`, `swiper`, `isotope`, `mfp`, `magnific`, `tilt` gibi legacy izler düzenli olarak taranmalıdır.
- [ ] Kullanılmayan selector ve yardımcı sınıflar her refactor turundan sonra silinmelidir.
- [ ] “Şimdilik dursun” yaklaşımı yalnızca kısa süreli kabul edilmeli, kalıcı hale getirilmemelidir.

### G. Blogger’a Geçmeden Önce Tamamlanması Gerekenler
- [ ] Header görsel ve davranış olarak kararlı olmalı.
- [ ] Home/Hero bölümü kararlı olmalı.
- [ ] Açık ve koyu mod Astro tarafında tutarlı olmalı.
- [ ] Global CSS bağımlılığı makul seviyeye indirilmiş olmalı.
- [ ] Aynı bileşen için hem global CSS hem uzun özel selector hem de utility class çakışması kalmamalıdır.

### H. Çalışma Sırası Önerisi
1. `BaseLayout.astro`
2. `Header.astro`
3. `Home.astro`
4. `CopyRight.astro`
5. `global.css` tasfiyesi
6. `About.astro`
7. `Service.astro`
8. `Skills.astro`
9. `Portfolio.astro`
10. `News.astro`
11. `Contact.astro`
12. Son kontrol: açık/koyu mod + responsive + Blogger aktarım hazırlığı

---
**Önemli Not:** Tailwind v4 kullandığımız için `@theme` bloklarını kullanarak CSS değişkenleri üzerinden tasarım sistemini yönetmek performans açısından daha verimlidir.
