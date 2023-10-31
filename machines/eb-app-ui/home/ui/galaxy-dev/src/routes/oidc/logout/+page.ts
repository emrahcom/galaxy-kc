import { get } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  const GALAXY_FQDN = window.localStorage.getItem("galaxy_fqdn");
  const KEYCLOAK_CLIENT_ID = window.localStorage.getItem("keycloak_client_id");
  const KEYCLOAK_ORIGIN = window.localStorage.getItem("keycloak_origin");
  const KEYCLOAK_REALM = window.localStorage.getItem("keycloak_realm");

  window.localStorage.clear();
  window.sessionStorage.clear();

  // Send a clearing request to API to remove the HttpOnly cookie. This cookie
  // contains the token for this session.
  try {
    await get("/api/adm/identity/clear");
  } catch {
    // do nothing
  }

  const target =
    `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
    `&post_logout_redirect_uri=https://${GALAXY_FQDN}/`;

  window.location.replace(`${target}`);
}
