import type { CommandHistoryAction } from '$lib/types';

export function clearHandler(_args?: string[]): CommandHistoryAction {
  return { type: 'CLEAR' };
}
