import { Ctx } from '@milkdown/kit/ctx';
import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SLASH_COMMANDS } from './config';

export const SlashView = (props: { show: Boolean; ctx: Ctx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const slashProvider = useRef<SlashProvider>();
  const { view, prevState } = usePluginViewContext();
  const [loading, get] = useInstance();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const runAction = useCallback(
    (e: React.KeyboardEvent | React.MouseEvent, fn: (ctx: Ctx) => void) => {
      e.preventDefault();
      if (loading) return;
      get().action(fn);
    },
    [loading],
  );

  /** Handle keyboard navigation */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % SLASH_COMMANDS.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? SLASH_COMMANDS.length - 1 : prevIndex - 1,
      );
    } else if (e.key === 'Enter') {
      runAction(e, SLASH_COMMANDS[selectedIndex].action);
    }
  }

  useEffect(() => {
    const div = ref.current;
    if (loading || !div) {
      return;
    }
    slashProvider.current = new SlashProvider({
      content: div,
    });

    console.log(props.show);
    return () => {
      slashProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  return (
    <div
      ref={ref}
      aria-expanded="false"
      className="absolute data-[show='false']:hidden bg-white shadow-lg rounded flex flex-col min-w-52 p-2 z-10"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {SLASH_COMMANDS.map((item, index) => (
        <button
          key={crypto.randomUUID()}
          className={` px-2 py-1 rounded transition-colors ${selectedIndex === index ? 'bg-blue-300 text-white' : 'bg-slate-300 hover:bg-slate-200'}`}
          onKeyDown={(e) => runAction(e, item.action)}
          onMouseDown={(e) => runAction(e, item.action)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
