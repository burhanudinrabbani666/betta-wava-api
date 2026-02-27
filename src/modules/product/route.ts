/* eslint-disable @typescript-eslint/no-unused-vars */

import { OpenAPIHono } from "@hono/zod-openapi";
import {
  GetProductBySlug,
  ProductSchema,
  ProductSchemaEndPoint,
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
        content: { "application/json": { schema: ProductSchemaEndPoint } },
      },
      500: {
        description: "Failed to get products",
      },
    },
  },
  async (c) => {
    try {
      const products = await prisma.product.findMany({
        select: {
          name: true,
          price: true,
          thumbnail: true,
        },
      });

      return c.json(products, 200);
    } catch (error: unknown) {
      return c.json({ message: "Failed to get all product's" }, 500);
    }
  },
);

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
        description: "Failed to get products",
      },
      400: {
        description: "Product not found!",
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

      return c.json(product, 200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return c.json({ message: "Failed to get product" }, error.message);
    }
  },
);
