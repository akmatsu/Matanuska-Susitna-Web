'use client';
import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Slider, SliderOwnProps } from '@mui/material';
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
    hasDraggedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(true);
  }, [hasSelectedNode]);

  function edit(e: ContentEditableEvent) {
    setProp((props: TextProps) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')));
  }

  const editFontSize: SliderOwnProps['onChange'] = (_, value) => {
    setProp((props: TextProps) => (props.fontSize = value.toString()));
  };

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
      {hasSelectedNode && (
        <FormControl className="text-additional-settings" size="small">
          <FormLabel component="legend">Font Size</FormLabel>
          <Slider
            defaultValue={parseInt(fontSize)}
            step={1}
            min={7}
            max={50}
            valueLabelDisplay="auto"
            onChange={editFontSize}
          />
        </FormControl>
      )}
    </div>
  );
};
