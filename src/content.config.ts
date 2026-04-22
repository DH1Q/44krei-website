import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const updatedSchema = z.union([z.string(), z.date()]).transform((value) => {
  if (typeof value === "string") return value;
  return value.toISOString().slice(0, 10);
});

const siteCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/site",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    contentType: z.enum(["article", "project", "work"]),
    statusLabel: z.string(),
    status: z.enum(["ongoing", "published", "planned"]),
    description: z.string(),
    summary: z.string(),
    stage: z.string(),
    metrics: z.array(metricSchema),
    keyPoints: z.array(z.string()),
    closing: z.string(),
    updated: updatedSchema,
  }),
});

export const collections = {
  site: siteCollection,
};
