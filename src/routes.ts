import { Router } from "express";

import { prisma } from "./utils";

export const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "alive" });
});

routes.post("/create/category", async (req, res) => {
  const name: string = req.body.name;

  const category = await prisma.category.create({ data: { name } });

  res.status(201).json({
    message: "Category Created",
    data: { category },
  });
});

routes.get("/category/:id", async (req, res) => {
  const id = req.params.id;

  const category = await prisma.category.findUnique({ where: { id } });

  res.status(200).json({ data: { category } });
});

routes.get("/categories", async (req, res) => {
  const allCategories = await prisma.category.findMany({});

  res.status(200).json({ data: allCategories });
});
