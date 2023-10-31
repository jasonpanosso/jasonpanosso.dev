export default async function simulateTyping(
  textToType: string,
  onUpdate: (char: string) => void,
  onCompletion: () => void
) {
  for (const char of textToType) {
    await new Promise((resolve) => {
      const randomDelay = Math.floor(Math.random() * (150 - 50 + 1)) + 300;
      setTimeout(() => {
        onUpdate(char);
        resolve(null);
      }, randomDelay);
    });
  }
  onCompletion();
}
