import type { ComponentType, SvelteComponent } from 'svelte';

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
  'motd',
] as const;
export type Command = (typeof COMMANDS)[number];

type CommandComponentProps = { args: string[] | undefined };
export type CommandComponent = ComponentType<
  SvelteComponent<CommandComponentProps>
>;

export type CommandHistoryItem = {
  command: string;
  component: CommandComponent;
  args: string[] | undefined;
};
