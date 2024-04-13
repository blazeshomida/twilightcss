import { NAMED_COLORS_ARRAY } from "@/lib/constants";

// Type Constants
export type MEDIA_QUERIES =
  | "(prefers-color-scheme: dark)"
  | "(prefers-color-scheme: light)"
  | "(prefers-color-scheme: no-preference)"
  | "(prefers-reduced-motion: reduce)"
  | "(prefers-reduced-motion: no-preference)"
  | "(prefers-contrast: more)"
  | "(prefers-contrast: less)"
  | "(prefers-contrast: no-preference)"
  | "(prefers-reduced-transparency: reduce)"
  | "(prefers-reduced-transparency: no-preference)"
  | "(prefers-reduced-data: reduce)"
  | "(prefers-reduced-data: no-preference)"
  | "(forced-colors: active)"
  | "(forced-colors: none)"
  | "(inverted-colors: inverted)"
  | "(inverted-colors: none)"
  | "(orientation: portrait)"
  | "(orientation: landscape)";

export type AnyObject = Record<PropertyKey, any>;

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
