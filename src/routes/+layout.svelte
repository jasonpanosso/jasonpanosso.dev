<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { setPalette } from '$lib/commands/theme';
  import { GRUVBOX } from '$lib/palettes';

  onMount(() => {
    setPalette(GRUVBOX);
  });
</script>

<slot />
