import { propEq } from '../propEq';

describe('propEq', () => {
  it('compares a property value directly', () => {
    expect(propEq('name', 'test', { name: 'test' })).toEqual(true);
    expect(propEq('name', 'test', { name: 'other' })).toEqual(false);
  });

  it('compares a property value when curried', () => {
    expect(propEq('name', 'test')({ name: 'test' })).toEqual(true);
    expect(propEq('name')('test')({ name: 'other' })).toEqual(false);
  });
});
