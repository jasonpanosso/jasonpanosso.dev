<script lang="ts">
  import { initializeCommandComponentMap } from '$lib/commands';
  import ShellPrompt from './ShellPrompt.svelte';
  import { afterUpdate } from 'svelte';
  import { blur } from 'svelte/transition';
  import TerminalInput from './TerminalInput.svelte';
  import { isCommandValid } from '$lib/utils/validateCommand';
  import { terminalState } from '$lib/terminalStore';
  import type { CommandHistoryItem } from './types';

  let terminalContainer: HTMLDivElement;

  let command = '';
  $: [baseCommand, ...commandArgs] = command.split(' ');
  $: isValidCommand = isCommandValid(baseCommand);

  const commandComponentMap = initializeCommandComponentMap();

  function handleInput(event: KeyboardEvent) {
    // TODO: Strategy pattern for keyboard events(enter, ctrl-c, tab, etc)
    // TODO: args handler
    if (event.key === 'Enter') {
      if (isCommandValid(baseCommand)) {
        const component = commandComponentMap[baseCommand];
        const newItem: CommandHistoryItem = {
          component,
          command,
          args: commandArgs,
        };
        terminalState.update((prev) => ({
          ...prev,
          commandHistory: [...prev.commandHistory, newItem],
        }));
      }

      command = '';
    }
  }

  afterUpdate(() => {
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
  });
</script>

<div
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  whitespace-pre bg-background p-4 align-middle font-iosevka text-xl
  text-foreground"
  in:blur={{ delay: 250, duration: 250 }}
>
  <div
    class="flex h-full flex-col overflow-hidden rounded border-2
    border-secondary p-4"
    bind:this={terminalContainer}
  >
    {#each $terminalState.commandHistory as historyItem}
      <div class="flex flex-col justify-start">
        <ShellPrompt command={historyItem.command} />
        <svelte:component
          this={historyItem.component}
          args={historyItem.args}
        />
      </div>
    {/each}

    <TerminalInput
      bind:command
      bind:isValidCommand
      onKeydownCallback={handleInput}
    />
  </div>
</div>
