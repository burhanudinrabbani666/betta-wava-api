import { OpenAPIHono } from "@hono/zod-openapi";
import { RegisterUserSchema } from "./schema";
import { UserSchema } from "../users/schema";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hash";
import type { PrismaError } from "../../lib/errorSchema";

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
      400: { description: "Failed to Register new User" },
    },
  },
  async (c) => {
    try {
      const validatedBody = c.req.valid("json");

      const newUser = await prisma.user.create({
        data: {
          username: validatedBody.username,
          firstName: validatedBody.firstName,
          lastName: validatedBody.lastName,
          email: validatedBody.email,
          password: {
            create: { hash: await hashPassword(validatedBody.password) },
          },
        },
      });

      return c.json({ newUser }, 200);
    } catch (error) {
      const prismaError = error as PrismaError;

      if (prismaError.code === "P2002") {
        return c.json(
          {
            message: `${prismaError.meta.driverAdapterError.cause.constraint.fields} Is already Used`,
          },
          401,
        );
      }

      return c.json(
        {
          message: "Failed to register new User",
          error,
        },
        400,
      );
    }
  },
);
