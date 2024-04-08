import {
  BaseConfig,
  MediaProp,
  ShadcnTheme,
  ThemeOptions,
  TwTheme,
} from "@/types";
import { objectEntries, objectToCss } from "@/utils";

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

const twTokenTypeMap = {
  textColor: "text",
  backgroundColor: "bg",
  borderColor: "border",
} as const;
type TwTokenTypes = keyof typeof twTokenTypeMap;
type TwTokens = Record<string, Record<string, string>>;

function handleTwTokens<TConfig extends BaseConfig>(
  tokens: TwTheme<TConfig>["tokens"]
) {
  const currentTheme: Record<string, string> = {};
  const currentTokens: Record<TwTokenTypes, TwTokens> = {
    textColor: {},
    backgroundColor: {},
    borderColor: {},
  };
  objectEntries(tokens).forEach(([tokenType, colors]) => {
    if (!colors) return;
    const tokenShort = twTokenTypeMap[tokenType];
    objectEntries(colors).forEach(([color, variants]) => {
      if (!variants) return;
      const currentTokenColor: Record<string, string> = {};
      objectEntries(variants).forEach(([variantKey, colorShade]) => {
        if (!colorShade) return;
        const variant = String(variantKey);
        const cssVarName = `--${tokenShort}-${color}-${variant}`;
        currentTheme[cssVarName] = `var(--clr-${colorShade})`;
        currentTokenColor[variant] =
          `oklch(var(${cssVarName}) / <alpha-value>)`;
      });
      currentTokens[tokenType][color] = currentTokenColor;
    });
  });
  return { currentTokens, currentTheme };
}
function handleShadcnTokens<TConfig extends BaseConfig>(
  tokens: ShadcnTheme<TConfig>["tokens"]
) {
  const currentTokens: Record<string, Record<string, string>> = {};
  const currentTheme: Record<string, string> = {};
  objectEntries(tokens).forEach(([token, value]) => {
    if (!value || !token) return;
    const cssVarName = `--${token}`;
    const twExtendsString = `oklch(var(${cssVarName}) / <alpha-value>)`;
    if (token.includes("-")) {
      const [background] = token.split("-");
      if (!background) return;
      currentTokens[background] = {
        ...currentTokens[background],
        foreground: twExtendsString,
      };
    } else {
      currentTokens[token] = {
        ...currentTokens[token],
        DEFAULT: twExtendsString,
      };
    }

    currentTheme[cssVarName] = `var(--clr-${value})`;
  });
  return { currentTokens: { colors: currentTokens }, currentTheme };
}
function isTwTheme<TConfig extends BaseConfig>(
  theme: TwTheme<TConfig> | ShadcnTheme<TConfig>,
  type: "tailwindcss" | "shadcn"
): theme is TwTheme<TConfig> {
  return type === "tailwindcss";
}

export function handleThemes<TConfig extends BaseConfig>({
  themes,
  type = "tailwindcss",
}: ThemeOptions<TConfig>) {
  const twPluginThemes = {};
  const twPresetTokens = {};
  themes.forEach((theme) => {
    const { currentTheme, currentTokens } = isTwTheme(theme, type)
      ? handleTwTokens(theme.tokens)
      : handleShadcnTokens(theme.tokens);
    Object.assign(twPresetTokens, currentTokens);

    if ("selectors" in theme) {
      Object.assign(
        twPluginThemes,
        handleSelectors(theme.selectors, currentTheme)
      );
    }
    if ("media" in theme) {
      Object.assign(twPluginThemes, handleMedia(theme.media, currentTheme));
    }
  });

  return {
    cssThemes: objectToCss(twPluginThemes),
    twPluginThemes,
    twPresetTokens,
  };
}
