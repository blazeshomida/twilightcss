import { AnyObject } from "@/types/type-constants";
import { objectKeys } from "./object-fills";

function isObject(item: any): item is AnyObject {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge<Target extends AnyObject, Source extends AnyObject>(
  target: Target,
  source: Source
): Target & Source {
  let output: Target & Source = Object.assign({}, target);
  objectKeys(source).forEach((key) => {
    if (!isObject(source[key]) || !(key in target)) {
      output[key] = source[key];
    } else {
      output[key] = deepMerge(target[key], source[key]);
    }
  });
  return output;
}
