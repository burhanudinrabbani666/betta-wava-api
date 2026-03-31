import z from "zod";
import { UserSchema } from "../users/schema";

export const RegisterUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().openapi({ example: "example123" }),
});

//-------------------------------------//
//           Export type               //
//-------------------------------------//

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
