module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/api/**/*.ts', '!<rootDir>/node_modules/'],
  coverageReporters: ['html', 'text-summary'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'reports/coverage',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
