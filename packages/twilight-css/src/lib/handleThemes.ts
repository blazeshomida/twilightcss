import { BaseConfig, MediaProp, Theme, Token } from "../types";
import { handleAlphaValue, objectEntries, objectToCss } from "../utils";

const validMediaArray = (
  media: MediaProp | MediaProp[]
): media is MediaProp[] => media.every(Array.isArray);

function handleMedia(
  media: MediaProp | MediaProp[],
  currentTheme: Record<string, string>
) {
  const mediaArray = validMediaArray(media) ? media : [media];
  return mediaArray.reduce(
    (acc, [query, selector]) => ({
      [`@media ${query}`]: {
        [String(selector)]: currentTheme,
      },
      ...acc,
    }),
    {}
  );
}

function handleSelectors(
  selectors: string | string[],
  currentTheme: Record<string, string>
) {
  const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
  return {
    [selectorArray.join(", ")]: currentTheme,
  };
}

const tokenTypeMap = {
  textColor: "text",
  backgroundColor: "bg",
  borderColor: "border",
} as const;
type TwTokenTypes = keyof typeof tokenTypeMap;
type TwTokens = Record<string, Record<string, string>>;

function handleTokens<TConfig extends BaseConfig>(
  tokens: Theme<TConfig>["tokens"],
  colorShadeToFn: Map<string, string>
) {
  const currentTheme: Record<string, string> = {};
  const currentTokens: Record<TwTokenTypes, TwTokens> = {
    textColor: {},
    backgroundColor: {},
    borderColor: {},
  };
  objectEntries(tokens).forEach(([tokenType, colors]) => {
    if (!colors) return;
    const tokenShort = tokenTypeMap[tokenType];
    objectEntries(colors).forEach(([color, variants]) => {
      if (!variants) return;
      const currentTokenColor: Record<string, string> = {};
      objectEntries(variants).forEach(([variantKey, colorShade]) => {
        if (!colorShade) return;
        const variant = String(variantKey);
        const cssVarName = `--${tokenShort}-${color}-${variant}`;
        currentTheme[cssVarName] = `var(--clr-${colorShade})`;
        const colorFn = colorShadeToFn.get(colorShade);
        if (!colorFn) {
          console.error(`Unable to find color function for ${colorShade}`);
          return;
        }
        currentTokenColor[variant] = handleAlphaValue(
          colorFn,
          `var(${cssVarName})`,
          `${colorFn}(var(${cssVarName}) / <alpha-value>)`
        );
      });
      currentTokens[tokenType][color] = currentTokenColor;
    });
  });
  return { currentTheme, currentTokens };
}

export function handleThemes<TConfig extends BaseConfig>(
  themes: Theme<TConfig>[],
  colorShadeToFn: Map<string, string>
) {
  const twPluginThemes = {};
  const twPresetTokens: Record<TwTokenTypes, TwTokens> = {
    textColor: {},
    backgroundColor: {},
    borderColor: {},
  };

  themes.forEach((theme) => {
    const { tokens, media, selectors } = theme;
    const { currentTheme, currentTokens } = handleTokens(
      tokens,
      colorShadeToFn
    );
    Object.assign(twPresetTokens, currentTokens);
    Object.assign(twPluginThemes, handleSelectors(selectors, currentTheme));
    if (media) {
      Object.assign(twPluginThemes, handleMedia(media, currentTheme));
    }
  });

  return {
    cssThemes: objectToCss(twPluginThemes),
    twPluginThemes,
    twPresetTokens,
  };
}
