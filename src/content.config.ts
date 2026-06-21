import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writings = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writings" }),
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()).default([]).optional(),
		date: z.date(),
		description: z.string(),
		keywords: z.string(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { writings };