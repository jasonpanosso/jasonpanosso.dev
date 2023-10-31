<script lang="ts">
  import { terminalState } from '$lib/terminalStore';

  export let command: string;

  terminalState.update((prev) => ({ ...prev, commandHistory: [] }));
</script>
