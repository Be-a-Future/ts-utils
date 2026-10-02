import { compose } from '../functional-programming';
import { modulo } from './modulo';

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];

export const not = <T>(input: T): boolean => !input;

export const is = <T>(value?: Nullable<T>): value is T => value !== undefined && value !== null;

/**
 *
 * @param {Nullable<T> | undefined} expression
 * @return {boolean}
 */
export const bool = <T>(expression?: Nullable<T>): boolean => !!expression;
interface IsOdd {
  (number: number): boolean;
}

export const isOdd: IsOdd = compose(bool, modulo(2));
export const alwaysTrue = (): true => true;

export const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
