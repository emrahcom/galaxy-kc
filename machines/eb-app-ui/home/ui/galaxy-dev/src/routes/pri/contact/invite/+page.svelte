<script lang="ts">
  import { list } from "$lib/api";
  import List from "$lib/components/pri/contact-invite/list.svelte";
  import Subheader from "$lib/components/common/subheader.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  const pr = list("/api/pri/contact/invite/list", 100);
</script>

<!-- -------------------------------------------------------------------------->
<Subheader
  subheader="Contact keys"
  hrefAdd="/pri/contact/invite/add"
  hrefAddTitle="Add a new contact key (friendship link)"
  hrefContact="/pri/contact"
  hrefContactTitle="Show contacts"
/>

{#await pr then invites}
  <List {invites} />
{:catch}
  <Warning>Something went wrong</Warning>
{/await}
