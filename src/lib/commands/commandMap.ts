import type { Command } from '$lib/types';
import { helpHandler } from './help';

export const commandMap: Record<Command, (args?: string[]) => string[]> = {
  help: helpHandler,
};
