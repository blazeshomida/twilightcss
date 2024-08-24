import {
  isRecord,
  objectEntries,
  objectKeys,
  objectValues,
} from "./object-fills";
import { AnyObject } from "@/types/type-utils";

type CompositeOptions<THandlerName extends string> = {
  delimiter: string;
  final: string;
  handlers: Record<
    THandlerName,
    (props: { key: string; value: string; map: Map<string, string> }) => void
  >;
};

export function generatePaths<THandlerName extends string = "paths">(
  root: AnyObject,
  options: Partial<CompositeOptions<THandlerName>> = {},
  path = "",
  ...maps: Array<Map<string, string>>
): Record<THandlerName, Record<string, string>> {
  const {
    delimiter = "-",
    final = "DEFAULT",
    handlers = { paths: ({ key, value, map }) => map.set(key, value) },
  } = options;

  if (maps.length === 0) {
    objectKeys(handlers).forEach(() => maps.push(new Map<string, string>()));
  }

  for (const [key, value] of objectEntries(root)) {
    const newPath =
      key === final ? path : `${path ? path + delimiter : ""}${String(key)}`;
    isRecord(value)
      ? generatePaths(value, options, newPath, ...maps)
      : objectValues(handlers).forEach((handler, index) =>
          handler({ key: newPath, value, map: maps[index]! }),
        );
  }

  return maps.reduce(
    (acc, map, index) => ({
      ...acc,
      [objectKeys(handlers)[index]!]: Object.fromEntries(map),
    }),
    {},
  ) as Record<THandlerName, Record<string, string>>;
}
