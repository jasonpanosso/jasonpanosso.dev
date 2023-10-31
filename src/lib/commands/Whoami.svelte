<script lang="ts">
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';

  export let args: string[] | undefined;

  const state = get(terminalState);
</script>

<div class="flex">
  {state.username}
</div>
