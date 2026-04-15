import { OpenAPIHono } from "@hono/zod-openapi";
import {
  GetProductBySlugSchema,
  ProductQuerySchema,
  ProductSchema,
  ProductsSchema,
} from "./schema";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export const productRoute = new OpenAPIHono();
const tag = ["products"];

// Get All Product
productRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all products",
    tags: tag,
    request: {
      query: ProductQuerySchema,
    },
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
      const { minPrice, maxPrice, page } = c.req.valid("query");

      const ITEMS_PER_PAGE = 10;
      const currentPage = page ?? 1;
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;

      const where: Prisma.ProductWhereInput = {};

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};

        if (minPrice !== undefined) where.price.gte = Number(minPrice);
        if (maxPrice !== undefined) where.price.lte = Number(maxPrice);
      }
      const products = await prisma.product.findMany({
        where,
        include: { variant: true },
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: { createdAt: "desc" },
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
