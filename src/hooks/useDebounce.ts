import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  immediate = false,
): (...args: Parameters<T>) => void {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTime = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (immediate) {
        if (
          lastCallTime.current === null ||
          Date.now() - lastCallTime.current >= delay
        ) {
          callback(...args);
        }
        lastCallTime.current = Date.now();
      } else {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => callback(...args), delay);
      }
    },
    [callback, delay, immediate],
  );

  return debouncedCallback;
}

export default useDebounce;
