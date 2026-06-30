import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const writings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writings' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    external_url: z.string().optional(),
  }),
})

export const collections = { writings }