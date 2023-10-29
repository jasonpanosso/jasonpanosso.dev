export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  foreground: string;
}

export const COMMANDS = ['help'] as const;
export type Command = (typeof COMMANDS)[number];
