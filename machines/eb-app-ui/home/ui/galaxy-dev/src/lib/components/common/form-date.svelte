<script lang="ts">
  export let label: string;
  export let min = "2020-01-01";
  export let name: string;
  export let disabled = false;
  export let readonly = false;
  export let required = false;
  export let value: string;
</script>

<!-- -------------------------------------------------------------------------->
<div class="form-floating my-3">
  <input
    type="date"
    id={name}
    class="form-control"
    {name}
    placeholder=""
    bind:value
    {min}
    {disabled}
    {readonly}
    {required}
    tabindex={disabled || readonly ? -1 : undefined}
  />
  <label for={name}>{label}</label>
</div>
