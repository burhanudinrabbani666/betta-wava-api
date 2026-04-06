import z from "zod";
import { UserModelSchema } from "../../generated/zod/schemas";

export const UserSchema = UserModelSchema.omit({ password: true }).extend({
  username: z.string().openapi({ example: "example" }),
  firstName: z.string().openapi({ example: "example" }),
  lastName: z.string().openapi({ example: "example" }),
  email: z.string().openapi({ example: "example@example.io" }),
});

export const UsersSchema = UserSchema.array();

// export const SeedUserSchema = UserSchema.omit({
//   id: true,
//   slug: true,
//   createdAt: true,
//   updatedAt: true,
//   variantId: true,
//   variant: true,
// }).extend({
//   variant: z.string(),
// });

// export const SeedUsersSchema = SeedUserSchema.array();

// export const GetUserBySlugSchema = UserSchema.pick({ slug: true });

// export const GetProducstByVariantSchema = VariantModelSchema.pick({
//   slug: true,
// });

// export const UserQuerySchema = z.object({
//   color: z.string().optional().openapi({ example: "bluerim" }),
//   variant: z.string().optional().openapi({ example: "grade-a" }),
//   minPrice: z.string().optional().openapi({ example: 100000 }),
//   maxPrice: z.string().optional().openapi({ example: 1000000 }),
// });

//-------------------------------------//
//          Export type               //
//-------------------------------------//

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;

// export type SeedUser = z.infer<typeof SeedUserSchema>;
// export type SeedUsers = z.infer<typeof SeedUsersSchema>;
