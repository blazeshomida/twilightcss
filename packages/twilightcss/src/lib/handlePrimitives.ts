import { oklch } from "culori";
import { BaseConfig, PrimitiveConfig } from "@/types/config-types";
import { objectEntries } from "@/utils/object-fills";
import { objectToCss } from "@/utils/objectToCss";
import { DEFAULT_CSS_VARIABLES, DEFAULT_PRIMITIVES } from "./constants";
function cleanParam(value: number, precision = 2): number {
  return (
    Math.round(parseFloat((value * 10 ** precision).toFixed(precision))) /
    10 ** precision
  );
}

export function handlePrimitives<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>
) {
  const cssProperties: Record<string, string> = DEFAULT_CSS_VARIABLES;
  const twPresetPrimitives: Record<
    string,
    Record<string, string>
  > = DEFAULT_PRIMITIVES;
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
