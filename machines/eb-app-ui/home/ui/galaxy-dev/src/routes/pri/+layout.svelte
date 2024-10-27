<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  const target = globalThis.location.pathname;
  const isAuthenticated =
    globalThis.sessionStorage.getItem("oidc_authenticated");

  if (!isAuthenticated && target !== "/oidc/clean") {
    globalThis.location.replace("/oidc/redirect-consent");
  }
</script>

<!-- -------------------------------------------------------------------------->
{@render children()}
