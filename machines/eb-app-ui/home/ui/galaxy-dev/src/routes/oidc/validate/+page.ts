import { getByCode } from "$lib/api";
import identity from "$lib/stores/keycloak/identity";

// -----------------------------------------------------------------------------
export async function load() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const code = qs.get("code");
    if (!code) throw new Error("code not found");

    const _identity = await getByCode("/api/adm/identity/get/bycode", code);
    identity.set(_identity);

    window.location.href = "/pri";
  } catch {
    window.location.href = "/";
  }
}
