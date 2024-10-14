import { getCookies } from "jsr:@std/http@1.0.5/cookie";
import { verify } from "jsr:@emrahcom/jwt";
import { notFound } from "../http/response.ts";
import { pri as wrapper } from "../http/wrapper.ts";
import { updatePresence } from "../database/identity.ts";
import { generateCryptoKeyHS } from "../common/token.ts";
import { API_SECRET } from "../../config.ts";

const PRE = "/api/pri/identity";

// -----------------------------------------------------------------------------
export async function getIdentityId(req: Request): Promise<string | undefined> {
  try {
    const cookies = getCookies(req.headers);
    if (!cookies) throw new Error("no cookies");

    const token = cookies.token;
    if (!token) throw new Error("no token");

    const cryptoKey = await generateCryptoKeyHS(API_SECRET, "SHA-256");
    const payload = await verify(token, cryptoKey);
    if (!payload.userId) throw new Error("no userId");
    if (typeof payload.userId !== "string") throw new Error("no valid userId");

    return payload.userId;
  } catch {
    return undefined;
  }
}

// -----------------------------------------------------------------------------
async function ping(_req: Request, identityId: string): Promise<unknown> {
  return await updatePresence(identityId);
}

// -----------------------------------------------------------------------------
export default async function (
  req: Request,
  path: string,
  identityId: string,
): Promise<Response> {
  if (path === `${PRE}/ping`) {
    return await wrapper(ping, req, identityId);
  } else {
    return notFound();
  }
}
