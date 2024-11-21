import { slashFactory, SlashProvider } from '@milkdown/kit/plugin/slash';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SLASH_COMMANDS } from './commands';
import { useMenuNavControls } from '../../../../hooks/useMenuNavControls';
import { useInstance } from '@milkdown/react';
import { Selection } from '@milkdown/kit/prose/state';

export const slash = slashFactory('Commands');

export const SlashView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const slashProvider = useRef<SlashProvider>();
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { view, prevState } = usePluginViewContext();
  const [isVisible, setIsVisible] = useState(false);
  const [iLoading, get] = useInstance();
  const [filter, setFilter] = useState<string>('');
  const [programmaticallyPos, setProgrammaticallyPos] = useState<number>();

  const items = useMemo(() => {
    return SLASH_COMMANDS.filter((item) =>
      item.label.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter]);

  const { loading, selectedIndex, runAction, setSelectedIndex } =
    useMenuNavControls(items, isVisible);

  function isInCodeBlock(selection: Selection) {
    const type = selection.$from.node(selection.$from.depth - 1)?.type;
    return type?.name === 'code_block';
  }
  function isInList(selection: Selection) {
    const type = selection.$from.node(selection.$from.depth - 1)?.type;
    return type?.name === 'list_item';
  }

  useEffect(() => {
    const div = ref.current;
    if (loading || !div) {
      return;
    }
    slashProvider.current = new SlashProvider({
      content: div,
      shouldShow(this: SlashProvider) {
        if (
          isInCodeBlock(view.state.selection) ||
          isInList(view.state.selection)
        )
          return false;

        const currentText = this.getContent(view, (node) =>
          ['paragraph', 'heading'].includes(node.type.name),
        );

        if (currentText == null) {
          return false;
        }

        setFilter(
          currentText.startsWith('/') ? currentText.slice(1) : currentText,
        );

        const pos = programmaticallyPos;
        if (typeof pos === 'number') {
          if (
            view.state.doc.resolve(pos).node() !==
            view.state.doc.resolve(view.state.selection.from).node()
          ) {
            setProgrammaticallyPos(undefined);
            return false;
          }
          return true;
        }
        if (!currentText.startsWith('/')) return false;
        return true;
      },
      offset: 10,
    });

    slashProvider.current.onShow = () => {
      setIsVisible(true);
    };

    slashProvider.current.onHide = () => {
      setIsVisible(false);
      setSelectedIndex(0);
    };

    const ctx = get().ctx;
    ctx.set(slash.key, {
      show: (pos: number) => show(pos),
      hide: () => hide(),
    });

    return () => {
      slashProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  function show(pos: number) {
    setProgrammaticallyPos(pos);
    setFilter('');
    slashProvider.current.show();
  }

  function hide() {
    setProgrammaticallyPos(undefined);
    slashProvider.current.hide();
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
      {items.map((item, index) => (
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
