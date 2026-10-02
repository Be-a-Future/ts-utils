import {
  concat,
  cutHead,
  filter,
  find,
  groupBy,
  groupByAndMap,
  head,
  isArray,
  isEmpty,
  isEmptyOptional,
  last,
  length,
  map,
  prepend,
  remove,
  splitAt,
  tail,
  toArray,
  transformMap,
  uniqueBy,
  isLast,
} from '../array';

describe('head', () => {
  it('should return first element of array', () => expect(head([2, 1, 3])).toEqual(2));
  it('should return undefined when array is empty', () => expect(head([])).toEqual(undefined));
  it('should return undefined when array is undefined', () => expect(head()).toEqual(undefined));
});

describe('last', () => {
  it('should return last element of array', () => expect(last([2, 1, 3])).toEqual(3));
  it('should return undefined when array is empty', () => expect(last([])).toEqual(undefined));
});

describe('tail', () => {
  it('should return array without first element', () => expect(tail([2, 1, 3])).toEqual([1, 3]));
  it('should return empty array when input is empty', () => expect(tail([])).toEqual([]));
  it('should return empty array when input is omitted', () => expect(tail()).toEqual([]));
});

describe('isArray', () => {
  it('should return true for arrays', () => expect(isArray([1, 2, 3])).toEqual(true));
  it('should return false for non arrays', () => expect(isArray(1)).toEqual(false));
});

describe('cutHead', () => {
  it('should split array into head and tail', () => expect(cutHead([1, 2, 3])).toEqual({ head: 1, tail: [2, 3] }));
});

describe('length', () => {
  it('should return array length', () => expect(length([1, 2, 3])).toEqual(3));
});

describe('isEmpty', () => {
  it('should return true for empty array', () => expect(isEmpty([])).toEqual(true));
  it('should return false for non empty array', () => expect(isEmpty([1])).toEqual(false));
});

describe('isEmptyOptional', () => {
  it('should return true', () => expect(isEmptyOptional([])).toEqual(true));
  it('should return true', () => expect(isEmptyOptional([null, undefined])).toEqual(true));
  it('should return false', () => expect(isEmptyOptional([1, 2, 3])).toEqual(false));
  it('should return false', () => expect(isEmptyOptional([0, ''])).toEqual(false));
  it('should return false', () => expect(isEmptyOptional([null, 1])).toEqual(false));
});

describe('isLast', () => {
  it('should return true for last index', () => expect(isLast(2, [1, 2, 3])).toEqual(true));
  it('should return false for non last index', () => expect(isLast(1, [1, 2, 3])).toEqual(false));
  it('should return false for index larger than array length', () => expect(isLast(3, [1, 2, 3])).toEqual(false));
  it('should return false for empty array', () => expect(isLast(0, [])).toEqual(false));
  it('should return false for negative index', () => expect(isLast(-1, [1, 2, 3])).toEqual(false));
});

describe('splitAt', () => {
  it('splits array', () => {
    expect(splitAt(0, [])).toEqual([[], []]);
    expect(splitAt(0, [1, 2])).toEqual([[], [1, 2]]);
    expect(splitAt(1, [1, 2])).toEqual([[1], [2]]);
    expect(splitAt(2, [1, 2])).toEqual([[1, 2], []]);
    expect(splitAt(3, [1, 2])).toEqual([[1, 2], []]);
  });
});

describe('groupBy', () => {
  it('should group return grouped Map', () => {
    const arr = [
      { a: 'first', b: false },
      { a: 'first', 3: 'foo' },
      { a: 'second', b: false },
      { a: 'third', 3: 'foo' },
    ];
    const expectedResult = new Map([
      [
        'first',
        [
          { a: 'first', b: false },
          { a: 'first', 3: 'foo' },
        ],
      ],
      ['second', [{ a: 'second', b: false }]],
      ['third', [{ a: 'third', 3: 'foo' }]],
    ]);
    expect(groupBy(arr, (arr) => arr.a)).toEqual(expectedResult);
  });
});

describe('uniqueBy', () => {
  it('should return same array with unique identifiers', () => {
    const arr = [
      { a: 'first', b: false },
      { a: 'second', b: false },
    ];
    expect(uniqueBy(arr, (arr) => arr.a)).toEqual(arr);
  });
  it('should return array with unique identifiers only', () => {
    const arr = [
      { a: 'first', b: false },
      { a: 'second', b: false },
      { a: 'first', b: true },
    ];
    const resultArr = [
      { a: 'first', b: false },
      { a: 'second', b: false },
    ];
    expect(uniqueBy(arr, (arr) => arr.a)).toEqual(resultArr);
  });
});

describe('transformMap', () => {
  it('should return transformed map', () => {
    const map = new Map([
      ['first', [0, 1]],
      ['second', [2, 3]],
    ]);
    const resultMap = new Map([
      ['first', [1, 0]],
      ['second', [3, 2]],
    ]);
    expect(transformMap(map, (v) => [v[1], v[0]])).toEqual(resultMap);
  });
});

describe('groupByAndMap', () => {
  it('should return transformed grouped Map', () => {
    const arr = [
      { a: 'first', b: [0, 1] },
      { a: 'second', b: [2, 3] },
      { a: 'first', b: [4, 5] },
    ];
    const result = new Map([
      ['first', [1, 0]],
      ['second', [3, 2]],
    ]);
    expect(
      groupByAndMap(
        arr,
        (arr) => arr.a,
        ([v]) => [v.b[1], v.b[0]],
      ),
    ).toEqual(result);
  });
});

describe('toArray', () => {
  it('should wrap scalar into array', () => expect(toArray(1)).toEqual([1]));
  it('should keep array unchanged', () => expect(toArray([1, 2])).toEqual([1, 2]));
});

describe('remove', () => {
  it('should remove matching values', () => expect(remove(2, [1, 2, 3, 2])).toEqual([1, 3]));
  it('should support curried usage', () => expect(remove(2)([1, 2, 3])).toEqual([1, 3]));
});

describe('concat', () => {
  it('should concatenate arrays', () => expect(concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]));
  it('should support curried usage', () => expect(concat([1, 2])([3, 4])).toEqual([1, 2, 3, 4]));
});

describe('prepend', () => {
  it('should prepend value to array', () => expect(prepend(1, [2, 3])).toEqual([1, 2, 3]));
  it('should prepend value of another type to array', () => expect(prepend('A', [2, 3])).toEqual(['A', 2, 3]));
  it('should prepend value to empty array', () => expect(prepend(1, [])).toEqual([1]));

  describe('preped curried', () => {
    it('should prepend value to array', () => expect(prepend(1)([2, 3])).toEqual([1, 2, 3]));
    it('should prepend value of another type to array', () => expect(prepend('A')([2, 3])).toEqual(['A', 2, 3]));
    it('should prepend value to empty array', () => expect(prepend(1)([])).toEqual([1]));
  });
});

describe('find', () => {
  it('should return first matching item', () => expect(find((value: number) => value > 1, [1, 2, 3])).toEqual(2));
  it('should support curried usage', () => expect(find((value: number) => value > 3)([1, 2, 3])).toEqual(undefined));
});

describe('filter', () => {
  it('should filter array', () => expect(filter((value: number) => value > 1, [1, 2, 3])).toEqual([2, 3]));
  it('should support curried usage', () => expect(filter((value: number) => value > 1)([1, 2, 3])).toEqual([2, 3]));
});

describe('map', () => {
  it('should map array', () => expect(map((value: number) => value * 2, [1, 2, 3])).toEqual([2, 4, 6]));
  it('should support curried usage', () => expect(map((value: number) => value * 2)([1, 2])).toEqual([2, 4]));
});
