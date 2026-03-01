import { OpenAPIHono } from "@hono/zod-openapi";
import {
  GetProductBySlug,
  ProductSchema,
  ProductsSchema,
  SearchQueryParams,
} from "./schema";
import { prisma } from "../../lib/prisma";

export const productRoute = new OpenAPIHono();

const tag = ["products"];

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
      500: {
        description: "Failed to get products",
      },
    },
  },
  async (c) => {
    try {
      const products = await prisma.product.findMany();

      return c.json(products, 200);
    } catch (error) {
      return c.json({ message: "Failed to get all products", error }, 500);
    }
  },
);

// Search Product
productRoute.openapi(
  {
    method: "get",
    path: "/search",
    description: "Search products",
    tags: tag,
    request: {
      query: SearchQueryParams,
    },
    responses: {
      200: {
        description: "Successfully get products",
        content: { "application/json": { schema: ProductSchema } },
      },
      500: {
        description: "Failed to get products",
      },
      400: {
        description: "Product not found",
      },
    },
  },
  async (c) => {
    try {
      const { q } = c.req.valid("query");

      const foundProduct = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
      });

      if (!foundProduct) return c.json({ message: "Product not found" }, 404);

      return c.json(foundProduct, 200);
    } catch (error) {
      return c.json({ message: "Failed to get product", error }, 500);
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
    request: {
      params: GetProductBySlug,
    },
    responses: {
      200: {
        description: "Successfully get products",
        content: { "application/json": { schema: ProductSchema } },
      },
      500: {
        description: "Failed to get one product",
      },
      404: {
        description: "Product not found",
      },
    },
  },
  async (c) => {
    try {
      const { slug } = c.req.valid("param");

      const product = await prisma.product.findUnique({
        where: {
          slug,
        },
      });

      if (!product) return c.json({ message: "Product not found", slug }, 404);

      return c.json(product, 200);
    } catch (error) {
      return c.json({ message: "Failed to get product", error }, 500);
    }
  },
);
