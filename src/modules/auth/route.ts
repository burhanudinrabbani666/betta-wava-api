import { OpenAPIHono } from "@hono/zod-openapi";
import {
  LoginResponseSchema,
  LoginUserSchema,
  RegisterUserSchema,
} from "./schema";
import { UserSchema } from "../users/schema";
import { prisma } from "../../lib/prisma";
import { hashPassword, verifyPassword } from "../../lib/hash";
import type { PrismaError } from "../../lib/errorSchema";
import { signToken } from "../../lib/token";
import { checkAuthMiddleware } from "./middleware";

export const authRoute = new OpenAPIHono();
const tag = ["Auth"];

// Register
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

      return c.json({ message: "Failed to register new User" }, 400);
    }
  },
);

// Login
authRoute.openapi(
  {
    method: "post",
    path: "/login",
    tags: tag,
    request: {
      body: { content: { "application/json": { schema: LoginUserSchema } } },
    },
    responses: {
      200: {
        description: "Login User",
        content: { "application/json": { schema: LoginResponseSchema } },
      },
      400: { description: "Failed to Login user" },
    },
  },
  async (c) => {
    try {
      const validatedBody = c.req.valid("json");

      const existingUser = await prisma.user.findUnique({
        where: { email: validatedBody.email },
        include: {
          password: { select: { hash: true } },
        },
      });

      if (!existingUser?.password?.hash) {
        return c.json(
          { message: "Failed to Login. User has no Password" },
          400,
        );
      }

      const isPasswordVerify = await verifyPassword(
        existingUser?.password?.hash,
        validatedBody.password,
      );

      if (!isPasswordVerify) {
        return c.json({ message: "Failed to Login. Password is wrong!" }, 400);
      }

      const token = signToken({ id: existingUser.id });

      const loginResponse = {
        token,
        user: {
          id: existingUser.id,
          username: existingUser.username,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        },
      };

      return c.json(loginResponse, 200);
    } catch (error) {
      console.log(error);

      return c.json({ message: "Failed to Login User" }, 400);
    }
  },
);

// Aunthentication
authRoute.openapi(
  {
    method: "get",
    path: "/me",
    tags: tag,
    middleware: checkAuthMiddleware,
    request: {
      body: { content: { "application/json": { schema: UserSchema } } },
    },
    responses: {
      200: {
        description: "Get Auntheticated User",
        content: { "application/json": { schema: UserSchema } },
      },
      400: { description: "Failed to Get Auntheticated User" },
    },
  },
  async (c) => {
    try {
      const user = c.get("user");

      return c.json(user);
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

      return c.json({ message: "Failed to register new User" }, 400);
    }
  },
);
