<script lang="ts">
  const identitySub = window.localStorage.getItem("identity_sub");

  if (!identitySub) window.location.replace("/oidc/redirect-consent");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
