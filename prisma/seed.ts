/* eslint-disable no-async-promise-executor */
import { PrismaClient } from "@prisma/client";

export async function seed(prisma: PrismaClient) {
  await prisma.product.create({
    data: {
      name: "Coca-Cola",
      price: 8.99,
      weight: 2,
      weightType: "L",
      brand: {
        create: {
          name: "CVI",
          contact: "cvicompany@cvicompany.com",
        },
      },
      isAvailable: true,
      description: "singaro da cancer",
      categories: {
        create: {
          name: "Refrigerantes",
        },
      },
    },
  });

  console.log(
    "Created products: ",
    (await prisma.product.findMany()).map((v) => v.name).join(", ")
  );
  console.log(
    "Created brands: ",
    (await prisma.brand.findMany()).map((v) => v.name).join(", ")
  );
  console.log(
    "Created categories: ",
    (await prisma.category.findMany()).map((v) => v.name).join(", ")
  );

  prisma.$disconnect();
}
