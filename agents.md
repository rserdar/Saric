# Serdar Yavuz Portfolio — AI Çalışma Rehberi

Bu dosya projenin mevcut mimarisini ve çalışma disiplinini belgeler. Yeni bir AI veya geliştirici bu dosyayı okuyarak projeye doğrudan katkı sağlayabilir.

---

## 1. Proje Özeti

- **Proje Adı:** Serdar Yavuz Kişisel Portföy
- **Konum:** `c:\Users\rserd\Drive'ım\Astro\Serdar`
- **Mimari:** Pure Astro (Latest) + Tailwind CSS v4 — React bağımlılığı yok
- **Hedef:** Maksimum performans, temiz kod, Tailwind-first stil yönetimi

---

## 2. Mevcut Mimari

### A. Sayfa Yapısı

```
src/pages/
  index.astro          → Türkçe ana sayfa
  en/index.astro       → İngilizce ana sayfa
  bs/index.astro       → Boşnakça ana sayfa
  links.astro          → Links sayfası (LinksLayout üzerinde)
  en/links.astro
  bs/links.astro
```

### B. Veri Katmanı

| Dosya / Kaynak | Açıklama |
|---|---|
| `src/lib/site.ts` | `getSiteContent(locale)` — tüm sayfa içeriğini `astro:content` üzerinden sağlar |
| `src/content/site/tr\|en\|bs.json` | Dil bazlı içerik (nav, hero, about, skills, services, portfolio, contact vb.) |
| `src/content/localized/tr\|en\|bs/about.mdx` | About bölümünün uzun metin içeriği |
| `src/data/portfolioShowcase.json` | Portfolio kartları + partner logo referansları |
| `src/data/links.json` | Links sayfası içeriği |
| `src/data/siteAssets.ts` | `avatar.webp` ve `logo.webp` Astro Image referansları |

### C. Aktif Content Collections

Sadece iki collection aktif (`src/content.config.ts`):
- **`site`** — dil bazlı JSON içerik
- **`localized`** — MDX tabanlı lokalize içerik (about bölümü)

### D. Bileşen Yapısı

`src/components/` altındaki tüm bileşenler pure `.astro` — React bileşeni yok.

| Bileşen | Görev |
|---|---|
| `Home.astro` | Hero section, avatar, typing effect, skill badges |
| `About.astro` | Notebook kartı, sticker grid, stat kartları |
| `Service.astro` | Hizmet kartları |
| `Skills.astro` | Skill bar'lar, resume kolonları |
| `Portfolio.astro` | Filtreli portfolio grid, pagination |
| `News.astro` | Blogger Feed API entegrasyonu |
| `Contact.astro` | İletişim formu, harita |
| `Header.astro` | Sticky nav, dil seçici, tema toggle, mobil menü |
| `SharedMotion.astro` | IntersectionObserver animasyon tetikleyici (sadece script, CSS yok) |
| `Cursor.astro`, `PreLoader.astro`, `Progressbar.astro` | UI yardımcıları |
| `ResumeColumn.astro` | Skills bölümü accordion kolonları |
| `CopyRight.astro` | Footer |

### E. Stil Sistemi

**Tek CSS dosyası:** `src/styles/global.css`

```
@import "tailwindcss"              → Tailwind v4
@custom-variant dark               → class-based dark mode (.dark on <html>)
@theme { }                         → brand renkleri + --animate-* motion token'ları
@layer base { }                    → html/body/heading defaults
@layer components { }              → .container, brush sınıfları, [data-animate] sistemi
@keyframes { }                     → tüm animasyonlar merkezi olarak burada
```

Bileşen düzeyinde `<style>` bloğu **yoktur** — pure Tailwind class kullanımı.

### F. Animasyon Sistemi

- `data-animate="fade-in-up|fade-in-left|fade-in-right|zoom-in|bounce-scale"` attribute'ları ile tetiklenir
- `SharedMotion.astro` IntersectionObserver ile `.is-visible` class'ı ekler
- `global.css`'teki `[data-animate].is-visible` kuralları `--animate-*` token'larını devreye sokar
- Süre: `data-animate-duration`, gecikme: `data-animate-delay` attribute'ları ile

### G. İkon Sistemi

`astro-icon` + Font Awesome 6 Solid/Brands. Fontello kullanılmıyor, font dosyaları kaldırıldı.

---

## 3. Teknik Kurallar

- **Dark mode:** `<html>` üzerindeki `.dark` class'ı ile, Tailwind `dark:` direktifleri
- **Çoklu dil:** URL tabanlı (`/`, `/en/`, `/bs/`), `lang` prop bileşenlere iletilir
- **Görsel optimizasyonu:** Astro `<Image />`, görseller `src/assets/img/` altında
- **Links sayfası:** `LinksLayout.astro` üzerinde çalışır, ana sayfadan bağımsız
- **Yeni bileşen eklerken:** `<style>` bloğu açma, Tailwind arbitrary value veya global.css `@layer` kullan
- **Animasyon eklerken:** `@keyframes` → `global.css`, token → `@theme`, class → `@layer components`

---

## 4. Blogger Çalışma Alanı

### A. Aktif ve Referans Dosyalar

- **Aktif çalışma dosyası:** `blogger/Tailwind_Theme.xml`
- **Koyu tema referansı:** `blogger/theme_dark_v2.4.1.xml`
- **Aydınlık tema referansı:** `blogger/theme_light_v2.4.1.xml`

### B. Amaç

Blogger ana sayfasını Astro ana sayfasındaki güncel `Home.astro` ve `Header.astro` görünümüne yaklaştırmak. Eski tema üstüne yama atmak yerine kademeli ve izole bloklarla ilerlemek.

### C. Mevcut Durum

- Astro tarafında Tailwind dönüşümü tamamlanmıştır — bu Blogger için gerekli ön koşuldu.
- **Blogger tarafında Tailwind dönüşümü devam etmektedir.** `blogger/Tailwind_Theme.xml` aktif çalışma dosyasıdır.
- Blogger'da legacy tema altyapısı, özel widget yapıları ve eski CSS/JS hâlâ güçlü biçimde etkilidir.
- Astro'dan Blogger'a birebir kopyalama denemeleri kolayca bozulabilir — Blogger'ın widget sistemi ve skin değişkenleri Tailwind mantığıyla çakışabilir.
- Blogger sorunlarının önemli kısmı legacy tema altyapısından kaynaklanır; "CSS yanlış mı?" değil, "bu bölüm legacy tema tarafından hâlâ kontrol ediliyor mu?" sorusu önce sorulmalıdır.

### D. Çalışma Kuralları

1. **Doğrudan aktif dosyada çalış:** `blogger/Tailwind_Theme.xml`
2. **Referans dosyaları bozma:** `theme_dark_v2.4.1.xml` ve `theme_light_v2.4.1.xml` karşılaştırma için korunur
3. **Bölüm bölüm ilerle:** Büyük HTML/CSS blokları tek seferde taşıma
4. **Önce altyapı, sonra piksel:** Legacy CSS/JS çakışması varsa önce altyapı sadeleştirilir
5. **Tek kaynak Astro:** Metin, görsel, spacing, header için referans Astro bileşenleridir
6. **Aydınlık mod ayrı kontrol:** Koyu mod düzgün görünse bile aydınlık mod ayrıca test edilir

### E. Blogger İçin Önerilen İlerleme Sırası

1. Header → Hero → Hero altı divider
2. Post grid alanı → filtreler / etiket satırı
3. Footer / alt bilgi alanı
4. Her turda koyu ve aydınlık mod karşılaştırması

### F. Karşılaştırma Disiplini

Blogger ile Astro kıyaslanırken ayrı ayrı kontrol edilecekler:
- Header yüksekliği ve logo boyutu
- Menü boşlukları ve aktif link rengi
- Hero içeriğinin soldan başlangıç noktası
- Avatar boyutu ve skill badge konumları
- Hero alt divider görünürlüğü
- Aydınlık mod zemin tonları
- Post kartları ve footer geçişi

### G. Uygulama Notu

Blogger tarafında bir şey bozulduysa ilk soru "CSS yanlış mı?" değil, "bu bölüm legacy tema tarafından hâlâ etkileniyor mu?" olmalıdır.

---

## 5. Açık Görevler

### Tamamlananlar

- [x] `style.css` / `plugins.css` bağımlılığı kaldırıldı
- [x] `src/utilits.js` devreden çıkarıldı
- [x] Tüm bileşenlerden `<style>` blokları kaldırıldı
- [x] Animasyonlar merkezi motion token sistemine taşındı (`global.css`)
- [x] `Fontello` stil referansları ve font dosyaları temizlendi
- [x] `dizme_tm_*` legacy class isimleri kaldırıldı
- [x] `SharedMotion.astro` sadece script olarak temizlendi
- [x] `Header`, `Portfolio`, `Skills`, `News`, `Home`, `LinksPage` script'leri stabilize edildi
- [x] Kullanılmayan component'ler, görseller, JSON dosyaları, content collection'lar temizlendi
- [x] `content.config.ts` sadeleştirildi (2 aktif collection: site, localized)
- [x] `siteAssets.ts` sadeleştirildi (kullanılmayan about/skills importları kaldırıldı)

### Devam Edenler

- [ ] Görsel parity turu tamamlanmadı (header, hero, about, service, skills, portfolio)
- [ ] Açık/koyu mod tutarlılığı tüm sayfa boyunca kontrol edilmedi
- [ ] Blogger aktarımı için referans screenshot seti alınmadı
- [ ] `.container` class'ının global component olarak kalıp kalmayacağına karar verilmedi
- [ ] Responsive kontrol (özellikle mobil menü ve portfolio grid)

---

**Önemli Not:** Tailwind v4 kullandığımız için `@theme` bloklarını CSS değişkenleri üzerinden yönetmek hem performans hem okunabilirlik açısından doğru yaklaşımdır. Yeni animasyon veya token eklenirken bu yapıya uyulmalıdır.
