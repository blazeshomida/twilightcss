import { describe, expect, it } from "vitest";
import { createTwilight } from "..";
import {
  TEST_PRIMITIVES,
  TEST_SHADCN_DARK,
  TEST_SHADCN_LIGHT,
  TEST_TAILWIND_DARK,
} from "./example";
import { handlePrimitives } from "@/core/handlePrimitives";
import { handleThemes } from "@/core/handleThemes";

describe("handlePrimitives", () => {
  it("should return an object that maps primitives to css variables", () => {
    const { twilightPrimitives } = handlePrimitives(TEST_PRIMITIVES, "clr");
    expect(twilightPrimitives).toStrictEqual({
      inherit: "var(--clr-inherit) ",
      current: "var(--clr-current) ",
      transparent: "var(--clr-transparent)",
      black: "oklch(var(--clr-black) / <alpha-value>)",
      white: "oklch(var(--clr-white) / <alpha-value>)",
      error: "oklch(var(--clr-error) / <alpha-value>)",
      success: "oklch(var(--clr-success) / <alpha-value>)",
      "neutral-50": "oklch(var(--clr-neutral-50) / <alpha-value>)",
      "neutral-100": "oklch(var(--clr-neutral-100) / <alpha-value>)",
      "neutral-200": "oklch(var(--clr-neutral-200) / <alpha-value>)",
      "neutral-300": "oklch(var(--clr-neutral-300) / <alpha-value>)",
      "neutral-400": "oklch(var(--clr-neutral-400) / <alpha-value>)",
      "neutral-500": "oklch(var(--clr-neutral-500) / <alpha-value>)",
      "neutral-600": "oklch(var(--clr-neutral-600) / <alpha-value>)",
      "neutral-700": "oklch(var(--clr-neutral-700) / <alpha-value>)",
      "neutral-800": "oklch(var(--clr-neutral-800) / <alpha-value>)",
      "neutral-900": "oklch(var(--clr-neutral-900) / <alpha-value>)",
      "neutral-950": "oklch(var(--clr-neutral-950) / <alpha-value>)",
      "blue-50": "oklch(var(--clr-blue-50) / <alpha-value>)",
      "blue-100": "oklch(var(--clr-blue-100) / <alpha-value>)",
      "blue-200": "oklch(var(--clr-blue-200) / <alpha-value>)",
      "blue-300": "oklch(var(--clr-blue-300) / <alpha-value>)",
      "blue-400": "oklch(var(--clr-blue-400) / <alpha-value>)",
      "blue-500": "oklch(var(--clr-blue-500) / <alpha-value>)",
      "blue-600": "oklch(var(--clr-blue-600) / <alpha-value>)",
      "blue-700": "oklch(var(--clr-blue-700) / <alpha-value>)",
      "blue-800": "oklch(var(--clr-blue-800) / <alpha-value>)",
      "blue-900": "oklch(var(--clr-blue-900) / <alpha-value>)",
      "blue-950": "oklch(var(--clr-blue-950) / <alpha-value>)",
      "purple-50": "oklch(var(--clr-purple-50) / <alpha-value>)",
      "purple-100": "oklch(var(--clr-purple-100) / <alpha-value>)",
      "purple-200": "oklch(var(--clr-purple-200) / <alpha-value>)",
      "purple-300": "oklch(var(--clr-purple-300) / <alpha-value>)",
      "purple-400": "oklch(var(--clr-purple-400) / <alpha-value>)",
      "purple-500": "oklch(var(--clr-purple-500) / <alpha-value>)",
      "purple-600": "oklch(var(--clr-purple-600) / <alpha-value>)",
      "purple-700": "oklch(var(--clr-purple-700) / <alpha-value>)",
      "purple-800": "oklch(var(--clr-purple-800) / <alpha-value>)",
      "purple-900": "oklch(var(--clr-purple-900) / <alpha-value>)",
      "purple-950": "oklch(var(--clr-purple-950) / <alpha-value>)",
      "pink-50": "oklch(var(--clr-pink-50) / <alpha-value>)",
      "pink-100": "oklch(var(--clr-pink-100) / <alpha-value>)",
      "pink-200": "oklch(var(--clr-pink-200) / <alpha-value>)",
      "pink-300": "oklch(var(--clr-pink-300) / <alpha-value>)",
      "pink-400": "oklch(var(--clr-pink-400) / <alpha-value>)",
      "pink-500": "oklch(var(--clr-pink-500) / <alpha-value>)",
      "pink-600": "oklch(var(--clr-pink-600) / <alpha-value>)",
      "pink-700": "oklch(var(--clr-pink-700) / <alpha-value>)",
      "pink-800": "oklch(var(--clr-pink-800) / <alpha-value>)",
      "pink-900": "oklch(var(--clr-pink-900) / <alpha-value>)",
      "pink-950": "oklch(var(--clr-pink-950) / <alpha-value>)",
    });
  });
});

describe("handleThemes", () => {
  describe("tailwindcss", () => {
    it("should have tokens that match tailwind tokens", () => {
      const { twilightTokens } = handleThemes([TEST_TAILWIND_DARK], "clr");
      expect(twilightTokens).toStrictEqual({
        colors: {
          "neutral-primary":
            "oklch(var(--clr-neutral-primary) / <alpha-value>)",
        },
        textColor: {
          "neutral-primary":
            "oklch(var(--clr-text-neutral-primary) / <alpha-value>)",
          "neutral-secondary":
            "oklch(var(--clr-text-neutral-secondary) / <alpha-value>)",
          "error-primary":
            "oklch(var(--clr-text-error-primary) / <alpha-value>)",
        },
        backgroundColor: {
          "neutral-primary":
            "oklch(var(--clr-background-neutral-primary) / <alpha-value>)",
          "error-primary":
            "oklch(var(--clr-background-error-primary) / <alpha-value>)",
        },
        borderColor: {
          "neutral-primary-hover":
            "oklch(var(--clr-border-neutral-primary-hover) / <alpha-value>)",
          "neutral-primary":
            "oklch(var(--clr-border-neutral-primary) / <alpha-value>)",
        },
      });
    });
  });
  describe("shadcn", () => {
    it("should have tokens that match shadcn", () => {
      const { twilightTokens } = handleThemes(
        [TEST_SHADCN_LIGHT, TEST_SHADCN_DARK],
        "clr",
      );
      expect(twilightTokens).toStrictEqual({
        colors: {
          background: "oklch(var(--clr-background) / <alpha-value>)",
          foreground: "oklch(var(--clr-foreground) / <alpha-value>)",
          primary: "oklch(var(--clr-primary) / <alpha-value>)",
          "primary-foreground":
            "oklch(var(--clr-primary-foreground) / <alpha-value>)",
          secondary: "oklch(var(--clr-secondary) / <alpha-value>)",
          "secondary-foreground":
            "oklch(var(--clr-secondary-foreground) / <alpha-value>)",
          accent: "oklch(var(--clr-accent) / <alpha-value>)",
          "accent-foreground":
            "oklch(var(--clr-accent-foreground) / <alpha-value>)",
          destructive: "oklch(var(--clr-destructive) / <alpha-value>)",
          "destructive-foreground":
            "oklch(var(--clr-destructive-foreground) / <alpha-value>)",
        },
      });
    });
  });
});
