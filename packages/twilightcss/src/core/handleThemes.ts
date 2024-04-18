import { MediaProp, Theme, Tokens } from "@/types/config-types";
import { AnyObject } from "@/types/type-utils";
import { deepMerge } from "@/utils/deepMerge";
import { objectKeys } from "@/utils/object-fills";
import { Tailwind } from "@/types/type-constants";
import { generatePaths } from "@/utils/generatePaths";
import { handlePrefix } from "@/utils/format-utils";

const validMediaArray = (
  media: MediaProp | MediaProp[]
): media is MediaProp[] => media.every(Array.isArray);

function handleMedia<TPrimitives, TKey extends PropertyKey>(
  media: MediaProp | MediaProp[],
  currentTokens: Tokens<TPrimitives, TKey>,
  twPluginThemes: AnyObject
) {
  const mediaArray = validMediaArray(media) ? media : [media];
  return Object.assign(
    twPluginThemes,
    deepMerge(
      twPluginThemes,
      mediaArray.reduce(
        (acc, [query, selector]) => ({
          [`@media ${query}`]: {
            [String(selector)]: currentTokens,
          },
          ...acc,
        }),
        {}
      )
    )
  );
}

function handleSelectors<TPrimitives, TKey extends PropertyKey>(
  selectors: string | string[],
  currentTokens: Tokens<TPrimitives, TKey>,
  twPluginThemes: AnyObject
) {
  const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
  return Object.assign(
    twPluginThemes,
    deepMerge(twPluginThemes, {
      [selectorArray.join(", ")]: currentTokens,
    })
  );
}

function handleTokens<TPrimitives, TKey extends PropertyKey>(
  tokens: Tokens<TPrimitives, TKey>,
  twColorTokensConfig: Tailwind.Config,
  prefix: string
) {
  const currentTokens: Tokens<TPrimitives, TKey> = {};
  objectKeys(tokens).forEach((domain) => {
    const { twPlugin, ...rest } = generatePaths(tokens[domain]!, {
      handlers: {
        twPlugin: ({ key, value, map }) => {
          const domainPre = domain.endsWith("Color")
            ? domain.split("Color")[0]
            : domain;
          map.set(
            `--${handlePrefix(prefix)}${domainPre === "colors" ? "" : domainPre + "-"}${key}`,
            `var(--${handlePrefix(prefix) + value})`
          );
        },

        [domain]: ({
          key,
          map,
        }: {
          key: string;
          map: Map<string, string>;
        }): void => {
          const domainPre = domain.endsWith("Color")
            ? domain.split("Color")[0]
            : domain;
          map.set(
            key,
            `oklch(var(--${handlePrefix(prefix)}${domainPre === "colors" ? "" : domainPre + "-"}${key}) / <alpha-value>)`
          );
        },
      },
    });
    if (!twPlugin) return;
    Object.assign(currentTokens, deepMerge(currentTokens, twPlugin));
    Object.assign(twColorTokensConfig, deepMerge(twColorTokensConfig, rest));
  });

  return currentTokens;
}

export function handleThemes<TPrimitives, TKey extends PropertyKey = string>(
  themes: Theme<TPrimitives, TKey>[],
  prefix: string
) {
  const twilightTokens: Partial<Record<Tailwind.ColorConfig, AnyObject>> = {};
  const twTokensPlugin: AnyObject = {};
  themes.forEach((theme) => {
    const currentTokens = handleTokens(theme.tokens, twilightTokens, prefix);
    if ("selectors" in theme) {
      handleSelectors(theme.selectors, currentTokens, twTokensPlugin);
    }
    if ("media" in theme) {
      handleMedia(theme.media, currentTokens, twTokensPlugin);
    }
  });
  return {
    twTokensPlugin,
    twilightTokens,
  };
}
