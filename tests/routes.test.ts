/* eslint-disable @typescript-eslint/no-empty-function */
import request from "supertest";
import * as faker from "faker";

import { app } from "../src/app";
import { prisma } from "../src/utils";

describe("HTTP", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe("GET", () => {
    test("/", async () => {
      await request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /text/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({});
        })
        .catch((err) => {
          throw err;
        });
    });

    test("/category", async () => {
      await request(app)
        .get("/categories")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.data).toEqual([]);
        })
        .catch((err) => {
          throw err;
        });
    });

    test("/category/:id", async () => {
      const category = await prisma.category.create({
        data: {
          name: faker.commerce.department(),
        },
      });

      await request(app)
        .get("/category/:id")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.data).toMatchObject(category);
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe("POST", () => {
    describe("/create", () => {
      test("/category", async () => {
        await request(app)
          .post("/create/category")
          .send({ name: faker.commerce.department() })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .then((res) => {
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

  describe("PUT", () => {});

  describe("DELETE", () => {});

  describe("PATCH", () => {});
});
