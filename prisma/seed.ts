import { prisma } from "../src/lib/prisma";
import { products } from "../src/modules/product/data";
import slugify from "slugify";

async function main() {
  for (const product of products) {
    const upsertProduct = await prisma.product.upsert({
      where: {
        slug: slugify(product.name),
      },
      update: {
        name: product.name,
        price: product.price,
        stockLevel: product.stockLevel,
        sku: product.sku,
        thumbnail: product.thumbnail,
        images: product.images,
      },
      create: {
        name: product.name,
        slug: slugify(product.name),
        price: product.price,
        stockLevel: product.stockLevel,
        sku: product.sku,
        thumbnail: product.thumbnail,
        images: product.images,
      },
    });

    console.log(`${upsertProduct.name} successfully upsert 🥳`);
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
