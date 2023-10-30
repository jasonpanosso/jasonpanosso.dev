<script lang="ts">
  import {
    handleInvalidCommand,
    initializeCommandHandlerMap,
  } from '$lib/commands';
  import ShellPrompt from './ShellPrompt.svelte';
  import type { CommandHistoryAction, CommandHistoryItem } from '$lib/types';
  import { COMMANDS, type Command } from '$lib/types';
  import { afterUpdate, onMount } from 'svelte';
  import { blur } from 'svelte/transition';

  let inputElement: HTMLInputElement;
  let terminalContainer: HTMLDivElement;

  let command = '';
  $: [baseCommand, ...commandArgs] = command.split(' ');
  $: isValidCommand = isCommandValid(baseCommand);

  const commandHandlerMap = initializeCommandHandlerMap();
  let history: CommandHistoryItem[] = [];

  // show motd on login
  updateHistory(commandHandlerMap.motd());

  function handleInput(event: KeyboardEvent) {
    // TODO: Strategy pattern for keyboard events(enter, ctrl-c, tab, etc)
    if (event.key === 'Enter') {
      const commandHandler = isCommandValid(baseCommand)
        ? commandHandlerMap[baseCommand]
        : handleInvalidCommand(baseCommand ?? '');

      const action = commandHandler(commandArgs);
      updateHistory(action);

      command = '';
    }
  }

  function updateHistory(action: CommandHistoryAction) {
    if (action.type === 'ADD') {
      history = [...history, action.historyItem];
    } else if (action.type === 'CLEAR') {
      history = [];
    }
  }

  function isCommandValid(cmd: string | undefined): cmd is Command {
    return cmd !== undefined && COMMANDS.includes(cmd as Command);
  }

  onMount(() => {
    inputElement.focus();
  });

  afterUpdate(() => {
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
  });
</script>

<div
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  bg-background p-4 align-middle font-iosevka text-xl text-foreground"
  in:blur={{ delay: 300, duration: 500 }}
>
  <div
    class="flex h-full flex-col overflow-hidden rounded border-2
    border-secondary p-4"
    bind:this={terminalContainer}
  >
    {#each history as history}
      <div class="flex flex-col justify-start">
        <div class="flex items-center">
          <ShellPrompt />
          <span>{history.command}</span>
        </div>
        {#each history.output as output}
          <span class="whitespace-pre">{output}</span>
        {/each}
      </div>
    {/each}

    <div class="flex items-center">
      <ShellPrompt />
      <input
        bind:this={inputElement}
        type="text"
        spellcheck="false"
        bind:value={command}
        on:keydown={handleInput}
        on:blur={() => inputElement.focus()}
        class="w-full bg-background caret-primary outline-none
        {isValidCommand ? 'text-primary' : 'text-tertiary'}"
        style="caret-shape: block;"
      />
    </div>
  </div>
</div>
