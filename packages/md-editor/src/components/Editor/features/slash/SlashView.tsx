import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import React, { useEffect, useRef, useState } from 'react';
import { SLASH_COMMANDS } from './config';
import { useMenuNavControls } from '../../../../hooks/useMenuNavControls';

export const SlashView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const slashProvider = useRef<SlashProvider>();
  const { view, prevState } = usePluginViewContext();
  const [isVisible, setIsVisible] = useState(false);
  const { loading, selectedIndex, runAction } = useMenuNavControls(
    SLASH_COMMANDS,
    isVisible,
  );

  useEffect(() => {
    const div = ref.current;
    if (loading || !div) {
      return;
    }
    slashProvider.current = new SlashProvider({
      content: div,
    });

    slashProvider.current.onShow = () => {
      setIsVisible(true);
    };

    slashProvider.current.onHide = () => {
      setIsVisible(false);
    };

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
      className="absolute data-[show='false']:hidden z-10 menu max-h-96 transition-all"
      tabIndex={0}
    >
      {SLASH_COMMANDS.map((item, index) => (
        <button
          key={crypto.randomUUID()}
          className={`btn ${selectedIndex === index ? 'btn--focused' : 'btn--default'}`}
          onClick={(e) => runAction(e, item.action)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
