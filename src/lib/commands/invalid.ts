function handleInvalidCommand(): CommandHistoryAction {
  return {
    type: 'ADD',
    historyItem: {
      command: baseCommand ?? '',
      output: [
        `Command not found: ${
          baseCommand ?? ''
        }. Enter 'help' for a list of valid commands`,
      ],
    },
  };
}
