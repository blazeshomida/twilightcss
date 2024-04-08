import plugin from "tailwindcss/plugin";
import { BaseConfig, PrimitiveConfig, ThemeOptions } from "@/types";
import { deepMerge } from "@/utils";
import { handlePrimitives } from "./handlePrimitives";
import { handleThemes } from "./handleThemes";

export function createTwilight<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>,
  themeOptions: ThemeOptions<TConfig>
) {
  const { twPluginPrimitives, twPresetPrimitives } =
    handlePrimitives(primitives);
  const { twPresetTokens, twPluginThemes } = handleThemes(themeOptions);
  const base = deepMerge(twPluginPrimitives, twPluginThemes);
  const twilightPlugin = plugin(({ addBase }) => addBase(base));

  return {
    twilightPlugin,
    twilightColors: twPresetPrimitives,
    twilightExtends: twPresetTokens,
  };
}
