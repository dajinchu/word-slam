/** Things that are lodash but I don't want to import the chungus lib */

export function mapValues<T, R, K extends string | number>(
  obj: Record<K, T>,
  mapper: (v: T, k: K) => R
): Record<string, R> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: mapper(value as T, key as K),
    }),
    {}
  );
}
