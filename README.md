# Serdar Yavuz Portfolio

Pure Astro + Tailwind CSS v4 tabanli, cok dilli kisisel portfoy sitesi.

## Stack

- Astro 6
- Tailwind CSS v4
- `astro:content` ile locale bazli icerik
- `astro-icon` ile Font Awesome ikonlari
- Playwright ile temel gorsel ve etkileşim testleri

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Bagimliliklari kurar |
| `npm run dev` | Gelistirme sunucusunu baslatir |
| `npm run build` | Uretim build'i alir |
| `npm run preview` | Build cikisini lokal olarak sunar |
| `npm run test:e2e` | Playwright E2E testlerini calistirir |
| `npm run test:e2e:update` | Snapshot baseline dosyalarini gunceller |

## Routes

- `/` Türkçe ana sayfa
- `/en/` English home page
- `/bs/` Bosanski home page
- `/links`, `/en/links`, `/bs/links`

## Visual Regression

Playwright snapshot'lari `tests/e2e/home-visual.spec.ts-snapshots/` altinda tutulur.

Snapshot guncelleme akisi:

1. Tasarim degisikligini uygula.
2. `npm run test:e2e:update` calistir.
3. Uretilen snapshot farklarini kontrol et.

## CI

GitHub Actions workflow'u `.github/workflows/astro-quality.yml` dosyasinda.

Her `push` ve `pull_request` icin:

1. `npm ci`
2. Playwright Chromium kurulumu
3. `npm run build`
4. `npm run test:e2e`

## QA Notes

- Astro QA checklist: `docs/qa.md`
