import identity from "$lib/stores/keycloak/identity";
import type { KeycloakIdentity } from "$lib/keycloak/types";

// -----------------------------------------------------------------------------
export async function load() {
  identity.set({} as KeycloakIdentity);

  window.location.href = "/";
}
