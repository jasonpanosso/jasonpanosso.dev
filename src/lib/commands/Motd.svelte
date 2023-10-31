<script lang="ts">
  export let args: string[] | undefined;

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
  <p>Type 'help' to see a list of available commands.</p>
</div>
