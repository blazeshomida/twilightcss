import plugin from "tailwindcss/plugin";
import { BaseConfig, PrimitiveConfig, ThemeOptions } from "../types";
import { handlePrimitives } from "./handlePrimitives";
import { handleThemes } from "./handleThemes";
import { deepMerge } from "../utils";

export function createTwilight<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>,
  themeOptions: ThemeOptions<TConfig>
) {
  const { twPluginPrimitives, twPresetPrimitives } =
    handlePrimitives(primitives);
  const { twPresetTokens, twPluginThemes } = handleThemes(themeOptions);
  const twilightPlugin = plugin(({ addBase }) => {
    addBase(deepMerge(twPluginPrimitives, twPluginThemes));
  });

  return {
    twilightPlugin,
    twilightColors: twPresetPrimitives,
    twilightExtends: twPresetTokens,
  };
}
