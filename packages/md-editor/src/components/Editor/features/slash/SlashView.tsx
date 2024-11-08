import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import React, { useEffect, useRef, useState } from 'react';
import { SLASH_COMMANDS } from './config';
import { useMenuNavControls } from '../../../../hooks/useMenuNavControls';

export const SlashView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const slashProvider = useRef<SlashProvider>();
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
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

  function show() {
    slashProvider.current.show();
  }

  // Scroll the menu container to the selected item when selectedIndex changes
  useEffect(() => {
    const selectedButton = buttonsRef.current[selectedIndex];
    const menuDiv = ref.current;

    if (selectedButton && menuDiv) {
      const buttonTop = selectedButton.offsetTop;
      const buttonBottom = buttonTop + selectedButton.offsetHeight;
      const menuScrollTop = menuDiv.scrollTop;
      const menuHeight = menuDiv.clientHeight;

      // If the button is above the visible area, scroll up
      if (buttonTop < menuScrollTop) {
        menuDiv.scrollTop = buttonTop - 8;
      }
      // If the button is below the visible area, scroll down
      else if (buttonBottom > menuScrollTop + menuHeight) {
        menuDiv.scrollTop = buttonBottom - menuHeight + 8;
      }
    }
  }, [selectedIndex]);

  return (
    <div
      ref={ref}
      aria-expanded="false"
      className="absolute data-[show='false']:hidden z-10 menu max-h-72 overflow-auto transition-all scroll-smooth"
      tabIndex={0}
    >
      {SLASH_COMMANDS.map((item, index) => (
        <button
          key={crypto.randomUUID()}
          ref={(el) => (buttonsRef.current[index] = el)}
          className={`btn ${selectedIndex === index ? 'btn--focused' : 'btn--default'}`}
          onClick={(e) => runAction(e, item.action)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
