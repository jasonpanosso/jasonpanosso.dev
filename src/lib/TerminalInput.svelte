<script lang="ts">
  import { onMount } from 'svelte';
  import ShellPrompt from './ShellPrompt.svelte';
  import { isCommandValid } from '$lib/utils/validateCommand';
  import { addHistoryItem } from '$lib/utils/addHistoryItem';

  let command = '';
  let inputElement: HTMLInputElement;

  $: baseCommand = command.split(' ')[0];
  $: isValidCommand = isCommandValid(baseCommand ?? '');
  onMount(() => inputElement.focus());

  function handleKeydown(event: KeyboardEvent) {
    // TODO: Strategy pattern for keyboard events(enter, ctrl-c, tab, etc)
    // TODO: args handler
    if (event.key === 'Enter') {
      addHistoryItem(baseCommand ?? '');
      command = '';
    }
  }
</script>

<div class="flex items-center">
  <ShellPrompt />
  <input
    bind:this={inputElement}
    type="text"
    spellcheck="false"
    bind:value={command}
    on:keydown={handleKeydown}
    on:blur={() => inputElement.focus()}
    class="w-full bg-background caret-primary outline-none
        {isValidCommand ? 'text-primary' : 'text-tertiary'}"
    style="caret-shape: block;"
  />
</div>
