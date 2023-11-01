<script lang="ts">
  import ShellPrompt from './ShellPrompt.svelte';
  import { afterUpdate } from 'svelte';
  import { blur } from 'svelte/transition';
  import TerminalInput from './TerminalInput.svelte';
  import { focusInput, terminalState } from '$lib/terminalStore';

  let terminalContainer: HTMLDivElement;

  afterUpdate(() => {
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  bg-background p-4 align-middle font-iosevka text-sm text-foreground sm:text-lg
  md:text-xl"
  in:blur={{ delay: 250, duration: 250 }}
  on:click={focusInput}
>
  <div
    class="flex h-full flex-col overflow-hidden rounded border-2
    border-secondary p-4"
    bind:this={terminalContainer}
  >
    {#each $terminalState.commandHistory as historyItem}
      <div class="flex flex-col justify-center">
        <ShellPrompt command={historyItem.command} />
        <svelte:component this={historyItem.component} />
      </div>
    {/each}

    <TerminalInput />
  </div>
</div>
