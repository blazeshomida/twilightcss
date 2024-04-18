import _colors from "tailwindcss/colors";
import { Theme as _Theme } from "./config-types";
import { DEFAULT_TOKENS, NAMED_COLORS_ARRAY } from "@/core/constants";
import { AnyObject, Join } from "./type-utils";

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

export namespace Tailwind {
  type DeprecatedColor =
    | "lightBlue"
    | "warmGray"
    | "trueGray"
    | "coolGray"
    | "blueGray";

  export const colors = _colors;
  export type ColorName = keyof Omit<
    typeof _colors,
    keyof typeof DEFAULT_TOKENS | DeprecatedColor
  >;
  export type Shade =
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
  export type ColorShade = Join<Tailwind.ColorName, Tailwind.Shade>;

  // Refer to https://tailwindcss.com/docs/theme#configuration-reference for theme options
  export type ColorConfig =
    | "accentColor"
    | "backgroundColor"
    | "borderColor"
    | "boxShadowColor"
    | "caretColor"
    | "colors"
    | "divideColor"
    | "gradientColorStops"
    | "outlineColor"
    | "ringColor"
    | "ringOffsetColor"
    | "textColor"
    | "textDecorationColor";

  export type Config = Partial<Record<ColorConfig, AnyObject>>;
}

export namespace Shadcn {
  export type Tokens =
    | "background"
    | "foreground"
    | "card"
    | "card-foreground"
    | "popover"
    | "popover-foreground"
    | "primary"
    | "primary-foreground"
    | "secondary"
    | "secondary-foreground"
    | "muted"
    | "muted-foreground"
    | "accent"
    | "accent-foreground"
    | "destructive"
    | "destructive-foreground"
    | "border"
    | "input"
    | "ring";

  export type Theme<TPrimitives> = _Theme<TPrimitives, Tokens>;
}
