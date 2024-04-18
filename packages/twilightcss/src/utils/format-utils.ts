export const handlePrefix = (prefix: string) => (prefix ? prefix + "-" : "");
export function roundTo(value: number, precision = 2): number {
  return (
    Math.round(parseFloat((value * 10 ** precision).toFixed(precision))) /
    10 ** precision
  );
}
