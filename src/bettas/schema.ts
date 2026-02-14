import z from "zod";

export const BettaSchema = z.object({
  id: z.string().min(1).openapi({ example: "xdxxdxdxdxdxdxdxdx" }),
  name: z.string().min(3).max(100).openapi({ example: "Betta Bluerim" }),
  slug: z.string().min(3).max(100).openapi({ example: "betta-bluerim" }),
  price: z.number().positive().openapi({ example: 100000 }),
  stockLevel: z.number().int().nonnegative().openapi({ example: 10 }),
  sku: z.string().min(3).max(100).openapi({ example: "BW-BR-1" }),
  variant: z
    .enum(["Plakat", "Halfmoon", "WildBetta"])
    .openapi({ example: "Plakat" }),
  baseColor: z
    .enum(["black", "white", "red", "blue", "yellow", "green"])
    .openapi({ example: "white" }),
  grade: z
    .enum(["a", "competition", "breeding"])
    .openapi({ example: "competition" }),
  gender: z.enum(["male", "female"]),
  careGuide: z.object({
    waterQuality: z.object({
      temperatureCelcius: z.number().min(1).max(30).openapi({ example: 27 }),
      phRange: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    environment: z.object({
      aquariumMinSize: z.object({
        widthCm: z.number().min(3).max(100).positive().openapi({ example: 20 }),
        heightCm: z
          .number()
          .min(3)
          .max(100)
          .positive()
          .openapi({ example: 20 }),
      }),
    }),
    maintenance: z.object({
      daily: z
        .string()
        .min(3)
        .max(500)
        .openapi({ example: "Flerring for 15 minutes" }),
      weekly: z
        .string()
        .min(3)
        .max(500)
        .openapi({ example: "Change 50% or Full of water" }),
    }),
    diet: z.object({
      feed: z.string().min(3).max(100).openapi({ example: "1 - 2 daily" }),
      foodType: z
        .string()
        .min(3)
        .max(100)
        .openapi({ example: "Daphnia magna" }),
    }),
    medicine: z.object({
      nature: z.string().min(3).max(100).openapi({ example: "cattapa leaves" }),
      chemical: z
        .string()
        .min(3)
        .max(100)
        .openapi({ example: "methylene blue" }),
    }),
  }),
  image: z.string().url().openapi({
    example:
      "https://bjjyofiaetiwriksopsx.supabase.co/storage/v1/object/public/bettas-images/bluerim-001.jpg",
  }),
  customerReview: z.array(
    z.object({
      customerName: z.string(),
      customerImage: z.string(),
      customerRating: z.number().min(1).max(5),
      comment: z.string(),
    }),
  ),
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
