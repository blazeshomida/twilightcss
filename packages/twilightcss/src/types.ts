export type BaseConfig = {
  color: string;
  shade: string;
  variant: string;
};
export type Token<TConfig extends BaseConfig> = {
  [Color in TConfig["color"]]?: {
    [Variant in TConfig["variant"] | "DEFAULT"]?:
      | `${Color}-${TConfig["shade"]}`
      | Color;
  };
};

export type MediaProp = [MEDIA_QUERIES, string];

export type PrimitiveConfig<TConfig extends BaseConfig> = {
  [Color in TConfig["color"]]?: {
    [Shade in TConfig["shade"] | "DEFAULT"]?: string;
  };
};

type TWTokens<TConfig extends BaseConfig> = {
  textColor?: Token<TConfig>;
  backgroundColor?: Token<TConfig>;
  borderColor?: Token<TConfig>;
};

type ShadcnTokens<TConfig extends BaseConfig> = Partial<{
  background: `${TConfig["color"]}-${TConfig["shade"]}`;
  foreground: `${TConfig["color"]}-${TConfig["shade"]}`;
  card: `${TConfig["color"]}-${TConfig["shade"]}`;
  "card-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  popover: `${TConfig["color"]}-${TConfig["shade"]}`;
  "popover-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  primary: `${TConfig["color"]}-${TConfig["shade"]}`;
  "primary-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  secondary: `${TConfig["color"]}-${TConfig["shade"]}`;
  "secondary-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  muted: `${TConfig["color"]}-${TConfig["shade"]}`;
  "muted-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  accent: `${TConfig["color"]}-${TConfig["shade"]}`;
  "accent-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  destructive: `${TConfig["color"]}-${TConfig["shade"]}`;
  "destructive-foreground": `${TConfig["color"]}-${TConfig["shade"]}`;
  border: `${TConfig["color"]}-${TConfig["shade"]}`;
  input: `${TConfig["color"]}-${TConfig["shade"]}`;
  ring: `${TConfig["color"]}-${TConfig["shade"]}`;
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

export type StyleObject = {
  [key: string]: string | number | StyleObject;
};

export type ThemeOptions<TConfig extends BaseConfig> =
  | {
      type?: "tailwindcss";
      themes: TwTheme<TConfig>[];
    }
  | {
      type?: "shadcn";
      themes: ShadcnTheme<TConfig>[];
    };

// Type Constants
type MEDIA_QUERIES =
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
