import { compose } from '../compose';

describe('compose', () => {
  it('returns an identity function when given no functions', () => {
    const source = { id: 8 };
    const promise = Promise.resolve(source);
    const identity = compose();

    expect(identity(source)).toBe(source);
    expect(identity(promise)).toBe(promise);
  });

  it('passes a value through functions from right to left', () => {
    const add5 = (value: number) => value + 5;
    const double = (value: number) => value * 2;

    const result: number = compose(add5, double)(10);

    expect(result).toEqual(25);
  });

  it('returns composed result', () => {
    const add5 = (a: number) => a + 5;
    const add10 = (a: number) => a + 10;
    const toString = (a: number): string => `${a}`;

    expect(compose(add10, add5)(20)).toEqual(35);
    expect(compose(add10, add5, add5, add10, add5)(7)).toEqual(42);
    expect(compose(toString, add5, add5)(7)).toEqual('17');
  });

  it('returns a partially applied function', () => {
    const add5 = (a: number) => a + 5;
    const add10 = (a: number) => a + 10;

    const add15 = compose(add10, add5);

    expect(add15(20)).toEqual(35);
    expect(compose(add15, add5)(5)).toEqual(25);
  });

  it('awaits an async step before passing its value to the next function', async () => {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 0));

    const fetchExample = async (_url: string) => {
      await wait();
      return { id: 8 };
    };

    const getId = compose((value: { id: number }) => value.id, fetchExample);
    const result = await getId('url-to-fetch');

    expect(result).toEqual(8);
  });

  it('supports an async step between synchronous steps', async () => {
    const calculation = compose(
      (value: number) => value * 2,
      async (value: number) => value + 1,
      (value: string) => Number(value),
    );
    const result = await calculation('4');

    expect(result).toBe(10);
  });

  it('keeps a synchronous result when a conditional step does not return a promise', async () => {
    const maybeAsync = (value: number): number | Promise<number> => (value > 0 ? Promise.resolve(value + 1) : value + 1);
    const calculation = compose((value: number) => value * 2, maybeAsync);
    const syncResult = calculation(-1);
    const asyncResult = await calculation(1);

    expect(syncResult).toBe(0);
    expect(asyncResult).toBe(4);
  });
});
