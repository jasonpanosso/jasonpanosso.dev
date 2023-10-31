import type { Command, CommandComponent } from '$lib/types';
import Clear from './Clear.svelte';
import Help from './Help.svelte';
import Whoami from './Whoami.svelte';
import Hostname from './Hostname.svelte';
import Motd from './Motd.svelte';
import InvalidCommand from './InvalidCommand.svelte';
import EmptyCommand from './EmptyCommand.svelte';
import Github from './Github.svelte';
import { isCommandValid } from '$lib/utils/validateCommand';

const commandComponentMap: Record<Command, CommandComponent> = {
  clear: Clear,
  help: Help,
  whoami: Whoami,
  hostname: Hostname,
  motd: Motd,
  github: Github,
};

export function mapCommandToComponent(baseCommand: string): CommandComponent {
  if (!baseCommand) {
    return EmptyCommand;
  } else if (isCommandValid(baseCommand)) {
    return commandComponentMap[baseCommand];
  } else {
    return InvalidCommand;
  }
}
