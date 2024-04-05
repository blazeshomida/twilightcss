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

type Tokens<TConfig extends BaseConfig> = {
  textColor?: Token<TConfig>;
  backgroundColor?: Token<TConfig>;
  borderColor?: Token<TConfig>;
};

type SelectorTokens<TConfig extends BaseConfig> = {
  selectors: string | string[];
  tokens: Tokens<TConfig>;
};
type MediaTokens<TConfig extends BaseConfig> = {
  media: MediaProp | MediaProp[];
  tokens: Tokens<TConfig>;
};

export type Theme<TConfig extends BaseConfig> =
  | SelectorTokens<TConfig>
  | MediaTokens<TConfig>
  | (SelectorTokens<TConfig> & MediaTokens<TConfig>);

export type StyleObject = {
  [key: string]: string | number | StyleObject;
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
