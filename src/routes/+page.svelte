<script lang="ts">
  import Boot from '$lib/Boot.svelte';
  import Terminal from '$lib/Terminal.svelte';

  let bootCompleted = false;
</script>

<div class="grid h-full">
  {#if bootCompleted}
    <Terminal />
  {:else}
    <Boot bind:bootCompleted />
  {/if}
</div>
