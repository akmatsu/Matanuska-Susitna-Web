import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { useInstance } from '@milkdown/react';
import React, { useEffect, useRef, useState } from 'react';
import { isInCodeBlock, isInList } from '../utils';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { slash } from '../config';

export function useSlashProvider(
  contentRef: React.MutableRefObject<HTMLDivElement>,
  onShow?: () => void,
  onHide?: () => void,
) {
  const slashProvider = useRef<SlashProvider>();
  const { view, prevState } = usePluginViewContext();
  const [loading, get] = useInstance();
  const [filter, setFilter] = useState<string>('');
  const [programmaticallyPos, setProgrammaticallyPos] = useState<number>();

  useEffect(() => {
    const content = contentRef.current;
    if (loading || !content) return;

    slashProvider.current = new SlashProvider({
      content,
      shouldShow(this: SlashProvider) {
        if (
          isInCodeBlock(view.state.selection) ||
          isInList(view.state.selection)
        ) {
          console.log('IN AN INVALID LOCATION!');
          return false;
        }

        const currentText = this.getContent(view, (node) =>
          ['paragraph', 'heading'].includes(node.type.name),
        );

        if (currentText == null) {
          console.log('CURRENT TEXT NULL!');
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
            console.log('SOMETHING WRONG!');
            setProgrammaticallyPos(undefined);
            return false;
          }
          return true;
        }
        if (!currentText.startsWith('/')) {
          console.log('CURRENT TEXT DOES NOT START WITH /');
          return false;
        }
        return true;
      },
      offset: 10,
    });
    slashProvider.current.onShow = () => {
      onShow?.();
    };
    slashProvider.current.onHide = () => {
      onHide?.();
    };

    const ctx = get().ctx;
    ctx.set(slash.key, {
      show,
      hide,
    });
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

  return {
    filter,
    slashProvider,
  };
}
