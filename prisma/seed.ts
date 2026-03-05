import { prisma } from "../src/lib/prisma";
import { products } from "../src/modules/product/data";
import slugify from "slugify";

async function main() {
  for (const product of products) {
    const slug = slugify(product.variant, { lower: true });

    const upsertedProductVariant = await prisma.variant.upsert({
      where: { slug },
      update: { name: product.variant, slug },
      create: { name: product.variant, slug },
    });

    console.log(`🐟 ${upsertedProductVariant.name}`);
  }

  for (const product of products) {
    const slug = slugify(product.name, { lower: true });
    const variantSlug = slugify(product.variant, { lower: true });

    const upsertProduct = await prisma.product.upsert({
      where: { slug },
      update: {
        name: product.name,
        price: product.price,
        stockLevel: product.stockLevel,
        sku: product.sku,
        thumbnailUrl: product.thumbnailUrl,
        imagesUrls: product.imageUrls,
        variant: {
          connect: {
            slug: variantSlug,
          },
        },
      },
      create: {
        name: product.name,
        slug,
        price: product.price,
        stockLevel: product.stockLevel,
        sku: product.sku,
        thumbnailUrl: product.thumbnailUrl,
        imagesUrls: product.imageUrls,
        variant: {
          connect: {
            slug: variantSlug,
          },
        },
      },
    });

    console.log(`🐟 ${upsertProduct.name}`);
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
