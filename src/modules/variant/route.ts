import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { GetProducstByVariantSchema, ProductsSchema } from "../product/schema";

export const variantRoute = new OpenAPIHono();
const tag = ["variant"];

variantRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get products by Variant",
    tags: tag,
    request: { params: GetProducstByVariantSchema },
    responses: {
      200: {
        description: "Successfully get products",
        content: { "application/json": { schema: ProductsSchema } },
      },
      500: { description: "Failed to get products" },
    },
  },
  async (c) => {
    const { slug } = c.req.valid("param");

    try {
      const products = await prisma.product.findMany({
        where: { variant: { slug } },
        include: { variant: true },
      });

      return c.json(products, 200);
    } catch (error) {
      return c.json({ message: "Failed to get Product", error }, 500);
    }
  },
);
