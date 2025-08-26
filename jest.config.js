/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'src/lib/queries.ts',
    'src/pages/**/*.{ts,astro}',
    '!src/pages/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^../src/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^../../lib/(.*)$': '<rootDir>/src/lib/$1',
    '^../../../lib/(.*)$': '<rootDir>/src/lib/$1'
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'esnext',
        target: 'es2022'
      }
    }]
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
  testTimeout: 30000,
  verbose: true,
  bail: false,
  maxWorkers: 1 // Run tests serially to avoid database conflicts
}