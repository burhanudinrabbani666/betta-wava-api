import { OpenAPIHono } from "@hono/zod-openapi";

export const userRoute = new OpenAPIHono();
const tag = ["user"];

userRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get Auth",
    tags: tag,
    responses: {
      200: { description: "Succesfully Authenticated" },
    },
  },
  async (c) => {
    try {
      return c.json("User");
    } catch (error) {
      return c.json(error);
    }
  },
);
