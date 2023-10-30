<script lang="ts">
  import { terminalState } from '$lib/terminalStore';
</script>

<div class="flex mr-2 min-w-fit">
  <span class="text-primary mr-4">➥</span>
  <span class="text-secondary">{$terminalState.username}</span>
  <span class="text-foreground">@</span>
  <span class="text-primary">{$terminalState.hostname}</span>
  <span class="text-foreground">:{$terminalState.currentDir}$</span>
</div>
