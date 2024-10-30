import React from 'react';
import { Ctx } from '@milkdown/kit/ctx';
import { TooltipProvider } from '@milkdown/kit/plugin/tooltip';
import {
  toggleStrongCommand,
  toggleEmphasisCommand,
  linkSchema,
} from '@milkdown/kit/preset/commonmark';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useCallback, useEffect, useRef } from 'react';
import { callCommand } from '@milkdown/kit/utils';
import { toggleStrikethroughCommand } from '@milkdown/kit/preset/gfm';
import { linkTooltipAPI } from '@milkdown/kit/component/link-tooltip';
import { MarkType } from '@milkdown/kit/prose/model';
import { TextSelection } from '@milkdown/kit/prose/state';

export const ToolbarView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();

  const { view, prevState } = usePluginViewContext();
  const [loading, get] = useInstance();
  const action = useCallback(
    (fn: (ctx: Ctx) => void) => {
      if (loading) return;
      get().action(fn);
    },
    [loading],
  );

  useEffect(() => {
    const div = ref.current;
    if (loading || !div) {
      return;
    }
    tooltipProvider.current = new TooltipProvider({
      content: div,
      offset: {
        alignmentAxis: 200,
      },
      shouldShow(view) {
        const { doc, selection } = view.state;
        const { empty, from, to } = selection;

        const isEmptyTextBlock =
          !doc.textBetween(from, to).length &&
          selection instanceof TextSelection;

        const isNotTextBlock = !(selection instanceof TextSelection);

        const activeElement = (view.dom.getRootNode() as ShadowRoot | Document)
          .activeElement;
        const isTooltipChildren = div.contains(activeElement);

        const notHasFocus = !view.hasFocus() && !isTooltipChildren;

        const isReadonly = !view.editable;

        if (
          notHasFocus ||
          isNotTextBlock ||
          empty ||
          isEmptyTextBlock ||
          isReadonly
        )
          return false;

        return true;
      },
    });

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  const isActive = (mark: MarkType) => {
    const {
      state: { doc, selection },
    } = view;
    return doc.rangeHasMark(selection.from, selection.to, mark);
  };

  const TOOLBAR_COMMANDS = [
    {
      label: 'Bold',
      icon: 'bold',
      action: () => callCommand(toggleStrongCommand.key),
    },
    {
      label: 'Italic',
      icon: 'italic',
      action: () => callCommand(toggleEmphasisCommand.key),
    },
    {
      label: 'Strikethrough',
      icon: 'strike',
      action: () => callCommand(toggleStrikethroughCommand.key),
    },
  ];

  return (
    <div
      className="absolute card data-[show=false]:hidden flex gap-2 z-10"
      ref={ref}
    >
      {TOOLBAR_COMMANDS.map((cmd) => (
        <button
          key={crypto.randomUUID()}
          className="btn btn--default rounded-full"
          onMouseDown={(e) => {
            e.preventDefault();
            action(cmd.action());
          }}
        >
          <span className={`icon ${cmd.icon} size-6 m-1`}></span>
        </button>
      ))}
      <button
        className="btn btn--default rounded-full"
        onMouseDown={(e) => {
          e.preventDefault();
          const { selection } = view.state;
          action((ctx) => {
            if (isActive(linkSchema.type(ctx))) {
              ctx
                .get(linkTooltipAPI.key)
                .removeLink(selection.from, selection.to);
              return;
            }

            ctx.get(linkTooltipAPI.key).addLink(selection.from, selection.to);
          });
        }}
      >
        <span className={`icon link size-6 m-1`}></span>
      </button>
    </div>
  );
};
