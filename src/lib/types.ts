import type { ComponentType } from 'svelte';

export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  foreground: string;
}

export const COMMANDS = [
  'help',
  'clear',
  'whoami',
  'hostname',
  'github',
  'welcome',
  'email',
  'repo',
] as const;
export type Command = (typeof COMMANDS)[number];

export type CommandComponent = ComponentType;

export type CommandHistoryItem = {
  command: string;
  component: CommandComponent;
};
