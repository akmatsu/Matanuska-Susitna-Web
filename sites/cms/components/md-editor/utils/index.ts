export function limit(n: number, min: number, max: number): number {
  return n > max ? max : n < min ? min : n;
}
