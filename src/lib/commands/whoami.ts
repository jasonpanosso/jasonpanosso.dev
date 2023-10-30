import { terminalState } from '$lib/terminalStore';
import type { CommandHistoryAction } from '$lib/types';
import { get } from 'svelte/store';

export function whoamiHandler(_args?: string[]): CommandHistoryAction {
  const state = get(terminalState);

  return {
    type: 'ADD',
    historyItem: {
      command: 'whoami',
      output: [state.username],
    },
  };
}
