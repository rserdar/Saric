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

---
**Önemli Not:** Tailwind v4 kullandığımız için `@theme` bloklarını kullanarak CSS değişkenleri üzerinden tasarım sistemini yönetmek performans açısından daha verimlidir.
