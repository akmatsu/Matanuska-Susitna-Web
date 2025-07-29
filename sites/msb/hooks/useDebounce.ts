import {
  DependencyList,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export function useDebounce(
  fn: () => void,
  delay: number = 300,
  deps: DependencyList = [],
) {
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isNotFirstRender, setIsNotFirstRender] = useState(false);

  const memoizedFn = useCallback(fn, [fn]);

  useEffect(() => {
    if (!isNotFirstRender) {
      console.log('This is the first render, skipping debounce.');
      setIsNotFirstRender(true);
      memoizedFn();
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      memoizedFn();
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [...deps]);
}
