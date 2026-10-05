type PipeFn<Input, Output> = (value: Input) => Output;

export function pipe<T>(source: T): T;
export function pipe<T, A>(source: T, a: PipeFn<T, A>): A;
export function pipe<T, A, B>(source: T, a: PipeFn<T, A>, b: PipeFn<A, B>): B;
export function pipe<T, A, B, C>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
): C;
export function pipe<T, A, B, C, D>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
): D;
export function pipe<T, A, B, C, D, E>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
): E;
export function pipe<T, A, B, C, D, E, F>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
): F;
export function pipe<T, A, B, C, D, E, F, G>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
    g: PipeFn<F, G>,
): G;
export function pipe<T, A, B, C, D, E, F, G, H>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
    g: PipeFn<F, G>,
    h: PipeFn<G, H>,
): H;
export function pipe<T, A, B, C, D, E, F, G, H, I>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
    g: PipeFn<F, G>,
    h: PipeFn<G, H>,
    i: PipeFn<H, I>,
): I;
export function pipe<T, A, B, C, D, E, F, G, H, I, J>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
    g: PipeFn<F, G>,
    h: PipeFn<G, H>,
    i: PipeFn<H, I>,
    j: PipeFn<I, J>,
): J;
export function pipe<T, A, B, C, D, E, F, G, H, I, J, K>(
    source: T,
    a: PipeFn<T, A>,
    b: PipeFn<A, B>,
    c: PipeFn<B, C>,
    d: PipeFn<C, D>,
    e: PipeFn<D, E>,
    f: PipeFn<E, F>,
    g: PipeFn<F, G>,
    h: PipeFn<G, H>,
    i: PipeFn<H, I>,
    j: PipeFn<I, J>,
    k: PipeFn<J, K>,
): K;

export function pipe(source: unknown, ...fns: Array<PipeFn<unknown, unknown>>): unknown {
    return fns.reduce((value, fn) => fn(value), source);
}
