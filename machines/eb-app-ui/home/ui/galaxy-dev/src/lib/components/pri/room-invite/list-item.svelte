<script lang="ts">
  import { page } from "$app/stores";
  import { showLocaleDatetime } from "$lib/common";
  import type { RoomInvite } from "$lib/types";
  import Copy from "$lib/components/common/button-copy.svelte";
  import Del from "$lib/components/common/link-del.svelte";
  import Disable from "$lib/components/common/link-disable.svelte";
  import Enable from "$lib/components/common/link-enable.svelte";

  export let p: RoomInvite;

  // ---------------------------------------------------------------------------
  function copy(code: string) {
    const text = `${$page.url.origin}/pri/room/partnership/add/${code}`;

    navigator.clipboard.writeText(text);
  }
</script>

<!-- -------------------------------------------------------------------------->
<div class="col-md-6 col-xl-4">
  <div class="card h-100 {p.enabled ? '' : 'border-danger'}">
    <div class="card-body text-center">
      <h5 class="card-title text-muted">{p.name}</h5>

      <p class="card-text text-muted small">
        {showLocaleDatetime(p.expired_at)}
      </p>

      <p class="card-text text-muted">
        {$page.url.origin}/pri/room/partnership/add/{p.code}
      </p>

      {#if p.enabled}
        <Copy label="copy" on:click={() => copy(p.code)} />
      {/if}
    </div>

    <div class="card-footer bg-body border-0 text-center">
      <Del href="/pri/room/invite/del/{p.id}" />

      {#if p.enabled}
        <Disable href="/pri/room/invite/disable/{p.id}" />
      {:else}
        <Enable href="/pri/room/invite/enable/{p.id}" />
      {/if}
    </div>
  </div>
</div>
