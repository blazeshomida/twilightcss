import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({}),
});
