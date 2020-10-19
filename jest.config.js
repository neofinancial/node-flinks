module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json'
    }
  },
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/src/']
};
