<script lang="ts">
  export let label: string;
  export let max: number;
  export let min: number;
  export let name: string;
  export let disabled = false;
  export let readonly = false;
  export let required = false;
  export let step: number;
  export let value: number;
</script>

<!-- -------------------------------------------------------------------------->
<div class="form-floating my-3">
  <input
    type="text"
    id={name}
    class="form-control"
    {name}
    placeholder=""
    bind:value
    {disabled}
    {readonly}
    {required}
    tabindex={disabled || readonly ? -1 : undefined}
    on:change
    on:input
  />
  <label for={name}>{label}</label>
</div>

<input
  type="range"
  id="range-{name}"
  class="form-range"
  name="range-{name}"
  bind:value
  disabled={disabled || readonly}
  {min}
  {max}
  {step}
  tabindex={readonly ? -1 : undefined}
  on:input
/>
