<script lang="ts">
  import { get } from "svelte/store";
  import identity from "$lib/stores/keycloak/identity";

  const _identity = get(identity);

  if (!_identity.sub) window.location.replace("/oidc/redirect");
</script>

<!-- -------------------------------------------------------------------------->
<slot />
