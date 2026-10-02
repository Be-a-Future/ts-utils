/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env.TZ = 'Etc/UTC';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  reporters: ['default', 'jest-junit'],
};
