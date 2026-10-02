import { curry } from '../functional-programming';
import { is, notEqual, Optional } from '../utils';

export const head: <T>(array?: T[]) => Optional<T> = (array?) => array?.[0];
export const last: <T>(array: T[]) => Optional<T> = (array) => array[array.length - 1];
export const tail = <T>(array: T[] = []): T[] => array.slice(1);
export const isArray = <T>(array: T | T[]): array is T[] => Array.isArray(array);
export const cutHead = <T>([head, ...tail]: T[]): { head: T; tail: T[] } => ({ head, tail });
export const length = <T>(arr: T[]) => arr.length;
export const isEmpty = <T>(array: T[]) => length(array) === 0;
export const isEmptyOptional = <T>(array: Optional<T[] | null>) => !array || !array.some(is);
export const isLast = <T>(index: number, array: T[]) => index === length(array) - 1;

export const splitAt = <T>(index: number, [...array]: T[]): [T[], T[]] => {
  return [array.splice(0, index), array];
};
export const uniqueBy = <K, V>(array: V[], groupCb: (item: V) => K) => {
  const memo = new Map<K, V>();
  array.forEach((item) => {
    const key = groupCb(item);

    if (!memo.has(key)) {
      memo.set(key, item);
    }
  });

  return Array.from(memo.values());
};

export const transformMap = <K, V, R>(source: Map<K, V>, transformer: (value: V, key: K) => R) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));

export const groupBy = <K, V>(array: V[], groupCb: (item: V) => K) =>
  array.reduce((grouped, element) => {
    const key = groupCb(element);
    if (!grouped.has(key)) {
      grouped.set(key, [element]);
    } else {
      grouped.get(key)?.push(element);
    }

    return grouped;
  }, new Map<K, V[]>());

export const groupByAndMap = <T, K, R>(array: T[], grouper: (x: T) => K, mapper: (x: T[]) => R) => transformMap(groupBy(array, grouper), (value) => mapper(value));

export const toArray = <T>(value: T | T[]): T[] => (isArray(value) ? value : [value]);

export type Remove = {
  <T>(remove: T, from: T[]): T[];
  <T>(remove: T): (from: T[]) => T[];
};
export const remove: Remove = curry(<T, R>(value: T, array: R[]): R[] => filter(notEqual(value), array));

export type Concat = {
  <A, B>(a: A, b: B): A;
  <A, B>(a: A): (b: B) => A;
};
export const concat: Concat = curry((head, tail) => head.concat(tail));

export type Prepend = {
  <T, A extends Array<unknown>>(value: T, array: A): [T, ...A];
  <T, A extends Array<unknown>>(value: T): (array: A) => [T, ...A];
};
export const prepend: Prepend = curry(<T, A extends Array<unknown>>(value: T, array: A): [T, ...A] => [value, ...array]);

export type Find = {
  <T>(func: (bit: T) => boolean, array: T[]): Optional<T>;
  <T>(func: (bit: T) => boolean): (array: T[]) => Optional<T>;
};
export const find: Find = curry((func, array) => array.find(func));

export type Filter = {
  <T>(func: (a: T, index: number) => boolean, over: T[]): T[];
  <T>(func: (a: T, index: number) => boolean): (over: T[]) => T[];
};

export const filter: Filter = curry((func, array) => array.filter(func));

export type TMap = {
  <T, R>(func: (a: T, index: number) => R, over: T[]): R[];
  <T, R>(func: (a: T, index: number) => R): (over: T[]) => R[];
};

export const map: TMap = curry((func, array) => array.map(func));
