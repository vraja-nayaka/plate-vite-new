import { Editor } from "tinymce";

import { change } from "../core/Change";
import { insert } from "../core/Insert";
import {
  ChangePlantumlParams,
  InsertPlantumlParams,
  PlantumlPluginCommands,
} from "../types";

export const register = (editor: Editor): void => {
  editor.addCommand(
    PlantumlPluginCommands.insert,
    (_ui, payload: InsertPlantumlParams) => {
      insert(editor, payload);
    }
  );
  editor.addCommand(
    PlantumlPluginCommands.change,
    (_ui, payload: ChangePlantumlParams) => {
      change(editor, payload);
    }
  );
};
