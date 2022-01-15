/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import "dotenv/config";
import NodeEnvironment from "jest-environment-node";
import util from "util";
import type { Config } from "@jest/types";
import { nanoid } from "nanoid";
import { Client } from "pg";
import { prisma } from "@prisma/client";

const exec = util.promisify(require("child_process").exec);
const prismaBinary = "./node_modules/.bin/prisma2";

export default class PrismaTestEnvironment extends NodeEnvironment {
  schema: string;
  connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    this.schema = `test_${nanoid()}`;
    this.connectionString = `${process.env.DATABASE_TEST_URL}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await exec(`${prismaBinary} generate`);
    await exec(`${prismaBinary} migrate dev`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
