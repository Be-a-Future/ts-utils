type IsAny<Value> = 0 extends 1 & Value ? true : false;

type HasCertainPromise<Returns extends readonly unknown[]> = true extends {
  [Index in keyof Returns]: IsAny<Returns[Index]> extends true ? false : [Returns[Index]] extends [never] ? false : [Returns[Index]] extends [PromiseLike<unknown>] ? true : false;
}[number]
  ? true
  : false;

type HasPossiblePromise<Returns extends readonly unknown[]> = true extends {
  [Index in keyof Returns]: Extract<Returns[Index], PromiseLike<unknown>> extends never ? false : true;
}[number]
  ? true
  : false;

type ComposeResult<Returns extends readonly unknown[], Result> =
  HasCertainPromise<Returns> extends true ? Promise<Awaited<Result>> : HasPossiblePromise<Returns> extends true ? Awaited<Result> | Promise<Awaited<Result>> : Result;

export function compose(): <T>(source: T) => T;
export function compose<T, A>(a: (value: T) => A): (source: T) => ComposeResult<[A], A>;
export function compose<T, A, B>(b: (value: Awaited<A>) => B, a: (value: T) => A): (source: T) => ComposeResult<[A, B], B>;
export function compose<T, A, B, C>(c: (value: Awaited<B>) => C, b: (value: Awaited<A>) => B, a: (value: T) => A): (source: T) => ComposeResult<[A, B, C], C>;
export function compose<T, A, B, C, D>(
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D], D>;
export function compose<T, A, B, C, D, E>(
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E], E>;
export function compose<T, A, B, C, D, E, F>(
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F], F>;
export function compose<T, A, B, C, D, E, F, G>(
  g: (value: Awaited<F>) => G,
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F, G], G>;
export function compose<T, A, B, C, D, E, F, G, H>(
  h: (value: Awaited<G>) => H,
  g: (value: Awaited<F>) => G,
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F, G, H], H>;
export function compose<T, A, B, C, D, E, F, G, H, I>(
  i: (value: Awaited<H>) => I,
  h: (value: Awaited<G>) => H,
  g: (value: Awaited<F>) => G,
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F, G, H, I], I>;
export function compose<T, A, B, C, D, E, F, G, H, I, J>(
  j: (value: Awaited<I>) => J,
  i: (value: Awaited<H>) => I,
  h: (value: Awaited<G>) => H,
  g: (value: Awaited<F>) => G,
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F, G, H, I, J], J>;
export function compose<T, A, B, C, D, E, F, G, H, I, J, K>(
  k: (value: Awaited<J>) => K,
  j: (value: Awaited<I>) => J,
  i: (value: Awaited<H>) => I,
  h: (value: Awaited<G>) => H,
  g: (value: Awaited<F>) => G,
  f: (value: Awaited<E>) => F,
  e: (value: Awaited<D>) => E,
  d: (value: Awaited<C>) => D,
  c: (value: Awaited<B>) => C,
  b: (value: Awaited<A>) => B,
  a: (value: T) => A,
): (source: T) => ComposeResult<[A, B, C, D, E, F, G, H, I, J, K], K>;
export function compose(...fns: Array<(value: unknown) => unknown>) {
  return (source: unknown) => {
    const result = fns.reduceRight((value, fn, index) => (index === fns.length - 1 ? fn(value) : isPromiseLike(value) ? Promise.resolve(value).then(fn) : fn(value)), source);

    return fns.length > 0 && isPromiseLike(result) ? Promise.resolve(result) : result;
  };
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return value !== null && (typeof value === 'object' || typeof value === 'function') && typeof (value as { then?: unknown }).then === 'function';
}
