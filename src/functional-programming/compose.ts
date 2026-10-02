export function compose<T, A>(a: (value: T) => A): (source: T) => A;
export function compose<T, A, B>(b: (value: A) => B, a: (value: T) => A): (source: T) => B;
export function compose<T, A, B, C>(c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => C;
export function compose<T, A, B, C, D>(d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => D;
export function compose<T, A, B, C, D, E>(e: (value: D) => E, d: (value: C) => D, c: (value: B) => C, b: (value: A) => B, a: (value: T) => A): (source: T) => E;
export function compose<T, A, B, C, D, E, F>(
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => F;
export function compose<T, A, B, C, D, E, F, G>(
  g: (value: F) => G,
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => G;
export function compose<T, A, B, C, D, E, F, G, H>(
  h: (value: G) => H,
  g: (value: F) => G,
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => H;
export function compose<T, A, B, C, D, E, F, G, H, I>(
  i: (value: H) => I,
  h: (value: G) => H,
  g: (value: F) => G,
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => I;
export function compose<T, A, B, C, D, E, F, G, H, I, J>(
  j: (value: I) => J,
  i: (value: H) => I,
  h: (value: G) => H,
  g: (value: F) => G,
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => J;
export function compose<T, A, B, C, D, E, F, G, H, I, J, K>(
  k: (value: J) => K,
  j: (value: I) => J,
  i: (value: H) => I,
  h: (value: G) => H,
  g: (value: F) => G,
  f: (value: E) => F,
  e: (value: D) => E,
  d: (value: C) => D,
  c: (value: B) => C,
  b: (value: A) => B,
  a: (value: T) => A,
): (source: T) => K;
export function compose(...fns: Array<(value: unknown) => unknown>) {
  return (source: unknown) => fns.reduceRight((accumulator, fn) => fn(accumulator), source);
}
