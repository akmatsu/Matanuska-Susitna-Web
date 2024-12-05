import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { useInstance } from '@milkdown/react';
import React, { useEffect, useRef, useState } from 'react';
import { isInCodeBlock, isInList } from '../utils';
import {
  PluginViewContext,
  usePluginViewContext,
} from '@prosemirror-adapter/react';
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
  const [programmaticPos, setPos] = useState<number>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (loading || !content) return;

    slashProvider.current = new SlashProvider({
      content,
      shouldShow(this: SlashProvider) {
        if (checkIfSelectionValid(view)) return false;

        const text = getContent(this, view);
        if (text == null) return false;

        setFilter(text.startsWith('/') ? text.slice(1) : text);

        if (typeof programmaticPos === 'number') {
          return checkIfPosValid(programmaticPos, view, () => setPos(null));
        } else if (!text.startsWith('/')) return false;

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
  }, [loading, programmaticPos]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  function show(p: number) {
    setPos(p);
    setFilter('');
    slashProvider.current.show();
  }

  function hide() {
    setPos(null);
    slashProvider.current.hide();
  }

  return {
    filter,
    slashProvider,
    hide,
    show,
  };
}

function checkIfSelectionValid(view: PluginViewContext['view']) {
  return isInCodeBlock(view.state.selection) || isInList(view.state.selection);
}

function getContent(provider: SlashProvider, view: PluginViewContext['view']) {
  return provider.getContent(view, (node) =>
    ['paragraph', 'heading'].includes(node.type.name),
  );
}

function checkIfPosValid(
  pos: number,
  view: PluginViewContext['view'],
  onFail: () => void,
) {
  try {
    if (
      view.state.doc.resolve(pos).node() !==
      view.state.doc.resolve(view.state.selection.from).node()
    ) {
      onFail();
      return false;
    }
  } catch (err) {
    if (/^Position\s\d+\sout\sof\srange$/.test(err.message)) {
      onFail();
      return false;
    } else {
      throw err;
    }
  }
  return true;
}
