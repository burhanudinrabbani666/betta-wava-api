import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3).max(100).openapi({ example: "Betta Multicolor" }),
  price: z.number().positive().openapi({ example: 100000 }),
  stockLevel: z.number().int().nonnegative().openapi({ example: 10 }),
  sku: z.string().min(3).max(100).openapi({ example: "BW-MC-1" }),

  thumbnail: z.url().openapi({
    example:
      "https://3ufa9hkbld.ucarecd.net/926645e1-07ae-4599-839c-78a8159492da/-/scale_crop/300x300/",
  }),
  images: z.array(z.string()),
});

export const ProductsSchema = z.array(ProductSchema);

export const ProductSchemaEndPoint = ProductSchema.pick({
  name: true,
  price: true,
  thumbnail: true,
});

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

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductSchema>;
