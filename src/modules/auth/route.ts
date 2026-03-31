import { OpenAPIHono } from "@hono/zod-openapi";
import { RegisterUserSchema } from "./schema";
// import { prisma } from "../../lib/prisma";
import { UserSchema } from "../users/schema";

export const authRoute = new OpenAPIHono();
const tag = ["Auth"];

// Get All Product
authRoute.openapi(
  {
    method: "post",
    path: "/register",
    tags: tag,
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      200: {
        description: "Register new User",
        content: { "application/json": { schema: UserSchema } },
      },
      400: { description: "Failed to Register" },
    },
  },
  async (c) => {
    try {
      const validatedBody = c.req.valid("json");
      // const users = await prisma.user.findFirst();

      // if (!users)
      //   throw new Error("Failed to register user", { cause: { code: 400 } });

      return c.json({ validatedBody }, 200);
    } catch (error) {
      return c.json(error);
    }
  },
);
