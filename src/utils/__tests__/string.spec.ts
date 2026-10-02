import { lower, trim } from '../string';

describe('trim', () => {
  it('should remove surrounding whitespace', () => expect(trim('  hello  ')).toEqual('hello'));
});

describe('lower', () => {
  it('should convert string to lower case', () => expect(lower('HeLLo')).toEqual('hello'));
});
