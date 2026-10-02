import { failTest } from '../../jestHelper/failTest';

describe('Test of failTest', () => {
  it('Should throw error with correct message', () => {
    expect(() => failTest('custom message')).toThrowError(new Error('Test failed: custom message'));
  });
});
