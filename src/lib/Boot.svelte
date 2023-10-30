<script lang="ts">
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { BIOS_LOGS, GRUB_LOGS, SYSTEMD_LOGS } from '$lib/boot';
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';
  import { blur } from 'svelte/transition';

  export let bootCompleted = false;

  let autoTypeText = 'guest';
  let autoTypeIndex = 0;
  let showLogin = false;
  $: usernameInput = '';

  let logContainer: HTMLElement;
  let accumulatedLogs: string[] = [];

  const { hostname } = get(terminalState);

  $: if (showLogin) {
    setTimeout(async () => {
      await simulateTyping();
    }, 3000);
  }

  onMount(async () => {
    await appendLogs(BIOS_LOGS, 250, 350)
      .then(() => {
        return appendLogs(GRUB_LOGS, 150, 250);
      })
      .then(() => {
        return appendLogs(SYSTEMD_LOGS, 80, 120);
      })
      .then(() => {
        showLogin = true;
      });
  });

  afterUpdate(() => {
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  async function appendLogs(
    newLogs: string[],
    minDelay: number,
    maxDelay: number
  ) {
    for (const log of newLogs) {
      accumulatedLogs = [...accumulatedLogs, log];
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
  }

  async function simulateTyping() {
    for (let i = autoTypeIndex; i < autoTypeText.length; i++) {
      await new Promise((resolve) => {
        const randomDelay = Math.floor(Math.random() * (150 - 50 + 1)) + 300;
        setTimeout(() => {
          usernameInput += autoTypeText[i];
          resolve(null);
        }, randomDelay);
      });
    }
    // TODO: Stay automatic, or put a little "ENTER" button?
    setTimeout(() => (bootCompleted = true), 1500);
  }
</script>

<div
  bind:this={logContainer}
  out:blur={{ delay: 0, duration: 250 }}
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  whitespace-pre p-4 font-unifont text-white"
>
  {#each accumulatedLogs as log}
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
