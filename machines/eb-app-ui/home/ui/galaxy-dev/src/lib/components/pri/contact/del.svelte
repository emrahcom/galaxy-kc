<script lang="ts">
  import { FORM_WIDTH } from "$lib/config";
  import { actionById } from "$lib/api";
  import type { Contact } from "$lib/types";
  import Cancel from "$lib/components/common/button-cancel.svelte";
  import Email from "$lib/components/common/form-email.svelte";
  import Submit from "$lib/components/common/button-submit.svelte";
  import SubmitBlocker from "$lib/components/common/button-submit-blocker.svelte";
  import Switch from "$lib/components/common/form-switch.svelte";
  import Text from "$lib/components/common/form-text.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  interface Props {
    p: Contact;
  }

  let { p }: Props = $props();

  let warning = $state(false);
  let disabled = $state(false);

  // ---------------------------------------------------------------------------
  function cancel() {
    globalThis.location.href = "/pri/contact";
  }

  // ---------------------------------------------------------------------------
  async function onsubmit() {
    try {
      warning = false;
      disabled = true;

      await actionById("/api/pri/contact/del", p.id);
      globalThis.location.replace("/pri/contact");
    } catch {
      warning = true;
      disabled = false;
    }
  }
</script>

<!-- -------------------------------------------------------------------------->
<section id="del">
  <div class="d-flex mt-2 justify-content-center">
    <form {onsubmit} style="width:{FORM_WIDTH};">
      <Text
        name="name"
        label="Contact"
        value={p.name}
        disabled={true}
        readonly={true}
      />
      <Text
        name="profile_name"
        label="Name"
        value={p.profile_name || ""}
        disabled={true}
        readonly={true}
      />
      <Email
        name="profile_email"
        label="Email"
        value={p.profile_email || ""}
        disabled={true}
        readonly={true}
      />
      <Switch
        name="visible"
        label="Show in the contact list of the browser extension"
        bind:value={p.visible}
        disabled={true}
      />

      {#if warning}
        <Warning>The delete request is not accepted.</Warning>
      {/if}

      <div class="d-flex gap-5 mt-5 justify-content-center">
        <Cancel {disabled} onclick={cancel} />
        <SubmitBlocker />
        <Submit {disabled} label="Delete" />
      </div>
    </form>
  </div>
</section>
