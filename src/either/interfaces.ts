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
