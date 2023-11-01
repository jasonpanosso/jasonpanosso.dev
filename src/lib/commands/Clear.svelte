<script lang="ts">
  import { terminalState } from '$lib/terminalStore';

  terminalState.update((prev) => ({ ...prev, commandHistory: [] }));
</script>
