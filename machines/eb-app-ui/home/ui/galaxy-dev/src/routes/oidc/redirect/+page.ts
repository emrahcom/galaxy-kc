import {
  APP,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "$lib/config";

// -----------------------------------------------------------------------------
export async function load() {
  const target =
    `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    `/protocol/openid-connect/auth?client_id=${KEYCLOAK_CLIENT_ID}` +
    `&response_type=code&scope=openid&prompt=login}` +
    `&redirect_uri=https://${APP}/oidc/validate`;

  window.location.href = `${target}`;
}
