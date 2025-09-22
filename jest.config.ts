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
    "<rootDir>/src/generated/*",
    "<rootDir>/src/lib/prisma*",
    "<rootDir>/src/db/*",
    "<rootDir>/src/schemas/*",
    "<rootDir>/src/types/*"
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ["node_modules/(?!(jose)/)"]
});
