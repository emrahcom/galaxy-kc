import identity from "$lib/stores/keycloak/identity";

// -----------------------------------------------------------------------------
export async function load() {
  identity.set({});

  window.location.href = "/";
}
