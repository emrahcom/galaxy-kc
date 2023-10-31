import { get, getByCode } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.sessionStorage.setItem("oidc", "ok");

  try {
    await get("/api/adm/identity/clear");

    const qs = new URLSearchParams(window.location.search);
    const code = qs.get("code");
    if (!code) throw new Error("code not found");

    const identity = await getByCode("/api/adm/identity/get/bycode", code);
    window.sessionStorage.setItem("identity", JSON.stringify(identity));
    window.sessionStorage.setItem("username", identity.preferred_username);

    window.location.href = "/pri";
  } catch {
    window.location.href = "/";
  }
}
