<script lang="ts">
  const isAuthenticated = window.localStorage.getItem("oidc_authenticated");

  if (!isAuthenticated) window.location.replace("/oidc/redirect-consent");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
