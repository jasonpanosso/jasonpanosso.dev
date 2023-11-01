<script lang="ts">
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';

  const state = get(terminalState);
</script>

<div class="flex">
  {state.hostname}
</div>
