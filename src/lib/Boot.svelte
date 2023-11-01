<script lang="ts">
  import { onMount } from 'svelte';
  import { simulateTyping } from '$lib/utils/simulateInput';
  import { blur } from 'svelte/transition';

  export let bootCompleted = false;

  $: usernameInput = '';

  onMount(() => {
    const skipSetupHandler = (event: KeyboardEvent) => {
      if (event.key) {
        bootCompleted = true;
      }
    };
    window.addEventListener('keydown', skipSetupHandler);

    void login();

    return () => {
      window.removeEventListener('keydown', skipSetupHandler);
    };
  });

  function login() {
    setTimeout(async () => {
      await simulateTyping(
        'guest',
        (newChar) => (usernameInput += newChar)
      ).then(() => setTimeout(() => (bootCompleted = true), 1500));
    }, 1500);
  }
</script>

<div
  out:blur={{ delay: 0, duration: 250 }}
  class="col-start-1 col-end-2 row-start-1 row-end-2 h-full overflow-hidden
  p-4 font-unifont text-xs text-white sm:text-lg md:text-xl"
>
  <div class="flex flex-col">
    <p>Debian GNU/Linux 11 jasonpanosso.dev tty1</p>
    <div class="flex items-center">
      <span>jasonpanosso.dev login: {usernameInput}</span>
      <span class="fake-caret inline-block h-4 w-[1px] bg-white" />
    </div>
  </div>
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
