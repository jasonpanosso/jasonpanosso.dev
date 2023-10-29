import { COMMANDS } from '$lib/types';

export function helpHandler() {
  return ['Available commands:', COMMANDS.join(', ')];
}
