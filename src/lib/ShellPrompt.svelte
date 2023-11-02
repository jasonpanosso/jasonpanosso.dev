<script lang="ts">
  import { terminalState } from '$lib/terminalStore';

  export let command = '';
</script>

<div class="mr-2 flex min-w-fit items-center align-middle">
  <span class="mr-2 text-2xl text-primary">➥</span>
  <span class="text-center text-secondary">{$terminalState.username}</span>
  <span class="hidden text-foreground sm:inline">@</span>
  <span class="hidden text-primary sm:inline">{$terminalState.hostname}</span>
  <span class="text-foreground">:{$terminalState.currentDir}$</span>
  {#if command}
    <span class="ml-2 text-foreground">
      {command}
    </span>
  {/if}
</div>
