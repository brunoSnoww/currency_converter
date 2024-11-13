import { useRef, useCallback } from "react";

export function useDebounce(
  callback: (...args: any[]) => void,
  delay: number,
  immediate = false,
) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTime = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
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
