import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('General'),
    date: z.coerce.date(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

// IDs mirror the file path (minus extension and trailing /index) so URLs follow folders:
//   courses/ml/index.md            -> "ml"
//   courses/ml/01-intro/02-foo.md  -> "ml/01-intro/02-foo"
const pathId = ({ entry }: { entry: string }) =>
  entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '').toLowerCase();

// Course-level files: a single-file course (`my-course.md`) or a course folder's `index.md`.
const courses = defineCollection({
  loader: glob({
    pattern: ['*.{md,mdx}', '*/index.{md,mdx}'],
    base: './src/content/courses',
    generateId: pathId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    provider: z.string(),
    status: z.enum(['not-started', 'in-progress', 'completed']).default('in-progress'),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    url: z.url().optional(),
    certificateUrl: z.url().optional(),
  }),
});

// Course chapter content plus direct course pages (for courses such as RAG Time).
const courseNotes = defineCollection({
  loader: glob({
    pattern: ['*/*.{md,mdx}', '*/*/**/*.{md,mdx}'],
    base: './src/content/courses',
    generateId: pathId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.url().optional(),
    order: z.number().optional(), // overrides the numeric filename prefix
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { resources, courses, courseNotes };
