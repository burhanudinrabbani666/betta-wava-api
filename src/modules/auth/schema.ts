import z from "zod";
import { UserSchema } from "../users/schema";

export const RegisterUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().openapi({ example: "example123" }),
});

export const LoginUserSchema = RegisterUserSchema.omit({
  username: true,
  firstName: true,
  lastName: true,
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});
//-------------------------------------//
//           Export type               //
//-------------------------------------//

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type LoginResponseUser = z.infer<typeof LoginResponseSchema>;
