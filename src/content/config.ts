import { defineCollection, z } from 'astro:content';

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('General'),
    date: z.coerce.date(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('AI Notes'),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    provider: z.string(),
    status: z.enum(['not-started', 'in-progress', 'completed']).default('in-progress'),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    certificateUrl: z.string().url().optional(),
  }),
});

export const collections = { resources, notes, courses };
