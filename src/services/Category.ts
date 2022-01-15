import { prisma } from "../utils";

export class CreateCategoryService {
  async execute(name: string) {
    if (!name) return { error: "Invalid Category Name" };

    const alreadyExists = await prisma.category.findUnique({ where: { name } });
    if (alreadyExists) return { error: "Category Already Exists" };

    return await prisma.category.create({ data: { name } });
  }
}
