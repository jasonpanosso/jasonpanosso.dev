import type { CommandHistoryAction } from '$lib/types';

const banner = [
  ` _    _      _                          _ `,
  `| |  | |    | |                        | |`,
  `| |  | | ___| | ___ ___  _ __ ___   ___| |`,
  `| |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ |`,
  `\\  /\\  /  __/ | (_| (_) | | | | | |  __/_|`,
  ` \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___(_)`,
];

export function motdHandler(_args?: string[]): CommandHistoryAction {
  return {
    type: 'ADD',
    historyItem: {
      command: 'motd',
      output: banner,
    },
  };
}
