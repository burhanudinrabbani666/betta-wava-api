import { prisma } from "../src/lib/prisma";
import { products } from "../src/modules/product/data";
import slugify from "slugify";

async function main() {
  for (const product of products) {
    const slug = slugify(product.name, { lower: true }); // TODO: extract as function

    const upsertedProduct = await prisma.product.upsert({
      where: {
        slug,
      },
      update: {
        ...product,
        slug,
      },
      create: {
        ...product,
        slug,
      },
    });

    console.log(`🐠 ${upsertedProduct.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
