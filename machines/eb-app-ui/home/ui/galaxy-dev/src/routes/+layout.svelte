<script lang="ts">
  import NavBarPri from "$lib/components/nav/bar-pri.svelte";
  import NavBarPub from "$lib/components/nav/bar-pub.svelte";

  export let data;
</script>

<!-- -------------------------------------------------------------------------->
{#if data.identity.sub}
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
