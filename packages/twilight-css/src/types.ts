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

export type Theme<TConfig extends BaseConfig> = {
  selectors: string | string[];
  media?: MediaProp | MediaProp[];
  tokens: {
    textColor?: Token<TConfig>;
    backgroundColor?: Token<TConfig>;
    borderColor?: Token<TConfig>;
  };
};

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
