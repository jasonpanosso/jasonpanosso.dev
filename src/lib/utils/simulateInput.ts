import { terminalState, resetInput } from '$lib/terminalStore';
import { get } from 'svelte/store';
import { addHistoryItem } from './addHistoryItem';

export async function simulateTyping(
  textToType: string,
  onUpdate: (char: string) => void,
  delay = 200
) {
  for (const char of textToType) {
    await new Promise((resolve) => {
      const randomDelay = Math.floor(Math.random() * 100) + delay;
      setTimeout(() => {
        onUpdate(char);
        resolve(null);
      }, randomDelay);
    });
  }
}

export async function simulateUserInput(command: string) {
  const inputElement = get(terminalState).inputElement;
  if (!inputElement || inputElement.readOnly) {
    return;
  }

  setInputElementReadOnlyStatus(true);
  resetInput();

  const updateCommandCallback = (char: string) =>
    terminalState.update((prev) => ({
      ...prev,
      inputCommand: prev.inputCommand + char,
    }));

  await simulateTyping(command, updateCommandCallback, 100);
  setTimeout(() => {
    addHistoryItem(command);

    resetInput();

    setInputElementReadOnlyStatus(false);
  }, 100);
}

function setInputElementReadOnlyStatus(isLocked: boolean) {
  terminalState.update((state) => {
    const { inputElement } = state;
    if (inputElement) {
      inputElement.readOnly = isLocked;
    }
    return { ...state, inputElement };
  });
}
