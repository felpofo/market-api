import { Router } from "express";
import { prisma } from "./utils";

// import * as c from "./controllers";
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

routes.post("/create/category", async (req, res) => {
  const name: string = req.body.name;

  const category = await prisma.category.create({ data: { name } });

  res.status(201).json({
    message: "Category Created",
    data: { category },
  });
});
