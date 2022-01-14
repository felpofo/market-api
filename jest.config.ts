import path from "path";
import type { Config } from "@jest/types";

export default <Config.InitialOptions>{
  preset: "ts-jest",
  verbose: true,
  testEnvironment: path.join(__dirname, "./prisma/prisma-test-environment.ts"),
  testRegex: "(/tests/.*|(\\.|/)(test))\\.(ts)$",
};
