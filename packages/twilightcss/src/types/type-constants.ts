import { NAMED_COLORS_ARRAY } from "@/core/constants";

// Type Constants
export type COLOR_MEDIA_QUERIES =
  | "(prefers-color-scheme: dark)"
  | "(prefers-color-scheme: light)"
  | "(prefers-color-scheme: no-preference)"
  | "(prefers-contrast: more)"
  | "(prefers-contrast: less)"
  | "(prefers-contrast: no-preference)"
  | "(forced-colors: active)"
  | "(forced-colors: none)"
  | "(inverted-colors: inverted)"
  | "(inverted-colors: none)";

export type NAMED_COLORS_TYPE = (typeof NAMED_COLORS_ARRAY)[number];
type CSS_COLOR_FN_NAME =
  | "rgba"
  | "rgb"
  | "hsla"
  | "hsl"
  | "hwb"
  | "color"
  | "oklab"
  | "oklch"
  | "lab"
  | "lch"
  | "light-dark"
  | "color-mix";
export type VALID_CSS_COLOR_FN = `${CSS_COLOR_FN_NAME}(${string})`;
