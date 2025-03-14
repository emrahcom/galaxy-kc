<script lang="ts">
  import { FORM_WIDTH } from "$lib/config";
  import { action, get, list } from "$lib/api";
  import type { MeetingInvite111, Profile } from "$lib/types";
  import Cancel from "$lib/components/common/button-cancel.svelte";
  import Select from "$lib/components/common/form-select.svelte";
  import Submit from "$lib/components/common/button-submit.svelte";
  import SubmitBlocker from "$lib/components/common/button-submit-blocker.svelte";
  import Text from "$lib/components/common/form-text.svelte";
  import Textarea from "$lib/components/common/form-textarea.svelte";
  import Warning from "$lib/components/common/alert-warning.svelte";

  interface Props {
    invite: MeetingInvite111;
    isExist: boolean;
  }

  let { invite, isExist }: Props = $props();

  let _schedules = "";
  for (const s of invite.session_list) {
    const startTime = new Date(s[0]);
    const localStartTime = startTime.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(s[1]);
    const diff = endTime.getTime() - startTime.getTime();
    const minutes = Math.round(diff / (1000 * 60));

    _schedules = `${_schedules}\n${localStartTime} (${minutes} min)`;
  }
  const schedules = _schedules.trim();

  let warning = $state(false);
  let disabled = $state(false);
  let p = $state({
    code: invite.code,
    profile_id: "",
  });

  const pr1 = get("/api/pri/profile/get/default").then((item: Profile) => {
    if (item) p.profile_id = item.id;
    return item;
  });

  const pr2 = list("/api/pri/profile/list", 100).then((items: Profile[]) => {
    return items.map((i) => {
      let desc: string;

      if (i.email) {
        desc = `${i.name} (${i.email})`;
      } else {
        desc = i.name;
      }

      return [i.id, desc];
    });
  });

  // ---------------------------------------------------------------------------
  function cancel() {
    globalThis.location.href = `/pri/meeting`;
  }

  // ---------------------------------------------------------------------------
  async function onsubmit() {
    try {
      warning = false;
      disabled = true;

      await action("/api/pri/meeting/membership/add/bycode", p);
      globalThis.location.href = `/pri/meeting`;
    } catch {
      warning = true;
      disabled = false;
    }
  }
</script>

<!-- -------------------------------------------------------------------------->
<section id="add">
  <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
  {#await Promise.all([pr1, pr2]) then [_p, profiles]}
    <div class="d-flex mt-2 justify-content-center">
      <form {onsubmit} style="width:{FORM_WIDTH};">
        <Text
          name="meeting_name"
          label="Meeting"
          value={invite.meeting_name}
          disabled={true}
          readonly={true}
        />
        <Textarea
          name="meeting_info"
          label="Info"
          value={invite.meeting_info}
          disabled={true}
          readonly={true}
        />
        {#if invite.session_list.length > 1}
          <Textarea
            name="meeting_schedule"
            label="Schedules"
            value={schedules}
            disabled={true}
            readonly={true}
          />
        {:else if invite.session_list.length === 1}
          <Text
            name="meeting_schedule"
            label="Schedule"
            value={schedules}
            disabled={true}
            readonly={true}
          />
        {/if}
        <Select
          id="profile_id"
          label="Profile"
          bind:value={p.profile_id}
          options={profiles}
        />

        {#if warning}
          <Warning>The subscribe request is not accepted.</Warning>
        {/if}

        {#if isExist}
          <Warning>
            This meeting is already in your list.<br />
            Nothing to do.
          </Warning>

          <div class="d-flex gap-5 mt-5 justify-content-center">
            <Cancel label="Abort" onclick={cancel} />
          </div>
        {:else}
          <div class="d-flex gap-5 mt-5 justify-content-center">
            <Cancel {disabled} onclick={cancel} />
            <SubmitBlocker />
            <Submit {disabled} label="Subscribe" />
          </div>
        {/if}
      </form>
    </div>
  {:catch}
    <Warning>Something went wrong</Warning>
  {/await}
</section>
