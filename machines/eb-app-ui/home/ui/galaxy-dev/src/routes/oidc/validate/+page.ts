import { getByCode } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const code = qs.get("code");
    if (!code) throw new Error("code not found");

    const identity = await getByCode("/api/adm/identity/get/bycode", code);
    window.localStorage.setItem("identity", JSON.stringify(identity));
    window.localStorage.setItem("username", identity.preferred_username);

    window.location.href = "/pri";
  } catch {
    window.location.href = "/";
  }
}
