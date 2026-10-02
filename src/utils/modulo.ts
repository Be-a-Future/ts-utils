import { curry } from '../functional-programming';

export type Modulo = {
  (divisor: number, dividend: number): number;
  (divisor: number): (dividend: number) => number;
};

export const modulo: Modulo = curry((divisor, dividend) => dividend % divisor);
