<script lang="ts">
  import HamburgerIcon from '$lib/assets/svgs/HamburgerIcon.svelte';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { simulateUserInput } from '$lib/utils';

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  async function runCommand(command: string) {
    toggleMenu();
    await simulateUserInput(command);
  }
</script>

<div
  class="absolute right-8 top-8 flex flex-col items-end text-xl md:right-12
  md:top-12"
>
  <button
    class="w-10 rounded-full bg-secondary p-3 text-background md:w-12"
    on:click={toggleMenu}
  >
    <HamburgerIcon />
  </button>

  {#if showMenu}
    <div
      class="mr-2 mt-2 flex flex-col gap-1 rounded border border-secondary
      bg-background p-2"
      transition:slide={{
        duration: 400,
        easing: quintOut,
        axis: 'y',
      }}
    >
      <button
        class="rounded border border-foreground p-2 text-center
          hover:bg-primary hover:text-background"
        on:click={() => runCommand('welcome')}
      >
        Welcome
      </button>

      <button
        class="rounded border border-foreground p-2 text-center
          hover:bg-primary hover:text-background"
        on:click={() => runCommand('help')}
      >
        Help
      </button>
    </div>
  {/if}
</div>
