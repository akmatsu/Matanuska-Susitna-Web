'use client';
import { Element, useNode } from '@craftjs/core';
import { Btn } from './Btn';
import { Container } from './Container';
import { Text } from './Text';
import React, { Children } from 'react';

export type CardProps = {
  background?: string;
  padding?: number | string;
};

export const CardTop = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div ref={connect} className="text-only">
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
  const {
    connectors: { connect },
  } = useNode();

  return <div ref={connect}>{children}</div>;
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
      <Element id="btns" is={CardBottom} canvas>
        <Btn size="small" variant="contained" color="primary">
          Learn More
        </Btn>
      </Element>
    </Container>
  );
};
