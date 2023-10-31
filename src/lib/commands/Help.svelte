<script lang="ts">
  import { COMMANDS } from '$lib/types';
  import ClickableCommand from '$lib/ClickableCommand.svelte';

  export let command: string;
</script>

<div class="flex flex-col gap-2">
  <p>Available commands:</p>
  <div class="flex gap-2">
    {#each COMMANDS as availableCommand}
      <ClickableCommand command={availableCommand} />
    {/each}
  </div>
</div>
