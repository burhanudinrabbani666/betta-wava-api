import z from "zod";

export const ProductSchema = z.object({
  id: z.string().openapi({ example: "" }),
  slug: z.string().min(1).max(100),
  name: z.string().min(3).max(100).openapi({ example: "Betta Multicolor" }),
  price: z.number().positive().openapi({ example: 100000 }),
  stockLevel: z.number().int().nonnegative().openapi({ example: 10 }),
  sku: z.string().min(3).max(100).openapi({ example: "BW-MC-1" }),
  variant: z.string().min(3).max(100).openapi({ example: "Competition" }),
  thumbnailUrl: z.url().openapi({
    example:
      "https://3ufa9hkbld.ucarecd.net/926645e1-07ae-4599-839c-78a8159492da/-/scale_crop/300x300/",
  }),
  imageUrls: z.array(z.string()),
  createdAt: z
    .string()
    .min(1)
    .max(100)
    .openapi({ example: "2020-06-19T17:13:00.000Z" }),
  updatedAt: z
    .string()
    .min(1)
    .max(100)
    .openapi({ example: "2020-06-19T17:13:00.000Z" }),
});

export const SeedProductSchema = ProductSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const ProductsSchema = z.array(ProductSchema);
export const SeedProductsSchema = z.array(SeedProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductSchema>;

export type SeedProductSchema = z.infer<typeof SeedProductSchema>;
export type SeedProductsSchema = z.infer<typeof SeedProductSchema>;

export const GetProductBySlug = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .openapi({ example: "Multicolor-Modern-Plakat" }),
});

export const SearchQueryParams = z.object({
  q: z.string().min(1).max(100).openapi({ example: "Modern" }),
});
