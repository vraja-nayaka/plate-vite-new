import React from 'react';
import { cn } from '@udecode/cn';
import {
  createNodeHOC,
  createNodesHOC,
  PlaceholderProps as CommonPlaceholderProps,
  usePlaceholderState,
} from '@udecode/plate-common';
import { ELEMENT_H1 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TODO_LI } from '@udecode/plate-list';

interface PlaceholderProps extends CommonPlaceholderProps {
  placeholderClassname: string
}

export const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps, placeholderClassname } = props;

  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
            enabled && placeholderClassname
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_TODO_LI,
      placeholder: 'Начните печатать...',
      hideOnBlur: false,
      placeholderClassname: 'before:left-6',
    },
  ]);
