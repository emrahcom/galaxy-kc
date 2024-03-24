import { v5 as uuid } from "https://deno.land/std@0.220.1/uuid/mod.ts";
import { setCookie } from "https://deno.land/std@0.220.1/http/cookie.ts";
import { notFound, ok, unauthorized } from "../http/response.ts";
import { adm as wrapper } from "../http/wrapper.ts";
import { generateAPIToken } from "../common/token.ts";
import { addIdentity } from "../database/identity.ts";
import { addProfile } from "../database/profile.ts";
import {
  GALAXY_FQDN,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "../../config.ts";

const PRE = "/api/adm/identity";
const UUID_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

// -----------------------------------------------------------------------------
// Add the identity if not exists
// -----------------------------------------------------------------------------
async function add(
  userId: string,
  userInfo: Record<string, unknown>,
): Promise<void> {
  const name = (typeof userInfo.preferred_username === "string")
    ? userInfo.preferred_username
    : "Guest";
  const email = (typeof userInfo.email === "string") ? userInfo.email : "Guest";
  const rows = await addIdentity(userId);

  if (rows[0] !== undefined) {
    await addProfile(
      userId,
      name,
      email,
      true,
    );
  }
}

// -----------------------------------------------------------------------------
// Get the access token from Keycloak by using the short-term auth code
// -----------------------------------------------------------------------------
async function getToken(code: string): Promise<string | undefined> {
  const url = `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    `/protocol/openid-connect/token`;
  const redirectURI = `https://${GALAXY_FQDN}/oidc/validate`;

  const data = new URLSearchParams();
  data.append("client_id", KEYCLOAK_CLIENT_ID);
  data.append("grant_type", "authorization_code");
  data.append("redirect_uri", redirectURI);
  data.append("code", code);

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
      },
      method: "POST",
      body: data,
    });
    const json = await res.json();
    const token = json.access_token;

    if (!token) throw new Error("cannot get Keycloak token");

    return token;
  } catch {
    return undefined;
  }
}

// -----------------------------------------------------------------------------
// Get the user info from Keycloak by using the access token
// -----------------------------------------------------------------------------
async function getUserInfo(
  token: string,
): Promise<Record<string, unknown> | undefined> {
  try {
    const url = `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
      `/protocol/openid-connect/userinfo`;
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "GET",
    });
    const userInfo = await res.json();

    if (!userInfo.sub) throw ("no user info");

    return await userInfo;
  } catch {
    return undefined;
  }
}

// -----------------------------------------------------------------------------
// Return the user identity and a token for API calls if auth code is valid
// -----------------------------------------------------------------------------
async function getByCode(req: Request): Promise<Response> {
  const pl = await req.json();
  const code = pl.code;

  // Get the access token from Keycloak if the short-term auth code is valid
  const token = await getToken(code);
  if (!token) return unauthorized();

  // Get the user info from Keycloak by using the access token
  const userInfo = await getUserInfo(token);
  if (!userInfo) return unauthorized();
  if (typeof userInfo.sub !== "string") return unauthorized();

  // Create uuid as userId based on sub
  const sub = new TextEncoder().encode(userInfo.sub);
  const userId = await uuid.generate(UUID_NAMESPACE, sub);

  // Add the identity if not exists in Galaxy database
  await add(userId, userInfo);

  // The client waits for a list of identities but it will use only the first
  // identity from this list. So, put the only available identity into the list.
  const identities = [userInfo];

  // Send token inside the cookie.
  // The token contains the userId of the authenticated user.
  const headers = new Headers();
  setCookie(headers, {
    name: "token",
    value: await generateAPIToken(userId),
    path: "/api",
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
  });

  return ok(JSON.stringify(identities), headers);
}

// -----------------------------------------------------------------------------
// Reset the token in cookies to clear the identity on the client-side
// -----------------------------------------------------------------------------
async function clear(req: Request): Promise<Response> {
  const _pl = await req.json();

  // Send the empty token inside the cookie.
  const headers = new Headers();
  setCookie(headers, {
    name: "token",
    value: "",
    path: "/api",
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
  });

  return ok(JSON.stringify([{}]), headers);
}

// -----------------------------------------------------------------------------
export default async function (req: Request, path: string): Promise<Response> {
  if (path === `${PRE}/get/bycode`) {
    return await wrapper(getByCode, req);
  } else if (path === `${PRE}/clear`) {
    return await wrapper(clear, req);
  } else {
    return notFound();
  }
}
