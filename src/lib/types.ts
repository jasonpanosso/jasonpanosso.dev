export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  foreground: string;
}

export const COMMANDS = ['help', 'clear', 'whoami', 'hostname', 'motd'] as const;
export type Command = (typeof COMMANDS)[number];

export type CommandHistoryItem = { command: string; output: string[] };

type AddHistoryAction = { type: 'ADD'; historyItem: CommandHistoryItem };
type ClearHistoryAction = { type: 'CLEAR' };

export type CommandHandler = (args?: string[]) => CommandHistoryAction;
export type CommandHistoryAction = AddHistoryAction | ClearHistoryAction;
