<script lang="ts">
  import { COMMANDS } from '$lib/types';

  export let args: string[] | undefined;
</script>

<div class="flex">
  {#each COMMANDS as command}
    <button>{command}, </button>
  {/each}
</div>
