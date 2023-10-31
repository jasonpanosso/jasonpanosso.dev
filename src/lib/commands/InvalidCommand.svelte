<script lang="ts">
  export let command: string;

  const baseCommand = command.split(' ')[0];
</script>

<p>
  Command not found: {baseCommand}. Enter 'help' for a list of valid commands
</p>
