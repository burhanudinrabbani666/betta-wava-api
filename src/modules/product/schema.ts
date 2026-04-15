import z from "zod";
import {
  ProductModelSchema,
  VariantModelSchema,
} from "../../generated/zod/schemas";

export const ProductSchema = ProductModelSchema.extend({
  variant: VariantModelSchema,
});
export const ProductsSchema = ProductSchema.array();

export const SeedProductSchema = ProductSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  variantId: true,
  variant: true,
}).extend({
  variant: z.string(),
});

export const SeedProductsSchema = SeedProductSchema.array();

export const GetProductBySlugSchema = ProductSchema.pick({ slug: true });

export const GetProducstByVariantSchema = VariantModelSchema.pick({
  slug: true,
});

export const ProductQuerySchema = z.object({
  minPrice: z.string().optional().openapi({ example: 100000 }),
  maxPrice: z.string().optional().openapi({ example: 1000000 }),
  page: z.int().optional().openapi({ example: 1 }),
});

//-------------------------------------//
//          Export type               //
//-------------------------------------//

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;

export type SeedProduct = z.infer<typeof SeedProductSchema>;
export type SeedProducts = z.infer<typeof SeedProductsSchema>;
