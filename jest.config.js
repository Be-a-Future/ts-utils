/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env.TZ = 'Etc/UTC';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  reporters: ['default', 'jest-junit'],
  coverageDirectory: '<rootDir>/../coverage',
  coverageReporters: ['text', 'json-summary', 'lcov', 'cobertura'],
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 },
  },
};
