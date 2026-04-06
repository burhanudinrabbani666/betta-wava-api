import z from "zod";
import { UserModelSchema } from "../../generated/zod/schemas";

export const UserSchema = UserModelSchema.omit({ password: true }).extend({
  username: z.string().openapi({ example: "example" }),
  firstName: z.string().openapi({ example: "example" }),
  lastName: z.string().openapi({ example: "example" }),
  email: z.string().openapi({ example: "example@example.io" }),
});

export const PublicUserSchema = UserSchema.omit({ email: true });

export const UsersSchema = UserSchema.array();
export const PublicUsersSchema = PublicUserSchema.array();

export const SeedUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const SeedUsersSchema = SeedUserSchema.array();

//-------------------------------------//
//          Export type               //
//-------------------------------------//

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;

export type PublicUser = z.infer<typeof PublicUserSchema>;
export type PublicUsers = z.infer<typeof PublicUserSchema>;

export type SeedUser = z.infer<typeof SeedUserSchema>;
export type SeedUsers = z.infer<typeof SeedUsersSchema>;
