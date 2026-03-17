import { getCookies } from "@std/http/cookie";
import { verify } from "@emrahcom/jwt";
import { generateCryptoKeyHS } from "../common/token.ts";
import { API_SECRET } from "../../config.oidc.ts";

// -----------------------------------------------------------------------------
export async function getIdentityId(req: Request): Promise<string | undefined> {
  try {
    const cookies = getCookies(req.headers);
    if (!cookies) throw "no cookies";

    const token = cookies.token;
    if (!token) throw "no token";

    const cryptoKey = await generateCryptoKeyHS(API_SECRET, "SHA-256");
    const payload = await verify(token, cryptoKey);
    if (!payload.userId) throw "no userId";
    if (typeof payload.userId !== "string") throw "no valid userId";

    return payload.userId;
  } catch {
    return undefined;
  }
}
