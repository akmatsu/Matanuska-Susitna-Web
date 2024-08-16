'use client';
import { useNode } from '@craftjs/core';
import React, { useEffect, useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';

export type TextProps = {
  text: string;
  fontSize?: string;
};

export const Text = ({ text, fontSize = '16' }: TextProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(true);
  }, [hasSelectedNode]);

  function edit(e: ContentEditableEvent) {
    setProp((props: TextProps) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')));
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        tagName="p"
        style={{ fontSize: `${fontSize}px` }}
        onChange={edit}
      />
    </div>
  );
};
