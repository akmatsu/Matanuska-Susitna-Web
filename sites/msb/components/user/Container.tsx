'use client';
import { useEditorDragAndDrop } from '@/hooks/useEditorDragAndDrop';
import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Paper, Slider, SliderOwnProps } from '@mui/material';
import { MuiColorInput, MuiColorInputProps } from 'mui-color-input';
import React from 'react';

export type ContainerProps = {
  // Provide a hexcode for the element background color
  background?: string;
  // Padding in pixels.
  padding?: number | string;
  children?: React.ReactNode;
};

export const Container = ({ background, padding = 0, children }: ContainerProps) => {
  const editorDragAndDrop = useEditorDragAndDrop();
  return (
    <Paper ref={editorDragAndDrop} style={{ margin: '5px 0', background, padding: `${padding}px` }}>
      {children}
    </Paper>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background as string | undefined,
    padding: node.data.props.padding as number | string | undefined,
  }));

  const editorColor: MuiColorInputProps['onChange'] = (newValue) => {
    setProp((props: ContainerProps) => (props.background = newValue));
  };

  const editPadding: SliderOwnProps['onChange'] = (_, value) => {
    setProp((props: ContainerProps) => (props.padding = value as number));
  };

  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <MuiColorInput
          format="hex"
          value={background || '#ffffff'}
          onChange={editorColor}
        ></MuiColorInput>
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider
          defaultValue={typeof padding === 'string' ? parseInt(padding) : padding || 0}
          onChange={editPadding}
        />
      </FormControl>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: '#ffffff',
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
