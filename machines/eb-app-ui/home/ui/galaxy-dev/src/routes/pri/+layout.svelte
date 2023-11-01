<script lang="ts">
  const username = window.localStorage.getItem("username");

  if (!username) window.location.replace("/oidc/redirect-consent");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
