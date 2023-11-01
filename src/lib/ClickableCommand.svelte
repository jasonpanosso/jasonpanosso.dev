<script lang="ts">
  import { simulateUserInput } from './utils/simulateInput';

  export let command: string;

  async function handleClick() {
    await simulateUserInput(command);
  }
</script>

<button
  class="rounded border border-secondary px-1 text-center hover:bg-primary
  hover:text-background"
  on:click={handleClick}
>
  {command}
</button>
