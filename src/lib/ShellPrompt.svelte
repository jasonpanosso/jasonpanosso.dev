<script lang="ts">
  import { terminalState } from '$lib/terminalStore';
</script>

<div class="flex mr-2 min-w-fit align-middle items-center">
  <span class="text-primary mr-2 text-2xl">➥</span>
  <span class="text-secondary text-center">{$terminalState.username}</span>
  <span class="text-foreground">@</span>
  <span class="text-primary">{$terminalState.hostname}</span>
  <span class="text-foreground">:{$terminalState.currentDir}$</span>
</div>
