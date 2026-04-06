import * as jwt from "jsonwebtoken";
import { TokenUser } from "../modules/users/schema";

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

export function signToken(user: TokenUser) {
  try {
    const payload = { sub: user.id };

    if (!tokenSecretKey)
      throw new Error("Failed to sign token. Token secret key is not setup.");

    const token = jwt.sign(payload, tokenSecretKey, { expiresIn: "7d" });

    return token;
  } catch (error) {
    throw new Error("Failed to sign token.", { cause: error });
  }
}

export function verifyToken(token: string) {
  try {
    if (!tokenSecretKey)
      throw new Error("Failed to sign token. Token secret key is not setup.");

    const decodedToken = jwt.verify(token, tokenSecretKey);

    return decodedToken;
  } catch (error) {
    throw new Error("Failed to sign token.", { cause: error });
  }
}
