import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SLASH_COMMANDS } from './commands';
import { useSlashProvider, useMenuNavControls } from './hooks';

export const SlashView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { filter, hide } = useSlashProvider(
    ref,
    () => setIsVisible(true),
    () => {
      setIsVisible(false);
      setSelectedIndex(0);
    },
  );

  const items = useMemo(() => {
    return SLASH_COMMANDS.filter((item) =>
      item.label.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter]);

  const { selectedIndex, runAction, setSelectedIndex } = useMenuNavControls(
    items,
    isVisible,
    hide,
  );

  useEffect(() => {
    scrollSlashMenu();
  }, [selectedIndex]);

  function scrollSlashMenu() {
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
  }

  return (
    <div
      ref={ref}
      aria-expanded="false"
      className="absolute data-[show='false']:hidden z-10 menu max-h-72 overflow-auto transition-all scroll-smooth"
      tabIndex={0}
      onClick={(e) => e.preventDefault()}
    >
      {items.map((item, index) => (
        <button
          key={crypto.randomUUID()}
          ref={(el) => (buttonsRef.current[index] = el)}
          className={`btn ${selectedIndex === index ? 'btn--focused' : 'btn--default'}`}
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => {
            runAction(e, item.action);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
