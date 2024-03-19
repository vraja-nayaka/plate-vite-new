import {
  getPluginType,
  insertNodes,
  InsertNodesOptions,
  PlateEditor,
  Value,
} from "@udecode/plate-common";

import { TPlantumlElement } from "../../plate-types";
import { ELEMENT_PLANT_UML } from "../plugin";

export const insertPlantuml = <V extends Value>(
  editor: PlateEditor<V>,
  options: InsertNodesOptions<V> = {}
) => {
  const text = { text: "" as const };
  const plantuml: TPlantumlElement = {
    type: getPluginType(editor, ELEMENT_PLANT_UML),
    title: "",
    content: "",
    children: [text],
  };

  insertNodes<TPlantumlElement>(editor, plantuml, {
    nextBlock: true,
    select: true,
    ...(options as any),
  });
};
