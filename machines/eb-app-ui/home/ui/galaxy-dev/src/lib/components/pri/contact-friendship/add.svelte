<script lang="ts">
  import { FORM_WIDTH } from "$lib/config";
  import { action } from "$lib/api";
  import type { ContactInvite111 } from "$lib/types";
  import Cancel from "$lib/components/common/button-cancel.svelte";
  import Email from "$lib/components/common/form-email.svelte";
  import Submit from "$lib/components/common/button-submit.svelte";
  import SubmitBlocker from "$lib/components/common/button-submit-blocker.svelte";
  import Text from "$lib/components/common/form-text.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  export let invite: ContactInvite111;
  export let isExist: boolean;

  let warning = false;
  let disabled = false;
  let p = {
    code: invite.code,
    name: invite.profile_name,
  };

  // ---------------------------------------------------------------------------
  function cancel() {
    globalThis.location.href = `/pri/contact`;
  }

  // ---------------------------------------------------------------------------
  async function onSubmit() {
    try {
      warning = false;
      disabled = true;

      await action("/api/pri/contact/friendship/add/bycode", p);
      globalThis.location.href = `/pri/contact`;
    } catch {
      warning = true;
      disabled = false;
    }
  }
</script>

<!-- -------------------------------------------------------------------------->
<section id="add">
  <div class="d-flex mt-2 justify-content-center">
    <form on:submit|preventDefault={onSubmit} style="width:{FORM_WIDTH};">
      <Text name="name" label="Contact" bind:value={p.name} required={true} />
      <Text
        name="profile_name"
        label="Name"
        value={invite.profile_name || ""}
        disabled={true}
        readonly={true}
      />
      <Email
        name="profile_email"
        label="Email"
        value={invite.profile_email || ""}
        disabled={true}
        readonly={true}
      />

      {#if warning}
        <Warning>The add request is not accepted.</Warning>
      {/if}

      {#if isExist}
        <Warning>
          This contact is already in your list.<br />
          Nothing to do.
        </Warning>

        <div class="d-flex gap-5 mt-5 justify-content-center">
          <Cancel label="Abort" on:click={cancel} />
        </div>
      {:else}
        <div class="d-flex gap-5 mt-5 justify-content-center">
          <Cancel bind:disabled on:click={cancel} />
          <SubmitBlocker />
          <Submit label="Add" bind:disabled />
        </div>
      {/if}
    </form>
  </div>
</section>
