import plugin from "tailwindcss/plugin";
import { Theme } from "@/types/config-types";
import { NestedObject } from "@/types/type-utils";
import { deepMerge } from "@/utils/deepMerge";
import { handlePrimitives } from "./handlePrimitives";
import { handleThemes } from "./handleThemes";
import { NAMED_COLORS_TYPE, VALID_CSS_COLOR_FN } from "@/types/type-constants";

export function createTwilight<
  TPrimitives extends NestedObject<
    VALID_CSS_COLOR_FN | NAMED_COLORS_TYPE | `#${string}`
  >,
  TKey extends PropertyKey,
>({
  primitives,
  themes,
  prefix = "clr",
}: {
  primitives: TPrimitives;
  themes: Theme<TPrimitives, TKey>[];
  prefix?: string;
}) {
  const { twPrimitivesPlugin, twilightPrimitives } = handlePrimitives(
    primitives,
    prefix,
  );
  const { twTokensPlugin, twilightTokens } = handleThemes(themes, prefix);
  const base = deepMerge(twPrimitivesPlugin, twTokensPlugin);
  const twilightPlugin = plugin(({ addBase }) => addBase(base), {
    theme: {
      colors: twilightPrimitives,
      extend: twilightTokens,
    },
  });

  return twilightPlugin;
}
