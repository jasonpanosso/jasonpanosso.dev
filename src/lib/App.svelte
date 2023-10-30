<script lang="ts">
  import Boot from './Boot.svelte';
  import Terminal from './Terminal.svelte';

  let bootCompleted = false;
</script>

{#if bootCompleted}
  <Terminal />
{:else}
  <Boot bind:bootCompleted />
{/if}
