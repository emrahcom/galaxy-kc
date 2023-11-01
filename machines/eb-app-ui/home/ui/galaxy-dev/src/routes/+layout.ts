import { get } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  const target = window.location.pathname;

  // dont continue if the target is the audience pages
  // the audience pages dont need authentication
  if (target.match("^/aud/")) return;

  // get global parmeters if they are not available in the storage
  if (
    !window.localStorage.getItem("galaxy_fqdn") ||
    !window.localStorage.getItem("keycloak_client_id") ||
    !window.localStorage.getItem("keycloak_origin") ||
    !window.localStorage.getItem("keycloak_realm")
  ) {
    const config = await get("/api/adm/config");

    window.localStorage.setItem("galaxy_fqdn", config.galaxy_fqdn);
    window.localStorage.setItem(
      "keycloak_client_id",
      config.keycloak_client_id,
    );
    window.localStorage.setItem("keycloak_origin", config.keycloak_origin);
    window.localStorage.setItem("keycloak_realm", config.keycloak_realm);
  }

  // dont continue if the target is the redirection page
  if (target === "/oidc/redirect-none") return;

  const oidc = window.sessionStorage.getItem("oidc");
  if (!oidc) {
    window.location.href = "/oidc/redirect-none";
  }
}
