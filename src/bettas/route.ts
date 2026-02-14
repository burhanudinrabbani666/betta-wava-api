import { OpenAPIHono } from "@hono/zod-openapi";
import { BettaSchema } from "./schema";
import BettasData from "./bettas";

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
        content: { "application/json": { schema: BettaSchema } },
      },
      500: {
        description: "Failed to get Bettas",
      },
    },
  },
  (c) => {
    try {
      return c.json(BettasData);
    } catch (error) {
      return c.json(error);
    }
  },
);
