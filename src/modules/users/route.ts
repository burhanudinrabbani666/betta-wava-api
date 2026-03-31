import { OpenAPIHono } from "@hono/zod-openapi";
import { UsersSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const userRoute = new OpenAPIHono();
const tag = ["users"];

// Get All Product
userRoute.openapi(
  {
    method: "get",
    path: "/",
    tags: tag,
    responses: {
      200: {
        description: "Get all Users",
        content: { "application/json": { schema: UsersSchema } },
      },
      500: { description: "Failed to get Users" },
    },
  },
  async (c) => {
    try {
      const users = await prisma.user.findMany();

      return c.json(users, 200);
    } catch (error) {
      return c.json({ message: "Failed to get Users", error }, 500);
    }
  },
);
