/**
 * Converts a number to a percentage if less than 1, otherwise returns the number as-is.
 * This is primarily used for alpha and other percentage-based values, ensuring they are
 * correctly interpreted within the range of 0 to 100%.
 *
 * @param num - The number to convert to a percentage.
 * @returns The converted number as a percentage if originally less than 1, otherwise the original number.
 */
const getPercent = (num: number): number => (num < 1 ? num * 100 : num);

/**
 * Determines the color type suffix ('a' for alpha) based on the presence of an alpha component.
 * This helps in generating the correct CSS color string format.
 *
 * @param a - The alpha component, optional.
 * @returns 'a' if an alpha component is present, otherwise an empty string.
 */
const getColorType = (a: number | undefined): string =>
  a !== undefined ? "a" : "";

/**
 * Formats the alpha component for inclusion in a CSS color string, converting it to
 * a percentage if necessary. If undefined, returns an empty string.
 *
 * @param a - The alpha component, optional.
 * @returns The formatted alpha component as a string, or an empty string if undefined.
 */
const getAlphaComp = (a: number | undefined): string =>
  a !== undefined ? ` / ${getPercent(a)}%` : "";

/**
 * Validates if a number is within a specified range.
 *
 * @param num - The number to check.
 * @param min - The minimum acceptable value.
 * @param max - The maximum acceptable value.
 * @returns True if the number is within the range, otherwise false.
 */
const validRange = (num: number, min: number, max: number): boolean =>
  num >= min && num <= max;

/**
 * Validates if a hue value is within the valid range of 0 to 360 degrees,
 * which is the full spectrum of color hues in HSL color space.
 *
 * @param num - The hue value to validate.
 * @returns True if the hue value is within the 0 to 360 range, otherwise false.
 */
const validHue = (num: number): boolean => validRange(num, 0, 360);

/**
 * Validates RGB component values, ensuring they are within the valid range of 0 to 255.
 * This range corresponds to the standard definition of RGB colors in digital screens.
 *
 * @param r - The red component value.
 * @param g - The green component value.
 * @param b - The blue component value.
 * @returns True if all RGB values are within the 0 to 255 range, otherwise false.
 */
const validRgb = (r: number, g: number, b: number): boolean =>
  [r, g, b].every((num) => validRange(num, 0, 255));

/**
 * Validates if a percentage value is within the valid range of 0 to 100 after conversion.
 * This is useful for validating CSS percentages and opacity/alpha values.
 *
 * @param num - The percentage value to validate.
 * @returns True if the percentage value is within the 0 to 100 range after conversion, otherwise false.
 */
const validPercent = (num: number): boolean =>
  validRange(getPercent(num), 0, 100);

/**
 * Validates the alpha component, ensuring it is within the valid percentage range (0-100%)
 * after being normalized. This function assumes the alpha value is not optional and must
 * be provided for validation.
 *
 * @param a - The alpha component to validate.
 * @returns True if the alpha value is within the 0 to 100 range after normalization, otherwise false.
 */
const validAlpha = (a: number | undefined): boolean =>
  a !== undefined && validPercent(a);

/**
 * Validates HSL component values, ensuring the hue is within 0-360,
 * and saturation/lightness are within 0-100% after conversion.
 *
 * @param h - The hue component value.
 * @param s - The saturation component value.
 * @param l - The lightness component value.
 * @returns True if all HSL values are within their respective valid ranges, otherwise false.
 */
const validHsl = (h: number, s: number, l: number): boolean =>
  validHue(h) && [s, l].every(validPercent);

/**
 * Generates an RGB(A) color string from component values.
 * Red, Green, and Blue components must be within the range 0-255.
 * The optional alpha component must be within the range 0-1 (interpreted as a fraction) or 0-100 (interpreted as a percentage).
 *
 * @param r - The red component (0-255).
 * @param g - The green component (0-255).
 * @param b - The blue component (0-255).
 * @param a - The alpha component (optional, 0-1 or 0-100).
 * @returns The RGB(A) color string.
 */
export const rgb = (r: number, g: number, b: number, a?: number): string => {
  if (!validRgb(r, g, b) || !validAlpha(a))
    throw new Error(`Invalid rgb(a) value passed`);
  return `rgb${getColorType(a)}(${r}, ${g}, ${b}${getAlphaComp(a)})` as const;
};

/**
 * Generates an HSL(A) color string from component values.
 * Hue must be within the range 0-360. Saturation and Lightness must be within 0-100% (after normalization).
 * The optional alpha component must be within the range 0-1 (interpreted as a fraction) or 0-100 (interpreted as a percentage).
 *
 * @param h - The hue component (0-360).
 * @param s - The saturation component (0-1 or 0-100).
 * @param l - The lightness component (0-1 or 0-100).
 * @param a - The alpha component (optional, 0-1 or 0-100).
 * @returns The HSL(A) color string.
 */
export const hsl = (h: number, s: number, l: number, a?: number): string => {
  if (!validHsl(h, s, l) || !validAlpha(a)) {
    throw new Error(`Invalid hsl(a) value passed`);
  }
  return `hsl${getColorType(a)}(${h}, ${getPercent(s)}%, ${getPercent(
    l
  )}%${getAlphaComp(a)})` as const;
};

/**
 * Generates a CIELAB color string from component values.
 * L (Lightness) must be within the range 0-100. a and b are the color-opponent dimensions,
 * with a ranging from green to red and b from blue to yellow.
 * The function converts L to a percentage for CSS compatibility.
 *
 * @param l - The lightness component (0-1 or 0-100).
 * @param a - The a component (green-red axis).
 * @param b - The b component (blue-yellow axis).
 * @returns The CIELAB color string.
 */
export const lab = (l: number, a: number, b: number): string =>
  `lab(${getPercent(l)}% ${a} ${b})` as const;

/**
 * Generates an LCH color string from component values.
 * L (Lightness) must be within the range 0-100. C (Chroma) represents the colorfulness,
 * and H (Hue) is the hue angle (0-360 degrees).
 * Lightness is converted to a percentage for CSS compatibility.
 *
 * @param l - The lightness component (0-1 or 0-100).
 * @param c - The chroma component.
 * @param h - The hue component (0-360).
 * @returns The LCH color string.
 */
export const lch = (l: number, c: number, h: number): string =>
  `lch(${getPercent(l)}% ${c} ${h})` as const;

/**
 * Generates an Oklab color string from component values.
 * Oklab is a perceptually uniform color space where L (Lightness) must be within 0-100,
 * and a and b are color-opponent dimensions. This function converts L to a percentage
 * for CSS compatibility, offering a more perceptually uniform alternative to LAB.
 *
 * @param l - The lightness component (0-1 or 0-100).
 * @param a - The a component (color-opponent dimension).
 * @param b - The b component (color-opponent dimension).
 * @returns The Oklab color string.
 */
export const oklab = (l: number, a: number, b: number): string =>
  `oklab(${getPercent(l)}% ${a} ${b})` as const;

/**
 * Generates an Oklch color string from component values.
 * Oklch is a color space derived from Oklab, with L (Lightness) within 0-100,
 * C (Chroma) representing colorfulness, and H (Hue) as the hue angle (0-360 degrees).
 * Lightness is converted to a percentage for CSS compatibility, offering
 * a perceptually uniform color space with a cylindrical representation.
 *
 * @param l - The lightness component (0-1 or 0-100).
 * @param c - The chroma component.
 * @param h - The hue component (0-360).
 * @returns The Oklch color string.
 */
export const oklch = (l: number, c: number, h: number): string =>
  `oklch(${getPercent(l)}% ${c} ${h})` as const;
