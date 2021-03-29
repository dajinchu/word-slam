/** Things that are lodash but I don't want to import the chungus lib */

/**
 * map over object values and return new object
 */
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

export function pickBy<T>(
  obj: Record<string, T>,
  picker: (t: T, k?: string) => boolean
) {
  const ret: Record<string, T> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (picker(value, key)) {
      ret[key] = value;
    }
  });
  return ret;
}

/**
 * Do fn n times and return results
 */
export function times<B>(n: number, fn: (a: number) => B): B[] {
  return [...Array(n)].map(fn);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffle<T>(array: T[]): T[] {
  const ret = [...array];
  for (var i = ret.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = ret[i];
    ret[i] = ret[j];
    ret[j] = temp;
  }
  return ret;
}
