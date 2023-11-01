<script lang="ts">
  import { get, getByCode } from "$lib/api";

  async function load() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem("oidc_checked", "ok");

    try {
      await get("/api/adm/identity/clear");

      const qs = new URLSearchParams(window.location.search);
      const code = qs.get("code");
      if (!code) throw new Error("code not found");

      const identity = await getByCode("/api/adm/identity/get/bycode", code);
      window.localStorage.setItem("username", identity.preferred_username);

      window.location.href = "/pri";
    } catch {
      window.location.href = "/";
    }
  }

  load();
</script>
