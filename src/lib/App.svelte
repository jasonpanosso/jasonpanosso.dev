<script lang="ts">
  import Boot from './Boot.svelte';
  import Terminal from './Terminal.svelte';

  let bootCompleted = false;
  // testing:
  // setTimeout(() => (bootCompleted = true), 500);
</script>

<div class="grid h-full">
  {#if bootCompleted}
    <Terminal />
  {:else}
    <Boot bind:bootCompleted />
  {/if}
</div>
