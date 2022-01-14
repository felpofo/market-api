import request from "supertest";

import { app } from "../app";

describe("routes", () => {
  test("GET /", () => {
    request(app)
      .get("/")
      .expect({ message: "alive" })
      .end((err) => {
        if (err) throw err;
      });
  });

  test("POST /category", () => {
    request(app).post("/category").set("name": "")
  });
});
