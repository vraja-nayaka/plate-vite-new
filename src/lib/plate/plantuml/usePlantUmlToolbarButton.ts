import { TPlantumlElement } from "../plate-types";
import { ELEMENT_PLANT_UML } from "./plugin";
import { useSelectedPlantUml } from "./store";
import { insertPlantuml } from "./transforms";
import { findNode, getPluginType, useEditorRef } from "@udecode/plate-common";

export const usePlantUmlToolbarButton = () => {
  const setSelected = useSelectedPlantUml();
  const editor = useEditorRef();

  const onClick = () => {
    insertPlantuml(editor);
    editor.selection;
    const [node] =
      findNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_PLANT_UML) },
      }) || [];

    if (node) {
      setSelected(node as TPlantumlElement);
    }
  };

  return {
    props: {
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
      onClick,
    },
  };
};
