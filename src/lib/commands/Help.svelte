<script lang="ts">
  import { COMMANDS } from '$lib/types';
  import ClickableCommand from '$lib/ClickableCommand.svelte';
</script>

<div class="flex flex-col gap-2">
  To enter a command, either click, or type one of the commands listed below.
  <div>
    <p>About me:</p>
    <div class="flex flex-wrap gap-2">
      <ClickableCommand command="whoami" />
      <ClickableCommand command="email" />
      <ClickableCommand command="github" />
    </div>
  </div>

  <div>
    <p>All available commands:</p>
    <div class="flex flex-wrap gap-2">
      {#each COMMANDS as availableCommand}
        <ClickableCommand command={availableCommand} />
      {/each}
    </div>
  </div>
</div>
