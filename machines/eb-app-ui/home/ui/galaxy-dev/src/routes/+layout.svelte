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
  <!--
  The purpose of the following invisible section is to create free space equal
  to the navigation bar height. So, all contents will be located in the visible
  part below the nagigation bar.

  One Bootstrap icon is also called here to make Bootstrap-icons CSS to be ready
  for the application.
  -->
  <section id="hidden-top-margin" class="d-flex invisible my-4">
    <Brand />
    <span class="bi bi-download" />
  </section>

  <slot />
</div>
