export { initializeCommandComponentMap } from './commandComponentMap';

// export function handleInvalidCommand(
//   invalidCommand: string
// ): () => CommandHistoryAction {
//   return () => ({
//     type: 'ADD',
//     historyItem: {
//       command: invalidCommand,
//       output: [
//         invalidCommand
//           ? `Command not found: ${invalidCommand}. Enter 'help' for a list of valid commands`
//           : '\n',
//       ],
//     },
//   });
// }
