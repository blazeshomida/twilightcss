import { AnyObject } from "@/types/type-utils";
import { isRecord, objectKeys } from "./object-fills";

export function deepMerge<Target extends AnyObject, Source extends AnyObject>(
  target: Target,
  ...sources: Source[]
): Target & Source {
  let output = Object.assign({}, target);
  sources.forEach((source) => {
    objectKeys(source).forEach((key) => {
      if (!isRecord(source[key]) || !isRecord(output[key])) {
        output[key] = source[key];
      } else {
        output[key] = deepMerge(output[key], source[key]);
      }
    });
  });
  return output;
}
