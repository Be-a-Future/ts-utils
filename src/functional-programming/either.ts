import { Either, isLeft, isRight, Left, Right } from '@smidhonza/either';

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

export type Maybe<T> = Either<Error, T>;
