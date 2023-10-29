import { getByCode } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const code = qs.get("code");
    if (!code) throw new Error("code not found");

    console.error(code);
    const identity = await getByCode("/api/adm/identity/get/bycode", code);

    console.error(identity);
  } catch {
    console.error("no identity");
  }
}
