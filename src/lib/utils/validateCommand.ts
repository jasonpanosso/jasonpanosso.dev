import { COMMANDS, type Command } from '$lib/types';

export function isCommandValid(cmd: string | undefined): cmd is Command {
  return cmd !== undefined && COMMANDS.includes(cmd as Command);
}
