import { curry } from '../functional-programming';
import { ValueOf } from './common';

type Prop = {
  <T>(property: keyof T, object: T): ValueOf<T>;
  <T>(property: keyof T): (object: T) => ValueOf<T>;
};

export const prop: Prop = curry(<T>(property: keyof T, object: T) => object[property]);
