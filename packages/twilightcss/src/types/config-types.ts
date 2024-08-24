import { COLOR_MEDIA_QUERIES, Tailwind } from "./type-constants";
import { NestedObject, Pathify } from "./type-utils";

export type MediaProp = [COLOR_MEDIA_QUERIES, string] | [string, string];

type TokenConfig<TPrimitives, TKey extends PropertyKey> = Partial<
  Record<
    TKey,
    | NestedObject<Pathify<TPrimitives> | "black" | "white", TKey | "DEFAULT">
    | Pathify<TPrimitives>
    | "black"
    | "white"
  >
>;

export type Tokens<TPrimitives, TKey extends PropertyKey> = Partial<
  Record<
    Tailwind.ColorConfig,
    TokenConfig<TPrimitives, TKey> | TokenConfig<TPrimitives, string>
  >
>;

type SelectorTokens<TPrimitives, TKey extends PropertyKey> = {
  selectors: string | string[];
  tokens: Tokens<TPrimitives, TKey>;
};
type MediaTokens<TPrimitives, TKey extends PropertyKey> = {
  media: MediaProp | MediaProp[];
  tokens: Tokens<TPrimitives, TKey>;
};

export type _BaseTheme<TPrimitives, TKey extends PropertyKey = PropertyKey> =
  | SelectorTokens<TPrimitives, TKey>
  | MediaTokens<TPrimitives, TKey>
  | (SelectorTokens<TPrimitives, TKey> & MediaTokens<TPrimitives, TKey>);

export type Theme<
  TPrimitives,
  TKey extends PropertyKey = PropertyKey,
> = _BaseTheme<TPrimitives, TKey>;
