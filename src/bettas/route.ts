import { OpenAPIHono } from "@hono/zod-openapi";

export const bettasRoute = new OpenAPIHono();
const tag = ["bettas"];

bettasRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get All Bettas",
    tags: tag,
    responses: {
      200: {
        description: "Successfully get Bettas",
      },
      500: {
        description: "Failed to get Bettas",
      },
    },
  },
  (c) => {
    try {
      return c.json({ message: "Hello from Betta Wava" });
    } catch (error) {
      return c.json(error);
    }
  },
);
