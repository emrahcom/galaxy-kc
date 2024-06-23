<script lang="ts">
  import "bootstrap-icons/font/bootstrap-icons.min.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";
  import Brand from "$lib/components/nav/brand.svelte";
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

<div class="container-fluid d-flex flex-column h-100">
  <section id="hidden-top-margin" class="d-flex invisible my-4">
    <Brand />
  </section>

  <slot />
</div>
