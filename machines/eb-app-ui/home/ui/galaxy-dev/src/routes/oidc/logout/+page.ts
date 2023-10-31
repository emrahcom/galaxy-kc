import { get } from "$lib/api";
import {
  GALAXY_FQDN,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "$lib/config";

// -----------------------------------------------------------------------------
export async function load() {
  window.localStorage.clear();
  window.sessionStorage.clear();

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
