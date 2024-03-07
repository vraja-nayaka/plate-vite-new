import React from 'react';
import { YjsEditor } from '@slate-yjs/core';
import { PlateEditor, useEditorRef, Value } from '@udecode/plate-common';

import { PlateYjsEditorProps } from './withPlateYjs';
import { useYjsSelectors } from './yjsStore';

export const RenderAboveEditableYjs: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const editor = useEditorRef<Value, PlateEditor & PlateYjsEditorProps>();

  const isSynced = useYjsSelectors.isSynced();
  console.log('🚀 ~ isSynced:', isSynced);

  React.useEffect(() => {
    console.log('CONNECT! provider', editor.yjs.provider);
    editor.yjs.provider.connect();
    return () => {
      console.log('DIS CONNECT! provider');
      editor.yjs.provider.disconnect();
    };
  }, [editor.yjs.provider]);

  React.useEffect(() => {
    console.log('CONNECT! YjsEditor', editor.yjs.provider);
    YjsEditor.connect(editor as any);
    return () => {
      console.log('DIS CONNECT! YjsEditor');
      YjsEditor.disconnect(editor as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.yjs.provider.awareness, editor.yjs.provider.document]);

  if (!isSynced) return null;

  return <>{children}</>;
};
