<script lang="ts">
  const isAuthenticated = window.sessionStorage.getItem("oidc_authenticated");

  if (!isAuthenticated) window.location.replace("/oidc/redirect-consent");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
