export function throttle<T extends (...args: K[]) => void, K>(
  func: T,
  limit: number
): (...args: K[]) => void {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: K[]) {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
      return;
    }

    clearTimeout(lastFunc);
    lastFunc = setTimeout(
      () => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      },
      Math.max(limit - (Date.now() - lastRan), 0)
    );
  };
}
