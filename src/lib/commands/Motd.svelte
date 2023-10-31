<script lang="ts">
  import ClickableCommand from '$lib/ClickableCommand.svelte';

  export let command: string;

  const BANNER = [
    ` _    _      _                          _ `,
    `| |  | |    | |                        | |`,
    `| |  | | ___| | ___ ___  _ __ ___   ___| |`,
    `| |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ |`,
    `\\  /\\  /  __/ | (_| (_) | | | | | |  __/_|`,
    ` \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___(_)\n\n`,
  ];
</script>

<div class="flex flex-col">
  {#each BANNER as line}
    <p>{line}</p>
  {/each}

  <p>Thanks for visiting my site!</p>
  <span class="whitespace-normal">
    Type 'help', or click <ClickableCommand command="help" /> to see a list of available
    commands.
  </span>
</div>
