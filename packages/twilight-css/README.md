# TwilightCSS

## Introduction

TwilightCSS brings a simple yet powerful theming solution to TailwindCSS, designed to be approachable for developers at any level of TypeScript proficiency. It guides you through creating dynamic and flexible themes with an easy-to-follow structure.

> Docs currently in progress. Feel free to check out the repos [docs](https://github.com/blazeshomida/twilightcss/tree/main/apps/docs/src/content/docs) package to view more details.

## Installation

Begin by installing TwilightCSS using your preferred package manager:

```sh
# Using pnpm
pnpm install -D @twilightcss/twilightcss

# Using npm
npm install --save-dev @twilightcss/twilightcss

# Using yarn
yarn add -D @twilightcss/twilightcss
```

## Usage

Embrace TwilightCSS in four easy steps, each augmented with TypeScript insights to enhance your understanding and productivity.

> Things may change frequently as I solidify my idea. I will try to document all changes as I proceed.

---

### Step 1: Define Config Types

**Defining your config types** is crucial for leveraging TypeScript's capabilities, such as autocompletion and type checking. Here's where you specify the building blocks of your theme.

Imagine `BaseConfig` as the foundation:

```typescript
type BaseConfig = {
  color: string;
  shade: string;
  variant: string;
};
```

Expand `BaseConfig` into `MyConfig` to precisely define your theme's colors, shades, and variants. You can use **Union Types** (`|`), which you can think of like the `or` operator, to specify a set of allowable values:

```typescript
type MyConfig = {
  color: "red" | "green" | "blue"; // Visual names like colors or semantic labels such as 'error', 'success', 'brand'
  shade: "50" | "100" | "800" | "900"; // Numeric for intensity or descriptive like 'lightest', 'darkest', 'light', 'dark'
  variant: "primary" | "secondary" | "tertiary";
};
```

For **variants**, leverage **template literal types** to combine base variants with states, dynamically creating a rich set of options. TypeScript automatically handles the permutations:

```typescript
type MyVariant = "primary" | "secondary";
type MyState = "hover" | "pressed" | "focused";
type MyVariantState = MyVariant | `${MyVariant}-${MyState}`;
// Yields: "primary", "secondary", "primary-hover", "primary-pressed", etc.
```

---

### Step 2: Define Primitives

With `MyConfig` established, proceed to **define your color primitives** using `definePrimitives<MyConfig>()`. This setup enriches the function with your specific configuration, ensuring tailored autocompletion and validation.

```typescript
import { definePrimitives } from "@twilightcss/twilightcss";
const primitives = definePrimitives<MyConfig>({
  brand: {
    "50": "hsl(0, 0%, 100%)", // Lightest brand shade
    "900": "rgb(255, 255, 10)", // Darkest brand shade
  },
  // Additional colors as needed
});
```

---

### Step 3: Define Themes

Creating themes with `defineTheme<MyConfig>()` allows you to define various aesthetic styles with precision. This step benefits from the detailed typing of your config, ensuring your themes align with your initial definitions.

```typescript
import { defineTheme } from "@twilightcss/twilightcss";
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

---

### Step 4: Integrate with Tailwind Configuration

Finally, **integrate your themes** into your Tailwind configuration. The `createTwilight` function compiles your primitives and themes into a coherent setup for TailwindCSS, bringing your custom themes to life.

```typescript
import { createTwilight } from "@twilightcss/twilightcss";
import { primitives, lightTheme } from "./your-theme-definitions";

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

---

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GitHub Repository](https://github.com/blazeshomida/twilightcss) - For contributions, issues, and feature requests

## Conclusion

TwilightCSS simplifies theming in TailwindCSS with an intuitive setup that encourages learning TypeScript along the way. By defining your themes through TypeScript, you gain autocompletion, type safety, and a structured approach to theming that can evolve with your project.

## Contributing

We welcome contributions to TwilightCSS! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, every contribution is valuable to us.
