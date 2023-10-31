<script lang="ts">
  import { onMount } from 'svelte';
  import ShellPrompt from './ShellPrompt.svelte';

  export let command: string;
  export let onKeydownCallback: (event: KeyboardEvent) => void;
  export let isValidCommand: boolean;

  let inputElement: HTMLInputElement;

  onMount(() => inputElement.focus());
</script>

<div class="flex items-center">
  <ShellPrompt />
  <input
    bind:this={inputElement}
    type="text"
    spellcheck="false"
    bind:value={command}
    on:keydown={onKeydownCallback}
    on:blur={() => inputElement.focus()}
    class="w-full bg-background caret-primary outline-none
        {isValidCommand ? 'text-primary' : 'text-tertiary'}"
    style="caret-shape: block;"
  />
</div>
