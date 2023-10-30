<script lang="ts">
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';
  import { BIOS_LOGS, GRUB_LOGS, SYSTEMD_LOGS } from '$lib/boot';
  import { terminalState } from '$lib/terminalStore';
  import { get } from 'svelte/store';
  import { blur } from 'svelte/transition';

  export let bootCompleted = false;

  let showLogin = false;
  let usernameInput = '';

  let loginInput: HTMLInputElement;
  let logContainer: HTMLElement;
  let accumulatedLogs: string[] = [];

  const { hostname } = get(terminalState);

  $: if (showLogin && loginInput) {
    loginInput.focus();
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

  function handleLogin(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      terminalState.update((state) => {
        state.username = usernameInput;
        return state;
      });
      bootCompleted = true;
    }
  }
</script>

<div
  bind:this={logContainer}
  out:blur={{ delay: 0, duration: 250 }}
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  p-4 font-unifont text-white"
>
  {#each accumulatedLogs as log}
    <p class="whitespace-pre">{log || '\u00A0'}</p>
  {/each}
  {#if showLogin}
    <br />
    <p>Debian GNU/Linux 11 {hostname} tty1</p>
    <span>{hostname} login:</span>
    <input
      bind:this={loginInput}
      bind:value={usernameInput}
      on:keydown={handleLogin}
      on:blur={() => loginInput.focus()}
      class="bg-black text-white outline-none"
    />
  {/if}
</div>
