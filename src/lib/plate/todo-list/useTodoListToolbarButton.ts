import {
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';
import { ELEMENT_TODO_LI } from '@udecode/plate-list';

import { someTodoList } from './someTodoList';

export const useTodoListToolbarButtonState = () => {
  const pressed = useEditorSelector((editor) => someTodoList(editor), []);

  return { pressed };
};

export const useTodoListToolbarButton = ({
  pressed,
}: ReturnType<typeof useTodoListToolbarButtonState>) => {
  const editor = useEditorRef();

  return {
    props: {
      pressed,
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
      onClick: () => {
        toggleNodeType(editor, { activeType: ELEMENT_TODO_LI });
      },
    },
  };
};
