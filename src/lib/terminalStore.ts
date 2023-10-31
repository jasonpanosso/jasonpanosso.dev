import { writable } from 'svelte/store';
import type { CommandHistoryItem } from '$lib/types';

export type TerminalState = {
  currentDir: string;
  username: string;
  hostname: string;
  commandHistory: CommandHistoryItem[];
};

const initialState: TerminalState = {
  currentDir: '~',
  username: 'guest',
  hostname: 'jasonpanosso.dev',
  commandHistory: [],
};

export const terminalState = writable<TerminalState>(initialState);
