'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MdEditorProps } from '@msb/md-editor/dist/components/Editor/types';
import '@msb/md-editor/styles.css';

const MdEditor = dynamic(
  () => import('@msb/md-editor').then((m) => m.MdEditor),
  { ssr: false },
);

export function RichEditor(props: MdEditorProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true));

  if (isClient) {
    return <MdEditor {...props} />;
  } else {
    return <div>Editor is loading...</div>;
  }
}
