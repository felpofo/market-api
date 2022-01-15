/* eslint-disable @typescript-eslint/no-empty-function */
import request from "supertest";
import * as faker from "faker";

import { app } from "../src/app";
import { Category, PrismaClient } from "@prisma/client";

describe("HTTP", () => {
  const prisma = new PrismaClient();
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    prisma.$disconnect();
    setTimeout(() => process.exit(), 1000);
  });

  describe("GET", () => {
    test("/", () => {
      request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /text/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).toEqual({});
        });
    });

    test("/category", () => {
      request(app)
        .get("/category")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.data).toEqual([]);
        });
    });

    test("/category/:id", () => {
      request(app)
        .get("/category/99999999999999999999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body.data).toMatchObject({});
        });
    });
  });

  describe("POST", () => {
    describe("/create", () => {
      test("/category", () => {
        request(app)
          .post("/create/category")
          .send({ name: faker.commerce.department() })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            if (err) throw err;

            expect(res.body).toHaveProperty(["message", "data"]);
          });
      });
    });
  });

  describe("PUT", () => {});

  describe("DELETE", () => {});

  describe("PATCH", () => {});
});
