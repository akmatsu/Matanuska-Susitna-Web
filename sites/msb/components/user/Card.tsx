'use client';
import { Element } from '@craftjs/core';
import { Btn } from './Btn';
import { Container, ContainerDefaultProps, ContainerSettings } from './Container';
import { Text } from './Text';
import React from 'react';
import { useEditorCanvas } from '@/hooks/useEditorCanvas';

export type CardProps = {
  background?: string;
  padding?: number | string;
};

export const CardTop = ({ children }: { children: React.ReactNode }) => {
  const canvas = useEditorCanvas();

  return (
    <div ref={canvas} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every((incomingNode: any) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children }: { children: React.ReactNode }) => {
  const canvas = useEditorCanvas();

  return <div ref={canvas}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every((incomingNode: any) => incomingNode.data.type === Btn),
  },
};

export const Card = ({ background = 'default', padding = 20 }: CardProps) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize="20" />
        <Text text="Subtitle" fontSize="15" />
      </Element>
      <Element id="buttons" is={CardBottom} canvas>
        <Btn size="small" variant="contained" color="primary">
          Learn More
        </Btn>
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
