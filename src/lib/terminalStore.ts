import { writable } from 'svelte/store';

export type TerminalState = {
  currentDir: string;
  username: string;
  hostname: string;
};

const initialState: TerminalState = {
  currentDir: '~',
  username: 'guest',
  hostname: 'jasonpanosso.dev',
};

export const terminalState = writable<TerminalState>(initialState);
