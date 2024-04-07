import { describe, expect, it } from "vitest";
import {
  definePrimitives,
  defineShadcnTheme,
  defineTheme,
} from "../lib/config-definers";
import { createTwilight } from "../lib/createTwilight";
type Config = {
  variant: "primary" | "secondary";
  color:
    | "neutral"
    | "red"
    | "green"
    | "blue"
    | "pink"
    | "yellow"
    | "purple"
    | "orange";
  shade:
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "950";
};
const primitives = definePrimitives<Config>({
  neutral: {
    "50": "#fafafa",
    "300": "#d4d4d4",
    "700": "#3f3f46",
    "900": "#18181b",
    "950": "#0a0a0a",
  },
  red: {
    "500": "#ef4444",
  },
});

describe("createTwilight(no-type): with tailwindcss theme, no type passed should default to tailwindcss", () => {
  const darkTheme = defineTheme<Config>({
    selectors: [".dark", ":root"],
    media: [["(prefers-color-scheme: dark)", ":root"]],
    tokens: {
      textColor: {
        neutral: {
          primary: "neutral-50",
          secondary: "neutral-300",
        },
        red: {
          primary: "red-500",
        },
      },
      backgroundColor: {
        neutral: {
          primary: "neutral-950",
        },
        red: {
          primary: "red-500",
        },
      },
      borderColor: {
        neutral: {
          primary: "neutral-700",
        },
      },
    },
  });

  const { twilightColors, twilightExtends } = createTwilight(primitives, {
    themes: [darkTheme],
  });
  it("twilightColors: maps primitives to the primitives css custom properties for tailwind", () => {
    expect(twilightColors).toStrictEqual({
      neutral: {
        "50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
        "300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
        "700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
        "900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
        "950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      },
      red: { "500": "oklch(var(--clr-red-500) / <alpha-value>)" },
    });
  });

  it("twilightExtends: maps tokens to the tokens css custom properties for tailwind", () => {
    expect(twilightExtends).toStrictEqual({
      textColor: {
        neutral: {
          primary: "oklch(var(--text-neutral-primary) / <alpha-value>)",
          secondary: "oklch(var(--text-neutral-secondary) / <alpha-value>)",
        },
        red: { primary: "oklch(var(--text-red-primary) / <alpha-value>)" },
      },
      backgroundColor: {
        neutral: {
          primary: "oklch(var(--bg-neutral-primary) / <alpha-value>)",
        },
        red: { primary: "oklch(var(--bg-red-primary) / <alpha-value>)" },
      },
      borderColor: {
        neutral: {
          primary: "oklch(var(--border-neutral-primary) / <alpha-value>)",
        },
      },
    });
  });
});
describe("createTwilight(tailwindcss): with tailwindcss theme, type tailwindcss passed", () => {
  const darkTheme = defineTheme<Config>({
    selectors: [":root"],
    media: [["(prefers-color-scheme: dark)", ":root"]],
    tokens: {
      textColor: {
        neutral: {
          primary: "neutral-50",
          secondary: "neutral-300",
        },
        red: {
          primary: "red-500",
        },
      },
      backgroundColor: {
        neutral: {
          primary: "neutral-950",
        },
        red: {
          primary: "red-500",
        },
      },
      borderColor: {
        neutral: {
          primary: "neutral-700",
        },
      },
    },
  });

  const { twilightColors, twilightExtends } = createTwilight(primitives, {
    type: "tailwindcss",
    themes: [darkTheme],
  });
  it("twilightColors: maps primitives to the primitives css custom properties for tailwind", () => {
    expect(twilightColors).toStrictEqual({
      neutral: {
        "50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
        "300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
        "700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
        "900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
        "950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      },
      red: { "500": "oklch(var(--clr-red-500) / <alpha-value>)" },
    });
  });

  it("twilightExtends: maps tokens to the tokens css custom properties for tailwind", () => {
    expect(twilightExtends).toStrictEqual({
      textColor: {
        neutral: {
          primary: "oklch(var(--text-neutral-primary) / <alpha-value>)",
          secondary: "oklch(var(--text-neutral-secondary) / <alpha-value>)",
        },
        red: { primary: "oklch(var(--text-red-primary) / <alpha-value>)" },
      },
      backgroundColor: {
        neutral: {
          primary: "oklch(var(--bg-neutral-primary) / <alpha-value>)",
        },
        red: { primary: "oklch(var(--bg-red-primary) / <alpha-value>)" },
      },
      borderColor: {
        neutral: {
          primary: "oklch(var(--border-neutral-primary) / <alpha-value>)",
        },
      },
    });
  });
});

describe("createTwilight(shadcn): with tailwindcss theme, type shadcn passed", () => {
  const dark = defineShadcnTheme<Config>({
    selectors: [".dark"],
    media: ["(prefers-color-scheme: dark)", ":root"],
    tokens: {
      background: "neutral-950",
      foreground: "neutral-50",
      primary: "red-100",
      "primary-foreground": "red-600",
      secondary: "blue-100",
      "secondary-foreground": "blue-600",
      accent: "green-100",
      "accent-foreground": "green-600",
    },
  });

  const light = defineShadcnTheme<Config>({
    selectors: [":root", ".light"],
    media: ["(prefers-color-scheme: light)", ":root"],
    tokens: {
      background: "neutral-50",
      foreground: "neutral-950",
      primary: "red-600",
      "primary-foreground": "red-50",
      secondary: "blue-600",
      "secondary-foreground": "blue-50",
      accent: "green-600",
      "accent-foreground": "green-50",
    },
  });
  const { twilightColors, twilightExtends } = createTwilight<Config>(
    primitives,
    {
      type: "shadcn",
      themes: [light, dark],
    }
  );

  it("twilightColors: maps primitives to the primitives css custom properties for tailwind", () => {
    expect(twilightColors).toStrictEqual({
      neutral: {
        "50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
        "300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
        "700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
        "900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
        "950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      },
      red: { "500": "oklch(var(--clr-red-500) / <alpha-value>)" },
    });
  });

  it("twilightExtends: maps tokens to the tokens css custom properties for tailwind", () => {
    expect(twilightExtends).toStrictEqual({
      colors: {
        background: {
          DEFAULT: "oklch(var(--background) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "oklch(var(--foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
      },
    });
  });
});
