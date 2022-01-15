import { Router } from "express";
import { prisma } from "./utils";

import * as controllers from "./controllers";
// import * as m from "./middlewares";

export const routes = Router();

routes.get("/", (req, res) => res.sendStatus(200));

routes.get("/category", async (req, res) => {
  const allCategories = await prisma.category.findMany();

  res.status(200).json({ data: allCategories });
});

routes.get("/category/:id", async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({ where: { id } });

  res.status(200).json({ data: { category } });
});

const createCategory = new controllers.category.CreateCategoryController();
routes.post("/create/category", createCategory.handle);
