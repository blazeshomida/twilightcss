import { AnyObject } from "@/types/type-constants";

export function objectEntries<TObj extends object>(obj: TObj) {
  return Object.entries(obj) as [keyof TObj, TObj[keyof TObj]][];
}

export function objectKeys<TObj extends AnyObject>(object: TObj) {
  return Object.keys(object) as (keyof TObj)[];
}

export function objectValues<TObj extends AnyObject>(obj: TObj) {
  return Object.values(obj) as TObj[keyof TObj][];
}
