import { StyleObject } from "./types";

export function objectEntries<TObj extends object>(obj: TObj) {
  return Object.entries(obj) as [keyof TObj, TObj[keyof TObj]][];
}

type AnyObject = Record<PropertyKey, any>;

function objectKeys<T extends AnyObject>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

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

/**
 * Converts a JavaScript object representing CSS styles into a CSS string.
 * This function supports nested objects for representing styles for nested selectors.
 *
 * @param styleObject - A `StyleObject` representing the CSS styles. The object can have keys
 * as CSS properties with values as CSS values, or nested `StyleObject` for nested styles.
 * @param indentLevel - An optional parameter that determines the initial indentation level.
 * This is primarily used for internal recursion and formatting the nested CSS rules.
 * Defaults to 0, representing the root level with no initial indentation.
 * @returns A string representing the CSS rules defined within the `styleObject` formatted with proper indentation.
 *
 * @example
 * ```
 * const style = {
 *   ".container": {
 *     "margin": "0 auto",
 *     "text-align": "center",
 *     ".title": {
 *       "font-size": "24px",
 *       "color": "blue"
 *     }
 *   }
 * };
 *
 * console.log(objectToCss(style));
 * // Outputs:
 * // .container {
 * //     margin: 0 auto;
 * //     text-align: center;
 * //     .title {
 * //         font-size: 24px;
 * //         color: blue;
 * //     }
 * // }
 * ```
 */
export function objectToCss(styleObject: StyleObject, indentLevel = 0): string {
  let cssString = "";
  const indent = "\t".repeat(indentLevel);
  objectEntries(styleObject).forEach(([selector, rulesOrNested]) => {
    if (typeof rulesOrNested === "object") {
      const nestedCss = objectToCss(rulesOrNested, indentLevel + 1);
      cssString += `\n${indent}${selector} {\n${nestedCss}${indent}}\n`;
    } else {
      cssString += `${indent}${selector}: ${rulesOrNested};\n`;
    }
  });
  return cssString;
}
