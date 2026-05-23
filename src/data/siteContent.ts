// Deprecated compatibility layer.
// Site text now lives in:
// - src/content/site/{tr,en,bs}.json
// - src/content/localized/{tr,en,bs}/*.mdx
// Shared locale helpers live in src/lib/site.ts

export type { Locale } from '../lib/site';
export {
  defaultLocale,
  getLocalePath,
  getLocalizedPath,
  localeLabels,
  locales,
} from '../lib/site';
