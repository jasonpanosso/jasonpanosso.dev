import type { Command, CommandComponent } from '$lib/types';
import Clear from './Clear.svelte';
import Help from './Help.svelte';
import Whoami from './Whoami.svelte';
import Hostname from './Hostname.svelte';
import Motd from './Motd.svelte';

export function initializeCommandComponentMap(): Record<
  Command,
  CommandComponent
> {
  return {
    clear: Clear,
    help: Help,
    whoami: Whoami,
    hostname: Hostname,
    motd: Motd,
  };
}
