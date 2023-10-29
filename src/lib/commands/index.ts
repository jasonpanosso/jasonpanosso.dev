import type { CommandHistoryAction } from '$lib/types';

export { initializeCommandHandlerMap } from './commandHandlerMap';

export function handleInvalidCommand(
  invalidCommand: string
): () => CommandHistoryAction {
  return () => ({
    type: 'ADD',
    historyItem: {
      command: invalidCommand ?? '',
      output: [
        `Command not found: ${
          invalidCommand ?? ''
        }. Enter 'help' for a list of valid commands`,
      ],
    },
  });
}
