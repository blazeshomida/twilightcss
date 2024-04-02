## Getting Started with TwilightCSS

Welcome to TwilightCSS! This guide will walk you through installing TwilightCSS and setting up a basic theming structure for your TailwindCSS project. By the end, you'll have a dynamic and flexible theming system ready to be customized and extended.

## Installation

Begin by installing TwilightCSS using your preferred package manager:

```sh
# Using pnpm
pnpm install -D @blazeshomida/twilightcss

# Using npm
npm install --save-dev @blazeshomida/twilightcss

# Using yarn
yarn add -D @blazeshomida/twilightcss
```

## Quick Start

### 1. Define Your Config Type

Start by defining the `MyConfig` type to specify the colors, shades, and variants used in your project. This step enhances autocompletion and ensures consistency:

```typescript
// src/types/myConfig.ts
type MyConfig = {
  color: "red" | "green" | "blue"; // Visual names like colors or semantic labels such as 'error', 'success', 'brand'
  shade: "50" | "100" | "800" | "900"; // Numeric for intensity or descriptive like 'lightest', 'darkest', 'light', 'dark'
  variant: "primary" | "secondary" | "tertiary";
};
```

> Quick Tip:
> For **variants**, leverage **template literal types** to combine base variants with states, dynamically creating a rich set of options. TypeScript automatically handles the permutations:

```typescript
type MyVariant = "primary" | "secondary";
type MyState = "hover" | "pressed" | "focused";
type MyVariantState = MyVariant | `${MyVariant}-${MyState}`;
// Yields: "primary", "secondary", "primary-hover", "primary-pressed", etc.
```

### 2. Define Primitives

Next, define your color primitives using TwilightCSS's `definePrimitives`. This function enables you to specify the base colors for your theme with ease. You can utilize any css color string such as hsl, rgb, hex, etc, allowing you to define colors in a familiar syntax directly within your TypeScript files.

```typescript
// src/themes/primitives.ts
import { definePrimitives } from "@blazeshomida/twilightcss";

const primitives = definePrimitives<MyConfig>({
  brand: {
    "50": "hsl(0, 0%, 100%)", // Lightest brand shade defined using HSL
    "900": "rgb(255, 255, 10)", // Darkest brand shade defined using RGB
  },
  // Additional color categories can be defined in the same manner
});
```

### 3. Define Themes

Create your themes by defining how colors should be applied across different parts of your UI using `defineTheme`:

```typescript
// Example for a light theme: src/themes/lightTheme.ts
import { defineTheme } from "@blazeshomida/twilightcss";

const lightTheme = defineTheme<MyConfig>({
  selectors: [":root", "[data-theme='light']"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    textColor: {
      brand: { primary: "brand-500", secondary: "brand-800" },
      // Further color definitions...
    },
    // Define backgroundColor and borderColor similarly
  },
});
```

### 4. Integrate with Tailwind Configuration

Finally, integrate TwilightCSS with your Tailwind configuration to activate your themes:

```typescript
// Tailwind configuration file: tailwind.config.js or tailwind.config.ts
import { createTwilight } from "@blazeshomida/twilightcss";
import { primitives, lightTheme, darkTheme } from "./your-theme-definitions";

const { twilightColors, twilightExtends, twilightPlugin } = createTwilight(
  primitives,
  [lightTheme, darkTheme] // An array of themes you want to generate
);

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
