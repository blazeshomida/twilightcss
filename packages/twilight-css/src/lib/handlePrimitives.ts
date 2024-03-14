import { BaseConfig, PrimitiveConfig } from "../types";
import {
  objectEntries,
  parseColorString,
  handleAlphaValue,
  objectToCss,
} from "../utils";

export function handlePrimitives<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>
) {
  const cssProperties: Record<string, string> = {};
  const twPresetPrimitives: Record<string, Record<string, string>> = {};
  const colorShadeToFn: Map<string, string> = new Map();
  objectEntries(primitives).forEach(([color, shades]) => {
    if (!shades) return;
    const currentColor: Record<string, string> = {};
    objectEntries(shades).forEach(([shadeProp, cssString]) => {
      if (!cssString) return;
      const shade = String(shadeProp);
      const colorShade = shade === "DEFAULT" ? color : `${color}-${shade}`;
      const property = `--clr-${colorShade}`;
      const [colorFn, normalizedParams] = parseColorString(cssString);
      cssProperties[property] = handleAlphaValue(
        colorFn,
        cssString,
        normalizedParams
      );
      currentColor[shade] = handleAlphaValue(
        colorFn,
        `var(${property})`,
        `${colorFn}(var(${property}) / <alpha-value>)`
      );
      colorShadeToFn.set(colorShade, colorFn);
    });
    twPresetPrimitives[color] = currentColor;
  });
  return {
    cssPrimitives: objectToCss({ ":root": cssProperties }),
    twPluginPrimitives: { ":root": cssProperties },
    twPresetPrimitives,
    colorShadeToFn,
  };
}
