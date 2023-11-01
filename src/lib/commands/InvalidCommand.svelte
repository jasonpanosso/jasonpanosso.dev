<script lang="ts">
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';

  const { commandHistory } = get(terminalState);
  const lastCommand = commandHistory[commandHistory.length - 1]?.command;
  const baseCommand = lastCommand?.split(' ')[0];
</script>

<p>
  Command not found: {baseCommand}. Enter 'help' for a list of valid commands
</p>
