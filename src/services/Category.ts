import { prisma } from "../utils";

class CreateCategoryService {
  async execute(name: string) {
    if (!name) return { error: "Invalid Category Name" };

    const alreadyExists = await prisma.category.findUnique({ where: { name } });
    if (alreadyExists) return { error: "Category Already Exists" };

    const category = await prisma.category
      .create({ data: { name } })
      .then((category) => category)
      .catch((err) => {
        console.log("Unhandled Error");
        console.error(err);

        return { error: err };
      });

    return category;
  }
}

export default {
  CreateCategoryService,
};
