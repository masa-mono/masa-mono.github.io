import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedFields = {
  locale: z.enum(['ja', 'en']),
  translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  draft: z.boolean(),
  updatedAt: z.coerce.date(),
};

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object(localizedFields),
});

const insights = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/insights',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object(localizedFields),
});

export const collections = { pages, insights };
