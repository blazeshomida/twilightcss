# TwilightCSS

## Introduction

TwilightCSS provides a streamlined, powerful theming solution for TailwindCSS, designed for developers across all TypeScript proficiency levels. It facilitates dynamic and flexible theme creation within a structured, user-friendly framework.

> **Documentation in Progress:** For more details and updates, check out the [docs directory](https://github.com/blazeshomida/twilightcss/tree/main/apps/docs/src/content/docs) in our repository.

## Installation

Install TwilightCSS with your preferred package manager:

```sh
# Using pnpm
pnpm install -D @twilightcss/twilightcss

# Using npm
npm install --save-dev @twilightcss/twilightcss

# Using yarn
yarn add -D @twilightcss/twilightcss
```

## Usage

Implement TwilightCSS in your project in four straightforward steps, each enhanced with TypeScript for better insight and productivity.

> **Note:** TwilightCSS is continuously evolving; changes are documented as they are made.

### Step 1: Define Config Types

First, define your configuration types. This step utilizes TypeScript for autocompletion and type-checking to guide your theme's structure.

**Base Configuration Example:**

```typescript
type BaseConfig = {
  color: string;
  shade: string;
  variant: string;
};
```

**Expand with MyConfig:**

Here, specify your theme's colors, shades, and variants. Utilize Union Types for sets of permissible values, offering flexibility in naming conventions and styles.

```typescript
type MyConfig = {
  // Semantic labels or visual names like "red", "green", "blue".
  color: "brand" | "error" | "success" | "accent";
  // Numeric values for intensity or descriptive like "lightest", "light", "dark", "darkest".
  shade: "50" | "100" | "800" | "900";
  // Define variants to tailor to different UI components or states.
  variant: "primary" | "secondary" | "tertiary";
};
```

**Advanced Variants with Template Literals:**

Combine base variants with states using template literal types for dynamic, extensive options, fully supported by TypeScript.

```typescript
type MyVariant = "primary" | "secondary";
type MyState = "hover" | "pressed" | "focused";
// Generates combinations such as "primary-hover", "secondary-pressed"
type MyVariantState = `${MyVariant}-${MyState}`;
```

### Step 2: Define Primitives

Define your color primitives with `definePrimitives<MyConfig>()`, customizing the function to fit your configuration precisely.

**Primitives Example:**

```typescript
import { definePrimitives, tailwindPrimitives } from "@twilightcss/twilightcss";

const primitives = definePrimitives<MyConfig>({
  brand: {
    // Any valid CSS color string is usable here.
    "50": "#E3F2FD", // Lightest brand shade
    "900": "#0D47A1", // Darkest brand shade
  },
  error: tailwindPrimitives.red, // Tailwind's predefined colors for convenience
  // Additional colors as needed...
});
```

### Step 3: Define Themes

Create themes with `defineTheme<MyConfig>()`, ensuring alignment with your config. Note: For Shadcn themes, switch `type` to "shadcn" in `createTwilight()`.

**Tailwind Theme Example:**

```typescript
import { defineTheme } from "@twilightcss/twilightcss";

const tailwindLightTheme = defineTheme<MyConfig>({
  selectors: [":root", "[data-theme='light']"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    textColor: {
      brand: { primary: "brand-900", secondary: "brand-50" },
      // Expand with more definitions as needed...
    },
    // Define additional tokens for backgroundColor, borderColor, etc...
  },
});
```

**Shadcn Theme Example:**

```typescript
import { defineShadcnTheme } from "@twilightcss/twilightcss";

const shadcnLightTheme = defineShadcnTheme<MyConfig>({
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    background: "brand-50",
    foreground: "brand-900",
    primary: "error-800",
    "primary-foreground": "error-50",
    // Additional tokens...
  },
});
```

> Note: To use Shadcn themes, set the `type` in `createTwilight()` to "shadcn" and define themes using `defineShadcnTheme<MyConfig>()`. Tailwind and Shadcn themes have separate handling mechanisms and are not interchangeable within the same `type`.

### Step 4: Integrate with Tailwind Configuration

Finalize by integrating TwilightCSS with your Tailwind configuration using `createTwilight`, combining your themes into a unified setup.

**Integration Example:**

```typescript
import { createTwilight } from "@twilightcss/twilightcss";

const { twilightColors, twilightExtends, twilightPlugin } =
  createTwilight<MyConfig>(primitives, {
    themes: [tailwindLightTheme], // Array of your themes
  });

/*
const { twilightColors, twilightExtends, twilightPlugin } = createTwilight<MyConfig>(
  primitives,
  {
    type: "shadcn", // Use "shadcn" for Shadcn themes; defaults to 'tailwindcss'
    themes: [shadcnLightTheme], // Array of your themes
  }
);
*/

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: { ...twilightColors },
    extend: { ...twilightExtends },
  },
  plugins: [twilightPlugin],
};
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GitHub Repository](https://github.com/blazeshomida/twilightcss) - For contributions, issues, and feature requests.

## Conclusion

TwilightCSS simplifies the theming process in TailwindCSS with a type-safe, structured approach, supporting a scalable and maintainable design system.

## Contributing

Contributions are welcome! Whether reporting bugs, suggesting features, or submitting pull requests, your involvement helps improve TwilightCSS for everyone.
