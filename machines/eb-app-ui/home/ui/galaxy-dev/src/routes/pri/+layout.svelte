<script lang="ts">
  export let data;

  if (!data.identity.sub) window.location.replace("/oidc/redirect-consent");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
