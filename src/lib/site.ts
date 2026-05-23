import { getEntry } from 'astro:content';
import { astroIcon, javascriptIcon, servicesIconSet, vscodeIcon } from '../data/siteIcons';

export type Locale = 'tr' | 'en' | 'bs';

export const locales: Locale[] = ['tr', 'en', 'bs'];
export const defaultLocale: Locale = 'tr';

export const localeLabels: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
  bs: 'BS',
};

export function getLocalePath(locale: Locale) {
  return locale === 'tr' ? '/' : `/${locale}/`;
}

export function getLocalizedPath(locale: Locale, anchor?: string) {
  const base = getLocalePath(locale);
  if (!anchor) return base;
  return `${base}${anchor.startsWith('#') ? anchor : `#${anchor}`}`;
}

const globals = {
  name: 'Serdar Yavuz',
  location: 'Antalya',
  web: 'links.serdar.cc',
  socials: [
    { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '#' },
    { name: 'X', icon: 'fa-brands fa-x-twitter', url: '#' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: '#' },
    { name: 'Behance', icon: 'fa-brands fa-behance', url: '#' },
  ],
} as const;

const heroFloatingIcons = [
  { name: 'Astro.js', bg: 'bg-white', color: '', svg: astroIcon },
  { name: 'JavaScript', bg: 'bg-[#2f2d2d]', color: '', svg: javascriptIcon },
  { name: 'VS Code', bg: 'bg-[#1e1e1e]', color: '', svg: vscodeIcon },
] as const;

const serviceIconMap = {
  audit: servicesIconSet.audit,
  ohs: servicesIconSet.ohs,
  web: servicesIconSet.web,
  automation: servicesIconSet.automation,
} as const;

const sharedMapEmbed = 'https://maps.google.com/maps?q=Muratpa%C5%9Fa%2C%20Antalya%2C%20Turkey&t=&z=13&ie=UTF8&iwloc=&output=embed';

export async function getSiteContent(locale: Locale) {
  const entry = await getEntry('site', locale);
  if (!entry) {
    throw new Error(`Missing site content for locale: ${locale}`);
  }

  return {
    locale,
    globals,
    nav: entry.data.nav,
    hero: entry.data.hero,
    heroFloatingIcons,
    about: entry.data.about,
    skills: entry.data.skills,
    skillBars: entry.data.skillBars,
    services: {
      ...entry.data.services,
      items: entry.data.services.items.map((item) => ({
        ...item,
        icon: serviceIconMap[item.iconKey],
      })),
    },
    portfolio: entry.data.portfolio,
    portfolioItems: entry.data.portfolio.items,
    testimonials: entry.data.testimonials,
    testimonialItems: entry.data.testimonials.items,
    blog: entry.data.blog,
    newsletter: entry.data.newsletter,
    contact: entry.data.contact,
    contactMapEmbed: sharedMapEmbed,
    footer: entry.data.footer,
  };
}
