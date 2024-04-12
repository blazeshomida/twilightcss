## Getting Started with TwilightCSS

Welcome to TwilightCSS! This guide will walk you through installing TwilightCSS and setting up a basic theming structure for your TailwindCSS project. By the end, you'll have a dynamic and flexible theming system ready to be customized and extended.

## Installation

Install TwilightCSS with your preferred package manager:

```sh
# Using pnpm
pnpm install -D @twilightcss/twilightcss

# Using npm
npm install -D @twilightcss/twilightcss

# Using yarn
yarn add -D @twilightcss/twilightcss
```

## Usage

Implement TwilightCSS in your project in three straightforward steps. Each step is designed to be flexible, allowing you to enhance your setup with TypeScript for better insight and productivity.

> **Note:** For TypeScript users, it's recommended to define your configurations using the exported types for strong typing. Begin by defining a `Config` type:

**Config Type Example:**

```typescript
// Define your configuration types for enhanced type safety and autocompletion.
type Config = {
  color: "brand" | "error" | "success" | "accent";
  shade: "50" | "100" | "800" | "900";
  variant: "primary" | "secondary" | "tertiary";
};
```

### Step 1: Define Primitives

Define your color primitives. If you are using TypeScript, leverage the `PrimitiveConfig<Config>` type for type safety.

**Primitives Example:**

```typescript
// For TypeScript:
import { PrimitiveConfig, tailwindPrimitives } from "@twilightcss/twilightcss";

const primitives: PrimitiveConfig<Config> = {
  brand: {
    "50": "#E3F2FD", // Lightest brand shade
    "900": "#0D47A1", // Darkest brand shade
  },
  error: tailwindPrimitives.red, // Tailwind's predefined colors for convenience
  // Additional colors...
};

// For JavaScript:
const primitives = {
  brand: {
    "50": "#E3F2FD",
    "900": "#0D47A1",
  },
  error: tailwindPrimitives.red,
  // Additional colors...
};
```

### Step 2: Define Themes

Create your themes. If you are using TypeScript, utilize `TwTheme` for Tailwind themes and `ShadcnTheme` for Shadcn components to ensure type safety and alignment with your config.

**Tailwind Theme Example:**

```typescript
// For TypeScript:
import { TwTheme } from "@twilightcss/twilightcss";

const tailwindLightTheme: TwTheme<Config> = {
  selectors: [":root", "[data-theme='light']"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    textColor: {
      brand: { primary: "brand-900", secondary: "brand-50" },
      // Expand with more definitions as needed...
    },
    // Additional tokens...
  },
};

// For JavaScript:
const tailwindLightTheme = {
  selectors: [":root", "[data-theme='light']"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    textColor: {
      brand: { primary: "brand-900", secondary: "brand-50" },
    },
    // Additional tokens...
  },
};
```

**Shadcn Theme Example:**

```typescript
// For TypeScript:
import { ShadcnTheme } from "@twilightcss/twilightcss";

const shadcnLightTheme: ShadcnTheme<Config> = {
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    background: "brand-50",
    foreground: "brand-900",
    primary: "error-800",
    "primary-foreground": "error-50",
    // Additional tokens...
  },
};

// For JavaScript:
const shadcnLightTheme = {
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    background: "brand-50",
    foreground: "brand-900",
    primary: "error-800",
    "primary-foreground": "error-50",
    // Additional tokens...
  },
};
```

> **Note on Shadcn Themes:** When using Shadcn themes with TwilightCSS, set the `type` parameter in `createTwilight()` to "shadcn" to ensure proper handling of these themes. Shadcn themes require specific configuration to align with the Shadcn component library, which differs from standard Tailwind theming. This setup allows you to maintain a cohesive look across different UI components by leveraging Shadcn-specific properties and tokens.

### Step 3: Integrate with Tailwind Configuration

Finalize by integrating TwilightCSS with your Tailwind configuration using `createTwilight()`. This function consolidates your themes into a unified setup tailored for either Tailwind or Shadcn themes.

**Integration Example:**

```typescript
import { createTwilight } from "@twilightcss/twilightcss";

// This setup utilizes your previously defined primitives and themes
const { twilightColors, twilightExtends, twilightPlugin } = createTwilight(
  primitives,
  {
    themes: [tailwindLightTheme], // Tailwind themes configuration
  }
);

// Uncomment the following block if you are using Shadcn themes
/*
const { twilightColors, twilightExtends, twilightPlugin } = createTwilight(
  primitives,
  {
    type: "shadcn", // Specifically for Shadcn themes
    themes: [shadcnLightTheme], // Shadcn themes configuration
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

## Next Steps

Congratulations on setting up TwilightCSS in your project! Explore the documentation to learn about advanced theming techniques, customization options, and how to contribute to the TwilightCSS community.
