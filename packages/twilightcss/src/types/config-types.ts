import { MEDIA_QUERIES, NAMED_COLORS_TYPE } from "@/types/type-constants";
import { VALID_CSS_COLOR_FN } from "./type-constants";

export type BaseConfig = {
  color: string;
  shade: string;
  variant: string;
};

export type MediaProp = [MEDIA_QUERIES, string];

export type PrimitiveConfig<TConfig extends BaseConfig> = {
  [Color in TConfig["color"]]?: {
    [Shade in TConfig["shade"] | "DEFAULT"]?:
      | NAMED_COLORS_TYPE
      | VALID_CSS_COLOR_FN
      | `#${string}`;
  };
};

export type Token<TConfig extends BaseConfig> = {
  [Color in TConfig["color"]]?: {
    [Variant in TConfig["variant"] | "DEFAULT"]?:
      | `${Color}-${TConfig["shade"]}`
      | Color;
  };
};

type TWTokens<TConfig extends BaseConfig> = {
  textColor?: Token<TConfig>;
  backgroundColor?: Token<TConfig>;
  borderColor?: Token<TConfig>;
};

type ShadcnTokens<
  TConfig extends BaseConfig,
  TColorShade extends
    | `${TConfig["color"]}-${TConfig["shade"]}`
    | TConfig["color"] =
    | `${TConfig["color"]}-${TConfig["shade"]}`
    | TConfig["color"],
> = Record<string, TColorShade> &
  Partial<{
    background: TColorShade;
    foreground: TColorShade;
    card: TColorShade;
    "card-foreground": TColorShade;
    popover: TColorShade;
    "popover-foreground": TColorShade;
    primary: TColorShade;
    "primary-foreground": TColorShade;
    secondary: TColorShade;
    "secondary-foreground": TColorShade;
    muted: TColorShade;
    "muted-foreground": TColorShade;
    accent: TColorShade;
    "accent-foreground": TColorShade;
    destructive: TColorShade;
    "destructive-foreground": TColorShade;
    border: TColorShade;
    input: TColorShade;
    ring: TColorShade;
  }>;

type SelectorTokens<TConfig extends BaseConfig, TToken = TWTokens<TConfig>> = {
  selectors: string | string[];
  tokens: TToken;
};
type MediaTokens<TConfig extends BaseConfig, TToken = TWTokens<TConfig>> = {
  media: MediaProp | MediaProp[];
  tokens: TToken;
};

export type ShadcnTheme<TConfig extends BaseConfig> =
  | SelectorTokens<TConfig, ShadcnTokens<TConfig>>
  | MediaTokens<TConfig, ShadcnTokens<TConfig>>
  | (SelectorTokens<TConfig, ShadcnTokens<TConfig>> &
      MediaTokens<TConfig, ShadcnTokens<TConfig>>);

export type TwTheme<TConfig extends BaseConfig> =
  | SelectorTokens<TConfig>
  | MediaTokens<TConfig>
  | (SelectorTokens<TConfig> & MediaTokens<TConfig>);

export type ThemeOptions<TConfig extends BaseConfig> =
  | {
      type?: "tailwindcss";
      themes: TwTheme<TConfig>[];
    }
  | {
      type?: "shadcn";
      themes: ShadcnTheme<TConfig>[];
    };
