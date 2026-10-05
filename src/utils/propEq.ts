import { curry, pipe } from '../functional-programming';
import { equals } from './equals';
import { prop } from './prop';

type PropEq = {
  <T, V>(property: keyof T, value: V, object: T): boolean;
  <T, V>(property: keyof T, value: V): (object: T) => boolean;
  <T, V>(property: keyof T): (value: V) => (object: T) => boolean;
};

export const propEq: PropEq = curry(<T, V>(property: keyof T, value: V, object: T) => pipe(object, prop(property), equals(value)));
