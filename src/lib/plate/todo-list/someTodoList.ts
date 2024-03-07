import { PlateEditor, someNode, Value } from '@udecode/plate-common';
import { ELEMENT_TODO_LI } from '@udecode/plate-list';

export const someTodoList = <V extends Value>(editor: PlateEditor<V>) => {
  return (
    !!editor.selection &&
    someNode(editor, {
      match: (n) => {
        return n.type === ELEMENT_TODO_LI;
      },
    })
  );
};
