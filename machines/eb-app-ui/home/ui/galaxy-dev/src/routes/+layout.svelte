<script lang="ts">
  import NavBarPri from "$lib/components/nav/bar-pri.svelte";
  import NavBarPub from "$lib/components/nav/bar-pub-kc.svelte";

  const isAuthenticated = window.sessionStorage.getItem("oidc_authenticated");
</script>

<!-- -------------------------------------------------------------------------->
{#if isAuthenticated}
  <NavBarPri />
{:else}
  <NavBarPub />
{/if}

<section id="hidden-top-margin">
  <br />
  <br />
  <br />
  <br />
</section>

<div class="container-fluid">
  <slot />
</div>
