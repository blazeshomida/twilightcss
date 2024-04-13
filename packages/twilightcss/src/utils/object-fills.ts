import { AnyObject } from "@/types/type-constants";

export function objectEntries<TObj extends object>(obj: TObj) {
  return Object.entries(obj) as [keyof TObj, TObj[keyof TObj]][];
}

export function objectKeys<T extends AnyObject>(object: T) {
  return Object.keys(object) as (keyof T)[];
}
