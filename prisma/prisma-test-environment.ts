/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import NodeEnvironment from "jest-environment-node";
import util from "util";
import { nanoid } from "nanoid";
import { Client } from "pg";

const exec = util.promisify(require("child_process").exec);
const prismaBinary = "./node_modules/.bin/prisma2";

class PrismaTestEnvironment extends NodeEnvironment {
  schema: string;
  connectionString: string;

  constructor(config: any) {
    super(config);

    // Generate a unique schema identifier for this test context
    this.schema = `test_${nanoid()}`;

    // Generate the pg connection string for the test schema
    this.connectionString = `postgresql://prisma:prisma@localhost:4444/prisma?schema=${this.schema}`;
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.POSTGRES_URL = this.connectionString;
    this.global.process.env.POSTGRES_URL = this.connectionString;

    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} migrate up --experimental`);

    return super.setup();
  }

  async teardown() {
    // Drop the schema after the tests have completed
    const client = new Client({
      connectionString: this.connectionString,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;