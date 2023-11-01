import type { Command, CommandComponent } from '$lib/types';
import Clear from './Clear.svelte';
import Help from './Help.svelte';
import Whoami from './Whoami.svelte';
import Hostname from './Hostname.svelte';
import InvalidCommand from './InvalidCommand.svelte';
import EmptyCommand from './EmptyCommand.svelte';
import Github from './Github.svelte';
import Welcome from './Welcome.svelte';
import Email from './Email.svelte';
import Repo from './Repo.svelte';
import { isCommandValid } from '$lib/utils/validateCommand';

const commandComponentMap: Record<Command, CommandComponent> = {
  clear: Clear,
  help: Help,
  whoami: Whoami,
  hostname: Hostname,
  github: Github,
  welcome: Welcome,
  email: Email,
  repo: Repo,
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
