import { get } from "$lib/api";
import { post } from "$lib/http";

// -----------------------------------------------------------------------------
export async function load() {
  const target = globalThis.location.pathname;

  // Dont continue if the target is the audience pages.
  // The audience pages dont need authentication.
  if (target.match("^/aud/")) return;

  // Get Keycloak related parameters if they are not available in the storage
  if (
    !globalThis.localStorage.getItem("galaxy_fqdn") ||
    !globalThis.localStorage.getItem("keycloak_client_id") ||
    !globalThis.localStorage.getItem("keycloak_origin") ||
    !globalThis.localStorage.getItem("keycloak_realm")
  ) {
    const config = await get("/api/adm/config");

    globalThis.localStorage.setItem("galaxy_fqdn", config.galaxy_fqdn);
    globalThis.localStorage.setItem(
      "keycloak_client_id",
      config.keycloak_client_id,
    );
    globalThis.localStorage.setItem("keycloak_origin", config.keycloak_origin);
    globalThis.localStorage.setItem("keycloak_realm", config.keycloak_realm);
  }

  // Am I authenticated?
  const res = await post("/api/pri/hello", "{}");

  globalThis.sessionStorage.removeItem("oidc_authenticated");
  if (res.status === 200) {
    globalThis.sessionStorage.setItem("oidc_checked", "ok");
    globalThis.sessionStorage.setItem("oidc_authenticated", "ok");
  }

  // Try to authenticate if the target is the entry page
  if (target === "/" && !globalThis.sessionStorage.getItem("oidc_checked")) {
    globalThis.location.href = "/oidc/redirect-none";
  }
}
