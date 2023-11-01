import { get, writable } from 'svelte/store';
import type { CommandHistoryItem } from '$lib/types';

export type TerminalState = {
  currentDir: string;
  username: string;
  hostname: string;
  inputElement: HTMLInputElement | null;
  inputCommand: string;
  commandHistory: CommandHistoryItem[];
};

const initialState: TerminalState = {
  currentDir: '~',
  username: 'guest',
  hostname: 'jasonpanosso.dev',
  inputElement: null,
  inputCommand: '',
  commandHistory: [],
};

export const terminalState = writable<TerminalState>(initialState);

export function resetInput() {
  terminalState.update((prev) => ({
    ...prev,
    inputCommand: '',
  }));
}

export function focusInput() {
  get(terminalState).inputElement!.focus();
}
