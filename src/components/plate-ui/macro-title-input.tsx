import { findNodePath, useEditorRef, useElement } from "@udecode/plate-common";
import React from "react";
import { useReadOnly } from "slate-react";
import styled from "styled-components";

export const StyledInput = styled.input`
  height: 32px;
  width: 327px;
  border-radius: 8px;
  border: none;
  background: transparent;
  padding: 4px 16px 4px 12px;
  font-weight: 550;
  cursor: text;
  margin-left: 16px;
`;

// export type MacroTitleInputProps = {};

export const MacroTitleInput = () => {
  const element = useElement();
  const editor = useEditorRef();
  const readOnly = useReadOnly();

  const title = String(element.title || "");
  console.log("🚀 ~ MacroTitleInput ~ element:", element);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    editor.setNodes(
      {
        // @ts-ignore
        title: e.target.value || "",
      },
      { at: findNodePath(editor, element) }
    );
    console.log(e.target.value);
  };

  return readOnly ? (
    // TODO: add styles
    <span>{title}</span>
  ) : (
    <StyledInput value={title} onChange={onChange} />
  );
};
