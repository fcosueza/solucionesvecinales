import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./"
});

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/tests"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/prisma/*",
    "<rootDir>/src/lib/prisma.ts"
  ]
};

export default createJestConfig(config);
