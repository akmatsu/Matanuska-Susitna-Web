'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MdEditorProps } from '@msb/md-editor/dist/components/Editor/types';
import { Button } from '@keystone-ui/button';
import { TextArea } from '@keystone-ui/fields';
import '@msb/md-editor/styles.css';

const MdEditor = dynamic(
  () => import('@msb/md-editor').then((m) => m.MdEditor),
  { ssr: false },
);

export function RichEditor(props: MdEditorProps) {
  const [isClient, setIsClient] = useState(false);
  const [showCode, setShowCode] = useState(false);
  useEffect(() => setIsClient(true));

  if (isClient) {
    return (
      <div>
        <Button onClick={() => setShowCode(!showCode)}>
          {showCode ? 'Rich Editor' : 'View Markdown'}
        </Button>
        {showCode ? (
          <TextArea
            value={props.initialValue}
            onChange={(e) => {
              props.onChange?.(e.target.value);
            }}
            size="large"
          />
        ) : (
          <MdEditor {...props} />
        )}
      </div>
    );
  } else {
    return <div>Editor is loading...</div>;
  }
}
