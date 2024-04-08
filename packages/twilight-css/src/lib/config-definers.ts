import { PrimitiveConfig, BaseConfig, Theme } from "../types";

export const definePrimitives = <TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>
) => primitives;

export const defineTheme = <TConfig extends BaseConfig>(
  theme: Theme<TConfig>
) => theme;
