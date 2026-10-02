import { compose } from '../compose';

describe('compose', () => {
  it('passes a value through functions from right to left', () => {
    const add5 = (value: number) => value + 5;
    const double = (value: number) => value * 2;

    expect(compose(add5, double)(10)).toEqual(25);
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

  it('returns fetched async data', async () => {
    const Future = async (promise: unknown) => await Promise.resolve(promise);

    const wait = () => new Promise((resolve) => setTimeout(resolve, 0));

    const fetchExample = async (_url: string) => {
      await wait();
      return { id: 8 };
    };

    const fetch = compose(Future, fetchExample);

    expect(await fetch('url-to-fetch')).toEqual({ id: 8 });
  });
});
