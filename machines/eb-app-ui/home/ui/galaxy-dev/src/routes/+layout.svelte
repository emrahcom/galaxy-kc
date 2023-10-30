<script lang="ts">
  import identity from "$lib/stores/keycloak/identity";
  import NavBarPri from "$lib/components/nav/bar-pri.svelte";
  import NavBarPub from "$lib/components/nav/bar-pub.svelte";
</script>

<!-- -------------------------------------------------------------------------->
{#if $identity.sub}
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
