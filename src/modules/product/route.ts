import { OpenAPIHono } from "@hono/zod-openapi";
import { ProductsSchema } from "./schema";

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
  (c) => {
    try {
      return c.json([], 200);
    } catch (error) {
      return c.json(error);
    }
  },
);
