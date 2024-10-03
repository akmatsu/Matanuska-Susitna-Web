'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useState, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import { createRoot } from 'react-dom/client';

export type MdEditorProps = {
  initialValue?: string;
  onChange?: (value?: string) => void;
};

export default function MdEditor({ initialValue, onChange }: MdEditorProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editor, setEditor] = useState<Editor>();

  useEffect(() => {
    const $el = document.querySelector('#MdEditor');
    if ($el !== null)
      setEditor(
        new Editor({
          el: $el as HTMLElement,
          height: '100%',
          initialEditType: 'wysiwyg',
          previewStyle: 'vertical',
          initialValue: initialValue,
          usageStatistics: false,
          toolbarItems: [
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ],
          events: {
            change() {
              onChange?.(editor?.getMarkdown());
            },
          },
        }),
      );
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // function mySpecialButton() {
  //   const button = document.createElement('div');

  //   const root = createRoot(button);
  //   root.render(
  //     <button onClick={toggleFullScreen}>
  //       {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
  //     </button>,
  //   );
  //   return button;
  // }

  return (
    <div
      style={{
        width: isFullScreen ? '100vw' : '100%',
        height: isFullScreen ? '100vh' : '400px',
        position: isFullScreen ? 'fixed' : 'relative',
        top: isFullScreen ? '0' : 'auto',
        left: isFullScreen ? '0' : 'auto',
        zIndex: isFullScreen ? 999 : 'auto',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button onClick={toggleFullScreen}>
        {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </button>
      <div
        id="MdEditor"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
