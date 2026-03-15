import { OpenAPIHono } from "@hono/zod-openapi";
import {
  GetProductBySlugSchema,
  ProductSchema,
  ProductsSchema,
} from "./schema";
import { prisma } from "../../lib/prisma";

export const productRoute = new OpenAPIHono();
const tag = ["products"];

// Get All Product
productRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all products",
    tags: tag,
    responses: {
      200: {
        description: "Successfully get products",
        content: { "application/json": { schema: ProductsSchema } },
      },
      500: { description: "Failed to get products" },
    },
  },
  async (c) => {
    try {
      const products = await prisma.product.findMany({
        include: { variant: true },
      });

      return c.json(products, 200);
    } catch (error) {
      return c.json({ message: "Failed to get Product", error }, 500);
    }
  },
);

// Get One Product by Slug
productRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get one product",
    tags: tag,
    request: { params: GetProductBySlugSchema },
    responses: {
      200: {
        description: "Successfully get products",
        content: { "application/json": { schema: ProductSchema } },
      },
      500: { description: "Failed to get products" },
      400: { description: "Product not found!" },
    },
  },
  async (c) => {
    try {
      const { slug } = c.req.valid("param");

      const product = await prisma.product.findUnique({
        where: { slug },
        include: { variant: true },
      });

      if (!product) return c.json({ message: "Product not found!", slug }, 404);

      return c.json(product, 200);
    } catch (error) {
      return c.json({ message: "Failed to get product", error }, 500);
    }
  },
);
