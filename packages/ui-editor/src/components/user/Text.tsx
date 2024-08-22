'use client';
import { useNode } from '@craftjs/core';
import React, { useEffect, useState } from 'react';
import ContentEditable, {
  type ContentEditableEvent,
} from 'react-contenteditable';

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
    hasDraggedNode: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(true);
  }, [hasSelectedNode]);

  function edit(e: ContentEditableEvent) {
    setProp(
      (props: TextProps) =>
        (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
    );
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
        onChange={edit}
      />
    </div>
  );
};

// const textSettings = () => {
//   const {
//     actions: { setProp },
//     fontSize,
//   } = useNode((node) => ({
//     fontSize: node.data.props.fontSize,
//   }));

//   const editFontSize: SliderOwnProps['onChange'] = (_, value) => {
//     setProp((props: TextProps) => (props.fontSize = value.toString()));
//   };

//   return (
//     <FormControl className="text-additional-settings" size="small">
//       <FormLabel component="legend">Font Size</FormLabel>
//       <Slider
//         defaultValue={parseInt(fontSize)}
//         step={1}
//         min={7}
//         max={50}
//         valueLabelDisplay="auto"
//         onChange={editFontSize}
//       />
//     </FormControl>
//   );
// };

Text.craft = {
  props: {
    text: 'hi',
    fontSize: 16,
  },
  related: {
    // settings: textSettings,
  },
};
