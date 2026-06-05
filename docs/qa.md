# Astro QA Checklist

Bu dosya Astro tarafindaki parity, responsive ve tema kontrolleri icin calisma listesi olarak kullanilir.

## Amac

- `agents.md` icindeki acik maddeleri uygulanabilir QA adimlarina cevirmek
- Otomatik test kapsamini netlestirmek
- Manuel kontrol gereken alanlari tek yerde toplamak
- Blogger aktarimi icin referans screenshot disiplinini standardize etmek

## Hizli Akis

1. `npm run build`
2. `npm run test:e2e`
3. Tasarim degisikligi varsa `npm run test:e2e:update`
4. Manuel parity turunu uygula
5. Gerekliyse Blogger icin screenshot setini guncelle

## Otomatik Kapsam

| Alan | Durum | Not |
| :-- | :-- | :-- |
| Build smoke test | Var | `npm run build` |
| TR / EN / BS hero visual baseline | Var | Playwright snapshot |
| TR about visual baseline | Var | Playwright snapshot |
| TR service visual baseline | Var | Playwright snapshot |
| TR skills visual baseline | Var | Playwright snapshot |
| TR portfolio visual baseline | Var | Playwright snapshot |
| TR mobile hero visual baseline | Var | Mobile Playwright snapshot |
| TR tablet hero visual baseline | Var | Tablet viewport Playwright snapshot |
| TR mobile links visual baseline | Yok | Mobile Chromium'da kararsiz; manuel parity ile izleniyor |
| TR mobile portfolio visual baseline | Var | Mobile Playwright snapshot |
| TR tablet portfolio visual baseline | Var | Tablet viewport Playwright snapshot |
| Header theme toggle | Var | Desktop interaction testi |
| Header sticky state | Var | Desktop interaction testi |
| Mobil menu ac/kapa | Var | Mobile interaction testi |
| Skills mobile accordion | Var | Tek panel acik kalma davranisi dogrulaniyor |
| Portfolio filter | Var | Desktop interaction testi |
| Portfolio mobile pagination | Var | Mobile interaction testi |
| Root locale redirect | Var | Desktop routing testi |
| Links locale redirect | Var | Desktop routing testi |
| Links page visual baseline | Var | Links ana karti icin Playwright snapshot |
| Contact smoke test | Var | Form ve harita wrapper gorunurlugu dogrulaniyor |
| Contact visual baseline | Var | Iframe gizlenerek section bazli Playwright snapshot |
| News smoke test | Var | Feed success ve localized fallback akislari dogrulaniyor |
| News visual baseline | Var | Mocked Blogger feed ile section bazli Playwright snapshot |
| Full-page screenshot parity | Bilerek yok | Dinamik alanlar yerine section bazli baseline tercih ediliyor |

## Manuel Parity Turu

Asagidaki tur hem light hem dark modda yapilmali.

### Header

- Logo boyutu desktop ve mobile'da dengeli mi
- Sticky oldugunda yukseklik beklenen gibi daraliyor mu
- Aktif nav link rengi dogru section ile eslesiyor mu
- Dil secici desktop ve mobile'da tasma yapiyor mu
- Tema toggle ikonlari dogru gorunuyor mu

### Hero

- Sol kolonun baslangic hatti referans tasarima yakin mi
- Avatar boyutu desktop ve mobile'da dogru mu
- Floating skill badge konumlari tasarimi bozuyor mu
- Divider alt gecisi temiz mi
- Typing effect ilk render sirasinda layout shift olusturuyor mu

### About

- Notebook karti ve sticker grid bosluklari dengeli mi
- Dark modda kontrast yeterli mi
- Stat kartlari birbirine gore tutarli mi

### Service

- Kartlarin yukseklik ve spacing dengesi bozulmamis mi
- Light / dark zeminde glow etkileri kirik gorunuyor mu

### Skills

- Desktop timeline / column yerlesimi temiz mi
- Mobile accordion davranisi tutarli mi
- Rozet, border ve ikon renkleri tema ile uyumlu mu

### Portfolio

- Filtre satiri satir kirilimlarinda duzgun mu
- Desktop'ta filtre degisince sadece dogru kartlar kaliyor mu
- Mobile'da pagination 3 kartlik akisi koruyor mu
- Kart hover davranisi ve logo kontrasti her iki temada da okunakli mi

### Contact

- Form spacing ve input kontrasti yeterli mi
- Harita iframe'i her iki temada da dogru ton veriyor mu
- Alt brush / divider gecisleri bozulmamis mi

## Responsive Turu

En az su kirilimlarda kontrol yap:

- `393x851` civari mobil
- `768x1024` tablet
- `1440x2200` desktop

Odak noktalar:

- Mobil menu acildiginda sayfa akisi bozuluyor mu
- Hero metni cok satira dustugunde avatarla cakisma oluyor mu
- Skills mobile accordion'lari art arda kullanilabilir mi
- Portfolio filtreleri ve pagination tek elle kullanilabilir mi
- Footer linkleri dar ekranda tasma yapiyor mu

## Tema Turu

Her parity turunda su kontrol edilmeli:

- `html.dark` sinifi ile beklenen dark utility'ler aktif mi
- Acik mod zeminleri fazla gri / koyu kalmis mi
- Koyu modda metin kontrasti dusuyor mu
- Hover durumlari iki temada da gorunur mu
- Section gecisleri light ve dark modda birbiriyle uyumlu mu

## Screenshot Disiplini

Astro tarafi icin screenshot seti:

- TR hero light / dark
- EN hero light / dark
- BS hero light / dark
- TR about light / dark
- TR service light / dark
- TR skills light / dark
- TR portfolio light / dark
- TR mobile hero light / dark
- TR tablet hero light / dark
- TR mobile portfolio light / dark
- TR tablet portfolio light / dark
- TR contact light / dark
- TR news light / dark

Blogger parity icin ayrica alinmali:

- Header
- Hero
- Hero alti divider
- Post grid
- Footer

## Container Stratejisi

Benimsenen yapi:

- `.container` ana sayfa icin varsayilan shell olarak kalir
- `.container-narrow` metin ve form agirlikli section'larda kullanilir
- `.container-wide` daha genis kompozisyon ihtiyaclari icin hazirdir

Mevcut uygulama:

- `Header`, `Home`, `About`, `Portfolio` -> `.container-wide`
- `News`, `Contact`, `CopyRight` -> `.container-narrow`
- Diger ana sayfa section'lari -> `.container`

Not:

- `Links` sayfasi ayri layout ve kart max-width mantigi ile ilerledigi icin bu primitive'den bagimsiz kalabilir
- Blogger parity turunda ihtiyac olursa sadece `--container-max` degerleri ayarlanarak sistem genisletilebilir

## Sonuc Kaydi

Her parity turundan sonra asagidaki formatta kisa not birak:

```md
## YYYY-MM-DD

- Build: gecti / kaldi
- E2E: gecti / kaldi
- Light mode: temiz / sorun var
- Dark mode: temiz / sorun var
- Responsive: temiz / sorun var
- Notlar:
```

## 2026-06-05

- Build: gecti
- E2E: gecti
- Light mode: otomatik kapsam temiz
- Dark mode: otomatik kapsam temiz
- Responsive: otomatik kapsam buyuk olcude temiz
- Notlar: Contact ve News section visual baseline'lari eklendi. Kalan maddeler Blogger parity screenshot seti ve `.container` karari gibi urun/manuel kararlar.
