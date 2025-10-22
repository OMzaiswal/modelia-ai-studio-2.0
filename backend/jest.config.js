module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*-simple.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true,
};
