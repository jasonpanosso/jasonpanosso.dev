<script lang="ts">
  import ShellPrompt from '$lib/ShellPrompt.svelte';
  import { COMMANDS, type Command } from '$lib/types';
  import { commandMap } from '$lib/commands';
  import { onMount } from 'svelte';

  let inputElement: HTMLInputElement;

  let command = '';
  $: [baseCommand, ...commandArgs] = command.split(' ');
  $: isValidCommand = COMMANDS.includes(baseCommand as Command);

  let commandHistory: { command: string; output: string[] }[] = [];

  function handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const commandHandler =
        baseCommand && isValidCommand && baseCommand in commandMap
          ? commandMap[baseCommand as keyof typeof commandMap]
          : handleInvalidCommand;

      const output = commandHandler(commandArgs);

      commandHistory = [...commandHistory, { command, output }];
      command = '';
    }
  }

  function handleInvalidCommand(_args: string[]) {
    return [
      `Command not found: ${baseCommand}. Enter 'help' for a list of valid commands`,
    ];
  }

  onMount(() => {
    inputElement.focus();
  });
</script>

<div
  class="flex flex-col p-4 bg-background text-foreground font-mono relative
  h-full"
>
  {#each commandHistory as history}
    <div class="flex flex-col justify-start">
      <div class="flex items-center">
        <ShellPrompt />
        <span>{history.command}</span>
      </div>
      {#each history.output as output}
        <span>{output}</span>
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
      class="bg-background outline-none cursor w-full caret-primary align-middle
      {isValidCommand ? 'text-primary' : 'text-tertiary'}"
      style="caret-shape: block;"
    />
  </div>
</div>
