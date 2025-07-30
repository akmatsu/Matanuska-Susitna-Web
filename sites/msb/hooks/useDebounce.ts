import { useEffect, useRef } from 'react';

export function useDebounce(fn: () => void, delay: number = 300) {
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isNotFirstRender = useRef(false);

  useEffect(() => {
    if (!isNotFirstRender.current) {
      isNotFirstRender.current = true;
      fn();
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fn();
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fn, delay]);
}
