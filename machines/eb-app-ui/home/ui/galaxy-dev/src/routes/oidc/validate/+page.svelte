<script lang="ts">
  import { get, getByCode } from "$lib/api";

  async function load() {
    // Read the state before the storage is cleared.
    const savedState = globalThis.sessionStorage.getItem("oidc_state");

    globalThis.localStorage.clear();
    globalThis.sessionStorage.clear();
    globalThis.sessionStorage.setItem("oidc_checked", "ok");

    try {
      await get("/api/adm/identity/clear");

      const qs = new URLSearchParams(globalThis.location.search);
      const state = qs.get("state");
      if (!savedState || state !== savedState) throw new Error("bad state");

      const code = qs.get("code");
      if (!code) throw new Error("code not found");

      const identity = await getByCode("/api/adm/identity/get/bycode", code);
      globalThis.localStorage.setItem("username", identity.preferred_username);

      globalThis.location.href = "/pri";
    } catch {
      globalThis.location.href = "/";
    }
  }

  load();
</script>
