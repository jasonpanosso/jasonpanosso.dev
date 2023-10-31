import { mapCommandToComponent } from '$lib/commands';
import { terminalState } from '$lib/terminalStore';

export function addHistoryItem(clickedCommand: string) {
  const component = mapCommandToComponent(clickedCommand);

  terminalState.update((prev) => ({
    ...prev,
    commandHistory: [
      ...prev.commandHistory,
      { command: clickedCommand, component },
    ],
  }));
}
