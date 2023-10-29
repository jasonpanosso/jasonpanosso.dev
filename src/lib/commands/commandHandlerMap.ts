import type { Command, CommandHandler } from '$lib/types';
import { clearHandler } from './clear';
import { helpHandler } from './help';

export function initializeCommandHandlerMap(): Record<Command, CommandHandler> {
  return {
    clear: clearHandler,
    help: helpHandler,
  };
}
