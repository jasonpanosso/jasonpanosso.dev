import type { CommandHistoryAction } from '$lib/types';
import { COMMANDS } from '$lib/types';

export function helpHandler(_args?: string[]): CommandHistoryAction {
  return {
    type: 'ADD',
    historyItem: {
      command: 'help',
      output: ['Available commands:', COMMANDS.join(', ')],
    },
  };
}
