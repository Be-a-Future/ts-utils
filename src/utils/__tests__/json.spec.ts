import { parseJson } from '../json';

describe('json utils', () => {
  describe('parseJson', () => {
    it('should return undefined for invalid JSON', () => {
      expect(parseJson('abc')).toBeUndefined();
    });

    it('should return undefined for malformed JSON', () => {
      expect(parseJson('{a: 1}')).toBeUndefined();
    });

    it('should parse valid JSON', () => {
      expect(parseJson(JSON.stringify({ a: 1 }))).toEqual({ a: 1 });
      expect(parseJson('[0]')).toEqual([0]);
    });
  });
});
