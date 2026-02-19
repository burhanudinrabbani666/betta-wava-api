import z from "zod";

export const BettaSchema = z.object({
  id: z.string().min(1).openapi({ example: "xdxxdxdxdxdxdxdxdx" }),
  name: z.string().min(3).max(100).openapi({ example: "Betta Bluerim" }),
  slug: z.string().min(3).max(100).openapi({ example: "betta-bluerim" }),
  price: z.number().positive().openapi({ example: 100000 }),
  stockLevel: z.number().int().nonnegative().openapi({ example: 10 }),
  sku: z.string().min(3).max(100).openapi({ example: "BW-BR-1" }),
  variant: z
    .enum(["plakat", "halfmoon", "wild-betta"])
    .openapi({ example: "Plakat" }),
  baseColor: z
    .enum(["black", "white", "red", "blue", "yellow", "green"])
    .openapi({ example: "white" }),
  grade: z
    .enum(["a", "competition", "breeding"])
    .openapi({ example: "competition" }),
  gender: z.enum(["male", "female"]),
  temperatureCelcius: z.number().min(1).max(30).openapi({ example: 27 }),
  phMin: z.number().openapi({ example: 6 }),
  phMax: z.number().openapi({ example: 6 }),
  widthCm: z.number().min(3).max(100).positive().openapi({ example: 20 }),
  HeightCm: z.number().min(3).max(100).positive().openapi({ example: 20 }),
  daily: z
    .string()
    .min(3)
    .max(500)
    .openapi({ example: "Flerring for 15 minutes" }),
  feed: z.string().min(3).max(100).openapi({ example: "1 - 2 daily" }),
  foodType: z.string().min(3).max(100).openapi({ example: "Daphnia magna" }),
  nature: z.string().min(3).max(100).openapi({ example: "cattapa leaves" }),
  chemical: z.string().min(3).max(100).openapi({ example: "methylene blue" }),
  imageSmall: z.url().openapi({ example: "" }),
  images: z.array(z.string()),
  customerReview: z.array(
    z.object({
      customerName: z.string().openapi({ example: "Agus" }),
      customerImage: z.string().openapi({
        example:
          "https://bjjyofiaetiwriksopsx.supabase.co/storage/v1/object/public/bettas-images/bluerim-customer-001.jpg",
      }),
      customerRating: z.number().min(1).max(5).openapi({ example: 5 }),
      comment: z.string().openapi({ example: "very good fish" }),
    }),
  ),
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
