import z from "zod";
import { ProductModelSchema } from "../../generated/zod/schemas";

export const ProductSchema = ProductModelSchema;
export const ProductsSchema = ProductSchema.array();

export const SeedProductSchema = ProductSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  variantId: true,
});

export const SeedProductsSchema = SeedProductSchema.array();

export const GetProductBySlugSchema = ProductSchema.pick({ slug: true });

export const ProductQuerySchema = z.object({
  color: z.string().optional().openapi({ example: "bluerim" }),
  variant: z.string().optional().openapi({ example: "grade-a" }),
  minPrice: z.string().optional().openapi({ example: 100000 }),
  maxPrice: z.string().optional().openapi({ example: 1000000 }),
});

//-------------------------------------//
//          Export type               //
//-------------------------------------//

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;

export type SeedProduct = z.infer<typeof SeedProductSchema>;
export type SeedProducts = z.infer<typeof SeedProductsSchema>;
