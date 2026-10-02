import { modulo } from '../index';

describe('modulo', () => {
  it('runs ok with both params', () => {
    expect(modulo(1, 2)).toEqual(0);
    expect(modulo(3, 10)).toEqual(1);
  });

  it('runs ok curried', () => {
    const isOdd = modulo(2);
    expect(isOdd(7)).toEqual(1);
    expect(isOdd(8)).toEqual(0);
  });

  it('runs ok in real life scenario', () => {
    const isOdd = modulo(2);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    expect(array.map(isOdd)).toEqual([1, 0, 1, 0, 1, 0, 1, 0, 1, 0]);
    expect(array.filter(isOdd)).toEqual([1, 3, 5, 7, 9]);
  });
});
