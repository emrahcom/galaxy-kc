import { notFound, unauthorized } from "../http/response.ts";
import { adm as wrapper } from "../http/wrapper.ts";
//import { addIdentity } from "../database/identity.ts";
//import { addProfile } from "../database/profile.ts";
import {
  GALAXY_FQDN,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "../../config.ts";

const PRE = "/api/adm/identity";

// -----------------------------------------------------------------------------
//async function add(req: Request): Promise<unknown> {
//  const pl = await req.json();
//  const identityId = pl.identity_id;
//  const email = pl.identity_email;
//  const name = email.split("@")[0];
//  const rows = await addIdentity(identityId);
//
//  if (rows[0] !== undefined) {
//    await addProfile(
//      identityId,
//      name,
//      email,
//      true,
//    );
//  }
//
//  return rows;
//}

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
async function getByCode(req: Request): Promise<unknown> {
  const pl = await req.json();
  const code = pl.code;

  // get the access token from Keycloak if the short-term auth code is valid
  const token = await getToken(code);
  if (!token) return unauthorized();

  // get the user info from Keycloak by using the access token
  const userInfo = await getUserInfo(token);
  if (!userInfo) return unauthorized();

  const identity = [{
    jwt: "my_jwt",
    userInfo: userInfo,
  }];

  return identity;
}

// -----------------------------------------------------------------------------
export default async function (req: Request, path: string): Promise<Response> {
  if (path === `${PRE}/get/bycode`) {
    return await wrapper(getByCode, req);
  } else {
    return notFound();
  }
}
