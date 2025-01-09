import React from 'react';
import { Ctx } from '@milkdown/kit/ctx';
import { TooltipProvider } from '@milkdown/kit/plugin/tooltip';
import { linkSchema } from '@milkdown/kit/preset/commonmark';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useCallback, useEffect, useRef } from 'react';
import { linkTooltipAPI } from '@milkdown/kit/component/link-tooltip';
import { MarkType } from '@milkdown/kit/prose/model';
import { TextSelection } from '@milkdown/kit/prose/state';
import { TOOLBAR_COMMANDS } from './commands';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export const ToolbarView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>(null);

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

  return (
    <div
      className="absolute card data-[show=false]:hidden flex gap-2 z-10"
      ref={ref}
    >
      {TOOLBAR_COMMANDS.map((cmd) =>
        cmd.children?.length ? (
          <Menu key={crypto.randomUUID()}>
            <MenuButton className="btn btn--default rounded-full">
              <span className={`${cmd.icon} size-6`}></span>
              <span
                className={`${cmd.icon} icon-[bi--caret-down-fill] size-2`}
              ></span>
            </MenuButton>
            <MenuItems anchor="bottom" className="card flex flex-col gap-2">
              {cmd.children.map((child) => (
                <MenuItem key={crypto.randomUUID()}>
                  <button
                    className="btn btn--default rounded-full"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      action(child.action(view));
                    }}
                  >
                    <span className={`${child.icon} size-4 mr-4`}></span>
                    {child.label}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        ) : (
          <button
            key={crypto.randomUUID()}
            className="btn btn--default rounded-full"
            onMouseDown={(e) => {
              e.preventDefault();
              action(cmd.action(view));
            }}
          >
            <span className={`${cmd.icon} size-6`}></span>
          </button>
        ),
      )}
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
        <span className={`icon-[bi--link] size-6`}></span>
      </button>
    </div>
  );
};
