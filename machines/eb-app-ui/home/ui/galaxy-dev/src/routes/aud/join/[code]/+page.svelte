<script lang="ts">
  import { page } from "$app/stores";
  import { join } from "$lib/aud/meeting";
  import Spinner from "$lib/components/common/spinner.svelte";
  import Subheader from "$lib/components/common/subheader-center.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  const pr = join($page.params.code);
</script>

<!-- -------------------------------------------------------------------------->
<Subheader subheader="Join the meeting" />

{#await pr}
  <Spinner>joining...</Spinner>
{:then}
  <Spinner>joining...</Spinner>
{:catch}
  <Warning>Something went wrong</Warning>
{/await}
