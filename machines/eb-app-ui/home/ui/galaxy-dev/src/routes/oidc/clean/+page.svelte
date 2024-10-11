<script lang="ts">
  import { get } from "$lib/api";

  async function load() {
    globalThis.localStorage.clear();
    globalThis.sessionStorage.clear();
    globalThis.sessionStorage.setItem("oidc_checked", "ok");

    // Send a clearing request to API to remove the HttpOnly cookie.
    // This cookie contains the token for this session.
    try {
      await get("/api/adm/identity/clear");
    } catch {
      // do nothing
    }

    globalThis.location.href = "/";
  }

  load();
</script>
