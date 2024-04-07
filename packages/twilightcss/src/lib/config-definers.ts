import { PrimitiveConfig, BaseConfig, TwTheme, ShadcnTheme } from "../types";

export const definePrimitives = <TConfig extends BaseConfig>(
  primitives: PrimitiveConfig<TConfig>
) => primitives;

export const defineTheme = <TConfig extends BaseConfig>(
  theme: TwTheme<TConfig>
) => theme;

export const defineShadcnTheme = <TConfig extends BaseConfig>(
  theme: ShadcnTheme<TConfig>
) => theme;
