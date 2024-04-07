import { BaseConfig, PrimitiveConfig } from "@/types";
import { objectEntries, objectToCss } from "@/utils";
import { oklch } from "culori";
function cleanParam(value: number, precision = 2): number {
  return (
    Math.round(parseFloat((value * 10 ** precision).toFixed(precision))) /
    10 ** precision
  );
}

export function handlePrimitives<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>
) {
  const cssProperties: Record<string, string> = {
    "--clr-inherit": "inherit",
    "--clr-current": "currentColor",
    "--clr-transparent": "transparent",
    "--clr-black": "0% 0 0",
    "--clr-white": "100% 0 0",
  };
  const twPresetPrimitives: Record<string, Record<string, string>> = {
    inherit: {
      DEFAULT: "var(--clr-inherit) ",
    },
    current: {
      DEFAULT: "var(--clr-current) ",
    },
    transparent: {
      DEFAULT: "var(--clr-transparent)",
    },
    black: {
      DEFAULT: "oklch(var(--clr-black) / <alpha-value>)",
    },
    white: {
      DEFAULT: "oklch(var(--clr-white) / <alpha-value>)",
    },
  };
  objectEntries(primitives).forEach(([color, shades]) => {
    if (!shades) return;
    const currentColor: Record<string, string> = {};
    objectEntries(shades).forEach(([shadeProp, cssString]) => {
      if (!cssString) return;
      const userColor = oklch(cssString);
      if (!userColor) return;
      const { l = 0, c = 0, h = 0 } = userColor;
      const shade = String(shadeProp);
      const colorShade = shade === "DEFAULT" ? color : `${color}-${shade}`;
      const property = `--clr-${colorShade}`;
      cssProperties[property] =
        `${Math.round(cleanParam(l) * 100)}% ${cleanParam(c)} ${cleanParam(h)}`;
      currentColor[shade] = `oklch(var(${property}) / <alpha-value>)`;
    });
    twPresetPrimitives[color] = currentColor;
  });
  return {
    cssPrimitives: objectToCss({ ":root": cssProperties }),
    twPluginPrimitives: { ":root": cssProperties },
    twPresetPrimitives,
  };
}
