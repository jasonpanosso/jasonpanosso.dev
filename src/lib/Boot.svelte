<script lang="ts">
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { BIOS_LOGS, GRUB_LOGS, SYSTEMD_LOGS } from '$lib/bootLogs';
  import simulateTyping from '$lib/utils/simulateTyping';
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';
  import { blur } from 'svelte/transition';

  export let bootCompleted = false;

  const { hostname } = get(terminalState);

  let currentLogs: string[] = [];
  let showLogin = false;

  $: usernameInput = '';

  let logContainer: HTMLElement;
  afterUpdate(() => {
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  onMount(() => {
    const skipSetupHandler = (event: KeyboardEvent) => {
      if (event.key) {
        bootCompleted = true;
      }
    };
    window.addEventListener('keydown', skipSetupHandler);

    void simulateBootSequence();

    return () => {
      window.removeEventListener('keydown', skipSetupHandler);
    };
  });

  async function simulateBootSequence() {
    await appendLogs(BIOS_LOGS, 250, 350, 3000);
    await appendLogs(GRUB_LOGS, 150, 250, 1000);
    await appendLogs(SYSTEMD_LOGS, 80, 120, 500);
    currentLogs = [];
    showLogin = true;

    setTimeout(async () => {
      await simulateTyping(
        'guest',
        (newChar) => (usernameInput += newChar),
        () => setTimeout(() => (bootCompleted = true), 1500)
      );
    }, 2000);
  }

  async function appendLogs(
    newLogs: string[],
    minDelay: number,
    maxDelay: number,
    waitTime: number
  ) {
    for (const log of newLogs) {
      currentLogs = [...currentLogs, log];
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    currentLogs = [];
  }
</script>

<div
  bind:this={logContainer}
  out:blur={{ delay: 0, duration: 250 }}
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  p-4 font-unifont text-xs text-white sm:text-lg md:text-xl"
>
  {#each currentLogs as log}
    <p>{log || '\u00A0'}</p>
  {/each}
  {#if showLogin}
    <div class="flex flex-col">
      <p>Debian GNU/Linux 11 {hostname} tty1</p>
      <div class="flex items-center">
        <span>{hostname} login: {usernameInput}</span>
        <span class="fake-caret inline-block h-4 w-[1px] bg-white" />
      </div>
    </div>
  {/if}
</div>

<style>
  .fake-caret {
    animation: blink 1.5s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
