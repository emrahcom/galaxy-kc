<script lang="ts">
  import { page } from "$app/stores";
  import { getById } from "$lib/api";
  import Subheader from "$lib/components/common/subheader-center.svelte";
  import Update from "$lib/components/pri/room/update.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  const pr = getById("/api/pri/room/get", $page.params.uuid);
</script>

<!-- -------------------------------------------------------------------------->
<Subheader subheader="Update this meeting room" />

{#await pr then room}
  <Update p={room} />
{:catch}
  <Warning>Something went wrong</Warning>
{/await}
