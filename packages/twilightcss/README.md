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

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GitHub Repository](https://github.com/blazeshomida/twilightcss) - For contributions, issues, and feature requests.

## Conclusion

TwilightCSS simplifies the theming process in TailwindCSS with a flexible, structured approach, supporting scalable and maintainable design systems with or without TypeScript.

## Contributing

Contributions are welcome! Whether reporting bugs, suggesting features, or submitting pull requests, your involvement helps improve TwilightCSS for everyone.
