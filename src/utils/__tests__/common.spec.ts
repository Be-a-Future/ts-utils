import { alwaysTrue, bool, delay, is, isOdd, not } from '../common';

describe('is', () => {
  it('should return true if value is string', () => expect(is('null')).toEqual(true));
  it('should return true if value is number', () => expect(is(2)).toEqual(true));
  it('should return true if value is falsy but defined', () => expect(is(0)).toEqual(true));
  it('should return false if value is null', () => expect(is(null)).toEqual(false));
  it('should return false if value is undefined', () => expect(is()).toEqual(false));
});

describe('not', () => {
  it('should negate truthy value', () => expect(not('a')).toEqual(false));
  it('should negate falsy value', () => expect(not(0)).toEqual(true));
  it('should negate boolean', () => expect(not(false)).toEqual(true));
});

describe('bool', () => {
  it('should return true for truthy value', () => expect(bool('a')).toEqual(true));
  it('should return false for empty string', () => expect(bool('')).toEqual(false));
  it('should return false for zero', () => expect(bool(0)).toEqual(false));
  it('should return false for null', () => expect(bool(null)).toEqual(false));
  it('should return false for undefined', () => expect(bool()).toEqual(false));
});

describe('isOdd', () => {
  it('should return true for odd number', () => expect(isOdd(7)).toEqual(true));
  it('should return false for even number', () => expect(isOdd(8)).toEqual(false));
  it('should return false for zero', () => expect(isOdd(0)).toEqual(false));
  it('should return true for negative odd number', () => expect(isOdd(-3)).toEqual(true));
});

describe('alwaysTrue', () => {
  it('should return true', () => expect(alwaysTrue()).toEqual(true));
});

describe('delay', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('should resolve after given time', async () => {
    const resolved = jest.fn();
    const promise: Promise<unknown> = delay(100).then(resolved);

    await jest.advanceTimersByTimeAsync(99);
    expect(resolved).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(1);
    await promise;
    expect(resolved).toHaveBeenCalledTimes(1);
  });
});
