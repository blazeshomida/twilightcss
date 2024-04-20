# TwilightCSS

## Introduction

TwilightCSS provides a streamlined, powerful theming solution for TailwindCSS, designed for developers across all TypeScript proficiency levels. It facilitates dynamic and flexible theme creation within a structured, user-friendly framework.

> **Documentation in Progress:** For more details and updates, check out the [docs directory](https://github.com/blazeshomida/twilightcss/tree/main/apps/docs/src/content/docs) in our repository.

## Features and Benefits

TwilightCSS elevates TailwindCSS projects by introducing a robust, TypeScript-powered theming system. This innovative tool simplifies the development workflow, significantly reducing redundancy and boosting the maintainability of themes.

### Key Features

- 💡 **TypeScript Integration and Centralized Theme Management**: TwilightCSS harnesses TypeScript for defining themes, ensuring type safety and autocompletion, alongside easier refactoring. This integration allows for quick updates and consistent application of themes across projects from a singular, centralized location, dramatically simplifying theme development and maintenance.

- 🔄 **Dynamic Theming Capabilities**: With TwilightCSS, switching between themes or adjusting theme properties is seamless, making it perfect for applications requiring multiple themes or dynamic user-selected themes. This dynamic capability, built atop a seamless integration with TailwindCSS, ensures developers familiar with TailwindCSS can easily implement versatile, dynamic theming strategies without stepping outside the Tailwind ecosystem.

- 🌉 **Extended Support for Shadcn Components**: Beyond its core functionality with TailwindCSS, TwilightCSS offers specialized support for theming Shadcn components. This feature represents a bridge between TailwindCSS's utility-first approach and the component-driven architecture of Shadcn, enabling developers to maintain a cohesive look and feel across diverse elements within their projects.

### Benefits

- 🚀 **Enhanced Productivity**: TwilightCSS's streamlined approach reduces manual effort in theme updates and leverages TypeScript's features to expedite the development process. Developers benefit from an accelerated project lifecycle, from initiation to deployment, thanks to a more intuitive theming process.

- 🛠️ **Improved Project Maintainability and Flexibility**: The fusion of centralized theme management with TypeScript’s robust capabilities not only enhances project scalability and adaptability but also simplifies the task of maintaining a consistent design language across large projects. Furthermore, TwilightCSS's ability to customize and extend themes—including Shadcn components—ensures that projects can grow and evolve without losing coherence or aesthetic appeal.

TwilightCSS is tailored specifically for TailwindCSS, with added capabilities for seamless theming of Shadcn components, making it an ideal solution for developers seeking to create customizable, dynamic user experiences with ease. This focus on compatibility and extendibility positions TwilightCSS as a forward-thinking toolkit for overcoming web development theming challenges.

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

To maximize the styling capabilities of your project with TwilightCSS, follow these straightforward steps. These steps are optimized for flexibility, enabling you to harness TypeScript for better productivity and enhanced type safety.

### Step 1: Define Primitives

Start by defining your color primitives. This initial step involves establishing your foundational color palette, which will underpin the themes you create. TwilightCSS integrates seamlessly with Tailwind's default colors, which are accessible through `tailwindcss/colors`.

**Primitives Example:**

> When using TypeScript, it's crucial to employ `as const` to ensure that your primitives are accurately typed. TypeScript treats untyped color values merely as strings, which can lead to type errors. This is because `createTwilight` relies on TypeScript's template literal types to validate that the provided color values are specified in acceptable CSS formats (such as RGB, HSL, or HEX). Using `as const` ensures that your colors are not widened to plain strings, maintaining their specific values which are necessary for `createTwilight` to operate correctly. This approach not only enforces type safety but also ensures that your color formats are correct, thus preventing runtime errors and enhancing the reliability of your code.

```typescript
import colors from "tailwindcss/colors";
const primitives = {
  black: "#010101", // Define a custom black color
  error: {
    DEFAULT: colors.red["500"], // Designate default color in a category using the 'DEFAULT' key
  },
  success: colors.green["500"], // Directly use Tailwind's predefined colors
  neutral: {
    // Using HSL colors
    "50": "hsl(0, 0%, 95%)",
    "100": "hsl(0, 0%, 90%)",
    "200": "hsl(0, 0%, 80%)",
    "300": "hsl(0, 0%, 70%)",
    "400": "hsl(0, 0%, 60%)",
    "500": "hsl(0, 0%, 50%)",
    "600": "hsl(0, 0%, 40%)",
    "700": "hsl(0, 0%, 30%)",
    "800": "hsl(0, 0%, 20%)",
    "900": "hsl(0, 0%, 10%)",
    "950": "hsl(0, 0%, 5%)",
  },
  blue: {
    "50": "hsl(240, 92%, 95%)",
    "100": "hsl(240, 88%, 90%)",
    "200": "hsl(240, 90%, 80%)",
    "300": "hsl(240, 90%, 70%)",
    "400": "hsl(240, 90%, 60%)",
    "500": "hsl(240, 90%, 50%)",
    "600": "hsl(240, 90%, 40%)",
    "700": "hsl(240, 90%, 30%)",
    "800": "hsl(240, 90%, 20%)",
    "900": "hsl(240, 88%, 10%)",
    "950": "hsl(240, 92%, 5%)",
  },
  purple: {
    // Using HEX colors
    "50": "#f2e8fd",
    "100": "#e4d1fa",
    "200": "#c9a3f5",
    "300": "#ae75f0",
    "400": "#9346ec",
    "500": "#7918e7",
    "600": "#6013b9",
    "700": "#480f8a",
    "800": "#300a5c",
    "900": "#18052e",
    "950": "#0c0217",
  },
  pink: {
    // Using RGB colors
    "50": "rgb(254, 231, 243)",
    "100": "rgb(252, 207, 231)",
    "200": "rgb(249, 159, 207)",
    "300": "rgb(247, 110, 183)",
    "400": "rgb(244, 62, 159)",
    "500": "rgb(241, 14, 135)",
    "600": "rgb(193, 11, 108)",
    "700": "rgb(145, 8, 81)",
    "800": "rgb(96, 6, 54)",
    "900": "rgb(48, 3, 27)",
    "950": "rgb(24, 1, 14)",
  },
} as const;
```

### Step 2: Define Themes

In this step, you will create your themes using the `Theme` type provided by TwilightCSS, which ensures type safety when working with TypeScript. The `Theme` type accepts two generic parameters: the first for your color primitives providing autocomplete, and the second which is **optional** for defining keys used in your tokens, enabling precise configuration of your theme properties.

When defining a theme, specify selectors or media queries (e.g., `(prefers-color-scheme: dark)`) to determine where and how the theme applies. You can define tokens for any Tailwind CSS configuration options such as `colors`, `backgroundColor`, `textColor`, `borderColor`, `accentColor`, etc. Utilizing the specific properties like `textColor` or `backgroundColor` allows you to restrict which utilities are generated, in contrast to the more global `colors` option that affects multiple utilities.

**Theme Example:**

```typescript
import type { Theme } from "@twilightcss/twilightcss";
type Colors = keyof typeof primitives; // Autocomplete for color primitives
type Variants = "primary" | "secondary";
type States = "hover" | "focus" | "active";

// Composite key types for flexible theme token definitions
type Keys =
  | Colors
  | `${Colors}-${Variants}`
  | `${Colors}-${Variants}-${States}`;

// Defining a dark theme for Tailwind CSS
const tailwindDark: Theme<typeof primitives, /* optional */ Keys> = {
  selectors: [":root", ".dark"],
  media: [["(prefers-color-scheme: dark)", ":root"]],
  tokens: {
    colors: {
      neutral: {
        primary: "neutral-300",
      },
    },
    textColor: {
      neutral: {
        primary: "neutral-50",
        secondary: "neutral-200",
      },
      error: {
        primary: "error",
      },
    },
    backgroundColor: {
      neutral: {
        primary: "neutral-950",
      },
      error: {
        primary: "error",
      },
    },
    borderColor: {
      neutral: {
        primary: {
          // You can use the 'DEFAULT' key which will produce 'border-neutral-primary'
          DEFAULT: "neutral-600",
          // Also with this you'll get 'border-neutral-primary-hover'
          hover: "neutral-500",
        },
      },
    },
  },
};
```

TwilightCSS also supports Shadcn component theming, using the `Shadcn` namespace to provide autocomplete for Shadcn-specific tokens. This feature ensures global accessibility of colors across different UI components.

```typescript
import type { Shadcn } from "@twilightcss/twilightcss";

// Light theme configuration for Shadcn components
const shadcnLight: Shadcn.Theme<typeof primitives> = {
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    colors: {
      background: "white",
      foreground: "black",
      primary: "neutral-950",
      "primary-foreground": "neutral-50",
      secondary: "purple-500",
      "secondary-foreground": "purple-950",
      accent: "pink-500",
      "accent-foreground": "pink-950",
      destructive: "error",
      "destructive-foreground": "neutral-50",
      // You can also add your own additional keys
      tertiary: "blue-600",
      "tertiary-foreground": "blue-100",
    },
  },
};

// Dark theme configuration for Shadcn components
const shadcnDark: Shadcn.Theme<typeof primitives> = {
  selectors: [".dark"],
  media: ["(prefers-color-scheme: dark)", ":root"],
  tokens: {
    colors: {
      background: "black",
      foreground: "white",
      primary: "neutral-50",
      "primary-foreground": "neutral-950",
      secondary: "purple-600",
      "secondary-foreground": "purple-100",
      accent: "pink-600",
      "accent-foreground": "pink-100",
      destructive: "error",
      "destructive-foreground": "neutral-50",
    },
  },
};
```

### Step 3: Integrate with Tailwind Configuration

Finalize by integrating TwilightCSS with your Tailwind configuration using `createTwilight`. This function consolidates your themes into a unified setup tailored for either Tailwind or Shadcn themes.

> [If you're getting a type error for your primitives double-check you have `as const` set for your primitives.](#step-1-define-primitives)

**Integration Example:**

```typescript
import { createTwilight } from "@twilightcss/twilightcss";

const { twilightPrimitives, twilightTokens, twilightPlugin } = createTwilight({
  primitives: primitives,
  themes: [shadcnLight, shadcnDark],
});

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: { ...twilightPrimitives },
    extend: { ...twilightTokens },
  },
  plugins: [twilightPlugin],
};
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GitHub Repository](https://github.com/blazeshomida/twilightcss) - For contributions, issues, and feature requests.

## Conclusion

TwilightCSS simplifies the theming process in TailwindCSS with a flexible, structured approach, supporting scalable and maintainable design systems with or without TypeScript.

## Contributing

Contributions are welcome! Whether reporting bugs, suggesting features, or submitting pull requests, your involvement helps improve TwilightCSS for everyone.
