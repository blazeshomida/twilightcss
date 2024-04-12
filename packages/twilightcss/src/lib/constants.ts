export const DEFAULT_PRIMITIVES = {
  black: {
    DEFAULT: "oklch(var(--clr-black) / <alpha-value>)",
  },
  current: {
    DEFAULT: "var(--clr-current) ",
  },
  inherit: {
    DEFAULT: "var(--clr-inherit) ",
  },
  transparent: {
    DEFAULT: "var(--clr-transparent)",
  },
  white: {
    DEFAULT: "oklch(var(--clr-white) / <alpha-value>)",
  },
};

export const DEFAULT_CSS_VARIABLES = {
  "--clr-inherit": "inherit",
  "--clr-current": "currentColor",
  "--clr-transparent": "transparent",
  "--clr-black": "0% 0 0",
  "--clr-white": "100% 0 0",
};
