<script lang="ts">
  import type { DomainPartnerCandidacy } from "$lib/types";
  import Disable from "$lib/components/common/link-disable.svelte";
  import Enable from "$lib/components/common/link-enable.svelte";

  interface Props {
    p: DomainPartnerCandidacy;
  }

  let { p }: Props = $props();
</script>

<!-- -------------------------------------------------------------------------->
<div class="col-md-6 col-xl-4">
  <div class="card h-100">
    <div class="card-body text-center">
      <h5 class="card-title text-muted">{p.domain_name}</h5>
      <p class="card-text text-muted">{p.domain_url}</p>
      <p class="card-text text-muted small">partner</p>

      {#if p.status == "pending"}
        <p class="card-text fw-bold text-success">pending</p>
      {:else}
        <p class="card-text fw-bold text-warning">rejected</p>
      {/if}
    </div>

    <div class="card-footer bg-body border-0 text-center">
      {#if p.status == "pending"}
        <Disable
          href="/pri/domain/partner/candidacy/reject/{p.id}"
          title="Reject partnership"
        />
      {/if}

      <Enable
        href="/pri/domain/partner/candidacy/accept/{p.id}"
        title="Accept partnership"
      />
    </div>
  </div>
</div>
