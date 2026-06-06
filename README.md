# Serdar Yavuz Portfolio

Pure Astro + Tailwind CSS v4 tabanli, cok dilli kisisel portfoy sitesi.

## Stack

- Astro 6
- Tailwind CSS v4
- `astro:content` ile locale bazli icerik
- `astro-icon` ile Font Awesome ikonlari

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Bagimliliklari kurar |
| `npm run dev` | Gelistirme sunucusunu baslatir |
| `npm run build` | Uretim build'i alir |
| `npm run preview` | Build cikisini lokal olarak sunar |

## Routes

- `/` Türkçe ana sayfa
- `/en/` English home page
- `/bs/` Bosanski home page
- `/links`, `/en/links`, `/bs/links`

## CI

GitHub Actions workflow'u `.github/workflows/astro-quality.yml` dosyasinda.

Her `push` ve `pull_request` icin:

1. `npm ci`
2. `npm run build`
