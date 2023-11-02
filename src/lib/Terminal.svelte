<script lang="ts">
  import ShellPrompt from '$lib/ShellPrompt.svelte';
  import TerminalInput from '$lib/TerminalInput.svelte';
  import ScrollToBottom from '$lib/ScrollToBottom.svelte';
  import { throttle } from '$lib/utils';
  import { blur } from 'svelte/transition';
  import { focusInput, terminalState } from '$lib/terminalStore';

  let terminalContainer: HTMLDivElement;
  let hideScrollButton = true;

  $: {
    $terminalState.inputCommand;
    $terminalState.commandHistory;
    // cursed, this has to fire after reactivity updates finish in order to
    // scroll down correctly. More set timeout!! :-) :-)
    setTimeout(() => scrollContainerToBottom());
  }

  $: {
    console.log(hideScrollButton);
  }

  function updateScrollButtonVisibility() {
    hideScrollButton = containerIsScrolledToBottom();
  }

  function scrollContainerToBottom() {
    if (terminalContainer) {
      terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
    updateScrollButtonVisibility();
  }

  function containerIsScrolledToBottom() {
    return (
      Math.ceil(
        terminalContainer.scrollHeight - terminalContainer.scrollTop
      ) === terminalContainer.clientHeight
    );
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  bg-background p-4 font-iosevka text-sm text-foreground sm:text-lg
  md:text-xl"
  in:blur={{ delay: 250, duration: 250 }}
  on:click={focusInput}
>
  <div
    class="hide-scrollbar relative flex h-full scroll-p-1 flex-col
    overflow-auto rounded border-2 border-secondary p-4"
    bind:this={terminalContainer}
    on:scroll={throttle(updateScrollButtonVisibility, 100)}
  >
    {#each $terminalState.commandHistory as historyItem}
      <div class="flex flex-col justify-center">
        <ShellPrompt command={historyItem.command} />
        <svelte:component this={historyItem.component} />
      </div>
    {/each}

    <TerminalInput inputCallback={scrollContainerToBottom} />
  </div>

  <ScrollToBottom
    onClick={scrollContainerToBottom}
    bind:hidden={hideScrollButton}
  />
</div>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
