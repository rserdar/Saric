# Serdar Yavuz Portfolio — AI Çalışma Rehberi

Bu dosya projenin mevcut mimarisini ve çalışma disiplinini belgeler. Yeni bir AI veya geliştirici bu dosyayı okuyarak projeye doğrudan katkı sağlayabilir.

---

## 1. Proje Özeti

- **Proje Adı:** Serdar Yavuz Kişisel Portföy
- **Konum:** `c:\Users\rserd\Drive'ım\Astro\Serdar`
- **Mimari:** Pure Astro (Latest) + Tailwind CSS v4 — React bağımlılığı yok
- **Hedef:** Maksimum performans, temiz kod, Tailwind-first stil yönetimi
- **Güncel Not:** Astro tarafındaki Playwright tabanlı test ve snapshot altyapısı projeden kaldırıldı; doğrulama şu anda build + manuel parity kontrolleri üzerinden ilerliyor

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
Layout tarafında `.container`, `.container-narrow` ve `.container-wide` primitive'leri aktif olarak kullanılmaya devam eder.

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
- **Animasyon eklerken:** @keyframes → global.css, token → @theme, class → @layer components
- **Container stratejisi:** Varsayılan section shell'i için .container, daha dar içerik blokları için .container-narrow, daha geniş kahraman / vitrin alanları için .container-wide kullanılmaya devam eder
- **Astro Kod Tabanını Koruma (MANDATORY):** Blogger teması üzerinde çalışırken, kullanıcı tarafından açıkça talep edilmedikçe orijinal Astro kaynak kodlarına (`src/` altındaki `.astro`, `.css`, `.ts` vb. dosyalar) kesinlikle dokunulmamalıdır. Astro kodları projenin ana referans kaynağıdır.

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
- Astro tarafındaki otomatik test/snapshot sistemi kaldırılmıştır; parity ve responsive kontroller manuel tur gerektirir.
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
- [x] Playwright testleri, snapshot baseline'ları ve QA checklist dokümantasyonu projeden kaldırıldı
- [x] CI akışı sadece `npm run build` doğrulamasına sadeleştirildi
- [x] `.container` / `.container-narrow` / `.container-wide` düzeni kalıcı layout primitive'i olarak benimsendi

### Devam Edenler

- [ ] Görsel parity turu tamamlanmadı (header, hero, about, service, skills, portfolio)
- [ ] Açık/koyu mod tutarlılığı tüm sayfa boyunca kontrol edilmedi
- [ ] Blogger aktarımı için referans screenshot seti alınmadı
- [ ] Responsive manuel kontrol turu tamamlanmadı (mobil menü ve portfolio grid tarafında kod iyileştirmeleri yapıldı, son görsel kontrol kaldı)

---

**Önemli Not:** Tailwind v4 kullandığımız için `@theme` bloklarını CSS değişkenleri üzerinden yönetmek hem performans hem okunabilirlik açısından doğru yaklaşımdır. Yeni animasyon veya token eklenirken bu yapıya uyulmalıdır.

---

## Astro 7 ve Astro Docs MCP Politikası

### Dokümantasyon önceliği

* Bu proje Astro 7 veya üzerini hedefler.
* Astro yapılandırması, entegrasyonlar, routing, içerik koleksiyonları, Markdown, render davranışı, cache, deployment, adapter, middleware veya Vite davranışıyla ilgili değişiklik yapmadan önce `astro-docs` MCP sunucusuna danış.
* Eski Astro 5/6 örnekleri, blog yazıları, Stack Overflow cevapları veya kopyalanmış kod parçaları yerine güncel resmi Astro dokümantasyonunu tercih et.
* Gerekli dokümantasyonu gerçekten içermediği sürece Astro Docs MCP’yi Astro dışındaki teknolojiler için kullanma.

### Sürüm ve bağımlılık disiplini

* Repository’nin mevcut paket yöneticisini ve lock dosyasını koru.
* Yeni bir Astro projesinde güncel resmi Astro proje oluşturucusunu kullan ve Astro 7’nin kurulu olduğunu doğrula.
* Mevcut bir projede, yalnızca bu politika eklendi diye Astro sürümünü yükseltme. Astro yükseltmesini sadece görev açıkça gerektiriyorsa yap.
* Astro yükseltmesi istenirse `npx @astrojs/upgrade` gibi resmi yükseltme akışını kullan; ardından doğrulama kontrollerini ve production build işlemini çalıştır.
* Mümkün olduğunda resmi Astro entegrasyonlarını `astro add` kullanarak kur.
* Resmi dokümantasyon açıkça gerektirmedikçe Astro compiler, Vite veya Rolldown iç paketlerini manuel biçimde ekleme, sabitleme ya da değiştirme.

### Astro 7 varsayılanları ve kaldırılan experimental bayraklar

* `rustCompiler`, `queuedRendering`, `advancedRouting`, `cache`, `routeRules` veya `logger` için eski `experimental` bayraklarını ekleme.
* Bir Astro yükseltmesinde bu bayraklar mevcutsa, Astro v7 migration rehberine danış ve yalnızca geçerli olan ayarları güncel üst seviye yapılandırma konumuna taşı.
* Rust compiler, queued rendering, Vite 8 veya Rolldown’u manuel olarak “aktif etmeye” çalışma. Bunları Astro 7 kendisi yönetir.

### Statik Cloudflare Pages temel yaklaşımı

* Bu projeyi varsayılan olarak statik bir Cloudflare Pages sitesi kabul et.
* İstenen özellik gerçekten sunucu tarafı davranış gerektirmedikçe SSR, `output: 'server'`, Cloudflare adapter, Pages Functions, Hono, `src/fetch.ts`, route caching veya cache provider ekleme.
* Sunucu tarafı davranış gerekli olduğunda bağımlılık eklemeden veya deployment davranışını değiştirmeden önce en küçük uygulanabilir mimariyi açıkla.

### Rezerve edilmiş routing dosya adı

* `src/fetch.ts`, `src/fetch.js` veya eşdeğer isimleri generic API helper, fetch wrapper veya HTTP utility olarak asla kullanma.
* Astro 7’de bu dosya adı Advanced Routing için ayrılmıştır.
* Genel amaçlı fetch yardımcılarını `src/lib/` altında oluştur. Örnekler:
  * `src/lib/api.ts`
  * `src/lib/http.ts`
  * `src/lib/fetcher.ts`
* `src/fetch.ts` yalnızca Astro Advanced Routing bilinçli olarak uygulanacaksa ve Astro Docs MCP kontrolü yapıldıktan sonra kullanılabilir.

### Markdown ve MDX

* Somut bir ihtiyaç legacy remark, rehype veya recma eklentisi gerektirmediği sürece Astro 7’nin varsayılan Sätteri Markdown hattını koru.
* `@astrojs/markdown-remark` paketini önceden veya “belki lazım olur” diye kurma.
* Legacy unified/remark/rehype eklentileri gerçekten gerekirse, `@astrojs/markdown-remark` paketini kur ve Markdown processor ayarını güncel Astro dokümantasyonunun gerektirdiği şekilde yapılandır.
* Yükseltme sırasında mevcut Markdown render davranışını koru ve değişiklikten sonra temsilî içerik sayfalarını incele.

### Geçerli Astro markup ve boşluk yönetimi

* `.astro` dosyalarında katı ve geçerli HTML yaz.
* Void olmayan tüm elementleri ve component taglerini kapat.
* Astro’nun veya tarayıcının geçersiz HTML’i otomatik düzeltmesine güvenme.
* `p` etiketi içinde `div`, `section` or `article` gibi block-level elementler kullanma.
* Yan yana gelen inline elementler okunabilir bir cümle oluşturuyorsa gereken boşlukları açıkça `{' '}` kullanarak ekle.
* Paylaşılan componentlerde değişiklik yaptıktan sonra başlıkları, butonları, breadcrumbs öğelerini, navigasyon etiketlerini, çevrilmiş metinleri, inline linkleri ve `strong`, `em`, `span` içeriğini görsel olarak kontrol et.

### Dev server ve ajan çalışma akışı

* Mümkün olduğunda Astro ve Antigravity’nin dev server yönetimini kullan.
* Yeni bir dev server başlatmadan önce halihazırda çalışan bir sunucu olup olmadığını kontrol et.
* Birbirinin aynısı ikinci dev server süreçleri başlatma ve çalışan bir süreci amacını belirlemeden kapatma.
* Structured log veya arka plan sunucu özelliklerini yalnızca görev fayda sağladığında kullan.
* Doğrulama tamamlandıktan sonra gereksiz uzun süre çalışan process bırakma.

### Tamamlamadan önce doğrulama

* Mevcut proje doğrulama scriptlerini kullanılabilir olduğunda çalıştır.
* Yapılandırılmışsa type checking çalıştır.
* Astro yapılandırması, routing, entegrasyon, Markdown veya deployment değişikliğinden sonra production build çalıştır.
* Görsel çıktı değişmiş olabilecekse etkilenen sayfaları tarayıcıda incele.
* Çok dilli projelerde en azından etkilenen dil route’larını ve language switcher davranışını doğrula.
* Final raporda şunları belirt:
  1. Değiştirilen dosyalar.
  2. Eklenen, kaldırılan veya bilinçli olarak eklenmeyen bağımlılıklar.
  3. Doğrulama ve build sonuçları.
  4. Gerekli kalan manuel işlemler.

### Minimum değişiklik ilkesi

* Yeni framework veya paket eklemeden önce Astro’nun yerleşik kabiliyetlerini tercih et.
* “Belki lazım olur” diye bağımlılık ekleme.
* Görev açıkça gerektirmedikçe Tailwind, TypeScript, UI kütüphaneleri, routing, deployment veya proje yapısını değiştirme.
* Mevcut proje düzenini; Astro 7, güncel resmi dokümantasyon, doğruluk, güvenlik veya build güvenilirliğiyle çelişmediği sürece koru.

