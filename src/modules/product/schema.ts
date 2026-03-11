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

//-------------------------------------//
//          Export type               //
//-------------------------------------//

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;

export type SeedProduct = z.infer<typeof SeedProductSchema>;
export type SeedProducts = z.infer<typeof SeedProductsSchema>;
