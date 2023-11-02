<script lang="ts">
  import { blur } from 'svelte/transition';

  export let onClick: () => void;
  export let hidden: boolean;
</script>

{#if !hidden}
  <button
    class="focus:ring-secondary-300 absolute bottom-8 left-1/2 flex
    aspect-square h-12 w-12 items-center justify-center self-center
    justify-self-end rounded-full bg-secondary p-4 text-foreground outline-black
    hover:bg-primary focus:outline-none focus:ring-2 focus:ring-foreground"
    on:click={onClick}
    in:blur={{ duration: 250 }}
    out:blur={{ duration: 150 }}
  >
    <span class="mt-1">▼</span>
  </button>
{/if}
