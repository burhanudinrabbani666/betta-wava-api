import { logger } from "hono/logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { productRoute } from "./modules/product/route";

const app = new OpenAPIHono();

app.use(logger());

app.route("/products", productRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Betta Wava API",
    description: "RESTful API for BETTA WAVA e-commerce",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
