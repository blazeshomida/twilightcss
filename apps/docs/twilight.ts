import colors from "tailwindcss/colors";
import type { Theme, Shadcn } from "@twilightcss/twilightcss";
import { createTwilight } from "@twilightcss/twilightcss";
const TEST_PRIMITIVES = {
  black: "#010101", // Custom black color
  error: {
    DEFAULT: colors.red["600"], // Using DEFAULT key
    hover: colors.red["800"],
  },
  success: colors.green["600"], // Using colors from Tailwind (namespace)
  neutral: {
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
    // Testing HEX colors
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
    // Testing RGB colors
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

type Colors = keyof typeof TEST_PRIMITIVES;
type Variants = "primary" | "secondary";
type States = "hover" | "focus" | "active";

type Keys =
  | Colors
  | `${Colors}-${Variants}`
  | `${Colors}-${Variants}-${States}`;

const TEST_TAILWIND_DARK: Theme<typeof TEST_PRIMITIVES, Keys> = {
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
          hover: "pink-500",
          DEFAULT: "neutral-600",
        },
      },
    },
  },
};

const TEST_SHADCN_LIGHT: Shadcn.Theme<typeof TEST_PRIMITIVES> = {
  selectors: [":root", ".light"],
  media: ["(prefers-color-scheme: light)", ":root"],
  tokens: {
    colors: {
      background: "white",
      foreground: "black",
      primary: "neutral-950",
      "primary-foreground": "neutral-50",
      secondary: "purple-500",
      "secondary-foreground": "purple-50",
      accent: "pink-500",
      "accent-foreground": "pink-50",
      destructive: "error",
      "destructive-foreground": "neutral-50",
      border: "neutral-600",
    },
  },
};

const TEST_SHADCN_DARK: Theme<typeof TEST_PRIMITIVES, Shadcn.Tokens> = {
  selectors: ".dark",
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

export const twilightPlugin = createTwilight({
  primitives: TEST_PRIMITIVES,
  themes: [TEST_SHADCN_LIGHT, TEST_SHADCN_DARK],
});
