import { is } from '../utils';

export const isNumber = (value: unknown): value is number => typeof value === 'number' && !isNaN(value);
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isTruthy = <T>(value: T): boolean => !!value && is(value);

export type PartialTypeGuard<T, U extends T> = (value: T) => value is U;
export type TypeGuard<T> = PartialTypeGuard<unknown, T>;
export const isAnyArray =
  <T>(valueCheck: TypeGuard<T>): TypeGuard<T[]> =>
  (arr: unknown): arr is T[] =>
    Array.isArray(arr) && arr.reduce<boolean>((acc, v) => acc && valueCheck(v as unknown), true);

export const isNumberArray = isAnyArray(isNumber);
export const isStringArray = isAnyArray(isString);
