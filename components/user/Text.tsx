'use client';
import React from 'react';
import { useNode } from '@craftjs/core';

export const Text = ({ text, fontSize }: { text: string; fontSize: string }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => (ref ? connect(drag(ref)) : undefined)}>
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};
