import {
  GALAXY_FQDN,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "$lib/config";

// -----------------------------------------------------------------------------
export async function load() {
  window.sessionStorage.clear();
  window.localStorage.clear();

  const target =
    `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
    `&post_logout_redirect_uri=https://${GALAXY_FQDN}/`;

  window.location.href = `${target}`;
}
