import { twilightPrimitives, twilightTokens, twilightPlugin } from "./twilight";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: { ...twilightPrimitives },
    extend: { ...twilightTokens },
  },
  plugins: [twilightPlugin],
};
