import { pad } from '../number';

describe('pad', () => {
  it('should return not padded number', () => expect(pad(10)).toEqual(`10`));
  it('should return padded number as string', () => expect(pad(9)).toEqual('09'));
});
