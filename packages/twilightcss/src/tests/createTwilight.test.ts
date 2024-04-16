import { describe, expect, it } from "vitest";
import { createTwilight, PrimitiveConfig, TwTheme, ShadcnTheme } from "@/index";
import { DEFAULT_PRIMITIVES } from "@/core/constants";

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
const primitives: PrimitiveConfig<Config> = {
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
};

const tailwindDarkTheme: TwTheme<Config> = {
  selectors: ":root",
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
};

describe("createTwilight(no-type): with tailwindcss theme, no type passed should default to tailwindcss", () => {
  const { twilightColors, twilightExtends } = createTwilight(primitives, {
    themes: [tailwindDarkTheme],
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
      ...DEFAULT_PRIMITIVES,
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
  it("twilightColors: maps primitives to the primitives css custom properties for tailwind", () => {
    const darkTheme: TwTheme<Config> = {
      selectors: ":root",
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
    };

    const { twilightColors, twilightExtends } = createTwilight(primitives, {
      type: "tailwindcss",
      themes: [darkTheme],
    });
    expect(twilightColors).toStrictEqual({
      neutral: {
        "50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
        "300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
        "700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
        "900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
        "950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      },
      red: { "500": "oklch(var(--clr-red-500) / <alpha-value>)" },
      ...DEFAULT_PRIMITIVES,
    });
  });

  it("twilightExtends: maps tokens to the tokens css custom properties for tailwind", () => {
    const { twilightExtends } = createTwilight(primitives, {
      type: "tailwindcss",
      themes: [tailwindDarkTheme],
    });
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

const shadcnDark: ShadcnTheme<Config> = {
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
};

const shadcnLight: ShadcnTheme<Config> = {
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
};

const shadcnInvalidDark: ShadcnTheme<Config> = {
  selectors: [".dark"],
  media: ["(prefers-color-scheme: dark)", ":root"],
  tokens: {
    "": "neutral-950",
    foreground: "neutral-50",
    primary: "red-100",
    "-foreground": "red-600",
    secondary: "blue-100",
    "secondary-foreground": "blue-600",
    accent: "green-100",
    "accent-foreground": "green",
  },
};

const shadcnInvalidLight: ShadcnTheme<Config> = {
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    "": "neutral-50",
    foreground: "neutral-950",
    "-foreground": "blue-300",
    secondary: "blue-600",
    "secondary-foreground": "blue-50",
    accent: "green-600",
    "accent-foreground": "green-50",
  },
};
describe("createTwilight(shadcn): with tailwindcss theme, type shadcn passed", () => {
  it("twilightColors: maps primitives to the primitives css custom properties for tailwind", () => {
    const { twilightColors } = createTwilight<Config>(primitives, {
      type: "shadcn",
      themes: [shadcnLight, shadcnDark],
    });
    expect(twilightColors).toStrictEqual({
      neutral: {
        "50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
        "300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
        "700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
        "900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
        "950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      },
      red: { "500": "oklch(var(--clr-red-500) / <alpha-value>)" },
      ...DEFAULT_PRIMITIVES,
    });
  });

  it("twilightExtends: maps tokens to the tokens css custom properties for tailwind", () => {
    const { twilightExtends } = createTwilight<Config>(primitives, {
      type: "shadcn",
      themes: [shadcnLight, shadcnDark],
    });
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

  it("should filter out invalid values", () => {
    const { twilightExtends } = createTwilight<Config>(primitives, {
      type: "shadcn",
      themes: [shadcnInvalidLight, shadcnInvalidDark],
    });
    expect(twilightExtends).toStrictEqual({
      colors: {
        foreground: {
          DEFAULT: "oklch(var(--foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
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
