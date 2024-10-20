import { create, getNumericDate } from "jsr:@emrahcom/jwt";
import type { Payload } from "jsr:@emrahcom/jwt";
import type { Algorithm } from "jsr:@emrahcom/jwt/algorithm";
import { generateCryptoKeyHS } from "./token.ts";
import { API_SECRET, API_TIMEOUT } from "../../config.ts";

// -----------------------------------------------------------------------------
export async function generateAPIToken(userId: string): Promise<string> {
  const alg: Algorithm = "HS256";
  const hash = "SHA-256";

  const header = { alg: alg, typ: "JWT" };
  const cryptoKey = await generateCryptoKeyHS(API_SECRET, hash);
  const payload: Payload = {
    iat: getNumericDate(0),
    exp: getNumericDate(API_TIMEOUT),
    userId: userId,
  };

  const jwt = await create(header, payload, cryptoKey);

  return jwt;
}
