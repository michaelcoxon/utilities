import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src/"],
  verbose: true,
  coverageReporters: ['html', 'json'],
  coverageDirectory: "<rootDir>/coverage"
};

export default config;