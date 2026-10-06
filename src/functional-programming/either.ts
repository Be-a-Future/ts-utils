export interface ILeft<T> {
  value: T;
  tag: 'left';
}

export interface IRight<T> {
  value: T;
  tag: 'right';
}

export type Either<A, B> = ILeft<A> | IRight<B>;
export type Maybe<T> = Either<Error, T>;

export const Left = <A>(val: A): ILeft<A> => ({ value: val, tag: 'left' });
export const Right = <B>(val: B): IRight<B> => ({ value: val, tag: 'right' });
export const isLeft = <A, B>(val: Either<A, B>): val is ILeft<A> => (val as ILeft<A>).tag === 'left';
export const isRight = <A, B>(val: Either<A, B>): val is IRight<B> => (val as IRight<B>).tag === 'right';

export const either = <L, R, A, B>(leftFn: (left: L) => A, rightFn: (right: R) => B, value: Either<L, R>): A | B => {
  if (isLeft(value)) {
    return leftFn(value.value);
  }

  return rightFn(value.value);
};

export const whenRight =
  <L, R, T>(resolve: (value: R) => Promise<T> | T) =>
  async (value: Either<L, R> | Promise<Either<L, R>>) => {
    const result = await value;
    return isRight(result) ? resolve(result.value) : result;
  };

export const tryCatch = async <T>(fn: () => Promise<T>): Promise<Maybe<T>> => {
  try {
    return Right(await fn());
  } catch (error) {
    return Left(error as Error);
  }
};
