<script lang="ts">
  const target = globalThis.location.pathname;
  const isAuthenticated =
    globalThis.sessionStorage.getItem("oidc_authenticated");

  if (!isAuthenticated && target !== "/oidc/clean") {
    globalThis.location.replace("/oidc/redirect-consent");
  }
</script>

<!-- -------------------------------------------------------------------------->
<slot />
