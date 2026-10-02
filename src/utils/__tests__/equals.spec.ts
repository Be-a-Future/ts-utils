import { equals, notEqual } from '../index';

describe('equals', () => {
  it('compares 2 numbers', () => {
    expect(equals(4, 4)).toEqual(true);
    expect(equals(4, 2)).toEqual(false);
    expect(equals(3)(3)).toEqual(true);
    expect(equals(3)(1)).toEqual(false);
  });

  it('compares 2 strings', () => {
    expect(equals('a', 'a')).toEqual(true);
    expect(equals('a', 'b')).toEqual(false);
  });

  describe('notEqual', () => {
    it('compares 2 numbers', () => {
      expect(notEqual(4, 4)).toEqual(false);
      expect(notEqual(4, 2)).toEqual(true);
      expect(notEqual(3)(3)).toEqual(false);
      expect(notEqual(3)(1)).toEqual(true);
    });
  });
});
