import { handlePrefix, roundTo } from "@/utils/format-utils";
import { DEFAULT_PRIMITIVES, DEFAULT_TOKENS } from "./constants";
import { NestedObject } from "@/types/type-utils";
import { generatePaths } from "@/utils/generatePaths";
import { oklch } from "culori";

export function handlePrimitives(
  primitives: NestedObject<string>,
  prefix: string
) {
  const { twPrimitivesPlugin, twilightPrimitives } = generatePaths(primitives, {
    handlers: {
      twPrimitivesPlugin: ({ key, value, map }) => {
        const { l = 0, c = 0, h = 0 } = oklch(value) ?? {};
        map.set(
          `--${handlePrefix(prefix) + key}`,
          `${Math.round(roundTo(l) * 100)}% ${roundTo(c)} ${roundTo(h)}`
        );
      },
      twilightPrimitives: ({ key, map }) => {
        map.set(
          key,
          `oklch(var(--${handlePrefix(prefix) + key}) / <alpha-value>)`
        );
      },
    },
  });
  return {
    twPrimitivesPlugin: {
      ":root": { ...DEFAULT_PRIMITIVES(prefix), ...twPrimitivesPlugin },
    },
    twilightPrimitives: {
      colors: { ...DEFAULT_TOKENS(prefix), ...twilightPrimitives },
    },
  };
}
