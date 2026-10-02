import { isObjectEmpty } from '../object';

describe('isObjectEmpty', () => {
  it('should return false for object with not nullish property', () => expect(isObjectEmpty({ foo: 'bar' })).toEqual(false));
  it('should return false for object with property null', () => expect(isObjectEmpty({ foo: null })).toEqual(false));
  it('should return false for object with property undefined', () => expect(isObjectEmpty({ foo: undefined })).toEqual(false));
  it('should return true for object without property', () => expect(isObjectEmpty({})).toEqual(true));
});
