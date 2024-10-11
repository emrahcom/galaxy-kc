<script lang="ts">
  import { FORM_WIDTH } from "$lib/config";

  const isAuthenticated =
    globalThis.sessionStorage.getItem("oidc_authenticated");
</script>

<!-- -------------------------------------------------------------------------->
<section id="welcome">
  <div class="row d-flex mt-5 justify-content-center">
    <div class="col mx-auto text-center" style="max-width:{FORM_WIDTH};">
      <h2 class="text-muted mb-5">Welcome</h2>

      <h4 class="text-muted mb-5">
        This site is for Fellow Jitsters to organize Jitsi meetings, meeting
        schedules and attendees.
      </h4>

      {#if isAuthenticated}
        <h5 class="text-muted mb-5">
          Click
          <button
            class="btn btn-sm btn-outline-primary mx-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <span class="bi bi-list" />
          </button>
          to start.
        </h5>
      {:else}
        <h4 class="text-muted small mb-5">
          Please click
          <a class="text-primary" href="/oidc/redirect-consent">Sign In</a>
          to start.
        </h4>
      {/if}
    </div>
  </div>
</section>
