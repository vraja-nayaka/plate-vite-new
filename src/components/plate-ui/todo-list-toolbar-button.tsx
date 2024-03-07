import React from 'react';
import { withRef } from '@udecode/cn';

import {
  useTodoListToolbarButton,
  useTodoListToolbarButtonState,
} from '@/lib/plate/todo-list';
import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const TodoListToolbarButton = withRef<typeof ToolbarButton>(
  ({}, ref) => {
    const state = useTodoListToolbarButtonState();
    const { props } = useTodoListToolbarButton(state);

    return (
      <ToolbarButton ref={ref} tooltip="Todo list" {...props}>
        <Icons.todo />
      </ToolbarButton>
    );
  }
);
