<script lang="ts">
  export let effect = "border";
</script>

<!-- -------------------------------------------------------------------------->
<div class="d-flex justify-content-center my-5">
  <div class="spinner-{effect} text-secondary" role="status">
    <span class="visually-hidden">
      <slot />
    </span>
  </div>
</div>
