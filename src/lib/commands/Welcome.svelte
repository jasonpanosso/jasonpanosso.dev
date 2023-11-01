<script lang="ts">
  import ClickableCommand from '$lib/ClickableCommand.svelte';

  const BANNER = [
    ` _    _      _                          _ `,
    `| |  | |    | |                        | |`,
    `| |  | | ___| | ___ ___  _ __ ___   ___| |`,
    `| |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ |`,
    `\\  /\\  /  __/ | (_| (_) | | | | | |  __/_|`,
    ` \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___(_)\n\n`,
  ];
</script>

<div class="flex flex-col gap-1">
  <div>
    {#each BANNER as line}
      <p class="whitespace-pre text-xs sm:text-sm md:text-base">{line}</p>
    {/each}
  </div>

  <p>Hi there! I'm Jason Panosso.</p>

  <p>Feel free to poke around to learn a bit about me.</p>

  <p>
    You can type, or click <ClickableCommand command="help" />
    to see a list of available commands.
  </p>
</div>
