'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useState, useRef } from 'react';
import TuiEditor, { TuiEditorRef } from './TuiEditor';
import chartPlugin from '@toast-ui/editor-plugin-chart';
import umlPlugin from '@toast-ui/editor-plugin-uml';
import colorPlugin from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';

export type MdEditorProps = {
  initialValue?: string;
  onChange?: (value?: string) => void;
};

export default function MdEditor({ initialValue, onChange }: MdEditorProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const editor = useRef<TuiEditorRef>(null);

  function handleChange() {
    onChange?.(editor.current?.getInstance()?.getMarkdown());
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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
      <TuiEditor
        height="100%"
        initialEditType="wysiwyg"
        onChange={handleChange}
        initialValue={initialValue}
        previewStyle="vertical"
        usageStatistics={false}
        ref={editor}
        plugins={[
          chartPlugin,
          umlPlugin,
          colorPlugin,
          tableMergedCellPlugin,
          codeSyntaxHighlightPlugin,
        ]}
      />
    </div>
  );
}
