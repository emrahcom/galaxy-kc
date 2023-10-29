import { getByCode } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const code = qs.get("code");
    if (!code) throw new Error("code not found");

    console.error(code);
    const identity = getByCode("/api/adm/identity/get/bycode", code);

    console.log(identity);
  } catch {
  }
}
