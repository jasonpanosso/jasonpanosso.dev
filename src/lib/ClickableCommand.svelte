<script lang="ts">
  import { addHistoryItem } from './utils/addHistoryItem';

  export let command: string;

  function handleClick() {
    addHistoryItem(command);
  }
</script>

<button
  class="whitespace-normal rounded border px-1 text-center hover:bg-primary
  hover:text-background"
  on:click={handleClick}
>
  {command}
</button>
