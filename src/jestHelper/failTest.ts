/**
 * This function shall be used in jest __tests__ as a fail() method.
 * Since jest v27, no native fail method is provided. (see: https://github.com/facebook/jest/issues/11698)
 * DOES NOT WORK in __tests__ with try catch (since it fails by throwing an error).
 * This function must be explicitly typed as below so CFA work as exptected. (see: //https://github.com/microsoft/TypeScript/issues/37998)
 * @param failMessage Message to be shown when test failed.
 */
export const failTest: (failMessage: string) => never = (failMessage) => {
  throw new Error('Test failed: ' + failMessage);
};
