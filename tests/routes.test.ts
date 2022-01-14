import { Category } from "@prisma/client";
import request from "supertest";

import { app } from "../src/app";

describe("routes", () => {
  test("/", () => {
    request(app)
      .get("/")
      .expect(200)
      .expect({ message: "alive" })
      .end((err) => {
        if (err) throw err;
      });
  });

  describe("GET", () => {
    test("/category/1", () => {
      request(app)
        .post("/category")
        .set({ name: "pedrao" })
        .expect(201)
        .expect({
          message: "Category Created",
          data: <Category>{},
        });
    });

    test("/create/category", () => {
      request(app)
        .post("/category")
        .set({ name: "pedrao" })
        .expect(201)
        .expect({
          message: "Category Created",
          data: <Category>{},
        });
    });
  });

  describe("POST", () => {
    test("/category", () => {
      request(app)
        .post("/category")
        .set({ name: "pedrao" })
        .expect(201)
        .expect({
          message: "Category Created",
          data: <Category>{},
        });
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("PUT", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("DELETE", () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("PATCH", () => {});
});
