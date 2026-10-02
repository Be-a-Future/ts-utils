import { pipe } from '../pipe';

describe('pipe', () => {
  it('passes a value through functions from left to right', () => {
    const add5 = (value: number) => value + 5;
    const double = (value: number) => value * 2;

    expect(pipe(10, add5, double)).toEqual(30);
  });

  it('supports changing the value type along the chain', () => {
    const add5 = (value: number) => value + 5;
    const add2 = (value: number) => value + 2;
    const toString = (value: number) => `${value}`;
    const sayHi = (value: string) => `Hi ${value}!`;

    expect(pipe(10, add5, add2, toString, sayHi)).toEqual('Hi 17!');
  });
});
