<script lang="ts">
  import { onMount } from 'svelte';
  import ShellPrompt from './ShellPrompt.svelte';
  import { focusInput, resetInput, terminalState } from '$lib/terminalStore';
  import {
    isCommandValid,
    addHistoryItem,
    simulateUserInput,
  } from '$lib/utils';

  export let inputCallback: () => void;

  $: baseCommand = $terminalState.inputCommand.split(' ')[0];
  $: isValidCommand = isCommandValid(baseCommand ?? '');

  onMount(() => {
    $terminalState.inputElement!.disabled = true;
    setTimeout(async () => {
      await simulateUserInput('welcome');

      $terminalState.inputElement!.disabled = false;
      focusInput();
    }, 1500);
  });

  function handleKeydown(event: KeyboardEvent) {
    // TODO: Strategy pattern for keyboard events(enter, ctrl-c, tab, etc)
    // TODO: args handler
    if (event.key === 'Enter') {
      addHistoryItem(baseCommand ?? '');
      resetInput();
    }
    setTimeout(() => inputCallback());
  }
</script>

<div class="flex items-center">
  <ShellPrompt />
  <input
    bind:this={$terminalState.inputElement}
    bind:value={$terminalState.inputCommand}
    type="text"
    spellcheck="false"
    on:keydown={handleKeydown}
    class="w-full bg-background caret-primary outline-none
        {isValidCommand ? 'text-primary' : 'text-tertiary'}"
    style="caret-shape: block;"
  />
</div>
