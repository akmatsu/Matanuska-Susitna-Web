export function ifTrue<T = any>(val: T | undefined, cb: (val: NonNullable<T>) => void) {
  if (val) cb(val);
}
