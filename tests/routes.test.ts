/* eslint-disable @typescript-eslint/no-empty-function */
import { Category } from "@prisma/client";
import request from "supertest";

import { app } from "../src/app";

describe("routes", () => {
  test("a", () => {
    request(app).get("/").expect(200);
  });

  describe("GET", () => {});

  describe("POST", () => {});

  describe("PUT", () => {});

  describe("DELETE", () => {});

  describe("PATCH", () => {});
});
