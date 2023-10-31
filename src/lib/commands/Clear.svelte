<script lang="ts">
  import { terminalState } from '$lib/terminalStore';

  export let args: string[] | undefined;

  terminalState.update((prev) => ({ ...prev, commandHistory: [] }));
</script>
