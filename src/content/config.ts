import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.string(),
    img: image(),
    shortDec: z.string(),
    icon: z.object({
      svg: z.string(),
      iconBg: z.string(),
    }),
    dec: z.array(z.string()),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    img: image(),
    profession: z.string(),
    details: z.string(),
  }),
});

const portfolio = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.string(),
    categoryName: z.string(),
    img: image(),
    link: z.string(),
    type: z.enum(['youtube', 'vimeo', 'soundcloud', 'popup', 'detail']),
  }),
});

const partners = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    link: z.string(),
    logo: z.object({
      light: image(),
      dark: image(),
    }),
  }),
});

const site = defineCollection({
  type: 'data',
});

const localized = defineCollection({
  type: 'content',
});

export const collections = { services, testimonials, portfolio, partners, site, localized };
