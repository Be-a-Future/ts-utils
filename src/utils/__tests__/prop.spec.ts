import { prop } from '../index';

describe('prop', () => {
  it('returns right property when passed in as two params', () => {
    expect(prop('name', { name: 'test 1' })).toEqual('test 1');
  });

  it('returns right property when curried', () => {
    expect(prop('name')({ name: 'test 152' })).toEqual('test 152');
  });
});
