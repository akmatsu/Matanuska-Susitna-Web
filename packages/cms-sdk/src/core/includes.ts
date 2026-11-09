/**
 * Relations only appear in a CMS response when they are requested with
 * `include`. This marks the requested ones as present, so code that asked
 * for `contacts` can use `service.contacts` without an undefined check.
 *
 * A single relation keeps its `null` (e.g. no primary contact is set).
 */
export type WithIncludes<T, I extends keyof T> = Omit<T, I> & {
  [K in I]-?: Exclude<T[K], undefined>;
};
