import { is } from '../common';

describe('is', () => {
  it('should return true if value is string', () => expect(is('null')).toEqual(true));
  it('should return true if value is number', () => expect(is(2)).toEqual(true));
  it('should return false if value is null', () => expect(is(null)).toEqual(false));
  it('should return true if value is undefined', () => expect(is()).toEqual(false));
});
