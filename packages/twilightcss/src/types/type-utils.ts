export type AnyObject = Record<PropertyKey, any>;

export type NestedObject<TValue, TKey extends PropertyKey = PropertyKey> = {
  [Key in TKey]?: NestedObject<TValue, TKey> | TValue;
};

type _Filler = 0;
type TupLength<TTuple extends unknown[]> = TTuple["length"] & number;

type NumToTup<TLength extends number, TFiller = _Filler, _TAccumulator extends unknown[] = []> =
  TupLength<_TAccumulator> extends TLength ? _TAccumulator : NumToTup<TLength, TFiller, [..._TAccumulator, TFiller]>;

type Subtract<A extends number, B extends number> =
  NumToTup<A> extends [...infer A1, _Filler]
    ? NumToTup<B> extends [...infer B1, _Filler]
      ? Subtract<TupLength<A1>, TupLength<B1>>
      : A
    : A;

export type Join<
  TFirst extends string,
  TSecond extends string,
  Delimiter extends string = "-",
> = `${TFirst}${Delimiter}${TSecond}`;

type HandleFinal<TKey, TFinal, TDelimiter extends string, TPath> = TKey extends TFinal
  ? TPath extends `${infer Pre}${TDelimiter}`
    ? Pre
    : TPath
  : TPath;

export type Pathify<
  TObj,
  Final extends string = "DEFAULT",
  Delimiter extends string = "-",
  Prefix extends string = "",
  // Increase as needed however,
  // WARNING: higher depth increases memory usage
  Depth extends number = 5,
> = Depth extends 0
  ? never
  : {
      [K in keyof TObj]: `${Prefix}${K extends Final ? "" : K & (string | number)}` extends infer Path
        ? TObj[K] extends AnyObject
          ? Pathify<TObj[K], Final, Delimiter, `${Path & (string | number)}${Delimiter}`, Subtract<Depth, 1>>
          : HandleFinal<K, Final, Delimiter, Path>
        : never;
    }[keyof TObj];
