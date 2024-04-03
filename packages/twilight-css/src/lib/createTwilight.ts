import plugin from "tailwindcss/plugin";
import { BaseConfig, PrimitiveConfig, Theme } from "../types";
import { handlePrimitives } from "./handlePrimitives";
import { handleThemes } from "./handleThemes";

export function createTwilight<TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>,
  themes: Theme<TConfig>[]
) {
  const { twPluginPrimitives, twPresetPrimitives } =
    handlePrimitives(primitives);

  const { twPresetTokens, twPluginThemes } = handleThemes(themes);

  const twilightPlugin = plugin(({ addBase }) => {
    addBase({ ...twPluginPrimitives, ...twPluginThemes });
  });

  return {
    twilightPlugin,
    twilightColors: twPresetPrimitives,
    twilightExtends: twPresetTokens,
  };
}
