import { OIDC_ISSUER_URL } from "../../config.oidc.ts";

const DISCOVERY_URL = `${OIDC_ISSUER_URL}/.well-known/openid-configuration`;
let AUTH_ENDPOINT = "";
let LOGOUT_ENDPOINT = "";
let TOKEN_ENDPOINT = "";
let USERINFO_ENDPOINT = "";

// -----------------------------------------------------------------------------
async function getEndpoints() {
  // No need to fetch again if the values are already here.
  // Depending on the OIDC provider, some endoints (except auth) may be missing.
  if (AUTH_ENDPOINT) return;

  try {
    const res = await fetch(DISCOVERY_URL);
    if (!res.ok) throw "Failed to get endpoints";

    const config = await res.json();
    AUTH_ENDPOINT = config.authorization_endpoint || "";
    LOGOUT_ENDPOINT = config.end_session_endpoint || config.logout_endpoint ||
      "";
    TOKEN_ENDPOINT = config.token_endpoint || "";
    USERINFO_ENDPOINT = config.userinfo_endpoint || "";
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------
export async function getAuthEndpoint() {
  await getEndpoints();
  return AUTH_ENDPOINT;
}

// -----------------------------------------------------------------------------
export async function getLogoutEndpoint() {
  await getEndpoints();
  return LOGOUT_ENDPOINT;
}

// -----------------------------------------------------------------------------
export async function getTokenEndpoint() {
  await getEndpoints();
  return TOKEN_ENDPOINT;
}

// -----------------------------------------------------------------------------
export async function getUserinfoEndpoint() {
  await getEndpoints();
  return USERINFO_ENDPOINT;
}
