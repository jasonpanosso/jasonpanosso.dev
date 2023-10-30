import type { CommandHistoryAction } from '$lib/types';

const BANNER = [
  ` _    _      _                          _ `,
  `| |  | |    | |                        | |`,
  `| |  | | ___| | ___ ___  _ __ ___   ___| |`,
  `| |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ |`,
  `\\  /\\  /  __/ | (_| (_) | | | | | |  __/_|`,
  ` \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___(_)\n\n`,
];

const MOTD_MESSAGE = [
  `Thanks for visiting my site!`,
  `Type 'help' to see a list of available commands.`,
];

export function motdHandler(_args?: string[]): CommandHistoryAction {
  return {
    type: 'ADD',
    historyItem: {
      command: 'motd',
      output: [...BANNER, ...MOTD_MESSAGE],
    },
  };
}
