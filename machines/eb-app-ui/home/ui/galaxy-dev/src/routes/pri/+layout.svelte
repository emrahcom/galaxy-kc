<script lang="ts">
  const target = window.location.pathname;
  const isAuthenticated = window.sessionStorage.getItem("oidc_authenticated");

  if (!isAuthenticated && target !== "/oidc/clean") {
    window.location.replace("/oidc/redirect-consent");
  }
</script>

<!-- -------------------------------------------------------------------------->
<slot />
