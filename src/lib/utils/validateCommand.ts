import { COMMANDS, type Command } from '$lib/types';

export function isCommandValid(cmd: string): cmd is Command {
  return COMMANDS.includes(cmd as Command);
}
