import * as argon2 from "argon2";

export async function hashPassword(plainTextPassword: string) {
  try {
    const hash = await argon2.hash(plainTextPassword);

    return hash;
  } catch (error) {
    throw new Error("Failed to Hash Password", { cause: error });
  }
}

export async function verifyPassword(
  hashedPassword: string,
  plainTextPassword: string,
) {
  try {
    const result = await argon2.verify(hashedPassword, plainTextPassword);
    return result;
  } catch (error) {
    throw new Error("Failed to Verify Password", { cause: error });
  }
}
