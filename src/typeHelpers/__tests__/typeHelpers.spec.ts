import { isAnyArray, isNumber, isNumberArray, isString, isStringArray, isTruthy } from '../typeHelpers';

describe('isNumber', () => {
  it('should return false when string provided', () => expect(isNumber('one')).toEqual(false));
  it('should return false when string representation number provided', () => expect(isNumber('1')).toEqual(false));
  it('should return false for NaN', () => expect(isNumber(Number.NaN)).toEqual(false));
  it('should return true when number provided', () => expect(isNumber(1)).toEqual(true));
});

describe('isString', () => {
  it('should return true when string provided', () => expect(isString('text')).toEqual(true));
  it('should return false when non string provided', () => expect(isString(1)).toEqual(false));
});

describe('isTruthy', () => {
  it('should return true if value is string', () => expect(isTruthy('0')).toEqual(true));
  it('should return true if value is non zero number', () => expect(isTruthy(3)).toEqual(true));
  it('should return false if value is zero number', () => expect(isTruthy(0)).toEqual(false));
  it('should return false if value is null', () => expect(isTruthy(null)).toEqual(false));
});

describe('isAnyArray', () => {
  const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

  it('should return true when all array items match', () => expect(isAnyArray(isBoolean)([true, false])).toEqual(true));
  it('should return false when some array items do not match', () => expect(isAnyArray(isBoolean)([true, 1])).toEqual(false));
  it('should return false when value is not array', () => expect(isAnyArray(isBoolean)('true')).toEqual(false));
});

describe('isNumberArray', () => {
  it('should return true for number arrays', () => expect(isNumberArray([1, 2, 3])).toEqual(true));
  it('should return false for mixed arrays', () => expect(isNumberArray([1, '2'])).toEqual(false));
});

describe('isStringArray', () => {
  it('should return true for string arrays', () => expect(isStringArray(['a', 'b'])).toEqual(true));
  it('should return false for mixed arrays', () => expect(isStringArray(['a', 1])).toEqual(false));
});
