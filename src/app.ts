import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.post("/category", async (req, res) => {
  const name: string = req.body.name;

  const category = await prisma.category.create({ data: { name } });

  res.json({
    message: "Category Created",
    data: { category },
  });
});

app.get("/category/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const category = await prisma.category.findUnique({ where: { id } });

  res.json({ data: { category } });
});

app.get("/categories", async (req, res) => {
  const allCategories = await prisma.category.findMany({});

  res.json({ data: allCategories });
});
