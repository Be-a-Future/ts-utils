import { curry } from '../functional-programming';

export type Equals = {
  <A, B>(a: A, b: B): boolean;
  <A, B>(a: A): (b: B) => boolean;
};
export const equals: Equals = curry((a, b) => a === b);

export const notEqual: Equals = curry((a, b) => a !== b);
