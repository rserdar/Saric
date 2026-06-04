import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/localized' }),
  schema: z.object({
    locale: z.enum(['tr', 'en', 'bs']),
    section: z.enum(['about']),
    title: z.string().optional(),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/site' }),
  schema: z.object({
    nav: z.object({
      home: z.string(),
      about: z.string(),
      portfolio: z.string(),
      service: z.string(),
      blog: z.string(),
      contact: z.string(),
      cv: z.string(),
    }),
    hero: z.object({
      greeting: z.string(),
      typedPrefix: z.string(),
      typedSuffix: z.string(),
      highlightLocationFirst: z.boolean().optional(),
      typedWords: z.array(z.string()),
      bio: z.string(),
      batmanPhrase: z.string(),
      cta: z.string(),
    }),
    about: z.object({
      tag: z.string(),
      title: z.string(),
      stats: z.object({
        yearsLabel: z.string(),
        certificationsLabel: z.string(),
        projectsLabel: z.string(),
        projectsValue: z.string(),
      }),
    }),
    skills: z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
    }),
    skillBars: z.array(z.object({
      name: z.string(),
      value: z.number(),
      color: z.string(),
    })),
    services: z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        title: z.string(),
        text: z.string(),
        iconKey: z.enum(['audit', 'ohs', 'web', 'automation']),
      })),
    }),
    portfolio: z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        title: z.string(),
        category: z.string(),
        categoryKey: z.string(),
        description: z.string(),
      })),
    }),
    testimonials: z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        name: z.string(),
        profession: z.string(),
        details: z.string(),
      })),
    }),
    blog: z.object({
      tag: z.string(),
      title: z.string(),
      fallback: z.string(),
    }),
    newsletter: z.object({
      tag: z.string(),
      title: z.string(),
      text: z.string(),
      cta: z.string(),
    }),
    contact: z.object({
      tag: z.string(),
      title: z.string(),
      description: z.string(),
      locationTitle: z.string(),
      locationText: z.string(),
      webTitle: z.string(),
      fields: z.object({
        name: z.string(),
        email: z.string(),
        subject: z.string(),
        message: z.string(),
        submit: z.string(),
      }),
    }),
    footer: z.object({
      credit: z.string(),
      policy: z.string(),
    }),
  }),
});

export const collections = { localized, site };
