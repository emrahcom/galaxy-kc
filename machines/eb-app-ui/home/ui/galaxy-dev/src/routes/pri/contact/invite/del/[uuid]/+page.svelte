<script lang="ts">
  import { page } from "$app/stores";
  import { getById } from "$lib/api";
  import Del from "$lib/components/pri/contact-invite/del.svelte";
  import Subheader from "$lib/components/common/subheader-center.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  const pr = getById("/api/pri/contact/invite/get", $page.params.uuid);
</script>

<!-- -------------------------------------------------------------------------->
<Subheader subheader="Delete this contact key" />

{#await pr then invite}
  <Del p={invite} />
{:catch}
  <Warning>Something went wrong</Warning>
{/await}
