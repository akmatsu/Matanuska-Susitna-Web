import { Ctx } from '@milkdown/kit/ctx';
import { useInstance } from '@milkdown/react';
import { useCallback, useEffect, useState } from 'react';
import { limit } from '../../../../../utils';
import { slash } from '../config';

export function useMenuNavControls(
  items: {
    label: string;
    action: (...args: any) => void;
  }[],
  isVisible: boolean,
) {
  const [loading, get] = useInstance();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const runAction = useCallback(
    (
      e: KeyboardEvent | React.KeyboardEvent | React.MouseEvent,
      fn: (ctx: Ctx) => void,
    ) => {
      e.preventDefault();
      if (loading) return;
      get().action(fn);
    },
    [loading],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isVisible) {
        if (e.key === 'Escape') {
          e.preventDefault();
          const ctx = get().ctx;
          ctx.get(slash.key).hide();
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            limit(prevIndex + 1, 0, items.length - 1),
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            limit(prevIndex - 1, 0, items.length - 1),
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          runAction(e, items[selectedIndex].action);
          const ctx = get().ctx;
          ctx.get(slash.key).hide();
        }
      }
    },
    [isVisible, selectedIndex, runAction, items],
  );

  useEffect(() => {
    if (isVisible) {
      document.body.addEventListener('keydown', handleKeyDown, {
        capture: true,
      });
    } else {
      document.body.removeEventListener('keydown', handleKeyDown, {
        capture: true,
      });
    }

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown, {
        capture: true,
      });
    };
  }, [isVisible, handleKeyDown]);

  useEffect(() => {
    let max = items.length - 1;
    max = max >= 0 ? max : 0;
    if (selectedIndex > max) {
      setSelectedIndex(max);
    }
  }, [items, selectedIndex]);

  return { runAction, loading, get, selectedIndex, setSelectedIndex };
}
