import type { Command, CommandHandler } from '$lib/types';
import { clearHandler } from './clear';
import { helpHandler } from './help';
import { hostnameHandler } from './hostname';
import { motdHandler } from './motd';
import { whoamiHandler } from './whoami';

export function initializeCommandHandlerMap(): Record<Command, CommandHandler> {
  return {
    clear: clearHandler,
    help: helpHandler,
    whoami: whoamiHandler,
    hostname: hostnameHandler,
    motd: motdHandler,
  };
}
