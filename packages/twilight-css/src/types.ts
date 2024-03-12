export type StyleObject = {
  [key: string]: string | number | StyleObject;
};

export type MediaProp = [MEDIA_QUERIES, string];

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
